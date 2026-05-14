import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

type ButtonVariant = 'primary' | 'ghost' | 'outline' | 'text';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  asChild?: boolean;
  href?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    'bg-[#00c8ff] text-[#003546] font-semibold',
    'hover:bg-[#68d3ff] active:bg-[#00a8d4]',
    'shadow-[0_0_30px_rgba(0,200,255,0.3)]',
    'hover:shadow-[0_0_50px_rgba(0,200,255,0.5)]',
    'transition-all duration-200',
  ].join(' '),
  ghost: [
    'bg-transparent border border-[rgba(0,200,255,0.3)] text-[#00c8ff]',
    'hover:border-[#00c8ff] hover:bg-[rgba(0,200,255,0.08)]',
    'hover:shadow-[0_0_20px_rgba(0,200,255,0.15)]',
    'transition-all duration-200',
  ].join(' '),
  outline: [
    'bg-transparent border border-[#3c484f] text-[#dde2f1]',
    'hover:border-[rgba(0,200,255,0.4)] hover:text-[#00c8ff]',
    'transition-all duration-200',
  ].join(' '),
  text: [
    'bg-transparent text-[#00c8ff] underline-offset-4',
    'hover:underline hover:text-[#68d3ff]',
    'transition-all duration-200',
  ].join(' '),
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm rounded-md gap-1.5',
  md: 'px-6 py-3 text-base rounded-lg gap-2',
  lg: 'px-8 py-4 text-lg rounded-xl gap-2.5',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, icon, iconPosition = 'right', children, disabled, ...props }, ref) => {
    return (
      <motion.button
        ref={ref as React.RefObject<HTMLButtonElement>}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          'inline-flex items-center justify-center font-medium',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00c8ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e131e]',
          'disabled:pointer-events-none disabled:opacity-40',
          'select-none cursor-pointer',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
            {children}
            {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
          </>
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
