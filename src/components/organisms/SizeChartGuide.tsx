import React, { useState } from 'react';
import { ArrowUpDown, Check, Copy, HelpCircle, MessageSquare, Ruler, Send } from 'lucide-react';
import { MEASURING_STEPS, STANDARD_SIZES } from '../../data/sizes';
import { analytics, buildWhatsAppLink, SARTOR_PHONE_LOCAL } from '../../services/analytics';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import { SectionHeading } from '../atoms/SectionHeading';
import { MeasurementStepCard } from '../molecules/MeasurementStepCard';

export const SizeChartGuide: React.FC = () => {
  const [unit, setUnit] = useState<'in' | 'cm'>('in');
  const [activeTab, setActiveTab] = useState<'standard' | 'guide' | 'calculator'>('standard');
  const [copied, setCopied] = useState(false);

  // Custom client measurements state
  const [customMeasures, setCustomMeasures] = useState({
    name: '',
    phone: '',
    chest: '',
    shoulder: '',
    sleeve: '',
    jacketLength: '',
    waist: '',
    hip: '',
    trouserLength: '',
    neck: '',
    notes: '',
  });

  const convertVal = (inches: number): string => {
    if (unit === 'in') return `${inches}"`;
    return `${Math.round(inches * 2.54)} cm`;
  };

  const handleCustomMeasureChange = (field: string, val: string) => {
    setCustomMeasures((prev) => ({ ...prev, [field]: val }));
  };

  const handleSendMeasurementsToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    analytics.trackEvent('measurement_calculator_use', {
      unit,
      hasChest: Boolean(customMeasures.chest),
    });

    const msg = `*CUSTOM MEASUREMENT PROFILE - SARTOR LAHORE*
---------------------------------------
• Client Name: ${customMeasures.name || 'Client'}
• Phone/WhatsApp: ${customMeasures.phone || 'Not provided'}
• Unit: ${unit === 'in' ? 'Inches (")' : 'Centimeters (cm)'}
• Chest: ${customMeasures.chest || 'To be measured'}
• Shoulder Width: ${customMeasures.shoulder || 'To be measured'}
• Sleeve Length: ${customMeasures.sleeve || 'To be measured'}
• Jacket Length: ${customMeasures.jacketLength || 'To be measured'}
• Trouser Waist: ${customMeasures.waist || 'To be measured'}
• Trouser Hip: ${customMeasures.hip || 'To be measured'}
• Trouser Inseam/Length: ${customMeasures.trouserLength || 'To be measured'}
• Neck Circumference: ${customMeasures.neck || 'To be measured'}
${customMeasures.notes ? `• Posture/Notes: ${customMeasures.notes}\n` : ''}
---------------------------------------
Please review my measurements for a bespoke tailored suit. Sent from sartor.pk`;

    const url = buildWhatsAppLink(msg, 'size_chart');
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleTabChange = (tab: 'standard' | 'guide' | 'calculator') => {
    setActiveTab(tab);
    analytics.trackEvent('size_chart_view', { tab });
  };

  return (
    <section id="size-chart" className="py-20 bg-stone-950 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <SectionHeading
          badge="Women's Sizing & Silhouette Standards"
          title="Bespoke Sizing Chart & Measuring Guide"
          subtitle="Whether ordering from Model Town, DHA, or abroad (UK, USA, UAE), our female bespoke tailoring framework ensures clean contouring, perfect bust-to-waist drape, and supreme comfort."
        />

        {/* Tab Controls & Unit Switcher */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          
          {/* Main 3 Navigation Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-900 border border-stone-800 rounded-xl w-full sm:w-auto">
            <button
              onClick={() => handleTabChange('standard')}
              className={`px-4 py-2 rounded-lg text-xs font-medium tracking-wide transition-all cursor-pointer ${
                activeTab === 'standard'
                  ? 'bg-stone-800 text-stone-100 shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Women's Size Table (XS–3XL)
            </button>
            <button
              onClick={() => handleTabChange('guide')}
              className={`px-4 py-2 rounded-lg text-xs font-medium tracking-wide transition-all cursor-pointer ${
                activeTab === 'guide'
                  ? 'bg-stone-800 text-stone-100 shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              How to Measure Yourself
            </button>
            <button
              onClick={() => handleTabChange('calculator')}
              className={`px-4 py-2 rounded-lg text-xs font-medium tracking-wide transition-all cursor-pointer ${
                activeTab === 'calculator'
                  ? 'bg-amber-600 text-stone-950 font-semibold shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Custom Measurement Profile
            </button>
          </div>

          {/* Unit Toggle: Inches vs Centimeters */}
          <div className="flex items-center gap-2 bg-stone-900 border border-stone-800 p-1 rounded-lg">
            <span className="text-[11px] uppercase tracking-wider text-stone-400 pl-2">Unit:</span>
            <button
              onClick={() => setUnit('in')}
              className={`px-3 py-1 rounded text-xs font-mono font-medium transition-all ${
                unit === 'in'
                  ? 'bg-amber-600 text-stone-950 font-bold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Inches (")
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 rounded text-xs font-mono font-medium transition-all ${
                unit === 'cm'
                  ? 'bg-amber-600 text-stone-950 font-bold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Centimeters (cm)
            </button>
          </div>

        </div>

        {/* Tab 1: Standard Sizing Matrix */}
        {activeTab === 'standard' && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-200">
            <div className="overflow-x-auto rounded-xl border border-stone-800 bg-stone-900/80 shadow-xl">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-stone-950 text-amber-400 border-b border-stone-800 font-mono text-[11px] uppercase tracking-wider">
                  <tr>
                    <th className="py-4 px-4 font-semibold">Size Label</th>
                    <th className="py-4 px-3 font-semibold">UK / US</th>
                    <th className="py-4 px-3 font-semibold">EU</th>
                    <th className="py-4 px-3 font-semibold">Bust</th>
                    <th className="py-4 px-3 font-semibold">Shoulder</th>
                    <th className="py-4 px-3 font-semibold">Sleeve</th>
                    <th className="py-4 px-3 font-semibold">Jacket Length</th>
                    <th className="py-4 px-3 font-semibold">Waist</th>
                    <th className="py-4 px-3 font-semibold">Hip</th>
                    <th className="py-4 px-4 font-semibold">Trouser Length</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800/60 font-mono text-stone-200">
                  {STANDARD_SIZES.map((row) => (
                    <tr key={row.sizeLabel} className="hover:bg-stone-850/60 transition-colors">
                      <td className="py-3.5 px-4 font-serif font-bold text-amber-300">
                        {row.sizeLabel}
                      </td>
                      <td className="py-3.5 px-3 text-stone-400">{row.ukUsSize}</td>
                      <td className="py-3.5 px-3 text-stone-400">{row.euSize}</td>
                      <td className="py-3.5 px-3 font-medium text-stone-100">{convertVal(row.jacketChest)}</td>
                      <td className="py-3.5 px-3">{convertVal(row.jacketShoulder)}</td>
                      <td className="py-3.5 px-3">{convertVal(row.jacketSleeve)}</td>
                      <td className="py-3.5 px-3">{convertVal(row.jacketLength)}</td>
                      <td className="py-3.5 px-3 font-medium text-amber-200">{convertVal(row.trouserWaist)}</td>
                      <td className="py-3.5 px-3">{convertVal(row.trouserHip)}</td>
                      <td className="py-3.5 px-4">{convertVal(row.trouserInseam)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
              <span>
                💡 <strong>True Bespoke Note:</strong> Standard sizes serve as general reference. Every SARTOR suit is drafted individually on brown paper pattern after your physical or digital consultation.
              </span>
              <button
                onClick={() => handleTabChange('calculator')}
                className="text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-4 whitespace-nowrap cursor-pointer"
              >
                Send Custom Measurements →
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Visual Step-by-Step Measuring Guide */}
        {activeTab === 'guide' && (
          <div className="flex flex-col gap-8 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MEASURING_STEPS.map((step, idx) => (
                <MeasurementStepCard key={step.id} step={step} index={idx} />
              ))}
            </div>

            <div className="p-6 rounded-2xl bg-amber-950/30 border border-amber-800/40 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-serif text-base font-semibold text-stone-100">
                  Prefer a Master Tailor to Measure You in Lahore?
                </h4>
                <p className="text-xs text-stone-400 mt-1">
                  Visit our Moon Tower, International Market studio in Model Town, or request our Master Cutter to visit your residence in Gulberg, DHA, or Model Town.
                </p>
              </div>
              <a href="#book-suit">
                <Button variant="gold" size="md">
                  Book Fitting Appointment
                </Button>
              </a>
            </div>
          </div>
        )}

        {/* Tab 3: Custom Measurement Profile Calculator */}
        {activeTab === 'calculator' && (
          <div className="max-w-3xl mx-auto bg-stone-900 border border-stone-800 rounded-2xl p-6 sm:p-8 shadow-2xl animate-in fade-in duration-200">
            
            <div className="border-b border-stone-800 pb-4 mb-6">
              <span className="text-xs uppercase font-mono tracking-widest text-amber-400 font-semibold">
                Client Measurement Form
              </span>
              <h3 className="font-serif text-xl font-bold text-stone-100 mt-1">
                Save & Dispatch Your Measurements to Master Tailor
              </h3>
              <p className="text-xs text-stone-400 mt-1">
                Enter your exact dimensions below. Clicking submit formats your measurement sheet and opens WhatsApp directly to <strong>{SARTOR_PHONE_LOCAL}</strong>.
              </p>
            </div>

            <form onSubmit={handleSendMeasurementsToWhatsApp} className="flex flex-col gap-5">
              
              {/* Client Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Client Name"
                  placeholder="e.g. Daniyal Qureshi"
                  required
                  value={customMeasures.name}
                  onChange={(e) => handleCustomMeasureChange('name', e.target.value)}
                />
                <Input
                  label="Contact Phone / WhatsApp"
                  placeholder="e.g. 0335 2209991"
                  required
                  value={customMeasures.phone}
                  onChange={(e) => handleCustomMeasureChange('phone', e.target.value)}
                />
              </div>

              {/* Upper Body Matrix */}
              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-amber-500 mb-2">
                  Jacket / Upper Body ({unit === 'in' ? 'Inches' : 'CM'})
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <Input
                    label="Bust Circumference"
                    placeholder={unit === 'in' ? 'e.g. 36"' : 'e.g. 91 cm'}
                    value={customMeasures.chest}
                    onChange={(e) => handleCustomMeasureChange('chest', e.target.value)}
                  />
                  <Input
                    label="Shoulder Width"
                    placeholder={unit === 'in' ? 'e.g. 15.5"' : 'e.g. 39 cm'}
                    value={customMeasures.shoulder}
                    onChange={(e) => handleCustomMeasureChange('shoulder', e.target.value)}
                  />
                  <Input
                    label="Sleeve Length"
                    placeholder={unit === 'in' ? 'e.g. 23.5"' : 'e.g. 60 cm'}
                    value={customMeasures.sleeve}
                    onChange={(e) => handleCustomMeasureChange('sleeve', e.target.value)}
                  />
                  <Input
                    label="Jacket Length"
                    placeholder={unit === 'in' ? 'e.g. 27"' : 'e.g. 68 cm'}
                    value={customMeasures.jacketLength}
                    onChange={(e) => handleCustomMeasureChange('jacketLength', e.target.value)}
                  />
                </div>
              </div>

              {/* Lower Body Matrix */}
              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-amber-500 mb-2">
                  Trouser / Lower Body ({unit === 'in' ? 'Inches' : 'CM'})
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <Input
                    label="Natural Waist"
                    placeholder={unit === 'in' ? 'e.g. 28"' : 'e.g. 71 cm'}
                    value={customMeasures.waist}
                    onChange={(e) => handleCustomMeasureChange('waist', e.target.value)}
                  />
                  <Input
                    label="Hip Circumference"
                    placeholder={unit === 'in' ? 'e.g. 38"' : 'e.g. 97 cm'}
                    value={customMeasures.hip}
                    onChange={(e) => handleCustomMeasureChange('hip', e.target.value)}
                  />
                  <Input
                    label="Trouser Length / Outseam"
                    placeholder={unit === 'in' ? 'e.g. 39"' : 'e.g. 99 cm'}
                    value={customMeasures.trouserLength}
                    onChange={(e) => handleCustomMeasureChange('trouserLength', e.target.value)}
                  />
                  <Input
                    label="Thigh Circumference"
                    placeholder={unit === 'in' ? 'e.g. 22"' : 'e.g. 56 cm'}
                    value={customMeasures.neck}
                    onChange={(e) => handleCustomMeasureChange('neck', e.target.value)}
                  />
                </div>
              </div>

              {/* Posture & Notes */}
              <Input
                label="Fit & Silhouette Preference (e.g. Wide leg, fitted cigarette cut, high waist, double breasted)"
                placeholder="Mention desired fit, event date, or any specific styling nuances..."
                value={customMeasures.notes}
                onChange={(e) => handleCustomMeasureChange('notes', e.target.value)}
              />

              {/* Submit to WhatsApp */}
              <div className="pt-2">
                <Button
                  id="send-measurements-whatsapp-btn"
                  type="submit"
                  variant="whatsapp"
                  size="lg"
                  fullWidth
                  leftIcon={<Send className="w-5 h-5 fill-current" />}
                >
                  Send Measurements to Master Tailor on WhatsApp
                </Button>
                <p className="text-[11px] text-stone-500 text-center mt-2">
                  Our Master Cutler will review your dimensions and advise on pattern balance within 1 hour.
                </p>
              </div>

            </form>

          </div>
        )}

      </div>
    </section>
  );
};
