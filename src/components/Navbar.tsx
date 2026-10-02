import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Calendar, User as UserIcon, LogIn, LogOut, ChevronDown, FolderHeart } from 'lucide-react';
import { STUDIO_CONFIG } from '../studioConfig';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onOpenAiAssistant: () => void;
  onOpenBooking: () => void;
  onOpenUserDashboard?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAiAssistant,
  onOpenBooking,
  onOpenUserDashboard,
}) => {
  const { user, signIn, signOut } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

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

        {/* Right CTA & User Account */}
        <div className="hidden sm:flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1.5 rounded-full bg-white/5 border border-[#ea7af4]/30 hover:border-[#ea7af4] transition-colors"
                title="Account Menu"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'User'}
                    className="w-7 h-7 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-[#ea7af4]/20 flex items-center justify-center text-[#ea7af4]">
                    <UserIcon className="w-4 h-4" />
                  </div>
                )}
                <ChevronDown className="w-3.5 h-3.5 text-zinc-400 mr-1" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-[#11091a] border border-[#ea7af4]/30 rounded-xl shadow-2xl p-2 z-50">
                  <div className="px-3 py-2 border-b border-white/10 mb-1">
                    <p className="text-xs font-bold text-white truncate">{user.displayName || 'Client'}</p>
                    <p className="text-[10px] text-zinc-400 truncate">{user.email}</p>
                  </div>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      if (onOpenUserDashboard) onOpenUserDashboard();
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-zinc-300 hover:text-white hover:bg-white/10 rounded flex items-center gap-2 transition-colors"
                  >
                    <FolderHeart className="w-3.5 h-3.5 text-[#ea7af4]" />
                    <span>My Bookings & Concepts</span>
                  </button>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      signOut();
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-rose-400 hover:bg-rose-500/10 rounded flex items-center gap-2 transition-colors mt-1"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => signIn()}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-zinc-300 hover:text-white rounded border border-white/15 hover:border-[#ea7af4]/40 bg-white/5 hover:bg-white/10 transition-colors"
              title="Sign in with Google"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.17 0 10.02 0 12s.45 3.83 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Sign In</span>
            </button>
          )}

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
          {user ? (
            <button
              onClick={onOpenUserDashboard}
              className="w-7 h-7 rounded-full border border-[#ea7af4]/40 overflow-hidden"
              title="My Dashboard"
            >
              {user.photoURL ? (
                <img src={user.photoURL} alt="User" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-[#ea7af4]/20 flex items-center justify-center text-[#ea7af4]">
                  <UserIcon className="w-3.5 h-3.5" />
                </div>
              )}
            </button>
          ) : (
            <button
              onClick={() => signIn()}
              className="text-[11px] font-semibold text-zinc-300 px-2 py-1 rounded bg-white/5 border border-white/10"
            >
              Sign In
            </button>
          )}

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
            {user && (
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {user.photoURL && (
                    <img src={user.photoURL} alt="User" className="w-8 h-8 rounded-full" />
                  )}
                  <div>
                    <p className="text-xs font-bold text-white">{user.displayName}</p>
                    <p className="text-[10px] text-zinc-400">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenUserDashboard) onOpenUserDashboard();
                  }}
                  className="text-[11px] font-bold text-[#ea7af4] px-2.5 py-1 rounded bg-[#ea7af4]/10 border border-[#ea7af4]/30"
                >
                  Dashboard
                </button>
              </div>
            )}

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
