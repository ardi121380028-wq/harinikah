'use client';

import React from 'react';

// ============================================================================
// 1. ADAT JAWA ORNAMENTS
// ============================================================================

// High-Resolution Intricate Javanese Gunungan Wayang (Kayon / Pohon Hayat)
export const GununganWayang: React.FC<{ className?: string; isLight?: boolean }> = ({ 
  className = 'w-16 h-24', 
  isLight = false 
}) => (
  <svg
    viewBox="0 0 100 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="goldGununganGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF4BE" />
        <stop offset="30%" stopColor="#DFB051" />
        <stop offset="65%" stopColor="#A87723" />
        <stop offset="100%" stopColor="#F5D77F" />
      </linearGradient>
      <filter id="goldGlowGunungan" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="1.5" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    
    {/* Outer Sacred Arch */}
    <path
      d="M50 4 C42 22, 28 42, 14 74 C6 92, 4 116, 12 134 C16 142, 26 146, 38 146 L44 146 L44 156 L56 156 L56 146 L62 146 C74 146, 84 142, 88 134 C96 116, 94 92, 86 74 C72 42, 58 22, 50 4 Z"
      stroke="url(#goldGununganGrad)"
      strokeWidth="2.4"
      fill="url(#goldGununganGrad)"
      fillOpacity={isLight ? "0.15" : "0.08"}
      filter="url(#goldGlowGunungan)"
    />

    {/* Inner Border Ridge */}
    <path
      d="M50 10 C44 26, 32 44, 19 75 C12 91, 10 113, 17 130 C20 137, 28 141, 39 141 L61 141 C72 141, 80 137, 83 130 C90 113, 88 91, 81 75 C68 44, 56 26, 50 10 Z"
      stroke="url(#goldGununganGrad)"
      strokeWidth="1"
      strokeDasharray="2 2"
      fill="none"
    />

    {/* Pohon Hayat (Tree of Life Stem & Branches) */}
    <path
      d="M50 18 L50 142"
      stroke="url(#goldGununganGrad)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    
    {/* Meru Gate / Gapura Paduraksa at bottom */}
    <path
      d="M38 142 L38 124 L62 124 L62 142"
      stroke="url(#goldGununganGrad)"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M42 124 L42 108 C42 104, 58 104, 58 108 L58 124"
      stroke="url(#goldGununganGrad)"
      strokeWidth="1.4"
    />
    <path d="M50 108 L50 124" stroke="url(#goldGununganGrad)" strokeWidth="1" />

    {/* Sacred Spiral Branches */}
    <path
      d="M50 46 C36 48, 24 64, 25 80 C26 92, 36 96, 44 92 C48 90, 50 84, 48 80 C46 76, 40 76, 38 80"
      stroke="url(#goldGununganGrad)"
      strokeWidth="1.4"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M50 46 C64 48, 76 64, 75 80 C74 92, 64 96, 56 92 C52 90, 50 84, 52 80 C54 76, 60 76, 62 80"
      stroke="url(#goldGununganGrad)"
      strokeWidth="1.4"
      strokeLinecap="round"
      fill="none"
    />

    {/* Upper Foliage Spirals */}
    <path
      d="M50 32 C40 34, 32 46, 34 56 C36 62, 44 62, 46 58"
      stroke="url(#goldGununganGrad)"
      strokeWidth="1.2"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M50 32 C60 34, 68 46, 66 56 C64 62, 56 62, 54 58"
      stroke="url(#goldGununganGrad)"
      strokeWidth="1.2"
      strokeLinecap="round"
      fill="none"
    />

    {/* Crown Bindu Jewel */}
    <circle cx="50" cy="18" r="3" fill="url(#goldGununganGrad)" />
    <circle cx="50" cy="28" r="2" fill="url(#goldGununganGrad)" />
  </svg>
);

