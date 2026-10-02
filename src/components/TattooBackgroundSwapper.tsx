import React, { useState, useEffect } from 'react';
import { Sparkles, Play, Pause, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

interface TattooArt {
  id: string;
  title: string;
  category: string;
  artistNote: string;
  renderSvg: () => React.ReactNode;
}

export const TattooBackgroundSwapper: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showBadge, setShowBadge] = useState(true);

  const TATTOOS: TattooArt[] = [
    {
      id: 'shiva-trishul',
      title: 'Cosmic Trishul & Sacred Yantra',
      category: 'Spiritual Realism',
      artistNote: 'Sacred Trident of Shiva with radiant Mahamrityunjaya geometry',
      renderSvg: () => (
        <svg viewBox="0 0 1200 900" className="w-full h-full object-cover select-none">
          <defs>
            <radialGradient id="trishulGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ea7af4" stopOpacity="0.25" />
              <stop offset="60%" stopColor="#86198f" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#0c0714" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="neonInk" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#f5d0fe" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#ea7af4" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Ambient Glow */}
          <circle cx="600" cy="450" r="450" fill="url(#trishulGlow)" />

          {/* Outer Concentric Yantra Rings */}
          <g stroke="#ea7af4" strokeOpacity="0.25" fill="none" strokeWidth="1.5">
            <circle cx="600" cy="450" r="380" strokeDasharray="6,6" />
            <circle cx="600" cy="450" r="340" />
            <circle cx="600" cy="450" r="300" strokeWidth="0.8" strokeDasharray="3,3" />
            <circle cx="600" cy="450" r="240" />
          </g>

          {/* 12-Petal Sacred Lotus Geometry */}
          <g stroke="url(#neonInk)" fill="none" strokeWidth="1.2">
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
              <path
                key={deg}
                d="M600,450 C570,300 630,300 600,210 C570,300 630,300 600,450"
                transform={`rotate(${deg} 600 450)`}
                strokeOpacity="0.35"
              />
            ))}
          </g>

          {/* Sri Yantra Interlocking Triangles */}
          <g stroke="#ffffff" strokeOpacity="0.2" fill="none" strokeWidth="1">
            <polygon points="600,230 430,550 770,550" />
            <polygon points="600,670 430,350 770,350" />
            <polygon points="600,280 470,520 730,520" />
            <polygon points="600,620 470,380 730,380" />
          </g>

          {/* Central Lord Shiva Trishul (Trident) */}
          <g stroke="url(#neonInk)" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
            {/* Main Center Blade */}
            <path d="M600,140 L600,740" stroke="#ffffff" strokeOpacity="0.7" strokeWidth="3.5" />
            {/* Center Spear Tip */}
            <path d="M575,220 Q600,120 625,220 Q615,260 600,270 Q585,260 575,220 Z" fill="#ea7af4" fillOpacity="0.15" stroke="#ea7af4" strokeWidth="2" />
            
            {/* Left Curved Prong */}
            <path d="M600,320 C510,320 470,220 490,160 C510,210 560,260 600,280" stroke="#ea7af4" strokeWidth="2.5" />
            <circle cx="490" cy="160" r="4" fill="#ffffff" fillOpacity="0.8" />

            {/* Right Curved Prong */}
            <path d="M600,320 C690,320 730,220 710,160 C690,210 640,260 600,280" stroke="#ea7af4" strokeWidth="2.5" />
            <circle cx="710" cy="160" r="4" fill="#ffffff" fillOpacity="0.8" />

            {/* Damru (Hourglass Drum) */}
            <path d="M565,360 L635,360 L575,410 L625,410 Z" stroke="#ffffff" strokeWidth="2" fill="#ffffff" fillOpacity="0.1" />
            <path d="M575,360 L625,410" stroke="#ea7af4" strokeWidth="1.5" />
            <path d="M625,360 L575,410" stroke="#ea7af4" strokeWidth="1.5" />

            {/* Crescent Moon Accent */}
            <path d="M540,200 C520,230 520,260 545,280 C530,260 530,230 540,200 Z" fill="#ffffff" fillOpacity="0.6" stroke="none" />

            {/* Third Eye (Trinetra) */}
            <path d="M585,450 Q600,430 615,450 Q600,470 585,450 Z" stroke="#ea7af4" strokeWidth="2" fill="#ea7af4" fillOpacity="0.3" />
            <circle cx="600" cy="450" r="3" fill="#ffffff" />
          </g>

          {/* Stippling / Dotwork Constellation */}
          <g fill="#ffffff" fillOpacity="0.4">
            <circle cx="530" cy="300" r="2" />
            <circle cx="670" cy="300" r="2" />
            <circle cx="450" cy="450" r="2.5" />
            <circle cx="750" cy="450" r="2.5" />
            <circle cx="600" cy="620" r="3" />
            <circle cx="600" cy="670" r="2" />
          </g>

          {/* Devanagari Inscription: ॐ नमः शिवाय */}
          <text x="600" y="800" textAnchor="middle" fill="#ea7af4" fillOpacity="0.4" fontSize="28" fontFamily="serif" letterSpacing="12">
            ॐ नमः शिवाय
          </text>
        </svg>
      ),
    },
    {
      id: 'sacred-mandala',
      title: 'Sacred Hexagonal Mandala',
      category: 'Geometric Symmetry',
      artistNote: 'Zero-tolerance vector symmetry with concentric dot gradation',
      renderSvg: () => (
        <svg viewBox="0 0 1200 900" className="w-full h-full object-cover select-none">
          <defs>
            <radialGradient id="mandalaGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#c026d3" stopOpacity="0.22" />
              <stop offset="60%" stopColor="#701a75" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#0c0714" stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle cx="600" cy="450" r="420" fill="url(#mandalaGlow)" />

          {/* Hexagonal Geometry Multi-Layers */}
          <g stroke="#ffffff" strokeOpacity="0.25" fill="none" strokeWidth="1.2">
            {[0, 15, 30, 45, 60, 75].map((deg) => (
              <polygon
                key={deg}
                points="600,100 890,260 890,640 600,800 310,640 310,260"
                transform={`rotate(${deg} 600 450)`}
                strokeOpacity="0.12"
              />
            ))}
          </g>

          {/* Central Flower of Life Circles */}
          <g stroke="#ea7af4" strokeOpacity="0.3" fill="none" strokeWidth="1.5">
            <circle cx="600" cy="450" r="140" />
            {[0, 60, 120, 180, 240, 300].map((deg) => {
              const rad = (deg * Math.PI) / 180;
              const cx = 600 + 140 * Math.cos(rad);
              const cy = 450 + 140 * Math.sin(rad);
              return <circle key={deg} cx={cx} cy={cy} r="140" />;
            })}
          </g>

          {/* Geometric Diamond Star Core */}
          <g stroke="#ffffff" strokeOpacity="0.4" fill="none" strokeWidth="1.8">
            {[0, 30, 60, 90, 120, 150].map((deg) => (
              <path
                key={deg}
                d="M600,180 L630,420 L750,450 L630,480 L600,720 L570,480 L450,450 L570,420 Z"
                transform={`rotate(${deg} 600 450)`}
                strokeOpacity="0.2"
              />
            ))}
          </g>

          {/* Dotwork Stippling Arrays */}
          <g fill="#ea7af4" fillOpacity="0.6">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <g key={deg} transform={`rotate(${deg} 600 450)`}>
                <circle cx="600" cy="220" r="2.5" />
                <circle cx="600" cy="200" r="3" />
                <circle cx="600" cy="180" r="2" />
                <circle cx="600" cy="160" r="1.5" />
              </g>
            ))}
            <circle cx="600" cy="450" r="10" fill="#ffffff" fillOpacity="0.8" />
          </g>

          <text x="600" y="820" textAnchor="middle" fill="#ffffff" fillOpacity="0.3" fontSize="20" letterSpacing="10" fontFamily="sans-serif">
            SACRED GEOMETRIC HARMONY
          </text>
        </svg>
      ),
    },
    {
      id: 'regal-lion',
      title: 'Hyper-Realistic Lion & Compass',
      category: 'Realism & Shading',
      artistNote: 'Multi-layered tonal study capturing fierce luminescence and nautical guide',
      renderSvg: () => (
        <svg viewBox="0 0 1200 900" className="w-full h-full object-cover select-none">
          <defs>
            <radialGradient id="lionGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#d946ef" stopOpacity="0.2" />
              <stop offset="70%" stopColor="#0c0714" stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle cx="600" cy="450" r="450" fill="url(#lionGlow)" />

          {/* Nautical Compass Rose Base */}
          <g stroke="#ffffff" strokeOpacity="0.2" fill="none" strokeWidth="1.2">
            <circle cx="600" cy="450" r="350" />
            <circle cx="600" cy="450" r="320" strokeDasharray="4,4" />
            <line x1="600" y1="80" x2="600" y2="820" strokeDasharray="8,8" />
            <line x1="230" y1="450" x2="970" y2="450" strokeDasharray="8,8" />
          </g>

          {/* Compass Arrows */}
          <polygon points="600,120 620,430 600,400 580,430" fill="#ffffff" fillOpacity="0.4" />
          <polygon points="600,780 620,470 600,500 580,470" fill="#ffffff" fillOpacity="0.2" />
          <polygon points="170,450 480,430 450,450 480,470" fill="#ffffff" fillOpacity="0.2" />
          <polygon points="1030,450 720,430 750,450 720,470" fill="#ffffff" fillOpacity="0.2" />

          {/* Stylized Lion Face Profile & Mane Contour */}
          <g stroke="#ffffff" strokeWidth="2" fill="none" strokeLinecap="round" strokeOpacity="0.6">
            {/* Crown & Forehead */}
            <path d="M520,300 C560,260 640,260 680,300 C640,320 560,320 520,300" strokeWidth="2.5" />
            <path d="M600,280 L600,430" stroke="#ea7af4" strokeWidth="2" />
            
            {/* Expressive Eyes */}
            <path d="M530,360 Q565,340 600,365 Q565,380 530,360 Z" fill="#ea7af4" fillOpacity="0.3" stroke="#ea7af4" strokeWidth="2" />
            <circle cx="565" cy="360" r="5" fill="#ffffff" />

            <path d="M670,360 Q635,340 600,365 Q635,380 670,360 Z" fill="#ea7af4" fillOpacity="0.3" stroke="#ea7af4" strokeWidth="2" />
            <circle cx="635" cy="360" r="5" fill="#ffffff" />

            {/* Bridge of Nose & Muzzle */}
            <path d="M570,370 L575,440 Q600,460 625,440 L630,370" />
            <path d="M580,440 L620,440 L600,465 Z" fill="#ffffff" fillOpacity="0.6" stroke="#ffffff" strokeWidth="2" />

            {/* Jaw & Whisker Lines */}
            <path d="M600,465 L600,500 Q560,520 520,490" />
            <path d="M600,465 L600,500 Q640,520 680,490" />
            <path d="M560,510 Q600,540 640,510" strokeWidth="2.5" />

            {/* Majestic Mane Tendrils */}
            <path d="M480,260 C420,320 400,450 450,560 C500,640 600,670 600,670 C600,670 700,640 750,560 C800,450 780,320 720,260" stroke="#ea7af4" strokeWidth="2.5" strokeOpacity="0.4" />
            <path d="M440,300 C370,400 370,550 450,650 C540,730 600,740 600,740" stroke="#ffffff" strokeOpacity="0.3" />
            <path d="M760,300 C830,400 830,550 750,650 C660,730 600,740 600,740" stroke="#ffffff" strokeOpacity="0.3" />
          </g>

          <text x="600" y="800" textAnchor="middle" fill="#ea7af4" fillOpacity="0.35" fontSize="22" letterSpacing="8" fontFamily="sans-serif">
            FEARLESS REALISM · PRECISION LINEWORK
          </text>
        </svg>
      ),
    },
    {
      id: 'japanese-koi-flow',
      title: 'Japanese Irezumi Waves & Lotus',
      category: 'Fluid Motion Blackwork',
      artistNote: 'Contoured anatomical flow with curling wind bars and deep contrast scales',
      renderSvg: () => (
        <svg viewBox="0 0 1200 900" className="w-full h-full object-cover select-none">
          <defs>
            <radialGradient id="waveGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.2" />
              <stop offset="70%" stopColor="#0c0714" stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle cx="600" cy="450" r="450" fill="url(#waveGlow)" />

          {/* Irezumi Wind Bars & Waves */}
          <g stroke="#ffffff" strokeOpacity="0.25" fill="none" strokeWidth="3" strokeLinecap="round">
            <path d="M200,650 C350,500 450,750 650,580 C800,450 950,550 1100,420" />
            <path d="M150,720 C320,580 420,800 620,640 C780,510 900,620 1050,480" strokeOpacity="0.18" />
            <path d="M250,580 C400,420 500,680 700,500 C850,380 980,480 1150,350" strokeOpacity="0.18" />
          </g>

          {/* Curling Wave Crests */}
          <g stroke="#ea7af4" strokeWidth="2.5" fill="none" strokeOpacity="0.5">
            <path d="M500,620 C480,570 420,560 390,600 C370,630 400,660 430,650" />
            <path d="M720,480 C700,430 640,420 610,460 C590,490 620,520 650,510" />
            <path d="M920,400 C900,350 840,340 810,380 C790,410 820,440 850,430" />
          </g>

          {/* Ascending Koi Fish Body Linework */}
          <g stroke="#ffffff" strokeWidth="2" fill="none" strokeOpacity="0.55">
            {/* Spine & Head */}
            <path d="M520,700 C580,550 560,380 620,250" stroke="#ea7af4" strokeWidth="3" />
            <path d="M620,250 C650,220 680,240 680,280 C680,320 640,350 600,350" strokeWidth="2.5" />
            <circle cx="650" cy="270" r="4" fill="#ffffff" />

            {/* Flowing Tail Fins */}
            <path d="M520,700 C470,760 420,780 370,820" strokeWidth="2" strokeDasharray="6,4" />
            <path d="M520,700 C530,780 500,830 480,870" strokeWidth="2" strokeDasharray="6,4" />
            <path d="M520,700 C560,770 580,820 610,860" strokeWidth="2" strokeDasharray="6,4" />

            {/* Pectoral Fins */}
            <path d="M570,420 C500,400 450,440 420,490 C470,480 520,460 560,450" />
            <path d="M640,380 C710,360 760,400 780,450 C730,440 680,420 635,410" />

            {/* Scalloped Scales along body */}
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <path
                key={i}
                d={`M${560 + i * 8},${450 + i * 35} Q${590 + i * 5},${430 + i * 35} ${620 + i * 3},${450 + i * 35}`}
                stroke="#ea7af4"
                strokeOpacity="0.4"
                strokeWidth="1.5"
              />
            ))}
          </g>

          <text x="600" y="810" textAnchor="middle" fill="#ea7af4" fillOpacity="0.4" fontSize="22" letterSpacing="10" fontFamily="sans-serif">
            ANATOMICAL FLOW · TIMELESS TRADITION
          </text>
        </svg>
      ),
    },
  ];

  // Auto-swap tattoo artworks every 5.5 seconds
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TATTOOS.length);
    }, 5500);

    return () => clearInterval(interval);
  }, [isPlaying, TATTOOS.length]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + TATTOOS.length) % TATTOOS.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % TATTOOS.length);
  };

  const activeTattoo = TATTOOS[currentIndex];

  return (
    <>
      {/* Fixed Fullscreen Background Tattoo Canvas */}
      <div
        className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none"
        aria-hidden="true"
      >
        {/* Render all tattoos with smooth CSS opacity crossfade */}
        {TATTOOS.map((tattoo, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={tattoo.id}
              className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-in-out ${
                isActive
                  ? 'opacity-85 scale-100 filter contrast-125'
                  : 'opacity-0 scale-105 pointer-events-none'
              }`}
            >
              <div className="w-[110vw] h-[110vh] max-w-none transform translate-y-[-2%] sm:translate-y-0">
                {tattoo.renderSvg()}
              </div>
            </div>
          );
        })}

        {/* Cinematic Scrim & Vignette Overlays: ensures text readability across the website */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0714]/85 via-[#0c0714]/75 to-[#0c0714]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(12,7,20,0.85)_100%)]" />

        {/* Ambient Neon Floating Light Aura */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[#ea7af4]/10 blur-[160px] pointer-events-none animate-pulse" />
      </div>

      {/* Floating Ambient Canvas Indicator (Discreet & Interactive) */}
      <div className="fixed bottom-6 left-6 z-30 hidden sm:flex items-center gap-2">
        {showBadge ? (
          <div className="bg-[#11091a]/85 backdrop-blur-md border border-[#ea7af4]/30 rounded-full pl-3 pr-2 py-1.5 shadow-[0_0_25px_rgba(234,122,244,0.25)] flex items-center gap-3 transition-all hover:border-[#ea7af4]/60">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ea7af4] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ea7af4]" />
              </span>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-white tracking-wider flex items-center gap-1 leading-tight">
                  <Sparkles className="w-2.5 h-2.5 text-[#ea7af4]" />
                  {activeTattoo.title}
                </span>
                <span className="text-[9px] text-[#ea7af4] font-medium tracking-wide leading-none mt-0.5">
                  Live Studio Canvas ({currentIndex + 1}/{TATTOOS.length})
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 border-l border-white/10 pl-2">
              <button
                onClick={handlePrev}
                className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Previous Background Tattoo"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1 rounded-full text-zinc-400 hover:text-[#ea7af4] hover:bg-white/10 transition-colors"
                title={isPlaying ? 'Pause Auto-Swap' : 'Resume Auto-Swap'}
              >
                {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              </button>

              <button
                onClick={handleNext}
                className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Next Background Tattoo"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setShowBadge(false)}
                className="p-1 rounded-full text-zinc-500 hover:text-zinc-300 ml-1"
                title="Minimize Indicator"
              >
                <Eye className="w-3 h-3" />
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowBadge(true)}
            className="p-2.5 rounded-full bg-[#11091a]/80 backdrop-blur border border-[#ea7af4]/30 text-[#ea7af4] hover:bg-[#ea7af4]/20 transition-all shadow-[0_0_15px_rgba(234,122,244,0.3)]"
            title="Show Live Canvas Info"
          >
            <Sparkles className="w-4 h-4 animate-spin text-[#ea7af4]" />
          </button>
        )}
      </div>
    </>
  );
};
