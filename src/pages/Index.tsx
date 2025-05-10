
import { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/common/Hero';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import NewsletterSignup from '@/components/common/NewsletterSignup';
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
        backgroundImage="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=1920&q=80"
      />
      
      {/* Newsletter Section - Positioned above How It Works */}
      <section id="newsletter" className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Stay Updated</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Get the latest opportunities, resources, and news delivered right to your inbox.
          </p>
          <NewsletterSignup />
        </div>
      </section>
      
      {/* How It Works Section - Redesigned */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* For Job Seekers */}
            <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105">
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600)" }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>
              <div className="p-6 relative -mt-10 bg-white dark:bg-gray-800 rounded-t-3xl">
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">For Job Seekers</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Browse job listings from employers who are committed to fair chance hiring practices.</p>
                <Link to="/jobs">
                  <Button className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 w-full">
                    Jobs
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* For Housing Seekers */}
            <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105">
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=600)" }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>
              <div className="p-6 relative -mt-10 bg-white dark:bg-gray-800 rounded-t-3xl">
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">For Housing Seekers</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Discover housing options from landlords who offer fair consideration regardless of conviction history.</p>
                <Link to="/housing">
                  <Button className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 w-full">
                    Housing
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* For Employers & Landlords */}
            <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105">
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=600)" }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>
              <div className="p-6 relative -mt-10 bg-white dark:bg-gray-800 rounded-t-3xl">
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">For Employers & Landlords</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Post opportunities and connect with qualified candidates seeking a second chance.</p>
                <Link to="/auth/register">
                  <Button className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 w-full">
                    Post a Listing
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Employer/Landlord Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-700 to-purple-900 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Employer or Landlord?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join our network of second-chance-friendly businesses and property owners making a difference in Tulsa.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/auth/register?type=employer">
              <Button className="bg-white text-purple-700 hover:bg-gray-100 px-8 py-3 text-lg">
                I'm an Employer
              </Button>
            </Link>
            <Link to="/auth/register?type=landlord">
              <Button className="bg-purple-500 hover:bg-purple-600 px-8 py-3 text-lg">
                I'm a Landlord
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
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&w=800&q=80" 
                alt="Person transitioning from prison" 
                className="w-full h-auto"
              />
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">My Story</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                As a former inmate who has successfully rebuilt my life, I know firsthand the challenges that individuals with conviction histories face when seeking employment and housing.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                I created Tulsa Open Doors to help others like me who are looking for a second chance. Thanks to the support I received during my reintegration, I'm now able to give back and create pathways for others to rebuild their lives.
              </p>
              <Link to="/about">
                <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white dark:text-purple-400 dark:border-purple-400 dark:hover:bg-purple-500 dark:hover:text-white">
                  Learn More About My Journey
                </Button>
              </Link>
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
                <img 
                  src="https://images.unsplash.com/photo-1551721434-8b94ddff0e6d?auto=format&fit=crop&w=600&q=80" 
                  alt="Tulsa skyline" 
                  className="w-full h-auto rounded-md mb-4"
                />
                <p className="text-gray-600 dark:text-gray-300">
                  <strong>Office Hours:</strong> Monday-Friday, 9am-5pm CT
                </p>
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                  placeholder="Your message"
                ></textarea>
              </div>
              <Button className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600">
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
