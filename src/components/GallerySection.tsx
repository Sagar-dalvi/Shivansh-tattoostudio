import React, { useState } from 'react';
import { Maximize2, X, ArrowRight, Sparkles, Compass } from 'lucide-react';
import { GALLERY_ITEMS, GalleryItem } from '../studioConfig';

interface GallerySectionProps {
  onOpenBookingWithStyle: (styleName: string) => void;
  onOpen3dGallery: () => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  onOpenBookingWithStyle,
  onOpen3dGallery,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const categories = [
    'ALL',
    'MINIMAL',
    'REALISM',
    'PORTRAIT',
    'LETTERING',
    'SPIRITUAL',
    'GEOMETRIC',
    'CUSTOM',
    'COVER-UP',
  ];

  const filteredItems =
    activeFilter === 'ALL'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeFilter);

  return (
    <section id="gallery" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0c0714] relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-[#ea7af4] font-semibold mb-2">
              Portfolio & Archives
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              TATTOO GALLERY
            </h2>
            <p className="mt-3 text-zinc-400 text-sm sm:text-base max-w-xl font-light">
              Explore curated studio works executed with needle calibration, high-contrast monochrome tones, and anatomical flow.
            </p>
          </div>

          {/* 3D Gallery Interactive Mode Toggle */}
          <div className="mt-4 md:mt-0">
            <button
              onClick={onOpen3dGallery}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-white rounded bg-white/10 hover:bg-[#ea7af4] border border-white/20 hover:border-[#ea7af4] transition-all shadow-[0_0_15px_rgba(234,122,244,0.25)]"
            >
              <Compass className="w-4 h-4 text-[#ea7af4] group-hover:text-white" />
              <span>Launch 3D Experience</span>
            </button>
          </div>
        </div>

        {/* Filter Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`text-xs font-semibold uppercase tracking-[0.16em] px-4 py-2 rounded transition-all whitespace-nowrap ${
                activeFilter === cat
                  ? 'bg-gradient-to-r from-[#ea7af4] via-[#d946ef] to-[#c084fc] text-white shadow-[0_0_14px_rgba(234,122,244,0.5)]'
                  : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry-Style Responsive Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group relative rounded-xl overflow-hidden bg-[#140c1e] border border-white/10 hover:border-[#ea7af4]/60 transition-all duration-300 cursor-pointer break-inside-avoid shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
            >
              <div className="relative overflow-hidden aspect-[4/5] bg-zinc-900">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0714] via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Corner Expand Indicator */}
                <div className="absolute top-3 right-3 p-2 rounded-full bg-black/60 backdrop-blur border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4 text-[#ea7af4]" />
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-0 inset-x-0 p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#ea7af4] block mb-1">
                    {item.category}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-zinc-400 mt-1">
                    <span>{item.placement}</span>
                    <span>·</span>
                    <span>{item.style}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note on Real Studio Photography */}
        <div className="mt-12 text-center text-xs text-zinc-500 uppercase tracking-widest font-light">
          Official Photography Archive · Replaceable in studioConfig.ts
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/90 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#140c1e] rounded-2xl border border-[#ea7af4]/30 overflow-hidden shadow-[0_0_50px_rgba(234,122,244,0.35)] flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/70 hover:bg-[#ea7af4] text-white transition-colors"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Lightbox Image Preview */}
            <div className="md:w-3/5 relative aspect-square md:aspect-auto max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={selectedItem.imageUrl}
                alt={selectedItem.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Lightbox Details Panel */}
            <div className="md:w-2/5 p-6 md:p-8 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#ea7af4] block mb-2">
                  {selectedItem.category}
                </span>
                <h3 className="text-2xl font-bold text-white tracking-tight leading-snug">
                  {selectedItem.title}
                </h3>

                <p className="mt-4 text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                  {selectedItem.description}
                </p>

                <div className="mt-6 space-y-3 pt-4 border-t border-white/10 text-xs">
                  <div>
                    <span className="text-zinc-500 uppercase tracking-wider block">Recommended Placement:</span>
                    <span className="text-zinc-200 font-medium">{selectedItem.placement}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 uppercase tracking-wider block">Artistic Technique:</span>
                    <span className="text-zinc-200 font-medium">{selectedItem.style}</span>
                  </div>
                </div>
              </div>

              {/* Lightbox Action */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col gap-3">
                <button
                  onClick={() => {
                    const styleTitle = `${selectedItem.title} (${selectedItem.style})`;
                    setSelectedItem(null);
                    onOpenBookingWithStyle(styleTitle);
                  }}
                  className="w-full py-3 px-4 text-xs font-bold uppercase tracking-[0.18em] text-white rounded bg-gradient-to-r from-[#ea7af4] via-[#d946ef] to-[#c084fc] hover:from-[#f08dfa] hover:to-[#d8b4fe] shadow-[0_0_15px_rgba(234,122,244,0.45)] transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Request Similar Concept</span>
                </button>

                <button
                  onClick={() => setSelectedItem(null)}
                  className="w-full py-2.5 text-xs font-medium uppercase tracking-[0.14em] text-zinc-400 hover:text-white transition-colors"
                >
                  Back to Gallery
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
