
import React from 'react';
import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import CookieConsent from '../common/CookieConsent';
import BreadcrumbNavigation from '../navigation/BreadcrumbNavigation';

interface LayoutProps {
  children: ReactNode;
  showBreadcrumbs?: boolean;
  breadcrumbItems?: Array<{ label: string; href: string }>;
}

const Layout = ({ children, showBreadcrumbs = true, breadcrumbItems }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {showBreadcrumbs && <BreadcrumbNavigation items={breadcrumbItems} />}
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
};

export default Layout;
