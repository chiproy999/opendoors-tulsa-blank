import { useState, useEffect, useCallback } from 'react';
import { HousingData, SearchFilters, SearchResult } from '@/types';
import { HousingService } from '@/services/housingService';
import { debounce } from '@/utils/searchUtils';

export const useHousing = () => {
  const [result, setResult] = useState<SearchResult<HousingData>>({
    data: [],
    total: 0,
    loading: true
  });

  const loadHousing = useCallback(async () => {
    setResult(prev => ({ ...prev, loading: true }));
    try {
      const housingResult = await HousingService.getAllHousing();
      setResult(housingResult);
    } catch (error) {
      setResult(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to load housing'
      }));
    }
  }, []);

  const searchHousing = useCallback(
    debounce(async (filters: SearchFilters) => {
      setResult(prev => ({ ...prev, loading: true }));
      try {
        const housingResult = await HousingService.searchHousing(filters);
        setResult(housingResult);
      } catch (error) {
        setResult(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to search housing'
        }));
      }
    }, 300),
    []
  );

  useEffect(() => {
    loadHousing();
  }, [loadHousing]);

  return {
    housing: result.data,
    total: result.total,
    loading: result.loading,
    error: result.error,
    searchHousing,
    refetch: loadHousing
  };
};

export const useHousingBySlug = (slug: string) => {
  const [housing, setHousing] = useState<HousingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    const loadHousing = async () => {
      setLoading(true);
      try {
        const housingData = await HousingService.getHousingBySlug(slug);
        setHousing(housingData);
      } catch (err) {
        setError('Failed to load housing');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadHousing();
    }
  }, [slug]);

  return { housing, loading, error };
};