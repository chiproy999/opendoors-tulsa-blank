
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/context/LanguageContext';

interface HeroProps {
  title?: string;
  subtitle?: string;
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
}: HeroProps = {}) => {
  const { t } = useLanguage();
  
  // Use translations if no custom props provided
  const displayTitle = title || t('hero.title');
  const displaySubtitle = subtitle || t('hero.subtitle');
  const displayPrimaryCTA = primaryCTA || { text: t('hero.primaryCTA'), link: '/jobs' };
  const displaySecondaryCTA = secondaryCTA || { text: t('hero.secondaryCTA'), link: '/housing' };
  const displayBusinessCTA = businessCTA || { text: t('hero.businessCTA'), link: '/contact' };
  const bgStyle = backgroundImage 
    ? { backgroundImage: `url(${backgroundImage})` }
    : {};

  const bgClass = backgroundImage
    ? "bg-cover bg-center bg-no-repeat"
    : "bg-gradient-hero relative overflow-hidden";

  return (
    <div 
      className={`relative px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32 ${bgClass}`}
      style={bgStyle}
    >
      {/* Animated background elements */}
      {!backgroundImage && (
        <>
          <div className="absolute inset-0 bg-gradient-hero"></div>
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/3 rounded-full blur-3xl animate-float-delayed"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-400/10 rounded-full blur-2xl animate-pulse-slow"></div>
          </div>
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </>
      )}
      
      {/* Overlay for background images */}
      {backgroundImage && (
        <div className="absolute inset-0 bg-black opacity-60"></div>
      )}
      
      <div className="relative max-w-4xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-white animate-fade-in">
          {displayTitle}
        </h1>
        <p className="mt-6 text-lg sm:text-xl md:text-2xl leading-8 text-gray-100 max-w-3xl mx-auto animate-fade-in-delayed">
          {displaySubtitle}
        </p>
        
        {(displayPrimaryCTA || displaySecondaryCTA) && (
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-delayed">
            {displayPrimaryCTA && (
              <Link to={displayPrimaryCTA.link}>
                <Button className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white hover:text-primary text-white font-semibold px-8 py-3 text-lg transition-all duration-300 transform hover:scale-105 shadow-glow">
                  {displayPrimaryCTA.text}
                </Button>
              </Link>
            )}
            
            {displaySecondaryCTA && (
              <Link to={displaySecondaryCTA.link}>
                <Button variant="outline" className="bg-transparent border-2 border-white/30 backdrop-blur-sm hover:bg-white/10 text-white font-semibold px-8 py-3 text-lg transition-all duration-300 transform hover:scale-105">
                  {displaySecondaryCTA.text}
                </Button>
              </Link>
            )}
          </div>
        )}
        
        {displayBusinessCTA && (
          <div className="mt-8 animate-fade-in-delayed">
            <Link to={displayBusinessCTA.link}>
              <Button variant="link" className="text-white/90 hover:text-white font-medium text-lg group transition-all duration-300">
                {displayBusinessCTA.text} 
                <span className="inline-block transform group-hover:translate-x-1 transition-transform duration-300 ml-2">→</span>
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
