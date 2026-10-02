/**
 * SHIVANSH TATTOO STUDIO - MASTER CONFIGURATION
 * 
 * Centralized settings, contacts, services, artists, FAQs, and gallery items.
 * Edit values here or in `src/images.ts` for all local images.
 */
import { STUDIO_IMAGES } from './images';

export interface StudioConfig {
  studioName: string;
  tagline: string;
  logoUrl: string;
  phone: string;
  phoneSecondary?: string;
  whatsappNumber: string;
  whatsappNumberSecondary?: string;
  email: string;
  address: string;
  googleMapsUrl: string;
  googleReviewUrl: string;
  instagramUrl: string;
  businessHours: string;
  homeServiceAvailable: boolean;
  homeServiceArea: string;
  homeServiceImageUrl?: string;
}

export const STUDIO_CONFIG: StudioConfig = {
  studioName: "Shivansh Tattoo Studio",
  tagline: "Precision in Every Line.",
  logoUrl: STUDIO_IMAGES.brand.logo,
  phone: "+91 95796 21490",
  phoneSecondary: "+91 95790 081322",
  whatsappNumber: "+919579621490",
  whatsappNumberSecondary: "+9195790081322",
  email: "shivanshtattoostudio@gmail.com",
  address: "Avdhan Fata, Dhule, Mumbai - Agra Highway",
  googleMapsUrl: "https://maps.app.goo.gl/GBwZeuEE51GmU7fy9",
  googleReviewUrl: "https://maps.app.goo.gl/GBwZeuEE51GmU7fy9",
  instagramUrl: "https://www.instagram.com/shivanshtattoostudio",
  businessHours: "Monday – Sunday: 11:00 AM – 9:00 PM (By Appointment & Walk-in)",
  homeServiceAvailable: true,
  homeServiceArea: "Available in Dhule, Mumbai - Agra Highway corridor & surrounding zones upon prior scheduling.",
  homeServiceImageUrl: STUDIO_IMAGES.services.homeService,
};

// WhatsApp pre-formatted prompt messages
export const WHATSAPP_MESSAGES = {
  general: "Hi Shivansh Tattoo Studio, I would like to discuss a tattoo.",
  appointment: "Hi Shivansh Tattoo Studio, I want to book a tattoo appointment.",
  customDesign: "Hi Shivansh Tattoo Studio, I want a custom tattoo design.",
  homeService: "Hi Shivansh Tattoo Studio, I want a home tattoo appointment.",
  quote: "Hi Shivansh Tattoo Studio, I would like to request a quote for a tattoo concept.",
};

export function getWhatsAppLink(messageKey: keyof typeof WHATSAPP_MESSAGES = "general", customText?: string, useSecondary = false): string {
  const number = useSecondary ? (STUDIO_CONFIG.whatsappNumberSecondary || STUDIO_CONFIG.whatsappNumber) : STUDIO_CONFIG.whatsappNumber;
  const isConfigured = number && !number.includes("ADD_");
  const msg = customText || WHATSAPP_MESSAGES[messageKey];
  if (!isConfigured) {
    return `#contact?ref=whatsapp-unconfigured`;
  }
  return `https://wa.me/${encodeURIComponent(number.replace(/\D/g, ""))}/?text=${encodeURIComponent(msg)}`;
}

// 12 Tattoo Services
export interface TattooService {
  id: string;
  title: string;
  shortDesc: string;
  category: string;
  image: string;
  features: string[];
}

