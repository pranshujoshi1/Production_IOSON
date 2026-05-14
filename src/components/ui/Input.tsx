import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-label-caps text-[#bcc8d0]">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full px-4 py-3.5 rounded-lg',
            'bg-[#161c26] border border-[#3c484f]',
            'text-[#dde2f1] placeholder:text-[#86939a]',
            'text-base font-normal',
            'transition-all duration-200',
            'focus:outline-none focus:border-[#00c8ff]',
            'focus:shadow-[0_0_0_3px_rgba(0,200,255,0.12),inset_0_0_20px_rgba(0,200,255,0.03)]',
            error && 'border-[#ffb4ab] focus:border-[#ffb4ab]',
            className
          )}
          {...props}
        />
        {error && <p className="text-sm text-[#ffb4ab]">{error}</p>}
        {hint && !error && <p className="text-sm text-[#86939a]">{hint}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, id, rows = 5, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-label-caps text-[#bcc8d0]">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          rows={rows}
          className={cn(
            'w-full px-4 py-3.5 rounded-lg resize-none',
            'bg-[#161c26] border border-[#3c484f]',
            'text-[#dde2f1] placeholder:text-[#86939a]',
            'text-base font-normal',
            'transition-all duration-200',
            'focus:outline-none focus:border-[#00c8ff]',
            'focus:shadow-[0_0_0_3px_rgba(0,200,255,0.12)]',
            error && 'border-[#ffb4ab]',
            className
          )}
          {...props}
        />
        {error && <p className="text-sm text-[#ffb4ab]">{error}</p>}
        {hint && !error && <p className="text-sm text-[#86939a]">{hint}</p>}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';
