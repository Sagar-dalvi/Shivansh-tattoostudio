import React, { useEffect, useState } from 'react';
import {
  X,
  Calendar,
  Sparkles,
  CheckCircle2,
  Award,
  Shield,
  MessageCircle,
  ExternalLink,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { TattooArtist, ArtistPortfolioWork, getWhatsAppLink } from '../studioConfig';

interface ArtistProfileModalProps {
  artist: TattooArtist | null;
  isOpen: boolean;
  onClose: () => void;
  onBookWithArtist: (artistName: string) => void;
  displayPhotoOverride?: string;
}

export const ArtistProfileModal: React.FC<ArtistProfileModalProps> = ({
  artist,
  isOpen,
  onClose,
  onBookWithArtist,
  displayPhotoOverride,
}) => {
  const [selectedWork, setSelectedWork] = useState<ArtistPortfolioWork | null>(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedWork) {
          setSelectedWork(null);
        } else {
          onClose();
        }
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, selectedWork, onClose]);

  // Reset selected work on artist change or modal open
  useEffect(() => {
    if (isOpen && artist?.portfolioWorks?.length) {
      setSelectedWork(artist.portfolioWorks[0]);
    } else {
      setSelectedWork(null);
    }
  }, [isOpen, artist]);

  if (!isOpen || !artist) return null;

  const isFounder = artist.name === 'Sagar Dalvi';
  const photo = displayPhotoOverride || artist.photoUrl;

  const whatsAppMessage = `Hi Shivansh Tattoo Studio, I viewed ${artist.name}'s profile on your website and would like to discuss scheduling a dedicated consultation for a tattoo.`;
  const whatsAppUrl = getWhatsAppLink('appointment', whatsAppMessage);

  const handleBook = () => {
    onClose();
    onBookWithArtist(artist.name);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
      {/* Dark frosted backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Window */}
      <div
        className="relative w-full max-w-5xl my-auto bg-[#120a1b] border border-[#ea7af4]/30 rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.95)] overflow-hidden z-10 animate-fade-in flex flex-col max-h-[92vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="artist-modal-title"
      >
        {/* Top Gradient Glow Accent */}
        <div className="h-1 bg-gradient-to-r from-transparent via-[#ea7af4] to-transparent shrink-0" />

        {/* Modal Header Bar with Close Button */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#160d22]/90 backdrop-blur shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#ea7af4] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Artist Dossier & Portfolio</span>
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white flex items-center justify-center transition-colors border border-white/10"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body - Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 custom-scrollbar">
          {/* Top Section: Artist Hero Spotlight */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Portrait Column (4 cols) */}
            <div className="md:col-span-5 lg:col-span-4">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden border border-white/15 bg-zinc-900 shadow-xl group">
                <img
                  src={photo}
                  alt={artist.name}
                  className="w-full h-full object-cover object-top filter contrast-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120a1b] via-[#120a1b]/20 to-transparent opacity-80" />

                {isFounder && (
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500/95 to-amber-600/95 text-black font-extrabold text-[10px] uppercase tracking-[0.2em] px-3 py-1 rounded shadow-lg border border-amber-300/40">
                    ★ Founder & Creative Director
                  </div>
                )}

                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-lg bg-black/60 backdrop-blur-md border border-white/10">
                  <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#ea7af4] block">
                    {artist.role}
                  </span>
                  <div className="text-xs text-zinc-300 font-light mt-0.5">
                    {artist.experience}
                  </div>
                </div>
              </div>
            </div>

            {/* Bio & Philosophy Column (8 cols) */}
            <div className="md:col-span-7 lg:col-span-8 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-xs text-zinc-400 font-medium">Shivansh Tattoo Studio</span>
                  <span className="text-zinc-600">·</span>
                  <span className="text-xs text-[#ea7af4] font-semibold">{artist.role}</span>
                </div>

                <h2
                  id="artist-modal-title"
                  className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight"
                >
                  {artist.name}
                </h2>

                {/* Featured Quote */}
                {artist.featuredQuote && (
                  <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-[#ea7af4]/10 via-purple-900/10 to-transparent border-l-2 border-[#ea7af4] italic text-xs sm:text-sm text-[#fae8ff]/90 leading-relaxed font-light">
                    “{artist.featuredQuote}”
                  </div>
                )}

                {/* Detailed Narrative Biography */}
                <div className="mt-4 text-xs sm:text-sm text-zinc-300 leading-relaxed font-light space-y-3">
                  <p>{artist.detailedBio || artist.bio}</p>
                </div>
              </div>

              {/* Key Stats Matrix */}
              {artist.stats && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-white/10">
                  {artist.stats.map((stat, i) => (
                    <div key={i} className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                      <div className="text-[10px] uppercase tracking-wider text-zinc-400 font-medium">
                        {stat.label}
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-white mt-1 truncate">
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Specializations & Techniques Badges */}
              <div className="space-y-3 pt-3 border-t border-white/10">
                <div className="text-[11px] uppercase font-bold tracking-wider text-zinc-400">
                  Core Disciplines & Technical Mastery
                </div>
                <div className="flex flex-wrap gap-2">
                  {artist.specialization.map((spec, i) => (
                    <span
                      key={i}
                      className="text-xs text-white bg-[#1f132b] px-3 py-1.5 rounded-lg border border-[#ea7af4]/20 flex items-center gap-1.5 font-medium"
                    >
                      <CheckCircle2 className="w-3 h-3 text-[#ea7af4]" />
                      <span>{spec}</span>
                    </span>
                  ))}
                  {artist.techniques?.map((tech, i) => (
                    <span
                      key={`tech-${i}`}
                      className="text-xs text-zinc-300 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 font-light"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section: Dedicated Portfolio Gallery of Their Work */}
          {artist.portfolioWorks && artist.portfolioWorks.length > 0 && (
            <div className="pt-6 border-t border-white/10 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-lg font-bold text-white tracking-wide flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#ea7af4]" />
                    <span>Curated Works by {artist.name}</span>
                  </h3>
                  <p className="text-xs text-zinc-400 font-light mt-0.5">
                    Select any piece to inspect placement, linework execution, and stylistic details
                  </p>
                </div>
                <span className="text-xs text-zinc-500 font-mono self-start sm:self-auto">
                  {artist.portfolioWorks.length} Featured Works
                </span>
              </div>

              {/* Selected Work Feature Card (if user clicked one) */}
              {selectedWork && (
                <div className="p-4 sm:p-5 rounded-xl bg-black/40 border border-[#ea7af4]/30 grid grid-cols-1 md:grid-cols-12 gap-5 items-center animate-fade-in shadow-inner">
                  <div className="md:col-span-5 h-56 sm:h-64 rounded-lg overflow-hidden border border-white/10 bg-zinc-950 relative group">
                    <img
                      src={selectedWork.imageUrl}
                      alt={selectedWork.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur text-[10px] font-mono text-[#ea7af4] border border-white/10">
                      {selectedWork.style}
                    </div>
                  </div>

                  <div className="md:col-span-7 space-y-3">
                    <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#ea7af4]">
                      Artwork Inspection
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold text-white tracking-wide">
                      {selectedWork.title}
                    </h4>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400">
                      <div>
                        <strong className="text-zinc-200">Placement:</strong> {selectedWork.placement}
                      </div>
                      <span aria-hidden="true" className="text-zinc-600">·</span>
                      <div>
                        <strong className="text-zinc-200">Discipline:</strong> {selectedWork.style}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                      {selectedWork.description}
                    </p>

                    <div className="pt-2 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={handleBook}
                        className="py-2 px-4 rounded-lg bg-[#ea7af4]/20 hover:bg-[#ea7af4]/30 text-[#ea7af4] border border-[#ea7af4]/40 text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Request Similar Tattoo</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Portfolio Grid Thumbnails */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {artist.portfolioWorks.map((work) => {
                  const isSelected = selectedWork?.id === work.id;
                  return (
                    <button
                      key={work.id}
                      type="button"
                      onClick={() => setSelectedWork(work)}
                      className={`group text-left rounded-xl overflow-hidden border transition-all relative flex flex-col cursor-pointer ${
                        isSelected
                          ? 'border-[#ea7af4] ring-2 ring-[#ea7af4]/30 shadow-[0_0_15px_rgba(234,122,244,0.3)]'
                          : 'border-white/10 hover:border-white/30 bg-white/[0.02]'
                      }`}
                    >
                      <div className="aspect-square relative overflow-hidden bg-zinc-950">
                        <img
                          src={work.imageUrl}
                          alt={work.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                        {isSelected && (
                          <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#ea7af4] shadow-[0_0_8px_#ea7af4]" />
                        )}
                      </div>

                      <div className="p-2 bg-[#170e23] flex-1 flex flex-col justify-between">
                        <div className="text-[11px] font-bold text-white truncate group-hover:text-[#ea7af4] transition-colors">
                          {work.title}
                        </div>
                        <div className="text-[9px] text-zinc-400 truncate mt-0.5">
                          {work.placement}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions Bar */}
        <div className="px-6 sm:px-8 py-4 bg-[#160d22] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>Dedicated 1-on-1 Consultation · Single-Use Sterile Cartridges</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none py-2.5 px-4 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Inquire</span>
            </a>

            <button
              type="button"
              onClick={handleBook}
              className="flex-1 sm:flex-none py-2.5 px-5 rounded-xl bg-gradient-to-r from-[#ea7af4] via-[#d946ef] to-[#c084fc] hover:opacity-95 text-white text-xs font-bold uppercase tracking-[0.14em] shadow-[0_0_15px_rgba(234,122,244,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book With {artist.name.split(' ')[0]}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
