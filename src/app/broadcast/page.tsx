'use client';

import React, { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import { 
  Send, 
  Upload, 
  FileSpreadsheet, 
  CheckCircle2, 
  Check, 
  Clock, 
  Search, 
  Filter, 
  Download, 
  Plus, 
  Trash2, 
  RefreshCw, 
  ExternalLink, 
  MessageSquare, 
  Sparkles, 
  Users, 
  Eye, 
  ArrowLeft,
  Sun,
  Moon,
  Smartphone,
  QrCode,
  ShieldCheck,
  Wifi,
  WifiOff,
  Settings,
  Terminal,
  Radio,
  Sliders,
  CheckCircle
} from 'lucide-react';
import { useInvitation } from '../../context/InvitationContext';

export interface GuestRecipient {
  id: string;
  name: string;
  phone: string;
  category: 'VIP' | 'Keluarga' | 'Teman' | 'Kolega';
  status: 'pending' | 'sent' | 'delivered' | 'read';
  sentAt?: string;
}

const DEFAULT_GUESTS: GuestRecipient[] = [
  { id: '1', name: 'Bpk. H. Ahmad Sudirman & Ibu', phone: '6281278901234', category: 'VIP', status: 'read', sentAt: '10:42 WIB' },
  { id: '2', name: 'Dr. Hendra Gunawan & Rekan', phone: '6281356789012', category: 'VIP', status: 'delivered', sentAt: '10:43 WIB' },
  { id: '3', name: 'Keluarga Besar Bpk. R.M. Sutrisno', phone: '6285211223344', category: 'Keluarga', status: 'sent', sentAt: '10:45 WIB' },
  { id: '4', name: 'Ananda Bagas Wicaksono', phone: '6289655443322', category: 'Teman', status: 'read', sentAt: '10:46 WIB' },
  { id: '5', name: 'Reza Pratama, S.Kom & Partner', phone: '6287899887766', category: 'Teman', status: 'pending' },
  { id: '6', name: 'Ibu Hj. Siti Rahma & Keluarga', phone: '6281233445566', category: 'Keluarga', status: 'pending' },
  { id: '7', name: 'Kolega PT Indo Media Group', phone: '6281988776655', category: 'Kolega', status: 'pending' },
];

export default function BroadcastPage() {
  const { themeMode, toggleThemeMode } = useInvitation();
  const isLight = themeMode === 'light';

  const [guests, setGuests] = useState<GuestRecipient[]>(DEFAULT_GUESTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [broadcastProgress, setBroadcastProgress] = useState(0);
  const [invitationSlug, setInvitationSlug] = useState('dimas-clarissa');

  // SENDER WHATSAPP CONFIGURATION STATE
  const [senderMode, setSenderMode] = useState<'personal' | 'gateway'>('personal');
  const [senderPhone, setSenderPhone] = useState('0812-7890-1234');
  const [senderName, setSenderName] = useState('Dimas & Clarissa (Pengantin)');
  const [senderConnected, setSenderConnected] = useState(true);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [antiSpamDelay, setAntiSpamDelay] = useState<number>(3); // seconds

  const [activityLogs, setActivityLogs] = useState<Array<{ id: string; time: string; text: string; type: 'info' | 'success' | 'warn' }>>([
    { id: 'log-1', time: '10:40 WIB', text: 'Perangkat Pengirim Terhubung: +62 812-7890-1234 (WhatsApp Multi-Device Active)', type: 'success' },
    { id: 'log-2', time: '10:42 WIB', text: 'Terkirim ke: Bpk. H. Ahmad Sudirman & Ibu (+62 812-7890-1234) via Device Pengantin', type: 'info' },
    { id: 'log-3', time: '10:43 WIB', text: 'Terkirim ke: Dr. Hendra Gunawan & Rekan (+62 813-5678-9012) via Device Pengantin', type: 'info' }
  ]);

  const [messageTemplate, setMessageTemplate] = useState<string>(
`Kepada Yth.
*{nama}*
di Tempat

Assalamu’alaikum Warahmatullahi Wabarakatuh.
Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk hadir dan memberikan doa restu pada pernikahan kami:

*Raden Mas Dimas & Raden Ajeng Clarissa*
Sabtu, 18 Juli 2026
Grand Mercure Ballroom, Bandar Lampung

Detail acara & konfirmasi kehadiran (RSVP) dapat diakses melalui link resmi undangan kami berikut:
🔗 {link}

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir.
Wassalamu’alaikum Warahmatullahi Wabarakatuh.`
  );

  const [newGuestModalOpen, setNewGuestModalOpen] = useState(false);
  const [newGuestForm, setNewGuestForm] = useState({
    name: '',
    phone: '',
    category: 'Teman' as GuestRecipient['category']
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Statistics
  const totalGuests = guests.length;
  const sentCount = guests.filter(g => g.status !== 'pending').length;
  const readCount = guests.filter(g => g.status === 'read').length;
  const pendingCount = guests.filter(g => g.status === 'pending').length;

  // Active sender display
  const activeSenderDisplay = senderMode === 'personal'
    ? `${senderPhone} (${senderName})`
    : '+62 811-7200-NIKAH (HariNikah Official Gateway Centang Hijau)';

  // Generate personal link
  const getPersonalLink = (guestName: string) => {
    const encoded = encodeURIComponent(guestName);
    return `https://harinikah.com/${invitationSlug}?to=${encoded}`;
  };

  // Generate WhatsApp Direct URL
  const getWhatsAppUrl = (guest: GuestRecipient) => {
    const link = getPersonalLink(guest.name);
    const body = messageTemplate
      .replace(/{nama}/g, guest.name)
      .replace(/{link}/g, link);
    
    // Clean phone number
    let cleanPhone = guest.phone.replace(/[^0-9]/g, '');
    if (cleanPhone.startsWith('0')) {
      cleanPhone = '62' + cleanPhone.slice(1);
    }
    return `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(body)}`;
  };

  // Handle Excel Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target?.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json<any>(ws, { header: 1 });

        // Skip header if present
        const rows = data.slice(1);
        const imported: GuestRecipient[] = rows
          .filter(r => r[0] && r[1])
          .map((r, index) => {
            const rawCat = (r[2] || 'Teman').toString().trim();
            const validCategory: GuestRecipient['category'] = 
              ['VIP', 'Keluarga', 'Teman', 'Kolega'].includes(rawCat) 
                ? (rawCat as GuestRecipient['category']) 
                : 'Teman';

            return {
              id: `imported-${Date.now()}-${index}`,
              name: String(r[0]).trim(),
              phone: String(r[1]).replace(/[^0-9]/g, ''),
              category: validCategory,
              status: 'pending'
            };
          });

        if (imported.length > 0) {
          setGuests(prev => [...prev, ...imported]);
          const newLog = {
            id: `log-${Date.now()}`,
            time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
            text: `Berhasil mengimpor ${imported.length} data tamu dari Excel. Siap dikirim via ${activeSenderDisplay}.`,
            type: 'success' as const
          };
          setActivityLogs(prev => [newLog, ...prev.slice(0, 19)]);
          alert(`Berhasil mengimpor ${imported.length} data tamu dari file Excel!`);
        } else {
          alert('Format data tidak sesuai. Pastikan Kolom A = Nama, Kolom B = No WA, Kolom C = Kategori.');
        }
      } catch (err) {
        console.error(err);
        alert('Gagal membaca file Excel. Pastikan format file .xlsx atau .csv');
      }
    };
    reader.readAsBinaryString(file);
  };

  // Download Sample Excel Template
  const handleDownloadTemplate = () => {
    const wsData = [
      ['Nama Tamu', 'Nomor WhatsApp', 'Kategori'],
      ['Bpk. Ir. Joko Widodo & Ibu', '6281234567890', 'VIP'],
      ['Keluarga Besar Bpk. Ahmad', '081298765432', 'Keluarga'],
      ['Sarah Amanda, S.Ds.', '085712345678', 'Teman'],
      ['Rekan Divisi Creative', '081399887766', 'Kolega']
    ];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Template Tamu HariNikah');
    XLSX.writeFile(wb, 'Template_List_Tamu_HariNikah.xlsx');
  };

  // Export current guests list with status to Excel
  const handleExportData = () => {
    const wsData = [
      ['ID', 'Nama Tamu', 'Nomor WhatsApp', 'Kategori', 'Pengirim', 'Status Pengiriman', 'Waktu Kirim', 'Link Undangan Personal'],
      ...guests.map(g => [
        g.id,
        g.name,
        g.phone,
        g.category,
        activeSenderDisplay,
        g.status === 'read' ? 'Terbaca (Centang 2 Biru)' : g.status === 'delivered' ? 'Tersampaikan (Centang 2 Abu)' : g.status === 'sent' ? 'Terkirim (Centang 1)' : 'Belum Terkirim',
        g.sentAt || '-',
        getPersonalLink(g.name)
      ])
    ];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Data Tamu & Status');
    XLSX.writeFile(wb, `Status_Broadcast_HariNikah_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  // Single Guest Send Trigger
  const handleSingleSend = (guest: GuestRecipient) => {
    const url = getWhatsAppUrl(guest);
    window.open(url, '_blank');

    const timeStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';
    setGuests(prev => prev.map(g => {
      if (g.id === guest.id) {
        return { ...g, status: 'sent', sentAt: timeStr };
      }
      return g;
    }));

    const newLog = {
      id: `log-${Date.now()}`,
      time: timeStr,
      text: `[Dari: ${activeSenderDisplay}] ➔ Membuka WhatsApp ke ${guest.name} (${guest.phone})`,
      type: 'info' as const
    };
    setActivityLogs(prev => [newLog, ...prev.slice(0, 19)]);
  };

  // Simulate automated broadcast progression
  const handleStartBroadcast = async () => {
    const pendingGuests = guests.filter(g => g.status === 'pending');
    if (pendingGuests.length === 0) {
      alert('Semua tamu pada daftar sudah terkirim!');
      return;
    }

    if (senderMode === 'personal' && !senderConnected) {
      alert('Nomor pengirim belum terhubung! Silakan scan QR WhatsApp Web terlebih dahulu.');
      setQrModalOpen(true);
      return;
    }

    setIsBroadcasting(true);
    setBroadcastProgress(0);

    for (let i = 0; i < pendingGuests.length; i++) {
      const current = pendingGuests[i];
      // Anti-spam simulated delay
      await new Promise(res => setTimeout(res, antiSpamDelay * 1000));

      const timeStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' WIB';

      setGuests(prev => prev.map(g => {
        if (g.id === current.id) {
          return {
            ...g,
            status: 'sent',
            sentAt: timeStr
          };
        }
        return g;
      }));

      const newLog = {
        id: `log-${Date.now()}-${i}`,
        time: timeStr,
        text: `[Pengirim: ${activeSenderDisplay}] ➔ ${current.name} (${current.phone}) Berhasil Terkirim ✓`,
        type: 'success' as const
      };
      setActivityLogs(prev => [newLog, ...prev.slice(0, 19)]);

      setBroadcastProgress(Math.round(((i + 1) / pendingGuests.length) * 100));

      // After small delay, some turn to delivered or read
      setTimeout(() => {
        setGuests(prev => prev.map(g => {
          if (g.id === current.id) {
            return { ...g, status: Math.random() > 0.4 ? 'read' : 'delivered' };
          }
          return g;
        }));
      }, 2000);
    }

    setIsBroadcasting(false);
  };

  // Add guest manually
  const handleAddGuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuestForm.name || !newGuestForm.phone) return;

    const newGuest: GuestRecipient = {
      id: `manual-${Date.now()}`,
      name: newGuestForm.name,
      phone: newGuestForm.phone,
      category: newGuestForm.category,
      status: 'pending'
    };

    setGuests(prev => [newGuest, ...prev]);
    setNewGuestForm({ name: '', phone: '', category: 'Teman' });
    setNewGuestModalOpen(false);
  };

  // Filtered guests
  const filteredGuests = guests.filter(guest => {
    const matchQuery = guest.name.toLowerCase().includes(searchQuery.toLowerCase()) || guest.phone.includes(searchQuery);
    const matchCategory = filterCategory === 'all' || guest.category === filterCategory;
    const matchStatus = filterStatus === 'all' || guest.status === filterStatus;
    return matchQuery && matchCategory && matchStatus;
  });

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
            <span className="text-xs uppercase font-extrabold tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              WA Broadcast Suite
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Banner / Intro */}
        <div className={`p-6 sm:p-8 rounded-3xl border relative overflow-hidden ${
          isLight 
            ? 'bg-gradient-to-r from-[#F5EFE6] via-white to-[#F5EFE6] border-amber-300/80 shadow-md' 
            : 'bg-gradient-to-r from-[#072422] via-[#041514] to-[#0a2f2c] border-gold-400/40 shadow-velvet-deep'
        }`}>
          <div className="max-w-3xl space-y-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-500 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Generator Undangan Personal & Broadcast WhatsApp
            </span>
            <h1 className={`text-2xl sm:text-3xl font-serif font-bold ${isLight ? 'text-amber-900' : 'text-gold-bright'}`}>
              Kirim Undangan Otomatis ke Seluruh Tamu
            </h1>
            <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-stone-600' : 'text-stone-300'}`}>
              Hubungkan nomor WhatsApp pengantin Anda atau gunakan Official Gateway server, import data Excel tamu undangan, dan kirim pesan personal <code className="px-1.5 py-0.5 rounded bg-black/10 font-mono text-emerald-500">{`{nama}`}</code> & <code className="px-1.5 py-0.5 rounded bg-black/10 font-mono text-emerald-500">{`{link}`}</code> secara otomatis dengan proteksi anti-spam!
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-black/10">
            <div className={`p-3.5 rounded-2xl border ${isLight ? 'bg-white border-amber-200' : 'bg-black/30 border-gold-subtle'}`}>
              <span className="text-[10px] text-stone-500 uppercase font-bold tracking-wider block">Total Tamu</span>
              <p className={`text-2xl font-bold mt-1 ${isLight ? 'text-stone-900' : 'text-white'}`}>{totalGuests}</p>
            </div>
            <div className={`p-3.5 rounded-2xl border ${isLight ? 'bg-white border-amber-200' : 'bg-black/30 border-gold-subtle'}`}>
              <span className="text-[10px] text-sky-500 uppercase font-bold tracking-wider block">Terkirim</span>
              <p className="text-2xl font-bold mt-1 text-sky-500">{sentCount}</p>
            </div>
            <div className={`p-3.5 rounded-2xl border ${isLight ? 'bg-white border-amber-200' : 'bg-black/30 border-gold-subtle'}`}>
              <span className="text-[10px] text-emerald-500 uppercase font-bold tracking-wider block">Sudah Terbaca</span>
              <p className="text-2xl font-bold mt-1 text-emerald-500">{readCount}</p>
            </div>
            <div className={`p-3.5 rounded-2xl border ${isLight ? 'bg-white border-amber-200' : 'bg-black/30 border-gold-subtle'}`}>
              <span className="text-[10px] text-amber-500 uppercase font-bold tracking-wider block">Menunggu Kirim</span>
              <p className="text-2xl font-bold mt-1 text-amber-500">{pendingCount}</p>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* NEW SECTION: PENGATURAN NOMOR WHATSAPP PENGIRIM & GATEWAY */}
        {/* ======================================================== */}
        <div className={`p-6 sm:p-7 rounded-3xl border space-y-6 ${
          isLight 
            ? 'bg-white border-amber-300/80 shadow-md' 
            : 'bg-gradient-to-br from-[#072120] to-[#041514] border-emerald-500/40 shadow-velvet-deep'
        }`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-black/10">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-emerald-500 text-black flex items-center justify-center font-bold text-xs">
                  <Smartphone className="w-3.5 h-3.5" />
                </span>
                <h2 className={`text-base font-bold uppercase tracking-wider ${isLight ? 'text-amber-900' : 'text-gold-300'}`}>
                  Konfigurasi Nomor WhatsApp Pengirim (Sender Hub)
                </h2>
              </div>
              <p className="text-xs text-stone-400">
                Tentukan nomor WhatsApp yang akan digunakan untuk mengirimkan undangan ke seluruh nomor tamu.
              </p>
            </div>

            {/* Connection Status Badge */}
            <div className="flex items-center gap-2">
              <div className={`px-3 py-1.5 rounded-full border text-xs font-bold flex items-center gap-2 ${
                senderConnected
                  ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-400'
                  : 'bg-rose-500/15 border-rose-500/50 text-rose-400'
              }`}>
                {senderConnected ? <Wifi className="w-3.5 h-3.5 animate-pulse" /> : <WifiOff className="w-3.5 h-3.5" />}
                <span>{senderConnected ? 'Device Pengirim: Terhubung' : 'Device: Terputus'}</span>
              </div>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Option 1: Nomor WhatsApp Pengantin Pribadi */}
            <div 
              onClick={() => setSenderMode('personal')}
              className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                senderMode === 'personal'
                  ? 'border-emerald-500 bg-emerald-500/10 shadow-md'
                  : isLight ? 'border-stone-200 hover:border-stone-300 bg-stone-50' : 'border-white/10 hover:border-white/20 bg-black/20'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 block">
                    Mode Rekomendasi
                  </span>
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>Nomor WhatsApp Pengantin Sendiri</span>
                    {senderMode === 'personal' && <CheckCircle className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />}
                  </h3>
                  <p className="text-[11px] text-stone-400 leading-relaxed">
                    Tamu akan menerima undangan langsung dari nomor Anda (nama pengirim dikenal, bukan nomor bot asing).
                  </p>
                </div>
              </div>

              {senderMode === 'personal' && (
                <div className="mt-4 pt-3 border-t border-emerald-500/30 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="text-[10px] uppercase font-bold text-stone-400 block mb-1">
                        Nomor HP Pengirim:
                      </label>
                      <input
                        type="text"
                        value={senderPhone}
                        onChange={(e) => setSenderPhone(e.target.value)}
                        placeholder="0812xxxxxxx"
                        className={`w-full px-3 py-1.5 rounded-xl border text-xs font-mono font-bold ${
                          isLight ? 'bg-white border-stone-300 text-stone-900' : 'bg-black/50 border-emerald-500/40 text-emerald-300'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-bold text-stone-400 block mb-1">
                        Nama Profil Pengirim:
                      </label>
                      <input
                        type="text"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        placeholder="Dimas & Clarissa"
                        className={`w-full px-3 py-1.5 rounded-xl border text-xs font-semibold ${
                          isLight ? 'bg-white border-stone-300 text-stone-900' : 'bg-black/50 border-emerald-500/40 text-white'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-stone-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                      <span>Status: WhatsApp Web Multi-Device Aktif</span>
                    </span>

                    <button
                      onClick={(e) => { e.stopPropagation(); setQrModalOpen(true); }}
                      className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-emerald-400/50 text-emerald-300 text-xs font-bold flex items-center gap-1.5 transition-all"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      <span>Scan QR WA Web Baru</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Option 2: Server Gateway HariNikah Official */}
            <div 
              onClick={() => setSenderMode('gateway')}
              className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                senderMode === 'gateway'
                  ? 'border-amber-400 bg-amber-500/10 shadow-md'
                  : isLight ? 'border-stone-200 hover:border-stone-300 bg-stone-50' : 'border-white/10 hover:border-white/20 bg-black/20'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-500 block">
                    Mode Server Masking
                  </span>
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>HariNikah Official Gateway Server</span>
                    {senderMode === 'gateway' && <CheckCircle className="w-4 h-4 text-amber-400 fill-amber-400/20" />}
                  </h3>
                  <p className="text-[11px] text-stone-400 leading-relaxed">
                    Kirim otomatis melalui server blast resmi HariNikah dengan centang hijau official (bebas kuota & baterai HP).
                  </p>
                </div>
              </div>

              {senderMode === 'gateway' && (
                <div className="mt-4 pt-3 border-t border-amber-500/30 space-y-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-black/40 border border-amber-500/30 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-stone-400 block">Sender Masking Number:</span>
                      <span className="font-mono font-bold text-amber-400 text-xs">+62 811-7200-NIKAH</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                      ✓ Centang Hijau Verified
                    </span>
                  </div>
                  <p className="text-[10px] text-stone-500">
                    *Tamu akan menerima pesan dengan nama bisnis "HariNikah Wedding Suite" atas nama Dimas & Clarissa.
                  </p>
                </div>
              )}
            </div>

          </div>

          {/* Anti-Spam Safety Settings & Current Dispatch Status */}
          <div className="p-3.5 rounded-2xl bg-black/30 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-stone-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span><strong>Proteksi Anti-Spam:</strong> Jeda acak antar pesan</span>
              <select
                value={antiSpamDelay}
                onChange={(e) => setAntiSpamDelay(Number(e.target.value))}
                className={`px-2.5 py-1 rounded-lg border text-xs font-bold ${
                  isLight ? 'bg-white border-stone-300 text-stone-900' : 'bg-black/60 border-gold-subtle text-amber-400'
                }`}
              >
                <option value={2}>2 - 3 detik (Cepat)</option>
                <option value={3}>3 - 5 detik (Direkomendasikan)</option>
                <option value={6}>6 - 8 detik (Sangat Aman dari Blokir)</option>
              </select>
            </div>

            <div className="text-[11px] text-stone-400">
              Pengirim Aktif: <strong className="text-white">{activeSenderDisplay}</strong>
            </div>
          </div>
        </div>

        {/* Section 3: Actions Bar & Excel Upload */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Template Editor & Live Log (5 cols) */}
          <div className={`lg:col-span-5 p-6 rounded-3xl border space-y-4 ${
            isLight ? 'bg-white border-[#E8DEC8]' : 'bg-[#071f1e] border-gold-subtle'
          }`}>
            <div className="flex items-center justify-between">
              <h2 className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${
                isLight ? 'text-amber-900' : 'text-gold-300'
              }`}>
                <MessageSquare className="w-4 h-4 text-emerald-500" />
                Template Pesan WhatsApp
              </h2>
              <span className="text-[10px] text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full font-bold">
                Auto-Personalized
              </span>
            </div>

            {/* Sender & Receiver Box Indicator */}
            <div className="p-3 rounded-2xl bg-black/40 border border-white/10 space-y-1 text-[11px]">
              <div className="flex items-center justify-between text-stone-300">
                <span>📤 <strong>Pengirim:</strong></span>
                <span className="font-mono text-emerald-400 font-bold">{activeSenderDisplay}</span>
              </div>
              <div className="flex items-center justify-between text-stone-400">
                <span>📥 <strong>Tujuan:</strong></span>
                <span>Nomor HP Tamu Undangan (Kolom B Excel)</span>
              </div>
            </div>

            <div>
              <label className={`text-[11px] font-bold block mb-1 ${isLight ? 'text-stone-700' : 'text-stone-300'}`}>
                Slug Undangan Web:
              </label>
              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-500">harinikah.com/</span>
                <input
                  type="text"
                  value={invitationSlug}
                  onChange={(e) => setInvitationSlug(e.target.value)}
                  className={`flex-grow px-3 py-1.5 rounded-xl border text-xs font-mono ${
                    isLight ? 'bg-stone-50 border-stone-300 text-stone-900' : 'bg-black/40 border-gold-subtle text-gold-300'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className={`text-[11px] font-bold block mb-1 ${isLight ? 'text-stone-700' : 'text-stone-300'}`}>
                Isi Template Pesan WhatsApp:
              </label>
              <textarea
                rows={9}
                value={messageTemplate}
                onChange={(e) => setMessageTemplate(e.target.value)}
                className={`w-full p-3 rounded-2xl border text-xs leading-relaxed font-sans ${
                  isLight ? 'bg-stone-50 border-stone-300 text-stone-900' : 'bg-black/50 border-gold-subtle text-stone-200'
                }`}
              />
              <p className="text-[10px] text-stone-500 mt-1">
                Gunakan tag <span className="font-bold text-emerald-500">{`{nama}`}</span> untuk nama tamu dan <span className="font-bold text-emerald-500">{`{link}`}</span> untuk link personal unik.
              </p>
            </div>

            {/* Broadcast Launch Button */}
            <div className="pt-2">
              <button
                disabled={isBroadcasting}
                onClick={handleStartBroadcast}
                className={`w-full py-3.5 px-6 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all ${
                  isBroadcasting 
                    ? 'bg-stone-600 text-stone-300 cursor-not-allowed'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/40 hover:scale-102'
                }`}
              >
                {isBroadcasting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Mengirim dari {senderPhone} ({broadcastProgress}%)...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Mulai Broadcast Otomatis dari {senderMode === 'personal' ? senderPhone : 'Gateway'}</span>
                  </>
                )}
              </button>
            </div>

            {/* Real-time Broadcast Activity Console Log */}
            <div className="pt-2 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-stone-400">
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  Log Aktivitas Pengiriman Terkini
                </span>
                <span className="text-[10px] text-stone-500">Live Stream</span>
              </div>

              <div className="p-3 rounded-2xl bg-black/70 border border-white/10 font-mono text-[10px] space-y-1.5 max-h-36 overflow-y-auto">
                {activityLogs.map((log) => (
                  <div key={log.id} className="leading-relaxed flex items-start gap-1.5">
                    <span className="text-stone-500 flex-shrink-0">[{log.time}]</span>
                    <span className={log.type === 'success' ? 'text-emerald-400' : log.type === 'warn' ? 'text-amber-400' : 'text-stone-300'}>
                      {log.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Excel Management & Guest List Table (7 cols) */}
          <div className={`lg:col-span-7 p-6 rounded-3xl border space-y-5 ${
            isLight ? 'bg-white border-[#E8DEC8]' : 'bg-[#071f1e] border-gold-subtle'
          }`}>
            
            {/* Header: Upload Excel & Buttons */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h2 className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${
                  isLight ? 'text-amber-900' : 'text-gold-300'
                }`}>
                  <FileSpreadsheet className="w-4 h-4 text-emerald-500" />
                  Daftar Tamu & Pelacakan Status
                </h2>
                <span className="text-[11px] text-stone-500">
                  Import data via Excel atau tambah manual satu per satu
                </span>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".xlsx, .xls, .csv"
                  className="hidden"
                />

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3.5 py-1.5 rounded-full border border-emerald-500/50 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center gap-1.5 transition-all"
                  title="Upload file Excel .xlsx atau .csv"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Excel</span>
                </button>

                <button
                  onClick={handleDownloadTemplate}
                  className={`px-3 py-1.5 rounded-full border text-xs font-medium flex items-center gap-1 transition-all ${
                    isLight ? 'border-stone-300 text-stone-700 hover:bg-stone-100' : 'border-gold-subtle text-stone-300 hover:bg-white/5'
                  }`}
                  title="Download contoh template Excel"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Template</span>
                </button>

                <button
                  onClick={() => setNewGuestModalOpen(true)}
                  className="px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-gold-400 text-black text-xs font-bold flex items-center gap-1 hover:scale-105 transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Tamu</span>
                </button>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
              <div className="sm:col-span-6 relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Cari nama tamu atau no. WA..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-9 pr-3 py-2 rounded-xl border text-xs ${
                    isLight ? 'bg-stone-50 border-stone-300 text-stone-900' : 'bg-black/40 border-gold-subtle text-white'
                  }`}
                />
              </div>

              <div className="sm:col-span-3">
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl border text-xs ${
                    isLight ? 'bg-stone-50 border-stone-300 text-stone-900' : 'bg-black/40 border-gold-subtle text-white'
                  }`}
                >
                  <option value="all">Semua Kategori</option>
                  <option value="VIP">VIP</option>
                  <option value="Keluarga">Keluarga</option>
                  <option value="Teman">Teman</option>
                  <option value="Kolega">Kolega</option>
                </select>
              </div>

              <div className="sm:col-span-3">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl border text-xs ${
                    isLight ? 'bg-stone-50 border-stone-300 text-stone-900' : 'bg-black/40 border-gold-subtle text-white'
                  }`}
                >
                  <option value="all">Semua Status</option>
                  <option value="pending">Belum Kirim</option>
                  <option value="sent">Terkirim (Centang 1)</option>
                  <option value="delivered">Tersampaikan (Centang 2)</option>
                  <option value="read">Terbaca (Centang Biru)</option>
                </select>
              </div>
            </div>

            {/* Table of Guests */}
            <div className="border rounded-2xl overflow-hidden overflow-x-auto max-h-[460px] relative">
              <table className="w-full text-left text-xs">
                <thead className={`border-b text-[11px] font-bold uppercase tracking-wider sticky top-0 z-10 ${
                  isLight ? 'bg-[#F5EFE6] text-stone-700 border-stone-300' : 'bg-[#041514] text-gold-300 border-gold-subtle'
                }`}>
                  <tr>
                    <th className="py-3 px-3">Nama Tamu</th>
                    <th className="py-3 px-3">WhatsApp Tamu</th>
                    <th className="py-3 px-3">Kategori</th>
                    <th className="py-3 px-3">Status Pengiriman</th>
                    <th className="py-3 px-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${
                  isLight ? 'divide-stone-200' : 'divide-gold-subtle/30'
                }`}>
                  {filteredGuests.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-stone-500 text-xs">
                        Tidak ada data tamu yang cocok dengan filter.
                      </td>
                    </tr>
                  ) : (
                    filteredGuests.map((guest) => {
                      const link = getPersonalLink(guest.name);
                      return (
                        <tr 
                          key={guest.id}
                          className={`hover:bg-white/5 transition-colors ${
                            isLight ? 'hover:bg-amber-50/60' : ''
                          }`}
                        >
                          <td className="py-3 px-3">
                            <span className="font-semibold block">{guest.name}</span>
                            <a 
                              href={link} 
                              target="_blank" 
                              rel="noreferrer"
                              className="text-[10px] text-amber-500 hover:underline flex items-center gap-1 mt-0.5 truncate max-w-[200px]"
                            >
                              <span>{link}</span>
                              <ExternalLink className="w-2.5 h-2.5 flex-shrink-0" />
                            </a>
                          </td>

                          <td className="py-3 px-3 font-mono text-stone-400">
                            {guest.phone}
                          </td>

                          <td className="py-3 px-3">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              guest.category === 'VIP' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' :
                              guest.category === 'Keluarga' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/40' :
                              guest.category === 'Kolega' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40' :
                              'bg-stone-500/20 text-stone-400 border border-stone-500/40'
                            }`}>
                              {guest.category}
                            </span>
                          </td>

                          <td className="py-3 px-3">
                            {guest.status === 'read' ? (
                              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-[11px]">
                                <div className="flex -space-x-1">
                                  <Check className="w-3.5 h-3.5 text-sky-400" />
                                  <Check className="w-3.5 h-3.5 text-sky-400" />
                                </div>
                                <span>Terbaca</span>
                                {guest.sentAt && <span className="text-[9px] text-stone-500 font-normal">({guest.sentAt})</span>}
                              </div>
                            ) : guest.status === 'delivered' ? (
                              <div className="flex items-center gap-1.5 text-sky-400 font-medium text-[11px]">
                                <div className="flex -space-x-1">
                                  <Check className="w-3.5 h-3.5 text-stone-400" />
                                  <Check className="w-3.5 h-3.5 text-stone-400" />
                                </div>
                                <span>Tersampaikan</span>
                              </div>
                            ) : guest.status === 'sent' ? (
                              <div className="flex items-center gap-1.5 text-stone-400 font-medium text-[11px]">
                                <Check className="w-3.5 h-3.5 text-stone-400" />
                                <span>Terkirim</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1.5 text-amber-500 text-[11px]">
                                <Clock className="w-3.5 h-3.5" />
                                <span>Belum Kirim</span>
                              </div>
                            )}
                          </td>

                          <td className="py-3 px-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleSingleSend(guest)}
                                className="px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-[11px] flex items-center gap-1 shadow-sm transition-all"
                                title={`Kirim Pesan WhatsApp dari ${activeSenderDisplay}`}
                              >
                                <Send className="w-3 h-3" />
                                <span>Kirim WA</span>
                              </button>
                              <button
                                onClick={() => setGuests(prev => prev.filter(g => g.id !== guest.id))}
                                className="p-1.5 rounded-lg text-stone-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                                title="Hapus dari daftar"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Bottom Actions: Export to Excel */}
            <div className="flex items-center justify-between text-xs pt-2">
              <span className="text-stone-500">
                Menampilkan {filteredGuests.length} dari {guests.length} tamu undangan
              </span>

              <button
                onClick={handleExportData}
                className={`px-4 py-2 rounded-xl border font-bold text-xs flex items-center gap-1.5 transition-all ${
                  isLight ? 'border-amber-300 bg-amber-50 text-amber-900 hover:bg-amber-100' : 'border-gold-subtle bg-black/40 text-gold-300 hover:bg-white/5'
                }`}
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Laporan Excel</span>
              </button>
            </div>

          </div>

        </div>

      </main>

      {/* MODAL 1: QR CODE PAIRING MODAL (WHATSAPP WEB MULTI-DEVICE) */}
      {qrModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className={`p-6 sm:p-8 rounded-3xl border max-w-lg w-full space-y-6 ${
            isLight ? 'bg-white border-amber-300 text-stone-900' : 'bg-[#071f1e] border-emerald-500/60 text-white'
          }`}>
            <div className="flex items-center justify-between border-b pb-3 border-black/10">
              <div className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold">Pindai QR Code WhatsApp Web</h3>
              </div>
              <button 
                onClick={() => setQrModalOpen(false)}
                className="text-stone-400 hover:text-white text-xs font-semibold"
              >
                Tutup
              </button>
            </div>

            <div className="text-center space-y-4">
              <p className="text-xs text-stone-300">
                Hubungkan WhatsApp di HP Anda agar pesan broadcast terkirim atas nama nomor pribadi Anda.
              </p>

              {/* QR Image Canvas Simulation */}
              <div className="w-56 h-56 mx-auto bg-white p-3 rounded-2xl shadow-xl border-2 border-emerald-500/50 flex items-center justify-center relative">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=WHATSAPP_WEB_PAIRING_HARINIKAH_6281278901234"
                  alt="WhatsApp Web QR Code"
                  className="w-full h-full object-contain"
                />
                <div className="absolute inset-x-0 top-0 h-1 bg-emerald-500 animate-bounce"></div>
              </div>

              {/* Step by Step Guide */}
              <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 text-left text-xs space-y-2">
                <p className="font-bold text-emerald-400">Cara Menghubungkan:</p>
                <ol className="list-decimal list-inside space-y-1 text-stone-300 text-[11px]">
                  <li>Buka WhatsApp di ponsel calon pengantin</li>
                  <li>Ketuk <strong>Menu (titik tiga)</strong> atau <strong>Pengaturan</strong></li>
                  <li>Pilih <strong>Perangkat Tertaut</strong> lalu ketuk <strong>Tautkan Perangkat</strong></li>
                  <li>Arahkan kamera HP Anda ke kode QR di atas</li>
                </ol>
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setQrModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-stone-400/40 text-xs font-medium"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSenderConnected(true);
                    setQrModalOpen(false);
                    const newLog = {
                      id: `log-${Date.now()}`,
                      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
                      text: `Perangkat Berhasil Dipasangkan: ${senderPhone} (${senderName}) — Online`,
                      type: 'success' as const
                    };
                    setActivityLogs(prev => [newLog, ...prev.slice(0, 19)]);
                    alert('Perangkat WhatsApp pengantin berhasil terhubung!');
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md"
                >
                  Simulasi Perangkat Terhubung
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: MANUAL GUEST MODAL */}
      {newGuestModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className={`p-6 rounded-3xl border max-w-md w-full space-y-4 ${
            isLight ? 'bg-white border-amber-300 text-stone-900' : 'bg-[#071f1e] border-gold-400 text-white'
          }`}>
            <h3 className="text-base font-bold flex items-center gap-2">
              <Plus className="w-4 h-4 text-emerald-500" />
              Tambah Tamu Undangan Baru
            </h3>
            
            <form onSubmit={handleAddGuest} className="space-y-3">
              <div>
                <label className="text-xs font-bold block mb-1">Nama Tamu & Gelar:</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Bpk. H. Rahmat & Ibu"
                  value={newGuestForm.name}
                  onChange={(e) => setNewGuestForm({ ...newGuestForm, name: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl border text-xs ${
                    isLight ? 'bg-stone-50 border-stone-300 text-stone-900' : 'bg-black/50 border-gold-subtle text-white'
                  }`}
                />
              </div>

              <div>
                <label className="text-xs font-bold block mb-1">Nomor WhatsApp (Aktif):</label>
                <input
                  type="tel"
                  required
                  placeholder="Contoh: 081278901234 atau 62812..."
                  value={newGuestForm.phone}
                  onChange={(e) => setNewGuestForm({ ...newGuestForm, phone: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl border text-xs ${
                    isLight ? 'bg-stone-50 border-stone-300 text-stone-900' : 'bg-black/50 border-gold-subtle text-white'
                  }`}
                />
              </div>

              <div>
                <label className="text-xs font-bold block mb-1">Kategori Tamu:</label>
                <select
                  value={newGuestForm.category}
                  onChange={(e) => setNewGuestForm({ ...newGuestForm, category: e.target.value as any })}
                  className={`w-full px-3 py-2 rounded-xl border text-xs ${
                    isLight ? 'bg-stone-50 border-stone-300 text-stone-900' : 'bg-black/50 border-gold-subtle text-white'
                  }`}
                >
                  <option value="VIP">VIP</option>
                  <option value="Keluarga">Keluarga</option>
                  <option value="Teman">Teman</option>
                  <option value="Kolega">Kolega</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setNewGuestModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-stone-400/40 text-xs font-medium"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-gold-400 text-black text-xs font-bold shadow-md hover:scale-102"
                >
                  Simpan Tamu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
