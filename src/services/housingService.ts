import { HousingData, SearchFilters, SearchResult } from '@/types';
import { supabase } from '@/integrations/supabase/client';

export class HousingService {
  static async getAllHousing(): Promise<SearchResult<HousingData>> {
    try {
      const { data, error, count } = await supabase
        .from('housing_listings')
        .select('*', { count: 'exact' })
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const housing: HousingData[] = data.map(house => ({
        id: house.id,
        title: house.title,
        address: house.address,
        rent: `$${house.rent_amount}`,
        bedrooms: house.bedrooms,
        bathrooms: house.bathrooms,
        squareFeet: house.square_feet,
        description: house.description,
        amenities: house.amenities || '',
        petFriendly: house.pet_friendly,
        utilitiesIncluded: house.utilities_included,
        convictionExclusions: [], // Can be enhanced later
        slug: house.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        postedAt: new Date(house.created_at).toLocaleDateString(),
        isDemo: (house as any).is_demo || false
      }));

      return {
        data: housing,
        total: count || 0,
        loading: false
      };
    } catch (error) {
      console.error('Error fetching housing:', error);
      return {
        data: [],
        total: 0,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch housing'
      };
    }
  }

  static async searchHousing(filters: SearchFilters): Promise<SearchResult<HousingData>> {
    try {
      let query = supabase
        .from('housing_listings')
        .select('*', { count: 'exact' })
        .eq('is_active', true);

      if (filters.query) {
        query = query.or(`title.ilike.%${filters.query}%,address.ilike.%${filters.query}%,description.ilike.%${filters.query}%`);
      }

      if (filters.bedrooms) {
        query = query.gte('bedrooms', parseInt(filters.bedrooms));
      }

      if (filters.maxRent) {
        query = query.lte('rent_amount', parseInt(filters.maxRent));
      }

      const { data, error, count } = await query.order('created_at', { ascending: false });

      if (error) throw error;

      const housing: HousingData[] = data.map(house => ({
        id: house.id,
        title: house.title,
        address: house.address,
        rent: `$${house.rent_amount}`,
        bedrooms: house.bedrooms,
        bathrooms: house.bathrooms,
        squareFeet: house.square_feet,
        description: house.description,
        amenities: house.amenities || '',
        petFriendly: house.pet_friendly,
        utilitiesIncluded: house.utilities_included,
        convictionExclusions: [],
        slug: house.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        postedAt: new Date(house.created_at).toLocaleDateString(),
        isDemo: (house as any).is_demo || false
      }));

      return {
        data: housing,
        total: count || 0,
        loading: false
      };
    } catch (error) {
      console.error('Error searching housing:', error);
      return {
        data: [],
        total: 0,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to search housing'
      };
    }
  }

  static async getHousingBySlug(slug: string): Promise<HousingData | null> {
    try {
      const { data, error } = await supabase
        .from('housing_listings')
        .select('*')
        .eq('is_active', true);

      if (error) throw error;

      // Try multiple matching strategies
      let house = data.find(h => h.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug);
      
      // If not found by title slug, try to extract ID from slug
      if (!house) {
        const idFromSlug = slug.split('-').pop();
        if (idFromSlug && idFromSlug.length >= 8) {
          house = data.find(h => h.id.includes(idFromSlug));
        }
      }
      
      if (!house) return null;

      return {
        id: house.id,
        title: house.title,
        address: house.address,
        rent: `$${house.rent_amount}`,
        bedrooms: house.bedrooms,
        bathrooms: house.bathrooms,
        squareFeet: house.square_feet,
        description: house.description,
        amenities: house.amenities || '',
        petFriendly: house.pet_friendly,
        utilitiesIncluded: house.utilities_included,
        convictionExclusions: [],
        slug: house.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        postedAt: new Date(house.created_at).toLocaleDateString(),
        isDemo: (house as any).is_demo || false
      };
    } catch (error) {
      console.error('Error fetching housing by slug:', error);
      return null;
    }
  }

  static async createHousing(housingData: Omit<HousingData, 'id' | 'slug' | 'postedAt'>): Promise<HousingData> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('housing_listings')
        .insert({
          title: housingData.title,
          address: housingData.address,
          rent_amount: parseInt(housingData.rent.replace(/[^0-9]/g, '')),
          bedrooms: housingData.bedrooms,
          bathrooms: housingData.bathrooms || 1,
          square_feet: housingData.squareFeet,
          description: housingData.description,
          amenities: housingData.amenities,
          pet_friendly: housingData.petFriendly || false,
          utilities_included: housingData.utilitiesIncluded || false,
          landlord_id: user.id
        })
        .select()
        .single();

      if (error) throw error;

      return {
        id: data.id,
        title: data.title,
        address: data.address,
        rent: `$${data.rent_amount}`,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        squareFeet: data.square_feet,
        description: data.description,
        amenities: data.amenities || '',
        petFriendly: data.pet_friendly,
        utilitiesIncluded: data.utilities_included,
        convictionExclusions: [],
        slug: data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        postedAt: new Date(data.created_at).toLocaleDateString()
      };
    } catch (error) {
      console.error('Error creating housing:', error);
      throw error;
    }
  }

  static async updateHousing(id: string, housingData: Partial<HousingData>): Promise<HousingData> {
    try {
      const updateData: any = {};
      if (housingData.title) updateData.title = housingData.title;
      if (housingData.address) updateData.address = housingData.address;
      if (housingData.rent) updateData.rent_amount = parseInt(housingData.rent.replace(/[^0-9]/g, ''));
      if (housingData.bedrooms !== undefined) updateData.bedrooms = housingData.bedrooms;
      if (housingData.bathrooms !== undefined) updateData.bathrooms = housingData.bathrooms;
      if (housingData.squareFeet !== undefined) updateData.square_feet = housingData.squareFeet;
      if (housingData.description) updateData.description = housingData.description;
      if (housingData.amenities) updateData.amenities = housingData.amenities;
      if (housingData.petFriendly !== undefined) updateData.pet_friendly = housingData.petFriendly;
      if (housingData.utilitiesIncluded !== undefined) updateData.utilities_included = housingData.utilitiesIncluded;

      const { data, error } = await supabase
        .from('housing_listings')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return {
        id: data.id,
        title: data.title,
        address: data.address,
        rent: `$${data.rent_amount}`,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        squareFeet: data.square_feet,
        description: data.description,
        amenities: data.amenities || '',
        petFriendly: data.pet_friendly,
        utilitiesIncluded: data.utilities_included,
        convictionExclusions: [],
        slug: data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        postedAt: new Date(data.created_at).toLocaleDateString()
      };
    } catch (error) {
      console.error('Error updating housing:', error);
      throw error;
    }
  }

  static async deleteHousing(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('housing_listings')
        .update({ is_active: false })
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting housing:', error);
      throw error;
    }
  }
}