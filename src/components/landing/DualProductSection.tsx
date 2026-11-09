'use client';

import React from 'react';
import { 
  Smartphone, 
  Layers, 
  Check, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useInvitation } from '../../context/InvitationContext';

interface DualProductSectionProps {
  onStartDigital: () => void;
  onOpenSampleModal: () => void;
}

export const DualProductSection: React.FC<DualProductSectionProps> = ({ 
  onStartDigital, 
  onOpenSampleModal 
}) => {
  const { themeMode } = useInvitation();
  const isLight = themeMode === 'light';

  return (
    <section className={`py-20 lg:py-28 relative font-sans transition-colors duration-300 ${
      isLight ? 'bg-[#FAF8F5]' : 'bg-[#051817]'
    }`} id="digital">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className={`text-xs uppercase font-extrabold tracking-widest px-3.5 py-1 rounded-full border shadow-sm ${
            isLight
              ? 'text-amber-900 bg-amber-100 border-amber-300'
              : 'text-gold-300 bg-gold-950/80 border-gold-subtle'
          }`}>
            Dua Solusi Sempurna
          </span>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 leading-tight ${
            isLight ? 'text-stone-900' : 'text-white'
          }`}>
            Pilih Format Sesuai Kebutuhanmu, <br />
            <span className={isLight ? 'text-gold-light' : 'text-gold-bright'}>atau Padukan Keduanya!</span>
          </h2>
          <p className={`text-sm sm:text-base mt-4 leading-relaxed ${
            isLight ? 'text-stone-600' : 'text-stone-300'
          }`}>
            Tak perlu bingung mencari vendor terpisah. Di HariNikah, kamu bisa memadukan kecanggihan teknologi undangan digital interaktif untuk teman sebaya dengan keagungan fisik untuk keluarga & tamu kehormatan.
          </p>
        </div>

        {/* Product Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          
          {/* Card 1: Undangan Digital Web */}
          <div className={`relative rounded-3xl p-8 sm:p-10 shadow-xl border-2 flex flex-col justify-between overflow-hidden group transition-all ${
            isLight 
              ? 'bg-white border-amber-300/80 hover:border-amber-500 shadow-amber-950/5' 
              : 'bg-gradient-to-br from-[#0c2e2b] to-[#061e1d] border-gold-400/50 hover:border-gold-300 shadow-velvet-deep'
          }`}>
            <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-gold-400 text-black text-[11px] font-bold px-4 py-1.5 rounded-bl-2xl shadow uppercase tracking-wider">
              Paling Populer & Praktis
            </div>

            <div>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border shadow-sm ${
                isLight ? 'bg-amber-50 text-amber-800 border-amber-200' : 'bg-gold-950/80 text-gold-300 border-gold-subtle shadow-gold-sm'
              }`}>
                <Smartphone className="w-7 h-7" />
              </div>

              <h3 className={`text-2xl sm:text-3xl font-bold ${isLight ? 'text-stone-900' : 'text-white'}`}>
                Undangan Digital (Website)
              </h3>
              <p className={`text-xs sm:text-sm mt-2 leading-relaxed ${isLight ? 'text-stone-600' : 'text-stone-300'}`}>
                Undangan website responsif modern dengan fitur interaktif lengkap. Dilengkapi editor visual multi-page layaknya Canva, sebar nama tamu personal via WhatsApp, dan amplop digital otomatis.
              </p>

              {/* Feature Highlights */}
              <div className="mt-8 space-y-3.5">
                {[
                  "Editor visual modern multi-halaman layaknya Canva",
                  "Sebar WhatsApp satu-klik dengan nama tamu personal (?to=Nama)",
                  "Konfirmasi kehadiran (RSVP) & Doa ucapan masuk real-time",
                  "Amplop digital (QRIS otomatis & tombol salin nomor rekening)",
                  "Penunjuk arah terhubung langsung ke Google Maps & Waze",
                  "Tersedia Mode Bikin Sendiri (DIY) atau Mode Terima Beres"
                ].map((item, idx) => (
                  <div key={idx} className={`flex items-start gap-3 text-xs sm:text-sm ${
                    isLight ? 'text-stone-700' : 'text-stone-200'
                  }`}>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      isLight ? 'bg-amber-100 border-amber-300 text-amber-800' : 'bg-gold-950 border-gold-subtle text-gold-300'
                    }`}>
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={`mt-10 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 ${
              isLight ? 'border-stone-200' : 'border-gold-subtle'
            }`}>
              <div>
                <span className={`text-[11px] block ${isLight ? 'text-stone-500' : 'text-stone-400'}`}>Harga mulai dari</span>
                <div className="flex items-baseline gap-1.5">
                  <span className={`text-2xl font-bold ${isLight ? 'text-amber-800' : 'text-gold-bright'}`}>Rp 75.000</span>
                  <span className="text-[10px] text-emerald-600 font-bold bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">Aktif Selamanya</span>
                </div>
              </div>
              <button
                onClick={onStartDigital}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-gold-400 text-black font-semibold text-xs uppercase tracking-wider shadow-sm transition-all hover:scale-105"
              >
                Buat Undangan Digital
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 2: Undangan Cetak Fisik */}
          <div className={`relative rounded-3xl p-8 sm:p-10 shadow-xl border flex flex-col justify-between overflow-hidden group transition-all ${
            isLight 
              ? 'bg-white border-[#E8DEC8] hover:border-amber-400 shadow-amber-950/5' 
              : 'bg-gradient-to-br from-[#0c2e2b] to-[#061e1d] border-gold-subtle hover:border-gold-400 shadow-velvet-deep'
          }`} id="fisik">
            <div className={`absolute top-0 right-0 border-b border-l text-[11px] font-bold px-4 py-1.5 rounded-bl-2xl uppercase tracking-wider ${
              isLight ? 'bg-amber-100 border-amber-300 text-amber-900' : 'bg-gold-950 border-gold-subtle text-gold-300'
            }`}>
              Mewah & Sentuhan Personal
            </div>

            <div>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border shadow-sm ${
                isLight ? 'bg-amber-50 text-amber-800 border-amber-200' : 'bg-gold-950/80 text-gold-300 border-gold-subtle shadow-gold-sm'
              }`}>
                <Layers className="w-7 h-7" />
              </div>

              <h3 className={`text-2xl sm:text-3xl font-bold ${isLight ? 'text-stone-900' : 'text-white'}`}>
                Undangan Cetak Fisik (Hardcopy)
              </h3>
              <p className={`text-xs sm:text-sm mt-2 leading-relaxed ${isLight ? 'text-stone-600' : 'text-stone-300'}`}>
                Undangan fisik berkelas dengan material kertas mewah import, foil emas timbul, amplop kalkir transparan, dan wax seal lilin untuk kesan pertama yang tak terlupakan.
              </p>

              {/* Feature Highlights */}
              <div className="mt-8 space-y-3.5">
                {[
                  "Pilihan Hardcover tebal (Board 30) & Softcover Jasmine/Linen",
                  "Finishing mewah: Hotprint Gold/Rose Gold, Emboss, & Deboss",
                  "Aksen eksklusif: Amplop Vellum/Kalkir, Pita Satin, Wax Seal",
                  "Bebas revisi desain berkali-kali hingga Anda puas dan ACC",
                  "Pengiriman bergaransi langsung dari Studio Bandar Lampung ke seluruh Nusantara",
                  "Transaksi 100% aman bergaransi resmi via Shopee Official Store"
                ].map((item, idx) => (
                  <div key={idx} className={`flex items-start gap-3 text-xs sm:text-sm ${
                    isLight ? 'text-stone-700' : 'text-stone-200'
                  }`}>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      isLight ? 'bg-amber-100 border-amber-300 text-amber-800' : 'bg-gold-950 border-gold-subtle text-gold-300'
                    }`}>
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={`mt-10 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 ${
              isLight ? 'border-stone-200' : 'border-gold-subtle'
            }`}>
              <div>
                <span className={`text-[11px] block ${isLight ? 'text-stone-500' : 'text-stone-400'}`}>Harga cetak mulai</span>
                <div className="flex items-baseline gap-1.5">
                  <span className={`text-2xl font-bold ${isLight ? 'text-amber-800' : 'text-gold-bright'}`}>Rp 4.500</span>
                  <span className={`text-xs font-medium ${isLight ? 'text-stone-500' : 'text-stone-400'}`}>/ pcs</span>
                </div>
              </div>
              <a
                href="https://shopee.co.id/harinikah_official"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-all bg-gradient-to-r from-[#EE4D2D] to-[#FF5722] hover:from-[#FF5733] hover:to-[#EE4D2D] text-white shadow-lg shadow-[#EE4D2D]/35 hover:scale-105 active:scale-95 border border-[#FF7D61]/50"
              >
                <ShieldCheck className="w-4 h-4 text-white" />
                Beli di Shopee Official
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
