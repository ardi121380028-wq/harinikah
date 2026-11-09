'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  Layers, 
  Box, 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  Heart, 
  Smartphone,
  Play,
  Pause, 
  ArrowRight
} from 'lucide-react';
import { useInvitation } from '../../context/InvitationContext';

interface HeroSectionProps {
  onStartDIY: () => void;
  onOpenSampleModal: () => void;
  onOpenEditor: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ 
  onStartDIY, 
  onOpenSampleModal,
  onOpenEditor 
}) => {
  const { themeMode } = useInvitation();
  const isLight = themeMode === 'light';

  const [activeTab, setActiveTab] = useState<'digital' | 'physical'>('digital');
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className={`relative overflow-hidden pt-10 pb-20 lg:pt-14 lg:pb-28 font-sans transition-colors duration-300 ${
      isLight ? 'bg-[#FAF8F5]' : 'bg-velvet-texture bg-cover bg-center'
    }`}>
      
      {/* Luxury Background Overlays */}
      {isLight ? (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-[#F5EFE6]/70 via-[#FAF8F5] to-[#FAF8F5] -z-10" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-200/25 rounded-full blur-3xl -z-10 pointer-events-none" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-[#041514]/90 via-[#06201f]/85 to-[#041514] -z-10" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gold-400/10 rounded-full blur-3xl -z-10 pointer-events-none" />
        </>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: High-End Luxury Copywriting */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Top Luxury Badge */}
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full shadow-sm ${
              isLight
                ? 'bg-amber-100/80 border border-amber-300/80 text-amber-900'
                : 'bg-gold-950/80 border border-gold-400/40 text-gold-200 shadow-gold-sm'
            }`}>
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span className="text-xs font-semibold tracking-wide">
                The Luxury Wedding Invitation Suite
              </span>
            </div>

            {/* ONLY H1 USES SERIF AS REQUESTED */}
            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight leading-[1.15] ${
              isLight ? 'text-stone-900' : 'text-white'
            }`}>
              Elegan di Layar, <br />
              <span className={isLight ? 'text-gold-light' : 'text-gold-bright'}>
                Mewah Saat Disentuh.
              </span>
            </h1>

            {/* Subheadline */}
            <p className={`text-sm sm:text-base max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal ${
              isLight ? 'text-stone-600' : 'text-stone-300'
            }`}>
              Platform undangan pernikahan nomor satu di Indonesia. Nikmati kebebasan mendesain undangan digital interaktif layaknya Canva dengan sistem per-halaman, atau hadirkan kemewahan fisik berbalut velvet, hotprint emas murni, dan wax seal cap lilin.
            </p>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              
              {/* Canva Editor Direct CTA */}
              <button
                onClick={onOpenEditor}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold text-black bg-gradient-to-r from-amber-400 via-gold-300 to-amber-500 rounded-full shadow-gold-glow hover:scale-105 active:scale-95 transition-all"
              >
                <Layers className="w-4 h-4" />
                <span>Buka Demo Editor Canva</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenSampleModal}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold rounded-full border transition-all ${
                  isLight
                    ? 'bg-white border-amber-300 text-stone-800 hover:bg-amber-50 shadow-sm'
                    : 'bg-[#061e1d]/80 border-gold-subtle text-stone-200 hover:bg-gold-950 hover:border-gold-400'
                }`}
              >
                <Box className="w-4 h-4 text-gold-400" />
                <span>Pesan Sample Box Fisik</span>
              </button>
            </div>

            {/* Three Pillar Checklist */}
            <div className="pt-3 grid grid-cols-2 sm:grid-cols-3 gap-3 text-left max-w-lg mx-auto lg:mx-0">
              <div className={`flex items-center gap-2 text-xs font-medium ${isLight ? 'text-stone-700' : 'text-stone-300'}`}>
                <CheckCircle2 className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>Editor Canva Multi-Page</span>
              </div>
              <div className={`flex items-center gap-2 text-xs font-medium ${isLight ? 'text-stone-700' : 'text-stone-300'}`}>
                <CheckCircle2 className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>Bisa Mode Terima Beres</span>
              </div>
              <div className={`flex items-center gap-2 text-xs font-medium ${isLight ? 'text-stone-700' : 'text-stone-300'}`}>
                <CheckCircle2 className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>Showroom Bandar Lampung</span>
              </div>
            </div>

            {/* Rating proof */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-3.5">
              <div className="flex -space-x-2">
                <img className="h-8 w-8 rounded-full ring-2 ring-amber-400/50 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" alt="Bride" />
                <img className="h-8 w-8 rounded-full ring-2 ring-amber-400/50 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80" alt="Groom" />
                <img className="h-8 w-8 rounded-full ring-2 ring-amber-400/50 object-cover" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80" alt="Bride" />
              </div>
              <div className="text-left text-xs">
                <div className="flex items-center text-amber-500 font-bold">
                  ★ ★ ★ ★ ★ <span className={`ml-1 font-semibold ${isLight ? 'text-stone-900' : 'text-stone-100'}`}>4.9 / 5.0</span>
                </div>
                <p className={`text-[11px] ${isLight ? 'text-stone-500' : 'text-stone-400'}`}>Dipercaya oleh 18.500+ pasangan</p>
              </div>
            </div>

          </div>

          {/* Right Column: Live Interactive Mockup Simulator */}
          <div className="lg:col-span-5 flex flex-col items-center">
            
            {/* Viewport Switcher */}
            <div className={`border p-1 rounded-full flex gap-1 mb-4 text-xs font-semibold shadow-sm ${
              isLight ? 'bg-white border-amber-200' : 'bg-[#031110] border-gold-subtle shadow-gold-sm'
            }`}>
              <button
                onClick={() => setActiveTab('digital')}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full transition-all ${
                  activeTab === 'digital' 
                    ? 'bg-gradient-to-r from-amber-400 to-gold-400 text-black font-semibold shadow-sm' 
                    : isLight ? 'text-stone-600 hover:text-stone-900' : 'text-stone-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                Simulasi Undangan Web
              </button>
              <button
                onClick={() => setActiveTab('physical')}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full transition-all ${
                  activeTab === 'physical' 
                    ? 'bg-gradient-to-r from-amber-400 to-gold-400 text-black font-semibold shadow-sm' 
                    : isLight ? 'text-stone-600 hover:text-stone-900' : 'text-stone-400 hover:text-white'
                }`}
              >
                <Box className="w-3.5 h-3.5" />
                Cetak Fisik Mewah
              </button>
            </div>

            {/* Mockup Frame */}
            {activeTab === 'digital' ? (
              <div className="relative w-[310px] sm:w-[330px] h-[640px] bg-[#020b0a] rounded-[44px] p-3 shadow-velvet-deep border-4 border-gold-500/50 flex flex-col animate-float">
                {/* Speaker Notch */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-4 bg-black rounded-full z-30 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-stone-800 mr-2"></div>
                  <div className="w-10 h-1 bg-stone-800 rounded-full"></div>
                </div>

                {/* Smartphone Viewport Screen */}
                <div className={`relative w-full h-full rounded-[34px] overflow-hidden flex flex-col transition-colors duration-300 ${
                  isLight ? 'bg-[#FAF5EC] text-stone-900' : 'bg-[#051817] text-stone-100'
                }`}>
                  
                  {/* Scenario 1: Cover Screen */}
                  {!isOpened ? (
                    <div 
                      className={`relative w-full h-full flex flex-col justify-between p-6 text-center bg-cover bg-center ${
                        isLight ? 'text-stone-900' : 'text-white'
                      }`}
                      style={{
                        backgroundImage: isLight
                          ? 'linear-gradient(to bottom, rgba(250, 245, 235, 0.85), rgba(250, 245, 235, 0.98))'
                          : `linear-gradient(to bottom, rgba(4, 21, 20, 0.5), rgba(4, 21, 20, 0.9)), url('/assets/velvet-bg.jpg')`
                      }}
                    >
                      <div className="pt-8">
                        <div className="w-12 h-12 mx-auto rounded-full border border-amber-400 p-0.5 mb-2 shadow-sm">
                          <img src="/assets/favicon-h.png" alt="Monogram" className="w-full h-full rounded-full" />
                        </div>
                        <span className="text-[10px] tracking-widest uppercase font-semibold text-amber-700">
                          THE WEDDING OF
                        </span>
                        <h2 className="text-2xl font-serif font-bold text-amber-600 mt-1">
                          Dimas & Clarissa
                        </h2>
                        <p className={`text-xs font-light mt-0.5 ${isLight ? 'text-stone-600' : 'text-stone-300'}`}>
                          Sabtu, 18 Juli 2026
                        </p>
                      </div>

                      {/* Floating Guest Tag */}
                      <div className={`backdrop-blur-md border p-3 rounded-2xl mx-1 shadow-md ${
                        isLight ? 'bg-white/80 border-amber-200' : 'bg-black/40 border-gold-subtle'
                      }`}>
                        <p className={`text-[10px] ${isLight ? 'text-stone-500' : 'text-stone-400'}`}>Kepada Yth. Tamu Undangan:</p>
                        <p className={`text-xs font-semibold mt-0.5 ${isLight ? 'text-amber-800' : 'text-gold-200'}`}>Bapak Budi & Rekan</p>
                      </div>

                      {/* Open Button */}
                      <div className="pb-4">
                        <button
                          onClick={() => { setIsOpened(true); setIsPlaying(true); }}
                          className="w-full py-3 px-6 rounded-full bg-gradient-to-r from-amber-400 to-gold-400 text-black font-semibold text-xs tracking-wide shadow-gold-glow hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 group"
                        >
                          <Heart className="w-3.5 h-3.5 fill-current text-black group-hover:animate-ping" />
                          Buka Undangan
                        </button>
                        <span className={`block text-[9px] mt-1.5 ${isLight ? 'text-amber-800 font-semibold' : 'text-gold-300/80'}`}>
                          (Klik untuk simulasi interaktif)
                        </span>
                      </div>
                    </div>
                  ) : (
                    /* Scenario 2: Inside the Wedding Website */
                    <div className={`relative w-full h-full overflow-y-auto pb-10 scrollbar-none ${
                      isLight ? 'bg-[#FAF5EC] text-stone-900' : 'bg-[#051817] text-stone-100'
                    }`}>
                      
                      {/* Music controller */}
                      <div className="sticky top-3 right-3 z-30 flex justify-end px-3">
                        <button
                          onClick={() => setIsPlaying(!isPlaying)}
                          className={`p-1.5 rounded-full shadow-md flex items-center gap-1.5 text-[9px] font-semibold border ${
                            isLight
                              ? 'bg-white/90 text-amber-800 border-amber-200'
                              : 'bg-black/70 text-gold-300 border-gold-subtle'
                          }`}
                        >
                          {isPlaying ? <Pause className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current" />}
                          <span>{isPlaying ? 'Canon in D' : 'Play'}</span>
                        </button>
                      </div>

                      {/* Bride & Groom */}
                      <div className="px-5 pt-2 text-center">
                        <div className="w-20 h-20 mx-auto rounded-full p-1 border-2 border-amber-400 shadow-sm overflow-hidden">
                          <img 
                            src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=300&q=80" 
                            alt="Couple" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className={`text-base font-bold mt-2 ${isLight ? 'text-amber-800' : 'text-gold-bright'}`}>Dimas & Clarissa</h3>
                        <p className={`text-[10px] ${isLight ? 'text-stone-500' : 'text-stone-400'}`}>Sabtu, 18 Juli 2026</p>
                      </div>

                      {/* Event Details Card */}
                      <div className={`mx-4 mt-3 p-3.5 rounded-2xl border text-left space-y-2 ${
                        isLight ? 'bg-white border-amber-200 shadow-sm' : 'bg-black/40 border-gold-subtle'
                      }`}>
                        <div className="flex items-start gap-2">
                          <Calendar className="w-3.5 h-3.5 text-amber-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className={`text-xs font-semibold ${isLight ? 'text-stone-900' : 'text-white'}`}>Akad & Resepsi</p>
                            <p className={`text-[10px] ${isLight ? 'text-stone-600' : 'text-stone-300'}`}>11.00 - 14.00 WIB</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <MapPin className="w-3.5 h-3.5 text-amber-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className={`text-xs font-semibold ${isLight ? 'text-stone-900' : 'text-white'}`}>The Glass House Ballroom</p>
                            <p className={`text-[9px] ${isLight ? 'text-stone-500' : 'text-stone-400'}`}>Jl. Senopati No. 45, Jakarta Selatan</p>
                          </div>
                        </div>
                      </div>

                      <div className="px-5 pt-3">
                        <button
                          onClick={() => setIsOpened(false)}
                          className="w-full py-1.5 rounded-full border border-amber-300 text-[10px] font-semibold text-amber-700 hover:bg-amber-100/50"
                        >
                          Tutup Sampul
                        </button>
                      </div>

                    </div>
                  )}

                </div>
              </div>
            ) : (
              /* Physical Box Mockup */
              <div className="relative w-[310px] sm:w-[330px] h-[480px] bg-white rounded-3xl p-5 shadow-2xl border-4 border-amber-300 flex flex-col justify-between text-stone-900 animate-float">
                <div className="text-center">
                  <span className="text-[10px] font-bold text-amber-700 uppercase tracking-widest">SAMPLE BOX HARDCOVER</span>
                  <h3 className="text-xl font-serif font-bold text-stone-900 mt-1">HariNikah Royal Suite</h3>
                  <p className="text-xs text-stone-600 mt-1">Beludru asli, hotprint emas timbul & wax seal cap lilin.</p>
                </div>

                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-inner border border-amber-200">
                  <img
                    src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80"
                    alt="Physical wedding invitation box"
                    className="w-full h-full object-cover"
                  />
                </div>

                <button
                  onClick={onOpenSampleModal}
                  className="w-full py-3 rounded-full bg-gradient-to-r from-amber-400 to-gold-400 text-black font-bold text-xs uppercase tracking-wider shadow-md"
                >
                  Pesan Sample Box Rp49.000
                </button>
              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
};
