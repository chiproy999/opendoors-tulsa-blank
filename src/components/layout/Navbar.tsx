
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      if (mobileMenuOpen) setMobileMenuOpen(false);
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <div className="flex flex-col items-center justify-center">
                <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" 
                    className="stroke-purple-600 dark:stroke-purple-300" 
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 22V12H15V22" 
                    className="stroke-purple-400 dark:stroke-purple-200" 
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-xl font-bold text-purple-800 dark:text-purple-300 ml-2">Tulsa</span>
              <span className="text-xl font-bold text-purple-500 dark:text-purple-400 ml-1">Open Doors</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-500 transition-colors flex items-center">
                  Resources <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link to="/jobs" className="cursor-pointer">Jobs</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/housing" className="cursor-pointer">Housing</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/resources" className="cursor-pointer">Resources</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <button 
              onClick={() => scrollToSection('about')} 
              className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-500 transition-colors"
            >
              About
            </button>
            
            <button 
              onClick={() => scrollToSection('contact')} 
              className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-500 transition-colors"
            >
              Contact
            </button>

            <div className="ml-2">
              <ThemeToggle />
            </div>
            
            <Link to="/auth/login">
              <Button variant="outline" className="ml-2 border-gray-300 dark:border-gray-600">
                Sign In
              </Button>
            </Link>
            <Link to="/auth/register">
              <Button className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white">
                Sign Up
              </Button>
            </Link>
          </div>

          {/* Mobile menu button and theme toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-purple-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 pt-2 pb-4 px-4 shadow-lg">
          <div className="flex flex-col space-y-2">
            <Link 
              to="/jobs" 
              className="px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-purple-500 hover:bg-gray-50 dark:hover:bg-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              Jobs
            </Link>
            <Link 
              to="/housing" 
              className="px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-purple-500 hover:bg-gray-50 dark:hover:bg-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              Housing
            </Link>
            <Link 
              to="/resources" 
              className="px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-purple-500 hover:bg-gray-50 dark:hover:bg-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              Resources
            </Link>
            <button 
              onClick={() => scrollToSection('about')}
              className="px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-purple-500 hover:bg-gray-50 dark:hover:bg-gray-700 text-left"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-purple-500 hover:bg-gray-50 dark:hover:bg-gray-700 text-left"
            >
              Contact
            </button>
            <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
              <Link 
                to="/auth/login"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button variant="outline" className="w-full mb-2 border-gray-300 dark:border-gray-600">
                  Sign In
                </Button>
              </Link>
              <Link 
                to="/auth/register"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
