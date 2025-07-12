import { useEffect } from 'react';

interface LocalBusinessLocation {
  name: string;
  city: string;
  state: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

const LocalSEOEnhancer = () => {
  const serviceLocations: LocalBusinessLocation[] = [
    { name: "Tulsa", city: "Tulsa", state: "Oklahoma", coordinates: { latitude: 36.1539, longitude: -95.9928 } },
    { name: "Broken Arrow", city: "Broken Arrow", state: "Oklahoma", coordinates: { latitude: 36.0526, longitude: -95.7969 } },
    { name: "Sand Springs", city: "Sand Springs", state: "Oklahoma", coordinates: { latitude: 36.1398, longitude: -96.1089 } },
    { name: "Sapulpa", city: "Sapulpa", state: "Oklahoma", coordinates: { latitude: 35.9987, longitude: -96.1142 } },
    { name: "Bixby", city: "Bixby", state: "Oklahoma", coordinates: { latitude: 35.9420, longitude: -95.8833 } },
    { name: "Jenks", city: "Jenks", state: "Oklahoma", coordinates: { latitude: 36.0223, longitude: -95.9683 } },
    { name: "Owasso", city: "Owasso", state: "Oklahoma", coordinates: { latitude: 36.2695, longitude: -95.8547 } }
  ];

  useEffect(() => {
    addLocalBusinessSchema();
    addServiceAreaSchema();
    addGeoLocationSchema();
  }, []);

  const addLocalBusinessSchema = () => {
    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Open Doors Tulsa",
      "description": "Connecting individuals with conviction histories to second-chance-friendly jobs and housing opportunities in the greater Tulsa metropolitan area.",
      "url": "https://opendoorstulsa.com",
      "telephone": "(918) 555-1234",
      "email": "info@opendoorstulsa.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 Main Street, Suite 456",
        "addressLocality": "Tulsa",
        "addressRegion": "OK",
        "postalCode": "74103",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 36.1539,
        "longitude": -95.9928
      },
      "areaServed": serviceLocations.map(location => ({
        "@type": "City",
        "name": location.city,
        "containedInPlace": {
          "@type": "State",
          "name": location.state
        }
      })),
      "serviceType": [
        "Second Chance Job Placement Services",
        "Fair Chance Housing Assistance",
        "Reentry Support Services",
        "Employer Partnership Programs",
        "Landlord Partnership Programs"
      ],
      "knowsAbout": [
        "Second Chance Employment",
        "Fair Chance Hiring",
        "Reentry Programs",
        "Conviction History Support",
        "Housing After Incarceration",
        "Ban the Box Employers",
        "Oklahoma Reentry Resources"
      ],
      "openingHours": "Mo-Fr 09:00-17:00",
      "priceRange": "Free",
      "sameAs": [
        "https://www.facebook.com/opendoorstulsa",
        "https://www.linkedin.com/company/opendoorstulsa",
        "https://twitter.com/opendoorstulsa"
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-type', 'local-business-schema');
    script.textContent = JSON.stringify(localBusinessSchema);
    document.head.appendChild(script);
  };

  const addServiceAreaSchema = () => {
    const serviceAreaSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Second Chance Employment and Housing Services",
      "provider": {
        "@type": "Organization",
        "name": "Open Doors Tulsa"
      },
      "areaServed": serviceLocations.map(location => ({
        "@type": "Place",
        "name": `${location.city}, ${location.state}`,
        "geo": location.coordinates ? {
          "@type": "GeoCoordinates",
          "latitude": location.coordinates.latitude,
          "longitude": location.coordinates.longitude
        } : undefined
      })),
      "serviceType": "Employment and Housing Assistance for Individuals with Conviction Histories",
      "description": "Comprehensive support services connecting job seekers and housing seekers with conviction histories to fair chance employers and landlords throughout the greater Tulsa metropolitan area."
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-type', 'service-area-schema');
    script.textContent = JSON.stringify(serviceAreaSchema);
    document.head.appendChild(script);
  };

  const addGeoLocationSchema = () => {
    serviceLocations.forEach(location => {
      if (location.coordinates) {
        const geoSchema = {
          "@context": "https://schema.org",
          "@type": "Place",
          "name": `Open Doors Tulsa Service Area - ${location.city}`,
          "description": `Second chance employment and housing services available in ${location.city}, ${location.state}`,
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": location.coordinates.latitude,
            "longitude": location.coordinates.longitude
          },
          "address": {
            "@type": "PostalAddress",
            "addressLocality": location.city,
            "addressRegion": "OK",
            "addressCountry": "US"
          }
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-type', `geo-schema-${location.city.toLowerCase()}`);
        script.textContent = JSON.stringify(geoSchema);
        document.head.appendChild(script);
      }
    });
  };

  return null;
};

export default LocalSEOEnhancer;