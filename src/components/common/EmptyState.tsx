import { Search, Home, Briefcase } from 'lucide-react';

interface EmptyStateProps {
  type?: 'search' | 'jobs' | 'housing' | 'general';
  title?: string;
  description?: string;
}

const EmptyState = ({ 
  type = 'general',
  title,
  description 
}: EmptyStateProps) => {
  const getIcon = () => {
    switch (type) {
      case 'search':
        return <Search className="h-12 w-12 text-muted-foreground" />;
      case 'jobs':
        return <Briefcase className="h-12 w-12 text-muted-foreground" />;
      case 'housing':
        return <Home className="h-12 w-12 text-muted-foreground" />;
      default:
        return <Search className="h-12 w-12 text-muted-foreground" />;
    }
  };

  const getDefaultTitle = () => {
    switch (type) {
      case 'search':
        return 'No results found';
      case 'jobs':
        return 'No jobs found';
      case 'housing':
        return 'No housing found';
      default:
        return 'Nothing found';
    }
  };

  const getDefaultDescription = () => {
    switch (type) {
      case 'search':
        return 'Try adjusting your search criteria or filters';
      case 'jobs':
        return 'Try broadening your search or check back later for new listings';
      case 'housing':
        return 'Try adjusting your search criteria or check back later for new listings';
      default:
        return 'Try adjusting your search criteria';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      {getIcon()}
      <h3 className="mt-4 text-xl font-medium text-foreground">
        {title || getDefaultTitle()}
      </h3>
      <p className="mt-2 text-muted-foreground max-w-md">
        {description || getDefaultDescription()}
      </p>
    </div>
  );
};

export default EmptyState;