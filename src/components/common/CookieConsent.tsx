
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('cookieConsent');
    if (!hasConsented) {
      setShowConsent(true);
    }
  }, []);

  const acceptAllCookies = () => {
    localStorage.setItem('cookieConsent', 'all-cookies');
    setShowConsent(false);
  };

  const declineNonEssential = () => {
    localStorage.setItem('cookieConsent', 'essential-only');
    setShowConsent(false);
  };

  if (!showConsent) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg z-50 py-4 px-4 sm:px-6 md:px-8 border-t">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="md:mr-8">
            <p className="text-sm text-gray-800 dark:text-gray-200">
              This website uses cookies to enhance your experience. By continuing to browse, you agree to our{' '}
              <Link to="/privacy" className="text-red-600 hover:underline dark:text-red-400">
                Privacy Policy
              </Link>.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            <Button 
              variant="outline" 
              size="sm"
              onClick={declineNonEssential}
              className="text-sm py-2 px-4 w-full sm:w-auto"
            >
              Decline Non-Essential
            </Button>
            <Button 
              size="sm" 
              onClick={acceptAllCookies}
              className="bg-red-600 hover:bg-red-700 text-white text-sm py-2 px-4 w-full sm:w-auto"
            >
              Accept All
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
