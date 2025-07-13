
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, User, LogOut } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/context/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

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
    <nav className="bg-white dark:bg-black shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <div className="flex flex-col items-center justify-center">
                <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" 
                    className="stroke-red-600 dark:stroke-red-500" 
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 22V12H15V22" 
                    className="stroke-red-400 dark:stroke-red-400" 
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-xl font-bold text-black dark:text-white ml-2">Open Doors</span>
              <span className="text-xl font-bold text-red-500 dark:text-red-500 ml-1">Tulsa</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-red-500 transition-colors flex items-center">
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
              className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-red-500 transition-colors"
            >
              About
            </button>
            
            <button 
              onClick={() => scrollToSection('contact')} 
              className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-red-500 transition-colors"
            >
              Contact
            </button>

            <div className="ml-2">
              <ThemeToggle />
            </div>
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2 ml-2">
                    <User className="h-4 w-4" />
                    {user?.firstName || 'User'}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="text-sm">
                    Signed in as {user?.email}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="text-sm">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild size="sm" className="ml-2">
                <Link to="/auth">Sign In</Link>
              </Button>
            )}
          </div>

          {/* Mobile menu button and theme toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
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
              className="px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-red-500 hover:bg-gray-50 dark:hover:bg-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              Jobs
            </Link>
            <Link 
              to="/housing" 
              className="px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-red-500 hover:bg-gray-50 dark:hover:bg-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              Housing
            </Link>
            <Link 
              to="/resources" 
              className="px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-red-500 hover:bg-gray-50 dark:hover:bg-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              Resources
            </Link>
            <button 
              onClick={() => scrollToSection('about')}
              className="px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-red-500 hover:bg-gray-50 dark:hover:bg-gray-700 text-left"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-red-500 hover:bg-gray-50 dark:hover:bg-gray-700 text-left"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
