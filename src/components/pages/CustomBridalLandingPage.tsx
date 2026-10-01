import React from 'react';
import {
  Sparkles,
  MessageSquare,
  ShieldCheck,
  Globe2,
  Calendar,
  CheckCircle2,
  Video,
  Plane,
  HeartHandshake,
  ArrowRight,
} from 'lucide-react';
import { buildWhatsAppLink } from '../../services/analytics';
import { navigateTo } from '../../utils/navigation';

export const CustomBridalLandingPage: React.FC = () => {
  const bridalWhatsAppMsg = `*OVERSEAS CUSTOM BRIDAL ENQUIRY ($2,000+)*
---------------------------------------
Assalam-o-Alaikum SARTOR Atelier,
I am an overseas bride interested in commissioning a custom bridal lehenga / Barat outfit.
• Country / City: [e.g. London UK / Houston USA / Toronto Canada]
• Wedding Event Date: [e.g. Dec 2026]
• Preferred Style: [e.g. Traditional Zardozi Barat Lehenga / Velvet / Raw Silk]

Please guide me on remote measurement consultations, muslin toile fittings, and production timelines.`;

  const bridalWhatsAppUrl = buildWhatsAppLink(bridalWhatsAppMsg, 'bridal_page_hero');

  const steps = [
    {
      num: '01',
      title: 'Digital Consultation & Moodboard',
      desc: 'Connect with Master Tailor Abdul Ghaffar on WhatsApp or video call to discuss your venue, color palette, fabric weight, and silhouette inspiration.',
    },
    {
      num: '02',
      title: 'Calibrated Video Measurements',
      desc: 'Our master cutter guides you live over video to take 22 bridal measurement points over your exact bridal shoes and undergarments.',
    },
    {
      num: '03',
      title: 'Muslin Toile Fitting Test',
      desc: 'For couture orders, we ship a preliminary cotton muslin mockup to your doorstep in the UK/USA to test necklines, waist darts, and skirt fall.',
    },
    {
      num: '04',
      title: 'Authentic Old Lahore Hand Embroidery',
      desc: 'Months of meticulous zardozi, dabka, and vasli embroidery executed by multi-generational karkhana craftsmen in Old Lahore.',
    },
    {
      num: '05',
      title: 'Global Insured Express Delivery',
      desc: 'Packaged in archival preservation boxes and shipped via DHL Express worldwide with full door-to-door tracking and insurance.',
    },
  ];

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32 border-b border-stone-850">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-amber-700/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Overseas Bridal Bespoke Concierge</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-stone-100 tracking-tight leading-[1.12] max-w-4xl mx-auto">
            Authentic Lahore Bridal Couture,{' '}
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">
              Fitted Remotely with Zero Anxiety
            </span>
          </h1>

          <p className="mt-6 text-stone-300 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Designed for discerning brides in the UK, USA, Canada, and the UAE. Experience handcrafted zardozi lehengas with guaranteed 1.5–2&quot; alteration margins and video-guided fitting.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={bridalWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base shadow-2xl shadow-emerald-950/60 border border-emerald-400/40 flex items-center justify-center gap-3 transition-all cursor-pointer"
            >
              <MessageSquare className="w-5 h-5 fill-current" />
              <span>Book Bridal Consultation on WhatsApp</span>
            </a>

            <button
              onClick={() => navigateTo('/blog/overseas-bride-zardozi-lehenga-sizing-guide')}
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-stone-900 hover:bg-stone-850 text-stone-200 font-semibold text-sm border border-stone-800 transition-colors cursor-pointer"
            >
              Read Overseas Bride Sizing Guide
            </button>
          </div>
        </div>
      </section>

      {/* Trust & Guarantee Indicators */}
      <section className="py-12 bg-stone-900/60 border-b border-stone-850">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="p-6 rounded-xl bg-stone-900 border border-stone-800">
              <Globe2 className="w-8 h-8 text-amber-400 mx-auto mb-3" />
              <h3 className="font-serif font-bold text-stone-100 text-lg">Global Express Shipping</h3>
              <p className="text-stone-400 text-xs sm:text-sm mt-1">
                Insured doorstep dispatch via DHL Express to UK, USA, Canada &amp; UAE.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-stone-900 border border-stone-800">
              <ShieldCheck className="w-8 h-8 text-amber-400 mx-auto mb-3" />
              <h3 className="font-serif font-bold text-stone-100 text-lg">2-Inch Alteration Allowance</h3>
              <p className="text-stone-400 text-xs sm:text-sm mt-1">
                Generous internal fabric margins left inside so your local tailor can adjust effortlessly if needed.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-stone-900 border border-stone-800">
              <Video className="w-8 h-8 text-amber-400 mx-auto mb-3" />
              <h3 className="font-serif font-bold text-stone-100 text-lg">Live Video Fittings</h3>
              <p className="text-stone-400 text-xs sm:text-sm mt-1">
                Direct tape-placement guidance from Master Tailor Abdul Ghaffar before cutting begins.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How the Remote Process Works */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-amber-400 font-mono text-xs uppercase tracking-widest font-semibold block mb-2">
            Seamless Overseas Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-100">
            How SARTOR Eliminates Distance
          </h2>
          <p className="mt-3 text-stone-300 text-sm sm:text-base max-w-xl mx-auto">
            You do not need to fly to Lahore for multiple frantic fittings. Here is how our remote bespoke system works from start to finish:
          </p>
        </div>

        <div className="space-y-6">
          {steps.map((st) => (
            <div
              key={st.num}
              className="p-6 sm:p-8 rounded-2xl bg-stone-900 border border-stone-800 flex flex-col sm:flex-row items-start gap-6 hover:border-amber-500/40 transition-colors"
            >
              <div className="text-3xl font-serif font-bold text-amber-500/80 font-mono shrink-0">
                {st.num}
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-stone-100 mb-2">
                  {st.title}
                </h3>
                <p className="text-stone-400 text-sm leading-relaxed">
                  {st.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-16 text-center">
          <a
            href={bridalWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base shadow-xl shadow-emerald-950/50 cursor-pointer"
          >
            <MessageSquare className="w-5 h-5 fill-current" />
            <span>Inquire About 2026/2027 Bridal Slots (+92 335 2209991)</span>
          </a>
        </div>
      </section>
    </div>
  );
};
