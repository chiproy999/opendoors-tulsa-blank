import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

interface Organization {
  name: string;
  description: string;
  website: string;
  logoText: string; // Using text representation for now
  color: string;
}

const organizations: Organization[] = [
  {
    name: "Tulsa Day Center",
    description: "Comprehensive services for homeless individuals",
    website: "https://tulsadaycenter.org",
    logoText: "TDC",
    color: "bg-blue-600"
  },
  {
    name: "Salvation Army Tulsa",
    description: "Emergency assistance and rehabilitation programs",
    website: "https://salvationarmyusa.org",
    logoText: "SA",
    color: "bg-red-600"
  },
  {
    name: "Community Food Bank",
    description: "Fighting hunger in Eastern Oklahoma",
    website: "https://cfbtulsa.org",
    logoText: "CFB",
    color: "bg-green-600"
  },
  {
    name: "Tulsa Housing Authority",
    description: "Affordable housing solutions",
    website: "https://tulsahousingauthority.org",
    logoText: "THA",
    color: "bg-purple-600"
  },
  {
    name: "Mental Health Association",
    description: "Mental health and wellness services",
    website: "https://mhaok.org",
    logoText: "MHA",
    color: "bg-teal-600"
  },
  {
    name: "Youth Services of Tulsa",
    description: "Supporting at-risk youth and families",
    website: "https://yst.org",
    logoText: "YST",
    color: "bg-orange-600"
  }
];

const OrganizationLogos = () => {
  const { t } = useLanguage();

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-8">
        {organizations.map((org, index) => (
          <div
            key={org.name}
            className="group relative"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <Button
              asChild
              variant="outline"
              className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white/90 hover:bg-white border-2 border-white/50 hover:border-white shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-110"
            >
              <a
                href={org.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center text-center"
              >
                <div className={`w-8 h-8 md:w-12 md:h-12 ${org.color} rounded-lg flex items-center justify-center text-white font-bold text-sm md:text-lg mb-1 md:mb-2`}>
                  {org.logoText}
                </div>
                <span className="text-xs md:text-sm font-medium text-gray-800 leading-tight">
                  {org.name.split(' ')[0]}
                </span>
                <ExternalLink className="w-3 h-3 md:w-4 md:h-4 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </Button>
            
            {/* Tooltip */}
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
              {org.description}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 border-4 border-transparent border-b-black/80"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrganizationLogos;