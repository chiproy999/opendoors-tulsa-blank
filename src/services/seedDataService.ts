import { supabase } from '@/integrations/supabase/client';
import { JobData, HousingData } from '@/types';

export class SeedDataService {
  static async seedJobs(): Promise<void> {
    // Get current user for employer_id
    const { data: { user } } = await supabase.auth.getUser();
    const employerId = user?.id || 'seed-user';

    const sampleJobs = [
      {
        title: "Warehouse Associate",
        company: "Second Chance Logistics",
        location: "Tulsa, OK",
        description: "We believe in giving everyone a chance to rebuild their life through meaningful work. Join our warehouse team and grow with us.",
        salary_range: "$15-18/hour",
        employment_type: "Full-time",
        requirements: "Ability to lift 50lbs, basic math skills, reliable transportation",
        benefits: "Health insurance, paid time off, advancement opportunities",
        employer_id: employerId,
        is_active: true,
        is_demo: true
      },
      {
        title: "Customer Service Representative",
        company: "Fresh Start Call Center",
        location: "Tulsa, OK", 
        description: "Help customers while building valuable communication skills. We provide comprehensive training and support your success.",
        salary_range: "$14-16/hour",
        employment_type: "Full-time",
        requirements: "High school diploma, good communication skills, computer literacy",
        benefits: "Medical, dental, vision, 401k matching",
        employer_id: employerId,
        is_active: true,
        is_demo: true
      },
      {
        title: "Kitchen Staff",
        company: "New Beginnings Restaurant",
        location: "Tulsa, OK",
        description: "Learn culinary skills in a supportive environment. We value hard work and dedication over past mistakes.",
        salary_range: "$13-15/hour",
        employment_type: "Part-time",
        requirements: "Food handler's permit (we'll help you get it), punctuality, teamwork",
        benefits: "Flexible scheduling, meal discounts, skill training",
        employer_id: employerId,
        is_active: true,
        is_demo: true
      },
      {
        title: "Construction Laborer",
        company: "Rebuild Construction Co.",
        location: "Tulsa, OK",
        description: "Build your future while building our community. Entry-level position with room for growth and skill development.",
        salary_range: "$16-20/hour",
        employment_type: "Full-time",
        requirements: "Physical fitness, willingness to learn, safety-conscious",
        benefits: "Health insurance, tools provided, apprenticeship opportunities",
        employer_id: employerId,
        is_active: true,
        is_demo: true
      },
      {
        title: "Retail Sales Associate",
        company: "Hope Thrift Store",
        location: "Tulsa, OK",
        description: "Friendly retail environment focused on community service. Perfect for building customer service experience.",
        salary_range: "$12-14/hour",
        employment_type: "Part-time",
        requirements: "Customer service attitude, basic cash handling, retail experience preferred",
        benefits: "Employee discounts, flexible hours, community impact",
        employer_id: employerId,
        is_active: true,
        is_demo: true
      },
      {
        title: "Delivery Driver",
        company: "Second Mile Delivery",
        location: "Tulsa, OK",
        description: "Independent delivery routes with competitive pay. We focus on reliability and customer service.",
        salary_range: "$17-22/hour",
        employment_type: "Full-time",
        requirements: "Valid driver's license, clean driving record (3+ years), own vehicle",
        benefits: "Gas allowance, phone stipend, performance bonuses",
        employer_id: employerId,
        is_active: true,
        is_demo: true
      }
    ];

    try {
      const { error } = await supabase
        .from('job_listings')
        .insert(sampleJobs);
      
      if (error) throw error;
      console.log('Sample jobs seeded successfully');
    } catch (error) {
      console.error('Error seeding jobs:', error);
    }
  }

  static async seedHousing(): Promise<void> {
    // Get current user for landlord_id
    const { data: { user } } = await supabase.auth.getUser();
    const landlordId = user?.id || 'seed-user';

    const sampleHousing = [
      {
        title: "Affordable 2BR Apartment",
        address: "1234 Hope Street, Tulsa, OK 74120",
        description: "Clean, affordable housing in a safe neighborhood. We believe everyone deserves a stable home regardless of their past.",
        rent_amount: 650,
        bedrooms: 2,
        bathrooms: 1,
        square_feet: 850,
        amenities: "Laundry hookups, parking, near bus line",
        pet_friendly: true,
        utilities_included: false,
        landlord_id: landlordId,
        is_active: true,
        is_demo: true
      },
      {
        title: "Studio Apartment - Downtown",
        address: "567 Second Chance Ave, Tulsa, OK 74103",
        description: "Compact studio perfect for individuals starting fresh. Walking distance to employment opportunities downtown.",
        rent_amount: 450,
        bedrooms: 0,
        bathrooms: 1,
        square_feet: 400,
        amenities: "All utilities included, security building, downtown location",
        pet_friendly: false,
        utilities_included: true,
        landlord_id: landlordId,
        is_active: true,
        is_demo: true
      },
      {
        title: "3BR Family Home",
        address: "890 New Beginning Blvd, Tulsa, OK 74135",
        description: "Spacious family home perfect for those rebuilding their lives. Fenced yard and quiet neighborhood.",
        rent_amount: 950,
        bedrooms: 3,
        bathrooms: 2,
        square_feet: 1200,
        amenities: "Fenced yard, garage, appliances included",
        pet_friendly: true,
        utilities_included: false,
        landlord_id: landlordId,
        is_active: true,
        is_demo: true
      },
      {
        title: "1BR Senior-Friendly Unit", 
        address: "345 Golden Years Dr, Tulsa, OK 74114",
        description: "Ground floor unit designed for seniors and those with mobility needs. Supportive community environment.",
        rent_amount: 525,
        bedrooms: 1,
        bathrooms: 1,
        square_feet: 600,
        amenities: "Wheelchair accessible, senior community center, medical transport",
        pet_friendly: true,
        utilities_included: true,
        landlord_id: landlordId,
        is_active: true,
        is_demo: true
      },
      {
        title: "Shared Housing Program",
        address: "123 Community Way, Tulsa, OK 74108",
        description: "Transitional housing program with support services. Shared common areas, private bedrooms.",
        rent_amount: 300,
        bedrooms: 1,
        bathrooms: 1,
        square_feet: 300,
        amenities: "Case management, job placement assistance, life skills training",
        pet_friendly: false,
        utilities_included: true,
        landlord_id: landlordId,
        is_active: true,
        is_demo: true
      }
    ];

    try {
      const { error } = await supabase
        .from('housing_listings')
        .insert(sampleHousing);
      
      if (error) throw error;
      console.log('Sample housing seeded successfully');
    } catch (error) {
      console.error('Error seeding housing:', error);
    }
  }

  static async seedAllData(): Promise<void> {
    await Promise.all([
      this.seedJobs(),
      this.seedHousing()
    ]);
  }
}