-- 1) Create auth.users trigger to auto-create profiles if missing
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_trigger
    WHERE tgname = 'on_auth_user_created'
  ) THEN
    CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE PROCEDURE public.handle_new_user();
  END IF;
END
$$;

-- 2) Seed demo job listings if table is empty
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.job_listings) THEN
    INSERT INTO public.job_listings
      (title, company, location, description, employment_type, salary_range, requirements, benefits, is_active, is_demo)
    VALUES
      (
        'Warehouse Associate',
        'Tulsa Goods Co.',
        'Tulsa, OK',
        'Assist with receiving, stocking, and fulfilling orders in a fast-paced warehouse environment committed to fair chance hiring.',
        'full-time',
        '$15-$18/hr',
        'Ability to lift 50 lbs; basic computer skills; reliable transportation',
        'Health, dental, PTO, on-the-job training',
        true,
        true
      ),
      (
        'Restaurant Line Cook',
        'Riverfront Grill',
        'Tulsa, OK',
        'Prepare menu items to spec, maintain a clean station, and support the kitchen team. Employer proudly supports second-chance employment.',
        'full-time',
        '$14-$17/hr + tips',
        'Food handler permit (or ability to obtain), 1+ year kitchen experience preferred',
        'Shift meals, flexible scheduling, advancement opportunities',
        true,
        true
      ),
      (
        'Customer Support Specialist',
        'Heartland Services',
        'Remote (OK/TX/KS)',
        'Provide compassionate phone and email support to customers. Comprehensive training provided and background-friendly hiring.',
        'part-time',
        '$18-$22/hr',
        'Comfort with computers and clear communication; bilingual a plus',
        'Remote work stipend, paid training',
        true,
        true
      );
  END IF;
END
$$;

-- 3) Seed demo housing listings if table is empty
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.housing_listings) THEN
    INSERT INTO public.housing_listings
      (title, address, description, rent_amount, bedrooms, bathrooms, square_feet, amenities, pet_friendly, utilities_included, is_active, is_demo)
    VALUES
      (
        'Cozy 1BR near Downtown',
        '123 N Greenwood Ave, Tulsa, OK',
        'Updated 1-bedroom apartment close to transit and jobs. Background-friendly landlord with simple application process.',
        900,
        1,
        1,
        650,
        'On-site laundry, gated parking',
        true,
        false,
        true,
        true
      ),
      (
        'Spacious 2BR with Balcony',
        '742 E Archer St, Tulsa, OK',
        'Bright 2-bedroom unit with balcony and community gym. Welcomes second-chance renters with steady income.',
        1200,
        2,
        1,
        900,
        'Gym, playground, balcony',
        true,
        true,
        true,
        true
      );
  END IF;
END
$$;