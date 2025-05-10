
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const OpportunitiesCallout = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-700 to-red-900 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Employer/Landlord Section */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold mb-6">Employer or Landlord?</h2>
            <p className="text-xl mb-8">
              Join our network of second-chance-friendly businesses and property owners making a difference in Tulsa.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <Link to="/auth/register?type=employer">
                <Button className="bg-white text-red-700 hover:bg-gray-100 px-8 py-3 text-lg">
                  I'm an Employer
                </Button>
              </Link>
              <Link to="/auth/register?type=landlord">
                <Button className="bg-red-500 hover:bg-red-600 px-8 py-3 text-lg">
                  I'm a Landlord
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Job/Housing Seeker Section */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold mb-6">Seeking Opportunities?</h2>
            <p className="text-xl mb-8">
              Looking for job opportunities or housing? Create an account to access your personalized dashboard.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <Link to="/auth/register?type=seeker">
                <Button className="bg-white text-red-700 hover:bg-gray-100 px-8 py-3 text-lg">
                  Sign Up
                </Button>
              </Link>
              <Link to="/auth/login">
                <Button className="bg-red-500 hover:bg-red-600 px-8 py-3 text-lg">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OpportunitiesCallout;
