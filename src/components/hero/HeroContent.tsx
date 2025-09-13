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
  return <div className="relative max-w-4xl mx-auto text-center">
      <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter mb-8 animate-fade-in leading-[0.85] selection:bg-red-300/30">
        <div className="relative">
          <span className="bg-gradient-to-r from-white via-red-200 to-red-300 bg-clip-text text-transparent drop-shadow-2xl animate-pulse-slow block mb-2 will-change-transform">
            Open Doors
          </span>
          <span className="bg-gradient-to-r from-red-300 via-red-200 to-white bg-clip-text text-transparent drop-shadow-2xl block will-change-transform">
            to New Opportunities
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-red-400/20 blur-3xl -z-10 animate-pulse will-change-transform"></div>
        </div>
      </h1>
      
      <div className="mt-8 text-xl sm:text-2xl md:text-3xl leading-relaxed max-w-4xl mx-auto animate-fade-in-delayed">
        <p className="text-white/95 font-medium mb-4">
          Connecting individuals with <span className="text-red-200 font-semibold">conviction histories</span> to
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-lg sm:text-xl md:text-2xl">
          <span className="bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent font-bold">
            💼 Meaningful Employment
          </span>
          <span className="text-white/80">•</span>
          <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent font-bold">
            🏠 Stable Housing
          </span>
        </div>
      </div>
      
      {/* Trust Indicators */}
      <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-white/80 animate-fade-in-delayed">
        <div className="text-center">
          
          
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-red-300">200+</div>
          
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-red-400">1000+</div>
          <div className="text-sm">Lives Changed</div>
        </div>
      </div>

      {(primaryCTA || secondaryCTA) && <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-delayed">
          {primaryCTA && <HeroButton href={primaryCTA.link} variant="primary">
              {primaryCTA.text}
            </HeroButton>}
          
          {secondaryCTA && <HeroButton href={secondaryCTA.link} variant="secondary">
              {secondaryCTA.text}
            </HeroButton>}
        </div>}
      
      {businessCTA && <div className="mt-8 animate-fade-in-delayed">
          <Link to={businessCTA.link}>
            <Button variant="link" className="text-white/90 hover:text-white font-medium text-lg group transition-all duration-300">
              {businessCTA.text}
              <span className="inline-block transform group-hover:translate-x-1 transition-transform duration-300 ml-2">
                →
              </span>
            </Button>
          </Link>
        </div>}
    </div>;
};
export default HeroContent;