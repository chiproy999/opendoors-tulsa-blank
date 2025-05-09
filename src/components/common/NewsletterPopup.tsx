
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from "@/components/ui/button";

const NewsletterPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [hasSubscribed, setHasSubscribed] = useState(false);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('hasSeenNewsletterPopup');
    
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 10000); // Show popup after 10 seconds
      
      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    setIsVisible(false);
    localStorage.setItem('hasSeenNewsletterPopup', 'true');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the email to your backend
    console.log('Newsletter signup:', email);
    setHasSubscribed(true);
    setTimeout(() => {
      closePopup();
    }, 2000);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6 relative animate-fade-in">
        <button 
          onClick={closePopup}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="h-5 w-5" />
        </button>
        
        {!hasSubscribed ? (
          <>
            <h3 className="text-xl font-bold text-center mb-2">Stay Updated</h3>
            <p className="text-gray-600 dark:text-gray-300 text-center mb-4">
              Subscribe to our newsletter for the latest opportunities and resources.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-tulsa-blue-500 focus:border-tulsa-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <Button type="submit" className="w-full bg-tulsa-blue hover:bg-tulsa-blue-600 text-white">
                Subscribe
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="text-green-500 text-4xl mb-4">✓</div>
            <h3 className="text-xl font-bold mb-2">Thank You!</h3>
            <p className="text-gray-600 dark:text-gray-300">
              You've successfully subscribed to our newsletter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsletterPopup;
