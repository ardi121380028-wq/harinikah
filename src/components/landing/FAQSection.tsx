'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useInvitation } from '../../context/InvitationContext';

export const FAQSection: React.FC = () => {
  const { themeMode } = useInvitation();
  const isLight = themeMode === 'light';

  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "Berapa lama masa aktif undangan website digital?",
      a: "Sekali aktivasi, undangan digital HariNikah aktif selamanya tanpa batas waktu dan tanpa biaya perpanjangan bulanan. Kamu juga tetap bisa mengubah tanggal, foto, lagu, atau detail acara kapan saja tanpa biaya tambahan."
    },
    {
      q: "Bagaimana cara kerja Canva Editor Multi-Halaman?",
      a: "Sistem editor HariNikah dirancang fleksibel layaknya Canva. Undanganmu dipecah menjadi beberapa halaman terpisah (Cover, Profil Mempelai, Jadwal Akad & Resepsi, Galeri Foto & Love Story, Amplop Digital, dan Form RSVP). Kamu bisa mengedit teks, mengganti foto, mengubah urutan halaman, dan menambah halaman baru dengan mudah."
    },
    {
      q: "Saya gaptek dan tidak punya waktu desain. Apakah bisa dibantu?",
      a: "Tentu saja! Kami memiliki layanan 'Mode Terima Beres'. Kamu cukup mengisi formulir ringkas 3 menit atau mengirimkan data dan foto via WhatsApp. Tim desainer profesional HariNikah yang akan merapikan dan menyusun undangan sampai siap sebar dalam 1x24 jam."
    },
    {
      q: "Berapa lama proses pembuatan dan pengiriman undangan fisik cetak?",
      a: "Proses desain proofing memakan waktu 1–2 hari kerja. Setelah kamu menyetujui (ACC) cetak, proses produksi cetak massal, hotprint foil emas, dan finishing membutuhkan waktu 7–12 hari kerja tergantung jumlah dan antrean. Kami mengirimkan dengan packing kayu aman ke seluruh Indonesia."
    },
    {
      q: "Bagaimana cara memesan undangan fisik dan memastikan kualitas cetaknya?",
      a: "Kamu bisa memesan langsung melalui Shopee Official Store kami (shopee.co.id/harinikah_official). Di sana tersedia jaminan garansi Shopee, ulasan foto/video dari ribuan pengantin, serta proteksi pengiriman. Seluruh pesanan diproduksi dan dikirim dengan kemasan aman langsung dari Studio HariNikah di Bandar Lampung."
    },
    {
      q: "Bagaimana cara kerja link WhatsApp personal untuk setiap tamu?",
      a: "Di dashboard HariNikah, kamu cukup memasukkan daftar nama tamu (bisa ketik satuan atau upload file Excel). Sistem kami akan secara otomatis menghasilkan tautan unik personal dengan nama tamu yang langsung siap dikirimkan lewat WhatsApp dengan satu klik."
    }
  ];

  return (
    <section className={`py-20 lg:py-28 border-t transition-colors duration-300 ${
      isLight ? 'bg-[#FAF8F5] border-[#E8DEC8]' : 'bg-[#041514] border-gold-subtle'
    }`} id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <span className={`text-xs uppercase font-extrabold tracking-widest px-3.5 py-1 rounded-full border shadow-sm ${
            isLight ? 'bg-amber-100 text-amber-900 border-amber-300' : 'text-gold-300 bg-gold-950/80 border-gold-subtle'
          }`}>
            Pusat Bantuan
          </span>
          <h2 className={`text-3xl sm:text-4xl font-bold mt-4 ${
            isLight ? 'text-stone-900' : 'text-white'
          }`}>
            Pertanyaan yang Sering Diajukan (FAQ)
          </h2>
          <p className={`text-sm sm:text-base mt-3 ${
            isLight ? 'text-stone-600' : 'text-stone-300'
          }`}>
            Punya pertanyaan lain? Tim konsultan kami siap membantumu 24/7 via WhatsApp.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className={`border rounded-2xl overflow-hidden transition-all shadow-sm ${
                isLight ? 'border-[#E8DEC8] bg-white' : 'border-gold-subtle bg-[#061e1d]'
              }`}
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className={`w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 transition-colors ${
                  isLight ? 'hover:bg-amber-50/50' : 'hover:bg-white/5'
                }`}
              >
                <span className={`text-xs sm:text-sm font-semibold ${
                  isLight ? 'text-stone-900' : 'text-white'
                }`}>
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform flex-shrink-0 ${
                    openIdx === idx ? 'rotate-180 text-amber-600' : isLight ? 'text-stone-500' : 'text-gold-400'
                  }`}
                />
              </button>

              {openIdx === idx && (
                <div className={`p-5 sm:p-6 border-t text-xs sm:text-sm leading-relaxed ${
                  isLight
                    ? 'bg-[#FBF8F2] border-stone-200 text-stone-700'
                    : 'bg-[#031110] border-gold-subtle/50 text-stone-300'
                }`}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
