// Design Elements, Presets, Assets and Tokens for HariNikah Studio Editor Pro

export interface PngPreset {
  id: string;
  name: string;
  category: 'Adat Jawa' | 'Adat Minang' | 'Floral' | 'Modern' | 'Branding';
  previewUrl: string;
  defaultScale: number;
  defaultOpacity: number;
}

// 1. Luxury Solid Background Color Palette
export const LUXURY_BG_COLORS = [
  { id: 'emerald', name: 'Velvet Emerald', hex: '#041514', textContrast: '#F9F6EE', category: 'dark' },
  { id: 'teal', name: 'Royal Teal', hex: '#072422', textContrast: '#FAF8F5', category: 'dark' },
  { id: 'sogan', name: 'Sogan Keraton Kasunanan', hex: '#1A1008', textContrast: '#FDE68A', category: 'dark' },
  { id: 'marawa', name: 'Marawa Crimson Ranah', hex: '#26080D', textContrast: '#FEE2E2', category: 'dark' },
  { id: 'noir', name: 'Noir Luxury Black', hex: '#020B0A', textContrast: '#E6CA65', category: 'dark' },
  { id: 'sage', name: 'Sage Pine Botanical', hex: '#162421', textContrast: '#E2E8F0', category: 'dark' },
  { id: 'ivory', name: 'Champagne Ivory Silk', hex: '#FAF8F5', textContrast: '#1C1917', category: 'light' },
  { id: 'white', name: 'Pearl White Murni', hex: '#FFFFFF', textContrast: '#0F172A', category: 'light' },
];

// 2. Luxury Gradient Backgrounds
export const LUXURY_BG_GRADIENTS = [
  {
    id: 'grad_emerald',
    name: 'Emerald Deep Glow',
    gradient: 'linear-gradient(180deg, #072422 0%, #031211 100%)',
    preview: '#072422',
  },
  {
    id: 'grad_sogan',
    name: 'Kasunanan Sogan Warmth',
    gradient: 'linear-gradient(180deg, #1f1406 0%, #0b0702 100%)',
    preview: '#1f1406',
  },
  {
    id: 'grad_marawa',
    name: 'Marawa Crimson Wine',
    gradient: 'linear-gradient(180deg, #2a0b12 0%, #0c0205 100%)',
    preview: '#2a0b12',
  },
  {
    id: 'grad_ivory',
    name: 'Champagne Ivory Velvet',
    gradient: 'linear-gradient(180deg, #FAF8F5 0%, #E8DFC8 100%)',
    preview: '#FAF8F5',
  },
];

