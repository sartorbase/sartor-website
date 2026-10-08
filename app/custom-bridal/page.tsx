import React from 'react';
import type { Metadata } from 'next';
import {
  MessageCircle,
  ShieldCheck,
  Ruler,
  Video,
  Truck,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  ChevronDown,
  Layers,
  Scissors,
  Lock,
  Star,
  Award,
  Globe2,
  Check,
  X,
  ExternalLink,
} from 'lucide-react';

export const metadata: Metadata = {
  title: "Custom Bridal Lehengas Lahore | Live Video Measurement Calls & Insured Worldwide Delivery | SARTOR",
  description: "Commission bespoke Pakistani custom bridal lehengas with authentic hand-embroidered Zardozi on pure raw silk. 100% Guaranteed Custom Fit via Guided Video Calls. Insured DHL Express Shipping to USA, UK, Canada & UAE (3–5 Days).",
  keywords: [
    "custom bridal lehengas",
    "live video measurement calls",
    "insured worldwide delivery",
    "pakistani bridal lehengas online",
    "bespoke bridal couture lahore",
    "zardozi bridal lehenga uk usa",
  ],
  alternates: {
    canonical: 'https://www.sartor.pk/custom-bridal',
  },
  openGraph: {
    title: "Custom Bridal Lehengas | Live Video Measurement Calls & Insured Worldwide Delivery | SARTOR",
    description: "Authentic Zardozi & Adda hand-embroidery on pure 80g/100g raw silk. Tailored to your exact fit with live video consultations and 3–5 day express worldwide delivery.",
    url: "https://sartor.pk/custom-bridal",
    siteName: "SARTOR Master Atelier Lahore",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://sartor.pk/images/barat-crimson-bridal.jpg",
        width: 1200,
        height: 630,
        alt: "SARTOR Bespoke Pakistani Bridal Couture - Handcrafted in Lahore",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Bridal Lehengas | Live Video Measurement Calls & Insured Worldwide Delivery",
    description: "100% Guaranteed Custom Fit via Guided Video Calls. Insured DHL Express Shipping to USA, UK, Canada & UAE (3–5 Days).",
    images: ["https://sartor.pk/images/barat-crimson-bridal.jpg"],
  },
};

const WHATSAPP_INTL = '923352209991';

function getWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_INTL}?text=${encodeURIComponent(message)}`;
}

export default function CustomBridalPage() {
  const primaryHeroMsg = `*OVERSEAS CUSTOM BRIDAL CONSULTATION ($2,000+)*
---------------------------------------
Assalam-o-Alaikum Master Abdul Ghaffar,
I am an overseas bride looking to commission a bespoke Pakistani bridal outfit.

• Destination / City: [e.g. London, UK / Toronto, Canada / Houston, USA / Dubai, UAE]
• Wedding Event Date: [e.g. December 2026]
• Event Silhouette: [e.g. Barat Royal Lehenga / Walima Gown / Festive Mehndi Kalidar]
• Target Budget: [e.g. £2,200 GBP / $2,800 USD / 10,000 AED / $3,500 CAD]

