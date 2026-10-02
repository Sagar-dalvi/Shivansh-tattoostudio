import React, { useState, useMemo, useEffect } from 'react';
import {
  BookOpen,
  Clock,
  User,
  ArrowRight,
  Search,
  Sparkles,
  Share2,
  Check,
  X,
  Calendar,
  MessageCircle,
  ShieldCheck,
  Tag
} from 'lucide-react';
import { STUDIO_IMAGES } from '../images';
import { STUDIO_CONFIG, getWhatsAppLink } from '../studioConfig';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: 'artistry' | 'aftercare' | 'news';
  categoryLabel: string;
  readTime: string;
  publishedDate: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  featuredImage: string;
  isFeatured?: boolean;
  content: {
    introduction: string;
    sections: {
      heading: string;
      paragraphs: string[];
      highlightBox?: string;
    }[];
    takeaways: string[];
  };
  relatedService?: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'The Science of Needle Depths: Why Precision in the Dermis Dictates Longevity',
    slug: 'science-of-needle-depths-dermis-precision',
    category: 'artistry',
    categoryLabel: 'Tattoo Artistry',
    readTime: '6 min read',
    publishedDate: 'September 2026',
    isFeatured: true,
    author: {
      name: 'Sagar Dalvi',
      role: 'Founder & CEO',
      avatar: STUDIO_IMAGES.artists.sagarDalvi,
    },
    featuredImage: STUDIO_IMAGES.services.linework,
    relatedService: 'Linework & Geometric',
    excerpt:
      'A tattoo is an intimate biological collaboration. Discover the exact 1.5mm to 2.0mm dermal threshold that separates razor-sharp longevity from premature pigment blowout.',
    content: {
      introduction:
        'Every line inked into human skin is governed by microscopic anatomical physics. The human skin is composed of three primary layers: the epidermis, the dermis, and the subcutaneous hypodermis. For a tattoo to remain crisp, contrasted, and vibrant for decades, pigment must be deposited with surgical calibration into the upper third of the dermis.',
      sections: [
        {
          heading: 'The 1.5mm Dermal Target Window',
          paragraphs: [
            'If a needle penetrates too shallowly (only reaching the epidermis), the pigment will slough off within four to six weeks as the skin undergoes its natural 28-day cellular turnover cycle. The result is a patchy, faded phantom mark.',
            'Conversely, if an artist drives the needle too deep into the subcutaneous fatty tissue, the ink particles encounter lipid cells and blood vessels. This triggers what the industry calls "blowout"—an uncontrollable halo of ink migration that blurs the crispness of the design permanently.',
          ],
          highlightBox:
            'At Shivansh Tattoo Studio, our rotary machines are calibrated with micro-voltage regulators to maintain uniform stroke depth regardless of muscle flexion.',
        },
        {
          heading: 'Skin Resistance Across Varied Anatomy',
          paragraphs: [
            'Human skin thickness varies significantly across the body. The forearm offers consistent resistance with a firm muscle bed, while the inner bicep, ribs, and collarbone present thin, elastic tissue over bone.',
            'Precision tattooing requires tactile biofeedback: the artist must sense the resistance of the stratum corneum through the handpiece and adjust needle angle, hand speed, and stroke depth dynamically on every pass.',
          ],
        },
        {
          heading: 'Needle Cartridge Quality & Fluid Dynamics',
          paragraphs: [
            'We use exclusively single-use, autoclave-sterilized membrane cartridges. The internal silicone membrane prevents ink backflow into the machine housing while providing stable lateral needle tension. This eliminates micro-wobble, ensuring that a 3RL (3-Round Liner) creates a single, continuous line without microscopic chatter marks.',
          ],
        },
      ],
      takeaways: [
        'Dermis depth must remain strictly between 1.5mm and 2.0mm for archival ink stability.',
        'Anatomical zones differ in dermal density, requiring real-time voltage and hand speed adjustments.',
        'High-grade safety membrane cartridges prevent micro-vibration, ensuring surgical line clarity.',
      ],
    },
  },
  {
    id: 'post-2',
    title: 'SecondSkin vs. Classic Cling Wrap: The Modern Healing Protocol',
    slug: 'secondskin-vs-clingwrap-modern-aftercare',
    category: 'aftercare',
    categoryLabel: 'Aftercare Tips',
    readTime: '5 min read',
    publishedDate: 'September 2026',
    author: {
      name: 'Rhea Sharma',
      role: 'Resident Custom Stylist',
      avatar: STUDIO_IMAGES.artists.rheaSharma,
    },
    featuredImage: STUDIO_IMAGES.services.homeService,
    relatedService: 'Home Tattoo Service',
    excerpt:
      'Medical-grade polyurethane barrier films have revolutionized the recovery process. Learn how semi-permeable membranes protect fresh pigment while allowing skin respiration.',
    content: {
      introduction:
        'For decades, standard practice was to wrap fresh tattoos in household food-grade cling film. While cling film protects fresh skin against initial contact contamination during transit, it creates an anaerobic greenhouse effect that traps sweat, bacteria, and excess plasma. The modern standard is breathable, medical-grade polyurethane barrier film (SecondSkin / DermShield).',
      sections: [
        {
          heading: 'How Semi-Permeable Membranes Work',
          paragraphs: [
            'Medical barrier films feature microscopic pores that are permeable to oxygen and water vapor, yet completely impenetrable to water droplets, dirt, and opportunistic pathogens.',
            'This allows your skin to "breathe" while staying sealed inside its own natural healing serum—the plasma and lymphatic fluid that contains vital growth factors and white blood cells.',
          ],
          highlightBox:
            'A fluid bubble ("ink sack") forming beneath your barrier film is completely normal. It is your body’s natural sterile cocktail accelerating tissue regeneration.',
        },
        {
          heading: 'When to Remove the Film',
          paragraphs: [
            'Leave the initial film on for 24 to 72 hours, as advised during your studio session. If the seal breaks and external fluid enters or leaks out, the barrier is compromised and should be gently removed under warm running water.',
            'Peel the film downward in the direction of hair growth rather than pulling outward. Wash gently with a fragrance-free antibacterial wash and pat dry with clean paper towels.',
          ],
        },
      ],
      takeaways: [
        'Semi-permeable film prevents scabbing and friction while allowing oxygen exchange.',
        'Never submerge fresh tattoos in baths, swimming pools, or hot tubs during the first 3 weeks.',
        'Apply an ultra-thin layer of artist-approved balm twice daily once the film is removed.',
      ],
    },
  },
  {
    id: 'post-3',
    title: 'Sacred Geometry & Spiritual Inks: Aligning Mandalas with Bone Architecture',
    slug: 'sacred-geometry-aligning-mandalas-bone-architecture',
    category: 'artistry',
    categoryLabel: 'Tattoo Artistry',
    readTime: '7 min read',
    publishedDate: 'September 2026',
    author: {
      name: 'Sagar Dalvi',
      role: 'Founder & CEO',
      avatar: STUDIO_IMAGES.artists.sagarDalvi,
    },
    featuredImage: STUDIO_IMAGES.gallery.gal4,
    relatedService: 'Spiritual Tattoos',
    excerpt:
      'Why sacred geometry tattoos must be engineered in 3D around natural body posture, spine symmetry, and muscular tension vectors.',
    content: {
      introduction:
        'Sacred geometry is more than mathematical patterns on a screen; it is the visual language of cosmic order. When designing mandalas, Sri Yantras, and fractal geometry for human skin, flat 2D templates fail unless calibrated to the client’s anatomical posture.',
      sections: [
        {
          heading: 'The Dynamic Canvas: Skeletal Alignment',
          paragraphs: [
            'The human body is never flat or static. If an artist stencils a circular mandala with the client seated slumped, the design will distort into an uneven oval the moment they stand upright.',
            'At Shivansh Tattoo Studio, stenciling for sacred geometry is always performed while standing in a neutral anatomical posture. We mark central plumb lines referencing the spinal cord, scapula bones, or forearm radius before locking the stencil.',
          ],
          highlightBox:
            'Zero-tolerance geometry demands exact dotwork stippling where every dot spacing remains consistent regardless of skin stretch.',
        },
        {
          heading: 'Symbology of the Trishul & Lotus',
          paragraphs: [
            'Our spiritual compositions frequently incorporate Lord Shiva motifs—the Trishul representing will, action, and knowledge, complemented by sacred lotus petals symbolizing purity transcending earthly challenges.',
            'These elements require deep tonal contrast: stark black linework balanced by feathered greywash to give the sacred symbol weight and reverence.',
          ],
        },
      ],
      takeaways: [
        'Always verify geometric stencil alignment while standing in a relaxed neutral posture.',
        'Concentric dotwork gradations create three-dimensional optical depth that resists aging.',
        'Spiritual tattoos demand respectful design consultations and anatomical harmony.',
      ],
    },
  },
  {
    id: 'post-4',
    title: 'Photo-to-Ink: How Micro-Gradations Preserve Lifelike Eyes in Monochrome',
    slug: 'photo-to-ink-micro-gradations-eyes-monochrome',
    category: 'artistry',
    categoryLabel: 'Tattoo Artistry',
    readTime: '6 min read',
    publishedDate: 'August 2026',
    author: {
      name: 'Arjun Deshmukh',
      role: 'Senior Realism Specialist',
      avatar: STUDIO_IMAGES.artists.arjunDeshmukh,
    },
    featuredImage: STUDIO_IMAGES.services.photoTattoos,
    relatedService: 'Photo Tattoos (Photo-to-Ink)',
    excerpt:
      'Capturing the soul in a portrait tattoo depends entirely on specular highlights, iris striations, and tonal contrast that will not fade into a grey blur.',
    content: {
      introduction:
        'Translating a family photograph or historical icon into permanent skin realism is among the most demanding disciplines in modern tattooing. There are no outlines in nature—only values of light, shadow, and edge transitions.',
      sections: [
        {
          heading: 'The Soul of the Portrait: The Iris & Catchlight',
          paragraphs: [
            'When looking at a portrait tattoo, the viewer’s eye immediately locks onto the gaze. If the eyes lack depth or specular reflection, the portrait feels lifeless. An experienced realism artist uses microscopic contrasts—leaving bare skin untouched to act as natural white catchlights, surrounded by velvety charcoal depths.',
          ],
          highlightBox:
            'Never outline an eye with a hard contour line. Photorealistic eyes are defined purely by subtle lid fold shadows, tear duct moisture values, and iris striations.',
        },
        {
          heading: 'Greywash Dilution Ratios',
          paragraphs: [
            'We prepare custom greywash dipping systems with five distinct dilution tiers: from a feather-light 10% tone for subtle forehead skin planes, up to 100% pure carbon black for deep pupil darkness. This prevents the "muddying" effect that occurs when artists use premixed mid-tones indiscriminately.',
          ],
        },
      ],
      takeaways: [
        'Photorealism relies strictly on value transitions rather than artificial black outlines.',
        'White catchlights and dermal negative space give life and luminescence to the eyes.',
        'High-resolution reference photos with dramatic directional lighting yield superior tattoo results.',
      ],
    },
  },
  {
    id: 'post-5',
    title: 'Sun Protection & Ink Preservation: Why SPF 50+ is Your Tattoo’s Lifeline',
    slug: 'sun-protection-ink-preservation-spf-guide',
    category: 'aftercare',
    categoryLabel: 'Aftercare Tips',
    readTime: '4 min read',
    publishedDate: 'August 2026',
    author: {
      name: 'Rhea Sharma',
      role: 'Resident Custom Stylist',
      avatar: STUDIO_IMAGES.artists.rheaSharma,
    },
    featuredImage: STUDIO_IMAGES.gallery.gal3,
    relatedService: 'Minimalist Tattoos',
    excerpt:
      'Ultraviolet radiation breaks down pigment molecules like a slow laser. Learn how proactive sun defense keeps fine lines razor-sharp year after year.',
    content: {
      introduction:
        'Once your tattoo is completely healed (typically after 3 to 4 weeks), the greatest ongoing threat to its crispness and contrast is ultraviolet (UV) radiation from sunlight. Understanding photolysis will help you protect your investment.',
      sections: [
        {
          heading: 'How UV Radiation Disassembles Pigment',
          paragraphs: [
            'Tattoo ink consists of pigment clusters suspended inside macrophage cells within the dermis. Ultraviolet A and B rays penetrate deeply into the skin, exciting the molecular bonds within the pigment. Over time, UV light breaks large ink clusters into microscopic fragments that the lymphatic system slowly absorbs and carries away.',
            'This causes linework to lose its contrast, fine script to fade, and dark charcoal washes to turn into an indistinct greenish-grey hue.',
          ],
          highlightBox:
            'A broad-spectrum mineral sunscreen (Zinc Oxide / Titanium Dioxide) with SPF 50+ forms a physical shield reflecting UV radiation away from the epidermis.',
        },
        {
          heading: 'Daily Maintenance Rituals',
          paragraphs: [
            'Keep your healed tattoo hydrated with a ceramide-rich lotion. Dry, ashen skin diffuses light and makes even the freshest ink appear muted. Applying moisturizer followed by SPF 50+ restores contrast and richness in seconds.',
          ],
        },
      ],
      takeaways: [
        'Never apply sunscreen on a fresh, healing tattoo—use physical fabric coverage instead.',
        'On fully healed tattoos, apply SPF 50+ broad-spectrum sunscreen every 2 hours when outdoors.',
        'Hydrated skin acts like a clear optic lens, allowing true pigment contrast to shine through.',
      ],
    },
  },
  {
    id: 'post-6',
    title: 'Shivansh Studio News: Mobile Autoclave Upgrade for Home Tattoo Services',
    slug: 'shivansh-studio-news-mobile-autoclave-home-service',
    category: 'news',
    categoryLabel: 'Studio News',
    readTime: '4 min read',
    publishedDate: 'July 2026',
    author: {
      name: 'Sagar Dalvi',
      role: 'Founder & CEO',
      avatar: STUDIO_IMAGES.artists.sagarDalvi,
    },
    featuredImage: STUDIO_IMAGES.services.coverUp,
    relatedService: 'Home Tattoo Service',
    excerpt:
      'We have invested in portable Class-B medical autoclave equipment to guarantee hospital-grade barrier sterilization during private residence appointments.',
    content: {
      introduction:
        'Client comfort and safety have always been the twin pillars of Shivansh Tattoo Studio. As demand for our premier Home Tattoo Service expands across Dhule and the Mumbai - Agra Highway corridor, we have upgraded our mobile infrastructure with hospital-grade sterilization units.',
      sections: [
        {
          heading: 'Bringing the Surgical Studio to Your Home',
          paragraphs: [
            'Having a tattoo done in the comfort of your private residence should never compromise safety. Our mobile operational kit now includes portable Class-B vacuum autoclaves, disposable surgical barrier draping for furniture, and medical-grade surface disinfectants (CaviCide).',
            'Every needle, cartridge, and ink cup remains factory blister-sealed until opened in your presence.',
          ],
          highlightBox:
            'Home appointments are conducted with the exact same hygienic scrutiny as our flagship studio.',
        },
        {
          heading: 'Booking Guidelines for Private Sessions',
          paragraphs: [
            'Home sessions are scheduled at least 48 to 72 hours in advance to allow for custom digital stencil drafting, anatomy flow calibration, and mobile dispatch logistics.',
          ],
        },
      ],
      takeaways: [
        'Full medical-grade hygiene standards maintained on all mobile home visits.',
        '100% single-use disposable barrier wrap and sterile needle cartridges.',
        'Advance consultation guarantees personalized stencil preparation before the artist arrives.',
      ],
    },
  },
];

