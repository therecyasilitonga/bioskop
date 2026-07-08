/**
 * src/theme/tokens.js
 * -----------------------------------------------------------------------
 * Token visual untuk sistem desain "Aura Theater". Mengatur palette warna,
 * tipografi, ukuran spacing, dan radius rounded borders.
 * -----------------------------------------------------------------------
 */

export const colors = {
  // Shared brand colors
  primary: '#F2C14E',      // Gold accent for primary actions (buttons, highlights)
  primaryDark: '#D4A32A',  // Darker gold for active states
  primaryText: '#1A0E14',  // Dark text on gold background
  danger: '#E74C3C',       // Red for alerts and error notifications
  success: '#2ECC71',      // Green for success confirmations
  warning: '#F39C12',      // Orange warning status

  // Mode Terang (Light Mode)
  light: {
    bg: '#F9F9FB',
    bgAlt: '#F0F0F3',
    card: '#FFFFFF',
    cardAlt: '#F3F4F6',
    text: '#1E1E24',
    textMuted: '#6B7280',
    divider: '#E5E7EB',
    statusBar: 'dark',
    primary: '#F2C14E',
  },

  // Mode Gelap (Dark Mode - Malam Premiere signature)
  dark: {
    bg: '#1A0E14',         // Dark maroon background
    bgAlt: '#23141C',      // Slightly lighter maroon for section groupings
    card: '#2D1B25',       // Deep purple-maroon for cards
    cardAlt: '#3A2430',    // Secondary card surfaces
    text: '#FFFFFF',
    textMuted: '#9CA3AF',
    divider: '#3E2935',
    statusBar: 'light',
    primary: '#F2C14E',
  }
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 36,
};

export const radius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 20,
  pill: 9999,
};

export const typography = {
  h1: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
  },
  h2: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 28,
  },
  h3: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
  },
  bodyStrong: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
  },
  body: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
  },
  tiny: {
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 14,
  },
};
