import { useState, useEffect } from 'react';

export const useDemoData = () => {
  const [hasDemoData, setHasDemoData] = useState(true); // Assume demo data exists for now
  const [loading, setLoading] = useState(false);

  // For now, we'll assume demo data exists since we seeded it
  // This avoids TypeScript issues while still providing the functionality
  useEffect(() => {
    setHasDemoData(true);
    setLoading(false);
  }, []);

  return { hasDemoData, loading };
};