import React from 'react';
import {
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  Layers,
  Scale,
  Ruler,
  Compass,
} from 'lucide-react';
import { WHATSAPP_LINK } from '../lib/constants';

export const SareeDrapingGuideSection: React.FC = () => {
  const sareeWhatsAppMsg = `*SAREE & BLOUSE TAILORING INQUIRY - SARTOR LAHORE*
---------------------------------------
Assalam-o-Alaikum Master Tailor Abdul Ghaffar,
I am interested in custom saree stitching with structural blouse boning and anti-slip weighted fall finishing.

• Fabric Type: Chiffon / Organza / Raw Silk / Banarsi
• Blouse Style: Padded Sweetheart / Deep Back / High Neck
• Location: Pakistan / Overseas (UK/USA/Canada/UAE)

Please share fabric requirement guidelines and turnaround details.`;

  const whatsappUrl = `${WHATSAPP_LINK}?text=${encodeURIComponent(sareeWhatsAppMsg)}`;

  return (
    <section id="saree-draping-guide" className="py-20 bg-stone-900/60 border-b border-stone-800 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-emerald-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header Badge & Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono mb-4">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>Atelier Tailoring Authority • Drape Physics</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-100 tracking-tight leading-tight">
            The Saree Draping &amp; Blouse Architecture Guide
          </h2>
          <p className="mt-4 text-base sm:text-lg text-stone-300 leading-relaxed font-sans">
            Why commercial saree blouses pinch, shift, and gap—and how SARTOR&apos;s master pattern engineering locks your drape in place for 12 continuous hours without safety pins.
          </p>
        </div>

        {/* Top Showcase: Visual Anatomy of our Structural Blouse & Anti-Slip Fall */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          {/* Left Column: Image with Architecture Overlays */}
          <div className="lg:col-span-5 relative group">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-stone-950 border border-stone-850 shadow-2xl">
              <picture>
                <source type="image/webp" srcSet="/images/padded-saree-blouse-blueprint-scye-depth-boning.webp" />
                <img
                  src="/images/padded-saree-blouse-blueprint-scye-depth-boning.jpg"
                  alt="SARTOR Padded Saree Blouse with Structural Boning and Sweetheart Cut"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent pointer-events-none" />

              {/* Badges on Image */}
              <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-md bg-stone-950/90 border border-amber-500/30 text-[11px] font-mono text-amber-300 backdrop-blur-md">
                Model Town Cutting Table Standard
              </div>

              <div className="absolute bottom-4 left-4 right-4 z-10 p-4 rounded-xl bg-stone-900/90 border border-stone-750 backdrop-blur-md">
                <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block mb-0.5">
                  Bespoke Craftsmanship
                </span>
                <span className="font-serif text-sm font-bold text-stone-100 block">
                  Emerald Katan Silk with German Rigilene Stays &amp; 4-Point Apex Cups
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: The 4 Core Engineering Safeguards */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Feature 1: Structural Boning */}
              <div className="p-5 rounded-2xl bg-stone-900/80 border border-stone-800 hover:border-amber-500/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-100 mb-1.5">
                  German Rigilene Boning
                </h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  4 flexible vertical channels encased in plush silk grosgrain casings along the ribcage. Prevents lower-back gaping and stops fabric roll-up under heavy pallu drag.
                </p>
                <div className="mt-3 text-[11px] font-mono text-amber-300/90 font-medium">
                  Zero Cracking • Ribcage Anchor
                </div>
              </div>

              {/* Feature 2: Anti-Slip Weighted Fall */}
              <div className="p-5 rounded-2xl bg-stone-900/80 border border-stone-800 hover:border-amber-500/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3">
                  <Scale className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-100 mb-1.5">
                  Anti-Slip Weighted Falls
                </h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Seamless dual-density satin fall paired with an interior micro-cord weighted hem. Keeps lower pleats cascading straight to the floor without curling or tripping.
                </p>
                <div className="mt-3 text-[11px] font-mono text-emerald-300/90 font-medium">
                  No Wind Flutter • Floor Clearance
                </div>
              </div>

              {/* Feature 3: Asymmetric Scye Depth */}
              <div className="p-5 rounded-2xl bg-stone-900/80 border border-stone-800 hover:border-amber-500/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3">
                  <Ruler className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-100 mb-1.5">
                  1.5″ Anterior Scye Depth
                </h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Anterior armhole curve scooped by 1.25″–1.5″ for anatomical arm mobility. Eliminates underarm tourniquet pinching and allows full 180° arm swings.
                </p>
                <div className="mt-3 text-[11px] font-mono text-amber-300/90 font-medium">
                  180° Articulation • Zero Pinch
                </div>
              </div>

              {/* Feature 4: 4-Point Apex Anchored Cups */}
              <div className="p-5 rounded-2xl bg-stone-900/80 border border-stone-800 hover:border-amber-500/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-100 mb-1.5">
                  4-Point Apex Cup Anchors
                </h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Multi-density molded cups cross-tacked at four reinforced points to internal hair-canvas stays. Permanent positioning that never migrates, buckles, or flattens.
                </p>
                <div className="mt-3 text-[11px] font-mono text-amber-300/90 font-medium">
                  Tear-Drop Contour • Braless Lift
                </div>
              </div>
            </div>

            {/* In-depth Editorial Callout Banner */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/40 via-stone-900 to-stone-950 border border-amber-600/40 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono text-amber-400 font-semibold uppercase tracking-wider block mb-1">
                  Technical Tailoring Masterclass
                </span>
                <h4 className="font-serif text-lg font-bold text-stone-100">
                  Read The Padded Saree Blouse Blueprint
                </h4>
                <p className="text-xs text-stone-300 mt-1">
                  Dive into the full pattern drafting equations, sweetheart stay tape formulas, and London case study.
                </p>
              </div>
              <a
                href="/blog/padded-saree-blouse-blueprint-scye-depth-boning"
                className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-lg cursor-pointer"
              >
                <span>Read Blueprint</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Comparison Grid: SARTOR vs Commercial Stitching */}
        <div className="mt-12 rounded-2xl bg-stone-950 border border-stone-800 p-6 sm:p-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="font-serif text-2xl font-bold text-stone-100">
              Commercial Saree Tailoring vs. SARTOR Architectural Standards
            </h3>
            <p className="text-xs text-stone-400 mt-2">
              Why our Model Town atelier garments feel weightless while off-the-rack pieces fatigue you within hours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            {/* Column 1 */}
            <div className="space-y-3 p-4 rounded-xl bg-stone-900/60 border border-stone-850">
              <span className="font-mono font-semibold text-amber-400 uppercase text-[11px] block">
                01. The Blouse Fit
              </span>
              <p className="text-stone-300 leading-relaxed">
                <strong className="text-stone-100">Ordinary Tailors:</strong> Flat circular armholes that pinch, unboned side seams that roll up the torso, and single-stitched foam discs that rotate during movement.
              </p>
              <p className="text-emerald-300/90 leading-relaxed font-medium">
                <strong className="text-emerald-300">SARTOR Standard:</strong> 1.5″ anterior scye scoop, 4 German Rigilene ribcage boning stays, and 4-point cross-tacked molded cups.
              </p>
            </div>

            {/* Column 2 */}
            <div className="space-y-3 p-4 rounded-xl bg-stone-900/60 border border-stone-850">
              <span className="font-mono font-semibold text-amber-400 uppercase text-[11px] block">
                02. The Pallu Anchor
              </span>
              <p className="text-stone-300 leading-relaxed">
                <strong className="text-stone-100">Ordinary Tailors:</strong> Requires 5–7 safety pins that shred silk threads, cause shoulder bruising, and pull necklines crooked.
              </p>
              <p className="text-emerald-300/90 leading-relaxed font-medium">
                <strong className="text-emerald-300">SARTOR Standard:</strong> Concealed silicone shoulder grip tape and a self-suspending boned ribcage that absorbs pallu tension without pins.
              </p>
            </div>

            {/* Column 3 */}
            <div className="space-y-3 p-4 rounded-xl bg-stone-900/60 border border-stone-850">
              <span className="font-mono font-semibold text-amber-400 uppercase text-[11px] block">
                03. The Pleat Fall
              </span>
              <p className="text-stone-300 leading-relaxed">
                <strong className="text-stone-100">Ordinary Tailors:</strong> Stiff cotton falls that shrink upon dry cleaning, causing lower hem rippling and uneven floor pooling.
              </p>
              <p className="text-emerald-300/90 leading-relaxed font-medium">
                <strong className="text-emerald-300">SARTOR Standard:</strong> Pre-shrunk pure satin fall with micro-cord weighted perimeter hem for clean floor sweep on carpets or tile.
              </p>
            </div>
          </div>

          {/* Direct WhatsApp Consultation CTA for Saree Blouses */}
          <div className="mt-8 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-stone-300 text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                Includes 2.5″ internal finished seam margins • Starting at PKR 7,000 (£45 GBP / $60 USD / 220 AED)
              </span>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-emerald-950/40 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Order Saree &amp; Blouse on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SareeDrapingGuideSection;
