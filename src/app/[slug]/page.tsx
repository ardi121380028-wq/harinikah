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
  Moon,
  Video,
  Download,
  Share2,
  Globe,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Smartphone,
  Layers
} from 'lucide-react';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);
import { INITIAL_PAGES, TEMPLATE_PRESETS, BOTANICAL_SAGE_PAGES } from '../../constants/initialData';
import {
  GununganWayang,
  SuntiangMinang,
  BatikParangDivider,
  MinangUkiranDivider,
  RonceMelatiDivider,
  BotanicalArchFrame,
  BotanicalCornerOrnament,
  VinylMusicBadge,
  CardFrameBorder,
  KawungMotifDivider,
  RumahGadangMotif,
  BotanicalFoilDivider
} from '../../components/cultural/CulturalOrnaments';
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
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [viewStyle, setViewStyle] = useState<'card' | 'scroll'>('card');
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
      // Check published invitation first, then draft
      const liveKey = `harinikah_live_${params?.slug}`;
      const savedLive = localStorage.getItem(liveKey);
      if (savedLive) {
        const parsedLive = JSON.parse(savedLive);
        if (parsedLive.currentTemplate && !themeParam) {
          currentTpl = parsedLive.currentTemplate;
        }
        if (parsedLive.pages) {
          setInvitationData(parsedLive);
        }
      } else {
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

  // Render any custom elements added by user via the Studio Elements tool
  const renderSectionCustomElements = (pageIdx: number) => {
    const elements = pages[pageIdx]?.customElements;
    if (!elements || elements.length === 0) return null;
    return (
      <div className="w-full my-4 space-y-3">
        {elements.map((el: any) => (
          <div key={el.id} className="p-1">
            {el.type === 'heading' && (
              <h2 
                style={{
                  fontSize: el.fontSize ? `${el.fontSize}px` : undefined,
                  color: el.color || undefined,
                  fontWeight: el.fontWeight || 'bold',
                  fontStyle: el.fontStyle || 'normal',
                }}
                className={`font-serif leading-snug ${
                  !el.color ? 'text-gold-bright' : ''
                } ${
                  el.align === 'left' ? 'text-left' : el.align === 'right' ? 'text-right' : 'text-center'
                }`}
              >
                {el.content}
              </h2>
            )}
            {el.type === 'subheading' && (
              <p 
                style={{
                  fontSize: el.fontSize ? `${el.fontSize}px` : undefined,
                  color: el.color || undefined,
                  fontWeight: el.fontWeight || 'semibold',
                  fontStyle: el.fontStyle || 'normal',
                }}
                className={`uppercase tracking-wider ${
                  !el.color ? 'text-gold-300' : ''
                } ${
                  el.align === 'left' ? 'text-left' : el.align === 'right' ? 'text-right' : 'text-center'
                }`}
              >
                {el.content}
              </p>
            )}
            {el.type === 'paragraph' && (
              <p 
                style={{
                  fontSize: el.fontSize ? `${el.fontSize}px` : undefined,
                  color: el.color || undefined,
                  fontWeight: el.fontWeight || 'normal',
                  fontStyle: el.fontStyle || 'normal',
                }}
                className={`leading-relaxed max-w-md mx-auto ${
                  !el.color ? 'text-stone-200' : ''
                } ${
                  el.align === 'left' ? 'text-left' : el.align === 'right' ? 'text-right' : 'text-center'
                }`}
              >
                {el.content}
              </p>
            )}
            {el.type === 'quote' && (
              <blockquote 
                style={{
                  fontSize: el.fontSize ? `${el.fontSize}px` : undefined,
                  color: el.color || undefined,
                }}
                className={`italic max-w-sm mx-auto px-4 py-2 border-l-2 border-gold-400/60 bg-black/20 rounded-r-xl ${
                  !el.color ? 'text-gold-200/90' : ''
                } ${
                  el.align === 'left' ? 'text-left' : el.align === 'right' ? 'text-right' : 'text-center'
                }`}
              >
                "{el.content}"
              </blockquote>
            )}

            {/* Divider Element */}
            {el.type === 'divider' && (
              <div className="w-full py-2">
                {el.dividerStyle === 'batik' && (
                  <div className="flex justify-center">
                    <BatikParangDivider isLight={isGuestLight} className="w-56 h-3 text-amber-400" />
                  </div>
                )}
                {el.dividerStyle === 'minang' && (
                  <div className="flex justify-center">
                    <MinangUkiranDivider isLight={isGuestLight} className="w-56 h-3 text-amber-400" />
                  </div>
                )}
                {el.dividerStyle === 'melati' && (
                  <div className="flex justify-center">
                    <RonceMelatiDivider isLight={isGuestLight} className="w-56 h-3 text-amber-400" />
                  </div>
                )}
                {el.dividerStyle === 'dashed' && (
                  <div className="w-3/4 border-b border-dashed border-amber-400/80 mx-auto my-2" />
                )}
                {(!el.dividerStyle || el.dividerStyle === 'gold_hairline') && (
                  <div className="w-full flex items-center justify-center my-2">
                    <div className="h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent w-3/4 flex items-center justify-center relative">
                      <span className="w-2 h-2 rotate-45 bg-amber-400 shadow-gold-sm" />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Spacer Element */}
            {el.type === 'spacer' && (
              <div style={{ height: `${el.spacerHeight || 24}px` }} className="w-full pointer-events-none" />
            )}

            {/* PNG Overlay Element */}
            {el.type === 'png_overlay' && (
              <div 
                className={`w-full flex ${
                  el.align === 'left' ? 'justify-start' : el.align === 'right' ? 'justify-end' : 'justify-center'
                } py-1`}
                style={{ opacity: (el.pngOpacity ?? 90) / 100 }}
              >
                <img 
                  src={el.pngUrl || el.content} 
                  alt="Stiker" 
                  className="object-contain max-h-56 filter drop-shadow-md"
                  style={{ transform: `scale(${(el.pngScale ?? 100) / 100})` }}
                />
              </div>
            )}

            {el.type === 'ornament' && (
              <div className={`text-2xl ${
                el.align === 'left' ? 'text-left' : el.align === 'right' ? 'text-right' : 'text-center'
              }`}>
                {el.ornamentType === 'leaf' && '🌿 ✨ 🌿'}
                {el.ornamentType === 'ring' && '💍'}
                {el.ornamentType === 'sparkle' && '✨ ⚜️ ✨'}
                {el.ornamentType === 'dove' && '🕊️'}
                {el.ornamentType === 'divider' && <div className="w-28 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto my-2" />}
              </div>
            )}
            {el.type === 'photo' && (
              <div className={`flex ${
                el.align === 'left' ? 'justify-start' : el.align === 'right' ? 'justify-end' : 'justify-center'
              }`}>
                <img src={el.content} alt="Custom" className="max-w-[280px] max-h-[200px] rounded-2xl object-cover border-2 border-gold-400/60 shadow-xl" />
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  // Cultural theme styling variables
  const isJawa = activeTemplate === 'jawa';
  const isMinang = activeTemplate === 'minang';
  const isBotanical = activeTemplate === 'botanical';
  const isGuestLight = guestTheme === 'light';

  // Save The Date Handlers
  const handleAddToGoogleCalendar = () => {
    const groom = coverData.groomName || 'Dimas';
    const bride = coverData.brideName || 'Clarissa';
    const title = encodeURIComponent(`The Wedding of ${groom} & ${bride}`);
    const details = encodeURIComponent(`Undangan Pernikahan ${groom} & ${bride}.\nAcara: ${eventsData.akadTitle || 'Akad Nikah'} & ${eventsData.resepsiTitle || 'Resepsi'}\nLokasi: ${eventsData.resepsiPlace || 'Grand Mercure Ballroom, Bandar Lampung'}`);
    const location = encodeURIComponent(eventsData.resepsiPlace || 'Grand Mercure Ballroom, Bandar Lampung');
    const calUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=20260718T020000Z/20260718T070000Z`;
    window.open(calUrl, '_blank');
  };

  const handleDownloadIcs = () => {
    const groom = coverData.groomName || 'Dimas';
    const bride = coverData.brideName || 'Clarissa';
    const location = eventsData.resepsiPlace || 'Grand Mercure Ballroom, Bandar Lampung';
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//HariNikah//Wedding Invitation//ID',
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      `SUMMARY:The Wedding of ${groom} & ${bride}`,
      `DESCRIPTION:Pernikahan ${groom} & ${bride}. Lokasi: ${location}`,
      `LOCATION:${location}`,
      'DTSTART:20260718T020000Z',
      'DTEND:20260718T070000Z',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Wedding-${groom}-${bride}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const themeClasses = {
    bgMain: isGuestLight
      ? 'bg-[#FAF8F5]'
      : isBotanical
      ? 'bg-[#354838]'
      : isJawa
      ? 'bg-[#180e09]'
      : isMinang
      ? 'bg-[#220508]'
      : 'bg-[#051817]',
    cardBg: isGuestLight
      ? 'bg-white/95 border-amber-300 text-stone-900 shadow-xl shadow-amber-950/5'
      : isBotanical
      ? 'bg-[#243527]/90 border-[#7A937D]/50 text-stone-100 shadow-xl'
      : isJawa
      ? 'bg-[#28170e]/90 border-[#c6923c]/40'
      : isMinang
      ? 'bg-[#3b0d13]/90 border-[#e0b042]/40'
      : 'bg-[#061e1d]/90 border-[#dfb051]/40',
    goldAccent: isGuestLight
      ? 'text-amber-800'
      : isBotanical ? 'text-[#D8B467]' : isJawa ? 'text-[#e6ba64]' : isMinang ? 'text-[#f5d77f]' : 'text-[#dfb051]',
    btnGrad: isBotanical
      ? 'from-[#8DA390] via-[#C9A050] to-[#5C7560]'
      : isJawa
      ? 'from-[#e6ba64] via-[#c6923c] to-[#a37222]'
      : isMinang
      ? 'from-[#f5d77f] via-[#e0b042] to-[#b3821a]'
      : 'from-amber-400 via-gold-300 to-amber-500',
    sectionBorder: isGuestLight
      ? 'border-amber-200'
      : isBotanical ? 'border-[#7A937D]/30' : isJawa ? 'border-[#c6923c]/20' : isMinang ? 'border-[#e0b042]/20' : 'border-[#dfb051]/20',
  };

  return (
    <div className={`min-h-screen ${themeClasses.bgMain} ${isGuestLight ? 'text-stone-900' : 'text-stone-100'} font-sans selection:bg-[#dfb051] selection:text-[#0c2b29] relative overflow-x-hidden transition-colors duration-300`}>
      
      {/* 1. ENVELOPE OPENING FULLSCREEN COVER MODAL (Matching Editor Exactly with CardFrameBorder) */}
      <AnimatePresence>
        {!isOpened && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -90, transition: { duration: 0.85, ease: 'easeInOut' } }}
            className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 ${themeClasses.bgMain} overflow-y-auto`}
          >
            {/* Textured Cultural Overlay */}
            <div className="absolute inset-0 bg-black/75 backdrop-blur-md" />

            {/* Smartphone Device Frame Matching Editor Exactly */}
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                borderRadius: pages[0]?.containerRadius === 'sm' ? 12 : pages[0]?.containerRadius === 'md' ? 24 : pages[0]?.containerRadius === '2xl' ? 36 : 44
              }}
              className={`relative z-10 w-full max-w-[370px] sm:max-w-[390px] h-[720px] max-h-[94vh] shadow-2xl border-4 border-gold-500/60 overflow-hidden flex flex-col justify-between p-6 text-center my-auto transition-all ${
                pages[0]?.customBgGradient || pages[0]?.customBgColor
                  ? ''
                  : isJawa
                  ? 'bg-[#180e09]'
                  : isMinang
                  ? 'bg-[#220508]'
                  : 'bg-[#051817] bg-velvet-texture'
              }`}
            >
              {/* PAGE BACKGROUND LAYER */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-all duration-500 pointer-events-none"
                style={{
                  background: pages[0]?.customBgGradient || pages[0]?.customBgColor || undefined
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />

                {/* Background Watermark / PNG Overlay */}
                {pages[0]?.bgPngOverlay?.url && (
                  <div 
                    className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-0"
                    style={{
                      opacity: (pages[0].bgPngOverlay.opacity ?? 30) / 100,
                      alignItems: pages[0].bgPngOverlay.position === 'top' ? 'flex-start' : pages[0].bgPngOverlay.position === 'bottom' ? 'flex-end' : 'center',
                    }}
                  >
                    <img 
                      src={pages[0].bgPngOverlay.url} 
                      alt="Watermark" 
                      className="object-contain filter drop-shadow-md"
                      style={{
                        transform: `scale(${(pages[0].bgPngOverlay.scale ?? 100) / 100})`,
                        maxWidth: pages[0].bgPngOverlay.position === 'full' ? '100%' : '80%',
                        maxHeight: pages[0].bgPngOverlay.position === 'full' ? '100%' : '70%'
                      }}
                    />
                  </div>
                )}
              </div>

              {/* 4-CORNER ROYAL FILIGREE ORNAMENTS & INNER PERIMETER BORDER */}
              <CardFrameBorder template={activeTemplate} isLight={isGuestLight} />

              {/* Cultural Top Ornament */}
              <div className="relative z-10 flex flex-col items-center mt-1">
                {isJawa ? (
                  <>
                    <GununganWayang 
                      isLight={isGuestLight} 
                      className="w-16 h-24 text-gold-300 drop-shadow-[0_4px_16px_rgba(218,165,32,0.6)]" 
                    />
                    <div className="flex items-center gap-1 mt-0.5 text-[9px] text-amber-200/90 font-serif tracking-widest uppercase">
                      <span>ꦱꦒꦸꦁ</span>
                      <span>•</span>
                      <span>ꦢꦸꦩꦢꦶ</span>
                    </div>
                  </>
                ) : isMinang ? (
                  <>
                    <SuntiangMinang 
                      isLight={isGuestLight} 
                      className="w-24 h-16 text-gold-300 drop-shadow-[0_4px_16px_rgba(218,165,32,0.6)]" 
                    />
                    <RumahGadangMotif 
                      isLight={isGuestLight} 
                      className="w-20 h-7 text-gold-400 -mt-1 opacity-90" 
                    />
                  </>
                ) : isBotanical ? (
                  <>
                    <div className="w-14 h-14 rounded-full border-2 border-[#8DA390] p-1 flex items-center justify-center shadow-lg bg-[#364939] text-2xl">
                      🌿
                    </div>
                    <span className="text-[9px] tracking-[0.25em] text-[#8DA390] font-bold uppercase mt-1">Green Leaf</span>
                  </>
                ) : (
                  <>
                    <div className="w-14 h-14 rounded-full border-2 border-gold-400 p-1 flex items-center justify-center shadow-gold-md bg-gradient-to-b from-amber-400/20 to-transparent">
                      <img src="/assets/favicon-h.png" alt="Monogram" className="w-full h-full object-contain rounded-full" />
                    </div>
                    <span className="text-[9px] tracking-[0.25em] text-gold-300 font-bold uppercase mt-1">Eksklusif</span>
                  </>
                )}
              </div>

              {/* Center Content */}
              <div className={`relative z-10 space-y-2 w-full my-auto ${
                pages[0]?.data?.textAlign === 'left' ? 'text-left' : pages[0]?.data?.textAlign === 'right' ? 'text-right' : 'text-center'
              }`}>
                <p className={`text-[10px] uppercase font-bold tracking-[0.22em] ${
                  isJawa ? 'text-[#e6ba64]' : isMinang ? 'text-[#f5d77f]' : isBotanical ? 'text-[#8DA390]' : 'text-gold-300'
                }`}>
                  {coverData.subheading || (isJawa ? 'PAHARGYAN DHAUPIPUN TEMANTEN' : isMinang ? 'BARALEK GADANG PERNIKAHAN MINANGKABAU' : isBotanical ? 'THE WEDDING OF' : 'THE WEDDING CELEBRATION OF')}
                </p>

                {isBotanical ? (
                  <BotanicalArchFrame className="py-5 px-3">
                    <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
                      {coverData.groomName || 'Rian'} <br />
                      <span className="font-sans font-light text-2xl text-amber-200/90">&</span> <br />
                      {coverData.brideName || 'Irna'}
                    </h1>
                  </BotanicalArchFrame>
                ) : (
                  <h1 className="text-3xl sm:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFF4BE] via-[#DFB051] to-[#F5D77F] tracking-tight leading-tight drop-shadow-md">
                    {coverData.groomName || (isJawa ? 'Raden Mas Dimas' : isMinang ? 'Dimas Marah Sutan' : 'Dimas')} <br />
                    <span className="font-sans font-light text-2xl text-amber-200/90">&</span> <br />
                    {coverData.brideName || (isJawa ? 'Raden Ajeng Clarissa' : isMinang ? 'Clarissa Rangkayo' : 'Clarissa')}
                  </h1>
                )}

                {/* Cultural Divider */}
                <div className="my-1.5 flex flex-col items-center">
                  {isJawa ? (
                    <>
                      <KawungMotifDivider isLight={isGuestLight} className="mx-auto" />
                      <RonceMelatiDivider isLight={isGuestLight} className="mx-auto mt-1 opacity-80" />
                    </>
                  ) : isMinang ? (
                    <MinangUkiranDivider isLight={isGuestLight} className="mx-auto" />
                  ) : isBotanical ? (
                    <div className="flex items-center justify-center gap-2 text-sm text-[#8DA390] my-1">
                      <span>🌿</span>
                      <div className="w-16 h-px bg-[#8DA390]/50" />
                      <span>🌿</span>
                    </div>
                  ) : (
                    <BotanicalFoilDivider isLight={isGuestLight} className="mx-auto" />
                  )}
                </div>

                <p className="text-xs text-stone-200 font-medium tracking-wide">
                  {coverData.dateText || 'Sabtu, 18 Juli 2026'}
                </p>
                <p className="text-[10px] text-stone-300 max-w-[240px] mx-auto leading-relaxed">
                  {coverData.venueCity || 'Grand Mercure Ballroom, Bandar Lampung'}
                </p>
              </div>

              {/* Guest Box & Open Button */}
              <div className="relative z-10 w-full space-y-2 pt-2">
                <div className="bg-black/60 backdrop-blur-md border border-gold-400/40 rounded-2xl p-2.5 shadow-gold-sm">
                  <p className="text-[9px] text-gold-300/80 uppercase tracking-widest font-semibold">
                    Kepada Yth. Tamu Undangan:
                  </p>
                  <p className="text-xs font-bold text-white mt-0.5">{guestName}</p>
                </div>

                <button
                  onClick={handleOpenEnvelope}
                  className={`w-full py-2.5 rounded-full bg-gradient-to-r ${
                    isJawa
                      ? 'from-[#e6ba64] to-[#c6923c]'
                      : isMinang
                      ? 'from-[#f5d77f] to-[#e0b042]'
                      : 'from-amber-400 via-gold-300 to-amber-500'
                  } text-black font-extrabold text-xs uppercase tracking-wider shadow-gold-sm hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer`}
                >
                  <Heart className="w-3.5 h-3.5 fill-current" />
                  <span>{coverData.buttonText || 'Buka Undangan'}</span>
                </button>
              </div>

              {/* Custom Elements from Page 0 */}
              {renderSectionCustomElements(0)}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. FLOATING ROTATING VINYL BADGE (Bottom-Left) & CONTROLS (Bottom-Right) */}
      {isOpened && (
        <>
          <div className="fixed bottom-6 left-6 z-40">
            <VinylMusicBadge
              isPlaying={isPlayingMusic}
              onToggle={toggleMusic}
            />
          </div>

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
              <span>{isJawa ? '🎵 Gamelan Jawa' : isMinang ? '🎵 Saluang Minang' : isBotanical ? '🌿 Pastoral Harp & Cello' : '🎵 Romantic Suite'}</span>
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
        </>
      )}

      {/* 2.5 FLOATING TOP TOOLBAR: VIEW SWITCHER (MODE KARTU VS MODE SCROLL) */}
      {isOpened && (
        <header className="sticky top-3 z-30 flex items-center justify-center px-4 mb-2 pointer-events-auto">
          <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-black/80 backdrop-blur-md border border-gold-400/40 shadow-2xl">
            <button
              onClick={() => setViewStyle('card')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                viewStyle === 'card'
                  ? 'bg-gradient-to-r from-amber-400 to-gold-400 text-black shadow-gold-sm scale-105'
                  : 'text-stone-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mode Kartu</span>
            </button>

            <button
              onClick={() => setViewStyle('scroll')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                viewStyle === 'scroll'
                  ? 'bg-gradient-to-r from-amber-400 to-gold-400 text-black shadow-gold-sm scale-105'
                  : 'text-stone-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Mode Scroll</span>
            </button>

            <div className="w-px h-4 bg-white/20 mx-1" />

            <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-gold-950/80 border border-gold-400/40 text-gold-300">
              {activeTemplate === 'jawa' ? 'Adat Jawa' : activeTemplate === 'minang' ? 'Adat Minang' : activeTemplate === 'botanical' ? 'Green Leaf' : 'Modern Luxury'}
            </span>
          </div>
        </header>
      )}

      {/* 3.1 MODE KARTU: 100% IDENTIK DENGAN STUDIO EDITOR (SMARTPHONE CANVAS FRAME + CARD FILIGREES) */}
      {isOpened && viewStyle === 'card' && (
        <main className="w-full flex-1 flex flex-col items-center justify-center px-2 sm:px-4 py-2 min-h-[calc(100vh-90px)]">
          {/* SMARTPHONE CANVAS FRAME */}
          <div
            style={{
              borderRadius: pages[currentPageIndex]?.containerRadius === 'sm' ? 12 : pages[currentPageIndex]?.containerRadius === 'md' ? 24 : pages[currentPageIndex]?.containerRadius === '2xl' ? 36 : 44
            }}
            className={`relative w-full max-w-[390px] h-[720px] max-h-[92vh] sm:h-[750px] shadow-[0_25px_70px_rgba(0,0,0,0.85)] border-4 border-gold-500/60 overflow-hidden flex flex-col mx-auto transition-all duration-300 ${
              pages[currentPageIndex]?.customBgGradient || pages[currentPageIndex]?.customBgColor
                ? ''
                : isJawa
                ? 'bg-[#180e09]'
                : isMinang
                ? 'bg-[#220508]'
                : 'bg-[#051817] bg-velvet-texture'
            }`}
          >
            {/* Active Page Background Layer */}
            <div 
              className="absolute inset-0 bg-cover bg-center pointer-events-none"
              style={{
                background: pages[currentPageIndex]?.customBgGradient || pages[currentPageIndex]?.customBgColor || undefined
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />

              {/* Watermark Overlay */}
              {pages[currentPageIndex]?.bgPngOverlay?.url && (
                <div 
                  className="absolute inset-0 flex items-center justify-center overflow-hidden z-0"
                  style={{
                    opacity: (pages[currentPageIndex]?.bgPngOverlay.opacity ?? 30) / 100,
                    alignItems: pages[currentPageIndex]?.bgPngOverlay.position === 'top' ? 'flex-start' : pages[currentPageIndex]?.bgPngOverlay.position === 'bottom' ? 'flex-end' : 'center',
                  }}
                >
                  <img 
                    src={pages[currentPageIndex]?.bgPngOverlay.url} 
                    alt="Watermark" 
                    className="object-contain filter drop-shadow-md"
                    style={{
                      transform: `scale(${(pages[currentPageIndex]?.bgPngOverlay.scale ?? 100) / 100})`,
                      maxWidth: pages[currentPageIndex]?.bgPngOverlay.position === 'full' ? '100%' : '80%',
                      maxHeight: pages[currentPageIndex]?.bgPngOverlay.position === 'full' ? '100%' : '70%'
                    }}
                  />
                </div>
              )}
            </div>

            {/* 4-CORNER ROYAL FILIGREE ORNAMENTS & INNER BORDER */}
            <CardFrameBorder template={activeTemplate} isLight={isGuestLight} />

            {/* Dynamic Card Header Inside Phone Frame */}
            <div className="relative z-20 flex items-center justify-between px-6 pt-4 pb-1 text-[10px] text-gold-300/80 font-medium">
              <span className="uppercase tracking-widest font-bold">HariNikah Royal Suite</span>
              <span className="bg-black/60 px-2.5 py-0.5 rounded-full border border-gold-400/30 text-gold-300 font-mono">
                {currentPageIndex + 1} / {pages.length}
              </span>
            </div>

            {/* Active Card Page Content with Framer Motion */}
            <div className="relative z-10 flex-1 overflow-y-auto scrollbar-none p-5 sm:p-6 flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPageIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="w-full flex-1 flex flex-col justify-between text-center"
                >
                  {/* ====================================================
                      PAGE 0: COVER / SAMPUL DEPAN
                      ==================================================== */}
                  {currentPageIndex === 0 && (
                    <div className="my-auto flex flex-col items-center justify-between h-full py-2">
                      <div className="flex flex-col items-center">
                        {isJawa ? (
                          <>
                            <GununganWayang className="w-16 h-24 text-gold-300 drop-shadow-[0_4px_16px_rgba(218,165,32,0.6)]" />
                            <div className="flex items-center gap-1 mt-0.5 text-[9px] text-amber-200/90 font-serif tracking-widest uppercase">
                              <span>ꦱꦒꦸꦁ</span>
                              <span>•</span>
                              <span>ꦢꦸꦩꦢꦶ</span>
                            </div>
                          </>
                        ) : isMinang ? (
                          <>
                            <SuntiangMinang className="w-24 h-16 text-gold-300 drop-shadow-[0_4px_16px_rgba(218,165,32,0.6)]" />
                            <RumahGadangMotif className="w-20 h-7 text-gold-400 -mt-1 opacity-90" />
                          </>
                        ) : isBotanical ? (
                          <>
                            <div className="w-14 h-14 rounded-full border-2 border-[#8DA390] p-1 flex items-center justify-center shadow-lg bg-[#364939] text-2xl">
                              🌿
                            </div>
                            <span className="text-[9px] tracking-[0.25em] text-[#8DA390] font-bold uppercase mt-1">Green Leaf</span>
                          </>
                        ) : (
                          <>
                            <div className="w-14 h-14 rounded-full border-2 border-gold-400 p-1 flex items-center justify-center shadow-gold-md bg-gradient-to-b from-amber-400/20 to-transparent">
                              <img src="/assets/favicon-h.png" alt="Monogram" className="w-full h-full object-contain rounded-full" />
                            </div>
                            <span className="text-[9px] tracking-[0.25em] text-gold-300 font-bold uppercase mt-1">Eksklusif</span>
                          </>
                        )}
                      </div>

                      <div className="space-y-2 w-full my-auto">
                        <p className={`text-[10px] uppercase font-bold tracking-[0.22em] ${
                          isJawa ? 'text-[#e6ba64]' : isMinang ? 'text-[#f5d77f]' : isBotanical ? 'text-[#8DA390]' : 'text-gold-300'
                        }`}>
                          {coverData.subheading || (isJawa ? 'PAHARGYAN DHAUPIPUN TEMANTEN' : isMinang ? 'BARALEK GADANG PERNIKAHAN MINANGKABAU' : isBotanical ? 'THE WEDDING OF' : 'THE WEDDING CELEBRATION OF')}
                        </p>

                        {isBotanical ? (
                          <BotanicalArchFrame className="py-4 px-3">
                            <h1 className="text-3xl font-serif font-bold text-white tracking-tight leading-tight">
                              {coverData.groomName || 'Rian'} <br />
                              <span className="font-sans font-light text-2xl text-amber-200/90">&</span> <br />
                              {coverData.brideName || 'Irna'}
                            </h1>
                          </BotanicalArchFrame>
                        ) : (
                          <h1 className="text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFF4BE] via-[#DFB051] to-[#F5D77F] tracking-tight leading-tight drop-shadow-md">
                            {coverData.groomName || (isJawa ? 'Raden Mas Dimas' : isMinang ? 'Dimas Marah Sutan' : 'Dimas')} <br />
                            <span className="font-sans font-light text-2xl text-amber-200/90">&</span> <br />
                            {coverData.brideName || (isJawa ? 'Raden Ajeng Clarissa' : isMinang ? 'Clarissa Rangkayo' : 'Clarissa')}
                          </h1>
                        )}

                        {/* Cultural Divider */}
                        <div className="my-1.5 flex flex-col items-center">
                          {isJawa ? (
                            <>
                              <KawungMotifDivider isLight={isGuestLight} className="mx-auto" />
                              <RonceMelatiDivider isLight={isGuestLight} className="mx-auto mt-1 opacity-80" />
                            </>
                          ) : isMinang ? (
                            <MinangUkiranDivider isLight={isGuestLight} className="mx-auto" />
                          ) : isBotanical ? (
                            <div className="flex items-center justify-center gap-2 text-sm text-[#8DA390] my-1">
                              <span>🌿</span>
                              <div className="w-16 h-px bg-[#8DA390]/50" />
                              <span>🌿</span>
                            </div>
                          ) : (
                            <BotanicalFoilDivider isLight={isGuestLight} className="mx-auto" />
                          )}
                        </div>

                        <p className="text-xs text-stone-200 font-medium tracking-wide">
                          {coverData.dateText || 'Sabtu, 18 Juli 2026'}
                        </p>
                        <p className="text-[10px] text-stone-300 max-w-[240px] mx-auto leading-relaxed">
                          {coverData.venueCity || 'Grand Mercure Ballroom, Bandar Lampung'}
                        </p>
                      </div>

                      {/* Guest Card & Navigation Button */}
                      <div className="w-full space-y-2 pt-2">
                        <div className="bg-black/60 backdrop-blur-md border border-gold-400/40 rounded-2xl p-2.5 shadow-gold-sm">
                          <p className="text-[9px] text-gold-300/80 uppercase tracking-widest font-semibold">Kepada Yth. Tamu Undangan:</p>
                          <p className="text-xs font-bold text-white mt-0.5">{guestName}</p>
                        </div>

                        <button
                          onClick={() => setCurrentPageIndex(1)}
                          className={`w-full py-2.5 rounded-full bg-gradient-to-r ${
                            isJawa
                              ? 'from-[#e6ba64] to-[#c6923c]'
                              : isMinang
                              ? 'from-[#f5d77f] to-[#e0b042]'
                              : 'from-amber-400 via-gold-300 to-amber-500'
                          } text-black font-extrabold text-xs uppercase tracking-wider shadow-gold-sm hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer`}
                        >
                          <span>Buka Profil Mempelai</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>

                      {renderSectionCustomElements(0)}
                    </div>
                  )}

                  {/* ====================================================
                      PAGE 1: MEMPELAI (GROOM & BRIDE)
                      ==================================================== */}
                  {currentPageIndex === 1 && (
                    <div className="my-auto space-y-3 py-2">
                      <div className="flex justify-center">
                        {isJawa ? (
                          <RonceMelatiDivider isLight={isGuestLight} className="w-36 h-3" />
                        ) : isMinang ? (
                          <RumahGadangMotif isLight={isGuestLight} className="w-16 h-5" />
                        ) : (
                          <BotanicalFoilDivider isLight={isGuestLight} className="w-36 h-3" />
                        )}
                      </div>

                      <p className="text-[11px] italic text-gold-200/90 max-w-xs mx-auto leading-relaxed px-2">
                        "{coupleData.introQuote || 'Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan...'}"
                      </p>

                      {/* Groom */}
                      <div className="space-y-1">
                        <div className={`mx-auto p-1 border-2 shadow-sm overflow-hidden ${
                          isBotanical
                            ? 'w-20 h-28 rounded-[50%] border-[#8DA390] bg-[#F4F7F4]'
                            : 'w-20 h-20 rounded-full border-gold-400 bg-gradient-to-b from-amber-300/20 to-transparent'
                        }`}>
                          <img 
                            src={coupleData.groomPhoto || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'} 
                            alt="Groom" 
                            className={`w-full h-full object-cover ${isBotanical ? 'rounded-[50%]' : 'rounded-full'}`} 
                          />
                        </div>
                        <h3 className="text-sm font-bold text-gold-bright mt-1">
                          {coupleData.groomFullName || (isJawa ? 'Raden Mas Dimas Setiadi, S.T.' : isMinang ? 'Dimas Marah Sutan, S.T.' : isBotanical ? 'Rian Firmansyah, S.T.' : 'Dimas Setiadi, S.T.')}
                        </h3>
                        <p className="text-[10px] text-stone-300 max-w-xs mx-auto leading-relaxed">
                          {coupleData.groomParents || 'Putra Pertama dari Bpk. Ir. Bambang & Ibu Hj. Sri Wahyuni'}
                        </p>
                      </div>

                      {/* Cultural Divider Between Groom & Bride */}
                      <div className="py-0.5">
                        {isJawa ? (
                          <BatikParangDivider className="mx-auto w-36" />
                        ) : isMinang ? (
                          <MinangUkiranDivider className="mx-auto w-36" />
                        ) : isBotanical ? (
                          <div className="font-bold text-base text-[#8DA390]">&</div>
                        ) : (
                          <div className="font-bold text-base text-gold-300">&</div>
                        )}
                      </div>

                      {/* Bride */}
                      <div className="space-y-1">
                        <div className={`mx-auto p-1 border-2 shadow-sm overflow-hidden ${
                          isBotanical
                            ? 'w-20 h-28 rounded-[50%] border-[#8DA390] bg-[#F4F7F4]'
                            : 'w-20 h-20 rounded-full border-gold-400 bg-gradient-to-b from-amber-300/20 to-transparent'
                        }`}>
                          <img 
                            src={coupleData.bridePhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'} 
                            alt="Bride" 
                            className={`w-full h-full object-cover ${isBotanical ? 'rounded-[50%]' : 'rounded-full'}`} 
                          />
                        </div>
                        <h3 className="text-sm font-bold text-gold-bright mt-1">
                          {coupleData.brideFullName || (isJawa ? 'Raden Ajeng Clarissa Putri, M.Ds.' : isMinang ? 'Clarissa Rangkayo, M.Ds.' : isBotanical ? 'Irna Agustiani, S.Pd.' : 'Clarissa Putri, M.Ds.')}
                        </h3>
                        <p className="text-[10px] text-stone-300 max-w-xs mx-auto leading-relaxed">
                          {coupleData.brideParents || 'Putri Kedua dari Bpk. Dr. Hendra & Ibu Hj. Maya Kusuma'}
                        </p>
                      </div>

                      {renderSectionCustomElements(1)}
                    </div>
                  )}

                  {/* ====================================================
                      PAGE 2: EVENTS & COUNTDOWN
                      ==================================================== */}
                  {currentPageIndex === 2 && (
                    <div className="my-auto space-y-3 py-2 text-left">
                      <h2 className="text-base font-bold text-gold-bright text-center">
                        {eventsData.title || 'Rangkaian Hari Bahagia'}
                      </h2>

                      {/* Countdown Timer */}
                      <div className="grid grid-cols-4 gap-1.5 max-w-[280px] mx-auto text-center">
                        {[
                          { val: timeLeft.days, label: 'Hari' },
                          { val: timeLeft.hours, label: 'Jam' },
                          { val: timeLeft.minutes, label: 'Mnt' },
                          { val: timeLeft.seconds, label: 'Dtk' },
                        ].map((box, i) => (
                          <div key={i} className="bg-black/60 border border-gold-400/30 rounded-xl p-1.5 shadow-inner">
                            <span className="block text-sm font-extrabold text-gold-bright font-mono">{box.val}</span>
                            <span className="text-[9px] text-stone-400 uppercase tracking-wider">{box.label}</span>
                          </div>
                        ))}
                      </div>

                      {/* Akad Nikah */}
                      <div className="p-3 rounded-2xl bg-black/50 border border-gold-400/40 space-y-1 shadow-gold-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-gold-300 uppercase tracking-wider">
                            {eventsData.akadTitle || 'Akad Nikah'}
                          </span>
                          <Calendar className="w-3.5 h-3.5 text-gold-400" />
                        </div>
                        <p className="text-xs font-bold text-white">{eventsData.akadDate || 'Sabtu, 18 Juli 2026'}</p>
                        <p className="text-[10px] text-stone-300">{eventsData.akadTime || '08.00 - 10.00 WIB'}</p>
                        <p className="text-[10px] text-stone-400 flex items-start gap-1">
                          <MapPin className="w-3 h-3 text-gold-400 flex-shrink-0 mt-0.5" />
                          <span>{eventsData.akadPlace || 'Masjid Agung Al-Furqon, Bandar Lampung'}</span>
                        </p>
                      </div>

                      {/* Resepsi */}
                      <div className="p-3 rounded-2xl bg-black/50 border border-gold-400/40 space-y-1 shadow-gold-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-gold-300 uppercase tracking-wider">
                            {eventsData.resepsiTitle || 'Resepsi Pernikahan'}
                          </span>
                          <Calendar className="w-3.5 h-3.5 text-gold-400" />
                        </div>
                        <p className="text-xs font-bold text-white">{eventsData.resepsiDate || 'Sabtu, 18 Juli 2026'}</p>
                        <p className="text-[10px] text-stone-300">{eventsData.resepsiTime || '11.00 - 14.00 WIB'}</p>
                        <p className="text-[10px] text-stone-400 flex items-start gap-1">
                          <MapPin className="w-3 h-3 text-gold-400 flex-shrink-0 mt-0.5" />
                          <span>{eventsData.resepsiPlace || 'Grand Mercure Ballroom, Bandar Lampung'}</span>
                        </p>
                      </div>

                      {/* Quick Action Links */}
                      <div className="flex items-center justify-center gap-2 pt-1">
                        <a
                          href={eventsData.mapsUrl || "https://maps.google.com"}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-gold-400 text-stone-900 font-bold text-[10px] shadow-sm flex items-center gap-1 hover:scale-105 transition-transform"
                        >
                          <MapPin className="w-3 h-3" />
                          <span>Buka Maps</span>
                        </a>
                        <button
                          type="button"
                          onClick={handleAddToGoogleCalendar}
                          className="px-3 py-1.5 rounded-xl bg-white text-stone-900 font-bold text-[10px] shadow-sm flex items-center gap-1 hover:bg-stone-100 transition-colors"
                        >
                          <Calendar className="w-3 h-3 text-blue-600" />
                          <span>Simpan Kalender</span>
                        </button>
                      </div>

                      {renderSectionCustomElements(2)}
                    </div>
                  )}

                  {/* ====================================================
                      PAGE 3: STORY & GALLERY
                      ==================================================== */}
                  {currentPageIndex === 3 && (
                    <div className="my-auto space-y-2.5 py-2">
                      <h2 className="text-base font-bold text-gold-bright">
                        {pages[3]?.data?.storyTitle || 'Momen Bahagia Kami'}
                      </h2>
                      <p className="text-[11px] text-stone-300 max-w-xs mx-auto">
                        {pages[3]?.data?.storyIntro || 'Dari ruang kuliah tahun 2021 hingga mengucap janji suci seumur hidup.'}
                      </p>

                      {/* Video Embed */}
                      <div className="relative aspect-video rounded-xl overflow-hidden shadow-inner border border-gold-400/30 bg-black">
                        <iframe
                          className="w-full h-full"
                          src="https://www.youtube.com/embed/dQw4w9WgXcQ?controls=1&rel=0"
                          title="Video Prewedding Teaser"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>

                      {/* Photo Grid */}
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        {[
                          'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80',
                          'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=400&q=80',
                          'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=400&q=80',
                          'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=400&q=80',
                        ].map((src, i) => (
                          <div key={i} className="aspect-square rounded-xl overflow-hidden border border-gold-400/40 shadow-gold-sm">
                            <img src={src} alt="Prewedding" className="w-full h-full object-cover hover:scale-105 transition-transform" />
                          </div>
                        ))}
                      </div>

                      {renderSectionCustomElements(3)}
                    </div>
                  )}

                  {/* ====================================================
                      PAGE 4: AMPLOP DIGITAL & KADO
                      ==================================================== */}
                  {currentPageIndex === 4 && (
                    <div className="my-auto space-y-2.5 py-2 text-left">
                      <h2 className="text-base font-bold text-gold-bright text-center">
                        Tanda Kasih & Hadiah
                      </h2>
                      <p className="text-[11px] text-stone-300 text-center">
                        Doa restu Anda merupakan karunia terindah bagi kami.
                      </p>

                      {/* Bank 1 */}
                      <div className="p-3 rounded-2xl bg-black/50 border border-gold-400/40 shadow-gold-sm">
                        <div className="flex items-center justify-between">
                          <p className="text-[10px] font-bold text-gold-400">{giftData.bankName1 || 'BCA'}</p>
                          <span className="text-[9px] text-stone-400">Transfer Bank</span>
                        </div>
                        <p className="text-sm font-mono font-bold text-white mt-0.5">{giftData.accNumber1 || '8820 1234 5678'}</p>
                        <p className="text-[10px] text-stone-300">a.n. {giftData.accHolder1 || 'DIMAS SETIADI'}</p>
                        <button
                          onClick={() => copyToClipboard(giftData.accNumber1 || '882012345678', 'bca')}
                          className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/60 border border-white/10 text-[10px] font-semibold text-gold-300 hover:bg-black/80 transition-colors"
                        >
                          {copiedBank === 'bca' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedBank === 'bca' ? 'Nomor Tersalin!' : 'Salin Nomor'}</span>
                        </button>
                      </div>

                      {/* Bank 2 */}
                      <div className="p-3 rounded-2xl bg-black/50 border border-gold-400/40 shadow-gold-sm">
                        <div className="flex items-center justify-between">
                          <p className="text-[10px] font-bold text-gold-400">{giftData.bankName2 || 'Bank Mandiri'}</p>
                          <span className="text-[9px] text-stone-400">Transfer Bank</span>
                        </div>
                        <p className="text-sm font-mono font-bold text-white mt-0.5">{giftData.accNumber2 || '1370 0098 7654'}</p>
                        <p className="text-[10px] text-stone-300">a.n. {giftData.accHolder2 || 'CLARISSA PUTRI'}</p>
                        <button
                          onClick={() => copyToClipboard(giftData.accNumber2 || '137000987654', 'mandiri')}
                          className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/60 border border-white/10 text-[10px] font-semibold text-gold-300 hover:bg-black/80 transition-colors"
                        >
                          {copiedBank === 'mandiri' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedBank === 'mandiri' ? 'Nomor Tersalin!' : 'Salin Nomor'}</span>
                        </button>
                      </div>

                      {/* QRIS Button */}
                      <button
                        onClick={() => setShowQRIS(true)}
                        className="w-full py-2 rounded-xl bg-black/60 border border-gold-400/40 text-[11px] font-semibold text-stone-200 hover:bg-black/80 flex items-center justify-center gap-1.5"
                      >
                        <QrCode className="w-3.5 h-3.5 text-gold-400" />
                        <span>Scan QRIS Amplop (Semua E-Wallet)</span>
                      </button>

                      {renderSectionCustomElements(4)}
                    </div>
                  )}

                  {/* ====================================================
                      PAGE 5: RSVP & BUKU TAMU
                      ==================================================== */}
                  {currentPageIndex === 5 && (
                    <div className="my-auto space-y-2.5 py-2 text-left">
                      <h2 className="text-base font-bold text-gold-bright text-center">
                        Konfirmasi Kehadiran & Doa
                      </h2>

                      <form onSubmit={handleRsvpSubmit} className="space-y-2 bg-black/50 p-3 rounded-2xl border border-gold-400/40 shadow-gold-sm">
                        <div>
                          <label className="text-[10px] text-stone-300 block mb-0.5">Nama Anda:</label>
                          <input
                            type="text"
                            value={rsvpName}
                            onChange={(e) => setRsvpName(e.target.value)}
                            required
                            className="w-full bg-[#041514] border border-gold-subtle rounded-lg px-2.5 py-1 text-xs text-stone-100 focus:outline-none focus:border-gold-400"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[10px] text-stone-300 block mb-0.5">Konfirmasi:</label>
                            <select
                              value={rsvpStatus}
                              onChange={(e) => setRsvpStatus(e.target.value as any)}
                              className="w-full bg-[#041514] border border-gold-subtle rounded-lg px-2 py-1 text-xs text-stone-100"
                            >
                              <option value="hadir">✓ Hadir</option>
                              <option value="tidak">✕ Tidak Hadir</option>
                              <option value="ragu">? Ragu-Ragu</option>
                            </select>
                          </div>

                          <div>
                            <label className="text-[10px] text-stone-300 block mb-0.5">Jumlah Tamu:</label>
                            <select
                              value={rsvpGuests}
                              onChange={(e) => setRsvpGuests(e.target.value)}
                              className="w-full bg-[#041514] border border-gold-subtle rounded-lg px-2 py-1 text-xs text-stone-100"
                            >
                              <option value="1 Orang">1 Orang</option>
                              <option value="2 Orang">2 Orang</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="text-[10px] text-stone-300 block mb-0.5">Doa & Ucapan:</label>
                          <textarea
                            rows={2}
                            value={rsvpMessage}
                            onChange={(e) => setRsvpMessage(e.target.value)}
                            placeholder="Tuliskan doa restu Anda..."
                            required
                            className="w-full bg-[#041514] border border-gold-subtle rounded-lg px-2.5 py-1 text-xs text-stone-100 focus:outline-none focus:border-gold-400"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full py-2 bg-gradient-to-r from-amber-400 via-gold-300 to-amber-500 text-black text-xs font-bold rounded-lg shadow-gold-sm hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Send className="w-3 h-3" />
                          <span>Kirim Doa & Konfirmasi</span>
                        </button>
                      </form>

                      {/* Recent Wishes Feed in Phone View */}
                      <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
                        {wishesList.slice(0, 3).map((wish) => (
                          <div key={wish.id} className="p-2 rounded-xl bg-black/40 border border-white/10 text-[10px] space-y-0.5">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-gold-300">{wish.name}</span>
                              <span className="text-[8px] text-emerald-400 font-semibold">{wish.status === 'hadir' ? 'Hadir' : 'Tidak Hadir'}</span>
                            </div>
                            <p className="text-stone-300 line-clamp-2">{wish.message}</p>
                          </div>
                        ))}
                      </div>

                      {renderSectionCustomElements(5)}
                    </div>
                  )}

                  {/* ====================================================
                      EXTRA PAGES (INDEX 6+)
                      ==================================================== */}
                  {currentPageIndex >= 6 && pages[currentPageIndex] && (
                    <div className="my-auto space-y-3 py-4 text-center">
                      <h2 className="text-lg font-bold font-serif text-gold-bright">
                        {pages[currentPageIndex]?.title}
                      </h2>
                      <p className="text-xs text-stone-300 max-w-xs mx-auto">
                        Halaman khusus yang ditambahkan pengantin.
                      </p>
                      {renderSectionCustomElements(currentPageIndex)}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* BOTTOM FILMSTRIP TABS & PREV/NEXT CONTROLS */}
            <div className="relative z-20 border-t border-gold-400/30 bg-black/85 backdrop-blur-md px-3 py-2 flex items-center justify-between gap-1">
              <button
                onClick={() => setCurrentPageIndex(prev => Math.max(0, prev - 1))}
                disabled={currentPageIndex === 0}
                className="p-1 rounded-full hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-gold-300 transition-all cursor-pointer"
                title="Halaman Sebelumnya"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex-1 flex items-center justify-center gap-1 overflow-x-auto scrollbar-none py-0.5 px-1">
                {pages.slice(0, 6).map((p: any, idx: number) => {
                  const labels = ['Sampul', 'Mempelai', 'Acara', 'Galeri', 'Amplop', 'RSVP'];
                  const label = labels[idx] || `Hal ${idx + 1}`;
                  const isActive = currentPageIndex === idx;
                  return (
                    <button
                      key={p.id || idx}
                      onClick={() => setCurrentPageIndex(idx)}
                      className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all whitespace-nowrap cursor-pointer ${
                        isActive
                          ? 'bg-gradient-to-r from-amber-400 to-gold-400 text-black shadow-gold-sm scale-105'
                          : 'text-stone-300 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setCurrentPageIndex(prev => Math.min(pages.length - 1, prev + 1))}
                disabled={currentPageIndex === pages.length - 1}
                className="p-1 rounded-full hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-gold-300 transition-all cursor-pointer"
                title="Halaman Berikutnya"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

          </div>
        </main>
      )}

      {/* 3.2 MODE SCROLL: CONTINUOUS SCROLL WITH ROYAL FRAMED SECTIONS */}
      {isOpened && viewStyle === 'scroll' && (
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
                ) : isBotanical ? (
                  <div className="w-14 h-14 rounded-full border-2 border-[#8DA390] bg-[#2E4133] flex items-center justify-center text-xl shadow-lg">
                    🌿
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full border border-gold-400/80 p-1 shadow-gold-sm">
                    <img src="/assets/favicon-h.png" alt="HariNikah Monogram" className="w-full h-full object-contain rounded-full" />
                  </div>
                )}
              </div>

              <p className={`text-[11px] uppercase font-bold tracking-[0.3em] ${themeClasses.goldAccent}`}>
                {isJawa ? 'SERAT DHAUPIPUN TEMANTEN' : isMinang ? 'BARALEK GADANG MINANGKABAU' : isBotanical ? 'THE BOTANICAL GARDEN CELEBRATION' : 'THE WEDDING CELEBRATION OF'}
              </p>

              {/* ONLY H1 USES SERIF - Botanical Arch Frame Support */}
              {isBotanical ? (
                <BotanicalArchFrame className="max-w-md mx-auto my-4 py-8">
                  <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
                    {coverData.groomName || 'Rian'} <br />
                    <span className="font-sans font-light text-2xl text-amber-200">&</span> <br />
                    {coverData.brideName || 'Irna'}
                  </h1>
                </BotanicalArchFrame>
              ) : (
                <h1 className="text-4xl sm:text-5xl font-serif font-bold text-gold-bright tracking-tight leading-tight">
                  {coverData.groomName || 'Dimas'} <br />
                  <span className="font-sans font-light text-2xl text-amber-200">&</span> <br />
                  {coverData.brideName || 'Clarissa'}
                </h1>
              )}

              {/* Divider Ornament */}
              <div className="my-2">
                {isJawa ? (
                  <BatikParangDivider className="mx-auto" />
                ) : isMinang ? (
                  <MinangUkiranDivider className="mx-auto" />
                ) : isBotanical ? (
                  <div className="flex items-center justify-center gap-2 text-sm text-[#8DA390]">
                    <span>🌿</span>
                    <div className="w-16 h-px bg-[#8DA390]/50" />
                    <span>🌿</span>
                  </div>
                ) : (
                  <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto" />
                )}
              </div>

              <p className="text-sm font-semibold text-stone-200">
                {coverData.dateText || 'Sabtu, 18 Juli 2026'}
              </p>
              <p className="text-xs text-stone-300 max-w-sm mx-auto">
                {coverData.venueCity || 'Grand Mercure Ballroom, Bandar Lampung'}
              </p>

              {/* Cultural Quote Card */}
              <div className="mt-8 p-6 rounded-3xl bg-black/40 border border-white/10 backdrop-blur-sm text-xs leading-relaxed text-stone-300 italic">
                <p>
                  "{coupleData.introQuote || 'Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan...'}"
                </p>
              </div>

              {/* Custom Elements from Studio Editor (Page 0) */}
              {renderSectionCustomElements(0)}
            </div>
          </section>

          {/* SECTION 2: PROFIL MEMPELAI (GROOM & BRIDE) */}
          <section className={`px-6 py-16 space-y-12 text-center border-b ${themeClasses.sectionBorder}`}>
            <div>
              <p className={`text-[10px] uppercase font-extrabold tracking-widest ${themeClasses.goldAccent}`}>
                {isJawa ? 'TEMANTEN KEKALIH' : isMinang ? 'ANAK DARO JO MARAPULAI' : isBotanical ? 'PASANGAN MEMPELAI' : 'PASANGAN MEMPELAI'}
              </p>
              <h2 className="text-2xl font-bold text-gold-bright mt-1">Mempelai yang Berbahagia</h2>
            </div>

            {/* Mempelai Pria (Oval in Botanical, Rounded Rect in Others) */}
            <div className="space-y-4">
              <div className={`mx-auto p-1.5 border-2 shadow-xl overflow-hidden ${
                isBotanical
                  ? 'w-36 h-48 rounded-[50%] border-[#8DA390] bg-[#F4F7F4]'
                  : 'w-36 h-36 rounded-3xl border-gold-400 bg-gradient-to-tr from-amber-400 via-gold-200 to-amber-600'
              }`}>
                <img
                  src={coupleData.groomPhoto || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'}
                  alt="Mempelai Pria"
                  className={`w-full h-full object-cover ${isBotanical ? 'rounded-[50%]' : 'rounded-[22px]'}`}
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

            {/* Mempelai Wanita (Oval in Botanical, Rounded Rect in Others) */}
            <div className="space-y-4">
              <div className={`mx-auto p-1.5 border-2 shadow-xl overflow-hidden ${
                isBotanical
                  ? 'w-36 h-48 rounded-[50%] border-[#8DA390] bg-[#F4F7F4]'
                  : 'w-36 h-36 rounded-3xl border-gold-400 bg-gradient-to-tr from-amber-400 via-gold-200 to-amber-600'
              }`}>
                <img
                  src={coupleData.bridePhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                  alt="Mempelai Wanita"
                  className={`w-full h-full object-cover ${isBotanical ? 'rounded-[50%]' : 'rounded-[22px]'}`}
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

            {/* Custom Elements from Studio Editor (Page 1) */}
            {renderSectionCustomElements(1)}
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
                <span>{eventsData.akadPlace || 'Masjid Agung Al-Furqon, Bandar Lampung'}</span>
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
                <span>{eventsData.resepsiPlace || 'Grand Mercure Ballroom, Bandar Lampung'}</span>
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
            {/* SAVE THE DATE ACTIONS (Feature 3) */}
            <div className={`p-6 rounded-3xl ${themeClasses.cardBg} border text-center space-y-3`}>
              <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-300">
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>Simpan Tanggal Acara (Save The Date)</span>
              </div>
              <p className="text-xs text-stone-300 max-w-sm mx-auto leading-relaxed">
                Pasang pengingat otomatis di kalender smartphone Anda agar tidak melewatkan momen bahagia kami.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={handleAddToGoogleCalendar}
                  className="px-4 py-2.5 rounded-xl bg-white text-stone-900 font-bold text-xs shadow-md hover:bg-stone-100 flex items-center gap-1.5 transition-all"
                >
                  <Calendar className="w-3.5 h-3.5 text-blue-600" />
                  <span>Google Calendar</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownloadIcs}
                  className="px-4 py-2.5 rounded-xl bg-black/50 border border-white/20 text-stone-100 font-bold text-xs shadow-md hover:bg-black/70 flex items-center gap-1.5 transition-all"
                >
                  <Download className="w-3.5 h-3.5 text-amber-300" />
                  <span>Apple / Outlook (.ics)</span>
                </button>
              </div>

              {/* Custom Elements from Studio Editor (Page 2 - Acara) */}
              {renderSectionCustomElements(2)}
            </div>
          </section>

          {/* SECTION 5: GALERI PREWEDDING & VIDEO (Feature 7 & 8) */}
          <section className={`px-6 py-16 space-y-6 bg-black/20 border-b ${themeClasses.sectionBorder} text-center`}>
            <div>
              <p className={`text-[10px] uppercase font-extrabold tracking-widest ${themeClasses.goldAccent}`}>
                {isJawa ? 'LELAKON ASMARADANA' : isMinang ? 'RANAH JO RINDU MINANG' : isBotanical ? 'KISAH KASIH BOTANIKAL' : 'GALERI PREWEDDING'}
              </p>
              <h2 className="text-2xl font-bold text-gold-bright mt-1">
                {pages[3]?.data?.storyTitle || 'Momen Bahagia Kami'}
              </h2>
            </div>

            {/* Video Prewedding Embed / Showcase (Feature 8) */}
            <div className={`p-4 sm:p-5 rounded-3xl ${themeClasses.cardBg} border space-y-3 text-left`}>
              <div className="flex items-center justify-between px-1">
                <span className={`text-xs font-bold ${themeClasses.goldAccent} flex items-center gap-1.5`}>
                  <Video className="w-4 h-4 text-red-400" />
                  <span>Video Teaser Prewedding</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-950/80 border border-red-500/30 text-red-300 font-bold">
                  HD 4K
                </span>
              </div>
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-inner border border-white/10 bg-black">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?controls=1&rel=0"
                  title="Video Prewedding Teaser"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <p className="text-[11px] text-stone-300 italic text-center">
                {pages[3]?.data?.videoCaption || 'Cuplikan teaser romantis kisah kasih kami berdua.'}
              </p>
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

            {/* Custom Elements from Studio Editor (Page 3 - Story/Galeri) */}
            {renderSectionCustomElements(3)}
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

            {/* Custom Elements from Studio Editor (Page 4 - Amplop) */}
            {renderSectionCustomElements(4)}
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

            {/* Custom Elements from Studio Editor (Page 5 - RSVP) */}
            {renderSectionCustomElements(5)}
          </section>

          {/* RENDER ANY EXTRA PAGES ADDED BY USER IN EDITOR */}
          {pages.slice(6).map((extraPage: any, extraIdx: number) => (
            <section key={extraPage.id || extraIdx} className={`px-6 py-16 space-y-6 border-b ${themeClasses.sectionBorder} text-center`}>
              <h2 className="text-2xl font-bold font-serif text-gold-bright">
                {extraPage.title}
              </h2>
              {renderSectionCustomElements(6 + extraIdx)}
            </section>
          ))}

          {/* FOOTER & WATERMARK (Matching Screenshot 4) */}
          <footer className="px-6 py-12 text-center bg-black/50 text-xs text-stone-400 space-y-5">
            <p className="text-sm font-serif italic text-gold-300">
              "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu."
            </p>
            <p className="text-xs font-bold text-stone-200">
              Kami yang berbahagia, <br />
              {coverData.groomName || 'Dimas'} & {coverData.brideName || 'Clarissa'}
            </p>

            {/* "See you on our wedding day!" & Social Connect */}
            <div className="pt-6 border-t border-white/10 space-y-4">
              <p className="text-base font-serif italic text-amber-200 tracking-wide">
                See you on our wedding day!
              </p>

              <div className="flex items-center justify-center gap-3">
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noreferrer"
                  title="Hubungi Pengantin via WhatsApp"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-emerald-600/30 border border-white/20 flex items-center justify-center text-stone-200 hover:text-emerald-300 transition-all hover:scale-110"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
                <a
                  href="/"
                  title="Kunjungi Website Resmi"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-amber-600/30 border border-white/20 flex items-center justify-center text-stone-200 hover:text-amber-300 transition-all hover:scale-110"
                >
                  <Globe className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  title="Instagram Pengantin"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-pink-600/30 border border-white/20 flex items-center justify-center text-stone-200 hover:text-pink-300 transition-all hover:scale-110"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

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
