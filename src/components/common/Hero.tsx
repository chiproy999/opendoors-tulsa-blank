
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

interface HeroProps {
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
  backgroundImage?: string;
}

const Hero = ({
  title,
  subtitle,
  primaryCTA,
  secondaryCTA,
  backgroundImage,
}: HeroProps) => {
  const bgStyle = backgroundImage 
    ? { backgroundImage: `url(${backgroundImage})` }
    : {};

  const bgClass = backgroundImage
    ? "bg-cover bg-center bg-no-repeat"
    : "bg-gradient-to-br from-tulsa-blue-700 to-tulsa-blue-900";

  return (
    <div 
      className={`relative px-6 lg:px-8 py-24 md:py-32 lg:py-40 ${bgClass}`}
      style={bgStyle}
    >
      {/* Overlay for background images */}
      {backgroundImage && (
        <div className="absolute inset-0 bg-black opacity-60"></div>
      )}
      
      <div className="relative max-w-3xl mx-auto text-center">
        <h1 className={`text-4xl font-bold tracking-tight sm:text-6xl mb-4 ${backgroundImage ? 'text-white' : 'text-white'}`}>
          {title}
        </h1>
        <p className={`mt-6 text-lg leading-8 ${backgroundImage ? 'text-gray-200' : 'text-gray-200'}`}>
          {subtitle}
        </p>
        
        {(primaryCTA || secondaryCTA) && (
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-4">
            {primaryCTA && (
              <Link to={primaryCTA.link}>
                <Button className="bg-tulsa-orange hover:bg-tulsa-orange-600 text-white font-semibold px-6 py-2">
                  {primaryCTA.text}
                </Button>
              </Link>
            )}
            
            {secondaryCTA && (
              <Link to={secondaryCTA.link}>
                <Button variant="outline" className="bg-white/20 backdrop-blur border-white text-white hover:bg-white hover:text-tulsa-blue-700 font-semibold px-6 py-2">
                  {secondaryCTA.text}
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
