import React from 'react';
import { Target, Palette, Sparkles, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { STUDIO_CONFIG } from '../studioConfig';

export const AboutSection: React.FC = () => {
  const cards = [
    {
      icon: Target,
      title: 'PRECISION',
      quote: '“Every line matters.”',
      desc: 'Surgical needle stability, flawless geometry, and millimeter-level anatomical placement that endures over time.',
      accentColor: 'from-[#ea7af4] to-[#f472b6]',
      glowColor: 'group-hover:shadow-[0_0_30px_rgba(234,122,244,0.35)]',
    },
    {
      icon: Palette,
      title: 'CREATIVITY',
      quote: '“Your idea. Our artistry.”',
      desc: 'Transforming memories, spiritual narratives, and abstract concepts into visually stunning, timeless tattoo masterworks.',
      accentColor: 'from-[#d946ef] to-[#c084fc]',
      glowColor: 'group-hover:shadow-[0_0_30px_rgba(217,70,239,0.3)]',
    },
    {
      icon: Sparkles,
      title: 'HYGIENE',
      quote: '“Professional standards from setup to aftercare.”',
      desc: 'Hospital-grade autoclave sterilization, 100% single-use membrane cartridges, sterile barrier wraps, and certified protocol.',
      accentColor: 'from-[#38bdf8] to-[#0ea5e9]',
      glowColor: 'group-hover:shadow-[0_0_30px_rgba(14,165,233,0.3)]',
    },
    {
      icon: HeartHandshake,
      title: 'TRUST',
      quote: '“Your skin. Your story. Our responsibility.”',
      desc: 'Transparent consultation, patient pacing, comprehensive aftercare assistance, and dedicated artistic integrity.',
      accentColor: 'from-[#f472b6] to-[#fb7185]',
      glowColor: 'group-hover:shadow-[0_0_30px_rgba(244,114,182,0.35)]',
    },
  ];

  const focusPoints = [
    'Precision',
    'Creativity',
    'Hygiene',
    'Professionalism',
    'Custom designs',
    'Client satisfaction',
    'Attention to detail',
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0e0716] relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#ea7af4]/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-[0.25em] text-[#ea7af4] font-semibold mb-3">
            About Shivansh Tattoo Studio
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            WHERE ART MEETS PRECISION
          </h2>
          <div className="mt-4 h-1 w-20 bg-gradient-to-r from-[#ea7af4] via-[#f472b6] to-[#c084fc] mx-auto rounded-full" />
          <p className="mt-6 text-zinc-300 text-base sm:text-lg leading-relaxed font-light">
            Shivansh Tattoo Studio is a professional tattoo studio focused on creating meaningful, detailed and personalized tattoos. We believe every tattoo should represent the person wearing it.
          </p>
        </div>

        {/* 4 Feature 3D Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className={`group relative p-7 rounded-lg bg-[#140c1e] border border-white/10 hover:border-[#ea7af4]/50 transition-all duration-300 transform hover:-translate-y-2 ${card.glowColor}`}
                style={{
                  perspective: '1000px',
                }}
              >
                {/* Neon Top Accent Line */}
                <div className={`h-1 w-12 rounded-full bg-gradient-to-r ${card.accentColor} mb-6 transition-all duration-300 group-hover:w-full`} />

                <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-5 border border-white/10 group-hover:border-white/20 transition-colors">
                  <Icon className="w-6 h-6 text-white group-hover:text-[#ea7af4] transition-colors" />
                </div>

                <h3 className="text-lg font-bold uppercase tracking-[0.16em] text-white">
                  {card.title}
                </h3>

                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#ea7af4]">
                  {card.quote}
                </p>

                <p className="mt-3 text-sm text-zinc-400 leading-relaxed font-light">
                  {card.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Core Pillars List */}
        <div className="mt-16 p-8 rounded-xl bg-[#140c1e]/80 border border-[#ea7af4]/20 backdrop-blur">
          <div className="text-xs uppercase tracking-[0.2em] text-[#fae8ff]/70 font-semibold mb-4 text-center">
            Our Core Studio Foundations
          </div>
          <div className="flex flex-wrap items-center justify-center gap-y-3 gap-x-8">
            {focusPoints.map((point) => (
              <div key={point} className="flex items-center gap-2 text-sm sm:text-base font-medium text-zinc-200">
                <CheckCircle2 className="w-4 h-4 text-[#ea7af4]" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
