'use client';

import React, { useState, useEffect } from 'react';
import { Ruler, Sparkles } from 'lucide-react';
import { MeasurementModal } from './MeasurementModal';

export interface MeasurementStickyTriggerProps {
  enableExitIntent?: boolean;
}

export const MeasurementStickyTrigger: React.FC<MeasurementStickyTriggerProps> = ({
  enableExitIntent = true,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSource, setModalSource] = useState<string>('sticky_pill');
  const [visible, setVisible] = useState(true);

  // Exit-Intent Trigger on Desktop (fires only once per session when cursor moves up out of viewport)
  useEffect(() => {
    if (!enableExitIntent || typeof window === 'undefined') return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 15) {
        const hasTriggered = sessionStorage.getItem('sartor_exit_intent_fired');
        if (!hasTriggered) {
          sessionStorage.setItem('sartor_exit_intent_fired', 'true');
          setModalSource('exit_intent');
          setModalOpen(true);
        }
      }
    };

    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [enableExitIntent]);

  return (
    <>
      {/* Floating Bottom-Left Pill Trigger */}
      {visible && (
        <aside
          aria-label="Create Free Size Profile Trigger"
          className="fixed bottom-5 left-5 z-40 select-none animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
          <button
            type="button"
            onClick={() => {
              setModalSource('sticky_pill');
              setModalOpen(true);
            }}
            aria-label="Open Free Digital Size Profile creator modal"
            className="group relative flex items-center gap-2 pl-3 pr-4 py-2.5 rounded-full bg-stone-900/95 hover:bg-stone-850 text-amber-300 hover:text-white border border-amber-500/40 hover:border-amber-400 backdrop-blur-md shadow-2xl shadow-black/80 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer text-xs sm:text-sm font-semibold tracking-wide"
          >
            {/* Subtle Pulsing Gold Beacon */}
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
            </span>

            {/* Ruler Icon & Label */}
            <span className="text-base leading-none">📐</span>
            <span className="font-serif">Create Free Size Profile</span>
          </button>
        </aside>
      )}

      {/* Measurement Modal */}
      <MeasurementModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        source={modalSource}
      />
    </>
  );
};

export default MeasurementStickyTrigger;
