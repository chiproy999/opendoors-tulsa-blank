
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
      {/* Enhanced animated background elements */}
      {!backgroundImage && (
        <>
          <div className="absolute inset-0 bg-gradient-hero"></div>
          <div className="absolute inset-0">
            {/* Floating geometric shapes */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/3 rounded-full blur-3xl animate-float-delayed"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-400/10 rounded-full blur-2xl animate-pulse-slow"></div>
            
            {/* Decorative doors/opportunities icons */}
            <div className="absolute top-32 right-20 w-16 h-16 bg-gradient-to-br from-white/10 to-white/5 rounded-lg rotate-12 animate-float backdrop-blur-sm border border-white/10"></div>
            <div className="absolute bottom-32 left-20 w-12 h-12 bg-gradient-to-br from-red-400/20 to-red-600/10 rounded-full animate-float-delayed"></div>
            <div className="absolute top-1/3 left-1/4 w-8 h-8 bg-white/20 rounded-sm rotate-45 animate-pulse-slow"></div>
            <div className="absolute bottom-1/3 right-1/4 w-6 h-6 bg-gradient-to-r from-white/15 to-transparent rounded-full animate-float"></div>
          </div>
          
          {/* Enhanced pattern overlay */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M50 0L60 40L100 50L60 60L50 100L40 60L0 50L40 40z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
          
          {/* Subtle grid overlay */}
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </>
      )}
      
      {/* Overlay for background images */}
      {backgroundImage && (
        <div className="absolute inset-0 bg-black opacity-60"></div>
      )}
      
      <div className="relative max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 text-white animate-fade-in">
          <span className="bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent drop-shadow-lg">
            {displayTitle}
          </span>
        </h1>
        <p className="mt-6 text-xl sm:text-2xl md:text-3xl leading-relaxed text-gray-100/90 max-w-4xl mx-auto animate-fade-in-delayed font-light">
          {displaySubtitle}
        </p>
        
        {(displayPrimaryCTA || displaySecondaryCTA) && (
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-delayed">
            {displayPrimaryCTA && (
              <Link to={displayPrimaryCTA.link}>
                <Button className="group relative bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white hover:text-primary text-white font-semibold px-10 py-4 text-lg transition-all duration-500 transform hover:scale-105 shadow-glow hover:shadow-2xl rounded-full overflow-hidden">
                  <span className="relative z-10 flex items-center gap-2">
                    {displayPrimaryCTA.text}
                    <span className="inline-block transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
                </Button>
              </Link>
            )}
            
            {displaySecondaryCTA && (
              <Link to={displaySecondaryCTA.link}>
                <Button variant="outline" className="group relative bg-transparent border-2 border-white/40 backdrop-blur-md hover:bg-white/10 hover:border-white/60 text-white font-semibold px-10 py-4 text-lg transition-all duration-500 transform hover:scale-105 rounded-full overflow-hidden">
                  <span className="relative z-10 flex items-center gap-2">
                    {displaySecondaryCTA.text}
                    <span className="inline-block transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/5 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
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
