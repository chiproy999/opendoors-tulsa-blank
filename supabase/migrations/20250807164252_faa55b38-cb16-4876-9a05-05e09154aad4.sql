-- Create newsletter_subscriptions table
CREATE TABLE public.newsletter_subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to subscribe
CREATE POLICY "Anyone can subscribe to newsletter" 
ON public.newsletter_subscriptions 
FOR INSERT 
WITH CHECK (true);

-- Create job_listings table
CREATE TABLE public.job_listings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT NOT NULL,
  salary_range TEXT,
  description TEXT NOT NULL,
  employment_type TEXT DEFAULT 'full-time',
  requirements TEXT,
  benefits TEXT,
  employer_id UUID,
  is_active BOOLEAN NOT NULL DEFAULT true,
  is_demo BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.job_listings ENABLE ROW LEVEL SECURITY;

-- Create policies for job listings
CREATE POLICY "Jobs are viewable by everyone" 
ON public.job_listings 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Authenticated users can create jobs" 
ON public.job_listings 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their own jobs" 
ON public.job_listings 
FOR UPDATE 
USING (auth.uid() = employer_id);

-- Create housing_listings table
CREATE TABLE public.housing_listings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  address TEXT NOT NULL,
  rent_amount INTEGER NOT NULL,
  bedrooms INTEGER NOT NULL,
  bathrooms INTEGER DEFAULT 1,
  square_feet INTEGER,
  description TEXT NOT NULL,
  amenities TEXT,
  pet_friendly BOOLEAN DEFAULT false,
  utilities_included BOOLEAN DEFAULT false,
  landlord_id UUID,
  is_active BOOLEAN NOT NULL DEFAULT true,
  is_demo BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.housing_listings ENABLE ROW LEVEL SECURITY;

-- Create policies for housing listings
CREATE POLICY "Housing is viewable by everyone" 
ON public.housing_listings 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Authenticated users can create housing" 
ON public.housing_listings 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their own housing" 
ON public.housing_listings 
FOR UPDATE 
USING (auth.uid() = landlord_id);

-- Create contact_submissions table
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  inquiry_type TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to submit contact forms
CREATE POLICY "Anyone can submit contact forms" 
ON public.contact_submissions 
FOR INSERT 
WITH CHECK (true);

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_job_listings_updated_at
BEFORE UPDATE ON public.job_listings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_housing_listings_updated_at
BEFORE UPDATE ON public.housing_listings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();