
import Layout from '@/components/layout/Layout';
import Hero from '@/components/common/Hero';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import NewsletterSignup from '@/components/common/NewsletterSignup';

const Index = () => {
  return (
    <Layout>
      <Hero
        title="Open Doors to New Opportunities"
        subtitle="Connecting individuals with conviction histories to second-chance-friendly jobs and housing in Tulsa."
        primaryCTA={{ text: "Find Jobs", link: "/jobs" }}
        secondaryCTA={{ text: "Find Housing", link: "/housing" }}
      />
      
      {/* How It Works Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* For Job Seekers */}
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-tulsa-blue text-white text-xl font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">For Job Seekers</h3>
              <p className="text-gray-600 mb-4">Browse job listings from employers who are committed to fair chance hiring practices.</p>
              <Link to="/jobs">
                <Button className="bg-tulsa-blue hover:bg-tulsa-blue-600">
                  Find Jobs
                </Button>
              </Link>
            </div>
            
            {/* For Housing Seekers */}
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-tulsa-blue text-white text-xl font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">For Housing Seekers</h3>
              <p className="text-gray-600 mb-4">Discover housing options from landlords who offer fair consideration regardless of conviction history.</p>
              <Link to="/housing">
                <Button className="bg-tulsa-blue hover:bg-tulsa-blue-600">
                  Find Housing
                </Button>
              </Link>
            </div>
            
            {/* For Employers & Landlords */}
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-tulsa-blue text-white text-xl font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">For Employers & Landlords</h3>
              <p className="text-gray-600 mb-4">Post opportunities and connect with qualified candidates seeking a second chance.</p>
              <Link to="/auth/register">
                <Button className="bg-tulsa-orange hover:bg-tulsa-orange-600">
                  Post a Listing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Impact Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-tulsa-blue-700 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="text-4xl font-bold mb-2">500+</p>
              <p className="text-xl">Jobs Posted</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">300+</p>
              <p className="text-xl">Housing Listings</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">1000+</p>
              <p className="text-xl">Success Stories</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Success Stories */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <blockquote className="italic text-gray-700 mb-4">
                "Tulsa Open Doors helped me find a job that didn't immediately disqualify me because of my past. I've been employed for over a year now and am building a stable future for my family."
              </blockquote>
              <p className="font-medium">- Michael T., Job Seeker</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <blockquote className="italic text-gray-700 mb-4">
                "As a landlord, this platform has connected me with responsible tenants who simply needed a second chance. The screening process gives me confidence while helping people rebuild their lives."
              </blockquote>
              <p className="font-medium">- Sarah L., Property Owner</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Partner Logos */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Partners</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* These would be replaced with actual partner logos */}
            <div className="h-16 bg-gray-200 rounded flex items-center justify-center">Partner 1</div>
            <div className="h-16 bg-gray-200 rounded flex items-center justify-center">Partner 2</div>
            <div className="h-16 bg-gray-200 rounded flex items-center justify-center">Partner 3</div>
            <div className="h-16 bg-gray-200 rounded flex items-center justify-center">Partner 4</div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <NewsletterSignup />
    </Layout>
  );
};

export default Index;
