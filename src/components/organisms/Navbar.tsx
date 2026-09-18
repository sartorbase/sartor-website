import React, { useState } from 'react';
import { BarChart3, Clock, MapPin, Menu, Phone, Sparkles, X } from 'lucide-react';
import { SARTOR_PHONE_DISPLAY, SARTOR_PHONE_LOCAL } from '../../services/analytics';
import { ThemeSwitcher } from '../atoms/ThemeSwitcher';
import { WhatsAppButton } from '../molecules/WhatsAppButton';

export interface NavbarProps {
  onOpenAnalytics?: () => void;
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Pricing & Stitching', href: '#pricing' },
    { label: 'Craft Showcase', href: '#service-showcase' },
    { label: 'Services & Sourcing', href: '#services' },
    { label: 'Pakistani Size Chart', href: '#size-chart' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-stone-950/90 backdrop-blur-md border-b border-stone-800/80 transition-all">
      {/* Top micro bar for location & working hours */}
      <div className="bg-stone-900/90 border-b border-stone-800/50 text-[11px] text-stone-400 py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-stone-300">
              <MapPin className="w-3 h-3 text-amber-500" />
              <span>Moon Tower, International Market, Model Town, Lahore</span>
            </span>
            <span className="hidden md:flex items-center gap-1 text-stone-400">
              <Clock className="w-3 h-3 text-stone-500" />
              <span>Mon-Sat: 11:00 AM – 9:30 PM PKT</span>
            </span>
          </div>
          <div className="flex items-center gap-2 text-stone-300">
            <Phone className="w-3 h-3 text-emerald-400" />
            <span>Direct Atelier: <strong className="text-emerald-400 font-mono">{SARTOR_PHONE_LOCAL}</strong></span>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex flex-col group">
          <span className="font-serif text-2xl sm:text-3xl font-extrabold tracking-[0.2em] text-stone-100 group-hover:text-amber-400 transition-colors">
            SARTOR
          </span>
          <span className="text-[9px] uppercase tracking-[0.35em] text-amber-500 font-semibold -mt-1">
            Bespoke Tailoring · Lahore
          </span>
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
          <ThemeSwitcher variant="segmented" />
          <WhatsAppButton
            channel="nav"
            label="Book via WhatsApp"
            size="sm"
            variant="whatsapp"
            message="Hello SARTOR, I would like to schedule a custom suit fitting at your Moon Tower studio in Model Town Lahore."
          />
        </div>

        {/* Mobile Menu & Quick Switcher Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <div className="sm:hidden">
            <ThemeSwitcher variant="compact" />
          </div>
          <button
            id="mobile-nav-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md bg-stone-900 border border-stone-800 text-stone-300 hover:text-white"
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

          <div className="pt-2 flex flex-col gap-3">
            <WhatsAppButton
              channel="nav"
              label="Schedule on WhatsApp"
              size="md"
              fullWidth
              showPhoneHint
              message="Hello SARTOR, I would like to schedule a bespoke consultation in Lahore."
            />
          </div>
        </div>
      )}
    </header>
  );
};
