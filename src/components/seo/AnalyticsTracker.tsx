import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  timestamp: number;
  page: string;
  userId?: string;
}

const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page views
    trackPageView(location.pathname);
  }, [location.pathname]);

  const trackPageView = (page: string) => {
    const event: AnalyticsEvent = {
      action: 'page_view',
      category: 'navigation',
      label: page,
      timestamp: Date.now(),
      page
    };

    // Store locally for now - in production, send to analytics service
    logEvent(event);
    
    // Example: Send to Google Analytics (if implemented)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: document.title,
        page_location: window.location.href
      });
    }
  };

  const logEvent = (event: AnalyticsEvent) => {
    // Store in localStorage for development
    const existingEvents = JSON.parse(localStorage.getItem('analytics-events') || '[]');
    existingEvents.push(event);
    
    // Keep only last 100 events
    if (existingEvents.length > 100) {
      existingEvents.splice(0, existingEvents.length - 100);
    }
    
    localStorage.setItem('analytics-events', JSON.stringify(existingEvents));
    
    // Log for development
    console.log('Analytics Event:', event);
  };

  // Expose tracking functions globally
  useEffect(() => {
    (window as any).trackEvent = (action: string, category: string, label?: string, value?: number) => {
      const event: AnalyticsEvent = {
        action,
        category,
        label,
        value,
        timestamp: Date.now(),
        page: location.pathname
      };
      logEvent(event);
    };

    // Track job/housing interactions
    (window as any).trackJobView = (jobId: string, jobTitle: string) => {
      (window as any).trackEvent('job_view', 'engagement', `${jobTitle} (${jobId})`);
    };

    (window as any).trackHousingView = (housingId: string, housingTitle: string) => {
      (window as any).trackEvent('housing_view', 'engagement', `${housingTitle} (${housingId})`);
    };

    (window as any).trackSearch = (query: string, type: 'job' | 'housing', resultsCount: number) => {
      (window as any).trackEvent('search', type, query, resultsCount);
    };

    (window as any).trackFavorite = (itemId: string, type: 'job' | 'housing', action: 'add' | 'remove') => {
      (window as any).trackEvent(`favorite_${action}`, type, itemId);
    };
  }, [location.pathname]);

  return null;
};

export default AnalyticsTracker;
