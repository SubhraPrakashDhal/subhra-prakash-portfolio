import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useSpring, AnimatePresence } from 'framer-motion';
import { useCursor, type CursorVariant } from '../context/CursorContext';

interface ClickRipple {
  id: number;
  x: number;
  y: number;
}

export const CustomCursor: React.FC = () => {
  const { cursorVariant, cursorText, isHovered: isContextHovered } = useCursor();

  // Mouse & Touch states
  const [isTouch, setIsTouch] = useState(false);
  const [ripples, setRipples] = useState<ClickRipple[]>([]);

  // DOM auto-hover state (when context hover isn't explicitly active)
  const [domHover, setDomHover] = useState<{
    variant: CursorVariant;
    text: string;
  } | null>(null);

  // Framer Motion spring physics for liquid-smooth cursor movement with slight premium lag
  const springConfig = { damping: 28, stiffness: 220, mass: 0.45 };
  const cursorX = useSpring(-100, springConfig);
  const cursorY = useSpring(-100, springConfig);

  const rippleIdRef = useRef(0);

  // Detect touch device & listen to mouse position
  useEffect(() => {
    const checkTouch = () => {
      return (
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
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = (e: MouseEvent) => {
      const id = ++rippleIdRef.current;
      setRipples((prev) => [...prev.slice(-4), { id, x: e.clientX, y: e.clientY }]);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, [cursorX, cursorY]);

  // Remove ripples after animation finishes
  const removeRipple = useCallback((id: number) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  }, []);

  // Global DOM auto-detection for buttons, project cards, nav links, and data-cursor attributes
  useEffect(() => {
    if (isTouch) return;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // 1. Explicit data attributes
      const cursorTextAttr = target.closest('[data-cursor-text]')?.getAttribute('data-cursor-text');
      const cursorAttr = target.closest('[data-cursor]')?.getAttribute('data-cursor');

      if (cursorTextAttr) {
        setDomHover({ variant: (cursorAttr as CursorVariant) || 'hover', text: cursorTextAttr });
        return;
      }

      if (cursorAttr === 'project') {
        setDomHover({ variant: 'project', text: 'PROJECT' });
        return;
      }
      if (cursorAttr === 'button') {
        setDomHover({ variant: 'button', text: 'CLICK' });
        return;
      }
      if (cursorAttr === 'nav') {
        const navText = target.textContent?.trim().toUpperCase() || 'NAV';
        setDomHover({ variant: 'nav', text: navText });
        return;
      }

      // 2. Project card detection (.project-card, card links)
      const projectCard = target.closest('.project-card, [data-project-card]');
      if (projectCard) {
        setDomHover({ variant: 'project', text: 'PROJECT' });
        return;
      }

      // 3. Navigation links (nav a, header a, navbar links)
      const navLink = target.closest('nav a, header a, [role="navigation"] a');
      if (navLink) {
        const text = navLink.textContent?.trim().toUpperCase() || 'LINK';
        // Truncate long text if necessary
        const displayText = text.length > 12 ? text.substring(0, 10) + '..' : text;
        setDomHover({ variant: 'nav', text: displayText });
        return;
      }

      // 4. Buttons and interactive clickables
      const buttonEl = target.closest('button, [role="button"], input[type="submit"], .btn, a.button');
      if (buttonEl) {
        setDomHover({ variant: 'button', text: 'CLICK' });
        return;
      }

      // No hover target found
      setDomHover(null);
    };

    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    return () => window.removeEventListener('mouseover', handleMouseOver);
  }, [isTouch]);

  // Don't render custom cursor on touch devices
  if (isTouch) return null;

  // Determine active variant & text (context takes priority over DOM auto-detection)
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

  // Default display text if empty
  const activeText = rawText || (activeVariant === 'default' ? 'SPD' : '');

  // Calculate target diameter based on active variant & text
  let size = 32; // Default state: 32px diameter
  if (activeVariant === 'project') {
    size = 110; // Project card state: 100-120px (110px)
  } else if (activeVariant === 'button') {
    size = 80; // Button state: 80px
  } else if (activeVariant === 'nav') {
    // Dynamically proportion circle size so long text like ACHIEVEMENTS fits comfortably with padding
    size = Math.max(64, Math.min(78, activeText.length * 4.5 + 24));
  } else if (activeVariant === 'hover' || activeVariant === 'magnetic') {
    size = Math.max(65, Math.min(110, activeText.length * 8 + 32));
  } else if (activeVariant === 'hidden') {
    size = 0;
  }

  // Get responsive font classes for nav text based on character count
  const getNavTextClass = (text: string) => {
    if (text.length > 9) return 'text-[8px] font-extrabold tracking-tight';
    if (text.length > 6) return 'text-[9px] font-bold tracking-normal';
    return 'text-[10px] font-bold tracking-wider';
  };

  return (
    <>
      {/* 1. Mouse Click Ripple Animations */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ scale: 0.2, opacity: 0.9 }}
            animate={{ scale: 3.2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.95, ease: [0.215, 0.61, 0.355, 1] }}
            onAnimationComplete={() => removeRipple(ripple.id)}
            className="fixed top-0 left-0 pointer-events-none z-[99998] rounded-full border border-[#00D9FF] shadow-[0_0_20px_rgba(0,217,255,0.6)]"
            style={{
              width: 36,
              height: 36,
              x: ripple.x,
              y: ripple.y,
              translateX: '-50%',
              translateY: '-50%',
            }}
          />
        ))}
      </AnimatePresence>

      {/* 2. Soft Ambient Cyan Reactive Aura / Glow */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99998] rounded-full blur-2xl opacity-40 transform-gpu"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: size * 1.8,
          height: size * 1.8,
          background:
            activeVariant === 'project'
              ? 'radial-gradient(circle, rgba(0, 217, 255, 0.45) 0%, rgba(0, 217, 255, 0.1) 60%, transparent 80%)'
              : 'radial-gradient(circle, rgba(0, 217, 255, 0.3) 0%, rgba(121, 40, 204, 0.15) 60%, transparent 80%)',
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 200, mass: 0.3 }}
      />

      {/* 3. Main Precision Custom Cursor Outer Ring & Center Text */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full flex items-center justify-center backdrop-blur-[2px] transform-gpu overflow-hidden"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: size,
          height: size,
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
          borderWidth: '1.5px',
          borderStyle: 'solid',
          boxShadow:
            activeVariant === 'project'
              ? '0 0 25px rgba(0, 217, 255, 0.5), inset 0 0 15px rgba(0, 217, 255, 0.25)'
              : activeVariant === 'button'
              ? '0 0 20px rgba(0, 217, 255, 0.4), inset 0 0 10px rgba(0, 217, 255, 0.15)'
              : '0 0 14px rgba(0, 217, 255, 0.35), inset 0 0 8px rgba(0, 217, 255, 0.1)',
          opacity: activeVariant === 'hidden' ? 0 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 24,
          stiffness: 260,
          mass: 0.35,
        }}
      >
        {/* Animated Text inside Custom Cursor */}
        <AnimatePresence mode="wait">
          {activeText && (
            <motion.span
              key={activeText}
              initial={{ opacity: 0, scale: 0.6, filter: 'blur(4px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.6, filter: 'blur(4px)' }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className={`font-semibold tracking-wider text-white text-center leading-none select-none px-1 ${
                activeVariant === 'project'
                  ? 'text-[11px] font-bold tracking-widest text-cyan-200 drop-shadow-[0_0_8px_rgba(0,217,255,0.8)]'
                  : activeVariant === 'button'
                  ? 'text-[10px] font-bold tracking-widest text-white drop-shadow-[0_0_6px_rgba(0,217,255,0.6)]'
                  : activeVariant === 'nav'
                  ? `${getNavTextClass(activeText)} text-white drop-shadow-[0_0_6px_rgba(0,217,255,0.6)]`
                  : 'text-[10px] text-white/90'
              }`}
            >
              {activeText}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};
