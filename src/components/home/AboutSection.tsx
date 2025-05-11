
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const AboutSection = () => {
  return (
    <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">About Me</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">My Story</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              As a former inmate who has successfully rebuilt my life, I know firsthand the challenges that individuals with conviction histories face when seeking employment and housing.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              I created Tulsa Open Doors to help others like me who are looking for a second chance. Thanks to the support I received during my reintegration, I'm now able to give back and create pathways for others to rebuild their lives.
            </p>
            <Link to="/about">
              <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white dark:text-red-400 dark:border-red-400 dark:hover:bg-red-500 dark:hover:text-white">
                Learn More About My Journey
              </Button>
            </Link>
          </div>
          
          <div className="rounded-lg overflow-hidden shadow-lg bg-gray-100 dark:bg-gray-800 p-8">
            <div className="flex flex-col items-center justify-center h-full">
              <div className="bg-red-600 text-white p-4 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Personal Experience</h4>
              <p className="text-center text-gray-600 dark:text-gray-300">
                Altruism, genuine concern for the well-being of others
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
