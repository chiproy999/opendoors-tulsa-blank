-- Enable required extension for UUID generation
create extension if not exists pgcrypto;

-- Helper function to auto-update updated_at
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- PROFILES TABLE
create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique,
  username text,
  avatar_url text,
  daily_generations_used integer not null default 0,
  total_generations integer not null default 0,
  referred_by text,
  referral_code text not null default substr(gen_random_uuid()::text, 1, 8),
  subscription_tier text not null default 'free',
  stripe_customer_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Profiles policies
create policy if not exists "Profiles are viewable by everyone"
  on public.profiles for select using (true);

create policy if not exists "Users can insert their own profile"
  on public.profiles for insert with check (auth.uid() = user_id);

create policy if not exists "Users can update their own profile"
  on public.profiles for update using (auth.uid() = user_id);

-- Trigger for updated_at on profiles
create or replace trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.update_updated_at_column();

-- NEWSLETTER SUBSCRIPTIONS
create table if not exists public.newsletter_subscriptions (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

alter table public.newsletter_subscriptions enable row level security;

-- Allow anyone to insert (public form)
create policy if not exists "Anyone can subscribe to newsletter"
  on public.newsletter_subscriptions for insert with check (true);

-- Allow public read (needed for counts in UI). Consider restricting later if needed.
create policy if not exists "Newsletter subscriptions selectable by everyone"
  on public.newsletter_subscriptions for select using (true);

-- CONTACT SUBMISSIONS
create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null,
  inquiry_type text,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.contact_submissions enable row level security;

-- Allow anyone to submit contact form
create policy if not exists "Anyone can insert contact submissions"
  on public.contact_submissions for insert with check (true);

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
  employer_id uuid not null,
  is_active boolean not null default true,
  is_demo boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_job_listings_created_at on public.job_listings (created_at desc);
create index if not exists idx_job_listings_is_active on public.job_listings (is_active);

alter table public.job_listings enable row level security;

-- Job listings policies
create policy if not exists "Public can view active jobs"
  on public.job_listings for select using (is_active = true);

create policy if not exists "Employers can insert their jobs"
  on public.job_listings for insert with check (auth.uid() = employer_id);

create policy if not exists "Employers can update their jobs"
  on public.job_listings for update using (auth.uid() = employer_id);

-- Trigger for updated_at on job_listings
create or replace trigger job_listings_set_updated_at
before update on public.job_listings
for each row execute function public.update_updated_at_column();

-- HOUSING LISTINGS
create table if not exists public.housing_listings (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  address text not null,
  rent_amount integer not null,
  bedrooms integer not null default 1,
  bathrooms integer not null default 1,
  square_feet integer,
  description text not null,
  amenities text,
  pet_friendly boolean not null default false,
  utilities_included boolean not null default false,
  landlord_id uuid not null,
  is_active boolean not null default true,
  is_demo boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_housing_listings_created_at on public.housing_listings (created_at desc);
create index if not exists idx_housing_listings_is_active on public.housing_listings (is_active);

alter table public.housing_listings enable row level security;

-- Housing listings policies
create policy if not exists "Public can view active housing"
  on public.housing_listings for select using (is_active = true);

create policy if not exists "Landlords can insert their housing"
  on public.housing_listings for insert with check (auth.uid() = landlord_id);

create policy if not exists "Landlords can update their housing"
  on public.housing_listings for update using (auth.uid() = landlord_id);

-- Trigger for updated_at on housing_listings
create or replace trigger housing_listings_set_updated_at
before update on public.housing_listings
for each row execute function public.update_updated_at_column();