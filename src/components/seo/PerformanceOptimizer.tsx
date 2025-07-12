import { useEffect } from 'react';

const PerformanceOptimizer = () => {
  useEffect(() => {
    // Preload critical resources
    preloadCriticalResources();
    
    // Setup lazy loading for images
    setupLazyLoading();
    
    // Monitor Core Web Vitals
    monitorWebVitals();
  }, []);

  const preloadCriticalResources = () => {
    // Preload critical fonts
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
    fontLink.as = 'style';
    fontLink.crossOrigin = 'anonymous';
    document.head.appendChild(fontLink);

    // Add DNS prefetch for external resources
    const dnsPrefetch = document.createElement('link');
    dnsPrefetch.rel = 'dns-prefetch';
    dnsPrefetch.href = '//fonts.googleapis.com';
    document.head.appendChild(dnsPrefetch);
  };

  const setupLazyLoading = () => {
    // Native lazy loading is already supported by modern browsers
    // This ensures all images have proper loading attributes
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (!img.getAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
      }
      if (!img.getAttribute('decoding')) {
        img.setAttribute('decoding', 'async');
      }
    });
  };

  const monitorWebVitals = () => {
    if ('web-vital' in window || typeof window !== 'undefined') {
      // This is a placeholder for web vitals monitoring
      // In production, you would use libraries like web-vitals
      console.log('Web Vitals monitoring initialized');
    }
  };

  return null;
};

export default PerformanceOptimizer;