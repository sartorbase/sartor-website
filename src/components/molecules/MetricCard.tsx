import React from 'react';

export interface MetricCardProps {
  label: string;
  value: string | number;
  change?: string;
  subtext?: string;
  icon: React.ReactNode;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  change,
  subtext,
  icon,
}) => {
  return (
    <div className="bg-stone-900 border border-stone-800 rounded-xl p-4.5 flex flex-col justify-between">
      <div className="flex items-center justify-between text-stone-400">
        <span className="text-xs uppercase tracking-wider font-medium text-stone-400">{label}</span>
        <div className="p-2 rounded-lg bg-stone-800/80 text-amber-400">{icon}</div>
      </div>
      <div className="mt-3">
        <div className="text-2xl sm:text-3xl font-bold font-mono text-stone-100">{value}</div>
        <div className="mt-1 flex items-center justify-between text-xs">
          {change && <span className="text-emerald-400 font-medium">{change}</span>}
          {subtext && <span className="text-stone-500">{subtext}</span>}
        </div>
      </div>
    </div>
  );
};
