import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDocs, collection } from 'firebase/firestore';
import fs from 'fs';

const config = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf8'));

const app = initializeApp(config);
const db = config.firestoreDatabaseId && config.firestoreDatabaseId !== '(default)'
  ? getFirestore(app, config.firestoreDatabaseId)
  : getFirestore(app);

console.log('Seeding full database to Firestore database:', config.firestoreDatabaseId || '(default)');

const SERVICES = [
  {
    id: 'custom-tattoos',
    title: 'Custom Tattoos',
    subtitle: 'Bespoke Artistry Tailored to Your Vision',
    description: 'Every custom design begins with an individualized consultation. We harmonize your ideas, aesthetic preferences, and body anatomy to craft a one-of-a-kind tattoo that ages gracefully.',
    startingPrice: '₹1,500',
    tags: 'Custom, Bespoke, Original',
    order: 1,
  },
  {
    id: 'black-and-grey-realism',
    title: 'Black & Grey Realism',
    subtitle: 'Photorealistic Depth & Subtle Gradients',
    description: 'Mastering the delicate transition from obsidian black to whisper-soft charcoal tones. Utilizing specialized multi-shade washes and micro-stippling to render portraits, wildlife, and classical sculptures.',
    startingPrice: '₹2,500',
    tags: 'Realism, Shading, Portraits',
    order: 2,
  },
  {
    id: 'portrait-tattoos',
    title: 'Portrait Tattoos',
    subtitle: 'Capturing Human Emotion with Anatomical Accuracy',
    description: 'Transforming cherished photographs of family members, revered historical figures, and beloved companions into living art. Single-needle micro-calibration ensures expressive eyes and lifelike skin textures.',
    startingPrice: '₹4,000',
    tags: 'Portrait, Memorial, Hyper-realism',
    order: 3,
  },
  {
    id: 'lord-shiva-spiritual',
    title: 'Lord Shiva & Spiritual Tattoos',
    subtitle: 'Sacred Iconography & Divine Energy',
    description: 'Deeply revered spiritual creations integrating Lord Shiva, Trishul (Trident), Damru, Mahamrityunjaya mantras, Third Eye (Trinetra), and sacred Rudraksha motifs with cosmic geometric balance.',
    startingPrice: '₹2,000',
    tags: 'Shiva, Mahadev, Spiritual, Trishul',
    order: 4,
  },
  {
    id: 'sacred-geometric',
    title: 'Sacred Geometric & Mandala',
    subtitle: 'Harmonic Geometry & Clean Symmetry',
    description: 'Mathematical beauty rendered onto skin. Perfect circles, interlocking Platonic solids, Sri Yantras, and lotus mandalas built with relentless line precision.',
    startingPrice: '₹2,200',
    tags: 'Geometry, Mandala, Dotwork',
    order: 5,
  },
  {
    id: 'cover-up-tattoos',
    title: 'Cover-Up Tattoos',
    subtitle: 'Reclaiming Your Canvas with Vision',
    description: 'Skillfully disguising unwanted, aged, or poorly executed tattoos without laser surgery. We strategize dark tones, organic textures, and dynamic flow to conceal previous ink completely.',
    startingPrice: '₹3,000',
    tags: 'CoverUp, Transformation, Redesign',
    order: 6,
  },
  {
    id: 'minimalist-fine-line',
    title: 'Minimalist & Fine-Line',
    subtitle: 'Subtle Elegance with Razor Precision',
    description: 'Single-needle minimalism that whispers. Dainty botanical illustrations, delicate line art, constellation maps, and micro-symbols curated for modern aesthetic lovers.',
    startingPrice: '₹1,200',
    tags: 'Minimal, FineLine, Micro',
    order: 7,
  },
  {
    id: 'sanskrit-script-lettering',
    title: 'Sanskrit Script & Custom Lettering',
    subtitle: 'Sacred Phonetics & Calligraphic Mastery',
    description: 'Ancient Devanagari Sanskrit verses, personal mantras, meaningful dates, and custom gothic or cursive calligraphy calibrated with consistent stroke weights.',
    startingPrice: '₹1,000',
    tags: 'Sanskrit, Calligraphy, Lettering',
    order: 8,
  },
  {
    id: 'color-tattoos',
    title: 'Vibrant Color Tattoos',
    subtitle: 'Rich Saturation & Luminous Highlights',
    description: 'Premium organic pigments formulated for deep color longevity and contrast against Indian skin tones. Smooth gradients and vivid saturated fills.',
    startingPrice: '₹2,500',
    tags: 'Color, NeoTraditional, Watercolor',
    order: 9,
  },
  {
    id: 'tribal-maori-polynesian',
    title: 'Tribal & Polynesian Work',
    subtitle: 'Ancestral Strength & Bold Blackwork',
    description: 'Powerful geometric tribal patterns, Marquesan and Maori kape curves, and warrior symbolism that contour muscle flow.',
    startingPrice: '₹2,000',
    tags: 'Tribal, Blackwork, Maori',
    order: 10,
  },
  {
    id: 'home-tattoo-service',
    title: 'Home Tattoo Service',
    subtitle: 'Studio-Grade Sanitation in Your Private Space',
    description: 'Experience luxury bespoke tattooing in the comfort and privacy of your residence. Our certified team brings hospital-grade sterile setups and mobile lighting.',
    startingPrice: '₹3,500',
    tags: 'HomeService, VIP, MobileStudio',
    order: 11,
  },
  {
    id: 'body-piercing',
    title: 'Professional Body Piercing',
    subtitle: 'Hygienic Precision with Implant-Grade Titanium',
    description: 'Single-use sterilized cannula needles and hypoallergenic implant-grade titanium jewelry for ears, nose, helix, and septum.',
    startingPrice: '₹800',
    tags: 'Piercing, Titanium, Sterile',
    order: 12,
  },
];

