import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeroButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  className?: string;
}

const HeroButton = ({ href, children, variant = 'primary', className }: HeroButtonProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return "bg-blue-600 hover:bg-blue-700 text-white border-blue-600 hover:border-blue-700 shadow-lg hover:shadow-xl focus:ring-2 focus:ring-blue-500 focus:ring-offset-2";
      case 'secondary':
        return "bg-white hover:bg-gray-50 text-gray-900 border-white hover:border-gray-200 shadow-lg hover:shadow-xl focus:ring-2 focus:ring-gray-500 focus:ring-offset-2";
      case 'outline':
        return "bg-transparent border-2 border-white/70 text-white hover:bg-white/10 hover:border-white focus:ring-2 focus:ring-white/50 focus:ring-offset-2";
      case 'danger':
        return "bg-red-600 hover:bg-red-700 text-white border-red-600 hover:border-red-700 shadow-lg hover:shadow-xl focus:ring-2 focus:ring-red-500 focus:ring-offset-2";
      case 'ghost':
        return "bg-transparent text-white/90 hover:text-white hover:bg-white/5 focus:ring-2 focus:ring-white/30 focus:ring-offset-2";
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