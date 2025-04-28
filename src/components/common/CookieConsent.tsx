
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

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShowConsent(false);
  };

  if (!showConsent) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50 py-4 px-6 md:px-8 border-t">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="mb-4 md:mb-0 md:mr-8">
            <p className="text-sm text-gray-800">
              This website uses cookies to enhance your experience. By continuing to browse, you agree to our{' '}
              <Link to="/privacy" className="text-tulsa-blue hover:underline">
                Privacy Policy
              </Link>.
            </p>
          </div>
          <div className="flex space-x-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={acceptCookies}
              className="text-xs"
            >
              Decline Non-Essential
            </Button>
            <Button 
              size="sm" 
              onClick={acceptCookies}
              className="bg-tulsa-blue hover:bg-tulsa-blue-600 text-xs"
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