// Javanese Keraton Classical Corner Filigree (Sudut Ukiran Jepara/Keraton)
export const JawaCornerOrnament: React.FC<{ 
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}> = ({ position = 'top-left', className = 'w-14 h-14' }) => {
  const transform = {
    'top-left': 'scale(1, 1)',
    'top-right': 'scale(-1, 1)',
    'bottom-left': 'scale(1, -1)',
    'bottom-right': 'scale(-1, -1)',
  }[position];

  return (
    <svg
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ transform, transformOrigin: 'center center' }}
    >
      <defs>
        <linearGradient id="goldCornerJawa" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2B2" />
          <stop offset="50%" stopColor="#DFB051" />
          <stop offset="100%" stopColor="#9E7422" />
        </linearGradient>
      </defs>
      {/* Outer corner frame border */}
      <path d="M4 4 L56 4 M4 4 L4 56" stroke="url(#goldCornerJawa)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 8 L46 8 M8 8 L8 46" stroke="url(#goldCornerJawa)" strokeWidth="0.8" strokeDasharray="1.5 1.5" />
      {/* Intricate ukiran lung-lungan & daun patran */}
      <path
        d="M6 6 C16 16, 28 20, 38 14 C44 10, 42 6, 36 6 C30 6, 26 12, 30 18 C34 24, 46 22, 48 30 C50 36, 44 42, 38 40 C34 38, 36 32, 40 32"
        stroke="url(#goldCornerJawa)"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M6 6 C16 16, 20 28, 14 38 C10 44, 6 42, 6 36 C6 30, 12 26, 18 30 C24 34, 22 46, 30 48 C36 50, 42 44, 40 38 C38 34, 32 36, 32 40"
        stroke="url(#goldCornerJawa)"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="8" cy="8" r="2.5" fill="url(#goldCornerJawa)" />
      <circle cx="20" cy="20" r="1.5" fill="url(#goldCornerJawa)" />
    </svg>
  );
};

// Javanese Aksara / Batik Parang Divider
export const BatikParangDivider: React.FC<{ className?: string; isLight?: boolean }> = ({ 
  className = 'w-48 h-6',
  isLight = false 
}) => (
  <div className={`flex items-center justify-center gap-2 ${className}`}>
    <div className={`h-px flex-1 ${isLight ? 'bg-gradient-to-r from-transparent via-amber-700/50 to-amber-700' : 'bg-gradient-to-r from-transparent via-[#dfb051]/60 to-[#dfb051]'}`} />
    <span className={`font-serif text-sm px-1 font-bold ${isLight ? 'text-amber-900' : 'text-gold-300'}`}>ꦱꦒꦸꦁ</span>
    <div className={`h-px flex-1 ${isLight ? 'bg-gradient-to-l from-transparent via-amber-700/50 to-amber-700' : 'bg-gradient-to-l from-transparent via-[#dfb051]/60 to-[#dfb051]'}`} />
  </div>
);

// Javanese Sacred Kawung Motif Divider
export const KawungMotifDivider: React.FC<{ className?: string; isLight?: boolean }> = ({ 
  className = 'w-48 h-6',
  isLight = false 
}) => (
  <div className={`flex items-center justify-center gap-2 ${className}`}>
    <div className={`h-px flex-1 ${isLight ? 'bg-gradient-to-r from-transparent to-amber-600/70' : 'bg-gradient-to-r from-transparent to-gold-400/70'}`} />
    <svg viewBox="0 0 40 20" fill="none" className="w-10 h-5 flex-shrink-0">
      <defs>
        <linearGradient id="goldKawung" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2B2" />
          <stop offset="50%" stopColor="#DFB051" />
          <stop offset="100%" stopColor="#9E7422" />
        </linearGradient>
      </defs>
      <circle cx="20" cy="10" r="8" stroke="url(#goldKawung)" strokeWidth="1.2" fill="none" />
      <path d="M14 10 C14 6, 26 6, 26 10 C26 14, 14 14, 14 10 Z" stroke="url(#goldKawung)" strokeWidth="1" fill="none" />
      <path d="M20 4 C16 4, 16 16, 20 16 C24 16, 24 4, 20 4 Z" stroke="url(#goldKawung)" strokeWidth="1" fill="none" />
      <circle cx="20" cy="10" r="1.5" fill="url(#goldKawung)" />
    </svg>
    <div className={`h-px flex-1 ${isLight ? 'bg-gradient-to-l from-transparent to-amber-600/70' : 'bg-gradient-to-l from-transparent to-gold-400/70'}`} />
  </div>
);

