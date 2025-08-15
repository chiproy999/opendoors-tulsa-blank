import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, DollarSign, Clock, Building, Calendar } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import LoadingCard from '@/components/common/LoadingCard';
import ErrorState from '@/components/common/ErrorState';
import DemoLabel from '@/components/common/DemoLabel';
import FavoriteButton from '@/components/common/FavoriteButton';
import DynamicSEOMeta from '@/components/seo/DynamicSEOMeta';
import RichBreadcrumbs from '@/components/seo/RichBreadcrumbs';
import { useJobBySlug } from '@/hooks/useJobs';
import { formatDistanceToNow } from 'date-fns';
import { createSlug } from '@/utils/slugUtils';

const JobDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { job, loading, error } = useJobBySlug(slug || '');

  if (loading) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <LoadingCard />
        </div>
      </Layout>
    );
  }

  if (error || !job) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <ErrorState 
            message={error || 'Job not found'} 
            onRetry={() => window.location.reload()} 
          />
        </div>
      </Layout>
    );
  }

  const canonicalUrl = `https://opendoorstulsa.com/jobs/${createSlug(job.title, job.id)}`;

  return (
    <Layout>
      <DynamicSEOMeta 
        type="job" 
        data={job} 
        canonicalUrl={canonicalUrl}
      />
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <RichBreadcrumbs currentPage={job.title} data={job} type="job" />
        
        <div className="mb-6">
          <Link to="/jobs">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Jobs
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h1 className="text-2xl mb-2 font-bold">{job.title}</h1>
                {job.isDemo && <DemoLabel />}
                <div className="flex flex-wrap gap-4 text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Building className="h-4 w-4" />
                    <span>{job.company}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{job.location}</span>
                  </div>
                  {job.salaryRange && (
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      <span>{job.salaryRange}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{job.employmentType || 'Full-time'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Posted {formatDistanceToNow(new Date(job.postedAt))} ago</span>
                  </div>
                </div>
                {job.convictionExclusions.length === 0 && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                    All Records Considered
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-3">Job Description</h2>
              <div className="prose prose-sm max-w-none">
                <p className="text-muted-foreground whitespace-pre-line">{job.description}</p>
              </div>
            </div>

            {job.requirements && (
              <>
                <Separator />
                <div>
                  <h3 className="text-lg font-semibold mb-3">Requirements</h3>
                  <div className="prose prose-sm max-w-none">
                    <p className="text-muted-foreground whitespace-pre-line">{job.requirements}</p>
                  </div>
                </div>
              </>
            )}

            {job.benefits && (
              <>
                <Separator />
                <div>
                  <h3 className="text-lg font-semibold mb-3">Benefits</h3>
                  <div className="prose prose-sm max-w-none">
                    <p className="text-muted-foreground whitespace-pre-line">{job.benefits}</p>
                  </div>
                </div>
              </>
            )}

            <Separator />
            <div className="flex gap-4">
              <Button className="flex-1" size="lg">
                Apply Now
              </Button>
              <FavoriteButton item={job} type="job" size="lg" />
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default JobDetailPage;