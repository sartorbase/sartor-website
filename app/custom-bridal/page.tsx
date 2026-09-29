import React from 'react';
import type { Metadata } from 'next';
import { WhatsAppButton } from '../../components/WhatsAppButton';
import { AnalyticsScripts } from '../../components/Analytics';

export const metadata: Metadata = {
  title: "Bespoke Bridal & Custom Designer Couture | Handcrafted in Lahore, Delivered Worldwide | SARTOR",
  description: "Couture custom bridal lehengas, farshi ghararas, and designer replica tailoring handcrafted on traditional addas in Lahore. Transparent 4-step milestone payment and insured DHL/FedEx worldwide delivery.",
  openGraph: {
    title: "Bespoke Bridal & Custom Designer Couture | SARTOR Lahore",
    description: "Handcrafted bespoke bridal wear, authentic zardozi embroidery, and custom replicas. 4-step transparent milestone process with worldwide express shipping.",
    url: "https://sartor.pk/custom-bridal",
    siteName: "SARTOR Master Atelier Lahore",
    locale: "en_US",
    type: "website",
  },
};

export default function CustomBridalLandingPage() {
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans selection:bg-amber-800 selection:text-white">
      {/* Asynchronous conversion tracking scripts (Google Ads, GA4, Meta Pixel) */}
      <AnalyticsScripts />

      {/* -------------------------------------------------------------------- */}
      {/* TOP ANNOUNCEMENT BANNER: OVERSEAS BRIDAL CLIENTS                     */}
      {/* -------------------------------------------------------------------- */}
      <div className="bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 border-b border-amber-600/30 py-2.5 px-4 text-center text-xs tracking-wide">
        <span className="inline-flex items-center gap-2 text-amber-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <strong className="font-semibold uppercase tracking-wider text-amber-300">
            Export Division:
          </strong>
          <span>
            Now booking 2026/2027 overseas weddings for USA, UK, Canada, Australia &amp; UAE.
          </span>
        </span>
      </div>

      {/* -------------------------------------------------------------------- */}
      {/* SECTION 1: HERO SECTION                                              */}
      {/* -------------------------------------------------------------------- */}
      <header className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-stone-800/80">
        {/* Ambient Couture Glow Backdrops */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-10 w-[450px] h-[450px] bg-stone-800/25 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            
            {/* Prestige Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-200 text-xs font-mono uppercase tracking-widest mb-6 shadow-lg shadow-amber-950/30">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>High-Value Bespoke Bridal &amp; Couture Atelier</span>
            </div>

            {/* H1 Main Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-stone-100 tracking-tight leading-[1.12]">
              Bespoke Bridal &amp; Custom Designer Couture{' '}
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">
                Handcrafted in Lahore, Delivered Worldwide
              </span>
            </h1>

            {/* Subtitle / High-Value Proposition */}
            <p className="mt-6 text-stone-300 text-base sm:text-lg md:text-xl max-w-3xl leading-relaxed font-sans">
              Replicate royal runway silhouettes or craft your one-of-a-kind bridal heirloom on traditional wooden addas. 
              Authentic hand-embroidery (<em className="text-amber-300 not-italic">zardozi, dabka, marori, cutwork</em>), pure luxury fabrics, 
              and a secure 4-step milestone payment process designed specifically for overseas brides ($2,000+ USD).
            </p>

            {/* Hero CTAs */}
            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-xl">
              <WhatsAppButton
                sourceLocation="hero_primary_cta"
                variant="primary"
                fullWidth
                message="Hi Sartor, I am interested in getting a custom bridal/couture outfit stitched. I would like to discuss my wedding date, budget, and design inspiration."
                subtext="Direct Master Artisan Consultation • Typical response < 15 mins"
              >
                Inquire on WhatsApp (0335-2209991)
              </WhatsAppButton>

              <a
                href="#milestones"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-4 rounded-xl bg-stone-900/90 hover:bg-stone-800 text-stone-200 hover:text-white border border-stone-700/80 hover:border-amber-500/50 text-sm font-semibold tracking-wide uppercase transition-all duration-200 text-center"
              >
                Explore 4-Step Process
              </a>
            </div>

            {/* -------------------------------------------------------------- */}
            {/* HERO SPOTLIGHT: 3 CLIENT MASTERWORK COMMISSIONS (UPLOADED IMGS) */}
            {/* -------------------------------------------------------------- */}
            <div className="mt-14 w-full">
              <div className="text-left mb-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold block">
                    Recent Atelier Commissions
                  </span>
                  <h3 className="text-base sm:text-lg font-serif font-bold text-stone-100">
                    Handcrafted in Lahore for Overseas Brides (USA, UK, Canada &amp; UAE)
                  </h3>
                </div>
                <span className="text-xs text-stone-400 font-mono hidden sm:inline">
                  Verified Real Handcraft
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Look 1: Royal Barat Crimson Bridal */}
                <div className="group rounded-2xl overflow-hidden bg-stone-900 border border-stone-800 hover:border-amber-500/60 shadow-2xl transition-all duration-300 flex flex-col text-left">
                  <div className="relative aspect-[4/3] bg-stone-950 overflow-hidden">
                    <img
                      src="/images/barat-crimson-bridal.jpg"
                      alt="SARTOR Bespoke Crimson Velvet & Raw Silk Barat Bridal Lehenga with Zardozi Handwork"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                      loading="eager"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent pointer-events-none" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-stone-950/85 backdrop-blur-md text-[10px] font-mono uppercase tracking-wider text-amber-300 border border-amber-500/30">
                      Barat Main Bridal
                    </span>
                    <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-amber-500 text-stone-950 font-mono font-bold text-xs shadow-lg">
                      $2,800 USD
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif text-lg font-bold text-stone-100 group-hover:text-amber-300 transition-colors">
                        Royal Crimson Velvet Lehenga
                      </h4>
                      <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                        Heavy 3D zardozi, antique dabka, kora wire &amp; French knot embroidery with sweetheart neckline choli and dual bridal veil framing.
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-between">
                      <span className="text-[11px] font-mono text-stone-400">100% Pure Velvet &amp; Silk</span>
                      <WhatsAppButton
                        sourceLocation="hero_showcase_barat_crimson"
                        variant="outline"
                        className="!px-3 !py-1.5 !text-xs !tracking-normal !rounded-lg"
                        message="Hi Sartor, I am interested in the Royal Crimson Velvet Barat Lehenga ($2,800 USD). Can you share details for my wedding date?"
                      >
                        Inquire
                      </WhatsAppButton>
                    </div>
                  </div>
                </div>

                {/* Look 2: Walima Champagne Sage Couture Gown */}
                <div className="group rounded-2xl overflow-hidden bg-stone-900 border border-stone-800 hover:border-amber-500/60 shadow-2xl transition-all duration-300 flex flex-col text-left">
                  <div className="relative aspect-[4/3] bg-stone-950 overflow-hidden">
                    <img
                      src="/images/walima-champagne-gown.jpg"
                      alt="SARTOR Champagne Gold & Sage Green Walima Bridal Couture Gown with Tilla Needlework"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                      loading="eager"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent pointer-events-none" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-stone-950/85 backdrop-blur-md text-[10px] font-mono uppercase tracking-wider text-amber-300 border border-amber-500/30">
                      Walima Reception
                    </span>
                    <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-amber-500 text-stone-950 font-mono font-bold text-xs shadow-lg">
                      $3,200 USD
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif text-lg font-bold text-stone-100 group-hover:text-amber-300 transition-colors">
                        Champagne Sage Couture Gown
                      </h4>
                      <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                        Intricate all-over lace tilla, crystal beads, fine pearls, and sheer embroidered sleeves tailored with contoured princess cut.
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-between">
                      <span className="text-[11px] font-mono text-stone-400">Pure Tissue &amp; Net Brocade</span>
                      <WhatsAppButton
                        sourceLocation="hero_showcase_walima_champagne"
                        variant="outline"
                        className="!px-3 !py-1.5 !text-xs !tracking-normal !rounded-lg"
                        message="Hi Sartor, I am interested in the Champagne Sage Walima Couture Gown ($3,200 USD). Can you share fabric and lead time?"
                      >
                        Inquire
                      </WhatsAppButton>
                    </div>
                  </div>
                </div>

                {/* Look 3: Royal Mehndi Mustard & Emerald Kalidar */}
                <div className="group rounded-2xl overflow-hidden bg-stone-900 border border-stone-800 hover:border-amber-500/60 shadow-2xl transition-all duration-300 flex flex-col text-left">
                  <div className="relative aspect-[4/3] bg-stone-950 overflow-hidden">
                    <img
                      src="/images/mehndi-mustard-kalidar.jpg"
                      alt="SARTOR Festive Mustard Yellow & Emerald Green Kalidar Flared Bridal Lehenga for Mehndi"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                      loading="eager"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent pointer-events-none" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-stone-950/85 backdrop-blur-md text-[10px] font-mono uppercase tracking-wider text-amber-300 border border-amber-500/30">
                      Mehndi &amp; Mayun
                    </span>
                    <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-amber-500 text-stone-950 font-mono font-bold text-xs shadow-lg">
                      $2,200 USD
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif text-lg font-bold text-stone-100 group-hover:text-amber-300 transition-colors">
                        Mustard &amp; Emerald Kalidar Set
                      </h4>
                      <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                        16-kali sweeping flare, traditional gota patti, kundan motifs, pure raw silk choli, and contrast emerald green border dupatta.
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-between">
                      <span className="text-[11px] font-mono text-stone-400">Pure Raw Silk (80g)</span>
                      <WhatsAppButton
                        sourceLocation="hero_showcase_mehndi_mustard"
                        variant="outline"
                        className="!px-3 !py-1.5 !text-xs !tracking-normal !rounded-lg"
                        message="Hi Sartor, I am interested in the Mustard & Emerald Kalidar Set for Mehndi ($2,200 USD). Let's discuss measurements and delivery."
                      >
                        Inquire
                      </WhatsAppButton>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Above-the-Fold Trust Bar */}
            <div className="mt-12 pt-8 border-t border-stone-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-left w-full">
              <div className="p-3.5 rounded-xl bg-stone-900/50 border border-stone-800/80">
                <div className="text-amber-400 text-base mb-1">✈️</div>
                <h4 className="text-xs font-bold text-stone-200 uppercase font-mono">Worldwide Express</h4>
                <p className="text-[11px] text-stone-400 mt-0.5">Insured DHL &amp; FedEx courier to US, UK, CA, UAE &amp; AU.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-900/50 border border-stone-800/80">
                <div className="text-amber-400 text-base mb-1">🔍</div>
                <h4 className="text-xs font-bold text-stone-200 uppercase font-mono">Live Adda Video Updates</h4>
                <p className="text-[11px] text-stone-400 mt-0.5">4K swatch &amp; progress videos direct from our Lahore workshop.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-900/50 border border-stone-800/80">
                <div className="text-amber-400 text-base mb-1">🛡️</div>
                <h4 className="text-xs font-bold text-stone-200 uppercase font-mono">Milestone Escrow</h4>
                <p className="text-[11px] text-stone-400 mt-0.5">Pay in 4 transparent stages as each work milestone is verified.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-900/50 border border-stone-800/80">
                <div className="text-amber-400 text-base mb-1">🧵</div>
                <h4 className="text-xs font-bold text-stone-200 uppercase font-mono">Generational Karigars</h4>
                <p className="text-[11px] text-stone-400 mt-0.5">Master cutters &amp; hand-embroiderers from Lahore's heritage guild.</p>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* -------------------------------------------------------------------- */}
      {/* SECTION 2: VISUAL PROOF & ADDA WORK SHOWCASE                         */}
      {/* -------------------------------------------------------------------- */}
      <section id="craft-proof" className="py-20 bg-stone-900/30 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center mb-14">
            <span className="text-xs uppercase font-mono tracking-widest text-amber-400 font-bold block mb-2">
              Artisanal Verification &amp; Close-Ups
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-100">
              Live Adda Frames &amp; Intricate Needlework
            </h2>
            <p className="mt-3 text-stone-300 text-sm sm:text-base leading-relaxed">
              Every millimeter of our custom bridal wear is hand-rendered on stretched wooden embroidery frames (addas). 
              Inspect our authentic craftsmanship below.
            </p>
          </div>

          {/* Video / High-Resolution Craft Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Card 1: 3D Zardozi & Antique Dabka */}
            <article className="group rounded-2xl overflow-hidden bg-stone-900 border border-stone-800 hover:border-amber-500/60 shadow-xl transition-all duration-300 flex flex-col justify-between">
              <div className="relative aspect-[4/3] bg-stone-950 overflow-hidden">
                {/* HTML5 Auto-playing muted video with poster */}
                <video
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  playsInline
                  autoPlay
                  loop
                  muted
                  poster="/images/barat-crimson-bridal.jpg"
                >
                  <source
                    src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support HTML5 video.
                </video>
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-stone-950/80 backdrop-blur-md text-[10px] font-mono uppercase tracking-wider text-amber-300 border border-amber-500/30">
                  Live Adda Frame #04
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-serif text-xl font-bold text-stone-100 group-hover:text-amber-300 transition-colors">
                  3D Zardozi, Kora &amp; Antique Dabka
                </h3>
                <p className="text-xs text-stone-300 mt-2 leading-relaxed">
                  Sculpted metallic bullion threads and French wire hand-stitched over raised cotton foundations for heirloom depth. 
                  Never flat machine foil.
                </p>

                <div className="mt-4 pt-4 border-t border-stone-800/80 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-amber-400 font-semibold">160+ Artisan Hours / Panel</span>
                  <WhatsAppButton
                    sourceLocation="visual_proof_zardozi_card"
                    variant="outline"
                    className="!px-3 !py-1.5 !text-xs !tracking-normal !rounded-lg"
                    message="Hi Sartor, I am viewing the 3D Zardozi & Antique Dabka video. Can you tell me the cost and yardage required for a heavy bridal lehenga in this work?"
                  >
                    Request Sample
                  </WhatsAppButton>
                </div>
              </div>
            </article>

            {/* Card 2: Marori Work & Hand-Cutwork Veils */}
            <article className="group rounded-2xl overflow-hidden bg-stone-900 border border-stone-800 hover:border-amber-500/60 shadow-xl transition-all duration-300 flex flex-col justify-between">
              <div className="relative aspect-[4/3] bg-stone-950 overflow-hidden">
                <video
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  playsInline
                  autoPlay
                  loop
                  muted
                  poster="/images/walima-champagne-gown.jpg"
                >
                  <source
                    src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support HTML5 video.
                </video>
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-stone-950/80 backdrop-blur-md text-[10px] font-mono uppercase tracking-wider text-amber-300 border border-amber-500/30">
                  Veil Framing &amp; Scallop
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-serif text-xl font-bold text-stone-100 group-hover:text-amber-300 transition-colors">
                  Marori Cord Needlework &amp; Cutwork Dupattas
                </h3>
                <p className="text-xs text-stone-300 mt-2 leading-relaxed">
                  Twisted metallic gold cords couched with invisible silk stitches. Delicate scalloped sheer edges designed for double-veil bridal framing.
                </p>

                <div className="mt-4 pt-4 border-t border-stone-800/80 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-amber-400 font-semibold">Pure Silk Organza &amp; Net</span>
                  <WhatsAppButton
                    sourceLocation="visual_proof_marori_card"
                    variant="outline"
                    className="!px-3 !py-1.5 !text-xs !tracking-normal !rounded-lg"
                    message="Hi Sartor, I would like to get a custom bridal dupatta with marori and cutwork borders. Can you share options and timelines?"
                  >
                    Request Sample
                  </WhatsAppButton>
                </div>
              </div>
            </article>

            {/* Card 3: Royal Farshi Gharara & Architectural Can-Can */}
            <article className="group rounded-2xl overflow-hidden bg-stone-900 border border-stone-800 hover:border-amber-500/60 shadow-xl transition-all duration-300 flex flex-col justify-between">
              <div className="relative aspect-[4/3] bg-stone-950 overflow-hidden">
                <video
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  playsInline
                  autoPlay
                  loop
                  muted
                  poster="/images/mehndi-mustard-kalidar.jpg"
                >
                  <source
                    src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support HTML5 video.
                </video>
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-stone-950/80 backdrop-blur-md text-[10px] font-mono uppercase tracking-wider text-amber-300 border border-amber-500/30">
                  Structure &amp; Flare Trial
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-serif text-xl font-bold text-stone-100 group-hover:text-amber-300 transition-colors">
                  Farshi Gharara &amp; Flared Silhouette Architecture
                </h3>
                <p className="text-xs text-stone-300 mt-2 leading-relaxed">
                  Tailored with internal balanced horsehair braid and multi-layered soft can-can structure to hold red-carpet volume without pulling down on the waist.
                </p>

                <div className="mt-4 pt-4 border-t border-stone-800/80 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-amber-400 font-semibold">Custom Height Calibration</span>
                  <WhatsAppButton
                    sourceLocation="visual_proof_gharara_card"
                    variant="outline"
                    className="!px-3 !py-1.5 !text-xs !tracking-normal !rounded-lg"
                    message="Hi Sartor, I am looking for a structured Farshi Gharara / Royal Lehenga tailored to my exact height and heels. Let's discuss."
                  >
                    Request Sample
                  </WhatsAppButton>
                </div>
              </div>
            </article>

          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* SECTION 3: TRANSPARENT 4-STEP MILESTONE PAYMENT ESCROW PROCESS       */}
      {/* -------------------------------------------------------------------- */}
      <section id="milestones" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-stone-800">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono uppercase tracking-wider mb-3">
            <span>🛡️ Overseas Buyer Protection Framework</span>
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-100">
            Transparent 4-Step Milestone Payment Process
          </h2>
          <p className="mt-4 text-stone-300 text-sm sm:text-base leading-relaxed">
            Eliminating anxiety for high-ticket overseas commissions ($2,000+ USD). You never pay 100% upfront; 
            funds are disbursed across 4 physical approval checkpoints.
          </p>
        </div>

        {/* 4 Milestones Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Milestone 1 */}
          <div className="p-6 rounded-2xl bg-stone-900/80 border border-stone-800 hover:border-amber-500/50 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="w-9 h-9 rounded-full bg-amber-500/20 text-amber-300 font-mono font-bold text-sm flex items-center justify-center border border-amber-500/40">
                  01
                </span>
                <span className="px-2.5 py-1 rounded-full bg-stone-800 text-amber-400 font-mono text-xs font-bold">
                  10% Token
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-100">
                Booking &amp; Custom Adda Swatch
              </h3>
              <p className="text-xs text-stone-300 mt-2 leading-relaxed">
                Initial 10% commitment triggers design sketch alignment, full measurement consultation, and physical hand-embroidery swatch setup on our Lahore frame.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-stone-800 text-[11px] text-stone-400">
              ✓ Zoom/WhatsApp Measurement Call Included
            </div>
          </div>

          {/* Milestone 2 */}
          <div className="p-6 rounded-2xl bg-stone-900/80 border border-stone-800 hover:border-amber-500/50 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="w-9 h-9 rounded-full bg-amber-500/20 text-amber-300 font-mono font-bold text-sm flex items-center justify-center border border-amber-500/40">
                  02
                </span>
                <span className="px-2.5 py-1 rounded-full bg-stone-800 text-amber-400 font-mono text-xs font-bold">
                  30% Production
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-100">
                Live Swatch Approval on Frame
              </h3>
              <p className="text-xs text-stone-300 mt-2 leading-relaxed">
                You receive macro 4K video &amp; photography of your exact color dyed fabric and first stitched motifs on the adda. Production only advances upon your 100% written approval.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-stone-800 text-[11px] text-stone-400">
              ✓ Direct Adda Frame Macro Video
            </div>
          </div>

          {/* Milestone 3 */}
          <div className="p-6 rounded-2xl bg-stone-900/80 border border-stone-800 hover:border-amber-500/50 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="w-9 h-9 rounded-full bg-amber-500/20 text-amber-300 font-mono font-bold text-sm flex items-center justify-center border border-amber-500/40">
                  03
                </span>
                <span className="px-2.5 py-1 rounded-full bg-stone-800 text-amber-400 font-mono text-xs font-bold">
                  30% Assembly
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-100">
                Mid-Production Kali Inspection
              </h3>
              <p className="text-xs text-stone-300 mt-2 leading-relaxed">
                Once all panels/kalis are unclipped from the wooden frames, our master cutter joins the silhouette. We review circumference, length, and inner silk linings together.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-stone-800 text-[11px] text-stone-400">
              ✓ Kali Symmetry &amp; Fit Inspection
            </div>
          </div>

          {/* Milestone 4 */}
          <div className="p-6 rounded-2xl bg-stone-900/80 border border-stone-800 hover:border-amber-500/50 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold text-sm flex items-center justify-center border border-emerald-500/40">
                  04
                </span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-400 font-mono text-xs font-bold">
                  30% Final Dispatch
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-100">
                Final Inspection &amp; Global Dispatch
              </h3>
              <p className="text-xs text-stone-300 mt-2 leading-relaxed">
                Complete 360° mannequin video walk-through, steam press, and luxury box sealing. Once verified, final 30% is released and DHL Express tracking number is generated.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-stone-800 text-[11px] text-stone-400">
              ✓ Fully Insured Global Courier &amp; Tracking
            </div>
          </div>

        </div>

        {/* Milestone Guarantee Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-amber-950/40 via-stone-900 to-stone-950 border border-amber-600/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-serif text-xl font-bold text-stone-100">
              Have a Specific Designer Dress Picture or Pinterest Board?
            </h4>
            <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl">
              Send screenshots of celebrity looks (Sabyasachi, Faraz Manan, Bunto Kazmi, Elan) or your own bespoke sketch. 
              Our master cutter breaks down the yardage and quotes an exact milestone breakdown.
            </p>
          </div>

          <WhatsAppButton
            sourceLocation="milestone_banner_cta"
            variant="gold"
            message="Hi Sartor, I have design photos and screenshots for a custom bridal ensemble. I would like a quote and milestone timeline."
            className="shrink-0 whitespace-nowrap"
          >
            Send Inspiration on WhatsApp
          </WhatsAppButton>
        </div>

      </section>

      {/* -------------------------------------------------------------------- */}
      {/* SECTION 4: TRUST BADGES & OVERSEAS CLIENT GUARANTEES                 */}
      {/* -------------------------------------------------------------------- */}
      <section className="py-20 bg-stone-900/40 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center mb-14">
            <span className="text-xs uppercase font-mono tracking-widest text-amber-400 font-bold block mb-2">
              Overseas Reliability Standard
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-100">
              Our 4 Pillars of Overseas Peace of Mind
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Pillar 1 */}
            <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 text-xl mb-4 font-mono">
                ✈️
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-100">
                DHL / FedEx Air Express
              </h3>
              <p className="text-xs text-stone-300 mt-2 leading-relaxed">
                4 to 6 business days transit from our Lahore workshop directly to your door in New York, London, Toronto, Sydney, or Dubai with signature confirmation.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 text-xl font-mono mb-4">
                📹
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-100">
                Weekly Adda Video Logs
              </h3>
              <p className="text-xs text-stone-300 mt-2 leading-relaxed">
                No guessing games. You will see the needle passing through your fabric every week via dedicated WhatsApp video clips and high-resolution close-ups.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 text-xl font-mono mb-4">
                💎
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-100">
                Pure Fabrics Guaranteed
              </h3>
              <p className="text-xs text-stone-300 mt-2 leading-relaxed">
                We only source 100% pure Chinese raw silk (80g), pure French velvet, high-thread organza, and authentic banarsi brocades. Never synthetic polyester blends.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xl font-mono mb-4">
                📐
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-100">
                2-Inch Safety In-Seam Margins
              </h3>
              <p className="text-xs text-stone-300 mt-2 leading-relaxed">
                Every bespoke blouse, choli, and bridal dress is tailored with generous 2-inch internal fabric allowances for effortless local tailoring adjustments if body measurements fluctuate.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* SECTION 5: HIGH-TICKET PRICING TRANSPARENCY GUIDE                    */}
      {/* -------------------------------------------------------------------- */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-stone-800">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <span className="text-xs uppercase font-mono tracking-widest text-amber-400 font-bold block mb-2">
            Indicative Investment Tiers
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-100">
            High-Ticket Bridal Investment Guide
          </h2>
          <p className="mt-3 text-stone-300 text-sm sm:text-base leading-relaxed">
            All prices include pure base fabrics, authentic hand-embroidery, complete master stitching, multi-layer can-can, and insured international air courier.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          
          {/* Tier 1 */}
          <div className="rounded-2xl bg-stone-900 border border-stone-800 overflow-hidden flex flex-col justify-between">
            <div className="relative aspect-[16/10] bg-stone-950 overflow-hidden">
              <img
                src="/images/mehndi-mustard-kalidar.jpg"
                alt="SARTOR Luxury Festive Couture Mehndi Kalidar"
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent pointer-events-none" />
              <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-stone-950/80 text-[10px] font-mono uppercase text-amber-300 border border-amber-500/30">
                Mehndi &amp; Mayun
              </span>
            </div>

            <div className="p-7 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono text-stone-400 uppercase tracking-wider block">
                  Formal / Engagement / Mehndi
                </span>
                <h3 className="font-serif text-2xl font-bold text-stone-100 mt-1">
                  Luxury Festive Couture
                </h3>
                <div className="mt-4 text-3xl font-serif font-bold text-amber-400">
                  $1,500 – $2,200 <span className="text-xs text-stone-400 font-mono">USD</span>
                </div>
                <p className="text-xs text-stone-400 mt-1">Approx. PKR 420,000 – PKR 615,000</p>
                
                <ul className="mt-6 space-y-2 text-xs text-stone-300">
                  <li className="flex items-center gap-2">✓ 16-Kali Kalidar / Peshwas / Flared Gown</li>
                  <li className="flex items-center gap-2">✓ Resham threadwork, gota patti &amp; cut-dana</li>
                  <li className="flex items-center gap-2">✓ Pure silk base &amp; sheer organza dupatta</li>
                  <li className="flex items-center gap-2">✓ 6–8 Weeks Handcraft Turnaround</li>
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-stone-800">
                <WhatsAppButton
                  sourceLocation="pricing_tier_festive"
                  variant="outline"
                  fullWidth
                  message="Hi Sartor, I am interested in your Festive Luxury Couture tier ($1,500 - $2,200 USD). I would like to schedule a consultation."
                >
                  Inquire for Festive
                </WhatsAppButton>
              </div>
            </div>
          </div>

          {/* Tier 2: Signature Bridal (Highlighted) */}
          <div className="relative rounded-2xl bg-gradient-to-b from-amber-950/60 via-stone-900 to-stone-900 border-2 border-amber-500 shadow-2xl overflow-hidden flex flex-col justify-between">
            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 px-3 py-1 rounded-full bg-amber-500 text-stone-950 text-[10px] font-black uppercase tracking-widest shadow-md">
              Most Selected by Overseas Brides
            </div>

            <div className="relative aspect-[16/10] bg-stone-950 overflow-hidden">
              <img
                src="/images/barat-crimson-bridal.jpg"
                alt="SARTOR Master Bespoke Barat Bridal Lehenga"
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent pointer-events-none" />
              <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-stone-950/80 text-[10px] font-mono uppercase text-amber-300 border border-amber-500/30">
                Barat Royal Heirloom
              </span>
            </div>

            <div className="p-7 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono text-amber-300 uppercase tracking-wider block">
                  Barat &amp; Walima Main Bridal
                </span>
                <h3 className="font-serif text-2xl font-bold text-stone-100 mt-1">
                  Master Bespoke Bridal
                </h3>
                <div className="mt-4 text-3xl font-serif font-bold text-amber-300">
                  $2,500 – $3,800 <span className="text-xs text-stone-400 font-mono">USD</span>
                </div>
                <p className="text-xs text-stone-400 mt-1">Approx. PKR 700,000 – PKR 1,060,000</p>
                
                <ul className="mt-6 space-y-2 text-xs text-stone-200">
                  <li className="flex items-center gap-2">✓ Full Royal Lehenga, Padded Choli &amp; 2 Dupattas</li>
                  <li className="flex items-center gap-2">✓ Heavy Zardozi, Real Dabka, Tilla &amp; Pearl Handwork</li>
                  <li className="flex items-center gap-2">✓ Architectural Can-Can &amp; Pure Tissue / Silk Base</li>
                  <li className="flex items-center gap-2">✓ 4-Step Milestone Escrow Security</li>
                  <li className="flex items-center gap-2">✓ 8–12 Weeks Handcraft Turnaround</li>
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-stone-800">
                <WhatsAppButton
                  sourceLocation="pricing_tier_master_bridal"
                  variant="primary"
                  fullWidth
                  message="Hi Sartor, I am interested in your Master Bespoke Bridal tier ($2,500 - $3,800 USD). I would like to review designs and timeline."
                >
                  Book Bridal Consultation
                </WhatsAppButton>
              </div>
            </div>
          </div>

          {/* Tier 3: Royal Heirloom */}
          <div className="rounded-2xl bg-stone-900 border border-stone-800 overflow-hidden flex flex-col justify-between">
            <div className="relative aspect-[16/10] bg-stone-950 overflow-hidden">
              <img
                src="/images/walima-champagne-gown.jpg"
                alt="SARTOR Royal Heirloom Walima Reception Gown"
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent pointer-events-none" />
              <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-stone-950/80 text-[10px] font-mono uppercase text-amber-300 border border-amber-500/30">
                Walima &amp; Reception
              </span>
            </div>

            <div className="p-7 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono text-stone-400 uppercase tracking-wider block">
                  Museum Quality &amp; Multi-Day Trousseau
                </span>
                <h3 className="font-serif text-2xl font-bold text-stone-100 mt-1">
                  Royal Heirloom Replica
                </h3>
                <div className="mt-4 text-3xl font-serif font-bold text-amber-400">
                  $4,000 – $6,500+ <span className="text-xs text-stone-400 font-mono">USD</span>
                </div>
                <p className="text-xs text-stone-400 mt-1">Approx. PKR 1,120,000 – PKR 1,820,000+</p>
                
                <ul className="mt-6 space-y-2 text-xs text-stone-300">
                  <li className="flex items-center gap-2">✓ Couture Farshi Gharara or 18-Foot Royal Train</li>
                  <li className="flex items-center gap-2">✓ Real Gold / Silver Plated Tilla &amp; Hand-Pounded Kora</li>
                  <li className="flex items-center gap-2">✓ 350+ Hours of Pure Generational Adda Handwork</li>
                  <li className="flex items-center gap-2">✓ Head Karigar Direct Video Line Access</li>
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-stone-800">
                <WhatsAppButton
                  sourceLocation="pricing_tier_royal_heirloom"
                  variant="outline"
                  fullWidth
                  message="Hi Sartor, I am interested in the Royal Heirloom Replica tier ($4,000+ USD). Let's connect on WhatsApp."
                >
                  Inquire for Royal Heirloom
                </WhatsAppButton>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* SECTION 6: FINAL HIGH-CONVERSION CTA FOOTER                          */}
      {/* -------------------------------------------------------------------- */}
      <footer className="py-16 bg-stone-950 border-t border-stone-800/80">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-semibold mb-4">
            <span>Guaranteed Perfect Fitting or Free Immediate Adjustment</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-100 mb-4">
            Ready to Begin Your Bespoke Bridal Journey?
          </h2>

          <p className="text-stone-300 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Speak directly with our Master Cutter at our Moon Tower Atelier in Model Town, Lahore. 
            Send your wedding date, dress photos, and measurements to receive a detailed quote within hours.
          </p>

          <div className="max-w-md mx-auto">
            <WhatsAppButton
              sourceLocation="footer_bottom_cta"
              variant="primary"
              fullWidth
              message="Hi Sartor, I would like to schedule a private WhatsApp video consultation for custom bridal stitching."
              subtext="SARTOR Atelier • Moon Tower, Model Town, Lahore, Pakistan • Direct WhatsApp: +92 335 2209991"
            >
              Start WhatsApp Consultation (0335-2209991)
            </WhatsAppButton>
          </div>

          <div className="mt-12 text-xs text-stone-500 font-mono">
            © {new Date().getFullYear()} SARTOR Atelier Lahore. High-Ticket Bespoke Bridal Division. All Rights Reserved.
          </div>
        </div>
      </footer>

      {/* -------------------------------------------------------------------- */}
      {/* STICKY FLOATING WHATSAPP CTA: BOTTOM-RIGHT FOR MOBILE & DESKTOP      */}
      {/* -------------------------------------------------------------------- */}
      <WhatsAppButton
        sourceLocation="sticky_floating_bottom_right"
        variant="floating"
        message="Hi Sartor, I am interested in getting a custom bridal/couture outfit stitched. I would like a consultation."
      />
    </div>
  );
}
