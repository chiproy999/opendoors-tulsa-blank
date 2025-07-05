
import Layout from '@/components/layout/Layout';
import Hero from '@/components/common/Hero';
import NewsletterPopup from '@/components/common/NewsletterPopup';
import HowItWorks from '@/components/home/HowItWorks';
import OpportunitiesCallout from '@/components/home/OpportunitiesCallout';
import AboutSection from '@/components/home/AboutSection';
import ContactSection from '@/components/home/ContactSection';
import FAQSection from '@/components/common/FAQSection';
import EnhancedSEOMeta from '@/components/seo/EnhancedSEOMeta';
import StructuredData from '@/components/seo/StructuredData';

// SEO metadata optimized for AI search
const metaDescription = "Open Doors Tulsa helps individuals with conviction histories find second-chance-friendly jobs and housing in Tulsa, Oklahoma. Connect with employers and landlords who believe in fair chance hiring and housing practices.";
const metaKeywords = "second chance jobs Tulsa, fair chance hiring Oklahoma, reentry employment, conviction history jobs, second chance housing Tulsa, fair chance landlords, Tulsa reentry programs, employment after incarceration, housing after prison, Oklahoma second chance, Tulsa job placement, reentry support services";

// FAQ data optimized for conversational AI queries
const homepageFAQs = [
  {
    id: "what-is-open-doors-tulsa",
    question: "What is Open Doors Tulsa?",
    answer: "Open Doors Tulsa is a platform that connects individuals with conviction histories to second-chance-friendly employers and landlords in the Tulsa area. We help break down barriers to employment and housing for people seeking a fresh start."
  },
  {
    id: "who-can-use-service",
    question: "Who can use this service?",
    answer: "Anyone with an arrest or conviction history who is looking for employment or housing in the Tulsa area. We also work with employers and landlords who want to practice fair chance hiring and housing policies."
  },
  {
    id: "cost-to-use",
    question: "How much does it cost to use Open Doors Tulsa?",
    answer: "Our services are completely free for job seekers and housing seekers. We believe everyone deserves access to opportunities regardless of their financial situation."
  },
  {
    id: "how-to-get-started",
    question: "How do I get started finding a job or housing?",
    answer: "Simply browse our job listings or housing options. You can also contact us directly for personalized assistance in your search.",
    links: [
      { text: "job listings", href: "/jobs" },
      { text: "housing options", href: "/housing" }
    ]
  },
  {
    id: "types-of-jobs",
    question: "What types of jobs are available?",
    answer: "We feature a wide range of positions including warehouse work, customer service, food service, administrative roles, manufacturing, delivery, and more. All listings are from employers committed to fair chance hiring practices."
  },
  {
    id: "employers-landlords-join",
    question: "How can employers and landlords get involved?",
    answer: "Employers and landlords can register with us to post job openings or housing listings. We help you connect with motivated individuals ready to contribute to your business or be reliable tenants.",
    links: [
      { text: "register with us", href: "/auth/register?type=provider" }
    ]
  }
];

// Structured data for local business
const localBusinessData = {
  name: "Open Doors Tulsa",
  description: "Connecting individuals with conviction histories to second-chance-friendly jobs and housing opportunities in Tulsa, Oklahoma.",
  address: {
    street: "123 Main Street, Suite 456",
    city: "Tulsa",
    state: "OK",
    postalCode: "74103"
  },
  phone: "(918) 555-1234",
  email: "info@opendoorstulsa.com",
  url: "https://opendoorstulsa.com",
  serviceArea: ["Tulsa", "Broken Arrow", "Sand Springs", "Sapulpa", "Bixby", "Jenks", "Owasso"],
  services: [
    "Second Chance Job Placement",
    "Fair Chance Housing Assistance", 
    "Reentry Support Services",
    "Employer Partnership Programs",
    "Landlord Partnership Programs"
  ]
};

const Index = () => {
  return (
    <Layout>
      <EnhancedSEOMeta 
        title="Open Doors Tulsa | Second Chance Jobs & Housing in Tulsa, Oklahoma"
        description={metaDescription}
        keywords={metaKeywords}
        canonicalUrl="https://opendoorstulsa.com"
        ogType="website"
        locale="en_US"
      />
      
      <StructuredData 
        type="LocalBusiness" 
        localBusiness={localBusinessData}
      />
      
      <StructuredData 
        type="WebSite" 
        websiteUrl="https://opendoorstulsa.com"
      />
      
      <StructuredData 
        type="Organization" 
        organizationName="Open Doors Tulsa"
        websiteUrl="https://opendoorstulsa.com"
      />
      
      <Hero
        title="Open Doors to New Opportunities"
        subtitle="Connecting individuals with conviction histories to second-chance-friendly jobs and housing in Tulsa."
        primaryCTA={{ text: "Jobs", link: "/jobs" }}
        secondaryCTA={{ text: "Housing", link: "/housing" }}
        businessCTA={{ text: "Business Owner or Landlord? Sign up now & get listed", link: "/auth/register?type=provider" }}
      />
      
      <HowItWorks />
      <OpportunitiesCallout />
      <AboutSection />
      
      <FAQSection 
        faqs={homepageFAQs}
        subtitle="Get answers to common questions about our services and how we can help you find opportunities in Tulsa."
        className="bg-gray-50 dark:bg-gray-900"
      />
      
      <ContactSection />
      
      <NewsletterPopup />
    </Layout>
  );
};

export default Index;
