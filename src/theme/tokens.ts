/**
 * IOSON Design System Tokens
 *
 * Single source of truth for all design decisions across the website.
 * Import individual token groups or the full `tokens` object.
 *
 * Usage:
 *   import { tokens } from '@/theme/tokens';
 *   style={{ color: tokens.color.text, fontFamily: tokens.font.heading }}
 */

// ── Colours ────────────────────────────────────────────────────────────────
export const color = {
  // Brand
  brand:        '#0D0D0D',   // primary dark — logo, headings, CTAs
  brandHover:   '#1A1A1A',   // button hover state

  // Surfaces
  white:        '#FFFFFF',
  surface:      '#FAFAFA',   // section backgrounds (slightly off-white)
  muted:        '#F5F5F5',   // cards, tag backgrounds
  mutedHover:   '#EFEFEF',

  // Text
  text:         '#0D0D0D',   // primary body text
  textSecond:   '#404040',   // secondary body text
  textMuted:    '#555555',   // nav links, labels
  textFaint:    '#888888',   // eyebrow labels, timestamps, micro-copy
  textDisabled: '#BBBBBB',

  // Borders
  border:       'rgba(0,0,0,0.08)',
  borderMid:    'rgba(0,0,0,0.12)',
  borderStrong: 'rgba(0,0,0,0.20)',

  // Accent (used for links, active states, focus rings)
  accent:       '#2563EB',
  accentHover:  '#1D4ED8',
  accentBg:     'rgba(37,99,235,0.07)',
  accentBorder: 'rgba(37,99,235,0.20)',

  // Semantic
  success:      '#16A34A',
  successBg:    'rgba(22,163,74,0.08)',
  successBorder:'rgba(22,163,74,0.20)',
  error:        '#DC2626',
  errorBg:      'rgba(220,38,38,0.06)',
  errorBorder:  'rgba(220,38,38,0.20)',

  // Green tag (product "Live" badge)
  green:        '#16A34A',
  greenBg:      'rgba(22,163,74,0.08)',
} as const;

// ── Typography ──────────────────────────────────────────────────────────────
export const font = {
  heading: "'Space Grotesk', sans-serif",
  body:    "'Inter', sans-serif",
  splash:  "'Black Ops One', sans-serif",   // IOSON wordmark in SplashScreen
  script:  "'Dancing Script', cursive",     // "Beyond Technology!" tagline
} as const;

// ── Font size scale ─────────────────────────────────────────────────────────
export const fontSize = {
  xs:   11,
  sm:   12,
  base: 13,
  md:   14,
  lg:   16,
  xl:   18,
  '2xl': 20,
  '3xl': 24,
} as const;

// ── Border radius ───────────────────────────────────────────────────────────
export const radius = {
  sm:   4,
  md:   7,    // buttons, inputs
  lg:   10,
  xl:   14,   // cards
  '2xl': 16,
  pill: 100,  // navbar pill, tags
} as const;

// ── Box shadows ─────────────────────────────────────────────────────────────
export const shadow = {
  card:   '0 4px 24px rgba(0,0,0,0.06)',
  cardMd: '0 8px 32px rgba(0,0,0,0.08)',
  pill:   '0 8px 30px rgba(0,0,0,0.10), 0 1px 0 rgba(255,255,255,0.7) inset',
} as const;

// ── Animation easing ────────────────────────────────────────────────────────
export const ease = {
  /** Snappy spring — most UI transitions */
  spring:    [0.22, 1, 0.36, 1] as const,
  /** Cinematic slide — full-screen exits */
  cinematic: [0.76, 0, 0.24, 1] as const,
  /** Standard CSS ease-out for simple opacity fades */
  out:       'easeOut' as const,
} as const;

// ── Spacing ─────────────────────────────────────────────────────────────────
export const spacing = {
  containerMax: 1320,
  pagePadX:     'clamp(20px,5vw,64px)',
  sectionY:     'clamp(56px,9vw,96px)',
  heroTop:      'clamp(96px,14vw,128px)',
} as const;

// ── Consolidated export ─────────────────────────────────────────────────────
export const tokens = { color, font, fontSize, radius, shadow, ease, spacing } as const;
export type Tokens = typeof tokens;