interface BlogSectionProps {
  onOpenBookingWithService?: (serviceName: string) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onOpenBookingWithService }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'artistry' | 'aftercare' | 'news'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalPost, setActiveModalPost] = useState<BlogPost | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModalPost(null);
      }
    };
    if (activeModalPost) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [activeModalPost]);

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.author.name.toLowerCase().includes(query) ||
        post.categoryLabel.toLowerCase().includes(query);

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  const featuredPost = useMemo(() => {
    return BLOG_POSTS.find((p) => p.isFeatured) || BLOG_POSTS[0];
  }, []);

  const handleShareArticle = (post: BlogPost) => {
    const shareUrl = `${window.location.origin}/#blog?article=${post.slug}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2200);
    }
  };

  const handleBookFromBlog = (serviceName?: string) => {
    setActiveModalPost(null);
    if (onOpenBookingWithService && serviceName) {
      onOpenBookingWithService(serviceName);
    } else {
      const bookEl = document.getElementById('book');
      if (bookEl) bookEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="blog" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0512] relative overflow-hidden">
      {/* Ambient neon backlights */}
      <div className="absolute top-1/3 -left-40 w-96 h-96 rounded-full bg-[#ea7af4]/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 rounded-full bg-purple-900/15 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.25em] text-[#ea7af4] font-semibold mb-3">
            <BookOpen className="w-3.5 h-3.5 text-[#ea7af4]" />
            <span>Studio Journal & Insights</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            STUDIO BLOG
          </h2>

          <p className="mt-4 text-zinc-400 text-sm sm:text-base font-light leading-relaxed">
            In-depth guides on tattoo needle dynamics, dermal healing science, sacred symbolism,
            and the latest craft updates from the Shivansh Tattoo Studio team.
          </p>

          <div className="flex items-center justify-center gap-4 mt-4 text-xs text-zinc-500 font-light">
            <span>Precision Artistry</span>
            <span aria-hidden="true">·</span>
            <span>Medical Aftercare Protocols</span>
            <span aria-hidden="true">·</span>
            <span>Studio Dispatches</span>
          </div>
        </div>

        {/* Filter Controls & Search Bar (Glassy Segmented Bar) */}
        <div className="mb-10 p-2 sm:p-3 rounded-2xl bg-[#140b1e]/80 backdrop-blur-md border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.6)] flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Segmented Category Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-gradient-to-r from-[#ea7af4] to-[#d946ef] text-white shadow-[0_0_15px_rgba(234,122,244,0.35)]'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              All Articles
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('artistry')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === 'artistry'
                  ? 'bg-gradient-to-r from-[#ea7af4] to-[#d946ef] text-white shadow-[0_0_15px_rgba(234,122,244,0.35)]'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Tattoo Artistry
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('aftercare')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === 'aftercare'
                  ? 'bg-gradient-to-r from-[#ea7af4] to-[#d946ef] text-white shadow-[0_0_15px_rgba(234,122,244,0.35)]'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Aftercare Tips
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('news')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === 'news'
                  ? 'bg-gradient-to-r from-[#ea7af4] to-[#d946ef] text-white shadow-[0_0_15px_rgba(234,122,244,0.35)]'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Studio News
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides, topics, authors..."
              className="w-full bg-[#1c102a] text-white text-xs pl-9 pr-8 py-2 rounded-xl border border-white/10 focus:outline-none focus:border-[#ea7af4] focus:ring-1 focus:ring-[#ea7af4] transition-all placeholder:text-zinc-500"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Featured Editorial Banner (Shown when viewing "all" or matching query) */}
        {activeCategory === 'all' && !searchQuery && (
          <div
            onClick={() => setActiveModalPost(featuredPost)}
            className="mb-12 group rounded-2xl bg-gradient-to-br from-[#160d22]/90 via-[#12081d]/80 to-[#0e0617]/90 backdrop-blur-md border border-[#ea7af4]/30 hover:border-[#ea7af4]/60 p-6 sm:p-8 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] cursor-pointer transition-all duration-300 relative overflow-hidden"
          >
            {/* Ambient corner glow */}
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#ea7af4]/10 blur-[90px] pointer-events-none group-hover:bg-[#ea7af4]/20 transition-colors" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              {/* Image Side (5 cols) */}
              <div className="lg:col-span-5 aspect-[16/10] lg:aspect-[4/3] rounded-xl overflow-hidden border border-white/10 bg-zinc-950 relative shadow-2xl">
                <img
                  src={featuredPost.featuredImage}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60" />
              </div>

              {/* Text Content (7 cols) */}
              <div className="lg:col-span-7 space-y-4">
                {/* Clean unboxed metadata */}
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <span className="text-[#ea7af4] font-semibold">{featuredPost.categoryLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span>{featuredPost.readTime}</span>
                  <span aria-hidden="true">·</span>
                  <span>{featuredPost.publishedDate}</span>
                </div>

                <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight group-hover:text-[#ea7af4] transition-colors leading-snug">
                  {featuredPost.title}
                </h3>

                <p className="text-zinc-300 text-xs sm:text-sm font-light leading-relaxed line-clamp-3">
                  {featuredPost.excerpt}
                </p>

                {/* Author Info & CTA */}
                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={featuredPost.author.avatar}
                      alt={featuredPost.author.name}
                      className="w-9 h-9 rounded-full object-cover border border-[#ea7af4]/40"
                    />
                    <div>
                      <div className="text-xs font-bold text-white">
                        {featuredPost.author.name}
                      </div>
                      <div className="text-[11px] text-zinc-400">
                        {featuredPost.author.role}
                      </div>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#ea7af4] group-hover:translate-x-1 transition-transform">
                    <span>Read Full Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                onClick={() => setActiveModalPost(post)}
                className="group rounded-2xl bg-[#140b1e]/75 backdrop-blur-md border border-white/10 hover:border-[#ea7af4]/40 overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.7)] flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  {/* Card Thumbnail */}
                  <div className="aspect-[16/10] overflow-hidden bg-zinc-950 relative">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#140b1e] via-transparent to-transparent opacity-80" />
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    {/* Unboxed Metadata */}
                    <div className="flex items-center gap-2 text-[11px] text-zinc-400 mb-2">
                      <span className="text-[#ea7af4] font-medium">{post.categoryLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h4 className="text-base sm:text-lg font-bold text-white tracking-wide group-hover:text-[#ea7af4] transition-colors leading-snug line-clamp-2">
                      {post.title}
                    </h4>

                    <p className="mt-2.5 text-xs text-zinc-300 font-light leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-6 pb-6 pt-3 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-6 h-6 rounded-full object-cover border border-white/20"
                    />
                    <span className="text-xs text-zinc-300 font-medium truncate max-w-[120px]">
                      {post.author.name}
                    </span>
                  </div>

                  <span className="text-xs font-semibold text-[#ea7af4] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Read</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-2xl bg-[#140b1e]/50 border border-white/10">
            <Search className="w-8 h-8 text-zinc-500 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white">No articles found</h3>
            <p className="text-xs text-zinc-400 mt-1">
              Try a different keyword or reset the category filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#ea7af4] hover:bg-white/5 rounded-lg border border-[#ea7af4]/30"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Full Article Reader Modal Window */}
      {activeModalPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
          {/* Frosted Dark Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
            onClick={() => setActiveModalPost(null)}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <div
            className="relative w-full max-w-4xl my-auto bg-[#120a1b] border border-[#ea7af4]/30 rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.95)] overflow-hidden z-10 animate-fade-in flex flex-col max-h-[92vh]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="blog-modal-title"
          >
            {/* Top Pink Line Accent */}
            <div className="h-1 bg-gradient-to-r from-transparent via-[#ea7af4] to-transparent shrink-0" />

            {/* Modal Header Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#160d22]/90 backdrop-blur shrink-0">
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <span className="text-[#ea7af4] font-semibold">{activeModalPost.categoryLabel}</span>
                <span aria-hidden="true">·</span>
                <span>{activeModalPost.readTime}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleShareArticle(activeModalPost)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white text-xs font-medium flex items-center gap-1.5 border border-white/10 transition-colors"
                  title="Copy link to article"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Link Copied</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveModalPost(null)}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white flex items-center justify-center transition-colors border border-white/10"
                  aria-label="Close article modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Article Content - Scrollable */}
            <div className="overflow-y-auto p-6 sm:p-8 space-y-8 custom-scrollbar">
              {/* Header Info */}
              <div className="space-y-4">
                <h2
                  id="blog-modal-title"
                  className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight"
                >
                  {activeModalPost.title}
                </h2>

                {/* Author Card Bar */}
                <div className="flex items-center justify-between flex-wrap gap-4 pt-2 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <img
                      src={activeModalPost.author.avatar}
                      alt={activeModalPost.author.name}
                      className="w-10 h-10 rounded-full object-cover border border-[#ea7af4]/40"
                    />
                    <div>
                      <div className="text-sm font-bold text-white">
                        {activeModalPost.author.name}
                      </div>
                      <div className="text-xs text-zinc-400">
                        {activeModalPost.author.role} · Shivansh Tattoo Studio
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-zinc-400 font-mono">
                    Published {activeModalPost.publishedDate}
                  </div>
                </div>
              </div>

              {/* Banner Image */}
              <div className="aspect-[16/9] sm:aspect-[21/9] rounded-xl overflow-hidden border border-white/10 bg-zinc-950 shadow-xl">
                <img
                  src={activeModalPost.featuredImage}
                  alt={activeModalPost.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Introduction Text */}
              <div className="text-sm sm:text-base text-zinc-200 leading-relaxed font-light border-l-2 border-[#ea7af4] pl-4 italic">
                {activeModalPost.content.introduction}
              </div>

              {/* Body Sections */}
              <div className="space-y-8 text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
                {activeModalPost.content.sections.map((section, idx) => (
                  <div key={idx} className="space-y-3.5">
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
                      {section.heading}
                    </h3>

                    {section.paragraphs.map((para, pIdx) => (
                      <p key={pIdx}>{para}</p>
                    ))}

                    {section.highlightBox && (
                      <div className="my-4 p-4 rounded-xl bg-gradient-to-r from-[#ea7af4]/10 via-purple-900/15 to-transparent border border-[#ea7af4]/30 text-white font-medium text-xs leading-relaxed flex items-start gap-2.5">
                        <Sparkles className="w-4 h-4 text-[#ea7af4] shrink-0 mt-0.5" />
                        <span>{section.highlightBox}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Key Takeaways Card */}
              {activeModalPost.content.takeaways && (
                <div className="p-5 sm:p-6 rounded-xl bg-black/40 border border-white/10 space-y-3">
                  <div className="text-xs uppercase font-bold tracking-wider text-[#ea7af4] flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Essential Takeaways</span>
                  </div>

                  <ul className="space-y-2 text-xs text-zinc-300 font-light">
                    {activeModalPost.content.takeaways.map((item, tIdx) => (
                      <li key={tIdx} className="flex items-start gap-2">
                        <span className="text-[#ea7af4] font-bold">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Modal Bottom Bar */}
            <div className="px-6 sm:px-8 py-4 bg-[#160d22] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <div className="text-xs text-zinc-400">
                Ready to bring your custom tattoo narrative to life?
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href={getWhatsAppLink('general', `Hi Shivansh Tattoo Studio, I read your article "${activeModalPost.title}" and would like to consult about this.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none py-2.5 px-4 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Ask on WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={() => handleBookFromBlog(activeModalPost.relatedService)}
                  className="flex-1 sm:flex-none py-2.5 px-5 rounded-xl bg-gradient-to-r from-[#ea7af4] via-[#d946ef] to-[#c084fc] hover:opacity-95 text-white text-xs font-bold uppercase tracking-[0.14em] shadow-[0_0_15px_rgba(234,122,244,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Consultation</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
