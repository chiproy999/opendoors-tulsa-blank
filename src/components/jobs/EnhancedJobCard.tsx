import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, DollarSign, Clock, Heart, ExternalLink } from 'lucide-react';
import { JobData } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { useSavedListings } from '@/hooks/useSavedListings';
import DemoLabel from '@/components/common/DemoLabel';

interface EnhancedJobCardProps {
  job: JobData;
}

const EnhancedJobCard = ({ job }: EnhancedJobCardProps) => {
  const { saveListingToggle, isListingSaved } = useSavedListings();
  const isSaved = isListingSaved(job.id, 'job');

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    saveListingToggle(job.id, 'job');
  };

  const getEmploymentTypeColor = (type?: string) => {
    switch (type?.toLowerCase()) {
      case 'full-time': return 'bg-green-100 text-green-800 border-green-200';
      case 'part-time': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'contract': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'temporary': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative">
      <Button
        onClick={handleSaveToggle}
        variant="ghost"
        size="sm"
        className="absolute top-2 right-2 z-10 p-2 hover:bg-background/80"
      >
        <Heart 
          className={`h-4 w-4 transition-colors ${
            isSaved ? 'fill-red-500 text-red-500' : 'text-muted-foreground hover:text-red-500'
          }`} 
        />
      </Button>

      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1 pr-8">
            <div className="flex items-start gap-2 mb-1">
              <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors flex-1">
                {job.title}
              </CardTitle>
              {job.isDemo && <DemoLabel className="flex-shrink-0" />}
            </div>
            <CardDescription className="font-medium text-muted-foreground mt-1">
              {job.company}
            </CardDescription>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-3">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" />
            {job.location}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <DollarSign className="h-4 w-4 mr-1" />
            {job.salaryRange}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          {job.employmentType && (
            <Badge variant="outline" className={getEmploymentTypeColor(job.employmentType)}>
              <Clock className="h-3 w-3 mr-1" />
              {job.employmentType}
            </Badge>
          )}
          <Badge variant="secondary" className="text-xs">
            Posted {formatDistanceToNow(new Date(job.postedAt))} ago
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {job.description}
        </p>

        {job.convictionExclusions && job.convictionExclusions.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-medium text-muted-foreground mb-1">Conviction Exclusions:</p>
            <div className="flex flex-wrap gap-1">
              {job.convictionExclusions.map((exclusion, index) => (
                <Badge key={index} variant="outline" className="text-xs bg-yellow-50 text-yellow-800 border-yellow-200">
                  {exclusion}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <Button 
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
            size="sm"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Apply Now
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="border-border hover:bg-accent"
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedJobCard;