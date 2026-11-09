'use client';

import React, { useState } from 'react';
import { X, Box, CheckCircle2, Send, ShieldCheck } from 'lucide-react';
import { useInvitation } from '@/context/InvitationContext';

interface SampleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SampleModal: React.FC<SampleModalProps> = ({ isOpen, onClose }) => {
  const { themeMode } = useInvitation();
  const isLight = themeMode === 'light';

  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    paperPreference: 'Velvet Hardcover + Foil Emas'
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn font-sans">
      <div className={`rounded-3xl max-w-lg w-full p-6 sm:p-8 relative border-2 transition-all ${
        isLight
          ? 'bg-gradient-to-br from-white via-[#FAF5EC] to-white border-amber-300 text-stone-900 shadow-2xl shadow-amber-950/20'
          : 'bg-gradient-to-br from-[#0c2e2b] to-[#041514] border-gold-400 text-stone-100 shadow-velvet-deep'
      }`}>
        
        {/* Close button */}
        <button
          onClick={onClose}
          className={`absolute top-5 right-5 p-2 rounded-full transition-colors ${
            isLight ? 'text-stone-400 hover:text-stone-900 hover:bg-stone-200' : 'text-stone-400 hover:text-white hover:bg-white/10'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        {sent ? (
          <div className="text-center py-6 space-y-3">
            <div className={`w-16 h-16 rounded-full border flex items-center justify-center mx-auto shadow-sm ${
              isLight ? 'bg-emerald-100 border-emerald-400 text-emerald-700' : 'bg-emerald-950 border-emerald-400 text-emerald-400'
            }`}>
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className={`text-2xl font-bold ${isLight ? 'text-stone-900' : 'text-gold-bright'}`}>
              Permintaan Sample Box Terkirim!
            </h3>
            <p className={`text-xs max-w-sm mx-auto leading-relaxed ${isLight ? 'text-stone-600' : 'text-stone-300'}`}>
              Tim produksi HariNikah akan menghubungi nomor <strong>{formData.phone}</strong> untuk konfirmasi pengiriman paket sampel fisik ke alamatmu.
            </p>
            <button
              onClick={() => { setSent(false); onClose(); }}
              className="mt-4 px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-gold-400 text-black text-xs font-bold uppercase tracking-wider"
            >
              Tutup
            </button>
          </div>
        ) : (
          <div>
            <div className={`flex items-center gap-2.5 mb-2 ${isLight ? 'text-amber-800' : 'text-gold-400'}`}>
              <Box className="w-6 h-6" />
              <span className="text-xs font-extrabold uppercase tracking-wider">Sample Kit Box Fisik</span>
            </div>

            <h3 className={`text-2xl font-bold ${isLight ? 'text-stone-900' : 'text-gold-bright'}`}>
              Pesan Kotak Sampel ke Rumah
            </h3>
            <p className={`text-xs mt-1 ${isLight ? 'text-stone-600' : 'text-stone-300'}`}>
              Rasakan langsung tekstur mewah bahan Velvet Teal, Cotton Paper 260gr, sampel foil emas timbul, amplop kalkir, dan wax seal asli sebelum cetak massal.
            </p>

            <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
              <div>
                <label className={`text-xs font-bold block mb-1 ${isLight ? 'text-stone-700' : 'text-stone-300'}`}>
                  Nama Calon Pengantin:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Sarah & Danu"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-3.5 py-2 rounded-xl border text-xs focus:ring-1 focus:ring-gold-400 transition-colors ${
                    isLight
                      ? 'bg-[#FAF8F5] border-amber-200 text-stone-900 placeholder:text-stone-400'
                      : 'bg-[#041514] border-gold-subtle text-white'
                  }`}
                />
              </div>

              <div>
                <label className={`text-xs font-bold block mb-1 ${isLight ? 'text-stone-700' : 'text-stone-300'}`}>
                  Nomor WhatsApp Aktif:
                </label>
                <input
                  type="tel"
                  required
                  placeholder="0812xxxxxxx"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full px-3.5 py-2 rounded-xl border text-xs focus:ring-1 focus:ring-gold-400 transition-colors ${
                    isLight
                      ? 'bg-[#FAF8F5] border-amber-200 text-stone-900 placeholder:text-stone-400'
                      : 'bg-[#041514] border-gold-subtle text-white'
                  }`}
                />
              </div>

              <div>
                <label className={`text-xs font-bold block mb-1 ${isLight ? 'text-stone-700' : 'text-stone-300'}`}>
                  Alamat Lengkap Pengiriman:
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="Nama jalan, nomor rumah, RT/RW, kecamatan, kota..."
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className={`w-full px-3.5 py-2 rounded-xl border text-xs focus:ring-1 focus:ring-gold-400 transition-colors ${
                    isLight
                      ? 'bg-[#FAF8F5] border-amber-200 text-stone-900 placeholder:text-stone-400'
                      : 'bg-[#041514] border-gold-subtle text-white'
                  }`}
                />
              </div>

              <div className={`p-3 rounded-xl border flex items-center gap-2 text-[11px] ${
                isLight
                  ? 'bg-amber-50 border-amber-200 text-amber-900'
                  : 'bg-gold-950/80 border-gold-subtle text-gold-200'
              }`}>
                <ShieldCheck className={`w-4 h-4 flex-shrink-0 ${isLight ? 'text-amber-700' : 'text-gold-400'}`} />
                <span>Deposit sample box Rp 35.000 akan otomatis dipotongkan dari tagihan jika kamu jadi mencetak undangan fisik di HariNikah!</span>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-gold-400 text-black font-bold text-xs uppercase tracking-wider shadow-gold-sm transition-all flex items-center justify-center gap-2 hover:scale-102"
              >
                <Send className="w-4 h-4" />
                Kirim Permintaan Sample Box
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
