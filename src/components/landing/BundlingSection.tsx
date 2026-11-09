'use client';

import React from 'react';
import { Sparkles, Gift, Check, HeartHandshake } from 'lucide-react';
import { useInvitation } from '../../context/InvitationContext';

interface BundlingSectionProps {
  onOpenSampleModal: () => void;
}

export const BundlingSection: React.FC<BundlingSectionProps> = ({ onOpenSampleModal }) => {
  const { themeMode } = useInvitation();
  const isLight = themeMode === 'light';

  return (
    <section className={`py-20 lg:py-28 relative overflow-hidden font-sans transition-colors duration-300 ${
      isLight ? 'bg-[#FAF8F5]' : 'bg-velvet-texture bg-cover bg-center'
    }`} id="bundling">
      
      {/* Background Overlay */}
      <div className={`absolute inset-0 -z-10 ${isLight ? 'bg-gradient-to-b from-[#F5EFE6] to-[#FAF8F5]' : 'bg-[#041514]/90'}`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className={`rounded-3xl shadow-2xl border-2 p-8 sm:p-12 lg:p-16 relative overflow-hidden transition-all ${
          isLight
            ? 'bg-gradient-to-br from-white via-[#FAF5EC] to-white border-amber-300 shadow-amber-950/10 text-stone-900'
            : 'bg-gradient-to-br from-[#0c312e] via-[#082422] to-[#041514] border-gold-400/60 text-white shadow-velvet-deep'
        }`}>
          
          {/* Badge Flag */}
          <div className="absolute -top-1 right-8 bg-gradient-to-r from-amber-500 to-gold-400 text-black text-xs font-extrabold px-6 py-2 rounded-b-2xl shadow uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 fill-current" />
            Paket Bundling Paling Hemat
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <span className={`text-xs uppercase font-extrabold tracking-widest px-3.5 py-1 rounded-full border shadow-sm ${
                isLight ? 'bg-amber-100 text-amber-900 border-amber-300' : 'text-gold-300 bg-gold-950/80 border-gold-subtle'
              }`}>
                PAKET HARMONI (FISIK + DIGITAL)
              </span>

              <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight ${
                isLight ? 'text-stone-900' : 'text-white'
              }`}>
                Pesan Undangan Cetak Fisik, <br />
                <span className={isLight ? 'text-gold-light' : 'text-gold-bright'}>GRATIS Undangan Digital Premium!</span>
              </h2>

              <p className={`text-sm sm:text-base leading-relaxed ${isLight ? 'text-stone-600' : 'text-stone-300'}`}>
                Kenapa harus membayar dua kali di tempat yang berbeda? Pesan undangan fisik cetak mewah di HariNikah (min. 200 pcs), kamu langsung mendapatkan seluruh fitur website undangan digital kami secara cuma-cuma!
              </p>

              {/* Perks Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {[
                  "Undangan Fisik Velvet & Foil Emas",
                  "GRATIS Undangan Web Premium (Senilai Rp 150rb)",
                  "GRATIS Sistem QR Code Check-in Resepsi",
                  "GRATIS 1 Set Buku Tamu Fisik Eksklusif",
                  "Bebas Revisi Desain Fisik & Digital",
                  "Garansi Transaksi Aman via Shopee Official Store"
                ].map((perk, idx) => (
                  <div key={idx} className={`flex items-center gap-2.5 text-xs sm:text-sm font-semibold ${
                    isLight ? 'text-stone-800' : 'text-stone-200'
                  }`}>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 ${
                      isLight ? 'bg-amber-100 border-amber-300 text-amber-800' : 'bg-gold-950 border-gold-subtle text-gold-300'
                    }`}>
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>{perk}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                <a
                  href="/checkout"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 to-gold-400 text-black font-bold text-xs uppercase tracking-wider shadow-gold-glow hover:scale-105 transition-all"
                >
                  <Gift className="w-4 h-4 fill-current" />
                  Klaim Promo Bundling Harmoni
                </a>
                <a
                  href="https://shopee.co.id/harinikah_official"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full border font-bold text-xs tracking-wider transition-colors bg-[#EE4D2D] hover:bg-[#D73211] text-white border-[#EE4D2D]"
                >
                  <HeartHandshake className="w-4 h-4 text-white" />
                  Order via Shopee Official
                </a>
              </div>
            </div>

            {/* Right Visual Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-400/50 aspect-[4/3] sm:aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80"
                  alt="Paket Bundling Undangan Fisik dan Digital HariNikah"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
                  <p className="text-[10px] uppercase tracking-widest text-amber-300 font-bold">All-in-One Wedding Suite</p>
                  <p className="text-xl font-bold text-gold-bright mt-1">Satu Kesatuan Desain Serasi</p>
                  <p className="text-xs text-stone-300 mt-1">Tema visual undangan website selaras dengan warna kertas dan foil undangan fisikmu.</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
