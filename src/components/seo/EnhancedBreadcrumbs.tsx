import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbData {
  name: string;
  url: string;
}

const EnhancedBreadcrumbs = () => {
  const location = useLocation();

  useEffect(() => {
    // Generate structured data for breadcrumbs
    const breadcrumbs = generateBreadcrumbData(location.pathname);
    addBreadcrumbSchema(breadcrumbs);
  }, [location.pathname]);

  const generateBreadcrumbData = (pathname: string): BreadcrumbData[] => {
    const pathSegments = pathname.split('/').filter(segment => segment);
    const breadcrumbs: BreadcrumbData[] = [
      { name: 'Home', url: 'https://opendoorstulsa.com' }
    ];

    let currentPath = '';
    pathSegments.forEach(segment => {
      currentPath += `/${segment}`;
      const name = formatSegmentName(segment);
      breadcrumbs.push({
        name,
        url: `https://opendoorstulsa.com${currentPath}`
      });
    });

    return breadcrumbs;
  };

  const formatSegmentName = (segment: string): string => {
    const nameMap: { [key: string]: string } = {
      'jobs': 'Jobs',
      'housing': 'Housing',
      'resources': 'Resources',
      'about': 'About',
      'contact': 'Contact',
      'auth': 'Authentication',
      'login': 'Login',
      'register': 'Register',
      'admin': 'Administration',
      'users': 'User Management',
      'privacy': 'Privacy Policy',
      'terms': 'Terms of Service',
      'accessibility': 'Accessibility'
    };

    return nameMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
  };

  const addBreadcrumbSchema = (breadcrumbs: BreadcrumbData[]) => {
    // Remove existing breadcrumb schema
    const existingSchema = document.querySelector('script[data-type="breadcrumb-schema"]');
    if (existingSchema) {
      existingSchema.remove();
    }

    // Create new breadcrumb schema
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((breadcrumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": breadcrumb.name,
        "item": breadcrumb.url
      }))
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-type', 'breadcrumb-schema');
    script.textContent = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(script);
  };

  const breadcrumbs = generateBreadcrumbData(location.pathname);
  
  // Don't show breadcrumbs on home page
  if (location.pathname === '/') {
    return null;
  }

  return (
    <div className="container py-4">
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((breadcrumb, index) => (
            <div key={breadcrumb.url} className="flex items-center">
              <BreadcrumbItem>
                {index === breadcrumbs.length - 1 ? (
                  <BreadcrumbPage className="text-foreground font-medium">
                    {breadcrumb.name}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink 
                    href={breadcrumb.url.replace('https://opendoorstulsa.com', '')}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {breadcrumb.name}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
            </div>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default EnhancedBreadcrumbs;