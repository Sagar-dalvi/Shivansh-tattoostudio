import React, { useEffect, useState } from 'react';
import { STUDIO_CONFIG } from '../studioConfig';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [fadeState, setFadeState] = useState<'entering' | 'pulsing' | 'exiting'>('entering');

  useEffect(() => {
    // Stage 1: Ignite subtle pulsing neon glow
    const t1 = setTimeout(() => {
      setFadeState('pulsing');
    }, 250);

    // Stage 2: Begin smooth transition out after crisp showcase
    const t2 = setTimeout(() => {
      setFadeState('exiting');
    }, 1600);

    // Stage 3: Complete transition to site content
    const t3 = setTimeout(() => {
      onComplete();
    }, 2050);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <div
      onClick={onComplete}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#09040e] cursor-pointer select-none transition-opacity duration-500 ${
        fadeState === 'exiting' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-label="Loading Shivansh Tattoo Studio"
    >
      <style>{`
        @keyframes neonPulseGlow {
          0%, 100% {
            filter: drop-shadow(0 0 10px rgba(234, 122, 244, 0.65))
                    drop-shadow(0 0 25px rgba(217, 70, 239, 0.4))
                    drop-shadow(0 0 50px rgba(192, 132, 252, 0.2));
            transform: scale(1);
          }
          50% {
            filter: drop-shadow(0 0 18px rgba(250, 232, 255, 0.95))
                    drop-shadow(0 0 38px rgba(234, 122, 244, 0.85))
                    drop-shadow(0 0 75px rgba(217, 70, 239, 0.55));
            transform: scale(1.035);
          }
        }

        @keyframes neonStrokeBreathe {
          0%, 100% {
            stroke-opacity: 0.6;
          }
          50% {
            stroke-opacity: 1;
          }
        }

        @keyframes neonSubtleBeam {
          0%, 100% {
            opacity: 0.35;
          }
          50% {
            opacity: 0.7;
          }
        }
      `}</style>

      {/* Floating Logo Only - Strictly NO squares and NO circles */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <div
          className={`transition-all duration-700 ease-out transform ${
            fadeState === 'entering' ? 'scale-90 opacity-0' : 'scale-100 opacity-100'
          }`}
        >
          {/* Pure SVG Monogram Emblem with Subtle Pulsing Neon Glow */}
          <svg
            viewBox="0 0 500 540"
            className="w-36 h-auto sm:w-44 md:w-52 max-w-[80vw]"
            style={{
              animation: fadeState === 'pulsing' ? 'neonPulseGlow 2.2s ease-in-out infinite' : 'none',
              willChange: 'filter, transform',
            }}
          >
            <defs>
              {/* Iridescent Luminous Core Fill */}
              <linearGradient id="loaderNeonFill" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="35%" stopColor="#f5d0fe" />
                <stop offset="70%" stopColor="#ea7af4" />
                <stop offset="100%" stopColor="#c084fc" />
              </linearGradient>

              {/* Radiant Precision Neon Edge */}
              <linearGradient id="loaderNeonStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="45%" stopColor="#fae8ff" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#ea7af4" stopOpacity="0.95" />
              </linearGradient>
            </defs>

            {/* Exact Official Geometric Emblem Path - Zero Box/Card/Circle Container */}
            <g
              id="loader-svg-emblem"
              fill="url(#loaderNeonFill)"
              stroke="url(#loaderNeonStroke)"
              strokeWidth="2.5"
              strokeLinejoin="miter"
              strokeMiterlimit="4"
              style={{
                animation: 'neonStrokeBreathe 2.2s ease-in-out infinite',
              }}
            >
              {/* 1. Top Chevron Apex */}
              <polygon points="250,20 188,82 188,150 250,88 312,150 312,82" />

              {/* 2. Left Pillar Upper Section (with signature horizontal slit) */}
              <rect x="120" y="82" width="61" height="146" />

              {/* 3. Horizontal Crossbar & Connecting Extensions */}
              <rect x="80" y="238" width="340" height="64" />

              {/* 4. Left Pillar Lower Section */}
              <polygon points="120,302 181,302 181,451 120,390" />

              {/* 5. Right Pillar (Solid Continuous Bar with 45-degree angled base) */}
              <polygon points="319,82 380,82 380,390 319,451" />

              {/* 6. Left Arrowhead (Winged Barb on Top, Tip on Bar Line) */}
              <polygon points="5,238 80,170 80,302" />

              {/* 7. Right Arrowhead (Winged Barb on Top, Tip on Bar Line) */}
              <polygon points="495,238 420,170 420,302" />

              {/* 8. Bottom Chevron Apex */}
              <polygon points="250,520 188,458 188,390 250,452 312,390 312,458" />
            </g>
          </svg>
        </div>

        {/* Studio Typography - Minimal & Clean */}
        <div
          className={`mt-8 transition-all duration-600 delay-100 transform ${
            fadeState === 'entering' ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'
          }`}
        >
          <h1 className="text-2xl sm:text-3xl font-bold tracking-[0.25em] text-white font-serif-brand drop-shadow-[0_0_12px_rgba(234,122,244,0.4)]">
            SHIVANSH
          </h1>
          <div className="text-[10px] sm:text-xs tracking-[0.35em] text-[#fae8ff]/80 font-serif-brand font-semibold uppercase mt-1">
            TATTOO STUDIO
          </div>

          <p className="mt-3 text-xs tracking-[0.3em] text-[#ea7af4] uppercase font-semibold">
            “{STUDIO_CONFIG.tagline}”
          </p>
        </div>
      </div>
    </div>
  );
};