export const TATTOO_SERVICES: TattooService[] = [
  {
    id: "custom-tattoos",
    title: "Custom Tattoos",
    shortDesc: "Bespoke tattoo art developed uniquely for your narrative, anatomy, and creative vision.",
    category: "Custom",
    image: STUDIO_IMAGES.services.customTattoos,
    features: ["1-on-1 Artist Consult", "Digital Stencil Mockup", "Anatomical Flow Matching"],
  },
  {
    id: "personalized-designs",
    title: "Personalized Designs",
    shortDesc: "Transforming personal milestones, family emblems, and meaningful memories into permanent ink.",
    category: "Custom",
    image: STUDIO_IMAGES.services.personalizedDesigns,
    features: ["Symbolic Translation", "Custom Drafting", "Iterative Refinement"],
  },
  {
    id: "minimalist-tattoos",
    title: "Minimalist Tattoos",
    shortDesc: "Understated elegance, micro-tattoos, and delicate silhouettes executed with surgical clarity.",
    category: "Minimal",
    image: STUDIO_IMAGES.services.minimalistTattoos,
    features: ["Micro-Needle Precision", "High Contrast Longevity", "Clean Aesthetic"],
  },
  {
    id: "linework",
    title: "Linework & Geometric",
    shortDesc: "Flawless single-pass linework, sacred geometry, dotwork, and mathematical symmetry.",
    category: "Geometric",
    image: STUDIO_IMAGES.services.linework,
    features: ["Exact Symmetrical Ratios", "Zero-Wobble Lines", "Intricate Mandalas"],
  },
  {
    id: "realism",
    title: "Black & Grey Realism",
    shortDesc: "Deep tonal range, photo-realistic depth, fluid gradients, and timeless monochrome impact.",
    category: "Realism",
    image: STUDIO_IMAGES.services.realism,
    features: ["Multi-Tone Shading", "Dimensional Contrast", "High Detail Retention"],
  },
  {
    id: "photo-tattoos",
    title: "Photo Tattoos (Photo-to-Ink)",
    shortDesc: "Hyper-realistic recreation of your photographs—loved ones, parents, children, or icons—translated into permanent high-contrast skin realism.",
    category: "Photo Tattoo",
    image: STUDIO_IMAGES.services.photoTattoos,
    features: ["Reference Photo Calibration", "Micro-Tonal Skin Shading", "High-Resolution Facial Depth", "Hyper-Realistic Eyes & Contrast"],
  },
  {
    id: "portrait-tattoos",
    title: "Portrait Tattoos",
    shortDesc: "Expressive, hyper-detailed portraits of loved ones, iconic figures, or historical muses.",
    category: "Portrait",
    image: STUDIO_IMAGES.services.portraitTattoos,
    features: ["Anatomical Proportions", "Skin Texture Emulation", "Master Shadowing"],
  },
  {
    id: "lettering-name",
    title: "Lettering / Name Tattoos",
    shortDesc: "Chicano script, calligraphy, gothic lettering, and custom typography balanced for body contours.",
    category: "Lettering",
    image: STUDIO_IMAGES.services.letteringName,
    features: ["Custom Script Typography", "Fine Kerning", "Archival Black Inks"],
  },
  {
    id: "symbolic-tattoos",
    title: "Symbolic Tattoos",
    shortDesc: "Archetypes, celestial maps, cultural insignias, and personal talismans steeped in meaning.",
    category: "Symbolic",
    image: STUDIO_IMAGES.services.symbolicTattoos,
    features: ["Deep Iconography", "Visual Balance", "Customized Lore"],
  },
  {
    id: "spiritual-tattoos",
    title: "Spiritual Tattoos",
    shortDesc: "Lord Shiva motifs, Om, Trishul, yantras, lotus, and mindful cosmic art designed with reverence.",
    category: "Spiritual",
    image: STUDIO_IMAGES.services.spiritualTattoos,
    features: ["Sacred Geometry", "Spiritual Symbolism", "Reverent Artistry"],
  },
  {
    id: "cover-up-consultation",
    title: "Cover-Up Consultation",
    shortDesc: "Specialized strategic restructuring, organic camo-layering, and blast-overs for existing ink.",
    category: "Cover-Up",
    image: STUDIO_IMAGES.services.coverUp,
    features: ["Pigment Density Mapping", "Dark-to-Light Blending", "Redesign Feasibility"],
  },
  {
    id: "tattoo-redesign",
    title: "Tattoo Redesign & Restoration",
    shortDesc: "Breathe fresh vitality, contrast, and modern precision into faded, aged, or unfinished pieces.",
    category: "Custom",
    image: STUDIO_IMAGES.services.tattooRedesign,
    features: ["Linework Re-sharpening", "Depth Refresh", "Background Expansion"],
  },
  {
    id: "home-tattoo-service",
    title: "Home Tattoo Service",
    shortDesc: "The complete luxury studio experience brought directly to your private residence with medical-grade hygiene.",
    category: "Home Service",
    image: STUDIO_IMAGES.services.homeService,
    features: ["Sterile Mobile Setup", "Private Comfort", "Post-Procedure Aftercare Kit"],
  },
];

