
import { useEffect } from 'react';

interface SEOMetaProps {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  articleAuthor?: string;
  articlePublishedTime?: string;
  articleModifiedTime?: string;
  noindex?: boolean;
  locale?: string;
}

const EnhancedSEOMeta = ({ 
  title, 
  description, 
  keywords, 
  canonicalUrl,
  ogImage = "https://lovable.dev/opengraph-image-p98pqg.png",
  ogType = "website",
  articleAuthor,
  articlePublishedTime,
  articleModifiedTime,
  noindex = false,
  locale = "en_US"
}: SEOMetaProps) => {
  useEffect(() => {
    // Set document title
    document.title = title;
    
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector);
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('robots', noindex ? 'noindex, nofollow' : 'index, follow');
    
    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', ogType, true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:locale', locale, true);
    
    if (canonicalUrl) {
      updateMetaTag('og:url', canonicalUrl, true);
    }

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);
    updateMetaTag('twitter:site', '@opendoorstulsa');

    // Article specific tags
    if (articleAuthor) {
      updateMetaTag('article:author', articleAuthor, true);
    }
    if (articlePublishedTime) {
      updateMetaTag('article:published_time', articlePublishedTime, true);
    }
    if (articleModifiedTime) {
      updateMetaTag('article:modified_time', articleModifiedTime, true);
    }

    // Canonical URL
    if (canonicalUrl) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', canonicalUrl);
    }

    // Viewport and mobile optimization
    let viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
      viewport = document.createElement('meta');
      viewport.setAttribute('name', 'viewport');
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=5.0');
      document.head.appendChild(viewport);
    }

  }, [title, description, keywords, canonicalUrl, ogImage, ogType, articleAuthor, articlePublishedTime, articleModifiedTime, noindex, locale]);

  return null;
};

export default EnhancedSEOMeta;
