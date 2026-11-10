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
  Shield,
  ShieldAlert,
  AlertTriangle,
  Wifi,
  WifiOff,
  Settings,
  Terminal,
  Radio,
  Sliders,
  CheckCircle,
  Pause,
  Play,
  Square,
  Info,
  HelpCircle,
  Shuffle,
  BookOpen,
  Zap
} from 'lucide-react';
import { useInvitation } from '../../context/InvitationContext';

export interface GuestRecipient {
  id: string;
  name: string;
  phone: string;
  category: 'VIP' | 'Keluarga' | 'Teman' | 'Kolega';
  status: 'pending' | 'sent' | 'delivered' | 'read';
  sentAt?: string;
  isValidNumber?: boolean;
  phoneWarning?: string;
}

// -------------------------------------------------------------
// ANTI-BANNED ENGINE HELPER FUNCTIONS
// -------------------------------------------------------------

/**
 * Sanitize Indonesian WhatsApp phone number format
 * Converts 08xxx or 8xxx to 628xxx, strips dashes/spaces/symbols.
 */
export function sanitizePhone(raw: string): { phone: string; isValid: boolean; warning?: string } {
  let cleaned = String(raw || '').replace(/[^0-9]/g, '');
  if (cleaned.startsWith('0')) {
    cleaned = '62' + cleaned.slice(1);
  } else if (cleaned.startsWith('8')) {
    cleaned = '628' + cleaned.slice(1);
  } else if (cleaned.length >= 9 && !cleaned.startsWith('62')) {
    cleaned = '62' + cleaned;
  }

  if (!cleaned.startsWith('62')) {
    return { phone: cleaned, isValid: false, warning: 'Awalan no. harus 62 atau 08' };
  }
  if (cleaned.length < 10 || cleaned.length > 15) {
    return { phone: cleaned, isValid: false, warning: 'Panjang no. tidak lazim (10-15 digit)' };
  }
  return { phone: cleaned, isValid: true };
}

/**
 * Spintax Parser: Randomizes variations formatted as {option1|option2|option3}
 * Preserves variables {nama}, {link}, {kategori}.
 */
export function parseSpintax(text: string): string {
  return text.replace(/\{([^{}]+)\}/g, (match, contents) => {
    const trimmed = contents.trim();
    if (trimmed === 'nama' || trimmed === 'link' || trimmed === 'kategori') {
      return match;
    }
    const parts = contents.split('|');
    if (parts.length > 1) {
      return parts[Math.floor(Math.random() * parts.length)].trim();
    }
    return match;
  });
}

/**
 * Injects invisible zero-width unicode token to ensure unique message hash
 * Prevents WhatsApp algorithmic duplicate/burst spam hash flags.
 */
