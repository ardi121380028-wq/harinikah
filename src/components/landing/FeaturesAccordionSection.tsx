'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Plus,
  Minus,
  CheckCircle2,
  Clock,
  Calendar,
  Heart,
  MapPin,
  Music,
  Camera,
  Video,
  Gift,
  Users,
  Copy,
  Check,
  Download,
  ExternalLink,
  Play,
  Volume2,
  VolumeX,
  Send,
  Navigation,
  Smartphone
} from 'lucide-react';
import { useInvitation } from '../../context/InvitationContext';
import { weddingAudio } from '../../utils/audioEngine';

interface FeatureItem {
  id: string;
  title: string;
  badge: string;
  tagline: string;
  description: string;
  bullets: string[];
}

export const FeaturesAccordionSection: React.FC = () => {
  const { themeMode } = useInvitation();
  const isLight = themeMode === 'light';

  const [expandedId, setExpandedId] = useState<string | null>('update-instan');

  // Interactive Feature State Simulations
  // 1. Update Instan Simulation
  const [simulatedName, setSimulatedName] = useState('Dimas & Clarissa');

  // 2. Countdown Timer Live State
  const [timerValues, setTimerValues] = useState({ days: 120, hours: 14, minutes: 35, seconds: 48 });

  // 3. Save The Date handler
  const handleCalendarDemo = () => {
    const title = encodeURIComponent('The Wedding of Dimas & Clarissa (HariNikah)');
    const location = encodeURIComponent('Grand Mercure Ballroom, Bandar Lampung');
    const details = encodeURIComponent('Pernikahan Dimas & Clarissa di Bandar Lampung. Simpan tanggalnya!');
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=20260718T020000Z/20260718T070000Z`;
    window.open(url, '_blank');
  };

  const handleDownloadIcsDemo = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//HariNikah//Wedding Invitation//ID',
      'BEGIN:VEVENT',
      'SUMMARY:The Wedding of Dimas & Clarissa',
      'DESCRIPTION:Pernikahan Dimas & Clarissa di Grand Mercure Bandar Lampung',
      'LOCATION:Grand Mercure Ballroom, Bandar Lampung',
      'DTSTART:20260718T020000Z',
      'DTEND:20260718T070000Z',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'HariNikah-SaveTheDate.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 6. Music Vinyl Simulation
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const handleToggleAudio = () => {
    const playing = weddingAudio.toggle('modern');
    setIsAudioPlaying(playing);
  };

  // 9. Wedding Gift Copy Simulation
  const [copiedBank, setCopiedBank] = useState<string | null>(null);
  const handleCopyBank = (acc: string, key: string) => {
    navigator.clipboard.writeText(acc);
    setCopiedBank(key);
    setTimeout(() => setCopiedBank(null), 2500);
  };

  // 10. RSVP Live Simulation
  const [rsvpSimName, setRsvpSimName] = useState('');
  const [rsvpSimStatus, setRsvpSimStatus] = useState<'hadir' | 'tidak'>('hadir');
  const [rsvpSimMsg, setRsvpSimMsg] = useState('');
  const [simulatedWishes, setSimulatedWishes] = useState([
    { name: 'Keluarga Bpk. Handoko (Bandar Lampung)', status: 'hadir', msg: 'Barakallah! Semoga menjadi keluarga sakinah mawaddah warahmah.', time: '10 menit lalu' },
    { name: 'Dinda & Rian (Pahoman)', status: 'hadir', msg: 'Selamat Dimas & Clarissa! Semoga lancar acaranya di Grand Mercure Lampung.', time: '1 jam lalu' }
  ]);

  const handleSimulateRsvp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpSimMsg.trim()) return;

    const newEntry = {
      name: rsvpSimName || 'Tamu Undangan (Bandar Lampung)',
      status: rsvpSimStatus,
      msg: rsvpSimMsg,
      time: 'Baru saja'
    };
    setSimulatedWishes([newEntry, ...simulatedWishes]);
    setRsvpSimMsg('');

    try {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#DFB051', '#34d399', '#ffffff']
      });
    } catch (e) {}
  };

  // Live timer tick
  useEffect(() => {
    const interval = setInterval(() => {
      setTimerValues(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        return { ...prev, seconds: 59, minutes: prev.minutes > 0 ? prev.minutes - 1 : 59 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleFeature = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const features: FeatureItem[] = [
    {
      id: 'update-instan',
      title: 'UPDATE INSTAN',
      badge: 'Auto-Sync Cloud',
      tagline: 'Revisi Kapan Saja Langsung Live di Link Tamu',
      description: 'Ada perubahan jam akad, ballroom di Bandar Lampung, atau nama tamu? Edit di Studio Editor, tersimpan otomatis di cloud dan seketika terupdate di link tamu tanpa perlu sebar link baru.',
      bullets: [
        'Sinkronisasi real-time tanpa sebar ulang link',
        'Auto-save otomatis per ketukan teks',
        'Bebas ubah nama tamu tanpa batas kuota'
      ]
    },
    {
      id: 'countdown-timer',
      title: 'COUNTDOWN TIMER',
      badge: 'Live Precision',
      tagline: 'Hitungan Mundur Real-Time Menuju Hari Bahagia',
      description: 'Tampilkan pengingat waktu live berupa hari, jam, menit, dan detik menuju akad dan resepsi pernikahan secara presisi di layar tamu.',
      bullets: [
        'Hitungan mundur otomatis menyesuaikan zona waktu WIB',
        'Desain kotak jam bergaya emas mewah monogram',
        'Membangkitkan antusiasme para tamu undangan'
      ]
    },
    {
      id: 'save-the-date',
      title: 'SAVE THE DATE',
      badge: '1-Click Calendar',
      tagline: '1-Klik Pasang Jadwal di Google Calendar & Apple',
      description: 'Memudahkan tamu memasukkan agenda pernikahan Anda ke kalender smartphone mereka hanya dengan 1 sentuhan tombol.',
      bullets: [
        'Sinkronisasi langsung ke Google Calendar',
        'Unduh file .ics otomatis untuk Apple iOS & Outlook',
        'Notifikasi pengingat otomatis H-1 sebelum acara'
      ]
    },
    {
      id: 'love-story',
      title: 'LOVE STORY',
      badge: 'Storytelling',
      tagline: 'Linimasa Romantis Perjalanan Cinta',
      description: 'Ceritakan momen indah Anda berdua mulai dari perkenalan pertama, lamaran, hingga melangkah ke jenjang pelaminan dalam tampilan linimasa interaktif.',
      bullets: [
        'Format linimasa vertikal elegan dengan milestone foto',
        'Tipografi kutipan puitis dan doa pernikahan',
        'Membangun ikatan emosional hangat dengan para tamu'
      ]
    },
    {
      id: 'maps',
      title: 'MAPS & NAVIGASI',
      badge: 'Akurat 100%',
      tagline: 'Panduan Rute Presisi ke Lokasi Ballroom / Gedung',
      description: 'Tamu tidak akan tersesat saat menuju ballroom di Bandar Lampung. Tombol navigasi langsung membuka Google Maps dan Waze dengan rute tercepat.',
      bullets: [
        'Integrasi Google Maps & Waze 1-klik',
        'Penyematan rute navigasi akurat ke gedung acara',
        'Informasi detail ballroom, parkir, dan patokan gedung'
      ]
    },
    {
      id: 'background-music',
      title: 'BACKGROUND MUSIC',
      badge: 'Rotating Vinyl',
      tagline: 'Pemutar Piringan Hitam Vinyl Eksklusif',
      description: 'Undangan dilengkapi alunan instrumen romantis yang otomatis berputar saat amplop dibuka. Dilengkapi tombol kontrol floating vinyl disc yang berputar estetis.',
      bullets: [
        'Piringan hitam berputar interaktif di pojok layar',
        'Pilihan melodi syahdu: Modern Romance, Gamelan Jawa, atau Saluang Minang',
        'Kontrol mute/play instan untuk kenyamanan tamu'
      ]
    },
    {
      id: 'photo-gallery',
      title: 'PHOTO GALLERY',
      badge: '4K Masonry Grid',
      tagline: 'Galeri Foto Prewedding 4K Interaktif',
      description: 'Pamerkan foto-foto prewedding terbaik Anda dalam tata letak masonry grid mewah yang dilengkapi fitur lightbox zoom layar penuh.',
      bullets: [
        'Mendukung foto beresolusi tinggi 4K tanpa pecah',
        'Kompresi pintar WebP untuk loading super cepat di HP',
        'Mode fullscreen lightbox dengan swipe sentuh'
      ]
    },
    {
      id: 'video-prewedding',
      title: 'VIDEO PREWEDDING',
      badge: 'Cinematic HD',
      tagline: 'Pemutar Video Sinematik Teaser',
      description: 'Sisipkan video sinematik teaser prewedding atau pesan cinta Anda langsung di dalam halaman undangan digital tanpa iklan.',
      bullets: [
        'Mendukung embed YouTube HD, Vimeo, atau direct MP4',
        'Tampilan video responsif berbingkai emas melengkung',
        'Autopause saat musik latar dinyalakan'
      ]
    },
    {
      id: 'wedding-gift',
      title: 'WEDDING GIFT',
      badge: 'Multi-Bank & QRIS',
      tagline: 'Amplop Digital Multi-Rekening & Barcode QRIS',
      description: 'Solusi elegan bagi tamu yang berhalangan hadir langsung namun ingin memberikan hadiah dan tanda kasih kepada kedua mempelai.',
      bullets: [
        'Tombol 1-klik salin nomor rekening BCA, Mandiri, dll',
        'Dukungan barcode QRIS (GoPay, OVO, ShopeePay, Dana)',
        'Fitur alamat kirim kado fisik di Bandar Lampung'
      ]
    },
    {
      id: 'rsvp-wishes',
      title: 'RSVP & WISHES',
      badge: 'Real-Time Feed',
      tagline: 'Buku Tamu Digital & Ucapan Doa Real-Time',
      description: 'Ketahui kepastian jumlah tamu yang akan hadir dan kumpulkan doa restu hangat dari seluruh keluarga dan sahabat secara live dengan efek confetti.',
      bullets: [
        'Formulir konfirmasi kehadiran tamu (Hadir, Tidak Hadir)',
        'Pilihan jumlah porsi tamu (1 atau 2 orang)',
        'Papan doa interaktif dengan efek confetti ucapan selamat'
      ]
    }
  ];

  return (
    <section className={`py-20 lg:py-28 transition-colors duration-300 relative overflow-hidden ${
      isLight ? 'bg-[#FAF8F5]' : 'bg-[#031110]'
    }`} id="fitur">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#1b6b64]/20 via-[#DFB051]/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with HariNikah Brand Styling */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-400/10 via-gold-400/20 to-amber-400/10 border border-[#DFB051]/40 text-[#DFB051] text-xs uppercase tracking-widest font-extrabold mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#DFB051]" />
            <span>Fitur Undangan Digital HariNikah</span>
          </div>

          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight ${
            isLight ? 'text-stone-900' : 'text-white'
          }`}>
            10 Fitur Unggulan Undangan Digital
          </h2>
          
          <p className={`text-sm sm:text-base mt-4 max-w-2xl mx-auto leading-relaxed ${
            isLight ? 'text-stone-600' : 'text-stone-300'
          }`}>
            Semua fitur premium dirancang khusus dengan teknologi web interaktif termodern. Tamu undangan Anda di Bandar Lampung maupun seluruh nusantara akan merasakan pengalaman yang tak terlupakan.
          </p>
        </div>

        {/* Feature Accordion Cards (HariNikah Emerald & Gold Palette) */}
        <div className="space-y-4 max-w-3xl mx-auto">
          {features.map((feat) => {
            const isExpanded = expandedId === feat.id;

            return (
              <div
                key={feat.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isExpanded
                    ? isLight
                      ? 'border-[#DFB051] bg-white shadow-xl shadow-amber-950/10 ring-2 ring-[#DFB051]/20'
                      : 'border-[#DFB051] bg-gradient-to-b from-[#0a2f2b] to-[#041715] shadow-2xl shadow-emerald-950/40 ring-1 ring-[#DFB051]/30'
                    : isLight
                    ? 'border-stone-200 bg-white/90 hover:border-[#DFB051]/60 hover:bg-white shadow-sm'
                    : 'border-white/10 bg-[#061e1d]/80 hover:border-[#DFB051]/40 hover:bg-[#072422]'
                }`}
              >
                {/* Accordion Trigger (HariNikah Brand Colors: Dark Emerald & Rich Gold) */}
                <button
                  type="button"
                  onClick={() => toggleFeature(feat.id)}
                  aria-expanded={isExpanded}
                  className="w-full py-4 px-5 sm:px-6 flex items-center justify-between text-left cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3.5">
                    {/* Brand Gold Monogram / Icon */}
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shadow-sm transition-transform duration-300 ${
                      isExpanded
                        ? 'bg-gradient-to-br from-[#DFB051] via-[#F3D78B] to-[#C6923C] text-stone-950 scale-105'
                        : isLight
                        ? 'bg-amber-100/80 text-amber-900 border border-amber-200'
                        : 'bg-[#0d3b37] text-gold-300 border border-white/10'
                    }`}>
                      {feat.id === 'update-instan' && <Sparkles className="w-4 h-4" />}
                      {feat.id === 'countdown-timer' && <Clock className="w-4 h-4" />}
                      {feat.id === 'save-the-date' && <Calendar className="w-4 h-4" />}
                      {feat.id === 'love-story' && <Heart className="w-4 h-4" />}
                      {feat.id === 'maps' && <MapPin className="w-4 h-4" />}
                      {feat.id === 'background-music' && <Music className="w-4 h-4" />}
                      {feat.id === 'photo-gallery' && <Camera className="w-4 h-4" />}
                      {feat.id === 'video-prewedding' && <Video className="w-4 h-4" />}
                      {feat.id === 'wedding-gift' && <Gift className="w-4 h-4" />}
                      {feat.id === 'rsvp-wishes' && <Users className="w-4 h-4" />}
                    </div>

                    <div>
                      <span className={`block font-serif font-bold text-sm sm:text-base tracking-wide ${
                        isExpanded
                          ? isLight ? 'text-amber-900' : 'text-[#F3D78B]'
                          : isLight ? 'text-stone-900' : 'text-stone-100'
                      }`}>
                        {feat.title}
                      </span>
                      <span className={`text-[11px] hidden sm:block ${isLight ? 'text-stone-500' : 'text-stone-400'}`}>
                        {feat.tagline}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`hidden md:inline-block text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                      isExpanded
                        ? isLight ? 'bg-amber-100 text-amber-900' : 'bg-[#DFB051]/20 text-[#F3D78B] border border-[#DFB051]/40'
                        : isLight ? 'bg-stone-100 text-stone-600' : 'bg-black/40 text-stone-400'
                    }`}>
                      {feat.badge}
                    </span>

                    {/* Toggle Icon */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      isExpanded
                        ? 'bg-[#DFB051] text-stone-950 shadow-md rotate-180'
                        : isLight
                        ? 'bg-stone-100 text-stone-600 hover:bg-amber-100'
                        : 'bg-white/10 text-stone-300 hover:bg-white/20'
                    }`}>
                      {isExpanded ? <Minus className="w-4 h-4 stroke-[2.5]" /> : <Plus className="w-4 h-4 stroke-[2.5]" />}
                    </div>
                  </div>
                </button>

                {/* Expanded Box with Interactive Live Preview Simulation */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className={`p-5 sm:p-6 border-t ${
                        isLight
                          ? 'border-amber-200/60 bg-amber-50/30'
                          : 'border-white/10 bg-black/25'
                      }`}>
                        
                        {/* Description & Bullets */}
                        <p className={`text-xs sm:text-sm leading-relaxed mb-4 ${
                          isLight ? 'text-stone-700' : 'text-stone-300'
                        }`}>
                          {feat.description}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-6">
                          {feat.bullets.map((b, i) => (
                            <div key={i} className="flex items-start gap-1.5 text-[11px]">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                              <span className={isLight ? 'text-stone-600' : 'text-stone-300'}>{b}</span>
                            </div>
                          ))}
                        </div>

                        {/* ========================================================
                            INTERACTIVE PRATINJAU (PREVIEW) UNTUK SETIAP FITUR
                            ======================================================== */}
                        <div className={`p-4 sm:p-5 rounded-2xl border shadow-inner ${
                          isLight
                            ? 'bg-white border-amber-200 text-stone-900'
                            : 'bg-[#041715] border-[#DFB051]/30 text-stone-100'
                        }`}>
                          <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10 text-xs">
                            <span className="font-bold text-[#DFB051] flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5" />
                              Pratinjau Langsung Fitur: {feat.title}
                            </span>
                            <span className="text-[10px] text-stone-400">Interaktif</span>
                          </div>

                          {/* 1. Preview Update Instan */}
                          {feat.id === 'update-instan' && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                              <div className="space-y-2">
                                <label className="text-[11px] font-semibold text-stone-400 block">
                                  Coba ketik nama mempelai di Studio Editor:
                                </label>
                                <input
                                  type="text"
                                  value={simulatedName}
                                  onChange={(e) => setSimulatedName(e.target.value)}
                                  className="w-full text-xs px-3 py-2 rounded-xl bg-black/40 border border-amber-400/40 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                                  placeholder="Ketik nama di sini..."
                                />
                                <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-semibold">
                                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                                  <span>Tersimpan otomatis ke cloud dalam 0.2 detik</span>
                                </div>
                              </div>

                              <div className="p-4 rounded-xl bg-gradient-to-b from-[#0a2c28] to-[#041514] border border-[#DFB051]/50 text-center shadow-lg">
                                <span className="text-[8px] uppercase tracking-widest text-stone-400 block mb-1">Tampilan Layar Tamu (Live):</span>
                                <h4 className="text-lg font-serif font-bold text-[#F3D78B]">{simulatedName || 'Nama Pengantin'}</h4>
                                <p className="text-[10px] text-stone-300 mt-1">Sabtu, 18 Juli 2026 • Grand Mercure Bandar Lampung</p>
                              </div>
                            </div>
                          )}

                          {/* 2. Preview Countdown Timer */}
                          {feat.id === 'countdown-timer' && (
                            <div className="text-center py-2">
                              <span className="text-[10px] uppercase tracking-widest text-[#DFB051] font-bold block mb-2">
                                Menuju Hari Bahagia di Bandar Lampung:
                              </span>
                              <div className="grid grid-cols-4 gap-2.5 max-w-xs mx-auto">
                                {[
                                  { val: timerValues.days, label: 'Hari' },
                                  { val: timerValues.hours, label: 'Jam' },
                                  { val: timerValues.minutes, label: 'Menit' },
                                  { val: timerValues.seconds, label: 'Detik' },
                                ].map((box, idx) => (
                                  <div key={idx} className="bg-black/60 border border-[#DFB051]/40 rounded-xl p-2.5 shadow-md">
                                    <span className="block text-xl font-bold font-mono text-[#F3D78B]">{box.val}</span>
                                    <span className="text-[9px] uppercase tracking-wider text-stone-400">{box.label}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* 3. Preview Save The Date */}
                          {feat.id === 'save-the-date' && (
                            <div className="text-center py-2 space-y-3">
                              <p className="text-xs text-stone-300">
                                Coba klik tombol di bawah untuk menguji integrasi kalender secara nyata:
                              </p>
                              <div className="flex flex-wrap items-center justify-center gap-3">
                                <button
                                  onClick={handleCalendarDemo}
                                  className="px-4 py-2.5 rounded-xl bg-white text-stone-900 font-bold text-xs shadow-md hover:bg-stone-100 flex items-center gap-2 cursor-pointer transition-transform hover:scale-105"
                                >
                                  <Calendar className="w-4 h-4 text-blue-600" />
                                  <span>Simpan ke Google Calendar</span>
                                </button>
                                <button
                                  onClick={handleDownloadIcsDemo}
                                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-gold-400 text-stone-950 font-bold text-xs shadow-md hover:scale-105 flex items-center gap-2 cursor-pointer transition-transform"
                                >
                                  <Download className="w-4 h-4" />
                                  <span>Unduh .ICS (Apple & Outlook)</span>
                                </button>
                              </div>
                            </div>
                          )}

                          {/* 4. Preview Love Story */}
                          {feat.id === 'love-story' && (
                            <div className="py-2 space-y-3">
                              {[
                                { year: '2021', title: 'Pertemuan Pertama', desc: 'Awal mula bersua di ruang kampus dan saling mengenal dengan hangat.' },
                                { year: '2024', title: 'Momen Lamaran', desc: 'Mengikat janji suci dan komitmen di hadapan kedua keluarga besar.' },
                                { year: '2026', title: 'Menuju Pelaminan', desc: 'Melangkah bersama dalam ikatan akad suci di Bandar Lampung.' }
                              ].map((step, i) => (
                                <div key={i} className="flex items-start gap-3 p-2.5 rounded-xl bg-black/40 border border-white/10">
                                  <span className="px-2 py-1 rounded-md bg-[#DFB051]/20 border border-[#DFB051]/40 text-[#DFB051] font-mono font-bold text-xs">
                                    {step.year}
                                  </span>
                                  <div>
                                    <h5 className="text-xs font-bold text-[#F3D78B]">{step.title}</h5>
                                    <p className="text-[11px] text-stone-300 mt-0.5">{step.desc}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* 5. Preview Maps & Navigasi */}
                          {feat.id === 'maps' && (
                            <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                              <div className="text-left">
                                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">Lokasi Acara Bandar Lampung</span>
                                <h5 className="text-xs font-bold text-white mt-0.5">Grand Mercure Ballroom, Bandar Lampung</h5>
                                <p className="text-[11px] text-stone-400">Jl. Raden Intan No. 88, Pelita, Enggal, Kota Bandar Lampung</p>
                              </div>
                              <div className="flex gap-2">
                                <a
                                  href="https://maps.google.com/?q=Grand+Mercure+Lampung"
                                  target="_blank"
                                  rel="noreferrer"
                                  className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-gold-400 text-stone-950 font-bold text-xs flex items-center gap-1.5 shadow-md hover:scale-105 transition-transform"
                                >
                                  <Navigation className="w-3.5 h-3.5" />
                                  <span>Buka Rute Maps</span>
                                </a>
                              </div>
                            </div>
                          )}

                          {/* 6. Preview Background Music */}
                          {feat.id === 'background-music' && (
                            <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/10">
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={handleToggleAudio}
                                  className={`w-12 h-12 rounded-full border-2 border-[#DFB051] flex items-center justify-center shadow-lg transition-transform ${
                                    isAudioPlaying ? 'bg-[#DFB051] text-stone-950 animate-spin-slow' : 'bg-[#0a2c28] text-[#DFB051] hover:scale-110'
                                  }`}
                                >
                                  {isAudioPlaying ? <Volume2 className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                                </button>
                                <div>
                                  <h5 className="text-xs font-bold text-[#F3D78B]">
                                    {isAudioPlaying ? '🎵 Sedang Memutar Musik...' : 'Klik untuk Uji Putar Audio'}
                                  </h5>
                                  <p className="text-[10px] text-stone-400">Romantic Suite: Piano & Cello Arpeggio</p>
                                </div>
                              </div>
                              <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold ${
                                isAudioPlaying ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40' : 'bg-stone-800 text-stone-400'
                              }`}>
                                {isAudioPlaying ? 'Active Vinyl' : 'Audio Siap'}
                              </span>
                            </div>
                          )}

                          {/* 7. Preview Photo Gallery */}
                          {feat.id === 'photo-gallery' && (
                            <div className="grid grid-cols-4 gap-2">
                              {[
                                'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80',
                                'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=400&q=80',
                                'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=400&q=80',
                                'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=400&q=80',
                              ].map((src, idx) => (
                                <div key={idx} className="aspect-square rounded-xl overflow-hidden border border-white/10 group cursor-pointer">
                                  <img src={src} alt="Prewed" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                </div>
                              ))}
                            </div>
                          )}

                          {/* 8. Preview Video Prewedding */}
                          {feat.id === 'video-prewedding' && (
                            <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-black">
                              <iframe
                                className="w-full h-full"
                                src="https://www.youtube.com/embed/dQw4w9WgXcQ?controls=1&rel=0"
                                title="Prewedding Video"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                            </div>
                          )}

                          {/* 9. Preview Wedding Gift */}
                          {feat.id === 'wedding-gift' && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                              <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-left">
                                <div className="flex justify-between items-center text-[10px] text-stone-400">
                                  <span className="font-bold text-[#DFB051]">Bank Central Asia (BCA)</span>
                                  <span>Transfer Digital</span>
                                </div>
                                <p className="text-sm font-mono font-bold text-white mt-1">8820 1234 5678</p>
                                <p className="text-[10px] text-stone-300">a.n. DIMAS SETIADI</p>
                                <button
                                  onClick={() => handleCopyBank('882012345678', 'bca')}
                                  className="mt-2 text-[10px] px-3 py-1 rounded-lg bg-white/10 border border-white/20 text-[#F3D78B] font-bold flex items-center gap-1 hover:bg-white/20 transition-all cursor-pointer"
                                >
                                  {copiedBank === 'bca' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                                  <span>{copiedBank === 'bca' ? '✓ Nomor Tersalin!' : 'Salin Nomor Rekening'}</span>
                                </button>
                              </div>

                              <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-center">
                                <span className="text-[10px] text-stone-400 block mb-1">Scan QRIS Instan</span>
                                <div className="w-20 h-20 bg-white rounded-lg mx-auto p-1 flex items-center justify-center">
                                  <img
                                    src="https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=HARINIKAH_BANDAR_LAMPUNG"
                                    alt="QRIS"
                                    className="w-full h-auto"
                                  />
                                </div>
                                <span className="text-[9px] text-stone-400 mt-1 block">Semua E-Wallet & Bank</span>
                              </div>
                            </div>
                          )}

                          {/* 10. Preview RSVP & Wishes */}
                          {feat.id === 'rsvp-wishes' && (
                            <div className="space-y-3">
                              <form onSubmit={handleSimulateRsvp} className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                <input
                                  type="text"
                                  placeholder="Nama Anda..."
                                  value={rsvpSimName}
                                  onChange={(e) => setRsvpSimName(e.target.value)}
                                  className="text-xs px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-amber-400"
                                />
                                <input
                                  type="text"
                                  placeholder="Tulis ucapan doa..."
                                  value={rsvpSimMsg}
                                  onChange={(e) => setRsvpSimMsg(e.target.value)}
                                  required
                                  className="text-xs px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-amber-400"
                                />
                                <button
                                  type="submit"
                                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-gold-400 text-stone-950 font-bold text-xs uppercase flex items-center justify-center gap-1 shadow-md hover:scale-105 transition-transform cursor-pointer"
                                >
                                  <Send className="w-3.5 h-3.5" />
                                  <span>Kirim Doa</span>
                                </button>
                              </form>

                              <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
                                {simulatedWishes.map((w, idx) => (
                                  <div key={idx} className="p-2 rounded-lg bg-black/40 border border-white/10 text-left text-xs">
                                    <div className="flex justify-between items-center text-[10px]">
                                      <span className="font-bold text-[#F3D78B]">{w.name}</span>
                                      <span className="text-stone-500">{w.time}</span>
                                    </div>
                                    <p className="text-[11px] text-stone-300 mt-0.5">{w.msg}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Box */}
        <div className="mt-14 text-center">
          <p className={`text-xs ${isLight ? 'text-stone-500' : 'text-stone-400'}`}>
            Ingin membuat undangan pernikahan digital eksklusif Anda di Bandar Lampung?
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <a
              href="/editor"
              className="px-7 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-gold-300 to-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              Mulai Buat di Studio Editor Gratis →
            </a>
            <a
              href="/dimas-clarissa?theme=botanical&to=Bapak+Budi"
              className={`px-7 py-3.5 rounded-full border text-xs font-bold uppercase tracking-wider transition-all ${
                isLight
                  ? 'border-stone-400 text-stone-800 hover:bg-stone-200'
                  : 'border-white/20 text-stone-200 hover:bg-white/10'
              }`}
            >
              Lihat Contoh Demo Live 🌿
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
