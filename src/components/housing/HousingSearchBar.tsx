
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface HousingSearchBarProps {
  onSearch: (query: string, bedrooms: string, maxRent: string) => void;
}

const HousingSearchBar = ({ onSearch }: HousingSearchBarProps) => {
  const [query, setQuery] = useState('');
  const [bedrooms, setBedrooms] = useState('any');
  const [maxRent, setMaxRent] = useState('any');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, bedrooms === 'any' ? '' : bedrooms, maxRent === 'any' ? '' : maxRent);
  };

  return (
    <form onSubmit={handleSearch} className="bg-white p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="col-span-1">
          <label htmlFor="query" className="block text-sm font-medium text-gray-700 mb-1">
            Search
          </label>
          <Input
            id="query"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Neighborhood, address, etc."
            className="w-full"
          />
        </div>

        <div className="col-span-1">
          <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-1">
            Bedrooms
          </label>
          <Select value={bedrooms} onValueChange={setBedrooms}>
            <SelectTrigger id="bedrooms" className="w-full">
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="col-span-1">
          <label htmlFor="rent" className="block text-sm font-medium text-gray-700 mb-1">
            Max Rent
          </label>
          <Select value={maxRent} onValueChange={setMaxRent}>
            <SelectTrigger id="rent" className="w-full">
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="500">$500</SelectItem>
              <SelectItem value="750">$750</SelectItem>
              <SelectItem value="1000">$1,000</SelectItem>
              <SelectItem value="1250">$1,250</SelectItem>
              <SelectItem value="1500">$1,500</SelectItem>
              <SelectItem value="2000">$2,000</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="col-span-1 flex items-end">
          <Button 
            type="submit" 
            className="bg-tulsa-blue hover:bg-tulsa-blue-600 w-full"
          >
            Search Housing
          </Button>
        </div>
      </div>
    </form>
  );
};

export default HousingSearchBar;
