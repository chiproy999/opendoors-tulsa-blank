import { useState, useEffect } from 'react';
import { JobData, HousingData } from '@/types';

type FavoriteItem = {
  id: string;
  type: 'job' | 'housing';
  data: JobData | HousingData;
  savedAt: string;
};

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('user-favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    }
  }, []);

  const saveFavorites = (newFavorites: FavoriteItem[]) => {
    setFavorites(newFavorites);
    localStorage.setItem('user-favorites', JSON.stringify(newFavorites));
  };

  const addToFavorites = (item: JobData | HousingData, type: 'job' | 'housing') => {
    const newFavorite: FavoriteItem = {
      id: item.id,
      type,
      data: item,
      savedAt: new Date().toISOString()
    };

    const updatedFavorites = [...favorites.filter(fav => fav.id !== item.id), newFavorite];
    saveFavorites(updatedFavorites);
  };

  const removeFromFavorites = (id: string) => {
    const updatedFavorites = favorites.filter(fav => fav.id !== id);
    saveFavorites(updatedFavorites);
  };

  const isFavorite = (id: string) => {
    return favorites.some(fav => fav.id === id);
  };

  const toggleFavorite = (item: JobData | HousingData, type: 'job' | 'housing') => {
    if (isFavorite(item.id)) {
      removeFromFavorites(item.id);
    } else {
      addToFavorites(item, type);
    }
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
    jobFavorites: favorites.filter(fav => fav.type === 'job'),
    housingFavorites: favorites.filter(fav => fav.type === 'housing')
  };
};