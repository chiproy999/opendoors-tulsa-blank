import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface SavedListing {
  id: string;
  user_id: string;
  listing_type: 'job' | 'housing';
  listing_id: string;
  created_at: string;
}

export const useSavedListings = () => {
  const [savedListings, setSavedListings] = useState<SavedListing[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const loadSavedListings = async () => {
    try {
      // For now, use localStorage until saved_listings table is created
      const saved = localStorage.getItem('savedListings');
      setSavedListings(saved ? JSON.parse(saved) : []);
    } catch (error) {
      console.error('Error loading saved listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveListingToggle = async (listingId: string, listingType: 'job' | 'housing') => {
    try {
      const isAlreadySaved = savedListings.some(
        saved => saved.listing_id === listingId && saved.listing_type === listingType
      );

      let updatedSavedListings: SavedListing[];

      if (isAlreadySaved) {
        // Remove from saved
        updatedSavedListings = savedListings.filter(
          saved => !(saved.listing_id === listingId && saved.listing_type === listingType)
        );
        
        toast({
          title: "Removed from saved",
          description: `${listingType} removed from your saved list.`,
        });
      } else {
        // Add to saved
        const newSavedListing: SavedListing = {
          id: `saved_${Date.now()}`,
          user_id: 'local_user',
          listing_id: listingId,
          listing_type: listingType,
          created_at: new Date().toISOString()
        };
        
        updatedSavedListings = [...savedListings, newSavedListing];
        
        toast({
          title: "Added to saved",
          description: `${listingType} saved to your list.`,
        });
      }

      setSavedListings(updatedSavedListings);
      localStorage.setItem('savedListings', JSON.stringify(updatedSavedListings));
    } catch (error) {
      console.error('Error toggling saved listing:', error);
      toast({
        title: "Error",
        description: "Failed to update saved listings.",
        variant: "destructive",
      });
    }
  };

  const isListingSaved = (listingId: string, listingType: 'job' | 'housing') => {
    return savedListings.some(
      saved => saved.listing_id === listingId && saved.listing_type === listingType
    );
  };

  useEffect(() => {
    loadSavedListings();
  }, []);

  return {
    savedListings,
    loading,
    saveListingToggle,
    isListingSaved,
    refetch: loadSavedListings
  };
};