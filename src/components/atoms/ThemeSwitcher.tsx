import React, { useId } from 'react';
import { Moon, Sparkles } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export interface ThemeSwitcherProps {
  variant?: 'compact' | 'segmented';
  className?: string;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  variant = 'segmented',
  className = '',
}) => {
  const { theme, setTheme } = useTheme();
  const uniqueId = useId();

  return (
    <div
      role="radiogroup"
      aria-label="Select Atelier Theme"
      className={`inline-flex items-center p-1 rounded-full bg-stone-900 border border-stone-800 ${className}`}
    >
      <button
        type="button"
        id={`theme-toggle-black-${uniqueId}`}
        onClick={() => setTheme('black')}
        className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
          theme === 'black'
            ? 'bg-stone-800 text-amber-300 font-semibold border border-amber-600/40'
            : 'text-stone-400 hover:text-stone-200'
        }`}
      >
        <Moon className="w-3 h-3 text-amber-400" />
        <span>Classic Black</span>
      </button>

      <button
        type="button"
        id={`theme-toggle-champagne-${uniqueId}`}
        onClick={() => setTheme('champagne')}
        className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
          theme === 'champagne'
            ? 'bg-amber-100 text-amber-900 font-semibold border border-amber-500/50'
            : 'text-stone-400 hover:text-stone-200'
        }`}
      >
        <Sparkles className="w-3 h-3 text-amber-600" />
        <span>Champagne</span>
      </button>
    </div>
  );
};
