'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Camera, 
  Palette, 
  FileText, 
  Users, 
  Calendar, 
  Music, 
  Lock, 
  ChevronRight, 
  ArrowRight,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { useInvitation } from '../../context/InvitationContext';

interface OnboardingWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectStep: (stepTab: string) => void;
  onOpenActivation: () => void;
}

export const OnboardingWizardModal: React.FC<OnboardingWizardModalProps> = ({
  isOpen,
  onClose,
  onSelectStep,
  onOpenActivation
}) => {
  const { pages, currentTemplate, themeMode } = useInvitation();
  const isLight = themeMode === 'light';

  if (!isOpen) return null;

  const coverData = pages[0]?.data || {};
  const coupleData = pages[1]?.data || {};
  const eventsData = pages[2]?.data || {};

  // Check progress
  const hasPhoto = Boolean(coupleData.groomPhoto || coupleData.bridePhoto);
  const hasTheme = Boolean(currentTemplate);
  const hasOpening = Boolean(coverData.subheading || coverData.quote);
  const hasCouple = Boolean(coupleData.groomName || coupleData.brideName);
  const hasSchedule = Boolean(eventsData.akadDate || eventsData.resepsiDate);
  const hasMusic = true; // preset active

  const steps = [
    {
      id: 'photo',
      tab: 'couple',
      title: 'Unggah foto berdua',
      desc: 'Jadi foto pembuka, dan dipakai mencarikan desain yang cocok',
      icon: Camera,
      done: hasPhoto,
      isFirst: true
    },
    {
      id: 'theme',
      tab: 'templates',
      title: 'Pilih tema',
      desc: 'Tentukan gaya undanganmu: Modern, Adat Jawa, Adat Minang',
      icon: Palette,
      done: hasTheme
    },
    {
      id: 'text',
      tab: 'text',
      title: 'Tulis kata pembuka',
      desc: 'Quote, ayat suci, atau sapaan hangat untuk tamu',
      icon: FileText,
      done: hasOpening
    },
    {
      id: 'couple',
      tab: 'couple',
      title: 'Isi profil mempelai',
      desc: 'Supaya tamu tahu siapa yang berbahagia mengundang',
      icon: Users,
      done: hasCouple
    },
    {
      id: 'events',
      tab: 'events',
      title: 'Atur jadwal & lokasi',
      desc: 'Kapan dan di mana prosesi akad & resepsi diadakan',
      icon: Calendar,
      done: hasSchedule
    },
    {
      id: 'music',
      tab: 'music',
      title: 'Pilih lagu latar',
      desc: 'Biar undanganmu terasa lebih romantis & berkesan',
      icon: Music,
      done: hasMusic
    }
  ];

  const completedCount = steps.filter(s => s.done).length;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto font-sans">
        
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 20 }}
          transition={{ duration: 0.25 }}
          className={`relative max-w-4xl w-full rounded-[32px] p-6 sm:p-8 shadow-2xl my-6 border transition-all ${
            isLight
              ? 'bg-[#FAF8F5] text-stone-900 border-amber-300 shadow-amber-950/15'
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

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
            
            {/* LEFT COLUMN: Smartphone Live Preview */}
            <div className="md:col-span-5 flex flex-col items-center justify-center">
              <div className={`relative w-56 sm:w-64 rounded-[36px] p-3 shadow-2xl border-4 transition-all ${
                isLight 
                  ? 'bg-gradient-to-b from-rose-500 to-rose-600 border-rose-400/50 shadow-rose-950/20'
                  : 'bg-gradient-to-b from-[#0a2e2b] to-[#041514] border-gold-400 shadow-gold-sm'
              }`}>
                {/* Smartphone Screen Mockup */}
                <div className={`rounded-[28px] p-4 text-center min-h-[340px] flex flex-col items-center justify-between shadow-inner ${
                  isLight ? 'bg-white text-stone-800' : 'bg-[#031110] text-stone-100'
                }`}>
                  <div className="w-16 h-4 bg-stone-300/40 rounded-full mx-auto mb-3" />
                  
                  {/* Photo or Placeholder */}
                  <div className={`w-28 h-32 rounded-2xl mx-auto flex flex-col items-center justify-center border-2 border-dashed transition-all ${
                    hasPhoto 
                      ? 'border-transparent overflow-hidden' 
                      : isLight ? 'border-stone-300 bg-stone-100' : 'border-gold-subtle bg-white/5'
                  }`}>
                    {hasPhoto ? (
                      <img 
                        src={coupleData.groomPhoto || 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=400&q=80'} 
                        alt="Foto Pengantin" 
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <div className="text-stone-400 flex flex-col items-center gap-1">
                        <Camera className="w-6 h-6 opacity-60" />
                        <span className="text-[10px] font-medium">Unggah Foto</span>
                      </div>
                    )}
                  </div>

                  {/* Names preview */}
                  <div className="my-3 space-y-1">
                    <p className="text-[10px] uppercase font-bold tracking-widest text-amber-600">
                      THE WEDDING OF
                    </p>
                    <p className={`text-base font-bold font-serif ${isLight ? 'text-stone-900' : 'text-gold-bright'}`}>
                      {coupleData.groomName?.split(' ')[0] || 'Dimas'} & {coupleData.brideName?.split(' ')[0] || 'Clarissa'}
                    </p>
                    <p className="text-[10px] text-stone-500">
                      {eventsData.akadDate || 'Sabtu, 18 Juli 2026'}
                    </p>
                  </div>

                  {/* Button Mockup */}
                  <div className="w-full py-2 rounded-xl bg-gradient-to-r from-amber-400 to-gold-400 text-black text-[11px] font-bold shadow-sm">
                    Buka Undangan
                  </div>
                </div>
              </div>

              <p className={`text-xs mt-3 font-medium flex items-center gap-1.5 ${
                isLight ? 'text-rose-600' : 'text-gold-300'
              }`}>
                <Sparkles className="w-3.5 h-3.5" />
                <span>+ Terisi otomatis tiap langkah beres</span>
              </p>
            </div>

            {/* RIGHT COLUMN: 6 Step Checklist */}
            <div className="md:col-span-7 space-y-4">
              
              {/* Header Title */}
              <div>
                <span className={`text-[10px] uppercase font-extrabold tracking-widest px-2.5 py-0.5 rounded-full border ${
                  isLight ? 'bg-rose-100 text-rose-700 border-rose-300' : 'bg-gold-950 text-gold-300 border-gold-subtle'
                }`}>
                  PERSIAPAN UNDANGAN
                </span>
                <h2 className={`text-2xl sm:text-3xl font-extrabold mt-1.5 ${
                  isLight ? 'text-stone-900' : 'text-gold-bright'
                }`}>
                  Yuk, rakit undanganmu
                </h2>
                <div className="flex items-center justify-between text-xs text-stone-500 mt-1">
                  <span>6 langkah singkat, lalu undanganmu siap dibagikan.</span>
                  <span className={`font-extrabold text-sm ${isLight ? 'text-rose-600' : 'text-gold-300'}`}>
                    {completedCount}/6
                  </span>
                </div>

                {/* Progress bar with 6 segments */}
                <div className="grid grid-cols-6 gap-1.5 mt-2">
                  {[0, 1, 2, 3, 4, 5].map((idx) => (
                    <div
                      key={idx}
                      className={`h-1.5 rounded-full transition-all ${
                        idx < completedCount
                          ? isLight ? 'bg-rose-500' : 'bg-gold-400'
                          : isLight ? 'bg-stone-200' : 'bg-white/15'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Steps List */}
              <div className="space-y-2 pt-1 max-h-[320px] overflow-y-auto pr-1">
                {steps.map((s) => {
                  const Icon = s.icon;
                  return (
                    <div
                      key={s.id}
                      onClick={() => {
                        onSelectStep(s.tab);
                        onClose();
                      }}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 group ${
                        isLight
                          ? 'bg-white border-stone-200 hover:border-amber-400 hover:shadow-md'
                          : 'bg-[#041514] border-gold-subtle hover:border-gold-400 hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                          s.done
                            ? isLight ? 'bg-emerald-100 text-emerald-700' : 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                            : isLight ? 'bg-stone-100 text-stone-600 group-hover:bg-amber-100 group-hover:text-amber-800' : 'bg-white/5 text-stone-300 group-hover:text-gold-300'
                        }`}>
                          {s.done ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-4 h-4" />}
                        </div>
                        <div>
                          <p className={`text-xs font-bold transition-colors ${
                            isLight ? 'text-stone-800 group-hover:text-rose-600' : 'text-stone-100 group-hover:text-gold-300'
                          }`}>
                            {s.title}
                          </p>
                          <p className={`text-[10px] ${isLight ? 'text-stone-500' : 'text-stone-400'}`}>
                            {s.desc}
                          </p>
                        </div>
                      </div>

                      {s.isFirst && !s.done ? (
                        <button
                          type="button"
                          className="px-3 py-1.5 rounded-full bg-gradient-to-r from-rose-500 to-rose-600 text-white font-bold text-[10px] uppercase tracking-wider flex items-center gap-1 shadow-sm flex-shrink-0"
                        >
                          <span>Mulai</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      ) : (
                        <ChevronRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                      )}
                    </div>
                  );
                })}

                {/* Extra Premium Row: Daftar Tamu & Link Personal */}
                <div className={`p-3 rounded-2xl border flex items-center justify-between gap-3 ${
                  isLight
                    ? 'bg-amber-50/70 border-amber-200 text-stone-800'
                    : 'bg-gold-950/40 border-gold-400/40 text-stone-200'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-400/20 text-amber-700 flex items-center justify-center flex-shrink-0">
                      <Lock className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold">Daftar tamu & link personal</p>
                      <p className={`text-[10px] ${isLight ? 'text-stone-500' : 'text-stone-400'}`}>
                        Khusus paket Premium, tidak dihitung di persiapan
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onOpenActivation();
                      onClose();
                    }}
                    className={`px-3 py-1.5 rounded-full text-[10px] font-bold border transition-colors flex-shrink-0 ${
                      isLight 
                        ? 'border-rose-400 text-rose-700 hover:bg-rose-100' 
                        : 'border-gold-400 text-gold-300 hover:bg-gold-900'
                    }`}
                  >
                    Lihat paket
                  </button>
                </div>
              </div>

            </div>

          </div>

        </motion.div>

      </div>
    </AnimatePresence>
  );
};

