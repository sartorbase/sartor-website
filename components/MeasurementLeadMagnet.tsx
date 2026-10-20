'use client';

import React, { useState } from 'react';
import {
  Ruler,
  CheckCircle2,
  Video,
  ArrowRight,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { MeasurementModal } from './MeasurementModal';

export interface MeasurementLeadMagnetProps {
  onOpenModal?: () => void;
  className?: string;
  sourceContext?: 'homepage' | 'blog' | 'services' | 'footer';
}

export const MeasurementLeadMagnet: React.FC<MeasurementLeadMagnetProps> = ({
  onOpenModal,
  className = '',
  sourceContext = 'homepage',
}) => {
  const [internalModalOpen, setInternalModalOpen] = useState(false);

  const handlePrimaryClick = () => {
    if (onOpenModal) {
      onOpenModal();
    } else {
      setInternalModalOpen(true);
    }
  };

  const whatsappVideoCallUrl = `https://wa.me/923352209991?text=${encodeURIComponent(
    'Hi SARTOR team, I want to schedule a guided video fitting call for my measurement profile.'
  )}`;

  return (
    <>
      <section
        id="digital-measurement-profile"
        aria-label="Digital Measurement Profile Lead Magnet"
        className={`relative overflow-hidden bg-[#0c0a09] text-stone-100 border-y border-stone-850 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 selection:bg-amber-800 selection:text-white ${className}`}
      >
        {/* Subtle Ambient Radial Lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-amber-600/10 via-amber-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-stone-800/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto">
          <div className="p-8 sm:p-12 lg:p-14 rounded-3xl bg-gradient-to-b from-stone-900/90 via-stone-900/50 to-stone-950/90 border border-amber-500/30 backdrop-blur-md shadow-2xl shadow-black/80 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
            {/* Left Content Area */}
            <div className="flex-1 max-w-2xl">
              {/* Pillar Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono uppercase tracking-widest font-semibold mb-5">
                <Ruler className="w-3.5 h-3.5 text-amber-400" />
                <span>SARTOR Cloud Tailoring • app.sartor.pk</span>
              </div>

              {/* Headline */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-100 tracking-tight leading-tight">
                Never Guess Your Dress Size Again
              </h2>

              {/* Subheadline */}
              <p className="mt-4 text-stone-300 text-sm sm:text-base leading-relaxed font-sans">
                Store your 28 precise anatomical measurements on our cloud portal. Share your profile link with any designer or tailor worldwide for a guaranteed fit.
              </p>

              {/* 3 Feature Highlights with Checkmarks */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-6 border-t border-stone-800/80">
                <div className="flex items-center gap-2.5 text-xs text-stone-200">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <span className="font-medium">100% Free Lifetime Profile Storage</span>
                </div>

                <div className="flex items-center gap-2.5 text-xs text-stone-200">
                  <div className="w-5 h-5 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <span className="font-medium">Guided 10-Minute Video Fitting Option</span>
                </div>

                <div className="flex items-center gap-2.5 text-xs text-stone-200">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <span className="font-medium">Instant Export to app.sartor.pk</span>
                </div>
              </div>
            </div>

            {/* Right Action Stack */}
            <div className="lg:w-80 flex flex-col gap-3.5 shrink-0 w-full sm:w-auto">
              {/* Primary CTA */}
              <button
                type="button"
                onClick={handlePrimaryClick}
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-bold text-sm tracking-wide uppercase transition-all shadow-xl shadow-amber-950/50 hover:shadow-amber-900/60 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2.5 group text-center"
              >
                <span>Create Free Measurement Profile</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Secondary CTA */}
              <a
                href={whatsappVideoCallUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-xl bg-stone-900/90 hover:bg-stone-850 text-stone-200 hover:text-white border border-stone-700/80 hover:border-amber-500/40 text-xs font-semibold tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer text-center shadow-md"
              >
                <Video className="w-4 h-4 text-amber-400" />
                <span>Book 1-on-1 Video Call</span>
              </a>

              {/* Micro Trust Text */}
              <p className="text-[11px] text-stone-400 text-center flex items-center justify-center gap-1.5 mt-1 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>No purchase required • Instant cloud access</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Internal Modal if no external handler provided */}
      {!onOpenModal && (
        <MeasurementModal
          isOpen={internalModalOpen}
          onClose={() => setInternalModalOpen(false)}
          source={`inline_${sourceContext}`}
        />
      )}
    </>
  );
};

export default MeasurementLeadMagnet;
