import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, DollarSign, Bed, Bath, Home, Calendar, Check, X } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import LoadingCard from '@/components/common/LoadingCard';
import ErrorState from '@/components/common/ErrorState';
import DemoLabel from '@/components/common/DemoLabel';
import { useHousingBySlug } from '@/hooks/useHousing';
import { formatDistanceToNow } from 'date-fns';

const HousingDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { housing, loading, error } = useHousingBySlug(slug || '');

  if (loading) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <LoadingCard />
        </div>
      </Layout>
    );
  }

  if (error || !housing) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <ErrorState 
            message={error || 'Housing not found'} 
            onRetry={() => window.location.reload()} 
          />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link to="/housing">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Housing
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <CardTitle className="text-2xl mb-2">{housing.title}</CardTitle>
                {housing.isDemo && <DemoLabel />}
                <div className="flex flex-wrap gap-4 text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{housing.address}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    <span>{housing.rent}/month</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bed className="h-4 w-4" />
                    <span>{housing.bedrooms} {housing.bedrooms === 1 ? 'bedroom' : 'bedrooms'}</span>
                  </div>
                  {housing.bathrooms && (
                    <div className="flex items-center gap-1">
                      <Bath className="h-4 w-4" />
                      <span>{housing.bathrooms} {housing.bathrooms === 1 ? 'bathroom' : 'bathrooms'}</span>
                    </div>
                  )}
                  {housing.squareFeet && (
                    <div className="flex items-center gap-1">
                      <Home className="h-4 w-4" />
                      <span>{housing.squareFeet.toLocaleString()} sq ft</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Posted {formatDistanceToNow(new Date(housing.postedAt))} ago</span>
                  </div>
                </div>
                {housing.convictionExclusions.length === 0 && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                    All Records Considered
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Description</h3>
              <div className="prose prose-sm max-w-none">
                <p className="text-muted-foreground whitespace-pre-line">{housing.description}</p>
              </div>
            </div>

            <Separator />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Property Features</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Pet Friendly</span>
                    {housing.petFriendly ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <X className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Utilities Included</span>
                    {housing.utilitiesIncluded ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <X className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                </div>
              </div>

              {housing.amenities && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Amenities</h3>
                  <div className="prose prose-sm max-w-none">
                    <p className="text-muted-foreground whitespace-pre-line">{housing.amenities}</p>
                  </div>
                </div>
              )}
            </div>

            <Separator />
            <div className="flex gap-4">
              <Button className="flex-1" size="lg">
                Contact Landlord
              </Button>
              <Button variant="outline" size="lg">
                Save Listing
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default HousingDetailPage;