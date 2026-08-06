import { useEffect } from 'react';
import Lenis from 'lenis';

let lenisInstance: Lenis | null = null;

export const getLenis = () => lenisInstance;

export const scrollToTop = (immediate = true) => {
  if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }

  if (lenisInstance) {
    lenisInstance.scrollTo(0, { immediate });
  } else if (typeof window !== 'undefined') {
    window.scrollTo(0, 0);
  }
};

export const useLenis = () => {
  useEffect(() => {
    // Disable default browser scroll restoration
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
    });

    lenisInstance = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const animationId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationId);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);
};