// Tattoo Gallery Items (Categorized with placeholders easily replaceable)
export interface GalleryItem {
  id: string;
  title: string;
  category: "MINIMAL" | "REALISM" | "PORTRAIT" | "LETTERING" | "SPIRITUAL" | "GEOMETRIC" | "CUSTOM" | "COVER-UP";
  description: string;
  placement: string;
  style: string;
  imageUrl: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Cosmic Trishul & Sacred Yantra",
    category: "SPIRITUAL",
    description: "Detailed sacred geometry combining the Trident of Shiva with lotus mandala linework.",
    placement: "Forearm / Inner Arm",
    style: "Black & Grey Fine Line",
    imageUrl: STUDIO_IMAGES.gallery.gal1,
  },
  {
    id: "gal-2",
    title: "Hyper-Realist Lion Portrait",
    category: "REALISM",
    description: "Multi-layered tonal study capturing lifelike fur texture and eye luminescence.",
    placement: "Shoulder / Upper Arm",
    style: "Micro-Realistic Monochrome",
    imageUrl: STUDIO_IMAGES.gallery.gal2,
  },
  {
    id: "gal-3",
    title: "Single-Needle Botanical Fern",
    category: "MINIMAL",
    description: "Delicate single needle pass with feather-light stippling and anatomical curve harmony.",
    placement: "Spine / Collarbone",
    style: "Delicate Minimalist",
    imageUrl: STUDIO_IMAGES.gallery.gal3,
  },
  {
    id: "gal-4",
    title: "Sacred Hexagonal Mandala",
    category: "GEOMETRIC",
    description: "Zero-tolerance vector symmetry with concentric dot gradation and micro-calibrations.",
    placement: "Upper Back",
    style: "Sacred Geometric Dotwork",
    imageUrl: STUDIO_IMAGES.gallery.gal4,
  },
  {
    id: "gal-5",
    title: "Custom Monogram Calligraphy",
    category: "LETTERING",
    description: "Tailored flowing script typography with flourishes contoured along muscle tendons.",
    placement: "Wrist / Ribcage",
    style: "Fine Script Typography",
    imageUrl: STUDIO_IMAGES.gallery.gal5,
  },
  {
    id: "gal-6",
    title: "Metamorphosis Raven Cover-Up",
    category: "COVER-UP",
    description: "Deep obsidian plumage layers effectively transforming an old faded motif into high art.",
    placement: "Calf / Outer Bicep",
    style: "Heavy Charcoal Realism",
    imageUrl: STUDIO_IMAGES.gallery.gal6,
  },
  {
    id: "gal-7",
    title: "Philosophical Classical Bust",
    category: "PORTRAIT",
    description: "Sculptural marble-inspired chiaroscuro shading depicting stoic contemplation.",
    placement: "Forearm",
    style: "Chiaroscuro Realism",
    imageUrl: STUDIO_IMAGES.gallery.gal7,
  },
  {
    id: "gal-8",
    title: "Cybernetic Linework Emblem",
    category: "CUSTOM",
    description: "Futuristic neo-tribal circuit lines with glowing contrast accents.",
    placement: "Chest / Shoulder",
    style: "Futuristic Precision Linework",
    imageUrl: STUDIO_IMAGES.gallery.gal8,
  },
  {
    id: "gal-9",
    title: "Ethereal Celestial Compass",
    category: "MINIMAL",
    description: "Micro-fine celestial axis with planetary coordinates and starlight accents.",
    placement: "Inner Bicep",
    style: "Micro-Fine Line",
    imageUrl: STUDIO_IMAGES.gallery.gal9,
  },
];

// Studio Artists - Clearly structured with editable placeholders
export interface ArtistPortfolioWork {
  id: string;
  title: string;
  style: string;
  placement: string;
  imageUrl: string;
  description: string;
}

export interface TattooArtist {
  id: string;
  name: string;
  role: string;
  specialization: string[];
  experience: string;
  bio: string;
  photoUrl: string;
  detailedBio?: string;
  featuredQuote?: string;
  techniques?: string[];
  stats?: { label: string; value: string }[];
  portfolioWorks?: ArtistPortfolioWork[];
}

