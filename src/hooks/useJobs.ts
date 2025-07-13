import { useState, useEffect, useCallback } from 'react';
import { JobData, SearchFilters, SearchResult } from '@/types';
import { JobService } from '@/services/jobService';
import { debounce } from '@/utils/searchUtils';

export const useJobs = () => {
  const [result, setResult] = useState<SearchResult<JobData>>({
    data: [],
    total: 0,
    loading: true
  });

  const loadJobs = useCallback(async () => {
    setResult(prev => ({ ...prev, loading: true }));
    try {
      const jobResult = await JobService.getAllJobs();
      setResult(jobResult);
    } catch (error) {
      setResult(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to load jobs'
      }));
    }
  }, []);

  const searchJobs = useCallback(
    debounce(async (filters: SearchFilters) => {
      setResult(prev => ({ ...prev, loading: true }));
      try {
        const jobResult = await JobService.searchJobs(filters);
        setResult(jobResult);
      } catch (error) {
        setResult(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to search jobs'
        }));
      }
    }, 300),
    []
  );

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  return {
    jobs: result.data,
    total: result.total,
    loading: result.loading,
    error: result.error,
    searchJobs,
    refetch: loadJobs
  };
};

export const useJobBySlug = (slug: string) => {
  const [job, setJob] = useState<JobData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    const loadJob = async () => {
      setLoading(true);
      try {
        const jobData = await JobService.getJobBySlug(slug);
        setJob(jobData);
      } catch (err) {
        setError('Failed to load job');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadJob();
    }
  }, [slug]);

  return { job, loading, error };
};