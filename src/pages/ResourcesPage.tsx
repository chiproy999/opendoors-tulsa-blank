
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/common/Hero';
import ResourceCard, { ResourceData } from '@/components/resources/ResourceCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';

// Mock data
const mockResources: ResourceData[] = [
  {
    id: '1',
    title: 'Employment Rights After Conviction',
    category: 'Employment',
    excerpt: 'Learn about your rights in the job market as someone with a conviction history, including what employers can and cannot ask during interviews.',
    slug: 'employment-rights-after-conviction'
  },
  {
    id: '2',
    title: 'Housing Assistance Programs',
    category: 'Housing',
    excerpt: 'Overview of housing programs in Tulsa that specifically assist individuals with conviction records find stable housing.',
    slug: 'housing-assistance-programs'
  },
  {
    id: '3',
    title: 'Record Expungement Guide',
    category: 'Legal',
    excerpt: 'Step-by-step guide on how to determine if you qualify for record expungement and how to start the process in Oklahoma.',
    slug: 'record-expungement-guide'
  },
  {
    id: '4',
    title: 'Educational Opportunities',
    category: 'Education',
    excerpt: 'Information on scholarships, training programs, and educational institutions that welcome students with conviction histories.',
    slug: 'educational-opportunities'
  },
  {
    id: '5',
    title: 'Mental Health Services',
    category: 'Health',
    excerpt: 'Resources for affordable mental health services and support groups in the Tulsa area.',
    slug: 'mental-health-services'
  },
  {
    id: '6',
    title: 'Financial Aid for Reentry',
    category: 'Financial',
    excerpt: 'Information on grants, loans, and other financial assistance options for those reentering society after incarceration.',
    slug: 'financial-aid-reentry'
  },
  {
    id: '7',
    title: 'Interview Preparation Guide',
    category: 'Employment',
    excerpt: 'Tips and strategies for addressing conviction history during job interviews and how to highlight your skills and qualifications.',
    slug: 'interview-preparation-guide'
  },
  {
    id: '8',
    title: 'Understanding Tenant Screening',
    category: 'Housing',
    excerpt: 'Learn how landlords screen tenants and what you can do to improve your chances of securing housing with a conviction record.',
    slug: 'understanding-tenant-screening'
  },
  {
    id: '9',
    title: 'Substance Abuse Recovery Programs',
    category: 'Health',
    excerpt: 'Directory of substance abuse treatment and recovery programs in Tulsa that offer sliding scale fees or free services.',
    slug: 'substance-abuse-recovery-programs'
  }
];

const ResourcesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  const filteredResources = mockResources.filter(resource => {
    const matchesSearch = searchQuery === '' || 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = activeCategory === 'all' || 
      resource.category.toLowerCase() === activeCategory.toLowerCase();
      
    return matchesSearch && matchesCategory;
  });
  
  const categories = ['all', ...Array.from(new Set(mockResources.map(r => r.category.toLowerCase())))];
  
  return (
    <Layout>
      <Hero
        title="Resources & Guides"
        subtitle="Helpful information and resources for navigating employment, housing, and more with a conviction history."
        backgroundImage="/placeholder.svg"
      />
      
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Input
            type="search"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
        </div>
        
        <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="mb-8">
            {categories.map(category => (
              <TabsTrigger key={category} value={category} className="capitalize">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {categories.map(category => (
            <TabsContent key={category} value={category}>
              <h2 className="text-2xl font-bold text-gray-900 mb-2 capitalize">
                {category === 'all' ? 'All Resources' : `${category} Resources`}
              </h2>
              <p className="text-gray-600 mb-6">
                {category === 'all' 
                  ? 'Helpful information across all categories'
                  : `Resources specific to ${category.toLowerCase()}`}
              </p>
              <Separator className="mb-6" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map(resource => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
              
              {filteredResources.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium text-gray-900 mb-2">No resources found</h3>
                  <p className="text-gray-600">Try adjusting your search criteria</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Layout>
  );
};

export default ResourcesPage;
