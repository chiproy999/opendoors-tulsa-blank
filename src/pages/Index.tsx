
import { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/common/Hero';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import NewsletterPopup from '@/components/common/NewsletterPopup';

// SEO metadata
const metaDescription = "Tulsa Open Doors connects individuals with conviction histories to second-chance-friendly jobs and housing opportunities in Tulsa.";
const metaKeywords = "second chance hiring, fair chance housing, Tulsa jobs, reentry, conviction history, employment opportunities, housing opportunities, second chance, reentry programs";

const Index = () => {
  useEffect(() => {
    document.title = "Tulsa Open Doors | Second Chance Jobs & Housing";
    
    // Add meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', metaDescription);
    
    // Add meta keywords
    let metaKeys = document.querySelector('meta[name="keywords"]');
    if (!metaKeys) {
      metaKeys = document.createElement('meta');
      metaKeys.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeys);
    }
    metaKeys.setAttribute('content', metaKeywords);
  }, []);

  return (
    <Layout>
      <Hero
        title="Open Doors to New Opportunities"
        subtitle="Connecting individuals with conviction histories to second-chance-friendly jobs and housing in Tulsa."
        primaryCTA={{ text: "Jobs", link: "/jobs" }}
        secondaryCTA={{ text: "Housing", link: "/housing" }}
      />
      
      {/* How It Works Section - Redesigned with equal height cards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* For Job Seekers */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden h-full flex flex-col">
              <div className="p-6 flex-grow">
                <h3 className="text-xl font-semibold mb-3 text-red-600 dark:text-red-400">For Job Seekers</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Browse job listings from employers who are committed to fair chance hiring practices.</p>
              </div>
              <div className="p-6 pt-0 mt-auto">
                <Link to="/jobs">
                  <Button className="bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 w-full">
                    Jobs
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* For Housing Seekers */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden h-full flex flex-col">
              <div className="p-6 flex-grow">
                <h3 className="text-xl font-semibold mb-3 text-red-600 dark:text-red-400">Apartments/Houses for Rent</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Discover housing options from landlords who offer fair consideration regardless of conviction history.</p>
              </div>
              <div className="p-6 pt-0 mt-auto">
                <Link to="/housing">
                  <Button className="bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 w-full">
                    Housing
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* For Employers & Landlords */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden h-full flex flex-col">
              <div className="p-6 flex-grow">
                <h3 className="text-xl font-semibold mb-3 text-red-600 dark:text-red-400">For Employers & Landlords</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Post opportunities and connect with qualified candidates seeking a second chance.</p>
              </div>
              <div className="p-6 pt-0 mt-auto">
                <Link to="/auth/register">
                  <Button className="bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 w-full">
                    Post a Listing
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Employer/Landlord Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-700 to-red-900 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Employer or Landlord?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join our network of second-chance-friendly businesses and property owners making a difference in Tulsa.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
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
      </section>

      {/* Sign In/Sign Up Section */}
      <section className="py-12 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Join Our Community</h3>
          <p className="mb-8 text-gray-600 dark:text-gray-300">
            Already have an account or need to create one? Access your personalized dashboard.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/auth/login">
              <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
                Sign In
              </Button>
            </Link>
            <Link to="/auth/register">
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* About Section */}
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
                  From incarceration to creating opportunities for others, my journey fuels this mission.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">Contact Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Get In Touch</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Have questions or need assistance? I'm here to help! Fill out the form and I'll get back to you as soon as possible.
              </p>
              <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                <div className="w-full h-40 bg-gray-200 dark:bg-gray-600 rounded-md mb-4 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 dark:text-gray-500">
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                    <circle cx="9" cy="9" r="2"></circle>
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                  </svg>
                </div>
              </div>
            </div>
            
            <form className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                  placeholder="Your name"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                  placeholder="Your email"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                  placeholder="Your message"
                ></textarea>
              </div>
              <Button className="w-full bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>
      
      <NewsletterPopup />
    </Layout>
  );
};

export default Index;
