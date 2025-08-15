
import { useState, useCallback } from 'react';
import { Search, Home, DollarSign } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";

interface HousingSearchBarProps {
  onSearch: (query: string, bedrooms: string, maxRent: string) => void;
}

const HousingSearchBar = ({ onSearch }: HousingSearchBarProps) => {
  const [query, setQuery] = useState('');
  const [bedrooms, setBedrooms] = useState('any');
  const [maxRent, setMaxRent] = useState('any');

  const handleSearch = useCallback(() => {
    onSearch(query.trim(), bedrooms === 'any' ? '' : bedrooms, maxRent === 'any' ? '' : maxRent);
  }, [query, bedrooms, maxRent, onSearch]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearFilters = () => {
    setQuery('');
    setBedrooms('any');
    setMaxRent('any');
    onSearch('', '', '');
  };

  return (
    <Card className="p-6 shadow-lg bg-card">
      <div className="space-y-4">
        {/* Main search row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Neighborhood, address, or features"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-10"
            />
          </div>

          <div className="relative">
            <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 z-10" />
            <Select value={bedrooms} onValueChange={setBedrooms}>
              <SelectTrigger className="pl-10">
                <SelectValue placeholder="Bedrooms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any bedrooms</SelectItem>
                <SelectItem value="1">1+ bedroom</SelectItem>
                <SelectItem value="2">2+ bedrooms</SelectItem>
                <SelectItem value="3">3+ bedrooms</SelectItem>
                <SelectItem value="4">4+ bedrooms</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={handleSearch}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Search Housing
          </Button>
        </div>

        {/* Filters row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 z-10" />
            <Select value={maxRent} onValueChange={setMaxRent}>
              <SelectTrigger className="pl-10">
                <SelectValue placeholder="Max rent" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any price</SelectItem>
                <SelectItem value="500">Under $500</SelectItem>
                <SelectItem value="750">Under $750</SelectItem>
                <SelectItem value="1000">Under $1,000</SelectItem>
                <SelectItem value="1250">Under $1,250</SelectItem>
                <SelectItem value="1500">Under $1,500</SelectItem>
                <SelectItem value="2000">Under $2,000</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div></div>

          <Button 
            onClick={clearFilters}
            variant="outline"
            className="border-border hover:bg-accent"
          >
            Clear Filters
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default HousingSearchBar;
