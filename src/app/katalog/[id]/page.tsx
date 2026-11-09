'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Star,
  CheckCircle2,
  Eye,
  ShoppingCart,
  CreditCard,
  Heart,
  Share2,
  Calendar,
  Clock,
  MapPin,
  Play,
  ArrowRight,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { CATALOG_THEMES, TEMPLATE_PRESETS, BOTANICAL_SAGE_PAGES } from '../../../constants/initialData';
import { BotanicalCornerOrnament, BotanicalArchFrame, VinylMusicBadge } from '../../../components/cultural/CulturalOrnaments';
import { weddingAudio } from '../../../utils/audioEngine';
import { Navbar } from '../../../components/layout/Navbar';
import { Footer } from '../../../components/layout/Footer';
import type { CatalogItem, CulturalTemplate } from '../../../types';

export default function TemplateDetailPage() {
  const params = useParams();
  const router = useRouter();
  const rawId = (params?.id as string) || 'green-leaf';

  // Find theme by slug or fallback to green-leaf
  const theme: CatalogItem = CATALOG_THEMES.find(
    t => t.slug === rawId || t.id.toString() === rawId
  ) || CATALOG_THEMES[0];

  const templateKey: CulturalTemplate = theme.templateKey || 'botanical';

  // Variation selection: 'tanpa_foto' vs 'dengan_foto'
  const [selectedVariation, setSelectedVariation] = useState<'tanpa_foto' | 'dengan_foto'>('tanpa_foto');
  const basePrice = theme.price || 113400;
  const currentPrice = selectedVariation === 'dengan_foto' ? basePrice + 30000 : basePrice;

  // Active Screen in phone preview (0: Sampul, 1: Mempelai, 2: Acara, 3: Galeri, 4: Amplop)
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);

  // Audio preview state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Active Tab: 'deskripsi' | 'informasi' | 'review'
  const [activeTab, setActiveTab] = useState<'deskripsi' | 'informasi' | 'review'>('deskripsi');

  // Video modal or preview play
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Stop audio on unmount
  useEffect(() => {
    return () => {
      weddingAudio.stop();
    };
  }, []);

  const handleToggleAudio = () => {
    const isPlaying = weddingAudio.toggle(templateKey);
    setIsPlayingAudio(isPlaying);
  };

  // Screen names for thumbnail gallery (matching screenshot 5)
  const screens = [
    { id: 0, label: 'Sampul', desc: 'Cover & Pembuka' },
    { id: 1, label: 'Mempelai', desc: 'Profil Pengantin' },
    { id: 2, label: 'Waktu & Lokasi', desc: 'Jadwal Acara & Maps' },
    { id: 3, label: 'Galeri', desc: 'Foto & Cerita Cinta' },
    { id: 4, label: 'Amplop', desc: 'Kado & RSVP Online' }
  ];

  // Reviews data (7 reviews)
  const reviews = [
    {
      id: 'rev-1',
      name: 'Irna & Rian',
      rating: 5,
      date: '2 minggu lalu',
      comment: 'Bagus banget temanya! Nuansa sage green-nya sangat adem dan elegan, ornamen victorian arch-nya bikin banyak keluarga besar kagum pas buka undangannya. Musik piringan hitamnya juga berjalan lancar!',
      verified: true
    },
    {
      id: 'rev-2',
      name: 'Adinda Pratiwi',
      rating: 5,
      date: '1 bulan lalu',
      comment: 'Template ini bener-bener lifesaver! Edit teksnya gampang banget di editor, tinggal klik langsung ganti nama kami. Pas disebar ke WhatsApp semua teman-teman bilang mewah kayak web luar negeri.',
      verified: true
    },
    {
      id: 'rev-3',
      name: 'Bram & Nabila',
      rating: 5,
      date: '1 bulan lalu',
      comment: 'Fitur amplop digital dan petunjuk arah Google Maps-nya sangat membantu tamu. Tidak ada yang nyasar saat datang ke Pine Hill Bandung.',
      verified: true
    },
    {
      id: 'rev-4',
      name: 'Kevin Wijaya',
      rating: 5,
      date: '2 bulan lalu',
      comment: 'Pelayanan CS-nya ramah sekali saat kami tanya cara custom backsound. Undangan responsive di iPhone maupun Android.',
      verified: true
    },
    {
      id: 'rev-5',
      name: 'Siti Sarah & Rizky',
      rating: 5,
      date: '2 bulan lalu',
      comment: 'Packaging sample fisiknya juga mewah banget pakai beludru. Desain web Green Leaf ini beneran selaras sama konsep outdoor party kami.',
      verified: true
    },
    {
      id: 'rev-6',
      name: 'dr. Farhan',
      rating: 5,
      date: '3 bulan lalu',
      comment: 'Sangat recommended untuk pasangan yang ingin undangan berkelas tanpa repot. Countdown timernya akurat dan fiturnya komplit.',
      verified: true
    },
    {
      id: 'rev-7',
      name: 'Tiara & Fajar',
      rating: 5,
      date: '3 bulan lalu',
      comment: 'Desainnya clean, aesthetic, dan tidak norak. Banyak tamu yang ngira kami sewa software house mahal untuk buat ini.',
      verified: true
    }
  ];

  const handleOpenEditor = () => {
    router.push(`/editor?theme=${templateKey}`);
  };

  const handleOpenLiveDemo = () => {
    window.open(`/dimas-clarissa?theme=${templateKey}&to=Bapak+Budi`, '_blank');
  };

  const handleWhatsAppConsult = () => {
    const text = encodeURIComponent(
      `Halo Tim HariNikah, saya tertarik dengan tema undangan *${theme.name}* (Paket: ${selectedVariation === 'dengan_foto' ? 'Dengan Foto' : 'Tanpa Foto'} - Rp ${currentPrice.toLocaleString('id-ID')}). Mohon info panduan pemesanannya.`
    );
    window.open(`https://wa.me/6281234567890?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-stone-900 font-sans selection:bg-[#B8935D] selection:text-white">
      {/* 1. Header / Navbar */}
      <Navbar
        onOpenAuth={() => router.push('/editor')}
        onOpenSampleModal={() => {}}
        onOpenEditor={handleOpenEditor}
        onOpenDiscount={() => {}}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-stone-500 mb-6">
          <Link href="/" className="hover:text-amber-800 transition-colors">Beranda</Link>
          <span>/</span>
          <Link href="/#katalog" className="hover:text-amber-800 transition-colors">Katalog</Link>
          <span>/</span>
          <span className="font-semibold text-stone-900 uppercase tracking-wider">{theme.name}</span>
        </nav>

        {/* TOP SECTION: Left Thumbnails + Center Phone Mockup + Right Product Info (Matching Image 5) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* COLUMN 1 & 2: Vertical Thumbnails + Center Smartphone Mockup (lg:col-span-7) */}
          <div className="lg:col-span-7 bg-[#EDF0EC] p-6 sm:p-10 rounded-3xl border border-[#D5DCD4] flex flex-col sm:flex-row items-center justify-center gap-6 shadow-sm">
            
            {/* Vertical Thumbnail Strip (Left) */}
            <div className="flex sm:flex-col gap-3 order-2 sm:order-1 overflow-x-auto sm:overflow-visible max-w-full pb-2 sm:pb-0">
              {screens.map((screen) => {
                const isActive = activeScreenIndex === screen.id;
                return (
                  <button
                    key={screen.id}
                    onClick={() => setActiveScreenIndex(screen.id)}
                    className={`group relative rounded-xl overflow-hidden border-2 transition-all p-1 text-left flex-shrink-0 cursor-pointer ${
                      isActive
                        ? 'border-[#4A5D4E] bg-white ring-2 ring-[#4A5D4E]/30 shadow-md'
                        : 'border-[#CBD5C9] bg-white/70 hover:border-[#4A5D4E]/60 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <div className="w-14 h-20 rounded-lg overflow-hidden relative flex flex-col items-center justify-center text-center p-1 bg-[#F4F7F4] border border-[#E0E7DE]">
                      {screen.id === 0 && (
                        <div className="w-full h-full flex flex-col items-center justify-center p-1 bg-[#4A5D4E] text-white">
                          <span className="text-[7px] uppercase font-bold tracking-wider">Cover</span>
                          <span className="text-[8px] font-serif font-bold text-amber-200 mt-1">Irna & Rian</span>
                        </div>
                      )}
                      {screen.id === 1 && (
                        <div className="w-full h-full flex flex-col items-center justify-center p-1 bg-[#F4F7F4] text-[#4A5D4E]">
                          <div className="w-5 h-6 rounded-full border border-[#4A5D4E] mx-auto mb-0.5" />
                          <span className="text-[7px] font-bold">Mempelai</span>
                        </div>
                      )}
                      {screen.id === 2 && (
                        <div className="w-full h-full flex flex-col items-center justify-center p-1 bg-[#4A5D4E] text-white">
                          <Calendar className="w-3.5 h-3.5 text-amber-300 mb-0.5" />
                          <span className="text-[7px] font-bold">Akad</span>
                        </div>
                      )}
                      {screen.id === 3 && (
                        <div className="w-full h-full flex flex-col items-center justify-center p-1 bg-[#F4F7F4] text-[#4A5D4E]">
                          <div className="grid grid-cols-2 gap-0.5 w-full">
                            <div className="h-4 bg-[#8DA390]/40 rounded-sm" />
                            <div className="h-4 bg-[#8DA390]/40 rounded-sm" />
                          </div>
                          <span className="text-[6px] font-bold mt-1">Galeri</span>
                        </div>
                      )}
                      {screen.id === 4 && (
                        <div className="w-full h-full flex flex-col items-center justify-center p-1 bg-[#4A5D4E] text-white">
                          <CreditCard className="w-3.5 h-3.5 text-amber-300 mb-0.5" />
                          <span className="text-[7px] font-bold">Amplop</span>
                        </div>
                      )}
                    </div>
                    <span className="sr-only">{screen.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Center Realistic Smartphone Mockup Frame */}
            <div className="order-1 sm:order-2 w-full max-w-[310px] aspect-[9/18.5] bg-[#1a1a1a] rounded-[48px] p-3 shadow-2xl ring-1 ring-black/40 relative flex flex-col">
              
              {/* Outer Speaker & Dynamic Island Notch */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-30 flex items-center justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-stone-800" />
                <div className="w-2.5 h-2.5 rounded-full bg-stone-900 border border-stone-800" />
              </div>

              {/* Inner Smartphone Screen Container */}
              <div className="w-full h-full bg-[#4A5D4E] rounded-[38px] overflow-hidden relative flex flex-col text-stone-100 select-none shadow-inner border border-stone-700/30">
                
                {/* SCREEN 0: SAMPUL / COVER (Matching Screenshot 2 & 3) */}
                {activeScreenIndex === 0 && (
                  <div className="w-full h-full p-4 flex flex-col justify-between items-center text-center relative bg-gradient-to-b from-[#3E5042] via-[#4A5D4E] to-[#2D3B31]">
                    {/* Top Botanical Leaves */}
                    <div className="absolute top-2 left-2 pointer-events-none">
                      <BotanicalCornerOrnament position="top-left" className="w-10 h-10 opacity-70" />
                    </div>
                    <div className="absolute top-2 right-2 pointer-events-none">
                      <BotanicalCornerOrnament position="top-right" className="w-10 h-10 opacity-70" />
                    </div>

                    <div className="pt-6">
                      <span className="text-[9px] uppercase tracking-[0.25em] text-[#D8E2D9] font-medium">The Wedding of</span>
                    </div>

                    {/* Victorian Scalloped Arched Frame */}
                    <BotanicalArchFrame className="w-full max-w-[240px] my-auto py-6 px-4">
                      <p className="text-[9px] uppercase tracking-[0.25em] text-amber-200 font-semibold mb-2">Pernikahan</p>
                      <h2 className="text-2xl font-serif font-bold text-white tracking-wide">
                        Irna
                      </h2>
                      <span className="text-sm font-serif italic text-amber-200 block my-1">&</span>
                      <h2 className="text-2xl font-serif font-bold text-white tracking-wide">
                        Rian
                      </h2>
                      <div className="w-12 h-px bg-amber-300/40 mx-auto my-3" />
                      <p className="text-[10px] text-stone-200 font-medium">
                        Minggu, 27 April 2025
                      </p>
                    </BotanicalArchFrame>

                    {/* Guest Invitation Box */}
                    <div className="w-full px-3 pb-2 space-y-2">
                      <div className="bg-black/40 border border-white/10 rounded-xl p-2 text-center backdrop-blur-sm">
                        <span className="text-[8px] text-stone-300 block">Kepada Yth. Tamu Undangan:</span>
                        <span className="text-[11px] font-bold text-amber-300">Bapak Budi & Rekan</span>
                      </div>

                      <button
                        onClick={handleOpenLiveDemo}
                        className="w-full py-2.5 rounded-full bg-gradient-to-r from-amber-400 via-gold-300 to-amber-500 text-stone-950 font-bold text-[10px] uppercase tracking-wider shadow-lg flex items-center justify-center gap-1.5"
                      >
                        <Heart className="w-3 h-3 fill-stone-950" />
                        <span>Buka Undangan</span>
                      </button>
                    </div>

                    {/* Rotating Vinyl Disc Badge at Bottom Left (Feature 6) */}
                    <div className="absolute bottom-3 left-3 z-30">
                      <VinylMusicBadge
                        isPlaying={isPlayingAudio}
                        onToggle={handleToggleAudio}
                        className="scale-90"
                      />
                    </div>
                  </div>
                )}

                {/* SCREEN 1: MEMPELAI / BRIDE & GROOM (Matching Screenshot 5 Center Phone) */}
                {activeScreenIndex === 1 && (
                  <div className="w-full h-full p-4 flex flex-col justify-between items-center text-center relative bg-[#F4F7F4] text-stone-900 overflow-y-auto">
                    <div className="pt-5 space-y-1">
                      <span className="text-[9px] uppercase tracking-[0.2em] text-[#4A5D4E] font-bold">Mempelai yang Berbahagia</span>
                      <h3 className="text-base font-serif font-bold text-stone-900">Irna & Rian</h3>
                    </div>

                    {/* Mempelai Wanita Oval Frame */}
                    <div className="my-2 space-y-1">
                      <div className="w-20 h-28 mx-auto rounded-[50%] p-1 border-2 border-[#4A5D4E] shadow-md overflow-hidden bg-white">
                        <img
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
                          alt="Irna Agustiani"
                          className="w-full h-full object-cover rounded-[50%]"
                        />
                      </div>
                      <h4 className="text-xs font-bold text-[#2D3B31]">Irna Agustiani, S.Pd.</h4>
                      <p className="text-[8px] text-stone-600 leading-tight">Putri dari Bpk. H. Agus & Ibu Hj. Tini</p>
                    </div>

                    {/* Mempelai Pria Oval Frame */}
                    <div className="my-2 space-y-1">
                      <div className="w-20 h-28 mx-auto rounded-[50%] p-1 border-2 border-[#4A5D4E] shadow-md overflow-hidden bg-white">
                        <img
                          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
                          alt="Rian Firmansyah"
                          className="w-full h-full object-cover rounded-[50%]"
                        />
                      </div>
                      <h4 className="text-xs font-bold text-[#2D3B31]">Rian Firmansyah, S.T.</h4>
                      <p className="text-[8px] text-stone-600 leading-tight">Putra dari Bpk. Ir. Rahmat & Ibu Dra. Siti</p>
                    </div>

                    {/* Bottom Vinyl Music Badge */}
                    <div className="absolute bottom-3 left-3 z-30">
                      <VinylMusicBadge
                        isPlaying={isPlayingAudio}
                        onToggle={handleToggleAudio}
                        className="scale-90"
                      />
                    </div>
                  </div>
                )}

                {/* SCREEN 2: WAKTU & LOKASI ACARA */}
                {activeScreenIndex === 2 && (
                  <div className="w-full h-full p-4 flex flex-col justify-between items-center text-center relative bg-[#3E5042] text-white">
                    <div className="pt-6">
                      <span className="text-[9px] uppercase tracking-[0.2em] text-amber-200 font-bold">Rangkaian Hari Bahagia</span>
                      <h3 className="text-base font-serif font-bold text-white mt-1">Akad & Resepsi</h3>
                    </div>

                    <div className="space-y-3 w-full my-auto px-1">
                      <div className="bg-[#2D3B31]/80 border border-white/10 rounded-2xl p-3 text-left">
                        <span className="text-[8px] text-amber-300 font-bold uppercase tracking-wider block">Akad Nikah</span>
                        <p className="text-xs font-bold text-white mt-0.5">Minggu, 27 April 2025</p>
                        <p className="text-[9px] text-stone-300">Pukul 08.00 - 10.00 WIB</p>
                        <p className="text-[9px] text-stone-400 mt-1">Pine Hill Garden Pavilion, Bandung</p>
                      </div>

                      <div className="bg-[#2D3B31]/80 border border-white/10 rounded-2xl p-3 text-left">
                        <span className="text-[8px] text-amber-300 font-bold uppercase tracking-wider block">Resepsi Pernikahan</span>
                        <p className="text-xs font-bold text-white mt-0.5">Minggu, 27 April 2025</p>
                        <p className="text-[9px] text-stone-300">Pukul 11.00 - 14.00 WIB</p>
                        <p className="text-[9px] text-stone-400 mt-1">Pine Hill Garden Ballroom, Bandung</p>
                      </div>
                    </div>

                    <div className="w-full pb-2">
                      <a
                        href="https://maps.google.com"
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-2 rounded-xl bg-amber-400 text-stone-950 font-bold text-[9px] uppercase tracking-wider shadow-md flex items-center justify-center gap-1"
                      >
                        <MapPin className="w-3 h-3" />
                        <span>Buka Google Maps</span>
                      </a>
                    </div>

                    {/* Rotating Vinyl Disc Badge at Bottom Left */}
                    <div className="absolute bottom-3 left-3 z-30">
                      <VinylMusicBadge
                        isPlaying={isPlayingAudio}
                        onToggle={handleToggleAudio}
                        className="scale-90"
                      />
                    </div>
                  </div>
                )}

                {/* SCREEN 3: GALERI & LOVE STORY */}
                {activeScreenIndex === 3 && (
                  <div className="w-full h-full p-4 flex flex-col justify-between items-center text-center relative bg-[#2D3B31] text-white">
                    <div className="pt-6">
                      <span className="text-[9px] uppercase tracking-[0.2em] text-amber-200 font-bold">Galeri Prewedding 4K</span>
                      <h3 className="text-base font-serif font-bold text-white mt-1">Momen Romantis</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-2 w-full my-auto">
                      <div className="aspect-square rounded-xl overflow-hidden border border-white/10">
                        <img src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80" alt="Prewed 1" className="w-full h-full object-cover" />
                      </div>
                      <div className="aspect-square rounded-xl overflow-hidden border border-white/10">
                        <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=400&q=80" alt="Prewed 2" className="w-full h-full object-cover" />
                      </div>
                      <div className="aspect-square rounded-xl overflow-hidden border border-white/10">
                        <img src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=400&q=80" alt="Prewed 3" className="w-full h-full object-cover" />
                      </div>
                      <div className="aspect-square rounded-xl overflow-hidden border border-white/10">
                        <img src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=400&q=80" alt="Prewed 4" className="w-full h-full object-cover" />
                      </div>
                    </div>

                    <p className="text-[8px] text-stone-300 pb-2 italic">
                      "Dua hati, satu janji suci selamanya."
                    </p>

                    {/* Rotating Vinyl Disc Badge at Bottom Left */}
                    <div className="absolute bottom-3 left-3 z-30">
                      <VinylMusicBadge
                        isPlaying={isPlayingAudio}
                        onToggle={handleToggleAudio}
                        className="scale-90"
                      />
                    </div>
                  </div>
                )}

                {/* SCREEN 4: AMPLOP DIGITAL & RSVP */}
                {activeScreenIndex === 4 && (
                  <div className="w-full h-full p-4 flex flex-col justify-between items-center text-center relative bg-[#3E5042] text-white">
                    <div className="pt-6">
                      <span className="text-[9px] uppercase tracking-[0.2em] text-amber-200 font-bold">Tanda Kasih & Doa</span>
                      <h3 className="text-base font-serif font-bold text-white mt-1">Amplop Digital</h3>
                    </div>

                    <div className="bg-[#2D3B31]/90 border border-white/10 rounded-2xl p-3 w-full text-left my-auto space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-bold text-amber-300">BCA Transfer</span>
                        <span className="text-[7px] text-stone-400">Digital Gift</span>
                      </div>
                      <p className="text-xs font-mono font-bold text-white">8820 1234 5678</p>
                      <p className="text-[8px] text-stone-300">a.n. IRNA AGUSTIANI</p>
                      <div className="pt-1">
                        <span className="text-[8px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-bold inline-block">
                          ✓ Salin Nomor Rekening
                        </span>
                      </div>
                    </div>

                    <div className="w-full pb-2">
                      <span className="text-[8px] text-stone-300 block mb-1">Live RSVP & Konfirmasi Tamu</span>
                      <button
                        onClick={handleOpenLiveDemo}
                        className="w-full py-2 rounded-xl bg-gradient-to-r from-amber-400 via-gold-300 to-amber-500 text-stone-950 font-bold text-[9px] uppercase tracking-wider shadow-md"
                      >
                        Kirim Doa & Hadir
                      </button>
                    </div>

                    {/* Rotating Vinyl Disc Badge at Bottom Left */}
                    <div className="absolute bottom-3 left-3 z-30">
                      <VinylMusicBadge
                        isPlaying={isPlayingAudio}
                        onToggle={handleToggleAudio}
                        className="scale-90"
                      />
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>

          {/* COLUMN 3: Product Metadata, Variations & CTAs (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Title & Price */}
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight">
                {theme.name}
              </h1>

              {/* Price & Rating */}
              <div className="mt-3 flex items-baseline gap-3">
                {theme.originalPrice && (
                  <span className="text-sm sm:text-base text-stone-400 line-through">
                    Rp {theme.originalPrice.toLocaleString('id-ID')}
                  </span>
                )}
                <span className="text-2xl sm:text-3xl font-extrabold text-[#B08A56]">
                  Rp {currentPrice.toLocaleString('id-ID')}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 text-xs font-bold">
                  HEMAT 37%
                </span>
              </div>

              {/* Star Rating & Sales */}
              <div className="mt-2.5 flex items-center gap-2 text-xs">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="font-bold text-stone-800">({theme.rating || 5.0})</span>
                <span className="text-stone-400">•</span>
                <span className="text-stone-600 font-medium">{theme.salesCount || 28} Terjual</span>
                <span className="text-stone-400">•</span>
                <span className="text-stone-600 font-medium">{theme.reviewCount || 7} Review</span>
              </div>

              <p className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed italic">
                "{theme.description}"
              </p>
            </div>

            {/* Pilih Paket / Variasi (Matching screenshot 5) */}
            <div className="space-y-2.5 pt-2 border-t border-stone-200">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                Pilih Paket / Variasi
              </label>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedVariation('tanpa_foto')}
                  className={`p-3 rounded-2xl border-2 text-center transition-all cursor-pointer ${
                    selectedVariation === 'tanpa_foto'
                      ? 'border-[#B08A56] bg-amber-50/60 ring-2 ring-[#B08A56]/20'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <span className="block text-xs font-bold text-stone-900">Tanpa Foto</span>
                  <span className="block text-xs font-extrabold text-[#B08A56] mt-1">
                    Rp {basePrice.toLocaleString('id-ID')}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedVariation('dengan_foto')}
                  className={`p-3 rounded-2xl border-2 text-center transition-all cursor-pointer ${
                    selectedVariation === 'dengan_foto'
                      ? 'border-[#B08A56] bg-amber-50/60 ring-2 ring-[#B08A56]/20'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <span className="block text-xs font-bold text-stone-900">Dengan Foto</span>
                  <span className="block text-xs font-extrabold text-[#B08A56] mt-1">
                    Rp {(basePrice + 30000).toLocaleString('id-ID')}
                  </span>
                </button>
              </div>
            </div>

            {/* Action Buttons: LIHAT DEMO, KERANJANG, CHECKOUT */}
            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={handleOpenLiveDemo}
                className="w-full py-3.5 rounded-xl bg-stone-900 hover:bg-black text-white font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01]"
              >
                <Eye className="w-4 h-4" />
                <span>Lihat Demo Live Interaktif</span>
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleOpenEditor}
                  className="py-3.5 rounded-xl bg-[#B8935D] hover:bg-[#A8824C] text-stone-950 font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01]"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Buka di Editor</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppConsult}
                  className="py-3.5 rounded-xl bg-[#987844] hover:bg-[#866838] text-white font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01]"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Pesan via CS WA</span>
                </button>
              </div>
            </div>

            {/* FITUR UNGGULAN Checklist (Matching screenshot 5) */}
            <div className="pt-4 border-t border-stone-200 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-900 block">
                Fitur Unggulan
              </span>

              <div className="space-y-2.5 text-xs text-stone-700">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Entrance Animation:</strong> Tampilan animasi pembuka amplop mewah berstempel lilin saat pertama kali dibuka.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Countdown Timer Live:</strong> Hitungan mundur real-time menuju akad & resepsi hari H.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Save The Date:</strong> 1-klik simpan ke Google Calendar & iCal Apple.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Rotating Vinyl Music:</strong> Pemutar musik eksklusif piringan hitam di pojok layar.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Amplop Digital & QRIS:</strong> Salin nomor rekening kilat & scan QRIS instan.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>RSVP & Buku Tamu:</strong> Konfirmasi kehadiran tamu & papan ucapan doa real-time.</span>
                </div>
              </div>
            </div>

            {/* Trust Assurance Badge */}
            <div className="p-3.5 rounded-2xl bg-white border border-stone-200 flex items-center gap-3 text-xs text-stone-600">
              <ShieldCheck className="w-6 h-6 text-emerald-600 flex-shrink-0" />
              <div>
                <span className="font-bold text-stone-900 block">Garansi Masa Aktif Selamanya</span>
                <span>Undangan dapat diakses kapan saja tanpa masa kedaluwarsa.</span>
              </div>
            </div>

          </div>

        </div>

        {/* BOTTOM TABS: DESKRIPSI | INFORMASI TAMBAHAN | REVIEW (7) (Matching screenshot 5) */}
        <section className="mt-16 pt-8 border-t border-stone-200">
          
          {/* Tabs Navigation Header */}
          <div className="flex items-center justify-center gap-8 border-b border-stone-200">
            <button
              onClick={() => setActiveTab('deskripsi')}
              className={`pb-4 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all relative ${
                activeTab === 'deskripsi'
                  ? 'text-stone-900'
                  : 'text-stone-400 hover:text-stone-700'
              }`}
            >
              Deskripsi
              {activeTab === 'deskripsi' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-900" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('informasi')}
              className={`pb-4 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all relative ${
                activeTab === 'informasi'
                  ? 'text-stone-900'
                  : 'text-stone-400 hover:text-stone-700'
              }`}
            >
              Informasi Tambahan
              {activeTab === 'informasi' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-900" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('review')}
              className={`pb-4 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all relative ${
                activeTab === 'review'
                  ? 'text-stone-900'
                  : 'text-stone-400 hover:text-stone-700'
              }`}
            >
              Review ({reviews.length})
              {activeTab === 'review' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-900" />
              )}
            </button>
          </div>

          {/* Tab Content 1: Deskripsi */}
          {activeTab === 'deskripsi' && (
            <div className="max-w-3xl mx-auto py-10 text-center space-y-4">
              <p className="text-sm sm:text-base leading-relaxed text-stone-600">
                {theme.longDescription ||
                  "Green Leaf dirancang untuk pasangan yang menyukai ketenangan dan kesederhanaan alam yang abadi. Mengusung nuansa hijau sage yang teduh, bingkai arsitektur klasik, serta sentuhan flora botanical yang segar, tema ini menghadirkan suasana yang tenang dan anggun. Sebuah cara yang santun dan berkesan untuk mengajak serta merayakan momen istimewa dua insan tercinta di hari bahagianya."}
              </p>
              <p className="text-xs text-stone-500 italic">
                Sangat ideal untuk perayaan pernikahan outdoor garden party, villa pavilion, ballroom bernuansa botanical, maupun akad nikah syahdu.
              </p>
            </div>
          )}

          {/* Tab Content 2: Informasi Tambahan */}
          {activeTab === 'informasi' && (
            <div className="max-w-2xl mx-auto py-10">
              <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
                <table className="w-full text-xs">
                  <tbody>
                    <tr className="border-b border-stone-100">
                      <td className="px-5 py-3.5 font-bold text-stone-700 bg-stone-50 w-1/3">Gaya Desain</td>
                      <td className="px-5 py-3.5 text-stone-600">Botanical Sage Garden & Victorian Arch Window</td>
                    </tr>
                    <tr className="border-b border-stone-100">
                      <td className="px-5 py-3.5 font-bold text-stone-700 bg-stone-50">Nuansa Warna</td>
                      <td className="px-5 py-3.5 text-stone-600">Sage Green (#4A5D4E), Soft Botanical Ivory (#F4F7F4), Gold Foil</td>
                    </tr>
                    <tr className="border-b border-stone-100">
                      <td className="px-5 py-3.5 font-bold text-stone-700 bg-stone-50">Musik Latar</td>
                      <td className="px-5 py-3.5 text-stone-600">Pastoral Romantic Harp & Cello G-Major Melodies</td>
                    </tr>
                    <tr className="border-b border-stone-100">
                      <td className="px-5 py-3.5 font-bold text-stone-700 bg-stone-50">Kompatibilitas Layar</td>
                      <td className="px-5 py-3.5 text-stone-600">100% Responsif di iOS (iPhone/iPad), Android, Tablet, & Laptop</td>
                    </tr>
                    <tr className="border-b border-stone-100">
                      <td className="px-5 py-3.5 font-bold text-stone-700 bg-stone-50">Masa Aktif</td>
                      <td className="px-5 py-3.5 text-emerald-600 font-bold">Aktif Selamanya (Tanpa Batas Waktu)</td>
                    </tr>
                    <tr>
                      <td className="px-5 py-3.5 font-bold text-stone-700 bg-stone-50">Kuota Nama Tamu</td>
                      <td className="px-5 py-3.5 text-stone-600">Unlimited (Bebas Tambah Nama Tamu Tanpa Biaya Tambahan)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab Content 3: Review Pelanggan */}
          {activeTab === 'review' && (
            <div className="max-w-3xl mx-auto py-10 space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                <span className="text-sm font-bold text-stone-900">Ulasan Pasangan Berbahagia</span>
                <span className="text-xs text-amber-600 font-bold">★★★★★ 5.0 Rata-rata dari 7 Ulasan</span>
              </div>

              <div className="space-y-4">
                {reviews.map((rev) => (
                  <div key={rev.id} className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm text-left">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-stone-900">{rev.name}</span>
                        {rev.verified && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                            ✓ Terverifikasi
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-stone-400">{rev.date}</span>
                    </div>

                    <div className="flex items-center text-amber-400 mt-1">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>

                    <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                      "{rev.comment}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </section>

        {/* SHOWCASE VIDEO PREVIEW BANNER (Matching screenshot 5) */}
        <section className="mt-14 max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#B08A56] block">
              PREVIEW UNDANGAN
            </span>
            <h3 className="text-2xl font-bold uppercase tracking-wider text-stone-900 mt-1">
              SHOWCASE VIDEO
            </h3>
          </div>

          <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl border border-stone-300 group bg-stone-900">
            {/* Background preview image */}
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80"
              alt="Video Showcase"
              className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
            />

            {/* Play Button Overlay */}
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-6 text-center text-white">
              <button
                onClick={handleOpenLiveDemo}
                className="w-16 h-16 rounded-full bg-[#B8935D] text-stone-950 flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all mb-3 cursor-pointer ring-4 ring-white/30"
              >
                <Play className="w-7 h-7 fill-stone-950 ml-1" />
              </button>
              <h4 className="text-base sm:text-lg font-bold text-white tracking-wide">
                Video Preview: {theme.name}
              </h4>
              <p className="text-xs text-stone-300 mt-1 max-w-md">
                Dapatkan gambaran detail fitur, transisi per-halaman, serta alunan melodi piringan hitam interaktif tema ini.
              </p>
            </div>
          </div>
        </section>

        {/* LENGKAPI DENGAN PRODUK LAINNYA (Matching screenshot 5) */}
        <section className="mt-20">
          <div className="text-center max-w-xl mx-auto mb-10">
            <div className="w-8 h-8 rounded-full bg-stone-200 text-stone-700 mx-auto flex items-center justify-center mb-2">
              <Sparkles className="w-4 h-4 text-amber-700" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-stone-900">
              Lengkapi Dengan Produk Lainnya
            </h3>
            <p className="text-[11px] text-stone-500 uppercase tracking-widest mt-1">
              Padukan undangan website kalian dengan produk sejenis lain untuk kesan yang lebih intim
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {CATALOG_THEMES.filter(t => t.slug !== theme.slug).slice(0, 4).map((item) => (
              <Link
                key={item.id}
                href={`/katalog/${item.slug || 'green-leaf'}`}
                className="group rounded-2xl bg-white border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col text-center p-3"
              >
                <div className="aspect-[3/4] rounded-xl overflow-hidden bg-stone-100 relative mb-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 bg-black/70 text-[9px] font-bold text-amber-300 px-2 py-0.5 rounded-full">
                    {item.tag}
                  </div>
                </div>

                <h4 className="text-xs font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                  {item.name}
                </h4>

                <p className="text-xs font-extrabold text-[#B08A56] mt-1">
                  Rp {(item.price || 113400).toLocaleString('id-ID')}
                </p>

                <div className="flex items-center justify-center text-amber-400 gap-1 text-[10px] mt-1">
                  <Star className="w-3 h-3 fill-amber-400" />
                  <span className="font-bold text-stone-700">{item.rating || 5.0}</span>
                  <span className="text-stone-400">({item.salesCount || 10} Terjual)</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
