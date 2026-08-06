import React from 'react';
import CountUpRaw from 'react-countup';
import MarqueeRaw from 'react-fast-marquee';
import TiltRaw from 'react-parallax-tilt';

// Safely unwrap synthetic default exports for CJS/ESM interop compatibility in Vite
export const CountUp: any = (CountUpRaw as any)?.default || CountUpRaw;
export const Marquee: any = (MarqueeRaw as any)?.default || MarqueeRaw;

const RawTiltComponent: any = (TiltRaw as any)?.default || TiltRaw;

/**
 * Smart Mobile-Optimized Tilt Component:
 * Bypasses 3D tilt matrix computations on touch/coarse devices to eliminate mobile image card lag.
 */
export const Tilt: React.FC<any> = ({ children, className = '', ...props }) => {
  const isTouchDevice =
    typeof window !== 'undefined' &&
    ('ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches);

  if (isTouchDevice) {
    return React.createElement('div', { className: `${className} transform-gpu` }, children);
  }

  return React.createElement(
    RawTiltComponent,
    {
      gyroscope: false,
      transitionSpeed: 800,
      tiltMaxAngleX: 6,
      tiltMaxAngleY: 6,
      perspective: 1000,
      className,
      ...props,
    },
    children
  );
};
