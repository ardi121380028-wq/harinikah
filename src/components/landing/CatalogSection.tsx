'use client';

import React, { useState } from 'react';
import { Eye, Heart, Check } from 'lucide-react';
import { useInvitation } from '@/context/InvitationContext';

interface CatalogSectionProps {
  onSelectTheme: (themeName: string) => void;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({ onSelectTheme }) => {
  const { themeMode } = useInvitation();
  const isLight = themeMode === 'light';

  const [activeCategory, setActiveCategory] = useState<string>('Semua');

  const categories = ['Semua', 'Velvet Luxury', 'Minimalis', 'Floral', 'Adat Tradisional', 'Islami'];

  const themes = [
    {
      id: 1,
      name: "Royal Emerald Velvet",
      category: "Velvet Luxury",
      tag: "Best Seller",
      image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80",
      description: "Nuansa dark teal velvet berpadu hotprint emas murni dan amplop kalkir vellum.",
      type: "Digital & Fisik"
    },
    {
      id: 2,
      name: "Adat Jawa Kasunanan (Sogan Prada)",
      category: "Adat Tradisional",
      tag: "Budaya Nusantara",
      image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80",
      description: "Coklat Sogan Keraton, ornamen Gunungan Wayang emas, tata upacara Siraman & Panggih, serta alunan Gamelan Pelog.",
      type: "Digital & Fisik"
    },
    {
      id: 3,
      name: "Adat Minang Baralek Gadang",
      category: "Adat Tradisional",
      tag: "Budaya Nusantara",
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80",
      description: "Merah Marun Marawa, Mahkota Suntiang Minang bertingkat emas, pepatah adat Minang, dan melodi Saluang jo Talempong.",
      type: "Digital & Fisik"
    },
    {
      id: 4,
      name: "Serenata Rose & Gold",
      category: "Floral",
      tag: "Elegan",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80",
      description: "Nuansa floral romantis berpadu warna rose gold dan tipografi serif elegan.",
      type: "Digital & Fisik"
    },
    {
      id: 5,
      name: "Pure Ivory Minimalist",
      category: "Minimalis",
      tag: "Modern",
      image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=600&q=80",
      description: "Desain clean dengan ruang lapang champagne, fokus pada keindahan foto prewedding.",
      type: "Digital"
    },
    {
      id: 6,
      name: "Barakah Emerald",
      category: "Islami",
      tag: "Islami",
      image: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=600&q=80",
      description: "Sentuhan hijau zamrud dengan ornamen kaligrafi doa dan ayat suci pernikahan.",
      type: "Digital & Fisik"
    }
  ];

  const filteredThemes = activeCategory === 'Semua' 
    ? themes 
    : themes.filter(t => t.category === activeCategory);

  return (
    <section className={`py-20 lg:py-28 transition-colors duration-300 ${
      isLight ? 'bg-[#F5EFE6]' : 'bg-[#041514]'
    }`} id="katalog">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className={`text-xs uppercase font-extrabold tracking-widest px-3.5 py-1 rounded-full border shadow-sm ${
            isLight
              ? 'text-amber-900 bg-amber-100 border-amber-300'
              : 'text-gold-300 bg-gold-950/80 border-gold-subtle'
          }`}>
            Katalog Desain
          </span>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 ${
            isLight ? 'text-stone-900' : 'text-white'
          }`}>
            Koleksi Tema Mewah & Abadi
          </h2>
          <p className={`text-sm sm:text-base mt-3 ${
            isLight ? 'text-stone-600' : 'text-stone-300'
          }`}>
            Setiap desain dibuat dengan ketelitian tinggi oleh desainer profesional, siap diedit per-halaman di Canva Editor kami maupun dicetak fisik.
          </p>

          {/* Category Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-amber-500 to-gold-400 text-black shadow-sm font-bold'
                    : isLight
                    ? 'bg-white text-stone-700 hover:bg-stone-100 border border-[#E8DEC8]'
                    : 'bg-[#061e1d] text-stone-300 hover:bg-white/10 border border-gold-subtle'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Themes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredThemes.map((theme) => (
            <div 
              key={theme.id}
              className={`rounded-3xl overflow-hidden border shadow-xl flex flex-col group transition-all duration-300 ${
                isLight
                  ? 'bg-white border-[#E8DEC8] hover:border-amber-400 shadow-amber-950/5'
                  : 'bg-[#061e1d] border-gold-subtle hover:border-gold-400 shadow-velvet-deep'
              }`}
            >
              {/* Image Preview with Overlay */}
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-900">
                <img
                  src={theme.image}
                  alt={theme.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Badge Tag */}
                <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-gold-300 border border-gold-subtle">
                  {theme.tag}
                </div>

                <div className="absolute top-3 right-3 bg-gold-950/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-semibold text-white border border-gold-subtle">
                  {theme.type}
                </div>

                {/* Hover CTA Button Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 p-4">
                  <button
                    onClick={() => onSelectTheme(theme.name)}
                    className="px-4 py-2 bg-gradient-to-r from-amber-500 to-gold-400 text-black text-xs font-bold rounded-full shadow-gold-sm hover:scale-105 transition-all flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Buka di Editor
                  </button>
                </div>
              </div>

              {/* Card Meta */}
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider">{theme.category}</span>
                    <Heart className="w-4 h-4 text-stone-400 hover:text-amber-600 cursor-pointer transition-colors" />
                  </div>
                  <h3 className={`text-xl font-bold mt-1 ${isLight ? 'text-stone-900' : 'text-white'}`}>
                    {theme.name}
                  </h3>
                  <p className={`text-xs mt-2 leading-relaxed ${isLight ? 'text-stone-600' : 'text-stone-400'}`}>
                    {theme.description}
                  </p>
                </div>

                <div className={`mt-5 pt-4 border-t flex items-center justify-between ${
                  isLight ? 'border-stone-200' : 'border-gold-subtle'
                }`}>
                  <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    Tersedia di semua paket
                  </span>
                  <button
                    onClick={() => onSelectTheme(theme.name)}
                    className="text-xs font-bold text-amber-600 hover:text-amber-700"
                  >
                    Pilih Desain →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
