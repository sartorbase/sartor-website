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
  hideOnDesktop?: boolean;
}

export const WhatsAppFloatingButton: React.FC<WhatsAppFloatingButtonProps> = ({
  isChatOpen: propIsChatOpen,
  hideOnDesktop = true,
}) => {
  const { isChatOpen: contextIsChatOpen } = useChatUI();
  const isChatOpen = propIsChatOpen !== undefined ? propIsChatOpen : contextIsChatOpen;

  // Automatically hide floating WhatsApp button when Chatbot window is open to avoid any UI overlap
  if (isChatOpen) {
    return null;
  }

  const handleFloatingClick = () => {
    const defaultMsg = `Assalam-o-Alaikum SARTOR Atelier,
I would like to inquire about women's bespoke tailoring, stitching rates, and doorstep pickup in Lahore.`;
    const url = buildWhatsAppLink(defaultMsg, 'floating');
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <aside 
      aria-label="Direct WhatsApp Concierge"
      className={`fixed bottom-5 right-5 z-30 flex items-center select-none transition-all duration-300 ${
        hideOnDesktop ? 'md:hidden' : ''
      }`}
    >
      {/* Simplified, High-Contrast Action Pill */}
      <button
        id="floating-whatsapp-action"
        type="button"
        onClick={handleFloatingClick}
        aria-label={`Chat with SARTOR Atelier on WhatsApp ${SARTOR_PHONE_LOCAL}`}
        title={`Chat with SARTOR Atelier on WhatsApp (${SARTOR_PHONE_LOCAL})`}
        className="group relative flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-950/60 border border-emerald-400/40 backdrop-blur-md transition-all duration-200 active:scale-95 cursor-pointer"
      >
        <MessageSquare className="w-4 h-4 fill-current shrink-0" />
        <span className="text-xs font-bold tracking-wide">
          WhatsApp <span className="opacity-90 font-mono">({SARTOR_PHONE_LOCAL})</span>
        </span>
      </button>
    </aside>
  );
};
