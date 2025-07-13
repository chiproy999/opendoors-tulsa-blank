import { JobData, SearchFilters, SearchResult } from '@/types';

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

export class JobService {
  static async getAllJobs(): Promise<SearchResult<JobData>> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return {
      data: mockJobs,
      total: mockJobs.length,
      loading: false
    };
  }

  static async searchJobs(filters: SearchFilters): Promise<SearchResult<JobData>> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const filtered = mockJobs.filter(job => {
      const matchesQuery = !filters.query || 
        job.title.toLowerCase().includes(filters.query.toLowerCase()) || 
        job.company.toLowerCase().includes(filters.query.toLowerCase()) ||
        job.description.toLowerCase().includes(filters.query.toLowerCase());
        
      const matchesLocation = !filters.location || 
        job.location.toLowerCase().includes(filters.location.toLowerCase());
        
      return matchesQuery && matchesLocation;
    });
    
    return {
      data: filtered,
      total: filtered.length,
      loading: false
    };
  }

  static async getJobBySlug(slug: string): Promise<JobData | null> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockJobs.find(job => job.slug === slug) || null;
  }

  // Placeholder for future Supabase integration
  static async createJob(jobData: Omit<JobData, 'id' | 'slug' | 'postedAt'>): Promise<JobData> {
    // TODO: Implement Supabase integration
    throw new Error('Not implemented - requires Supabase integration');
  }

  static async updateJob(id: string, jobData: Partial<JobData>): Promise<JobData> {
    // TODO: Implement Supabase integration
    throw new Error('Not implemented - requires Supabase integration');
  }

  static async deleteJob(id: string): Promise<void> {
    // TODO: Implement Supabase integration
    throw new Error('Not implemented - requires Supabase integration');
  }
}