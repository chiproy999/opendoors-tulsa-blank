
import Layout from '@/components/layout/Layout';
import Hero from '@/components/common/Hero';
import NewsletterPopup from '@/components/common/NewsletterPopup';
import HowItWorks from '@/components/home/HowItWorks';
import OpportunitiesCallout from '@/components/home/OpportunitiesCallout';
import AboutSection from '@/components/home/AboutSection';
import ContactSection from '@/components/home/ContactSection';
import SEOMeta from '@/components/home/SEOMeta';

// SEO metadata
const metaDescription = "Tulsa Open Doors connects individuals with conviction histories to second-chance-friendly jobs and housing opportunities in Tulsa.";
const metaKeywords = "second chance hiring, fair chance housing, Tulsa jobs, reentry, conviction history, employment opportunities, housing opportunities, second chance, reentry programs";

const Index = () => {
  return (
    <Layout>
      <SEOMeta 
        title="Tulsa Open Doors | Second Chance Jobs & Housing"
        description={metaDescription}
        keywords={metaKeywords}
      />
      
      <Hero
        title="Open Doors to New Opportunities"
        subtitle="Connecting individuals with conviction histories to second-chance-friendly jobs and housing in Tulsa."
        primaryCTA={{ text: "Jobs", link: "/jobs" }}
        secondaryCTA={{ text: "Housing", link: "/housing" }}
      />
      
      <HowItWorks />
      <OpportunitiesCallout />
      <AboutSection />
      <ContactSection />
      
      <NewsletterPopup />
    </Layout>
  );
};

export default Index;
