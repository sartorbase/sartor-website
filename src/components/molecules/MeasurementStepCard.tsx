import React from 'react';
import { ArrowDown, Disc, Info, Maximize2, MoveHorizontal, Ruler, TrendingDown } from 'lucide-react';
import { MeasureGuideStep } from '../../types';

export interface MeasurementStepCardProps {
  step: MeasureGuideStep;
  index: number;
}

export const MeasurementStepCard: React.FC<MeasurementStepCardProps> = ({ step, index }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Maximize2':
        return <Maximize2 className="w-5 h-5 text-amber-400" />;
      case 'MoveHorizontal':
        return <MoveHorizontal className="w-5 h-5 text-amber-400" />;
      case 'Ruler':
        return <Ruler className="w-5 h-5 text-amber-400" />;
      case 'ArrowDown':
        return <ArrowDown className="w-5 h-5 text-amber-400" />;
      case 'Disc':
        return <Disc className="w-5 h-5 text-amber-400" />;
      case 'TrendingDown':
        return <TrendingDown className="w-5 h-5 text-amber-400" />;
      default:
        return <Ruler className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <div
      id={`measure-step-${step.id}`}
      className="bg-stone-900/90 border border-stone-800 rounded-xl p-5 hover:border-amber-700/60 transition-all flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-amber-950/80 border border-amber-800/80 text-amber-400 text-xs font-bold font-mono">
              0{index + 1}
            </span>
            <div className="p-1.5 rounded-md bg-stone-800/80 border border-stone-700/60">
              {getIcon(step.iconName)}
            </div>
          </div>
          <span className="text-xs font-serif text-amber-300/80 tracking-wide font-medium" dir="rtl">
            {step.urduName}
          </span>
        </div>

        <h4 className="font-serif text-base font-semibold text-stone-100">
          {step.name}
        </h4>

        <p className="mt-2 text-xs sm:text-sm text-stone-300 leading-relaxed">
          {step.instruction}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-start gap-2 bg-stone-950/40 p-2.5 rounded-lg border border-stone-800">
        <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
        <p className="text-[11px] text-stone-400 leading-tight">
          <strong className="text-stone-300">Master Tailor Tip:</strong> {step.tip}
        </p>
      </div>
    </div>
  );
};
