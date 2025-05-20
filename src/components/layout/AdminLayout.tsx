
import { ReactNode, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/context/AuthContext';
import { Home, User, Briefcase, Building, LogOut, Menu, X } from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

const AdminLayout = ({ children, title }: AdminLayoutProps) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  const navItems = [
    { path: '/admin', icon: <Home className="w-5 h-5" />, label: 'Dashboard' },
    { path: '/admin/jobs', icon: <Briefcase className="w-5 h-5" />, label: 'Job Listings' },
    { path: '/admin/housing', icon: <Building className="w-5 h-5" />, label: 'Housing Listings' },
    { path: '/admin/users', icon: <User className="w-5 h-5" />, label: 'User Accounts' },
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col md:flex-row">
      {/* Mobile sidebar toggle */}
      <div className="block md:hidden fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center p-4">
          <Link to="/admin" className="flex items-center">
            <span className="text-xl font-bold text-black dark:text-white">Admin</span>
            <span className="text-xl font-bold text-red-500 ml-1">Panel</span>
          </Link>
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      
      {/* Sidebar */}
      <div 
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed md:relative md:translate-x-0 z-40 inset-y-0 left-0 w-64 transition duration-300 transform bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto`}
      >
        {/* Sidebar header */}
        <div className="p-6 hidden md:block">
          <Link to="/admin" className="flex items-center">
            <span className="text-xl font-bold text-black dark:text-white">Admin</span>
            <span className="text-xl font-bold text-red-500 ml-1">Panel</span>
          </Link>
        </div>
        
        {/* Navigation */}
        <nav className="mt-6 md:mt-0">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-6 py-4 text-gray-700 dark:text-gray-300 ${
                location.pathname === item.path
                  ? 'bg-red-50 border-r-4 border-red-500 dark:bg-gray-700 text-red-500 dark:text-red-400'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              onClick={() => {if (sidebarOpen) setSidebarOpen(false)}}
            >
              {item.icon}
              <span className="mx-3">{item.label}</span>
            </Link>
          ))}
        </nav>
        
        {/* Logout button */}
        <div className="absolute bottom-0 w-full border-t border-gray-200 dark:border-gray-700 p-6">
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col mt-16 md:mt-0">
        {/* Header */}
        <header className="hidden md:flex bg-white dark:bg-gray-800 shadow-sm h-16 items-center px-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
        </header>
        
        {/* Main content */}
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 md:hidden">{title}</h1>
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
