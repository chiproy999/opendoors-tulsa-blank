
import { useEffect } from 'react';

type SEOMetaProps = {
  title: string;
  description: string;
  keywords: string;
};

const SEOMeta = ({ title, description, keywords }: SEOMetaProps) => {
  useEffect(() => {
    document.title = title;
    
    // Add meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);
    
    // Add meta keywords
    let metaKeys = document.querySelector('meta[name="keywords"]');
    if (!metaKeys) {
      metaKeys = document.createElement('meta');
      metaKeys.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeys);
    }
    metaKeys.setAttribute('content', keywords);
  }, [title, description, keywords]);

  // This component doesn't render anything visually
  return null;
};

export default SEOMeta;
