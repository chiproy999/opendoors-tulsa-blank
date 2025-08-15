import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useFavorites } from '@/hooks/useFavorites';
import { JobData, HousingData } from '@/types';

interface FavoriteButtonProps {
  item: JobData | HousingData;
  type: 'job' | 'housing';
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
}

const FavoriteButton = ({ 
  item, 
  type, 
  variant = 'outline', 
  size = 'default',
  className 
}: FavoriteButtonProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isItemFavorite = isFavorite(item.id);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(item, type);
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleToggle}
      className={cn(
        "transition-colors",
        isItemFavorite && "text-red-500 border-red-200 bg-red-50 hover:bg-red-100",
        className
      )}
      aria-label={isItemFavorite ? `Remove ${type} from favorites` : `Add ${type} to favorites`}
    >
      <Heart 
        className={cn(
          "h-4 w-4",
          size === 'icon' && "h-4 w-4",
          size === 'sm' && "h-3 w-3",
          size === 'lg' && "h-5 w-5",
          isItemFavorite && "fill-current"
        )} 
      />
      {size !== 'icon' && (
        <span className="ml-1">
          {isItemFavorite ? 'Saved' : 'Save'}
        </span>
      )}
    </Button>
  );
};

export default FavoriteButton;