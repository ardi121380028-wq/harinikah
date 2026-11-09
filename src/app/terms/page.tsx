'use client';

import React from 'react';
import { ArrowLeft, ShieldCheck, Sun, Moon } from 'lucide-react';
import { useInvitation } from '../../context/InvitationContext';

export default function TermsPage() {
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
            <span className="text-xs uppercase font-extrabold tracking-widest px-2.5 py-0.5 rounded-full bg-gold-400/20 text-gold-300 border border-gold-400/40">
              Legal
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
            Syarat & Ketentuan Layanan
          </h1>
          <p className="text-xs text-stone-500">
            Terakhir Diperbarui: 18 Juli 2026 • Berlaku untuk seluruh pengguna platform HariNikah
          </p>
        </div>

        <div className={`space-y-6 text-xs sm:text-sm leading-relaxed ${isLight ? 'text-stone-700' : 'text-stone-300'}`}>
          <section className="space-y-2">
            <h2 className={`text-base font-bold ${isLight ? 'text-stone-900' : 'text-white'}`}>
              1. Ketentuan Umum & Penerimaan Layanan
            </h2>
            <p>
              Dengan mendaftar, mengakses, atau menggunakan layanan platform HariNikah (PT Hari Nikah Nusantara, berkedudukan di Bandar Lampung, Lampung), Anda menyetujui untuk terikat secara hukum oleh Syarat dan Ketentuan ini.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className={`text-base font-bold ${isLight ? 'text-stone-900' : 'text-white'}`}>
              2. Penggunaan Editor Canva & Aset Desain
            </h2>
            <p>
              Platform HariNikah memberikan lisensi terbatas, non-eksklusif, dan tidak dapat dipindahtangankan kepada pengguna untuk membuat, mengedit, dan mempublikasikan undangan pernikahan pribadi. Pengguna dilarang memperjualbelikan kembali aset grafis, ornamen adat, atau kode sumber template HariNikah kepada pihak ketiga tanpa izin tertulis.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className={`text-base font-bold ${isLight ? 'text-stone-900' : 'text-white'}`}>
              3. Fitur Broadcast WhatsApp & Pengiriman Pesan
            </h2>
            <p>
              Fitur broadcast WhatsApp ditujukan semata-mata untuk memudahkan pengantin mengirimkan tautan undangan pernikahan kepada tamu yang memang dikenal (keluarga, teman, kolega). Pengguna bertanggung jawab penuh atas data kontak yang diunggah dan dilarang menyalahgunakan sistem ini untuk aktivitas spam atau pesan massal yang melanggar ketentuan WhatsApp Inc.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className={`text-base font-bold ${isLight ? 'text-stone-900' : 'text-white'}`}>
              4. Transaksi Produk Fisik via Shopee Official Store
            </h2>
            <p>
              Seluruh transaksi pembelian produk fisik (undangan hardcover, vellum, hotprint emas, wax seal) diproses melalui toko resmi Shopee kami (shopee.co.id/harinikah_official). Syarat pengiriman, jaminan retur barang cacat produksi, dan pengembalian dana tunduk pada Syarat Layanan Shopee Indonesia demi menjamin keamanan transaksi pelanggan 100%.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className={`text-base font-bold ${isLight ? 'text-stone-900' : 'text-white'}`}>
              5. Hukum yang Berlaku
            </h2>
            <p>
              Syarat dan Ketentuan ini diatur dan ditafsirkan sesuai dengan hukum Negara Republik Indonesia. Segala sengketa yang timbul akan diselesaikan secara musyawarah mufakat di Kota Bandar Lampung, Lampung.
            </p>
          </section>
        </div>
      </main>

    </div>
  );
}