const ARTISTS = [
  {
    id: 'sachin-deore',
    name: 'Sachin Deore',
    role: 'Founder & Master Tattooist',
    experience: '8+ Years Industry Master',
    specialties: 'Black & Grey Realism, Lord Shiva & Sacred Geometry, Cover-Up Mastery',
    bio: 'Sachin founded Shivansh Tattoo Studio with the unwavering motto "Precision in Every Line." Known for anatomical flow, intense spiritual iconography, and museum-grade linework.',
    instagram: '@shivanshtattoostudio',
    order: 1,
  },
  {
    id: 'senior-resident-artist',
    name: 'Aryan V. (Senior Resident)',
    role: 'Senior Resident Fine-Line Specialist',
    experience: '5+ Years Studio Veteran',
    specialties: 'Minimalist Micro-Art, Sanskrit Calligraphy, Botanical Line Art',
    bio: 'Specializing in single-needle micro-tattoos with extreme patience and gentle technique, perfect for first-timers and delicate placements.',
    instagram: '@shivanshtattoostudio',
    order: 2,
  },
];

const REVIEWS = [
  {
    id: 'rev-1',
    author: 'Rahul Patil',
    rating: 5,
    service: 'Lord Shiva & Trishul Realism',
    review: 'Sachin Deore is truly an artist with magic in his hands! The precision in the Trishul and mandala linework on my forearm blew my mind. Absolutely sterile and zero pain with his steady technique.',
    date: '1 week ago',
    verified: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'rev-2',
    author: 'Priya Sharma',
    rating: 5,
    service: 'Minimalist Fine-Line & Sanskrit Mantra',
    review: 'Booked their Home Tattoo Service for my first tattoo. They arrived with a hospital-grade sterile kit, unpackaged every needle in front of me, and the Sanskrit lettering is paper-thin and sharp!',
    date: '2 weeks ago',
    verified: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'rev-3',
    author: 'Amit Kulkarni',
    rating: 5,
    service: 'Tribal Cover-Up',
    review: 'Had a 7-year-old faded tribal tattoo on my shoulder that I regretted. Shivansh Studio designed a custom black & grey panther cover-up that completely hid the old ink. Outstanding work!',
    date: '3 weeks ago',
    verified: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'rev-4',
    author: 'Neha Deshmukh',
    rating: 5,
    service: 'Sacred Lotus Mandala',
    review: 'The aesthetic of the studio in Dhule is unmatched—so hygienic, luxurious, and peaceful. The AI consultation helped me pick the right size before I even walked in. 10/10 recommend!',
    date: '1 month ago',
    verified: true,
    createdAt: new Date().toISOString(),
  },
];

async function seed() {
  try {
    console.log('--- Writing Services Collection ---');
    for (const item of SERVICES) {
      await setDoc(doc(db, 'services', item.id), item);
      console.log(`✓ Added Service: ${item.id}`);
    }

    console.log('--- Writing Artists Collection ---');
    for (const item of ARTISTS) {
      await setDoc(doc(db, 'artists', item.id), item);
      console.log(`✓ Added Artist: ${item.id}`);
    }

    console.log('--- Writing Reviews Collection ---');
    for (const item of REVIEWS) {
      await setDoc(doc(db, 'reviews', item.id), item);
      console.log(`✓ Added Review: ${item.id}`);
    }

    console.log('--- Verifying Data Sync ---');
    const servicesSnap = await getDocs(collection(db, 'services'));
    console.log(`Verified ${servicesSnap.size} services active in Firestore database.`);

    const reviewsSnap = await getDocs(collection(db, 'reviews'));
    console.log(`Verified ${reviewsSnap.size} reviews active in Firestore database.`);

    console.log('DATABASE SEEDING COMPLETED SUCCESSFULLY!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
}

seed();
