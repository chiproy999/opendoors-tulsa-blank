-- Create a security definer function to safely check admin status
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE profiles.user_id = is_admin.user_id
    AND profiles.role = 'admin'
  );
$$;

-- Update profiles table policies to prevent role escalation
-- First drop existing policies that allow users to update their own profiles
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

-- Create new policies with role protection
CREATE POLICY "Users can update their own profile (except role)" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (
  auth.uid() = user_id 
  AND (
    -- Allow role changes only if user is admin or role hasn't changed
    role = (SELECT role FROM public.profiles WHERE user_id = auth.uid())
    OR public.is_admin()
  )
);

-- Create admin-only policy for role management
CREATE POLICY "Admins can update any profile" 
ON public.profiles 
FOR UPDATE 
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Add audit logging table for admin actions
CREATE TABLE IF NOT EXISTS public.admin_audit_log (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_user_id uuid NOT NULL,
  action text NOT NULL,
  target_table text,
  target_id uuid,
  old_values jsonb,
  new_values jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on audit log
ALTER TABLE public.admin_audit_log ENABLE ROW LEVEL SECURITY;

-- Only admins can read audit logs
CREATE POLICY "Only admins can view audit logs" 
ON public.admin_audit_log 
FOR SELECT 
USING (public.is_admin());

-- System can insert audit logs
CREATE POLICY "System can insert audit logs" 
ON public.admin_audit_log 
FOR INSERT 
WITH CHECK (true);

-- Create function to log admin actions
CREATE OR REPLACE FUNCTION public.log_admin_action(
  action_type text,
  table_name text DEFAULT NULL,
  record_id uuid DEFAULT NULL,
  old_data jsonb DEFAULT NULL,
  new_data jsonb DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.admin_audit_log (
    admin_user_id,
    action,
    target_table,
    target_id,
    old_values,
    new_values
  ) VALUES (
    auth.uid(),
    action_type,
    table_name,
    record_id,
    old_data,
    new_data
  );
END;
$$;