'use client';

import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
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
              Platform undangan pernikahan omnichannel no. 1 di Indonesia. Menyediakan pembuatan undangan digital website interaktif berkonsep multi-halaman layaknya Canva serta produksi undangan cetak fisik mewah berbalut velvet dan foil emas.
            </p>
            <div className={`pt-2 text-xs space-y-1 ${isLight ? 'text-stone-600' : 'text-stone-400'}`}>
              <p className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-amber-500" /> Galeri Showroom: Jl. Gatot Subroto No. 88, Pahoman, Bandar Lampung</p>
              <p className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-amber-500" /> Studio Konsultasi: Jl. Raden Intan No. 45, Enggal, Bandar Lampung</p>
            </div>
          </div>

          {/* Column 1: Undangan Digital */}
          <div>
            <h4 className={`text-xs font-bold uppercase tracking-wider mb-4 ${isLight ? 'text-amber-900' : 'text-gold-300'}`}>Undangan Digital</h4>
            <ul className={`space-y-2.5 text-xs ${isLight ? 'text-stone-600' : 'text-stone-400'}`}>
              <li><a href="#digital" className="hover:text-amber-700 transition-colors">Canva Editor Multi-Halaman</a></li>
              <li><a href="#digital" className="hover:text-amber-700 transition-colors">Mode Terima Beres (VIP)</a></li>
              <li><a href="#katalog" className="hover:text-amber-700 transition-colors">Katalog Tema Velvet</a></li>
              <li><a href="#harga" className="hover:text-amber-700 transition-colors">Fitur RSVP & Amplop QRIS</a></li>
              <li><a href="#harga" className="hover:text-amber-700 transition-colors">Broadcast WhatsApp</a></li>
            </ul>
          </div>

          {/* Column 2: Undangan Fisik */}
          <div>
            <h4 className={`text-xs font-bold uppercase tracking-wider mb-4 ${isLight ? 'text-amber-900' : 'text-gold-300'}`}>Undangan Fisik</h4>
            <ul className={`space-y-2.5 text-xs ${isLight ? 'text-stone-600' : 'text-stone-400'}`}>
              <li><a href="#fisik" className="hover:text-amber-700 transition-colors">Hardcover Board 30</a></li>
              <li><a href="#fisik" className="hover:text-amber-700 transition-colors">Amplop Kalkir (Vellum)</a></li>
              <li><a href="#fisik" className="hover:text-amber-700 transition-colors">Hotprint Foil Emas</a></li>
              <li><a href="#fisik" className="hover:text-amber-700 transition-colors">Wax Seal Cap Lilin</a></li>
              <li><a href="#fisik" className="hover:text-amber-700 transition-colors">Pesan Sample Kit Box</a></li>
            </ul>
          </div>

          {/* Column 3: Kontak & Bantuan */}
          <div>
            <h4 className={`text-xs font-bold uppercase tracking-wider mb-4 ${isLight ? 'text-amber-900' : 'text-gold-300'}`}>Kontak & Layanan</h4>
            <ul className={`space-y-2.5 text-xs ${isLight ? 'text-stone-600' : 'text-stone-400'}`}>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-500" />
                <span>+62 812-3456-7890</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-500" />
                <span>halo@harinikah.com</span>
              </li>
              <li className="pt-2 text-[11px] text-stone-500">
                Jam Operasional Showroom: <br />
                Senin - Minggu: 09.00 - 20.00 WIB
              </li>
            </ul>
          </div>

        </div>

        {/* Footnote */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] gap-4">
          <p className={isLight ? 'text-stone-500' : 'text-stone-500'}>
            © 2026 PT Hari Nikah Nusantara. Hak cipta dilindungi undang-undang.
          </p>
          <div className={`flex items-center gap-6 ${isLight ? 'text-stone-600' : 'text-stone-400'}`}>
            <a href="#" className="hover:underline">Kebijakan Privasi</a>
            <a href="#" className="hover:underline">Syarat & Ketentuan</a>
            <a href="#" className="hover:underline">Garansi Kualitas Cetak</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
