'use client';

import React from 'react';
import { Phone, Mail, MapPin, ExternalLink, ShoppingBag, Send, ShieldCheck, Heart } from 'lucide-react';
import { useInvitation } from '../../context/InvitationContext';

export const Footer: React.FC = () => {
  const { themeMode } = useInvitation();
  const isLight = themeMode === 'light';

  return (
    <footer className={`pt-16 pb-12 border-t transition-colors duration-300 ${
      isLight ? 'bg-[#F5EFE6] text-stone-700 border-[#E8DEC8]' : 'bg-[#020b0a] text-stone-300 border-gold-subtle'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b ${
          isLight ? 'border-stone-300/80' : 'border-gold-subtle/50'
        }`}>

          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <img
                src="/assets/logo-harinikah-gold.png"
                alt="Hari Nikah Logo"
                className="h-11 w-auto object-contain filter drop-shadow-[0_2px_12px_rgba(223,176,81,0.35)]"
              />
            </div>
            <p className={`text-xs max-w-sm leading-relaxed ${isLight ? 'text-stone-600' : 'text-stone-400'}`}>
              Platform undangan pernikahan modern & adat nusantara no. 1 di Indonesia. Menyediakan pembuatan undangan digital website interaktif berkonsep multi-halaman berestetika tinggi serta pemesanan produk fisik mewah resmi melalui Shopee Official Store.
            </p>
            <div className={`pt-2 text-xs space-y-1.5 ${isLight ? 'text-stone-600' : 'text-stone-400'}`}>
              <p className="flex items-start gap-1.5">
                <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" /> 
                <span><strong>Studio Desain & Kantor Pusat:</strong> Jl. Gatot Subroto No. 88, Pahoman, Kec. Teluk Betung Utara, Kota Bandar Lampung, Lampung 35213</span>
              </p>
              <p className="flex items-center gap-1.5 text-[#EE4D2D] font-medium">
                <ShoppingBag className="w-3.5 h-3.5 flex-shrink-0" />
                <span>Pengiriman Fisik Bergaransi Resmi dari Bandar Lampung via Shopee Official</span>
              </p>
            </div>
          </div>

          {/* Column 1: Undangan Digital */}
          <div>
            <h4 className={`text-xs font-bold uppercase tracking-wider mb-4 ${isLight ? 'text-amber-900' : 'text-gold-300'}`}>
              Fitur Platform
            </h4>
            <ul className={`space-y-2.5 text-xs ${isLight ? 'text-stone-600' : 'text-stone-400'}`}>
              <li><a href="/editor" className="hover:text-amber-700 transition-colors">Studio Editor Multi-Halaman</a></li>
              <li><a href="/broadcast" className="hover:text-amber-700 transition-colors flex items-center gap-1 font-medium text-emerald-500"><Send className="w-3 h-3" /> Broadcast WhatsApp Tamu</a></li>
              <li><a href="/#katalog" className="hover:text-amber-700 transition-colors">Katalog Desain Jawa & Minang</a></li>
              <li><a href="/profile" className="hover:text-amber-700 transition-colors">Kelola Undangan Saya</a></li>
              <li><a href="/checkout" className="hover:text-amber-700 transition-colors">Aktivasi Paket & Pembayaran</a></li>
            </ul>
          </div>

          {/* Column 2: Toko Resmi Shopee */}
          <div>
            <h4 className={`text-xs font-bold uppercase tracking-wider mb-4 text-[#EE4D2D]`}>
              Toko Resmi Shopee
            </h4>
            <ul className={`space-y-2.5 text-xs ${isLight ? 'text-stone-600' : 'text-stone-400'}`}>
              <li>
                <a 
                  href="https://shopee.co.id/harinikah_official" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[#EE4D2D] transition-colors flex items-center gap-1.5 font-bold text-[#EE4D2D]"
                >
                  <span>Shopee Official Store</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li><a href="https://shopee.co.id/harinikah_official" target="_blank" rel="noopener noreferrer" className="hover:text-[#EE4D2D] transition-colors">Undangan Hardcover Velvet</a></li>
              <li><a href="https://shopee.co.id/harinikah_official" target="_blank" rel="noopener noreferrer" className="hover:text-[#EE4D2D] transition-colors">Amplop Kalkir (Vellum) Mewah</a></li>
              <li><a href="https://shopee.co.id/harinikah_official" target="_blank" rel="noopener noreferrer" className="hover:text-[#EE4D2D] transition-colors">Hotprint Foil Emas & Wax Seal</a></li>
              <li><a href="https://shopee.co.id/harinikah_official" target="_blank" rel="noopener noreferrer" className="hover:text-[#EE4D2D] transition-colors">Garansi Shopee & Gratis Ongkir</a></li>
            </ul>
          </div>

          {/* Column 3: Kontak & Informasi */}
          <div>
            <h4 className={`text-xs font-bold uppercase tracking-wider mb-4 ${isLight ? 'text-amber-900' : 'text-gold-300'}`}>
              Studio & Layanan
            </h4>
            <ul className={`space-y-2.5 text-xs ${isLight ? 'text-stone-600' : 'text-stone-400'}`}>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-500" />
                <span>+62 812-3456-7890 (CS Lampung)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-500" />
                <span>halo@harinikah.com</span>
              </li>
              <li>
                <a href="/about" className="hover:text-amber-700 transition-colors font-medium">
                  Tentang Studio HariNikah
                </a>
              </li>
              <li className="pt-2 text-[11px] text-stone-500 leading-relaxed">
                Jam Layanan Online Studio: <br />
                Senin - Minggu: 08.00 - 22.00 WIB
              </li>
            </ul>
          </div>

        </div>

        {/* Footnote */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] gap-4">
          <p className={isLight ? 'text-stone-500' : 'text-stone-500'}>
            © 2026 PT Hari Nikah Nusantara (Bandar Lampung). Hak cipta dilindungi undang-undang.
          </p>
          <div className={`flex items-center gap-6 ${isLight ? 'text-stone-600' : 'text-stone-400'}`}>
            <a href="/about" className="hover:underline">Tentang Kami</a>
            <a href="/terms" className="hover:underline">Syarat & Ketentuan</a>
            <a href="/privacy" className="hover:underline">Kebijakan Privasi</a>
            <a href="https://shopee.co.id/harinikah_official" target="_blank" rel="noopener noreferrer" className="hover:underline text-[#EE4D2D]">Garansi Shopee</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
