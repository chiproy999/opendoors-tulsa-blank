import { useEffect } from 'react';

interface SitemapEntry {
  url: string;
  lastModified?: string;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

const SitemapGenerator = () => {
  useEffect(() => {
    generateSitemap();
  }, []);

  const generateSitemap = () => {
    const baseUrl = 'https://opendoorstulsa.com';
    const currentDate = new Date().toISOString();
    
    const staticPages: SitemapEntry[] = [
      { url: baseUrl, changeFrequency: 'weekly', priority: 1.0, lastModified: currentDate },
      { url: `${baseUrl}/jobs`, changeFrequency: 'daily', priority: 0.9, lastModified: currentDate },
      { url: `${baseUrl}/housing`, changeFrequency: 'daily', priority: 0.9, lastModified: currentDate },
      { url: `${baseUrl}/resources`, changeFrequency: 'weekly', priority: 0.8, lastModified: currentDate },
      { url: `${baseUrl}/about`, changeFrequency: 'monthly', priority: 0.7, lastModified: currentDate },
      { url: `${baseUrl}/contact`, changeFrequency: 'monthly', priority: 0.6, lastModified: currentDate },
      { url: `${baseUrl}/auth/login`, changeFrequency: 'yearly', priority: 0.3, lastModified: currentDate },
      { url: `${baseUrl}/auth/register`, changeFrequency: 'yearly', priority: 0.3, lastModified: currentDate },
      { url: `${baseUrl}/privacy`, changeFrequency: 'yearly', priority: 0.2, lastModified: currentDate },
      { url: `${baseUrl}/terms`, changeFrequency: 'yearly', priority: 0.2, lastModified: currentDate },
      { url: `${baseUrl}/accessibility`, changeFrequency: 'yearly', priority: 0.2, lastModified: currentDate },
    ];

    const sitemap = generateSitemapXML(staticPages);
    
    // Store sitemap in localStorage for development
    localStorage.setItem('sitemap', sitemap);
    
    // In production, this would be sent to a server endpoint
    console.log('Generated sitemap:', sitemap);
  };

  const generateSitemapXML = (entries: SitemapEntry[]): string => {
    const xmlEntries = entries.map(entry => `
  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastModified}</lastmod>
    <changefreq>${entry.changeFrequency || 'monthly'}</changefreq>
    <priority>${entry.priority || 0.5}</priority>
  </url>`).join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlEntries}
</urlset>`;
  };

  return null;
};

export default SitemapGenerator;