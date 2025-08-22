import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    fbq: (...args: any[]) => void;
    trackEvent: (action: string, category: string, label?: string, value?: number) => void;
    trackJobView: (jobId: string, jobTitle: string) => void;
    trackHousingView: (housingId: string, housingTitle: string) => void;
    trackSearch: (query: string, type: 'job' | 'housing', resultsCount: number) => void;
    trackFavorite: (itemId: string, type: 'job' | 'housing', action: 'add' | 'remove') => void;
  }
}

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

    // Store locally for development
    logEvent(event);
    
    // Send to Google Analytics 4
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: page
      });
    }

    // Send to Meta Pixel
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'PageView');
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

  // Enhanced tracking functions with GA4 and Meta Pixel integration
  useEffect(() => {
    window.trackEvent = (action: string, category: string, label?: string, value?: number) => {
      const event: AnalyticsEvent = {
        action,
        category,
        label,
        value,
        timestamp: Date.now(),
        page: location.pathname
      };
      
      logEvent(event);

      // Send to Google Analytics 4
      if (window.gtag) {
        window.gtag('event', action, {
          event_category: category,
          event_label: label,
          value: value
        });
      }

      // Send to Meta Pixel for key events
      if (window.fbq && ['search', 'job_view', 'housing_view', 'favorite_add'].includes(action)) {
        const pixelEvent = action === 'search' ? 'Search' : 
                          action.includes('view') ? 'ViewContent' : 
                          action.includes('favorite') ? 'AddToWishlist' : 'Other';
        
        window.fbq('track', pixelEvent, {
          content_category: category,
          content_name: label,
          value: value
        });
      }
    };

    // Track job/housing interactions with enhanced analytics
    window.trackJobView = (jobId: string, jobTitle: string) => {
      window.trackEvent('job_view', 'engagement', `${jobTitle} (${jobId})`);
      
      // Enhanced GA4 tracking for jobs
      if (window.gtag) {
        window.gtag('event', 'select_content', {
          content_type: 'job',
          content_id: jobId,
          item_name: jobTitle
        });
      }
    };

    window.trackHousingView = (housingId: string, housingTitle: string) => {
      window.trackEvent('housing_view', 'engagement', `${housingTitle} (${housingId})`);
      
      // Enhanced GA4 tracking for housing
      if (window.gtag) {
        window.gtag('event', 'select_content', {
          content_type: 'housing',
          content_id: housingId,
          item_name: housingTitle
        });
      }
    };

    window.trackSearch = (query: string, type: 'job' | 'housing', resultsCount: number) => {
      window.trackEvent('search', type, query, resultsCount);
      
      // Enhanced GA4 search tracking
      if (window.gtag) {
        window.gtag('event', 'search', {
          search_term: query,
          content_type: type,
          results_count: resultsCount
        });
      }
    };

    window.trackFavorite = (itemId: string, type: 'job' | 'housing', action: 'add' | 'remove') => {
      window.trackEvent(`favorite_${action}`, type, itemId);
      
      // Enhanced GA4 favorite tracking
      if (window.gtag) {
        const eventName = action === 'add' ? 'add_to_wishlist' : 'remove_from_wishlist';
        window.gtag('event', eventName, {
          content_type: type,
          content_id: itemId
        });
      }
    };
  }, [location.pathname]);

  return null;
};

export default AnalyticsTracker;
