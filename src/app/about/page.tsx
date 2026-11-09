'use client';

import React from 'react';
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  Sparkles,
  Heart,
  ShoppingBag,
  Award,
  Users,
  Sun,
  Moon
} from 'lucide-react';
import { useInvitation } from '../../context/InvitationContext';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function AboutPage() {
  const { themeMode, toggleThemeMode } = useInvitation();
  const isLight = themeMode === 'light';

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${isLight ? 'bg-[#FAF8F5] text-stone-900' : 'bg-[#041514] text-stone-100'
      }`}>

      {/* Top Header */}
      <header className={`border-b sticky top-0 z-40 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between ${isLight ? 'bg-white/90 border-[#E8DEC8]' : 'bg-[#041514]/90 border-gold-subtle'
        }`}>
        <div className="flex items-center gap-4">
          <a
            href="/"
            className={`p-2 rounded-full border transition-colors ${isLight ? 'border-amber-200 text-stone-700 hover:bg-stone-100' : 'border-gold-subtle text-stone-300 hover:bg-white/5'
              }`}
            title="Kembali ke Beranda"
          >
            <ArrowLeft className="w-4 h-4" />
          </a>
          <div className="flex items-center gap-2">
            <img src="/assets/logo-harinikah-gold.png" alt="HariNikah" className="h-8 w-auto" />
            <span className="text-xs uppercase font-extrabold tracking-widest px-2.5 py-0.5 rounded-full bg-gold-400/20 text-gold-300 border border-gold-400/40">
              Tentang Kami
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleThemeMode}
            className={`p-2 rounded-full border text-xs font-medium transition-colors ${isLight ? 'bg-amber-100 border-amber-300 text-amber-900' : 'bg-white/5 border-gold-subtle text-gold-300'
              }`}
          >
            {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
          <a
            href="/editor"
            className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-400 to-gold-400 text-black font-bold text-xs shadow-gold-sm hover:scale-105 transition-all"
          >
            Buka Editor
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 border-b border-black/10 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/30">
            Studio Desain & Platform Undangan Pernikahan Nusantara
          </span>
          <h1 className={`text-3xl sm:text-5xl font-serif font-bold ${isLight ? 'text-amber-900' : 'text-gold-bright'}`}>
            Merayakan Cinta dengan Kemegahan Tradisi & Inovasi Modern
          </h1>
          <p className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed ${isLight ? 'text-stone-600' : 'text-stone-300'}`}>
            HariNikah lahir di <strong>Bandar Lampung</strong> dari sebuah cita-cita: menghadirkan undangan pernikahan yang tidak hanya sekadar link biasa, melainkan mahakarya visual interaktif per-halaman layaknya Canva yang memuliakan adat luhur Nusantara.
          </p>
        </div>
      </section>

      {/* Values & Studio Details */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className={`p-8 rounded-3xl border space-y-3 ${isLight ? 'bg-white border-amber-200 shadow-sm' : 'bg-[#071f1e] border-gold-subtle'
            }`}>
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-500">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className={`text-lg font-bold font-serif ${isLight ? 'text-amber-900' : 'text-gold-300'}`}>
              Canva-Like Experience
            </h3>
            <p className={`text-xs leading-relaxed ${isLight ? 'text-stone-600' : 'text-stone-400'}`}>
              Sistem pengeditan multi-halaman yang fleksibel. Klik langsung teks di layar, atur foto prewedding, ubah urutan acara, dan sesuaikan tipografi tanpa kesulitan.
            </p>
          </div>

          <div className={`p-8 rounded-3xl border space-y-3 ${isLight ? 'bg-white border-amber-200 shadow-sm' : 'bg-[#071f1e] border-gold-subtle'
            }`}>
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-500">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className={`text-lg font-bold font-serif ${isLight ? 'text-amber-900' : 'text-gold-300'}`}>
              Autentisitas Adat Nusantara
            </h3>
            <p className={`text-xs leading-relaxed ${isLight ? 'text-stone-600' : 'text-stone-400'}`}>
              Kekayaan ornamen gunungan Jawa, suntiang Minang, dan tapis Lampung dipadukan dengan alunan musik gamelan dan saluang syahdu yang diputar otomatis.
            </p>
          </div>

          <div className={`p-8 rounded-3xl border space-y-3 ${isLight ? 'bg-white border-amber-200 shadow-sm' : 'bg-[#071f1e] border-gold-subtle'
            }`}>
            <div className="w-12 h-12 rounded-2xl bg-[#EE4D2D]/20 border border-[#EE4D2D]/40 flex items-center justify-center text-[#EE4D2D]">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-serif text-[#EE4D2D]">
              Toko Resmi Shopee
            </h3>
            <p className={`text-xs leading-relaxed ${isLight ? 'text-stone-600' : 'text-stone-400'}`}>
              Untuk produksi fisik berbalut beludru, kalkir, dan hotprint foil emas, kami bermitra resmi di Shopee untuk memastikan jaminan transaksi 100% aman dan bergaransi.
            </p>
          </div>
        </div>

        {/* Studio Location & Social Media */}
        <div className={`p-8 sm:p-12 rounded-3xl border relative overflow-hidden ${isLight ? 'bg-gradient-to-br from-white to-[#F5EFE6] border-amber-300/80 shadow-md' : 'bg-[#072422] border-gold-400/40 shadow-velvet-deep'
          }`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-500">
                Pusat Kreatif & Studio Produksi
              </span>
              <h2 className={`text-2xl sm:text-3xl font-serif font-bold ${isLight ? 'text-stone-900' : 'text-gold-bright'}`}>
                Studio HariNikah Bandar Lampung
              </h2>
              <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-stone-600' : 'text-stone-300'}`}>
                Seluruh pengembangan aplikasi web, perakitan desain template adat, dan produksi cetak hotprint foil emas dikerjakan dengan penuh dedikasi oleh tim kreatif kami di Bandar Lampung.
              </p>

              <div className="space-y-2.5 pt-2 text-xs">
                <p className="flex items-start gap-2 text-stone-300">
                  <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span>Jl. Gatot Subroto No. 88, Pahoman, Enggal, Kota Bandar Lampung, Lampung 35213</span>
                </p>
                <p className="flex items-center gap-2 text-stone-300">
                  <Phone className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span>WhatsApp: +62 812-3456-7890</span>
                </p>
                <p className="flex items-center gap-2 text-stone-300">
                  <Mail className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span>Email: halo@harinikah.com</span>
                </p>
              </div>

              {/* Social Media Links */}
              <div className="pt-4 flex items-center gap-3">
                <a
                  href="https://instagram.com/harinikah_id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs flex items-center gap-1.5 shadow hover:scale-105 transition-all"
                >
                  <InstagramIcon className="w-3.5 h-3.5" />
                  <span>@harinikah_id</span>
                </a>
                <a
                  href="https://shopee.co.id/harinikah_official"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#EE4D2D] hover:bg-[#D73211] text-white font-bold text-xs flex items-center gap-1.5 shadow hover:scale-105 transition-all"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Shopee Official</span>
                </a>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/20 aspect-video lg:aspect-square">
              <img
                src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80"
                alt="Studio HariNikah Bandar Lampung"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

      </main>

    </div>
  );
}
