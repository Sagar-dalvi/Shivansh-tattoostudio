import React, { useState, useRef } from 'react';
import { ArrowRight, Sparkles, Zap, ShieldCheck } from 'lucide-react';
import { STUDIO_CONFIG } from '../studioConfig';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenAiAssistant: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onOpenAiAssistant }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [machineActive, setMachineActive] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  // Mouse parallax effect
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (window.innerWidth < 768) return; // Keep mobile lightweight
    const rect = heroRef.current?.getBoundingClientRect();
    if (rect) {
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePos({ x, y });
    }
  };

  const triggerMachinePulse = () => {
    setMachineActive(true);
    setTimeout(() => setMachineActive(false), 1200);
  };

  return (
    <section
      id="home"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[95vh] sm:min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0c0714]"
    >
      <style>{`
        @keyframes heroNeonPulseGlow {
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

        @keyframes laserGuidePulse {
          0%, 100% {
            opacity: 0.6;
            stroke-dashoffset: 0;
          }
          50% {
            opacity: 1;
            stroke-dashoffset: -8;
          }
        }

        @keyframes machineHumVibe {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-0.8px) rotate(-0.3deg); }
          75% { transform: translateY(0.8px) rotate(0.3deg); }
        }
      `}</style>

      {/* 3D Depth Lighting Orbs */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] rounded-full bg-[#ea7af4]/18 blur-[130px] pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: `translate(calc(-50% + ${mousePos.x * 50}px), calc(-50% + ${mousePos.y * 50}px))`,
        }}
      />
      <div
        className="absolute top-1/3 right-1/4 w-[280px] sm:w-[450px] h-[280px] sm:h-[450px] rounded-full bg-[#c084fc]/15 blur-[110px] pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: `translate(${mousePos.x * -40}px, ${mousePos.y * -40}px)`,
        }}
      />

      {/* Futuristic Precision Grid / Linework Backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_45%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">

        {/* 1. Pure Animated SVG Logo (Zero Squares, Zero Circles - Floating with Pulsing Neon Glow) */}
        <div
          className="relative mb-6 cursor-pointer select-none group"
          style={{
            transform: `perspective(1000px) rotateY(${mousePos.x * 12}deg) rotateX(${mousePos.y * -12}deg)`,
            transition: 'transform 0.25s ease-out',
          }}
          onClick={onOpenAiAssistant}
          title="Click to consult Shivansh AI Assistant"
        >
          {/* Pure SVG Monogram Vector Logo with Pulsing Neon Glow */}
          <svg
            viewBox="0 0 500 540"
            className="w-32 h-auto sm:w-40 md:w-48 transition-transform duration-500 group-hover:scale-105"
            style={{
              animation: 'heroNeonPulseGlow 2.8s ease-in-out infinite',
              willChange: 'filter, transform',
            }}
          >
            <defs>
              {/* Iridescent Luminous Core Fill */}
              <linearGradient id="heroNeonCore" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="35%" stopColor="#f5d0fe" />
                <stop offset="70%" stopColor="#ea7af4" />
                <stop offset="100%" stopColor="#c084fc" />
              </linearGradient>

              {/* Radiant Precision Neon Edge */}
              <linearGradient id="heroNeonStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="45%" stopColor="#fae8ff" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#ea7af4" stopOpacity="0.95" />
              </linearGradient>
            </defs>

            {/* Official Emblem Path - Zero Box or Circle Container */}
            <g
              id="hero-svg-emblem"
              fill="url(#heroNeonCore)"
              stroke="url(#heroNeonStroke)"
              strokeWidth="2.5"
              strokeLinejoin="miter"
              strokeMiterlimit="4"
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

        {/* 2. Precision Rotary Tattoo Machine Showcase (Replaces the square box with authentic tattoo craft) */}
        <div
          onClick={triggerMachinePulse}
          className="mb-8 cursor-pointer select-none group relative max-w-lg w-full flex flex-col items-center"
          title="Click to test precision needle calibration"
        >
          {/* Tattoo Machine SVG Rendering */}
          <div
            className={`w-72 sm:w-88 md:w-96 transition-all duration-300 drop-shadow-[0_0_20px_rgba(234,122,244,0.45)] group-hover:drop-shadow-[0_0_30px_rgba(234,122,244,0.7)] ${
              machineActive ? 'animate-[machineHumVibe_0.1s_infinite]' : ''
            }`}
          >
            <svg
              viewBox="0 0 420 120"
              className="w-full h-auto overflow-visible"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="penBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3d2f4f" />
                  <stop offset="35%" stopColor="#1c1328" />
                  <stop offset="70%" stopColor="#2a1f3a" />
                  <stop offset="100%" stopColor="#110a1b" />
                </linearGradient>

                <linearGradient id="penMetalAccent" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ea7af4" />
                  <stop offset="50%" stopColor="#fae8ff" />
                  <stop offset="100%" stopColor="#c084fc" />
                </linearGradient>

                <linearGradient id="penCartridgeCone" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ea7af4" stopOpacity="0.25" />
                  <stop offset="60%" stopColor="#fae8ff" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0.9" />
                </linearGradient>
              </defs>

              {/* Tattoo Pen Chassis */}
              <g transform="translate(10, 20)">
                {/* 1. Wireless Battery Power Pack / Digital Cap */}
                <rect x="15" y="24" width="48" height="34" rx="6" fill="url(#penBodyGrad)" stroke="#ea7af4" strokeWidth="1.5" />
                {/* Power LED Indicator */}
                <circle cx="28" cy="41" r="3.5" fill="#ea7af4" className="animate-pulse" />
                {/* Digital Voltage Screen */}
                <rect x="38" y="32" width="18" height="18" rx="2" fill="#080310" stroke="#ea7af4" strokeWidth="0.8" />
                <text x="47" y="44" fontFamily="monospace" fontSize="8" fill="#ea7af4" textAnchor="middle" fontWeight="bold">
                  {machineActive ? '9.2' : '8.5'}
                </text>
                <text x="47" y="48.5" fontFamily="monospace" fontSize="4.5" fill="#fae8ff" textAnchor="middle">VOLT</text>

                {/* 2. Anodized Connector Ring */}
                <rect x="63" y="26" width="8" height="30" rx="2" fill="url(#penMetalAccent)" />

                {/* 3. Main Motor Housing (Laser Engraved) */}
                <rect x="71" y="23" width="98" height="36" rx="4" fill="url(#penBodyGrad)" stroke="#533c6e" strokeWidth="1" />
                <text x="120" y="43" fontFamily="'Cinzel', serif" fontSize="8" fontWeight="bold" fill="#f5d0fe" letterSpacing="2" textAnchor="middle">
                  SHIVANSH PRO
                </text>
                <text x="120" y="51" fontFamily="sans-serif" fontSize="5" fontWeight="600" fill="#ea7af4" letterSpacing="1.5" textAnchor="middle">
                  DIRECT-DRIVE ROTARY
                </text>
                <line x1="85" y1="31" x2="155" y2="31" stroke="#ea7af4" strokeWidth="0.8" strokeOpacity="0.5" />

                {/* 4. Stroke Adjustment Dial with Calibration Marks */}
                <rect x="169" y="24" width="14" height="34" rx="2" fill="url(#penMetalAccent)" />
                <line x1="176" y1="27" x2="176" y2="55" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="2,3" />

                {/* 5. Contoured Ergonomic Linework Grip */}
                <path d="M183,23 Q205,19 228,24 L244,27 L244,55 L228,58 Q205,63 183,59 Z" fill="url(#penBodyGrad)" stroke="#5b4375" strokeWidth="1" />
                {/* Precision Grip Grooves */}
                <line x1="196" y1="23" x2="196" y2="59" stroke="#ea7af4" strokeWidth="1" strokeOpacity="0.4" />
                <line x1="209" y1="22" x2="209" y2="60" stroke="#ea7af4" strokeWidth="1" strokeOpacity="0.4" />
                <line x1="222" y1="24" x2="222" y2="58" stroke="#ea7af4" strokeWidth="1" strokeOpacity="0.4" />

                {/* 6. Cartridge Lock Collar */}
                <rect x="244" y="28" width="12" height="26" rx="2" fill="url(#penMetalAccent)" />

                {/* 7. Clear Precision Needle Cartridge */}
                <polygon points="256,30 300,35 300,47 256,52" fill="url(#penCartridgeCone)" stroke="#ea7af4" strokeWidth="1" />
                {/* Internal Needle Shaft */}
                <line x1="264" y1="41" x2="300" y2="41" stroke="#c084fc" strokeWidth="1.8" />

                {/* 8. Ultra-Fine 0.25mm 3RL Needle Tip */}
                <polygon points="300,39.5 320,41 300,42.5" fill="#ffffff" />

                {/* 9. Violet Precision Laser Alignment Beam */}
                <line
                  x1="320"
                  y1="41"
                  x2="395"
                  y2="41"
                  stroke="#ea7af4"
                  strokeWidth={machineActive ? "2.5" : "1.5"}
                  strokeDasharray="4,3"
                  style={{ animation: 'laserGuidePulse 1.8s infinite linear' }}
                />
                {/* Laser Target Reticle */}
                <circle cx="395" cy="41" r={machineActive ? "4" : "2.5"} fill="#ffffff" className="animate-ping" />
                <circle cx="395" cy="41" r="2.5" fill="#ea7af4" />
              </g>
            </svg>
          </div>

          {/* Machine Calibration Live Status Badge */}
          <div className="mt-2 inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-white/[0.04] border border-[#ea7af4]/30 text-[10px] sm:text-xs text-[#fae8ff] tracking-wider uppercase backdrop-blur-sm transition-all group-hover:border-[#ea7af4]/70">
            <span className={`w-1.5 h-1.5 rounded-full ${machineActive ? 'bg-[#ea7af4] shadow-[0_0_8px_#ea7af4]' : 'bg-emerald-400 shadow-[0_0_6px_#34d399]'}`} />
            <span className="font-semibold text-white">0.25mm Linework Machine</span>
            <span className="text-zinc-500">·</span>
            <span className="text-[#ea7af4] font-medium">{machineActive ? 'Firing at 10,800 RPM' : 'Click to Calibrate Needle'}</span>
          </div>
        </div>

        {/* Clean Kicker */}
        <div className="flex items-center gap-2 text-xs sm:text-sm tracking-[0.25em] text-[#ea7af4] uppercase font-semibold mb-4">
          <span>Official Studio</span>
          <span aria-hidden="true" className="text-zinc-600">·</span>
          <span>Bespoke Tattooing</span>
          <span aria-hidden="true" className="text-zinc-600">·</span>
          <span>Medical Hygiene</span>
        </div>

        {/* Primary Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] max-w-4xl">
          YOUR STORY.{' '}
          <span className="block mt-1 bg-gradient-to-r from-white via-[#fae8ff] to-[#ea7af4] bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(234,122,244,0.35)]">
            INKED WITH PRECISION.
          </span>
        </h1>

        {/* Subheadline */}
        <p className="mt-6 text-base sm:text-lg md:text-xl text-zinc-300 max-w-2xl font-light leading-relaxed">
          Custom tattoos crafted with precision, creativity and attention to every line.
        </p>

        {/* Tagline Accent */}
        <p className="mt-2 text-xs sm:text-sm tracking-[0.3em] uppercase text-[#fae8ff]/80 font-medium font-serif-brand">
          “{STUDIO_CONFIG.tagline}”
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-white rounded bg-gradient-to-r from-[#ea7af4] via-[#d946ef] to-[#c084fc] hover:from-[#f08dfa] hover:to-[#d8b4fe] shadow-[0_0_28px_rgba(234,122,244,0.5)] hover:shadow-[0_0_38px_rgba(234,122,244,0.8)] transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
          >
            <span>BOOK YOUR TATTOO</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href="#gallery"
            className="w-full sm:w-auto px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-zinc-200 hover:text-white rounded border border-white/20 hover:border-[#ea7af4]/60 bg-white/[0.03] hover:bg-white/[0.08] backdrop-blur transition-all duration-300 text-center"
          >
            EXPLORE OUR WORK
          </a>
        </div>

        {/* Interactive Feature Hooks */}
        <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 w-full text-left">
          <div>
            <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">100%</div>
            <div className="text-xs text-zinc-400 uppercase tracking-wider mt-1">Single-Use Sterilized</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-[#ea7af4] tracking-tight">Custom</div>
            <div className="text-xs text-zinc-400 uppercase tracking-wider mt-1">Original Artwork Only</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">Home</div>
            <div className="text-xs text-zinc-400 uppercase tracking-wider mt-1">Private Service Available</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-[#f472b6] tracking-tight">AI Assist</div>
            <div className="text-xs text-zinc-400 uppercase tracking-wider mt-1">Virtual Consultation</div>
          </div>
        </div>
      </div>
    </section>
  );
};
