
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const HowItWorks = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">How It Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* For Job Seekers */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden h-full flex flex-col">
            <div className="p-6 flex-grow">
              <h3 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">For Job Seekers</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Browse job listings from employers who are committed to fair chance hiring practices.</p>
            </div>
            <div className="p-6 pt-0 mt-auto">
              <Link to="/jobs">
                <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 w-full">
                  Jobs
                </Button>
              </Link>
            </div>
          </div>
          
          {/* For Housing Seekers */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden h-full flex flex-col">
            <div className="p-6 flex-grow">
              <h3 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">Apts/Houses for Rent</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Discover housing options from landlords who offer fair consideration regardless of conviction history.</p>
            </div>
            <div className="p-6 pt-0 mt-auto">
              <Link to="/housing">
                <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 w-full">
                  Housing
                </Button>
              </Link>
            </div>
          </div>
          
          {/* For Employers & Landlords */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden h-full flex flex-col">
            <div className="p-6 flex-grow">
              <h3 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">For Employers & Landlords</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Post opportunities and connect with qualified candidates seeking a second chance.</p>
            </div>
            <div className="p-6 pt-0 mt-auto">
              <Link to="/auth/register">
                <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 w-full">
                  Post a Listing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
