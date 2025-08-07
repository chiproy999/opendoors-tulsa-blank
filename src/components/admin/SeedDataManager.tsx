import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Database, RefreshCw, CheckCircle } from 'lucide-react';
import { SeedDataService } from '@/services/seedDataService';
import { useToast } from '@/hooks/use-toast';

const SeedDataManager = () => {
  const [loading, setLoading] = useState(false);
  const [seeded, setSeeded] = useState(false);
  const { toast } = useToast();

  const handleSeedData = async () => {
    setLoading(true);
    try {
      await SeedDataService.seedAllData();
      setSeeded(true);
      toast({
        title: "Success!",
        description: "Sample data has been added to the database.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to seed data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Sample Data Management
        </CardTitle>
        <CardDescription>
          Add sample job and housing listings to populate the platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">
            This will add:
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>6 sample job listings from second-chance friendly employers</li>
              <li>5 sample housing listings from supportive landlords</li>
              <li>Realistic conviction exclusions and requirements</li>
            </ul>
          </div>
          
          <Button
            onClick={handleSeedData}
            disabled={loading || seeded}
            className="w-full"
          >
            {loading ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Adding Sample Data...
              </>
            ) : seeded ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Sample Data Added
              </>
            ) : (
              <>
                <Database className="h-4 w-4 mr-2" />
                Add Sample Data
              </>
            )}
          </Button>
          
          {seeded && (
            <div className="text-sm text-green-600 bg-green-50 p-3 rounded-md">
              Sample data has been successfully added to your database. 
              Visit the Jobs and Housing pages to see the new listings.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SeedDataManager;