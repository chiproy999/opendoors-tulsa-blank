
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
  businessCTA?: {
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
  businessCTA,
  backgroundImage,
}: HeroProps) => {
  const bgStyle = backgroundImage 
    ? { backgroundImage: `url(${backgroundImage})` }
    : {};

  const bgClass = backgroundImage
    ? "bg-cover bg-center bg-no-repeat"
    : "bg-gradient-to-br from-red-600 to-red-800";

  return (
    <div 
      className={`relative px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32 ${bgClass}`}
      style={bgStyle}
    >
      {/* Overlay for background images */}
      {backgroundImage && (
        <div className="absolute inset-0 bg-black opacity-60"></div>
      )}
      
      <div className="relative max-w-4xl mx-auto text-center">
        <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white`}>
          {title}
        </h1>
        <p className={`mt-4 text-base sm:text-lg md:text-xl leading-7 text-gray-200`}>
          {subtitle}
        </p>
        
        {(primaryCTA || secondaryCTA) && (
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            {primaryCTA && (
              <Link to={primaryCTA.link}>
                <Button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 w-full sm:w-auto text-base">
                  {primaryCTA.text}
                </Button>
              </Link>
            )}
            
            {secondaryCTA && (
              <Link to={secondaryCTA.link}>
                <Button variant="outline" className="bg-white/20 backdrop-blur border-white text-white hover:bg-white hover:text-red-700 font-semibold px-6 py-2 w-full sm:w-auto text-base">
                  {secondaryCTA.text}
                </Button>
              </Link>
            )}
          </div>
        )}
        
        {businessCTA && (
          <div className="mt-6">
            <Link to={businessCTA.link}>
              <Button variant="link" className="text-white hover:text-red-200 font-medium">
                {businessCTA.text} →
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
