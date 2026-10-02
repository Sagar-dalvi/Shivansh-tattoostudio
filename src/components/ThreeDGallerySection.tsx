import React, { useState, useRef } from 'react';
import { Compass, RotateCcw, ChevronLeft, ChevronRight, Eye, Sparkles, Layers } from 'lucide-react';
import { GALLERY_ITEMS, GalleryItem } from '../studioConfig';

interface ThreeDGallerySectionProps {
  onSelectItem: (item: GalleryItem) => void;
}

export const ThreeDGallerySection: React.FC<ThreeDGallerySectionProps> = ({ onSelectItem }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [rotationY, setRotationY] = useState<number>(0);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredItems = activeCategory === 'ALL'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((i) => i.category === activeCategory);

  const total = filteredItems.length;
  const currentItem = filteredItems[activeIndex] || filteredItems[0];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
    setRotationY((prev) => prev - (360 / Math.max(total, 1)));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
    setRotationY((prev) => prev + (360 / Math.max(total, 1)));
  };

  const handleReset = () => {
    setActiveIndex(0);
    setRotationY(0);
  };

  return (
    <section id="gallery-3d" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0c0714] relative overflow-hidden border-t border-b border-[#ea7af4]/20">
      {/* 3D Grid & Spatial Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,122,244,0.1)_0,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.25em] text-[#ea7af4] font-semibold mb-2">
            <Compass className="w-4 h-4 animate-spin [animation-duration:16s]" />
            <span>Interactive Space</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            3D ARTWORK EXPLORER
          </h2>
          <p className="mt-3 text-zinc-400 text-sm font-light">
            Orbit through studio creations suspended in a virtual 3D gallery space. Click any piece for technical details.
          </p>
        </div>

        {/* 3D Stage Viewport */}
        <div
          ref={containerRef}
          className="relative h-[480px] sm:h-[560px] flex items-center justify-center overflow-hidden rounded-2xl bg-[#0e0716]/90 border border-[#ea7af4]/20 shadow-[0_20px_60px_rgba(0,0,0,0.9)]"
          style={{ perspective: '1200px' }}
        >
          {/* Spatial Concentric Gyroscope Rings */}
          <div className="absolute w-[440px] sm:w-[620px] h-[440px] sm:h-[620px] rounded-full border border-dashed border-[#ea7af4]/25 pointer-events-none animate-[spin_60s_linear_infinite]" />
          <div className="absolute w-[340px] sm:w-[500px] h-[340px] sm:h-[500px] rounded-full border border-white/5 pointer-events-none" />

          {/* Floating 3D Carousel Cards */}
          <div
            className="relative w-72 sm:w-80 h-96 sm:h-[420px] transition-transform duration-700 ease-out"
            style={{
              transformStyle: 'preserve-3d',
              transform: `rotateY(${rotationY}deg)`,
            }}
          >
            {filteredItems.map((item, idx) => {
              const count = filteredItems.length;
              const angle = (idx / count) * 360;
              const radius = 280; // Distance in 3D Z-plane
              const isSelected = idx === activeIndex;

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setActiveIndex(idx);
                    onSelectItem(item);
                  }}
                  className={`absolute inset-0 rounded-xl overflow-hidden border cursor-pointer transition-all duration-500 flex flex-col justify-end p-5 bg-[#140c1e] ${
                    isSelected
                      ? 'border-[#ea7af4] shadow-[0_0_35px_rgba(234,122,244,0.45)]'
                      : 'border-white/10 opacity-70 hover:opacity-90'
                  }`}
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                    backfaceVisibility: 'hidden',
                  }}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover filter contrast-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                  <div className="relative z-10">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ea7af4] block">
                      {item.category}
                    </span>
                    <h4 className="text-base font-bold text-white tracking-wide mt-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-zinc-300 font-light line-clamp-1 mt-0.5">
                      {item.placement} · {item.style}
                    </p>
                    <div className="mt-3 flex items-center gap-1.5 text-[11px] font-semibold text-[#ea7af4]">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect Artwork</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Directional Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/60 hover:bg-[#ea7af4] text-white border border-white/20 transition-colors shadow-lg"
            aria-label="Previous 3D Card"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/60 hover:bg-[#ea7af4] text-white border border-white/20 transition-colors shadow-lg"
            aria-label="Next 3D Card"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Active Status Ribbon Bottom */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 bg-black/70 backdrop-blur px-4 py-2 rounded-full border border-white/10 text-xs">
            <span className="text-zinc-400">
              Piece <strong className="text-white">{activeIndex + 1}</strong> of {total}
            </span>
            <span className="text-zinc-600">|</span>
            <button
              onClick={handleReset}
              className="text-[#ea7af4] hover:text-[#fae8ff] flex items-center gap-1 text-[11px] uppercase tracking-wider"
            >
              <RotateCcw className="w-3 h-3" />
              Reset View
            </button>
          </div>
        </div>

        {/* Selected Card Highlight */}
        {currentItem && (
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between p-4 rounded-xl bg-[#140c1e] border border-[#ea7af4]/20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-white/20">
                <img src={currentItem.imageUrl} alt={currentItem.title} className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">{currentItem.title}</h4>
                <div className="text-xs text-zinc-400 mt-0.5">{currentItem.description}</div>
              </div>
            </div>
            <button
              onClick={() => onSelectItem(currentItem)}
              className="mt-3 sm:mt-0 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#ea7af4] via-[#d946ef] to-[#c084fc] rounded hover:opacity-90 flex items-center gap-1.5 shadow-[0_0_15px_rgba(234,122,244,0.4)]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Details</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
