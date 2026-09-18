import React from 'react';
import { BarChart3, CheckCircle2, ChevronRight, ExternalLink, Globe, Mail, MapPin, MessageSquare, Phone } from 'lucide-react';
import { buildWhatsAppLink, SARTOR_GOOGLE_MAPS_LINK, SARTOR_PHONE_DISPLAY, SARTOR_PHONE_LOCAL } from '../../services/analytics';

export interface FooterProps {
  onOpenAnalytics: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAnalytics }) => {
  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-stone-800">
          
          {/* Brand info */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div>
              <span className="font-serif text-3xl font-bold tracking-[0.25em] text-stone-100">
                SARTOR
              </span>
              <p className="text-xs uppercase font-mono tracking-[0.3em] text-amber-500 mt-1">
                Women's Bespoke Tailoring Atelier · Lahore
              </p>
            </div>
            
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Artisanal custom pantsuits, structured blazers, ceremonial trouser suits, and bespoke silk waistcoats for women. Hand-cut and fitted at Moon Tower, Model Town, Lahore. (Men's bespoke service launching soon).
            </p>

            <div className="flex flex-col gap-2 text-xs text-stone-300 mt-2">
              <a
                href={SARTOR_GOOGLE_MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-amber-400 transition-colors group"
              >
                <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Moon Tower, International Market, Model Town, Lahore</span>
                <ExternalLink className="w-3 h-3 text-stone-500 group-hover:text-amber-400" />
              </a>
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Direct WhatsApp: <strong>{SARTOR_PHONE_LOCAL}</strong> ({SARTOR_PHONE_DISPLAY})</span>
              </span>
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Official Email: contact@sartor.pk</span>
              </span>
              <span className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Official Domain: <strong>sartor.pk</strong></span>
              </span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold mb-2">
              Atelier Navigation
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#book-suit" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-stone-600" />
                  <span>Executive Double-Breasted Pantsuit</span>
                </a>
              </li>
              <li>
                <a href="#book-suit" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-stone-600" />
                  <span>Single-Breasted Notch Collar Suit</span>
                </a>
              </li>
              <li>
                <a href="#book-suit" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-stone-600" />
                  <span>Three-Piece Vest & Wide-Leg Set</span>
                </a>
              </li>
              <li>
                <a href="#book-suit" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-stone-600" />
                  <span>Ceremonial Velvet & Brocade Suit</span>
                </a>
              </li>
              <li>
                <a href="#size-chart" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-stone-600" />
                  <span>Women's Size Chart & Measuring Guide</span>
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-stone-600" />
                  <span>Send Direct Inquiry</span>
                </a>
              </li>
            </ul>
          </div>

          {/* SARTOR Standards & AI / SEO Badges */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold mb-1">
              Architecture & Discoverability
            </h4>
            <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 space-y-2.5 text-xs text-stone-400">
              <div className="flex items-center gap-2 text-stone-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>SEO & OpenGraph Verified for <strong>sartor.pk</strong></span>
              </div>
              <div className="flex items-center gap-2 text-stone-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Schema.org Women's Clothing & Tailoring JSON-LD</span>
              </div>
              <div className="flex items-center gap-2 text-stone-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>AI Indexing (llms.txt & Perplexity / ChatGPT)</span>
              </div>
              <div className="flex items-center gap-2 text-stone-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Direct WhatsApp Consultation Engine</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={onOpenAnalytics}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-800 text-stone-300 hover:text-amber-400 hover:border-stone-700 text-xs transition-colors cursor-pointer"
              >
                <BarChart3 className="w-3.5 h-3.5 text-amber-500" />
                <span>View Real-Time Conversion Metrics</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} SARTOR Bespoke. Exclusively Serving Women. Domain: sartor.pk · Lahore, Pakistan.
          </div>
          <div className="flex items-center gap-4">
            <a
              href={SARTOR_GOOGLE_MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors flex items-center gap-1"
            >
              <span>Moon Tower, Model Town on Google Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span>•</span>
            <a
              href={buildWhatsAppLink('Assalam-o-Alaikum SARTOR, I am visiting sartor.pk and would like to chat.', 'hero')}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline"
            >
              WhatsApp Concierge
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
