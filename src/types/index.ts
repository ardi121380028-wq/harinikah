export type PageType = 'cover' | 'couple' | 'events' | 'story' | 'gift' | 'rsvp';
export type BackgroundTheme = 'velvet' | 'ivory' | 'noir' | 'floral' | 'jawa_sogan' | 'minang_marawa' | 'botanical_sage';
export type CulturalTemplate = 'modern' | 'jawa' | 'minang' | 'botanical';
export type ThemeMode = 'dark' | 'light';
export type TextAlignment = 'left' | 'center' | 'right';

export interface CustomElement {
  id: string;
  type: 'heading' | 'subheading' | 'paragraph' | 'quote' | 'ornament' | 'photo';
  content: string;
  align?: TextAlignment;
  color?: string;
  size?: 'sm' | 'base' | 'lg' | 'xl';
  ornamentType?: 'leaf' | 'divider' | 'heart' | 'ring' | 'sparkle' | 'dove';
}

export interface PageData {
  id: string;
  title: string;
  type: PageType;
  bgTheme: BackgroundTheme;
  data: Record<string, any>;
  customElements?: CustomElement[];
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
