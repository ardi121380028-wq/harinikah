'use client';

import React, { useState } from 'react';
import { MapPin, Coffee, ShieldCheck, CheckCircle2, Send } from 'lucide-react';
import { useInvitation } from '../../context/InvitationContext';

export const ShowroomSection: React.FC = () => {
  const { themeMode } = useInvitation();
  const isLight = themeMode === 'light';

  const [city, setCity] = useState<'jakarta' | 'bandung'>('jakarta');
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className={`py-20 lg:py-28 border-t relative transition-colors duration-300 ${
      isLight ? 'bg-[#F5EFE6] border-amber-200' : 'bg-[#041514] border-gold-subtle'
    }`} id="showroom">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className={`text-xs uppercase font-extrabold tracking-widest px-3.5 py-1 rounded-full border shadow-sm ${
            isLight ? 'bg-amber-100 text-amber-900 border-amber-300' : 'text-gold-300 bg-gold-950/80 border-gold-subtle'
          }`}>
            Layanan Offline
          </span>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 ${
            isLight ? 'text-stone-900' : 'text-white'
          }`}>
            Kunjungi Galeri Showroom HariNikah
          </h2>
          <p className={`text-sm sm:text-base mt-3 ${
            isLight ? 'text-stone-600' : 'text-stone-300'
          }`}>
            Ingin merasakan langsung tekstur kertas import, kilau foil emas murni, dan kualitas cetakan kami? Datang langsung dan konsultasikan konsep pernikahanmu secara privat bersama wedding consultant kami.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Gallery Images & Perks */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Showroom Image Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className={`rounded-3xl overflow-hidden h-52 sm:h-64 border transition-all ${
                isLight ? 'border-amber-200 shadow-lg shadow-amber-950/10' : 'shadow-velvet-deep border-gold-subtle'
              }`}>
                <img
                  src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80"
                  alt="Showroom HariNikah"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className={`rounded-3xl overflow-hidden h-52 sm:h-64 mt-6 border transition-all ${
                isLight ? 'border-amber-200 shadow-lg shadow-amber-950/10' : 'shadow-velvet-deep border-gold-subtle'
              }`}>
                <img
                  src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80"
                  alt="Konsultasi Desain HariNikah"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Experience Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className={`flex items-start gap-2.5 p-3.5 rounded-2xl border transition-all ${
                isLight
                  ? 'bg-white border-amber-200 shadow-sm'
                  : 'bg-[#061e1d] border-gold-subtle'
              }`}>
                <Coffee className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                  isLight ? 'text-amber-700' : 'text-gold-400'
                }`} />
                <div>
                  <p className={`text-xs font-bold ${isLight ? 'text-stone-800' : 'text-white'}`}>Free Coffee & Tea</p>
                  <p className={`text-[11px] ${isLight ? 'text-stone-500' : 'text-stone-400'}`}>Suasana santai saat konsultasi</p>
                </div>
              </div>

              <div className={`flex items-start gap-2.5 p-3.5 rounded-2xl border transition-all ${
                isLight
                  ? 'bg-white border-amber-200 shadow-sm'
                  : 'bg-[#061e1d] border-gold-subtle'
              }`}>
                <ShieldCheck className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                  isLight ? 'text-emerald-700' : 'text-emerald-400'
                }`} />
                <div>
                  <p className={`text-xs font-bold ${isLight ? 'text-stone-800' : 'text-white'}`}>Sample Lengkap 200+ Seri</p>
                  <p className={`text-[11px] ${isLight ? 'text-stone-500' : 'text-stone-400'}`}>Pegang langsung bahan fisik</p>
                </div>
              </div>
            </div>

            {/* Location Cards */}
            <div className="space-y-3">
              <div className={`p-4 rounded-2xl border flex items-start gap-3 transition-all ${
                isLight
                  ? 'bg-white border-amber-200 shadow-sm'
                  : 'bg-[#061e1d] border-gold-subtle'
              }`}>
                <MapPin className={`w-5 h-5 flex-shrink-0 mt-1 ${isLight ? 'text-amber-700' : 'text-gold-400'}`} />
                <div>
                  <h4 className={`text-xs font-bold ${isLight ? 'text-stone-800' : 'text-white'}`}>
                    Showroom Jakarta Selatan
                  </h4>
                  <p className={`text-xs mt-0.5 ${isLight ? 'text-stone-600' : 'text-stone-300'}`}>
                    Jl. Senopati No. 45, Kebayoran Baru, Jakarta Selatan (Buka Setiap Hari: 10.00 - 19.00 WIB)
                  </p>
                </div>
              </div>

              <div className={`p-4 rounded-2xl border flex items-start gap-3 transition-all ${
                isLight
                  ? 'bg-white border-amber-200 shadow-sm'
                  : 'bg-[#061e1d] border-gold-subtle'
              }`}>
                <MapPin className={`w-5 h-5 flex-shrink-0 mt-1 ${isLight ? 'text-amber-700' : 'text-gold-400'}`} />
                <div>
                  <h4 className={`text-xs font-bold ${isLight ? 'text-stone-800' : 'text-white'}`}>
                    Showroom Bandung
                  </h4>
                  <p className={`text-xs mt-0.5 ${isLight ? 'text-stone-600' : 'text-stone-300'}`}>
                    Jl. R.E. Martadinata (Riau) No. 112, Bandung (Buka Selasa - Minggu: 10.00 - 18.00 WIB)
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Appointment Booking Form */}
          <div className={`lg:col-span-6 rounded-3xl p-8 sm:p-10 border transition-all ${
            isLight
              ? 'bg-white border-amber-300 shadow-2xl shadow-amber-950/10'
              : 'bg-gradient-to-br from-[#0a2c29] to-[#041514] shadow-velvet-deep border-gold-400/50'
          }`}>
            <h3 className={`text-2xl font-bold ${isLight ? 'text-stone-900' : 'text-gold-bright'}`}>
              Reservasi Jadwal Konsultasi Tatap Muka
            </h3>
            <p className={`text-xs mt-1.5 ${isLight ? 'text-stone-600' : 'text-stone-300'}`}>
              Gratis tanpa dipungut biaya. Jadwalkan waktu terbaikmu agar tim konsultan kami bisa menyambutmu secara privat.
            </p>

            {submitted ? (
              <div className={`mt-8 p-6 rounded-2xl border text-center space-y-2 ${
                isLight
                  ? 'bg-emerald-50 border-emerald-300'
                  : 'bg-emerald-950/80 border-emerald-400/60'
              }`}>
                <CheckCircle2 className={`w-10 h-10 mx-auto ${isLight ? 'text-emerald-600' : 'text-emerald-400'}`} />
                <h4 className={`text-base font-bold ${isLight ? 'text-emerald-900' : 'text-emerald-200'}`}>
                  Reservasi Kunjungan Berhasil!
                </h4>
                <p className={`text-xs ${isLight ? 'text-stone-600' : 'text-stone-300'}`}>
                  Tim konsultan HariNikah akan segera menghubungi nomor WhatsApp <strong>{phone}</strong> untuk konfirmasi dan panduan arah lokasi.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className={`mt-4 text-xs font-semibold underline ${
                    isLight ? 'text-amber-800' : 'text-gold-300'
                  }`}
                >
                  Jadwalkan kunjungan lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                
                {/* Choose City */}
                <div>
                  <label className={`text-xs font-bold block mb-1.5 ${isLight ? 'text-stone-700' : 'text-stone-300'}`}>
                    Pilih Lokasi Galeri:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setCity('jakarta')}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                        city === 'jakarta'
                          ? 'bg-gradient-to-r from-amber-500 to-gold-400 text-black border-gold-400 shadow-gold-sm'
                          : isLight
                          ? 'bg-[#F9F6F0] text-stone-700 border-amber-200'
                          : 'bg-black/30 text-stone-300 border-white/10'
                      }`}
                    >
                      Jakarta Selatan
                    </button>
                    <button
                      type="button"
                      onClick={() => setCity('bandung')}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                        city === 'bandung'
                          ? 'bg-gradient-to-r from-amber-500 to-gold-400 text-black border-gold-400 shadow-gold-sm'
                          : isLight
                          ? 'bg-[#F9F6F0] text-stone-700 border-amber-200'
                          : 'bg-black/30 text-stone-300 border-white/10'
                      }`}
                    >
                      Bandung (Riau)
                    </button>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className={`text-xs font-bold block mb-1 ${isLight ? 'text-stone-700' : 'text-stone-300'}`}>
                    Nama Calon Pengantin:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Rian & Nabila"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-1 focus:ring-gold-400 transition-colors ${
                      isLight
                        ? 'bg-[#FAF8F5] border-amber-200 text-stone-900 focus:border-amber-400 placeholder:text-stone-400'
                        : 'bg-[#041514] border-gold-subtle text-white'
                    }`}
                  />
                </div>

                {/* WhatsApp Phone */}
                <div>
                  <label className={`text-xs font-bold block mb-1 ${isLight ? 'text-stone-700' : 'text-stone-300'}`}>
                    Nomor WhatsApp Aktif:
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0812xxxxxxx"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-1 focus:ring-gold-400 transition-colors ${
                      isLight
                        ? 'bg-[#FAF8F5] border-amber-200 text-stone-900 focus:border-amber-400 placeholder:text-stone-400'
                        : 'bg-[#041514] border-gold-subtle text-white'
                    }`}
                  />
                </div>

                {/* Date */}
                <div>
                  <label className={`text-xs font-bold block mb-1 ${isLight ? 'text-stone-700' : 'text-stone-300'}`}>
                    Rencana Tanggal Kunjungan:
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-1 focus:ring-gold-400 transition-colors ${
                      isLight
                        ? 'bg-[#FAF8F5] border-amber-200 text-stone-900 focus:border-amber-400'
                        : 'bg-[#041514] border-gold-subtle text-white'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-gold-400 text-black font-bold text-xs uppercase tracking-wider shadow-gold-sm hover:scale-102 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Konfirmasi Jadwal Temu Offline
                </button>

                <p className={`text-[11px] text-center ${isLight ? 'text-stone-500' : 'text-stone-400'}`}>
                  🔒 Data Anda terlindungi dan hanya digunakan untuk konfirmasi reservasi.
                </p>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
