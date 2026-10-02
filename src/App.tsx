import React, { useState } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { CustomTattooSection } from './components/CustomTattooSection';
import { GallerySection } from './components/GallerySection';
import { ThreeDGallerySection } from './components/ThreeDGallerySection';
import { ArtistsSection } from './components/ArtistsSection';
import { AiAssistantSection } from './components/AiAssistantSection';
import { AiTattooAssistantModal } from './components/AiTattooAssistantModal';
import { TattooPriceEstimator, EstimateDetails } from './components/TattooPriceEstimator';
import { BookingSection } from './components/BookingSection';
import { HomeTattooServiceSection } from './components/HomeTattooServiceSection';
import { AftercareSection } from './components/AftercareSection';
import { BlogSection } from './components/BlogSection';
import { ReviewsSection } from './components/ReviewsSection';
import { InstagramFeedSection } from './components/InstagramFeedSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { NewsletterSection } from './components/NewsletterSection';
import { FloatingWidgets } from './components/FloatingWidgets';
import { Footer } from './components/Footer';
import { GalleryItem } from './studioConfig';

export default function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [aiAssistantOpen, setAiAssistantOpen] = useState<boolean>(false);
  const [aiInitialPrompt, setAiInitialPrompt] = useState<string | undefined>(undefined);

  // Prefilled states for the booking section
  const [bookingPrefilledType, setBookingPrefilledType] = useState<string | undefined>(undefined);
  const [bookingPrefilledDesc, setBookingPrefilledDesc] = useState<string | undefined>(undefined);
  const [bookingPrefilledPlacement, setBookingPrefilledPlacement] = useState<string | undefined>(undefined);
  const [bookingPrefilledSize, setBookingPrefilledSize] = useState<string | undefined>(undefined);
  const [bookingPrefilledServiceMode, setBookingPrefilledServiceMode] = useState<string | undefined>(undefined);
  const [bookingPrefilledQuoteSummary, setBookingPrefilledQuoteSummary] = useState<string | undefined>(undefined);

  const handleOpenAiAssistant = (prompt?: string) => {
    setAiInitialPrompt(prompt);
    setAiAssistantOpen(true);
  };

  const handleOpenBooking = (serviceType?: string, description?: string) => {
    if (serviceType) {
      setBookingPrefilledType(serviceType);
    }
    if (description) {
      setBookingPrefilledDesc(description);
    }
    const bookingElement = document.getElementById('book');
    if (bookingElement) {
      bookingElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleApplyEstimateToBooking = (details: EstimateDetails) => {
    setBookingPrefilledType(details.styleName);
    setBookingPrefilledPlacement(details.placement);
    setBookingPrefilledSize(details.dimensionsText);
    setBookingPrefilledServiceMode(
      details.serviceMode.toLowerCase().includes('home')
        ? 'Home Tattoo Service'
        : 'Studio Appointment'
    );
    setBookingPrefilledQuoteSummary(
      `${details.styleName} · ${details.dimensionsText} on ${details.placement} · Est: ₹${details.minPrice.toLocaleString('en-IN')} – ₹${details.maxPrice.toLocaleString('en-IN')} (${details.durationHours})`
    );

    const quoteSummaryBlock = `[PRICE ESTIMATOR SPECIFICATIONS]
• Style / Complexity: ${details.styleName}
• Sizing / Dimensions: ${details.dimensionsText}
• Target Placement: ${details.placement}
• Experience Tier: ${details.serviceMode}
• Estimated Quote Range: ₹${details.minPrice.toLocaleString('en-IN')} – ₹${details.maxPrice.toLocaleString('en-IN')}
• Estimated Duration: ${details.durationHours} (${details.sessions})
• Sensitivity / Pain Index: ${details.painLabel} (${details.painLevel}/5)`;

    setBookingPrefilledDesc(quoteSummaryBlock);

    const bookingElement = document.getElementById('book');
    if (bookingElement) {
      bookingElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTransferConceptToBooking = (conceptText: string) => {
    setAiAssistantOpen(false);
    setBookingPrefilledDesc(conceptText);
    const bookingElement = document.getElementById('book');
    if (bookingElement) {
      bookingElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartCustomDesign = (elementsList?: string) => {
    const prompt = elementsList
      ? `I want to begin a custom tattoo design. I am bringing these elements: ${elementsList}. Can you analyze this and help me develop a structured tattoo concept?`
      : 'I want to start a custom tattoo design. Can you help me formulate the concept?';
    handleOpenAiAssistant(prompt);
  };

  const handleSelect3DItem = (item: GalleryItem) => {
    handleOpenBooking(`${item.title} (${item.style})`);
  };

  return (
    <div className="min-h-screen bg-[#0c0714] text-white selection:bg-[#ea7af4] selection:text-white font-sans antialiased overflow-x-hidden">
      {/* 1. Cinematic Loading Intro */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* 2. Sticky Glassy Navigation Bar */}
      <Navbar
        onOpenAiAssistant={() => handleOpenAiAssistant()}
        onOpenBooking={() => handleOpenBooking()}
      />

      <main>
        {/* 3. Hero Section with 3D Depth & Prominent Logo */}
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onOpenAiAssistant={() => handleOpenAiAssistant()}
        />

        {/* 4. About Section ("WHERE ART MEETS PRECISION") */}
        <AboutSection />

        {/* 5. Services Section (All 12 Disciplines with "Get a Quote") */}
        <ServicesSection
          onSelectServiceForBooking={(serviceTitle) => handleOpenBooking(serviceTitle)}
          onSelectServiceForAi={(serviceTitle) =>
            handleOpenAiAssistant(`I am interested in ${serviceTitle}. Can you help me develop a concept for it?`)
          }
        />

        {/* 6. Custom Tattoo Interactive Section ("YOUR IDEA. YOUR STORY. YOUR TATTOO.") */}
        <CustomTattooSection onStartCustomDesign={handleStartCustomDesign} />

        {/* 7. Tattoo Gallery (Masonry & Lightbox) */}
        <GallerySection
          onOpenBookingWithStyle={(styleTitle) => handleOpenBooking(styleTitle)}
          onOpen3dGallery={() => {
            const el = document.getElementById('gallery-3d');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 8. 3D Gallery Experience */}
        <ThreeDGallerySection onSelectItem={handleSelect3DItem} />

        {/* 9. Tattoo Artists Section */}
        <ArtistsSection
          onBookWithArtist={(artistName) => handleOpenBooking(`Session with ${artistName}`)}
          onViewPortfolio={() => {
            const el = document.getElementById('gallery');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 10. AI Assistant Spotlight Section */}
        <AiAssistantSection onOpenAssistant={handleOpenAiAssistant} />

        {/* 11. Interactive Tattoo Price Estimator */}
        <TattooPriceEstimator
          onApplyEstimateToBooking={handleApplyEstimateToBooking}
          onOpenAiWithEstimate={handleOpenAiAssistant}
        />

        {/* 12. Book Appointment Section */}
        <BookingSection
          prefilledType={bookingPrefilledType}
          prefilledDescription={bookingPrefilledDesc}
          prefilledPlacement={bookingPrefilledPlacement}
          prefilledSize={bookingPrefilledSize}
          prefilledServiceMode={bookingPrefilledServiceMode}
          prefilledQuoteSummary={bookingPrefilledQuoteSummary}
        />

        {/* 12. Home Tattoo Service ("GET INKED AT YOUR PLACE") */}
        <HomeTattooServiceSection
          onRequestHomeService={() => handleOpenBooking('Home Tattoo Service')}
        />

        {/* 13. Aftercare Section ("TAKE CARE OF YOUR NEW INK") */}
        <AftercareSection />

        {/* 14. Studio Blog ("STUDIO JOURNAL & INSIGHTS") */}
        <BlogSection onOpenBookingWithService={handleOpenBooking} />

        {/* 15. Customer Reviews & Google Reviews ("LEAVE US A REVIEW") */}
        <ReviewsSection />

        {/* 15. Dynamic Instagram Feed Section (Latest Portfolio Work & Follow Us) */}
        <InstagramFeedSection onSelectPostForBooking={handleOpenBooking} />

        {/* 16. FAQ Section (All 10 Questions Accordion) */}
        <FaqSection />

        {/* 16. Contact Section ("LET'S CREATE SOMETHING PERMANENT." & Instagram "FOLLOW THE INK") */}
        <ContactSection />

        {/* 17. Newsletter Signup Section (30% Discount for Subscribers with Glass-morphism) */}
        <NewsletterSection onOpenBooking={handleOpenBooking} />
      </main>

      {/* 17. Floating AI & WhatsApp Widgets */}
      <FloatingWidgets onOpenAiAssistant={() => handleOpenAiAssistant()} />

      {/* 18. Full Consultation AI Assistant Modal */}
      <AiTattooAssistantModal
        isOpen={aiAssistantOpen}
        onClose={() => setAiAssistantOpen(false)}
        onTransferToBooking={handleTransferConceptToBooking}
        initialPrompt={aiInitialPrompt}
      />

      {/* 19. Premium Footer */}
      <Footer
        onOpenAiAssistant={() => handleOpenAiAssistant()}
        onOpenBooking={() => handleOpenBooking()}
      />
    </div>
  );
}
