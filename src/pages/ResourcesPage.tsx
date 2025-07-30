import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/common/Hero';
import ResourcesHeroBackground from '@/components/hero/ResourcesHeroBackground';
import { ResourceData } from '@/components/resources/ResourceCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { InfoIcon, FolderPlus, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import NewsletterSignup from '@/components/common/NewsletterSignup';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
    excerpt: 'Scholarship programs and educational assistance available to individuals with conviction records.',
    slug: 'educational-opportunities'
  },
  {
    id: '5',
    title: 'Mental Health Support',
    category: 'Health',
    excerpt: 'Mental health resources and support groups specifically designed for individuals re-entering society.',
    slug: 'mental-health-support'
  },
  {
    id: '6',
    title: 'Financial Planning After Prison',
    category: 'Financial',
    excerpt: 'Basic financial planning, banking, and credit rebuilding strategies for those starting fresh.',
    slug: 'financial-planning-after-prison'
  },
  {
    id: '7',
    title: 'Transportation Solutions',
    category: 'Transportation',
    excerpt: 'Getting around Tulsa: public transportation options, driver license restoration, and affordable vehicle programs.',
    slug: 'transportation-solutions'
  },
  {
    id: '8',
    title: 'Family Reunification Resources',
    category: 'Family',
    excerpt: 'Support and guidance for rebuilding relationships with family members and children after incarceration.',
    slug: 'family-reunification-resources'
  }
];

const getCategoryColor = (category: string) => {
  const colors: { [key: string]: string } = {
    'Employment': 'bg-blue-100 text-blue-800',
    'Housing': 'bg-green-100 text-green-800',
    'Legal': 'bg-purple-100 text-purple-800',
    'Education': 'bg-yellow-100 text-yellow-800',
    'Health': 'bg-red-100 text-red-800',
    'Financial': 'bg-indigo-100 text-indigo-800',
    'Transportation': 'bg-gray-100 text-gray-800',
    'Family': 'bg-pink-100 text-pink-800'
  };
  return colors[category] || 'bg-gray-100 text-gray-800';
};

const ResourceCard = ({ resource }: { resource: ResourceData }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{resource.title}</CardTitle>
              <Badge className={getCategoryColor(resource.category)}>
                {resource.category}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">{resource.excerpt}</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">
              <FileText className="w-4 h-4 mr-2" />
              Read More
            </Button>
          </CardFooter>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {resource.title}
            <Badge className={getCategoryColor(resource.category)}>
              {resource.category}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            {resource.excerpt}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <p>This is a detailed resource page for {resource.title}. In a real application, this would contain comprehensive information, links to forms, contact information, and step-by-step guides.</p>
          <p>Key topics would include:</p>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
            <li>Specific requirements and eligibility</li>
            <li>Step-by-step process guides</li>
            <li>Required documentation</li>
            <li>Contact information for relevant agencies</li>
            <li>Common questions and answers</li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ResourcesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredResources = mockResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || resource.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(mockResources.map(r => r.category)))];

  return (
    <Layout>
      {/* Custom Hero with Organization Logos */}
      <section 
        className="relative px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32 overflow-hidden"
        role="banner"
        aria-label="Hero section"
      >
        <ResourcesHeroBackground />
        
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Resources & Support
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Connect with Tulsa organizations and find comprehensive resources to support your journey
          </p>
        </div>
      </section>
      
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Input
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
        </div>
        
        <Alert className="my-6 bg-blue-50 text-blue-800 border border-blue-200">
          <InfoIcon className="h-4 w-4 mr-2" />
          <AlertDescription>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <span>
                Are you a service provider who wants to be featured in our resources?
              </span>
              <Link to="/contact">
                <Button className="whitespace-nowrap bg-tulsa-blue hover:bg-tulsa-blue-600">
                  <FolderPlus className="w-4 h-4 mr-2" />
                  Submit Resource
                </Button>
              </Link>
            </div>
          </AlertDescription>
        </Alert>
        
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse Resources</h2>
          
          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-5">
              {categories.slice(0, 5).map(category => (
                <TabsTrigger key={category} value={category} className="capitalize">
                  {category === 'all' ? 'All' : category}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {categories.slice(5).length > 0 && (
              <TabsList className="grid w-full grid-cols-4 mt-2">
                {categories.slice(5).map(category => (
                  <TabsTrigger key={category} value={category} className="capitalize">
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            )}
            
            {categories.map(category => (
              <TabsContent key={category} value={category} className="mt-6">
                {filteredResources.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No resources found</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Try adjusting your search or browse a different category.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredResources.map(resource => (
                      <ResourceCard key={resource.id} resource={resource} />
                    ))}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
        
        <Separator className="my-12" />
        
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Stay Updated with New Resources
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Get notified when we add new resources and opportunities to help you on your journey.
          </p>
          <NewsletterSignup />
        </div>
      </div>
    </Layout>
  );
};

export default ResourcesPage;