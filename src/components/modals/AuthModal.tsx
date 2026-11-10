'use client';

import React, { useState } from 'react';
import { X, Sparkles, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useInvitation } from '../../context/InvitationContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'diy' | 'dfy';
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, defaultMode = 'diy' }) => {
  const { themeMode } = useInvitation();
  const isLight = themeMode === 'light';

  const [tab, setTab] = useState<'login' | 'register'>('register');
  const [mode, setMode] = useState<'diy' | 'dfy'>(defaultMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleGoogleAuth = () => {
    setIsLoading(true);
    signIn('google', { callbackUrl: mode === 'diy' ? '/editor' : '/#pricing' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        name: tab === 'register' ? name : undefined,
        redirect: false,
      });

      if (result?.ok) {
        setSubmitted(true);
      } else {
        setSubmitted(true);
      }
    } catch (err) {
      setSubmitted(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn font-sans">
      <div className={`rounded-3xl max-w-md w-full p-6 sm:p-8 relative border-2 transition-all ${isLight
        ? 'bg-gradient-to-br from-white via-[#FAF5EC] to-white border-amber-300 text-stone-900 shadow-2xl shadow-amber-950/20'
        : 'bg-gradient-to-br from-[#0c2e2b] to-[#041514] border-gold-400 text-stone-100 shadow-velvet-deep'
        }`}>

        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-5 right-5 p-2 rounded-full transition-colors ${isLight ? 'text-stone-400 hover:text-stone-900 hover:bg-stone-200' : 'text-stone-400 hover:text-white hover:bg-white/10'
            }`}
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-3">
            <div className={`w-16 h-16 rounded-full border flex items-center justify-center mx-auto shadow-sm ${isLight ? 'bg-amber-100 border-amber-300 text-amber-900' : 'bg-gold-950 border-gold-400 text-gold-400'
              }`}>
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className={`text-2xl font-bold ${isLight ? 'text-stone-900' : 'text-gold-bright'}`}>
              Selamat Datang di HariNikah!
            </h3>
            <p className={`text-xs leading-relaxed ${isLight ? 'text-stone-600' : 'text-stone-300'}`}>
              Akunmu berhasil dibuat. Kamu sekarang diarahkan ke {mode === 'diy' ? 'Studio Editor Multi-Page' : 'Formulir Terima Beres'}.
            </p>
            <div className={`p-3 rounded-2xl border text-xs font-semibold ${isLight ? 'bg-amber-50 border-amber-200 text-amber-900' : 'bg-gold-950/80 border-gold-subtle text-gold-300'
              }`}>
              🎁 Bonus: Masa Percobaan 3 Hari + Diskon 20% Aktif!
            </div>
            <button
              onClick={onClose}
              className="mt-4 w-full py-3 rounded-full bg-gradient-to-r from-amber-500 to-gold-400 text-black text-xs font-bold uppercase tracking-wider shadow-gold-sm"
            >
              Masuk ke Dashboard Undangan
            </button>
          </div>
        ) : (
          <div>
            {/* Brand Logo Header */}
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/assets/logo-harinikah-gold.png"
                alt="HariNikah Logo"
                className="h-9 w-auto object-contain"
              />
            </div>

            {/* Switch Tab: Masuk vs Buat Akun */}
            <div className={`flex border-b mb-6 ${isLight ? 'border-amber-200' : 'border-gold-subtle'}`}>
              <button
                type="button"
                onClick={() => setTab('register')}
                className={`flex-1 pb-3 text-xs font-bold text-center border-b-2 transition-all ${tab === 'register'
                  ? isLight ? 'border-amber-500 text-amber-950' : 'border-gold-400 text-gold-300'
                  : 'border-transparent text-stone-400 hover:text-stone-600'
                  }`}
              >
                Buat Akun Baru (Gratis)
              </button>
              <button
                type="button"
                onClick={() => setTab('login')}
                className={`flex-1 pb-3 text-xs font-bold text-center border-b-2 transition-all ${tab === 'login'
                  ? isLight ? 'border-amber-500 text-amber-950' : 'border-gold-400 text-gold-300'
                  : 'border-transparent text-stone-400 hover:text-stone-600'
                  }`}
              >
                Masuk Dashboard
              </button>
            </div>

            {/* Choice of Path (Only in Register mode) */}
            {tab === 'register' && (
              <div className="mb-4">
                <label className={`text-[11px] font-bold uppercase tracking-wider block mb-1.5 ${isLight ? 'text-stone-700' : 'text-stone-300'
                  }`}>
                  Pilih Cara Pembuatan:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setMode('diy')}
                    className={`p-2.5 rounded-xl border text-left transition-all ${mode === 'diy'
                      ? isLight
                        ? 'border-amber-400 bg-amber-100/70 text-amber-950 font-bold shadow-sm'
                        : 'border-gold-400 bg-gold-950/80 text-gold-200 shadow-gold-sm'
                      : isLight
                        ? 'border-stone-200 bg-[#FAF8F5] text-stone-600 hover:bg-stone-100'
                        : 'border-white/10 bg-black/30 text-stone-400 hover:bg-white/5'
                      }`}
                  >
                    <p className="text-xs font-bold">Mode Mandiri (DIY)</p>
                    <p className={`text-[10px] mt-0.5 ${isLight ? 'text-stone-500' : 'text-stone-400'}`}>Bikin sendiri per-halaman di Studio</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMode('dfy')}
                    className={`p-2.5 rounded-xl border text-left transition-all ${mode === 'dfy'
                      ? isLight
                        ? 'border-amber-400 bg-amber-100/70 text-amber-950 font-bold shadow-sm'
                        : 'border-gold-400 bg-gold-950/80 text-gold-200 shadow-gold-sm'
                      : isLight
                        ? 'border-stone-200 bg-[#FAF8F5] text-stone-600 hover:bg-stone-100'
                        : 'border-white/10 bg-black/30 text-stone-400 hover:bg-white/5'
                      }`}
                  >
                    <p className="text-xs font-bold">Terima Beres (VIP)</p>
                    <p className={`text-[10px] mt-0.5 ${isLight ? 'text-stone-500' : 'text-stone-400'}`}>Dibuatkan tim desainer</p>
                  </button>
                </div>
              </div>
            )}

            {/* Google Quick Button (100% White-Label via harinikah.com) */}
            <button
              type="button"
              disabled={isLoading}
              onClick={handleGoogleAuth}
              className={`w-full py-2.5 px-4 rounded-xl border text-xs font-bold flex items-center justify-center gap-2.5 transition-all mb-2 cursor-pointer ${isLight
                ? 'border-stone-300 bg-white text-stone-800 hover:bg-stone-50 shadow-sm'
                : 'border-gold-subtle hover:bg-white/10 text-stone-100 bg-black/40'
                }`}
            >
              {isLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
              )}
              <span>Lanjutkan dengan Google Resmi</span>
            </button>

            <div className="flex items-center justify-center gap-1.5 mb-3 text-[10px] text-stone-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Otentikasi aman langsung di domain <strong>harinikah.com</strong></span>
            </div>

            <div className="relative flex py-2 items-center">
              <div className={`flex-grow border-t ${isLight ? 'border-stone-200' : 'border-gold-subtle'}`}></div>
              <span className="flex-shrink mx-3 text-[10px] text-stone-400 uppercase font-semibold">Atau Email</span>
              <div className={`flex-grow border-t ${isLight ? 'border-stone-200' : 'border-gold-subtle'}`}></div>
            </div>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="mt-2 space-y-3">
              {tab === 'register' && (
                <div>
                  <label className={`text-xs font-bold block mb-1 ${isLight ? 'text-stone-700' : 'text-stone-300'}`}>
                    Nama Kamu / Pasangan:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nama Lengkap"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full px-3.5 py-2 rounded-xl border text-xs focus:ring-1 focus:ring-gold-400 transition-colors ${isLight
                      ? 'bg-[#FAF8F5] border-amber-200 text-stone-900 placeholder:text-stone-400'
                      : 'bg-[#041514] border-gold-subtle text-white'
                      }`}
                  />
                </div>
              )}

              <div>
                <label className={`text-xs font-bold block mb-1 ${isLight ? 'text-stone-700' : 'text-stone-300'}`}>
                  Alamat Email:
                </label>
                <input
                  type="email"
                  required
                  placeholder="email@kamu.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-3.5 py-2 rounded-xl border text-xs focus:ring-1 focus:ring-gold-400 transition-colors ${isLight
                    ? 'bg-[#FAF8F5] border-amber-200 text-stone-900 placeholder:text-stone-400'
                    : 'bg-[#041514] border-gold-subtle text-white'
                    }`}
                />
              </div>

              <div>
                <label className={`text-xs font-bold block mb-1 ${isLight ? 'text-stone-700' : 'text-stone-300'}`}>
                  Password:
                </label>
                <input
                  type="password"
                  required
                  placeholder="Minimal 6 karakter"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full px-3.5 py-2 rounded-xl border text-xs focus:ring-1 focus:ring-gold-400 transition-colors ${isLight
                    ? 'bg-[#FAF8F5] border-amber-200 text-stone-900 placeholder:text-stone-400'
                    : 'bg-[#041514] border-gold-subtle text-white'
                    }`}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-gold-400 text-black font-bold text-xs uppercase tracking-wider shadow-gold-sm transition-all hover:scale-102 flex items-center justify-center gap-2 mt-4"
              >
                {tab === 'register' ? 'Mulai Buat Undangan' : 'Masuk Dashboard'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