// Ronce Melati Wedding Garland Motif
export const RonceMelatiDivider: React.FC<{ className?: string; isLight?: boolean }> = ({ 
  className = 'w-44 h-4',
  isLight = false 
}) => (
  <div className={`flex items-center justify-center gap-1.5 ${className}`}>
    <div className={`h-px flex-1 ${isLight ? 'bg-gradient-to-r from-transparent to-amber-600/50' : 'bg-gradient-to-r from-transparent to-amber-400/50'}`} />
    {[-2, -1, 0, 1, 2].map((i) => (
      <div
        key={i}
        className={`rounded-full shadow-sm ${
          isLight
            ? 'bg-gradient-to-b from-amber-500 to-amber-700'
            : 'bg-gradient-to-b from-amber-200 to-amber-500'
        } ${
          i === 0 ? 'w-2 h-2 ring-2 ring-amber-400/40' : 'w-1.5 h-1.5 opacity-80'
        }`}
      />
    ))}
    <div className={`h-px flex-1 ${isLight ? 'bg-gradient-to-l from-transparent to-amber-600/50' : 'bg-gradient-to-l from-transparent to-amber-400/50'}`} />
  </div>
);

// ============================================================================
// 2. ADAT MINANG ORNAMENTS
// ============================================================================

// High-Resolution Minang Suntiang Crown (Mahkota Pengantin Minang)
export const SuntiangMinang: React.FC<{ className?: string; isLight?: boolean }> = ({ 
  className = 'w-20 h-16',
  isLight = false 
}) => (
  <svg
    viewBox="0 0 160 110"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="goldSuntiangGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF4BE" />
        <stop offset="30%" stopColor="#E2B755" />
        <stop offset="70%" stopColor="#A47B25" />
        <stop offset="100%" stopColor="#F5D77F" />
      </linearGradient>
      <filter id="goldGlowSuntiang" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="1.5" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    
    {/* Suntiang Crown Base Arc */}
    <path
      d="M80 8 L80 96 M80 14 C68 20, 44 32, 22 56 C14 66, 12 78, 16 88 C24 94, 50 96, 80 96 C110 96, 136 94, 144 88 C148 78, 146 66, 138 56 C116 32, 92 20, 80 14 Z"
      stroke="url(#goldSuntiangGrad)"
      strokeWidth="2.2"
      fill="url(#goldSuntiangGrad)"
      fillOpacity={isLight ? "0.15" : "0.08"}
      filter="url(#goldGlowSuntiang)"
    />

    {/* Suntiang 7-Tier Arches (Tingkat Kembang Goyang) */}
    <path d="M40 76 C55 64, 105 64, 120 76" stroke="url(#goldSuntiangGrad)" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M32 60 C50 46, 110 46, 128 60" stroke="url(#goldSuntiangGrad)" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M48 40 C62 30, 98 30, 112 40" stroke="url(#goldSuntiangGrad)" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M60 25 C70 18, 90 18, 100 25" stroke="url(#goldSuntiangGrad)" strokeWidth="1.2" strokeLinecap="round" />

    {/* Jurai / Cascading side tassels */}
    <path d="M16 88 L12 104 M22 90 L20 102 M144 88 L148 104 M138 90 L140 102" stroke="url(#goldSuntiangGrad)" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="12" cy="105" r="2" fill="url(#goldSuntiangGrad)" />
    <circle cx="20" cy="103" r="1.5" fill="url(#goldSuntiangGrad)" />
    <circle cx="148" cy="105" r="2" fill="url(#goldSuntiangGrad)" />
    <circle cx="140" cy="103" r="1.5" fill="url(#goldSuntiangGrad)" />

    {/* Kembang Goyang Golden Florets */}
    <circle cx="80" cy="8" r="4" fill="url(#goldSuntiangGrad)" />
    <circle cx="65" cy="18" r="2.8" fill="url(#goldSuntiangGrad)" />
    <circle cx="95" cy="18" r="2.8" fill="url(#goldSuntiangGrad)" />
    <circle cx="50" cy="28" r="2.8" fill="url(#goldSuntiangGrad)" />
    <circle cx="110" cy="28" r="2.8" fill="url(#goldSuntiangGrad)" />
    <circle cx="35" cy="42" r="2.8" fill="url(#goldSuntiangGrad)" />
    <circle cx="125" cy="42" r="2.8" fill="url(#goldSuntiangGrad)" />
    <circle cx="24" cy="58" r="2.5" fill="url(#goldSuntiangGrad)" />
    <circle cx="136" cy="58" r="2.5" fill="url(#goldSuntiangGrad)" />

    {/* Base Band with Filigree Gems */}
    <rect x="25" y="88" width="110" height="8" rx="4" stroke="url(#goldSuntiangGrad)" strokeWidth="1.5" fill="none" />
    <circle cx="50" cy="92" r="1.5" fill="url(#goldSuntiangGrad)" />
    <circle cx="80" cy="92" r="2" fill="url(#goldSuntiangGrad)" />
    <circle cx="110" cy="92" r="1.5" fill="url(#goldSuntiangGrad)" />
  </svg>
);

// Minangkabau Rumah Gadang Gonjong Roof Silhouette
export const RumahGadangMotif: React.FC<{ className?: string; isLight?: boolean }> = ({ 
  className = 'w-24 h-12',
  isLight = false
}) => (
  <svg
    viewBox="0 0 120 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="goldGadang" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF2B2" />
        <stop offset="50%" stopColor="#E0B042" />
        <stop offset="100%" stopColor="#9E7422" />
      </linearGradient>
    </defs>
    {/* Curved Gonjong Roof Horns */}
    <path
      d="M6 34 C18 12, 28 6, 32 6 C34 16, 44 26, 60 26 C76 26, 86 16, 88 6 C92 6, 102 12, 114 34 L102 38 C94 28, 86 28, 60 28 C34 28, 26 28, 18 38 Z"
      stroke="url(#goldGadang)"
      strokeWidth="1.6"
      fill="url(#goldGadang)"
      fillOpacity="0.1"
      strokeLinejoin="round"
    />
    <path d="M32 6 L32 20 M88 6 L88 20" stroke="url(#goldGadang)" strokeWidth="1.2" />
    {/* Wall & Pillar Structure */}
    <rect x="26" y="38" width="68" height="14" rx="2" stroke="url(#goldGadang)" strokeWidth="1.4" fill="none" />
    <path d="M40 38 L40 52 M60 38 L60 52 M80 38 L80 52" stroke="url(#goldGadang)" strokeWidth="1" />
  </svg>
);

// Minang Pucuk Rebung Corner Ornament
export const MinangCornerOrnament: React.FC<{ 
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}> = ({ position = 'top-left', className = 'w-14 h-14' }) => {
  const transform = {
    'top-left': 'scale(1, 1)',
    'top-right': 'scale(-1, 1)',
    'bottom-left': 'scale(1, -1)',
    'bottom-right': 'scale(-1, -1)',
  }[position];

  return (
    <svg
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ transform, transformOrigin: 'center center' }}
    >
      <defs>
        <linearGradient id="goldCornerMinang" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF4BE" />
          <stop offset="50%" stopColor="#E2B755" />
          <stop offset="100%" stopColor="#A47B25" />
        </linearGradient>
      </defs>
      <path d="M4 4 L56 4 M4 4 L4 56" stroke="url(#goldCornerMinang)" strokeWidth="1.5" strokeLinecap="round" />
      {/* Pucuk Rebung Triangles */}
      <path d="M6 6 L20 6 L13 20 Z" stroke="url(#goldCornerMinang)" strokeWidth="1.2" fill="url(#goldCornerMinang)" fillOpacity="0.15" />
      <path d="M6 6 L6 20 L20 13 Z" stroke="url(#goldCornerMinang)" strokeWidth="1.2" fill="url(#goldCornerMinang)" fillOpacity="0.15" />
      {/* Diagonal Spire */}
      <path d="M8 8 L36 36 M12 8 L38 34 M8 12 L34 38" stroke="url(#goldCornerMinang)" strokeWidth="0.8" />
      {/* Saik Galamai Chevron motif */}
      <path d="M22 6 L32 16 L22 26" stroke="url(#goldCornerMinang)" strokeWidth="1.2" fill="none" />
      <path d="M6 22 L16 32 L26 22" stroke="url(#goldCornerMinang)" strokeWidth="1.2" fill="none" />
      <circle cx="36" cy="36" r="2" fill="url(#goldCornerMinang)" />
    </svg>
  );
};

