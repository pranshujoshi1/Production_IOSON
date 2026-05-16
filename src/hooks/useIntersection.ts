import { useEffect, useRef, useState } from 'react';

interface UseIntersectionOptions {
  threshold?: number;
  rootMargin?: string;
  /** Once visible, keep `true` and stop observing (default: true) */
  once?: boolean;
}

/**
 * Returns `true` when the attached `ref` element enters the viewport.
 *
 * @example
 * const [ref, visible] = useIntersection({ threshold: 0.2 });
 * <div ref={ref} style={{ opacity: visible ? 1 : 0 }} />
 */
export function useIntersection<T extends Element = Element>(
  options: UseIntersectionOptions = {},
): [React.RefObject<T | null>, boolean] {
  const { threshold = 0, rootMargin = '0px', once = true } = options;
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, visible];
}
