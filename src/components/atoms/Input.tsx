import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-xs font-medium text-stone-300 tracking-wide uppercase">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-3.5 text-stone-500 pointer-events-none flex items-center">
            {leftIcon}
          </div>
        )}
        <input
          id={inputId}
          className={`w-full bg-stone-900 border text-stone-100 placeholder-stone-500 text-sm rounded-md px-3.5 py-2.5 transition-colors focus:outline-none focus:ring-1 focus:ring-amber-500/80 focus:border-amber-500/80 ${
            leftIcon ? 'pl-10' : ''
          } ${error ? 'border-red-500/80 focus:ring-red-500' : 'border-stone-800 hover:border-stone-700'} ${className}`}
          {...props}
        />
      </div>
      {error && <span className="text-xs text-red-400 mt-0.5">{error}</span>}
      {helperText && !error && <span className="text-xs text-stone-500 mt-0.5">{helperText}</span>}
    </div>
  );
};