// Minang Ukiran Itiak Pulang Patang Divider
export const MinangUkiranDivider: React.FC<{ className?: string; isLight?: boolean }> = ({ 
  className = 'w-48 h-6',
  isLight = false 
}) => (
  <div className={`flex items-center justify-center gap-2 ${className}`}>
    <div className={`h-px flex-1 ${isLight ? 'bg-gradient-to-r from-transparent to-red-800/60' : 'bg-gradient-to-r from-transparent via-[#e0b042]/60 to-[#e0b042]'}`} />
    <svg viewBox="0 0 50 16" fill="none" className="w-12 h-4 flex-shrink-0">
      <defs>
        <linearGradient id="goldItiak" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5D77F" />
          <stop offset="50%" stopColor="#E0B042" />
          <stop offset="100%" stopColor="#B3821A" />
        </linearGradient>
      </defs>
      {/* S-wave wave of Itiak Pulang Patang */}
      <path
        d="M2 12 C8 4, 14 4, 18 10 C22 16, 28 16, 32 10 C36 4, 42 4, 48 12"
        stroke="url(#goldItiak)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="10" cy="8" r="1.5" fill="url(#goldItiak)" />
      <circle cx="25" cy="8" r="2" fill="url(#goldItiak)" />
      <circle cx="40" cy="8" r="1.5" fill="url(#goldItiak)" />
    </svg>
    <div className={`h-px flex-1 ${isLight ? 'bg-gradient-to-l from-transparent to-red-800/60' : 'bg-gradient-to-l from-transparent via-[#e0b042]/60 to-[#e0b042]'}`} />
  </div>
);

// ============================================================================
// 3. MODERN LUXURY & BOTANICAL ORNAMENTS
// ============================================================================

// Modern Art-Deco / Luxury Corner Filigree
export const ModernCornerOrnament: React.FC<{ 
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}> = ({ position = 'top-left', className = 'w-14 h-14' }) => {
  const transform = {
    'top-left': 'scale(1, 1)',
    'top-right': 'scale(-1, 1)',
    'bottom-left': 'scale(1, -1)',
    'bottom-right': 'scale(-1, -1)',
  }[position];

  return (
    <svg
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ transform, transformOrigin: 'center center' }}
    >
      <defs>
        <linearGradient id="goldCornerModern" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2B2" />
          <stop offset="50%" stopColor="#DFB051" />
          <stop offset="100%" stopColor="#9E7422" />
        </linearGradient>
      </defs>
      <path d="M4 4 L56 4 M4 4 L4 56" stroke="url(#goldCornerModern)" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M8 8 L44 8 M8 8 L8 44" stroke="url(#goldCornerModern)" strokeWidth="0.8" />
      {/* Concentric Quarter Arcs */}
      <path d="M4 24 A20 20 0 0 0 24 4" stroke="url(#goldCornerModern)" strokeWidth="1.2" fill="none" />
      <path d="M4 36 A32 32 0 0 0 36 4" stroke="url(#goldCornerModern)" strokeWidth="1" strokeDasharray="2 2" fill="none" />
      <path d="M14 14 L28 28" stroke="url(#goldCornerModern)" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="28" cy="28" r="2" fill="url(#goldCornerModern)" />
    </svg>
  );
};

