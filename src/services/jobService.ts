import { JobData, SearchFilters, SearchResult } from '@/types';
import { supabase } from '@/integrations/supabase/client';

export class JobService {
  static async getAllJobs(): Promise<SearchResult<JobData>> {
    try {
      const { data, error, count } = await supabase
        .from('job_listings')
        .select('*', { count: 'exact' })
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const jobs: JobData[] = data.map(job => ({
        id: job.id,
        title: job.title,
        company: job.company,
        location: job.location,
        salaryRange: job.salary_range || '',
        description: job.description,
        employmentType: job.employment_type,
        requirements: job.requirements || '',
        benefits: job.benefits || '',
        convictionExclusions: [], // Can be enhanced later
        slug: job.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        postedAt: new Date(job.created_at).toLocaleDateString()
      }));

      return {
        data: jobs,
        total: count || 0,
        loading: false
      };
    } catch (error) {
      console.error('Error fetching jobs:', error);
      return {
        data: [],
        total: 0,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch jobs'
      };
    }
  }

  static async searchJobs(filters: SearchFilters): Promise<SearchResult<JobData>> {
    try {
      let query = supabase
        .from('job_listings')
        .select('*', { count: 'exact' })
        .eq('is_active', true);

      if (filters.query) {
        query = query.or(`title.ilike.%${filters.query}%,company.ilike.%${filters.query}%,description.ilike.%${filters.query}%`);
      }

      if (filters.location) {
        query = query.ilike('location', `%${filters.location}%`);
      }

      const { data, error, count } = await query.order('created_at', { ascending: false });

      if (error) throw error;

      const jobs: JobData[] = data.map(job => ({
        id: job.id,
        title: job.title,
        company: job.company,
        location: job.location,
        salaryRange: job.salary_range || '',
        description: job.description,
        employmentType: job.employment_type,
        requirements: job.requirements || '',
        benefits: job.benefits || '',
        convictionExclusions: [],
        slug: job.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        postedAt: new Date(job.created_at).toLocaleDateString()
      }));

      return {
        data: jobs,
        total: count || 0,
        loading: false
      };
    } catch (error) {
      console.error('Error searching jobs:', error);
      return {
        data: [],
        total: 0,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to search jobs'
      };
    }
  }

  static async getJobBySlug(slug: string): Promise<JobData | null> {
    try {
      const { data, error } = await supabase
        .from('job_listings')
        .select('*')
        .eq('is_active', true)
        .limit(1);

      if (error) throw error;

      const job = data.find(j => j.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug);
      
      if (!job) return null;

      return {
        id: job.id,
        title: job.title,
        company: job.company,
        location: job.location,
        salaryRange: job.salary_range || '',
        description: job.description,
        employmentType: job.employment_type,
        requirements: job.requirements || '',
        benefits: job.benefits || '',
        convictionExclusions: [],
        slug: job.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        postedAt: new Date(job.created_at).toLocaleDateString()
      };
    } catch (error) {
      console.error('Error fetching job by slug:', error);
      return null;
    }
  }

  static async createJob(jobData: Omit<JobData, 'id' | 'slug' | 'postedAt'>): Promise<JobData> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('job_listings')
        .insert({
          title: jobData.title,
          company: jobData.company,
          location: jobData.location,
          salary_range: jobData.salaryRange,
          description: jobData.description,
          employment_type: jobData.employmentType || 'full-time',
          requirements: jobData.requirements,
          benefits: jobData.benefits,
          employer_id: user.id
        })
        .select()
        .single();

      if (error) throw error;

      return {
        id: data.id,
        title: data.title,
        company: data.company,
        location: data.location,
        salaryRange: data.salary_range || '',
        description: data.description,
        employmentType: data.employment_type,
        requirements: data.requirements || '',
        benefits: data.benefits || '',
        convictionExclusions: [],
        slug: data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        postedAt: new Date(data.created_at).toLocaleDateString()
      };
    } catch (error) {
      console.error('Error creating job:', error);
      throw error;
    }
  }

  static async updateJob(id: string, jobData: Partial<JobData>): Promise<JobData> {
    try {
      const updateData: any = {};
      if (jobData.title) updateData.title = jobData.title;
      if (jobData.company) updateData.company = jobData.company;
      if (jobData.location) updateData.location = jobData.location;
      if (jobData.salaryRange) updateData.salary_range = jobData.salaryRange;
      if (jobData.description) updateData.description = jobData.description;
      if (jobData.employmentType) updateData.employment_type = jobData.employmentType;
      if (jobData.requirements) updateData.requirements = jobData.requirements;
      if (jobData.benefits) updateData.benefits = jobData.benefits;

      const { data, error } = await supabase
        .from('job_listings')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return {
        id: data.id,
        title: data.title,
        company: data.company,
        location: data.location,
        salaryRange: data.salary_range || '',
        description: data.description,
        employmentType: data.employment_type,
        requirements: data.requirements || '',
        benefits: data.benefits || '',
        convictionExclusions: [],
        slug: data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        postedAt: new Date(data.created_at).toLocaleDateString()
      };
    } catch (error) {
      console.error('Error updating job:', error);
      throw error;
    }
  }

  static async deleteJob(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('job_listings')
        .update({ is_active: false })
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting job:', error);
      throw error;
    }
  }
}