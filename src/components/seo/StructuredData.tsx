
import { useEffect } from 'react';

interface LocalBusinessData {
  name: string;
  description: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
  };
  phone: string;
  email: string;
  url: string;
  serviceArea: string[];
  services: string[];
}

interface FAQData {
  question: string;
  answer: string;
}

interface StructuredDataProps {
  type: 'LocalBusiness' | 'FAQ' | 'WebSite' | 'Organization';
  localBusiness?: LocalBusinessData;
  faqs?: FAQData[];
  websiteUrl?: string;
  organizationName?: string;
}

const StructuredData = ({ type, localBusiness, faqs, websiteUrl, organizationName }: StructuredDataProps) => {
  useEffect(() => {
    const createStructuredData = () => {
      let structuredData: any = {};

      switch (type) {
        case 'LocalBusiness':
          if (localBusiness) {
            structuredData = {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": localBusiness.name,
              "description": localBusiness.description,
              "address": {
                "@type": "PostalAddress",
                "streetAddress": localBusiness.address.street,
                "addressLocality": localBusiness.address.city,
                "addressRegion": localBusiness.address.state,
                "postalCode": localBusiness.address.postalCode
              },
              "telephone": localBusiness.phone,
              "email": localBusiness.email,
              "url": localBusiness.url,
              "areaServed": localBusiness.serviceArea,
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Employment and Housing Services",
                "itemListElement": localBusiness.services.map((service, index) => ({
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": service
                  }
                }))
              }
            };
          }
          break;

        case 'FAQ':
          if (faqs && faqs.length > 0) {
            structuredData = {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer
                }
              }))
            };
          }
          break;

        case 'WebSite':
          if (websiteUrl) {
            structuredData = {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Open Doors Tulsa",
              "url": websiteUrl,
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": `${websiteUrl}/jobs?search={search_term_string}`,
                },
                "query-input": "required name=search_term_string"
              }
            };
          }
          break;

        case 'Organization':
          if (organizationName) {
            structuredData = {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": organizationName,
              "url": websiteUrl,
              "logo": `${websiteUrl}/placeholder.svg`,
              "sameAs": [
                "https://twitter.com/opendoorstulsa",
                "https://facebook.com/opendoorstulsa"
              ]
            };
          }
          break;
      }

      if (Object.keys(structuredData).length > 0) {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(structuredData);
        script.id = `structured-data-${type.toLowerCase()}`;
        
        // Remove existing script if it exists
        const existingScript = document.getElementById(`structured-data-${type.toLowerCase()}`);
        if (existingScript) {
          existingScript.remove();
        }
        
        document.head.appendChild(script);
      }
    };

    createStructuredData();

    // Cleanup function to remove the script when component unmounts
    return () => {
      const script = document.getElementById(`structured-data-${type.toLowerCase()}`);
      if (script) {
        script.remove();
      }
    };
  }, [type, localBusiness, faqs, websiteUrl, organizationName]);

  return null;
};

export default StructuredData;
