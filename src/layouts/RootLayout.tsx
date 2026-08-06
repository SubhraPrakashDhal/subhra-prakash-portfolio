import React from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CustomCursor } from '../components/CustomCursor';
import { BackgroundMesh } from '../components/BackgroundMesh';
import { ScrollToTop } from '../components/ScrollToTop';
import { useLenis, scrollToTop } from '../hooks/useLenis';

export const RootLayout: React.FC = () => {
  const location = useLocation();
  const currentOutlet = useOutlet();

  // Initialize Lenis Smooth Scroll
  useLenis();

  // Hardware-Accelerated Cinematic Page Transition Variants (Apple / Linear / Awwwards)
  const pageVariants: Variants = {
    initial: {
      opacity: 0,
      scale: 0.985,
      y: 12,
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: {
      opacity: 0,
      scale: 1.01,
      y: -8,
      transition: {
        duration: 0.28,
        ease: [0.7, 0, 0.84, 0],
      },
    },
  };

  return (
    <div className="relative min-h-screen text-white bg-[#030712] selection:bg-cyan-500/30 font-sans">
      {/* 0. Scroll Restoration Handler */}
      <ScrollToTop />

      {/* 1. Global Atmospheric Canvas Background */}
      <BackgroundMesh />

      {/* 2. Precision Custom Magnetic Cursor */}
      <CustomCursor />

      {/* 3. Global Floating Glass Navbar */}
      <Navbar />

      {/* 4. Animated Page Outlet Container */}
      <main className="relative z-10">
        <AnimatePresence
          mode="wait"
          onExitComplete={() => {
            scrollToTop(true);
          }}
        >
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onAnimationStart={() => {
              scrollToTop(true);
            }}
            className="w-full transform-gpu"
          >
            {currentOutlet}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 5. Global Footer */}
      <Footer />
    </div>
  );
};
