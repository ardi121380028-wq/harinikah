'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Eye, Heart, Check, Star, ArrowRight, ExternalLink } from 'lucide-react';
import { useInvitation } from '../../context/InvitationContext';
import { CATALOG_THEMES } from '../../constants/initialData';

interface CatalogSectionProps {
  onSelectTheme: (themeName: string) => void;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({ onSelectTheme }) => {
  const { themeMode } = useInvitation();
  const isLight = themeMode === 'light';

  const [activeCategory, setActiveCategory] = useState<string>('Semua');

  const categories = ['Semua', 'Botanical Sage', 'Velvet Luxury', 'Adat Tradisional', 'Minimalist Modern'];

  const filteredThemes = activeCategory === 'Semua' 
    ? CATALOG_THEMES 
    : CATALOG_THEMES.filter(t => t.category === activeCategory);

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
            Katalog Desain Eksklusif
          </span>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 ${
            isLight ? 'text-stone-900' : 'text-white'
          }`}>
            Koleksi Tema Mewah & Abadi
          </h2>
          <p className={`text-sm sm:text-base mt-3 ${
            isLight ? 'text-stone-600' : 'text-stone-300'
          }`}>
            Setiap desain dibuat dengan ketelitian tinggi oleh tim desainer senior, siap dikustomisasi langsung di Studio Editor Pro maupun dicetak dengan material fisik premium.
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
          {filteredThemes.map((theme) => {
            const detailUrl = `/katalog/${theme.slug || 'green-leaf'}`;
            const demoUrl = `/dimas-clarissa?theme=${theme.templateKey || 'modern'}&to=Bapak+Budi`;

            return (
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

                  {/* Hover Quick Action Buttons */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2.5 p-4">
                    <Link
                      href={detailUrl}
                      className="w-44 py-2 bg-white text-stone-950 text-xs font-bold rounded-full shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Lihat Detail Produk
                    </Link>
                    <Link
                      href={demoUrl}
                      target="_blank"
                      className="w-44 py-2 bg-gradient-to-r from-amber-500 to-gold-400 text-stone-950 text-xs font-bold rounded-full shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-1.5"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Lihat Demo Live
                    </Link>
                  </div>
                </div>

                {/* Card Meta */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider">{theme.category}</span>
                      <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{theme.rating || 5.0}</span>
                        <span className="text-stone-400 text-[10px]">({theme.salesCount || 28} Terjual)</span>
                      </div>
                    </div>

                    <Link href={detailUrl}>
                      <h3 className={`text-xl font-bold mt-1 hover:text-amber-500 transition-colors ${
                        isLight ? 'text-stone-900' : 'text-white'
                      }`}>
                        {theme.name}
                      </h3>
                    </Link>

                    <p className={`text-xs mt-2 leading-relaxed line-clamp-2 ${isLight ? 'text-stone-600' : 'text-stone-400'}`}>
                      {theme.description}
                    </p>

                    {/* Price Tag */}
                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="text-lg font-extrabold text-amber-500">
                        Rp {(theme.price || 113400).toLocaleString('id-ID')}
                      </span>
                      {theme.originalPrice && (
                        <span className="text-xs text-stone-400 line-through">
                          Rp {theme.originalPrice.toLocaleString('id-ID')}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className={`mt-5 pt-4 border-t flex items-center justify-between ${
                    isLight ? 'border-stone-200' : 'border-gold-subtle'
                  }`}>
                    <Link
                      href={detailUrl}
                      className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 group/btn"
                    >
                      <span>Detail & Preview</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>

                    <button
                      onClick={() => onSelectTheme(theme.name)}
                      className="px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-500 hover:bg-amber-400/20 text-xs font-bold transition-colors"
                    >
                      Buka di Editor
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