// Modern Botanical Gold Leaf Divider
export const BotanicalFoilDivider: React.FC<{ className?: string; isLight?: boolean }> = ({ 
  className = 'w-48 h-6',
  isLight = false 
}) => (
  <div className={`flex items-center justify-center gap-2 ${className}`}>
    <div className={`h-px flex-1 ${isLight ? 'bg-gradient-to-r from-transparent to-amber-700/60' : 'bg-gradient-to-r from-transparent to-gold-400/60'}`} />
    <svg viewBox="0 0 60 20" fill="none" className="w-14 h-5 flex-shrink-0">
      <defs>
        <linearGradient id="goldLeaf" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2B2" />
          <stop offset="50%" stopColor="#DFB051" />
          <stop offset="100%" stopColor="#9E7422" />
        </linearGradient>
      </defs>
      {/* Stem */}
      <path d="M2 10 Q30 8, 58 10" stroke="url(#goldLeaf)" strokeWidth="1.2" strokeLinecap="round" />
      {/* Leaves */}
      <path d="M18 10 C16 4, 26 4, 28 9" stroke="url(#goldLeaf)" strokeWidth="1" fill="url(#goldLeaf)" fillOpacity="0.2" />
      <path d="M32 10 C34 16, 44 16, 42 11" stroke="url(#goldLeaf)" strokeWidth="1" fill="url(#goldLeaf)" fillOpacity="0.2" />
      <path d="M30 6 C28 2, 34 2, 36 6" stroke="url(#goldLeaf)" strokeWidth="0.8" fill="url(#goldLeaf)" />
      <circle cx="30" cy="10" r="1.5" fill="url(#goldLeaf)" />
    </svg>
    <div className={`h-px flex-1 ${isLight ? 'bg-gradient-to-l from-transparent to-amber-700/60' : 'bg-gradient-to-l from-transparent to-gold-400/60'}`} />
  </div>
);

