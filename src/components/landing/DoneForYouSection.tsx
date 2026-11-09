'use client';

import React from 'react';
import { MousePointerClick, Headset } from 'lucide-react';
import { useInvitation } from '../../context/InvitationContext';

interface DoneForYouProps {
  onStartDIY: () => void;
  onStartDFY: () => void;
}

export const DoneForYouSection: React.FC<DoneForYouProps> = ({ onStartDIY, onStartDFY }) => {
  const { themeMode } = useInvitation();
  const isLight = themeMode === 'light';

  return (
    <section className={`py-20 lg:py-28 border-t font-sans transition-colors duration-300 ${
      isLight ? 'bg-[#FAF8F5] border-[#E8DEC8]' : 'bg-[#041514] border-gold-subtle'
    }`} id="digital">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className={`text-xs uppercase font-extrabold tracking-widest px-3.5 py-1 rounded-full border shadow-sm ${
            isLight ? 'bg-amber-100 text-amber-900 border-amber-300' : 'text-gold-300 bg-gold-950/80 border-gold-subtle'
          }`}>
            Fleksibilitas Tanpa Batas
          </span>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 ${
            isLight ? 'text-stone-900' : 'text-white'
          }`}>
            Mau Bikin Sendiri atau Terima Beres? <br />
            <span className={isLight ? 'text-gold-light' : 'text-gold-bright'}>Dua-duanya Kami Siapkan!</span>
          </h2>
          <p className={`text-sm sm:text-base mt-4 leading-relaxed ${
            isLight ? 'text-stone-600' : 'text-stone-300'
          }`}>
            Kami mengerti kesibukan calon pengantin. Kamu bisa bebas bereksplorasi mendesain sendiri dengan Canva Editor Pro kami, atau santai rebahan dan serahkan seluruh prosesnya ke desainer ahli HariNikah.
          </p>
        </div>

        {/* 2-Column Split: DIY vs Done-For-You */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Option 1: Mode Mandiri (DIY) */}
          <div className={`rounded-3xl p-8 border shadow-xl flex flex-col justify-between transition-all ${
            isLight
              ? 'bg-white border-[#E8DEC8] hover:border-amber-400 shadow-amber-950/5'
              : 'bg-gradient-to-br from-[#0a2927] to-[#051a19] border-gold-subtle hover:border-gold-400 shadow-velvet-deep'
          }`}>
            <div>
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold mb-4 ${
                isLight ? 'bg-amber-100 border-amber-300 text-amber-900' : 'bg-gold-950/80 border-gold-subtle text-gold-300'
              }`}>
                <MousePointerClick className="w-3.5 h-3.5" />
                Mode Mandiri (Canva Editor)
              </div>
              <h3 className={`text-2xl font-bold ${isLight ? 'text-stone-900' : 'text-white'}`}>
                Bikin Sendiri Suka-Suka
              </h3>
              <p className={`text-xs sm:text-sm mt-2 ${isLight ? 'text-stone-600' : 'text-stone-300'}`}>
                Ideal untuk kamu yang ingin kontrol penuh terhadap tata letak, pilihan warna, dan detail foto.
              </p>

              {/* 3 Step Process */}
              <div className="mt-6 space-y-4">
                {[
                  { title: "Pilih Template", desc: "Pilih ratusan tema siap pakai di Canva Pro editor kami" },
                  { title: "Edit Konten Langsung", desc: "Klik langsung pada kanvas HP untuk ganti foto & teks" },
                  { title: "Langsung Bagikan", desc: "Sebar undangan seketika via WhatsApp ke seluruh kontak" }
                ].map((s, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full border text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      isLight ? 'bg-amber-100 border-amber-300 text-amber-800' : 'bg-gold-950 border-gold-subtle text-gold-300'
                    }`}>
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className={`text-sm font-semibold ${isLight ? 'text-stone-900' : 'text-stone-100'}`}>{s.title}</h4>
                      <p className={`text-xs ${isLight ? 'text-stone-600' : 'text-stone-400'}`}>{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`mt-8 pt-6 border-t ${isLight ? 'border-stone-200' : 'border-gold-subtle'}`}>
              <button
                onClick={onStartDIY}
                className="w-full py-3 rounded-full bg-gradient-to-r from-amber-400 to-gold-400 text-black font-bold text-xs uppercase tracking-wider shadow-sm hover:scale-105 transition-all"
              >
                Mulai Bikin Sendiri (Gratis Coba)
              </button>
            </div>
          </div>

          {/* Option 2: Mode Terima Beres (DFY) */}
          <div className={`rounded-3xl p-8 border shadow-xl flex flex-col justify-between transition-all ${
            isLight
              ? 'bg-gradient-to-br from-[#FFFDF9] to-[#FAF3E0] border-amber-300 hover:border-amber-500 shadow-amber-950/10'
              : 'bg-gradient-to-br from-[#123834] to-[#082422] border-2 border-gold-400 shadow-velvet-deep'
          }`}>
            <div>
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold mb-4 ${
                isLight ? 'bg-amber-200/80 border-amber-400 text-amber-950' : 'bg-gold-400 text-black border-gold-300'
              }`}>
                <Headset className="w-3.5 h-3.5" />
                Layanan VIP Terima Beres
              </div>
              <h3 className={`text-2xl font-bold ${isLight ? 'text-stone-900' : 'text-white'}`}>
                Rebahan, Tim Kami yang Buatkan
              </h3>
              <p className={`text-xs sm:text-sm mt-2 ${isLight ? 'text-stone-600' : 'text-stone-300'}`}>
                Cukup kirim foto dan data lewat WhatsApp, tim desainer profesional kami yang merapikannya sampai sempurna.
              </p>

              {/* 3 Step Process */}
              <div className="mt-6 space-y-4">
                {[
                  { title: "Kirim Data via WA", desc: "Cukup isi formulir singkat di WhatsApp bersama konsultan kami" },
                  { title: "Desainer Meracik Undangan", desc: "Tim kami menyusun tata letak, warna, musik, & animasi dalam 1x24 jam" },
                  { title: "Review & Revisi Bebas", desc: "Koreksi sepuasnya tanpa batas sampai kamu dan pasangan ACC" }
                ].map((s, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full border text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      isLight ? 'bg-amber-200 border-amber-400 text-amber-950' : 'bg-gold-400 text-black border-gold-300'
                    }`}>
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className={`text-sm font-semibold ${isLight ? 'text-stone-900' : 'text-stone-100'}`}>{s.title}</h4>
                      <p className={`text-xs ${isLight ? 'text-stone-600' : 'text-stone-400'}`}>{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`mt-8 pt-6 border-t ${isLight ? 'border-amber-200' : 'border-gold-subtle'}`}>
              <button
                onClick={onStartDFY}
                className="w-full py-3 rounded-full bg-gradient-to-r from-amber-500 to-gold-400 text-black font-bold text-xs uppercase tracking-wider shadow-sm hover:scale-105 transition-all"
              >
                Pilih Mode Terima Beres (Rp180.000)
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
