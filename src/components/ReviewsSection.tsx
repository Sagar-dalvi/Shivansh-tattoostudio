import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, ExternalLink, CheckCircle2, Plus, Sparkles, X, Send } from 'lucide-react';
import { CUSTOMER_REVIEWS, STUDIO_CONFIG } from '../studioConfig';
import { getFirestoreReviews, createCustomerReview, ReviewRecord } from '../services/firestoreService';
import { useAuth } from '../context/AuthContext';

export const ReviewsSection: React.FC = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<any[]>(CUSTOMER_REVIEWS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form State
  const [authorName, setAuthorName] = useState('');
  const [rating, setRating] = useState(5);
  const [tattooService, setTattooService] = useState('Lord Shiva / Spiritual');
  const [reviewText, setReviewText] = useState('');

  useEffect(() => {
    loadLiveReviews();
  }, []);

  useEffect(() => {
    if (user && !authorName) {
      setAuthorName(user.displayName || '');
    }
  }, [user]);

  const loadLiveReviews = async () => {
    try {
      const liveReviews = await getFirestoreReviews();
      if (liveReviews.length > 0) {
        // Map live reviews to card display structure
        const mapped = liveReviews.map((r) => ({
          id: r.id,
          customerName: r.author,
          rating: r.rating,
          tattooType: r.service || 'Custom Tattoo',
          reviewText: r.review,
          badge: r.verified ? 'Verified Client' : 'Studio Review',
          date: r.date || 'Recent',
        }));

        // Merge, placing newest reviews first
        setReviews(mapped);
      }
    } catch (err) {
      console.warn('Could not load live reviews from Firestore:', err);
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !reviewText.trim()) return;

    setSubmitting(true);
    try {
      const newId = await createCustomerReview({
        author: authorName.trim(),
        rating,
        service: tattooService,
        review: reviewText.trim(),
        date: 'Just now',
        verified: true,
        userId: user?.uid,
      });

      // Optimistic update
      setReviews((prev) => [
        {
          id: newId,
          customerName: authorName.trim(),
          rating,
          tattooType: tattooService,
          reviewText: reviewText.trim(),
          badge: 'Verified Client',
          date: 'Just now',
        },
        ...prev,
      ]);

      setSubmitted(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setSubmitted(false);
        setReviewText('');
      }, 1800);
    } catch (err) {
      console.error('Failed to submit review:', err);
      alert('Could not submit review to database. Please check connection.');
    } finally {
      setSubmitting(false);
    }
  };

  const isGoogleConfigured =
    STUDIO_CONFIG.googleReviewUrl &&
    !STUDIO_CONFIG.googleReviewUrl.includes('ADD_');

  return (
    <section id="reviews" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0c0714] relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-[0.25em] text-[#ea7af4] font-semibold mb-2">
            Client Words & Experiences · Synced with Firestore
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            CUSTOMER REVIEWS
          </h2>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base font-light">
            Read firsthand feedback on our needle precision, sterile protocol, and consultation integrity.
          </p>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#ea7af4] to-[#c026d3] rounded-lg shadow-[0_0_20px_rgba(234,122,244,0.4)] hover:opacity-90 transition-opacity"
            >
              <Plus className="w-4 h-4" />
              <span>Write a Client Review</span>
            </button>
          </div>
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-7 rounded-xl bg-[#140c1e] border border-white/10 hover:border-[#ea7af4]/40 transition-colors flex flex-col justify-between"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-[#ea7af4] mb-4">
                  {[...Array(rev.rating || 5)].map((_, i) => (
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

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white rounded bg-gradient-to-r from-[#ea7af4] via-[#d946ef] to-[#c084fc] hover:from-[#f08dfa] hover:to-[#d8b4fe] shadow-[0_0_20px_rgba(234,122,244,0.4)] transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>SUBMIT IN-APP REVIEW</span>
            </button>

            {isGoogleConfigured && (
              <a
                href={STUDIO_CONFIG.googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-zinc-200 hover:text-white rounded border border-white/20 bg-white/5 hover:bg-white/10 transition-all"
              >
                <span>RATE ON GOOGLE</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Review Submission Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#11091a] rounded-2xl border border-[#ea7af4]/40 p-6 sm:p-8 shadow-[0_0_50px_rgba(234,122,244,0.35)]">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-12 h-12 text-[#ea7af4] mx-auto mb-3" />
                <h4 className="text-xl font-bold text-white mb-2">Thank You For Your Review!</h4>
                <p className="text-xs text-zinc-300">
                  Your review has been saved to the Shivansh Tattoo Studio Firestore database.
                </p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#ea7af4]" />
                    <span>Leave a Verified Client Review</span>
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Share your experience with our artists, hygiene, or home service.
                  </p>
                </div>

                {/* Rating selection */}
                <div>
                  <label className="text-xs text-zinc-300 block mb-1">Your Rating:</label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= rating
                              ? 'text-[#ea7af4] fill-[#ea7af4]'
                              : 'text-zinc-600'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs text-zinc-400 ml-2 font-mono">({rating}/5 Stars)</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-zinc-300 block mb-1">Your Full Name:</label>
                  <input
                    type="text"
                    required
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full bg-[#180e24] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#ea7af4]"
                  />
                </div>

                <div>
                  <label className="text-xs text-zinc-300 block mb-1">Tattoo Style / Service:</label>
                  <select
                    value={tattooService}
                    onChange={(e) => setTattooService(e.target.value)}
                    className="w-full bg-[#180e24] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#ea7af4]"
                  >
                    <option>Lord Shiva / Spiritual</option>
                    <option>Black & Grey Realism</option>
                    <option>Sacred Geometric Mandala</option>
                    <option>Minimalist Fine-Line</option>
                    <option>Portrait Tattoo</option>
                    <option>Custom Lettering & Sanskrit</option>
                    <option>Cover-Up Transformation</option>
                    <option>Home Tattoo Service</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-zinc-300 block mb-1">Your Honest Review:</label>
                  <textarea
                    rows={4}
                    required
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Describe your tattoo session, sterile setup, artist patience, or final result..."
                    className="w-full bg-[#180e24] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#ea7af4]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#ea7af4] to-[#c026d3] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(234,122,244,0.4)] hover:opacity-95 transition-opacity disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin" />
                      <span>Saving to Database...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Post Review to Database</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
