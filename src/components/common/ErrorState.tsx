import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
  showRetry?: boolean;
}

const ErrorState = ({ 
  message = "Something went wrong. Please try again.", 
  onRetry,
  showRetry = true 
}: ErrorStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Alert className="max-w-md mb-4 border-destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription className="text-center">
          {message}
        </AlertDescription>
      </Alert>
      
      {showRetry && onRetry && (
        <Button 
          onClick={onRetry} 
          variant="outline" 
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
      )}
    </div>
  );
};

export default ErrorState;