import React from 'react';
import { MessageSquare } from 'lucide-react';
import { buildWhatsAppLink } from '../../services/analytics';
import { useChatUI } from '../../context/ChatUIContext';

export const WhatsAppFloatingButton: React.FC = () => {
  const { isChatOpen } = useChatUI();

  if (isChatOpen) return null;

  const floatingMsg = `Assalam-o-Alaikum SARTOR Atelier,
I would like to enquire about bespoke women's tailoring, stitching rates, and doorstep fabric pickup in Lahore.`;
  const whatsappUrl = buildWhatsAppLink(floatingMsg, 'floating_button');

  return (
    <div className="fixed bottom-6 right-6 z-30 print:hidden animate-fade-in">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Master Tailor on WhatsApp"
        className="flex items-center gap-3 px-5 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-2xl shadow-emerald-950/70 border border-emerald-400/40 hover:scale-105 active:scale-95 transition-all duration-200 group cursor-pointer"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        <MessageSquare className="w-5 h-5 fill-current shrink-0" />
        <span className="text-sm font-bold tracking-wide hidden sm:inline-block">
          WhatsApp Tailor (0335-2209991)
        </span>
      </a>
    </div>
  );
};
