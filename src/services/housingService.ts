import { HousingData, SearchFilters, SearchResult } from '@/types';

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

export class HousingService {
  static async getAllHousing(): Promise<SearchResult<HousingData>> {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return {
      data: mockHousing,
      total: mockHousing.length,
      loading: false
    };
  }

  static async searchHousing(filters: SearchFilters): Promise<SearchResult<HousingData>> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const filtered = mockHousing.filter(housing => {
      const matchesQuery = !filters.query || 
        housing.title.toLowerCase().includes(filters.query.toLowerCase()) || 
        housing.address.toLowerCase().includes(filters.query.toLowerCase()) ||
        housing.description.toLowerCase().includes(filters.query.toLowerCase());
        
      const matchesBedrooms = !filters.bedrooms || 
        housing.bedrooms >= parseInt(filters.bedrooms);
      
      const matchesRent = !filters.maxRent || 
        parseInt(housing.rent.replace('$', '').replace(',', '')) <= parseInt(filters.maxRent);
        
      return matchesQuery && matchesBedrooms && matchesRent;
    });
    
    return {
      data: filtered,
      total: filtered.length,
      loading: false
    };
  }

  static async getHousingBySlug(slug: string): Promise<HousingData | null> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockHousing.find(housing => housing.slug === slug) || null;
  }

  // Placeholder for future Supabase integration
  static async createHousing(housingData: Omit<HousingData, 'id' | 'slug' | 'postedAt'>): Promise<HousingData> {
    // TODO: Implement Supabase integration
    throw new Error('Not implemented - requires Supabase integration');
  }

  static async updateHousing(id: string, housingData: Partial<HousingData>): Promise<HousingData> {
    // TODO: Implement Supabase integration
    throw new Error('Not implemented - requires Supabase integration');
  }

  static async deleteHousing(id: string): Promise<void> {
    // TODO: Implement Supabase integration
    throw new Error('Not implemented - requires Supabase integration');
  }
}