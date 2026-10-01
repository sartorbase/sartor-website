import React from 'react';
import { SartorLogo } from '../atoms/SartorLogo';
import { buildWhatsAppLink } from '../../services/analytics';
import { navigateTo } from '../../utils/navigation';
import { MessageSquare, MapPin, Phone, Clock, ShieldCheck, Sparkles, BookOpen } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerWhatsAppMsg = `Assalam-o-Alaikum SARTOR Atelier,
I would like to enquire about bespoke tailoring services and doorstep fabric collection in Lahore.`;
  const whatsappUrl = buildWhatsAppLink(footerWhatsAppMsg, 'footer');

  const handleLinkClick = (href: string, e: React.MouseEvent) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }

    if (href.startsWith('/#')) {
      const targetId = href.replace('/#', '');
      e.preventDefault();
      if (typeof window !== 'undefined') {
        if (window.location.pathname === '/' || window.location.pathname === '') {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        } else {
          navigateTo(`/#${targetId}`);
          setTimeout(() => {
            const element = document.getElementById(targetId);
            if (element) element.scrollIntoView({ behavior: 'smooth' });
          }, 120);
        }
      }
      return;
    }

    if (href.startsWith('/')) {
      e.preventDefault();
      navigateTo(href);
      return;
    }
  };

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-850 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-stone-800">
          {/* Brand Column */}
          <div className="space-y-4">
            <a
              href="/"
              onClick={(e) => handleLinkClick('/', e)}
              className="inline-block group cursor-pointer"
            >
              <SartorLogo variant="footer" />
            </a>
            <p className="text-stone-400 text-sm leading-relaxed max-w-sm">
              Premier bespoke women&apos;s tailoring atelier in Model Town, Lahore. Specializing in luxury bridal lehengas, sarees, 16-kali kalidars, raw silk pret, and hand zardozi craftsmanship with free doorstep pickup &amp; delivery across Lahore.
            </p>
            <div className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-700/30 hover:bg-emerald-700/50 border border-emerald-500/40 text-emerald-300 hover:text-emerald-200 text-sm font-semibold transition-all"
              >
                <MessageSquare className="w-4 h-4 fill-current shrink-0" />
                <span>WhatsApp: +92 335 2209991</span>
              </a>
            </div>
          </div>

          {/* Stitching Services & Rates */}
          <div>
            <h3 className="text-stone-100 font-serif font-bold text-base uppercase tracking-wider mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Tailoring &amp; Rates
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="/#pricing"
                  onClick={(e) => handleLinkClick('/#pricing', e)}
                  className="hover:text-amber-400 transition-colors flex items-center justify-between"
                >
                  <span>Simple 2-Piece Suit</span>
                  <span className="text-xs font-mono text-amber-400/90 font-semibold">PKR 2,500</span>
                </a>
              </li>
              <li>
                <a
                  href="/#pricing"
                  onClick={(e) => handleLinkClick('/#pricing', e)}
                  className="hover:text-amber-400 transition-colors flex items-center justify-between"
                >
                  <span>Double Suit / Lined Pret</span>
                  <span className="text-xs font-mono text-amber-400/90 font-semibold">PKR 4,000</span>
                </a>
              </li>
              <li>
                <a
                  href="/#pricing"
                  onClick={(e) => handleLinkClick('/#pricing', e)}
                  className="hover:text-amber-400 transition-colors flex items-center justify-between"
                >
                  <span>Saree &amp; Blouse Set</span>
                  <span className="text-xs font-mono text-amber-400/90 font-semibold">PKR 7,000</span>
                </a>
              </li>
              <li>
                <a
                  href="/#pricing"
                  onClick={(e) => handleLinkClick('/#pricing', e)}
                  className="hover:text-amber-400 transition-colors flex items-center justify-between"
                >
                  <span>16-Kali Kalidar &amp; Maxi</span>
                  <span className="text-xs font-mono text-amber-400/90 font-semibold">PKR 7,000</span>
                </a>
              </li>
              <li>
                <a
                  href="/custom-bridal"
                  onClick={(e) => handleLinkClick('/custom-bridal', e)}
                  className="hover:text-amber-400 transition-colors flex items-center justify-between text-amber-300 font-medium"
                >
                  <span>Custom Bridal Consultation</span>
                  <span className="text-xs font-mono text-amber-300 font-bold">$2,000+</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Navigation & Journal */}
          <div>
            <h3 className="text-stone-100 font-serif font-bold text-base uppercase tracking-wider mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-400" />
              Journal &amp; Atelier
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="/blog"
                  onClick={(e) => handleLinkClick('/blog', e)}
                  className="hover:text-amber-400 transition-colors"
                >
                  Atelier Journal &amp; Masterclasses
                </a>
              </li>
              <li>
                <a
                  href="/blog/how-to-choose-a-good-tailor-in-lahore"
                  onClick={(e) => handleLinkClick('/blog/how-to-choose-a-good-tailor-in-lahore', e)}
                  className="hover:text-amber-400 transition-colors text-stone-400 hover:text-stone-200"
                >
                  How to Choose a Good Tailor in Lahore
                </a>
              </li>
              <li>
                <a
                  href="/blog/overseas-bride-zardozi-lehenga-sizing-guide"
                  onClick={(e) => handleLinkClick('/blog/overseas-bride-zardozi-lehenga-sizing-guide', e)}
                  className="hover:text-amber-400 transition-colors text-stone-400 hover:text-stone-200"
                >
                  Overseas Bride Sizing Guide
                </a>
              </li>
              <li>
                <a
                  href="/#portfolio"
                  onClick={(e) => handleLinkClick('/#portfolio', e)}
                  className="hover:text-amber-400 transition-colors"
                >
                  Masterpiece Portfolio
                </a>
              </li>
              <li>
                <a
                  href="/#size-chart"
                  onClick={(e) => handleLinkClick('/#size-chart', e)}
                  className="hover:text-amber-400 transition-colors"
                >
                  Pakistani Standard Size Chart
                </a>
              </li>
            </ul>
          </div>

          {/* Studio Location & Guarantee */}
          <div>
            <h3 className="text-stone-100 font-serif font-bold text-base uppercase tracking-wider mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400" />
              Lahore Studio
            </h3>
            <div className="space-y-3 text-sm text-stone-400">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>Moon Tower, International Market, Model Town, Lahore, Pakistan</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span>+92 335 2209991</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Mon – Sat: 11:00 AM – 9:00 PM PKT</span>
              </p>
              <div className="p-3 rounded-lg bg-stone-900 border border-stone-800 text-xs text-stone-300 flex items-start gap-2 mt-2">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>1.5–2.0 inches internal alteration margin guaranteed on every garment.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>&copy; {currentYear} SARTOR Bespoke Atelier Lahore. All rights reserved.</p>
          <p className="flex items-center gap-4">
            <a
              href="/#location"
              onClick={(e) => handleLinkClick('/#location', e)}
              className="hover:text-stone-300 transition-colors"
            >
              Moon Tower Model Town
            </a>
            <span>•</span>
            <a
              href="/blog"
              onClick={(e) => handleLinkClick('/blog', e)}
              className="hover:text-stone-300 transition-colors"
            >
              Editorial Journal
            </a>
            <span>•</span>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 text-emerald-500 font-semibold transition-colors"
            >
              WhatsApp Support (0335-2209991)
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
