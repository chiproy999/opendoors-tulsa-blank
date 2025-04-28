
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-tulsa-blue">Tulsa</span>
              <span className="text-2xl font-bold text-tulsa-orange ml-1">Open Doors</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/jobs" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-tulsa-blue-500 transition-colors">
              Find Jobs
            </Link>
            <Link to="/housing" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-tulsa-blue-500 transition-colors">
              Find Housing
            </Link>
            <Link to="/resources" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-tulsa-blue-500 transition-colors">
              Resources
            </Link>
            <Link to="/about" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-tulsa-blue-500 transition-colors">
              About
            </Link>
            <Link to="/contact" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-tulsa-blue-500 transition-colors">
              Contact
            </Link>
            <Link to="/auth/login">
              <Button variant="outline" className="ml-4">
                Sign In
              </Button>
            </Link>
            <Link to="/auth/register">
              <Button className="bg-tulsa-blue hover:bg-tulsa-blue-600">
                Sign Up
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-700 hover:text-tulsa-blue-500 hover:bg-gray-100 focus:outline-none"
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
        <div className="md:hidden bg-white pt-2 pb-4 px-4 shadow-lg">
          <div className="flex flex-col space-y-2">
            <Link 
              to="/jobs" 
              className="px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-tulsa-blue-500 hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Find Jobs
            </Link>
            <Link 
              to="/housing" 
              className="px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-tulsa-blue-500 hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Find Housing
            </Link>
            <Link 
              to="/resources" 
              className="px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-tulsa-blue-500 hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Resources
            </Link>
            <Link 
              to="/about" 
              className="px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-tulsa-blue-500 hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-tulsa-blue-500 hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <Link 
                to="/auth/login"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button variant="outline" className="w-full mb-2">
                  Sign In
                </Button>
              </Link>
              <Link 
                to="/auth/register"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button className="w-full bg-tulsa-blue hover:bg-tulsa-blue-600">
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
