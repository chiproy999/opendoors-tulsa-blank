import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-red-800 text-white">
      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and mission */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center mb-4">
              <span className="text-2xl font-bold text-white">Open Doors</span>
              <span className="text-2xl font-bold text-red-300 ml-1">Tulsa</span>
            </Link>
            <p className="text-sm text-gray-300 mb-4">
              Connecting second-chance job and housing seekers with inclusive opportunities in Tulsa.
            </p>
            <form className="mb-4">
              <p className="text-sm text-gray-300 mb-2">Subscribe to our newsletter</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Email address"
                  className="px-4 py-2 text-sm text-gray-900 bg-white border-0 rounded-l focus:ring-0 focus:outline-none w-full"
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 border-0 rounded-r hover:bg-red-700 focus:outline-none"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/jobs" 
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Jobs
                </Link>
              </li>
              <li>
                <Link 
                  to="/housing" 
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Housing
                </Link>
              </li>
              <li>
                <Link 
                  to="/resources" 
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Resources
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Policy links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Policies</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/privacy" 
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms" 
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link 
                  to="/accessibility" 
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Accessibility
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-600">
          <p className="text-sm text-gray-300">
            © {currentYear} Open Doors Tulsa. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
