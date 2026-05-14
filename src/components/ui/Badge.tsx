import { cn } from '@/lib/utils';

type BadgeVariant = 'primary' | 'secondary' | 'ghost' | 'violet';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  primary: 'bg-[rgba(0,200,255,0.12)] text-[#00c8ff] border border-[rgba(0,200,255,0.25)]',
  secondary: 'bg-[rgba(185,199,229,0.1)] text-[#b9c7e5] border border-[rgba(185,199,229,0.2)]',
  ghost: 'bg-transparent text-[#86939a] border border-[#3c484f]',
  violet: 'bg-[rgba(112,0,255,0.12)] text-[#ddcdff] border border-[rgba(112,0,255,0.25)]',
};

export function Badge({ children, variant = 'primary', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1',
        'text-[11px] font-bold uppercase tracking-[0.1em]',
        'rounded-full',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
