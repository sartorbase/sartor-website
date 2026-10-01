import React from 'react';
import { MapPin, Phone, Clock, Truck, ShieldCheck, MessageSquare, Navigation } from 'lucide-react';
import { buildWhatsAppLink } from '../../services/analytics';

export const LocationMapSection: React.FC = () => {
  const pickupAreas = [
    'Model Town (Blocks A to M)',
    'DHA Lahore (Phases 1 to 8)',
    'Gulberg (I, II, III & Main Boulevard)',
    'Johar Town & Faisal Town',
    'Lahore Cantt & Cavalry Ground',
    'Garden Town & Muslim Town',
    'Wapda Town & Valencia',
    'Askari (1, 5, 9, 10, 11)',
  ];

  const mapWhatsAppUrl = buildWhatsAppLink(
    `Assalam-o-Alaikum SARTOR Atelier,
I would like to request doorstep fabric pickup in Lahore.
My Area: [Please specify, e.g. DHA / Model Town / Gulberg]
Number of Suits: [e.g. 2 lawn suits, 1 festive maxi]`,
    'map_doorstep_cta'
  );

  return (
    <section id="location" className="py-20 bg-stone-950 text-stone-100 border-b border-stone-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-amber-400 font-mono text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-1.5 mb-2">
            <MapPin className="w-4 h-4 text-amber-400" />
            Atelier Location &amp; Doorstep Service
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-100 tracking-tight">
            Visit Our Model Town Studio
          </h2>
          <p className="mt-3 text-stone-300 text-sm sm:text-base leading-relaxed">
            Conveniently situated in Moon Tower, International Market, Model Town. Visit for in-person fittings or book free doorstep fabric collection anywhere in Lahore.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          {/* Studio Details & Pickup Areas */}
          <div className="p-8 rounded-2xl bg-stone-900 border border-stone-800 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <h3 className="font-serif font-bold text-xl text-stone-100 mb-2">
                  SARTOR Bespoke Atelier
                </h3>
                <p className="text-stone-400 text-sm">
                  First Floor, Moon Tower, International Market, Model Town, Lahore, Punjab, Pakistan
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-stone-300">
                <div className="p-3.5 rounded-xl bg-stone-850 border border-stone-750">
                  <div className="text-amber-400 font-semibold mb-1 flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>Studio Hours</span>
                  </div>
                  <p className="text-stone-300">Monday – Saturday</p>
                  <p className="text-stone-400">11:00 AM – 9:00 PM PKT</p>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-850 border border-stone-750">
                  <div className="text-amber-400 font-semibold mb-1 flex items-center gap-1.5">
                    <Phone className="w-4 h-4" />
                    <span>Direct Helpline</span>
                  </div>
                  <p className="text-stone-300 font-bold">+92 335 2209991</p>
                  <p className="text-stone-400">Call &amp; WhatsApp</p>
                </div>
              </div>

              {/* Doorstep Pickup Coverage */}
              <div>
                <h4 className="text-xs uppercase tracking-wider font-mono font-bold text-amber-400 mb-3 flex items-center gap-2">
                  <Truck className="w-4 h-4" />
                  Free Doorstep Fabric Pickup Across Lahore
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs text-stone-300">
                  {pickupAreas.map((area, idx) => (
                    <div key={idx} className="flex items-center gap-2 py-1 px-2 rounded bg-stone-850/60 border border-stone-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                      <span className="truncate">{area}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-8 mt-6 border-t border-stone-800 flex flex-col sm:flex-row gap-3">
              <a
                href={mapWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-950/40 cursor-pointer"
              >
                <Truck className="w-4 h-4" />
                <span>Book Doorstep Pickup on WhatsApp</span>
              </a>

              <a
                href="https://maps.google.com/?q=Moon+Tower+Model+Town+Lahore"
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-200 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 border border-stone-700 transition-colors"
              >
                <Navigation className="w-4 h-4" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>

          {/* Interactive / Visual Map Embed Card */}
          <div className="relative rounded-2xl overflow-hidden border border-stone-800 bg-stone-900 flex flex-col min-h-[350px]">
            <iframe
              title="SARTOR Atelier Moon Tower Model Town Lahore Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3403.486803734105!2d74.31821037626998!3d31.483256974230238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190473a21665a5%3A0xb3bf8bc4eb2023a1!2sModel%20Town%2C%20Lahore%2C%20Punjab!5e0!3m2!1sen!2spk!4v1711756000000!5m2!1sen!2spk"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '380px' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full grayscale-[25%] contrast-[1.05]"
            />
            <div className="p-4 bg-stone-950 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                <span>Moon Tower, International Market, Model Town, Lahore</span>
              </span>
              <span className="text-amber-400 font-mono font-semibold">Free Customer Parking Available</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
