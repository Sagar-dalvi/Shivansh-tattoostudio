import React from 'react';
import { Sparkles, MessageSquare, Compass, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { STUDIO_CONFIG } from '../studioConfig';

interface AiAssistantSectionProps {
  onOpenAssistant: (prompt?: string) => void;
}

export const AiAssistantSection: React.FC<AiAssistantSectionProps> = ({ onOpenAssistant }) => {
  const samplePrompts = [
    {
      title: 'Sacred Geometric Sleeve',
      desc: '“I want a spiritual forearm tattoo with Lord Shiva’s Trishul and sacred geometry mandala.”',
    },
    {
      title: 'Monochrome Portrait',
      desc: '“I have a portrait photo of my grandfather and want realistic micro-shading on my upper arm.”',
    },
    {
      title: 'Delicate Fine-Line Script',
      desc: '“Looking for a single-needle minimal Sanskrit mantra along my collarbone.”',
    },
  ];

  return (
    <section id="ai-assistant" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0c0714] relative overflow-hidden">
      {/* Glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#ea7af4]/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="rounded-3xl p-8 sm:p-12 md:p-16 bg-gradient-to-b from-[#140c1e] to-[#0c0714] border border-[#ea7af4]/20 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(234,122,244,0.15)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#ea7af4] bg-[#ea7af4]/10 border border-[#ea7af4]/30 px-3 py-1 rounded-full mb-6">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span>Proprietary Consultation Intelligence</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                MEET THE SHIVANSH<br />
                <span className="bg-gradient-to-r from-white via-[#fae8ff] to-[#ea7af4] bg-clip-text text-transparent">
                  AI TATTOO ASSISTANT
                </span>
              </h2>

              <p className="mt-6 text-zinc-300 text-base leading-relaxed font-light">
                Our AI assistant guides you through our 10-point consultation framework — analyzing anatomy, symbolic meaning, placement, and needle techniques to generate a structured tattoo blueprint before you step into our studio.
              </p>

              {/* Pillars */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#ea7af4] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-bold text-white uppercase tracking-wider">10-Point Analysis</div>
                    <div className="text-xs text-zinc-400 mt-0.5">Evaluates placement, size, contrast, and style.</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#ea7af4] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-bold text-white uppercase tracking-wider">Image Reference Upload</div>
                    <div className="text-xs text-zinc-400 mt-0.5">Inspects reference files for artistic feasibility.</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#ea7af4] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-bold text-white uppercase tracking-wider">Structured Concept Output</div>
                    <div className="text-xs text-zinc-400 mt-0.5">Composition, color direction & artist questions.</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#ea7af4] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-bold text-white uppercase tracking-wider">Direct Studio Hand-off</div>
                    <div className="text-xs text-zinc-400 mt-0.5">Transfers seamlessly to appointment or WhatsApp.</div>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={() => onOpenAssistant()}
                  className="w-full sm:w-auto px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-white rounded bg-gradient-to-r from-[#ea7af4] via-[#d946ef] to-[#c084fc] hover:from-[#f08dfa] hover:to-[#d8b4fe] shadow-[0_0_25px_rgba(234,122,244,0.5)] transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>START AI CONSULTATION</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>

                <span className="text-xs text-zinc-500 font-light text-center sm:text-left">
                  Zero obligation · Instant concept formulation
                </span>
              </div>
            </div>

            {/* Right Interactive Prompt Cards */}
            <div className="lg:col-span-5 space-y-4">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2">
                Sample Client Inquiries (Click to launch)
              </div>

              {samplePrompts.map((p, i) => (
                <div
                  key={i}
                  onClick={() => onOpenAssistant(p.desc)}
                  className="p-5 rounded-xl bg-[#180e24]/80 border border-white/10 hover:border-[#ea7af4]/60 transition-all cursor-pointer group hover:bg-[#1f1230] shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white group-hover:text-[#ea7af4] transition-colors uppercase tracking-wide">
                      {p.title}
                    </h4>
                    <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-[#ea7af4] group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-xs text-zinc-300 font-light mt-2 italic leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              ))}

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-zinc-400">
                <span className="text-[#ea7af4] font-semibold">Artist Ethics Note:</span> The AI does not replace your human artist; it bridges your concept and prepares a foundation for your consultation.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
