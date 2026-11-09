export type PageType = 'cover' | 'couple' | 'events' | 'story' | 'gift' | 'rsvp';
export type BackgroundTheme = 'velvet' | 'ivory' | 'noir' | 'floral' | 'jawa_sogan' | 'minang_marawa';
export type CulturalTemplate = 'modern' | 'jawa' | 'minang';
export type ThemeMode = 'dark' | 'light';

export interface PageData {
  id: string;
  title: string;
  type: PageType;
  bgTheme: BackgroundTheme;
  data: Record<string, any>;
}

export interface CatalogItem {
  id: number;
  name: string;
  category: string;
  tag: string;
  image: string;
  description: string;
  type: string;
  templateKey?: CulturalTemplate;
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
