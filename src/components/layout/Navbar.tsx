'use client';

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Layers, 
  Menu, 
  X, 
  ArrowRight,
  Sun,
  Moon
} from 'lucide-react';
import { useInvitation } from '../../context/InvitationContext';

interface NavbarProps {
  onOpenAuth: () => void;
  onOpenSampleModal: () => void;
  onOpenEditor: () => void;
  onOpenDiscount?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenAuth, 
  onOpenSampleModal, 
  onOpenEditor,
  onOpenDiscount
}) => {
  const { themeMode, toggleThemeMode } = useInvitation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isLight = themeMode === 'light';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full font-sans transition-all duration-300">
      
      {/* 1. ULTRA-SLEEK TOP ANNOUNCEMENT BAR */}
      <div className={`border-b text-[11px] py-1 px-4 text-center transition-colors ${
        isLight
          ? 'bg-[#F5EFE6] border-[#E8DEC8] text-stone-700'
          : 'bg-[#020b0a] border-gold-subtle text-stone-300'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden md:flex items-center gap-2 font-medium">
            <Sparkles className="w-3 h-3 text-gold-400" />
            <span className={isLight ? 'text-amber-800' : 'text-gold-300'}>
              HariNikah • Platform Undangan Digital & Cetak Fisik Mewah
            </span>
          </div>

          <div className="mx-auto md:mx-0 flex items-center gap-2">
            <span>
              Pesan Undangan Fisik &gt;200 pcs, <strong className={isLight ? 'text-amber-800' : 'text-gold-300'}>GRATIS</strong> Undangan Web Premium.
            </span>
            <button
              onClick={onOpenDiscount || onOpenSampleModal}
              className="text-amber-600 hover:underline font-semibold ml-1 cursor-pointer"
            >
              Klaim Promo
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-3 text-[10px] text-stone-500">
            <span>Studio Desain: Bandar Lampung</span>
            <span>•</span>
            <span className={isLight ? 'text-amber-700' : 'text-gold-300'}>WA: 0812-3456-7890</span>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER NAVIGATION BAR */}
      <nav className={`w-full transition-all duration-300 ${
        isLight
          ? scrolled
            ? 'bg-white/95 backdrop-blur-xl border-b border-[#E5DAC6] shadow-md py-3'
            : 'bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E5DAC6] py-3.5'
          : scrolled 
            ? 'bg-[#041514]/95 backdrop-blur-xl border-b border-gold-400/30 shadow-2xl py-3' 
            : 'bg-[#041514]/90 backdrop-blur-md border-b border-gold-subtle py-3.5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* BRAND LOGO */}
            <a href="#" className="flex items-center gap-2 flex-shrink-0 group">
              <img
                src="/assets/logo-harinikah-gold.png"
                alt="Hari Nikah"
                className="h-9 sm:h-10 w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(223,176,81,0.35)] group-hover:scale-102 transition-transform"
              />
            </a>

            {/* DESKTOP LINKS: Modern Sans-Serif, compact, single-line, zero wrapping */}
            <div className={`hidden lg:flex items-center gap-6 xl:gap-8 text-xs font-semibold whitespace-nowrap ${
              isLight ? 'text-stone-700' : 'text-stone-300'
            }`}>
              <a href="#digital" className="hover:text-amber-600 transition-colors">
                Undangan Web
              </a>
              <a href="/broadcast" className="hover:text-emerald-500 transition-colors flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className={isLight ? 'text-emerald-700' : 'text-emerald-300'}>Broadcast WA</span>
              </a>
              <a 
                href="https://shopee.co.id/harinikah_official" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-3 py-1 rounded-full bg-gradient-to-r from-[#EE4D2D] to-[#F05537] hover:brightness-110 text-white text-[11px] font-bold shadow-sm shadow-[#EE4D2D]/35 transition-all hover:scale-105 flex items-center gap-1.5"
              >
                <span>Shopee Store 🛍️</span>
              </a>
              <a href="#katalog" className="hover:text-amber-600 transition-colors">
                Katalog
              </a>
              <a href="#harga" className="hover:text-amber-600 transition-colors">
                Harga
              </a>
              <a href="/about" className="hover:text-amber-600 transition-colors">
                Tentang Kami
              </a>
            </div>

            {/* RIGHT ACTIONS */}
            <div className="hidden md:flex items-center gap-3.5 flex-shrink-0">
              
              {/* Theme Mode Toggle (Sun ☀️ / Moon 🌙) */}
              <button
                onClick={toggleThemeMode}
                className={`p-2 rounded-full border text-xs font-medium transition-colors flex items-center gap-1.5 ${
                  isLight
                    ? 'bg-amber-100/60 border-amber-300/80 text-amber-900 hover:bg-amber-200/80'
                    : 'bg-white/5 border-gold-subtle text-gold-300 hover:bg-white/10'
                }`}
                title={isLight ? 'Ganti ke Mode Gelap (Emerald)' : 'Ganti ke Mode Terang (Champagne Ivory)'}
              >
                {isLight ? <Moon className="w-3.5 h-3.5 text-amber-800" /> : <Sun className="w-3.5 h-3.5 text-gold-400" />}
                <span className="text-[11px] font-semibold">{isLight ? 'Mode Gelap' : 'Mode Terang'}</span>
              </button>

              <a
                href="/profile"
                className={`text-xs font-medium transition-colors whitespace-nowrap ${
                  isLight ? 'text-stone-700 hover:text-amber-700' : 'text-stone-300 hover:text-gold-300'
                }`}
              >
                Akun Saya
              </a>

              <button
                onClick={onOpenAuth}
                className={`text-xs font-medium transition-colors whitespace-nowrap ${
                  isLight ? 'text-stone-700 hover:text-stone-900' : 'text-stone-300 hover:text-white'
                }`}
              >
                Masuk
              </button>

              {/* Primary CTA Button */}
              <button
                onClick={onOpenEditor}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-amber-400 via-gold-300 to-amber-500 text-black font-semibold text-xs shadow-gold-sm hover:scale-105 active:scale-95 transition-all whitespace-nowrap"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Buka Editor</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* MOBILE TRIGGER */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                onClick={toggleThemeMode}
                className={`p-1.5 rounded-full border text-xs ${
                  isLight ? 'bg-amber-100 border-amber-300 text-amber-900' : 'bg-white/5 border-gold-subtle text-gold-300'
                }`}
              >
                {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </button>

              <button
                onClick={onOpenEditor}
                className="px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-gold-400 text-black font-semibold text-[11px] shadow-gold-sm"
              >
                Editor
              </button>
              
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-1.5 rounded-lg transition-colors ${
                  isLight ? 'text-stone-800 hover:bg-stone-200' : 'text-stone-300 hover:text-white hover:bg-white/10'
                }`}
                aria-label="Toggle navigation"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-gold-400" />}
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* 3. MOBILE MENU DRAWER */}
      {mobileMenuOpen && (
        <div className={`lg:hidden border-b px-4 pt-3 pb-5 shadow-2xl space-y-2 text-xs font-medium ${
          isLight ? 'bg-[#FAF8F5] border-[#E5DAC6] text-stone-800' : 'bg-[#031110] border-gold-subtle text-stone-300'
        }`}>
          <button
            onClick={() => { setMobileMenuOpen(false); onOpenEditor(); }}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-gold-400 text-black font-bold text-xs shadow-gold-sm flex items-center justify-center gap-2 mb-2"
          >
            <Layers className="w-4 h-4" />
            <span>Mulai Desain di Studio Editor Pro</span>
          </button>

          <a href="#digital" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded-lg hover:bg-black/5">
            Undangan Digital Interaktif
          </a>
          <a href="/broadcast" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded-lg hover:bg-black/5 text-emerald-600 font-semibold">
            Broadcast WhatsApp (Kirim Tamu)
          </a>
          <a 
            href="https://shopee.co.id/harinikah_official" 
            target="_blank" 
            rel="noopener noreferrer" 
            onClick={() => setMobileMenuOpen(false)} 
            className="block py-2 px-3 rounded-lg hover:bg-black/5 text-[#EE4D2D] font-semibold"
          >
            Shopee Official Store 🛍️
          </a>
          <a href="#katalog" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded-lg hover:bg-black/5">
            Katalog Desain
          </a>
          <a href="#harga" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded-lg hover:bg-black/5">
            Pilihan Harga & Paket
          </a>
          <a href="/about" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded-lg hover:bg-black/5">
            Tentang HariNikah
          </a>

          <div className="pt-2 border-t border-black/10 flex items-center justify-between">
            <a
              href="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-amber-700 font-bold"
            >
              Akun Saya (Profil)
            </a>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenAuth(); }}
              className="py-2 font-semibold"
            >
              Masuk Akun
            </button>
          </div>
        </div>
      )}

    </header>
  );
};
