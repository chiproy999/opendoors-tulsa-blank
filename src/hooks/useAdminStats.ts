import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AdminStats {
  totalJobs: number;
  totalHousing: number;
  totalUsers: number;
  totalEmployers: number;
  loading: boolean;
  error: string | null;
}

export const useAdminStats = (): AdminStats => {
  const [stats, setStats] = useState<AdminStats>({
    totalJobs: 0,
    totalHousing: 0,
    totalUsers: 0,
    totalEmployers: 0,
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setStats(prev => ({ ...prev, loading: true, error: null }));

        // Fetch job listings count
        const { count: jobCount, error: jobError } = await supabase
          .from('job_listings')
          .select('*', { count: 'exact', head: true })
          .eq('is_active', true);

        if (jobError) throw jobError;

        // Fetch housing listings count
        const { count: housingCount, error: housingError } = await supabase
          .from('housing_listings')
          .select('*', { count: 'exact', head: true })
          .eq('is_active', true);

        if (housingError) throw housingError;

        // Fetch total users count
        const { count: userCount, error: userError } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });

        if (userError) throw userError;

        // Fetch newsletter subscribers count
        const { count: subscriberCount, error: subscriberError } = await supabase
          .from('newsletter_subscriptions')
          .select('*', { count: 'exact', head: true });

        if (subscriberError) throw subscriberError;

        setStats({
          totalJobs: jobCount || 0,
          totalHousing: housingCount || 0,
          totalUsers: userCount || 0,
          totalEmployers: subscriberCount || 0,
          loading: false,
          error: null
        });
      } catch (error) {
        console.error('Error fetching admin stats:', error);
        setStats(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to load statistics'
        }));
      }
    };

    fetchStats();
  }, []);

  return stats;
};