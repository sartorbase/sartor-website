import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpDown, Check, Copy, MessageSquare, Ruler, Sparkles } from 'lucide-react';
import { PAKISTANI_MEASURING_STEPS, PAKISTANI_SIZES } from '../../data/sizes';
import { analytics, buildWhatsAppLink, SARTOR_PHONE_LOCAL } from '../../services/analytics';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import { SectionHeading } from '../atoms/SectionHeading';
import { MeasurementStepCard } from '../molecules/MeasurementStepCard';
import { PakistaniSizeLabel } from '../../types';

const easeCurve = [0.22, 1, 0.36, 1] as const;

export const SizeChartGuide: React.FC = () => {
  const [unit, setUnit] = useState<'in' | 'cm'>('in');
  const [activeTab, setActiveTab] = useState<'standard' | 'guide' | 'calculator'>('standard');
  const [copied, setCopied] = useState(false);

  // Custom client measurements state
  const [customMeasures, setCustomMeasures] = useState({
    name: '',
    phone: '',
    selectedBrandSize: 'M' as PakistaniSizeLabel,
    suitType: 'Simple Suit (PKR 2,500)',
    shirtLength: '41',
    chest: '41',
    waist: '38',
    hip: '45',
    shoulder: '15',
    sleeve: '22.5',
    trouserLength: '38.5',
    trouserBottom: '7.5',
    embroidery: 'None / Plain Stitching',
    fabricSourcing: false,
    pickAndDrop: true,
    notes: '',
  });

  const convertVal = (inches: number): string => {
    if (unit === 'in') return `${inches}"`;
    return `${Math.round(inches * 2.54)} cm`;
  };

  const handleCustomMeasureChange = (field: string, val: string | boolean) => {
    setCustomMeasures((prev) => ({ ...prev, [field]: val }));
  };

  const handleApplyPresetSize = (size: PakistaniSizeLabel) => {
    const preset = PAKISTANI_SIZES.find((s) => s.sizeLabel === size);
    if (!preset) return;
    setCustomMeasures((prev) => ({
      ...prev,
      selectedBrandSize: size,
      shirtLength: String(preset.shirtLength),
      chest: String(preset.chest),
      waist: String(preset.waist),
      hip: String(preset.hip),
      shoulder: String(preset.shoulder),
      sleeve: String(preset.sleeveLength),
      trouserLength: String(preset.trouserLength),
      trouserBottom: String(preset.trouserBottom),
    }));
  };

  const handleSendMeasurementsToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    analytics.trackEvent('measurement_calculator_use', {
      unit,
      hasChest: Boolean(customMeasures.chest),
    });

    const msg = `*PAKISTANI SIZE & STITCHING COMMISSION - SARTOR LAHORE*
---------------------------------------
• Client Name: ${customMeasures.name || 'Client'}
• Phone/WhatsApp: ${customMeasures.phone || 'Not provided'}
• Suit Category: ${customMeasures.suitType}
• Brand Sizing Reference: Size ${customMeasures.selectedBrandSize} (Sapphire/Khaadi/Maria.B Standard)
• Preferred Unit: ${unit === 'in' ? 'Inches (")' : 'Centimeters (cm)'}

*SPECIFIC TAILORING MEASUREMENTS:*
• Shirt Length (قمیض لمبائی): ${customMeasures.shirtLength || 'Standard'}"
• Chest / Bust (چھاتی): ${customMeasures.chest || 'Standard'}"
• Waist (کمر): ${customMeasures.waist || 'Standard'}"
• Hip / Daman (کولہے / دامن): ${customMeasures.hip || 'Standard'}"
• Shoulder / Teera (تیرا): ${customMeasures.shoulder || 'Standard'}"
• Sleeve Length (بازو): ${customMeasures.sleeve || 'Standard'}"
• Trouser Length (ٹراؤزر لمبائی): ${customMeasures.trouserLength || 'Standard'}"
• Trouser Pauncha (پانچہ): ${customMeasures.trouserBottom || 'Standard'}"

*ADDITIONAL BESPOKE ADD-ONS:*
• Embroidery: ${customMeasures.embroidery}
• Fabric/Material Sourcing Requested: ${customMeasures.fabricSourcing ? 'YES, Please source material' : 'NO, I have fabric'}
• Lahore Pick & Drop Required: ${customMeasures.pickAndDrop ? 'YES, Pick up in Lahore' : 'NO, I will visit studio'}
${customMeasures.notes ? `• Specific Styling Instructions: ${customMeasures.notes}\n` : ''}
---------------------------------------
Sent via SARTOR Bespoke Women's Atelier.`;

    const url = buildWhatsAppLink(msg, 'size_chart');
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleTabChange = (tab: 'standard' | 'guide' | 'calculator') => {
    setActiveTab(tab);
    analytics.trackEvent('size_chart_view', { tab });
  };

  const copySizeTableText = () => {
    const text = PAKISTANI_SIZES.map(
      (s) =>
        `${s.sizeLabel} (${s.ukUsEquivalent}): Shirt ${s.shirtLength}", Chest ${s.chest}", Waist ${s.waist}", Hip ${s.hip}", Shoulder ${s.shoulder}", Sleeve ${s.sleeveLength}", Trouser ${s.trouserLength}", Pauncha ${s.trouserBottom}"`
    ).join('\n');
    navigator.clipboard.writeText(`SARTOR LAHORE - PAKISTANI BRAND SIZE CHART (INCHES):\n${text}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="size-chart" className="py-16 md:py-20 bg-stone-950 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: easeCurve }}
        >
          <SectionHeading
            badge="Pakistani Brand Sizing Standards"
            title="Pakistani Women's Size Chart & Measuring Guide"
            subtitle="Calibrated strictly to the ready-to-wear sizing charts used by major Pakistani fashion houses (Sapphire, Khaadi, Sana Safinaz, Maria.B, Nishat Linen). Choose your standard size or provide exact custom measurements."
          />
        </motion.div>

        {/* Brand Comparison & Assurance Banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, delay: 0.08, ease: easeCurve }}
          className="mb-8 p-4 rounded-xl bg-stone-900/90 border border-stone-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-stone-200">
                Major Pakistani Brand Standards (XS – XL)
              </h4>
              <p className="text-xs text-stone-400 mt-0.5">
                Exact measurements for Ready-to-Wear Kurti, Two-Piece & Three-Piece Stitched Suites.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-stretch md:self-auto justify-end">
            <button
              onClick={copySizeTableText}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Chart' : 'Copy Size Specs'}</span>
            </button>
          </div>
        </motion.div>

        {/* Tab Controls & Unit Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.12, ease: easeCurve }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8"
        >
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
              Brand Size Table (XS – XL)
            </button>
            <button
              onClick={() => handleTabChange('guide')}
              className={`px-4 py-2 rounded-lg text-xs font-medium tracking-wide transition-all cursor-pointer ${
                activeTab === 'guide'
                  ? 'bg-stone-800 text-stone-100 shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              How to Measure (طریقہ کار)
            </button>
            <button
              onClick={() => handleTabChange('calculator')}
              className={`px-4 py-2 rounded-lg text-xs font-medium tracking-wide transition-all cursor-pointer ${
                activeTab === 'calculator'
                  ? 'bg-amber-500 text-neutral-950 font-bold shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Send Measurements to WhatsApp
            </button>
          </div>

          {/* Unit Switcher */}
          <div className="flex items-center gap-2 bg-stone-900 border border-stone-800 px-3 py-1.5 rounded-xl">
            <span className="text-xs text-stone-400 font-medium flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5 text-amber-400" />
              Units:
            </span>
            <div className="flex items-center bg-stone-950 rounded-lg p-0.5 border border-stone-800">
              <button
                onClick={() => setUnit('in')}
                className={`px-2.5 py-1 text-xs rounded font-mono font-semibold transition-all cursor-pointer ${
                  unit === 'in' ? 'bg-amber-500 text-neutral-950' : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Inches (")
              </button>
              <button
                onClick={() => setUnit('cm')}
                className={`px-2.5 py-1 text-xs rounded font-mono font-semibold transition-all cursor-pointer ${
                  unit === 'cm' ? 'bg-amber-500 text-neutral-950' : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Centimeters (cm)
              </button>
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* Tab 1: Standard Brand Size Table */}
          {activeTab === 'standard' && (
            <motion.div
              key="tab-standard"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: easeCurve }}
              className="rounded-2xl border border-stone-800 bg-stone-900/60 overflow-hidden shadow-2xl backdrop-blur-sm"
            >
            <div className="p-4 bg-stone-900 border-b border-stone-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-semibold text-stone-200">
                  Pakistani Ready-to-Wear Standard Sizing (Khaadi, Sapphire, Sana Safinaz, Maria.B Standard)
                </span>
                <span className="text-[11px] text-stone-400 block mt-0.5">
                  Values displayed in {unit === 'in' ? 'Inches (")' : 'Centimeters (cm)'}. For looser / A-line fit, add 1-2 inches ease.
                </span>
              </div>
              <span className="text-xs font-mono text-amber-400 bg-amber-950/60 border border-amber-800/80 px-2.5 py-1 rounded-full">
                Major Brand Standard
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-stone-300">
                <thead className="bg-stone-950/80 uppercase tracking-wider text-[11px] font-semibold text-stone-400 border-b border-stone-800">
                  <tr>
                    <th className="py-3.5 px-4 font-bold text-amber-400">Size Label</th>
                    <th className="py-3.5 px-4">Brand Eq.</th>
                    <th className="py-3.5 px-4">Shirt Length</th>
                    <th className="py-3.5 px-4">Chest / Bust</th>
                    <th className="py-3.5 px-4">Waist</th>
                    <th className="py-3.5 px-4">Hips / Daman</th>
                    <th className="py-3.5 px-4">Shoulder (تیرا)</th>
                    <th className="py-3.5 px-4">Sleeves (بازو)</th>
                    <th className="py-3.5 px-4">Armhole (مونڈھا)</th>
                    <th className="py-3.5 px-4">Trouser Length</th>
                    <th className="py-3.5 px-4">Trouser Hip/Thigh</th>
                    <th className="py-3.5 px-4">Pauncha (پانچہ)</th>
                    <th className="py-3.5 px-4 text-right">Quick Order</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800/60 font-mono">
                  {PAKISTANI_SIZES.map((row) => (
                    <tr key={row.sizeLabel} className="hover:bg-stone-800/50 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-stone-100 font-sans text-sm flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold text-xs">
                          {row.sizeLabel}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-stone-400 font-sans">{row.ukUsEquivalent}</td>
                      <td className="py-3.5 px-4 text-stone-200">{convertVal(row.shirtLength)}</td>
                      <td className="py-3.5 px-4 text-amber-300 font-semibold">{convertVal(row.chest)}</td>
                      <td className="py-3.5 px-4 text-stone-300">{convertVal(row.waist)}</td>
                      <td className="py-3.5 px-4 text-stone-300">{convertVal(row.hip)}</td>
                      <td className="py-3.5 px-4 text-stone-300">{convertVal(row.shoulder)}</td>
                      <td className="py-3.5 px-4 text-stone-300">{convertVal(row.sleeveLength)}</td>
                      <td className="py-3.5 px-4 text-stone-400">{convertVal(row.armhole)}</td>
                      <td className="py-3.5 px-4 text-stone-300">{convertVal(row.trouserLength)}</td>
                      <td className="py-3.5 px-4 text-stone-400">{convertVal(row.trouserHip)}</td>
                      <td className="py-3.5 px-4 text-stone-400">{convertVal(row.trouserBottom)}</td>
                      <td className="py-3.5 px-4 text-right font-sans">
                        <button
                          onClick={() => {
                            handleApplyPresetSize(row.sizeLabel);
                            setActiveTab('calculator');
                          }}
                          className="px-2.5 py-1 text-[11px] rounded bg-stone-800 hover:bg-amber-500 hover:text-neutral-950 text-stone-200 font-medium transition-colors cursor-pointer"
                        >
                          Select Size
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Explanatory footnotes */}
            <div className="p-4 bg-stone-950/60 border-t border-stone-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-stone-400 font-sans">
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                <span>
                  <strong>Chest / Bust:</strong> Standard measurement taken 1 inch below the armhole across the fullest part of bust.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                <span>
                  <strong>Hips / Daman:</strong> Standard hip measure at 21" down from shoulder to accommodate side-slits (chalk).
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                <span>
                  <strong>Custom Lengths:</strong> We gladly adjust shirt or trouser length by ±3 inches without extra charge.
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 2: How to Measure (Measuring Guide) */}
        {activeTab === 'guide' && (
          <motion.div
            key="tab-guide"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: easeCurve }}
          >
            <div className="mb-6 p-4 rounded-xl bg-amber-950/30 border border-amber-800/40 text-xs text-amber-200">
              💡 <strong>Master Tailor Advice:</strong> For the most precise fit, hold the measuring tape comfortably without pulling too tightly. Alternatively, measure your best-fitting stitched Pakistani suit laid flat on a table.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {PAKISTANI_MEASURING_STEPS.map((step, idx) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: idx * 0.05, ease: easeCurve }}
                  className="p-5 rounded-xl bg-stone-900/80 border border-stone-800 hover:border-amber-700/60 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="w-6 h-6 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold text-xs">
                        {idx + 1}
                      </span>
                      <span className="font-serif text-xs text-stone-400 font-semibold">
                        {step.urduName}
                      </span>
                    </div>

                    <h4 className="font-serif font-bold text-sm text-stone-100 mb-1.5">
                      {step.name}
                    </h4>
                    <p className="text-xs text-stone-300 leading-relaxed mb-3">
                      {step.instruction}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-800 text-[11px] text-amber-300/90 font-medium">
                    {step.tip}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Tab 3: Send Custom Measurements to WhatsApp Form */}
        {activeTab === 'calculator' && (
          <motion.div
            key="tab-calculator"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: easeCurve }}
            className="max-w-3xl mx-auto rounded-2xl border border-stone-800 bg-stone-900/80 p-6 sm:p-8 shadow-2xl backdrop-blur-sm"
          >
            <div className="border-b border-stone-800 pb-4 mb-6">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
                <Ruler className="w-4 h-4" />
                <span>Bespoke Measurement Dispatch</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-100">
                Send Your Exact Measurements via WhatsApp
              </h3>
              <p className="text-xs text-stone-400 mt-1">
                Select a standard Pakistani brand size preset or enter custom tailor measurements. This pre-fills an instant WhatsApp message for master cutting.
              </p>
            </div>

            {/* Quick Size Preset Selector */}
            <div className="mb-6 p-3.5 rounded-xl bg-stone-950 border border-stone-800">
              <label className="text-xs font-medium text-stone-300 block mb-2">
                Quick Fill From Standard Pakistani Brand Size:
              </label>
              <div className="flex flex-wrap gap-2">
                {(['XS', 'S', 'M', 'L', 'XL'] as PakistaniSizeLabel[]).map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => handleApplyPresetSize(size)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      customMeasures.selectedBrandSize === size
                        ? 'bg-amber-500 text-neutral-950 shadow-md'
                        : 'bg-stone-800 hover:bg-stone-700 text-stone-200'
                    }`}
                  >
                    Size {size}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSendMeasurementsToWhatsApp} className="flex flex-col gap-5">
              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Your Full Name"
                  placeholder="e.g. Ayesha Malik"
                  required
                  value={customMeasures.name}
                  onChange={(e) => handleCustomMeasureChange('name', e.target.value)}
                />
                <Input
                  label="WhatsApp Phone Number"
                  placeholder="e.g. 0300 1234567"
                  required
                  value={customMeasures.phone}
                  onChange={(e) => handleCustomMeasureChange('phone', e.target.value)}
                />
              </div>

              {/* Suit Selection */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-300 block mb-1.5">
                  Select Suit Category & Pricing:
                </label>
                <select
                  value={customMeasures.suitType}
                  onChange={(e) => handleCustomMeasureChange('suitType', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-stone-950 border border-stone-800 text-stone-200 text-sm focus:outline-none focus:border-amber-500"
                >
                  <option value="Simple Suit (PKR 2,500)">Simple Suit — PKR 2,500</option>
                  <option value="Double Suit (PKR 4,000)">Double Suit — PKR 4,000</option>
                  <option value="Sarhi Set (PKR 7,000)">Sarhi Set — PKR 7,000</option>
                  <option value="Panneled Frock Set (PKR 7,000)">Panneled Frock Set — PKR 7,000</option>
                  <option value="Bridal Set (PKR 10,000)">Bridal Set — PKR 10,000</option>
                  <option value="Consult for Custom Designs (Custom Quote)">Consult for Custom Designs (Custom Quote)</option>
                </select>
              </div>

              {/* Measurements Grid */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-300 block mb-1.5">
                  Body / Garment Measurements ({unit === 'in' ? 'Inches "' : 'cm'}):
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <Input
                    label="Shirt Length"
                    placeholder='41"'
                    value={customMeasures.shirtLength}
                    onChange={(e) => handleCustomMeasureChange('shirtLength', e.target.value)}
                  />
                  <Input
                    label="Chest / Bust"
                    placeholder='40"'
                    value={customMeasures.chest}
                    onChange={(e) => handleCustomMeasureChange('chest', e.target.value)}
                  />
                  <Input
                    label="Waist"
                    placeholder='36"'
                    value={customMeasures.waist}
                    onChange={(e) => handleCustomMeasureChange('waist', e.target.value)}
                  />
                  <Input
                    label="Hips / Daman"
                    placeholder='44"'
                    value={customMeasures.hip}
                    onChange={(e) => handleCustomMeasureChange('hip', e.target.value)}
                  />
                  <Input
                    label="Shoulder (تیرا)"
                    placeholder='15"'
                    value={customMeasures.shoulder}
                    onChange={(e) => handleCustomMeasureChange('shoulder', e.target.value)}
                  />
                  <Input
                    label="Sleeve (بازو)"
                    placeholder='22.5"'
                    value={customMeasures.sleeve}
                    onChange={(e) => handleCustomMeasureChange('sleeve', e.target.value)}
                  />
                  <Input
                    label="Trouser Length"
                    placeholder='38.5"'
                    value={customMeasures.trouserLength}
                    onChange={(e) => handleCustomMeasureChange('trouserLength', e.target.value)}
                  />
                  <Input
                    label="Pauncha (پانچہ)"
                    placeholder='7.5"'
                    value={customMeasures.trouserBottom}
                    onChange={(e) => handleCustomMeasureChange('trouserBottom', e.target.value)}
                  />
                </div>
              </div>

              {/* Atelier Add-Ons */}
              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 flex flex-col gap-3">
                <span className="text-xs font-bold text-stone-200">
                  Select SARTOR Atelier Services Needed:
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="text-stone-400 block mb-1">Embroidery Preference:</label>
                    <select
                      value={customMeasures.embroidery}
                      onChange={(e) => handleCustomMeasureChange('embroidery', e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded bg-stone-900 border border-stone-800 text-stone-200 text-xs"
                    >
                      <option value="None / Plain Stitching">None / Plain Stitching</option>
                      <option value="Hand Embroidery (کاریگری / زر دوزی)">Hand Embroidery (کاریگری)</option>
                      <option value="Machine Embroidery (مشین کڑھائی)">Machine Embroidery (مشین کڑھائی)</option>
                      <option value="Both Hand & Machine Work">Both Hand & Machine Work</option>
                    </select>
                  </div>

                  <label className="flex items-center gap-2 p-2 rounded bg-stone-900/60 border border-stone-800 cursor-pointer text-stone-300">
                    <input
                      type="checkbox"
                      checked={customMeasures.fabricSourcing}
                      onChange={(e) => handleCustomMeasureChange('fabricSourcing', e.target.checked)}
                      className="rounded accent-amber-500 w-4 h-4"
                    />
                    <span>Fabric & Material Sourcing required</span>
                  </label>

                  <label className="flex items-center gap-2 p-2 rounded bg-stone-900/60 border border-stone-800 cursor-pointer text-stone-300">
                    <input
                      type="checkbox"
                      checked={customMeasures.pickAndDrop}
                      onChange={(e) => handleCustomMeasureChange('pickAndDrop', e.target.checked)}
                      className="rounded accent-amber-500 w-4 h-4"
                    />
                    <span>Pick & Drop across Lahore</span>
                  </label>
                </div>
              </div>

              {/* Special Instructions */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-300 block mb-1.5">
                  Design & Cut Notes (e.g. boat neck, deep neckline, tulip shalwar, pocket details):
                </label>
                <textarea
                  rows={2}
                  value={customMeasures.notes}
                  onChange={(e) => handleCustomMeasureChange('notes', e.target.value)}
                  placeholder="Tell us if you want round neck, collar, lining attached, specific lace placement, or event date..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-stone-950 border border-stone-800 text-stone-200 text-sm focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <Button
                  type="submit"
                  variant="whatsapp"
                  size="lg"
                  fullWidth
                  leftIcon={<MessageSquare className="w-5 h-5 fill-current" />}
                >
                  Send Measurement Profile to Master Tailor on WhatsApp
                </Button>
                <div className="mt-2 text-center text-[11px] text-stone-400">
                  Dispatches directly to SARTOR Master Cutter WhatsApp: <strong>{SARTOR_PHONE_LOCAL}</strong>
                </div>
              </div>
            </form>
          </motion.div>
        )}
        </AnimatePresence>
      </div>
    </section>
  );
};
