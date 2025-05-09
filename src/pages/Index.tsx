
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

      {/* Newsletter Section - Repositioned above How It Works */}
      <section id="newsletter" className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Stay Updated</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Get the latest opportunities, resources, and news delivered right to your inbox.
          </p>
          <NewsletterSignup />
        </div>
      </section>
      
      {/* How It Works Section - Redesigned */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* For Job Seekers */}
            <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105">
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=600)" }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>
              <div className="p-6 relative -mt-10 bg-white dark:bg-gray-800 rounded-t-3xl">
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">For Job Seekers</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Browse job listings from employers who are committed to fair chance hiring practices.</p>
                <Link to="/jobs">
                  <Button className="bg-tulsa-blue hover:bg-tulsa-blue-700 dark:bg-tulsa-blue-600 dark:hover:bg-tulsa-blue-700 w-full">
                    Find Jobs
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* For Housing Seekers */}
            <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105">
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600)" }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>
              <div className="p-6 relative -mt-10 bg-white dark:bg-gray-800 rounded-t-3xl">
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">For Housing Seekers</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Discover housing options from landlords who offer fair consideration regardless of conviction history.</p>
                <Link to="/housing">
                  <Button className="bg-tulsa-blue hover:bg-tulsa-blue-700 dark:bg-tulsa-blue-600 dark:hover:bg-tulsa-blue-700 w-full">
                    Find Housing
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* For Employers & Landlords */}
            <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105">
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=600)" }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>
              <div className="p-6 relative -mt-10 bg-white dark:bg-gray-800 rounded-t-3xl">
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">For Employers & Landlords</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Post opportunities and connect with qualified candidates seeking a second chance.</p>
                <Link to="/auth/register">
                  <Button className="bg-tulsa-orange hover:bg-tulsa-orange-600 dark:bg-tulsa-orange-500 dark:hover:bg-tulsa-orange-600 w-full">
                    Post a Listing
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Employer/Landlord Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-tulsa-blue-700 to-tulsa-blue-900 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Employer or Landlord?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join our network of second-chance-friendly businesses and property owners making a difference in Tulsa.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/auth/register?type=employer">
              <Button className="bg-white text-tulsa-blue-700 hover:bg-gray-100 px-8 py-3 text-lg">
                I'm an Employer
              </Button>
            </Link>
            <Link to="/auth/register?type=landlord">
              <Button className="bg-tulsa-orange hover:bg-tulsa-orange-600 px-8 py-3 text-lg">
                I'm a Landlord
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">About Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&w=800&q=80" 
                alt="Tulsa Open Doors team" 
                className="w-full h-auto"
              />
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Our Mission</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Tulsa Open Doors is dedicated to breaking down barriers to employment and housing for individuals with conviction histories. We believe everyone deserves a second chance and the opportunity to rebuild their lives.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Our platform connects job seekers and housing seekers with employers and landlords who are committed to fair chance practices, creating pathways to stability and success for all Tulsans.
              </p>
              <Link to="/about">
                <Button variant="outline" className="border-tulsa-blue text-tulsa-blue hover:bg-tulsa-blue hover:text-white">
                  Learn More About Us
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
                Have questions or need assistance? We're here to help! Fill out the form and our team will get back to you as soon as possible.
              </p>
              <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1551721434-8b94ddff0e6d?auto=format&fit=crop&w=600&q=80" 
                  alt="Tulsa skyline" 
                  className="w-full h-auto rounded-md mb-4"
                />
                <p className="text-gray-600 dark:text-gray-300 mb-1">
                  <strong>Email:</strong> info@tulsaopendoors.org
                </p>
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-tulsa-blue-500 focus:border-tulsa-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-tulsa-blue-500 focus:border-tulsa-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-tulsa-blue-500 focus:border-tulsa-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                  placeholder="Your message"
                ></textarea>
              </div>
              <Button className="w-full bg-tulsa-blue hover:bg-tulsa-blue-700">
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
