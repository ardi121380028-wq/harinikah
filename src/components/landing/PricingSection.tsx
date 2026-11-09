'use client';

import React, { useState, useEffect } from 'react';
import { Check, Sparkles, Clock, Flame } from 'lucide-react';
import { useInvitation } from '../../context/InvitationContext';

interface PricingSectionProps {
  onSelectTier: (tierName: string) => void;
  onOpenSampleModal: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectTier, onOpenSampleModal }) => {
  const { themeMode } = useInvitation();
  const isLight = themeMode === 'light';

  // 48-Hour Urgency Countdown Timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 47,
    minutes: 58,
    seconds: 42
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={`py-20 lg:py-28 border-t transition-colors duration-300 ${
      isLight ? 'bg-[#FAF8F5] border-[#E8DEC8]' : 'bg-[#051817] border-gold-subtle'
    }`} id="harga">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Urgency Promo Banner */}
        <div className={`max-w-3xl mx-auto mb-14 rounded-3xl p-6 sm:p-8 text-center relative overflow-hidden border-2 shadow-xl ${
          isLight
            ? 'bg-gradient-to-r from-amber-50 via-amber-100/60 to-amber-50 border-amber-300 text-stone-900 shadow-amber-950/5'
            : 'bg-gradient-to-r from-[#0c312e] via-[#144c48] to-[#0c312e] border-gold-400 text-white shadow-velvet-deep'
        }`}>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-black text-[11px] font-bold uppercase tracking-wider mb-2">
            <Flame className="w-3.5 h-3.5 fill-current" />
            Hadiah Aktivasi Terbatas
          </div>
          
          <h3 className={`text-2xl sm:text-3xl font-bold ${isLight ? 'text-amber-900' : 'text-gold-bright'}`}>
            Diskon 20% Potongan Langsung Untukmu!
          </h3>
          <p className={`text-xs sm:text-sm max-w-xl mx-auto mt-1 ${isLight ? 'text-stone-700' : 'text-stone-300'}`}>
            Gunakan voucher otomatis <strong className={isLight ? 'text-amber-800' : 'text-gold-200'}>HARINIKAH20</strong> saat aktivasi paket.
          </p>

          {/* Countdown Clock Display */}
          <div className={`mt-4 inline-flex items-center gap-3 backdrop-blur-md px-5 py-2.5 rounded-2xl border ${
            isLight ? 'bg-white border-amber-200 shadow-sm' : 'bg-black/50 border-gold-subtle'
          }`}>
            <Clock className={`w-4 h-4 animate-spin ${isLight ? 'text-amber-700' : 'text-gold-400'}`} style={{ animationDuration: '6s' }} />
            <span className={`text-xs font-semibold ${isLight ? 'text-stone-700' : 'text-stone-300'}`}>Berlaku dalam:</span>
            <div className={`flex items-center gap-1 font-mono text-base font-bold ${isLight ? 'text-amber-800' : 'text-gold-300'}`}>
              <span>{String(timeLeft.hours).padStart(2, '0')}</span>:
              <span>{String(timeLeft.minutes).padStart(2, '0')}</span>:
              <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
            </div>
          </div>
        </div>

        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className={`text-xs uppercase font-extrabold tracking-widest px-3.5 py-1 rounded-full border shadow-sm ${
            isLight
              ? 'text-amber-900 bg-amber-100 border-amber-300'
              : 'text-gold-300 bg-gold-950/80 border-gold-subtle'
          }`}>
            Daftar Paket & Biaya
          </span>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 ${
            isLight ? 'text-stone-900' : 'text-white'
          }`}>
            Pilih Paket Bahagiamu
          </h2>
          <p className={`text-sm sm:text-base mt-3 ${
            isLight ? 'text-stone-600' : 'text-stone-300'
          }`}>
            Sekali bayar, aktif selamanya. Setelah aktif, kamu tetap bisa mengubah isi, foto, & lagu tanpa batas!
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          
          {/* Card 1: Basic Digital */}
          <div className={`rounded-3xl p-6 sm:p-7 border flex flex-col justify-between transition-all shadow-md ${
            isLight ? 'bg-white border-[#E8DEC8] hover:border-amber-400' : 'bg-[#061e1d] border-gold-subtle hover:border-gold-400'
          }`}>
            <div>
              <span className={`text-xs font-bold uppercase tracking-wider ${isLight ? 'text-stone-500' : 'text-stone-400'}`}>Digital Basic</span>
              <h4 className={`text-xl font-bold mt-1 ${isLight ? 'text-stone-900' : 'text-white'}`}>Paket Standar</h4>
              <p className={`text-xs mt-1 ${isLight ? 'text-stone-600' : 'text-stone-400'}`}>Fitur esensial untuk acara sederhana</p>

              <div className="mt-6 mb-6">
                <span className="text-stone-400 text-xs line-through block">Rp 120.000</span>
                <div className="flex items-baseline gap-1">
                  <span className={`text-3xl font-bold ${isLight ? 'text-stone-900' : 'text-white'}`}>Rp 75.000</span>
                  <span className={`text-xs font-medium ${isLight ? 'text-stone-500' : 'text-stone-400'}`}>/ selamanya</span>
                </div>
              </div>

              <div className={`space-y-3 text-xs ${isLight ? 'text-stone-700' : 'text-stone-300'}`}>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Aktif Selamanya tanpa masa hangus</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Nama Tamu s/d 50 Orang</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Galeri Foto (5 Foto)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Musik Latar Preset Standar</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Konfirmasi Kehadiran & Doa Tamu</span>
                </div>
              </div>
            </div>

            <div className={`mt-8 pt-4 border-t ${isLight ? 'border-stone-200' : 'border-gold-subtle'}`}>
              <button
                onClick={() => onSelectTier('Basic')}
                className={`w-full py-2.5 rounded-xl border font-bold text-xs uppercase tracking-wider transition-colors ${
                  isLight
                    ? 'border-amber-300 text-stone-800 hover:bg-amber-100/50'
                    : 'border-gold-subtle text-stone-200 hover:bg-white/10'
                }`}
              >
                Pilih Paket Basic
              </button>
            </div>
          </div>

          {/* Card 2: Premium Digital (Highlighted Best Seller) */}
          <div className={`rounded-3xl p-6 sm:p-7 border-2 shadow-xl flex flex-col justify-between relative ${
            isLight
              ? 'bg-gradient-to-b from-[#FFFDF9] to-[#FAF3E0] border-amber-400 shadow-amber-950/10'
              : 'bg-gradient-to-b from-[#0e3a36] to-[#072422] border-gold-400 shadow-velvet-deep'
          }`}>
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-gold-400 text-black text-[11px] font-bold px-4 py-1 rounded-full shadow uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              Paling Pas & Terlaris
            </div>

            <div>
              <span className={`text-xs font-bold uppercase tracking-wider ${isLight ? 'text-amber-800' : 'text-gold-300'}`}>Digital Premium</span>
              <h4 className={`text-xl font-bold mt-1 ${isLight ? 'text-stone-900' : 'text-white'}`}>Paket Premium</h4>
              <p className={`text-xs mt-1 ${isLight ? 'text-stone-600' : 'text-stone-300'}`}>Fitur lengkap, bebas personalisasi Canva</p>

              <div className="mt-6 mb-6">
                <span className="text-stone-400 text-xs line-through block">Rp 250.000</span>
                <div className="flex items-baseline gap-1">
                  <span className={`text-3xl font-bold ${isLight ? 'text-amber-900' : 'text-gold-bright'}`}>Rp 110.000</span>
                  <span className="text-[10px] text-emerald-600 font-bold bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">Hemat 56%</span>
                </div>
              </div>

              <div className={`space-y-3 text-xs ${isLight ? 'text-stone-800' : 'text-stone-200'}`}>
                <div className="flex items-center gap-2 font-semibold">
                  <Check className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span>Semua fitur Basic +</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span><strong>Unlimited Tamu & Link Personal WA</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span><strong>Amplop Digital (QRIS & Salin Rekening)</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span>Akses Canva Editor Multi-Halaman</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span>Upload Lagu Latar Sendiri</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span>Galeri s/d 20 Foto + Video</span>
                </div>
              </div>
            </div>

            <div className={`mt-8 pt-4 border-t ${isLight ? 'border-amber-200' : 'border-gold-subtle'}`}>
              <button
                onClick={() => onSelectTier('Premium')}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-gold-400 text-black font-bold text-xs uppercase tracking-wider shadow-sm transition-all hover:scale-102"
              >
                Pilih Paket Premium
              </button>
            </div>
          </div>

          {/* Card 3: VIP Terima Beres */}
          <div className={`rounded-3xl p-6 sm:p-7 border flex flex-col justify-between transition-all shadow-md ${
            isLight ? 'bg-white border-[#E8DEC8] hover:border-amber-400' : 'bg-[#061e1d] border-gold-subtle hover:border-gold-400'
          }`}>
            <div>
              <span className={`text-xs font-bold uppercase tracking-wider ${isLight ? 'text-stone-500' : 'text-stone-400'}`}>Digital Eksklusif</span>
              <h4 className={`text-xl font-bold mt-1 ${isLight ? 'text-stone-900' : 'text-white'}`}>Mode Terima Beres</h4>
              <p className={`text-xs mt-1 ${isLight ? 'text-stone-600' : 'text-stone-400'}`}>Dibuatkan tim desainer sampai beres</p>

              <div className="mt-6 mb-6">
                <span className="text-stone-400 text-xs line-through block">Rp 350.000</span>
                <div className="flex items-baseline gap-1">
                  <span className={`text-3xl font-bold ${isLight ? 'text-stone-900' : 'text-white'}`}>Rp 180.000</span>
                  <span className={`text-xs font-medium ${isLight ? 'text-stone-500' : 'text-stone-400'}`}>/ all-in</span>
                </div>
              </div>

              <div className={`space-y-3 text-xs ${isLight ? 'text-stone-700' : 'text-stone-300'}`}>
                <div className="flex items-center gap-2 font-semibold">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Semua fitur Paket Premium +</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span><strong>Disusunkan tim desainer HariNikah</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Selesai kilat 1x24 jam</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Revisi tanpa batas sebelum sebar</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Bantuan upload list tamu undangan</span>
                </div>
              </div>
            </div>

            <div className={`mt-8 pt-4 border-t ${isLight ? 'border-stone-200' : 'border-gold-subtle'}`}>
              <button
                onClick={() => onSelectTier('VIP Terima Beres')}
                className={`w-full py-2.5 rounded-xl border font-bold text-xs uppercase tracking-wider transition-colors ${
                  isLight
                    ? 'bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200'
                    : 'bg-white/10 hover:bg-white/15 text-stone-200 border border-gold-subtle'
                }`}
              >
                Pilih Mode Terima Beres
              </button>
            </div>
          </div>

          {/* Card 4: Cetak Fisik & Bundling */}
          <div className={`rounded-3xl p-6 sm:p-7 border-2 flex flex-col justify-between transition-all shadow-md ${
            isLight
              ? 'bg-white border-[#E8DEC8] hover:border-amber-400'
              : 'bg-gradient-to-br from-[#0c2e2b] to-[#041514] border-gold-400/60'
          }`}>
            <div>
              <span className={`text-xs font-bold uppercase tracking-wider ${isLight ? 'text-amber-800' : 'text-gold-400'}`}>Cetak Fisik & Bundling</span>
              <h4 className={`text-xl font-bold mt-1 ${isLight ? 'text-stone-900' : 'text-white'}`}>Undangan Cetak</h4>
              <p className={`text-xs mt-1 ${isLight ? 'text-stone-600' : 'text-stone-400'}`}>Velvet, Kalkir & Foil Emas</p>

              <div className="mt-6 mb-6">
                <span className="text-stone-400 text-xs block">Mulai dari</span>
                <div className="flex items-baseline gap-1">
                  <span className={`text-3xl font-bold ${isLight ? 'text-amber-800' : 'text-gold-bright'}`}>Rp 4.500</span>
                  <span className={`text-xs font-medium ${isLight ? 'text-stone-500' : 'text-stone-400'}`}>/ pcs</span>
                </div>
              </div>

              <div className={`space-y-3 text-xs ${isLight ? 'text-stone-700' : 'text-stone-300'}`}>
                <div className="flex items-center gap-2 font-bold text-amber-700">
                  <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span>GRATIS Undangan Web Digital (≥200 pcs)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span>Hardcover Board 30 / Softcover</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span>Hotprint Gold Foil & Wax Seal</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span>Bisa pesan Sample Box ke rumah</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span>Konsultasi tatap muka di Showroom</span>
                </div>
              </div>
            </div>

            <div className={`mt-8 pt-4 border-t ${isLight ? 'border-stone-200' : 'border-gold-subtle'}`}>
              <button
                onClick={onOpenSampleModal}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-gold-400 hover:from-amber-500 hover:to-gold-500 text-black font-bold text-xs uppercase tracking-wider shadow transition-colors"
              >
                Pesan Sample Box Fisik
              </button>
            </div>
          </div>

        </div>

        {/* Payment Gateways */}
        <div className="mt-16 text-center">
          <p className={`text-[11px] uppercase font-semibold tracking-wider mb-4 ${
            isLight ? 'text-stone-600' : 'text-stone-400'
          }`}>
            Metode Pembayaran Otomatis & Terverifikasi Instan
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold">
            {['QRIS (GoPay, OVO, ShopeePay, Dana)', 'Virtual Account BCA', 'Virtual Account Mandiri', 'Virtual Account BRI / BNI', 'Transfer Manual WhatsApp'].map((gw, i) => (
              <span key={i} className={`px-3 py-1.5 rounded-lg border shadow-sm ${
                isLight ? 'bg-white border-[#E8DEC8] text-stone-700' : 'bg-[#031110] border-gold-subtle text-stone-300'
              }`}>
                {gw}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
