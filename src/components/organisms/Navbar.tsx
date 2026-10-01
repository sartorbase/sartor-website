import React, { useState } from 'react';
import { Menu, MessageSquare, X } from 'lucide-react';
import { SartorLogo } from '../atoms/SartorLogo';
import { buildWhatsAppLink } from '../../services/analytics';
import { navigateTo } from '../../utils/navigation';

export interface NavbarProps {
  onOpenAnalytics?: () => void;
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Custom Bridal ($2k+)', href: '/custom-bridal', highlight: true },
    { label: 'Journal', href: '/blog' },
    { label: 'Stitching Rates', href: '/#pricing' },
    { label: 'Portfolio', href: '/#portfolio' },
    { label: 'Size Chart', href: '/#size-chart' },
    { label: 'Studio Location', href: '/#location' },
  ];

  const navWhatsAppMsg = `Assalam-o-Alaikum SARTOR Atelier,
I would like to book a bespoke tailoring consultation.
Please guide me on stitching rates, timeframes, and doorstep fabric pickup in Lahore.`;
  const whatsappUrl = buildWhatsAppLink(navWhatsAppMsg, 'nav');

  const handleLinkClick = (href: string, e: React.MouseEvent) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }

    if (href.startsWith('/#')) {
      const targetId = href.replace('/#', '');
      if (typeof window !== 'undefined') {
        if (window.location.pathname === '/' || window.location.pathname === '') {
          e.preventDefault();
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        } else {
          e.preventDefault();
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
    <header className="sticky top-0 z-40 bg-stone-950/95 backdrop-blur-md border-b border-stone-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        <a
          href="/"
          onClick={(e) => {
            if (!e.metaKey && !e.ctrlKey) {
              e.preventDefault();
              navigateTo('/');
            }
          }}
          className="flex items-center group cursor-pointer shrink-0"
        >
          <SartorLogo variant="navbar" />
        </a>

        <nav className="hidden md:flex items-center gap-5 lg:gap-7 text-xs uppercase tracking-wider font-semibold text-stone-300">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(link.href, e)}
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

        <div className="hidden sm:flex items-center gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-white" />
            <span>WhatsApp (0335-2209991)</span>
          </a>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-800 bg-stone-950 px-4 py-5 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                setMobileMenuOpen(false);
                handleLinkClick(link.href, e);
              }}
              className="block text-sm font-medium text-stone-200 hover:text-amber-400 py-1.5"
            >
              {link.label}
            </a>
          ))}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 mt-3 rounded-xl bg-emerald-600 text-white font-medium text-xs shadow-md"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            <span>Book Order on WhatsApp</span>
          </a>
        </div>
      )}
    </header>
  );
};
