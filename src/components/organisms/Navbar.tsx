import React, { useState } from 'react';
import { Menu, MessageSquare, X } from 'lucide-react';
import { SartorLogo } from '../atoms/SartorLogo';
import { buildWhatsAppLink } from '../../services/analytics';

export interface NavbarProps {
  onOpenAnalytics?: () => void;
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Custom Bridal ($2k+)', href: '#custom-bridal', highlight: true },
    { label: 'Stitching Rates', href: '#pricing' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Size Chart', href: '#size-chart' },
    { label: 'Studio Location', href: '#location' },
  ];

  const navWhatsAppMsg = `Assalam-o-Alaikum SARTOR Atelier,
I would like to book a bespoke tailoring consultation.
Please guide me on stitching rates, timeframes, and doorstep fabric pickup in Lahore.`;
  const whatsappUrl = buildWhatsAppLink(navWhatsAppMsg, 'nav');

  return (
    <header className="sticky top-0 z-40 bg-stone-950/95 backdrop-blur-md border-b border-stone-800/80 transition-all">
      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <a href="#" className="flex items-center group cursor-pointer shrink-0">
          <SartorLogo variant="navbar" />
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-7 text-xs uppercase tracking-wider font-semibold text-stone-300">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`transition-colors py-1 relative group ${
                link.highlight
                  ? 'text-amber-300 font-bold px-2.5 py-1 rounded-full bg-amber-950/60 border border-amber-500/40 hover:bg-amber-900/60'
                  : 'hover:text-amber-400'
              }`}
            >
              {link.label}
              {!link.highlight && (
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full" />
              )}
            </a>
          ))}
        </nav>

        {/* Right side: Single high-contrast "Book on WhatsApp" button */}
        <div className="flex items-center gap-2.5">
          <a
            id="nav-whatsapp-cta"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-950/40 border border-emerald-400/40 transition-all duration-200 active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <MessageSquare className="w-4 h-4 fill-current shrink-0" />
            <span>Book on WhatsApp</span>
          </a>

          {/* Mobile Menu Drawer Toggle */}
          <button
            id="mobile-nav-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-stone-900 border border-stone-800 text-stone-300 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-800 bg-stone-950 px-5 py-5 flex flex-col gap-4 animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col divide-y divide-stone-800/80">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm py-3 flex items-center justify-between ${
                  link.highlight
                    ? 'font-bold text-amber-300'
                    : 'font-medium text-stone-200 hover:text-amber-400'
                }`}
              >
                <span>{link.label}</span>
                {link.highlight && (
                  <span className="text-[10px] font-mono uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full">
                    Overseas
                  </span>
                )}
              </a>
            ))}
          </nav>

          <div className="pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-emerald-950/50 border border-emerald-400/30 transition-all active:scale-95"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Book on WhatsApp (0335-2209991)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