// ============================================================================
// 4. GREEN LEAF BOTANICAL GARDEN & VINYL PLAYER ORNAMENTS
// ============================================================================

// Botanical Sage Corner Leaves Filigree
export const BotanicalCornerOrnament: React.FC<{ 
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}> = ({ position = 'top-left', className = 'w-14 h-14' }) => {
  const transform = {
    'top-left': 'scale(1, 1)',
    'top-right': 'scale(-1, 1)',
    'bottom-left': 'scale(1, -1)',
    'bottom-right': 'scale(-1, -1)',
  }[position];

  return (
    <svg
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ transform, transformOrigin: 'center center' }}
    >
      <defs>
        <linearGradient id="sageLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#DFE8DF" />
          <stop offset="50%" stopColor="#8DA390" />
          <stop offset="100%" stopColor="#4A5D4E" />
        </linearGradient>
      </defs>
      <path d="M4 4 L56 4 M4 4 L4 56" stroke="url(#sageLeafGrad)" strokeWidth="1.2" strokeLinecap="round" />
      {/* Botanical Tendril & Leaves */}
      <path
        d="M6 6 Q30 12, 38 4 M6 6 Q12 30, 4 38"
        stroke="url(#sageLeafGrad)"
        strokeWidth="1.2"
        fill="none"
      />
      <path d="M16 10 C18 4, 26 6, 24 12" stroke="url(#sageLeafGrad)" strokeWidth="1" fill="url(#sageLeafGrad)" fillOpacity="0.4" />
      <path d="M10 16 C4 18, 6 26, 12 24" stroke="url(#sageLeafGrad)" strokeWidth="1" fill="url(#sageLeafGrad)" fillOpacity="0.4" />
      <circle cx="28" cy="28" r="2" fill="url(#sageLeafGrad)" />
    </svg>
  );
};