// 3. Cultural & Luxury Transparent PNG / Vector Assets (SVG Data URIs for razor-sharp rendering)
export const LUXURY_PNG_PRESETS: PngPreset[] = [
  {
    id: 'gunungan_emas',
    name: 'Gunungan Wayang Emas',
    category: 'Adat Jawa',
    defaultScale: 100,
    defaultOpacity: 45,
    previewUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 160"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="%23FFF4BE"/><stop offset="50" stop-color="%23DFB051"/><stop offset="100" stop-color="%23A87723"/></linearGradient></defs><path d="M50 4 C42 22 28 42 14 74 C6 92 4 116 12 134 C16 142 26 146 38 146 L44 146 L44 156 L56 156 L56 146 L62 146 C74 146 84 142 88 134 C96 116 94 92 86 74 C72 42 58 22 50 4 Z" fill="url(%23g)" fill-opacity="0.25" stroke="url(%23g)" stroke-width="2"/><path d="M50 18 L50 142 M35 70 Q50 85 65 70 M25 100 Q50 120 75 100" stroke="url(%23g)" stroke-width="1.5" fill="none"/></svg>'
  },
  {
    id: 'suntiang_emas',
    name: 'Suntiang Gadang Minang',
    category: 'Adat Minang',
    defaultScale: 100,
    defaultOpacity: 50,
    previewUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 90"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="%23FFF4BE"/><stop offset="50" stop-color="%23DFB051"/><stop offset="100" stop-color="%23A87723"/></linearGradient></defs><path d="M70 6 C62 18 36 28 12 52 C28 48 48 56 70 78 C92 56 112 48 128 52 C104 28 78 18 70 6 Z" fill="url(%23g)" fill-opacity="0.3" stroke="url(%23g)" stroke-width="2"/><circle cx="70" cy="18" r="6" fill="url(%23g)"/><circle cx="50" cy="28" r="4.5" fill="url(%23g)"/><circle cx="90" cy="28" r="4.5" fill="url(%23g)"/><circle cx="34" cy="40" r="3.5" fill="url(%23g)"/><circle cx="106" cy="40" r="3.5" fill="url(%23g)"/></svg>'
  },
  {
    id: 'ronce_melati',
    name: 'Ronce Bunga Melati Emas',
    category: 'Floral',
    defaultScale: 95,
    defaultOpacity: 65,
    previewUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 40"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="%23FFF4BE"/><stop offset="50" stop-color="%23DFB051"/><stop offset="100" stop-color="%23A87723"/></linearGradient></defs><path d="M10 20 Q50 8 100 20 T190 20" stroke="url(%23g)" stroke-width="1.5" fill="none"/><circle cx="40" cy="16" r="5" fill="url(%23g)"/><circle cx="70" cy="22" r="6" fill="url(%23g)"/><circle cx="100" cy="20" r="8" fill="url(%23g)"/><circle cx="130" cy="22" r="6" fill="url(%23g)"/><circle cx="160" cy="16" r="5" fill="url(%23g)"/></svg>'
  },
  {
    id: 'botanical_palm',
    name: 'Monstera & Palm Foil Emas',
    category: 'Modern',
    defaultScale: 100,
    defaultOpacity: 45,
    previewUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="%23FFF4BE"/><stop offset="50" stop-color="%23DFB051"/><stop offset="100" stop-color="%23A87723"/></linearGradient></defs><path d="M50 110 Q50 60 85 20 C70 40 55 45 48 30 C45 48 30 52 18 35 C32 60 48 70 50 110 Z" fill="url(%23g)" fill-opacity="0.3" stroke="url(%23g)" stroke-width="1.8"/></svg>'
  },
  {
    id: 'sudut_ornamen',
    name: 'Sudut Arabesque Barok Emas',
    category: 'Modern',
    defaultScale: 90,
    defaultOpacity: 60,
    previewUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="%23FFF4BE"/><stop offset="50" stop-color="%23DFB051"/><stop offset="100" stop-color="%23A87723"/></linearGradient></defs><path d="M6 74 L6 6 L74 6 M6 6 L28 28 M12 6 C12 24 24 36 42 36 M6 12 C24 12 36 24 36 42" stroke="url(%23g)" stroke-width="2" fill="none"/><circle cx="6" cy="6" r="3" fill="url(%23g)"/></svg>'
  },
  {
    id: 'logo_harinikah',
    name: 'Logo HariNikah Emas Murni',
    category: 'Branding',
    defaultScale: 100,
    defaultOpacity: 75,
    previewUrl: '/assets/logo-harinikah-gold.png'
  }
];

// 4. Divider Style Options
export const DIVIDER_STYLES = [
  { id: 'gold_hairline', name: 'Gold Hairline & Diamond', desc: 'Garis tipis emas dengan aksen berlian di tengah' },
  { id: 'batik', name: 'Batik Parang Keraton', desc: 'Motif ornamen parang kemegahan adat Jawa' },
  { id: 'minang', name: 'Ukiran Minangkabau', desc: 'Khas ornamen rumah gadang Sumatera Barat' },
  { id: 'melati', name: 'Ronce Untaian Melati', desc: 'Kuncup melati suci lambang kesucian cinta' },
  { id: 'dashed', name: 'Garis Putus Emas Mewah', desc: 'Garis putus-putus modern minimalis' },
] as const;

// 5. Spacer Height Presets
export const SPACER_PRESETS = [
  { height: 8, label: 'Mikro (8px)' },
  { height: 16, label: 'Kompak (16px)' },
  { height: 24, label: 'Normal (24px)' },
  { height: 36, label: 'Sedang (36px)' },
  { height: 48, label: 'Luas (48px)' },
  { height: 64, label: 'Jumbo (64px)' },
];

// 6. Font Size Presets for Typography
export const FONT_SIZE_PRESETS = [
  { size: 12, label: 'Kecil (12px)' },
  { size: 15, label: 'Normal (15px)' },
  { size: 20, label: 'Subjudul (20px)' },
  { size: 28, label: 'Judul (28px)' },
  { size: 38, label: 'Jumbo (38px)' },
];

// 7. Elementor-like Container Padding Options
export const CONTAINER_PADDING_OPTIONS = [
  { id: 'compact', label: 'Rapat (12px)', class: 'p-3' },
  { id: 'normal', label: 'Standar (24px)', class: 'p-6' },
  { id: 'relaxed', label: 'Bernafas (36px)', class: 'p-9' },
] as const;

// 8. Elementor-like Container Corner Radius Options
export const CONTAINER_RADIUS_OPTIONS = [
  { id: 'sm', label: 'Sudut Tajam', class: 'rounded-lg' },
  { id: 'md', label: 'Rounded Sedang', class: 'rounded-2xl' },
  { id: '2xl', label: 'Lengkung Elegan', class: 'rounded-3xl' },
  { id: '3xl', label: 'Kurva Maksimal', class: 'rounded-[40px]' },
] as const;

