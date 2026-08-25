import { useEffect } from 'react';

/**
 * High-performance, lightweight single IntersectionObserver hook.
 * Adds 'is-revealed' class to elements with '.reveal-on-scroll' when they enter viewport.
 */
export function useScrollReveal(dependency?: any) {
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target); // Unobserve after revealed to save CPU/GPU cycles
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.reveal-on-scroll:not(.is-revealed)');
    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [dependency]);
}
