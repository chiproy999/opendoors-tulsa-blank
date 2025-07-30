
import Layout from '@/components/layout/Layout';
import Hero from '@/components/common/Hero';
import jobsHeroBg from '@/assets/jobs-hero-bg.jpg';
import JobSearchBar from '@/components/jobs/JobSearchBar';
import JobCard from '@/components/jobs/JobCard';
import LoadingCard from '@/components/common/LoadingCard';
import ErrorState from '@/components/common/ErrorState';
import EmptyState from '@/components/common/EmptyState';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useJobs } from '@/hooks/useJobs';
import { createSearchFilters } from '@/utils/searchUtils';

const JobsPage = () => {
  const { jobs, total, loading, error, searchJobs, refetch } = useJobs();
  
  const handleSearch = (query: string, location: string) => {
    const filters = createSearchFilters(query, location);
    searchJobs(filters);
  };
  
  return (
    <Layout>
      <Hero
        title="Find Second-Chance Friendly Jobs"
        subtitle="Browse employment opportunities from employers committed to fair chance hiring in Tulsa."
        backgroundImage={jobsHeroBg}
      />
      
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <JobSearchBar onSearch={handleSearch} />
        
        <Alert className="my-6 bg-blue-50 text-blue-800 border border-blue-200">
          <InfoIcon className="h-4 w-4 mr-2" />
          <AlertDescription>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <span>
                These are example listings for demonstration purposes. Are you an employer with second-chance friendly jobs?
              </span>
              <Link to="/auth/register">
                <Button className="whitespace-nowrap bg-tulsa-blue hover:bg-tulsa-blue-600">
                  Post a Job
                </Button>
              </Link>
            </div>
          </AlertDescription>
        </Alert>
        
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Available Jobs</h2>
          
          {error ? (
            <ErrorState message={error} onRetry={refetch} />
          ) : (
            <>
              <p className="text-gray-600 mb-6">
                Showing {total} {total === 1 ? 'job' : 'jobs'}
              </p>
              <Separator className="mb-6" />
              
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <LoadingCard key={index} />
                  ))}
                </div>
              ) : jobs.length === 0 ? (
                <EmptyState type="jobs" />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {jobs.map(job => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default JobsPage;
