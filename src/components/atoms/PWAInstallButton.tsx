import React, { useState } from 'react';
import { Download, Smartphone, X } from 'lucide-react';
import { usePWAInstall } from '../../hooks/usePWAInstall';

export const PWAInstallButton: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running as an installed PWA, suppress the button
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        onClick={install}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold tracking-wide transition-all cursor-pointer ${className}`}
        title="Install SARTOR Atelier App for offline measurement guide"
      >
        <Download className="w-3.5 h-3.5 text-amber-400" />
        <span>Install Atelier App</span>
      </button>
    );
  }

  // iOS Safari flow (beforeinstallprompt is not supported by WebKit)
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-850 text-stone-300 border border-stone-800 text-xs font-medium tracking-wide transition-all cursor-pointer ${className}`}
          title="Add SARTOR to Home Screen"
        >
          <Smartphone className="w-3.5 h-3.5 text-amber-400" />
          <span>Add to Home Screen</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <div className="w-full max-w-sm rounded-2xl bg-stone-900 border border-stone-800 p-6 shadow-2xl text-stone-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <h3 className="font-serif font-bold text-base text-stone-100">
                    Install on iPhone / iPad
                  </h3>
                </div>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="p-1 rounded-md text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs text-stone-300 leading-relaxed font-sans">
                <div className="p-3 rounded-xl bg-stone-950/80 border border-stone-850 flex items-start gap-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-[10px] font-bold">
                    1
                  </span>
                  <span>
                    Tap the <strong>Share</strong> button (box with an arrow pointing upward) in the Safari toolbar.
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-stone-950/80 border border-stone-850 flex items-start gap-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-[10px] font-bold">
                    2
                  </span>
                  <span>
                    Scroll down and tap <strong>Add to Home Screen</strong>.
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-stone-950/80 border border-stone-850 flex items-start gap-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-[10px] font-bold">
                    3
                  </span>
                  <span>
                    Launch anytime to view your <strong>Offline Measurement Guide</strong> and sizing records without Internet.
                  </span>
                </div>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold py-2.5 text-xs transition cursor-pointer"
              >
                Got It
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
