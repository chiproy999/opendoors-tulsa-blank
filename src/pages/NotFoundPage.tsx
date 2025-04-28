
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';

const NotFoundPage = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-9xl font-bold text-tulsa-blue-700 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Page Not Found</h2>
        <p className="text-xl text-gray-600 max-w-md mx-auto mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button size="lg" className="bg-tulsa-blue hover:bg-tulsa-blue-600">
            Return to Home
          </Button>
        </Link>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
