-- Create admin user for testing
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role
) VALUES (
  gen_random_uuid(),
  'admin@example.com',
  crypt('Admin123!', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider": "email", "providers": ["email"]}',
  '{"first_name": "Admin", "last_name": "User", "role": "admin"}',
  false,
  'authenticated'
);

-- Create corresponding profile
INSERT INTO public.profiles (user_id, username, role)
SELECT 
  id,
  'Admin User',
  'admin'
FROM auth.users 
WHERE email = 'admin@example.com'
ON CONFLICT (user_id) DO UPDATE SET
  username = EXCLUDED.username,
  role = EXCLUDED.role;