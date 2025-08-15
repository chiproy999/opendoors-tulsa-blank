-- Add role column to profiles table for admin access control
ALTER TABLE public.profiles 
ADD COLUMN role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'employer', 'landlord'));

-- Create index for better performance on role lookups
CREATE INDEX idx_profiles_role ON public.profiles(role);

-- Create security definer function to get current user role (prevents RLS infinite recursion)
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT
LANGUAGE SQL
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT role FROM public.profiles WHERE user_id = auth.uid();
$$;

-- Drop the problematic policies that expose sensitive data
DROP POLICY IF EXISTS "Authenticated users can read contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Authenticated users can read newsletter subscriptions" ON public.newsletter_subscriptions;

-- Create secure admin-only policies for contact submissions
CREATE POLICY "Only admins can read contact submissions" 
ON public.contact_submissions 
FOR SELECT 
USING (public.get_current_user_role() = 'admin');

-- Create secure admin-only policies for newsletter subscriptions  
CREATE POLICY "Only admins can read newsletter subscriptions" 
ON public.newsletter_subscriptions 
FOR SELECT 
USING (public.get_current_user_role() = 'admin');

-- Update the user creation trigger to handle role assignment from metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
BEGIN
  INSERT INTO public.profiles (user_id, username, role)
  VALUES (
    new.id, 
    coalesce(new.raw_user_meta_data->> 'first_name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->> 'role', 'user')
  )
  ON CONFLICT (user_id) DO NOTHING;
  RETURN new;
END;
$function$;

-- Create a superuser admin account (you can change this email to your actual admin email)
-- This will only work if you already have a user with this email in auth.users
DO $$
BEGIN
  -- Update existing user to admin if they exist, otherwise this will be ignored
  UPDATE public.profiles 
  SET role = 'admin' 
  WHERE user_id IN (
    SELECT id FROM auth.users WHERE email = 'admin@opendoorstulsa.com'
  );
END
$$;