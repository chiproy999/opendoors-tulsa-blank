
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HousingData } from '@/types';

interface HousingCardProps {
  housing: HousingData;
}

const HousingCard = ({ housing }: HousingCardProps) => {
  return (
    <Link to={`/housing/${housing.slug}`}>
      <Card className="h-full transition-all hover:shadow-md hover:border-tulsa-blue-200">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-tulsa-blue-700">
            {housing.title}
          </CardTitle>
          <div className="text-gray-600 font-medium">{housing.address}</div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center text-sm text-gray-500">
            <svg className="h-5 w-5 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {housing.rent} / month
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <svg className="h-5 w-5 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            {housing.bedrooms} {housing.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
          </div>
          <p className="text-gray-700 line-clamp-3">
            {housing.description}
          </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div>
            {housing.convictionExclusions && housing.convictionExclusions.length === 0 && (
              <Badge className="bg-green-500 hover:bg-green-600">All Records Considered</Badge>
            )}
          </div>
          <div className="text-sm text-gray-500">
            Posted {housing.postedAt}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default HousingCard;
