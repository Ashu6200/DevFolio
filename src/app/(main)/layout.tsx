import type React from 'react';
import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
import PrivacyBanner from '@/components/layout/privacy-banner';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen">
      <Navbar />
      {children}
      <Footer />
      <PrivacyBanner />
    </div>
  );
};

export default MainLayout;
