'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  X, 
  Clock, 
  CheckCircle2, 
  Heart, 
  ShieldCheck, 
  Sparkles, 
  Tag, 
  CreditCard,
  Building2,
  QrCode,
  Smartphone,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { useInvitation } from '../../context/InvitationContext';

interface ActivationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const ActivationModal: React.FC<ActivationModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const { themeMode } = useInvitation();
  const isLight = themeMode === 'light';

  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'premium' | 'exclusive'>('premium');
  const [paymentMethod, setPaymentMethod] = useState<'auto' | 'manual'>('auto');
  const [voucherCode, setVoucherCode] = useState('');
  const [isVoucherApplied, setIsVoucherApplied] = useState(true);
  const [countdown, setCountdown] = useState('47:59:30');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaidSuccess, setIsPaidSuccess] = useState(false);

  useEffect(() => {
    let secs = 47 * 3600 + 59 * 60 + 30;
    const interval = setInterval(() => {
      if (secs > 0) {
        secs--;
        const h = Math.floor(secs / 3600);
        const m = Math.floor((secs % 3600) / 60);
        const s = secs % 60;
        setCountdown(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isOpen) return null;

  const planPrices = {
    basic: { normal: 150000, promo: 75000, discount: 15000 },
    premium: { normal: 250000, promo: 110000, discount: 22000 },
    exclusive: { normal: 400000, promo: 180000, discount: 36000 }
  };

  const currentPrice = planPrices[selectedPlan];
  const finalPrice = isVoucherApplied ? currentPrice.promo - currentPrice.discount : currentPrice.promo;

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaidSuccess(true);
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#dfb051', '#34d399', '#ffffff', '#e11d48']
        });
      } catch (e) {}
      if (onSuccess) onSuccess();
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto font-sans">
        
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 20 }}
          transition={{ duration: 0.25 }}
          className={`relative max-w-4xl w-full rounded-[36px] p-6 sm:p-8 shadow-2xl my-6 border overflow-hidden transition-all ${
            isLight
              ? 'bg-[#FAF8F5] text-stone-900 border-amber-300 shadow-amber-950/20'
              : 'bg-[#061e1d] text-stone-100 border-gold-400/80 shadow-velvet-deep'
          }`}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className={`absolute top-5 right-5 p-2 rounded-full transition-colors ${
              isLight ? 'text-stone-400 hover:text-stone-900 hover:bg-stone-200' : 'text-stone-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <X className="w-5 h-5" />
          </button>

          {isPaidSuccess ? (
            <div className="text-center py-12 space-y-4 max-w-md mx-auto">
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto shadow-xl">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <span className="text-[10px] uppercase font-black tracking-widest text-emerald-400">
                PEMBAYARAN BERHASIL
              </span>
              <h2 className={`text-3xl font-extrabold ${isLight ? 'text-stone-900' : 'text-gold-bright'}`}>
                Undangan Aktif Selamanya!
              </h2>
              <p className={`text-xs ${isLight ? 'text-stone-600' : 'text-stone-300'}`}>
                Selamat! Paket <strong>{selectedPlan.toUpperCase()}</strong> Anda telah aktif seumur hidup. Anda dapat mengedit tanpa batas, menyebarkan link tamu dengan nama khusus, dan menerima amplop digital.
              </p>
              <button
                onClick={() => {
                  setIsPaidSuccess(false);
                  onClose();
                }}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-gold-300 to-amber-500 text-black font-extrabold text-xs uppercase tracking-wider shadow-gold-sm"
              >
                Lanjut Kelola Undangan
              </button>
            </div>
          ) : (
            <div>
              {/* Top Category & Title */}
              <div className="mb-4">
                <span className={`text-[10px] uppercase font-extrabold tracking-widest px-3 py-0.5 rounded-full border ${
                  isLight ? 'bg-rose-100 text-rose-700 border-rose-300' : 'bg-gold-950 text-gold-300 border-gold-subtle'
                }`}>
                  AKTIVASI UNDANGAN
                </span>
                <h2 className={`text-2xl sm:text-3xl font-extrabold mt-1.5 ${
                  isLight ? 'text-stone-900' : 'text-gold-bright'
                }`}>
                  Aktifkan undangan kamu
                </h2>
                <p className={`text-xs mt-1 ${isLight ? 'text-stone-600' : 'text-stone-300'}`}>
                  Sekali bayar, aktif selamanya. Setelah aktif kamu tetap bisa mengedit tanpa batas.
                </p>

                {/* Trial & Countdown Badges */}
                <div className="flex flex-wrap items-center gap-2 mt-3 text-xs">
                  <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border ${
                    isLight ? 'bg-stone-100 border-stone-200 text-stone-700' : 'bg-white/5 border-white/10 text-stone-300'
                  }`}>
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    <span>Masa percobaan tersisa <strong>2 hari 23 jam</strong></span>
                  </div>

                  <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border ${
                    isLight ? 'bg-rose-50 border-rose-200 text-rose-700' : 'bg-rose-950/60 border-rose-500/40 text-rose-300'
                  }`}>
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                    <span>Buat pembayaran dalam <strong>{countdown}</strong> supaya diskon amplop 20% tetap berlaku</span>
                  </div>
                </div>
              </div>

              {/* Main 2-Column Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-5 items-start">
                
                {/* LEFT: Choose Package & Features */}
                <div className="lg:col-span-7 space-y-4">
                  <span className={`text-xs font-bold uppercase tracking-wider block ${
                    isLight ? 'text-stone-700' : 'text-stone-300'
                  }`}>
                    Pilih paket:
                  </span>

                  {/* 3 Packages Cards */}
                  <div className="grid grid-cols-3 gap-2.5">
                    {[
                      { id: 'basic', name: 'Basic', price: '75.000', orig: '150.000', disc: '50%', desc: 'Desain sederhana' },
                      { id: 'premium', name: 'Premium', price: '110.000', orig: '250.000', disc: '56%', desc: 'Paling pas untuk kebanyakan pasangan', popular: true },
                      { id: 'exclusive', name: 'Eksklusif', price: '180.000', orig: '400.000', disc: '55%', desc: 'Fitur lengkap, semua tema' },
                    ].map((plan) => {
                      const isSel = selectedPlan === plan.id;
                      return (
                        <div
                          key={plan.id}
                          onClick={() => setSelectedPlan(plan.id as any)}
                          className={`p-3 rounded-2xl border-2 cursor-pointer transition-all relative flex flex-col justify-between ${
                            isSel
                              ? isLight
                                ? 'bg-rose-50/70 border-rose-400 shadow-md ring-2 ring-rose-300/40'
                                : 'bg-gold-950/80 border-gold-400 shadow-gold-sm ring-2 ring-gold-400/40'
                              : isLight
                              ? 'bg-white border-stone-200 hover:border-amber-300'
                              : 'bg-white/5 border-white/10 hover:border-gold-subtle'
                          }`}
                        >
                          {plan.popular && (
                            <span className="absolute -top-2.5 right-2 px-2 py-0.5 rounded-full bg-gradient-to-r from-rose-500 to-rose-600 text-white text-[8px] font-black uppercase tracking-wider shadow-sm">
                              TERLARIS
                            </span>
                          )}

                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className={`text-xs font-extrabold ${isSel ? (isLight ? 'text-rose-700' : 'text-gold-300') : (isLight ? 'text-stone-700' : 'text-stone-300')}`}>
                                {plan.name}
                              </span>
                              {isSel && <CheckCircle2 className={`w-3.5 h-3.5 ${isLight ? 'text-rose-600' : 'text-gold-400'}`} />}
                            </div>
                            <p className={`text-base font-black ${isLight ? 'text-stone-900' : 'text-gold-bright'}`}>
                              IDR {plan.price}
                            </p>
                            <p className="text-[10px] text-stone-400 line-through">
                              IDR {plan.orig}
                            </p>
                          </div>

                          <p className={`text-[10px] mt-2 font-medium leading-tight ${isLight ? 'text-stone-500' : 'text-stone-400'}`}>
                            {plan.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Included Feature List for Selected Plan */}
                  <div className={`p-4 rounded-2xl border ${
                    isLight ? 'bg-white border-stone-200' : 'bg-[#041514] border-gold-subtle'
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-xs font-bold flex items-center gap-1.5 ${
                        isLight ? 'text-rose-600' : 'text-gold-400'
                      }`}>
                        <Heart className="w-3.5 h-3.5 fill-current" />
                        <span>Yang kamu dapat di paket {selectedPlan.toUpperCase()} (9 fitur):</span>
                      </span>
                      <span className="text-[10px] text-stone-400">Aktif Seumur Hidup</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {[
                        'Semua fitur paket Basic',
                        'Amplop digital & direct bank transfer',
                        'Tamu bisa kirim ucapan & doa realtime',
                        'Galeri foto sampai 10 foto & video',
                        'Cerita perjalanan cinta (Love Story)',
                        'Link tamu tak terbatas (100+ nama)',
                        'Musik latar adat (Jawa & Minang) + custom',
                        'Pilihan desain modern & budaya premium',
                        'Bisa pakai custom domain (namakalian.com)',
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-1.5">
                          <CheckCircle2 className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${
                            isLight ? 'text-emerald-600' : 'text-emerald-400'
                          }`} />
                          <span className={`text-[11px] ${isLight ? 'text-stone-700' : 'text-stone-300'}`}>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* RIGHT: Summary & Payment Methods */}
                <div className={`lg:col-span-5 rounded-3xl p-5 border space-y-4 ${
                  isLight ? 'bg-white border-stone-200 shadow-md' : 'bg-[#031110] border-gold-400/50'
                }`}>
                  <span className={`text-xs font-bold uppercase tracking-wider block ${
                    isLight ? 'text-stone-700' : 'text-stone-300'
                  }`}>
                    Ringkasan Tagihan:
                  </span>

                  {/* Bill Breakdown */}
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center text-stone-400">
                      <span>Paket {selectedPlan.toUpperCase()}</span>
                      <span className="line-through">IDR {currentPrice.normal.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between items-center font-semibold">
                      <span className={isLight ? 'text-stone-800' : 'text-stone-200'}>Harga Spesial Promo</span>
                      <span className={isLight ? 'text-stone-900' : 'text-white'}>IDR {currentPrice.promo.toLocaleString('id-ID')}</span>
                    </div>

                    {/* Voucher Applied Box */}
                    {isVoucherApplied && (
                      <div className={`p-2.5 rounded-xl border flex items-center justify-between text-xs ${
                        isLight ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                      }`}>
                        <div>
                          <p className="font-extrabold text-[11px]">Diskon Amplop 20% Terpasang</p>
                          <p className="text-[10px] opacity-80">Hemat IDR {currentPrice.discount.toLocaleString('id-ID')}</p>
                        </div>
                        <span className="font-bold text-xs">-IDR {currentPrice.discount.toLocaleString('id-ID')}</span>
                      </div>
                    )}

                    {/* Voucher Input */}
                    <div className="flex gap-1.5 pt-1">
                      <input
                        type="text"
                        placeholder="Punya kode voucher?"
                        value={voucherCode}
                        onChange={(e) => setVoucherCode(e.target.value)}
                        className={`flex-1 px-3 py-1.5 rounded-xl border text-xs ${
                          isLight ? 'bg-[#FAF8F5] border-stone-300 text-stone-900' : 'bg-white/5 border-white/10 text-stone-100'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (voucherCode) {
                            setIsVoucherApplied(true);
                            alert('Voucher berhasil digunakan!');
                          }
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                          isLight ? 'bg-stone-900 text-white hover:bg-stone-800' : 'bg-gold-400 text-black hover:bg-gold-300'
                        }`}
                      >
                        Pakai
                      </button>
                    </div>

                    <div className="h-px bg-stone-300/40 my-2" />

                    <div className="flex justify-between items-center text-sm font-black">
                      <span className={isLight ? 'text-stone-900' : 'text-white'}>Total Pembayaran:</span>
                      <span className={`text-lg ${isLight ? 'text-rose-600' : 'text-gold-bright'}`}>
                        IDR {finalPrice.toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>

                  {/* Payment Method Selector */}
                  <div className="space-y-2 pt-1">
                    <span className={`text-xs font-bold block ${isLight ? 'text-stone-700' : 'text-stone-300'}`}>
                      Cara Bayar:
                    </span>

                    {/* Option 1: Automatic */}
                    <div
                      onClick={() => setPaymentMethod('auto')}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        paymentMethod === 'auto'
                          ? isLight
                            ? 'bg-rose-50/80 border-rose-400 shadow-sm'
                            : 'bg-gold-950/60 border-gold-400 shadow-sm'
                          : isLight
                          ? 'bg-stone-50 border-stone-200'
                          : 'bg-white/5 border-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold">Bayar otomatis</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-500 font-extrabold uppercase">
                          Direkomendasikan
                        </span>
                      </div>
                      <p className={`text-[10px] mt-0.5 ${isLight ? 'text-stone-500' : 'text-stone-400'}`}>
                        VA, QRIS, e-wallet. Aktif otomatis tanpa konfirmasi manual.
                      </p>
                      
                      {/* Mini bank badges */}
                      <div className="flex flex-wrap items-center gap-1 mt-2">
                        {['BCA', 'Mandiri', 'BNI', 'BRI', 'QRIS', 'GoPay', 'OVO'].map((b) => (
                          <span
                            key={b}
                            className={`px-1.5 py-0.5 rounded text-[9px] font-bold border ${
                              isLight ? 'bg-white border-stone-300 text-stone-700' : 'bg-black/40 border-white/10 text-stone-300'
                            }`}
                          >
                            {b}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Option 2: Manual Transfer */}
                    <div
                      onClick={() => setPaymentMethod('manual')}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        paymentMethod === 'manual'
                          ? isLight
                            ? 'bg-rose-50/80 border-rose-400 shadow-sm'
                            : 'bg-gold-950/60 border-gold-400 shadow-sm'
                          : isLight
                          ? 'bg-stone-50 border-stone-200'
                          : 'bg-white/5 border-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold">Transfer manual BCA</span>
                      </div>
                      <p className={`text-[10px] mt-0.5 ${isLight ? 'text-stone-500' : 'text-stone-400'}`}>
                        Konfirmasi via WhatsApp admin HariNikah setelah transfer.
                      </p>
                    </div>
                  </div>

                  {/* Pay button */}
                  <button
                    disabled={isProcessing}
                    onClick={handlePay}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-gold-300 to-amber-500 text-black font-extrabold text-xs uppercase tracking-wider shadow-gold-sm hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <span>Memproses Pembayaran...</span>
                    ) : (
                      <>
                        <span>Bayar Sekarang (IDR {finalPrice.toLocaleString('id-ID')})</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className={`text-[10px] text-center ${isLight ? 'text-stone-400' : 'text-stone-500'}`}>
                    🔒 Enkripsi SSL 256-Bit • Garansi 100% Kepuasan Pasangan
                  </p>
                </div>

              </div>
            </div>
          )}

        </motion.div>

      </div>
    </AnimatePresence>
  );
};

