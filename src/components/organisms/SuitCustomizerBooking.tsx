import React, { useState } from 'react';
import { Calendar, CheckCircle2, Clock, MapPin, MessageSquare, Scissors, Sparkles, User, UserCheck } from 'lucide-react';
import { SUIT_OPTIONS } from '../../data/sizes';
import { analytics, buildWhatsAppLink, SARTOR_PHONE_LOCAL } from '../../services/analytics';
import { BookingFormState, SuitType } from '../../types';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import { SectionHeading } from '../atoms/SectionHeading';
import { Select } from '../atoms/Select';
import { Textarea } from '../atoms/Textarea';

export const SuitCustomizerBooking: React.FC = () => {
  const [selectedSuit, setSelectedSuit] = useState<SuitType>('women-pantsuit');
  const [formData, setFormData] = useState<BookingFormState>({
    fullName: '',
    phone: '',
    suitType: 'women-pantsuit',
    fabricPreference: 'Super 150s Italian Wool (Four-Season)',
    occasion: 'Executive / Corporate Leadership',
    consultationType: 'studio',
    preferredDate: '',
    preferredTime: 'Afternoon (2:00 PM - 5:00 PM)',
    notes: '',
  });

  const activeSuitDetails = SUIT_OPTIONS.find((s) => s.id === selectedSuit) || SUIT_OPTIONS[0];

  const handleSuitSelect = (suitId: SuitType) => {
    setSelectedSuit(suitId);
    setFormData((prev) => ({ ...prev, suitType: suitId }));
    analytics.trackEvent('suit_booking_start', { suitType: suitId });
  };

  const handleInputChange = (field: keyof BookingFormState, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    analytics.trackEvent('suit_booking_complete', {
      suitType: selectedSuit,
      consultationType: formData.consultationType,
      hasNotes: Boolean(formData.notes),
    });

    const consultationText = 
      formData.consultationType === 'studio'
        ? 'In-Studio Female Atelier Fitting at Moon Tower, Model Town, Lahore'
        : formData.consultationType === 'home-lahore'
        ? 'Private Home Fitting in Lahore (Gulberg / DHA / Model Town)'
        : 'Overseas Client Online Measurement & Styling Consultation';

    const composedMessage = `*WOMEN'S BESPOKE SUIT COMMISSION - SARTOR LAHORE*
---------------------------------------
• Client Name: ${formData.fullName || 'Valued Client'}
• Contact Phone: ${formData.phone || 'Not specified'}
• Silhouetted Style: ${activeSuitDetails.name}
• Fabric Preference: ${formData.fabricPreference}
• Occasion: ${formData.occasion}
• Fitting Arrangement: ${consultationText}
• Preferred Date: ${formData.preferredDate || 'Earliest Available'}
• Preferred Time: ${formData.preferredTime}
${formData.notes ? `• Styling Notes / Measurements: ${formData.notes}\n` : ''}
---------------------------------------
Sent via sartor.pk - I would like to schedule my consultation with SARTOR Women's Atelier.`;

    const url = buildWhatsAppLink(composedMessage, 'suit_booking');
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="book-suit" className="py-16 sm:py-20 bg-stone-950 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Service Scope Banner */}
        <div className="mb-6 p-4 rounded-xl bg-amber-950/40 border border-amber-800/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-stone-200">
            <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
            <span>
              <strong className="text-amber-300">Exclusively Tailoring for Women:</strong> Pattern drafted exclusively for female posture, drape, and contours.
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-stone-400 bg-stone-900/80 px-3 py-1.5 rounded-lg border border-stone-800 shrink-0">
            <UserCheck className="w-3.5 h-3.5 text-amber-500" />
            <span>Gentlemen bespoke service coming soon</span>
          </div>
        </div>

        <SectionHeading
          badge="Women's Bespoke Commission"
          title="Commission Your Custom Tailored Suit"
          subtitle="Choose your preferred silhouette, premium fabric caliber, and private fitting arrangement. Connect directly with our Lahore atelier on WhatsApp."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Suit Selection Grid & Details */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-amber-400 flex items-center gap-2">
              <Scissors className="w-4 h-4" />
              1. Select Bespoke Silhouette
            </h3>

            {/* Suit Option Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SUIT_OPTIONS.map((suit) => {
                const isSelected = suit.id === selectedSuit;
                return (
                  <div
                    key={suit.id}
                    id={`suit-opt-${suit.id}`}
                    onClick={() => handleSuitSelect(suit.id)}
                    className={`cursor-pointer rounded-xl p-4 border transition-all duration-200 flex flex-col justify-between ${
                      isSelected
                        ? 'bg-stone-900 border-amber-500 ring-1 ring-amber-500/40 shadow-lg shadow-amber-950/20'
                        : 'bg-stone-900/60 border-stone-800 hover:border-stone-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="font-serif text-base font-semibold text-stone-100">
                          {suit.name}
                        </h4>
                        {isSelected && (
                          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                        {suit.subtitle}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs">
                      <span className="text-amber-400 font-mono font-medium">
                        {suit.basePrice}
                      </span>
                      <span className="text-[11px] text-stone-500 uppercase tracking-wider">
                        Bespoke Hand-Cut
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Active Suit Detailed Preview */}
            <div className="bg-stone-900/90 border border-stone-800 rounded-xl p-6 mt-1">
              <div className="flex flex-col sm:flex-row gap-5 items-center">
                <img
                  src={activeSuitDetails.image}
                  alt={activeSuitDetails.name}
                  className="w-full sm:w-36 h-36 rounded-lg object-cover border border-stone-800 shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs uppercase font-mono tracking-widest text-amber-400 font-semibold">
                      Selected Style
                    </span>
                    <span className="text-xs text-stone-500">|</span>
                    <span className="text-xs text-stone-300 font-medium">{activeSuitDetails.basePrice}</span>
                  </div>
                  <h4 className="font-serif text-lg font-bold text-stone-100">
                    {activeSuitDetails.name}
                  </h4>
                  <p className="mt-1 text-xs text-stone-300 leading-relaxed">
                    {activeSuitDetails.description}
                  </p>
                  
                  {/* Occasions tags */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {activeSuitDetails.occasions.map((occ) => (
                      <span
                        key={occ}
                        className="text-[10px] font-medium bg-stone-800 text-stone-300 px-2 py-0.5 rounded border border-stone-700/60"
                      >
                        {occ}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Consultation Booking Form */}
          <div className="lg:col-span-5">
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 sm:p-8 shadow-xl relative">
              
              <div className="flex items-center justify-between border-b border-stone-800 pb-4 mb-6">
                <div>
                  <h3 className="font-serif text-lg font-bold text-stone-100">
                    Schedule Fitting Consultation
                  </h3>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Personal appointment in Model Town or via WhatsApp
                  </p>
                </div>
                <div className="p-2 rounded-lg bg-emerald-950/80 border border-emerald-800/80 text-emerald-400">
                  <MessageSquare className="w-5 h-5" />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                
                {/* Full Name */}
                <Input
                  label="Your Full Name"
                  placeholder="e.g. Ayesha Malik"
                  required
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  leftIcon={<User className="w-4 h-4" />}
                />

                {/* Phone / WhatsApp */}
                <Input
                  label="Phone / WhatsApp Number"
                  placeholder="e.g. 0300 1234567"
                  required
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  helperText="Our atelier will confirm scheduling via WhatsApp"
                />

                {/* Fabric Caliber Selection */}
                <Select
                  label="Preferred Fabric Category"
                  value={formData.fabricPreference}
                  onChange={(e) => handleInputChange('fabricPreference', e.target.value)}
                  options={[
                    { value: 'Super 150s Italian Wool (Four-Season)', label: 'Super 150s Italian Wool (Four-Season)' },
                    { value: 'Pure Irish Natural Flax Linen', label: 'Pure Irish Linen (Summer & Destination)' },
                    { value: 'Cashmere & Wool Soft Blend', label: 'Cashmere & Wool Luxury Coating' },
                    { value: 'Raw Silk & Velvet Ceremonial Brocade', label: 'Raw Silk & Velvet Ceremonial Brocade' },
                    { value: 'Structured Crepe & Luxury Rayon', label: 'Structured Crepe (All-Day Draping)' },
                    { value: 'Client Providing Fabric for Bespoke Stitching', label: 'I Will Provide My Own Fabric (Bespoke Stitching)' },
                  ]}
                />

                {/* Consultation Type */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-stone-300 tracking-wide uppercase">
                    Fitting Arrangement
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => handleInputChange('consultationType', 'studio')}
                      className={`text-xs p-2.5 rounded-lg border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                        formData.consultationType === 'studio'
                          ? 'bg-amber-950/60 border-amber-500 text-stone-100'
                          : 'bg-stone-900 border-stone-800 text-stone-400 hover:border-stone-700'
                      }`}
                    >
                      <span className="font-semibold text-stone-200">Moon Tower Studio</span>
                      <span className="text-[10px] text-stone-400">Model Town, Lahore</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleInputChange('consultationType', 'home-lahore')}
                      className={`text-xs p-2.5 rounded-lg border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                        formData.consultationType === 'home-lahore'
                          ? 'bg-amber-950/60 border-amber-500 text-stone-100'
                          : 'bg-stone-900 border-stone-800 text-stone-400 hover:border-stone-700'
                      }`}
                    >
                      <span className="font-semibold text-stone-200">Home Visit</span>
                      <span className="text-[10px] text-stone-400">Lahore residence</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleInputChange('consultationType', 'overseas-virtual')}
                      className={`text-xs p-2.5 rounded-lg border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                        formData.consultationType === 'overseas-virtual'
                          ? 'bg-amber-950/60 border-amber-500 text-stone-100'
                          : 'bg-stone-900 border-stone-800 text-stone-400 hover:border-stone-700'
                      }`}
                    >
                      <span className="font-semibold text-stone-200">Virtual / Overseas</span>
                      <span className="text-[10px] text-stone-400">Worldwide shipping</span>
                    </button>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    label="Preferred Date"
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                  />

                  <Select
                    label="Preferred Time"
                    value={formData.preferredTime}
                    onChange={(e) => handleInputChange('preferredTime', e.target.value)}
                    options={[
                      { value: 'Morning (11:00 AM - 1:00 PM)', label: '11:00 AM - 1:00 PM' },
                      { value: 'Afternoon (2:00 PM - 5:00 PM)', label: '2:00 PM - 5:00 PM' },
                      { value: 'Evening (5:00 PM - 8:00 PM)', label: '5:00 PM - 8:00 PM' },
                    ]}
                  />
                </div>

                {/* Notes */}
                <Textarea
                  label="Fit Preferences or Design Details (Optional)"
                  placeholder="e.g. Prefer relaxed wide-leg trousers, cinched waist jacket, high neckline, or event date..."
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                />

                {/* Direct CTA that lands on WhatsApp */}
                <div className="mt-2 flex flex-col gap-2">
                  <Button
                    id="submit-booking-whatsapp-cta"
                    type="submit"
                    variant="whatsapp"
                    size="lg"
                    fullWidth
                    leftIcon={<MessageSquare className="w-5 h-5 fill-current" />}
                  >
                    Schedule Consultation on WhatsApp
                  </Button>
                  <div className="text-[11px] text-stone-400 text-center flex items-center justify-center gap-1">
                    <span>Direct connection to <strong>{SARTOR_PHONE_LOCAL}</strong> · Instant confirmation</span>
                  </div>
                </div>

              </form>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
