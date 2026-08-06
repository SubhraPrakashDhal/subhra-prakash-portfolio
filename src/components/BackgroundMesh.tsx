import React, { useEffect, useRef, memo } from 'react';
import { motion } from 'framer-motion';

export const BackgroundMesh: React.FC = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Check OS-level prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isTabActive = !document.hidden;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = (canvas.width = window.innerWidth * dpr);
    let height = (canvas.height = window.innerHeight * dpr);

    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (!canvas) return;
        width = canvas.width = window.innerWidth * dpr;
        height = canvas.height = window.innerHeight * dpr;
      }, 150);
    };

    // Pause RAF when tab is hidden to save GPU cycles and battery
    const handleVisibilityChange = () => {
      isTabActive = !document.hidden;
      if (isTabActive && !animationFrameId) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Interactive Floating Particles (capped at 30 for max 60FPS output)
    const particleCount = Math.min(Math.floor(window.innerWidth / 40), 30);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25 * dpr,
      vy: (Math.random() - 0.5) * 0.25 * dpr,
      radius: (Math.random() * 1.4 + 0.8) * dpr,
      alpha: Math.random() * 0.35 + 0.15,
    }));

    const connectionDistSq = (110 * dpr) ** 2;

    const render = () => {
      if (!isTabActive) return;

      ctx.clearRect(0, 0, width, height);

      // Draw particle web connections using squared distance checks
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 240, 255, ${p.alpha})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < connectionDistSq) {
            const alphaRatio = 1 - Math.sqrt(distSq) / (110 * dpr);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(121, 40, 204, ${0.14 * alphaRatio})`;
            ctx.lineWidth = 0.5 * dpr;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-[#030712]">
      {/* 1. Aurora Gradient Mesh Blobs - GPU transform layer isolated */}
      <motion.div
        animate={{
          scale: [1, 1.12, 1],
          x: [0, 50, 0],
          y: [0, -25, 0],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[100px] opacity-60 transform-gpu will-change-transform"
      />

      <motion.div
        animate={{
          scale: [1, 1.18, 1],
          x: [0, -60, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 -right-40 w-[700px] h-[700px] rounded-full bg-violet-600/12 blur-[120px] opacity-50 transform-gpu will-change-transform"
      />

      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          x: [0, 35, 0],
          y: [0, 55, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-40 left-1/4 w-[650px] h-[650px] rounded-full bg-pink-600/10 blur-[110px] opacity-45 transform-gpu will-change-transform"
      />

      {/* 2. Cybernetic Perspective Grid Lines */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* 3. Interactive Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full transform-gpu" />

      {/* 4. Film Grain Noise Overlay */}
      <div className="absolute inset-0 bg-noise opacity-60 mix-blend-overlay" />
    </div>
  );
});

BackgroundMesh.displayName = 'BackgroundMesh';
