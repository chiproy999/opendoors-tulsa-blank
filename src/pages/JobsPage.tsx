
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/common/Hero';
import JobSearchBar from '@/components/jobs/JobSearchBar';
import JobCard, { JobData } from '@/components/jobs/JobCard';
import { Separator } from '@/components/ui/separator';

// Mock data
const mockJobs: JobData[] = [
  {
    id: '1',
    title: 'Warehouse Associate',
    company: 'Global Distribution Inc.',
    location: 'Tulsa, OK',
    salaryRange: '$15 - $18 per hour',
    description: 'Looking for motivated individuals to join our warehouse team. Duties include picking and packing orders, inventory management, and general warehouse duties.',
    convictionExclusions: [],
    slug: 'warehouse-associate-global-distribution',
    postedAt: '3 days ago'
  },
  {
    id: '2',
    title: 'Customer Service Representative',
    company: 'Tulsa Call Center Solutions',
    location: 'Tulsa, OK',
    salaryRange: '$14 - $16 per hour',
    description: 'Join our growing call center team. We provide full training and opportunities for advancement. Great communication skills required.',
    convictionExclusions: ['violent felonies'],
    slug: 'customer-service-representative-tulsa-call-center',
    postedAt: '5 days ago'
  },
  {
    id: '3',
    title: 'Line Cook',
    company: 'Downtown Grill',
    location: 'Tulsa, OK',
    salaryRange: '$16 - $20 per hour',
    description: 'Experienced line cook needed for busy restaurant. Prepare food to specification, maintain cleanliness and food safety standards.',
    convictionExclusions: [],
    slug: 'line-cook-downtown-grill',
    postedAt: '1 week ago'
  },
  {
    id: '4',
    title: 'Administrative Assistant',
    company: 'Tulsa Legal Services',
    location: 'Tulsa, OK',
    salaryRange: '$17 - $20 per hour',
    description: 'Supporting our legal team with administrative tasks, scheduling, and client communication. Must be detail-oriented and professional.',
    convictionExclusions: ['financial crimes'],
    slug: 'administrative-assistant-tulsa-legal',
    postedAt: '2 weeks ago'
  },
  {
    id: '5',
    title: 'Delivery Driver',
    company: 'Swift Couriers',
    location: 'Tulsa, OK',
    salaryRange: '$16 - $22 per hour',
    description: 'Local delivery driver needed. Must have clean driving record for the past 3 years. Company vehicle provided.',
    convictionExclusions: ['DUI', 'reckless driving'],
    slug: 'delivery-driver-swift-couriers',
    postedAt: '2 days ago'
  },
  {
    id: '6',
    title: 'Manufacturing Technician',
    company: 'Tulsa Industrial Products',
    location: 'Tulsa, OK',
    salaryRange: '$18 - $22 per hour',
    description: 'Entry-level position in manufacturing. Will train the right candidate. Looking for reliable individuals ready to learn and grow with our company.',
    convictionExclusions: [],
    slug: 'manufacturing-technician-tulsa-industrial',
    postedAt: '1 week ago'
  }
];

const JobsPage = () => {
  const [filteredJobs, setFilteredJobs] = useState<JobData[]>(mockJobs);
  
  const handleSearch = (query: string, location: string) => {
    // In a real application, this would be an API call with filters
    const filtered = mockJobs.filter(job => {
      const matchesQuery = !query || 
        job.title.toLowerCase().includes(query.toLowerCase()) || 
        job.company.toLowerCase().includes(query.toLowerCase()) ||
        job.description.toLowerCase().includes(query.toLowerCase());
        
      const matchesLocation = !location || job.location.toLowerCase().includes(location.toLowerCase());
        
      return matchesQuery && matchesLocation;
    });
    
    setFilteredJobs(filtered);
  };
  
  return (
    <Layout>
      <Hero
        title="Find Second-Chance Friendly Jobs"
        subtitle="Browse employment opportunities from employers committed to fair chance hiring in Tulsa."
        backgroundImage="/placeholder.svg"
      />
      
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <JobSearchBar onSearch={handleSearch} />
        
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Available Jobs</h2>
          <p className="text-gray-600 mb-6">
            Showing {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'}
          </p>
          <Separator className="mb-6" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
          
          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-600">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default JobsPage;
