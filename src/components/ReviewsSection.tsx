import React from 'react';
import { Star, MessageSquare, ExternalLink, CheckCircle2 } from 'lucide-react';
import { CUSTOMER_REVIEWS, STUDIO_CONFIG } from '../studioConfig';

export const ReviewsSection: React.FC = () => {
  const isGoogleConfigured =
    STUDIO_CONFIG.googleReviewUrl &&
    !STUDIO_CONFIG.googleReviewUrl.includes('ADD_');

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0c0714] relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-[0.25em] text-[#ea7af4] font-semibold mb-2">
            Client Words & Experiences
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            CUSTOMER REVIEWS
          </h2>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base font-light">
            Read firsthand feedback on our needle precision, sterile protocol, and consultation integrity.
          </p>
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CUSTOMER_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-7 rounded-xl bg-[#140c1e] border border-white/10 hover:border-[#ea7af4]/40 transition-colors flex flex-col justify-between"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-[#ea7af4] mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-sm text-zinc-300 font-light leading-relaxed italic">
                  “{rev.reviewText}”
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    {rev.customerName}
                  </h4>
                  <span className="text-[11px] text-zinc-400 font-light mt-0.5 block">
                    {rev.tattooType}
                  </span>
                </div>

                <span className="text-[10px] uppercase font-bold text-[#ea7af4] bg-[#ea7af4]/10 px-2 py-0.5 rounded border border-[#ea7af4]/20">
                  {rev.badge}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Section 20: Google Reviews Call-to-Action */}
        <div className="mt-16 p-8 sm:p-12 rounded-2xl bg-gradient-to-r from-[#140c1e] via-[#1b1028] to-[#140c1e] border border-[#ea7af4]/20 text-center max-w-3xl mx-auto shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
          <div className="w-12 h-12 rounded-full bg-[#ea7af4]/10 text-[#ea7af4] flex items-center justify-center mx-auto mb-4 border border-[#ea7af4]/20">
            <Star className="w-6 h-6 fill-[#ea7af4]" />
          </div>

          <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-[0.14em] text-white">
            LOVE YOUR TATTOO?<br />
            <span className="text-[#ea7af4]">LEAVE US A REVIEW.</span>
          </h3>

          <p className="mt-3 text-xs sm:text-sm text-zinc-300 font-light max-w-md mx-auto">
            Your honest review helps others discover authentic artistry, precision linework, and studio safety standards.
          </p>

          <div className="mt-6">
            {isGoogleConfigured ? (
              <a
                href={STUDIO_CONFIG.googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white rounded bg-gradient-to-r from-[#ea7af4] via-[#d946ef] to-[#c084fc] hover:from-[#f08dfa] hover:to-[#d8b4fe] shadow-[0_0_20px_rgba(234,122,244,0.4)] transition-all"
              >
                <span>RATE US ON GOOGLE</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            ) : (
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-zinc-200 hover:text-white rounded border border-white/20 bg-white/5 hover:bg-white/10 transition-all"
              >
                <span>RATE US ON GOOGLE</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
