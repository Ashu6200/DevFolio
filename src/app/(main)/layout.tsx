import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
import React from 'react';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='min-h-screen'>
      <Navbar />
      {children}
      <Footer />
    </main>
  );
};

export default MainLayout;
