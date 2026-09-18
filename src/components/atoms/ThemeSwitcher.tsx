import React, { useId } from 'react';
import { motion } from 'motion/react';
import { Moon, Sparkles, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export interface ThemeSwitcherProps {
  variant?: 'compact' | 'segmented' | 'inline';
  className?: string;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  variant = 'segmented',
  className = '',
}) => {
  const { theme, setTheme, toggleTheme } = useTheme();
  const uniqueId = useId();

  if (variant === 'compact') {
    const isBlack = theme === 'black';
    return (
      <button
        id={`theme-switcher-compact-${uniqueId}`}
        onClick={toggleTheme}
        aria-label={`Switch atelier theme to ${isBlack ? 'Champagne White' : 'Classic Black'}`}
        title={`Atelier Ambience: currently ${isBlack ? 'Classic Black' : 'Champagne White'}. Click to switch.`}
        className={`group relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 ${
          isBlack
            ? 'bg-stone-900/90 hover:bg-stone-800 border-stone-800 text-stone-300 hover:text-amber-400'
            : 'bg-stone-100 hover:bg-white border-stone-300 text-stone-700 hover:text-amber-700 shadow-sm'
        } ${className}`}
      >
        <span className="relative flex items-center justify-center w-4 h-4">
          {isBlack ? (
            <Moon className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-12 transition-transform duration-300" />
          ) : (
            <Sparkles className="w-3.5 h-3.5 text-amber-600 group-hover:rotate-12 transition-transform duration-300" />
          )}
        </span>
        <span className="text-[11px] font-medium tracking-wide">
          {isBlack ? 'Classic Black' : 'Champagne'}
        </span>
      </button>
    );
  }

  // Full segmented luxury atelier toggle
  return (
    <div
      role="radiogroup"
      aria-label="Select Atelier Theme"
      className={`relative inline-flex items-center p-1 rounded-full bg-stone-900/80 border border-stone-800/80 backdrop-blur-sm shadow-inner transition-colors ${className}`}
    >
      {/* Classic Black Option */}
      <button
        type="button"
        id={`theme-toggle-black-${uniqueId}`}
        role="radio"
        aria-checked={theme === 'black'}
        onClick={() => setTheme('black')}
        className={`relative z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors select-none ${
          theme === 'black'
            ? 'text-amber-300 font-semibold'
            : 'text-stone-400 hover:text-stone-200'
        }`}
        title="Classic Black Atelier Ambience"
      >
        <Moon className={`w-3 h-3 ${theme === 'black' ? 'text-amber-400' : 'text-stone-500'}`} />
        <span>Classic Black</span>

        {theme === 'black' && (
          <motion.div
            layoutId={`activeThemeHighlight-${uniqueId}`}
            className="absolute inset-0 rounded-full bg-stone-800/95 border border-amber-600/40 shadow-sm -z-10"
            transition={{ type: 'spring', stiffness: 450, damping: 35 }}
          />
        )}
      </button>

      {/* Champagne White Option */}
      <button
        type="button"
        id={`theme-toggle-champagne-${uniqueId}`}
        role="radio"
        aria-checked={theme === 'champagne'}
        onClick={() => setTheme('champagne')}
        className={`relative z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors select-none ${
          theme === 'champagne'
            ? 'text-amber-800 font-semibold'
            : 'text-stone-400 hover:text-stone-200'
        }`}
        title="Champagne White Atelier Ambience"
      >
        <Sparkles className={`w-3 h-3 ${theme === 'champagne' ? 'text-amber-600' : 'text-stone-500'}`} />
        <span>Champagne White</span>

        {theme === 'champagne' && (
          <motion.div
            layoutId={`activeThemeHighlight-${uniqueId}`}
            className="absolute inset-0 rounded-full bg-white border border-amber-500/50 shadow-sm -z-10"
            transition={{ type: 'spring', stiffness: 450, damping: 35 }}
          />
        )}
      </button>
    </div>
  );
};

