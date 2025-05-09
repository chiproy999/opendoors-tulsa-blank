
import React from 'react';
import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import CookieConsent from '../common/CookieConsent';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
};

export default Layout;
