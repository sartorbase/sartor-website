import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'gold' | 'whatsapp' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium tracking-wide transition-all duration-200 select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500/50';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5 font-semibold',
  };

  const variantStyles = {
    primary: 'bg-stone-100 text-stone-900 hover:bg-white active:bg-stone-200 shadow-sm',
    secondary: 'bg-stone-800 text-stone-200 hover:bg-stone-700 hover:text-white border border-stone-700 active:bg-stone-800',
    gold: 'bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-neutral-950 font-semibold shadow-md shadow-amber-900/20',
    whatsapp: 'bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-semibold shadow-lg shadow-emerald-950/40',
    outline: 'bg-transparent border border-stone-700 text-stone-300 hover:border-amber-500 hover:text-amber-400 active:bg-stone-900',
    ghost: 'bg-transparent text-stone-300 hover:text-white hover:bg-stone-800/60',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${className}`}
      disabled={disabled}
      {...props}
    >
      {leftIcon && <span className="shrink-0">{leftIcon}</span>}
      <span className="truncate">{children}</span>
      {rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
};
