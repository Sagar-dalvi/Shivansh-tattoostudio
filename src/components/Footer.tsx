import React from 'react';
import { Instagram, MessageSquare, MapPin, Sparkles, ArrowUp } from 'lucide-react';
import { STUDIO_CONFIG, getWhatsAppLink } from '../studioConfig';

interface FooterProps {
  onOpenAiAssistant: () => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAiAssistant, onOpenBooking }) => {
  const isInstagramConfigured =
    STUDIO_CONFIG.instagramUrl && !STUDIO_CONFIG.instagramUrl.includes('ADD_');
  const isMapsConfigured =
    STUDIO_CONFIG.googleMapsUrl && !STUDIO_CONFIG.googleMapsUrl.includes('ADD_');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#08040e] border-t border-[#ea7af4]/20 pt-20 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background subtle neon glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-36 bg-[#ea7af4]/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Col 1: Brand & Logo */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-4 group">
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_0_12px_rgba(234,122,244,0.7)]">
                <svg
                  viewBox="0 0 500 540"
                  className="w-full h-full"
                  fill="url(#footerNeonCore)"
                  stroke="url(#footerNeonStroke)"
                  strokeWidth="2"
                >
                  <defs>
                    <linearGradient id="footerNeonCore" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="40%" stopColor="#f5d0fe" />
                      <stop offset="100%" stopColor="#ea7af4" />
                    </linearGradient>
                    <linearGradient id="footerNeonStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="100%" stopColor="#ea7af4" />
                    </linearGradient>
                  </defs>
                  <polygon points="250,20 188,82 188,150 250,88 312,150 312,82" />
                  <rect x="120" y="82" width="61" height="146" />
                  <rect x="80" y="238" width="340" height="64" />
                  <polygon points="120,302 181,302 181,451 120,390" />
                  <polygon points="319,82 380,82 380,390 319,451" />
                  <polygon points="5,238 80,170 80,302" />
                  <polygon points="495,238 420,170 420,302" />
                  <polygon points="250,520 188,458 188,390 250,452 312,390 312,458" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-serif-brand font-bold text-lg sm:text-xl tracking-[0.2em] text-white">
                  SHIVANSH
                </span>
                <span className="font-serif-brand text-[10px] tracking-[0.28em] text-[#fae8ff]/80 font-semibold uppercase">
                  TATTOO STUDIO
                </span>
              </div>
            </div>

            <p className="mt-4 text-xs tracking-[0.25em] text-[#ea7af4] uppercase font-semibold">
              “{STUDIO_CONFIG.tagline}”
            </p>

            <p className="mt-4 text-xs sm:text-sm text-zinc-400 font-light leading-relaxed max-w-sm">
              Custom tattoos crafted with precision, creativity, and medical-grade hygiene. Every line tells an enduring personal story.
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href={isInstagramConfigured ? STUDIO_CONFIG.instagramUrl : '#contact'}
                target={isInstagramConfigured ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#ea7af4] text-zinc-300 hover:text-white border border-white/10 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={getWhatsAppLink('general')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-emerald-600 text-zinc-300 hover:text-white border border-white/10 flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>

              <a
                href={isMapsConfigured ? STUDIO_CONFIG.googleMapsUrl : '#contact'}
                target={isMapsConfigured ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#c084fc] text-zinc-300 hover:text-white border border-white/10 flex items-center justify-center transition-colors"
                aria-label="Google Maps"
              >
                <MapPin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-5">
              Quick Navigation
            </h4>
            <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-xs text-zinc-400">
              <a href="#home" className="hover:text-[#ea7af4] transition-colors">Home</a>
              <a href="#about" className="hover:text-[#ea7af4] transition-colors">About</a>
              <a href="#services" className="hover:text-[#ea7af4] transition-colors">Services</a>
              <a href="#gallery" className="hover:text-[#ea7af4] transition-colors">Gallery</a>
              <button onClick={onOpenAiAssistant} className="text-left text-[#ea7af4] hover:text-[#fae8ff] transition-colors font-medium">
                AI Assistant
              </button>
              <button onClick={onOpenBooking} className="text-left hover:text-[#ea7af4] transition-colors">
                Book Appointment
              </button>
              <a href="#home-service" className="hover:text-[#ea7af4] transition-colors">Home Service</a>
              <a href="#aftercare" className="hover:text-[#ea7af4] transition-colors">Aftercare</a>
              <a href="#artists" className="hover:text-[#ea7af4] transition-colors">Artists</a>
              <a href="#contact" className="hover:text-[#ea7af4] transition-colors">Contact</a>
              <a href="#instagram-feed" className="hover:text-[#ea7af4] transition-colors">Instagram Feed</a>
              <a href="#newsletter" className="hover:text-[#ea7af4] text-[#ea7af4] font-medium transition-colors">VIP 30% Offer</a>
            </div>
          </div>

          {/* Col 3: Studio Location & Hours & Back to Top */}
          <div className="lg:col-span-3 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-3">
                Studio Location
              </h4>
              <p className="text-xs text-zinc-300 font-light leading-relaxed">
                {STUDIO_CONFIG.address}
              </p>
              <div className="mt-2 text-xs text-zinc-400 space-y-1">
                <div>
                  <span className="text-zinc-500">Phone: </span>
                  <a href="tel:9579621490" className="text-zinc-300 hover:text-[#ea7af4]">9579621490</a> / <a href="tel:95790081322" className="text-zinc-300 hover:text-[#ea7af4]">95790081322</a>
                </div>
                <div>
                  <span className="text-zinc-500">Email: </span>
                  <a href={`mailto:${STUDIO_CONFIG.email}`} className="text-zinc-300 hover:text-[#ea7af4]">{STUDIO_CONFIG.email}</a>
                </div>
              </div>

              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white mt-4 mb-1">
                Hours
              </h4>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                {STUDIO_CONFIG.businessHours}
              </p>
            </div>

            <div className="mt-6 pt-4">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
              >
                <span>Return to Top</span>
                <ArrowUp className="w-3.5 h-3.5 text-[#ea7af4]" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-light">
          <div>
            © 2026 {STUDIO_CONFIG.studioName}. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#ea7af4] font-medium tracking-wide">
              “Precision in Every Line.”
            </span>
            <span>·</span>
            <span>Official Shivansh Studio.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
