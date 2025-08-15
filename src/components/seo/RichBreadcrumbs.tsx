import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from '@/components/ui/breadcrumb';
import { JobData, HousingData } from '@/types';

interface RichBreadcrumbsProps {
  currentPage?: string;
  data?: JobData | HousingData;
  type?: 'job' | 'housing';
}

const RichBreadcrumbs = ({ currentPage, data, type }: RichBreadcrumbsProps) => {
  const location = useLocation();

  useEffect(() => {
    // Add structured data for breadcrumbs
    addBreadcrumbStructuredData();
    
    return () => {
      // Cleanup
      const existingScript = document.querySelector('script[data-type="breadcrumbs"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [location.pathname, currentPage, data]);

  const getBreadcrumbItems = () => {
    const items = [{ name: 'Home', url: '/' }];
    const segments = location.pathname.split('/').filter(Boolean);

    segments.forEach((segment, index) => {
      const path = '/' + segments.slice(0, index + 1).join('/');
      
      if (segment === 'jobs') {
        items.push({ name: 'Jobs', url: '/jobs' });
      } else if (segment === 'housing') {
        items.push({ name: 'Housing', url: '/housing' });
      } else if (segment === 'resources') {
        items.push({ name: 'Resources', url: '/resources' });
      } else if (segment === 'about') {
        items.push({ name: 'About', url: '/about' });
      } else if (segment === 'contact') {
        items.push({ name: 'Contact', url: '/contact' });
      } else if (index === segments.length - 1 && (currentPage || data)) {
        // Last segment - detail page
        const name = currentPage || (data && type === 'job' 
          ? (data as JobData).title 
          : data && type === 'housing' 
            ? (data as HousingData).title
            : segment);
        items.push({ name, url: path });
      }
    });

    return items;
  };

  const addBreadcrumbStructuredData = () => {
    const existingScript = document.querySelector('script[data-type="breadcrumbs"]');
    if (existingScript) {
      existingScript.remove();
    }

    const items = getBreadcrumbItems();
    const baseUrl = 'https://opendoorstulsa.com';
    
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": `${baseUrl}${item.url}`
      }))
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-type', 'breadcrumbs');
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
  };

  const breadcrumbItems = getBreadcrumbItems();
  
  if (breadcrumbItems.length <= 1) return null;

  return (
    <nav className="mb-6" aria-label="Breadcrumb">
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbItems.map((item, index) => (
            <div key={item.url} className="flex items-center">
              <BreadcrumbItem>
                {index === breadcrumbItems.length - 1 ? (
                  <BreadcrumbPage className="font-medium text-foreground">
                    {item.name}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink 
                    href={item.url}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
            </div>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </nav>
  );
};

export default RichBreadcrumbs;