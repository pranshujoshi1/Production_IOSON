import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Easing } from 'framer-motion';

// Fonts are preloaded in index.html — no @import needed here.
const EASE_SPRING    = [0.22, 1, 0.36, 1] as unknown as Easing;
const EASE_CINEMATIC = [0.76, 0, 0.24, 1] as unknown as Easing;

/* ─────────────────────────────────────────────────────────
   sessionStorage flag — survives page refreshes within the
   same tab session. Clears only when the tab/browser closes.
   This ensures splash plays ONCE per visit, not on refresh.
───────────────────────────────────────────────────────── */
const SPLASH_KEY = 'ioson_splash_played';
const _splashPlayed = () => sessionStorage.getItem(SPLASH_KEY) === '1';
const _markSplashPlayed = () => sessionStorage.setItem(SPLASH_KEY, '1');

/* ── Framer-motion variants ───────────────────────────── */
const letterVariants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      delay,
      duration: 0.7,
      ease: EASE_SPRING,
    },
  }),
};

const taglineVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 1.3, duration: 0.75, ease: 'easeOut' as Easing },
  },
};

const overlayExit = {
  initial: { y: '0%' },
  exit: {
    y: '-100%',
    transition: {
      duration: 0.78,
      ease: EASE_CINEMATIC,
      delay: 0.08,
    },
  },
};

/* ── Letter config ────────────────────────────────────── */
const LETTERS = ['I', 'O', 'S', 'O', 'N'] as const;
const LETTER_DELAYS = [0.10, 0.27, 0.44, 0.60, 0.76] as const;

/* ── Component ───────────────────────────────────────── */
interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const dismiss = window.setTimeout(() => {
      setExiting(true);
      window.setTimeout(onComplete, 950);
    }, 2600);
    return () => window.clearTimeout(dismiss);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="splash"
          {...overlayExit}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: '#FFFFFF',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
            pointerEvents: 'all',
            willChange: 'transform',
          }}
        >

          {/* ── Soft edge vignette ── */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 55%, rgba(0,0,0,0.03) 100%)',
              pointerEvents: 'none',
            }}
          />

          {/* ── IOSON wordmark — Black Ops One stencil font ── */}
          <div
            aria-label="IOSON"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(2px, 0.9vw, 11px)',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {LETTERS.map((letter, i) => (
              <motion.span
                key={i}
                custom={LETTER_DELAYS[i]}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                style={{
                  fontFamily: "'Black Ops One', sans-serif",
                  fontSize: 'clamp(3.2rem, 9.5vw, 7rem)',
                  fontWeight: 400,
                  letterSpacing: '0.1em',
                  color: '#0D0D0D',
                  lineHeight: 1,
                  display: 'inline-block',
                  willChange: 'transform, opacity, filter',
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* ── "Beyond Technology!" — Dancing Script cursive ── */}
          <motion.p
            variants={taglineVariants}
            initial="hidden"
            animate="visible"
            style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: 'clamp(1.2rem, 2.8vw, 1.8rem)',
              fontWeight: 700,
              color: '#0D0D0D',
              margin: 0,
              letterSpacing: '0.01em',
              position: 'relative',
              zIndex: 1,
            }}
          >
            Beyond Technology!
          </motion.p>

          {/* ── Bottom progress sweep ── */}
          <motion.div
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.15, duration: 2.35, ease: 'linear' }}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 2,
              background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.15), transparent)',
              zIndex: 1,
              originX: 0,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Hook ──────────────────────────────────────────────── */
export function useSplash() {
  const [done, setDone] = useState(_splashPlayed());

  const handleComplete = () => {
    _markSplashPlayed();
    setDone(true);
  };

  return { done, handleComplete, showSplash: !_splashPlayed() };
}
