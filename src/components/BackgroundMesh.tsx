import React, { useEffect, useRef, memo } from 'react';

export const BackgroundMesh: React.FC = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let resizeTimeout: number;
    const handleResize = () => {
      window.clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        if (!canvas) return;
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }, 150);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Lightweight Particles for Ambient Vibe (Max 24 for 60FPS guaranteed)
    const particleCount = Math.min(Math.floor(width / 55), 24);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 1.2 + 0.8,
      alpha: Math.random() * 0.4 + 0.2,
    }));

    const maxDistSq = 120 * 120;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 240, 255, ${p.alpha})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistSq) {
            const alphaRatio = 1 - distSq / maxDistSq;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(121, 40, 204, ${0.12 * alphaRatio})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.clearTimeout(resizeTimeout);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-[#030712]">
      {/* 1. Hardware-Accelerated Ambient Aurora Glows */}
      <div className="absolute -top-32 -left-32 w-[450px] h-[450px] rounded-full bg-cyan-500/12 blur-[90px] opacity-70 transform-gpu" />
      <div className="absolute top-1/3 -right-32 w-[500px] h-[500px] rounded-full bg-violet-600/15 blur-[100px] opacity-60 transform-gpu" />
      <div className="absolute -bottom-32 left-1/4 w-[480px] h-[480px] rounded-full bg-pink-600/10 blur-[90px] opacity-50 transform-gpu" />

      {/* 2. Cybernetic Perspective Grid Lines */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* 3. High-Performance Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* 4. Film Grain Noise Overlay */}
      <div className="absolute inset-0 bg-noise opacity-50 mix-blend-overlay" />
    </div>
  );
});

BackgroundMesh.displayName = 'BackgroundMesh';
