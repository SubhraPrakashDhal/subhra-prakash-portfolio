import React from 'react';
import { Trophy, Medal, ExternalLink, Code } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { Tilt } from '../utils/components';
import { ACHIEVEMENTS } from '../constants/portfolio';
import { useCursor } from '../context/CursorContext';
import { sound } from '../utils/sound';
import { SEO } from '../components/SEO';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const Achievements: React.FC = () => {
  const { setCursorHover, resetCursor } = useCursor();

  useScrollReveal();

  return (
    <div className="pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto space-y-16">
      <SEO
        title="Achievements & Certifications — Subhra Prakash Dhal"
        description="Coding achievements, LeetCode competitive metrics, GitHub contribution stats, and technical certifications of Subhra Prakash Dhal."
        path="/achievements"
      />
      {/* 1. Header Section */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <span className="reveal-on-scroll inline-block px-4 py-1.5 rounded-full glass-panel border border-cyan-400/40 font-mono text-xs font-bold text-cyan-300 uppercase tracking-widest">
          RECOGNITION & METRICS
        </span>
        <h1 className="reveal-on-scroll stagger-1 text-4xl pt-6 md:text-6xl font-black text-white tracking-tight">
          Achievements & Coding Profiles
        </h1>
        <p className="reveal-on-scroll stagger-2 text-gray-400 text-base md:text-lg">
          A summary of enterprise MERN applications, 10+ software development internships, 2 NPTEL certifications, and scalable React architectures.
        </p>
      </div>

      {/* 2. Coding Platform & Experience Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { title: 'Internships', val: '10+', icon: Trophy, desc: 'Enterprise & Industry' },
          { title: 'Major Projects', val: '4+', icon: Code, desc: 'Full Stack & Dashboards' },
          { title: 'NPTEL Certs', val: '2', icon: Medal, desc: 'Technical Excellence' },
          { title: 'Built Interfaces', val: '20+', icon: FaGithub, desc: 'Responsive Web UI' },
        ].map((stat, idx) => {
          const StatIcon = stat.icon;
          return (
            <div
              key={idx}
              style={{ transitionDelay: `${idx * 0.08}s` }}
              className="reveal-on-scroll glass-panel p-6 rounded-3xl border border-white/10 text-center hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(0,240,255,0.2)] transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 mx-auto mb-3">
                <StatIcon size={20} />
              </div>
              <div className="font-mono font-black text-3xl text-white mb-1">{stat.val}</div>
              <div className="font-bold text-xs text-cyan-300">{stat.title}</div>
              <div className="font-mono text-[10px] text-gray-500">{stat.desc}</div>
            </div>
          );
        })}
      </div>

      {/* 3. GitHub Contribution Heatmap Mock Widget */}
      <div className="reveal-on-scroll stagger-3 glass-panel p-6 md:p-8 rounded-3xl border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FaGithub size={20} className="text-cyan-400" />
            <h3 className="text-lg font-extrabold text-white">GitHub Contribution Graph</h3>
          </div>
          <span className="font-mono text-xs text-gray-400">1,450+ Commits in 2026</span>
        </div>

        {/* Simulated Heatmap Grid */}
        <div className="grid grid-cols-7 gap-2 pt-2">
          {Array.from({ length: 49 }).map((_, i) => {
            const intensity = (i * 7) % 5;
            const bgClass =
              intensity === 4
                ? 'bg-cyan-400 shadow-[0_0_8px_#00F0FF]'
                : intensity === 3
                ? 'bg-cyan-500/70'
                : intensity === 2
                ? 'bg-violet-600/50'
                : intensity === 1
                ? 'bg-gray-800'
                : 'bg-white/5';
            return <div key={i} className={`h-8 rounded-lg ${bgClass} transition-colors`} />;
          })}
        </div>
      </div>

      {/* 4. Certifications & Honors Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 [perspective:1000px]">
        {ACHIEVEMENTS.map((ach, idx) => {
          return (
            <div
              key={ach.id}
              style={{
                transitionDelay: `${(idx % 3) * 0.08}s`,
                transformStyle: 'preserve-3d',
              }}
              className="reveal-on-scroll transform-gpu h-full"
            >
              <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} perspective={1000} className="h-full">
                <div
                  onMouseEnter={() => setCursorHover('AWARD')}
                  onMouseLeave={resetCursor}
                  className="group h-full glass-panel rounded-3xl p-6 border border-white/10 hover:border-cyan-400/60 hover:shadow-[0_0_40px_rgba(0,240,255,0.25)] transition-all duration-500 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 rounded-full glass-panel border border-cyan-400/40 text-[10px] font-mono font-bold text-cyan-300 uppercase">
                        {ach.category}
                      </span>
                      <span className="font-mono text-xs text-gray-500">{ach.date}</span>
                    </div>

                    <h3 className="text-xl font-black text-white group-hover:text-cyan-400 transition-colors mb-1">
                      {ach.title}
                    </h3>
                    <div className="font-mono text-xs font-bold text-cyan-400 mb-3">
                      {ach.issuer}
                    </div>
                    <p className="text-gray-300 text-xs leading-relaxed mb-4">
                      {ach.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-lg bg-cyan-400/10 border border-cyan-400/30 font-mono text-[10px] text-cyan-300 font-bold">
                      🏆 {ach.badge}
                    </span>
                    {ach.link && (
                      <a
                        href={ach.link}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => sound.playClick()}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </Tilt>
            </div>
          );
        })}
      </div>
    </div>
  );
};
