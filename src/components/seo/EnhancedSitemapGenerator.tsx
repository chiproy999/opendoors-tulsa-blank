import { useEffect, useState } from 'react';
import { JobService } from '@/services/jobService';
import { HousingService } from '@/services/housingService';
import { createSlug } from '@/utils/slugUtils';

interface SitemapEntry {
  url: string;
  lastModified?: string;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

const EnhancedSitemapGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    generateEnhancedSitemap();
  }, []);

  const generateEnhancedSitemap = async () => {
    if (isGenerating) return;
    setIsGenerating(true);

    try {
      const baseUrl = 'https://opendoorstulsa.com';
      const currentDate = new Date().toISOString();
      
      // Static pages
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

      // Dynamic job pages
      const jobResult = await JobService.getAllJobs();
      const jobPages: SitemapEntry[] = jobResult.data.map(job => ({
        url: `${baseUrl}/jobs/${createSlug(job.title, job.id)}`,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
        lastModified: currentDate
      }));

      // Dynamic housing pages
      const housingResult = await HousingService.getAllHousing();
      const housingPages: SitemapEntry[] = housingResult.data.map(housing => ({
        url: `${baseUrl}/housing/${createSlug(housing.title, housing.id)}`,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
        lastModified: currentDate
      }));

      const allPages = [...staticPages, ...jobPages, ...housingPages];
      const sitemap = generateSitemapXML(allPages);
      
      // Store enhanced sitemap
      localStorage.setItem('enhanced-sitemap', sitemap);
      
      console.log(`Enhanced sitemap generated with ${allPages.length} URLs:`, sitemap);
      
      // Generate sitemap index for large sites
      if (allPages.length > 50) {
        generateSitemapIndex(baseUrl, allPages.length);
      }
    } catch (error) {
      console.error('Error generating enhanced sitemap:', error);
    } finally {
      setIsGenerating(false);
    }
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

  const generateSitemapIndex = (baseUrl: string, totalUrls: number) => {
    const currentDate = new Date().toISOString();
    const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-jobs.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-housing.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
</sitemapindex>`;

    localStorage.setItem('sitemap-index', sitemapIndex);
    console.log('Generated sitemap index for large site');
  };

  return null;
};

export default EnhancedSitemapGenerator;