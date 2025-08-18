
import Layout from '@/components/layout/Layout';
import Hero from '@/components/common/Hero';
import { ContactForm } from '@/components/forms/ContactForm';

const ContactPage = () => {

  return (
    <Layout>
      <Hero
        title="Contact Us"
        subtitle="Have questions or need assistance? We're here to help."
      />
      
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold text-tulsa-blue-700 mb-6">Get in Touch</h2>
            <p className="text-lg text-gray-700 mb-8">
              Whether you're a job seeker, employer, housing provider, or simply interested in our mission, we'd love to hear from you.
            </p>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Office Location</h3>
                <p className="text-gray-700">
                  123 Main Street<br />
                  Suite 456<br />
                  Tulsa, OK 74103
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Contact Information</h3>
                <p className="text-gray-700">
                  <strong>General Inquiries:</strong> info@tulsaopendoors.org<br />
                  <strong>Employer Partnerships:</strong> employers@tulsaopendoors.org<br />
                  <strong>Housing Providers:</strong> housing@tulsaopendoors.org<br />
                  <strong>Phone:</strong> (918) 555-1234
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Hours of Operation</h3>
                <p className="text-gray-700">
                  Monday - Friday: 9:00 AM - 5:00 PM<br />
                  Saturday: By appointment<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <ContactForm />
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
