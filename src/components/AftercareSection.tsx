import React from 'react';
import { ShieldAlert, Droplets, Sun, Sparkles, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { AFTERCARE_POINTS } from '../studioConfig';

export const AftercareSection: React.FC = () => {
  return (
    <section id="aftercare" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0c0714] relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-[0.25em] text-[#ea7af4] font-semibold mb-2">
            Preservation & Healing
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            TAKE CARE OF YOUR NEW INK
          </h2>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base font-light">
            Flawless execution requires attentive healing. Protecting your tattoo during the first 3 to 4 weeks ensures crisp linework and deep contrast for a lifetime.
          </p>
        </div>

        {/* 6 Aftercare Rule Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AFTERCARE_POINTS.map((point, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-[#140c1e] border border-white/10 hover:border-[#ea7af4]/40 transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-[#ea7af4]/15 text-[#ea7af4] font-bold text-xs flex items-center justify-center border border-[#ea7af4]/30">
                  0{index + 1}
                </span>
                <h3 className="text-base font-bold text-white uppercase tracking-wider">
                  {point.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                {point.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Mandatory Medical / Specificity Statement Banner */}
        <div className="mt-12 p-6 rounded-xl bg-gradient-to-r from-purple-950/40 via-[#140c1e] to-fuchsia-950/30 border border-[#ea7af4]/30 flex items-start gap-4">
          <ShieldAlert className="w-6 h-6 text-[#ea7af4] flex-shrink-0 mt-1" />
          <div className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
            <strong className="text-white block mb-1 uppercase tracking-wider font-semibold">
              Official Health & Safety Protocol:
            </strong>
            “Aftercare instructions can vary depending on the tattoo and individual circumstances. Follow the instructions provided by your tattoo artist and seek professional medical advice for concerning symptoms.”
          </div>
        </div>
      </div>
    </section>
  );
};
