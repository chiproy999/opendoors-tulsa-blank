
import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import CookieConsent from '../common/CookieConsent';
import ThemeToggle from './ThemeToggle';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="fixed bottom-4 right-4 z-50">
        <ThemeToggle />
      </div>
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
};

export default Layout;
