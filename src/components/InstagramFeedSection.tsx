import React, { useState } from 'react';
import {
  Instagram,
  Heart,
  MessageCircle,
  Share2,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Bookmark,
  Play,
  Layers,
  ArrowUpRight,
  X,
  Compass,
  Calendar
} from 'lucide-react';
import { STUDIO_CONFIG } from '../studioConfig';
import { STUDIO_IMAGES } from '../images';

export interface InstagramPost {
  id: string;
  imageUrl: string;
  category: 'all' | 'spiritual' | 'minimal' | 'realism' | 'geometric' | 'reels';
  type: 'photo' | 'carousel' | 'reel';
  likes: number;
  commentsCount: number;
  caption: string;
  tags: string[];
  date: string;
  artist: string;
  style: string;
}

const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: 'post-1',
    imageUrl: STUDIO_IMAGES.instagram.post1,
    category: 'spiritual',
    type: 'carousel',
    likes: 1248,
    commentsCount: 89,
    caption: 'Sacred Mahadev Trident & Damru composition freshly finished at our Dhule studio. Precision shading meets spiritual devotion.',
    tags: ['#SpiritualTattoo', '#MahadevTattoo', '#TridentTattoo', '#DhuleTattoo', '#ShivanshStudio'],
    date: '3 hours ago',
    artist: 'Senior Tattooist',
    style: 'Spiritual Fine-Shading',
  },
  {
    id: 'post-2',
    imageUrl: STUDIO_IMAGES.instagram.post2,
    category: 'realism',
    type: 'photo',
    likes: 2140,
    commentsCount: 142,
    caption: 'Charcoal tiger realism sleeve pass. Focused on deep contrast, whiskers micro-needle detailing, and seamless anatomical wrap.',
    tags: ['#BlackAndGrey', '#RealismTattoo', '#TigerTattoo', '#CustomTattooArt', '#PrecisionInk'],
    date: 'Yesterday',
    artist: 'Lead Realism Artist',
    style: 'Black & Grey Realism',
  },
  {
    id: 'post-3',
    imageUrl: STUDIO_IMAGES.instagram.post3,
    category: 'minimal',
    type: 'photo',
    likes: 980,
    commentsCount: 47,
    caption: 'Whisper-fine single needle botanical fern on collarbone. 0.20mm needle cartridge for timeless elegance and rapid healing.',
    tags: ['#SingleNeedle', '#MinimalistTattoo', '#BotanicalTattoo', '#FineLineTattoo', '#MicroTattoo'],
    date: '2 days ago',
    artist: 'Fine-Line Specialist',
    style: 'Single-Needle Minimal',
  },
  {
    id: 'post-4',
    imageUrl: STUDIO_IMAGES.instagram.post4,
    category: 'geometric',
    type: 'carousel',
    likes: 1870,
    commentsCount: 95,
    caption: 'Sacred geometry mandala backpiece. Zero-tolerance symmetry, stippled gradient rings, and razor-sharp perimeter lines.',
    tags: ['#MandalaTattoo', '#SacredGeometry', '#DotworkTattoo', '#GeometricInk', '#Symmetry'],
    date: '3 days ago',
    artist: 'Mandala Master',
    style: 'Sacred Geometric Dotwork',
  },
  {
    id: 'post-5',
    imageUrl: STUDIO_IMAGES.instagram.post5,
    category: 'reels',
    type: 'reel',
    likes: 3410,
    commentsCount: 210,
    caption: 'Stencil peel to final wipe down: Watch the full hyper-detailed process of this custom chest emblem! Sound on 🔊',
    tags: ['#TattooProcess', '#TattooReel', '#StencilPeel', '#StudioLife', '#DhuleArtist'],
    date: '4 days ago',
    artist: 'Shivansh Crew',
    style: 'Process & Stencil Reel',
  },
  {
    id: 'post-6',
    imageUrl: STUDIO_IMAGES.instagram.post6,
    category: 'minimal',
    type: 'photo',
    likes: 830,
    commentsCount: 38,
    caption: 'Custom Sanskrit typography calligraphy on forearm. Hand-drawn lettering shaped specifically to client forearm motion.',
    tags: ['#SanskritTattoo', '#CalligraphyTattoo', '#ScriptTattoo', '#Lettering', '#CustomInking'],
    date: '5 days ago',
    artist: 'Typography Artist',
    style: 'Custom Script Typography',
  },
  {
    id: 'post-7',
    imageUrl: STUDIO_IMAGES.instagram.post7,
    category: 'realism',
    type: 'carousel',
    likes: 1650,
    commentsCount: 78,
    caption: 'Classical marble portrait with chiaroscuro lighting. Layered greys that age gracefully into the skin matrix.',
    tags: ['#PortraitTattoo', '#ClassicalArt', '#SculptureTattoo', '#ShadingArt', '#MonochromeInk'],
    date: '6 days ago',
    artist: 'Lead Realism Artist',
    style: 'Chiaroscuro Portrait',
  },
  {
    id: 'post-8',
    imageUrl: STUDIO_IMAGES.instagram.post8,
    category: 'spiritual',
    type: 'photo',
    likes: 2290,
    commentsCount: 163,
    caption: 'Omkara & Lotus sacred awakening talisman. Healing journey tattoo inked with hospital-grade sterile protocols.',
    tags: ['#OmTattoo', '#LotusTattoo', '#SacredArt', '#SpiritualInk', '#DhuleStudio'],
    date: '1 week ago',
    artist: 'Senior Tattooist',
    style: 'Devotional Fine-Line',
  },
];

