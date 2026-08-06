import CountUpRaw from 'react-countup';
import MarqueeRaw from 'react-fast-marquee';
import TiltRaw from 'react-parallax-tilt';

// Safely unwrap synthetic default exports for CJS/ESM interop compatibility in Vite
export const CountUp: any = (CountUpRaw as any)?.default || CountUpRaw;
export const Marquee: any = (MarqueeRaw as any)?.default || MarqueeRaw;
export const Tilt: any = (TiltRaw as any)?.default || TiltRaw;
