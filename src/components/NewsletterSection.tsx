import React, { useState, useEffect } from 'react';
import { Mail, Sparkles, Percent, Check, Copy, ArrowRight, ShieldCheck, Tag, Gift, ExternalLink, Calendar } from 'lucide-react';
import { STUDIO_CONFIG, getWhatsAppLink } from '../studioConfig';

interface NewsletterSectionProps {
  onOpenBooking?: (type?: string, description?: string) => void;
}

export const NewsletterSection: React.FC<NewsletterSectionProps> = ({ onOpenBooking }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [voucherCode, setVoucherCode] = useState('');
  const [copied, setCopied] = useState(false);

  // Check localStorage for previously subscribed voucher
  useEffect(() => {
    try {
      const savedCode = localStorage.getItem('shivansh_discount_voucher');
      const savedEmail = localStorage.getItem('shivansh_newsletter_email');
      if (savedCode && savedEmail) {
        setVoucherCode(savedCode);
        setEmail(savedEmail);
        setStatus('success');
      }
    } catch {
      // Ignore local storage error
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Validation
    const cleanEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      setStatus('error');
      setErrorMessage('Please provide a valid email address to receive your 30% discount voucher.');
      return;
    }

    setStatus('loading');

    // Simulate instant secure processing & code generation
    setTimeout(() => {
      // Generate unique voucher code e.g. SHIVANSH30-7X9K
      const uniqueSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
      const code = `SHIVANSH30-${uniqueSuffix}`;

      setVoucherCode(code);
      setStatus('success');

      try {
        localStorage.setItem('shivansh_discount_voucher', code);
        localStorage.setItem('shivansh_newsletter_email', cleanEmail);
      } catch {
        // Storage failover
      }
    }, 600);
  };

  const handleCopyCode = () => {
    if (!voucherCode) return;
    navigator.clipboard.writeText(voucherCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleRedeemOnBooking = () => {
    if (onOpenBooking) {
      onOpenBooking('First Session (30% Discount)', `Newsletter 30% Promo Voucher: ${voucherCode}`);
    } else {
      const el = document.getElementById('booking');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setEmail('');
    setVoucherCode('');
    setErrorMessage('');
    try {
      localStorage.removeItem('shivansh_discount_voucher');
      localStorage.removeItem('shivansh_newsletter_email');
    } catch {
      // Ignore
    }
  };

  const whatsAppRedeemUrl = getWhatsAppLink(
    'general',
    `Hi Shivansh Tattoo Studio, I subscribed to your newsletter with ${email} and received my 30% first session discount voucher: ${voucherCode}. I would like to book my session!`
  );

  return (
    <section id="newsletter" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#090510] relative overflow-hidden">
      {/* Ambient background glows for glass-morphism refraction */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#ea7af4]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Subtle fine geometric line watermark */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
        <svg viewBox="0 0 1000 1000" className="w-[1200px] h-[1200px] stroke-white" fill="none" strokeWidth="1">
          <circle cx="500" cy="500" r="450" />
          <circle cx="500" cy="500" r="300" strokeDasharray="6 6" />
          <polygon points="500,50 890,275 890,725 500,950 110,725 110,275" />
          <polygon points="500,100 846,300 846,700 500,900 154,700 154,300" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Glassmorphic Master Container */}
        <div className="relative rounded-3xl p-8 sm:p-12 md:p-14 overflow-hidden border border-white/15 bg-white/[0.03] backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.2)]">
          {/* Top Edge Specular Sheen */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#ea7af4]/70 to-transparent pointer-events-none" />

          {status !== 'success' ? (
            <div className="text-center max-w-3xl mx-auto">
              {/* Eyebrow / Offer Pill */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] backdrop-blur-md border border-[#ea7af4]/40 text-[#ea7af4] text-xs font-bold uppercase tracking-[0.2em] mb-6 shadow-[0_0_15px_rgba(234,122,244,0.25)]">
                <Percent className="w-3.5 h-3.5 text-[#ea7af4]" />
                <span>Subscribers Exclusive Welcome Offer</span>
              </div>

              {/* Main Headline */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                GET{' '}
                <span className="bg-gradient-to-r from-[#ea7af4] via-fuchsia-300 to-white bg-clip-text text-transparent">
                  30% OFF
                </span>{' '}
                YOUR FIRST SESSION
              </h2>

              {/* Description */}
              <p className="mt-4 text-zinc-300 text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto">
                Join the <strong className="text-white font-medium">Shivansh Tattoo Studio</strong> bulletin. Receive priority access to custom artist flash sheets, private guest spots, and an instant 30% voucher code for your initial consultation or session.
              </p>

              {/* Glass-morphism Input Field Form */}
              <form onSubmit={handleSubmit} className="mt-8 max-w-2xl mx-auto">
                <div className="relative group">
                  {/* Outer ambient glow on hover/focus */}
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#ea7af4]/30 via-purple-500/20 to-[#c084fc]/30 blur-lg opacity-40 group-hover:opacity-75 group-focus-within:opacity-100 transition duration-500 pointer-events-none" />

                  {/* Glassmorphic Input Wrapper */}
                  <div className="relative flex flex-col sm:flex-row items-stretch gap-2.5 p-2 rounded-2xl bg-black/50 backdrop-blur-xl border border-white/20 group-hover:border-white/35 focus-within:border-[#ea7af4] focus-within:ring-2 focus-within:ring-[#ea7af4]/40 shadow-[inset_0_2px_8px_rgba(0,0,0,0.6),0_10px_25px_rgba(0,0,0,0.5)] transition-all">
                    {/* Input Field with Glass Styling */}
                    <div className="relative flex-1 flex items-center pl-3">
                      <Mail className="w-5 h-5 text-[#ea7af4] flex-shrink-0 mr-3 transition-colors" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (status === 'error') setStatus('idle');
                        }}
                        placeholder="Enter your email for instant 30% voucher..."
                        required
                        className="w-full bg-transparent text-white placeholder-zinc-400 text-sm sm:text-base font-light py-3 px-1 focus:outline-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#ea7af4] via-[#d946ef] to-[#c084fc] hover:from-[#f08dfa] hover:to-[#d8b4fe] active:scale-[0.98] text-white text-xs sm:text-sm font-bold uppercase tracking-[0.16em] shadow-[0_0_20px_rgba(234,122,244,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 whitespace-nowrap"
                    >
                      {status === 'loading' ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Generating...</span>
                        </>
                      ) : (
                        <>
                          <span>CLAIM 30% VOUCHER</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Error message if validation fails */}
                {status === 'error' && (
                  <p className="mt-3 text-rose-400 text-xs text-center font-medium animate-fadeIn">
                    {errorMessage}
                  </p>
                )}
              </form>

              {/* Trust Indicators / Microcopy */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-zinc-400 font-light">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Valid for In-Studio & Home Service</span>
                </span>
                <span className="hidden sm:inline text-zinc-600">·</span>
                <span className="flex items-center gap-1.5">
                  <Tag className="w-4 h-4 text-[#ea7af4]" />
                  <span>Instant code delivered on screen</span>
                </span>
                <span className="hidden sm:inline text-zinc-600">·</span>
                <span>Zero spam, unsubscribe anytime</span>
              </div>
            </div>
          ) : (
            /* Success State: Glassmorphism Voucher Ticket */
            <div className="text-center max-w-2xl mx-auto py-2">
              <div className="inline-flex items-center gap-2 p-2 px-3 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
                <Check className="w-4 h-4" />
                <span>Subscription Confirmed · Voucher Unlocked</span>
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                HERE IS YOUR 30% DISCOUNT
              </h3>
              <p className="mt-2 text-zinc-300 text-xs sm:text-sm font-light">
                Present this code when booking with Shivansh Tattoo Studio to receive 30% off your first session.
              </p>

              {/* Glassmorphic Voucher Card */}
              <div className="mt-6 p-6 rounded-2xl bg-black/60 backdrop-blur-xl border border-[#ea7af4]/40 shadow-[0_0_35px_rgba(234,122,244,0.25)] relative overflow-hidden text-left">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#ea7af4]/10 rounded-full blur-2xl pointer-events-none" />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#ea7af4] block">
                      Welcome Privilege Voucher
                    </span>
                    <h4 className="text-lg font-bold text-white mt-0.5">
                      30% Off First Tattoo Session
                    </h4>
                  </div>
                  <div className="px-3 py-1 rounded bg-[#ea7af4]/20 border border-[#ea7af4]/40 text-[#ea7af4] text-xs font-bold self-start sm:self-auto tracking-wider">
                    VALID: 30 DAYS
                  </div>
                </div>

                <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">
                      Voucher Code (Registered to {email})
                    </span>
                    <div className="font-mono text-xl sm:text-2xl font-bold tracking-widest text-white mt-0.5 select-all">
                      {voucherCode}
                    </div>
                  </div>

                  <button
                    onClick={handleCopyCode}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white uppercase tracking-wider transition-all"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400">COPIED TO CLIPBOARD</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-[#ea7af4]" />
                        <span>COPY CODE</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleRedeemOnBooking}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#ea7af4] to-[#c084fc] hover:from-[#f08dfa] hover:to-[#d8b4fe] text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(234,122,244,0.4)]"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Session with 30% Off</span>
                </button>

                <a
                  href={whatsAppRedeemUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Redeem on WhatsApp</span>
                </a>
              </div>

              <div className="mt-4">
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs text-zinc-400 hover:text-white transition-colors underline underline-offset-4"
                >
                  Use a different email address
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
