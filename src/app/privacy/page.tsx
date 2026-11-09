'use client';

import React from 'react';
import { ArrowLeft, ShieldCheck, Sun, Moon, Lock } from 'lucide-react';
import { useInvitation } from '../../context/InvitationContext';

export default function PrivacyPage() {
  const { themeMode, toggleThemeMode } = useInvitation();
  const isLight = themeMode === 'light';

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${
      isLight ? 'bg-[#FAF8F5] text-stone-900' : 'bg-[#041514] text-stone-100'
    }`}>
      
      {/* Top Header */}
      <header className={`border-b sticky top-0 z-40 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between ${
        isLight ? 'bg-white/90 border-[#E8DEC8]' : 'bg-[#041514]/90 border-gold-subtle'
      }`}>
        <div className="flex items-center gap-4">
          <a
            href="/"
            className={`p-2 rounded-full border transition-colors ${
              isLight ? 'border-amber-200 text-stone-700 hover:bg-stone-100' : 'border-gold-subtle text-stone-300 hover:bg-white/5'
            }`}
            title="Kembali ke Beranda"
          >
            <ArrowLeft className="w-4 h-4" />
          </a>
          <div className="flex items-center gap-2">
            <img src="/assets/logo-harinikah-gold.png" alt="HariNikah" className="h-8 w-auto" />
            <span className="text-xs uppercase font-extrabold tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              Privasi & Keamanan
            </span>
          </div>
        </div>

        <button
          onClick={toggleThemeMode}
          className={`p-2 rounded-full border text-xs font-medium transition-colors ${
            isLight ? 'bg-amber-100 border-amber-300 text-amber-900' : 'bg-white/5 border-gold-subtle text-gold-300'
          }`}
        >
          {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </button>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="space-y-2 border-b pb-6 border-black/10">
          <h1 className={`text-2xl sm:text-3xl font-serif font-bold ${isLight ? 'text-amber-900' : 'text-gold-bright'}`}>
            Kebijakan Privasi
          </h1>
          <p className="text-xs text-stone-500">
            Kepatuhan terhadap UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP) Republik Indonesia.
          </p>
        </div>

        <div className={`space-y-6 text-xs sm:text-sm leading-relaxed ${isLight ? 'text-stone-700' : 'text-stone-300'}`}>
          <section className="space-y-2">
            <h2 className={`text-base font-bold ${isLight ? 'text-stone-900' : 'text-white'}`}>
              1. Pengumpulan Data Pribadi
            </h2>
            <p>
              Kami mengumpulkan informasi yang Anda berikan secara langsung saat membuat undangan pernikahan, termasuk:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-stone-400">
              <li>Nama lengkap calon pengantin dan nama orang tua</li>
              <li>Nomor kontak (WhatsApp) dan alamat email untuk keperluan login & pengiriman notifikasi</li>
              <li>Jadwal serta lokasi acara akad dan resepsi pernikahan</li>
              <li>Daftar nama dan nomor telepon tamu undangan yang Anda unggah untuk keperluan fitur broadcast WhatsApp</li>
              <li>Informasi nomor rekening atau QRIS untuk penerimaan amplop digital</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className={`text-base font-bold ${isLight ? 'text-stone-900' : 'text-white'}`}>
              2. Penggunaan & Perlindungan Data Tamu
            </h2>
            <p>
              HariNikah berkomitmen melindungi kerahasiaan data tamu undangan Anda. Data nomor telepon dan nama tamu yang Anda unggah melalui file Excel hanya digunakan secara eksklusif untuk menghasilkan tautan undangan personal dan mengirimkan pesan WhatsApp atas instruksi Anda. Kami tidak pernah menjual, menyewakan, atau membagikan data tamu kepada pihak ketiga untuk keperluan periklanan.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className={`text-base font-bold ${isLight ? 'text-stone-900' : 'text-white'}`}>
              3. Keamanan Rekening & Amplop Digital
            </h2>
            <p>
              Seluruh dana amplop digital yang dikirimkan oleh tamu undangan langsung masuk ke rekening bank atau dompet digital pribadi calon mempelai tanpa potongan komisi sepeserpun dari HariNikah. Kami tidak memproses atau menyimpan data pinjaman, kata sandi perbankan, atau CVV kartu Anda.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className={`text-base font-bold ${isLight ? 'text-stone-900' : 'text-white'}`}>
              4. Hubungi Tim Petugas Perlindungan Data
            </h2>
            <p>
              Jika Anda memiliki pertanyaan seputar perlindungan data Anda di HariNikah, silakan hubungi tim kami di <strong>halo@harinikah.com</strong> atau kunjungi studio kami di Jl. Gatot Subroto No. 88, Pahoman, Kota Bandar Lampung, Lampung.
            </p>
          </section>
        </div>
      </main>

    </div>
  );
}

