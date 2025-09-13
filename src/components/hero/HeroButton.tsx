import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeroButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
}

const HeroButton = ({ href, children, variant = 'primary', className }: HeroButtonProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return "bg-black hover:bg-gray-800 text-white border-black hover:border-gray-800 shadow-lg hover:shadow-xl";
      case 'secondary':
        return "bg-white hover:bg-gray-50 text-black border-white hover:border-gray-200 shadow-lg hover:shadow-xl";
      case 'outline':
        return "bg-transparent border-2 border-white/60 text-white hover:bg-white/10 hover:border-white";
      default:
        return "";
    }
  };

  return (
    <Link to={href}>
      <Button 
        className={cn(
          "group relative font-semibold px-8 py-4 text-lg transition-all duration-300 transform hover:scale-105 rounded-full overflow-hidden",
          getVariantStyles(),
          className
        )}
      >
        <span className="relative z-10 flex items-center gap-2">
          {children}
          <span className="inline-block transform group-hover:translate-x-1 transition-transform duration-300">
            →
          </span>
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
      </Button>
    </Link>
  );
};

export default HeroButton;