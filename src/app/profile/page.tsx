'use client';

import React, { useState } from 'react';
import { 
  User, 
  Settings, 
  CreditCard, 
  Heart, 
  ExternalLink, 
  Edit3, 
  Send, 
  Eye, 
  CheckCircle2, 
  Clock, 
  Download, 
  ArrowLeft, 
  Sun, 
  Moon, 
  ShoppingBag, 
  Copy, 
  ShieldCheck, 
  Layers, 
  MapPin, 
  Phone, 
  Mail,
  Share2
} from 'lucide-react';
import { useInvitation } from '../../context/InvitationContext';

export default function ProfilePage() {
  const { themeMode, toggleThemeMode } = useInvitation();
  const isLight = themeMode === 'light';

  const [activeTab, setActiveTab] = useState<'invitations' | 'transactions' | 'settings'>('invitations');
  const [copiedLink, setCopiedLink] = useState(false);

  // User details state
  const [userProfile, setUserProfile] = useState({
    name: 'Dimas Setiawan & Clarissa Putri',
    email: 'dimas.clarissa@harinikah.com',
    phone: '0812-7890-1234',
    city: 'Bandar Lampung, Lampung',
    tier: 'Member VIP HariNikah',
    joinedDate: 'Januari 2026'
  });

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://harinikah.com/dimas-clarissa');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
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
              Profil Pengguna
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleThemeMode}
            className={`p-2 rounded-full border text-xs font-medium transition-colors ${
              isLight ? 'bg-amber-100 border-amber-300 text-amber-900' : 'bg-white/5 border-gold-subtle text-gold-300'
            }`}
          >
            {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
          <a
            href="/editor"
            className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-400 to-gold-400 text-black font-bold text-xs shadow-gold-sm hover:scale-105 transition-all"
          >
            Buka Editor
          </a>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Profile Card Summary */}
        <div className={`p-6 sm:p-8 rounded-3xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden ${
          isLight 
            ? 'bg-gradient-to-r from-[#F5EFE6] via-white to-[#F5EFE6] border-amber-300/80 shadow-md' 
            : 'bg-gradient-to-r from-[#072422] via-[#041514] to-[#0a2f2c] border-gold-400/40 shadow-velvet-deep'
        }`}>
          <div className="flex items-center gap-5">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                alt="Avatar"
                className="w-20 h-20 rounded-2xl object-cover ring-2 ring-amber-400/60 shadow-lg"
              />
              <span className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white" title="Akun Terverifikasi">
                <CheckCircle2 className="w-4 h-4" />
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className={`text-xl sm:text-2xl font-serif font-bold ${isLight ? 'text-stone-900' : 'text-gold-bright'}`}>
                  {userProfile.name}
                </h1>
              </div>
              <p className="text-xs text-stone-400 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                <span>{userProfile.city}</span>
                <span>•</span>
                <span className="text-amber-500 font-semibold">{userProfile.tier}</span>
              </p>
              <p className="text-[11px] text-stone-500">
                Terdaftar sejak {userProfile.joinedDate} • ID Pasangan: #HN-78921
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full md:w-auto">
            <a
              href="/broadcast"
              className="flex-1 md:flex-initial px-4 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Broadcast WA</span>
            </a>
            <a
              href="/editor"
              className="flex-1 md:flex-initial px-4 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-gold-400 text-black font-bold text-xs flex items-center justify-center gap-2 shadow transition-all"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Edit Undangan</span>
            </a>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className={`border-b flex items-center gap-4 sm:gap-8 text-xs font-bold uppercase tracking-wider ${
          isLight ? 'border-stone-300' : 'border-gold-subtle'
        }`}>
          <button
            onClick={() => setActiveTab('invitations')}
            className={`pb-3.5 flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'invitations'
                ? isLight 
                  ? 'border-amber-700 text-amber-800' 
                  : 'border-gold-400 text-gold-300'
                : 'border-transparent text-stone-500 hover:text-stone-400'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Undangan Saya (1)</span>
          </button>

          <button
            onClick={() => setActiveTab('transactions')}
            className={`pb-3.5 flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'transactions'
                ? isLight 
                  ? 'border-amber-700 text-amber-800' 
                  : 'border-gold-400 text-gold-300'
                : 'border-transparent text-stone-500 hover:text-stone-400'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Riwayat Transaksi & Pembayaran</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`pb-3.5 flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'settings'
                ? isLight 
                  ? 'border-amber-700 text-amber-800' 
                  : 'border-gold-400 text-gold-300'
                : 'border-transparent text-stone-500 hover:text-stone-400'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Pengaturan Akun</span>
          </button>
        </div>

        {/* Tab Content: 1. INVITATIONS */}
        {activeTab === 'invitations' && (
          <div className="space-y-6">
            <div className={`p-6 sm:p-8 rounded-3xl border ${
              isLight ? 'bg-white border-[#E8DEC8]' : 'bg-[#071f1e] border-gold-subtle'
            }`}>
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-black/10">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                      Status: Aktif / Live
                    </span>
                    <span className="text-xs text-stone-400">• Masa Aktif: Selamanya (Lifetime)</span>
                  </div>
                  <h2 className={`text-xl font-serif font-bold ${isLight ? 'text-amber-900' : 'text-gold-bright'}`}>
                    The Wedding of Dimas & Clarissa
                  </h2>
                  <p className="text-xs text-stone-500">
                    Template: Adat Jawa Kasunanan (Sogan Keraton & Gunungan Wayang Emas)
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={handleCopyLink}
                    className={`px-3.5 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                      isLight ? 'border-amber-200 text-stone-800 hover:bg-amber-50' : 'border-gold-subtle text-stone-200 hover:bg-white/5'
                    }`}
                  >
                    <Copy className="w-3.5 h-3.5 text-amber-500" />
                    <span>{copiedLink ? 'Link Tersalin!' : 'Salin Tautan'}</span>
                  </button>

                  <a
                    href="/dimas-clarissa"
                    target="_blank"
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-gold-subtle text-gold-300 text-xs font-semibold flex items-center gap-1.5 transition-all"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Lihat Live</span>
                  </a>

                  <a
                    href="/editor"
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-gold-400 text-black text-xs font-bold flex items-center gap-1.5 shadow hover:scale-102 transition-all"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Desain</span>
                  </a>
                </div>
              </div>

              {/* Real-time Analytics Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
                <div className={`p-4 rounded-2xl border ${isLight ? 'bg-stone-50 border-stone-200' : 'bg-black/30 border-gold-subtle'}`}>
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">Total Pengunjung</span>
                  <p className={`text-2xl font-bold mt-1 ${isLight ? 'text-stone-900' : 'text-white'}`}>1.428</p>
                  <span className="text-[10px] text-emerald-500">+12% dari kemarin</span>
                </div>

                <div className={`p-4 rounded-2xl border ${isLight ? 'bg-stone-50 border-stone-200' : 'bg-black/30 border-gold-subtle'}`}>
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">RSVP Hadir</span>
                  <p className="text-2xl font-bold mt-1 text-emerald-500">342 orang</p>
                  <span className="text-[10px] text-stone-400">Total 186 konfirmasi</span>
                </div>

                <div className={`p-4 rounded-2xl border ${isLight ? 'bg-stone-50 border-stone-200' : 'bg-black/30 border-gold-subtle'}`}>
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">Doa & Ucapan</span>
                  <p className="text-2xl font-bold mt-1 text-sky-400">86 doa</p>
                  <span className="text-[10px] text-stone-400">Di buku tamu digital</span>
                </div>

                <div className={`p-4 rounded-2xl border ${isLight ? 'bg-stone-50 border-stone-200' : 'bg-black/30 border-gold-subtle'}`}>
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">Amplop Digital</span>
                  <p className="text-2xl font-bold mt-1 text-amber-500">Rp 14.850.000</p>
                  <span className="text-[10px] text-stone-400">Langsung ke rekening</span>
                </div>
              </div>

              {/* Action Banner: WhatsApp Broadcast */}
              <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-emerald-900/30 border border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <Send className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Broadcast WhatsApp Tamu Otomatis</h4>
                    <p className="text-[11px] text-stone-300">
                      Upload list tamu dari Excel dan kirim link undangan personal dengan 1-klik.
                    </p>
                  </div>
                </div>
                <a
                  href="/broadcast"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs whitespace-nowrap shadow hover:scale-102 transition-all"
                >
                  Buka Menu Broadcast WA →
                </a>
              </div>

            </div>
          </div>
        )}

        {/* Tab Content: 2. TRANSACTIONS & INVOICES */}
        {activeTab === 'transactions' && (
          <div className="space-y-6">
            
            {/* Digital Invoices */}
            <div className={`p-6 sm:p-8 rounded-3xl border space-y-4 ${
              isLight ? 'bg-white border-[#E8DEC8]' : 'bg-[#071f1e] border-gold-subtle'
            }`}>
              <h3 className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${
                isLight ? 'text-amber-900' : 'text-gold-300'
              }`}>
                <CreditCard className="w-4 h-4 text-amber-500" />
                Faktur Pembayaran Digital
              </h3>

              <div className="border rounded-2xl overflow-hidden overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className={`border-b text-[10px] font-bold uppercase ${
                    isLight ? 'bg-stone-100 text-stone-700' : 'bg-black/40 text-gold-300'
                  }`}>
                    <tr>
                      <th className="py-3 px-4">No. Invoice</th>
                      <th className="py-3 px-4">Paket Layanan</th>
                      <th className="py-3 px-4">Tanggal</th>
                      <th className="py-3 px-4">Metode Bayar</th>
                      <th className="py-3 px-4">Nominal</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${isLight ? 'divide-stone-200' : 'divide-gold-subtle/30'}`}>
                    <tr>
                      <td className="py-3 px-4 font-mono font-semibold">INV-HN-2026-0814</td>
                      <td className="py-3 px-4 font-medium">Paket Premium Canva Editor + Mode Terima Beres</td>
                      <td className="py-3 px-4 text-stone-400">18 Juli 2026</td>
                      <td className="py-3 px-4">QRIS Instant</td>
                      <td className="py-3 px-4 font-bold text-amber-500">Rp 180.000</td>
                      <td className="py-3 px-4">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                          LUNAS
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button 
                          onClick={() => alert('Mengunduh faktur resmi PDF INV-HN-2026-0814...')}
                          className="text-amber-500 hover:underline flex items-center gap-1 justify-end ml-auto"
                        >
                          <Download className="w-3 h-3" />
                          <span>PDF</span>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Shopee Physical Invitation Orders */}
            <div className={`p-6 sm:p-8 rounded-3xl border space-y-4 ${
              isLight ? 'bg-white border-[#E8DEC8]' : 'bg-[#071f1e] border-gold-subtle'
            }`}>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-[#EE4D2D]">
                  <ShoppingBag className="w-4 h-4 text-[#EE4D2D]" />
                  Pesanan Undangan Fisik di Shopee Official Store
                </h3>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#EE4D2D]/10 text-[#EE4D2D] font-bold border border-[#EE4D2D]/30">
                  Shopee Star+ Guarantee
                </span>
              </div>

              <div className="p-4 rounded-2xl border border-stone-200 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-stone-400">No. Pesanan: 260718SHPHARINIKAH</span>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-sky-500/20 text-sky-400">
                      Sedang Dikirim
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white">
                    300 pcs Hardcover Board 30 Beludru Emerald + Hotprint Foil Emas
                  </h4>
                  <p className="text-[11px] text-stone-400">
                    Ekspedisi: J&T Cargo • Dikirim dari: Studio HariNikah Bandar Lampung • Estimasi Tiba: 2 hari lagi
                  </p>
                </div>

                <a
                  href="https://shopee.co.id/harinikah_official"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#EE4D2D] hover:bg-[#D73211] text-white text-xs font-bold flex items-center gap-1.5 shadow transition-transform hover:scale-102"
                >
                  <span>Lacak di Shopee</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        )}

        {/* Tab Content: 3. SETTINGS */}
        {activeTab === 'settings' && (
          <div className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${
            isLight ? 'bg-white border-[#E8DEC8]' : 'bg-[#071f1e] border-gold-subtle'
          }`}>
            <h3 className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${
              isLight ? 'text-amber-900' : 'text-gold-300'
            }`}>
              <Settings className="w-4 h-4 text-amber-500" />
              Pengaturan Profil & Akun
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold block mb-1">Nama Pasangan:</label>
                <input
                  type="text"
                  value={userProfile.name}
                  onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs ${
                    isLight ? 'bg-stone-50 border-stone-300 text-stone-900' : 'bg-black/40 border-gold-subtle text-white'
                  }`}
                />
              </div>

              <div>
                <label className="text-xs font-bold block mb-1">Email:</label>
                <input
                  type="email"
                  value={userProfile.email}
                  onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs ${
                    isLight ? 'bg-stone-50 border-stone-300 text-stone-900' : 'bg-black/40 border-gold-subtle text-white'
                  }`}
                />
              </div>

              <div>
                <label className="text-xs font-bold block mb-1">Nomor WhatsApp Pengantin:</label>
                <input
                  type="tel"
                  value={userProfile.phone}
                  onChange={(e) => setUserProfile({ ...userProfile, phone: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs ${
                    isLight ? 'bg-stone-50 border-stone-300 text-stone-900' : 'bg-black/40 border-gold-subtle text-white'
                  }`}
                />
              </div>

              <div>
                <label className="text-xs font-bold block mb-1">Kota Domisili:</label>
                <input
                  type="text"
                  value={userProfile.city}
                  onChange={(e) => setUserProfile({ ...userProfile, city: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs ${
                    isLight ? 'bg-stone-50 border-stone-300 text-stone-900' : 'bg-black/40 border-gold-subtle text-white'
                  }`}
                />
              </div>
            </div>

            <div className="pt-4 border-t border-black/10 flex justify-end">
              <button
                onClick={() => alert('Perubahan profil berhasil disimpan!')}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-gold-400 text-black font-bold text-xs shadow-gold-sm hover:scale-102 transition-all"
              >
                Simpan Perubahan Profil
              </button>
            </div>
          </div>
        )}

      </main>

    </div>
  );
}

