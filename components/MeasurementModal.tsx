'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  ShieldCheck,
  Video,
  ExternalLink,
  MessageSquare,
  Sparkles,
  Ruler,
  ArrowRight,
  Mail,
  Phone,
  User,
  MapPin,
  Loader2,
} from 'lucide-react';
import { saveLeadToSupabase } from '../lib/supabase';
import { SITE_CONFIG } from '../src/config/site';

export interface MeasurementModalProps {
  isOpen: boolean;
  onClose: () => void;
  source?: string;
}

export const MeasurementModal: React.FC<MeasurementModalProps> = ({
  isOpen,
  onClose,
  source = 'lead_magnet_button',
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState<number>(6);
  const [autoRedirectActive, setAutoRedirectActive] = useState<boolean>(true);

  // Form Fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    interest: 'Bridal Lehenga & Couture',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset step on reopen
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setLoading(false);
      setCountdown(6);
      setAutoRedirectActive(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Handle auto-redirect countdown on Step 2
  useEffect(() => {
    if (step !== 2 || !autoRedirectActive) return;

    if (countdown <= 0) {
      handleFinalRedirect();
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [step, countdown, autoRedirectActive]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Please provide your full name.';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      newErrors.email = 'Please provide a valid email address.';
    }
    if (!formData.phone.trim() || formData.phone.length < 7) {
      newErrors.phone = 'Please provide a valid WhatsApp phone number.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const CLEAN_PORTAL_URL = 'https://app.sartor.pk';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    // Track lead capture event in dataLayer if present
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'lead_magnet_submission',
        form_source: source,
        city: formData.city,
        interest: formData.interest,
      });
    }

    try {
      // 1. Capture and save lead directly to Supabase (table: leads or measurement_leads)
      await saveLeadToSupabase({
        full_name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        city: formData.city,
        fitting_goal: formData.interest,
        source: 'lead_magnet',
        created_at: new Date().toISOString(),
      });
    } catch (err) {
      console.error('[SARTOR] Lead capture warning:', err);
    } finally {
      setLoading(false);
      setStep(2);
    }
  };

  const handleFinalRedirect = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (typeof window !== 'undefined') {
      window.location.href = CLEAN_PORTAL_URL;
    }
  };

  const videoFittingWhatsAppUrl = SITE_CONFIG.whatsapp.getLink(
    `Hi SARTOR team, I want to schedule a guided video fitting call for my measurement profile. Name: ${formData.name || 'Client'}, City: ${formData.city || 'Overseas'}.`
  );

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-lg bg-stone-900 border border-amber-500/30 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden text-stone-100 flex flex-col my-auto max-h-[92vh]">
        {/* Subtle Gold Gradient Glow Top Border */}
        <div className="h-1.5 w-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600" />

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close measurement profile modal"
          className="absolute top-4 right-4 p-2 rounded-full bg-stone-800/80 hover:bg-stone-800 text-stone-400 hover:text-white transition-colors cursor-pointer z-10"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6 sm:p-8 overflow-y-auto">
          {step === 1 ? (
            <div>
              {/* Header Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono uppercase tracking-wider mb-3">
                <Ruler className="w-3.5 h-3.5 text-amber-400" />
                <span>Cloud Fitting Profile</span>
              </div>

              {/* Title & Subheadline */}
              <h3 id="modal-title" className="text-2xl sm:text-3xl font-serif font-bold text-stone-100 tracking-tight">
                Create Your Digital Size Profile
              </h3>
              <p className="mt-2 text-stone-300 text-xs sm:text-sm leading-relaxed">
                Where should we send your official 28-point measurement card copy and secure portal login?
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5">
                    Full Name <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 w-4 h-4 text-stone-500" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Ayesha Khan"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-950 border ${
                        errors.name ? 'border-red-500' : 'border-stone-800 focus:border-amber-500'
                      } text-stone-100 text-sm focus:outline-none transition-colors`}
                    />
                  </div>
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5">
                    Email Address <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-stone-500" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. ayesha@example.com"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-950 border ${
                        errors.email ? 'border-red-500' : 'border-stone-800 focus:border-amber-500'
                      } text-stone-100 text-sm focus:outline-none transition-colors`}
                    />
                  </div>
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* WhatsApp Phone */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5">
                    WhatsApp Phone Number <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-stone-500" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+44 7700 900077 / +1 713 555 0199"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-950 border ${
                        errors.phone ? 'border-red-500' : 'border-stone-800 focus:border-amber-500'
                      } text-stone-100 text-sm focus:outline-none transition-colors`}
                    />
                  </div>
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                </div>

                {/* Location Hub */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5">
                      Overseas Hub / City
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-stone-500" />
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="e.g. London, Dubai, Toronto"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 focus:border-amber-500 text-stone-100 text-sm focus:outline-none transition-colors placeholder:text-stone-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5">
                      Primary Fit Goal
                    </label>
                    <select
                      name="interest"
                      value={formData.interest}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 rounded-xl bg-stone-950 border border-stone-800 focus:border-amber-500 text-stone-200 text-xs focus:outline-none transition-colors cursor-pointer"
                    >
                      <option value="Bridal Lehenga & Couture">Bridal Lehenga &amp; Farshi</option>
                      <option value="Saree Blouse & Fall Drapery">Saree Blouse &amp; Fall</option>
                      <option value="16-Kali Kalidar & Anarkali">16-Kali Kalidar / Maxi</option>
                      <option value="Unstitched Designer Suit Intake">Unstitched Brand Stitching</option>
                      <option value="Full Wardrobe Size Profile">Full Wardrobe Sizing</option>
                    </select>
                  </div>
                </div>

                {/* Privacy Guarantee */}
                <div className="flex items-center gap-2 pt-1 text-[11px] text-stone-400 font-sans">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>100% Private. We never sell your measurements or share your contact.</span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-bold text-sm tracking-wide uppercase transition-all shadow-xl shadow-amber-950/50 hover:shadow-amber-900/60 active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2 mt-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Generating Size Profile...</span>
                    </>
                  ) : (
                    <>
                      <span>Generate Free Measurement Profile</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          ) : (
            /* Step 2: Confirmation & Redirect to app.sartor.pk */
            <div className="text-center py-2">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-4 shadow-lg shadow-emerald-950/40">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold block mb-1">
                Profile Initiated Successfully
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100">
                Welcome to SARTOR Cloud
              </h3>

              <p className="mt-3 text-stone-300 text-xs sm:text-sm leading-relaxed max-w-md mx-auto">
                Thank you, <strong className="text-white">{formData.name}</strong>. Your measurement profile draft has been created for your wardrobe. Access your 28 anatomical coordinates at <strong className="text-amber-300">app.sartor.pk</strong>.
              </p>

              {/* Action Buttons */}
              <div className="mt-6 space-y-3">
                <a
                  href={CLEAN_PORTAL_URL}
                  onClick={handleFinalRedirect}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-bold text-sm tracking-wide uppercase transition-all shadow-xl shadow-amber-950/50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Proceed to Sartor Portal</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <a
                  href={videoFittingWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>Book Guided Video Fitting on WhatsApp</span>
                </a>
              </div>

              {/* Auto Redirect Countdown */}
              <div className="mt-6 pt-4 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
                <span>
                  {autoRedirectActive
                    ? `Auto-redirecting in ${countdown}s...`
                    : 'Auto-redirect paused.'}
                </span>
                <button
                  onClick={() => setAutoRedirectActive((prev) => !prev)}
                  className="text-amber-400 hover:underline cursor-pointer"
                >
                  {autoRedirectActive ? 'Pause Redirect' : 'Resume'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MeasurementModal;
