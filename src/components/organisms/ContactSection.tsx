import React, { useState } from 'react';
import { CheckCircle2, ExternalLink, Mail, MapPin, MessageSquare, Phone, Send, Sparkles } from 'lucide-react';
import { analytics, buildWhatsAppLink, SARTOR_GOOGLE_MAPS_LINK, SARTOR_PHONE_DISPLAY, SARTOR_PHONE_LOCAL } from '../../services/analytics';
import { ContactFormState } from '../../types';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import { SectionHeading } from '../atoms/SectionHeading';
import { Select } from '../atoms/Select';
import { Textarea } from '../atoms/Textarea';

export const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState<ContactFormState>({
    fullName: '',
    phone: '',
    email: '',
    subject: "Women's Bespoke Suit Consultation",
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof ContactFormState, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    analytics.trackEvent('contact_form_submit', {
      subject: formState.subject,
      hasEmail: Boolean(formState.email),
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleSendViaWhatsAppDirectly = () => {
    const msg = `*WOMEN'S BESPOKE INQUIRY - SARTOR LAHORE*
---------------------------------------
• Name: ${formState.fullName || 'Guest'}
• Phone: ${formState.phone || 'Not provided'}
• Email: ${formState.email || 'None'}
• Subject: ${formState.subject}
• Inquiry Message: ${formState.message || "I have an inquiry regarding women's custom tailoring at SARTOR."}
---------------------------------------
Submitted via sartor.pk website contact form.`;

    const url = buildWhatsAppLink(msg, 'contact');
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="py-20 bg-stone-900/60 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Notice of Focus */}
        <div className="mb-6 p-4 rounded-xl bg-stone-900/90 border border-stone-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-stone-200">
            <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
            <span>
              <strong>Women's Tailoring Department:</strong> Dedicated master cutters for women's bespoke suiting & couture styling.
            </span>
          </div>
          <a
            href={SARTOR_GOOGLE_MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-medium"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Open Moon Tower in Google Maps</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <SectionHeading
          badge="Direct Inquiries"
          title="Contact SARTOR Bespoke Atelier"
          subtitle="Have questions regarding fabrics, tailoring lead times, or scheduling a private fitting session? Send us a message or connect directly on WhatsApp."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Atelier Information */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 sm:p-8 shadow-xl">
              <h3 className="font-serif text-xl font-bold text-stone-100 mb-6">
                Personalized Consultations
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-emerald-950/80 border border-emerald-800/80 text-emerald-400 shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-400">
                      Direct WhatsApp Line
                    </h4>
                    <a
                      href={buildWhatsAppLink('Assalam-o-Alaikum SARTOR, I am contacting you for an inquiry.', 'contact')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-base font-bold text-stone-100 hover:text-emerald-400 transition-colors block mt-0.5"
                    >
                      {SARTOR_PHONE_LOCAL} ({SARTOR_PHONE_DISPLAY})
                    </a>
                    <span className="text-[11px] text-stone-400 block mt-0.5">
                      Average reply time: within 15 minutes during studio hours
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-stone-800 border border-stone-700 text-stone-300 shrink-0">
                    <MapPin className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-400">
                      Lahore Atelier Location
                    </h4>
                    <a
                      href={SARTOR_GOOGLE_MAPS_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-sm text-stone-200 hover:text-amber-400 flex items-center gap-1.5 mt-0.5 group"
                    >
                      <span>Moon Tower, International Market, Model Town, Lahore</span>
                      <ExternalLink className="w-3.5 h-3.5 text-stone-400 group-hover:text-amber-400" />
                    </a>
                    <span className="text-[11px] text-stone-400 block mt-0.5">
                      Visit by prior appointment for dedicated master fitting
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-amber-950/80 border border-amber-800/80 text-amber-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-400">
                      Official Inquiries
                    </h4>
                    <a
                      href="mailto:contact@sartor.pk"
                      className="font-mono text-sm font-semibold text-stone-100 hover:text-amber-400 transition-colors block mt-0.5"
                    >
                      contact@sartor.pk
                    </a>
                    <span className="text-[11px] text-stone-400 block mt-0.5">
                      Domain: sartor.pk · Registered Tailoring House
                    </span>
                  </div>
                </div>

              </div>

              {/* Instant WhatsApp Shortcut */}
              <div className="mt-8 pt-6 border-t border-stone-800">
                <Button
                  id="contact-whatsapp-fast-cta"
                  variant="whatsapp"
                  size="md"
                  fullWidth
                  leftIcon={<MessageSquare className="w-4 h-4 fill-current" />}
                  onClick={handleSendViaWhatsAppDirectly}
                >
                  Message on WhatsApp Directly
                </Button>
              </div>

            </div>
          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 sm:p-8 shadow-xl">
              
              {submitted ? (
                <div className="py-12 px-4 text-center flex flex-col items-center animate-in zoom-in-95 duration-200">
                  <div className="w-14 h-14 rounded-full bg-emerald-950/80 border border-emerald-700/80 flex items-center justify-center text-emerald-400 mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-stone-100">
                    Inquiry Received Successfully
                  </h3>
                  <p className="mt-2 text-sm text-stone-300 max-w-md leading-relaxed">
                    Thank you, <strong className="text-stone-100">{formState.fullName || 'Valued Client'}</strong>. Our master tailoring team in Model Town has received your request and will contact you promptly.
                  </p>
                  
                  <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
                    <Button
                      variant="whatsapp"
                      size="md"
                      onClick={handleSendViaWhatsAppDirectly}
                      leftIcon={<MessageSquare className="w-4 h-4 fill-current" />}
                    >
                      Connect on WhatsApp Now
                    </Button>
                    <Button
                      variant="outline"
                      size="md"
                      onClick={() => {
                        setSubmitted(false);
                        setFormState({
                          fullName: '',
                          phone: '',
                          email: '',
                          subject: "Women's Bespoke Suit Consultation",
                          message: '',
                        });
                      }}
                    >
                      Send Another Inquiry
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="border-b border-stone-800 pb-3 mb-2">
                    <h3 className="font-serif text-lg font-bold text-stone-100">
                      Submit Tailoring Inquiry
                    </h3>
                    <p className="text-xs text-stone-400 mt-0.5">
                      Fill out the form below or dispatch your inquiry directly to our WhatsApp concierge
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Full Name"
                      placeholder="e.g. Fatima Shah"
                      required
                      value={formState.fullName}
                      onChange={(e) => handleChange('fullName', e.target.value)}
                    />
                    <Input
                      label="Phone / WhatsApp"
                      placeholder="e.g. 0335 2209991"
                      required
                      value={formState.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Email Address (Optional)"
                      type="email"
                      placeholder="e.g. client@example.com"
                      value={formState.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                    />
                    <Select
                      label="Subject / Topic"
                      value={formState.subject}
                      onChange={(e) => handleChange('subject', e.target.value)}
                      options={[
                        { value: "Women's Bespoke Suit Consultation", label: "Women's Bespoke Suit Consultation" },
                        { value: 'Executive Trouser Suit & Blazer Order', label: 'Executive Trouser Suit & Blazer Order' },
                        { value: 'Wedding & Ceremonial Ensemble', label: 'Wedding & Ceremonial Ensemble' },
                        { value: 'Private Home Fitting Request (Lahore)', label: 'Private Home Fitting Request (Lahore)' },
                        { value: 'Overseas International Order & Delivery', label: 'Overseas International Order & Delivery' },
                        { value: 'Gentlemen Bespoke Waitlist (Coming Soon)', label: 'Gentlemen Bespoke Waitlist (Coming Soon)' },
                      ]}
                    />
                  </div>

                  <Textarea
                    label="Your Message / Styling Request"
                    placeholder="Tell us about the desired silhouette, event date, fabric preferences, or questions you have..."
                    rows={4}
                    required
                    value={formState.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                  />

                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <Button
                      id="submit-contact-form-btn"
                      type="submit"
                      variant="primary"
                      size="md"
                      disabled={isSubmitting}
                      leftIcon={<Send className="w-4 h-4" />}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                    </Button>
                    <Button
                      type="button"
                      variant="whatsapp"
                      size="md"
                      onClick={handleSendViaWhatsAppDirectly}
                      leftIcon={<MessageSquare className="w-4 h-4 fill-current" />}
                    >
                      Instant WhatsApp Dispatch
                    </Button>
                  </div>

                  <span className="text-[11px] text-stone-500 text-center mt-1">
                    Protected by SARTOR privacy policy. Never shared with third parties.
                  </span>

                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
