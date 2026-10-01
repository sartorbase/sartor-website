import React from 'react';
import { Award, CheckCircle2, Scissors, Ruler, Shield, HeartHandshake, MapPin } from 'lucide-react';
import { PAKISTANI_SIZES } from '../../data/sizes';
import { buildWhatsAppLink } from '../../services/analytics';

export const AboutTailoringSection: React.FC = () => {
  return (
    <section className="py-20 bg-stone-900/50 border-b border-stone-850 text-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Master Cutter Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          <div>
            <span className="text-amber-400 font-mono text-xs uppercase tracking-widest font-semibold block mb-2">
              Heritage of Craftsmanship
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-100 mb-6 leading-tight">
              Master Tailor Abdul Ghaffar &amp; The SARTOR Atelier
            </h2>
            <div className="space-y-4 text-stone-300 text-sm sm:text-base leading-relaxed">
              <p>
                With over <strong className="text-stone-100 font-semibold">35 years of bespoke cutting experience</strong> in Lahore, Master Tailor Abdul Ghaffar has dressed generations of Pakistani brides, dignitaries, and fashion connoisseurs.
              </p>
              <p>
                While modern commercial tailors often rush garments using rigid one-size cardboard blocks and cut corners on internal seam margins, SARTOR adheres strictly to classic Savile Row and Mughal tailoring fundamentals:
              </p>
              <ul className="space-y-2.5 pt-2 text-sm text-stone-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span><strong>Respect for Fabric Grain (Taar):</strong> Warp and weft threads are aligned before shears touch cloth, preventing kurti hems from twisting after washing.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span><strong>Generous 1.5–2.0 Inch Seam Allowances:</strong> Side seams are never shaved off, guaranteeing future alteration ease without ruining the dress.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span><strong>Micro-Woven Interfacings:</strong> Soft collarbone-conforming canvases that never warp, blister, or harden into cardboard.</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={buildWhatsAppLink(
                  'Assalam-o-Alaikum Ustad Abdul Ghaffar,\nI would like to consult with you on bespoke tailoring and fabric drafting.',
                  'about_master_cutter'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm transition-all shadow-lg shadow-amber-950/30 cursor-pointer"
              >
                Consult Master Tailor
              </a>
              <a
                href="/blog/how-to-choose-a-good-tailor-in-lahore"
                className="px-5 py-3 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-200 text-sm font-semibold border border-stone-700 transition-colors"
              >
                Read Master Tailor&apos;s Guide
              </a>
            </div>
          </div>

          {/* Atelier Cutting Standards Card (No fake photos) */}
          <div className="relative">
            <div className="rounded-2xl border border-stone-800 bg-stone-900/80 p-6 sm:p-8 shadow-2xl backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-stone-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <Scissors className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-semibold block">
                      Atelier Protocol
                    </span>
                    <h3 className="font-serif font-bold text-stone-100 text-lg">
                      The SARTOR Cutting Creed
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-800/80 border border-stone-700 text-stone-300 text-xs font-mono">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>Est. 1989</span>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-stone-300">
                <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800/80">
                  <p className="font-semibold text-stone-200 flex items-center gap-2">
                    <Ruler className="w-4 h-4 text-amber-400 shrink-0" />
                    Individual Anatomical Drafting
                  </p>
                  <p className="text-stone-400 text-xs mt-1 leading-relaxed">
                    Zero mass-produced cardboard blocks. Every kalidar panel, kurti torso, and trouser is chalked individually from your unique posture and shoulder slope.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800/80">
                  <p className="font-semibold text-stone-200 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-amber-400 shrink-0" />
                    Generous 1.5–2.0″ Seam Margins
                  </p>
                  <p className="text-stone-400 text-xs mt-1 leading-relaxed">
                    Internal allowances are never shaved away to save fabric. Your luxury suits can be adjusted over years as body sizes evolve.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800/80">
                  <p className="font-semibold text-stone-200 flex items-center gap-2">
                    <HeartHandshake className="w-4 h-4 text-amber-400 shrink-0" />
                    Doorstep Fitting Service
                  </p>
                  <p className="text-stone-400 text-xs mt-1 leading-relaxed">
                    Pick up and drop off across Model Town, DHA, Gulberg, and Johar Town. Send a sample fitting suit or schedule live WhatsApp video guidance.
                  </p>
                </div>
              </div>

              {/* Artisan Note */}
              <div className="mt-6 pt-5 border-t border-stone-800/80">
                <blockquote className="text-xs sm:text-sm font-serif italic text-amber-200/90 leading-relaxed border-l-2 border-amber-500 pl-3">
                  &ldquo;A garment cut true to the grain never twists; a garment cut with generosity outlasts decades. In bespoke tailoring, patience at the cutting table saves every fitting.&rdquo;
                </blockquote>
                <div className="mt-3 flex items-center justify-between text-xs text-stone-400">
                  <span className="font-semibold text-stone-300">Abdul Ghaffar — Head Cutter</span>
                  <span className="flex items-center gap-1 text-stone-400">
                    <MapPin className="w-3 h-3 text-amber-400" /> Model Town, Lahore
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pakistani Standard Size Chart Section */}
        <div id="size-chart" className="pt-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-amber-400 font-mono text-xs uppercase tracking-widest font-semibold block mb-1">
              Precision Measurements
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100">
              Standard Pakistani Women&apos;s Size Chart
            </h3>
            <p className="mt-2 text-stone-400 text-xs sm:text-sm">
              All dimensions in inches. For custom bespoke fitting, send your exact measurements or a sample suit via our Lahore doorstep pickup.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-stone-800 bg-stone-900/60 shadow-xl">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-stone-850 text-amber-400 font-mono border-b border-stone-800 text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-4">Size</th>
                  <th className="py-3 px-4">UK/US</th>
                  <th className="py-3 px-4">Shoulder</th>
                  <th className="py-3 px-4">Chest</th>
                  <th className="py-3 px-4">Waist</th>
                  <th className="py-3 px-4">Hip</th>
                  <th className="py-3 px-4">Shirt Length</th>
                  <th className="py-3 px-4">Sleeve</th>
                  <th className="py-3 px-4">Trouser Length</th>
                  <th className="py-3 px-4">Trouser Bottom</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800 text-stone-300 font-mono text-xs">
                {PAKISTANI_SIZES.map((row) => (
                  <tr key={row.sizeLabel} className="hover:bg-stone-850/60 transition-colors">
                    <td className="py-3 px-4 font-bold text-amber-300">{row.sizeLabel}</td>
                    <td className="py-3 px-4 text-stone-400">{row.ukUsEquivalent}</td>
                    <td className="py-3 px-4">{row.shoulder}&quot;</td>
                    <td className="py-3 px-4 font-semibold text-stone-200">{row.chest}&quot;</td>
                    <td className="py-3 px-4">{row.waist}&quot;</td>
                    <td className="py-3 px-4">{row.hip}&quot;</td>
                    <td className="py-3 px-4">{row.shirtLength}&quot;</td>
                    <td className="py-3 px-4">{row.sleeveLength}&quot;</td>
                    <td className="py-3 px-4">{row.trouserLength}&quot;</td>
                    <td className="py-3 px-4">{row.trouserBottom}&quot;</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
