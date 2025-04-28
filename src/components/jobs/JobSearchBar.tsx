
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface JobSearchBarProps {
  onSearch: (query: string, location: string) => void;
}

const JobSearchBar = ({ onSearch }: JobSearchBarProps) => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('Tulsa');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, location);
  };

  return (
    <form onSubmit={handleSearch} className="bg-white p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1">
          <label htmlFor="query" className="block text-sm font-medium text-gray-700 mb-1">
            Job Title or Keywords
          </label>
          <Input
            id="query"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search job titles or keywords"
            className="w-full"
          />
        </div>

        <div className="col-span-1">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <Input
            id="location"
            value={location}
            onChange={e => setLocation(e.target.value)}
            placeholder="City"
            className="w-full"
          />
        </div>

        <div className="col-span-1 flex items-end">
          <Button 
            type="submit" 
            className="bg-tulsa-blue hover:bg-tulsa-blue-600 w-full"
          >
            Search Jobs
          </Button>
        </div>
      </div>
    </form>
  );
};

export default JobSearchBar;
