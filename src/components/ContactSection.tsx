import React, { useState } from 'react';
import { Phone, MessageSquare, MapPin, Clock, ExternalLink, Mail, Copy, Check, Navigation } from 'lucide-react';
import { STUDIO_CONFIG, getWhatsAppLink } from '../studioConfig';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);

  const phonePrimary = STUDIO_CONFIG.phone;
  const phoneSecondary = STUDIO_CONFIG.phoneSecondary || '+91 95790 081322';
  const cleanPhonePrimary = phonePrimary.replace(/\D/g, '');
  const cleanPhoneSecondary = phoneSecondary.replace(/\D/g, '');

  const copyToClipboard = (text: string, type: 'email' | 'phone1' | 'phone2') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(type);
      setTimeout(() => setCopiedPhone(null), 2000);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0c0714] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Contact Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Narrative */}
          <div className="lg:col-span-5">
            <div className="text-xs uppercase tracking-[0.25em] text-[#ea7af4] font-semibold mb-2">
              Studio Location & Direct Lines
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              LET'S CREATE<br />
              <span className="bg-gradient-to-r from-white via-purple-200 to-[#ea7af4] bg-clip-text text-transparent">
                SOMETHING PERMANENT.
              </span>
            </h2>
            <p className="mt-4 text-zinc-300 text-sm sm:text-base leading-relaxed font-light">
              Connect directly with Shivansh Tattoo Studio for custom designs, in-studio sessions, appointments, or private home tattoo services across the Dhule corridor.
            </p>

            <div className="mt-8 p-6 rounded-2xl bg-[#140c1e] border border-white/10 space-y-4 shadow-xl">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#ea7af4] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white">Business Hours</h4>
                  <p className="text-xs text-zinc-300 font-light mt-0.5">
                    {STUDIO_CONFIG.businessHours}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-start gap-3">
                <Navigation className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white">Highway Landmark</h4>
                  <p className="text-xs text-zinc-300 font-light mt-0.5">
                    Conveniently situated at Avdhan Fata on the Mumbai - Agra National Highway with dedicated client parking.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`tel:${cleanPhonePrimary}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-semibold text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-[#ea7af4]" />
                <span>Call: 9579621490</span>
              </a>

              <a
                href={getWhatsAppLink('general')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-xs font-semibold text-emerald-400 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Contact Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Phone Card with 2 numbers */}
            <div className="p-6 rounded-2xl bg-[#140c1e] border border-white/10 flex flex-col justify-between hover:border-[#ea7af4]/40 transition-colors shadow-lg">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-[#ea7af4]/10 text-[#ea7af4] border border-[#ea7af4]/20">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 block">Direct Lines</span>
                      <h4 className="text-sm font-bold text-white">Call Studio</h4>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#ea7af4]/10 text-[#ea7af4] border border-[#ea7af4]/20">
                    2 Numbers
                  </span>
                </div>

                <div className="space-y-2.5 mt-2">
                  {/* Phone 1 */}
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 border border-white/5 hover:border-white/15 transition-colors">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-zinc-400 block font-medium">Primary</span>
                      <a href={`tel:${cleanPhonePrimary}`} className="text-sm font-bold text-white hover:text-[#ea7af4] transition-colors">
                        +91 95796 21490
                      </a>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => copyToClipboard('9579621490', 'phone1')}
                        className="p-1.5 rounded-md hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                        title="Copy number"
                      >
                        {copiedPhone === 'phone1' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                      <a
                        href={`tel:${cleanPhonePrimary}`}
                        className="px-2.5 py-1 rounded bg-[#ea7af4]/20 hover:bg-[#ea7af4] text-[#ea7af4] hover:text-white text-xs font-semibold transition-colors"
                      >
                        Call
                      </a>
                    </div>
                  </div>

                  {/* Phone 2 */}
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 border border-white/5 hover:border-white/15 transition-colors">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-zinc-400 block font-medium">Secondary</span>
                      <a href={`tel:${cleanPhoneSecondary}`} className="text-sm font-bold text-white hover:text-[#ea7af4] transition-colors">
                        +91 95790 081322
                      </a>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => copyToClipboard('95790081322', 'phone2')}
                        className="p-1.5 rounded-md hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                        title="Copy number"
                      >
                        {copiedPhone === 'phone2' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                      <a
                        href={`tel:${cleanPhoneSecondary}`}
                        className="px-2.5 py-1 rounded bg-[#ea7af4]/20 hover:bg-[#ea7af4] text-[#ea7af4] hover:text-white text-xs font-semibold transition-colors"
                      >
                        Call
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-zinc-400 font-light mt-3 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Lines open daily 11:00 AM – 9:00 PM</span>
              </div>
            </div>

            {/* WhatsApp Card */}
            <div className="p-6 rounded-2xl bg-[#140c1e] border border-white/10 flex flex-col justify-between hover:border-emerald-500/40 transition-colors shadow-lg">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 block">Instant Chat</span>
                      <h4 className="text-sm font-bold text-white">WhatsApp</h4>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Active
                  </span>
                </div>

                <p className="text-xs text-zinc-300 font-light mb-3">
                  Send tattoo references, request custom pricing, or schedule your consultation immediately:
                </p>

                <div className="space-y-2">
                  <a
                    href={getWhatsAppLink('general')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full p-2.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-xs font-bold text-emerald-300 flex items-center justify-between transition-colors"
                  >
                    <span>Chat on WhatsApp (9579621490)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={getWhatsAppLink('general', undefined, true)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full p-2.5 rounded-lg bg-white/5 hover:bg-emerald-500/15 border border-white/10 hover:border-emerald-500/30 text-xs font-semibold text-zinc-200 hover:text-emerald-300 flex items-center justify-between transition-colors"
                  >
                    <span>Alternate WhatsApp (95790081322)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="text-[11px] text-zinc-400 font-light mt-3 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Instant replies during business hours</span>
              </div>
            </div>

            {/* Address & Google Maps Card */}
            <div className="p-6 rounded-2xl bg-[#140c1e] border border-white/10 flex flex-col justify-between hover:border-[#ea7af4]/40 transition-colors shadow-lg sm:col-span-2">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-[#ea7af4]/10 text-[#ea7af4] border border-[#ea7af4]/20">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 block">Studio Location</span>
                      <h4 className="text-sm font-bold text-white">Address & Navigation</h4>
                    </div>
                  </div>

                  <a
                    href={STUDIO_CONFIG.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#ea7af4] hover:bg-[#f08dfa] text-black font-bold text-xs transition-colors shadow-[0_0_12px_rgba(234,122,244,0.4)]"
                  >
                    <span>Open Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="md:col-span-7">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-[10px] uppercase tracking-wider text-[#ea7af4] font-bold block mb-1">
                        Physical Studio Address
                      </span>
                      <p className="text-sm sm:text-base font-medium text-white leading-snug">
                        {STUDIO_CONFIG.address}
                      </p>
                      <p className="text-xs text-zinc-400 mt-1 font-light">
                        Dhule, Maharashtra · Mumbai - Agra National Highway (NH 52 / NH 3)
                      </p>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2 text-xs">
                      <a
                        href={STUDIO_CONFIG.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-[#ea7af4] transition-colors"
                      >
                        <Navigation className="w-3.5 h-3.5 text-[#ea7af4]" />
                        <span>Get Live Driving Directions</span>
                      </a>
                    </div>
                  </div>

                  {/* Visual Map Snapshot / Embed */}
                  <div className="md:col-span-5">
                    <a
                      href={STUDIO_CONFIG.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative block rounded-xl overflow-hidden border border-white/15 aspect-[16/9] hover:border-[#ea7af4] transition-all"
                      title="Click to open interactive map"
                    >
                      <iframe
                        src="https://www.google.com/maps?q=Avdhan+Fata,+Dhule,+Mumbai+Agra+Highway&output=embed"
                        className="w-full h-full border-0 pointer-events-none filter contrast-125 invert-[0.88] hue-rotate-180"
                        loading="lazy"
                        tabIndex={-1}
                        title="Dhule Studio Location"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <span className="px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur border border-white/20 text-xs font-bold text-white flex items-center gap-1.5 shadow-lg group-hover:scale-105 transition-transform">
                          <MapPin className="w-3.5 h-3.5 text-[#ea7af4]" />
                          <span>Tap for Directions</span>
                        </span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="p-6 rounded-2xl bg-[#140c1e] border border-white/10 flex flex-col justify-between hover:border-purple-400/40 transition-colors shadow-lg sm:col-span-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-purple-500/10 text-[#c084fc] border border-purple-500/20">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 block">Official Inquiries & Bookings</span>
                    <h4 className="text-sm font-bold text-white">Email Consultation</h4>
                    <a
                      href={`mailto:${STUDIO_CONFIG.email}`}
                      className="text-sm sm:text-base font-bold text-white hover:text-[#ea7af4] transition-colors mt-0.5 inline-block"
                    >
                      {STUDIO_CONFIG.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyToClipboard(STUDIO_CONFIG.email, 'email')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-zinc-300 hover:text-white transition-colors"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Email</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`mailto:${STUDIO_CONFIG.email}`}
                    className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-[#ea7af4] to-[#c084fc] hover:from-[#f08dfa] hover:to-[#d8b4fe] text-xs font-bold text-black uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(234,122,244,0.3)]"
                  >
                    <span>Send Email</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
