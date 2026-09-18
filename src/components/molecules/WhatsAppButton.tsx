import React from 'react';
import { MessageSquare, PhoneCall } from 'lucide-react';
import { buildWhatsAppLink, SARTOR_PHONE_DISPLAY, SARTOR_PHONE_LOCAL } from '../../services/analytics';
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

export const WhatsAppFloatingButton: React.FC = () => {
  const handleFloatingClick = () => {
    const defaultMsg = 'Hello SARTOR Master Tailor, I would like to inquire about booking a bespoke custom suit in Lahore.';
    const url = buildWhatsAppLink(defaultMsg, 'floating');
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 group">
      <div className="hidden sm:flex flex-col items-end bg-stone-900/95 border border-stone-700/80 shadow-2xl py-2 px-3.5 rounded-lg text-xs backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <span className="font-semibold text-stone-200">Chat with Master Tailor</span>
        <span className="text-emerald-400 font-medium">WhatsApp 0335-2209991</span>
      </div>
      <button
        id="floating-whatsapp-trigger"
        onClick={handleFloatingClick}
        aria-label="Contact SARTOR on WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-950/60 transition-transform duration-300 hover:scale-105 active:scale-95 cursor-pointer ring-4 ring-emerald-500/20"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-300"></span>
        </span>
        <MessageSquare className="w-7 h-7 fill-white" />
      </button>
    </div>
  );
};