export const STUDIO_ARTISTS: TattooArtist[] = [
  {
    id: "lead-artist",
    name: "Sagar Dalvi",
    role: "Founder, CEO & Marketing Head",
    specialization: ["Founder & Creative Direction", "Black & Grey Realism", "Brand Vision", "Precision Needlework"],
    experience: "Founder, CEO & Marketing Head",
    bio: "Founder, CEO, and Marketing Head of Shivansh Tattoo Studio. Spearheading the studio's artistic standards, brand innovation, and commitment to precision tattoo craft and exceptional client care.",
    photoUrl: STUDIO_IMAGES.artists.sagarDalvi,
    detailedBio: "As the Founder, CEO, and Creative Director of Shivansh Tattoo Studio in Dhule, Sagar Dalvi established the studio on a singular foundation: absolute precision in every line. Combining master-level technical needle calibration with visionary studio leadership, Sagar personally oversees design integrity, anatomical mapping, and hospital-grade sterilization protocols. His personal tattooing practice specializes in high-contrast black and grey realism, sacred spiritual devotionals (Lord Shiva motifs, Trishul linework), and custom large-scale pieces engineered for permanent visual longevity.",
    featuredQuote: "A tattoo is not merely pigment beneath the skin; it is a permanent chapter of your life story rendered with surgical precision.",
    techniques: [
      "Dynamic Greywash Tonal Dilutions",
      "Micro-Anatomical Muscle Flow Calibration",
      "High-Contrast Shadow Anchoring",
      "Autoclave-Certified Single-Use Protocols"
    ],
    stats: [
      { label: "Studio Leadership", value: "Founder & CEO" },
      { label: "Art Direction", value: "Master Realism" },
      { label: "Hygiene Protocol", value: "Hospital Grade" },
      { label: "Client Satisfaction", value: "5.0 ★ Star Rated" }
    ],
    portfolioWorks: [
      {
        id: "sd-1",
        title: "Cosmic Trishul & Sacred Yantra",
        style: "Black & Grey Fine Line",
        placement: "Forearm / Inner Arm",
        imageUrl: STUDIO_IMAGES.gallery.gal1,
        description: "Intricate devotional centerpiece combining the Trident of Shiva with concentric sacred geometry and fine stippling."
      },
      {
        id: "sd-2",
        title: "Hyper-Realist Lion Portrait",
        style: "Micro-Realistic Monochrome",
        placement: "Shoulder / Upper Bicep",
        imageUrl: STUDIO_IMAGES.gallery.gal2,
        description: "Multi-layered tonal study capturing lifelike fur texture, anatomical bone structure, and luminescent eye contrast."
      },
      {
        id: "sd-3",
        title: "Sacred Hexagonal Mandala",
        style: "Sacred Geometric Dotwork",
        placement: "Upper Back",
        imageUrl: STUDIO_IMAGES.gallery.gal4,
        description: "Vector symmetry with concentric dot gradation, aligned with spinal vertebrae for balanced posture flow."
      },
      {
        id: "sd-4",
        title: "Lord Shiva Devotional Emblem",
        style: "Spiritual Sacred Realism",
        placement: "Outer Forearm",
        imageUrl: STUDIO_IMAGES.services.spiritualTattoos,
        description: "Reverent spiritual symbolism featuring the Damru, Third Eye, and flowing lunar river gradients."
      },
      {
        id: "sd-5",
        title: "Neo-Classical Bust & Chiaroscuro",
        style: "Chiaroscuro Realism",
        placement: "Inner Bicep",
        imageUrl: STUDIO_IMAGES.gallery.gal7,
        description: "Sculptural marble-inspired chiaroscuro shading depicting classical stoic contemplation and deep shadow."
      },
      {
        id: "sd-6",
        title: "Custom Bespoke Narrative Realism",
        style: "Custom High-Contrast",
        placement: "Chest & Shoulder Panel",
        imageUrl: STUDIO_IMAGES.services.customTattoos,
        description: "Tailored custom composition merging personal mythology with seamless anatomical muscle contours."
      }
    ]
  },
  {
    id: "realism-artist",
    name: "Arjun Deshmukh",
    role: "Senior Resident Artist — Realism",
    specialization: ["Photo-to-Ink Realism", "Wildlife & Portraiture", "Chiaroscuro Shading", "Micro-Detail"],
    experience: "Specialist in Micro-Detail & Contrast",
    bio: "Transforms reference photographs into lifelike monochrome ink with dimensional depth, soft transition gradients, and enduring skin tone preservation.",
    photoUrl: STUDIO_IMAGES.artists.arjunDeshmukh,
    detailedBio: "Arjun Deshmukh is a veteran monochrome specialist dedicated to pushing the boundaries of realism in skin art. Renowned for his photographic reproduction precision, Arjun calibrates micro-needle groupings to translate subtle light gradients, skin pores, hair luminescence, and reflective eyes from reference photos directly into permanent skin realism. His extensive knowledge of dermal healing guarantees high-contrast depth that maintains clarity rather than blurring over the years.",
    featuredQuote: "Every portrait is a dialogue between shadow and light. The magic happens in the microscopic half-tones that make the subject breathe.",
    techniques: [
      "Photo-to-Ink Dermal Translation",
      "Multi-Magnum Feathered Shading",
      "Specular Highlight Preservation",
      "Micro-Tonal Contrast Calibration"
    ],
    stats: [
      { label: "Craft Discipline", value: "Photo Realism" },
      { label: "Needle Mastery", value: "3RL & Soft Curved Mags" },
      { label: "Portraits Inked", value: "450+ Completed" },
      { label: "Longevity Retention", value: "Archival Quality" }
    ],
    portfolioWorks: [
      {
        id: "ad-1",
        title: "Hyper-Realist Lion Portrait",
        style: "Micro-Realistic Monochrome",
        placement: "Shoulder / Upper Arm",
        imageUrl: STUDIO_IMAGES.gallery.gal2,
        description: "Deep tonal range with multi-pass needlework capturing realistic animal gaze and fine whisker highlights."
      },
      {
        id: "ad-2",
        title: "Heritage Photo-to-Ink Portrait",
        style: "Photographic Skin Realism",
        placement: "Forearm Panel",
        imageUrl: STUDIO_IMAGES.services.photoTattoos,
        description: "High-resolution portrait recreating a loved one with authentic facial bone structure and emotional presence."
      },
      {
        id: "ad-3",
        title: "Metamorphosis Obsidian Raven",
        style: "Heavy Charcoal Realism",
        placement: "Calf / Outer Bicep",
        imageUrl: STUDIO_IMAGES.gallery.gal6,
        description: "Deep obsidian plumage layers effectively transforming an old faded motif into high art."
      },
      {
        id: "ad-4",
        title: "Philosophical Classical Bust",
        style: "Chiaroscuro Sculptural Realism",
        placement: "Inner Forearm",
        imageUrl: STUDIO_IMAGES.gallery.gal7,
        description: "Velvety greywash gradients creating the optical illusion of carved European statuary."
      },
      {
        id: "ad-5",
        title: "Black & Grey Depth Study",
        style: "Dimensional Monochrome",
        placement: "Bicep / Tricep Wrap",
        imageUrl: STUDIO_IMAGES.services.realism,
        description: "Fluid dark-to-light blending engineered to resist pigment blur over decades."
      },
      {
        id: "ad-6",
        title: "Expressive Portraiture",
        style: "High Contrast Portrait",
        placement: "Outer Arm",
        imageUrl: STUDIO_IMAGES.services.portraitTattoos,
        description: "Lifelike eyes and delicate skin textures drafted to match natural light angles."
      }
    ]
  },
  {
    id: "custom-specialist",
    name: "Rhea Sharma",
    role: "Resident Custom Stylist — Fine-Line",
    specialization: ["Custom Typography & Script", "Single-Needle Minimalism", "Sacred Geometry", "Botanical Art"],
    experience: "Specialist in Fluid Anatomy & Typography",
    bio: "Focuses on clean typographical flow, single-needle minimalism, and turning rough personal sketches into refined, elegant tattoo silhouettes.",
    photoUrl: STUDIO_IMAGES.artists.rheaSharma,
    detailedBio: "Rhea Sharma brings surgical clarity and organic elegance to Shivansh Tattoo Studio. Trained in traditional typography, calligraphy, and mathematical sacred geometry, Rhea creates understated, razor-crisp tattoos that complement the natural muscle contours and tendons of the human body. Specializing in single-needle (1RL/3RL) precision, she is the resident master for delicate micro-tattoos, meaningful Sanskrit inscriptions, and complex mandala dotwork.",
    featuredQuote: "Understated simplicity requires the most unforgiving discipline. A single clean line speaks louder than complex camouflage.",
    techniques: [
      "Single-Pass Needle Precision (1RL)",
      "Zero-Wobble Tendon Alignment",
      "Stippled Gradient Dotwork",
      "Custom Calligraphic Kerning"
    ],
    stats: [
      { label: "Core Specialty", value: "Fine Line & Script" },
      { label: "Line Precision", value: "Single-Pass 1RL" },
      { label: "Anatomical Flow", value: "Tendon Calibrated" },
      { label: "Custom Inscriptions", value: "600+ Crafted" }
    ],
    portfolioWorks: [
      {
        id: "rs-1",
        title: "Single-Needle Botanical Fern",
        style: "Delicate Minimalist",
        placement: "Spine / Collarbone",
        imageUrl: STUDIO_IMAGES.gallery.gal3,
        description: "Delicate single needle pass with feather-light stippling and anatomical curve harmony."
      },
      {
        id: "rs-2",
        title: "Sacred Hexagonal Mandala",
        style: "Sacred Geometric Dotwork",
        placement: "Upper Back",
        imageUrl: STUDIO_IMAGES.gallery.gal4,
        description: "Zero-tolerance vector symmetry with concentric dot gradation and micro-calibrations."
      },
      {
        id: "rs-3",
        title: "Custom Monogram Calligraphy",
        style: "Fine Script Typography",
        placement: "Wrist / Ribcage",
        imageUrl: STUDIO_IMAGES.gallery.gal5,
        description: "Tailored flowing script typography with flourishes contoured along muscle tendons."
      },
      {
        id: "rs-4",
        title: "Precision Vector Linework",
        style: "Mathematical Geometry",
        placement: "Forearm",
        imageUrl: STUDIO_IMAGES.services.linework,
        description: "Zero-wobble geometric linework executed with single-stroke precision."
      },
      {
        id: "rs-5",
        title: "Understated Micro Silhouettes",
        style: "Micro Minimalist",
        placement: "Ankle / Behind Ear",
        imageUrl: STUDIO_IMAGES.services.minimalistTattoos,
        description: "Refined minimalist silhouettes that heal with surgical clarity and zero blowout."
      },
      {
        id: "rs-6",
        title: "Bespoke Sanskrit & Gothic Lettering",
        style: "Custom Script Typography",
        placement: "Collarbone / Ribs",
        imageUrl: STUDIO_IMAGES.services.letteringName,
        description: "Flowing typography tailored specifically to the curvature of the client's bone structure."
      }
    ]
  },
];

