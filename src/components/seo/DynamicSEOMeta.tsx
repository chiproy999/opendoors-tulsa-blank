import { useEffect } from 'react';
import { JobData, HousingData } from '@/types';

interface DynamicSEOMetaProps {
  type: 'job' | 'housing';
  data: JobData | HousingData;
  canonicalUrl?: string;
}

const DynamicSEOMeta = ({ type, data, canonicalUrl }: DynamicSEOMetaProps) => {
  useEffect(() => {
    // Generate dynamic meta content
    const isJob = type === 'job';
    const jobData = data as JobData;
    const housingData = data as HousingData;
    
    const title = isJob 
      ? `${jobData.title} at ${jobData.company} - Open Doors Tulsa`
      : `${housingData.title} - Housing in ${housingData.address} - Open Doors Tulsa`;
    
    const description = isJob
      ? `${jobData.title} position at ${jobData.company} in ${jobData.location}. ${jobData.salaryRange ? `Salary: ${jobData.salaryRange}. ` : ''}Open to all backgrounds. Apply now through Open Doors Tulsa.`
      : `${housingData.bedrooms} bedroom rental at ${housingData.address}. Rent: $${housingData.rent}/month. ${housingData.petFriendly ? 'Pet-friendly. ' : ''}Open to all backgrounds.`;
    
    const keywords = isJob
      ? `jobs tulsa, second chance employment, ${jobData.title.toLowerCase()}, ${jobData.company.toLowerCase()}, ${jobData.location.toLowerCase()}, conviction friendly jobs`
      : `housing tulsa, second chance housing, ${housingData.bedrooms} bedroom, ${housingData.address.toLowerCase()}, conviction friendly housing, affordable housing`;

    // Update meta tags
    document.title = title;
    
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    
    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', 'website', true);
    updateMetaTag('og:site_name', 'Open Doors Tulsa', true);
    
    if (canonicalUrl) {
      updateMetaTag('og:url', canonicalUrl, true);
      updateCanonicalTag(canonicalUrl);
    }
    
    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary', true);
    updateMetaTag('twitter:title', title, true);
    updateMetaTag('twitter:description', description, true);
    
    // Add structured data
    addStructuredData(type, data, canonicalUrl);
    
    return () => {
      // Cleanup structured data on unmount
      const existingScript = document.querySelector('script[data-type="dynamic-seo"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [type, data, canonicalUrl]);

  const updateMetaTag = (name: string, content: string, property = false) => {
    const attribute = property ? 'property' : 'name';
    let meta = document.querySelector(`meta[${attribute}="${name}"]`);
    
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute(attribute, name);
      document.head.appendChild(meta);
    }
    
    meta.setAttribute('content', content);
  };

  const updateCanonicalTag = (url: string) => {
    let canonical = document.querySelector('link[rel="canonical"]');
    
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    
    canonical.setAttribute('href', url);
  };

  const addStructuredData = (type: string, data: JobData | HousingData, url?: string) => {
    // Remove existing structured data
    const existingScript = document.querySelector('script[data-type="dynamic-seo"]');
    if (existingScript) {
      existingScript.remove();
    }

    const isJob = type === 'job';
    const jobData = data as JobData;
    const housingData = data as HousingData;

    let structuredData;

    if (isJob) {
      structuredData = {
        "@context": "https://schema.org",
        "@type": "JobPosting",
        "title": jobData.title,
        "description": jobData.description,
        "hiringOrganization": {
          "@type": "Organization",
          "name": jobData.company
        },
        "jobLocation": {
          "@type": "Place",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": jobData.location
          }
        },
        "datePosted": jobData.postedAt,
        "employmentType": jobData.employmentType?.toUpperCase() || "FULL_TIME",
        "qualifications": jobData.requirements,
        "jobBenefits": jobData.benefits,
        "url": url,
        "industry": "Second Chance Employment",
        "specialCommitments": "Second Chance Employment - Open to individuals with conviction histories"
      };

      if (jobData.salaryRange) {
        const salaryMatch = jobData.salaryRange.match(/\$?([\d,]+)/);
        if (salaryMatch) {
          structuredData.baseSalary = {
            "@type": "MonetaryAmount",
            "currency": "USD",
            "value": {
              "@type": "QuantitativeValue",
              "value": parseInt(salaryMatch[1].replace(/,/g, '')),
              "unitText": "YEAR"
            }
          };
        }
      }
    } else {
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Accommodation",
        "name": housingData.title,
        "description": housingData.description,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": housingData.address
        },
        "numberOfRooms": housingData.bedrooms,
        "numberOfBathroomsTotal": housingData.bathrooms,
        "floorSize": housingData.squareFeet ? {
          "@type": "QuantitativeValue",
          "value": housingData.squareFeet,
          "unitCode": "FTK"
        } : undefined,
        "petsAllowed": housingData.petFriendly,
        "priceRange": `$${housingData.rent}`,
        "url": url,
        "amenityFeature": housingData.amenities ? housingData.amenities.split(',').map(amenity => ({
          "@type": "LocationFeatureSpecification",
          "name": amenity.trim()
        })) : undefined,
        "specialCommitments": "Second Chance Housing - Open to individuals with conviction histories"
      };
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-type', 'dynamic-seo');
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
  };

  return null;
};

export default DynamicSEOMeta;