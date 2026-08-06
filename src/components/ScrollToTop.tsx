import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToTop } from '../hooks/useLenis';

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Disable browser automatic scroll restoration
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Scroll Lenis to top immediately on route change
    scrollToTop(true);

    // Double-ensure via requestAnimationFrame to avoid any race condition
    const rafId = requestAnimationFrame(() => {
      scrollToTop(true);
    });

    return () => cancelAnimationFrame(rafId);
  }, [pathname]);

  return null;
};
