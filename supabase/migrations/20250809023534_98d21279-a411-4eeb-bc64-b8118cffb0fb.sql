-- Enable necessary extension for UUID generation
create extension if not exists pgcrypto;

-- Utility function to auto-update updated_at columns
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Profiles table (keyed by user_id from auth.users)
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

create policy "Users can view their own profile"
  on public.profiles for select to authenticated
  using (auth.uid() = user_id);

create policy "Users can insert their own profile"
  on public.profiles for insert to authenticated
  with check (auth.uid() = user_id);

create policy "Users can update their own profile"
  on public.profiles for update to authenticated
  using (auth.uid() = user_id);

create trigger update_profiles_updated_at
before update on public.profiles
for each row execute function public.update_updated_at_column();

-- Auto-create profile on user signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (user_id, username)
  values (new.id, coalesce(new.raw_user_meta_data->> 'first_name', split_part(new.email, '@', 1)));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Newsletter subscriptions
create table if not exists public.newsletter_subscriptions (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamptz not null default now()
);

alter table public.newsletter_subscriptions enable row level security;

create policy "Anyone can subscribe to newsletter"
  on public.newsletter_subscriptions for insert to public
  with check (true);

create policy "Authenticated users can read newsletter subscriptions"
  on public.newsletter_subscriptions for select to authenticated
  using (true);

-- Contact form submissions
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

create policy "Anyone can submit contact form"
  on public.contact_submissions for insert to public
  with check (true);

create policy "Authenticated users can read contact submissions"
  on public.contact_submissions for select to authenticated
  using (true);

-- Job listings
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

create policy "Public can view active jobs"
  on public.job_listings for select to public
  using (is_active = true);

create policy "Employers can create their own jobs"
  on public.job_listings for insert to authenticated
  with check (employer_id = auth.uid());

create policy "Employers can update their own jobs"
  on public.job_listings for update to authenticated
  using (employer_id = auth.uid());

create policy "Employers can delete their own jobs"
  on public.job_listings for delete to authenticated
  using (employer_id = auth.uid());

create trigger update_job_listings_updated_at
before update on public.job_listings
for each row execute function public.update_updated_at_column();

-- Housing listings
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

create policy "Public can view active housing"
  on public.housing_listings for select to public
  using (is_active = true);

create policy "Landlords can create their own housing"
  on public.housing_listings for insert to authenticated
  with check (landlord_id = auth.uid());

create policy "Landlords can update their own housing"
  on public.housing_listings for update to authenticated
  using (landlord_id = auth.uid());

create policy "Landlords can delete their own housing"
  on public.housing_listings for delete to authenticated
  using (landlord_id = auth.uid());

create trigger update_housing_listings_updated_at
before update on public.housing_listings
for each row execute function public.update_updated_at_column();