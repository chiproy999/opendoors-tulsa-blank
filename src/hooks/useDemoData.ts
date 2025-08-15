import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useDemoData = () => {
  const [hasDemoData, setHasDemoData] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkDemoData = async () => {
      try {
        setLoading(true);
        
        // Check for demo jobs
        const { data: demoJobs, error: jobError } = await supabase
          .from('job_listings')
          .select('id')
          .eq('is_demo', true)
          .limit(1);

        // Check for demo housing
        const { data: demoHousing, error: housingError } = await supabase
          .from('housing_listings')
          .select('id')
          .eq('is_demo', true)
          .limit(1);

        if (jobError || housingError) {
          console.error('Error checking demo data:', jobError || housingError);
          setHasDemoData(false);
        } else {
          setHasDemoData((demoJobs && demoJobs.length > 0) || (demoHousing && demoHousing.length > 0));
        }
      } catch (error) {
        console.error('Error checking demo data:', error);
        setHasDemoData(false);
      } finally {
        setLoading(false);
      }
    };

    checkDemoData();
  }, []);

  return { hasDemoData, loading };
};