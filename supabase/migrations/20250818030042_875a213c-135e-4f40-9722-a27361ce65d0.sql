-- 1) Create app_role enum safely
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_type WHERE typname = 'app_role'
  ) THEN
    CREATE TYPE public.app_role AS ENUM ('admin', 'employer', 'landlord', 'user');
  END IF;
END$$;

-- 2) Create user_roles table (references profiles to avoid direct auth.users FK)
CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 3) Role helper function (SECURITY DEFINER to avoid RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles ur
    WHERE ur.user_id = _user_id
      AND ur.role = _role
  )
  OR (
    -- Backward compatibility with profiles.role for admin checks
    _role = 'admin' AND EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.user_id = _user_id AND p.role = 'admin'
    )
  );
$$;

-- 4) Update get_current_user_role to prefer user_roles, fallback to profiles.role, default 'user'
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = 'public'
AS $$
  SELECT COALESCE(
    (
      SELECT ur.role::text
      FROM public.user_roles ur
      WHERE ur.user_id = auth.uid()
      ORDER BY CASE ur.role
        WHEN 'admin' THEN 1
        WHEN 'employer' THEN 2
        WHEN 'landlord' THEN 3
        WHEN 'user' THEN 4
        ELSE 5 END
      LIMIT 1
    ),
    (SELECT p.role FROM public.profiles p WHERE p.user_id = auth.uid()),
    'user'
  );
$$;

-- 5) Policies for user_roles
DO $$
BEGIN
  -- Users can view their own roles
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'user_roles' AND policyname = 'Users can view their own roles'
  ) THEN
    CREATE POLICY "Users can view their own roles"
    ON public.user_roles
    FOR SELECT
    TO authenticated
    USING (user_id = auth.uid());
  END IF;

  -- Admins can manage all roles (select/insert/update/delete)
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'user_roles' AND policyname = 'Admins can manage all roles'
  ) THEN
    CREATE POLICY "Admins can manage all roles"
    ON public.user_roles
    FOR ALL
    TO authenticated
    USING (public.has_role(auth.uid(), 'admin'))
    WITH CHECK (public.has_role(auth.uid(), 'admin'));
  END IF;
END$$;

-- 6) Prevent non-admins from changing profiles.role via trigger
CREATE OR REPLACE FUNCTION public.prevent_non_admin_role_change()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  IF NEW.role IS DISTINCT FROM OLD.role THEN
    IF NOT public.has_role(auth.uid(), 'admin') THEN
      RAISE EXCEPTION 'Only admins can change user roles';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

-- Create trigger if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'trg_prevent_non_admin_role_change'
  ) THEN
    CREATE TRIGGER trg_prevent_non_admin_role_change
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.prevent_non_admin_role_change();
  END IF;
END$$;
