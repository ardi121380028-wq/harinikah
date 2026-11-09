/**
 * HariNikah Design Tokens & Style System
 * Standardized design tokens for consistent, scalable multi-theme architecture.
 * Supports: Dark Mode (Velvet Emerald & Gold) and Light Mode (Ivory Champagne & Warm Gold)
 * Official Brand Accent: Shopee Orange for e-commerce conversion.
 */

export const BRAND_COLORS = {
  emerald: {
    950: '#020B0A',
    900: '#041514', // Deep Velvet Emerald (Dark background)
    850: '#071F1E', // Container / surface
    800: '#0E3837', // Card surface
    700: '#184E4C', // Border / subtle highlight
    600: '#236563',
    500: '#32827F',
  },
  gold: {
    50: '#FBF8EF',
    100: '#F5ECCF',
    200: '#ECDAA0',
    300: '#E2C36D',
    400: '#DFB051', // Primary Radiant Gold
    500: '#C79738',
    600: '#A37728',
    700: '#7F5A1C',
    800: '#5C3F12',
    900: '#38250A',
  },
  shopee: {
    primary: '#EE4D2D', // Official Shopee Orange
    hover: '#D73211',
    light: '#FFF5F1',
    border: '#FFD4C9',
  },
  champagne: {
    50: '#FAF8F5',  // Light Mode Canvas
    100: '#F5EFE6', // Light Mode Surface
    200: '#EDE4D3', // Light Mode Card
    300: '#E2D4BD', // Light Mode Border
    400: '#C8B598',
    900: '#2C251C', // Light Mode Headings
  },
  status: {
    pending: {
      bg: '#F1F5F9',
      text: '#64748B',
      border: '#CBD5E1',
      label: 'Belum Terkirim',
    },
    sent: {
      bg: '#E0F2FE',
      text: '#0284C7',
      border: '#7DD3FC',
      label: 'Terkirim (Centang 1)',
    },
    delivered: {
      bg: '#DBEAFE',
      text: '#2563EB',
      border: '#93C5FD',
      label: 'Tersampaikan (Centang 2 Abu)',
    },
    read: {
      bg: '#DCFCE7',
      text: '#16A34A',
      border: '#86EFAC',
      label: 'Terbaca (Centang 2 Biru)',
    },
  },
} as const;

export const TYPOGRAPHY = {
  fontFamily: {
    serif: 'var(--font-serif, "Cinzel", "Playfair Display", Georgia, serif)',
    sans: 'var(--font-sans, "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)',
  },
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem',// 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
  },
} as const;

export const THEME_SURFACES = {
  dark: {
    bg: BRAND_COLORS.emerald[900],
    surface: BRAND_COLORS.emerald[850],
    card: BRAND_COLORS.emerald[800],
    border: 'rgba(223, 176, 81, 0.25)',
    borderSubtle: 'rgba(223, 176, 81, 0.12)',
    textPrimary: '#FFFFFF',
    textSecondary: '#E2E8F0',
    textMuted: '#94A3B8',
    goldAccent: BRAND_COLORS.gold[400],
  },
  light: {
    bg: BRAND_COLORS.champagne[50],
    surface: BRAND_COLORS.champagne[100],
    card: '#FFFFFF',
    border: BRAND_COLORS.champagne[300],
    borderSubtle: 'rgba(200, 181, 152, 0.3)',
    textPrimary: BRAND_COLORS.champagne[900],
    textSecondary: '#4A5568',
    textMuted: '#718096',
    goldAccent: BRAND_COLORS.gold[600],
  },
} as const;

export const SHOPEE_OFFICIAL_URL = 'https://shopee.co.id/harinikah_official';
export const WHATSAPP_OFFICIAL_NUMBER = '6281234567890';
export const STUDIO_LOCATION = {
  city: 'Bandar Lampung',
  province: 'Lampung',
  address: 'Jl. Gatot Subroto No. 88, Pahoman, Enggal, Bandar Lampung, Lampung 35213',
  googleMapsUrl: 'https://maps.google.com/?q=Bandar+Lampung',
};
