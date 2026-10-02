import React, { useState } from 'react';
import { ArrowRight, ArrowUpRight, Sparkles, Camera, Maximize2, Eye, X, CheckCircle, ZoomIn } from 'lucide-react';
import { TATTOO_SERVICES, TattooService } from '../studioConfig';

interface ServicesSectionProps {
  onSelectServiceForBooking: (serviceTitle: string) => void;
  onSelectServiceForAi: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForBooking,
  onSelectServiceForAi,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [activePhotoModal, setActivePhotoModal] = useState<TattooService | null>(null);

  const categories = [
    'ALL',
    'Photo Tattoo',
    'Custom',
    'Minimal',
    'Geometric',
    'Realism',
    'Portrait',
    'Lettering',
    'Spiritual',
    'Cover-Up',
    'Home Service',
  ];

  const filteredServices = activeCategory === 'ALL'
    ? TATTOO_SERVICES
    : TATTOO_SERVICES.filter((s) => s.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0c0714] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-[#ea7af4] font-semibold mb-2">
              Artistic Disciplines
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              TATTOO SERVICES
            </h2>
            <p className="mt-3 text-zinc-400 text-sm sm:text-base max-w-xl font-light">
              From microscopic fine line calibrations to large-scale realistic masterworks and photo-to-skin translations, every tattoo is approached with uncompromising artistic discipline.
            </p>
          </div>

          {/* Pricing Discipline Note */}
          <div className="mt-4 md:mt-0 text-xs tracking-wider uppercase text-zinc-400 border-l-2 border-[#ea7af4] pl-3">
            <span>Transparent Consultations</span>
            <div className="text-white font-semibold">“Get a Quote” for Exact Sizing</div>
          </div>
        </div>

        {/* Interactive Filter Controls */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs font-semibold uppercase tracking-[0.14em] px-4 py-2 rounded transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-[#ea7af4] via-[#d946ef] to-[#c084fc] text-white shadow-[0_0_15px_rgba(234,122,244,0.4)]'
                  : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat === 'Photo Tattoo' && <Camera className="w-3.5 h-3.5" />}
              <span>{cat}</span>
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service: TattooService) => {
            const isPhotoTattoo = service.category === 'Photo Tattoo' || service.id === 'photo-tattoos';
            const isPortrait = service.category === 'Portrait' || service.id === 'portrait-tattoos';

            return (
              <div
                key={service.id}
                className={`group relative rounded-lg bg-[#140c1e] border overflow-hidden flex flex-col transition-all duration-300 ${
                  isPhotoTattoo
                    ? 'border-[#ea7af4]/60 shadow-[0_0_25px_rgba(234,122,244,0.2)] hover:border-[#ea7af4] hover:shadow-[0_10px_35px_rgba(234,122,244,0.35)]'
                    : 'border-white/10 hover:border-[#ea7af4]/50 hover:shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(234,122,244,0.25)]'
                }`}
              >
                {/* Service Visual Image */}
                <div className="relative h-60 overflow-hidden bg-zinc-900 group">
                  <img
                    src={service.image}
                    alt={service.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#140c1e] via-transparent to-black/30 pointer-events-none" />

                  {/* Category label */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 text-[10px] font-bold tracking-[0.2em] uppercase text-[#fae8ff] bg-black/70 backdrop-blur px-2.5 py-1 rounded border border-[#ea7af4]/30">
                    {isPhotoTattoo && <Camera className="w-3 h-3 text-[#ea7af4]" />}
                    <span>{service.category}</span>
                  </div>

                  {/* Photo Tattoo Highlight Badge */}
                  {isPhotoTattoo && (
                    <div className="absolute top-3 right-3 text-[10px] font-bold tracking-[0.14em] uppercase text-amber-300 bg-amber-950/80 backdrop-blur px-2 py-0.5 rounded border border-amber-500/40">
                      ★ Photo-to-Ink
                    </div>
                  )}

                  {/* Interactive View HD Photo Tattoo Button */}
                  <button
                    onClick={() => setActivePhotoModal(service)}
                    className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-black/75 hover:bg-[#ea7af4] text-zinc-300 hover:text-white text-xs font-medium tracking-wider backdrop-blur border border-white/20 hover:border-transparent transition-all flex items-center gap-1.5 shadow-lg group-hover:scale-105"
                    title="View Photo Tattoo in HD"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>View Tattoo Photo</span>
                  </button>
                </div>

                {/* Service Info */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold uppercase tracking-[0.12em] text-white group-hover:text-[#ea7af4] transition-colors">
                        {service.title}
                      </h3>
                    </div>

                    <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
                      {service.shortDesc}
                    </p>

                    {/* Feature Highlights */}
                    <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap gap-2">
                      {service.features.map((feat, idx) => (
                        <span key={idx} className="text-[11px] text-zinc-400 flex items-center gap-1">
                          {feat} {idx < service.features.length - 1 ? '·' : ''}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                    <button
                      onClick={() => onSelectServiceForAi(service.title)}
                      className="flex-1 py-2 px-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#ea7af4] hover:text-white bg-[#ea7af4]/10 hover:bg-[#ea7af4] rounded transition-all flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{isPhotoTattoo ? 'Send Photo' : 'Discuss Idea'}</span>
                    </button>

                    <button
                      onClick={() => onSelectServiceForBooking(service.title)}
                      className="py-2 px-3 text-xs font-semibold uppercase tracking-[0.12em] text-white bg-white/5 hover:bg-white/15 rounded border border-white/10 transition-all flex items-center gap-1"
                    >
                      <span>Get a Quote</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* HD Photo Tattoo Lightbox Modal */}
        {activePhotoModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
            onClick={() => setActivePhotoModal(null)}
          >
            <div
              className="relative max-w-3xl w-full bg-[#140c1e] border border-white/20 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(234,122,244,0.3)] animate-scale-up"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40">
                <div className="flex items-center gap-2.5">
                  <Camera className="w-4 h-4 text-[#ea7af4]" />
                  <span className="text-xs uppercase tracking-[0.2em] font-semibold text-zinc-300">
                    HD Tattoo Photo Preview · {activePhotoModal.category}
                  </span>
                </div>
                <button
                  onClick={() => setActivePhotoModal(null)}
                  className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Photo Display */}
              <div className="relative max-h-[60vh] bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={activePhotoModal.image}
                  alt={activePhotoModal.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full max-h-[58vh] object-contain"
                />
                <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md border border-[#ea7af4]/30 rounded-lg px-3 py-1.5 text-xs text-white flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#ea7af4]" />
                  <span>100% Healed Skin Realism Capture</span>
                </div>
              </div>

              {/* Modal Content Details */}
              <div className="p-6 bg-[#140c1e]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold uppercase tracking-wider text-white">
                      {activePhotoModal.title}
                    </h3>
                    <p className="mt-1 text-xs text-zinc-400">
                      {activePhotoModal.shortDesc}
                    </p>
                  </div>
                  <div className="flex items-center gap-2.5 shrink-0">
                    <button
                      onClick={() => {
                        onSelectServiceForAi(activePhotoModal.title);
                        setActivePhotoModal(null);
                      }}
                      className="px-4 py-2 rounded-lg bg-[#ea7af4]/10 hover:bg-[#ea7af4] text-[#ea7af4] hover:text-white text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 border border-[#ea7af4]/30"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Consult Reference Photo</span>
                    </button>
                    <button
                      onClick={() => {
                        onSelectServiceForBooking(activePhotoModal.title);
                        setActivePhotoModal(null);
                      }}
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#ea7af4] to-[#c084fc] hover:brightness-110 text-white text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-lg shadow-[#ea7af4]/20"
                    >
                      <span>Book This Style</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Features Row */}
                <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap gap-2">
                  {activePhotoModal.features.map((feat, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] bg-white/5 border border-white/10 text-zinc-300 px-2.5 py-1 rounded-full"
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
