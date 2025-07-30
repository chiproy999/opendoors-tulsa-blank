
import Layout from '@/components/layout/Layout';
import Hero from '@/components/common/Hero';
import housingHeroBg from '@/assets/housing-hero-bg.jpg';
import HousingSearchBar from '@/components/housing/HousingSearchBar';
import HousingCard from '@/components/housing/HousingCard';
import LoadingCard from '@/components/common/LoadingCard';
import ErrorState from '@/components/common/ErrorState';
import EmptyState from '@/components/common/EmptyState';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useHousing } from '@/hooks/useHousing';
import { createSearchFilters } from '@/utils/searchUtils';

const HousingPage = () => {
  const { housing, total, loading, error, searchHousing, refetch } = useHousing();
  
  const handleSearch = (query: string, bedrooms: string, maxRent: string) => {
    const filters = createSearchFilters(query, undefined, bedrooms, maxRent);
    searchHousing(filters);
  };
  
  return (
    <Layout>
      <Hero
        title="Find Second-Chance Friendly Housing"
        subtitle="Browse housing options from landlords committed to fair housing practices in Tulsa."
        backgroundImage={housingHeroBg}
      />
      
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <HousingSearchBar onSearch={handleSearch} />
        
        <Alert className="my-6 bg-blue-50 text-blue-800 border border-blue-200">
          <InfoIcon className="h-4 w-4 mr-2" />
          <AlertDescription>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <span>
                These are example listings for demonstration purposes. Are you a landlord with second-chance friendly housing?
              </span>
              <Link to="/auth/register">
                <Button className="whitespace-nowrap bg-tulsa-blue hover:bg-tulsa-blue-600">
                  List Your Property
                </Button>
              </Link>
            </div>
          </AlertDescription>
        </Alert>
        
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Available Housing</h2>
          
          {error ? (
            <ErrorState message={error} onRetry={refetch} />
          ) : (
            <>
              <p className="text-gray-600 mb-6">
                Showing {total} {total === 1 ? 'listing' : 'listings'}
              </p>
              <Separator className="mb-6" />
              
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <LoadingCard key={index} />
                  ))}
                </div>
              ) : housing.length === 0 ? (
                <EmptyState type="housing" />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {housing.map(housingItem => (
                    <HousingCard key={housingItem.id} housing={housingItem} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default HousingPage;
