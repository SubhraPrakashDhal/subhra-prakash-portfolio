import React from 'react';
import { toast } from 'sonner';
import { sound } from './sound';
import { Laptop, Rocket } from 'lucide-react';

const TOAST_DURATION = 4500;

interface ProjectToastCardProps {
  t: string | number;
  projectTitle: string;
  type: 'demo' | 'code';
}

const ProjectToastCard: React.FC<ProjectToastCardProps> = ({ t, projectTitle, type }) => {
  const isDemo = type === 'demo';

  return (
    <div
      role="status"
      aria-live="polite"
      className="
        group relative w-[min(430px,calc(100vw-32px))]
        overflow-hidden rounded-2xl
        border border-cyan-400/30
        bg-[#07101f]/95
        backdrop-blur-2xl
        text-white
        shadow-[0_15px_60px_rgba(0,0,0,0.55)]
        animate-toast-in
      "
    >
      {/* Top glow */}
      <div
        className={`
          pointer-events-none absolute inset-x-0 top-0 h-px
          bg-linear-to-r
          ${isDemo
            ? 'from-transparent via-cyan-400 to-transparent'
            : 'from-transparent via-violet-400 to-transparent'
          }
        `}
      />

      <div className="relative flex items-center gap-3.5 p-4">
        {/* Icon */}
        <div
          className={`
            flex h-11 w-11 shrink-0 items-center justify-center
            rounded-xl border
            ${isDemo
              ? 'border-cyan-400/30 bg-cyan-400/10'
              : 'border-violet-400/30 bg-violet-400/10'
            }
          `}
        >
          <span className="text-xl">
            {isDemo ? <Rocket /> : <Laptop />}
          </span>
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span
              className={`
                h-2 w-2 rounded-full animate-pulse
                ${isDemo ? 'bg-cyan-400' : 'bg-violet-400'}
              `}
            />

            <span
              className={`
                font-mono text-[10px] font-bold
                uppercase tracking-[0.16em]
                ${isDemo ? 'text-cyan-300' : 'text-violet-300'}
              `}
            >
              {isDemo
                ? 'LIVE DEMO COMING SOON'
                : 'REPOSITORY LINK INCOMING'}
            </span>
          </div>

          <div className="mt-1 truncate text-sm font-bold text-white">
            {projectTitle}
          </div>

          <div className="mt-1 text-[11px] leading-relaxed text-gray-400">
            {isDemo
              ? 'Live deployment URL is being prepared. Stay tuned!'
              : 'Source code repository is scheduled for public release soon.'}
          </div>
        </div>

        {/* Close button */}
        <button
          type="button"
          aria-label="Close notification"
          onClick={() => toast.dismiss(t)}
          className="
            flex h-7 w-7 shrink-0 items-center justify-center
            rounded-lg
            text-gray-500
            transition-all
            hover:bg-white/10
            hover:text-white
            active:scale-90
            cursor-pointer
          "
        >
          ✕
        </button>
      </div>

      {/* Toastify-style auto-close progress bar (Pauses on hover, closes on completion) */}
      <div className="project-toast-progress-track">
        <div
          onAnimationEnd={() => toast.dismiss(t)}
          className={`project-toast-progress ${isDemo ? 'progress-demo' : 'progress-code'
            }`}
          style={{
            '--toast-duration': `${TOAST_DURATION}ms`,
          } as React.CSSProperties}
        />
      </div>
    </div>
  );
};

/**
 * Premium Futuristic Glassmorphic Toast
 * Used for unavailable/placeholder project links.
 */
export const showProjectLinkToast = (
  projectTitle: string,
  type: 'demo' | 'code' = 'demo'
) => {
  try {
    sound.playClick();
  } catch {
    // Ignore sound restrictions
  }

  toast.custom(
    (t) => <ProjectToastCard t={t} projectTitle={projectTitle} type={type} />,
    {
      duration: Infinity,
      position: 'bottom-right',
    }
  );
};

export const handleProjectLinkClick = (
  e: React.MouseEvent,
  url: string | undefined,
  projectTitle: string,
  type: 'demo' | 'code' = 'demo'
) => {
  const normalizedUrl = url?.trim();

  const isPlaceholder =
    !normalizedUrl ||
    normalizedUrl === '#' ||
    normalizedUrl === 'javascript:void(0)' ||
    normalizedUrl === '[https://example.com](https://example.com)' ||
    normalizedUrl === '[https://github.com](https://github.com)' ||
    normalizedUrl === 'https://example.com' ||
    normalizedUrl === 'https://github.com';

  if (isPlaceholder) {
    e.preventDefault();
    showProjectLinkToast(projectTitle, type);
    return;
  }

  try {
    sound.playClick();
  } catch {
    // Ignore sound restrictions
  }
};