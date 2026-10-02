import React, { useState, useRef, useEffect } from 'react';
import { Calendar, Eye, Sparkles, Camera, Upload, CheckCircle2, User, ChevronRight } from 'lucide-react';
import { STUDIO_ARTISTS, TattooArtist } from '../studioConfig';
import { STUDIO_IMAGES } from '../images';
import { ArtistProfileModal } from './ArtistProfileModal';

interface ArtistsSectionProps {
  onBookWithArtist: (artistName: string) => void;
  onViewPortfolio: () => void;
}

export const ArtistsSection: React.FC<ArtistsSectionProps> = ({
  onBookWithArtist,
  onViewPortfolio,
}) => {
  const [selectedArtist, setSelectedArtist] = useState<TattooArtist | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);

  const handleOpenProfile = (artist: TattooArtist) => {
    setSelectedArtist(artist);
    setIsProfileModalOpen(true);
  };
  const [founderPhoto, setFounderPhoto] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('sagar_dalvi_photo') || STUDIO_IMAGES.artists.sagarDalvi;
    }
    return STUDIO_IMAGES.artists.sagarDalvi;
  });

  const [uploadSuccess, setUploadSuccess] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('sagar_dalvi_photo');
    }
    return false;
  });

  const [isUploading, setIsUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handlePhotoSelect = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        setFounderPhoto(dataUrl);
        setUploadSuccess(true);
        try {
          localStorage.setItem('sagar_dalvi_photo', dataUrl);
          await fetch('/api/upload-founder-photo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: dataUrl }),
          });
        } catch (err) {
          console.warn('Could not sync founder photo to server:', err);
        }
      }
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handlePhotoSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handlePhotoSelect(file);
    }
  };

  return (
    <section id="artists" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0c0714] relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-[0.25em] text-[#ea7af4] font-semibold mb-2">
            The Craft Masters
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            TATTOO ARTISTS
          </h2>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base font-light">
            Our studio residents are masters of line calibration, skin flow, and permanent tonal retention.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {STUDIO_ARTISTS.map((artist: TattooArtist) => {
            const isFounder = artist.name === 'Sagar Dalvi';
            const displayPhoto = isFounder ? founderPhoto : artist.photoUrl;

            return (
              <div
                key={artist.id}
                className="group rounded-xl bg-[#140c1e] border border-white/10 hover:border-[#ea7af4]/50 overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
              >
                <div>
                  {/* Photo */}
                  <div
                    className="relative aspect-[4/5] overflow-hidden bg-zinc-900"
                    onDragOver={(e) => isFounder && e.preventDefault()}
                    onDrop={isFounder ? handleDrop : undefined}
                  >
                    <img
                      src={displayPhoto}
                      alt={artist.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top filter contrast-[1.05] group-hover:scale-105 transition-all duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#140c1e] via-[#140c1e]/30 to-transparent opacity-90" />

                    {/* Founder Highlight Tag */}
                    {isFounder && (
                      <>
                        <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500/90 to-amber-600/90 backdrop-blur-md text-black font-extrabold text-[9px] uppercase tracking-[0.2em] px-2.5 py-1 rounded shadow-lg border border-amber-300/40">
                          ★ Real Studio Founder & CEO
                        </div>

                        {/* Interactive Upload/Set Real Photo Button */}
                        <div className="absolute top-3 right-3 flex items-center gap-1.5">
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={onFileInputChange}
                          />
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isUploading}
                            className="bg-black/80 hover:bg-[#ea7af4] text-white text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/20 hover:border-transparent transition-all flex items-center gap-1.5 shadow-lg backdrop-blur cursor-pointer"
                            title="Click to select or drop the real founder photo"
                          >
                            {uploadSuccess ? (
                              <>
                                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                <span>Real Photo Active</span>
                              </>
                            ) : (
                              <>
                                <Camera className="w-3 h-3 text-[#ea7af4]" />
                                <span>Upload Real Photo</span>
                              </>
                            )}
                          </button>
                        </div>
                      </>
                    )}

                    <div 
                      className="absolute bottom-4 left-4 right-4 cursor-pointer group/title"
                      onClick={() => handleOpenProfile(artist)}
                    >
                      <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#ea7af4] block">
                        {artist.role}
                      </span>
                      <h3 className="text-xl font-bold text-white tracking-wide mt-1 group-hover/title:text-[#ea7af4] transition-colors flex items-center gap-1.5">
                        <span>{artist.name}</span>
                        <ChevronRight className="w-4 h-4 opacity-0 group-hover/title:opacity-100 transition-opacity" />
                      </h3>
                      <div className="text-xs text-zinc-400 font-light mt-0.5">
                        {artist.experience}
                      </div>
                    </div>
                  </div>

                  {/* Body Details */}
                  <div className="p-6">
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
                      {artist.bio}
                    </p>

                    {/* Specializations */}
                    <div className="mt-4 pt-4 border-t border-white/5">
                      <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 mb-2">
                        Key Disciplines
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {artist.specialization.map((spec, i) => (
                          <span
                            key={i}
                            className="text-[11px] text-zinc-300 bg-white/5 px-2.5 py-1 rounded border border-white/5"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="p-6 pt-0 border-t border-white/5 mt-4 space-y-2.5">
                  {/* Primary Profile Inspection Button */}
                  <button
                    type="button"
                    onClick={() => handleOpenProfile(artist)}
                    className="w-full py-2.5 px-4 text-xs font-bold uppercase tracking-[0.14em] text-white bg-white/10 hover:bg-[#ea7af4] hover:text-black rounded-lg border border-white/15 transition-all flex items-center justify-center gap-2 group/btn cursor-pointer shadow-sm"
                  >
                    <User className="w-3.5 h-3.5 text-[#ea7af4] group-hover/btn:text-black transition-colors" />
                    <span>View Profile & Gallery</span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-60 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onBookWithArtist(artist.name)}
                      className="flex-1 py-2.5 px-3 text-xs font-bold uppercase tracking-[0.12em] text-white bg-gradient-to-r from-[#ea7af4] via-[#d946ef] to-[#c084fc] rounded-lg hover:opacity-95 transition-all flex items-center justify-center gap-1.5 shadow-[0_0_12px_rgba(234,122,244,0.35)] cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book Session</span>
                    </button>

                    <button
                      type="button"
                      onClick={onViewPortfolio}
                      className="py-2.5 px-3 text-xs font-semibold uppercase tracking-[0.12em] text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors flex items-center gap-1 cursor-pointer"
                      title="View all studio gallery pieces"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Studio Gallery</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Note on Artist Bios */}
        <div className="mt-12 text-center text-xs text-zinc-500 uppercase tracking-widest font-light">
          Click "View Profile" on any artist to explore their biography, techniques & curated work
        </div>
      </div>

      {/* Interactive Artist Profile Modal */}
      <ArtistProfileModal
        artist={selectedArtist}
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onBookWithArtist={onBookWithArtist}
        displayPhotoOverride={selectedArtist?.name === 'Sagar Dalvi' ? founderPhoto : undefined}
      />
    </section>
  );
};
