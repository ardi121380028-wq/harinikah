'use client';

import React from 'react';
import { Star } from 'lucide-react';
import { useInvitation } from '../../context/InvitationContext';

export const TestimonialsSection: React.FC = () => {
  const { themeMode } = useInvitation();
  const isLight = themeMode === 'light';

  const reviews = [
    {
      couple: "Rian & Amanda",
      location: "Bandar Lampung",
      date: "Oktober 2026",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      type: "Paket Bundling (Fisik + Digital)",
      review: "Awalnya bingung karena mau bagi undangan cetak ke sesepuh tapi teman kantor maunya link WA. Ambil paket bundling di HariNikah langsung solved dua-duanya! Undangan fisiknya tebal berbalut velvet dan foil emasnya mewah banget."
    },
    {
      couple: "Bagas & Putri",
      location: "Surabaya",
      date: "September 2026",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      type: "Studio Editor Pro (DIY)",
      review: "Studio Editor-nya seru banget! Bisa edit per-halaman, ganti foto prewed, atur urutan akad & resepsi, terus ada simulasi nama tamu langsung keluar di link WhatsApp. Teman-teman pada puji undangannya beda dari yang lain."
    },
    {
      couple: "Farhan & Tania",
      location: "Palembang",
      date: "November 2026",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
      type: "Undangan Fisik (Shopee Official)",
      review: "Pesan 500 pcs undangan hardcover velvet lewat Shopee Official HariNikah dari Bandar Lampung. Proses revisi via WA sangat komunikatif dan cepat. Hasil cetakan datang dengan packing kayu yang super aman tanpa cacat sedikitpun. Vendor terbaik!"
    }
  ];

  return (
    <section className={`py-20 lg:py-28 border-t transition-colors duration-300 ${
      isLight ? 'bg-[#FAF8F5] border-[#E8DEC8]' : 'bg-[#051817] border-gold-subtle'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className={`text-xs uppercase font-extrabold tracking-widest px-3.5 py-1 rounded-full border shadow-sm ${
            isLight ? 'bg-amber-100 text-amber-900 border-amber-300' : 'text-gold-300 bg-gold-950/80 border-gold-subtle'
          }`}>
            Kisah Bahagia
          </span>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 ${
            isLight ? 'text-stone-900' : 'text-white'
          }`}>
            Dipercaya Ribuan Pasangan di Seluruh Indonesia
          </h2>
          <p className={`text-sm sm:text-base mt-3 ${
            isLight ? 'text-stone-600' : 'text-stone-300'
          }`}>
            Simak pengalaman nyata calon pengantin yang telah mempercayakan momen sakral mereka bersama HariNikah.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((item, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-8 border shadow-xl flex flex-col justify-between transition-all ${
                isLight
                  ? 'bg-white border-[#E8DEC8] hover:border-amber-400 shadow-amber-950/5'
                  : 'bg-[#061e1d] border-gold-subtle hover:border-gold-400 shadow-velvet-deep'
              }`}
            >
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className={`text-xs sm:text-sm italic leading-relaxed ${
                  isLight ? 'text-stone-700' : 'text-stone-300'
                }`}>
                  "{item.review}"
                </p>
              </div>

              <div className={`mt-6 pt-6 border-t flex items-center gap-3.5 ${
                isLight ? 'border-stone-200' : 'border-gold-subtle'
              }`}>
                <img
                  src={item.avatar}
                  alt={item.couple}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-amber-400/60"
                />
                <div>
                  <h4 className={`text-sm font-bold ${isLight ? 'text-stone-900' : 'text-white'}`}>{item.couple}</h4>
                  <p className={`text-[11px] ${isLight ? 'text-stone-500' : 'text-stone-400'}`}>{item.location} • {item.date}</p>
                  <span className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    isLight ? 'bg-amber-100 text-amber-900 border-amber-300' : 'text-gold-300 bg-gold-950 border-gold-subtle'
                  }`}>
                    {item.type}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