I would like to share my design references and schedule a live digital sizing session.`;

  const primaryWhatsAppUrl = getWhatsAppUrl(primaryHeroMsg);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-amber-400/30 selection:text-amber-200">
      
      {/* -------------------------------------------------------------------- */}
      {/* GLOBAL HEADER / ATELIER NAVIGATION                                   */}
      {/* -------------------------------------------------------------------- */}
      <nav className="sticky top-0 z-40 border-b border-neutral-800/80 bg-neutral-950/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 group">
            <span className="font-serif text-2xl font-bold tracking-widest text-amber-400 group-hover:text-amber-300 transition-colors">
              SARTOR
            </span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 hidden sm:inline">
              | Lahore Atelier
            </span>
          </a>

          <div className="flex items-center gap-4 sm:gap-6">
            <a
              href="#workflow"
              className="text-xs uppercase tracking-wider text-neutral-400 hover:text-amber-300 transition-colors hidden md:inline"
            >
              4-Step Workflow
            </a>
            <a
              href="#craftsmanship-moat"
              className="text-xs uppercase tracking-wider text-neutral-400 hover:text-amber-300 transition-colors hidden md:inline"
            >
              Craftsmanship Moat
            </a>
            <a
              href="#digital-sizing-guide"
              className="text-xs uppercase tracking-wider text-neutral-400 hover:text-amber-300 transition-colors hidden sm:inline"
            >
              Sizing Guide
            </a>
            <a
              href="#faqs"
              className="text-xs uppercase tracking-wider text-neutral-400 hover:text-amber-300 transition-colors hidden sm:inline"
            >
              FAQs
            </a>
            <a
              href={primaryWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold tracking-wide shadow-lg shadow-emerald-950/50 hover:shadow-emerald-900/60 transition-all duration-200"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Atelier</span>
            </a>
          </div>
        </div>
      </nav>

      {/* -------------------------------------------------------------------- */}
      {/* 1. HIGH-CONVERTING HERO SECTION                                      */}
      {/* -------------------------------------------------------------------- */}
      <header className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-neutral-800">
        {/* Ambient Couture Lighting */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-10 w-[400px] h-[400px] bg-emerald-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900 border border-amber-400/30 text-amber-300 text-xs font-mono uppercase tracking-widest mb-6 shadow-md">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>SARTOR Lahore Atelier • Worldwide Express Delivery</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-neutral-100 tracking-tight leading-[1.12]">
              Bespoke Pakistani Bridal Couture —{' '}
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">
                Tailored to Your Exact Fit with Live Video Consultations.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="mt-6 text-neutral-300 text-base sm:text-lg md:text-xl max-w-3xl leading-relaxed font-sans">
              Authentic Zardozi &amp; Adda hand-embroidery on pure raw silks. Designed in Lahore, delivered directly to your doorstep in 3–5 days.
            </p>

            {/* Primary & Secondary Call to Action Buttons */}
            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-xl">
              <a
                href={primaryWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-base tracking-wide shadow-xl shadow-emerald-950/60 hover:shadow-emerald-900/80 transition-all duration-200 group transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-5 h-5 text-emerald-100 group-hover:scale-110 transition-transform" />
                <span>💬 Chat on WhatsApp for Custom Bridal Quote</span>
              </a>

              <a
                href="#digital-sizing-guide"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 text-neutral-200 hover:text-white border border-neutral-700/80 hover:border-amber-400/50 text-sm font-semibold tracking-wide transition-all duration-200"
              >
                <Ruler className="w-4 h-4 text-amber-400" />
                <span>📐 View Digital Sizing Guide</span>
              </a>
            </div>

            {/* High-Intent Consultation Guarantee Tag */}
            <p className="mt-3 text-xs text-neutral-400 font-mono flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Direct Consultation with Master Tailor Abdul Ghaffar • Typical response &lt; 15 mins</span>
            </p>

            {/* Trust Row: 4 Key Trust Badges */}
            <div className="mt-14 pt-8 border-t border-neutral-800 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-left w-full">
              
              <div className="p-4 rounded-xl bg-neutral-900/70 border border-neutral-800/90 flex flex-col justify-between">
                <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 mb-3">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-neutral-100 uppercase font-mono tracking-wider">
                    100% Hand-Embroidered Zardozi
                  </h4>
                  <p className="text-[11px] text-neutral-400 mt-1 leading-normal">
                    Real metallic dabka, kora wire &amp; French resham knotted on traditional Lahore addas. Never flat machine foil.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-900/70 border border-neutral-800/90 flex flex-col justify-between">
                <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 mb-3">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-neutral-100 uppercase font-mono tracking-wider">
                    Guided Video Fitting Calls
                  </h4>
                  <p className="text-[11px] text-neutral-400 mt-1 leading-normal">
                    Live 1-on-1 anatomical 22-point measurement session &amp; toile check direct with our master cutters.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-900/70 border border-neutral-800/90 flex flex-col justify-between">
                <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 mb-3">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-neutral-100 uppercase font-mono tracking-wider">
                    Insured DHL Shipping
                  </h4>
                  <p className="text-[11px] text-neutral-400 mt-1 leading-normal">
                    Express 3–5 business day doorstep air courier to USA, UK, Canada &amp; UAE with signature tracking.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-900/70 border border-neutral-800/90 flex flex-col justify-between">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-neutral-100 uppercase font-mono tracking-wider">
                    Guaranteed Custom Fit
                  </h4>
                  <p className="text-[11px] text-neutral-400 mt-1 leading-normal">
                    2.5-inch hidden internal seam margins + muslin toile trial ensuring effortless local adjustments.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </header>

      {/* -------------------------------------------------------------------- */}
      {/* RECENT ATELIER COMMISSIONS SHOWCASE                                  */}
      {/* -------------------------------------------------------------------- */}
      <section className="py-20 bg-neutral-900/40 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold block mb-2">
                Recent Atelier Commissions
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-neutral-100">
                Handcrafted in Lahore for Overseas Diaspora Brides
              </h2>
            </div>
            <p className="text-xs text-neutral-400 font-mono mt-2 md:mt-0">
              Verified Real Handcraft • Shipped to UK, US, CA &amp; UAE
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Look 1: Barat Main Bridal */}
            <div className="group rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 hover:border-amber-400/50 shadow-2xl transition-all duration-300 flex flex-col text-left">
              <div className="relative aspect-[4/3] bg-neutral-950 overflow-hidden">
                <img
                  src="/images/barat-crimson-bridal.jpg"
                  alt="SARTOR Bespoke Crimson Velvet & Raw Silk Barat Bridal Lehenga with Zardozi Handwork"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent pointer-events-none" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-neutral-950/85 backdrop-blur-md text-[10px] font-mono uppercase tracking-wider text-amber-300 border border-amber-400/30">
                  Barat Main Bridal
                </span>
                <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-amber-400 text-neutral-950 font-mono font-bold text-xs shadow-lg">
                  $2,800 USD / £2,200 GBP
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-neutral-100 group-hover:text-amber-300 transition-colors">
                    Royal Crimson Velvet &amp; Raw Silk Lehenga
                  </h3>
                  <p className="text-xs text-neutral-300 mt-2 leading-relaxed">
                    Heavy 3D zardozi, antique dabka, kora wire &amp; French resham knotting. Sweetheart padded choli with double bridal veil framing (matha patti scallop).
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-mono text-neutral-400">
                    <span className="px-2 py-0.5 rounded bg-neutral-800 text-amber-300">Pure 100g Raw Silk</span>
                    <span className="px-2 py-0.5 rounded bg-neutral-800">2.5-in Seam Margin</span>
                    <span className="px-2 py-0.5 rounded bg-neutral-800">3-Tier Waistband</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between">
                  <span className="text-xs font-mono text-neutral-400">Turnaround: 10–12 Wks</span>
                  <a
                    href={getWhatsAppUrl("Hi Master Abdul Ghaffar, I am inquiring about the Royal Crimson Velvet Barat Bridal Lehenga ($2,800 USD / £2,200 GBP). Can we discuss measurements and availability for my wedding date?")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/40 text-xs font-semibold transition-all duration-200"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Inquire Look</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Look 2: Walima Couture Gown */}
            <div className="group rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 hover:border-amber-400/50 shadow-2xl transition-all duration-300 flex flex-col text-left">
              <div className="relative aspect-[4/3] bg-neutral-950 overflow-hidden">
                <img
                  src="/images/walima-champagne-gown.jpg"
                  alt="SARTOR Champagne Gold & Sage Green Walima Bridal Couture Gown with Tilla Needlework"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent pointer-events-none" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-neutral-950/85 backdrop-blur-md text-[10px] font-mono uppercase tracking-wider text-amber-300 border border-amber-400/30">
                  Walima Reception
                </span>
                <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-amber-400 text-neutral-950 font-mono font-bold text-xs shadow-lg">
                  $3,200 USD / £2,500 GBP
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-neutral-100 group-hover:text-amber-300 transition-colors">
                    Champagne Sage Couture Walima Gown
                  </h3>
                  <p className="text-xs text-neutral-300 mt-2 leading-relaxed">
                    Intricate all-over lace tilla, Swarovski crystal beads, freshwater pearls, sheer embroidered sleeves, and a sculpted 12-foot royal trailing flare.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-mono text-neutral-400">
                    <span className="px-2 py-0.5 rounded bg-neutral-800 text-amber-300">Pure Tissue Organza</span>
                    <span className="px-2 py-0.5 rounded bg-neutral-800">Can-Can Suspension</span>
                    <span className="px-2 py-0.5 rounded bg-neutral-800">11,800 AED</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between">
                  <span className="text-xs font-mono text-neutral-400">Turnaround: 12 Wks</span>
                  <a
                    href={getWhatsAppUrl("Hi Master Abdul Ghaffar, I am inquiring about the Champagne Sage Couture Walima Gown ($3,200 USD / £2,500 GBP). Can you share fabric swatch samples and timeline details?")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/40 text-xs font-semibold transition-all duration-200"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Inquire Look</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Look 3: Festive Mehndi Kalidar */}
            <div className="group rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 hover:border-amber-400/50 shadow-2xl transition-all duration-300 flex flex-col text-left">
              <div className="relative aspect-[4/3] bg-neutral-950 overflow-hidden">
                <img
                  src="/images/mehndi-mustard-kalidar.jpg"
                  alt="SARTOR Festive Mustard Yellow & Emerald Green Kalidar Flared Bridal Lehenga for Mehndi"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent pointer-events-none" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-neutral-950/85 backdrop-blur-md text-[10px] font-mono uppercase tracking-wider text-amber-300 border border-amber-400/30">
                  Mehndi &amp; Sangeet
                </span>
                <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-amber-400 text-neutral-950 font-mono font-bold text-xs shadow-lg">
                  $2,200 USD / £1,750 GBP
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-neutral-100 group-hover:text-amber-300 transition-colors">
                    Mustard &amp; Emerald Festive 16-Kali Kalidar
                  </h3>
                  <p className="text-xs text-neutral-300 mt-2 leading-relaxed">
                    16-kali sweeping twirl, traditional gota patti, kundan vasli motifs, pure 80g raw silk choli, and dual contrast emerald green hand-cut dupatta.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-mono text-neutral-400">
                    <span className="px-2 py-0.5 rounded bg-neutral-800 text-amber-300">Pure 80g Raw Silk</span>
                    <span className="px-2 py-0.5 rounded bg-neutral-800">Breathable Fall</span>
                    <span className="px-2 py-0.5 rounded bg-neutral-800">8,100 AED</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between">
                  <span className="text-xs font-mono text-neutral-400">Turnaround: 6–8 Wks</span>
                  <a
                    href={getWhatsAppUrl("Hi Master Abdul Ghaffar, I am inquiring about the Mustard & Emerald 16-Kali Kalidar Set for Mehndi ($2,200 USD / £1,750 GBP). Can we schedule a video sizing consultation?")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/40 text-xs font-semibold transition-all duration-200"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Inquire Look</span>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 2. TRANSPARENT 4-STEP BOOKING WORKFLOW                               */}
      {/* -------------------------------------------------------------------- */}
      <section id="workflow" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-neutral-800">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs uppercase font-mono tracking-widest text-amber-400 font-bold block mb-2">
            The Bespoke Journey
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-neutral-100">
            Transparent 4-Step Booking Workflow
          </h2>
          <p className="mt-4 text-neutral-300 text-sm sm:text-base leading-relaxed">
            Engineered specifically to dissolve distance anxiety for overseas brides. You hold full creative control and verify physical progress at every stage before releasing payments.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          
          {/* Step 1 */}
          <div className="p-7 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-amber-400/50 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="w-10 h-10 rounded-full bg-amber-400/10 text-amber-300 font-mono font-bold text-sm flex items-center justify-center border border-amber-400/30">
                  01
                </span>
                <span className="px-2.5 py-1 rounded-full bg-neutral-800 text-amber-400 font-mono text-[11px] font-bold">
                  10% Token
                </span>
              </div>
              <h3 className="font-serif text-xl font-bold text-neutral-100 group-hover:text-amber-300 transition-colors">
                Design &amp; Reference Share
              </h3>
              <p className="text-xs text-neutral-300 mt-3 leading-relaxed">
                Send your moodboard, runway pictures (Sabyasachi, Faraz Manan, Bunto Kazmi, Elan), or custom sketches on WhatsApp. Master Abdul Ghaffar reviews fabric viability, motif layout, and quotes an exact milestone breakdown within 24 hours.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-800 text-[11px] font-mono text-neutral-400">
              ✓ Free Reference Feasibility Check
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-7 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-amber-400/50 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="w-10 h-10 rounded-full bg-amber-400/10 text-amber-300 font-mono font-bold text-sm flex items-center justify-center border border-amber-400/30">
                  02
                </span>
                <span className="px-2.5 py-1 rounded-full bg-neutral-800 text-amber-400 font-mono text-[11px] font-bold">
                  30% Adda Setup
                </span>
              </div>
              <h3 className="font-serif text-xl font-bold text-neutral-100 group-hover:text-amber-300 transition-colors">
                Digital Video Measurement Session
              </h3>
              <p className="text-xs text-neutral-300 mt-3 leading-relaxed">
                Guided 3D sizing video call with our Lahore master cutters. We measure 22 anatomical body checkpoints over your actual bridal shoes and innerwear. Optional cotton muslin toile mockup dispatched to London or North America.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-800 text-[11px] font-mono text-neutral-400">
              ✓ 22-Point 3D Sizing Protocol
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-7 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-amber-400/50 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="w-10 h-10 rounded-full bg-amber-400/10 text-amber-300 font-mono font-bold text-sm flex items-center justify-center border border-amber-400/30">
                  03
                </span>
                <span className="px-2.5 py-1 rounded-full bg-neutral-800 text-amber-400 font-mono text-[11px] font-bold">
                  30% Assembly
                </span>
              </div>
              <h3 className="font-serif text-xl font-bold text-neutral-100 group-hover:text-amber-300 transition-colors">
                Artisan Production &amp; Progress Updates
              </h3>
              <p className="text-xs text-neutral-300 mt-3 leading-relaxed">
                Pure raw silk is stretched on traditional wooden addas. Generational karigars hand-stitch dabka, kora wire, pearls, and resham. You receive weekly 4K WhatsApp video clips showing the needle passing through your exact fabric.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-800 text-[11px] font-mono text-neutral-400">
              ✓ Weekly 4K Adda Video Clips
            </div>
          </div>

          {/* Step 4 */}
          <div className="p-7 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-emerald-500/50 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-300 font-mono font-bold text-sm flex items-center justify-center border border-emerald-500/30">
                  04
                </span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-400 font-mono text-[11px] font-bold">
                  30% Final Dispatch
                </span>
              </div>
              <h3 className="font-serif text-xl font-bold text-neutral-100 group-hover:text-emerald-300 transition-colors">
                Final Fitting Inspection &amp; Express Delivery
              </h3>
              <p className="text-xs text-neutral-300 mt-3 leading-relaxed">
                Full 360° mannequin video walk-through matching your calibrated proportions. Final steam press, anti-tarnish archival box sealing, and insured DHL Express dispatch (3–5 days to US/UK/CA/UAE) with live air tracking.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-800 text-[11px] font-mono text-emerald-400">
              ✓ Insured 3–5 Day DHL Air Courier
            </div>
          </div>

        </div>

        {/* Milestone Security Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-neutral-900 via-neutral-900 to-amber-950/40 border border-amber-400/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-300 uppercase tracking-wider">
              <Lock className="w-3.5 h-3.5" />
              <span>4-Stage Milestone Security</span>
            </div>
            <h4 className="font-serif text-xl font-bold text-neutral-100">
              No 100% Upfront Payments — You Verify Each Stage Before Releasing Funds
            </h4>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl leading-relaxed">
              We accept international bank wire, Wise, Remitly, and major credit cards in USD, GBP, CAD, and AED. Every dollar is backed by physical verification checkpoints.
            </p>
          </div>

          <a
            href={getWhatsAppUrl("Hi Master Abdul Ghaffar, I would like to review the 4-step milestone payment schedule and timeline for my wedding date.")}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-lg"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Discuss Workflow on WhatsApp</span>
          </a>
        </div>

      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 3. CRAFTSMANSHIP COMPARISON & MATERIALS MOAT                         */}
      {/* -------------------------------------------------------------------- */}
      <section id="craftsmanship-moat" className="py-24 bg-neutral-900/30 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-xs uppercase font-mono tracking-widest text-amber-400 font-bold block mb-2">
              The Materials Moat
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-neutral-100">
              Why SARTOR Handcraft Outlasts Commercial Replicas
            </h2>
            <p className="mt-4 text-neutral-300 text-sm sm:text-base leading-relaxed">
              Understand the physical engineering difference between authentic Old Lahore adda craftsmanship and commercial computerized mass-production that unravels.
            </p>
          </div>

          {/* Comparison Table */}
          <div className="overflow-x-auto rounded-2xl border border-neutral-800 bg-neutral-900/80 shadow-2xl">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-neutral-800 bg-neutral-950/80 font-mono text-xs uppercase tracking-wider">
                  <th className="py-4 px-6 text-neutral-400 w-1/4">Craftsmanship Metric</th>
                  <th className="py-4 px-6 text-amber-300 w-3/8 bg-amber-950/20 border-x border-amber-500/20">
                    👑 SARTOR Bespoke Atelier (Lahore)
                  </th>
                  <th className="py-4 px-6 text-neutral-400 w-3/8">
                    Commercial Machine / Mass Replica
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/80 text-xs sm:text-sm">
                
                {/* Row 1: Fabric Base */}
                <tr className="hover:bg-neutral-800/30 transition-colors">
                  <td className="py-5 px-6 font-semibold text-neutral-200">
                    <div className="font-mono text-xs text-amber-400 uppercase">Base Fabric Construction</div>
                    Pure 80g/100g Raw Silk vs. Synthetic
                  </td>
                  <td className="py-5 px-6 bg-amber-950/10 border-x border-amber-500/20 text-neutral-200">
                    <div className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-neutral-100 font-semibold block">Pure 80g &amp; 100g Handloom Rungrez Raw Silk</strong>
                        High-twist natural silkworm yarn with breathable microscopic pores. Holds 8kg+ embroidery weight without sagging or tearing under wedding venue heat.
                      </div>
                    </div>
                  </td>
                  <td className="py-5 px-6 text-neutral-400">
                    <div className="flex items-start gap-2.5">
                      <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-neutral-300 block">40g Polyester Blends &amp; Synthetic Crepe</strong>
                        Plastic polymers that trap perspiration, cause chafing, and melt or scorch under bridal steam pressing.
                      </div>
                    </div>
                  </td>
                </tr>

                {/* Row 2: Embroidery Technique */}
                <tr className="hover:bg-neutral-800/30 transition-colors">
                  <td className="py-5 px-6 font-semibold text-neutral-200">
                    <div className="font-mono text-xs text-amber-400 uppercase">Needlework Technique</div>
                    Authentic Zardozi vs. Flat Machine
                  </td>
                  <td className="py-5 px-6 bg-amber-950/10 border-x border-amber-500/20 text-neutral-200">
                    <div className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-neutral-100 font-semibold block">100% Authentic Hand Adda Work</strong>
                        Bullion metallic dabka, hand-pulled kora wire, nakshi spirals, freshwater pearls &amp; French resham silk knots applied stitch-by-stitch for 3D sculptural relief.
                      </div>
                    </div>
                  </td>
                  <td className="py-5 px-6 text-neutral-400">
                    <div className="flex items-start gap-2.5">
                      <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-neutral-300 block">Flat Computerized Threadwork &amp; Glued Foil</strong>
                        Multi-head machine stitching using synthetic nylon filaments and glued acrylic stones that peel, crack, and tarnish after 2 wears.
                      </div>
                    </div>
                  </td>
                </tr>

                {/* Row 3: Seam Margins & Local Alterations */}
                <tr className="hover:bg-neutral-800/30 transition-colors">
                  <td className="py-5 px-6 font-semibold text-neutral-200">
                    <div className="font-mono text-xs text-amber-400 uppercase">Alteration Safeguards</div>
                    Hidden In-Seam Margins
                  </td>
                  <td className="py-5 px-6 bg-amber-950/10 border-x border-amber-500/20 text-neutral-200">
                    <div className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-neutral-100 font-semibold block">Generous 2.5-Inch Hidden Seam Margins</strong>
                        Every choli side dart and lehenga waistband has a 2.5-inch finished allowance + 0.5-inch embroidery buffer zone. Easily opened by any local tailor in London or Houston without unraveling motifs.
                      </div>
                    </div>
                  </td>
                  <td className="py-5 px-6 text-neutral-400">
                    <div className="flex items-start gap-2.5">
                      <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-neutral-300 block">Cut Flush With 0.25-Inch Raw Margins</strong>
                        No room for weight fluctuations. Once machine threads are cut for alterations, continuous bobbin threads unravel completely.
                      </div>
                    </div>
                  </td>
                </tr>

                {/* Row 4: Waistband Suspension */}
                <tr className="hover:bg-neutral-800/30 transition-colors">
                  <td className="py-5 px-6 font-semibold text-neutral-200">
                    <div className="font-mono text-xs text-amber-400 uppercase">Waistband Architecture</div>
                    Weight Balance on Hips
                  </td>
                  <td className="py-5 px-6 bg-amber-950/10 border-x border-amber-500/20 text-neutral-200">
                    <div className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-neutral-100 font-semibold block">3-Tier Canvas Waistband Suspension</strong>
                        Reinforced horsehair buckram &amp; cushioned inner canvas distribute 6–8kg lehenga weight ergonomically across iliac crest bones. Zero hip pinching or sagging.
                      </div>
                    </div>
                  </td>
                  <td className="py-5 px-6 text-neutral-400">
                    <div className="flex items-start gap-2.5">
                      <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-neutral-300 block">Single Thin Dori String</strong>
                        Zero structural canvas. Heavy skirt pulls downward, causing deep red hip bruising, sliding waistlines, and awkward tripping during stage walks.
                      </div>
                    </div>
                  </td>
                </tr>

                {/* Row 5: Production Visibility */}
                <tr className="hover:bg-neutral-800/30 transition-colors">
                  <td className="py-5 px-6 font-semibold text-neutral-200">
                    <div className="font-mono text-xs text-amber-400 uppercase">Client Verification</div>
                    Transparency &amp; Adda Access
                  </td>
                  <td className="py-5 px-6 bg-amber-950/10 border-x border-amber-500/20 text-neutral-200">
                    <div className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-neutral-100 font-semibold block">Weekly Live 4K Adda Video Logs</strong>
                        Direct WhatsApp video calls with Master Abdul Ghaffar and macro photography of the adda frame before panels are cut and stitched.
                      </div>
                    </div>
                  </td>
                  <td className="py-5 px-6 text-neutral-400">
                    <div className="flex items-start gap-2.5">
                      <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-neutral-300 block">Months of Radio Silence &amp; Stock Photos</strong>
                        Third-party middlemen reselling factory surplus. No physical proof until parcel arrives on your doorstep.
                      </div>
                    </div>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>

          {/* Atelier Craftsmanship Callout */}
          <div className="mt-8 p-6 rounded-xl bg-neutral-900 border border-neutral-800 text-center max-w-2xl mx-auto">
            <p className="text-xs text-neutral-300">
              <strong className="text-amber-400 font-mono uppercase">Master Tailor Abdul Ghaffar&apos;s Guarantee:</strong> &ldquo;We never substitute pure raw silk for synthetic organza, and every stitch of kora dabka is laid by human hands in our Lahore karkhana.&rdquo;
            </p>
          </div>

        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 4. DIGITAL SIZING GUIDE & REMOTE MEASUREMENT PROTOCOL                 */}
      {/* -------------------------------------------------------------------- */}
      <section id="digital-sizing-guide" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-neutral-800">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs uppercase font-mono tracking-widest text-amber-400 font-bold block mb-2">
            Remote Precision Protocol
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-neutral-100">
            Digital Sizing &amp; 3D Video Fitting Sessions
          </h2>
          <p className="mt-4 text-neutral-300 text-sm sm:text-base leading-relaxed">
            Eliminating overseas sizing anxiety. Over 85% of our couture brides reside in London, Toronto, Houston, New York, and Dubai. Here is how we guarantee a millimetric fit without you stepping foot in Pakistan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Card 1: Live Video Consultation */}
          <div className="p-8 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 mb-6">
                <Video className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-neutral-100">
                1-on-1 Guided Video Call
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 mt-3 leading-relaxed">
                Connect via Zoom or WhatsApp video with our senior master cutter. We guide you (or a family member/tailor) with a measuring tape step-by-step. We observe posture, shoulder slopes, and bust points in real-time.
              </p>
              <ul className="mt-6 space-y-2.5 text-xs text-neutral-300">
                <li className="flex items-center gap-2">✓ Conducted over your actual wedding heel height</li>
                <li className="flex items-center gap-2">✓ Calibrated for inner bridal shapewear</li>
                <li className="flex items-center gap-2">✓ Session recorded for master cutter reference</li>
              </ul>
            </div>
            <div className="mt-8 pt-4 border-t border-neutral-800 text-[11px] font-mono text-amber-400">
              Avg. Duration: 35 Minutes
            </div>
          </div>

          {/* Card 2: 22-Point Anatomical Chart */}
          <div className="p-8 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 mb-6">
                <Ruler className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-neutral-100">
                22 Anatomical Calibration Points
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 mt-3 leading-relaxed">
                Standard sizing charts fail luxury bridalwear. We map 22 individual measurement dimensions across the torso, arms, waistband, and flare sweep.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] font-mono text-neutral-300 bg-neutral-950 p-4 rounded-xl border border-neutral-800">
                <span>• High Bust / Apex</span>
                <span>• Underbust Ribcage</span>
                <span>• Natural Waist</span>
                <span>• High Hip / Navel</span>
                <span>• Fullest Hip Sweep</span>
                <span>• Shoulder to Apex</span>
                <span>• Front Waist Length</span>
                <span>• Bicep / Armhole</span>
                <span>• Sleeve Hem Circum.</span>
                <span>• Skirt Waist to Floor</span>
              </div>
            </div>
            <div className="mt-8 pt-4 border-t border-neutral-800 text-[11px] font-mono text-amber-400">
              PDF &amp; Video Form Shared On WhatsApp
            </div>
          </div>

          {/* Card 3: Muslin Toile Mockup Trial */}
          <div className="p-8 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6">
                <Scissors className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-neutral-100">
                Optional Muslin Toile Trial
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 mt-3 leading-relaxed">
                For high-value couture orders ($2,800+ USD), we can stitch and express-ship a preliminary cotton muslin mockup of your blouse and waistband directly to London, Toronto, or Houston.
              </p>
              <ul className="mt-6 space-y-2.5 text-xs text-neutral-300">
                <li className="flex items-center gap-2">✓ Test armhole movement and neckline depth</li>
                <li className="flex items-center gap-2">✓ Pin alterations on video with Master Abdul Ghaffar</li>
                <li className="flex items-center gap-2">✓ Ensures 100% zero-risk before silk cutting</li>
              </ul>
            </div>
            <div className="mt-8 pt-4 border-t border-neutral-800 text-[11px] font-mono text-emerald-400">
              Dispatched Via DHL Air Express
            </div>
          </div>

        </div>

        {/* Sizing CTA Banner */}
        <div className="mt-12 text-center">
          <a
            href={getWhatsAppUrl("Hi Master Abdul Ghaffar, I would like to book a Digital Video Measurement Session and receive the SARTOR 22-Point Bridal Measurement Guide.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm tracking-wide shadow-xl shadow-emerald-950/60 hover:shadow-emerald-900/80 transition-all duration-200"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Book Digital Sizing Session on WhatsApp</span>
          </a>
        </div>

      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 5. SOCIAL PROOF & DIASPORA BRIDAL REVIEWS                            */}
      {/* -------------------------------------------------------------------- */}
      <section className="py-24 bg-neutral-900/20 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-xs uppercase font-mono tracking-widest text-amber-400 font-bold block mb-2">
              Overseas Verified Proof
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-neutral-100">
              Trusted by Diaspora Brides Across the Globe
            </h2>
            <p className="mt-4 text-neutral-300 text-sm sm:text-base leading-relaxed">
              Real brides who placed their trust in SARTOR from thousands of miles away.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Review 1 */}
            <div className="p-8 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed italic">
                  &ldquo;Living in Mayfair, London, I was terrified of ordering my Barat lehenga remotely from Lahore. Master Abdul Ghaffar did 3 separate video calls with me. The weekly WhatsApp videos of the adda frame were so reassuring. When DHL delivered the box, the fitting was literally glove-like. Not a single thread out of place!&rdquo;
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-neutral-100">Aleeza R.</h4>
                  <span className="text-[11px] font-mono text-amber-400">London, United Kingdom</span>
                </div>
                <span className="text-[10px] font-mono text-neutral-400">Crimson Barat Lehenga</span>
              </div>
            </div>

            {/* Review 2 */}
            <div className="p-8 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed italic">
                  &ldquo;Bridal boutiques in Houston wanted $6,500 for generic factory pieces. SARTOR created my custom champagne sage Walima gown on pure tissue with hand tilla and crystal work for under $3,200 USD. The 2.5-inch hidden seams gave me complete peace of mind, but we didn&apos;t even need them — the waist was 100% spot-on.&rdquo;
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-neutral-100">Dr. Fatima K.</h4>
                  <span className="text-[11px] font-mono text-amber-400">Houston, Texas (USA)</span>
                </div>
                <span className="text-[10px] font-mono text-neutral-400">Walima Couture Gown</span>
              </div>
            </div>

            {/* Review 3 */}
            <div className="p-8 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed italic">
                  &ldquo;The 4-step milestone payment system made this completely stress-free. In Dubai, everyone asks for 100% upfront and then goes ghost. With SARTOR, I only paid each 30% milestone after seeing HD video proof of my kali embroidery. Delivered to my downtown Dubai apartment in 3 days via DHL.&rdquo;
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-neutral-100">Zara &amp; Hamza M.</h4>
                  <span className="text-[11px] font-mono text-amber-400">Downtown Dubai (UAE)</span>
                </div>
                <span className="text-[10px] font-mono text-neutral-400">16-Kali Mehndi Kalidar</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 6. SOCIAL PROOF & FREQUENTLY ASKED QUESTIONS (OVERSEAS FEARS)        */}
      {/* -------------------------------------------------------------------- */}
      <section id="faqs" className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-neutral-800">
        <div className="text-center mb-16">
          <span className="text-xs uppercase font-mono tracking-widest text-amber-400 font-bold block mb-2">
            Clear Answers
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-neutral-100">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-neutral-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Direct, transparent guidance addressing overseas fears about remote fitting, timelines, payments, and international customs.
          </p>
        </div>

        <div className="space-y-5">
          
          {/* FAQ 1 */}
          <details className="group rounded-2xl bg-neutral-900 border border-neutral-800 p-6 transition-all [&_summary::-webkit-details-marker]:hidden open:border-amber-400/40">
            <summary className="flex cursor-pointer items-center justify-between gap-4 text-neutral-100 font-serif text-lg sm:text-xl font-bold select-none">
              <span>How do I know the fitting will be accurate without visiting Lahore?</span>
              <ChevronDown className="w-5 h-5 text-amber-400 shrink-0 transition-transform duration-300 group-open:rotate-180" />
            </summary>
            <div className="mt-4 pt-4 border-t border-neutral-800 text-xs sm:text-sm text-neutral-300 leading-relaxed space-y-3 font-sans">
              <p>
                Over 85% of our couture brides reside in the UK, USA, Canada, and UAE, and our remote sizing protocol is refined to within 2 millimeters of tolerance.
              </p>
              <p>
                First, our master cutter conducts a live 1-on-1 video call to map 22 anatomical checkpoints over your actual wedding shoes and bridal undergarments. Second, every garment is tailored with generous <strong>2.5-inch hidden internal seam allowances</strong> and 0.5-inch embroidery buffer margins, meaning any local alterations (should your weight fluctuate) are simple and risk-free.
              </p>
              <p>
                For high-tier commissions ($2,800+ USD), we can also ship a preliminary cotton muslin toile mockup to your doorstep in London, Toronto, or Houston to physically test neckline depths and torso contours before touching the pure silk.
              </p>
            </div>
          </details>

          {/* FAQ 2 */}
          <details className="group rounded-2xl bg-neutral-900 border border-neutral-800 p-6 transition-all [&_summary::-webkit-details-marker]:hidden open:border-amber-400/40">
            <summary className="flex cursor-pointer items-center justify-between gap-4 text-neutral-100 font-serif text-lg sm:text-xl font-bold select-none">
              <span>How long does a custom bridal lehenga take to make?</span>
              <ChevronDown className="w-5 h-5 text-amber-400 shrink-0 transition-transform duration-300 group-open:rotate-180" />
            </summary>
            <div className="mt-4 pt-4 border-t border-neutral-800 text-xs sm:text-sm text-neutral-300 leading-relaxed space-y-3 font-sans">
              <p>
                A signature bespoke bridal ensemble typically requires <strong>8 to 12 weeks</strong> of meticulous hand craftsmanship on the wooden adda frame, while museum-grade heavy Barat heirlooms require <strong>12 to 16 weeks</strong>.
              </p>
              <p>
                For brides with urgent wedding dates, we offer an <strong>Express Atelier Service (4 to 6 weeks)</strong> by assigning multiple dedicated master karigars to work dual shifts on your adda frame.
              </p>
              <p>
                International air shipping via DHL Express takes just <strong>3 to 5 business days</strong> door-to-door once dispatched from our Lahore workshop.
              </p>
            </div>
          </details>

          {/* FAQ 3 */}
          <details className="group rounded-2xl bg-neutral-900 border border-neutral-800 p-6 transition-all [&_summary::-webkit-details-marker]:hidden open:border-amber-400/40">
            <summary className="flex cursor-pointer items-center justify-between gap-4 text-neutral-100 font-serif text-lg sm:text-xl font-bold select-none">
              <span>How are payments handled for international clients?</span>
              <ChevronDown className="w-5 h-5 text-amber-400 shrink-0 transition-transform duration-300 group-open:rotate-180" />
            </summary>
            <div className="mt-4 pt-4 border-t border-neutral-800 text-xs sm:text-sm text-neutral-300 leading-relaxed space-y-3 font-sans">
              <p>
                We protect overseas buyers through our transparent <strong>4-Stage Milestone Escrow Structure</strong>:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-neutral-300">
                <li><strong>10% Token Booking:</strong> Locks your wedding date slot, design consultation, and sketch alignment.</li>
                <li><strong>30% Adda Swatch Approval:</strong> Released only after you approve 4K macro video footage of your dyed silk and first hand-embroidered motifs on the frame.</li>
                <li><strong>30% Mid-Production Assembly:</strong> Released once all panels/kalis are unclipped, measured, and joined for symmetry review.</li>
                <li><strong>30% Final Dispatch:</strong> Released after full 360° mannequin video inspection and before DHL Express dispatch.</li>
              </ul>
              <p>
                We accept payments via Wise, Remitly, international wire transfer, and online credit card invoicing in USD ($), GBP (£), CAD ($), and AED.
              </p>
            </div>
          </details>

          {/* FAQ 4 */}
          <details className="group rounded-2xl bg-neutral-900 border border-neutral-800 p-6 transition-all [&_summary::-webkit-details-marker]:hidden open:border-amber-400/40">
            <summary className="flex cursor-pointer items-center justify-between gap-4 text-neutral-100 font-serif text-lg sm:text-xl font-bold select-none">
              <span>Can you recreate a designer runway bridal or customize colors and neckline?</span>
              <ChevronDown className="w-5 h-5 text-amber-400 shrink-0 transition-transform duration-300 group-open:rotate-180" />
            </summary>
            <div className="mt-4 pt-4 border-t border-neutral-800 text-xs sm:text-sm text-neutral-300 leading-relaxed space-y-3 font-sans">
              <p>
                Yes, absolutely. Over 60% of our commissions are bespoke adaptations of celebrity looks (Sabyasachi, Faraz Manan, Bunto Kazmi, Elan) or Pinterest moodboards.
              </p>
              <p>
                Because everything is made from scratch on our wooden addas, you have 100% freedom to modify neckline depths, raise backs for modesty, adjust sleeve cuts, add a second dupatta veil, or alter color palettes against Pantone swatches.
              </p>
            </div>
          </details>

          {/* FAQ 5 */}
          <details className="group rounded-2xl bg-neutral-900 border border-neutral-800 p-6 transition-all [&_summary::-webkit-details-marker]:hidden open:border-amber-400/40">
            <summary className="flex cursor-pointer items-center justify-between gap-4 text-neutral-100 font-serif text-lg sm:text-xl font-bold select-none">
              <span>What happens if my weight changes between my order date and wedding day?</span>
              <ChevronDown className="w-5 h-5 text-amber-400 shrink-0 transition-transform duration-300 group-open:rotate-180" />
            </summary>
            <div className="mt-4 pt-4 border-t border-neutral-800 text-xs sm:text-sm text-neutral-300 leading-relaxed space-y-3 font-sans">
              <p>
                Brides frequently gain or lose weight during wedding planning. We engineer every bridal garment specifically for this reality.
              </p>
              <p>
                We leave a full <strong>2.5 inches of finished fabric allowance</strong> inside every choli side seam and lehenga waistband, reinforced with a 0.5-inch hand-embroidery buffer zone. Our waistbands feature a 3-tier adjustable hook-and-bar system. Any local seamstress in your home city can easily let the outfit out or take it in by up to 2 dress sizes without touching the zardozi motifs.
              </p>
            </div>
          </details>

          {/* FAQ 6 */}
          <details className="group rounded-2xl bg-neutral-900 border border-neutral-800 p-6 transition-all [&_summary::-webkit-details-marker]:hidden open:border-amber-400/40">
            <summary className="flex cursor-pointer items-center justify-between gap-4 text-neutral-100 font-serif text-lg sm:text-xl font-bold select-none">
              <span>How are customs, duties, and DHL shipping handled for UK, USA, Canada &amp; UAE?</span>
              <ChevronDown className="w-5 h-5 text-amber-400 shrink-0 transition-transform duration-300 group-open:rotate-180" />
            </summary>
            <div className="mt-4 pt-4 border-t border-neutral-800 text-xs sm:text-sm text-neutral-300 leading-relaxed space-y-3 font-sans">
              <p>
                We partner with DHL Express and FedEx International Priority. Every bridal package is packed in a moisture-resistant archival preservation casing and dispatched with complete door-to-door insurance and signature verification.
              </p>
              <p>
                Our export documentation team handles standard commercial invoices and customs declarations to ensure seamless international transit. Delivery directly to your doorstep takes 3 to 5 business days once cleared.
              </p>
            </div>
          </details>

        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 7. FINAL HIGH-CONVERSION CTA & CONSULTATION SECTION                   */}
      {/* -------------------------------------------------------------------- */}
      <section className="py-24 bg-neutral-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-amber-950/20 via-transparent to-neutral-950 pointer-events-none" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-mono uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Now Booking 2026/2027 Weddings</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-neutral-100 tracking-tight leading-tight">
            Ready to Create Your Bespoke Bridal Masterpiece?
          </h2>

          <p className="mt-6 text-neutral-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Speak directly with Master Tailor Abdul Ghaffar at our Lahore atelier. Send your event date, moodboard photos, and budget expectations to receive a comprehensive quote within hours.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
            <a
              href={primaryWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-base tracking-wide shadow-xl shadow-emerald-950/70 hover:shadow-emerald-900/90 transition-all duration-200 group"
            >
              <MessageCircle className="w-5 h-5 text-emerald-100 group-hover:scale-110 transition-transform" />
              <span>💬 Chat on WhatsApp for Custom Bridal Quote</span>
            </a>
          </div>

          <div className="mt-8 pt-8 border-t border-neutral-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono text-neutral-400 text-center">
            <div>
              <span className="text-amber-400 block font-bold mb-0.5">DIRECT WHATSAPP</span>
              <span>+92 335 2209991</span>
            </div>
            <div>
              <span className="text-amber-400 block font-bold mb-0.5">ATELIER LOCATION</span>
              <span>Liberty Market / Gulberg III, Lahore</span>
            </div>
            <div>
              <span className="text-amber-400 block font-bold mb-0.5">GLOBAL EXPRESS</span>
              <span>3–5 Days Via Insured DHL</span>
            </div>
          </div>

        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 8. FOOTER                                                            */}
      {/* -------------------------------------------------------------------- */}
      <footer className="py-12 bg-neutral-950 border-t border-neutral-800 text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-amber-400 tracking-wider">SARTOR</span>
            <span>• Master Bespoke Atelier Lahore</span>
          </div>
          <div>
            © {new Date().getFullYear()} SARTOR (sartor.pk). High-Ticket Bridal &amp; Couture Division. All Rights Reserved.
          </div>
        </div>
      </footer>

      {/* -------------------------------------------------------------------- */}
      {/* 9. CONVERSION ENGINEERING: STICKY FLOATING WHATSAPP BAR              */}
      {/* -------------------------------------------------------------------- */}
      {/* Mobile Sticky Bar (Always visible on mobile viewports) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-3 bg-neutral-950/95 border-t border-neutral-800 backdrop-blur-lg flex items-center justify-between gap-3 shadow-2xl">
        <div className="flex flex-col">
          <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Abdul Ghaffar Online
          </span>
          <span className="text-[11px] text-neutral-300 font-medium">Bespoke Bridal ($2k+)</span>
        </div>
        <a
          href={primaryWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs tracking-wide shadow-lg shadow-emerald-950/80 active:scale-95 transition-all"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Chat on WhatsApp</span>
        </a>
      </div>

      {/* Desktop Floating Widget (Fixed Bottom-Right) */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-50 flex-col items-end">
        <a
          href={primaryWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 p-3.5 pr-5 rounded-full bg-neutral-900/95 hover:bg-neutral-800 border border-neutral-700/80 hover:border-emerald-500/50 shadow-2xl shadow-neutral-950/80 backdrop-blur-md transition-all duration-300 hover:scale-105"
        >
          <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-950/60 group-hover:bg-emerald-500 transition-colors">
            <MessageCircle className="w-5 h-5" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Master Tailor Consult</span>
            <span className="text-xs font-semibold text-neutral-100 group-hover:text-amber-300 transition-colors">
              💬 Inquire on WhatsApp
            </span>
          </div>
        </a>
      </div>

    </div>
  );
}
