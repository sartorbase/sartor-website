import React, { useState } from 'react';
import { Car, Check, Clock, Compass, Copy, ExternalLink, MapPin, Navigation, Phone, Shield } from 'lucide-react';
import { analytics, buildWhatsAppLink, SARTOR_PHONE_DISPLAY, SARTOR_PHONE_LOCAL } from '../../services/analytics';
import { Button } from '../atoms/Button';
import { SectionHeading } from '../atoms/SectionHeading';

export const LocationMapSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const fullAddress = 'Moon Tower, International Market, Model Town, Lahore, Punjab 54700, Pakistan';
  const googleMapsUrl = 'https://www.google.com/maps/search/?api=1&query=Moon+Tower+International+Market+Model+Town+Lahore';

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOpenDirections = () => {
    analytics.trackEvent('map_directions_click', { destination: 'Moon Tower Model Town' });
    window.open(googleMapsUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="location" className="py-20 bg-stone-950 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <SectionHeading
          badge="Atelier & Studio Location"
          title="Visit Our Bespoke Studio in Model Town, Lahore"
          subtitle="Centrally situated at Moon Tower in International Market, Model Town. Easily accessible from Gulberg, DHA, Cantt, and Canal Road."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Location Details & Highlights */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-stone-900 border border-stone-800 rounded-2xl p-6 sm:p-8 shadow-xl">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold mb-3">
                <MapPin className="w-4 h-4 text-amber-500" />
                Physical Address
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-100">
                Moon Tower, International Market
              </h3>
              <p className="text-stone-300 text-sm mt-1">
                Model Town, Lahore, Punjab 54700 · Pakistan
              </p>

              {/* Copy Address Button */}
              <div className="mt-4 flex items-center gap-2">
                <button
                  onClick={handleCopyAddress}
                  className="inline-flex items-center gap-1.5 text-xs text-stone-300 bg-stone-800 hover:bg-stone-750 px-3 py-1.5 rounded-lg border border-stone-700 transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-medium">Address Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-stone-400" />
                      <span>Copy Full Address</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleOpenDirections}
                  className="inline-flex items-center gap-1.5 text-xs text-amber-400 bg-amber-950/40 hover:bg-amber-900/60 px-3 py-1.5 rounded-lg border border-amber-800/60 transition-colors cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Google Maps Directions</span>
                </button>
              </div>

              {/* Operating Hours */}
              <div className="mt-6 pt-5 border-t border-stone-800 space-y-3">
                <div className="flex items-start gap-3 text-xs">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-stone-200 block">Studio Consultation Hours:</span>
                    <span className="text-stone-400">Monday to Saturday: 11:00 AM – 9:30 PM PKT</span>
                    <span className="text-stone-400 block">Sunday: 2:00 PM – 8:00 PM (By Appointment)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs">
                  <Car className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-stone-200 block">Parking & Accessibility:</span>
                    <span className="text-stone-400">
                      Dedicated market parking available in front of Moon Tower, International Market square.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs">
                  <Compass className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-stone-200 block">Nearby Landmarks:</span>
                    <span className="text-stone-400">
                      2 minutes from Model Town Link Road & Model Town Central Park.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Studio Call / WhatsApp assistance */}
            <div className="mt-8 pt-6 border-t border-stone-800 flex flex-col gap-3">
              <div className="text-xs text-stone-400">
                Need directions or assistance on the way? Message our concierge on WhatsApp:
              </div>
              <a
                href={buildWhatsAppLink('Hello SARTOR, I am navigating to Moon Tower in Model Town and need assistance with directions.', 'map')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button
                  variant="whatsapp"
                  size="md"
                  fullWidth
                  leftIcon={<Phone className="w-4 h-4" />}
                >
                  Call / WhatsApp Concierge ({SARTOR_PHONE_LOCAL})
                </Button>
              </a>
            </div>

          </div>

          {/* Right Column: Interactive Embedded Map */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative w-full h-full min-h-[380px] sm:min-h-[460px] rounded-2xl overflow-hidden border border-stone-800 bg-stone-900 shadow-2xl">
              
              {/* Google Maps iFrame */}
              <iframe
                title="SARTOR Moon Tower Model Town Lahore Map"
                src="https://maps.google.com/maps?q=Moon%20Tower%2C%20International%20Market%2C%20Model%20Town%2C%20Lahore&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 grayscale-[40%] contrast-110"
                loading="lazy"
                allowFullScreen
              />

              {/* Floating Overlay Badge on Map */}
              <div className="absolute top-4 left-4 bg-stone-950/90 border border-stone-800 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-3 pointer-events-none">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                <div>
                  <div className="text-xs font-bold text-stone-100 font-serif">SARTOR ATELIER</div>
                  <div className="text-[10px] text-amber-400">Moon Tower · International Market</div>
                </div>
              </div>

              {/* Open in external Maps button */}
              <div className="absolute bottom-4 right-4">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleOpenDirections}
                  rightIcon={<ExternalLink className="w-3.5 h-3.5" />}
                  className="shadow-xl"
                >
                  Open in Google Maps
                </Button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
