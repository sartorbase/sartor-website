import React from 'react';
import {
  MessageCircle,
  Scissors,
  MapPin,
  CheckCircle2,
  Video,
  Truck,
  ArrowRight,
} from 'lucide-react';
import { buildWhatsAppLink } from '../../services/analytics';

export const ServicesPageView: React.FC = () => {
  const serviceWhatsAppMsg = (serviceName: string) => `*TAILORING SERVICE INQUIRY - SARTOR LAHORE*
---------------------------------------
Assalam-o-Alaikum Master Tailor Abdul Ghaffar,
I would like to inquire about: *${serviceName}*.

• Location: Lahore (Local Pickup / Studio Visit) or Overseas (USA/UK/Canada/UAE)
• Studio: Moon Tower, International Market, Model Town, Lahore
• Requirement: Fit consultation, stitching rates, and turnaround timeline.

Please let me know how to proceed.`;

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col">
      {/* Top Value Proposition Bar */}
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
            Whether you need an expert ladies tailor in Model Town for delicate saree fall and blouse stitching, or custom bridal lehenga tailoring shipped express via DHL to London, New York, or Dubai—Master Tailor Abdul Ghaffar delivers millimeter-accurate couture.
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
                href={buildWhatsAppLink(serviceWhatsAppMsg('Lehenga Tailoring & Bridal Couture'), 'services_page')}
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
                href={buildWhatsAppLink(serviceWhatsAppMsg('Saree Blouse & Fall Tailoring'), 'services_page')}
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
                href={buildWhatsAppLink(serviceWhatsAppMsg('16-Kali Kalidar & Festive Maxis'), 'services_page')}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-all inline-flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white" />
                <span>Book Kalidar Fit</span>
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
              href={buildWhatsAppLink(serviceWhatsAppMsg('Doorstep Fabric Pickup Booking'), 'services_pickup')}
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
    </div>
  );
};