// Victorian Scalloped Botanical Arched Window Frame (Green Leaf Signature)
export const BotanicalArchFrame: React.FC<{
  className?: string;
  isLight?: boolean;
  children?: React.ReactNode;
}> = ({ className = '', isLight = false, children }) => (
  <div className={`relative p-5 sm:p-6 rounded-[38px] border-2 backdrop-blur-md transition-all shadow-xl ${
    isLight 
      ? 'bg-[#F4F7F4]/90 border-[#A2B5A5]/60 text-stone-900 shadow-sage-950/10' 
      : 'bg-[#1C261F]/85 border-[#758E79]/50 text-stone-100 shadow-2xl'
  } ${className}`}>
    {/* Top Ornate Arch Crest Accent */}
    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-[#8DA390] via-[#D4AF37] to-[#8DA390] text-[9px] font-black uppercase tracking-[0.25em] text-stone-900 shadow-md flex items-center gap-1.5 z-10">
      <span>🌿</span>
      <span>Green Leaf</span>
      <span>🌿</span>
    </div>

    {/* Arched Inner Border Ridge */}
    <div className={`absolute inset-2 rounded-[32px] border border-dashed pointer-events-none ${
      isLight ? 'border-[#8DA390]/50' : 'border-[#A2B5A5]/30'
    }`} />

    {children}
  </div>
);

// Interactive Rotating Vinyl Disc Audio Player Badge (as seen in screenshots 2, 3, 4)
export const VinylMusicBadge: React.FC<{
  isPlaying: boolean;
  onToggle: () => void;
  className?: string;
}> = ({ isPlaying, onToggle, className = '' }) => (
  <button
    onClick={onToggle}
    type="button"
    title={isPlaying ? 'Jeda Musik' : 'Putar Musik'}
    className={`group relative flex items-center justify-center cursor-pointer transition-transform hover:scale-110 active:scale-95 z-30 ${className}`}
  >
    {/* Vinyl Outer Disc */}
    <div className={`w-11 h-11 rounded-full bg-[#111] border-2 border-stone-800 shadow-2xl flex items-center justify-center relative overflow-hidden ${
      isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''
    }`}>
      {/* Grooves */}
      <div className="absolute inset-1 rounded-full border border-stone-700/60" />
      <div className="absolute inset-2.5 rounded-full border border-stone-600/40" />
      <div className="absolute inset-4 rounded-full border border-stone-700/60" />
      
      {/* Center Label (Pink/Gold Satin) */}
      <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-rose-500 via-amber-400 to-rose-600 border border-white/80 flex items-center justify-center shadow-inner">
        <div className="w-1 h-1 rounded-full bg-[#111]" />
      </div>
    </div>

    {/* Music Note Floating Particle when playing */}
    {isPlaying && (
      <span className="absolute -top-1 -right-1 text-xs animate-bounce pointer-events-none">
        🎵
      </span>
    )}
  </button>
);

// Full Card Luxury Filigree Border with 4 Corner Accents
export const CardFrameBorder: React.FC<{ 
  template?: 'modern' | 'jawa' | 'minang' | 'botanical';
  isLight?: boolean;
}> = ({ template = 'modern', isLight = false }) => {
  const isJawa = template === 'jawa';
  const isMinang = template === 'minang';
  const isBotanical = template === 'botanical';

  return (
    <div className="absolute inset-2.5 sm:inset-3 pointer-events-none z-20">
      {/* 4 Corner Ornaments */}
      <div className="absolute top-0 left-0">
        {isJawa ? <JawaCornerOrnament position="top-left" className="w-10 h-10 sm:w-12 sm:h-12" /> :
         isMinang ? <MinangCornerOrnament position="top-left" className="w-10 h-10 sm:w-12 sm:h-12" /> :
         isBotanical ? <BotanicalCornerOrnament position="top-left" className="w-10 h-10 sm:w-12 sm:h-12" /> :
         <ModernCornerOrnament position="top-left" className="w-10 h-10 sm:w-12 sm:h-12" />}
      </div>
      <div className="absolute top-0 right-0">
        {isJawa ? <JawaCornerOrnament position="top-right" className="w-10 h-10 sm:w-12 sm:h-12" /> :
         isMinang ? <MinangCornerOrnament position="top-right" className="w-10 h-10 sm:w-12 sm:h-12" /> :
         isBotanical ? <BotanicalCornerOrnament position="top-right" className="w-10 h-10 sm:w-12 sm:h-12" /> :
         <ModernCornerOrnament position="top-right" className="w-10 h-10 sm:w-12 sm:h-12" />}
      </div>
      <div className="absolute bottom-0 left-0">
        {isJawa ? <JawaCornerOrnament position="bottom-left" className="w-10 h-10 sm:w-12 sm:h-12" /> :
         isMinang ? <MinangCornerOrnament position="bottom-left" className="w-10 h-10 sm:w-12 sm:h-12" /> :
         isBotanical ? <BotanicalCornerOrnament position="bottom-left" className="w-10 h-10 sm:w-12 sm:h-12" /> :
         <ModernCornerOrnament position="bottom-left" className="w-10 h-10 sm:w-12 sm:h-12" />}
      </div>
      <div className="absolute bottom-0 right-0">
        {isJawa ? <JawaCornerOrnament position="bottom-right" className="w-10 h-10 sm:w-12 sm:h-12" /> :
         isMinang ? <MinangCornerOrnament position="bottom-right" className="w-10 h-10 sm:w-12 sm:h-12" /> :
         isBotanical ? <BotanicalCornerOrnament position="bottom-right" className="w-10 h-10 sm:w-12 sm:h-12" /> :
         <ModernCornerOrnament position="bottom-right" className="w-10 h-10 sm:w-12 sm:h-12" />}
      </div>

      {/* Perimeter Inner Line */}
      <div className={`w-full h-full rounded-[36px] border ${
        isLight
          ? isJawa ? 'border-amber-700/30' : isMinang ? 'border-red-800/30' : isBotanical ? 'border-[#5A735E]/40' : 'border-amber-400/40'
          : isJawa ? 'border-[#c6923c]/30' : isMinang ? 'border-[#e0b042]/30' : isBotanical ? 'border-[#A2B5A5]/40' : 'border-[#dfb051]/30'
      }`} />
    </div>
  );
};
