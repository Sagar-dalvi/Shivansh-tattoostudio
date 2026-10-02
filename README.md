# Shivansh Tattoo Studio 🖋️✨

> **Precision in Every Line.**  
> Official web application for **Shivansh Tattoo Studio**, a luxury tattoo studio located on the Mumbai - Agra Highway corridor in Dhule, Maharashtra.

[![React](https://img.shields.io/badge/React-19.0-61dafb.svg?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6.svg?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646cff.svg?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.0-38b2ac.svg?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-4.21-000000.svg?style=flat-square&logo=express)](https://expressjs.com/)
[![Google Gen AI](https://img.shields.io/badge/Google_Gemini_API-2.4-4285f4.svg?style=flat-square&logo=google)](https://ai.google.dev/)

---

## 🌟 Overview

**Shivansh Tattoo Studio** is a full-featured web application engineered with a dark, futuristic glass-morphism aesthetic. It delivers an immersive digital showcase of the studio's craft, hospital-grade hygiene standards, bespoke tattoo disciplines, and client-first booking flows.

The application includes an interactive pricing estimator, a 3D gallery experience, dedicated artist dossiers with individual curated portfolio modals, an AI-powered tattoo consultation assistant backed by Google Gemini, a studio editorial blog, and seamless direct WhatsApp booking integration.

---

## 🚀 Key Features

### 1. 🎨 Tattoo Craft & Services Showcase
- **13 Specialized Tattoo Disciplines**:
  - Custom Bespoke Tattoos
  - Personalized Milestone Designs
  - Minimalist & Micro-Tattoos
  - Linework & Sacred Geometry
  - Black & Grey Realism
  - Photo Tattoos (Photo-to-Ink replication)
  - Portrait Tattoos
  - Custom Lettering & Calligraphy
  - Symbolic & Cultural Insignias
  - Spiritual Motifs (Lord Shiva, Trishul, Mandalas)
  - Cover-Up Consultations & Pigment Density Mapping
  - Tattoo Redesign & Restoration
  - Luxury Home Tattoo Service

### 2. 👨‍🎨 Artist Dossiers & Profile Modals
- **Founder & CEO Spotlight**: Sagar Dalvi (Founder, CEO & Marketing Head) with authentic studio photo upload support.
- **Interactive Artist Modals**:
  - Detailed biographies and creative philosophies.
  - Technical mastery specifications (needle gauges, greywash dilution ratios, anatomical flow).
  - Milestone statistics and hygiene certifications.
  - Specific curated gallery of each artist's individual works with an interactive inspection card.
  - Direct "Book With Artist" and WhatsApp consultation actions.

### 3. 🤖 AI Tattoo Consultation Assistant (Gemini-Powered)
- Server-side proxy (`/api/ai-assistant`) using the `@google/genai` SDK.
- Interactive brainstorming on style compatibility, pain maps, placement recommendations, and sizing guidance.
- One-click transfer from AI concept directly into the booking form.

### 4. 💰 Interactive Tattoo Price Estimator
- Real-time quote calculations based on size dimensions (inches), artistic complexity tier (minimal to hyper-realism), anatomical placement, and studio vs. home service.
- Transparent price ranges in INR (₹) with an instant prefill button to book an appointment with that exact quote.

### 5. 🖼️ Multi-Dimensional Portfolios
- **Filterable Grid Portfolio**: High-resolution imagery categorized by discipline (Spiritual, Realism, Minimal, Geometric, Lettering, Cover-Up).
- **3D Spatial Gallery**: Interactive rotating 3D carousel experience with lighting reflections and touch gesture support.
- **Instagram Feed Section**: Live-style social grid with likes, comments, post types (Reels, Carousels, Photos), and quick-booking triggers.

### 6. 📖 Studio Blog & Knowledge Base
- In-depth editorial guides on tattoo needle dynamics, dermal depth science (1.5mm–2.0mm threshold), medical barrier films (SecondSkin vs. cling wrap), and long-term SPF 50+ UV protection.
- Live keyword search, category filter tabs (`Tattoo Artistry`, `Aftercare Tips`, `Studio News`), and an interactive full-article reader modal with shareable link generation.

### 7. 🩹 Medical-Grade Aftercare & FAQ
- Day-by-day healing roadmap with visual dos and don'ts.
- Comprehensive FAQ accordion addressing pain management, sterile single-use needles, touch-ups, and booking policies.

### 8. 📅 Appointment Booking & Home Service Dispatch
- Complete scheduling form for studio visits or mobile home tattoo services.
- Real-time WhatsApp sync formatting pre-filled appointment requests sent directly to the studio's official number (+91 95796 21490).

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 6](https://vitejs.dev/) with Fast HMR
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with custom glass-morphism, backdrop filters, and neon glow utilities
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Motion](https://motion.dev/) & CSS keyframe transitions
- **Backend / API**: [Express 4](https://expressjs.com/) on Node.js running via `tsx`
- **AI Integration**: [Google Gen AI SDK (`@google/genai`)](https://www.npmjs.com/package/@google/genai) utilizing `gemini-2.5-flash`
- **Image Architecture**: 100% locally hosted image registry (`/public/images/` and `src/images.ts`) with zero third-party image host dependencies

---

## 📁 Project Directory Structure

```text
├── public/
│   ├── assets/               # Brand logos, founder photo & identity
│   │   ├── logo.svg
│   │   ├── logo-mark.svg
│   │   └── sagar-dalvi.jpg
│   └── images/               # High-resolution local image assets
│       ├── artists/          # Resident artist portraits
│       ├── gallery/          # Portfolio showcase pieces
│       ├── instagram/        # Social feed media
│       └── services/         # 13 service discipline banners
├── src/
│   ├── components/           # Modular React components
│   │   ├── AboutSection.tsx
│   │   ├── AftercareSection.tsx
│   │   ├── AiAssistantSpotlight.tsx
│   │   ├── AiTattooAssistantModal.tsx
│   │   ├── ArtistProfileModal.tsx    # Artist profile dossier modal
│   │   ├── ArtistsSection.tsx        # Resident craft masters
│   │   ├── BlogSection.tsx           # Studio editorial blog & reader
│   │   ├── BookingSection.tsx        # Complete booking flow
│   │   ├── ContactSection.tsx        # Location & contact details
│   │   ├── CustomTattooSection.tsx
│   │   ├── FaqSection.tsx
│   │   ├── FloatingWidgets.tsx
│   │   ├── Footer.tsx
│   │   ├── Gallery3DExperience.tsx   # 3D spatial gallery
│   │   ├── GallerySection.tsx        # Filterable 2D portfolio
│   │   ├── HeroSection.tsx
│   │   ├── HomeTattooServiceSection.tsx
│   │   ├── InstagramFeedSection.tsx
│   │   ├── Navbar.tsx
│   │   ├── NewsletterSection.tsx
│   │   ├── PriceEstimatorSection.tsx # Interactive price calculator
│   │   └── ReviewsSection.tsx
│   ├── images.ts             # Centralized local image registry
│   ├── studioConfig.ts       # Master configuration (contacts, services, FAQs)
│   ├── App.tsx               # Main application container
│   ├── main.tsx              # React DOM entrypoint
│   └── index.css             # Tailwind CSS global styles
├── index.html                # HTML entrypoint with metadata & fonts
├── metadata.json             # AI Studio applet metadata & capabilities
├── package.json              # NPM dependencies & scripts
├── server.ts                 # Full-stack Express server + Gemini proxy
├── tsconfig.json             # TypeScript configuration
└── vite.config.ts            # Vite bundler configuration
```

---

## 🚦 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- `npm` or `yarn` / `pnpm`
- *(Optional)* [Google Gemini API Key](https://aistudio.google.com/app/apikey) for live AI Consultation features.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/shivansh-tattoo-studio.git
   cd shivansh-tattoo-studio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory (refer to `.env.example`):
   ```env
   PORT=3000
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
   *(Note: The application will run smoothly in mock fallback mode if no Gemini API key is provided).*

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚙️ Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Express server and Vite development environment with live reload. |
| `npm run build` | Compiles the production React application to the `dist/` directory. |
| `npm run lint` | Runs TypeScript type-checking (`tsc --noEmit`) to verify code integrity. |
| `npm run preview` | Previews the compiled production build locally. |
| `npm run clean` | Cleans up the `dist/` build directory and compiled server files. |

---

## ⚙️ Configuration & Customization

### Updating Studio Information
All studio phone numbers, addresses, WhatsApp links, business hours, and service descriptions are centralized in:
📂 **`src/studioConfig.ts`**

```typescript
export const STUDIO_CONFIG = {
  studioName: "Shivansh Tattoo Studio",
  phone: "+91 95796 21490",
  whatsappNumber: "+919579621490",
  address: "Shivansh Tattoo Studio, Mumbai - Agra National Highway, Dhule, Maharashtra 424001",
  businessHours: "Monday – Sunday: 11:00 AM – 9:00 PM (By Appointment & Walk-in)",
  // ...
};
```

### Changing or Adding Images
All image paths are mapped in:
📂 **`src/images.ts`**

Simply place your new image files into the corresponding subfolder inside `public/images/` and update the reference in `src/images.ts`.

---

## 🔒 Hygiene & Safety Standards

Shivansh Tattoo Studio operates strictly under certified medical sterilization protocols:
- **100% Single-Use Disposables**: Needles, grip covers, rinse cups, and ink caps are disposed of in biohazard containers after every client.
- **Hospital-Grade Surface Disinfection**: Certified surface barrier film and medical-grade virucidal sprays (CaviCide) applied between every session.
- **Vegan, Heavy-Metal-Free Pigments**: Premium imported inks conforming to international health safety standards.

---

## 📍 Studio Location & Contact

- **Studio**: Shivansh Tattoo Studio
- **Founder & CEO**: Sagar Dalvi
- **Location**: Mumbai - Agra National Highway, Dhule, Maharashtra 424001, India
- **Phone**: [+91 95796 21490](tel:+919579621490) / [+91 95790 08132](tel:+919579008132)
- **WhatsApp**: [Chat on WhatsApp](https://wa.me/919579621490)
- **Hours**: Monday – Sunday: 11:00 AM – 9:00 PM

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
Feel free to use and adapt this code for your own creative studio projects.
