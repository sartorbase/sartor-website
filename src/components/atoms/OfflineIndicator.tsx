import React from 'react';
import { WifiOff, ShieldCheck } from 'lucide-react';
import { useOnlineStatus } from '../../hooks/usePWAInstall';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <aside
      role="status"
      aria-live="polite"
      className="fixed bottom-20 left-4 z-40 max-w-sm rounded-xl bg-stone-900/95 border border-amber-500/40 px-3.5 py-2.5 shadow-2xl backdrop-blur-md text-stone-100 flex items-center gap-3 animate-fade-in"
    >
      <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
        <WifiOff className="w-4 h-4" />
      </div>
      <div>
        <p className="text-xs font-semibold text-amber-300 flex items-center gap-1.5">
          <span>Offline Mode Active</span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
        </p>
        <p className="text-[11px] text-stone-400 leading-tight mt-0.5">
          Atelier measurement guide &amp; sizing charts are loaded from offline cache.
        </p>
      </div>
    </aside>
  );
};
