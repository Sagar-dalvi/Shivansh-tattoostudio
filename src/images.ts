/**
 * ============================================================================
 * SHIVANSH TATTOO STUDIO - CENTRALIZED LOCAL IMAGE ASSETS REGISTRY
 * ============================================================================
 * 
 * All website images are stored LOCALLY in the `/public/images/` and `/public/assets/`
 * folders. No external online image URLs (like Unsplash) are used.
 * 
 * HOW TO DIRECTLY CHANGE ANY IMAGE:
 * ----------------------------------------------------------------------------
 * METHOD 1 (Direct File Replacement - Recommended):
 *   Simply drop your new image file into the corresponding folder inside `/public/images/`
 *   with the matching file name. It will immediately update everywhere!
 * 
 * METHOD 2 (Update Path in this file):
 *   Put your new image file anywhere in `/public/` (e.g. `/public/my-new-photo.jpg`),
 *   then update the corresponding path in the `STUDIO_IMAGES` object below.
 * ============================================================================
 */

export const STUDIO_IMAGES = {
  // Brand & Identity
  brand: {
    logo: '/assets/logo.svg',
    logoMark: '/assets/logo-mark.svg',
  },

  // Artists & Leadership
  artists: {
    // Sagar Dalvi (Founder, CEO & Marketing Head)
    sagarDalvi: '/assets/sagar-dalvi.jpg',
    // Arjun Deshmukh (Black & Grey Realism & Large Canvas)
    arjunDeshmukh: '/images/artists/arjun-deshmukh.jpg',
    // Rhea Sharma (Fine-Line, Sacred Geometry & Botanical)
    rheaSharma: '/images/artists/rhea-sharma.jpg',
  },

  // Services (12 Tattoo Disciplines + Home Service)
  services: {
    customTattoos: '/images/services/custom-tattoos.jpg',
    personalizedDesigns: '/images/services/personalized-designs.jpg',
    minimalistTattoos: '/images/services/minimalist-tattoos.jpg',
    linework: '/images/services/linework.jpg',
    realism: '/images/services/realism.jpg',
    photoTattoos: '/images/services/photo-tattoos.jpg',
    portraitTattoos: '/images/services/portrait-tattoos.jpg',
    letteringName: '/images/services/lettering-name.jpg',
    symbolicTattoos: '/images/services/symbolic-tattoos.jpg',
    spiritualTattoos: '/images/services/spiritual-tattoos.jpg',
    coverUp: '/images/services/cover-up.jpg',
    tattooRedesign: '/images/services/tattoo-redesign.jpg',
    homeService: '/images/services/home-tattoo-service.jpg',
  },

  // Portfolio Gallery
  gallery: {
    gal1: '/images/gallery/gallery-1.jpg', // Cosmic Trishul & Sacred Yantra
    gal2: '/images/gallery/gallery-2.jpg', // Hyper-Realist Lion Portrait
    gal3: '/images/gallery/gallery-3.jpg', // Single-Needle Botanical Fern
    gal4: '/images/gallery/gallery-4.jpg', // Sacred Hexagonal Mandala
    gal5: '/images/gallery/gallery-5.jpg', // Custom Monogram Calligraphy
    gal6: '/images/gallery/gallery-6.jpg', // Metamorphosis Raven Cover-Up
    gal7: '/images/gallery/gallery-7.jpg', // Classical Bust & Chiaroscuro
    gal8: '/images/gallery/gallery-8.jpg', // Dynamic Japanese Koi & Waves
    gal9: '/images/gallery/gallery-9.jpg', // Ancient Celestial Dial
  },

  // Instagram / Social Portfolio Feed
  instagram: {
    post1: '/images/instagram/insta-1.jpg', // Trishul Linework
    post2: '/images/instagram/insta-2.jpg', // Lion Realism
    post3: '/images/instagram/insta-3.jpg', // Minimalist Fern
    post4: '/images/instagram/insta-4.jpg', // Geometric Mandala
    post5: '/images/instagram/insta-5.jpg', // In-Studio Home Session
    post6: '/images/instagram/insta-6.jpg', // Monogram Script
    post7: '/images/instagram/insta-7.jpg', // Micro Realism
    post8: '/images/instagram/insta-8.jpg', // Custom Japanese Koi
  },
} as const;

export default STUDIO_IMAGES;