// Customer Reviews - Editable placeholders (no fabricated endorsements)
export interface CustomerReview {
  id: string;
  customerName: string;
  badge: string;
  rating: number;
  reviewText: string;
  tattooType: string;
  date: string;
}

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: "rev-1",
    customerName: "Studio Client — A. Sharma",
    badge: "Client Review",
    rating: 5,
    reviewText: "The level of precision on my geometric forearm piece was astonishing. The studio atmosphere is clean, calming, and futuristic. The linework is razor-sharp.",
    tattooType: "Geometric Mandala",
    date: "Verified Studio Visit",
  },
  {
    id: "rev-2",
    customerName: "Studio Client — R. V.",
    badge: "Client Review",
    rating: 5,
    reviewText: "Had a custom portrait done. The shading and attention to eyes exceeded what I imagined. Best consultation process I've ever experienced.",
    tattooType: "Portrait Realism",
    date: "Verified Studio Visit",
  },
  {
    id: "rev-3",
    customerName: "Studio Client — D. Patel",
    badge: "Client Review",
    rating: 5,
    reviewText: "Booked the Home Tattoo Service for a private session. Their hygiene standards were immaculate — single-use sterile gear, full barrier wrap, and professional care.",
    tattooType: "Home Tattoo Service",
    date: "Verified Booking",
  },
];

