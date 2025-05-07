
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

const NotFoundPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Log the 404 error for analytics
    console.error("404 Error: Page not found");
  }, []);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-9xl font-bold text-tulsa-blue-700 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Page Not Found</h2>
        <p className="text-xl text-gray-600 max-w-md mx-auto mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="space-y-4">
          <Link to="/">
            <Button size="lg" className="bg-tulsa-blue hover:bg-tulsa-blue-600">
              Return to Home
            </Button>
          </Link>
          <div>
            <Button 
              variant="outline" 
              onClick={() => navigate(-1)}
              className="mt-4"
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
