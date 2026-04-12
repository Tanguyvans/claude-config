// Anthropic-style design tokens for Remotion video slides

export const COLORS = {
  // Backgrounds
  background: '#FAFAF8',
  backgroundWhite: '#FFFFFF',
  backgroundDark: '#1A1A2E',

  // Brand Pastels (card backgrounds)
  blue: '#D6E4F0',
  blueMedium: '#B8D4E8',
  yellow: '#F5E6C8',
  yellowMedium: '#EDDAB0',
  green: '#D5E8D4',
  greenMedium: '#BFD9BE',
  pink: '#F5D4C8',
  pinkMedium: '#EBC0B2',
  purple: '#D8D4E8',
  purpleMedium: '#C8C2DC',

  // Text
  textPrimary: '#1A1A1A',
  textSecondary: '#4A4A4A',
  textMuted: '#8A8A8A',
  textOnDark: '#F5F5F5',

  // Accents
  accentOrange: '#E8956A',
  accentTeal: '#6AACB8',

  // Structural
  border: '#E5E5E0',
  shadow: 'rgba(0, 0, 0, 0.06)',
} as const;

export const TYPOGRAPHY = {
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  brandFont: "'Styrene B', 'Inter', sans-serif",

  sizes: {
    hero: 72,
    h1: 56,
    h2: 42,
    h3: 32,
    body: 24,
    bodyLarge: 28,
    caption: 18,
    small: 14,
  },

  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  lineHeight: {
    tight: 1.1,
    normal: 1.5,
    relaxed: 1.7,
  },
} as const;

export const LAYOUT = {
  width: 1920,
  height: 1080,
  padding: 80,
  contentMaxWidth: 1600,
  cardRadius: 16,
  cardPadding: 24,
  cardShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',
  iconSize: 48,
} as const;

export const ANIM = {
  fadeIn: 15,
  slideIn: 20,
  stagger: 6,
  holdDuration: 90,
} as const;
