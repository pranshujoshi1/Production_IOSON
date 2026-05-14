// IOSON Design System Tokens — from Stitch MCP project 8755838926066468961
export const colors = {
  // Backgrounds / Surfaces
  void: '#050a14',
  surface: '#0e131e',
  surfaceDim: '#0e131e',
  surfaceBright: '#343945',
  surfaceLowest: '#080e18',
  surfaceLow: '#161c26',
  surfaceContainer: '#1a202a',
  surfaceHigh: '#242a35',
  surfaceHighest: '#2f3540',

  // Text
  onSurface: '#dde2f1',
  onSurfaceVariant: '#bcc8d0',
  outline: '#86939a',
  outlineVariant: '#3c484f',

  // Primary — Electric Blue
  primary: '#00c8ff',
  primaryDim: '#68d3ff',
  primaryBright: '#99deff',
  onPrimary: '#003546',
  primaryContainer: '#00c8ff',

  // Secondary
  secondary: '#b9c7e5',
  secondaryContainer: '#3c4963',
  onSecondary: '#233149',

  // Tertiary — Quantum Violet
  tertiary: '#ddcdff',
  tertiaryContainer: '#7000ff',
  onTertiary: '#3c0090',
} as const;

export const typography = {
  displayLg: {
    fontSize: '72px',
    fontWeight: '700',
    lineHeight: '80px',
    letterSpacing: '-0.02em',
  },
  headlineLg: {
    fontSize: '40px',
    fontWeight: '600',
    lineHeight: '48px',
    letterSpacing: '-0.01em',
  },
  titleMd: {
    fontSize: '24px',
    fontWeight: '500',
    lineHeight: '32px',
  },
  bodyLg: {
    fontSize: '18px',
    fontWeight: '400',
    lineHeight: '28px',
  },
  bodySm: {
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '20px',
  },
  labelCaps: {
    fontSize: '12px',
    fontWeight: '700',
    lineHeight: '16px',
    letterSpacing: '0.1em',
  },
} as const;

export const spacing = {
  unit: '8px',
  gutterDesktop: '24px',
  marginDesktop: '64px',
  gutterMobile: '16px',
  marginMobile: '20px',
  containerMax: '1440px',
} as const;

export const radius = {
  sm: '2px',
  default: '4px',
  md: '6px',
  lg: '8px',
  xl: '12px',
  full: '9999px',
} as const;
