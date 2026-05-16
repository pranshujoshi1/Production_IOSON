import { useState, useEffect } from 'react';

/**
 * Returns true once the user has scrolled past `threshold` pixels.
 * Uses a passive scroll listener with rAF debouncing.
 */
export function useScrolled(threshold = 60): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let raf: number | null = null;

    const onScroll = () => {
      if (raf !== null) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        setScrolled(window.scrollY > threshold);
      });
    };

    // Sync on mount
    setScrolled(window.scrollY > threshold);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, [threshold]);

  return scrolled;
}
