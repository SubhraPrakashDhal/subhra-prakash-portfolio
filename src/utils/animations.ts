import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Check if the user prefers reduced motion for accessibility compliance.
 */
export const prefersReducedMotion = (): boolean => {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Creates a cinematic character stagger entrance timeline.
 * Fires ONLY ONCE on scroll down to prevent heavy re-animating on scroll up.
 */
export const animateTextStagger = (
  targets: gsap.TweenTarget,
  vars: gsap.TweenVars = {},
  scrollTriggerVars?: ScrollTrigger.Vars
) => {
  if (prefersReducedMotion()) {
    return gsap.set(targets, { opacity: 1, y: 0 });
  }

  const defaultVars: gsap.TweenVars = {
    opacity: 0,
    y: 25,
    duration: 0.7,
    stagger: 0.02,
    ease: 'power2.out',
    force3D: true,
  };

  const tweenConfig = { ...defaultVars, ...vars };

  if (scrollTriggerVars) {
    tweenConfig.scrollTrigger = {
      trigger: typeof targets === 'string' ? targets : (targets as Element),
      start: 'top 88%',
      once: true,
      toggleActions: 'play none none none',
      ...scrollTriggerVars,
    };
  }

  return gsap.from(targets, tweenConfig);
};

/**
 * Creates a hardware-accelerated clip-path image reveal timeline.
 * Runs ONCE on scroll down.
 */
export const animateImageReveal = (
  target: Element | string,
  scrollTriggerVars?: ScrollTrigger.Vars
) => {
  if (prefersReducedMotion()) {
    return gsap.set(target, { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 });
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: target,
      start: 'top 85%',
      once: true,
      toggleActions: 'play none none none',
      ...scrollTriggerVars,
    },
  });

  tl.fromTo(
    target,
    {
      clipPath: 'inset(100% 0% 0% 0%)',
      opacity: 0,
    },
    {
      clipPath: 'inset(0% 0% 0% 0%)',
      opacity: 1,
      duration: 0.9,
      ease: 'power3.out',
      force3D: true,
    }
  );

  return tl;
};

/**
 * Creates a lightweight card elevation timeline using translate3d.
 * Fires ONCE on scroll down to keep reverse scrolling instant and 60FPS smooth.
 */
export const animateCardStagger = (
  cards: Element[] | NodeListOf<Element> | string,
  scrollTriggerVars?: ScrollTrigger.Vars
) => {
  if (prefersReducedMotion()) {
    return gsap.set(cards, { opacity: 1, y: 0 });
  }

  return gsap.fromTo(
    cards,
    {
      opacity: 0,
      y: 30,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.06,
      ease: 'power2.out',
      force3D: true,
      scrollTrigger: {
        trigger: typeof cards === 'string' ? cards : (cards as any)[0] || cards,
        start: 'top 88%',
        once: true,
        toggleActions: 'play none none none',
        ...scrollTriggerVars,
      },
    }
  );
};

/**
 * Creates a smooth magnetic button hover effect using GSAP quickTo.
 */
export const initMagneticElement = (
  element: HTMLElement,
  strength = 0.25
) => {
  if (prefersReducedMotion()) return () => {};

  const xTo = gsap.quickTo(element, 'x', { duration: 0.35, ease: 'power2.out' });
  const yTo = gsap.quickTo(element, 'y', { duration: 0.35, ease: 'power2.out' });

  const handleMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    xTo(relX * strength);
    yTo(relY * strength);
  };

  const handleMouseLeave = () => {
    xTo(0);
    yTo(0);
  };

  element.addEventListener('mousemove', handleMouseMove);
  element.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    element.removeEventListener('mousemove', handleMouseMove);
    element.removeEventListener('mouseleave', handleMouseLeave);
  };
};
