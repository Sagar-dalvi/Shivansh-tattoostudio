import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Calendar, MessageSquare } from 'lucide-react';
import { STUDIO_CONFIG } from '../studioConfig';

interface NavbarProps {
  onOpenAiAssistant: () => void;
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAiAssistant, onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Estimator', href: '#estimator' },
    { label: 'Gallery', href: '#gallery' },
    { label: '3D Gallery', href: '#gallery-3d' },
    { label: 'Custom', href: '#custom' },
    { label: 'Artists', href: '#artists' },
    { label: 'Home Service', href: '#home-service' },
    { label: 'Aftercare', href: '#aftercare' },
    { label: 'Blog', href: '#blog' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0c0714]/90 backdrop-blur-md border-b border-[#ea7af4]/15 shadow-[0_10px_30px_rgba(0,0,0,0.8)] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_0_12px_rgba(234,122,244,0.7)]">
            <svg
              viewBox="0 0 500 540"
              className="w-full h-full"
              fill="url(#navNeonCore)"
              stroke="url(#navNeonStroke)"
              strokeWidth="2"
            >
              <defs>
                <linearGradient id="navNeonCore" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="40%" stopColor="#f5d0fe" />
                  <stop offset="100%" stopColor="#ea7af4" />
                </linearGradient>
                <linearGradient id="navNeonStroke" x1="0%" y1="0%" x2="100%" y2="100%">
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
            <span className="font-serif-brand font-bold text-base sm:text-lg tracking-[0.2em] text-white group-hover:text-[#ea7af4] transition-colors leading-none">
              SHIVANSH
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-[0.28em] text-[#fae8ff]/75 font-medium uppercase mt-1">
              TATTOO STUDIO
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-300 hover:text-white transition-colors relative py-1 hover:after:w-full after:w-0 after:h-[2px] after:bg-[#ea7af4] after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-200"
            >
              {link.label}
            </a>
          ))}

          {/* AI Assistant button in Nav */}
          <button
            onClick={onOpenAiAssistant}
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#ea7af4] hover:text-[#fae8ff] transition-colors px-2.5 py-1 rounded border border-[#ea7af4]/35 hover:border-[#ea7af4] bg-[#ea7af4]/10 hover:bg-[#ea7af4]/20"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#ea7af4]" />
            <span>AI Assistant</span>
          </button>
        </nav>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenBooking}
            className="relative inline-flex items-center justify-center px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 rounded bg-gradient-to-r from-[#ea7af4] via-[#d946ef] to-[#c084fc] hover:from-[#f08dfa] hover:to-[#d8b4fe] shadow-[0_0_20px_rgba(234,122,244,0.45)] hover:shadow-[0_0_28px_rgba(234,122,244,0.7)] active:scale-95"
          >
            <Calendar className="w-3.5 h-3.5 mr-2" />
            BOOK NOW
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onOpenBooking}
            className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#ea7af4] to-[#c084fc] rounded shadow-[0_0_12px_rgba(234,122,244,0.4)]"
          >
            Book
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-zinc-300 hover:text-white focus:outline-none focus:ring-1 focus:ring-[#ea7af4] rounded"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#ea7af4]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[60px] bg-[#0c0714]/95 backdrop-blur-xl border-b border-[#ea7af4]/20 px-6 py-6 transition-all shadow-2xl">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium uppercase tracking-[0.16em] text-zinc-300 hover:text-[#ea7af4] transition-colors py-1 border-b border-white/5"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-2 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAiAssistant();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white bg-white/5 border border-[#ea7af4]/40 rounded hover:bg-[#ea7af4]/10"
              >
                <Sparkles className="w-4 h-4 text-[#ea7af4]" />
                Shivansh AI Tattoo Assistant
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 text-xs font-bold uppercase tracking-[0.18em] text-white bg-gradient-to-r from-[#ea7af4] via-[#d946ef] to-[#c084fc] rounded shadow-[0_0_20px_rgba(234,122,244,0.5)]"
              >
                BOOK YOUR TATTOO
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
