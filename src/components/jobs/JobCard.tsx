
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface JobData {
  id: string;
  title: string;
  company: string;
  location: string;
  salaryRange: string;
  description: string;
  convictionExclusions: string[];
  slug: string;
  postedAt: string;
}

interface JobCardProps {
  job: JobData;
}

const JobCard = ({ job }: JobCardProps) => {
  return (
    <Link to={`/jobs/${job.slug}`}>
      <Card className="h-full transition-all hover:shadow-md hover:border-tulsa-blue-200">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-tulsa-blue-700">
            {job.title}
          </CardTitle>
          <div className="text-gray-600 font-medium">{job.company}</div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center text-sm text-gray-500">
            <svg className="h-5 w-5 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {job.location}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <svg className="h-5 w-5 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {job.salaryRange}
          </div>
          <p className="text-gray-700 line-clamp-3">
            {job.description}
          </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div>
            {job.convictionExclusions && job.convictionExclusions.length === 0 && (
              <Badge className="bg-green-500 hover:bg-green-600">All Records Considered</Badge>
            )}
          </div>
          <div className="text-sm text-gray-500">
            Posted {job.postedAt}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default JobCard;
