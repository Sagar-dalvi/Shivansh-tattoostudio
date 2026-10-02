import React, { useState, useEffect, useRef } from 'react';
import { Home, ShieldCheck, Sparkles, Clock, CheckCircle2, ArrowRight, Camera, Upload, RotateCcw } from 'lucide-react';
import { STUDIO_CONFIG, getWhatsAppLink } from '../studioConfig';
import { STUDIO_IMAGES } from '../images';

interface HomeTattooServiceSectionProps {
  onRequestHomeService: () => void;
}

export const HomeTattooServiceSection: React.FC<HomeTattooServiceSectionProps> = ({
  onRequestHomeService,
}) => {
  const defaultImage = STUDIO_CONFIG.homeServiceImageUrl || STUDIO_IMAGES.services.homeService;
  const [currentImage, setCurrentImage] = useState<string>(defaultImage);
  const [isCustomPhoto, setIsCustomPhoto] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load custom image from localStorage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem('shivansh_home_service_image');
      if (saved) {
        setCurrentImage(saved);
        setIsCustomPhoto(true);
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setCurrentImage(result);
          setIsCustomPhoto(true);
          try {
            localStorage.setItem('shivansh_home_service_image', result);
          } catch {
            // Ignore quota issues
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImage(defaultImage);
    setIsCustomPhoto(false);
    try {
      localStorage.removeItem('shivansh_home_service_image');
    } catch {
      // Ignore
    }
  };

  const features = [
    {
      title: 'Ergonomic Chair & Ring Light Setup',
      desc: 'We bring a specialized portable client recliner and 18” shadow-free studio ring light to your space.',
    },
    {
      title: 'Dynamic Archival Pigments & Medical Tray',
      desc: 'Hospital-grade barrier draped mobile workstation, genuine Dynamic inks, and clinical green soap.',
    },
    {
      title: 'Complete Aftercare Kit Included',
      desc: 'Complimentary aftercare kit with soothing wash, healing balm, second-skin wrap, and instructions.',
    },
    {
      title: '100% Single-Use EO-Gas Sterilized',
      desc: 'Medical-grade cartridge needles unsealed directly in front of you, with clinical sharps disposal.',
    },
    {
      title: 'Private & Relaxed VIP Session',
      desc: 'Maximized privacy in your own home, your preferred music, custom breaks, and tailored pacing.',
    },
  ];

  return (
    <section id="home-service" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0c0714] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-r from-[#140c1e] via-[#0c0714] to-[#140c1e] border border-[#ea7af4]/20 p-8 sm:p-12 md:p-16 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          {/* Ambient neon light */}
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-[#ea7af4]/15 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#ea7af4] bg-[#ea7af4]/10 border border-[#ea7af4]/30 px-3 py-1 rounded-full mb-6">
                <Home className="w-3.5 h-3.5" />
                <span>Premier Mobile Studio</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                GET INKED AT YOUR PLACE
              </h2>

              <p className="mt-4 text-zinc-300 text-base leading-relaxed font-light">
                Experience the precision, luxury, and artistic mastery of Shivansh Tattoo Studio in the total privacy and comfort of your own home.
              </p>

              {/* Service Area Configurable Note */}
              <div className="mt-4 p-3.5 rounded-lg bg-white/5 border border-white/10 text-xs text-zinc-300 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#ea7af4] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Service Area Notice: </strong>
                  {STUDIO_CONFIG.homeServiceArea}
                </div>
              </div>

              {/* Pillars List */}
              <div className="mt-8 space-y-3.5">
                {features.map((feat) => (
                  <div key={feat.title} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#ea7af4] flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider">{feat.title}</h4>
                      <p className="text-xs text-zinc-400 font-light mt-0.5">{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={onRequestHomeService}
                  className="w-full sm:w-auto px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-white rounded bg-gradient-to-r from-[#ea7af4] via-[#d946ef] to-[#c084fc] hover:from-[#f08dfa] hover:to-[#d8b4fe] shadow-[0_0_20px_rgba(234,122,244,0.5)] transition-all flex items-center justify-center gap-2"
                >
                  <span>REQUEST HOME TATTOO</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={getWhatsAppLink('homeService')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-4 text-xs font-bold uppercase tracking-[0.16em] text-emerald-400 hover:text-emerald-300 border border-emerald-500/30 hover:border-emerald-500 rounded bg-emerald-500/5 transition-all text-center"
                >
                  Chat Home Service on WhatsApp
                </a>
              </div>
            </div>

            {/* Right Visual Card with Interactive Photo Uploader & Real Studio Display */}
            <div className="lg:col-span-5 relative">
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />

              <div
                onClick={() => fileInputRef.current?.click()}
                className="group relative rounded-2xl overflow-hidden aspect-[4/5] border border-white/20 hover:border-[#ea7af4]/60 transition-all duration-300 shadow-2xl cursor-pointer select-none"
                title="Click to upload your custom home service photo"
              >
                {/* Photo Display */}
                <img
                  src={currentImage}
                  alt="Home Tattoo Service Setup"
                  className="w-full h-full object-cover filter contrast-105 brightness-95 group-hover:scale-105 transition-transform duration-700"
                />

                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20" />

                {/* Top Quick Actions & Custom Badge */}
                <div className="absolute top-4 inset-x-4 flex items-center justify-between pointer-events-auto">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur border border-white/20 text-[10px] uppercase font-bold tracking-wider text-[#ea7af4]">
                    <Sparkles className="w-3 h-3 text-[#ea7af4]" />
                    <span>{isCustomPhoto ? 'Custom Studio Photo' : 'Private Home Session'}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isCustomPhoto && (
                      <button
                        onClick={handleResetImage}
                        className="p-1.5 rounded-full bg-black/70 hover:bg-black/90 text-zinc-300 hover:text-white border border-white/20 transition-colors"
                        title="Reset to default photo"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <div className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur border border-white/20 text-[10px] text-white flex items-center gap-1.5 transition-colors">
                      <Camera className="w-3 h-3 text-[#ea7af4]" />
                      <span>Change Photo</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Informational Overlay */}
                <div className="absolute bottom-5 inset-x-5 p-4 rounded-xl bg-black/85 backdrop-blur border border-white/10 text-left">
                  <div className="flex items-center justify-between">
                    <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#ea7af4]">
                      VIP In-Home Studio
                    </div>
                    <span className="text-[10px] text-emerald-400 font-semibold tracking-wider flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Sterile Verified
                    </span>
                  </div>
                  <div className="text-sm font-bold text-white mt-1">
                    Mobile Recliner, Ring Light & Clinical Tray
                  </div>
                  <p className="text-xs text-zinc-300 mt-1.5 font-light leading-relaxed">
                    Dedicated mobile workstation with Dynamic inks, single-use needle cartridges, and a full medical aftercare kit.
                  </p>
                </div>
              </div>

              {/* Upload Helper Note */}
              <div className="mt-3 text-center">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-[#ea7af4] transition-colors"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Click image to upload or replace with your own photo</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
