import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import HeroButton from './HeroButton';

interface HeroContentProps {
  title: string;
  subtitle: string;
  primaryCTA?: {
    text: string;
    link: string;
  };
  secondaryCTA?: {
    text: string;
    link: string;
  };
  businessCTA?: {
    text: string;
    link: string;
  };
}

const HeroContent = ({ 
  title, 
  subtitle, 
  primaryCTA, 
  secondaryCTA, 
  businessCTA 
}: HeroContentProps) => {
  return (
    <div className="relative max-w-4xl mx-auto text-center">
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 text-white animate-fade-in">
        <span className="bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent drop-shadow-lg">
          {title}
        </span>
      </h1>
      
      <p className="mt-6 text-xl sm:text-2xl md:text-3xl leading-relaxed text-gray-100/90 max-w-4xl mx-auto animate-fade-in-delayed font-light">
        {subtitle}
      </p>
      
      {(primaryCTA || secondaryCTA) && (
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-delayed">
          {primaryCTA && (
            <HeroButton href={primaryCTA.link} variant="primary">
              {primaryCTA.text}
            </HeroButton>
          )}
          
          {secondaryCTA && (
            <HeroButton href={secondaryCTA.link} variant="secondary">
              {secondaryCTA.text}
            </HeroButton>
          )}
        </div>
      )}
      
      {businessCTA && (
        <div className="mt-8 animate-fade-in-delayed">
          <Link to={businessCTA.link}>
            <Button 
              variant="link" 
              className="text-white/90 hover:text-white font-medium text-lg group transition-all duration-300"
            >
              {businessCTA.text}
              <span className="inline-block transform group-hover:translate-x-1 transition-transform duration-300 ml-2">
                →
              </span>
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default HeroContent;