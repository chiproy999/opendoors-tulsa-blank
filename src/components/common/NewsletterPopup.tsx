import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type UserType = 'business_owner' | 'landlord' | 'job_seeker' | 'housing_seeker';

const NewsletterPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState<UserType>('job_seeker');
  const [hasSubscribed, setHasSubscribed] = useState(false);
  // Removed: const { t } = useLanguage(); - undefined hook
  // Removed: duplicate hasSubscribed state declaration

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
    // Here you would typically send the data to your backend
    console.log('Newsletter signup:', { firstName, lastName, email, userType });
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
            <h3 className="text-xl font-bold text-center mb-2 text-gray-900 dark:text-white">Stay Updated</h3>
            <p className="text-gray-600 dark:text-gray-300 text-center mb-4">
              Subscribe to our newsletter for the latest opportunities and resources.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">I am a:</p>
                <RadioGroup value={userType} onValueChange={(value) => setUserType(value as UserType)} className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem id="business_owner" value="business_owner" />
                    <label htmlFor="business_owner" className="text-sm">Business Owner</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem id="landlord" value="landlord" />
                    <label htmlFor="landlord" className="text-sm">Landlord</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem id="job_seeker" value="job_seeker" />
                    <label htmlFor="job_seeker" className="text-sm">Job Seeker</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem id="housing_seeker" value="housing_seeker" />
                    <label htmlFor="housing_seeker" className="text-sm">Housing Seeker</label>
                  </div>
                </RadioGroup>
              </div>
              
              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white">
                Subscribe
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="text-green-500 text-4xl mb-4">✓</div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Thank You!</h3>
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