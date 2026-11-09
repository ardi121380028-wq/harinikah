'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Heart,
  Calendar,
  Clock,
  MapPin,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Send,
  ExternalLink,
  QrCode,
  X,
  Sparkles,
  Sun,
  Moon
} from 'lucide-react';
import { INITIAL_PAGES, TEMPLATE_PRESETS } from '../../constants/initialData';
import { GununganWayang, SuntiangMinang, BatikParangDivider, MinangUkiranDivider } from '../../components/cultural/CulturalOrnaments';
import { weddingAudio } from '../../utils/audioEngine';
import type { CulturalTemplate } from '../../types';

interface WishItem {
  id: string;
  name: string;
  status: 'hadir' | 'tidak' | 'ragu';
  message: string;
  timestamp: string;
}

export default function GuestInvitationPage() {
  const params = useParams();
  const searchParams = useSearchParams();

  // Guest name from query ?to=...
  const rawGuestParam = searchParams.get('to');
  const guestName = rawGuestParam ? decodeURIComponent(rawGuestParam) : 'Bapak Budi & Rekan';

  // Template query param ?theme=jawa or ?theme=minang
  const themeParam = searchParams.get('theme') as CulturalTemplate | null;

  // Invitation data loaded from localStorage or fallback
  const [invitationData, setInvitationData] = useState<any>(null);
  const [activeTemplate, setActiveTemplate] = useState<CulturalTemplate>('modern');
  const [guestTheme, setGuestTheme] = useState<'dark' | 'light'>('dark');
  const [isOpened, setIsOpened] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [copiedBank, setCopiedBank] = useState<string | null>(null);
  const [showQRIS, setShowQRIS] = useState(false);

  // RSVP Form State
  const [rsvpName, setRsvpName] = useState(guestName);
  const [rsvpStatus, setRsvpStatus] = useState<'hadir' | 'tidak' | 'ragu'>('hadir');
  const [rsvpGuests, setRsvpGuests] = useState('2 Orang');
  const [rsvpMessage, setRsvpMessage] = useState('');
  const [wishesList, setWishesList] = useState<WishItem[]>([
    {
      id: '1',
      name: 'Rian & Sarah',
      status: 'hadir',
      message: 'Selamat menempuh hidup baru! Semoga menjadi keluarga yang sakinah mawaddah warahmah, rukun hayuning bawana.',
      timestamp: '2 jam lalu'
    },
    {
      id: '2',
      name: 'Keluarga Bpk. Handoko',
      status: 'hadir',
      message: 'Barakallahu lakuma wa baraka alaikuma wa jama\'a bainakuma fii khoir. Kami sekeluarga insya Allah hadir.',
      timestamp: '4 jam lalu'
    },
    {
      id: '3',
      name: 'Dinda Ayu Rangkayo',
      status: 'hadir',
      message: 'Happy wedding! Rancak bana undangannyo, rancak budi rancak baso. Lancar baralek gadangnyo ya!',
      timestamp: '1 hari lalu'
    }
  ]);

  // Countdown State
  const [timeLeft, setTimeLeft] = useState({ days: 120, hours: 14, minutes: 35, seconds: 48 });

  useEffect(() => {
    // Determine template: check query param first, then localStorage
    let currentTpl: CulturalTemplate = themeParam || 'modern';

    try {
      const saved = localStorage.getItem('harinikah_invitation_draft');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.currentTemplate && !themeParam) {
          currentTpl = parsed.currentTemplate;
        }
        if (parsed.pages) {
          setInvitationData(parsed);
        }
      }
    } catch (e) {
      console.warn('Could not load custom invitation draft', e);
    }

    setActiveTemplate(currentTpl);

    // Countdown interval
    const targetDate = new Date('2026-07-18T08:00:00+07:00').getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      weddingAudio.stop();
    };
  }, [themeParam]);

  const handleOpenEnvelope = () => {
    setIsOpened(true);
    setIsPlayingMusic(true);

    // Play authentic cultural audio loop via sound engine
    weddingAudio.play(activeTemplate);

    // Cultural-themed confetti
    try {
      const colors =
        activeTemplate === 'jawa'
          ? ['#C6923C', '#E6BA64', '#FAF5EC', '#3D271D']
          : activeTemplate === 'minang'
          ? ['#E0B042', '#B91C1C', '#FDE047', '#450A0A']
          : ['#dfb051', '#f5e4be', '#1b6b64', '#ffffff'];

      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors
      });
    } catch (e) {}

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleMusic = () => {
    const isNowPlaying = weddingAudio.toggle(activeTemplate);
    setIsPlayingMusic(isNowPlaying);
  };

  const copyToClipboard = (text: string, bankId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(bankId);
    setTimeout(() => setCopiedBank(null), 2500);
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpMessage.trim()) return;

    const newWish: WishItem = {
      id: Date.now().toString(),
      name: rsvpName || 'Tamu Undangan',
      status: rsvpStatus,
      message: rsvpMessage,
      timestamp: 'Baru saja'
    };

    setWishesList([newWish, ...wishesList]);
    setRsvpMessage('');

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#dfb051', '#34d399', '#ffffff']
      });
    } catch (err) {}
  };

  // Resolve pages: if customized in draft, use it; else fallback to preset
  const presetPages = TEMPLATE_PRESETS[activeTemplate]?.pages || INITIAL_PAGES;
  const pages = invitationData?.pages || presetPages;
  const coverData = pages[0]?.data || {};
  const coupleData = pages[1]?.data || {};
  const eventsData = pages[2]?.data || {};
  const giftData = pages[4]?.data || {};

  // Cultural theme styling variables
  const isJawa = activeTemplate === 'jawa';
  const isMinang = activeTemplate === 'minang';
  const isGuestLight = guestTheme === 'light';

  const themeClasses = {
    bgMain: isGuestLight
      ? 'bg-[#FAF8F5]'
      : isJawa
      ? 'bg-[#180e09]'
      : isMinang
      ? 'bg-[#220508]'
      : 'bg-[#051817]',
    cardBg: isGuestLight
      ? 'bg-white/95 border-amber-300 text-stone-900 shadow-xl shadow-amber-950/5'
      : isJawa
      ? 'bg-[#28170e]/90 border-[#c6923c]/40'
      : isMinang
      ? 'bg-[#3b0d13]/90 border-[#e0b042]/40'
      : 'bg-[#061e1d]/90 border-[#dfb051]/40',
    goldAccent: isGuestLight
      ? 'text-amber-800'
      : isJawa ? 'text-[#e6ba64]' : isMinang ? 'text-[#f5d77f]' : 'text-[#dfb051]',
    btnGrad: isJawa
      ? 'from-[#e6ba64] via-[#c6923c] to-[#a37222]'
      : isMinang
      ? 'from-[#f5d77f] via-[#e0b042] to-[#b3821a]'
      : 'from-amber-400 via-gold-300 to-amber-500',
    sectionBorder: isGuestLight
      ? 'border-amber-200'
      : isJawa ? 'border-[#c6923c]/20' : isMinang ? 'border-[#e0b042]/20' : 'border-[#dfb051]/20',
  };

  return (
    <div className={`min-h-screen ${themeClasses.bgMain} ${isGuestLight ? 'text-stone-900' : 'text-stone-100'} font-sans selection:bg-[#dfb051] selection:text-[#0c2b29] relative overflow-x-hidden transition-colors duration-300`}>
      
      {/* 1. ENVELOPE OPENING FULLSCREEN COVER MODAL */}
      <AnimatePresence>
        {!isOpened && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -90, transition: { duration: 0.85, ease: 'easeInOut' } }}
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${themeClasses.bgMain}`}
          >
            {/* Textured Cultural Overlay */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />

            {/* Cultural Envelope Card */}
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 25 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={`relative z-10 max-w-sm w-full ${themeClasses.cardBg} border rounded-[36px] p-6 sm:p-8 text-center shadow-2xl backdrop-blur-xl`}
            >
              {/* Cultural Wax Seal Badge */}
              <div className="w-20 h-20 mx-auto -mt-16 mb-4 rounded-full bg-gradient-to-b from-amber-300 via-gold-400 to-amber-600 p-1 shadow-2xl flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-[#150a06] flex items-center justify-center border border-gold-300">
                  {isJawa ? (
                    <GununganWayang className="w-10 h-10 object-contain text-gold-300" />
                  ) : isMinang ? (
                    <SuntiangMinang className="w-10 h-8 object-contain text-gold-300" />
                  ) : (
                    <img src="/assets/favicon-h.png" alt="HariNikah Seal" className="w-12 h-12 rounded-full object-contain" />
                  )}
                </div>
              </div>

              {/* Subheading with Cultural Title */}
              <p className={`text-[10px] uppercase font-bold tracking-[0.25em] ${themeClasses.goldAccent} mb-1`}>
                {coverData.subheading || 'THE WEDDING CELEBRATION OF'}
              </p>

              {/* ONLY H1 USES SERIF */}
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gold-bright tracking-tight leading-snug my-2">
                {coverData.groomName || 'Dimas'} <br />
                <span className="font-sans font-light text-2xl text-amber-200">&</span> <br />
                {coverData.brideName || 'Clarissa'}
              </h1>

              {/* Divider Ornament */}
              <div className="my-3">
                {isJawa ? (
                  <BatikParangDivider className="mx-auto" />
                ) : isMinang ? (
                  <MinangUkiranDivider className="mx-auto" />
                ) : (
                  <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto" />
                )}
              </div>

              <p className="text-xs text-stone-300 font-medium">
                {coverData.dateText || 'Sabtu, 18 Juli 2026'}
              </p>

              {/* Guest Name Card */}
              <div className="my-5 p-4 rounded-2xl bg-black/40 border border-white/10 shadow-inner">
                <p className="text-[10px] text-stone-400 uppercase tracking-wider font-semibold">Kepada Yth. Tamu Undangan:</p>
                <p className={`text-base font-bold ${themeClasses.goldAccent} mt-1`}>{guestName}</p>
                <p className="text-[10px] text-stone-400 italic mt-1">Mohon maaf bila ada kesalahan penulisan nama/gelar</p>
              </div>

              {/* Open Envelope Button with Pulse Animation */}
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleOpenEnvelope}
                className={`w-full py-3.5 rounded-full bg-gradient-to-r ${themeClasses.btnGrad} text-black font-extrabold text-xs uppercase tracking-widest shadow-xl flex items-center justify-center gap-2 group transition-all`}
              >
                <Heart className="w-4 h-4 fill-black group-hover:scale-125 transition-transform" />
                <span>{coverData.buttonText || 'Buka Undangan'}</span>
              </motion.button>

              <div className="mt-4 flex items-center justify-center gap-1.5 text-[9px] text-stone-400">
                <Sparkles className="w-3 h-3 text-gold-400" />
                <span>{isJawa ? 'Alunan Gamelan Kasunanan' : isMinang ? 'Alunan Saluang Ranah Minang' : 'Alunan Musik Orkestra'}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. FLOATING MUSIC & THEME TOGGLE BUTTONS */}
      {isOpened && (
        <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
          {/* Light / Dark Mode Toggle */}
          <button
            onClick={() => setGuestTheme(t => t === 'dark' ? 'light' : 'dark')}
            title={isGuestLight ? 'Ganti ke Mode Gelap' : 'Ganti ke Mode Terang (Champagne Ivory)'}
            className={`w-11 h-11 rounded-full border-2 flex items-center justify-center shadow-2xl backdrop-blur-md transition-all hover:scale-105 active:scale-95 ${
              isGuestLight
                ? 'bg-white border-amber-300 text-amber-900 shadow-md'
                : 'bg-[#061e1d] border-gold-400 text-gold-300'
            }`}
          >
            {isGuestLight ? <Moon className="w-4 h-4 text-amber-800" /> : <Sun className="w-4 h-4 text-gold-400" />}
          </button>

          <div className="hidden sm:flex items-center px-3 py-1.5 rounded-full bg-black/70 border border-gold-subtle text-[11px] text-stone-300 backdrop-blur-md">
            <span>{isJawa ? '🎵 Gamelan Jawa' : isMinang ? '🎵 Saluang Minang' : '🎵 Romantic Suite'}</span>
          </div>

          <button
            onClick={toggleMusic}
            title={isPlayingMusic ? 'Heningkan Musik' : 'Putar Musik'}
            className={`w-12 h-12 rounded-full border-2 border-gold-400 flex items-center justify-center shadow-2xl backdrop-blur-md transition-all ${
              isPlayingMusic ? 'bg-gold-400 text-black animate-spin-slow' : 'bg-[#061e1d] text-gold-300 hover:scale-110'
            }`}
          >
            {isPlayingMusic ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>
        </div>
      )}

      {/* 3. MAIN LIVE WEDDING WEBSITE CONTENT */}
      {isOpened && (
        <div className={`max-w-xl mx-auto min-h-screen ${themeClasses.bgMain} border-x ${themeClasses.sectionBorder} shadow-2xl relative`}>
          
          {/* SECTION 1: HERO & WELCOME */}
          <section className={`relative px-6 py-16 text-center overflow-hidden border-b ${themeClasses.sectionBorder}`}>
            <div className="relative z-10 space-y-4">
              
              {/* Cultural Icon / Motif Header */}
              <div className="flex justify-center mb-2">
                {isJawa ? (
                  <GununganWayang className="w-16 h-24 object-contain text-gold-300 drop-shadow-[0_4px_12px_rgba(218,165,32,0.4)]" />
                ) : isMinang ? (
                  <SuntiangMinang className="w-24 h-16 object-contain text-gold-300 drop-shadow-[0_4px_12px_rgba(218,165,32,0.4)]" />
                ) : (
                  <div className="w-16 h-16 rounded-full border border-gold-400/80 p-1 shadow-gold-sm">
                    <img src="/assets/favicon-h.png" alt="HariNikah Monogram" className="w-full h-full object-contain rounded-full" />
                  </div>
                )}
              </div>

              <p className={`text-[11px] uppercase font-bold tracking-[0.3em] ${themeClasses.goldAccent}`}>
                {isJawa ? 'SERAT DHAUPIPUN TEMANTEN' : isMinang ? 'BARALEK GADANG MINANGKABAU' : 'THE WEDDING CELEBRATION OF'}
              </p>

              {/* ONLY H1 USES SERIF */}
              <h1 className="text-4xl sm:text-5xl font-serif font-bold text-gold-bright tracking-tight leading-tight">
                {coverData.groomName || 'Dimas'} <br />
                <span className="font-sans font-light text-2xl text-amber-200">&</span> <br />
                {coverData.brideName || 'Clarissa'}
              </h1>

              {/* Divider Ornament */}
              <div className="my-2">
                {isJawa ? (
                  <BatikParangDivider className="mx-auto" />
                ) : isMinang ? (
                  <MinangUkiranDivider className="mx-auto" />
                ) : (
                  <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto" />
                )}
              </div>

              <p className="text-sm font-semibold text-stone-200">
                {coverData.dateText || 'Sabtu, 18 Juli 2026'}
              </p>
              <p className="text-xs text-stone-300 max-w-sm mx-auto">
                {coverData.venueCity || 'The Glass House Ballroom, Jakarta'}
              </p>

              {/* Cultural Quote Card */}
              <div className="mt-8 p-6 rounded-3xl bg-black/40 border border-white/10 backdrop-blur-sm text-xs leading-relaxed text-stone-300 italic">
                <p>
                  "{coupleData.introQuote || 'Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan...'}"
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 2: PROFIL MEMPELAI (GROOM & BRIDE) */}
          <section className={`px-6 py-16 space-y-12 text-center border-b ${themeClasses.sectionBorder}`}>
            <div>
              <p className={`text-[10px] uppercase font-extrabold tracking-widest ${themeClasses.goldAccent}`}>
                {isJawa ? 'TEMANTEN KEKALIH' : isMinang ? 'ANAK DARO JO MARAPULAI' : 'PASANGAN MEMPELAI'}
              </p>
              <h2 className="text-2xl font-bold text-gold-bright mt-1">Mempelai yang Berbahagia</h2>
            </div>

            {/* Mempelai Pria */}
            <div className="space-y-4">
              <div className="w-36 h-36 mx-auto rounded-3xl p-1.5 border-2 border-gold-400 shadow-xl overflow-hidden bg-gradient-to-tr from-amber-400 via-gold-200 to-amber-600">
                <img
                  src={coupleData.groomPhoto || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'}
                  alt="Mempelai Pria"
                  className="w-full h-full object-cover rounded-[22px]"
                />
              </div>
              <div>
                <h3 className={`text-xl font-bold ${themeClasses.goldAccent}`}>
                  {coupleData.groomFullName || 'Dimas Setiadi, S.T.'}
                </h3>
                <p className="text-xs text-stone-300 mt-1 max-w-sm mx-auto leading-relaxed">
                  {coupleData.groomParents || 'Putra Pertama dari Bpk. Ir. Bambang & Ibu Hj. Sri Wahyuni'}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-16 bg-gold-subtle" />
              <Heart className="w-5 h-5 text-gold-400 fill-gold-400" />
              <div className="h-px w-16 bg-gold-subtle" />
            </div>

            {/* Mempelai Wanita */}
            <div className="space-y-4">
              <div className="w-36 h-36 mx-auto rounded-3xl p-1.5 border-2 border-gold-400 shadow-xl overflow-hidden bg-gradient-to-tr from-amber-400 via-gold-200 to-amber-600">
                <img
                  src={coupleData.bridePhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                  alt="Mempelai Wanita"
                  className="w-full h-full object-cover rounded-[22px]"
                />
              </div>
              <div>
                <h3 className={`text-xl font-bold ${themeClasses.goldAccent}`}>
                  {coupleData.brideFullName || 'Clarissa Putri, M.Ds.'}
                </h3>
                <p className="text-xs text-stone-300 mt-1 max-w-sm mx-auto leading-relaxed">
                  {coupleData.brideParents || 'Putri Kedua dari Bpk. Dr. Hendra & Ibu Hj. Maya Kusuma'}
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 3: COUNTDOWN TIMER */}
          <section className={`px-6 py-12 bg-black/30 text-center border-b ${themeClasses.sectionBorder}`}>
            <p className={`text-[10px] uppercase font-bold tracking-widest ${themeClasses.goldAccent} mb-2`}>
              {isJawa ? 'PETUNGAN HARI PAHAGYAN' : isMinang ? 'MANJALANG HARI BARALEK' : 'MENGHITUNG HARI BAHAGIA'}
            </p>
            <div className="grid grid-cols-4 gap-2.5 max-w-xs mx-auto">
              {[
                { val: timeLeft.days, label: 'Hari' },
                { val: timeLeft.hours, label: 'Jam' },
                { val: timeLeft.minutes, label: 'Menit' },
                { val: timeLeft.seconds, label: 'Detik' },
              ].map((box, i) => (
                <div key={i} className="bg-black/50 border border-white/10 rounded-2xl p-3 shadow-inner">
                  <span className="block text-xl sm:text-2xl font-extrabold text-gold-bright font-mono">
                    {box.val}
                  </span>
                  <span className="text-[10px] text-stone-400 uppercase tracking-wider">{box.label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 4: RANGKAIAN ACARA (AKAD & RESEPSI) */}
          <section className={`px-6 py-16 space-y-8 border-b ${themeClasses.sectionBorder}`}>
            <div className="text-center">
              <p className={`text-[10px] uppercase font-extrabold tracking-widest ${themeClasses.goldAccent}`}>
                {isJawa ? 'TATA UPACARA ADAT' : isMinang ? 'JANJANG ACARA BARALEK' : 'JADWAL PERAYAAN'}
              </p>
              <h2 className="text-2xl font-bold text-gold-bright mt-1">
                {eventsData.title || 'Rangkaian Hari Bahagia'}
              </h2>
            </div>

            {/* Event 1 */}
            <div className={`p-6 rounded-3xl ${themeClasses.cardBg} border space-y-4`}>
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className={`text-xs font-bold ${themeClasses.goldAccent} uppercase tracking-wider`}>
                  {eventsData.akadTitle || 'Akad Nikah'}
                </span>
                <Calendar className="w-4 h-4 text-gold-400" />
              </div>
              <p className="text-base font-bold text-white">{eventsData.akadDate || 'Sabtu, 18 Juli 2026'}</p>
              <p className="text-xs text-stone-300 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-gold-400" />
                <span>{eventsData.akadTime || '08.00 - 10.00 WIB'}</span>
              </p>
              <p className="text-xs text-stone-300 flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-gold-400 flex-shrink-0 mt-0.5" />
                <span>{eventsData.akadPlace || 'Masjid Agung Al-Azhar, Jakarta Selatan'}</span>
              </p>
              <a
                href={eventsData.mapsUrl || "https://maps.google.com"}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-1.5 text-xs font-bold text-stone-900 bg-gradient-to-r ${themeClasses.btnGrad} px-4 py-2 rounded-xl shadow-md hover:scale-105 transition-transform`}
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Petunjuk Arah (Google Maps)</span>
              </a>
            </div>

            {/* Event 2 */}
            <div className={`p-6 rounded-3xl ${themeClasses.cardBg} border space-y-4`}>
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className={`text-xs font-bold ${themeClasses.goldAccent} uppercase tracking-wider`}>
                  {eventsData.resepsiTitle || 'Resepsi Pernikahan'}
                </span>
                <Calendar className="w-4 h-4 text-gold-400" />
              </div>
              <p className="text-base font-bold text-white">{eventsData.resepsiDate || 'Sabtu, 18 Juli 2026'}</p>
              <p className="text-xs text-stone-300 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-gold-400" />
                <span>{eventsData.resepsiTime || '11.00 - 14.00 WIB'}</span>
              </p>
              <p className="text-xs text-stone-300 flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-gold-400 flex-shrink-0 mt-0.5" />
                <span>{eventsData.resepsiPlace || 'The Glass House Ballroom, Senopati'}</span>
              </p>
              <a
                href={eventsData.mapsUrl || "https://maps.google.com"}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-1.5 text-xs font-bold text-stone-900 bg-gradient-to-r ${themeClasses.btnGrad} px-4 py-2 rounded-xl shadow-md hover:scale-105 transition-transform`}
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Petunjuk Arah (Google Maps)</span>
              </a>
            </div>
          </section>

          {/* SECTION 5: GALERI PREWEDDING */}
          <section className={`px-6 py-16 space-y-6 bg-black/20 border-b ${themeClasses.sectionBorder} text-center`}>
            <div>
              <p className={`text-[10px] uppercase font-extrabold tracking-widest ${themeClasses.goldAccent}`}>
                {isJawa ? 'LELAKON ASMARADANA' : isMinang ? 'RANAH JO RINDU MINANG' : 'GALERI PREWEDDING'}
              </p>
              <h2 className="text-2xl font-bold text-gold-bright mt-1">
                {pages[3]?.data?.storyTitle || 'Momen Bahagia Kami'}
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
                'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80',
                'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80',
                'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=600&q=80',
              ].map((imgUrl, i) => (
                <div key={i} className="aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-md group">
                  <img src={imgUrl} alt="Gallery" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 6: AMPLOP DIGITAL */}
          <section className={`px-6 py-16 space-y-6 border-b ${themeClasses.sectionBorder} text-center`}>
            <div>
              <p className={`text-[10px] uppercase font-extrabold tracking-widest ${themeClasses.goldAccent}`}>
                {isJawa ? 'TALI ASIH & KADO' : isMinang ? 'TANDO KASIH & HADIAH' : 'TANDA KASIH'}
              </p>
              <h2 className="text-2xl font-bold text-gold-bright mt-1">Amplop Digital</h2>
              <p className="text-xs text-stone-300 mt-2 max-w-sm mx-auto leading-relaxed">
                Doa restu Anda merupakan karunia terindah bagi kami. Bagi keluarga dan sahabat yang ingin memberikan tanda kasih secara digital, dapat melalui rekening berikut:
              </p>
            </div>

            {/* Bank 1 */}
            <div className={`p-5 rounded-3xl ${themeClasses.cardBg} border text-left relative overflow-hidden`}>
              <div className="flex items-center justify-between">
                <span className={`text-xs font-extrabold ${themeClasses.goldAccent}`}>{giftData.bankName1 || 'BCA'}</span>
                <span className="text-[10px] uppercase tracking-wider text-stone-400">Transfer Bank</span>
              </div>
              <p className="text-lg font-mono font-bold text-white mt-2">
                {giftData.accNumber1 || '8820 1234 5678'}
              </p>
              <p className="text-xs text-stone-300">
                a.n. {giftData.accHolder1 || 'DIMAS SETIADI'}
              </p>

              <button
                onClick={() => copyToClipboard(giftData.accNumber1 || '882012345678', 'bca')}
                className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-black/50 border border-white/10 text-xs font-semibold text-gold-300 hover:bg-black/70 transition-colors"
              >
                {copiedBank === 'bca' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedBank === 'bca' ? 'Nomor Tersalin!' : 'Salin Nomor Rekening'}</span>
              </button>
            </div>

            {/* Bank 2 */}
            <div className={`p-5 rounded-3xl ${themeClasses.cardBg} border text-left relative overflow-hidden`}>
              <div className="flex items-center justify-between">
                <span className={`text-xs font-extrabold ${themeClasses.goldAccent}`}>{giftData.bankName2 || 'Bank Mandiri'}</span>
                <span className="text-[10px] uppercase tracking-wider text-stone-400">Transfer Bank</span>
              </div>
              <p className="text-lg font-mono font-bold text-white mt-2">
                {giftData.accNumber2 || '1370 0098 7654'}
              </p>
              <p className="text-xs text-stone-300">
                a.n. {giftData.accHolder2 || 'CLARISSA PUTRI'}
              </p>

              <button
                onClick={() => copyToClipboard(giftData.accNumber2 || '137000987654', 'mandiri')}
                className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-black/50 border border-white/10 text-xs font-semibold text-gold-300 hover:bg-black/70 transition-colors"
              >
                {copiedBank === 'mandiri' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedBank === 'mandiri' ? 'Nomor Tersalin!' : 'Salin Nomor Rekening'}</span>
              </button>
            </div>

            {/* QRIS Button */}
            <button
              onClick={() => setShowQRIS(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/60 border border-white/10 text-xs font-semibold text-stone-200 hover:bg-black/80"
            >
              <QrCode className="w-4 h-4 text-gold-400" />
              <span>Bayar Cepat via QRIS (Semua E-Wallet)</span>
            </button>
          </section>

          {/* SECTION 7: RSVP & BUKU TAMU */}
          <section className={`px-6 py-16 space-y-8 bg-black/20 border-b ${themeClasses.sectionBorder}`}>
            <div className="text-center">
              <p className={`text-[10px] uppercase font-extrabold tracking-widest ${themeClasses.goldAccent}`}>
                {isJawa ? 'PRATANDHA RAWUH' : isMinang ? 'TANDO HADIA JO DOA' : 'KONFIRMASI KEHADIRAN'}
              </p>
              <h2 className="text-2xl font-bold text-gold-bright mt-1">Buku Tamu & Ucapan Doa</h2>
              <p className="text-xs text-stone-300 mt-2">
                {pages[5]?.data?.note || 'Tuliskan konfirmasi kehadiran serta doa restu terhangat Anda untuk kami berdua.'}
              </p>
            </div>

            {/* Form RSVP */}
            <form onSubmit={handleRsvpSubmit} className={`p-6 rounded-3xl ${themeClasses.cardBg} border space-y-4`}>
              <div>
                <label className="text-xs font-semibold text-stone-300 block mb-1">Nama Anda:</label>
                <input
                  type="text"
                  value={rsvpName}
                  onChange={(e) => setRsvpName(e.target.value)}
                  required
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-gold-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-stone-300 block mb-1">Konfirmasi:</label>
                  <select
                    value={rsvpStatus}
                    onChange={(e) => setRsvpStatus(e.target.value as any)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-gold-400"
                  >
                    <option value="hadir">✓ Hadir</option>
                    <option value="tidak">✕ Tidak Hadir</option>
                    <option value="ragu">? Ragu-ragu</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-300 block mb-1">Jumlah Hadir:</label>
                  <select
                    value={rsvpGuests}
                    onChange={(e) => setRsvpGuests(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-gold-400"
                  >
                    <option value="1 Orang">1 Orang</option>
                    <option value="2 Orang">2 Orang</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-300 block mb-1">Doa & Ucapan:</label>
                <textarea
                  rows={3}
                  value={rsvpMessage}
                  onChange={(e) => setRsvpMessage(e.target.value)}
                  placeholder="Tuliskan ucapan selamat & doa restu..."
                  required
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-gold-400"
                />
              </div>

              <button
                type="submit"
                className={`w-full py-3 rounded-xl bg-gradient-to-r ${themeClasses.btnGrad} text-black font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all`}
              >
                <Send className="w-3.5 h-3.5" />
                <span>Kirim Doa & Konfirmasi</span>
              </button>
            </form>

            {/* List of Wishes */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-stone-400 pb-2 border-b border-white/10">
                <span className="font-semibold">{wishesList.length} Doa & Ucapan Masuk</span>
                <span className="text-[10px] text-gold-400 font-bold">Terbaru</span>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                {wishesList.map((wish) => (
                  <div key={wish.id} className="p-4 rounded-2xl bg-black/40 border border-white/10 text-left space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gold-200">{wish.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 font-semibold">
                        {wish.status === 'hadir' ? 'Hadir' : wish.status === 'tidak' ? 'Tidak Hadir' : 'Ragu'}
                      </span>
                    </div>
                    <p className="text-xs text-stone-200 leading-relaxed">{wish.message}</p>
                    <p className="text-[10px] text-stone-500">{wish.timestamp}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FOOTER & WATERMARK */}
          <footer className="px-6 py-12 text-center bg-black/50 text-xs text-stone-400 space-y-4">
            <p className="text-sm font-serif italic text-gold-300">
              "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu."
            </p>
            <p className="text-xs font-bold text-stone-200">
              Kami yang berbahagia, <br />
              {coverData.groomName || 'Dimas'} & {coverData.brideName || 'Clarissa'}
            </p>

            <div className="pt-6 border-t border-white/10 flex flex-col items-center gap-1">
              <div className="flex items-center gap-2">
                <img src="/assets/favicon-h.png" alt="HariNikah" className="w-5 h-5 rounded-full" />
                <span className="font-serif font-bold text-xs text-gold-400">HariNikah</span>
              </div>
              <p className="text-[10px] text-stone-500">
                Dibuat dengan kemewahan budaya oleh <a href="/" className="text-gold-300 hover:underline">HariNikah.com</a>
              </p>
            </div>
          </footer>

        </div>
      )}

      {/* QRIS POPUP MODAL */}
      {showQRIS && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className={`border ${themeClasses.cardBg} rounded-3xl max-w-sm w-full p-6 text-center relative shadow-2xl`}>
            <button
              onClick={() => setShowQRIS(false)}
              className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 mx-auto rounded-full bg-gold-950 border border-gold-subtle flex items-center justify-center text-gold-400 mb-2">
              <QrCode className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-gold-bright">Scan QRIS Amplop</h3>
            <p className="text-xs text-stone-300 mt-1">Dukung GoPay, OVO, Dana, ShopeePay & Seluruh Bank</p>

            <div className="my-5 p-4 bg-white rounded-2xl max-w-[200px] mx-auto shadow-inner flex items-center justify-center">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=HARINIKAH_WEDDING_DIMAS_CLARISSA"
                alt="QRIS Undangan"
                className="w-full h-auto"
              />
            </div>

            <p className="text-[11px] text-stone-400 font-mono">NMID: ID1020260718991</p>
            <p className="text-xs font-bold text-stone-200 mt-1">a.n. Dimas & Clarissa Wedding</p>
          </div>
        </div>
      )}

    </div>
  );
}