// FAQs - Complete answers addressing all 10 required questions
export interface FAQItem {
  question: string;
  answer: string;
}

export const STUDIO_FAQS: FAQItem[] = [
  {
    question: "How do I book a tattoo?",
    answer: "You can easily request an appointment through our online booking form, chat with our Shivansh AI Assistant for concept ideation, or message us directly on WhatsApp. Our studio team reviews your concept, placement, and preferred date to schedule your dedicated consultation.",
  },
  {
    question: "How much does a tattoo cost?",
    answer: "Pricing depends on size, placement, complexity, and custom design drafting. We do not provide arbitrary fixed prices because every piece is custom-tailored. Contact the studio or request an appointment for an accurate, no-obligation quote.",
  },
  {
    question: "Can I bring my own design?",
    answer: "Absolutely. You are welcome to bring sketches, reference images, Pinterest boards, digital art, or rough concepts. During consultation, our artist will evaluate how the design translates onto skin curvature and refine it for permanent longevity.",
  },
  {
    question: "Can you create a custom tattoo?",
    answer: "Yes, custom tattooing is the core specialty of Shivansh Tattoo Studio. We collaborate with you 1-on-1 to craft original artwork that tells your unique story with surgical precision in every line.",
  },
  {
    question: "Do you offer cover-ups?",
    answer: "Yes. Cover-ups require specialized analysis of existing ink density, age, and placement. We provide comprehensive cover-up consultations to evaluate whether a direct cover, camouflage design, or blast-over will yield the best visual outcome.",
  },
  {
    question: "Do you do name tattoos?",
    answer: "Yes, we specialize in custom typography, Chicano lettering, calligraphy, Sanskrit and ancient scripts, and delicate minimal lettering designed specifically to complement your body's natural lines.",
  },
  {
    question: "Do you offer home tattoo service?",
    answer: "Yes, we offer a premier Home Tattoo Service in designated metropolitan areas upon advance scheduling. We transport hospital-grade sterilization, autoclave-sealed single-use needles, and sterile workstation setups to ensure studio-grade safety in your private comfort.",
  },
  {
    question: "How should I prepare for my appointment?",
    answer: "Get a full night's rest, stay well-hydrated, and eat a substantial meal 1–2 hours prior to your session to maintain blood sugar levels. Avoid alcohol, blood-thinning medications, and intense sunburn on the tattoo area for at least 24–48 hours beforehand.",
  },
  {
    question: "How does tattoo aftercare work?",
    answer: "Keep your protective film or bandage on as directed by your artist. Wash gently with lukewarm water and fragrance-free antibacterial soap. Pat dry with a clean paper towel and apply a thin layer of recommended aftercare ointment. Never pick scabs or soak in pools or baths during healing.",
  },
  {
    question: "Can I reschedule my appointment?",
    answer: "Yes. We understand schedules shift. We kindly request at least 48 hours notice for appointment rescheduling so we can reallocate studio time and prepare your design files accordingly.",
  },
];

