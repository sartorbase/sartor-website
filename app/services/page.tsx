import React from 'react';
import type { Metadata } from 'next';
import {
  MessageCircle,
  Scissors,
  Sparkles,
  MapPin,
  CheckCircle2,
  Video,
  Truck,
  ShieldCheck,
  Ruler,
  Clock,
  Layers,
  ArrowRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: "Tailor Model Town Lahore | Lehenga & Saree Tailor Near Me | SARTOR Atelier",
  description: "Searching for the best tailor in Model Town or lehenga and saree tailor near me? SARTOR provides luxury bespoke stitching in Lahore. 100% Guaranteed Custom Fit via Guided Video Calls. Insured DHL Express Shipping to USA, UK, Canada & UAE (3–5 Days).",
  keywords: [
    "tailor model town",
    "lehenga tailoring near me",
    "saree tailor near me",
    "best ladies tailor in model town lahore",
    "bridal lehenga stitching lahore",
    "saree blouse stitching lahore",
    "custom pakistani tailor near me",
    "pakistani dress stitching overseas",
  ],
  alternates: {
    canonical: 'https://www.sartor.pk/services',
  },
  openGraph: {
    title: "Tailor Model Town Lahore | Lehenga & Saree Tailor Near Me | SARTOR Atelier",
    description: "Expert bespoke tailoring in Model Town, Lahore. Handcrafted bridal lehengas, saree blouses, 16-kali kalidars, and suits. Free Lahore pickup & worldwide DHL delivery.",
    url: 'https://www.sartor.pk/services',
    siteName: 'SARTOR Bespoke Atelier Lahore',
    images: [
      {
        url: 'https://www.sartor.pk/images/how-to-choose-a-good-tailor-in-lahore.jpg',
        width: 1200,
        height: 630,
        alt: "SARTOR Bespoke Tailoring Services Model Town Lahore",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Tailor Model Town | Lehenga & Saree Tailor Near Me | SARTOR",
    description: "Bespoke tailoring in Model Town Lahore. 100% Guaranteed Custom Fit via Guided Video Calls. Insured DHL Express Shipping (3–5 Days).",
    images: ['https://www.sartor.pk/images/how-to-choose-a-good-tailor-in-lahore.jpg'],
  },
};

const WHATSAPP_INTL = '923352209991';

function getWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_INTL}?text=${encodeURIComponent(message)}`;
}

export default function ServicesPage() {
  const serviceWhatsAppMsg = (serviceName: string) => `*TAILORING SERVICE INQUIRY - SARTOR LAHORE*
---------------------------------------
Assalam-o-Alaikum Master Tailor Abdul Ghaffar,
I would like to inquire about: *${serviceName}*.

• Location: Lahore (Local Pickup / Studio Visit) or Overseas (USA/UK/Canada/UAE)
• Studio: Moon Tower, International Market, Model Town, Lahore
• Requirement: Fit consultation, stitching rates, and turnaround timeline.

Please let me know how to proceed.`;

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
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            Moon Tower Studio, Model Town • Free Lahore Doorstep Pickup
          </span>
        </div>
      </div>

      {/* Header */}
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
                Model Town Lahore • Tailoring Directory
              </span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-300">
            <a href="/" className="hover:text-amber-400 transition-colors">
              Atelier Home
            </a>
            <a href="/custom-bridal" className="hover:text-amber-400 text-amber-300 font-semibold transition-colors">
              Custom Bridal ($2k+)
            </a>
            <a href="/blog" className="hover:text-amber-400 transition-colors">
              Couture Journal
            </a>
            <a
              href="https://maps.app.goo.gl/7JKsRY1k9Aw4MJC68"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-400 hover:text-stone-100 text-xs flex items-center gap-1"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              Moon Tower Studio
            </a>
          </nav>

          <a
            href={getWhatsAppUrl(serviceWhatsAppMsg('General Tailoring Consultation'))}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-lg transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Consult on WhatsApp</span>
          </a>
        </div>
      </header>

      {/* Main Hero Banner */}
      <section className="py-16 sm:py-20 border-b border-stone-850 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono mb-4">
            <Scissors className="w-3.5 h-3.5 text-amber-400" />
            <span>Moon Tower, Model Town, Lahore • Doorstep Pickup & Worldwide Dispatch</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-100 tracking-tight">
            Master Bespoke Tailoring Services in Lahore
          </h1>

          <p className="mt-4 text-stone-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Whether you need a master tailor near you in Model Town for delicate saree fall and blouse stitching, or custom bridal lehenga tailoring shipped express via DHL to London, New York, or Dubai—Master Tailor Abdul Ghaffar delivers millimeter-accurate couture.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 bg-stone-900 border border-stone-800 px-4 py-2 rounded-full text-xs text-stone-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Doorstep Pickup Across Lahore (Model Town, DHA, Gulberg, Cantt)</span>
            </div>
            <div className="flex items-center gap-2 bg-stone-900 border border-stone-800 px-4 py-2 rounded-full text-xs text-stone-300">
              <Video className="w-4 h-4 text-amber-400" />
              <span>Remote Video Measurement Sessions for Overseas Clients</span>
            </div>
            <div className="flex items-center gap-2 bg-stone-900 border border-stone-800 px-4 py-2 rounded-full text-xs text-stone-300">
              <Truck className="w-4 h-4 text-amber-400" />
              <span>Insured 3–5 Day Worldwide Express Delivery</span>
            </div>
          </div>
        </div>
      </section>

      {/* Service Grid */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Service 1: Bridal Lehengas */}
          <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-6 flex flex-col justify-between hover:border-amber-500/50 transition-all">
            <div>
              <div className="text-xs font-mono text-amber-400 uppercase font-semibold">Bridal &amp; Baraat</div>
              <h2 className="text-2xl font-serif font-bold text-stone-100 mt-1">
                Lehenga Tailoring &amp; Couture
              </h2>
              <p className="text-stone-300 text-sm mt-3 leading-relaxed">
                Searching for expert lehenga tailoring near me in Lahore? We specialize in heavy Zardozi bridal skirts, flared can-can suspension, farshi ghararas, and cholis engineered with 2.5-inch hidden alteration margins.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-stone-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>3-tier canvas waistband suspension eliminates waist drop</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Pure 80g/100g raw silk bases &amp; Habotai slip linings</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Weekly live video updates on the embroidery adda frame</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-stone-800 flex items-center justify-between">
              <span className="text-stone-400 text-xs font-mono">From PKR 10,000 / $2,000+ Custom</span>
              <a
                href={getWhatsAppUrl(serviceWhatsAppMsg('Lehenga Tailoring & Bridal Couture'))}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-all inline-flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white" />
                <span>Book Fitting</span>
              </a>
            </div>
          </div>

          {/* Service 2: Saree & Blouse */}
          <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-6 flex flex-col justify-between hover:border-amber-500/50 transition-all">
            <div>
              <div className="text-xs font-mono text-amber-400 uppercase font-semibold">Saree Specialists</div>
              <h2 className="text-2xl font-serif font-bold text-stone-100 mt-1">
                Saree Blouse &amp; Fall Tailoring
              </h2>
              <p className="text-stone-300 text-sm mt-3 leading-relaxed">
                Your premier saree tailor near me in Model Town, Lahore. Blouse cups engineered to your bust anatomy, deep-back structuring with secure tie-backs, cotton fall stitching, and delicate pico finish.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-stone-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Built-in contoured padding &amp; bra-strap security locks</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Seamless pre-washed cotton fall prevents silk puckering</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Ready-to-wear pleated saree drape options available</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-stone-800 flex items-center justify-between">
              <span className="text-stone-400 text-xs font-mono">From PKR 7,000 (Set)</span>
              <a
                href={getWhatsAppUrl(serviceWhatsAppMsg('Saree Blouse & Fall Tailoring'))}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-all inline-flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white" />
                <span>Order Saree Stitching</span>
              </a>
            </div>
          </div>

          {/* Service 3: Kalidar & Festive Maxis */}
          <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-6 flex flex-col justify-between hover:border-amber-500/50 transition-all">
            <div>
              <div className="text-xs font-mono text-amber-400 uppercase font-semibold">Festive Silhouette</div>
              <h2 className="text-2xl font-serif font-bold text-stone-100 mt-1">
                16-Kali Kalidar &amp; Flow Maxis
              </h2>
              <p className="text-stone-300 text-sm mt-3 leading-relaxed">
                Flawlessly calibrated panels with zero waist bunching. Perfect for Mehndis, Mayuns, and festive evenings. Hand-embroidered bodice yokes, kiran trim, and pure malmal lining.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-stone-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Full 180° to 360° circular flare drafting</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Even floor hemline leveling with bridal shoes calibrated</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Breathable natural silk linings for non-itch wear</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-stone-800 flex items-center justify-between">
              <span className="text-stone-400 text-xs font-mono">From PKR 7,000</span>
              <a
                href={getWhatsAppUrl(serviceWhatsAppMsg('16-Kali Kalidar & Festive Maxis'))}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-all inline-flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white" />
                <span>Book Kalidar Fit</span>
              </a>
            </div>
          </div>

          {/* Service 4: Double Suits & Luxury Pret */}
          <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-6 flex flex-col justify-between hover:border-amber-500/50 transition-all">
            <div>
              <div className="text-xs font-mono text-amber-400 uppercase font-semibold">Everyday Luxury</div>
              <h2 className="text-2xl font-serif font-bold text-stone-100 mt-1">
                Double Suits &amp; Lined Pret
              </h2>
              <p className="text-stone-300 text-sm mt-3 leading-relaxed">
                Raw silk, organza, and chiffon suits lined with seamless matching cotton lawn or silk slips. Interfaced necklines that maintain architectural crispness wash after wash.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-stone-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>German-fused collars and plackets</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Overlocked internal seams and hidden hems</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Straight pants, tulip shalwars, and flared culottes</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-stone-800 flex items-center justify-between">
              <span className="text-stone-400 text-xs font-mono">From PKR 4,000</span>
              <a
                href={getWhatsAppUrl(serviceWhatsAppMsg('Double Suits & Lined Pret'))}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-all inline-flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white" />
                <span>Order Suit</span>
              </a>
            </div>
          </div>

          {/* Service 5: Simple Everyday Suits */}
          <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-6 flex flex-col justify-between hover:border-amber-500/50 transition-all">
            <div>
              <div className="text-xs font-mono text-amber-400 uppercase font-semibold">Classic Stitching</div>
              <h2 className="text-2xl font-serif font-bold text-stone-100 mt-1">
                Simple 2-Piece &amp; 3-Piece Suits
              </h2>
              <p className="text-stone-300 text-sm mt-3 leading-relaxed">
                Precision cut lawn, cotton, linen, and khaddar unstitched designer suits. Crisp tailoring that sits naturally on your shoulders with clean daman and chaak finishes.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-stone-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Free doorstep pickup in Model Town &amp; surrounding areas</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Accurate pattern duplication from your best-fitting sample</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Fast 4 to 6 day turnaround</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-stone-800 flex items-center justify-between">
              <span className="text-stone-400 text-xs font-mono">From PKR 2,500</span>
              <a
                href={getWhatsAppUrl(serviceWhatsAppMsg('Simple Everyday Suits'))}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-all inline-flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white" />
                <span>Book Pickup</span>
              </a>
            </div>
          </div>

          {/* Service 6: Custom Designer Reproduction */}
          <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-6 flex flex-col justify-between hover:border-amber-500/50 transition-all">
            <div>
              <div className="text-xs font-mono text-amber-400 uppercase font-semibold">Custom Design Studio</div>
              <h2 className="text-2xl font-serif font-bold text-stone-100 mt-1">
                Celebrity &amp; Moodboard Replicas
              </h2>
              <p className="text-stone-300 text-sm mt-3 leading-relaxed">
                Have a photo or runway moodboard? Share your screenshot on WhatsApp. Master Tailor Abdul Ghaffar calculates exact fabric meters, dye formulations, and stitching structures.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-stone-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Fabric sourcing guidance across Lahore&apos;s heritage bazaars</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Custom dye matching to your pantone or reference swatch</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Adda hand embroidery integration on request</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-stone-800 flex items-center justify-between">
              <span className="text-stone-400 text-xs font-mono">Custom Estimate</span>
              <a
                href={getWhatsAppUrl(serviceWhatsAppMsg('Custom Designer Photo / Moodboard Estimate'))}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-all inline-flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white" />
                <span>Send Photo</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Local Studio & Doorstep Coverage */}
      <section className="bg-stone-900/50 border-t border-stone-850 py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100">
            Visit Our Model Town Atelier or Book Free Doorstep Pickup
          </h2>
          <p className="mt-3 text-stone-300 text-sm sm:text-base max-w-2xl mx-auto">
            Located conveniently in Moon Tower, International Market, Model Town, Lahore. We provide free doorstep fabric collection and delivery across Model Town, DHA, Gulberg, Cantt, Garden Town, and Faisal Town.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://maps.app.goo.gl/7JKsRY1k9Aw4MJC68"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-850 text-stone-200 border border-stone-800 px-6 py-3.5 rounded-xl text-sm font-medium transition-all"
            >
              <MapPin className="w-4 h-4 text-amber-500" />
              <span>Open Moon Tower in Google Maps</span>
            </a>

            <a
              href={getWhatsAppUrl(serviceWhatsAppMsg('Doorstep Fabric Pickup Booking'))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3.5 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-emerald-950/40"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Book Doorstep Fabric Pickup (Lahore)</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-950 border-t border-stone-850 py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-stone-400">
          <div>
            <div className="font-serif text-base text-stone-200 font-bold">SARTOR Bespoke Atelier Lahore</div>
            <div>Moon Tower, Model Town, Lahore | WhatsApp: +92 335 2209991</div>
          </div>
          <div className="flex gap-6">
            <a href="/" className="hover:text-amber-400">Home</a>
            <a href="/custom-bridal" className="hover:text-amber-400">Custom Bridal</a>
            <a href="/blog" className="hover:text-amber-400">Journal</a>
            <a href="https://maps.app.goo.gl/7JKsRY1k9Aw4MJC68" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400">Location</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
