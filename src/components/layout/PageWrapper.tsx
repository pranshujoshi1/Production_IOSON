import { type ReactNode } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

export function PageWrapper({ children, className = '' }: PageWrapperProps) {
  return (
    <div style={{ background: '#F5F5F5', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main className={className} style={{ flex: 1 }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
