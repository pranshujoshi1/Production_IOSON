import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  onClick?: () => void;
}

export function Card({ children, className, hover = false, glow = false, onClick }: CardProps) {
  const baseClasses = cn(
    'glass rounded-xl p-8',
    'transition-all duration-300',
    hover && [
      'cursor-pointer',
      'hover:border-[rgba(0,200,255,0.4)]',
      'hover:shadow-[0_0_40px_rgba(0,200,255,0.1)]',
      'hover:-translate-y-1',
    ],
    glow && 'shadow-[0_0_40px_rgba(0,200,255,0.08)]',
    className
  );

  if (onClick || hover) {
    return (
      <motion.div
        className={baseClasses}
        onClick={onClick}
        whileHover={{ y: -4, borderColor: 'rgba(0,200,255,0.4)' }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    );
  }

  return <div className={baseClasses}>{children}</div>;
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={cn('pb-6 border-b border-[rgba(255,255,255,0.06)]', className)}>
      {children}
    </div>
  );
}

export function CardBody({ children, className }: CardHeaderProps) {
  return <div className={cn('pt-6', className)}>{children}</div>;
}
