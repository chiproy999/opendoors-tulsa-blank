// Shared type definitions
export interface BaseListingData {
  id: string;
  title: string;
  description: string;
  convictionExclusions: string[];
  slug: string;
  postedAt: string;
}

export interface JobData extends BaseListingData {
  company: string;
  location: string;
  salaryRange: string;
}

export interface HousingData extends BaseListingData {
  address: string;
  rent: string;
  bedrooms: number;
}

export interface SearchFilters {
  query?: string;
  location?: string;
  bedrooms?: string;
  maxRent?: string;
}

export interface SearchResult<T> {
  data: T[];
  total: number;
  loading: boolean;
  error?: string;
}