import React, { useState } from 'react';
import { MessageSquare, Sparkles, X, Send, Calendar, Home, Palette } from 'lucide-react';
import { STUDIO_CONFIG, getWhatsAppLink, WHATSAPP_MESSAGES } from '../studioConfig';

interface FloatingWidgetsProps {
  onOpenAiAssistant: () => void;
}

export const FloatingWidgets: React.FC<FloatingWidgetsProps> = ({ onOpenAiAssistant }) => {
  const [showWhatsAppMenu, setShowWhatsAppMenu] = useState(false);

  const isWhatsAppConfigured =
    STUDIO_CONFIG.whatsappNumber &&
    !STUDIO_CONFIG.whatsappNumber.includes('ADD_');

  const options = [
    { key: 'general', label: 'Discuss a Tattoo', icon: MessageSquare },
    { key: 'appointment', label: 'Book Appointment', icon: Calendar },
    { key: 'customDesign', label: 'Custom Design', icon: Palette },
    { key: 'homeService', label: 'Home Tattoo Service', icon: Home },
  ] as const;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
      {/* WhatsApp Quick Message Menu Popup */}
      {showWhatsAppMenu && (
        <div className="w-72 sm:w-80 rounded-2xl bg-[#0d0d14] border border-white/20 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_20px_rgba(16,185,129,0.2)] mb-2 animate-fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                Shivansh WhatsApp Concierge
              </span>
            </div>
            <button
              onClick={() => setShowWhatsAppMenu(false)}
              className="text-zinc-400 hover:text-white p-1"
              aria-label="Close menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[11px] text-zinc-300 font-light mt-2.5 mb-3 leading-tight">
            Select a pre-filled prompt to immediately start a direct WhatsApp conversation:
          </p>

          <div className="space-y-2">
            {options.map((opt) => {
              const Icon = opt.icon;
              return (
                <a
                  key={opt.key}
                  href={getWhatsAppLink(opt.key)}
                  target={isWhatsAppConfigured ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  onClick={() => setShowWhatsAppMenu(false)}
                  className="w-full p-2.5 rounded-lg bg-white/5 hover:bg-emerald-500/20 border border-white/5 hover:border-emerald-500/40 text-left text-xs text-white flex items-center justify-between transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-emerald-400" />
                    <span className="font-medium text-[11px]">{opt.label}</span>
                  </div>
                  <Send className="w-3 h-3 text-zinc-500 group-hover:text-emerald-400" />
                </a>
              );
            })}
          </div>

          {!isWhatsAppConfigured && (
            <div className="mt-3 text-[10px] text-zinc-500 italic text-center">
              (Configure WHATSAPP_NUMBER in studioConfig.ts)
            </div>
          )}
        </div>
      )}

      {/* Floating Buttons Bar */}
      <div className="flex items-center gap-3">
        {/* 1. Floating AI Button: "Ask Shivansh AI" with official lilac/orchid glow */}
        <button
          onClick={onOpenAiAssistant}
          className="relative group flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-full bg-gradient-to-r from-[#ea7af4] via-[#d946ef] to-[#c084fc] text-white shadow-[0_0_25px_rgba(234,122,244,0.6)] hover:shadow-[0_0_35px_rgba(234,122,244,0.9)] transition-all duration-300 transform hover:scale-105 active:scale-95"
          aria-label="Ask Shivansh AI Tattoo Assistant"
        >
          {/* Pulsing ring */}
          <span className="absolute -inset-1 rounded-full bg-[#ea7af4] opacity-35 blur-md group-hover:opacity-80 animate-pulse" />
          
          <div className="relative flex items-center gap-2">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white animate-spin [animation-duration:8s]" />
            <span className="text-xs sm:text-sm font-bold tracking-wider uppercase font-heading">
              Ask Shivansh AI
            </span>
          </div>
        </button>

        {/* 2. Floating WhatsApp Button */}
        <button
          onClick={() => setShowWhatsAppMenu(!showWhatsAppMenu)}
          className="relative p-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:shadow-[0_0_25px_rgba(37,211,102,0.7)] transition-all transform hover:scale-105 active:scale-95"
          aria-label="Chat on WhatsApp"
          title="CHAT ON WHATSAPP"
        >
          <MessageSquare className="w-5 h-5 fill-current" />
        </button>
      </div>
    </div>
  );
};
