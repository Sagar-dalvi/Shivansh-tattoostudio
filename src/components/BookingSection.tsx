import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Clock, Upload, CheckCircle2, AlertCircle, Sparkles, Send, Shield } from 'lucide-react';
import { STUDIO_CONFIG, TATTOO_SERVICES } from '../studioConfig';

interface BookingSectionProps {
  prefilledType?: string;
  prefilledDescription?: string;
  prefilledPlacement?: string;
  prefilledSize?: string;
  prefilledServiceMode?: string;
  prefilledQuoteSummary?: string;
}

export const BookingSection: React.FC<BookingSectionProps> = ({
  prefilledType,
  prefilledDescription,
  prefilledPlacement,
  prefilledSize,
  prefilledServiceMode,
  prefilledQuoteSummary,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    tattooType: 'Custom Tattoos',
    tattooDescription: '',
    preferredPlacement: '',
    approximateSize: '',
    preferredDate: '',
    preferredTime: 'Afternoon (2:00 PM – 5:00 PM)',
    serviceMode: 'Studio Appointment',
    additionalNotes: '',
  });

  const [activeEstimateBadge, setActiveEstimateBadge] = useState<string | null>(null);

  const [imageFileName, setImageFileName] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (prefilledType) {
      setFormData((prev) => ({ ...prev, tattooType: prefilledType }));
    }
    if (prefilledPlacement) {
      setFormData((prev) => ({ ...prev, preferredPlacement: prefilledPlacement }));
    }
    if (prefilledSize) {
      setFormData((prev) => ({ ...prev, approximateSize: prefilledSize }));
    }
    if (prefilledServiceMode) {
      setFormData((prev) => ({ ...prev, serviceMode: prefilledServiceMode }));
    }
    if (prefilledDescription) {
      setFormData((prev) => ({
        ...prev,
        tattooDescription: `${prefilledDescription}\n\n${prev.tattooDescription}`.trim(),
      }));
    }
    if (prefilledQuoteSummary) {
      setActiveEstimateBadge(prefilledQuoteSummary);
    }
  }, [prefilledType, prefilledDescription, prefilledPlacement, prefilledSize, prefilledServiceMode, prefilledQuoteSummary]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFileName(file.name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate reliable dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <section id="book" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0c0714] relative overflow-hidden">
      {/* Background neon orb */}
      <div className="absolute right-10 bottom-10 w-96 h-96 rounded-full bg-[#ea7af4]/10 blur-[130px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="text-xs uppercase tracking-[0.25em] text-[#ea7af4] font-semibold mb-2">
            Schedule Your Consultation
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            BOOK APPOINTMENT
          </h2>
          <p className="mt-3 text-zinc-400 text-sm sm:text-base max-w-xl mx-auto font-light">
            Every session begins with an individualized design consultation to calibrate anatomy, sizing, and style.
          </p>
        </div>

        {/* Success Confirmation Card */}
        {isSubmitted ? (
          <div className="p-8 sm:p-12 rounded-2xl bg-[#140c1e] border border-[#ea7af4]/50 text-center shadow-[0_0_50px_rgba(234,122,244,0.25)] animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-[#ea7af4]/20 text-[#ea7af4] flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-[#ea7af4]" />
            </div>

            <h3 className="text-2xl font-bold text-white tracking-wide font-heading">
              REQUEST RECEIVED
            </h3>

            <div className="mt-4 max-w-lg mx-auto text-sm text-zinc-300 leading-relaxed font-light space-y-2">
              <p className="font-semibold text-white">
                “Thank you. Your tattoo request has been received.”
              </p>
              <p>
                The studio will contact you to confirm the consultation and appointment.
              </p>
            </div>

            <div className="mt-8 p-4 rounded-xl bg-white/5 border border-white/10 max-w-md mx-auto text-left text-xs space-y-1.5 text-zinc-400">
              <div><strong className="text-white">Client:</strong> {formData.fullName}</div>
              <div><strong className="text-white">Type:</strong> {formData.tattooType}</div>
              <div><strong className="text-white">Service Mode:</strong> {formData.serviceMode}</div>
              <div><strong className="text-white">Preferred Date:</strong> {formData.preferredDate || 'Flexible'}</div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setIsSubmitted(false)}
                className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white border border-white/20 rounded transition-colors"
              >
                Submit Another Request
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-10 rounded-2xl bg-[#140c1e] border border-[#ea7af4]/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)] space-y-6"
          >
            {/* Active Estimate Notification Banner if Applied */}
            {activeEstimateBadge && (
              <div className="p-4 rounded-xl bg-gradient-to-r from-[#ea7af4]/15 via-purple-900/20 to-transparent border border-[#ea7af4]/40 flex items-start sm:items-center justify-between gap-3 animate-fade-in">
                <div className="flex items-start sm:items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-[#ea7af4]/20 text-[#ea7af4] shrink-0 mt-0.5 sm:mt-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-2">
                      <span>Applied From Price Estimator</span>
                      <span className="text-[10px] text-zinc-400 font-normal">· Calibrated Specs Loaded</span>
                    </div>
                    <div className="text-xs text-[#fae8ff]/90 mt-0.5 font-light">
                      {activeEstimateBadge}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveEstimateBadge(null)}
                  className="text-[10px] uppercase font-semibold text-zinc-400 hover:text-white px-2 py-1 rounded hover:bg-white/5 transition-colors shrink-0"
                >
                  Dismiss
                </button>
              </div>
            )}

            {/* Row 1: Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-zinc-300 mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full bg-[#1b1028] text-white text-xs sm:text-sm px-4 py-3 rounded-lg border border-white/10 focus:outline-none focus:border-[#ea7af4] focus:ring-1 focus:ring-[#ea7af4]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-zinc-300 mb-1.5">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Mobile / WhatsApp"
                  className="w-full bg-[#1b1028] text-white text-xs sm:text-sm px-4 py-3 rounded-lg border border-white/10 focus:outline-none focus:border-[#ea7af4] focus:ring-1 focus:ring-[#ea7af4]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-zinc-300 mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full bg-[#1b1028] text-white text-xs sm:text-sm px-4 py-3 rounded-lg border border-white/10 focus:outline-none focus:border-[#ea7af4] focus:ring-1 focus:ring-[#ea7af4]"
                />
              </div>
            </div>

            {/* Row 2: Tattoo Specifications */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-zinc-300 mb-1.5">
                  Tattoo Type *
                </label>
                <select
                  name="tattooType"
                  value={formData.tattooType}
                  onChange={handleChange}
                  className="w-full bg-[#1b1028] text-white text-xs sm:text-sm px-4 py-3 rounded-lg border border-white/10 focus:outline-none focus:border-[#ea7af4]"
                >
                  {TATTOO_SERVICES.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                  <option value="Cover-Up / Redesign">Cover-Up / Redesign</option>
                  <option value="Other Custom Concept">Other Custom Concept</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-zinc-300 mb-1.5">
                  Preferred Placement *
                </label>
                <input
                  type="text"
                  name="preferredPlacement"
                  required
                  value={formData.preferredPlacement}
                  onChange={handleChange}
                  placeholder="e.g. Forearm, Ribs, Spine, Wrist"
                  className="w-full bg-[#1b1028] text-white text-xs sm:text-sm px-4 py-3 rounded-lg border border-white/10 focus:outline-none focus:border-[#ea7af4]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-zinc-300 mb-1.5">
                  Approximate Size *
                </label>
                <input
                  type="text"
                  name="approximateSize"
                  required
                  value={formData.approximateSize}
                  onChange={handleChange}
                  placeholder="e.g. 2-3 inches, Palm-size, Half sleeve"
                  className="w-full bg-[#1b1028] text-white text-xs sm:text-sm px-4 py-3 rounded-lg border border-white/10 focus:outline-none focus:border-[#ea7af4]"
                />
              </div>
            </div>

            {/* Row 3: Service Mode & Date/Time */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-zinc-300 mb-1.5">
                  Studio / Home Service *
                </label>
                <select
                  name="serviceMode"
                  value={formData.serviceMode}
                  onChange={handleChange}
                  className="w-full bg-[#1b1028] text-white text-xs sm:text-sm px-4 py-3 rounded-lg border border-white/10 focus:outline-none focus:border-[#ea7af4]"
                >
                  <option value="Studio Appointment">Studio Appointment (In-Studio)</option>
                  <option value="Home Tattoo Service">Home Tattoo Service (Private Residence)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-zinc-300 mb-1.5">
                  Preferred Date
                </label>
                <input
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  className="w-full bg-[#1b1028] text-white text-xs sm:text-sm px-4 py-3 rounded-lg border border-white/10 focus:outline-none focus:border-[#ea7af4]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-zinc-300 mb-1.5">
                  Preferred Time Slot
                </label>
                <select
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleChange}
                  className="w-full bg-[#1b1028] text-white text-xs sm:text-sm px-4 py-3 rounded-lg border border-white/10 focus:outline-none focus:border-[#ea7af4]"
                >
                  <option>Morning (11:00 AM – 2:00 PM)</option>
                  <option>Afternoon (2:00 PM – 5:00 PM)</option>
                  <option>Evening (5:00 PM – 9:00 PM)</option>
                </select>
              </div>
            </div>

            {/* Tattoo Description */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-zinc-300 mb-1.5">
                Tattoo Description & Meaning *
              </label>
              <textarea
                name="tattooDescription"
                required
                rows={3}
                value={formData.tattooDescription}
                onChange={handleChange}
                placeholder="Describe your vision, motifs, symbolic significance, and details..."
                className="w-full bg-[#1b1028] text-white text-xs sm:text-sm px-4 py-3 rounded-lg border border-white/10 focus:outline-none focus:border-[#ea7af4]"
              />
            </div>

            {/* Reference Image Upload & Additional Notes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-zinc-300 mb-1.5">
                  Reference Image (Optional)
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-3 px-4 rounded-lg border border-dashed border-white/20 hover:border-[#ea7af4] bg-[#1b1028] text-zinc-400 hover:text-white transition-colors flex items-center justify-center gap-2 text-xs"
                >
                  <Upload className="w-4 h-4 text-[#ea7af4]" />
                  <span>{imageFileName || 'Upload Reference / Sketch (Max 5MB)'}</span>
                </button>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-zinc-300 mb-1.5">
                  Additional Notes
                </label>
                <input
                  type="text"
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleChange}
                  placeholder="Skin sensitivities, cover-up details, or schedule preferences"
                  className="w-full bg-[#1b1028] text-white text-xs sm:text-sm px-4 py-3 rounded-lg border border-white/10 focus:outline-none focus:border-[#ea7af4]"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-[11px] text-zinc-400 flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-[#ea7af4] flex-shrink-0" />
                <span>Requests are verified by human studio artists. Zero automated bookings.</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white rounded bg-gradient-to-r from-[#ea7af4] via-[#d946ef] to-[#c084fc] hover:from-[#f08dfa] hover:to-[#d8b4fe] shadow-[0_0_20px_rgba(234,122,244,0.5)] transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                {isSubmitting ? (
                  <span>SENDING REQUEST...</span>
                ) : (
                  <>
                    <span>REQUEST APPOINTMENT</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
