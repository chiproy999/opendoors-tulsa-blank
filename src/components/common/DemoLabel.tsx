import { Badge } from '@/components/ui/badge';

interface DemoLabelProps {
  className?: string;
}

const DemoLabel = ({ className = "" }: DemoLabelProps) => {
  return (
    <Badge 
      variant="outline" 
      className={`bg-amber-50 text-amber-700 border-amber-300 ${className}`}
    >
      Demo Listing
    </Badge>
  );
};

export default DemoLabel;