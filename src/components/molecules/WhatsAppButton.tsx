import React, { useState } from 'react';
import { MessageSquare, PhoneCall } from 'lucide-react';
import { buildWhatsAppLink, SARTOR_PHONE_DISPLAY, SARTOR_PHONE_LOCAL } from '../../services/analytics';
import { useChatUI } from '../../context/ChatUIContext';
import { Button, ButtonProps } from '../atoms/Button';

export interface WhatsAppButtonProps {
  message?: string;
  channel?: 'hero' | 'floating' | 'suit_booking' | 'fabric' | 'contact' | 'size_chart' | 'nav';
  label?: string;
  variant?: ButtonProps['variant'];
  size?: ButtonProps['size'];
  fullWidth?: boolean;
  className?: string;
  showPhoneHint?: boolean;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  message = 'Assalam-o-Alaikum SARTOR, I would like to schedule a bespoke consultation for a custom suit at your Moon Tower studio.',
  channel = 'hero',
  label = 'Schedule on WhatsApp',
  variant = 'whatsapp',
  size = 'md',
  fullWidth = false,
  className = '',
  showPhoneHint = false,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const url = buildWhatsAppLink(message, channel);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={`inline-flex flex-col ${fullWidth ? 'w-full' : ''}`}>
      <Button
        id={`whatsapp-btn-${channel}`}
        type="button"
        variant={variant}
        size={size}
        fullWidth={fullWidth}
        leftIcon={<MessageSquare className="w-4 h-4 fill-current shrink-0" />}
        onClick={handleClick}
        className={className}
      >
        {label}
      </Button>
      {showPhoneHint && (
        <span className="text-[11px] text-stone-400 mt-1 text-center flex items-center justify-center gap-1">
          <PhoneCall className="w-3 h-3 text-emerald-400" />
          <span>Direct WhatsApp: <strong className="text-stone-300">{SARTOR_PHONE_LOCAL}</strong> ({SARTOR_PHONE_DISPLAY})</span>
        </span>
      )}
    </div>
  );
};

export interface WhatsAppFloatingButtonProps {
  isChatOpen?: boolean;
}

export const WhatsAppFloatingButton: React.FC<WhatsAppFloatingButtonProps> = ({
  isChatOpen: propIsChatOpen,
}) => {
  const { isChatOpen: contextIsChatOpen } = useChatUI();
  const isChatOpen = propIsChatOpen !== undefined ? propIsChatOpen : contextIsChatOpen;
  const [isHovered, setIsHovered] = useState(false);

  // Automatically hide floating WhatsApp button when Chatbot window is open to avoid any UI overlap
  if (isChatOpen) {
    return null;
  }

  const handleFloatingClick = () => {
    const defaultMsg = 'Assalam-o-Alaikum SARTOR, I would like to inquire about women\'s bespoke stitching, embroidery, and tailoring services.';
    const url = buildWhatsAppLink(defaultMsg, 'floating');
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <aside 
      aria-label="Direct WhatsApp Concierge"
      className="fixed bottom-6 right-6 z-30 flex items-center select-none transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Brand-Appropriate Floating Action Pill */}
      <button
        id="floating-whatsapp-action"
        type="button"
        onClick={handleFloatingClick}
        aria-label={`Chat with SARTOR Atelier on WhatsApp ${SARTOR_PHONE_LOCAL}`}
        className="group relative flex items-center gap-3 pl-3.5 pr-4 py-3 rounded-full bg-stone-900/95 hover:bg-stone-900 text-stone-100 border border-emerald-500/40 hover:border-emerald-400 shadow-2xl shadow-emerald-950/40 backdrop-blur-md transition-all duration-300 hover:shadow-emerald-900/50 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
      >
        {/* Glowing Emerald Icon Capsule */}
        <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-emerald-600 group-hover:bg-emerald-500 text-white shadow-md shadow-emerald-950/60 transition-colors duration-200 shrink-0">
          {/* Subtle Online Ping Indicator */}
          <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-300 border-2 border-stone-900"></span>
          </span>
          <MessageSquare className="w-5 h-5 fill-current" />
        </div>

        {/* Text Details */}
        <div className="flex flex-col text-left pr-1">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 font-semibold leading-none">
              WhatsApp Atelier
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>
          </div>
          <span className="text-xs font-serif font-bold text-stone-100 tracking-wide mt-0.5 leading-snug">
            {SARTOR_PHONE_LOCAL}
          </span>
        </div>
      </button>
    </aside>
  );
};
