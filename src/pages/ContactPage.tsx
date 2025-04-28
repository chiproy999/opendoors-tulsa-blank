
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/common/Hero';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    inquiryType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, inquiryType: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Mock form submission
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'Message Sent!',
        description: 'We\'ll get back to you as soon as possible.',
      });
      
      setFormData({
        name: '',
        email: '',
        subject: '',
        inquiryType: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was a problem sending your message. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-700 mb-1">
                  Inquiry Type
                </label>
                <Select value={formData.inquiryType} onValueChange={handleSelectChange}>
                  <SelectTrigger id="inquiryType">
                    <SelectValue placeholder="Select inquiry type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Question</SelectItem>
                    <SelectItem value="employer">Employer Interest</SelectItem>
                    <SelectItem value="housing">Housing Provider Interest</SelectItem>
                    <SelectItem value="jobseeker">Job Seeker Support</SelectItem>
                    <SelectItem value="tenant">Housing Seeker Support</SelectItem>
                    <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="resize-none"
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-tulsa-blue hover:bg-tulsa-blue-600"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
