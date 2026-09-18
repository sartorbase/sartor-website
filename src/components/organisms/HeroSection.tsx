import React from 'react';
import { ArrowRight, CheckCircle2, Crown, ExternalLink, MapPin, Ruler, Sparkles, UserCheck } from 'lucide-react';
import { SARTOR_GOOGLE_MAPS_LINK, SARTOR_PHONE_LOCAL } from '../../services/analytics';
import { Button } from '../atoms/Button';
import { WhatsAppButton } from '../molecules/WhatsAppButton';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-10 pb-16 md:pt-18 md:pb-24 border-b border-stone-800">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-950/20 via-stone-950/60 to-stone-950 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Women Only Notice & Male Coming Soon Banner */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/70 border border-amber-600/60 text-amber-300 text-xs font-medium shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-semibold tracking-wide">Exclusively Serving Women</span>
            <span className="text-amber-500/70">·</span>
            <span className="text-amber-200/80 font-normal">Dedicated Female Master Tailoring</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900/90 border border-stone-800 text-stone-400 text-xs font-medium">
            <UserCheck className="w-3.5 h-3.5 text-stone-400" />
            <span>Male bespoke service launching soon</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            {/* Top Tagline Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-900 border border-stone-800 text-stone-300 text-xs font-medium mb-5">
              <span className="font-serif tracking-wider text-amber-400 font-semibold">sartor.pk</span>
              <span className="text-stone-600">|</span>
              <a
                href={SARTOR_GOOGLE_MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-stone-300 hover:text-amber-300 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>Moon Tower, Model Town, Lahore</span>
                <ExternalLink className="w-3 h-3 text-stone-400" />
              </a>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-stone-100 tracking-tight leading-[1.12]">
              Sculpted for Power. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">
                Women's Bespoke Suiting in Lahore.
              </span>
            </h1>

            {/* Persuasive Body Copy */}
            <p className="mt-5 text-stone-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              Experience the unmatched distinction of a suit drafted strictly to your body. From architectural executive pantsuits to exquisite ceremonial ensembles, every SARTOR garment is cut on individual brown paper patterns by specialized cutters in Lahore. Flawless drape, sublime confidence, zero off-the-rack compromise.
            </p>

            {/* Quick Pillars */}
            <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-xl">
              <div className="flex items-center gap-2 text-xs text-stone-200 bg-stone-900/80 border border-stone-800 px-3 py-2.5 rounded-lg">
                <Crown className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-medium">Female Contoured Fit</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-stone-200 bg-stone-900/80 border border-stone-800 px-3 py-2.5 rounded-lg">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-medium">European & Pure Silks</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-stone-200 bg-stone-900/80 border border-stone-800 px-3 py-2.5 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-medium">Private Studio / Home Fitting</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <WhatsAppButton
                channel="hero"
                label="Book Custom Suit on WhatsApp"
                size="lg"
                variant="whatsapp"
                message="Assalam-o-Alaikum SARTOR, I would like to book a consultation for a women's bespoke custom suit at your Moon Tower studio."
                showPhoneHint
              />

              <a href="#size-chart" className="inline-flex">
                <Button
                  id="hero-size-chart-btn"
                  variant="outline"
                  size="lg"
                  fullWidth
                  leftIcon={<Ruler className="w-4 h-4 text-amber-400" />}
                >
                  Size Chart & Measurements
                </Button>
              </a>
            </div>

            {/* WhatsApp direct reassurance */}
            <div className="mt-5 flex items-center gap-2 text-xs text-stone-400">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
              <span>Direct Master Atelier WhatsApp: <strong className="text-stone-200">{SARTOR_PHONE_LOCAL}</strong> · Quick response</span>
            </div>

          </div>

          {/* Right Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Decorative Frame */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-amber-600/30 to-stone-700/20 rounded-2xl blur-lg opacity-70" />
              
              <div className="relative rounded-2xl overflow-hidden bg-stone-900 border border-stone-800 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1548624149-f9b1859aa9d0?auto=format&fit=crop&w=1000&q=80"
                  alt="SARTOR Women's Bespoke Tailoring in Lahore"
                  className="w-full h-84 sm:h-96 object-cover object-center"
                  loading="eager"
                />

                {/* Overlaid Floating Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-stone-950/95 border border-stone-800 p-4 rounded-xl backdrop-blur-md flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400 font-semibold block">
                      Women's Atelier · Lahore
                    </span>
                    <h3 className="font-serif text-sm font-semibold text-stone-100">
                      Moon Tower, International Market
                    </h3>
                    <p className="text-[11px] text-stone-400 mt-0.5">
                      Model Town, Lahore · Pakistan
                    </p>
                  </div>
                  <a
                    href={SARTOR_GOOGLE_MAPS_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-amber-400 transition-colors flex items-center gap-1.5 text-xs font-medium"
                    title="Open Google Maps Location"
                  >
                    <span>View Map</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>

              {/* Atelier Status float */}
              <div className="absolute -top-4 -left-3 hidden sm:flex items-center gap-3 bg-stone-900/95 border border-amber-600/40 shadow-xl px-4 py-2 rounded-xl backdrop-blur-md">
                <div className="w-7 h-7 rounded-full bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400 font-serif font-bold text-xs">
                  S
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-100">Women's Couture & Suiting</div>
                  <div className="text-[10px] text-emerald-400 font-medium">WhatsApp Booking Active</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
