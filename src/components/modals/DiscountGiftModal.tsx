'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Sparkles, Coins, Gift } from 'lucide-react';
import { useInvitation } from '../../context/InvitationContext';

interface DiscountGiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinueToPayment: () => void;
}

export const DiscountGiftModal: React.FC<DiscountGiftModalProps> = ({
  isOpen,
  onClose,
  onContinueToPayment
}) => {
  const { themeMode } = useInvitation();
  const isLight = themeMode === 'light';

  const [timeLeft, setTimeLeft] = useState('47:59:52');

  useEffect(() => {
    let totalSeconds = 47 * 3600 + 59 * 60 + 52;
    const interval = setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds--;
        const hours = Math.floor(totalSeconds / 3600);
        const mins = Math.floor((totalSeconds % 3600) / 60);
        const secs = totalSeconds % 60;
        setTimeLeft(
          `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md font-sans">
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className={`relative max-w-lg w-full rounded-[36px] p-8 sm:p-10 shadow-2xl text-center border overflow-hidden transition-all ${
            isLight
              ? 'bg-gradient-to-b from-[#FFFDF8] via-[#FAF5EC] to-[#F5EFE6] border-amber-300/80 text-stone-900 shadow-amber-950/20'
              : 'bg-gradient-to-b from-[#0c2e2b] via-[#061e1d] to-[#041514] border-gold-400 text-stone-100 shadow-velvet-deep'
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

          {/* Top Badge */}
          <div className="inline-block">
            <span className={`text-[10px] uppercase font-extrabold tracking-widest px-3 py-1 rounded-full border shadow-sm ${
              isLight ? 'bg-rose-100 text-rose-700 border-rose-300' : 'bg-gold-950 text-gold-300 border-gold-subtle'
            }`}>
              HADIAH AKTIVASI
            </span>
          </div>

          {/* Title */}
          <h2 className={`text-2xl sm:text-3xl font-extrabold mt-3 ${
            isLight ? 'text-stone-900' : 'text-gold-bright'
          }`}>
            Diskon 20% untukmu
          </h2>

          {/* Center Envelope Illustration with floating coins */}
          <div className="relative my-8 py-4 flex items-center justify-center">
            
            {/* Floating Gold Coins */}
            <motion.div
              animate={{ y: [-4, 4, -4], rotate: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className="absolute -top-1 left-12 sm:left-16 w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 border-2 border-amber-200 shadow-lg flex items-center justify-center text-amber-900 font-extrabold text-xs"
            >
              🪙
            </motion.div>

            <motion.div
              animate={{ y: [4, -4, 4], rotate: [8, -8, 8] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
              className="absolute top-8 right-10 sm:right-16 w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 border-2 border-amber-200 shadow-lg flex items-center justify-center text-amber-900 font-extrabold text-xs"
            >
              🪙
            </motion.div>

            <motion.div
              animate={{ y: [-3, 3, -3] }}
              transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
              className="absolute bottom-2 left-20 w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 border-2 border-amber-200 shadow-lg flex items-center justify-center text-amber-900 text-[10px]"
            >
              🪙
            </motion.div>

            {/* Floating banknotes */}
            <motion.div
              animate={{ rotate: [-6, 6, -6], y: [-2, 2, -2] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="absolute -top-3 right-20 bg-emerald-600 text-white font-mono text-[9px] px-2 py-1 rounded shadow-md border border-emerald-400 rotate-12"
            >
              Rp 50K
            </motion.div>

            {/* Envelope Frame */}
            <div className={`relative w-44 sm:w-52 h-36 rounded-2xl p-2 flex flex-col justify-end items-center shadow-xl border ${
              isLight ? 'bg-[#E5DAC6] border-[#D4C3A3]' : 'bg-[#183a36] border-gold-subtle'
            }`}>
              {/* Envelope Flap (Triangle) */}
              <div className={`absolute top-0 left-0 right-0 h-16 border-b border-black/10 rounded-t-xl ${
                isLight ? 'bg-[#DCD0BB]' : 'bg-[#122e2b]'
              }`} style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }} />

              {/* Emerging Voucher Card */}
              <motion.div
                initial={{ y: 15 }}
                animate={{ y: -20 }}
                transition={{ duration: 0.8, type: 'spring' }}
                className={`w-36 sm:w-40 rounded-xl p-3 shadow-lg border text-center ${
                  isLight ? 'bg-white border-amber-200' : 'bg-[#041514] border-gold-400'
                }`}
              >
                <span className="text-[8px] uppercase tracking-wider font-extrabold text-rose-500 block">
                  VOUCHER HADIAH
                </span>
                <p className={`text-2xl font-black mt-0.5 ${isLight ? 'text-rose-600' : 'text-gold-bright'}`}>
                  20%
                </p>
                <p className="text-[9px] text-stone-500 font-medium">
                  maks. Rp50.000
                </p>
              </motion.div>

              {/* Envelope Body */}
              <div className={`w-full h-20 rounded-xl relative z-10 flex items-center justify-center shadow-inner ${
                isLight ? 'bg-[#EFE5D5]' : 'bg-[#153430]'
              }`}>
                <div className="w-8 h-8 rounded-full bg-amber-400 text-black flex items-center justify-center shadow-sm">
                  <Gift className="w-4 h-4" />
                </div>
              </div>
            </div>

          </div>

          {/* Info pill card: POTONGAN & BERLAKU */}
          <div className={`p-4 rounded-2xl border shadow-sm grid grid-cols-2 gap-3 max-w-sm mx-auto my-4 text-center ${
            isLight ? 'bg-white border-stone-200' : 'bg-black/50 border-gold-subtle'
          }`}>
            <div className="border-r border-stone-200/40 pr-2">
              <span className="text-[9px] uppercase font-bold tracking-wider text-stone-400 block">
                POTONGAN
              </span>
              <p className={`text-xs sm:text-sm font-extrabold mt-0.5 ${isLight ? 'text-stone-900' : 'text-stone-100'}`}>
                20%, maks Rp50.000
              </p>
            </div>
            <div className="pl-2">
              <span className="text-[9px] uppercase font-bold tracking-wider text-stone-400 block">
                BERLAKU
              </span>
              <p className={`text-xs sm:text-sm font-mono font-extrabold mt-0.5 ${isLight ? 'text-rose-600' : 'text-gold-300'}`}>
                {timeLeft}
              </p>
            </div>
          </div>

          {/* Subtitle */}
          <p className={`text-xs max-w-xs mx-auto ${isLight ? 'text-stone-600' : 'text-stone-300'}`}>
            Sudah terpasang di tagihanmu. Buat pembayaran sebelum waktunya habis.
          </p>

          {/* Action button: Lanjut bayar -> */}
          <button
            onClick={() => {
              onClose();
              onContinueToPayment();
            }}
            className={`mt-6 w-full max-w-xs py-3.5 px-6 rounded-full font-extrabold text-xs uppercase tracking-wider shadow-xl hover:scale-105 active:scale-95 transition-all inline-flex items-center justify-center gap-2 ${
              isLight
                ? 'bg-stone-900 text-white hover:bg-stone-800'
                : 'bg-gradient-to-r from-amber-400 via-gold-300 to-amber-500 text-black shadow-gold-sm'
            }`}
          >
            <span>Lanjut bayar</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </motion.div>

      </div>
    </AnimatePresence>
  );
};

