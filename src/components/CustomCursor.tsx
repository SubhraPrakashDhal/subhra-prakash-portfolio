import React, { useEffect, useState, useRef, useCallback, memo } from 'react';
import { motion, useSpring, AnimatePresence } from 'framer-motion';
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

  // DOM auto-hover state (when context hover isn't explicitly active)
  const [domHover, setDomHover] = useState<{
    variant: CursorVariant;
    text: string;
  } | null>(null);

  // Framer Motion spring physics for liquid-smooth cursor movement
  const springConfig = { damping: 28, stiffness: 240, mass: 0.4 };
  const cursorX = useSpring(-100, springConfig);
  const cursorY = useSpring(-100, springConfig);

  const rippleIdRef = useRef(0);

  // Detect touch device & listen to mouse position
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
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = (e: MouseEvent) => {
      const id = ++rippleIdRef.current;
      setRipples((prev) => [...prev.slice(-3), { id, x: e.clientX, y: e.clientY }]);
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

  // Calculate proportional outer ring diameter based on active variant & text length
  let size = 32; // Default state: 32px diameter
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
      {/* 1. Mouse Click Ripple Animations */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ scale: 0.2, opacity: 0.9 }}
            animate={{ scale: 3.2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85, ease: [0.215, 0.61, 0.355, 1] }}
            onAnimationComplete={() => removeRipple(ripple.id)}
            className="fixed top-0 left-0 pointer-events-none z-[99998] rounded-full border border-[#00D9FF] shadow-[0_0_20px_rgba(0,217,255,0.6)] transform-gpu"
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
        transition={{ type: 'spring', damping: 30, stiffness: 220, mass: 0.3 }}
      />

      {/* 3. Main Precision Custom Cursor Outer Ring & Center Text */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full flex items-center justify-center backdrop-blur-[2px] transform-gpu overflow-hidden border-[1.5px] border-solid"
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
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className={`font-semibold tracking-wider text-white text-center leading-none select-none px-1 transform-gpu ${
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
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
});

CustomCursor.displayName = 'CustomCursor';
