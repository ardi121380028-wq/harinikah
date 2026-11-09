'use client';

import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  CreditCard, 
  ShieldCheck, 
  CheckCircle2, 
  Copy, 
  QrCode, 
  Clock, 
  ExternalLink, 
  Sun, 
  Moon, 
  Sparkles, 
  ShoppingBag, 
  Send 
} from 'lucide-react';
import { useInvitation } from '../../context/InvitationContext';

export default function CheckoutPage() {
  const { themeMode, toggleThemeMode } = useInvitation();
  const isLight = themeMode === 'light';

  const [selectedPlan, setSelectedPlan] = useState<'premium' | 'dfy' | 'bundling'>('premium');
  const [paymentMethod, setPaymentMethod] = useState<'qris' | 'shopeepay' | 'bca' | 'mandiri'>('qris');
  const [copiedBank, setCopiedBank] = useState(false);
  const [buyerName, setBuyerName] = useState('Dimas Setiawan');
  const [buyerPhone, setBuyerPhone] = useState('081278901234');
  const [buyerEmail, setBuyerEmail] = useState('dimas@harinikah.com');

  // Countdown timer simulation (24 hours)
  const [timeLeft, setTimeLeft] = useState(86390);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getPlanPrice = () => {
    if (selectedPlan === 'premium') return 110000;
    if (selectedPlan === 'dfy') return 180000;
    return 350000;
  };

  const planTitle = 
    selectedPlan === 'premium' ? 'Paket Digital Premium (Canva Editor)' :
    selectedPlan === 'dfy' ? 'Paket Digital Eksklusif (Mode Terima Beres)' :
    'Paket Bundling Nusantara (Cetak Fisik + Web)';

  const handleCopyAcc = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2000);
  };

  const handleWhatsAppConfirm = () => {
    const priceFormatted = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(getPlanPrice());
    const message = `Halo Admin HariNikah (Bandar Lampung), saya ingin konfirmasi pembayaran:
Nama: ${buyerName}
No. HP: ${buyerPhone}
Paket: ${planTitle}
Nominal: ${priceFormatted}
Metode: ${paymentMethod.toUpperCase()}

Mohon verifikasi dan aktifkan akun editor saya. Terima kasih!`;

    window.open(`https://api.whatsapp.com/send?phone=6281234567890&text=${encodeURIComponent(message)}`, '_blank');
  };

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
              Kasir Pembayaran
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

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Timer Bar */}
        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs font-semibold text-amber-500">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 animate-pulse" />
            <span>Selesaikan pembayaran sebelum batas waktu berakhir:</span>
          </div>
          <span className="font-mono text-sm font-bold bg-amber-500 text-black px-3 py-0.5 rounded-lg">
            {formatTime(timeLeft)}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form & Package Selection (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Package Selection */}
            <div className={`p-6 rounded-3xl border space-y-4 ${
              isLight ? 'bg-white border-[#E8DEC8]' : 'bg-[#071f1e] border-gold-subtle'
            }`}>
              <h2 className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${
                isLight ? 'text-amber-900' : 'text-gold-300'
              }`}>
                <span className="w-5 h-5 rounded-full bg-amber-500 text-black flex items-center justify-center text-xs">1</span>
                Pilih Paket Layanan
              </h2>

              <div className="space-y-3">
                <div 
                  onClick={() => setSelectedPlan('premium')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    selectedPlan === 'premium'
                      ? 'border-amber-400 bg-amber-500/10 shadow-gold-sm'
                      : isLight ? 'border-stone-200 hover:border-amber-300' : 'border-white/10 hover:border-gold-subtle'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-500">Paling Pas & Terlaris</span>
                      <h3 className="text-sm font-bold mt-0.5">Paket Premium Canva Editor (DIY)</h3>
                      <p className="text-[11px] text-stone-400">Akses penuh editor multi-halaman, unlimited nama tamu, amplop QRIS</p>
                    </div>
                    <span className="text-base font-bold text-amber-500 whitespace-nowrap">Rp 110.000</span>
                  </div>
                </div>

                <div 
                  onClick={() => setSelectedPlan('dfy')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    selectedPlan === 'dfy'
                      ? 'border-amber-400 bg-amber-500/10 shadow-gold-sm'
                      : isLight ? 'border-stone-200 hover:border-amber-300' : 'border-white/10 hover:border-gold-subtle'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-sky-400">Terima Beres (VIP)</span>
                      <h3 className="text-sm font-bold mt-0.5">Paket Mode Terima Beres</h3>
                      <p className="text-[11px] text-stone-400">Disusunkan tim desainer profesional HariNikah kilat 1x24 jam</p>
                    </div>
                    <span className="text-base font-bold text-amber-500 whitespace-nowrap">Rp 180.000</span>
                  </div>
                </div>

                <div 
                  onClick={() => setSelectedPlan('bundling')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    selectedPlan === 'bundling'
                      ? 'border-amber-400 bg-amber-500/10 shadow-gold-sm'
                      : isLight ? 'border-stone-200 hover:border-amber-300' : 'border-white/10 hover:border-gold-subtle'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-400">Bundling Spesial</span>
                      <h3 className="text-sm font-bold mt-0.5">Bundling Harmoni Nusantara</h3>
                      <p className="text-[11px] text-stone-400">Undangan fisik beludru + GRATIS website undangan digital</p>
                    </div>
                    <span className="text-base font-bold text-amber-500 whitespace-nowrap">Rp 350.000</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Customer Data */}
            <div className={`p-6 rounded-3xl border space-y-4 ${
              isLight ? 'bg-white border-[#E8DEC8]' : 'bg-[#071f1e] border-gold-subtle'
            }`}>
              <h2 className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${
                isLight ? 'text-amber-900' : 'text-gold-300'
              }`}>
                <span className="w-5 h-5 rounded-full bg-amber-500 text-black flex items-center justify-center text-xs">2</span>
                Informasi Pemesan
              </h2>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-bold block mb-1">Nama Lengkap Pemesan:</label>
                  <input
                    type="text"
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    className={`w-full px-3.5 py-2 rounded-xl border text-xs ${
                      isLight ? 'bg-stone-50 border-stone-300 text-stone-900' : 'bg-black/40 border-gold-subtle text-white'
                    }`}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold block mb-1">Nomor WhatsApp Aktif:</label>
                    <input
                      type="tel"
                      value={buyerPhone}
                      onChange={(e) => setBuyerPhone(e.target.value)}
                      className={`w-full px-3.5 py-2 rounded-xl border text-xs ${
                        isLight ? 'bg-stone-50 border-stone-300 text-stone-900' : 'bg-black/40 border-gold-subtle text-white'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="font-bold block mb-1">Alamat Email:</label>
                    <input
                      type="email"
                      value={buyerEmail}
                      onChange={(e) => setBuyerEmail(e.target.value)}
                      className={`w-full px-3.5 py-2 rounded-xl border text-xs ${
                        isLight ? 'bg-stone-50 border-stone-300 text-stone-900' : 'bg-black/40 border-gold-subtle text-white'
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Invoice & Payment Methods (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Step 3: Payment Gateway Selector */}
            <div className={`p-6 rounded-3xl border space-y-4 ${
              isLight ? 'bg-white border-[#E8DEC8]' : 'bg-[#071f1e] border-gold-subtle'
            }`}>
              <h2 className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${
                isLight ? 'text-amber-900' : 'text-gold-300'
              }`}>
                <span className="w-5 h-5 rounded-full bg-amber-500 text-black flex items-center justify-center text-xs">3</span>
                Pilih Metode Pembayaran
              </h2>

              <div className="space-y-2.5">
                {/* QRIS */}
                <div
                  onClick={() => setPaymentMethod('qris')}
                  className={`p-3 rounded-2xl border cursor-pointer flex items-center justify-between text-xs transition-all ${
                    paymentMethod === 'qris'
                      ? 'border-emerald-400 bg-emerald-500/10'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <QrCode className="w-4 h-4 text-emerald-400" />
                    <span className="font-bold">QRIS Instant (BCA, Mandiri, GoPay, OVO, Dana)</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold">Otomatis ACC</span>
                </div>

                {/* ShopeePay */}
                <div
                  onClick={() => setPaymentMethod('shopeepay')}
                  className={`p-3 rounded-2xl border cursor-pointer flex items-center justify-between text-xs transition-all ${
                    paymentMethod === 'shopeepay'
                      ? 'border-[#EE4D2D] bg-[#EE4D2D]/10'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <ShoppingBag className="w-4 h-4 text-[#EE4D2D]" />
                    <span className="font-bold text-[#EE4D2D]">ShopeePay & SPayLater Official</span>
                  </div>
                  <span className="text-[10px] bg-[#EE4D2D]/20 text-[#EE4D2D] px-2 py-0.5 rounded-full font-bold">
                    Official
                  </span>
                </div>

                {/* Bank BCA */}
                <div
                  onClick={() => setPaymentMethod('bca')}
                  className={`p-3 rounded-2xl border cursor-pointer flex items-center justify-between text-xs transition-all ${
                    paymentMethod === 'bca'
                      ? 'border-amber-400 bg-amber-500/10'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <CreditCard className="w-4 h-4 text-amber-500" />
                    <span className="font-bold">Transfer Bank BCA</span>
                  </div>
                  <span className="text-[10px] text-stone-400">Verifikasi WA</span>
                </div>
              </div>

              {/* Payment Box Display */}
              <div className={`p-4 rounded-2xl border text-center space-y-3 mt-4 ${
                isLight ? 'bg-amber-50/70 border-amber-200' : 'bg-black/50 border-gold-subtle'
              }`}>
                {paymentMethod === 'qris' && (
                  <div className="space-y-3">
                    <p className="text-xs font-bold text-emerald-500">Scan QRIS Resmi HariNikah</p>
                    <div className="w-44 h-44 bg-white p-2.5 rounded-2xl mx-auto shadow-md border-2 border-emerald-500/50 flex items-center justify-center">
                      <img
                        src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://harinikah.com/checkout-success"
                        alt="QRIS HariNikah"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <p className="text-[10px] text-stone-500">
                      Mendukung seluruh aplikasi M-Banking & E-Wallet di Indonesia
                    </p>
                  </div>
                )}

                {paymentMethod === 'shopeepay' && (
                  <div className="space-y-3 py-2">
                    <ShoppingBag className="w-8 h-8 text-[#EE4D2D] mx-auto" />
                    <p className="text-xs font-bold text-[#EE4D2D]">
                      Bayar via Shopee Official Store
                    </p>
                    <p className="text-[11px] text-stone-400 max-w-xs mx-auto">
                      Checkout langsung melalui katalog resmi Shopee kami untuk mendapatkan cashback koin & SPayLater 0% bunga!
                    </p>
                    <a
                      href="https://shopee.co.id/harinikah_official"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#EE4D2D] hover:bg-[#D73211] text-white text-xs font-bold"
                    >
                      <span>Buka Aplikasi Shopee</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}

                {paymentMethod === 'bca' && (
                  <div className="space-y-2 text-left">
                    <p className="text-xs text-stone-400">Nomor Rekening Bank BCA:</p>
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/10 border border-white/20 font-mono text-sm">
                      <span className="font-bold text-white">8820 1234 5678</span>
                      <button
                        onClick={() => handleCopyAcc('882012345678')}
                        className="text-xs text-amber-400 hover:underline flex items-center gap-1"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>{copiedBank ? 'Tersalin!' : 'Salin'}</span>
                      </button>
                    </div>
                    <p className="text-[11px] text-stone-400">Atas Nama: <strong>PT HARI NIKAH NUSANTARA</strong></p>
                  </div>
                )}
              </div>

              {/* Total Summary */}
              <div className="pt-4 border-t border-black/10 space-y-2 text-xs">
                <div className="flex justify-between text-stone-400">
                  <span>Subtotal Paket:</span>
                  <span>Rp {getPlanPrice().toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-emerald-500 font-semibold">
                  <span>Diskon Promo Spesial:</span>
                  <span>- Rp 0</span>
                </div>
                <div className="flex justify-between text-base font-bold text-amber-500 pt-2 border-t border-black/10">
                  <span>Total Pembayaran:</span>
                  <span className="text-xl">Rp {getPlanPrice().toLocaleString('id-ID')}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 space-y-2.5">
                <button
                  onClick={handleWhatsAppConfirm}
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-gold-400 text-black font-bold text-xs uppercase tracking-wider shadow-gold-sm hover:scale-102 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Konfirmasi Pembayaran via WhatsApp</span>
                </button>

                <a
                  href="/editor"
                  className="w-full py-2.5 rounded-xl border border-stone-500/30 text-stone-400 hover:text-white text-xs font-semibold flex items-center justify-center transition-colors"
                >
                  Masuk ke Editor Nanti Saja
                </a>
              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

