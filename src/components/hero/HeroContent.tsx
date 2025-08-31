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
      <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight mb-8 animate-fade-in leading-[0.9] selection:bg-blue-300/30">
        <div className="relative">
          <span className="bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent drop-shadow-2xl block mb-2 will-change-transform">
            Fighting Crime
          </span>
          <span className="bg-gradient-to-r from-blue-200 via-blue-100 to-white bg-clip-text text-transparent drop-shadow-2xl block will-change-transform">
            in North Carolina
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/15 to-blue-400/15 blur-3xl -z-10"></div>
        </div>
      </h1>
      
      <div className="mt-6 text-lg sm:text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto animate-fade-in-delayed">
        <p className="text-white font-medium text-center">
          Keeping communities safe with <span className="text-blue-200 font-semibold">alerts</span>, <span className="text-blue-200 font-semibold">news</span>, and <span className="text-blue-200 font-semibold">anonymous tips</span>.
        </p>
      </div>
      
      {/* Trust Indicators */}
      <div className="mt-10 flex flex-wrap justify-center items-center gap-8 text-white/80 animate-fade-in-delayed">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-300">24/7</div>
          <div className="text-sm">Alert System</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-300">500+</div>
          <div className="text-sm">Tips Received</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-400">100%</div>
          <div className="text-sm">Anonymous</div>
        </div>
      </div>

      <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-delayed">
        <HeroButton href="/submit-tip" variant="danger" className="text-lg px-8 py-4">
          Submit Anonymous Tip
        </HeroButton>
        
        <HeroButton href="/news" variant="outline" className="text-base">
          Latest Crime News
        </HeroButton>
        
        <HeroButton href="/wanted" variant="ghost" className="text-base">
          View Wanted Persons
        </HeroButton>
      </div>
      
      <div className="mt-6 animate-fade-in-delayed">
        <Link to="/contact">
          <Button variant="link" className="text-white/90 hover:text-white font-medium text-base group transition-all duration-300">
            Contact Law Enforcement
            <span className="inline-block transform group-hover:translate-x-1 transition-transform duration-300 ml-2">
              →
            </span>
          </Button>
        </Link>
      </div>
    </div>;
};
export default HeroContent;