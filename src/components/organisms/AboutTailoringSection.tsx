import React from 'react';
import { motion } from 'motion/react';
import {
  CheckCircle2,
  Clock,
  HeartHandshake,
  MapPin,
  MessageSquare,
  PackageCheck,
  Scissors,
  Sparkles,
  Truck,
} from 'lucide-react';
import { SectionHeading } from '../atoms/SectionHeading';
import { Button } from '../atoms/Button';
import { buildWhatsAppLink, SARTOR_PHONE_LOCAL } from '../../services/analytics';

export const AboutTailoringSection: React.FC = () => {
  const handleWhatsAppConsult = () => {
    const message = `Assalam-o-Alaikum SARTOR Atelier,
I read about your tailoring services in Lahore & online stitching across Pakistan.
I would like to inquire about custom stitching for my outfit.`;
    const url = buildWhatsAppLink(message, 'about');
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      id="about-tailoring"
      aria-label="About Our Tailoring Services"
      className="py-16 md:py-24 bg-stone-900/60 border-b border-stone-800 relative overflow-hidden"
    >
      {/* Decorative ambient background accents */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-10 w-80 h-80 bg-stone-800/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative">
        {/* Semantic H2 Heading */}
        <SectionHeading
          badge="Specialization · Exclusively Crafting Bespoke Women's Fashion"
          title="About Our Tailoring Services"
          subtitle="Discover how SARTOR elevates female bespoke tailoring in Lahore and delivers trusted online ladies stitching throughout Pakistan."
          align="center"
        />

        {/* 2-3 Short Paragraphs for SEO & Search Engine Indexing */}
        <div className="max-w-4xl mx-auto bg-stone-950/80 border border-stone-800/90 rounded-2xl p-6 sm:p-10 shadow-2xl backdrop-blur-sm mb-12">
          <div className="space-y-5 text-stone-200 text-sm sm:text-base md:text-lg leading-relaxed font-sans">
            <p className="border-l-2 border-amber-500 pl-4 sm:pl-5 text-stone-100">
              <strong className="text-amber-300 font-semibold">Looking for the best tailor in Lahore?</strong>{' '}
              SARTOR provides bespoke women's tailoring, custom bridal lehengas, sarees, and festive maxis. Located at Moon Tower in International Market, Model Town, our atelier unites generational master cutters with contemporary finishing standards to create silhouettes tailored precisely to your measurements and body type.
            </p>

            <p className="border-l-2 border-emerald-500/80 pl-4 sm:pl-5 text-stone-300">
              <strong className="text-emerald-300 font-semibold">As one of Pakistan's premier online tailors,</strong>{' '}
              we offer door-to-door fabric pickup and stitching delivery nationwide. Whether you reside in Lahore (Model Town, Gulberg, DHA, Cantt, Johar Town, or Bahria Town) or order from Karachi, Islamabad, Rawalpindi, Peshawar, or overseas, our seamless online tailoring workflow lets you send your fabric or let us source it, customize necklines and embroidery, and receive steam-pressed outfits delivered to your doorstep.
            </p>

            <p className="border-l-2 border-amber-500/50 pl-4 sm:pl-5 text-stone-300">
              From everyday simple pret suits starting at PKR 2,500 to structured double-layered coats, flared 16-kali kalidar frocks, pleated sarees with padded bustiers, and royal bridal couture, SARTOR guarantees complete rate transparency, genuine fabric sourcing from Lahore's top bazaars, and an uncompromising perfect-fit guarantee.
            </p>
          </div>

          {/* Quick Pillar Highlights */}
          <div className="mt-8 pt-6 border-t border-stone-800/90 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-stone-900/60 border border-stone-800/70">
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-stone-100 uppercase tracking-wide">Tailor in Lahore</h3>
                <p className="text-[11px] text-stone-400">Moon Tower, Model Town studio</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-stone-900/60 border border-stone-800/70">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-stone-100 uppercase tracking-wide">Online Tailors Pakistan</h3>
                <p className="text-[11px] text-stone-400">Door-to-door pickup & delivery</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-stone-900/60 border border-stone-800/70">
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                <Scissors className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-stone-100 uppercase tracking-wide">Bespoke Stitching</h3>
                <p className="text-[11px] text-stone-400">Bridal, maxis, sarees & pret</p>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Grid: 3 Pillars with rich keywords */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Best Tailor in Lahore */}
          <div className="p-6 rounded-2xl bg-stone-950 border border-stone-800 hover:border-amber-600/40 transition-colors flex flex-col justify-between shadow-lg">
            <div>
              <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
                <Scissors className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-amber-400 block mb-1">
                Atelier Craftsmanship
              </span>
              <h3 className="font-serif text-xl font-bold text-stone-100 mb-2">
                Best Tailor in Lahore for Women
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                Specialized in precision cuts for delicate silks, chiffons, organza, and velvet. We craft intricate laces, neck piping, custom sleeves, and heavy bridal lehengas with generational expertise in Model Town.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-stone-400 border-t border-stone-800/80 pt-3">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Personalized measurement appointments</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Hand zardozi, tilla &amp; thread embroidery</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Fabric sourcing from Liberty &amp; Ichhra</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Card 2: Premier Online Tailoring Pakistan */}
          <div className="p-6 rounded-2xl bg-stone-950 border border-stone-800 hover:border-amber-600/40 transition-colors flex flex-col justify-between shadow-lg">
            <div>
              <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                <Truck className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-emerald-400 block mb-1">
                Nationwide Convenience
              </span>
              <h3 className="font-serif text-xl font-bold text-stone-100 mb-2">
                Leading Online Tailors in Pakistan
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                Order custom dress stitching from the comfort of your home. Provide your measurements via WhatsApp or match standard Pakistani brand sizes (Khaadi, Sapphire, Maria.B) with door-to-door delivery.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-stone-400 border-t border-stone-800/80 pt-3">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Doorstep fabric collection across Lahore</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Fast shipping to Karachi, Islamabad &amp; all cities</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>International shipping for overseas clients</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Card 3: Custom Bridal, Sarees & Maxis */}
          <div className="p-6 rounded-2xl bg-stone-950 border border-stone-800 hover:border-amber-600/40 transition-colors flex flex-col justify-between shadow-lg">
            <div>
              <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-amber-400 block mb-1">
                Luxury Ensembles
              </span>
              <h3 className="font-serif text-xl font-bold text-stone-100 mb-2">
                Custom Bridal, Sarees &amp; Maxis
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                From pre-pleated sarees with weighted fall borders to architectural can-can bridal lehengas and royal 16-kali kalidars, we translate your Pinterest inspiration into reality with meticulous tailoring.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-stone-400 border-t border-stone-800/80 pt-3">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Padded choli &amp; blouse tailoring</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Multi-layer flared can-can lehengas</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Celebrity inspiration replication</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Row */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <Button
            id="about-section-whatsapp-cta"
            variant="whatsapp"
            size="lg"
            onClick={handleWhatsAppConsult}
            leftIcon={<MessageSquare className="w-5 h-5 fill-current" />}
          >
            Consult Master Tailor ({SARTOR_PHONE_LOCAL})
          </Button>

          <a href="#pricing">
            <Button
              id="about-section-rates-cta"
              variant="outline"
              size="lg"
            >
              View Stitching Rates (PKR)
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};