interface InstagramFeedSectionProps {
  onSelectPostForBooking?: (serviceType?: string, description?: string) => void;
}

export const InstagramFeedSection: React.FC<InstagramFeedSectionProps> = ({
  onSelectPostForBooking,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'spiritual' | 'minimal' | 'realism' | 'geometric' | 'reels'>('all');
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null);
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Record<string, boolean>>({});

  const filterTabs = [
    { id: 'all', label: 'All Portfolio' },
    { id: 'spiritual', label: 'Spiritual & Devotional' },
    { id: 'realism', label: 'Realism & Portraits' },
    { id: 'minimal', label: 'Single-Needle Minimal' },
    { id: 'geometric', label: 'Sacred Geometry' },
    { id: 'reels', label: 'Reels & Process' },
  ] as const;

  const filteredPosts = activeFilter === 'all'
    ? INSTAGRAM_POSTS
    : INSTAGRAM_POSTS.filter((post) => post.category === activeFilter);

  const toggleLike = (e: React.MouseEvent, postId: string) => {
    e.stopPropagation();
    setLikedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const toggleBookmark = (e: React.MouseEvent, postId: string) => {
    e.stopPropagation();
    setBookmarkedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleBookFromPost = (post: InstagramPost) => {
    if (onSelectPostForBooking) {
      onSelectPostForBooking(
        post.style,
        `Instagram Portfolio Reference: ${post.caption.slice(0, 100)}... (Style: ${post.style})`
      );
    } else {
      const el = document.getElementById('book');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setSelectedPost(null);
  };

  return (
    <section id="instagram-feed" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0c0714] relative overflow-hidden border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-[#ea7af4]/10 via-[#ee2a7b]/10 to-[#6228d7]/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#ea7af4] font-semibold mb-2">
              <Instagram className="w-3.5 h-3.5 text-[#ea7af4]" />
              <span>Live Social Archive</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              LATEST FROM OUR{' '}
              <span className="bg-gradient-to-r from-[#ea7af4] via-fuchsia-300 to-[#c084fc] bg-clip-text text-transparent">
                INSTAGRAM FEED
              </span>
            </h2>
            <p className="mt-3 text-zinc-400 text-sm sm:text-base font-light max-w-2xl">
              Fresh needle passes, healed client showcases, stencils, and behind-the-scenes artistry direct from our Dhule studio floor.
            </p>
          </div>

          {/* Follow Us Button (Primary Trigger for External Link) */}
          <div className="mt-6 md:mt-0 flex items-center gap-3">
            <a
              href={STUDIO_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:brightness-110 active:scale-[0.98] text-white text-xs sm:text-sm font-bold uppercase tracking-[0.16em] shadow-[0_0_25px_rgba(253,29,29,0.35)] transition-all"
            >
              <Instagram className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span>FOLLOW US</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* Dynamic Studio Profile Glass Banner */}
        <div className="mb-10 p-5 sm:p-6 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            {/* Profile Info */}
            <div className="flex items-center gap-4">
              {/* Avatar with authentic Instagram story gradient ring */}
              <div className="relative p-[2.5px] rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex-shrink-0 shadow-[0_0_15px_rgba(238,42,123,0.4)]">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#0c0714] p-1.5 flex items-center justify-center overflow-hidden">
                  <img
                    src={STUDIO_CONFIG.logoUrl}
                    alt={STUDIO_CONFIG.studioName}
                    className="w-full h-full object-contain filter drop-shadow-[0_0_6px_rgba(234,122,244,0.6)]"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
                    shivanshtattoostudio
                  </h3>
                  <CheckCircle2 className="w-4 h-4 text-sky-400 fill-sky-400/20" />
                  <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] uppercase font-semibold bg-white/10 text-zinc-300">
                    Official Studio
                  </span>
                </div>
                <p className="text-xs text-zinc-300 font-light mt-0.5">
                  Shivansh Tattoo Studio • Avdhan Fata, Mumbai - Agra Highway, Dhule
                </p>
                <div className="flex items-center gap-4 mt-2 text-xs text-zinc-400">
                  <span><strong className="text-white font-semibold">348</strong> posts</span>
                  <span><strong className="text-white font-semibold">15.6K</strong> followers</span>
                  <span><strong className="text-white font-semibold">112</strong> following</span>
                </div>
              </div>
            </div>

            {/* Quick External Actions */}
            <div className="flex flex-wrap items-center gap-2.5 sm:self-center">
              <a
                href={STUDIO_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-semibold text-white transition-colors flex items-center gap-1.5"
              >
                <span>View Instagram Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={`https://ig.me/m/shivanshtattoostudio`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-[#ea7af4]/15 hover:bg-[#ea7af4]/25 border border-[#ea7af4]/30 text-xs font-semibold text-[#ea7af4] transition-colors flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>DM on Instagram</span>
              </a>
            </div>
          </div>
        </div>

        {/* Dynamic Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#ea7af4] text-black shadow-[0_0_15px_rgba(234,122,244,0.4)]'
                    : 'bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/5 hover:border-white/15'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Dynamic Instagram Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredPosts.map((post) => {
            const isLiked = likedPosts[post.id];
            const currentLikes = post.likes + (isLiked ? 1 : 0);
            const isBookmarked = bookmarkedPosts[post.id];

            return (
              <div
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="group relative aspect-square rounded-2xl overflow-hidden bg-black/40 border border-white/10 hover:border-[#ea7af4] transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[0_10px_30px_rgba(234,122,244,0.2)]"
              >
                {/* Photo */}
                <img
                  src={post.imageUrl}
                  alt={post.caption}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-105"
                />

                {/* Media Type Badge (Reel / Carousel) */}
                <div className="absolute top-3 right-3 z-10">
                  {post.type === 'reel' && (
                    <span className="p-1.5 rounded-lg bg-black/70 backdrop-blur text-white flex items-center justify-center shadow-md">
                      <Play className="w-3.5 h-3.5 fill-white text-white" />
                    </span>
                  )}
                  {post.type === 'carousel' && (
                    <span className="p-1.5 rounded-lg bg-black/70 backdrop-blur text-white flex items-center justify-center shadow-md">
                      <Layers className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>

                {/* Hover Glass Overlay with Instagram engagement counts */}
                <div className="absolute inset-0 bg-black/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 z-20">
                  {/* Top Bar on Hover */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#ea7af4] bg-[#ea7af4]/20 border border-[#ea7af4]/40 px-2 py-0.5 rounded">
                      {post.style}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => toggleBookmark(e, post.id)}
                      className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
                      title="Save Post"
                    >
                      <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-white text-white' : ''}`} />
                    </button>
                  </div>

                  {/* Center Stats */}
                  <div className="flex items-center justify-center gap-6">
                    <button
                      type="button"
                      onClick={(e) => toggleLike(e, post.id)}
                      className="flex items-center gap-1.5 text-white font-bold text-sm transition-transform active:scale-125"
                    >
                      <Heart
                        className={`w-5 h-5 transition-colors ${
                          isLiked
                            ? 'text-rose-500 fill-rose-500 animate-bounce'
                            : 'text-white hover:text-rose-400'
                        }`}
                      />
                      <span>{currentLikes.toLocaleString()}</span>
                    </button>

                    <div className="flex items-center gap-1.5 text-white font-bold text-sm">
                      <MessageCircle className="w-5 h-5" />
                      <span>{post.commentsCount}</span>
                    </div>
                  </div>

                  {/* Bottom Preview */}
                  <div className="space-y-1">
                    <p className="text-xs text-zinc-200 line-clamp-2 font-light">
                      {post.caption}
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-zinc-400 pt-1">
                      <span>{post.date}</span>
                      <span className="text-[#ea7af4] font-semibold flex items-center gap-0.5">
                        <span>Details</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Social Call to Action Banner */}
        <div className="mt-14 rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-purple-950/40 via-[#160b24] to-pink-950/30 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="p-3.5 rounded-2xl bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white shadow-[0_0_20px_rgba(238,42,123,0.35)] flex-shrink-0">
              <Instagram className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                WANT TO SEE TODAY'S FRESH STENCILS?
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 font-light mt-0.5">
                Join our 15,000+ tattoo enthusiasts. We post daily behind-the-scenes stories, flash deals, and client reactions.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <a
              href={STUDIO_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:brightness-110 active:scale-[0.98] text-white text-xs sm:text-sm font-bold uppercase tracking-[0.16em] shadow-[0_0_20px_rgba(253,29,29,0.4)] transition-all"
            >
              <Instagram className="w-4 h-4" />
              <span>FOLLOW @SHIVANSHTATTOOSTUDIO</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Interactive Instagram Post Modal / Lightbox */}
      {selectedPost && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-[#120a1c] border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Modal Button */}
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black text-white/80 hover:text-white transition-colors"
              aria-label="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left: Image Canvas */}
            <div className="md:w-3/5 bg-black flex items-center justify-center relative min-h-[300px] md:min-h-[500px]">
              <img
                src={selectedPost.imageUrl}
                alt={selectedPost.caption}
                className="w-full h-full max-h-[500px] md:max-h-[600px] object-cover"
              />
              {selectedPost.type === 'reel' && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center pointer-events-none">
                  <div className="p-4 rounded-full bg-black/60 backdrop-blur border border-white/20 text-white">
                    <Play className="w-8 h-8 fill-white text-white translate-x-0.5" />
                  </div>
                </div>
              )}
            </div>

            {/* Right: Instagram Post Details */}
            <div className="md:w-2/5 p-6 flex flex-col justify-between overflow-y-auto">
              <div>
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-[1.5px] rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]">
                      <div className="w-9 h-9 rounded-full bg-[#0c0714] p-1 flex items-center justify-center">
                        <img
                          src={STUDIO_CONFIG.logoUrl}
                          alt="Shivansh Studio"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-white">shivanshtattoostudio</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 fill-sky-400/20" />
                      </div>
                      <span className="text-[11px] text-zinc-400">{selectedPost.artist}</span>
                    </div>
                  </div>

                  <a
                    href={STUDIO_CONFIG.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-[#ea7af4] hover:underline"
                  >
                    Follow
                  </a>
                </div>

                {/* Caption & Tags */}
                <div className="py-4 space-y-3">
                  <div className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-light">
                    <strong className="text-white font-medium mr-1.5">shivanshtattoostudio</strong>
                    {selectedPost.caption}
                  </div>

                  {/* Hashtags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {selectedPost.tags.map((tag, idx) => (
                      <span key={idx} className="text-xs text-sky-400/90 font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="text-[11px] text-zinc-500 uppercase tracking-wider pt-2">
                    {selectedPost.date} · Inked at Shivansh Studio Dhule
                  </div>
                </div>

                {/* Highlighted Style Feature */}
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs">
                  <span className="text-[10px] uppercase font-bold text-[#ea7af4] block tracking-wider">
                    Design Discipline
                  </span>
                  <div className="text-white font-semibold mt-0.5">
                    {selectedPost.style}
                  </div>
                </div>
              </div>

              {/* Engagement Bar & CTA */}
              <div className="pt-4 border-t border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={(e) => toggleLike(e, selectedPost.id)}
                      className="text-white hover:text-rose-500 transition-colors flex items-center gap-1 text-xs"
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          likedPosts[selectedPost.id] ? 'fill-rose-500 text-rose-500' : ''
                        }`}
                      />
                      <span>
                        {(selectedPost.likes + (likedPosts[selectedPost.id] ? 1 : 0)).toLocaleString()}
                      </span>
                    </button>

                    <div className="text-white flex items-center gap-1 text-xs">
                      <MessageCircle className="w-5 h-5" />
                      <span>{selectedPost.commentsCount}</span>
                    </div>

                    <a
                      href={STUDIO_CONFIG.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-white transition-colors"
                      title="Share to Instagram"
                    >
                      <Share2 className="w-4 h-4" />
                    </a>
                  </div>

                  <button
                    onClick={(e) => toggleBookmark(e, selectedPost.id)}
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    <Bookmark
                      className={`w-5 h-5 ${
                        bookmarkedPosts[selectedPost.id] ? 'fill-white text-white' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Action Buttons inside Modal */}
                <div className="space-y-2">
                  <button
                    onClick={() => handleBookFromPost(selectedPost)}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#ea7af4] to-[#c084fc] hover:from-[#f08dfa] hover:to-[#d8b4fe] text-black text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(234,122,244,0.3)] cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book This Tattoo Style</span>
                  </button>

                  <a
                    href={STUDIO_CONFIG.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                  >
                    <Instagram className="w-3.5 h-3.5 text-[#ea7af4]" />
                    <span>View Post on Instagram</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
