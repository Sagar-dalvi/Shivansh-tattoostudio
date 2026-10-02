import React, { useState } from 'react';
import { Image, Type, Calendar, Star, Compass, PenTool, Sparkles, ArrowRight } from 'lucide-react';

interface CustomTattooSectionProps {
  onStartCustomDesign: (initialIdea?: string) => void;
}

export const CustomTattooSection: React.FC<CustomTattooSectionProps> = ({ onStartCustomDesign }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>(['A concept', 'A reference image']);

  const componentsList = [
    { id: 'ref-img', label: 'A reference image', icon: Image, tip: 'Photos, digital art, or screenshots that inspired you' },
    { id: 'name', label: 'A name', icon: Type, tip: 'Honoring loved ones, lineage, or personal monograms' },
    { id: 'date', label: 'A date', icon: Calendar, tip: 'Roman numerals, celestial coordinates, or life milestones' },
    { id: 'symbol', label: 'A symbol', icon: Compass, tip: 'Sacred geometry, zodiac, totems, runes, or family crests' },
    { id: 'memory', label: 'A memory', icon: Star, tip: 'Transforming a life journey or triumph into visual art' },
    { id: 'concept', label: 'A concept', icon: Sparkles, tip: 'An emotional or philosophical theme waiting for form' },
    { id: 'sketch', label: 'A rough sketch', icon: PenTool, tip: 'Even a simple doodle on a napkin is enough to ignite our process' },
  ];

  const toggleItem = (label: string) => {
    if (selectedItems.includes(label)) {
      setSelectedItems(selectedItems.filter((i) => i !== label));
    } else {
      setSelectedItems([...selectedItems, label]);
    }
  };

  return (
    <section id="custom" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0c0714] relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#ea7af4]/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Narrative */}
          <div className="lg:col-span-6">
            <div className="text-xs uppercase tracking-[0.25em] text-[#ea7af4] font-semibold mb-3">
              The Bespoke Evolution
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              YOUR IDEA.<br />
              YOUR STORY.<br />
              <span className="bg-gradient-to-r from-white via-[#fae8ff] to-[#ea7af4] bg-clip-text text-transparent">
                YOUR TATTOO.
              </span>
            </h2>

            <p className="mt-6 text-zinc-300 text-base leading-relaxed font-light">
              You never need a finished, polished drawing before entering our studio. Great tattoos start from raw moments, memories, and personal instincts.
            </p>

            <p className="mt-3 text-zinc-400 text-sm leading-relaxed font-light">
              Whether you arrive with an ancient verse, a photo, or a rough scribble on your phone, our master artists calibrate the anatomy, line weights, negative space, and tonal balance into a permanent piece designed solely for you.
            </p>

            {/* Custom Design Steps */}
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-lg bg-[#140c1e] border border-white/5">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#ea7af4]/20 text-[#ea7af4] flex items-center justify-center font-bold text-xs">
                  01
                </span>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">Concept Discovery</h4>
                  <p className="text-xs text-zinc-400 mt-1">We listen to the emotional intent, placement ideas, and aesthetic preferences.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg bg-[#140c1e] border border-white/5">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#ea7af4]/20 text-[#ea7af4] flex items-center justify-center font-bold text-xs">
                  02
                </span>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">Anatomical Blueprint</h4>
                  <p className="text-xs text-zinc-400 mt-1">Original artwork is drafted to follow the exact muscle curvature and skin stretch.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg bg-[#140c1e] border border-white/5">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#ea7af4]/20 text-[#ea7af4] flex items-center justify-center font-bold text-xs">
                  03
                </span>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">Precision Execution</h4>
                  <p className="text-xs text-zinc-400 mt-1">Surgical needles, custom ink depths, and sterile protocol bring it to life.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Elements Selector */}
          <div className="lg:col-span-6 p-8 rounded-2xl bg-[#140c1e] border border-[#ea7af4]/20 shadow-[0_15px_40px_rgba(0,0,0,0.7)]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white">
                What Are You Bringing To The Studio?
              </h3>
              <span className="text-xs text-[#ea7af4] font-medium">Click to select</span>
            </div>
            <p className="text-xs text-zinc-400 mb-6 font-light">
              Select one or more elements you currently have, and we’ll load them straight into your custom consultation:
            </p>

            <div className="space-y-3">
              {componentsList.map((item) => {
                const Icon = item.icon;
                const isSelected = selectedItems.includes(item.label);
                return (
                  <button
                    key={item.id}
                    onClick={() => toggleItem(item.label)}
                    className={`w-full p-3.5 rounded-lg border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#ea7af4]/15 border-[#ea7af4] text-white shadow-[0_0_15px_rgba(234,122,244,0.25)]'
                        : 'bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded ${isSelected ? 'bg-[#ea7af4] text-white' : 'bg-white/10 text-zinc-400'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-bold tracking-wide uppercase">{item.label}</div>
                        <div className="text-[11px] text-zinc-400 font-light mt-0.5">{item.tip}</div>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] ${
                      isSelected ? 'border-[#ea7af4] bg-[#ea7af4] text-white font-bold' : 'border-zinc-600'
                    }`}>
                      {isSelected ? '✓' : ''}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* CTA Button */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <button
                onClick={() => onStartCustomDesign(selectedItems.join(', '))}
                className="w-full py-4 px-6 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-white rounded bg-gradient-to-r from-[#ea7af4] via-[#d946ef] to-[#c084fc] hover:from-[#f08dfa] hover:to-[#d8b4fe] shadow-[0_0_20px_rgba(234,122,244,0.5)] transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                <Sparkles className="w-4 h-4" />
                <span>START YOUR CUSTOM DESIGN</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
              <p className="text-center text-[11px] text-zinc-500 mt-2">
                Loads directly into our virtual consultation engine with your selections.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