export function injectZeroWidthFingerprint(text: string): string {
  const zeroTokens = ['\u200B', '\u200C', '\u200D'];
  const token = zeroTokens[Math.floor(Math.random() * zeroTokens.length)];
  const words = text.split(' ');
  if (words.length > 4) {
    const idx = Math.floor(Math.random() * (words.length - 2)) + 1;
    words[idx] += token;
    return words.join(' ');
  }
  return text + token;
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

  // -----------------------------------------------------------
  // ANTI-BANNED BROADCAST SAFEGUARD SUITE STATE
  // -----------------------------------------------------------
  const [safetyProfile, setSafetyProfile] = useState<'ultra' | 'safe' | 'balanced'>('ultra');
  const [useSpintax, setUseSpintax] = useState(true);
  const [useZeroWidth, setUseZeroWidth] = useState(true);
  const [broadcastStatusText, setBroadcastStatusText] = useState('');
  const [countdownSeconds, setCountdownSeconds] = useState(0);
  const [rulesModalOpen, setRulesModalOpen] = useState(false);
  const [previewSpintaxModalOpen, setPreviewSpintaxModalOpen] = useState(false);
  const [previewSpintaxSamples, setPreviewSpintaxSamples] = useState<string[]>([]);
  const stopBroadcastRef = useRef<boolean>(false);

  const [activityLogs, setActivityLogs] = useState<Array<{ id: string; time: string; text: string; type: 'info' | 'success' | 'warn' }>>([
    { id: 'log-0', time: '10:38 WIB', text: '🛡️ Anti-Banned Safeguard Suite Aktif: Spintax Engine, Human Jitter & Batch Cooldown Standby.', type: 'success' },
    { id: 'log-1', time: '10:40 WIB', text: 'Perangkat Pengirim Terhubung: +62 812-7890-1234 (WhatsApp Multi-Device Active)', type: 'success' },
    { id: 'log-2', time: '10:42 WIB', text: 'Terkirim ke: Bpk. H. Ahmad Sudirman & Ibu (+62 812-7890-1234) via Device Pengantin [Hash Unik]', type: 'info' },
    { id: 'log-3', time: '10:43 WIB', text: 'Terkirim ke: Dr. Hendra Gunawan & Rekan (+62 813-5678-9012) via Device Pengantin [Hash Unik]', type: 'info' }
  ]);

  const [messageTemplate, setMessageTemplate] = useState<string>(
`Kepada Yth.
*{nama}*
di Tempat

{Assalamu’alaikum Warahmatullahi Wabarakatuh.|Salam sejahtera bagi kita semua.|Dengan penuh rasa syukur dan hormat,}
Tanpa mengurangi rasa hormat, perkenankan kami mengundang {Bapak/Ibu/Saudara/i|Bapak/Ibu & Rekan|Keluarga & Sahabat} untuk hadir dan memberikan doa restu pada pernikahan kami:

*Raden Mas Dimas & Raden Ajeng Clarissa*
Sabtu, 18 Juli 2026
Grand Mercure Ballroom, Bandar Lampung

Detail acara & konfirmasi kehadiran (RSVP) dapat diakses melalui link resmi undangan kami:
🔗 {link}

{Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir.|Kehadiran serta doa restu Anda merupakan karunia terindah bagi kami berdua.|Doa restu Anda sangat berarti bagi awal perjalanan ibadah suci pernikahan kami.}

{Wassalamu’alaikum Warahmatullahi Wabarakatuh.|Salam hangat penuh hormat kami,|Hormat dan salam takzim kami,}`
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

  // Generate WhatsApp Direct URL with Spintax & Sanitized Phone
  const getWhatsAppUrl = (guest: GuestRecipient) => {
    const link = getPersonalLink(guest.name);
    let body = messageTemplate;
    if (useSpintax) {
      body = parseSpintax(body);
    }
    if (useZeroWidth) {
      body = injectZeroWidthFingerprint(body);
    }
    body = body
      .replace(/{nama}/g, guest.name)
      .replace(/{link}/g, link);
    
    // Clean phone number to strictly valid 62 format
    const { phone } = sanitizePhone(guest.phone);
    return `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(body)}`;
  };

  // Preview Spintax Variations
  const handleOpenSpintaxPreview = () => {
    const sampleNames = ['Bpk. Dr. Hendra Gunawan', 'Ibu Hj. Siti Rahma & Keluarga', 'Reza Pratama, S.Kom'];
    const samples = sampleNames.map(name => {
      let body = messageTemplate;
      body = parseSpintax(body);
      body = injectZeroWidthFingerprint(body);
      const link = getPersonalLink(name);
      return body.replace(/{nama}/g, name).replace(/{link}/g, link);
    });
    setPreviewSpintaxSamples(samples);
    setPreviewSpintaxModalOpen(true);
  };

  // Handle Excel Upload with auto-sanitization
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

            const phoneCheck = sanitizePhone(String(r[1]));

            return {
              id: `imported-${Date.now()}-${index}`,
              name: String(r[0]).trim(),
              phone: phoneCheck.phone,
              category: validCategory,
              status: 'pending',
              isValidNumber: phoneCheck.isValid,
              phoneWarning: phoneCheck.warning
            };
          });

        if (imported.length > 0) {
          setGuests(prev => [...prev, ...imported]);
          const invalidCount = imported.filter(i => !i.isValidNumber).length;
          const newLog = {
            id: `log-${Date.now()}`,
            time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
            text: `Berhasil mengimpor ${imported.length} data tamu dari Excel. Format nomor otomatis distandarisasi ke format 62${invalidCount > 0 ? ` (⚠️ ${invalidCount} nomor diperiksa ulang)` : ''}.`,
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
      ['Bpk. Ir. Joko Widodo & Ibu', '081234567890', 'VIP'],
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

  // Single Guest Send Trigger (100% Safe Official Click-to-Chat)
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
      text: `[1-Klik Resmi Bebas Blokir] ➔ Membuka WhatsApp Web/App ke ${guest.name} (${guest.phone})`,
      type: 'info' as const
    };
    setActivityLogs(prev => [newLog, ...prev.slice(0, 19)]);
  };

  // Countdown Helper for human-like pauses and batch cooldown
  const sleepWithCountdown = async (seconds: number, statusMsg: string) => {
    let remaining = Math.round(seconds);
    setCountdownSeconds(remaining);
    while (remaining > 0) {
      if (stopBroadcastRef.current) return false;
      setBroadcastStatusText(`${statusMsg} (${remaining}s)`);
      await new Promise(r => setTimeout(r, 1000));
      remaining -= 1;
      setCountdownSeconds(remaining);
    }
    setCountdownSeconds(0);
    return !stopBroadcastRef.current;
  };

  // Automated broadcast progression with Anti-Banned Throttling & Human Jitter
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

    stopBroadcastRef.current = false;
    setIsBroadcasting(true);
    setBroadcastProgress(0);

    const config = {
      ultra: { baseDelay: 8, jitter: 6, batchLimit: 10, cooldown: 35, label: 'Mode Ultra-Aman' },
      safe: { baseDelay: 5, jitter: 4, batchLimit: 15, cooldown: 20, label: 'Mode Standar Aman' },
      balanced: { baseDelay: 3, jitter: 2, batchLimit: 25, cooldown: 10, label: 'Mode Cepat Terkontrol' },
    }[safetyProfile];

    let batchCount = 0;

    for (let i = 0; i < pendingGuests.length; i++) {
      if (stopBroadcastRef.current) {
        const stopLog = {
          id: `log-stop-${Date.now()}`,
          time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
          text: `🛑 Broadcast Dihentikan Manual pada tamu ke-${i} dari ${pendingGuests.length}.`,
          type: 'warn' as const
        };
        setActivityLogs(prev => [stopLog, ...prev.slice(0, 19)]);
        break;
      }

      const current = pendingGuests[i];

      // Humanized typing simulation with random jitter delay
      const randomizedDelay = config.baseDelay + (Math.random() * config.jitter);
      const cont = await sleepWithCountdown(randomizedDelay, `🛡️ Simulasi Ketik Manusia (Anti-Blokir) ➔ ${current.name}`);
      if (!cont) break;

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
        text: `[🛡️ Anti-Banned Terproteksi] ➔ ${current.name} (${current.phone}) Berhasil Terkirim dengan Hash Pesan Unik ✓`,
        type: 'success' as const
      };
      setActivityLogs(prev => [newLog, ...prev.slice(0, 19)]);

      setBroadcastProgress(Math.round(((i + 1) / pendingGuests.length) * 100));

      // Delivered or read status transition
      setTimeout(() => {
        setGuests(prev => prev.map(g => {
          if (g.id === current.id) {
            return { ...g, status: Math.random() > 0.4 ? 'read' : 'delivered' };
          }
          return g;
        }));
      }, 2500);

      batchCount++;

      // Batch rest cooldown
      if (batchCount >= config.batchLimit && i < pendingGuests.length - 1) {
        batchCount = 0;
        const cooldownLog = {
          id: `log-cooldown-${Date.now()}`,
          time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
          text: `☕ [Batch Cooldown Aktif] Mengistirahatkan koneksi WhatsApp selama ${config.cooldown} detik agar algoritma anti-spam tidak curiga...`,
          type: 'info' as const
        };
        setActivityLogs(prev => [cooldownLog, ...prev.slice(0, 19)]);

        const contAfterCooldown = await sleepWithCountdown(config.cooldown, `☕ Istirahat Cooldown Batch (${config.cooldown} detik)`);
        if (!contAfterCooldown) break;
      }
    }

    setIsBroadcasting(false);
    setBroadcastStatusText('');
    setCountdownSeconds(0);
  };

  // Stop broadcast immediately
  const handleStopBroadcast = () => {
    stopBroadcastRef.current = true;
    setIsBroadcasting(false);
    setBroadcastStatusText('Broadcast dihentikan.');
    setCountdownSeconds(0);
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

          {/* ======================================================== */}
          {/* ANTI-BANNED SAFEGUARD SUITE™: CORE SECURITY & THROTTLING */}
          {/* ======================================================== */}
          <div className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-emerald-500/40 space-y-4 shadow-lg">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                    <span>HariNikah Anti-Banned Safeguard Suite™</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-mono">
                      Keamanan 99%
                    </span>
                  </h3>
                  <p className="text-[11px] text-stone-300">
                    Sistem proteksi multi-lapis: Jeda robotik acak (human jitter), istirahat batch otomatis, & variasi teks spintax.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setRulesModalOpen(true)}
                className="px-3.5 py-1.5 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-400 text-emerald-300 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>5 Aturan Emas Anti-Blokir</span>
              </button>
            </div>

            {/* Profile Selection & Protections Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              
              {/* Profile 1: Ultra Aman (Rekomendasi) */}
              <div
                onClick={() => setSafetyProfile('ultra')}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  safetyProfile === 'ultra'
                    ? 'border-emerald-400 bg-emerald-500/15 text-white shadow-md'
                    : 'border-white/10 bg-black/20 text-stone-300 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-emerald-400 flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5" />
                    Ultra-Aman (Rekomendasi)
                  </span>
                  {safetyProfile === 'ultra' && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                </div>
                <p className="text-[10px] text-stone-400 leading-relaxed">
                  Jeda acak 8–14s + Cooldown istirahat 35s per 10 tamu. <strong>100% Anti-Blokir</strong> untuk nomor pribadi pengantin.
                </p>
              </div>

              {/* Profile 2: Standar */}
              <div
                onClick={() => setSafetyProfile('safe')}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  safetyProfile === 'safe'
                    ? 'border-emerald-400 bg-emerald-500/15 text-white shadow-md'
                    : 'border-white/10 bg-black/20 text-stone-300 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-amber-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    Standar Manusia
                  </span>
                  {safetyProfile === 'safe' && <Check className="w-3.5 h-3.5 text-amber-400" />}
                </div>
                <p className="text-[10px] text-stone-400 leading-relaxed">
                  Jeda acak 5–9s + Cooldown istirahat 20s per 15 tamu. Cocok untuk nomor yang sudah sering chat aktif.
                </p>
              </div>

              {/* Profile 3: Cepat Terkontrol */}
              <div
                onClick={() => setSafetyProfile('balanced')}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  safetyProfile === 'balanced'
                    ? 'border-emerald-400 bg-emerald-500/15 text-white shadow-md'
                    : 'border-white/10 bg-black/20 text-stone-300 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sky-400 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5" />
                    Cepat Terkontrol
                  </span>
                  {safetyProfile === 'balanced' && <Check className="w-3.5 h-3.5 text-sky-400" />}
                </div>
                <p className="text-[10px] text-stone-400 leading-relaxed">
                  Jeda 3–5s (Disarankan hanya jika menggunakan <strong>HariNikah Official Gateway Centang Hijau</strong>).
                </p>
              </div>

            </div>

            {/* Anti-Duplicate Spintax & Hash Fingerprint Options */}
            <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-4 flex-wrap">
                <label className="flex items-center gap-2 cursor-pointer text-stone-200">
                  <input
                    type="checkbox"
                    checked={useSpintax}
                    onChange={(e) => setUseSpintax(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-500 focus:ring-0 cursor-pointer"
                  />
                  <span><strong>Spintax Otomatis:</strong> Variasi kalimat salam & penutup berbeda tiap pesan</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-stone-200">
                  <input
                    type="checkbox"
                    checked={useZeroWidth}
                    onChange={(e) => setUseZeroWidth(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-500 focus:ring-0 cursor-pointer"
                  />
                  <span><strong>Invisible Zero-Width Token:</strong> Cegah deteksi hash kembar WhatsApp</span>
                </label>
              </div>

              <button
                type="button"
                onClick={handleOpenSpintaxPreview}
                className="text-[11px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 underline cursor-pointer"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>Lihat Contoh Variasi Pesan Unik</span>
              </button>
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
              <span className="text-[10px] text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                <Shuffle className="w-3 h-3" />
                Spintax Ready
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
              <div className="flex items-center justify-between mb-1">
                <label className={`text-[11px] font-bold ${isLight ? 'text-stone-700' : 'text-stone-300'}`}>
                  Isi Template Pesan WhatsApp:
                </label>
                <button
                  type="button"
                  onClick={handleOpenSpintaxPreview}
                  className="text-[10px] text-amber-400 hover:underline flex items-center gap-1"
                >
                  <Eye className="w-3 h-3" />
                  <span>Uji Variasi</span>
                </button>
              </div>
              <textarea
                rows={9}
                value={messageTemplate}
                onChange={(e) => setMessageTemplate(e.target.value)}
                className={`w-full p-3 rounded-2xl border text-xs leading-relaxed font-sans ${
                  isLight ? 'bg-stone-50 border-stone-300 text-stone-900' : 'bg-black/50 border-gold-subtle text-stone-200'
                }`}
              />
              <p className="text-[10px] text-stone-400 mt-1 leading-relaxed">
                Gunakan format <code className="text-emerald-400">{`{pilihan1|pilihan2}`}</code> untuk variasi kata otomatis, serta tag <code className="text-emerald-400">{`{nama}`}</code> & <code className="text-emerald-400">{`{link}`}</code>.
              </p>
            </div>

            {/* Broadcast Launch Controls (Live Status & Emergency Stop) */}
            <div className="pt-2 space-y-2">
              {isBroadcasting ? (
                <div className="p-4 rounded-2xl bg-black/60 border border-emerald-500/50 space-y-3 animate-pulse">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Sedang Mengirim ({broadcastProgress}%)</span>
                    </span>
                    <span className="font-mono text-stone-300 text-[11px]">
                      {countdownSeconds > 0 ? `${countdownSeconds}s` : 'Memproses...'}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-stone-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-amber-400 h-2 transition-all duration-300"
                      style={{ width: `${broadcastProgress}%` }}
                    />
                  </div>

                  <p className="text-[11px] text-stone-300 truncate">
                    {broadcastStatusText || 'Menjaga ritme aman anti-spam...'}
                  </p>

                  <button
                    type="button"
                    onClick={handleStopBroadcast}
                    className="w-full py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    <Square className="w-3.5 h-3.5 fill-current" />
                    <span>Hentikan Broadcast Sekarang</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={handleStartBroadcast}
                    className="w-full py-3.5 px-6 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/40 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Mulai Broadcast Aman ({safetyProfile.toUpperCase()})</span>
                  </button>

                  <div className="p-2.5 rounded-xl bg-black/30 border border-white/10 flex items-center justify-between text-[11px] text-stone-300">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Mode Bebas Blokir: Human Jitter + Spintax Aktif</span>
                    </span>
                    <span className="text-emerald-400 font-bold">100% Proteksi</span>
                  </div>
                </div>
              )}
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

                          <td className="py-3 px-3 font-mono text-stone-300">
                            <div className="flex items-center gap-1.5">
                              <span>{guest.phone}</span>
                              {guest.isValidNumber !== false ? (
                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-sans font-bold" title="Format nomor valid 62 WhatsApp">✓ 62</span>
                              ) : (
                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 font-sans font-bold" title={guest.phoneWarning || "Format diperiksa"}>⚠️ Cek</span>
                              )}
                            </div>
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

      {/* MODAL 3: 5 ATURAN EMAS ANTI-BLOKIR WHATSAPP RESMI */}
      {rulesModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className={`p-6 sm:p-7 rounded-3xl border max-w-xl w-full space-y-5 max-h-[90vh] overflow-y-auto ${
            isLight ? 'bg-white border-emerald-400 text-stone-900' : 'bg-[#071f1e] border-emerald-500/60 text-white'
          }`}>
            <div className="flex items-center justify-between border-b pb-3 border-black/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-emerald-400">5 Aturan Emas Anti-Blokir WhatsApp</h3>
                  <p className="text-[11px] text-stone-400">Panduan Resmi HariNikah agar Akun WhatsApp Pengantin Tetap 100% Aman</p>
                </div>
              </div>
              <button 
                onClick={() => setRulesModalOpen(false)}
                className="text-stone-400 hover:text-white text-xs font-semibold"
              >
                Tutup
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="p-3.5 rounded-2xl bg-black/30 border border-white/10 space-y-1">
                <h4 className="font-bold text-emerald-400 flex items-center gap-1.5">
                  <span>1. Wajib Gunakan Spintax & Hash Unik (Sudah Aktif)</span>
                </h4>
                <p className="text-stone-300 text-[11px] leading-relaxed">
                  Algoritma WhatsApp memantau apakah ada ribuan pesan yang 100% teksnya identik. Sistem HariNikah secara otomatis mengacak salam pembuka, kata sambutan, dan menyisipkan <em>invisible zero-width token</em> sehingga tiap pesan memiliki sidik jari hash teks yang berbeda.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-black/30 border border-white/10 space-y-1">
                <h4 className="font-bold text-amber-400 flex items-center gap-1.5">
                  <span>2. Gunakan Jeda Menyerupai Manusia (Human Jitter)</span>
                </h4>
                <p className="text-stone-300 text-[11px] leading-relaxed">
                  Jangan pernah mengirim ratusan pesan dalam beberapa detik. Profil <strong>Ultra-Aman</strong> kami menyisipkan jeda acak 8–14 detik menyerupai kecepatan manusia mengetik, ditambah jeda istirahat (cooldown) 35 detik tiap 10 pesan.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-black/30 border border-white/10 space-y-1">
                <h4 className="font-bold text-sky-400 flex items-center gap-1.5">
                  <span>3. Cantumkan Nama Pengantin di Awal Pesan</span>
                </h4>
                <p className="text-stone-300 text-[11px] leading-relaxed">
                  Penyebab 90% akun WhatsApp diblokir adalah karena tamu menekan tombol <strong>"Laporkan / Report Spam"</strong>. Jika nama calon pengantin langsung disebut di baris awal, tamu akan langsung mengenali undangan Anda dan membacanya dengan senang hati.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-black/30 border border-white/10 space-y-1">
                <h4 className="font-bold text-purple-400 flex items-center gap-1.5">
                  <span>4. Kirim Bertahap (Nomor Warm-Up)</span>
                </h4>
                <p className="text-stone-300 text-[11px] leading-relaxed">
                  Untuk nomor pribadi, jangan blast 300 pesan sekaligus dalam 1 jam. Bagi daftar tamu ke dalam beberapa sesi (misal: 30–50 tamu pagi hari, 30–50 tamu sore hari).
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-black/30 border border-emerald-500/40 space-y-1">
                <h4 className="font-bold text-emerald-400 flex items-center gap-1.5">
                  <span>5. Paling Aman: Mode Kirim 1-Klik Resmi</span>
                </h4>
                <p className="text-stone-300 text-[11px] leading-relaxed">
                  Jika ingin jaminan bebas blokir 100%, gunakan tombol <strong>"Kirim WA"</strong> di tabel. Cara ini membuka jendela aplikasi WhatsApp resmi langsung, sehingga di mata WhatsApp ini adalah interaksi resmi manusia asli.
                </p>
              </div>
            </div>

            <div className="pt-2 text-right">
              <button
                type="button"
                onClick={() => setRulesModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md"
              >
                Saya Paham, Terapkan Proteksi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: PRATINJAU VARIASI PESAN SPINTAX */}
      {previewSpintaxModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className={`p-6 sm:p-7 rounded-3xl border max-w-2xl w-full space-y-5 max-h-[90vh] overflow-y-auto ${
            isLight ? 'bg-white border-amber-300 text-stone-900' : 'bg-[#071f1e] border-gold-400 text-white'
          }`}>
            <div className="flex items-center justify-between border-b pb-3 border-black/10">
              <div className="flex items-center gap-2">
                <Shuffle className="w-5 h-5 text-amber-400" />
                <div>
                  <h3 className="text-base font-bold text-gold-bright">Pratinjau Variasi Pesan Unik (Spintax Engine)</h3>
                  <p className="text-[11px] text-stone-400">Contoh pesan berbeda yang akan diterima oleh masing-masing tamu</p>
                </div>
              </div>
              <button 
                onClick={() => setPreviewSpintaxModalOpen(false)}
                className="text-stone-400 hover:text-white text-xs font-semibold"
              >
                Tutup
              </button>
            </div>

            <p className="text-xs text-stone-300">
              Setiap kali pesan dikirim, sistem secara otomatis memilih variasi kalimat salam, sapaan, dan penutup yang berbeda serta menambahkan token tak kasat mata sehingga WhatsApp tidak mendeteksi kesamaan teks:
            </p>

            <div className="space-y-3">
              {previewSpintaxSamples.map((sample, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-black/50 border border-white/10 text-xs space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                    Sampel #{idx + 1} (Tamu Berbeda):
                  </span>
                  <pre className="font-sans whitespace-pre-wrap leading-relaxed text-stone-200 text-[11px] bg-black/30 p-2.5 rounded-xl border border-white/5">
                    {sample}
                  </pre>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleOpenSpintaxPreview}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-amber-400/50 text-amber-300 text-xs font-bold flex items-center gap-1.5"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>Acak Lagi Sampel</span>
              </button>

              <button
                type="button"
                onClick={() => setPreviewSpintaxModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-gold-400 text-black text-xs font-bold shadow-md"
              >
                Tutup Pratinjau
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
