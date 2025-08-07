import { useState, useCallback } from 'react';
import { Search, MapPin, DollarSign, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';

interface EnhancedJobSearchBarProps {
  onSearch: (query: string, location: string, salaryRange: string, employmentType: string) => void;
}

const EnhancedJobSearchBar = ({ onSearch }: EnhancedJobSearchBarProps) => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [salaryRange, setSalaryRange] = useState('');
  const [employmentType, setEmploymentType] = useState('');

  const handleSearch = useCallback(() => {
    onSearch(query.trim(), location.trim(), salaryRange, employmentType);
  }, [query, location, salaryRange, employmentType, onSearch]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearFilters = () => {
    setQuery('');
    setLocation('');
    setSalaryRange('');
    setEmploymentType('');
    onSearch('', '', '', '');
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
              placeholder="Job title, company, or keywords"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-10"
            />
          </div>
          
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="City, state, or zip code"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-10"
            />
          </div>

          <Button 
            onClick={handleSearch}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Search Jobs
          </Button>
        </div>

        {/* Filters row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 z-10" />
            <Select value={salaryRange} onValueChange={setSalaryRange}>
              <SelectTrigger className="pl-10">
                <SelectValue placeholder="Salary range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="12-15">$12-15/hour</SelectItem>
                <SelectItem value="15-18">$15-18/hour</SelectItem>
                <SelectItem value="18-22">$18-22/hour</SelectItem>
                <SelectItem value="22-25">$22-25/hour</SelectItem>
                <SelectItem value="25+">$25+/hour</SelectItem>
                <SelectItem value="30k-40k">$30k-40k/year</SelectItem>
                <SelectItem value="40k-50k">$40k-50k/year</SelectItem>
                <SelectItem value="50k+">$50k+/year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="relative">
            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 z-10" />
            <Select value={employmentType} onValueChange={setEmploymentType}>
              <SelectTrigger className="pl-10">
                <SelectValue placeholder="Employment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-time">Full-time</SelectItem>
                <SelectItem value="part-time">Part-time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="temporary">Temporary</SelectItem>
                <SelectItem value="internship">Internship</SelectItem>
              </SelectContent>
            </Select>
          </div>

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

export default EnhancedJobSearchBar;