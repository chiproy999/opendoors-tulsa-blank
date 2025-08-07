import { Alert, AlertDescription } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';

interface DemoDisclaimerProps {
  type?: 'jobs' | 'housing' | 'general';
}

const DemoDisclaimer = ({ type = 'general' }: DemoDisclaimerProps) => {
  const getMessage = () => {
    switch (type) {
      case 'jobs':
        return 'This page contains sample job listings for demonstration purposes. These are not real job openings. Real employers can post actual opportunities through our platform.';
      case 'housing':
        return 'This page contains sample housing listings for demonstration purposes. These are not real rental properties. Real landlords can post actual listings through our platform.';
      default:
        return 'This page contains sample listings for demonstration purposes. These are examples to show how the platform works.';
    }
  };

  return (
    <Alert className="my-6 bg-amber-50 border-amber-200 text-amber-800">
      <InfoIcon className="h-4 w-4" />
      <AlertDescription className="font-medium">
        Demo Content Notice: {getMessage()}
      </AlertDescription>
    </Alert>
  );
};

export default DemoDisclaimer;