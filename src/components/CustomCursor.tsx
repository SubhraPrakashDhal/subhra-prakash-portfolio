import React, { useEffect, useState, useRef, memo } from 'react';
import { useCursor, type CursorVariant } from '../context/CursorContext';

interface ClickRipple {
  id: number;
  x: number;
  y: number;
}

export const CustomCursor: React.FC = memo(() => {
  const { cursorVariant, cursorText, isHovered: isContextHovered } = useCursor();

  // Mouse & Touch states
  const [isTouch, setIsTouch] = useState(false);
  const [ripples, setRipples] = useState<ClickRipple[]>([]);

  // DOM auto-hover state
  const [domHover, setDomHover] = useState<{
    variant: CursorVariant;
    text: string;
  } | null>(null);

  const ringRef = useRef<HTMLDivElement | null>(null);
  const auraRef = useRef<HTMLDivElement | null>(null);

  const targetPos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const rafIdRef = useRef<number | null>(null);
  const rippleIdRef = useRef(0);

  // Detect touch device & setup hardware-accelerated RAF cursor tracking
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const checkTouch = () => {
      return (
        prefersReducedMotion ||
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches
      );
    };

    if (checkTouch()) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current.x = e.clientX;
      targetPos.current.y = e.clientY;
    };

    const handleMouseDown = (e: MouseEvent) => {
      const id = ++rippleIdRef.current;
      setRipples((prev) => [...prev.slice(-2), { id, x: e.clientX, y: e.clientY }]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 750);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });

    // Smooth Lerp Loop running on RequestAnimationFrame
    const updatePosition = () => {
      const lerp = 0.22;
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * lerp;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * lerp;

      const transformStr = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0) translate(-50%, -50%)`;

      if (ringRef.current) {
        ringRef.current.style.transform = transformStr;
      }
      if (auraRef.current) {
        auraRef.current.style.transform = transformStr;
      }

      rafIdRef.current = requestAnimationFrame(updatePosition);
    };

    rafIdRef.current = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  // Global DOM auto-detection for interactive elements
  useEffect(() => {
    if (isTouch) return;

    const updateHoverState = (newHover: { variant: CursorVariant; text: string } | null) => {
      setDomHover((prev) => {
        if (!prev && !newHover) return null;
        if (prev && newHover && prev.variant === newHover.variant && prev.text === newHover.text) {
          return prev;
        }
        return newHover;
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTextAttr = target.closest('[data-cursor-text]')?.getAttribute('data-cursor-text');
      const cursorAttr = target.closest('[data-cursor]')?.getAttribute('data-cursor');

      if (cursorTextAttr) {
        updateHoverState({ variant: (cursorAttr as CursorVariant) || 'hover', text: cursorTextAttr });
        return;
      }

      if (cursorAttr === 'project') {
        updateHoverState({ variant: 'project', text: 'PROJECT' });
        return;
      }
      if (cursorAttr === 'button') {
        updateHoverState({ variant: 'button', text: 'CLICK' });
        return;
      }
      if (cursorAttr === 'nav') {
        const navText = target.textContent?.trim().toUpperCase() || 'NAV';
        updateHoverState({ variant: 'nav', text: navText });
        return;
      }

      const projectCard = target.closest('.project-card, [data-project-card]');
      if (projectCard) {
        updateHoverState({ variant: 'project', text: 'PROJECT' });
        return;
      }

      const navLink = target.closest('nav a, header a, [role="navigation"] a');
      if (navLink) {
        const text = navLink.textContent?.trim().toUpperCase() || 'LINK';
        const displayText = text.length > 12 ? text.substring(0, 10) + '..' : text;
        updateHoverState({ variant: 'nav', text: displayText });
        return;
      }

      const buttonEl = target.closest('button, [role="button"], input[type="submit"], .btn, a.button');
      if (buttonEl) {
        updateHoverState({ variant: 'button', text: 'CLICK' });
        return;
      }

      updateHoverState(null);
    };

    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    return () => window.removeEventListener('mouseover', handleMouseOver);
  }, [isTouch]);

  if (isTouch) return null;

  const activeVariant: CursorVariant = isContextHovered
    ? cursorVariant
    : domHover
    ? domHover.variant
    : 'default';

  const rawText = isContextHovered
    ? cursorText
    : domHover
    ? domHover.text
    : 'SPD';

  const activeText = rawText || (activeVariant === 'default' ? 'SPD' : '');

  // Dynamic sizing math
  let size = 32;
  if (activeVariant === 'project') {
    size = 110;
  } else if (activeVariant === 'button') {
    size = 80;
  } else if (activeVariant === 'nav') {
    size = Math.max(64, Math.min(84, activeText.length * 5.5 + 28));
  } else if (activeVariant === 'hover' || activeVariant === 'magnetic') {
    size = Math.max(65, Math.min(110, activeText.length * 8 + 32));
  } else if (activeVariant === 'hidden') {
    size = 0;
  }

  const getNavTextClass = (text: string) => {
    if (text.length > 9) return 'text-[8px] font-extrabold tracking-tight';
    if (text.length > 6) return 'text-[9px] font-bold tracking-normal';
    return 'text-[10px] font-bold tracking-wider';
  };

  return (
    <>
      {/* 1. Mouse Click Ripples */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="fixed top-0 left-0 pointer-events-none z-2147483646 rounded-full border border-[#00D9FF] shadow-[0_0_20px_rgba(0,217,255,0.6)] animate-click-ripple"
          style={{
            width: 36,
            height: 36,
            left: ripple.x,
            top: ripple.y,
            zIndex: 2147483646,
          }}
        />
      ))}

      {/* 2. Soft Ambient Cyan Aura / Glow */}
      <div
        ref={auraRef}
        className="fixed top-0 left-0 pointer-events-none z-2147483646 rounded-full blur-2xl opacity-40 transform-gpu transition-all duration-300 ease-out"
        style={{
          width: size * 1.8,
          height: size * 1.8,
          zIndex: 2147483646,
          background:
            activeVariant === 'project'
              ? 'radial-gradient(circle, rgba(0, 217, 255, 0.45) 0%, rgba(0, 217, 255, 0.1) 60%, transparent 80%)'
              : 'radial-gradient(circle, rgba(0, 217, 255, 0.3) 0%, rgba(121, 40, 204, 0.15) 60%, transparent 80%)',
        }}
      />

      {/* 3. Main Precision Custom Cursor Outer Ring & Center Text */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-2147483647 rounded-full flex items-center justify-center backdrop-blur-[2px] transform-gpu overflow-hidden border-[1.5px] border-solid transition-all duration-300 ease-out"
        style={{
          width: size,
          height: size,
          zIndex: 2147483647,
          opacity: activeVariant === 'hidden' ? 0 : 1,

          backgroundColor:
            activeVariant === 'project'
              ? 'rgba(0, 217, 255, 0.15)'
              : activeVariant === 'button'
              ? 'rgba(0, 217, 255, 0.12)'
              : activeVariant === 'nav'
              ? 'rgba(0, 217, 255, 0.08)'
              : activeVariant === 'default'
              ? 'rgba(0, 217, 255, 0.04)'
              : 'rgba(0, 217, 255, 0.1)',
          borderColor:
            activeVariant === 'project'
              ? '#00D9FF'
              : activeVariant === 'button' || activeVariant === 'nav'
              ? 'rgba(0, 217, 255, 0.85)'
              : 'rgba(0, 217, 255, 0.45)',
          boxShadow:
            activeVariant === 'project'
              ? '0 0 25px rgba(0, 217, 255, 0.5), inset 0 0 15px rgba(0, 217, 255, 0.25)'
              : activeVariant === 'button'
              ? '0 0 20px rgba(0, 217, 255, 0.4), inset 0 0 10px rgba(0, 217, 255, 0.15)'
              : '0 0 14px rgba(0, 217, 255, 0.35), inset 0 0 8px rgba(0, 217, 255, 0.1)',
        }}
      >
        {activeText && (
          <span
            key={activeText}
            className={`font-semibold tracking-wider text-white text-center leading-none select-none px-1 transition-all duration-200 ease-out ${
              activeVariant === 'project'
                ? 'text-[11px] font-bold tracking-widest text-cyan-200 drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]'
                : activeVariant === 'button'
                ? 'text-[10px] font-bold tracking-widest text-white drop-shadow-[0_0_6px_rgba(0,240,255,0.6)]'
                : activeVariant === 'nav'
                ? `${getNavTextClass(activeText)} text-white drop-shadow-[0_0_6px_rgba(0,240,255,0.6)]`
                : 'text-[10px] text-white/90'
            }`}
          >
            {activeText}
          </span>
        )}
      </div>
    </>
  );
});

CustomCursor.displayName = 'CustomCursor';
