import React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  helperText,
  className = '',
  id,
  rows = 4,
  ...props
}) => {
  const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label htmlFor={textareaId} className="text-xs font-medium text-stone-300 tracking-wide uppercase">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        rows={rows}
        className={`w-full bg-stone-900 border text-stone-100 placeholder-stone-500 text-sm rounded-md px-3.5 py-2.5 transition-colors focus:outline-none focus:ring-1 focus:ring-amber-500/80 focus:border-amber-500/80 resize-y ${
          error ? 'border-red-500/80 focus:ring-red-500' : 'border-stone-800 hover:border-stone-700'
        } ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-400 mt-0.5">{error}</span>}
      {helperText && !error && <span className="text-xs text-stone-500 mt-0.5">{helperText}</span>}
    </div>
  );
};
