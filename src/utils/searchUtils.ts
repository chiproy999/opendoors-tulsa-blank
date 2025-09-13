import { SearchFilters } from '@/types';

export const normalizeSearchQuery = (query: string): string => {
  return query.toLowerCase().trim();
};

export const createSearchFilters = (
  query?: string,
  location?: string,
  bedrooms?: string,
  maxRent?: string,
  salaryRange?: string,
  employmentType?: string
): SearchFilters => {
  return {
    query: query ? normalizeSearchQuery(query) : undefined,
    location: location ? normalizeSearchQuery(location) : undefined,
    bedrooms,
    maxRent,
    salaryRange,
    employmentType
  };
};

export const parseRentAmount = (rentString: string): number => {
  return parseInt(rentString.replace(/\$/g, '').replace(/,/g, ''));
};

export const formatRentAmount = (amount: number): string => {
  return `$${amount.toLocaleString()}`;
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(null, args), wait);
  };
};