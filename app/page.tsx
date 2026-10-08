import React from 'react';
import type { Metadata } from 'next';
import {
  MessageCircle,
  ShieldCheck,
  Video,
  Truck,
  Sparkles,
  Scissors,
  CheckCircle2,
  ArrowRight,
  Ruler,
  Globe2,
  Clock,
  Star,
  Layers,
  MapPin,
  Phone,
} from 'lucide-react';

export const metadata: Metadata = {
  title: "Pakistani Tailor & Bespoke Tailors Lahore | Express USA/UK/UAE Shipping | SARTOR",
  description: "Master bespoke Pakistani tailor in Lahore. Handcrafted bridal lehengas, 16-kali kalidars, sarees, & luxury couture. 100% Guaranteed Custom Fit via Guided Video Calls. Insured DHL Express Shipping to USA, UK, Canada & UAE (3–5 Days).",
  keywords: [
    "pakistani tailor",
    "bespoke tailors lahore",
    "pakistani custom tailoring",
    "custom bridal tailoring lahore",
    "pakistani bridal lehengas",
    "tailor model town lahore",
    "pakistani dress stitching online",
    "express pakistani tailor uk usa",
  ],
  alternates: {
    canonical: 'https://www.sartor.pk',
  },
  openGraph: {
    title: "Pakistani Tailor & Bespoke Tailors Lahore | Express Worldwide Shipping | SARTOR",
    description: "Master bespoke Pakistani tailor in Lahore. 100% Guaranteed Custom Fit via Guided Video Calls. Insured DHL Express Shipping to USA, UK, Canada & UAE (3–5 Days).",
    url: 'https://www.sartor.pk',
    siteName: 'SARTOR Bespoke Atelier Lahore',
    images: [
      {
        url: 'https://www.sartor.pk/images/how-to-choose-a-good-tailor-in-lahore.jpg',
        width: 1200,
        height: 630,
        alt: "SARTOR Bespoke Pakistani Tailoring Lahore",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Pakistani Tailor & Bespoke Tailors Lahore | SARTOR",
    description: "100% Guaranteed Custom Fit via Guided Video Calls. Insured DHL Express Shipping to USA, UK, Canada & UAE (3–5 Days).",
    images: ['https://www.sartor.pk/images/how-to-choose-a-good-tailor-in-lahore.jpg'],
  },
};

const WHATSAPP_INTL = '923352209991';

function getWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_INTL}?text=${encodeURIComponent(message)}`;
}

export default function HomePage() {
  const heroWhatsAppMsg = `*BESPOKE TAILORING INQUIRY - SARTOR LAHORE*
---------------------------------------
Assalam-o-Alaikum Master Tailor Abdul Ghaffar,
I am interested in custom Pakistani tailoring with SARTOR.

• Service: Bespoke Tailoring / Bridal Couture / Luxury Pret
• Location: Pakistan / Overseas (USA/UK/Canada/UAE)
• Request: Guided Video Fitting Consultation & Fabric Guidance

Please let me know how we can begin.`;

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col selection:bg-amber-800 selection:text-white">
      {/* Top Overseas Value Proposition Bar */}
      <div className="bg-stone-900/90 border-b border-amber-900/40 text-xs py-2.5 px-4 text-center">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-stone-300 font-medium">
          <span className="flex items-center gap-1.5 text-amber-300">
            <Video className="w-3.5 h-3.5 text-amber-400" />
            <strong className="text-amber-200">100% Guaranteed Custom Fit</strong> via Guided Video Calls
          </span>
          <span className="hidden md:inline text-stone-700">•</span>
          <span className="flex items-center gap-1.5 text-stone-300">
            <Truck className="w-3.5 h-3.5 text-amber-400" />
            <strong className="text-stone-100">Insured DHL Express Shipping</strong> to USA, UK, Canada & UAE (3–5 Days)
          </span>
          <span className="hidden md:inline text-stone-700">•</span>
          <span className="flex items-center gap-1.5 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            2.5-Inch Internal Seam Margins for Local Adaptability
          </span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <header className="sticky top-0 z-50 bg-stone-950/90 backdrop-blur-md border-b border-stone-850 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-stone-950 font-serif font-black text-sm">
              S
            </div>
            <div>
              <span className="font-serif text-xl tracking-wider font-bold text-stone-100 group-hover:text-amber-400 transition-colors">
                SARTOR
              </span>
              <span className="block text-[10px] font-mono tracking-widest text-stone-400 uppercase">
                Lahore Atelier • Model Town
              </span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-300">
            <a href="/services" className="hover:text-amber-400 transition-colors">
              Atelier Services
            </a>
            <a href="/custom-bridal" className="hover:text-amber-400 text-amber-300 font-semibold transition-colors flex items-center gap-1">
              Custom Bridal ($2k+)
              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/40">
                Overseas
              </span>
            </a>
            <a href="/blog" className="hover:text-amber-400 transition-colors">
              Couture Journal
            </a>
            <a
              href="https://maps.app.goo.gl/7JKsRY1k9Aw4MJC68"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-100 text-stone-400 text-xs flex items-center gap-1"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              Moon Tower Studio
            </a>
          </nav>

          <a
            href={getWhatsAppUrl(heroWhatsAppMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-lg transition-all shadow-md shadow-emerald-950/40"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Chat with Master Tailor</span>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28 border-b border-stone-850">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-stone-800/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono mb-6">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Pakistani Tailor of Choice for Diaspora Brides & Luxury Couture</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-stone-100 tracking-tight leading-tight">
            Premier Bespoke Tailors in Lahore.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200">
              Tailored for Worldwide Perfection.
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-stone-300 max-w-3xl mx-auto leading-relaxed">
            From 16-kali flow kalidars to heirloom Zardozi bridal lehengas, SARTOR bridges heritage Lahore craftsmanship with effortless global delivery. Guided 3D video fittings, transparent adda production updates, and 3–5 day express door-to-door transit to London, New York, Toronto, Houston, and Dubai.
          </p>

          {/* Dual CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={getWhatsAppUrl(heroWhatsAppMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-7 py-4 rounded-xl text-base shadow-xl shadow-emerald-950/50 transition-all cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>Book Remote Consultation on WhatsApp</span>
            </a>

            <a
              href="/custom-bridal"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-850 text-stone-200 font-medium px-6 py-4 rounded-xl text-base border border-stone-800 hover:border-amber-500/40 transition-all"
            >
              <span>Explore Custom Bridal ($2k+)</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </a>
          </div>

          {/* Trust Row */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-850">
              <Video className="w-5 h-5 text-amber-400 mb-2" />
              <div className="font-semibold text-stone-200 text-sm">Guided Video Calls</div>
              <div className="text-xs text-stone-400 mt-1">100% Guaranteed custom fit by Master Tailor Abdul Ghaffar</div>
            </div>

            <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-850">
              <Truck className="w-5 h-5 text-amber-400 mb-2" />
              <div className="font-semibold text-stone-200 text-sm">3–5 Day DHL Express</div>
              <div className="text-xs text-stone-400 mt-1">Fully insured air freight with live tracking to USA, UK, UAE & CA</div>
            </div>

            <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-850">
              <Scissors className="w-5 h-5 text-amber-400 mb-2" />
              <div className="font-semibold text-stone-200 text-sm">2.5-Inch Seam Margins</div>
              <div className="text-xs text-stone-400 mt-1">Generous hidden allowances for future alterations anywhere</div>
            </div>

            <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-850">
              <ShieldCheck className="w-5 h-5 text-amber-400 mb-2" />
              <div className="font-semibold text-stone-200 text-sm">4-Stage Milestone Pay</div>
              <div className="text-xs text-stone-400 mt-1">10% token, 30% adda sample, 30% mid-make, 30% final dispatch</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tailoring Disciplines & Quick Access */}
      <section className="py-16 bg-stone-900/40 border-b border-stone-850">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-amber-400 font-mono text-xs uppercase tracking-wider font-semibold">
                Bespoke Services
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100 mt-1">
                Precision Women&apos;s Tailoring in Model Town, Lahore
              </h2>
            </div>
            <a
              href="/services"
              className="text-amber-400 hover:text-amber-300 text-sm font-semibold flex items-center gap-1.5 mt-2 md:mt-0"
            >
              <span>View Full Services &amp; Pricing Directory</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 hover:border-amber-500/50 transition-all flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-amber-400 font-semibold uppercase">High Couture</span>
                <h3 className="text-xl font-serif font-bold text-stone-100 mt-1">
                  Custom Bridal Lehengas &amp; Ghararas
                </h3>
                <p className="text-stone-300 text-sm mt-3 leading-relaxed">
                  Authentic hand-embroidered Zardozi, kora, dabka, and marori on pure 80g/100g raw silk. Structured 3-tier canvas waistband suspension and custom flare.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-stone-800 flex items-center justify-between">
                <span className="text-stone-400 text-xs font-mono">Bespoke from $2,000+</span>
                <a href="/custom-bridal" className="text-amber-400 text-xs font-semibold hover:underline">
                  Bridal Suite &rarr;
                </a>
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 hover:border-amber-500/50 transition-all flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-amber-400 font-semibold uppercase">Heritage Drapes</span>
                <h3 className="text-xl font-serif font-bold text-stone-100 mt-1">
                  Saree Stitching &amp; Fall Finishing
                </h3>
                <p className="text-stone-300 text-sm mt-3 leading-relaxed">
                  Tailor-fitted blouses with bra-cup structuring, back tie-ups, seamless cotton falls, and pico edging. Perfect drape for organza, silk, and banarsi sarees.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-stone-800 flex items-center justify-between">
                <span className="text-stone-400 text-xs font-mono">Local &amp; Overseas Delivery</span>
                <a href="/services" className="text-amber-400 text-xs font-semibold hover:underline">
                  View Rates &rarr;
                </a>
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 hover:border-amber-500/50 transition-all flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-amber-400 font-semibold uppercase">Festive Pret</span>
                <h3 className="text-xl font-serif font-bold text-stone-100 mt-1">
                  16-Kali Kalidars &amp; Luxury Suits
                </h3>
                <p className="text-stone-300 text-sm mt-3 leading-relaxed">
                  Flawless panel alignment, bias-cut flare, pure malmal slip linings, and hand-embroidered necklines. Crafted to accentuate grace without bulk.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-stone-800 flex items-center justify-between">
                <span className="text-stone-400 text-xs font-mono">Free Lahore Pickup</span>
                <a href="/services" className="text-amber-400 text-xs font-semibold hover:underline">
                  Explore Designs &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-stone-950 border-t border-stone-850 py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-stone-400">
          <div>
            <div className="font-serif text-base text-stone-200 font-bold">SARTOR Bespoke Atelier Lahore</div>
            <div>Moon Tower, International Market, Model Town, Lahore, Pakistan | Tel: +92 335 2209991</div>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <a href="/services" className="hover:text-amber-400 transition-colors">Services</a>
            <a href="/custom-bridal" className="hover:text-amber-400 transition-colors">Custom Bridal</a>
            <a href="/blog" className="hover:text-amber-400 transition-colors">Journal</a>
            <a href="https://maps.app.goo.gl/7JKsRY1k9Aw4MJC68" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">Studio Location</a>
          </div>
          <div className="text-stone-500">
            © {new Date().getFullYear()} SARTOR. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