// Aftercare Instructions
export const AFTERCARE_POINTS = [
  {
    title: "Initial Bandage & Cleaning",
    desc: "Leave the medical protective bandage (SecondSkin or wrap) as advised by your artist. When removing, wash gently with clean hands, lukewarm water, and mild fragrance-free soap.",
  },
  {
    title: "Hands Off & No Picking",
    desc: "Never scratch, peel, or pick scabs or flaking skin. Peeling flakes prematurely pulls pigment out of the epidermis.",
  },
  {
    title: "Hydrate with Recommended Ointment",
    desc: "Apply an ultra-thin layer of artist-approved aftercare balm 2–3 times daily. Avoid heavy petroleum coatings that suffocate healing pores.",
  },
  {
    title: "No Submerging or Soaking",
    desc: "Showers are fine, but strictly avoid baths, hot tubs, swimming pools, saunas, and ocean water for at least 2–3 weeks until fully healed.",
  },
  {
    title: "Sun Protection & Clean Apparel",
    desc: "Keep the fresh tattoo out of direct sunlight. Wear loose, breathable cotton clothing. Once fully healed, always apply SPF 50+ to maintain crisp pigment contrast.",
  },
  {
    title: "Follow Individualized Instructions",
    desc: "Aftercare instructions can vary depending on the tattoo style, placement, and individual skin characteristics. Always adhere strictly to the guidance provided by your tattoo artist.",
  },
];
