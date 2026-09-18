import React from 'react';
import { CheckCircle2, ChevronRight, ExternalLink, Mail, MapPin, MessageSquare, Phone } from 'lucide-react';
import { buildWhatsAppLink, SARTOR_GOOGLE_MAPS_LINK, SARTOR_PHONE_DISPLAY, SARTOR_PHONE_LOCAL } from '../../services/analytics';
import { ThemeSwitcher } from '../atoms/ThemeSwitcher';

export interface FooterProps {
  onOpenAnalytics?: () => void;
}

export const Footer: React.FC<FooterProps> = () => {
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
              Artisanal custom pantsuits, structured blazers, ceremonial trouser suits, and bespoke stitching for women. Hand-cut and fitted at Moon Tower, Model Town, Lahore.
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
                <span>Direct Contact: info@sartor-atelier.com</span>
              </span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold mb-2">
              Atelier Offerings & Pricing
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#pricing" className="hover:text-amber-400 transition-colors flex items-center justify-between">
                  <span>Simple Suit Stitching</span>
                  <strong className="text-stone-300 font-mono">PKR 2,500</strong>
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-amber-400 transition-colors flex items-center justify-between">
                  <span>Double Suit / Layered Gown</span>
                  <strong className="text-stone-300 font-mono">PKR 4,000</strong>
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-amber-400 transition-colors flex items-center justify-between">
                  <span>Sarhi Set (Blouse + Fall + Pico)</span>
                  <strong className="text-stone-300 font-mono">PKR 7,000</strong>
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-amber-400 transition-colors flex items-center justify-between">
                  <span>Panneled Frock / Kalidar Set</span>
                  <strong className="text-stone-300 font-mono">PKR 7,000</strong>
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-amber-400 transition-colors flex items-center justify-between">
                  <span>Bridal Set (Lehenga / Maxi)</span>
                  <strong className="text-amber-400 font-mono">PKR 10,000</strong>
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-400 transition-colors flex items-center justify-between">
                  <span>Hand & Machine Embroidery</span>
                  <span className="text-emerald-400 text-[10px]">Master Karigari</span>
                </a>
              </li>
              <li>
                <a href="#size-chart" className="hover:text-amber-400 transition-colors flex items-center justify-between">
                  <span>Pakistani Brand Size Chart</span>
                  <span className="text-amber-400 text-[10px]">XS – XL</span>
                </a>
              </li>
            </ul>
          </div>

          {/* SARTOR Standards */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold mb-1">
              Atelier Commitments
            </h4>
            <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 space-y-2.5 text-xs text-stone-400">
              <div className="flex items-center gap-2 text-stone-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Precision Bespoke Cut & Fit for Women</span>
              </div>
              <div className="flex items-center gap-2 text-stone-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Pakistani Brand Standard Sizing (XS - XL)</span>
              </div>
              <div className="flex items-center gap-2 text-stone-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Doorstep Fabric Pick & Delivery in Lahore</span>
              </div>
              <div className="flex items-center gap-2 text-stone-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Direct WhatsApp Consultation with Master Tailor</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={buildWhatsAppLink('Assalam-o-Alaikum SARTOR, I would like to inquire about stitching and tailoring services.', 'floating')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs shadow-md transition-colors"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Connect with Atelier on WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} SARTOR Bespoke. Exclusively Serving Women · Lahore, Pakistan.
          </div>

          {/* Ambience Theme Switcher */}
          <div className="flex items-center gap-2.5">
            <span className="text-[11px] text-stone-400 font-medium">Atelier Ambience:</span>
            <ThemeSwitcher variant="segmented" />
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
              href={buildWhatsAppLink('Assalam-o-Alaikum SARTOR, I would like to schedule a consultation.', 'hero')}
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
