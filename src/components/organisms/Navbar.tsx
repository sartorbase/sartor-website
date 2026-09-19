import React, { useState } from 'react';
import { Clock, MapPin, Menu, MessageSquare, Phone, Sparkles, X } from 'lucide-react';
import { buildWhatsAppLink, SARTOR_PHONE_LOCAL } from '../../services/analytics';
import { openSartorChat } from '../../services/geminiChat';
import { ThemeSwitcher } from '../atoms/ThemeSwitcher';
import { SartorLogo } from '../atoms/SartorLogo';
import { WhatsAppButton } from '../molecules/WhatsAppButton';

export interface NavbarProps {
  onOpenAnalytics?: () => void;
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Stitching Rates', href: '#pricing' },
    { label: 'Craft Portfolio', href: '#service-showcase' },
    { label: 'Embroidery & Sourcing', href: '#services' },
    { label: 'Pakistani Size Chart', href: '#size-chart' },
    { label: 'Studio & Location', href: '#location' },
  ];

  const handleQuickWhatsApp = () => {
    const url = buildWhatsAppLink(
      'Assalam-o-Alaikum SARTOR, I would like to inquire about women\'s bespoke tailoring and stitching services at your Model Town studio.',
      'nav'
    );
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <header className="sticky top-0 z-40 bg-stone-950/95 backdrop-blur-md border-b border-stone-800/80 transition-all">
      {/* Top micro bar for location & working hours */}
      <div className="bg-stone-900/90 border-b border-stone-800/50 text-[11px] text-stone-400 py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-stone-300 truncate">
              <MapPin className="w-3 h-3 text-amber-500 shrink-0" />
              <span className="truncate">Moon Tower, International Market, Model Town, Lahore</span>
            </span>
            <span className="hidden md:flex items-center gap-1 text-stone-400">
              <Clock className="w-3 h-3 text-stone-500" />
              <span>Mon–Sat: 11:00 AM – 9:30 PM PKT</span>
            </span>
          </div>
          <div className="flex items-center gap-2 text-stone-300 shrink-0">
            <Phone className="w-3 h-3 text-emerald-400" />
            <span>Atelier WhatsApp: <strong className="text-emerald-400 font-mono">{SARTOR_PHONE_LOCAL}</strong></span>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center group cursor-pointer">
          <SartorLogo variant="navbar" />
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-7 text-xs uppercase tracking-wider font-medium text-stone-300">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-amber-400 transition-colors py-1 relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* CTA Button & Theme Switcher Desktop */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => openSartorChat()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-200 hover:text-amber-300 border border-stone-800 hover:border-amber-500/40 text-xs font-semibold transition-all cursor-pointer shadow-sm"
            title="Ask Sartor AI Stylist with Google Search grounding"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>AI Stylist</span>
          </button>
          <ThemeSwitcher variant="segmented" />
          <WhatsAppButton
            channel="nav"
            label="Book on WhatsApp"
            size="sm"
            variant="whatsapp"
            message="Assalam-o-Alaikum SARTOR, I would like to inquire about women's bespoke stitching and consultation at your Moon Tower studio in Model Town Lahore."
          />
        </div>

        {/* Mobile Action Controls: Direct 1-tap WhatsApp + Compact Theme + Menu Drawer Toggle */}
        <div className="flex items-center gap-2 sm:hidden">
          <button
            onClick={() => openSartorChat()}
            className="flex items-center justify-center p-2 rounded-full bg-stone-900 border border-amber-500/40 text-amber-400 hover:text-amber-300 shadow-sm cursor-pointer"
            aria-label="Open AI Stylist"
            title="AI Stylist"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          </button>

          <button
            onClick={handleQuickWhatsApp}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md active:scale-95 transition-all"
            aria-label="Direct WhatsApp Message"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-current" />
            <span>WhatsApp</span>
          </button>

          <button
            id="mobile-nav-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-stone-900 border border-stone-800 text-stone-300 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Tablet Menu Toggle (sm to lg) */}
        <div className="hidden sm:flex lg:hidden items-center gap-2">
          <button
            onClick={() => openSartorChat()}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-stone-900 text-stone-200 border border-stone-800 text-xs font-medium cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>AI Stylist</span>
          </button>
          <ThemeSwitcher variant="compact" />
          <WhatsAppButton
            channel="nav"
            label="WhatsApp"
            size="sm"
            variant="whatsapp"
            message="Assalam-o-Alaikum SARTOR, I would like to inquire about women's bespoke tailoring."
          />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-stone-900 border border-stone-800 text-stone-300 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-800 bg-stone-950 px-5 py-6 flex flex-col gap-4 animate-in slide-in-from-top-4 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-stone-800">
            <span className="text-xs text-stone-400 font-medium">Atelier Ambience:</span>
            <ThemeSwitcher variant="segmented" />
          </div>

          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-stone-200 hover:text-amber-400 py-2 border-b border-stone-900"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-2 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openSartorChat();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-stone-900 to-stone-950 border border-amber-500/40 text-stone-100 text-xs font-semibold hover:border-amber-400 transition-all cursor-pointer shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Ask Sartor AI Stylist (Google Search)</span>
            </button>

            <WhatsAppButton
              channel="nav"
              label="Order / Consult on WhatsApp"
              size="md"
              fullWidth
              showPhoneHint
              message="Assalam-o-Alaikum SARTOR, I would like to schedule a women's bespoke consultation in Lahore."
            />
          </div>
        </div>
      )}
    </header>
  );
};
