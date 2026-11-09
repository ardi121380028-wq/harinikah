'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useInvitation } from '../../context/InvitationContext';
import { 
  Layers, 
  Type, 
  Palette, 
  Music, 
  Gift, 
  Calendar, 
  MapPin, 
  Heart, 
  Plus, 
  Trash2, 
  Copy, 
  Eye, 
  EyeOff,
  Share2, 
  Sparkles, 
  ZoomIn, 
  ZoomOut, 
  Play, 
  Pause, 
  ArrowLeft,
  Download,
  Globe,
  Check,
  X,
  ExternalLink,
  Smartphone,
  Monitor,
  CheckCircle2,
  Clock,
  Tag,
  Sliders,
  ChevronRight,
  Edit3,
  PanelLeftClose,
  PanelLeftOpen,
  Crown,
  Sun,
  Moon
} from 'lucide-react';
import { TEMPLATE_PRESETS } from '../../constants/initialData';
import { 
  GununganWayang, 
  SuntiangMinang, 
  BatikParangDivider, 
  MinangUkiranDivider,
  JawaCornerOrnament,
  MinangCornerOrnament,
  ModernCornerOrnament,
  RumahGadangMotif,
  KawungMotifDivider,
  RonceMelatiDivider,
  BotanicalFoilDivider,
  CardFrameBorder,
  BotanicalCornerOrnament,
  BotanicalArchFrame
} from '../../components/cultural/CulturalOrnaments';
import { weddingAudio } from '../../utils/audioEngine';
import { OnboardingWizardModal } from '../../components/modals/OnboardingWizardModal';
import { DiscountGiftModal } from '../../components/modals/DiscountGiftModal';
import { ActivationModal } from '../../components/modals/ActivationModal';
import type { CulturalTemplate } from '../../types';

