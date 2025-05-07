
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/common/Hero';
import HousingSearchBar from '@/components/housing/HousingSearchBar';
import HousingCard, { HousingData } from '@/components/housing/HousingCard';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// Mock data
const mockHousing: HousingData[] = [
  {
    id: '1',
    title: '2 Bedroom Apartment in Downtown Tulsa',
    address: '123 Main St, Tulsa, OK',
    rent: '$875',
    bedrooms: 2,
    description: 'Modern 2 bedroom apartment in the heart of downtown Tulsa. Close to restaurants, shops, and public transportation.',
    convictionExclusions: [],
    slug: '2-bedroom-downtown-tulsa',
    postedAt: '2 days ago'
  },
  {
    id: '2',
    title: '3 Bedroom House with Yard',
    address: '456 Oak Lane, Tulsa, OK',
    rent: '$1,200',
    bedrooms: 3,
    description: 'Spacious 3 bedroom house with a fenced yard. Perfect for a family. Includes washer/dryer and garage.',
    convictionExclusions: ['violent felonies'],
    slug: '3-bedroom-house-with-yard',
    postedAt: '1 week ago'
  },
  {
    id: '3',
    title: 'Studio Apartment Near University',
    address: '789 College Ave, Tulsa, OK',
    rent: '$650',
    bedrooms: 0,
    description: 'Cozy studio apartment just blocks from the university. All utilities included. Ideal for students or young professionals.',
    convictionExclusions: [],
    slug: 'studio-near-university',
    postedAt: '3 days ago'
  },
  {
    id: '4',
    title: '1 Bedroom in Quiet Neighborhood',
    address: '321 Maple St, Tulsa, OK',
    rent: '$750',
    bedrooms: 1,
    description: 'One bedroom apartment in a quiet residential area. Recently renovated with new appliances and flooring.',
    convictionExclusions: [],
    slug: '1-bedroom-quiet-neighborhood',
    postedAt: '5 days ago'
  },
  {
    id: '5',
    title: '2 Bedroom Townhouse',
    address: '555 Hillside Dr, Tulsa, OK',
    rent: '$950',
    bedrooms: 2,
    description: 'Two-story townhouse with 2 bedrooms and 1.5 bathrooms. Includes a small patio and community pool access.',
    convictionExclusions: ['drug distribution'],
    slug: '2-bedroom-townhouse',
    postedAt: '2 weeks ago'
  },
  {
    id: '6',
    title: 'Shared Housing Program',
    address: 'Various Locations, Tulsa, OK',
    rent: '$500',
    bedrooms: 1,
    description: 'Rooms available in shared housing program specifically for individuals seeking reentry support. Includes case management services.',
    convictionExclusions: [],
    slug: 'shared-housing-program',
    postedAt: '1 day ago'
  }
];

const HousingPage = () => {
  const [filteredHousing, setFilteredHousing] = useState<HousingData[]>(mockHousing);
  
  const handleSearch = (query: string, bedrooms: string, maxRent: string) => {
    // In a real application, this would be an API call with filters
    const filtered = mockHousing.filter(housing => {
      const matchesQuery = !query || 
        housing.title.toLowerCase().includes(query.toLowerCase()) || 
        housing.address.toLowerCase().includes(query.toLowerCase()) ||
        housing.description.toLowerCase().includes(query.toLowerCase());
        
      const matchesBedrooms = !bedrooms || housing.bedrooms >= parseInt(bedrooms);
      
      const matchesRent = !maxRent || 
        parseInt(housing.rent.replace('$', '').replace(',', '')) <= parseInt(maxRent);
        
      return matchesQuery && matchesBedrooms && matchesRent;
    });
    
    setFilteredHousing(filtered);
  };
  
  return (
    <Layout>
      <Hero
        title="Find Second-Chance Friendly Housing"
        subtitle="Browse housing options from landlords committed to fair housing practices in Tulsa."
        backgroundImage="/placeholder.svg"
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
          <p className="text-gray-600 mb-6">
            Showing {filteredHousing.length} {filteredHousing.length === 1 ? 'listing' : 'listings'}
          </p>
          <Separator className="mb-6" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHousing.map(housing => (
              <HousingCard key={housing.id} housing={housing} />
            ))}
          </div>
          
          {filteredHousing.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-900 mb-2">No housing found</h3>
              <p className="text-gray-600">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default HousingPage;
