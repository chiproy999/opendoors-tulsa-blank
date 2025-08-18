
import { NewsletterForm } from '@/components/forms/NewsletterForm';

const NewsletterSignup = () => {
  return (
    <div className="bg-tulsa-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-tulsa-blue-700 mb-4">
          Stay Updated
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Subscribe to our newsletter for the latest job and housing opportunities.
        </p>
        <NewsletterForm className="flex justify-center" />
      </div>
    </div>
  );
};

export default NewsletterSignup;