export default function EditorPage() {
  const router = useRouter();
  const {
    pages,
    activePageIndex,
    setActivePageIndex,
    updatePageData,
    updatePageTheme,
    addPage,
    duplicatePage,
    deletePage,
    currentTemplate,
    applyTemplate,
    themeMode,
    toggleThemeMode,
    slug,
    title,
    setTitle,
    guestName,
    setGuestName,
    exportJSON,
    exportHTML,
    publishInvitation,
  } = useInvitation();

  const isLight = themeMode === 'light';

  // Navigation & View States
  const [activeTab, setActiveTab] = useState<'wizard' | 'templates' | 'pages' | 'text' | 'couple' | 'events' | 'theme' | 'gift' | 'music'>('templates');
  const [viewMode, setViewMode] = useState<'cover' | 'content'>('cover');
  const [deviceMode, setDeviceMode] = useState<'mobile' | 'desktop'>('mobile');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [leftPanelOpen, setLeftPanelOpen] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const [rightPanelTab, setRightPanelTab] = useState<'sections' | 'layers'>('sections');
  
  // Element Click-to-Edit State
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);

  // Modals
  const [showPublishModal, setShowPublishModal] = useState<boolean>(false);
  const [showOnboardingModal, setShowOnboardingModal] = useState<boolean>(false);
  const [showDiscountModal, setShowDiscountModal] = useState<boolean>(false);
  const [showActivationModal, setShowActivationModal] = useState<boolean>(false);
  
  // Interactive UI states
  const [copiedLink, setCopiedLink] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [hiddenSections, setHiddenSections] = useState<Record<string, boolean>>({});
  
  // Pricing & Activation state
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'premium' | 'exclusive' | 'dfy'>('premium');
  const [paymentMethod, setPaymentMethod] = useState<'auto' | 'manual'>('auto');
  const [voucherTimer, setVoucherTimer] = useState('47:59:30');

  const activePage = pages[activePageIndex] || pages[0];

  useEffect(() => {
    try {
      const search = window.location.search;
      if (search) {
        const urlParams = new URLSearchParams(search);
        const tplParam = urlParams.get('theme') as CulturalTemplate | null;
        if (tplParam && TEMPLATE_PRESETS[tplParam]) {
          applyTemplate(tplParam);
        }
      }
    } catch (e) {}

    return () => {
      weddingAudio.stop();
    };
  }, []);

  // DIRECT CLICK-TO-EDIT HANDLER:
  // When an element on the canvas is clicked, highlight it, switch tab, and focus the input!
  const handleSelectElement = (fieldId: string, tab: typeof activeTab, pageIdx?: number) => {
    setSelectedElementId(fieldId);
    if (pageIdx !== undefined && pageIdx !== activePageIndex) {
      setActivePageIndex(pageIdx);
    }
    setActiveTab(tab);
    setLeftPanelOpen(true);

    setTimeout(() => {
      const el = document.getElementById(`input-${fieldId}`);
      if (el) {
        el.focus();
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 120);
  };

  // Toggle background sound
  const handleToggleMusic = () => {
    const isNowPlaying = weddingAudio.toggle(currentTemplate);
    setIsPlayingMusic(isNowPlaying);
  };

  const handleTemplateSwitch = (tpl: CulturalTemplate) => {
    applyTemplate(tpl);
    if (isPlayingMusic) {
      weddingAudio.stop();
      weddingAudio.play(tpl);
    }
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.5 },
        colors: tpl === 'jawa' ? ['#C6923C', '#E6BA64', '#FAF5EC'] : tpl === 'minang' ? ['#E0B042', '#B91C1C', '#FDE047'] : ['#dfb051', '#34d399', '#ffffff']
      });
    } catch (e) {}
  };

  const handlePublish = () => {
    publishInvitation();
    setShowPublishModal(true);
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#dfb051', '#34d399', '#ffffff']
      });
    } catch (e) {}
  };

  const toggleSectionVisibility = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setHiddenSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const livePublicUrl = `http://localhost:3000/${slug}?to=${encodeURIComponent(guestName)}`;

  // Quick switch between Sampul (Page 0) and Isi Undangan (Page 1)
  const handleViewModeToggle = (mode: 'cover' | 'content') => {
    setViewMode(mode);
    if (mode === 'cover') {
      setActivePageIndex(0);
    } else {
      if (activePageIndex === 0) setActivePageIndex(1);
    }
  };

  const isJawa = currentTemplate === 'jawa';
  const isMinang = currentTemplate === 'minang';
  const isBotanical = currentTemplate === 'botanical';

  // Helper styles for selected element border
  const getElementOutline = (fieldId: string) => {
    const isSelected = selectedElementId === fieldId;
    return `relative transition-all cursor-pointer rounded-lg p-1 ${
      isSelected
        ? 'outline outline-2 outline-amber-400 bg-amber-400/20 ring-4 ring-amber-400/30 shadow-lg'
        : 'hover:outline hover:outline-1 hover:outline-amber-400/60 hover:bg-amber-400/10'
    }`;
  };

  return (
    <div className={`h-screen w-screen flex flex-col overflow-hidden font-sans select-none transition-colors duration-300 ${
      isLight ? 'bg-[#FAF8F5] text-stone-900' : 'bg-[#051817] text-stone-100'
    }`}>
      
      {/* =========================================================================
          1. TOP CANVA-STYLE NAVIGATION BAR
          ========================================================================= */}
      <header className={`h-16 border-b px-3 sm:px-5 flex items-center justify-between z-30 flex-shrink-0 transition-colors ${
        isLight ? 'bg-white border-[#E5DAC6] text-stone-900 shadow-sm' : 'bg-[#041514] border-gold-subtle text-stone-100'
      }`}>
        
        {/* Left: Brand Return & Auto-Save Indicator */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => router.push('/')}
            className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 sm:px-3 py-1.5 rounded-xl border transition-colors ${
              isLight
                ? 'text-stone-700 hover:text-stone-900 border-amber-300 hover:bg-amber-50'
                : 'text-stone-300 hover:text-white border-gold-subtle hover:bg-white/5'
            }`}
          >
            <ArrowLeft className={`w-3.5 h-3.5 ${isLight ? 'text-amber-700' : 'text-gold-400'}`} />
            <span className="hidden sm:inline">Beranda</span>
          </button>

          {/* Toggle Left Sidebar on Mobile/Desktop */}
          <button
            onClick={() => setLeftPanelOpen(!leftPanelOpen)}
            className={`p-1.5 rounded-xl border transition-colors ${
              isLight
                ? 'border-amber-300 hover:bg-amber-50 text-stone-700'
                : 'border-gold-subtle hover:bg-white/5 text-stone-300'
            }`}
            title={leftPanelOpen ? 'Tutup Panel Menu' : 'Buka Panel Menu'}
          >
            {leftPanelOpen ? <PanelLeftClose className={`w-4 h-4 ${isLight ? 'text-amber-700' : 'text-gold-400'}`} /> : <PanelLeftOpen className={`w-4 h-4 ${isLight ? 'text-amber-700' : 'text-gold-400'}`} />}
          </button>

          <div className={`h-5 w-px hidden sm:block ${isLight ? 'bg-stone-300' : 'bg-white/10'}`} />

          {/* Logo & Brand Title */}
          <div className="flex items-center gap-2">
            <img 
              src="/assets/favicon-h.png" 
              alt="HariNikah" 
              className="w-7 h-7 rounded-full shadow-gold-sm"
            />
            <div className="hidden lg:block">
              <span className={`font-serif text-sm font-bold ${isLight ? 'text-stone-900' : 'text-gold-bright'}`}>
                HariNikah
              </span>
              <div className="flex items-center gap-1.5 text-[10px] font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className={isLight ? 'text-stone-600' : 'text-stone-300'}>Tersimpan otomatis • Klik teks di layar untuk edit langsung</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center: Cultural Template Switcher, 6-Step Wizard & Mode Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          
          {/* 6 Langkah Wizard Onboarding Button */}
          <button
            onClick={() => setShowOnboardingModal(true)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold transition-all shadow-sm ${
              isLight
                ? 'bg-rose-50 text-rose-700 border-rose-300 hover:bg-rose-100'
                : 'bg-rose-950/70 text-rose-300 border-rose-500/50 hover:bg-rose-900/80'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            <span>Yuk, Rakit</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-rose-500 text-white font-black">6 Langkah</span>
          </button>

          {/* Diskon 20% Voucher Button */}
          <button
            onClick={() => setShowDiscountModal(true)}
            className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold transition-all ${
              isLight
                ? 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
                : 'bg-gold-950/70 text-gold-300 border-gold-400/60 hover:bg-gold-900'
            }`}
          >
            <Gift className="w-3.5 h-3.5 text-amber-500" />
            <span>Diskon 20%</span>
          </button>

          {/* Quick Cultural Template Selector Pills */}
          <div className={`border rounded-full p-0.5 flex items-center text-xs ${
            isLight ? 'bg-[#F5EFE6] border-[#E5DAC6]' : 'bg-[#082422] border-gold-subtle/80'
          }`}>
            <button
              onClick={() => handleTemplateSwitch('modern')}
              className={`px-2.5 py-1 rounded-full font-semibold transition-all flex items-center gap-1 ${
                currentTemplate === 'modern'
                  ? 'bg-gradient-to-r from-amber-400 to-gold-400 text-black shadow-md'
                  : isLight ? 'text-stone-600 hover:text-stone-900' : 'text-stone-300 hover:text-white'
              }`}
            >
              <span>✨</span>
              <span className="hidden xl:inline">Modern</span>
            </button>

            <button
              onClick={() => handleTemplateSwitch('jawa')}
              className={`px-2.5 py-1 rounded-full font-semibold transition-all flex items-center gap-1 ${
                currentTemplate === 'jawa'
                  ? 'bg-gradient-to-r from-[#e6ba64] to-[#c6923c] text-black shadow-md'
                  : isLight ? 'text-stone-600 hover:text-stone-900' : 'text-stone-300 hover:text-white'
              }`}
            >
              <span>🏛️</span>
              <span className="hidden xl:inline">Adat Jawa</span>
            </button>

            <button
              onClick={() => handleTemplateSwitch('minang')}
              className={`px-2.5 py-1 rounded-full font-semibold transition-all flex items-center gap-1 ${
                currentTemplate === 'minang'
                  ? 'bg-gradient-to-r from-[#f5d77f] to-[#e0b042] text-black shadow-md'
                  : isLight ? 'text-stone-600 hover:text-stone-900' : 'text-stone-300 hover:text-white'
              }`}
            >
              <span>👑</span>
              <span className="hidden xl:inline">Adat Minang</span>
            </button>

            <button
              onClick={() => handleTemplateSwitch('botanical')}
              className={`px-2.5 py-1 rounded-full font-semibold transition-all flex items-center gap-1 ${
                currentTemplate === 'botanical'
                  ? 'bg-gradient-to-r from-[#8DA390] to-[#5C7560] text-white shadow-md'
                  : isLight ? 'text-stone-600 hover:text-stone-900' : 'text-stone-300 hover:text-white'
              }`}
            >
              <span>🌿</span>
              <span className="hidden xl:inline">Green Leaf</span>
            </button>
          </div>

          {/* Sampul vs Isi Undangan Toggle Pill */}
          <div className={`hidden sm:flex border rounded-full p-0.5 items-center text-xs ${
            isLight ? 'bg-[#F5EFE6] border-[#E5DAC6]' : 'bg-[#082422] border-gold-subtle/60'
          }`}>
            <button
              onClick={() => handleViewModeToggle('cover')}
              className={`px-3 py-1 rounded-full font-medium transition-all ${
                viewMode === 'cover'
                  ? isLight
                    ? 'bg-white text-stone-900 shadow-sm font-bold border border-amber-300'
                    : 'bg-gold-950 text-gold-300 border border-gold-subtle font-bold'
                  : isLight ? 'text-stone-500 hover:text-stone-800' : 'text-stone-400 hover:text-white'
              }`}
            >
              Sampul
            </button>
            <button
              onClick={() => handleViewModeToggle('content')}
              className={`px-3 py-1 rounded-full font-medium transition-all ${
                viewMode === 'content'
                  ? isLight
                    ? 'bg-white text-stone-900 shadow-sm font-bold border border-amber-300'
                    : 'bg-gold-950 text-gold-300 border border-gold-subtle font-bold'
                  : isLight ? 'text-stone-500 hover:text-stone-800' : 'text-stone-400 hover:text-white'
              }`}
            >
              Isi Undangan
            </button>
          </div>

          {/* Music Test Button */}
          <button
            onClick={handleToggleMusic}
            className={`flex items-center gap-1 px-3 py-1 rounded-full border text-xs font-semibold transition-colors ${
              isPlayingMusic
                ? 'bg-gold-400 text-black border-gold-300 animate-pulse'
                : isLight
                ? 'bg-[#F5EFE6] border-[#E5DAC6] text-stone-700 hover:bg-[#EAE2D5]'
                : 'bg-white/5 border-gold-subtle text-gold-300 hover:bg-white/10'
            }`}
          >
            {isPlayingMusic ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-current" />}
            <span className="hidden xl:inline">{isPlayingMusic ? 'Musik Main' : 'Uji Musik'}</span>
          </button>

        </div>

        {/* Right: Theme Toggle, Guest Preview & Publish Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          
          {/* THEME TOGGLE (SUN / MOON) */}
          <button
            onClick={toggleThemeMode}
            className={`p-2 rounded-full border transition-all flex items-center justify-center ${
              isLight
                ? 'bg-amber-100/70 border-amber-300 text-amber-900 hover:bg-amber-200'
                : 'bg-white/5 border-gold-subtle text-gold-300 hover:bg-white/10'
            }`}
            title={isLight ? 'Ganti ke Mode Gelap (Emerald Velvet)' : 'Ganti ke Mode Terang (Champagne Ivory)'}
          >
            {isLight ? <Moon className="w-3.5 h-3.5 text-amber-800" /> : <Sun className="w-3.5 h-3.5 text-gold-400" />}
          </button>

          {/* Guest Preview Button */}
          <a
            href={`/${slug}?to=${encodeURIComponent(guestName)}`}
            target="_blank"
            rel="noreferrer"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-colors ${
              isLight
                ? 'border-amber-300 text-stone-700 hover:bg-amber-50'
                : 'border-gold-subtle text-stone-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Eye className={`w-3.5 h-3.5 ${isLight ? 'text-amber-700' : 'text-gold-400'}`} />
            <span className="hidden sm:inline">Lihat Live</span>
          </a>

          {/* Activate / Pricing Button */}
          <button
            onClick={() => setShowActivationModal(true)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-bold transition-all shadow-sm ${
              isLight
                ? 'bg-amber-100 text-amber-950 border-amber-400 hover:bg-amber-200'
                : 'bg-gold-950 border-gold-400/80 text-gold-300 hover:bg-gold-900 shadow-gold-sm'
            }`}
          >
            <Sparkles className={`w-3.5 h-3.5 ${isLight ? 'text-amber-800' : 'text-gold-400'}`} />
            <span>Aktifkan</span>
          </button>

          {/* Publish / Share Live Button */}
          <button
            onClick={handlePublish}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-amber-400 via-gold-300 to-amber-500 text-black font-extrabold text-xs shadow-gold-sm hover:scale-105 active:scale-95 transition-all"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Bagikan</span>
          </button>

        </div>

      </header>

      {/* =========================================================================
          2. MAIN WORKSPACE (LEFT NAV + LEFT PANEL + CENTER STAGE + RIGHT PANEL)
          ========================================================================= */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* LEFT TOOLBAR TABS (CANVA NAVIGATION) */}
        <div className={`w-16 sm:w-20 border-r flex flex-col items-center py-3 gap-2 flex-shrink-0 z-20 overflow-y-auto transition-colors ${
          isLight ? 'bg-[#FAF8F5] border-[#E5DAC6]' : 'bg-[#031110] border-gold-subtle'
        }`}>
          {[
            { id: 'templates', label: 'Template', icon: <Crown className="w-4 h-4 text-gold-400" /> },
            { id: 'pages', label: 'Halaman', icon: <Layers className="w-4 h-4" /> },
            { id: 'text', label: 'Teks', icon: <Type className="w-4 h-4" /> },
            { id: 'couple', label: 'Mempelai', icon: <Heart className="w-4 h-4" /> },
            { id: 'events', label: 'Acara', icon: <Calendar className="w-4 h-4" /> },
            { id: 'theme', label: 'Tema BG', icon: <Palette className="w-4 h-4" /> },
            { id: 'gift', label: 'Amplop', icon: <Gift className="w-4 h-4" /> },
            { id: 'music', label: 'Musik', icon: <Music className="w-4 h-4" /> },
          ].map((tool) => (
            <button
              key={tool.id}
              onClick={() => {
                setActiveTab(tool.id as any);
                setLeftPanelOpen(true);
              }}
              className={`w-14 sm:w-16 py-2.5 rounded-xl flex flex-col items-center gap-1 text-[10px] font-medium transition-all ${
                activeTab === tool.id
                  ? isLight
                    ? 'bg-amber-100 text-amber-900 border border-amber-300 shadow-sm'
                    : 'bg-gradient-to-b from-[#144c48] to-[#072422] text-gold-300 border border-gold-400/40 shadow-gold-sm'
                  : isLight
                  ? 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-white/5'
              }`}
            >
              {tool.icon}
              <span>{tool.label}</span>
            </button>
          ))}
        </div>

        {/* LEFT FORM/SETTINGS PANEL */}
        {leftPanelOpen && (
          <div className={`w-72 sm:w-80 border-r flex flex-col overflow-y-auto flex-shrink-0 p-4 scrollbar-thin z-20 absolute sm:relative h-full shadow-2xl transition-colors ${
            isLight ? 'bg-white border-[#E5DAC6] text-stone-800' : 'bg-[#061e1d] border-gold-subtle text-stone-100'
          }`}>
            
            {/* TAB: CULTURAL TEMPLATES SELECTOR */}
            {activeTab === 'templates' && (
              <div className="space-y-4">
                <div className={`pb-3 border-b ${isLight ? 'border-amber-200' : 'border-gold-subtle'}`}>
                  <span className={`text-[10px] font-extrabold uppercase tracking-widest ${
                    isLight ? 'text-amber-800' : 'text-gold-400'
                  }`}>
                    PILIH TEMA BUDAYA
                  </span>
                  <h3 className={`text-base font-black mt-0.5 ${
                    isLight ? 'text-stone-900' : 'text-gold-bright'
                  }`}>
                    Template Undangan Adat
                  </h3>
                  <p className={`text-[11px] mt-1 leading-relaxed ${
                    isLight ? 'text-stone-600' : 'text-stone-300'
                  }`}>
                    Ganti gaya pernikahan Anda dengan 1-klik. Ornamen wayang/suntiang, kutipan adat, warna, dan alunan musik otomatis menyesuaikan.
                  </p>
                </div>

                <div className="space-y-3">
                  {/* Preset 1: Modern Royal Velvet & Ivory */}
                  <div
                    onClick={() => handleTemplateSwitch('modern')}
                    className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                      currentTemplate === 'modern'
                        ? isLight
                          ? 'border-emerald-600 bg-emerald-50/90 shadow-md ring-2 ring-emerald-400/30'
                          : 'border-gold-400 bg-gold-950/70 shadow-gold-md'
                        : isLight
                        ? 'border-stone-200 bg-white hover:border-amber-400 shadow-sm'
                        : 'border-white/10 bg-white/5 hover:border-gold-subtle'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold flex items-center gap-1.5 ${
                        currentTemplate === 'modern'
                          ? isLight ? 'text-emerald-950 font-black' : 'text-gold-200'
                          : isLight ? 'text-stone-900' : 'text-stone-200'
                      }`}>
                        <span>✨</span> Royal Emerald & Ivory
                      </span>
                      {currentTemplate === 'modern' && <Check className={`w-4 h-4 ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`} />}
                    </div>
                    <p className={`text-[11px] mt-1 leading-relaxed ${
                      currentTemplate === 'modern'
                        ? isLight ? 'text-emerald-900' : 'text-stone-300'
                        : isLight ? 'text-stone-600' : 'text-stone-400'
                    }`}>
                      Kemewahan beludru hijau zamrud & kertas sutra gading dengan tipografi emas modern & musik orkestra romantis.
                    </p>
                  </div>

                  {/* Preset 2: Adat Jawa Kasunanan */}
                  <div
                    onClick={() => handleTemplateSwitch('jawa')}
                    className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                      currentTemplate === 'jawa'
                        ? isLight
                          ? 'border-amber-600 bg-amber-50/90 shadow-md ring-2 ring-amber-400/40'
                          : 'border-[#e6ba64] bg-[#2e180d] shadow-gold-md'
                        : isLight
                        ? 'border-stone-200 bg-white hover:border-amber-400 shadow-sm'
                        : 'border-white/10 bg-white/5 hover:border-[#e6ba64]/60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold flex items-center gap-1.5 ${
                        currentTemplate === 'jawa'
                          ? isLight ? 'text-amber-950 font-black' : 'text-[#e6ba64]'
                          : isLight ? 'text-stone-900' : 'text-stone-200'
                      }`}>
                        <span>🏛️</span> Adat Jawa Kasunanan
                      </span>
                      {currentTemplate === 'jawa' && <Check className={`w-4 h-4 ${isLight ? 'text-amber-700' : 'text-emerald-400'}`} />}
                    </div>
                    <p className={`text-[11px] mt-1 leading-relaxed ${
                      currentTemplate === 'jawa'
                        ? isLight ? 'text-amber-900' : 'text-stone-300'
                        : isLight ? 'text-stone-600' : 'text-stone-400'
                    }`}>
                      Coklat Sogan Keraton, ornamen Gunungan Wayang Emas (Kayon), ukiran sudut Jepara, tata upacara Midodareni & Panggih, serta alunan Gamelan Pelog syahdu.
                    </p>
                  </div>

                  {/* Preset 3: Adat Minang Baralek Gadang */}
                  <div
                    onClick={() => handleTemplateSwitch('minang')}
                    className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                      currentTemplate === 'minang'
                        ? isLight
                          ? 'border-rose-600 bg-rose-50/90 shadow-md ring-2 ring-rose-400/40'
                          : 'border-[#f5d77f] bg-[#3a080e] shadow-gold-md'
                        : isLight
                        ? 'border-stone-200 bg-white hover:border-rose-400 shadow-sm'
                        : 'border-white/10 bg-white/5 hover:border-[#f5d77f]/60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold flex items-center gap-1.5 ${
                        currentTemplate === 'minang'
                          ? isLight ? 'text-rose-950 font-black' : 'text-[#f5d77f]'
                          : isLight ? 'text-stone-900' : 'text-stone-200'
                      }`}>
                        <span>👑</span> Adat Minang Baralek Gadang
                      </span>
                      {currentTemplate === 'minang' && <Check className={`w-4 h-4 ${isLight ? 'text-rose-700' : 'text-emerald-400'}`} />}
                    </div>
                    <p className={`text-[11px] mt-1 leading-relaxed ${
                      currentTemplate === 'minang'
                        ? isLight ? 'text-rose-900' : 'text-stone-300'
                        : isLight ? 'text-stone-600' : 'text-stone-400'
                    }`}>
                      Merah Marun Marawa, Mahkota Suntiang Minang bertingkat emas, siluet Rumah Gadang, ukiran Itiak Pulang Patang, pepatah adat, dan melodi Saluang romantis.
                    </p>
                  </div>

                  {/* Preset 4: Green Leaf Botanical Sage */}
                  <div
                    onClick={() => handleTemplateSwitch('botanical')}
                    className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                      currentTemplate === 'botanical'
                        ? isLight
                          ? 'border-[#4A5D4E] bg-[#EDF0EC] shadow-md ring-2 ring-[#4A5D4E]/30'
                          : 'border-[#8DA390] bg-[#1C261F] shadow-2xl'
                        : isLight
                        ? 'border-stone-200 bg-white hover:border-[#4A5D4E] shadow-sm'
                        : 'border-white/10 bg-white/5 hover:border-[#8DA390]/60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold flex items-center gap-1.5 ${
                        currentTemplate === 'botanical'
                          ? isLight ? 'text-[#2D3B31] font-black' : 'text-[#A2B5A5]'
                          : isLight ? 'text-stone-900' : 'text-stone-200'
                      }`}>
                        <span>🌿</span> Green Leaf Botanical Sage
                      </span>
                      {currentTemplate === 'botanical' && <Check className={`w-4 h-4 ${isLight ? 'text-[#4A5D4E]' : 'text-emerald-400'}`} />}
                    </div>
                    <p className={`text-[11px] mt-1 leading-relaxed ${
                      currentTemplate === 'botanical'
                        ? isLight ? 'text-[#3E5042]' : 'text-stone-300'
                        : isLight ? 'text-stone-600' : 'text-stone-400'
                    }`}>
                      Kesegaran daun sage, bingkai Victorian Arch Scalloped, foliage bunga watercolor, frame oval pengantin, dan pemutar musik piringan hitam vinyl.
                    </p>
                  </div>
                </div>

                {/* Cultural Motifs & Ornaments Showcase Box */}
                <div className={`p-3.5 rounded-2xl border space-y-2.5 ${
                  isLight ? 'bg-amber-50/70 border-amber-200/90 shadow-sm' : 'bg-black/40 border-gold-subtle'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-[11px] font-bold uppercase tracking-wider ${isLight ? 'text-amber-900' : 'text-gold-300'}`}>
                      Motif Ornamen Budaya
                    </span>
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-extrabold ${
                      isLight ? 'bg-amber-200/70 text-amber-950' : 'bg-gold-950 text-gold-300'
                    }`}>
                      Tersinkronisasi
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-center text-[10px]">
                    <div className={`p-2 rounded-xl border flex flex-col items-center justify-center gap-1 ${
                      isLight ? 'bg-white border-amber-200 text-stone-800 shadow-sm' : 'bg-white/5 border-white/10 text-stone-300'
                    }`}>
                      <span className="text-base">{isJawa ? '🏛️' : isMinang ? '👑' : '✨'}</span>
                      <span className="font-bold">{isJawa ? 'Kayon Wayang' : isMinang ? 'Suntiang Emas' : 'Monogram Emas'}</span>
                    </div>
                    <div className={`p-2 rounded-xl border flex flex-col items-center justify-center gap-1 ${
                      isLight ? 'bg-white border-amber-200 text-stone-800 shadow-sm' : 'bg-white/5 border-white/10 text-stone-300'
                    }`}>
                      <span className="text-base">{isJawa ? '⚜️' : isMinang ? '🔺' : '📐'}</span>
                      <span className="font-bold">{isJawa ? 'Sudut Ukir Jawa' : isMinang ? 'Pucuk Rebung' : 'Sudut Art Deco'}</span>
                    </div>
                  </div>
                </div>

                {/* Tips Edit Cepat */}
                <div className={`p-3 rounded-2xl border text-xs ${
                  isLight ? 'bg-stone-50 border-stone-200 text-stone-700' : 'bg-black/40 border-gold-subtle text-stone-300'
                }`}>
                  <p className={`font-bold mb-1 ${isLight ? 'text-amber-900' : 'text-gold-300'}`}>💡 Tips Edit Cepat:</p>
                  <p className={`text-[11px] leading-relaxed ${isLight ? 'text-stone-600' : 'text-stone-400'}`}>
                    Klik teks apa saja pada gambar smartphone di tengah, panel ini akan otomatis membuka kolom teks yang Anda klik!
                  </p>
                </div>
              </div>
            )}

            {/* TAB: TEKS & JUDUL */}
            {activeTab === 'text' && (
              <div className="space-y-4 text-xs">
                <h3 className={`text-xs font-black uppercase tracking-wider pb-2 border-b-2 ${
                  isLight ? 'text-amber-950 border-amber-200' : 'text-gold-300 border-gold-subtle'
                }`}>
                  Sunting Teks Sampul Depan
                </h3>

                <div className="space-y-3">
                  <div>
                    <label className={`text-xs font-bold block mb-1 ${isLight ? 'text-stone-800' : 'text-stone-400'}`}>
                      Sub Judul Pembuka:
                    </label>
                    <input
                      id="input-subheading"
                      type="text"
                      value={pages[0]?.data?.subheading || ''}
                      onChange={(e) => updatePageData(0, 'subheading', e.target.value)}
                      className={`w-full rounded-xl px-3 py-2 text-xs transition-colors ${
                        isLight
                          ? 'bg-[#FAF8F5] border-2 border-amber-200 text-stone-900 placeholder:text-stone-400 focus:bg-white focus:border-amber-600 focus:ring-1 focus:ring-amber-500 shadow-inner font-semibold'
                          : 'bg-[#041514] border border-gold-subtle text-stone-100 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`text-xs font-bold block mb-1 ${isLight ? 'text-stone-800' : 'text-stone-400'}`}>
                      Nama Panggilan Pria:
                    </label>
                    <input
                      id="input-groomName"
                      type="text"
                      value={pages[0]?.data?.groomName || ''}
                      onChange={(e) => updatePageData(0, 'groomName', e.target.value)}
                      className={`w-full rounded-xl px-3 py-2 text-xs transition-colors ${
                        isLight
                          ? 'bg-[#FAF8F5] border-2 border-amber-200 text-stone-900 placeholder:text-stone-400 focus:bg-white focus:border-amber-600 focus:ring-1 focus:ring-amber-500 shadow-inner font-semibold'
                          : 'bg-[#041514] border border-gold-subtle text-stone-100 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`text-xs font-bold block mb-1 ${isLight ? 'text-stone-800' : 'text-stone-400'}`}>
                      Nama Panggilan Wanita:
                    </label>
                    <input
                      id="input-brideName"
                      type="text"
                      value={pages[0]?.data?.brideName || ''}
                      onChange={(e) => updatePageData(0, 'brideName', e.target.value)}
                      className={`w-full rounded-xl px-3 py-2 text-xs transition-colors ${
                        isLight
                          ? 'bg-[#FAF8F5] border-2 border-amber-200 text-stone-900 placeholder:text-stone-400 focus:bg-white focus:border-amber-600 focus:ring-1 focus:ring-amber-500 shadow-inner font-semibold'
                          : 'bg-[#041514] border border-gold-subtle text-stone-100 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`text-xs font-bold block mb-1 ${isLight ? 'text-stone-800' : 'text-stone-400'}`}>
                      Tanggal Pernikahan:
                    </label>
                    <input
                      id="input-dateText"
                      type="text"
                      value={pages[0]?.data?.dateText || ''}
                      onChange={(e) => updatePageData(0, 'dateText', e.target.value)}
                      className={`w-full rounded-xl px-3 py-2 text-xs transition-colors ${
                        isLight
                          ? 'bg-[#FAF8F5] border-2 border-amber-200 text-stone-900 placeholder:text-stone-400 focus:bg-white focus:border-amber-600 focus:ring-1 focus:ring-amber-500 shadow-inner font-semibold'
                          : 'bg-[#041514] border border-gold-subtle text-stone-100 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`text-xs font-bold block mb-1 ${isLight ? 'text-stone-800' : 'text-stone-400'}`}>
                      Gedung & Kota Acara:
                    </label>
                    <input
                      id="input-venueCity"
                      type="text"
                      value={pages[0]?.data?.venueCity || ''}
                      onChange={(e) => updatePageData(0, 'venueCity', e.target.value)}
                      className={`w-full rounded-xl px-3 py-2 text-xs transition-colors ${
                        isLight
                          ? 'bg-[#FAF8F5] border-2 border-amber-200 text-stone-900 placeholder:text-stone-400 focus:bg-white focus:border-amber-600 focus:ring-1 focus:ring-amber-500 shadow-inner font-semibold'
                          : 'bg-[#041514] border border-gold-subtle text-stone-100 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400'
                      }`}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB: PROFIL MEMPELAI */}
            {activeTab === 'couple' && (
              <div className="space-y-4 text-xs">
                <h3 className={`text-xs font-black uppercase tracking-wider pb-2 border-b-2 ${
                  isLight ? 'text-amber-950 border-amber-200' : 'text-gold-300 border-gold-subtle'
                }`}>
                  Data Lengkap Mempelai
                </h3>

                <div>
                  <label className={`text-xs font-bold block mb-1 ${isLight ? 'text-stone-800' : 'text-stone-400'}`}>
                    Kutipan / Ayat Suci:
                  </label>
                  <textarea
                    id="input-introQuote"
                    rows={2}
                    value={pages[1]?.data?.introQuote || ''}
                    onChange={(e) => updatePageData(1, 'introQuote', e.target.value)}
                    className={`w-full rounded-xl px-3 py-1.5 text-[11px] transition-colors ${
                      isLight
                        ? 'bg-[#FAF8F5] border-2 border-amber-200 text-stone-900 placeholder:text-stone-400 focus:bg-white focus:border-amber-600 focus:ring-1 focus:ring-amber-500 shadow-inner'
                        : 'bg-[#041514] border border-gold-subtle text-stone-100'
                    }`}
                  />
                </div>

                {/* Groom */}
                <div className={`p-3.5 rounded-2xl border-2 space-y-2.5 transition-colors ${
                  isLight ? 'bg-[#FAF8F5] border-amber-200/90 text-stone-900 shadow-sm' : 'bg-black/40 border-gold-subtle/70 text-stone-100'
                }`}>
                  <span className={`font-black block text-xs ${isLight ? 'text-amber-950' : 'text-gold-300'}`}>
                    Mempelai Pria
                  </span>
                  <input
                    id="input-groomFullName"
                    type="text"
                    placeholder="Nama Lengkap & Gelar Pria"
                    value={pages[1]?.data?.groomFullName || ''}
                    onChange={(e) => updatePageData(1, 'groomFullName', e.target.value)}
                    className={`w-full rounded-xl px-3 py-1.5 text-xs transition-colors ${
                      isLight
                        ? 'bg-white border-2 border-amber-200 text-stone-900 placeholder:text-stone-400 focus:border-amber-600'
                        : 'bg-[#041514] border border-gold-subtle text-stone-100'
                    }`}
                  />
                  <textarea
                    id="input-groomParents"
                    rows={2}
                    placeholder="Nama Orang Tua Pria"
                    value={pages[1]?.data?.groomParents || ''}
                    onChange={(e) => updatePageData(1, 'groomParents', e.target.value)}
                    className={`w-full rounded-xl px-3 py-1.5 text-[11px] transition-colors ${
                      isLight
                        ? 'bg-white border-2 border-amber-200 text-stone-900 placeholder:text-stone-400 focus:border-amber-600'
                        : 'bg-[#041514] border border-gold-subtle text-stone-100'
                    }`}
                  />
                  <input
                    id="input-groomPhoto"
                    type="text"
                    placeholder="URL Foto Pria"
                    value={pages[1]?.data?.groomPhoto || ''}
                    onChange={(e) => updatePageData(1, 'groomPhoto', e.target.value)}
                    className={`w-full rounded-xl px-3 py-1.5 text-[11px] transition-colors ${
                      isLight
                        ? 'bg-white border-2 border-amber-200 text-stone-900 placeholder:text-stone-400 focus:border-amber-600'
                        : 'bg-[#041514] border border-gold-subtle text-stone-100'
                    }`}
                  />
                </div>

                {/* Bride */}
                <div className={`p-3.5 rounded-2xl border-2 space-y-2.5 transition-colors ${
                  isLight ? 'bg-[#FAF8F5] border-amber-200/90 text-stone-900 shadow-sm' : 'bg-black/40 border-gold-subtle/70 text-stone-100'
                }`}>
                  <span className={`font-black block text-xs ${isLight ? 'text-amber-950' : 'text-gold-300'}`}>
                    Mempelai Wanita
                  </span>
                  <input
                    id="input-brideFullName"
                    type="text"
                    placeholder="Nama Lengkap & Gelar Wanita"
                    value={pages[1]?.data?.brideFullName || ''}
                    onChange={(e) => updatePageData(1, 'brideFullName', e.target.value)}
                    className={`w-full rounded-xl px-3 py-1.5 text-xs transition-colors ${
                      isLight
                        ? 'bg-white border-2 border-amber-200 text-stone-900 placeholder:text-stone-400 focus:border-amber-600'
                        : 'bg-[#041514] border border-gold-subtle text-stone-100'
                    }`}
                  />
                  <textarea
                    id="input-brideParents"
                    rows={2}
                    placeholder="Nama Orang Tua Wanita"
                    value={pages[1]?.data?.brideParents || ''}
                    onChange={(e) => updatePageData(1, 'brideParents', e.target.value)}
                    className={`w-full rounded-xl px-3 py-1.5 text-[11px] transition-colors ${
                      isLight
                        ? 'bg-white border-2 border-amber-200 text-stone-900 placeholder:text-stone-400 focus:border-amber-600'
                        : 'bg-[#041514] border border-gold-subtle text-stone-100'
                    }`}
                  />
                  <input
                    id="input-bridePhoto"
                    type="text"
                    placeholder="URL Foto Wanita"
                    value={pages[1]?.data?.bridePhoto || ''}
                    onChange={(e) => updatePageData(1, 'bridePhoto', e.target.value)}
                    className={`w-full rounded-xl px-3 py-1.5 text-[11px] transition-colors ${
                      isLight
                        ? 'bg-white border-2 border-amber-200 text-stone-900 placeholder:text-stone-400 focus:border-amber-600'
                        : 'bg-[#041514] border border-gold-subtle text-stone-100'
                    }`}
                  />
                </div>
              </div>
            )}

            {/* TAB: ACARA & LOKASI */}
            {activeTab === 'events' && (
              <div className="space-y-4 text-xs">
                <h3 className={`text-xs font-black uppercase tracking-wider pb-2 border-b-2 ${
                  isLight ? 'text-amber-950 border-amber-200' : 'text-gold-300 border-gold-subtle'
                }`}>
                  Waktu & Tempat Rangkaian Acara
                </h3>

                <div className="space-y-3">
                  <div className={`p-3.5 rounded-2xl border-2 space-y-2 transition-colors ${
                    isLight ? 'bg-[#FAF8F5] border-amber-200/90 text-stone-900 shadow-sm' : 'bg-black/40 border-gold-subtle/70 text-stone-100'
                  }`}>
                    <span className={`font-black block text-xs ${isLight ? 'text-amber-950' : 'text-gold-300'}`}>
                      {pages[2]?.data?.akadTitle || 'Akad Nikah / Siraman'}
                    </span>
                    <input
                      id="input-akadDate"
                      type="text"
                      placeholder="Tanggal Acara"
                      value={pages[2]?.data?.akadDate || ''}
                      onChange={(e) => updatePageData(2, 'akadDate', e.target.value)}
                      className={`w-full rounded-xl px-3 py-1.5 text-xs transition-colors ${
                        isLight
                          ? 'bg-white border-2 border-amber-200 text-stone-900 placeholder:text-stone-400 focus:border-amber-600'
                          : 'bg-[#041514] border border-gold-subtle text-stone-100'
                      }`}
                    />
                    <input
                      id="input-akadTime"
                      type="text"
                      placeholder="Waktu Acara"
                      value={pages[2]?.data?.akadTime || ''}
                      onChange={(e) => updatePageData(2, 'akadTime', e.target.value)}
                      className={`w-full rounded-xl px-3 py-1.5 text-xs transition-colors ${
                        isLight
                          ? 'bg-white border-2 border-amber-200 text-stone-900 placeholder:text-stone-400 focus:border-amber-600'
                          : 'bg-[#041514] border border-gold-subtle text-stone-100'
                      }`}
                    />
                    <input
                      id="input-akadPlace"
                      type="text"
                      placeholder="Tempat Acara"
                      value={pages[2]?.data?.akadPlace || ''}
                      onChange={(e) => updatePageData(2, 'akadPlace', e.target.value)}
                      className={`w-full rounded-xl px-3 py-1.5 text-xs transition-colors ${
                        isLight
                          ? 'bg-white border-2 border-amber-200 text-stone-900 placeholder:text-stone-400 focus:border-amber-600'
                          : 'bg-[#041514] border border-gold-subtle text-stone-100'
                      }`}
                    />
                  </div>

                  <div className={`p-3.5 rounded-2xl border-2 space-y-2 transition-colors ${
                    isLight ? 'bg-[#FAF8F5] border-amber-200/90 text-stone-900 shadow-sm' : 'bg-black/40 border-gold-subtle/70 text-stone-100'
                  }`}>
                    <span className={`font-black block text-xs ${isLight ? 'text-amber-950' : 'text-gold-300'}`}>
                      {pages[2]?.data?.resepsiTitle || 'Resepsi / Baralek'}
                    </span>
                    <input
                      id="input-resepsiDate"
                      type="text"
                      placeholder="Tanggal Resepsi"
                      value={pages[2]?.data?.resepsiDate || ''}
                      onChange={(e) => updatePageData(2, 'resepsiDate', e.target.value)}
                      className={`w-full rounded-xl px-3 py-1.5 text-xs transition-colors ${
                        isLight
                          ? 'bg-white border-2 border-amber-200 text-stone-900 placeholder:text-stone-400 focus:border-amber-600'
                          : 'bg-[#041514] border border-gold-subtle text-stone-100'
                      }`}
                    />
                    <input
                      id="input-resepsiTime"
                      type="text"
                      placeholder="Waktu Resepsi"
                      value={pages[2]?.data?.resepsiTime || ''}
                      onChange={(e) => updatePageData(2, 'resepsiTime', e.target.value)}
                      className={`w-full rounded-xl px-3 py-1.5 text-xs transition-colors ${
                        isLight
                          ? 'bg-white border-2 border-amber-200 text-stone-900 placeholder:text-stone-400 focus:border-amber-600'
                          : 'bg-[#041514] border border-gold-subtle text-stone-100'
                      }`}
                    />
                    <input
                      id="input-resepsiPlace"
                      type="text"
                      placeholder="Tempat Resepsi"
                      value={pages[2]?.data?.resepsiPlace || ''}
                      onChange={(e) => updatePageData(2, 'resepsiPlace', e.target.value)}
                      className={`w-full rounded-xl px-3 py-1.5 text-xs transition-colors ${
                        isLight
                          ? 'bg-white border-2 border-amber-200 text-stone-900 placeholder:text-stone-400 focus:border-amber-600'
                          : 'bg-[#041514] border border-gold-subtle text-stone-100'
                      }`}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB: AMPLOP */}
            {activeTab === 'gift' && (
              <div className="space-y-4 text-xs">
                <h3 className={`text-xs font-black uppercase tracking-wider pb-2 border-b-2 ${
                  isLight ? 'text-amber-950 border-amber-200' : 'text-gold-300 border-gold-subtle'
                }`}>
                  Rekening Amplop Digital
                </h3>

                <div className="space-y-3">
                  <div className={`p-3.5 rounded-2xl border-2 space-y-2 transition-colors ${
                    isLight ? 'bg-[#FAF8F5] border-amber-200/90 text-stone-900 shadow-sm' : 'bg-black/40 border-gold-subtle/70 text-stone-100'
                  }`}>
                    <span className={`font-black block text-xs ${isLight ? 'text-amber-950' : 'text-gold-300'}`}>
                      Rekening Bank 1
                    </span>
                    <input
                      id="input-bankName1"
                      type="text"
                      placeholder="Nama Bank (BCA)"
                      value={pages[4]?.data?.bankName1 || ''}
                      onChange={(e) => updatePageData(4, 'bankName1', e.target.value)}
                      className={`w-full rounded-xl px-3 py-1.5 text-xs transition-colors ${
                        isLight
                          ? 'bg-white border-2 border-amber-200 text-stone-900 placeholder:text-stone-400 focus:border-amber-600'
                          : 'bg-[#041514] border border-gold-subtle text-stone-100'
                      }`}
                    />
                    <input
                      id="input-accNumber1"
                      type="text"
                      placeholder="Nomor Rekening"
                      value={pages[4]?.data?.accNumber1 || ''}
                      onChange={(e) => updatePageData(4, 'accNumber1', e.target.value)}
                      className={`w-full rounded-xl px-3 py-1.5 text-xs transition-colors ${
                        isLight
                          ? 'bg-white border-2 border-amber-200 text-stone-900 placeholder:text-stone-400 focus:border-amber-600'
                          : 'bg-[#041514] border border-gold-subtle text-stone-100'
                      }`}
                    />
                    <input
                      id="input-accHolder1"
                      type="text"
                      placeholder="Atas Nama"
                      value={pages[4]?.data?.accHolder1 || ''}
                      onChange={(e) => updatePageData(4, 'accHolder1', e.target.value)}
                      className={`w-full rounded-xl px-3 py-1.5 text-xs transition-colors ${
                        isLight
                          ? 'bg-white border-2 border-amber-200 text-stone-900 placeholder:text-stone-400 focus:border-amber-600'
                          : 'bg-[#041514] border border-gold-subtle text-stone-100'
                      }`}
                    />
                  </div>

                  <div className={`p-3.5 rounded-2xl border-2 space-y-2 transition-colors ${
                    isLight ? 'bg-[#FAF8F5] border-amber-200/90 text-stone-900 shadow-sm' : 'bg-black/40 border-gold-subtle/70 text-stone-100'
                  }`}>
                    <span className={`font-black block text-xs ${isLight ? 'text-amber-950' : 'text-gold-300'}`}>
                      Rekening Bank 2
                    </span>
                    <input
                      id="input-bankName2"
                      type="text"
                      placeholder="Nama Bank (Mandiri)"
                      value={pages[4]?.data?.bankName2 || ''}
                      onChange={(e) => updatePageData(4, 'bankName2', e.target.value)}
                      className={`w-full rounded-xl px-3 py-1.5 text-xs transition-colors ${
                        isLight
                          ? 'bg-white border-2 border-amber-200 text-stone-900 placeholder:text-stone-400 focus:border-amber-600'
                          : 'bg-[#041514] border border-gold-subtle text-stone-100'
                      }`}
                    />
                    <input
                      id="input-accNumber2"
                      type="text"
                      placeholder="Nomor Rekening"
                      value={pages[4]?.data?.accNumber2 || ''}
                      onChange={(e) => updatePageData(4, 'accNumber2', e.target.value)}
                      className={`w-full rounded-xl px-3 py-1.5 text-xs transition-colors ${
                        isLight
                          ? 'bg-white border-2 border-amber-200 text-stone-900 placeholder:text-stone-400 focus:border-amber-600'
                          : 'bg-[#041514] border border-gold-subtle text-stone-100'
                      }`}
                    />
                    <input
                      id="input-accHolder2"
                      type="text"
                      placeholder="Atas Nama"
                      value={pages[4]?.data?.accHolder2 || ''}
                      onChange={(e) => updatePageData(4, 'accHolder2', e.target.value)}
                      className={`w-full rounded-xl px-3 py-1.5 text-xs transition-colors ${
                        isLight
                          ? 'bg-white border-2 border-amber-200 text-stone-900 placeholder:text-stone-400 focus:border-amber-600'
                          : 'bg-[#041514] border border-gold-subtle text-stone-100'
                      }`}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB: HALAMAN */}
            {activeTab === 'pages' && (
              <div className="space-y-4">
                <div className={`flex items-center justify-between pb-3 border-b-2 ${
                  isLight ? 'border-amber-200' : 'border-gold-subtle'
                }`}>
                  <h3 className={`text-xs font-black uppercase tracking-wider ${
                    isLight ? 'text-amber-950' : 'text-gold-300'
                  }`}>
                    Kelola Halaman
                  </h3>
                  <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${
                    isLight ? 'bg-amber-100 text-amber-950 border-amber-300' : 'bg-gold-950 text-gold-400 border-gold-subtle'
                  }`}>
                    {pages.length} Halaman
                  </span>
                </div>

                <div className="space-y-2">
                  {pages.map((page, idx) => (
                    <div
                      key={page.id}
                      onClick={() => setActivePageIndex(idx)}
                      className={`p-3 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                        activePageIndex === idx
                          ? isLight
                            ? 'border-amber-500 bg-amber-50 shadow-md ring-2 ring-amber-300/30'
                            : 'border-gold-400 bg-[#0d3a36] shadow-gold-sm'
                          : isLight
                          ? 'border-stone-200 bg-white hover:border-amber-300 shadow-sm'
                          : 'border-white/10 bg-white/5 hover:border-gold-subtle'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`w-5 h-5 rounded-md text-xs font-black flex items-center justify-center border ${
                          isLight
                            ? 'bg-amber-100 text-amber-950 border-amber-300'
                            : 'bg-black/40 text-gold-300 border-gold-subtle'
                        }`}>
                          {idx + 1}
                        </span>
                        <div>
                          <p className={`text-xs font-bold ${isLight ? 'text-stone-900' : 'text-stone-100'}`}>{page.title}</p>
                          <p className={`text-[10px] font-semibold uppercase tracking-wider ${isLight ? 'text-stone-500' : 'text-stone-400'}`}>{page.type}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => { e.stopPropagation(); duplicatePage(idx); }}
                          title="Duplikat"
                          className={`p-1.5 rounded hover:bg-black/5 ${isLight ? 'text-stone-600 hover:text-amber-800' : 'text-stone-400 hover:text-gold-300'}`}
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        {pages.length > 1 && (
                          <button
                            onClick={(e) => { e.stopPropagation(); deletePage(idx); }}
                            title="Hapus"
                            className={`p-1.5 rounded hover:bg-black/5 ${isLight ? 'text-rose-600 hover:text-rose-800' : 'text-stone-400 hover:text-rose-400'}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => addPage(`${pages.length + 1}. Halaman Baru`, 'story', isJawa ? 'jawa_sogan' : isMinang ? 'minang_marawa' : 'velvet')}
                  className={`w-full py-2.5 rounded-xl border-2 border-dashed text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
                    isLight
                      ? 'border-amber-400 text-amber-900 bg-amber-50/60 hover:bg-amber-100'
                      : 'border-gold-500/40 hover:border-gold-400 text-gold-300'
                  }`}
                >
                  <Plus className="w-4 h-4" />
                  Tambah Halaman Baru
                </button>
              </div>
            )}

            {/* TAB: MUSIK */}
            {activeTab === 'music' && (
              <div className="space-y-4 text-xs">
                <h3 className={`text-xs font-black uppercase tracking-wider pb-2 border-b-2 ${
                  isLight ? 'text-amber-950 border-amber-200' : 'text-gold-300 border-gold-subtle'
                }`}>
                  Alunan Musik Tradisi & Romansa
                </h3>

                <div className={`p-3.5 rounded-2xl border-2 space-y-2 transition-colors ${
                  isLight ? 'bg-[#FAF8F5] border-amber-200/90 text-stone-800 shadow-sm' : 'bg-black/40 border-gold-subtle text-stone-300'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className={`font-black ${isLight ? 'text-amber-950' : 'text-gold-300'}`}>
                      Musik Sesuai Tema:
                    </span>
                    <button
                      onClick={handleToggleMusic}
                      className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-gold-400 text-black text-[11px] font-extrabold flex items-center gap-1 shadow-sm"
                    >
                      {isPlayingMusic ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-current" />}
                      <span>{isPlayingMusic ? 'Stop' : 'Putar'}</span>
                    </button>
                  </div>
                  <p className={`text-[11px] leading-relaxed ${isLight ? 'text-stone-700' : 'text-stone-400'}`}>
                    {isJawa
                      ? 'Gamelan Pelog/Slendro Kasunanan Surakarta & Yogyakarta (Suasana sakral & agung)'
                      : isMinang
                      ? 'Saluang jo Talempong Ranah Minang (Syahdu, hangat & penuh nostalgia)'
                      : 'Canon in D Piano & Harp Orchestra (Romantis, mewah & modern)'}
                  </p>
                </div>
              </div>
            )}

            {/* TAB: TEMA BG */}
            {activeTab === 'theme' && (
              <div className="space-y-4 text-xs">
                <div className={`pb-3 border-b-2 ${isLight ? 'border-amber-200' : 'border-gold-subtle'}`}>
                  <span className={`text-[10px] font-extrabold uppercase tracking-widest ${isLight ? 'text-amber-800' : 'text-gold-400'}`}>
                    WARNA & LATAR BELAKANG
                  </span>
                  <h3 className={`text-base font-black mt-0.5 ${isLight ? 'text-stone-900' : 'text-gold-bright'}`}>
                    Pilihan Latar Halaman
                  </h3>
                  <p className={`text-[11px] mt-1 leading-relaxed ${isLight ? 'text-stone-600' : 'text-stone-300'}`}>
                    Pilih nuansa warna kartu undangan: Beludru Emerald, Sutra Ivory, atau Adat Budaya.
                  </p>
                </div>

                <div className="space-y-2.5">
                  {[
                    { id: 'velvet', name: 'Royal Emerald Velvet', desc: 'Kemewahan kain beludru hijau zamrud gelap', color: '#051817' },
                    { id: 'ivory', name: 'Champagne Ivory Silk', desc: 'Keanggunan kertas sutra gading & aksen emas murni', color: '#FAF8F5' },
                    { id: 'jawa_sogan', name: 'Sogan Kasunanan Jawa', desc: 'Warna coklat sogan tanah keraton Solo & Jogja', color: '#180e09' },
                    { id: 'minang_marawa', name: 'Marawa Crimson Minang', desc: 'Merah marun kebesaran ranah Minangkabau', color: '#220508' },
                  ].map((bg) => (
                    <div
                      key={bg.id}
                      onClick={() => updatePageTheme(activePageIndex, bg.id as any)}
                      className={`p-3 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                        activePage.bgTheme === bg.id
                          ? isLight
                            ? 'border-amber-500 bg-amber-50 shadow-md ring-2 ring-amber-300/30'
                            : 'border-gold-400 bg-gold-950/70 shadow-sm'
                          : isLight
                          ? 'border-stone-200 bg-white hover:border-amber-300 shadow-sm'
                          : 'border-white/10 bg-white/5 hover:border-gold-subtle'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-8 h-8 rounded-xl border-2 border-stone-300 shadow-inner flex-shrink-0"
                          style={{ backgroundColor: bg.color }}
                        />
                        <div>
                          <p className={`font-bold ${isLight ? 'text-stone-900' : 'text-stone-100'}`}>{bg.name}</p>
                          <p className={`text-[10px] ${isLight ? 'text-stone-600' : 'text-stone-400'}`}>{bg.desc}</p>
                        </div>
                      </div>
                      {activePage.bgTheme === bg.id && <Check className="w-4 h-4 text-emerald-600 font-bold" />}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* =========================================================================
            CENTER STAGE: CANVA LIVE CANVAS VIEW (WITH DIRECT CLICK-TO-EDIT)
            ========================================================================= */}
        <div className={`flex-1 flex flex-col relative overflow-hidden transition-colors ${
          isLight ? 'bg-[#F5EFE6]' : 'bg-[#020b0a]'
        }`}>
          
          {/* Top Canvas Status Bar */}
          <div className={`h-11 border-b px-4 sm:px-6 flex items-center justify-between text-xs z-10 flex-shrink-0 backdrop-blur-md transition-colors ${
            isLight ? 'bg-white/95 border-[#E5DAC6] text-stone-900 shadow-sm' : 'bg-[#061e1d]/80 border-gold-subtle/40 text-stone-300'
          }`}>
            <div className="flex items-center gap-2">
              <span className={`font-black ${isLight ? 'text-amber-950' : 'text-gold-300'}`}>
                {activePage.title}
              </span>
              <span className={`text-[10px] hidden md:inline ${isLight ? 'text-stone-600 font-medium' : 'text-stone-400'}`}>
                • {isJawa ? 'Template Adat Jawa' : isMinang ? 'Template Adat Minang' : 'Template Modern'}
              </span>
            </div>

            {/* Right: Zoom Controls & Right Panel Toggle */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className={`flex items-center gap-1 px-2 py-0.5 rounded-lg border text-xs ${
                isLight ? 'bg-[#FAF8F5] border-amber-200 text-stone-800 shadow-sm' : 'bg-black/40 border-white/10 text-gold-300'
              }`}>
                <button onClick={() => setZoomLevel(z => Math.max(70, z - 10))} className={`p-0.5 ${isLight ? 'hover:text-amber-900' : 'hover:text-gold-400'}`}>
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className={`font-mono text-[11px] font-black w-10 text-center ${isLight ? 'text-amber-950' : 'text-gold-300'}`}>{zoomLevel}%</span>
                <button onClick={() => setZoomLevel(z => Math.min(130, z + 10))} className={`p-0.5 ${isLight ? 'hover:text-amber-900' : 'hover:text-gold-400'}`}>
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={() => setRightPanelOpen(!rightPanelOpen)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs transition-colors ${
                  rightPanelOpen 
                    ? isLight
                      ? 'bg-amber-100 border-amber-400 text-amber-950 font-bold shadow-sm'
                      : 'bg-gold-950 border-gold-subtle text-gold-300'
                    : isLight
                    ? 'bg-white border-stone-200 text-stone-700 hover:bg-amber-50 shadow-sm'
                    : 'bg-white/5 border-white/10 text-stone-400 hover:text-white'
                }`}
              >
                <Sliders className="w-3 h-3" />
                <span className="hidden sm:inline">Lapisan</span>
              </button>
            </div>
          </div>

          {/* Canvas Scroll Area */}
          <div className="flex-1 flex items-center justify-center p-4 sm:p-6 overflow-auto">
            
            {/* SMARTPHONE CANVAS FRAME */}
            <div 
              style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'center center' }}
              className={`relative shadow-2xl border-4 border-gold-500/50 overflow-hidden flex flex-col transition-all duration-300 ${
                deviceMode === 'mobile'
                  ? 'w-[370px] h-[720px] rounded-[44px]'
                  : 'w-[760px] h-[720px] rounded-[24px]'
              }`}
            >
              
              {/* PAGE BACKGROUND LAYER */}
              <div 
                className={`absolute inset-0 bg-cover bg-center transition-all duration-500 ${
                  isJawa
                    ? 'bg-[#180e09]'
                    : isMinang
                    ? 'bg-[#220508]'
                    : 'bg-[#051817] bg-velvet-texture'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />
              </div>

              {/* 4-CORNER ROYAL FILIGREE ORNAMENTS & INNER BORDER */}
              <CardFrameBorder template={currentTemplate} isLight={isLight} />

              {/* RENDER ACTIVE PAGE CONTENT WITH FRAMER MOTION */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePage.id + currentTemplate}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="relative z-10 w-full h-full flex flex-col p-6 text-center overflow-y-auto scrollbar-none font-sans"
                >
                  
                  {/* ====================================================
                      PAGE 1: COVER (SAMPUL) WITH DIRECT CLICK-TO-EDIT
                      ==================================================== */}
                  {activePage.type === 'cover' && !hiddenSections['cover'] && (
                    <div className="my-auto flex flex-col items-center justify-between h-full py-3">
                      
                      {/* Cultural Top Ornament */}
                      <div 
                        onClick={() => handleSelectElement('theme', 'templates', 0)}
                        className="cursor-pointer group flex flex-col items-center mt-1"
                        title="Klik untuk ganti ornamen / template"
                      >
                        {isJawa ? (
                          <>
                            <GununganWayang 
                              isLight={isLight} 
                              className="w-16 h-24 text-gold-300 drop-shadow-[0_4px_16px_rgba(218,165,32,0.6)] group-hover:scale-105 transition-transform" 
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
                              isLight={isLight} 
                              className="w-24 h-16 text-gold-300 drop-shadow-[0_4px_16px_rgba(218,165,32,0.6)] group-hover:scale-105 transition-transform" 
                            />
                            <RumahGadangMotif 
                              isLight={isLight} 
                              className="w-20 h-7 text-gold-400 -mt-1 opacity-90 group-hover:scale-105 transition-transform" 
                            />
                          </>
                        ) : isBotanical ? (
                          <>
                            <div className="w-14 h-14 rounded-full border-2 border-[#8DA390] p-1 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform bg-[#364939] text-2xl">
                              🌿
                            </div>
                            <span className="text-[9px] tracking-[0.25em] text-[#8DA390] font-bold uppercase mt-1">Green Leaf</span>
                          </>
                        ) : (
                          <>
                            <div className="w-14 h-14 rounded-full border-2 border-gold-400 p-1 flex items-center justify-center shadow-gold-md group-hover:scale-105 transition-transform bg-gradient-to-b from-amber-400/20 to-transparent">
                              <img src="/assets/favicon-h.png" alt="Monogram" className="w-full h-full object-contain rounded-full" />
                            </div>
                            <span className="text-[9px] tracking-[0.25em] text-gold-300 font-bold uppercase mt-1">Eksklusif</span>
                          </>
                        )}
                      </div>

                      <div className="space-y-2 w-full my-auto">
                        {/* Subheading / Cultural Greeting */}
                        <div 
                          onClick={() => handleSelectElement('subheading', 'text', 0)}
                          className={getElementOutline('subheading')}
                          title="Klik untuk ubah sub judul pembuka"
                        >
                          <p className={`text-[10px] uppercase font-bold tracking-[0.22em] ${
                            isJawa ? 'text-[#e6ba64]' : isMinang ? 'text-[#f5d77f]' : isBotanical ? 'text-[#8DA390]' : 'text-gold-300'
                          }`}>
                            {activePage.data?.subheading || (isJawa ? 'PAHARGYAN DHAUPIPUN TEMANTEN' : isMinang ? 'BARALEK GADANG PERNIKAHAN MINANGKABAU' : isBotanical ? 'THE WEDDING OF' : 'THE WEDDING CELEBRATION OF')}
                          </p>
                        </div>

                        {/* Groom & Bride Names - ONLY H1 USES SERIF */}
                        <div 
                          onClick={() => handleSelectElement('groomName', 'text', 0)}
                          className={getElementOutline('groomName')}
                          title="Klik untuk ubah nama mempelai"
                        >
                          {isBotanical ? (
                            <BotanicalArchFrame className="py-5 px-3">
                              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
                                {activePage.data?.groomName || 'Rian'} <br />
                                <span className="font-sans font-light text-2xl text-amber-200/90">&</span> <br />
                                {activePage.data?.brideName || 'Irna'}
                              </h1>
                            </BotanicalArchFrame>
                          ) : (
                            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFF4BE] via-[#DFB051] to-[#F5D77F] tracking-tight leading-tight drop-shadow-md">
                              {activePage.data?.groomName || (isJawa ? 'Raden Mas Dimas' : isMinang ? 'Dimas Marah Sutan' : 'Dimas')} <br />
                              <span className="font-sans font-light text-2xl text-amber-200/90">&</span> <br />
                              {activePage.data?.brideName || (isJawa ? 'Raden Ajeng Clarissa' : isMinang ? 'Clarissa Rangkayo' : 'Clarissa')}
                            </h1>
                          )}
                        </div>

                        {/* Cultural Divider */}
                        <div className="my-1.5 flex flex-col items-center">
                          {isJawa ? (
                            <>
                              <KawungMotifDivider isLight={isLight} className="mx-auto" />
                              <RonceMelatiDivider className="mx-auto mt-1 opacity-80" />
                            </>
                          ) : isMinang ? (
                            <MinangUkiranDivider isLight={isLight} className="mx-auto" />
                          ) : isBotanical ? (
                            <div className="flex items-center justify-center gap-2 text-sm text-[#8DA390] my-1">
                              <span>🌿</span>
                              <div className="w-16 h-px bg-[#8DA390]/50" />
                              <span>🌿</span>
                            </div>
                          ) : (
                            <BotanicalFoilDivider isLight={isLight} className="mx-auto" />
                          )}
                        </div>

                        {/* Date Text */}
                        <div 
                          onClick={() => handleSelectElement('dateText', 'text', 0)}
                          className={getElementOutline('dateText')}
                          title="Klik untuk ubah tanggal pernikahan"
                        >
                          <p className="text-xs text-stone-200 font-medium tracking-wide">
                            {activePage.data?.dateText || 'Sabtu, 18 Juli 2026'}
                          </p>
                        </div>

                        {/* Venue & City */}
                        <div 
                          onClick={() => handleSelectElement('venueCity', 'text', 0)}
                          className={getElementOutline('venueCity')}
                          title="Klik untuk ubah lokasi gedung & kota"
                        >
                          <p className="text-[10px] text-stone-300 max-w-[240px] mx-auto leading-relaxed">
                            {activePage.data?.venueCity || 'The Glass House Ballroom, Jakarta'}
                          </p>
                        </div>
                      </div>

                      {/* Guest Card & Open Button */}
                      <div className="w-full space-y-2 pt-2">
                        <div 
                          onClick={() => handleSelectElement('guestName', 'text', 0)}
                          className={`bg-black/60 backdrop-blur-md border border-gold-400/40 rounded-2xl p-2.5 shadow-gold-sm ${getElementOutline('guestName')}`}
                          title="Klik untuk ubah nama tamu"
                        >
                          <p className="text-[9px] text-gold-300/80 uppercase tracking-widest font-semibold">Kepada Yth. Tamu Undangan:</p>
                          <p className="text-xs font-bold text-white mt-0.5">{guestName}</p>
                        </div>

                        <button
                          onClick={() => setActivePageIndex(1)}
                          className={`w-full py-2.5 rounded-full bg-gradient-to-r ${
                            isJawa
                              ? 'from-[#e6ba64] to-[#c6923c]'
                              : isMinang
                              ? 'from-[#f5d77f] to-[#e0b042]'
                              : 'from-amber-400 via-gold-300 to-amber-500'
                          } text-black font-extrabold text-xs uppercase tracking-wider shadow-gold-sm hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-1.5`}
                        >
                          <Heart className="w-3.5 h-3.5 fill-current" />
                          <span>{activePage.data?.buttonText || 'Buka Undangan'}</span>
                        </button>
                      </div>

                    </div>
                  )}

                  {/* ====================================================
                      PAGE 2: MEMPELAI WITH DIRECT CLICK-TO-EDIT
                      ==================================================== */}
                  {activePage.type === 'couple' && !hiddenSections['couple'] && (
                    <div className="my-auto space-y-3 py-3">
                      
                      {/* Cultural Top Accents */}
                      <div className="flex justify-center">
                        {isJawa ? (
                          <RonceMelatiDivider className="w-36 h-3" />
                        ) : isMinang ? (
                          <RumahGadangMotif className="w-16 h-5" />
                        ) : (
                          <BotanicalFoilDivider className="w-36 h-3" />
                        )}
                      </div>

                      {/* Quote */}
                      <div 
                        onClick={() => handleSelectElement('introQuote', 'couple', 1)}
                        className={getElementOutline('introQuote')}
                        title="Klik untuk ubah kutipan doa"
                      >
                        <p className="text-[11px] italic text-gold-200/90 max-w-xs mx-auto leading-relaxed px-2">
                          "{pages[1]?.data?.introQuote || 'Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan...'}"
                        </p>
                      </div>

                      {/* Groom */}
                      <div 
                        onClick={() => handleSelectElement('groomFullName', 'couple', 1)}
                        className={`space-y-1 ${getElementOutline('groomFullName')}`}
                        title="Klik untuk ubah data mempelai pria"
                      >
                        <div className={`mx-auto p-1 border-2 shadow-sm overflow-hidden ${
                          isBotanical
                            ? 'w-20 h-28 rounded-[50%] border-[#8DA390] bg-[#F4F7F4]'
                            : 'w-20 h-20 rounded-full border-gold-400 bg-gradient-to-b from-amber-300/20 to-transparent'
                        }`}>
                          <img 
                            src={pages[1]?.data?.groomPhoto || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'} 
                            alt="Groom" 
                            className={`w-full h-full object-cover ${isBotanical ? 'rounded-[50%]' : 'rounded-full'}`} 
                          />
                        </div>
                        <h3 className="text-sm font-bold text-gold-bright mt-1">
                          {pages[1]?.data?.groomFullName || (isJawa ? 'Raden Mas Dimas Setiadi, S.T.' : isMinang ? 'Dimas Marah Sutan, S.T.' : isBotanical ? 'Rian Firmansyah, S.T.' : 'Dimas Setiadi, S.T.')}
                        </h3>
                        <p className="text-[10px] text-stone-300 max-w-xs mx-auto leading-relaxed">
                          {pages[1]?.data?.groomParents || 'Putra Pertama dari Bpk. Ir. Bambang & Ibu Hj. Sri Wahyuni'}
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
                      <div 
                        onClick={() => handleSelectElement('brideFullName', 'couple', 1)}
                        className={`space-y-1 ${getElementOutline('brideFullName')}`}
                        title="Klik untuk ubah data mempelai wanita"
                      >
                        <div className={`mx-auto p-1 border-2 shadow-sm overflow-hidden ${
                          isBotanical
                            ? 'w-20 h-28 rounded-[50%] border-[#8DA390] bg-[#F4F7F4]'
                            : 'w-20 h-20 rounded-full border-gold-400 bg-gradient-to-b from-amber-300/20 to-transparent'
                        }`}>
                          <img 
                            src={pages[1]?.data?.bridePhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'} 
                            alt="Bride" 
                            className={`w-full h-full object-cover ${isBotanical ? 'rounded-[50%]' : 'rounded-full'}`} 
                          />
                        </div>
                        <h3 className="text-sm font-bold text-gold-bright mt-1">
                          {pages[1]?.data?.brideFullName || (isJawa ? 'Raden Ajeng Clarissa Putri, M.Ds.' : isMinang ? 'Clarissa Rangkayo, M.Ds.' : isBotanical ? 'Irna Agustiani, S.Pd.' : 'Clarissa Putri, M.Ds.')}
                        </h3>
                        <p className="text-[10px] text-stone-300 max-w-xs mx-auto leading-relaxed">
                          {pages[1]?.data?.brideParents || 'Putri Kedua dari Bpk. Dr. Hendra & Ibu Hj. Maya Kusuma'}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* ====================================================
                      PAGE 3: EVENTS WITH DIRECT CLICK-TO-EDIT
                      ==================================================== */}
                  {activePage.type === 'events' && !hiddenSections['events'] && (
                    <div className="my-auto space-y-3 py-4">
                      <h2 className="text-lg font-bold text-gold-bright">
                        {pages[2]?.data?.title || 'Rangkaian Hari Bahagia'}
                      </h2>

                      {/* Akad Nikah */}
                      <div 
                        onClick={() => handleSelectElement('akadDate', 'events', 2)}
                        className={`p-3 rounded-2xl bg-black/50 border border-gold-400/40 text-left space-y-1 shadow-gold-sm ${getElementOutline('akadDate')}`}
                        title="Klik untuk ubah jadwal Akad"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-gold-300 uppercase tracking-wider">
                            {pages[2]?.data?.akadTitle || 'Akad Nikah'}
                          </span>
                          <Calendar className="w-3.5 h-3.5 text-gold-400" />
                        </div>
                        <p className="text-xs font-bold text-white">{pages[2]?.data?.akadDate || 'Sabtu, 18 Juli 2026'}</p>
                        <p className="text-[10px] text-stone-300">{pages[2]?.data?.akadTime || '08.00 - 10.00 WIB'}</p>
                        <p className="text-[10px] text-stone-400 flex items-start gap-1">
                          <MapPin className="w-3 h-3 text-gold-400 flex-shrink-0 mt-0.5" />
                          <span>{pages[2]?.data?.akadPlace || 'Masjid Agung Al-Azhar, Jakarta Selatan'}</span>
                        </p>
                      </div>

                      {/* Resepsi */}
                      <div 
                        onClick={() => handleSelectElement('resepsiDate', 'events', 2)}
                        className={`p-3 rounded-2xl bg-black/50 border border-gold-400/40 text-left space-y-1 shadow-gold-sm ${getElementOutline('resepsiDate')}`}
                        title="Klik untuk ubah jadwal Resepsi"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-gold-300 uppercase tracking-wider">
                            {pages[2]?.data?.resepsiTitle || 'Resepsi Pernikahan'}
                          </span>
                          <Calendar className="w-3.5 h-3.5 text-gold-400" />
                        </div>
                        <p className="text-xs font-bold text-white">{pages[2]?.data?.resepsiDate || 'Sabtu, 18 Juli 2026'}</p>
                        <p className="text-[10px] text-stone-300">{pages[2]?.data?.resepsiTime || '11.00 - 14.00 WIB'}</p>
                        <p className="text-[10px] text-stone-400 flex items-start gap-1">
                          <MapPin className="w-3 h-3 text-gold-400 flex-shrink-0 mt-0.5" />
                          <span>{pages[2]?.data?.resepsiPlace || 'The Glass House Ballroom, Senopati'}</span>
                        </p>
                      </div>
                    </div>
                  )}

                  {/* ====================================================
                      PAGE 4: STORY & GALLERY
                      ==================================================== */}
                  {activePage.type === 'story' && !hiddenSections['story'] && (
                    <div className="my-auto space-y-3 py-4">
                      <h2 className="text-lg font-bold text-gold-bright">
                        {pages[3]?.data?.storyTitle || 'Perjalanan Cinta Kami'}
                      </h2>
                      <p className="text-xs text-stone-300 max-w-xs mx-auto">
                        {pages[3]?.data?.storyIntro || 'Dari ruang kuliah tahun 2021 hingga mengucap janji suci seumur hidup.'}
                      </p>

                      <div className="grid grid-cols-2 gap-2 pt-1">
                        {(pages[3]?.data?.photos || []).map((src: string, i: number) => (
                          <div key={i} className="aspect-square rounded-2xl overflow-hidden border-2 border-gold-400/50 shadow-gold-sm">
                            <img src={src} alt="Prewedding" className="w-full h-full object-cover hover:scale-105 transition-transform" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ====================================================
                      PAGE 5: GIFTS & AMPLOP WITH DIRECT CLICK-TO-EDIT
                      ==================================================== */}
                  {activePage.type === 'gift' && !hiddenSections['gift'] && (
                    <div className="my-auto space-y-3 py-4">
                      <h2 className="text-lg font-bold text-gold-bright">
                        Tanda Kasih & Hadiah
                      </h2>
                      <p className="text-xs text-stone-300">
                        Doa restu Anda merupakan karunia terindah bagi kami.
                      </p>

                      {/* Bank 1 */}
                      <div 
                        onClick={() => handleSelectElement('bankName1', 'gift', 4)}
                        className={`p-3 rounded-2xl bg-black/50 border border-gold-400/40 text-left shadow-gold-sm ${getElementOutline('bankName1')}`}
                        title="Klik untuk ubah rekening Bank 1"
                      >
                        <p className="text-[10px] font-bold text-gold-400">{pages[4]?.data?.bankName1 || 'BCA'}</p>
                        <p className="text-sm font-mono font-bold text-white mt-0.5">{pages[4]?.data?.accNumber1 || '8820 1234 5678'}</p>
                        <p className="text-[11px] text-stone-300">a.n. {pages[4]?.data?.accHolder1 || 'DIMAS SETIADI'}</p>
                      </div>

                      {/* Bank 2 */}
                      <div 
                        onClick={() => handleSelectElement('bankName2', 'gift', 4)}
                        className={`p-3 rounded-2xl bg-black/50 border border-gold-400/40 text-left shadow-gold-sm ${getElementOutline('bankName2')}`}
                        title="Klik untuk ubah rekening Bank 2"
                      >
                        <p className="text-[10px] font-bold text-gold-400">{pages[4]?.data?.bankName2 || 'Bank Mandiri'}</p>
                        <p className="text-sm font-mono font-bold text-white mt-0.5">{pages[4]?.data?.accNumber2 || '1370 0098 7654'}</p>
                        <p className="text-[11px] text-stone-300">a.n. {pages[4]?.data?.accHolder2 || 'CLARISSA PUTRI'}</p>
                      </div>
                    </div>
                  )}

                  {/* ====================================================
                      PAGE 6: RSVP
                      ==================================================== */}
                  {activePage.type === 'rsvp' && !hiddenSections['rsvp'] && (
                    <div className="my-auto space-y-3 py-4 text-left">
                      <h2 className="text-lg font-bold text-gold-bright text-center">
                        Konfirmasi Kehadiran
                      </h2>

                      <div className="space-y-2 bg-black/50 p-3.5 rounded-2xl border border-gold-400/40 shadow-gold-sm">
                        <div>
                          <label className="text-[10px] text-stone-300 block mb-1">Nama Lengkap Tamu:</label>
                          <input
                            type="text"
                            value={guestName}
                            onChange={(e) => setGuestName(e.target.value)}
                            className="w-full bg-[#041514] border border-gold-subtle rounded-lg px-2.5 py-1 text-xs text-stone-100"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] text-stone-300 block mb-1">Konfirmasi:</label>
                          <select className="w-full bg-[#041514] border border-gold-subtle rounded-lg px-2.5 py-1 text-xs text-stone-100">
                            <option>✓ Saya Akan Hadir</option>
                            <option>✕ Maaf, Belum Bisa Hadir</option>
                            <option>? Masih Ragu-Ragu</option>
                          </select>
                        </div>

                        <button className="w-full py-2 bg-gradient-to-r from-amber-400 to-gold-400 text-black text-xs font-bold rounded-lg shadow-gold-sm">
                          Kirim Konfirmasi & Doa
                        </button>
                      </div>
                    </div>
                  )}

                </motion.div>
              </AnimatePresence>

            </div>

          </div>

          {/* =========================================================================
              CANVA BOTTOM FILMSTRIP (PAGES THUMBNAILS BAR)
              ========================================================================= */}
          <div className={`h-20 border-t flex items-center px-4 overflow-x-auto gap-3 flex-shrink-0 z-20 transition-colors ${
            isLight ? 'bg-white/95 border-[#E5DAC6]' : 'bg-[#031110] border-gold-subtle'
          }`}>
            {pages.map((page, index) => (
              <div
                key={page.id}
                onClick={() => setActivePageIndex(index)}
                className={`flex-shrink-0 w-28 h-16 rounded-xl border-2 p-1.5 cursor-pointer transition-all flex flex-col justify-between ${
                  activePageIndex === index
                    ? isLight
                      ? 'border-amber-500 bg-amber-50 shadow-md ring-2 ring-amber-300/40 scale-105'
                      : 'border-gold-400 bg-gold-950/60 shadow-gold-sm scale-105'
                    : isLight
                    ? 'border-stone-200 bg-white hover:border-amber-300 shadow-sm'
                    : 'border-white/15 bg-white/5 hover:border-gold-subtle'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-black ${isLight ? 'text-amber-950' : 'text-gold-300'}`}>Hal {index + 1}</span>
                  <span className={`text-[9px] font-semibold uppercase truncate max-w-[60px] ${isLight ? 'text-stone-500' : 'text-stone-400'}`}>{page.type}</span>
                </div>
                <p className={`text-[10px] font-bold truncate ${isLight ? 'text-stone-900' : 'text-stone-200'}`}>{page.title}</p>
              </div>
            ))}

            <button
              onClick={() => addPage(`${pages.length + 1}. Halaman Baru`, 'story', isJawa ? 'jawa_sogan' : isMinang ? 'minang_marawa' : 'velvet')}
              className={`flex-shrink-0 w-24 h-16 rounded-xl border-2 border-dashed flex flex-col items-center justify-center text-[10px] font-bold gap-0.5 transition-colors ${
                isLight
                  ? 'border-amber-400 text-amber-950 bg-amber-50/50 hover:bg-amber-100'
                  : 'border-gold-500/40 text-gold-300 hover:border-gold-400'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Hal</span>
            </button>
          </div>

        </div>

        {/* =========================================================================
            RIGHT PANEL: SECTIONS & LAYERS INSPECTOR
            ========================================================================= */}
        {rightPanelOpen && (
          <div className={`w-72 border-l flex flex-col flex-shrink-0 z-20 transition-colors ${
            isLight ? 'bg-white border-[#E5DAC6] text-stone-800' : 'bg-[#041514] border-gold-subtle text-stone-100'
          }`}>
            <div className={`p-3.5 border-b flex items-center justify-between ${
              isLight ? 'border-amber-200 bg-amber-50/50' : 'border-gold-subtle'
            }`}>
              <div>
                <h3 className={`text-xs font-black ${isLight ? 'text-amber-950' : 'text-gold-bright'}`}>Isi Undangan</h3>
                <p className={`text-[10px] ${isLight ? 'text-stone-600' : 'text-stone-400'}`}>{pages.length} bagian • Klik untuk pilih</p>
              </div>
              <button 
                onClick={() => setRightPanelOpen(false)} 
                className={`p-1 rounded ${isLight ? 'text-stone-600 hover:text-stone-900' : 'text-stone-400 hover:text-white'}`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* List of Sections with Eye (Visibility) Toggle */}
            <div className="flex-1 overflow-y-auto p-3 space-y-1.5 text-xs">
              {[
                { id: 'cover', title: '1. Sampul Pembuka', type: 'Sampul', tab: 'text', page: 0 },
                { id: 'couple', title: '2. Profil Mempelai', type: 'Mempelai', tab: 'couple', page: 1 },
                { id: 'events', title: '3. Waktu & Lokasi', type: 'Acara', tab: 'events', page: 2 },
                { id: 'story', title: '4. Galeri Prewedding', type: 'Galeri', tab: 'pages', page: 3 },
                { id: 'gift', title: '5. Amplop Digital', type: 'Amplop', tab: 'gift', page: 4 },
                { id: 'rsvp', title: '6. RSVP & Buku Tamu', type: 'RSVP', tab: 'pages', page: 5 },
              ].map((sec) => (
                <div
                  key={sec.id}
                  onClick={() => {
                    setActivePageIndex(sec.page);
                    setActiveTab(sec.tab as any);
                  }}
                  className={`p-2.5 rounded-xl border-2 flex items-center justify-between transition-colors cursor-pointer ${
                    activePageIndex === sec.page 
                      ? isLight
                        ? 'border-amber-500 bg-amber-50 text-amber-950 font-bold shadow-sm'
                        : 'border-gold-400 bg-gold-950/40 text-gold-200' 
                      : isLight
                      ? 'border-stone-200 bg-[#FAF8F5] hover:border-amber-300 text-stone-800 shadow-sm'
                      : 'border-white/10 hover:border-gold-subtle text-stone-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${isLight ? 'bg-amber-600' : 'bg-gold-400'}`} />
                    <div>
                      <p className="font-bold text-xs leading-none">{sec.title}</p>
                      <span className={`text-[9px] uppercase font-semibold ${isLight ? 'text-stone-500' : 'text-stone-500'}`}>{sec.type}</span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => toggleSectionVisibility(sec.id, e)}
                    className={`p-1 ${isLight ? 'text-stone-500 hover:text-stone-900' : 'text-stone-400 hover:text-white'}`}
                    title={hiddenSections[sec.id] ? 'Tampilkan' : 'Sembunyikan'}
                  >
                    {hiddenSections[sec.id] ? <EyeOff className="w-3.5 h-3.5 text-stone-400" /> : <Eye className={`w-3.5 h-3.5 ${isLight ? 'text-amber-700' : 'text-gold-400'}`} />}
                  </button>
                </div>
              ))}
            </div>

            {/* Bottom Actions */}
            <div className={`p-3 border-t space-y-2 ${isLight ? 'border-amber-200' : 'border-gold-subtle'}`}>
              <button
                onClick={exportHTML}
                className={`w-full py-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm ${
                  isLight
                    ? 'bg-amber-100 text-amber-950 border-amber-300 hover:bg-amber-200'
                    : 'bg-white/5 border-gold-subtle hover:bg-white/10 text-stone-300'
                }`}
              >
                <Download className={`w-3.5 h-3.5 ${isLight ? 'text-amber-800' : 'text-gold-400'}`} />
                <span>Unduh File HTML</span>
              </button>
            </div>
          </div>
        )}

      </div>

      {/* =========================================================================
          MODALS: ONBOARDING WIZARD, DISCOUNT GIFT & FULL ACTIVATION
          ========================================================================= */}
      <OnboardingWizardModal
        isOpen={showOnboardingModal}
        onClose={() => setShowOnboardingModal(false)}
        onSelectStep={(tab) => {
          setActiveTab(tab as any);
          setLeftPanelOpen(true);
        }}
        onOpenActivation={() => setShowActivationModal(true)}
      />

      <DiscountGiftModal
        isOpen={showDiscountModal}
        onClose={() => setShowDiscountModal(false)}
        onContinueToPayment={() => setShowActivationModal(true)}
      />

      <ActivationModal
        isOpen={showActivationModal}
        onClose={() => setShowActivationModal(false)}
      />

      {/* =========================================================================
          MODAL: PUBLISH / LIVE MODAL
          ========================================================================= */}
      {showPublishModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#061e1d] border border-gold-400 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setShowPublishModal(false)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-gold-400 mb-2">
              <Globe className="w-5 h-5" />
              <span className="text-xs uppercase font-extrabold tracking-wider">Website Live Aktif!</span>
            </div>

            <h3 className="text-2xl font-bold text-gold-bright">
              Undangan Resmi Siap Disebarkan
            </h3>
            <p className="text-xs text-stone-300 mt-1 leading-relaxed">
              Website undangan pernikahan Anda telah berhasil dipublikasikan secara live dengan tema {isJawa ? 'Adat Jawa' : isMinang ? 'Adat Minang' : 'Modern Emerald'} dan musik latar interaktif.
            </p>

            <div className="mt-5 space-y-3">
              <div>
                <label className="text-xs font-semibold text-stone-300 block mb-1">
                  Nama Tamu Penerima:
                </label>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full bg-[#041514] border border-gold-subtle rounded-xl px-3 py-2 text-xs text-stone-100"
                />
              </div>

              <div className="p-3 bg-black/50 rounded-xl border border-gold-subtle text-xs font-mono text-gold-300 break-all flex items-center justify-between gap-2">
                <span className="truncate">{livePublicUrl}</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(livePublicUrl);
                    setCopiedLink(true);
                    setTimeout(() => setCopiedLink(false), 2000);
                  }}
                  className="px-2.5 py-1 bg-gold-400 text-black font-bold rounded text-[10px] flex-shrink-0"
                >
                  {copiedLink ? 'Tersalin!' : 'Salin'}
                </button>
              </div>

              <div className="flex gap-2.5 pt-2">
                <a
                  href={`/${slug}?to=${encodeURIComponent(guestName)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-gold-400 text-black text-xs font-bold uppercase tracking-wider text-center shadow-gold-sm flex items-center justify-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Buka Website Tamu (Live)
                </a>

                <a
                  href={`https://wa.me/?text=Kepada%20Yth.%20${encodeURIComponent(guestName)},%20kami%20mengundang%20ke%20pernikahan%20kami:%20${encodeURIComponent(livePublicUrl)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  Bagikan ke WA
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
