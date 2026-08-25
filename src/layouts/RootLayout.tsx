import React from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CustomCursor } from '../components/CustomCursor';
import { BackgroundMesh } from '../components/BackgroundMesh';
import { ScrollToTop } from '../components/ScrollToTop';
import { useLenis } from '../hooks/useLenis';

export const RootLayout: React.FC = () => {
  const location = useLocation();
  const currentOutlet = useOutlet();

  // Initialize Lenis Smooth Scroll
  useLenis();

  return (
    <div className="relative min-h-screen text-white bg-[#030712] selection:bg-cyan-500/30 font-sans">
      {/* Toast Notifications */}
      <Toaster position="bottom-right" theme="dark" />

      {/* 0. Scroll Restoration Handler */}
      <ScrollToTop />

      {/* 1. Global Atmospheric Canvas Background */}
      <BackgroundMesh />

      {/* 2. Precision Custom Magnetic Cursor */}
      <CustomCursor />

      {/* 3. Global Floating Glass Navbar */}
      <Navbar />

      {/* 4. Page Outlet Container */}
      <main className="relative z-10">
        <div key={location.pathname} className="w-full transform-gpu animate-fade-in">
          {currentOutlet}
        </div>
      </main>

      {/* 5. Global Footer */}
      <Footer />
    </div>
  );
};

