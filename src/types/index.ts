export type PageType = 'cover' | 'couple' | 'events' | 'story' | 'gift' | 'rsvp';
export type BackgroundTheme = 'velvet' | 'ivory' | 'noir' | 'floral' | 'jawa_sogan' | 'minang_marawa' | 'botanical_sage';
export type CulturalTemplate = 'modern' | 'jawa' | 'minang' | 'botanical';
export type ThemeMode = 'dark' | 'light';
export type TextAlignment = 'left' | 'center' | 'right';

export interface CustomElement {
  id: string;
  type: 'heading' | 'subheading' | 'paragraph' | 'quote' | 'ornament' | 'photo' | 'divider' | 'spacer' | 'png_overlay';
  content: string;
  align?: TextAlignment;
  color?: string;
  size?: 'sm' | 'base' | 'lg' | 'xl';
  fontSize?: number; // e.g. 12 to 48 px
  fontWeight?: 'normal' | 'semibold' | 'bold' | 'extrabold';
  fontStyle?: 'normal' | 'italic';
  letterSpacing?: string;
  ornamentType?: 'leaf' | 'divider' | 'heart' | 'ring' | 'sparkle' | 'dove';
  dividerStyle?: 'gold_hairline' | 'batik' | 'minang' | 'melati' | 'dashed';
  spacerHeight?: number; // e.g. 8, 16, 24, 32, 48
  pngUrl?: string;
  pngPosition?: 'top' | 'center' | 'bottom' | 'top_left' | 'top_right' | 'full';
  pngScale?: number; // e.g. 50 to 200%
  pngOpacity?: number; // e.g. 10 to 100%
}

export interface PageData {
  id: string;
  title: string;
  type: PageType;
  bgTheme: BackgroundTheme;
  data: Record<string, any>;
  customElements?: CustomElement[];
  customBgColor?: string;
  customBgGradient?: string;
  containerPadding?: 'compact' | 'normal' | 'relaxed';
  containerRadius?: 'sm' | 'md' | 'lg' | '2xl' | '3xl';
  bgPngOverlay?: {
    url: string;
    opacity: number;
    scale: number;
    position: 'top' | 'center' | 'bottom' | 'top_left' | 'top_right' | 'full';
  };
}

export interface CatalogItem {
  id: number;
  slug?: string;
  name: string;
  category: string;
  tag: string;
  image: string;
  description: string;
  type: string;
  templateKey?: CulturalTemplate;
  price?: number;
  originalPrice?: number;
  rating?: number;
  salesCount?: number;
  reviewCount?: number;
  features?: string[];
  screenshots?: string[];
  longDescription?: string;
  specifications?: Record<string, string>;
}

export interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  originalPrice: number;
  discountedPrice: number;
  period: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

export interface TestimonialItem {
  couple: string;
  location: string;
  date: string;
  avatar: string;
  type: string;
  review: string;
}

export interface FAQItem {
  q: string;
  a: string;
}
