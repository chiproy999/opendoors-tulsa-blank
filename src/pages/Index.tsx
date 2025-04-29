
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
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* For Job Seekers */}
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 dark:bg-blue-500 text-white text-xl font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3 dark:text-white">For Job Seekers</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Browse job listings from employers who are committed to fair chance hiring practices.</p>
              <Link to="/jobs">
                <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                  Find Jobs
                </Button>
              </Link>
            </div>
            
            {/* For Housing Seekers */}
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 dark:bg-blue-500 text-white text-xl font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3 dark:text-white">For Housing Seekers</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Discover housing options from landlords who offer fair consideration regardless of conviction history.</p>
              <Link to="/housing">
                <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                  Find Housing
                </Button>
              </Link>
            </div>
            
            {/* For Employers & Landlords */}
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 dark:bg-blue-500 text-white text-xl font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3 dark:text-white">For Employers & Landlords</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Post opportunities and connect with qualified candidates seeking a second chance.</p>
              <Link to="/auth/register">
                <Button className="bg-orange-500 hover:bg-orange-600 dark:bg-orange-500 dark:hover:bg-orange-600">
                  Post a Listing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <NewsletterSignup />
    </Layout>
  );
};

export default Index;
