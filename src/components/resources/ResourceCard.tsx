
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface ResourceData {
  id: string;
  title: string;
  category: string;
  excerpt: string; // Short excerpt from bodyMarkdown
  slug: string;
}

interface ResourceCardProps {
  resource: ResourceData;
}

const ResourceCard = ({ resource }: ResourceCardProps) => {
  const getCategoryColor = (category: string) => {
    switch(category.toLowerCase()) {
      case 'employment':
        return 'bg-blue-500 hover:bg-blue-600';
      case 'housing':
        return 'bg-green-500 hover:bg-green-600';
      case 'legal':
        return 'bg-purple-500 hover:bg-purple-600';
      case 'education':
        return 'bg-amber-500 hover:bg-amber-600';
      case 'health':
        return 'bg-red-500 hover:bg-red-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  return (
    <Link to={`/resources/${resource.slug}`}>
      <Card className="h-full transition-all hover:shadow-md hover:border-tulsa-blue-200">
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl font-semibold text-tulsa-blue-700">
              {resource.title}
            </CardTitle>
            <Badge className={getCategoryColor(resource.category)}>
              {resource.category}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">
            {resource.excerpt}
          </p>
        </CardContent>
        <CardFooter className="pt-2">
          <span className="text-tulsa-blue-600 text-sm font-medium hover:underline">
            Read more →
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ResourceCard;
