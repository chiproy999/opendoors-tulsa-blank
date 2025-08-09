-- Idempotent migration to set up required schema with RLS
create extension if not exists pgcrypto;

-- Utility function
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- PROFILES
create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  username text,
  avatar_url text,
  daily_generations_used integer not null default 0,
  total_generations integer not null default 0,
  referred_by text,
  referral_code text not null default gen_random_uuid()::text,
  subscription_tier text not null default 'free',
  stripe_customer_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Policies for profiles (create only if missing)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'profiles' AND policyname = 'Users can view their own profile'
  ) THEN
    CREATE POLICY "Users can view their own profile"
      ON public.profiles FOR SELECT TO authenticated
      USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'profiles' AND policyname = 'Users can insert their own profile'
  ) THEN
    CREATE POLICY "Users can insert their own profile"
      ON public.profiles FOR INSERT TO authenticated
      WITH CHECK (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'profiles' AND policyname = 'Users can update their own profile'
  ) THEN
    CREATE POLICY "Users can update their own profile"
      ON public.profiles FOR UPDATE TO authenticated
      USING (auth.uid() = user_id);
  END IF;
END$$;

-- update trigger for profiles
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (user_id, username)
  values (new.id, coalesce(new.raw_user_meta_data->> 'first_name', split_part(new.email, '@', 1)))
  on conflict (user_id) do nothing;
  return new;
end;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- NEWSLETTER SUBSCRIPTIONS
create table if not exists public.newsletter_subscriptions (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamptz not null default now()
);

alter table public.newsletter_subscriptions enable row level security;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='newsletter_subscriptions' AND policyname='Anyone can subscribe to newsletter'
  ) THEN
    CREATE POLICY "Anyone can subscribe to newsletter"
      ON public.newsletter_subscriptions FOR INSERT TO public
      WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='newsletter_subscriptions' AND policyname='Authenticated users can read newsletter subscriptions'
  ) THEN
    CREATE POLICY "Authenticated users can read newsletter subscriptions"
      ON public.newsletter_subscriptions FOR SELECT TO authenticated
      USING (true);
  END IF;
END$$;

-- CONTACT SUBMISSIONS
create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null,
  inquiry_type text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.contact_submissions enable row level security;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='contact_submissions' AND policyname='Anyone can submit contact form'
  ) THEN
    CREATE POLICY "Anyone can submit contact form"
      ON public.contact_submissions FOR INSERT TO public
      WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='contact_submissions' AND policyname='Authenticated users can read contact submissions'
  ) THEN
    CREATE POLICY "Authenticated users can read contact submissions"
      ON public.contact_submissions FOR SELECT TO authenticated
      USING (true);
  END IF;
END$$;

-- JOB LISTINGS
create table if not exists public.job_listings (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  company text not null,
  location text not null,
  salary_range text,
  description text not null,
  employment_type text not null default 'full-time',
  requirements text,
  benefits text,
  employer_id uuid references auth.users(id) on delete set null,
  is_active boolean not null default true,
  is_demo boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.job_listings enable row level security;
create index if not exists idx_job_listings_active_created on public.job_listings (is_active, created_at desc);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='job_listings' AND policyname='Public can view active jobs'
  ) THEN
    CREATE POLICY "Public can view active jobs"
      ON public.job_listings FOR SELECT TO public
      USING (is_active = true);
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='job_listings' AND policyname='Employers can create their own jobs'
  ) THEN
    CREATE POLICY "Employers can create their own jobs"
      ON public.job_listings FOR INSERT TO authenticated
      WITH CHECK (employer_id = auth.uid());
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='job_listings' AND policyname='Employers can update their own jobs'
  ) THEN
    CREATE POLICY "Employers can update their own jobs"
      ON public.job_listings FOR UPDATE TO authenticated
      USING (employer_id = auth.uid());
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='job_listings' AND policyname='Employers can delete their own jobs'
  ) THEN
    CREATE POLICY "Employers can delete their own jobs"
      ON public.job_listings FOR DELETE TO authenticated
      USING (employer_id = auth.uid());
  END IF;
END$$;

DROP TRIGGER IF EXISTS update_job_listings_updated_at ON public.job_listings;
CREATE TRIGGER update_job_listings_updated_at
BEFORE UPDATE ON public.job_listings
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- HOUSING LISTINGS
create table if not exists public.housing_listings (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  address text not null,
  rent_amount integer not null,
  bedrooms integer not null,
  bathrooms integer not null default 1,
  square_feet integer,
  description text not null,
  amenities text,
  pet_friendly boolean not null default false,
  utilities_included boolean not null default false,
  landlord_id uuid references auth.users(id) on delete set null,
  is_active boolean not null default true,
  is_demo boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.housing_listings enable row level security;
create index if not exists idx_housing_listings_active_created on public.housing_listings (is_active, created_at desc);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='housing_listings' AND policyname='Public can view active housing'
  ) THEN
    CREATE POLICY "Public can view active housing"
      ON public.housing_listings FOR SELECT TO public
      USING (is_active = true);
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='housing_listings' AND policyname='Landlords can create their own housing'
  ) THEN
    CREATE POLICY "Landlords can create their own housing"
      ON public.housing_listings FOR INSERT TO authenticated
      WITH CHECK (landlord_id = auth.uid());
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='housing_listings' AND policyname='Landlords can update their own housing'
  ) THEN
    CREATE POLICY "Landlords can update their own housing"
      ON public.housing_listings FOR UPDATE TO authenticated
      USING (landlord_id = auth.uid());
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='housing_listings' AND policyname='Landlords can delete their own housing'
  ) THEN
    CREATE POLICY "Landlords can delete their own housing"
      ON public.housing_listings FOR DELETE TO authenticated
      USING (landlord_id = auth.uid());
  END IF;
END$$;

DROP TRIGGER IF EXISTS update_housing_listings_updated_at ON public.housing_listings;
CREATE TRIGGER update_housing_listings_updated_at
BEFORE UPDATE ON public.housing_listings
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();