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
  ChevronUp,
  ChevronDown,
  Edit3,
  PanelLeftClose,
  PanelLeftOpen,
  Crown,
  Sun,
  Moon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Upload,
  Image as ImageIcon,
  PlusCircle,
  SlidersHorizontal,
  Maximize2,
  Minus
} from 'lucide-react';
import { TEMPLATE_PRESETS } from '../../constants/initialData';
import {
  LUXURY_BG_COLORS,
  LUXURY_BG_GRADIENTS,
  LUXURY_PNG_PRESETS,
  DIVIDER_STYLES,
  SPACER_PRESETS,
  FONT_SIZE_PRESETS,
  CONTAINER_PADDING_OPTIONS,
  CONTAINER_RADIUS_OPTIONS
} from '../../constants/designElements';
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
    updatePageConfig,
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
    addCustomElement,
    updateCustomElement,
    deleteCustomElement,
    moveCustomElement,
  } = useInvitation();

  const isLight = themeMode === 'light';

  // Navigation & View States
  const [activeTab, setActiveTab] = useState<'wizard' | 'templates' | 'pages' | 'text' | 'elements' | 'couple' | 'events' | 'theme' | 'gift' | 'music'>('templates');
  const [viewMode, setViewMode] = useState<'cover' | 'content'>('cover');
  const [deviceMode, setDeviceMode] = useState<'mobile' | 'desktop'>('mobile');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [leftPanelOpen, setLeftPanelOpen] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const [rightPanelTab, setRightPanelTab] = useState<'sections' | 'layers'>('sections');
  
  // File input refs for local photo & PNG uploads
  const groomFileInputRef = useRef<HTMLInputElement>(null);
  const brideFileInputRef = useRef<HTMLInputElement>(null);
  const customPhotoInputRef = useRef<HTMLInputElement>(null);
  const customPngInputRef = useRef<HTMLInputElement>(null);
  const [pngUploadMode, setPngUploadMode] = useState<'element' | 'watermark'>('element');
  const [selectedSpacerHeight, setSelectedSpacerHeight] = useState<number>(24);
  const [selectedDividerStyle, setSelectedDividerStyle] = useState<'gold_hairline' | 'batik' | 'minang' | 'melati' | 'dashed'>('gold_hairline');

  // Direct PNG File Upload Handler (for Element sticker or Container Background Watermark)
  const handleCustomPngUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) {
      alert('Ukuran file maksimal 8MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        if (pngUploadMode === 'element') {
          addCustomElement(activePageIndex, {
            type: 'png_overlay',
            content: result,
            pngUrl: result,
            pngScale: 100,
            pngOpacity: 90,
            align: 'center',
          });
        } else {
          updatePageConfig(activePageIndex, {
            bgPngOverlay: {
              url: result,
              opacity: 35,
              scale: 100,
              position: 'center',
            }
          });
        }
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Element Click-to-Edit State
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);

  // Curated Preset Wedding Portraits
  const GROOM_PRESETS = [
    { label: 'Jas Hitam Formal', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80' },
    { label: 'Tuxedo Elegan', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80' },
    { label: 'Adat Sogan Keraton', url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=500&q=80' },
    { label: 'Outdoor Natural', url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=80' },
  ];

  const BRIDE_PRESETS = [
    { label: 'Gaun Anggun Ivory', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80' },
    { label: 'Hijab Pengantin', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=500&q=80' },
    { label: 'Mahkota Suntiang', url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=500&q=80' },
    { label: 'Botanical Floral', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80' },
  ];

  // Direct Image File Upload Handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, pageIdx: number, field: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) {
      alert('Ukuran file maksimal 8MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        updatePageData(pageIdx, field, result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCustomPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        addCustomElement(activePageIndex, {
          type: 'photo',
          content: result,
          align: 'center',
          size: 'base'
        });
      }
    };
    reader.readAsDataURL(file);
  };

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
          1. TOP STUDIO PRO NAVIGATION BAR
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
            href={`/${slug}?to=${encodeURIComponent(guestName)}&theme=${currentTemplate}`}
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
        
        {/* LEFT TOOLBAR TABS (STUDIO NAVIGATION) */}
        <div className={`w-16 sm:w-20 border-r flex flex-col items-center py-3 gap-2 flex-shrink-0 z-20 overflow-y-auto transition-colors ${
          isLight ? 'bg-[#FAF8F5] border-[#E5DAC6]' : 'bg-[#031110] border-gold-subtle'
        }`}>
          {[
            { id: 'templates', label: 'Template', icon: <Crown className="w-4 h-4 text-gold-400" /> },
            { id: 'pages', label: 'Halaman', icon: <Layers className="w-4 h-4" /> },
            { id: 'elements', label: 'Elemen', icon: <PlusCircle className="w-4 h-4 text-amber-400" /> },
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

            {/* TAB: TAMBAH OBJEK / ELEMEN (STUDIO BUILDER) */}
            {activeTab === 'elements' && (
              <div className="space-y-4 text-xs">
                {/* Hidden File Input for Custom PNG Uploads */}
                <input
                  ref={customPngInputRef}
                  type="file"
                  accept="image/png,image/webp,image/svg+xml"
                  onChange={handleCustomPngUpload}
                  className="hidden"
                />

                <div className={`pb-2 border-b-2 ${
                  isLight ? 'border-amber-200' : 'border-gold-subtle'
                }`}>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${
                    isLight ? 'text-amber-800' : 'text-gold-400'
                  }`}>
                    STUDIO EDITOR PRO • ELEMEN
                  </span>
                  <h3 className={`text-xs font-black uppercase tracking-wider mt-0.5 ${
                    isLight ? 'text-amber-950' : 'text-gold-300'
                  }`}>
                    Tambah & Atur Objek Hal {activePageIndex + 1}
                  </h3>
                  <p className={`text-[11px] mt-1 ${isLight ? 'text-stone-600' : 'text-stone-300'}`}>
                    Geser urutan atas/bawah, ubah ukuran font, garis divider adat, spacer jarak, dan stiker PNG kustom.
                  </p>
                </div>

                {/* Submenu 1: Teks Baru */}
                <div className={`p-3 rounded-2xl border space-y-2 ${
                  isLight ? 'bg-amber-50/60 border-amber-200' : 'bg-black/40 border-gold-subtle'
                }`}>
                  <span className={`font-black block text-[11px] uppercase tracking-wider ${
                    isLight ? 'text-amber-950' : 'text-gold-300'
                  }`}>
                    📝 Tambah Teks Baru
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => addCustomElement(activePageIndex, {
                        type: 'heading',
                        content: 'Judul Baru',
                        align: 'center',
                        fontSize: 24,
                        fontWeight: 'bold',
                        color: '#E6CA65'
                      })}
                      className={`p-2 rounded-xl border text-left font-serif font-bold text-xs transition-all hover:scale-102 ${
                        isLight ? 'bg-white border-amber-300 text-stone-900 hover:bg-amber-100/50' : 'bg-white/5 border-gold-400/40 text-gold-200 hover:bg-white/10'
                      }`}
                    >
                      + Judul Utama
                    </button>
                    <button
                      type="button"
                      onClick={() => addCustomElement(activePageIndex, {
                        type: 'subheading',
                        content: 'Subjudul atau Salam Pembuka',
                        align: 'center',
                        fontSize: 14,
                        fontWeight: 'semibold',
                        color: '#F59E0B'
                      })}
                      className={`p-2 rounded-xl border text-left font-sans font-semibold text-[11px] transition-all hover:scale-102 ${
                        isLight ? 'bg-white border-amber-300 text-stone-900 hover:bg-amber-100/50' : 'bg-white/5 border-gold-400/40 text-gold-200 hover:bg-white/10'
                      }`}
                    >
                      + Subjudul
                    </button>
                    <button
                      type="button"
                      onClick={() => addCustomElement(activePageIndex, {
                        type: 'paragraph',
                        content: 'Tuliskan pesan doa, petunjuk lokasi, atau informasi pelengkap di sini.',
                        align: 'center',
                        fontSize: 12,
                        color: '#E2E8F0'
                      })}
                      className={`p-2 rounded-xl border text-left font-sans text-[10px] transition-all hover:scale-102 ${
                        isLight ? 'bg-white border-amber-300 text-stone-900 hover:bg-amber-100/50' : 'bg-white/5 border-gold-400/40 text-stone-200 hover:bg-white/10'
                      }`}
                    >
                      + Paragraf / Pesan
                    </button>
                    <button
                      type="button"
                      onClick={() => addCustomElement(activePageIndex, {
                        type: 'quote',
                        content: 'Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu.',
                        align: 'center',
                        fontSize: 12,
                        fontStyle: 'italic',
                        color: '#FDE68A'
                      })}
                      className={`p-2 rounded-xl border text-left font-serif italic text-[10px] transition-all hover:scale-102 ${
                        isLight ? 'bg-white border-amber-300 text-amber-900 hover:bg-amber-100/50' : 'bg-white/5 border-gold-400/40 text-gold-300 hover:bg-white/10'
                      }`}
                    >
                      + Ayat / Kutipan
                    </button>
                  </div>
                </div>

                {/* Submenu 2: Garis Pembatas (Divider Elementor-Style) */}
                <div className={`p-3 rounded-2xl border space-y-2.5 ${
                  isLight ? 'bg-amber-50/60 border-amber-200' : 'bg-black/40 border-gold-subtle'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className={`font-black block text-[11px] uppercase tracking-wider ${
                      isLight ? 'text-amber-950' : 'text-gold-300'
                    }`}>
                      ⚜️ Garis Pembatas (Divider)
                    </span>
                    <span className="text-[10px] text-amber-500 font-semibold">Elementor Style</span>
                  </div>
                  <p className={`text-[10px] leading-tight ${isLight ? 'text-stone-600' : 'text-stone-400'}`}>
                    Pilih ornamen garis pembatas emas untuk memisahkan bagian halaman:
                  </p>
                  <div className="grid grid-cols-1 gap-1.5">
                    {DIVIDER_STYLES.map((style) => (
                      <button
                        key={style.id}
                        type="button"
                        onClick={() => addCustomElement(activePageIndex, {
                          type: 'divider',
                          content: 'divider',
                          dividerStyle: style.id as any,
                          align: 'center'
                        })}
                        className={`p-2 rounded-xl border text-left transition-all hover:scale-[1.01] flex items-center justify-between ${
                          isLight
                            ? 'bg-white border-amber-200 hover:border-amber-400 text-stone-900 shadow-xs'
                            : 'bg-white/5 border-gold-400/30 hover:border-gold-400 text-stone-100'
                        }`}
                      >
                        <div>
                          <p className="font-bold text-[11px] text-amber-400">{style.name}</p>
                          <p className="text-[9px] text-stone-400">{style.desc}</p>
                        </div>
                        <Plus className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submenu 3: Jarak Pemisah (Spacer Elementor-Style) */}
                <div className={`p-3 rounded-2xl border space-y-2.5 ${
                  isLight ? 'bg-amber-50/60 border-amber-200' : 'bg-black/40 border-gold-subtle'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className={`font-black block text-[11px] uppercase tracking-wider ${
                      isLight ? 'text-amber-950' : 'text-gold-300'
                    }`}>
                      📏 Jarak / Pemisah (Spacer)
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-bold">
                      {selectedSpacerHeight} px
                    </span>
                  </div>

                  {/* Preset Pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {SPACER_PRESETS.map((p) => (
                      <button
                        key={p.height}
                        type="button"
                        onClick={() => setSelectedSpacerHeight(p.height)}
                        className={`px-2 py-1 rounded-lg text-[10px] font-semibold border transition-all ${
                          selectedSpacerHeight === p.height
                            ? 'bg-amber-400 text-black border-amber-400 font-bold'
                            : isLight ? 'bg-white border-amber-200 text-stone-700' : 'bg-white/5 border-gold-subtle text-stone-300'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>

                  {/* Height Slider */}
                  <div className="space-y-1">
                    <input
                      type="range"
                      min={8}
                      max={100}
                      step={4}
                      value={selectedSpacerHeight}
                      onChange={(e) => setSelectedSpacerHeight(Number(e.target.value))}
                      className="w-full accent-amber-400 cursor-pointer h-1.5"
                    />
                    <div className="flex justify-between text-[9px] text-stone-400">
                      <span>Rapat (8px)</span>
                      <span>Sedang (48px)</span>
                      <span>Luas (100px)</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => addCustomElement(activePageIndex, {
                      type: 'spacer',
                      content: `${selectedSpacerHeight}px`,
                      spacerHeight: selectedSpacerHeight,
                      align: 'center'
                    })}
                    className="w-full py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-[11px] shadow-sm transition-all flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Sisipkan Spacer ({selectedSpacerHeight}px)</span>
                  </button>
                </div>

                {/* Submenu 4: Ornamen & Stiker PNG Transparan */}
                <div className={`p-3 rounded-2xl border space-y-2.5 ${
                  isLight ? 'bg-amber-50/60 border-amber-200' : 'bg-black/40 border-gold-subtle'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className={`font-black block text-[11px] uppercase tracking-wider ${
                      isLight ? 'text-amber-950' : 'text-gold-300'
                    }`}>
                      🖼️ Stiker & Ornamen PNG
                    </span>
                    <span className="text-[10px] text-stone-400">Transparan</span>
                  </div>
                  
                  {/* Gallery of Luxury PNG Assets */}
                  <div className="grid grid-cols-3 gap-2">
                    {LUXURY_PNG_PRESETS.map((preset) => (
                      <div
                        key={preset.id}
                        onClick={() => addCustomElement(activePageIndex, {
                          type: 'png_overlay',
                          content: preset.previewUrl,
                          pngUrl: preset.previewUrl,
                          pngScale: preset.defaultScale,
                          pngOpacity: preset.defaultOpacity,
                          align: 'center'
                        })}
                        className={`p-2 rounded-xl border flex flex-col items-center justify-center gap-1 cursor-pointer transition-all hover:scale-105 ${
                          isLight
                            ? 'bg-white border-amber-200 hover:border-amber-400 shadow-xs'
                            : 'bg-black/60 border-gold-400/30 hover:border-gold-400'
                        }`}
                        title={`Tambahkan ${preset.name}`}
                      >
                        <div className="w-12 h-12 flex items-center justify-center overflow-hidden">
                          <img
                            src={preset.previewUrl}
                            alt={preset.name}
                            className="max-w-full max-h-full object-contain filter drop-shadow-sm"
                          />
                        </div>
                        <span className="text-[9px] font-medium text-center line-clamp-1 text-stone-300">
                          {preset.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Direct PNG Upload from Local Device */}
                  <button
                    type="button"
                    onClick={() => {
                      setPngUploadMode('element');
                      customPngInputRef.current?.click();
                    }}
                    className={`w-full py-2 px-3 rounded-xl border border-dashed transition-all flex items-center justify-center gap-1.5 font-bold text-[11px] ${
                      isLight
                        ? 'border-amber-400 text-amber-900 bg-amber-100/50 hover:bg-amber-100'
                        : 'border-gold-400/60 text-gold-300 bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload PNG Transparan Sendiri</span>
                  </button>
                </div>

                {/* Submenu 5: Sisipkan Foto Kustom */}
                <div className={`p-3 rounded-2xl border space-y-2 ${
                  isLight ? 'bg-amber-50/60 border-amber-200' : 'bg-black/40 border-gold-subtle'
                }`}>
                  <span className={`font-black block text-[11px] uppercase tracking-wider ${
                    isLight ? 'text-amber-950' : 'text-gold-300'
                  }`}>
                    📷 Sisipkan Foto Prewedding
                  </span>
                  <input
                    ref={customPhotoInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleCustomPhotoUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => customPhotoInputRef.current?.click()}
                    className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-400 via-gold-300 to-amber-500 text-black font-extrabold text-xs shadow-gold-sm hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Foto dari HP / Komputer</span>
                  </button>
                </div>

                {/* Submenu 6: Daftar & Urutan Objek di Halaman Aktif */}
                <div className="space-y-2.5 pt-3 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <span className={`font-black block text-[11px] uppercase tracking-wider ${
                      isLight ? 'text-stone-800' : 'text-stone-200'
                    }`}>
                      🗂️ Daftar & Posisi Objek ({activePage.customElements?.length || 0})
                    </span>
                    <span className="text-[10px] text-stone-400 font-medium">Hal {activePageIndex + 1}</span>
                  </div>

                  {(!activePage.customElements || activePage.customElements.length === 0) ? (
                    <div className={`p-4 rounded-2xl border border-dashed text-center space-y-1 ${
                      isLight ? 'border-stone-300 text-stone-500' : 'border-gold-subtle/50 text-stone-400'
                    }`}>
                      <p className="text-xs font-semibold">Belum ada objek kustom</p>
                      <p className="text-[10px]">Pilih teks, divider, spacer, atau PNG di atas untuk menambahkan elemen ke halaman ini.</p>
                    </div>
                  ) : (
                    <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
                      {activePage.customElements.map((el, idx) => (
                        <div
                          key={el.id}
                          className={`p-3 rounded-2xl border space-y-2.5 transition-all ${
                            selectedElementId === el.id
                              ? 'ring-2 ring-amber-400 bg-amber-400/10 border-amber-400'
                              : isLight ? 'bg-white border-amber-200 shadow-sm' : 'bg-black/60 border-gold-subtle'
                          }`}
                        >
                          {/* Element Header with Move Up/Down, Align & Delete Controls */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-mono text-[10px] font-bold flex items-center justify-center">
                                {idx + 1}
                              </span>
                              <span className={`text-[11px] font-black uppercase tracking-wider ${isLight ? 'text-amber-900' : 'text-gold-300'}`}>
                                {el.type === 'heading' && 'Judul'}
                                {el.type === 'subheading' && 'Subjudul'}
                                {el.type === 'paragraph' && 'Paragraf'}
                                {el.type === 'quote' && 'Kutipan'}
                                {el.type === 'divider' && `Divider (${el.dividerStyle || 'hairline'})`}
                                {el.type === 'spacer' && `Spacer (${el.spacerHeight || 24}px)`}
                                {el.type === 'png_overlay' && 'Stiker PNG'}
                                {el.type === 'photo' && 'Foto'}
                                {el.type === 'ornament' && 'Ornamen'}
                              </span>
                            </div>

                            {/* Action Toolbar */}
                            <div className="flex items-center gap-1">
                              {/* Move Up */}
                              <button
                                type="button"
                                disabled={idx === 0}
                                onClick={() => moveCustomElement(activePageIndex, el.id, 'up')}
                                className="p-1 rounded hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-stone-300"
                                title="Geser Ke Atas"
                              >
                                <ChevronUp className="w-3.5 h-3.5" />
                              </button>

                              {/* Move Down */}
                              <button
                                type="button"
                                disabled={idx === activePage.customElements.length - 1}
                                onClick={() => moveCustomElement(activePageIndex, el.id, 'down')}
                                className="p-1 rounded hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-stone-300"
                                title="Geser Ke Bawah"
                              >
                                <ChevronDown className="w-3.5 h-3.5" />
                              </button>

                              <div className="w-px h-3 bg-white/20 mx-0.5" />

                              {/* Alignment controls */}
                              <button
                                type="button"
                                onClick={() => updateCustomElement(activePageIndex, el.id, { align: 'left' })}
                                className={`p-1 rounded ${el.align === 'left' ? 'bg-amber-400 text-black' : 'text-stone-400 hover:text-white'}`}
                                title="Rata Kiri"
                              >
                                <AlignLeft className="w-3 h-3" />
                              </button>
                              <button
                                type="button"
                                onClick={() => updateCustomElement(activePageIndex, el.id, { align: 'center' })}
                                className={`p-1 rounded ${el.align === 'center' || !el.align ? 'bg-amber-400 text-black' : 'text-stone-400 hover:text-white'}`}
                                title="Rata Tengah"
                              >
                                <AlignCenter className="w-3 h-3" />
                              </button>
                              <button
                                type="button"
                                onClick={() => updateCustomElement(activePageIndex, el.id, { align: 'right' })}
                                className={`p-1 rounded ${el.align === 'right' ? 'bg-amber-400 text-black' : 'text-stone-400 hover:text-white'}`}
                                title="Rata Kanan"
                              >
                                <AlignRight className="w-3 h-3" />
                              </button>

                              <div className="w-px h-3 bg-white/20 mx-0.5" />

                              {/* Delete */}
                              <button
                                type="button"
                                onClick={() => deleteCustomElement(activePageIndex, el.id)}
                                className="p-1 text-rose-400 hover:text-rose-300"
                                title="Hapus Objek"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          {/* Detail Editor: If Text Element */}
                          {(el.type === 'heading' || el.type === 'subheading' || el.type === 'paragraph' || el.type === 'quote') && (
                            <div className="space-y-2 pt-1 border-t border-white/5">
                              {/* Font Size & Weight Toolbar */}
                              <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-1">
                                  <span className="text-[10px] text-stone-400">Ukuran:</span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const current = el.fontSize || (el.type === 'heading' ? 24 : 12);
                                      updateCustomElement(activePageIndex, el.id, { fontSize: Math.max(10, current - 2) });
                                    }}
                                    className="px-1.5 py-0.5 rounded bg-white/10 text-stone-200 hover:bg-white/20 font-bold text-[10px]"
                                    title="Kecilkan Font"
                                  >
                                    A-
                                  </button>
                                  <span className="text-[10px] font-mono text-amber-400 font-bold px-1">
                                    {el.fontSize || (el.type === 'heading' ? 24 : el.type === 'subheading' ? 14 : 12)}px
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const current = el.fontSize || (el.type === 'heading' ? 24 : 12);
                                      updateCustomElement(activePageIndex, el.id, { fontSize: Math.min(56, current + 2) });
                                    }}
                                    className="px-1.5 py-0.5 rounded bg-white/10 text-stone-200 hover:bg-white/20 font-bold text-[10px]"
                                    title="Besarkan Font"
                                  >
                                    A+
                                  </button>
                                </div>

                                {/* Bold & Italic Toggles */}
                                <div className="flex items-center gap-1">
                                  <button
                                    type="button"
                                    onClick={() => updateCustomElement(activePageIndex, el.id, {
                                      fontWeight: el.fontWeight === 'bold' ? 'normal' : 'bold'
                                    })}
                                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                      el.fontWeight === 'bold' ? 'bg-amber-400 text-black' : 'bg-white/10 text-stone-300'
                                    }`}
                                  >
                                    B
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => updateCustomElement(activePageIndex, el.id, {
                                      fontStyle: el.fontStyle === 'italic' ? 'normal' : 'italic'
                                    })}
                                    className={`px-2 py-0.5 rounded text-[10px] italic ${
                                      el.fontStyle === 'italic' ? 'bg-amber-400 text-black font-bold' : 'bg-white/10 text-stone-300'
                                    }`}
                                  >
                                    I
                                  </button>
                                </div>
                              </div>

                              {/* Font Size Slider */}
                              <input
                                type="range"
                                min={10}
                                max={48}
                                step={1}
                                value={el.fontSize || (el.type === 'heading' ? 24 : el.type === 'subheading' ? 14 : 12)}
                                onChange={(e) => updateCustomElement(activePageIndex, el.id, { fontSize: Number(e.target.value) })}
                                className="w-full accent-amber-400 cursor-pointer h-1"
                              />

                              {/* Color Swatches */}
                              <div className="flex items-center gap-1.5 pt-0.5">
                                <span className="text-[9px] text-stone-400">Warna:</span>
                                {[
                                  { color: '#E6CA65', label: 'Emas' },
                                  { color: '#F59E0B', label: 'Amber' },
                                  { color: '#FAF8F5', label: 'Putih Sutra' },
                                  { color: '#FEE2E2', label: 'Mawar' },
                                  { color: '#1C1917', label: 'Hitam' },
                                ].map((c) => (
                                  <div
                                    key={c.color}
                                    onClick={() => updateCustomElement(activePageIndex, el.id, { color: c.color })}
                                    className={`w-4 h-4 rounded-full cursor-pointer border transition-transform hover:scale-125 ${
                                      el.color === c.color ? 'ring-2 ring-amber-400 scale-110 border-white' : 'border-stone-500'
                                    }`}
                                    style={{ backgroundColor: c.color }}
                                    title={c.label}
                                  />
                                ))}
                                <input
                                  type="color"
                                  value={el.color || '#E6CA65'}
                                  onChange={(e) => updateCustomElement(activePageIndex, el.id, { color: e.target.value })}
                                  className="w-5 h-5 rounded cursor-pointer border-0 bg-transparent p-0"
                                  title="Pilih Warna Kustom"
                                />
                              </div>

                              {/* Text Content Editor */}
                              <textarea
                                rows={2}
                                value={el.content}
                                onChange={(e) => updateCustomElement(activePageIndex, el.id, { content: e.target.value })}
                                className={`w-full rounded-xl px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-amber-400 focus:outline-none ${
                                  isLight
                                    ? 'bg-[#FAF8F5] border border-amber-300 text-stone-900'
                                    : 'bg-[#041514] border border-gold-subtle text-stone-100'
                                }`}
                              />
                            </div>
                          )}

                          {/* Detail Editor: If Divider Element */}
                          {el.type === 'divider' && (
                            <div className="space-y-1.5 pt-1 border-t border-white/5">
                              <span className="text-[10px] text-stone-400">Gaya Divider:</span>
                              <div className="grid grid-cols-3 gap-1">
                                {DIVIDER_STYLES.map((d) => (
                                  <button
                                    key={d.id}
                                    type="button"
                                    onClick={() => updateCustomElement(activePageIndex, el.id, { dividerStyle: d.id as any })}
                                    className={`p-1 text-[9px] rounded-lg border font-medium truncate ${
                                      el.dividerStyle === d.id
                                        ? 'bg-amber-400 text-black border-amber-400 font-bold'
                                        : 'bg-white/5 border-white/10 text-stone-300'
                                    }`}
                                  >
                                    {d.name.split(' ')[0]}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Detail Editor: If Spacer Element */}
                          {el.type === 'spacer' && (
                            <div className="space-y-1.5 pt-1 border-t border-white/5">
                              <div className="flex justify-between items-center text-[10px]">
                                <span className="text-stone-400">Tinggi Jarak:</span>
                                <span className="font-mono text-amber-400 font-bold">{el.spacerHeight || 24} px</span>
                              </div>
                              <input
                                type="range"
                                min={8}
                                max={100}
                                step={4}
                                value={el.spacerHeight || 24}
                                onChange={(e) => updateCustomElement(activePageIndex, el.id, { spacerHeight: Number(e.target.value) })}
                                className="w-full accent-amber-400 cursor-pointer h-1"
                              />
                            </div>
                          )}

                          {/* Detail Editor: If PNG Overlay */}
                          {el.type === 'png_overlay' && (
                            <div className="space-y-2 pt-1 border-t border-white/5">
                              <div className="flex items-center gap-2">
                                <img
                                  src={el.pngUrl || el.content}
                                  alt="PNG"
                                  className="w-10 h-10 object-contain rounded-lg border border-gold-400/50 bg-black/40"
                                />
                                <div className="flex-1 space-y-1">
                                  <div className="flex justify-between text-[9px]">
                                    <span className="text-stone-400">Ukuran: {el.pngScale || 100}%</span>
                                    <span className="text-stone-400">Transparansi: {el.pngOpacity || 90}%</span>
                                  </div>
                                  <input
                                    type="range"
                                    min={40}
                                    max={180}
                                    step={5}
                                    value={el.pngScale || 100}
                                    onChange={(e) => updateCustomElement(activePageIndex, el.id, { pngScale: Number(e.target.value) })}
                                    className="w-full accent-amber-400 cursor-pointer h-1"
                                  />
                                  <input
                                    type="range"
                                    min={10}
                                    max={100}
                                    step={5}
                                    value={el.pngOpacity || 90}
                                    onChange={(e) => updateCustomElement(activePageIndex, el.id, { pngOpacity: Number(e.target.value) })}
                                    className="w-full accent-amber-400 cursor-pointer h-1"
                                  />
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Detail Editor: If Photo */}
                          {el.type === 'photo' && (
                            <div className="flex items-center gap-2 pt-1 border-t border-white/5">
                              <img src={el.content} alt="Thumbnail" className="w-10 h-10 object-cover rounded-lg border border-gold-400/50" />
                              <span className="text-[10px] text-stone-400">Foto Kustom Berhasil Disisipkan</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB: TEKS & JUDUL DENGAN KONTROL RATA KIRI/TENGAH/KANAN */}
            {activeTab === 'text' && (
              <div className="space-y-4 text-xs">
                <div className={`pb-2 border-b-2 ${isLight ? 'border-amber-200' : 'border-gold-subtle'}`}>
                  <h3 className={`text-xs font-black uppercase tracking-wider ${
                    isLight ? 'text-amber-950' : 'text-gold-300'
                  }`}>
                    Sunting Teks Sampul Depan
                  </h3>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-200 dark:border-white/10">
                    <span className={`text-[11px] font-bold ${isLight ? 'text-stone-700' : 'text-stone-300'}`}>
                      Rata Teks Sampul:
                    </span>
                    <div className="flex items-center gap-1 bg-stone-100 dark:bg-black/50 p-1 rounded-xl border border-stone-300 dark:border-white/10">
                      <button
                        type="button"
                        onClick={() => updatePageData(0, 'textAlign', 'left')}
                        className={`p-1.5 rounded-lg transition-colors ${pages[0]?.data?.textAlign === 'left' ? 'bg-amber-400 text-black shadow-sm font-bold' : 'text-stone-400 hover:text-white'}`}
                        title="Rata Kiri"
                      >
                        <AlignLeft className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => updatePageData(0, 'textAlign', 'center')}
                        className={`p-1.5 rounded-lg transition-colors ${pages[0]?.data?.textAlign === 'center' || !pages[0]?.data?.textAlign ? 'bg-amber-400 text-black shadow-sm font-bold' : 'text-stone-400 hover:text-white'}`}
                        title="Rata Tengah"
                      >
                        <AlignCenter className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => updatePageData(0, 'textAlign', 'right')}
                        className={`p-1.5 rounded-lg transition-colors ${pages[0]?.data?.textAlign === 'right' ? 'bg-amber-400 text-black shadow-sm font-bold' : 'text-stone-400 hover:text-white'}`}
                        title="Rata Kanan"
                      >
                        <AlignRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

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
                      Gedung & Kota Acara (Bandar Lampung):
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

            {/* TAB: PROFIL MEMPELAI DENGAN UPLOAD FOTO & PRESET GALLERY & ALIGNMENT */}
            {activeTab === 'couple' && (
              <div className="space-y-4 text-xs">
                <div className={`pb-2 border-b-2 ${
                  isLight ? 'text-amber-950 border-amber-200' : 'text-gold-300 border-gold-subtle'
                }`}>
                  <h3 className="text-xs font-black uppercase tracking-wider">
                    Data Lengkap & Foto Mempelai
                  </h3>
                  <p className={`text-[11px] mt-0.5 ${isLight ? 'text-stone-600' : 'text-stone-300'}`}>
                    Upload foto langsung dari galeri HP / laptop, atau pilih preset foto pengantin elegan di bawah.
                  </p>
                </div>

                {/* Ayat Suci / Kutipan Doa */}
                <div className={`p-3 rounded-2xl border space-y-2 ${
                  isLight ? 'bg-amber-50/50 border-amber-200' : 'bg-black/30 border-gold-subtle'
                }`}>
                  <div className="flex items-center justify-between">
                    <label className={`text-xs font-bold block ${isLight ? 'text-stone-800' : 'text-stone-300'}`}>
                      Kutipan / Doa Pernikahan:
                    </label>
                    {/* Quote Alignment */}
                    <div className="flex items-center gap-1 bg-stone-100 dark:bg-black/50 p-1 rounded-xl border border-stone-300 dark:border-white/10">
                      <button
                        type="button"
                        onClick={() => updatePageData(1, 'quoteAlign', 'left')}
                        className={`p-1 rounded ${pages[1]?.data?.quoteAlign === 'left' ? 'bg-amber-400 text-black font-bold' : 'text-stone-400 hover:text-white'}`}
                        title="Rata Kiri"
                      >
                        <AlignLeft className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => updatePageData(1, 'quoteAlign', 'center')}
                        className={`p-1 rounded ${pages[1]?.data?.quoteAlign === 'center' || !pages[1]?.data?.quoteAlign ? 'bg-amber-400 text-black font-bold' : 'text-stone-400 hover:text-white'}`}
                        title="Rata Tengah"
                      >
                        <AlignCenter className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => updatePageData(1, 'quoteAlign', 'right')}
                        className={`p-1 rounded ${pages[1]?.data?.quoteAlign === 'right' ? 'bg-amber-400 text-black font-bold' : 'text-stone-400 hover:text-white'}`}
                        title="Rata Kanan"
                      >
                        <AlignRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
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

                {/* MEMPELAI PRIA */}
                <div className={`p-3.5 rounded-2xl border-2 space-y-3 transition-colors ${
                  isLight ? 'bg-[#FAF8F5] border-amber-200/90 text-stone-900 shadow-sm' : 'bg-black/40 border-gold-subtle/70 text-stone-100'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className={`font-black block text-xs ${isLight ? 'text-amber-950' : 'text-gold-300'}`}>
                      Mempelai Pria
                    </span>
                    {/* Groom Text Alignment */}
                    <div className="flex items-center gap-1 bg-stone-100 dark:bg-black/50 p-1 rounded-xl border border-stone-300 dark:border-white/10">
                      <button
                        type="button"
                        onClick={() => updatePageData(1, 'groomAlign', 'left')}
                        className={`p-1 rounded ${pages[1]?.data?.groomAlign === 'left' ? 'bg-amber-400 text-black font-bold' : 'text-stone-400 hover:text-white'}`}
                        title="Rata Kiri"
                      >
                        <AlignLeft className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => updatePageData(1, 'groomAlign', 'center')}
                        className={`p-1 rounded ${pages[1]?.data?.groomAlign === 'center' || !pages[1]?.data?.groomAlign ? 'bg-amber-400 text-black font-bold' : 'text-stone-400 hover:text-white'}`}
                        title="Rata Tengah"
                      >
                        <AlignCenter className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => updatePageData(1, 'groomAlign', 'right')}
                        className={`p-1 rounded ${pages[1]?.data?.groomAlign === 'right' ? 'bg-amber-400 text-black font-bold' : 'text-stone-400 hover:text-white'}`}
                        title="Rata Kanan"
                      >
                        <AlignRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* FOTO MEMPELAI PRIA: PREVIEW & UPLOADER */}
                  <div className="flex items-center gap-3 p-2 rounded-xl bg-black/20 dark:bg-black/40 border border-gold-subtle/40">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gold-400/80 flex-shrink-0 shadow-md">
                      <img
                        src={pages[1]?.data?.groomPhoto || GROOM_PRESETS[0].url}
                        alt="Groom"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-1.5">
                      <input
                        ref={groomFileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 1, 'groomPhoto')}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => groomFileInputRef.current?.click()}
                        className="w-full py-1.5 px-2.5 rounded-lg bg-gradient-to-r from-amber-400 to-gold-400 text-black font-bold text-[11px] shadow-sm hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-1.5"
                      >
                        <Upload className="w-3 h-3" />
                        <span>Upload Foto Pria (HP / Laptop)</span>
                      </button>
                      <span className="text-[9px] text-stone-400 block text-center">
                        Format JPG/PNG maks 8MB
                      </span>
                    </div>
                  </div>

                  {/* Preset Selector Pria */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-stone-400 block font-semibold">
                      Atau Pilih Preset Foto Pengantin Pria:
                    </span>
                    <div className="grid grid-cols-4 gap-1.5">
                      {GROOM_PRESETS.map((p, idx) => (
                        <div
                          key={idx}
                          onClick={() => updatePageData(1, 'groomPhoto', p.url)}
                          className={`group relative cursor-pointer rounded-xl overflow-hidden border-2 transition-all aspect-square ${
                            pages[1]?.data?.groomPhoto === p.url
                              ? 'border-amber-400 ring-2 ring-amber-400/50 scale-105'
                              : 'border-white/10 hover:border-gold-400/60'
                          }`}
                          title={p.label}
                        >
                          <img src={p.url} alt={p.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                        </div>
                      ))}
                    </div>
                  </div>

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
                </div>

                {/* MEMPELAI WANITA */}
                <div className={`p-3.5 rounded-2xl border-2 space-y-3 transition-colors ${
                  isLight ? 'bg-[#FAF8F5] border-amber-200/90 text-stone-900 shadow-sm' : 'bg-black/40 border-gold-subtle/70 text-stone-100'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className={`font-black block text-xs ${isLight ? 'text-amber-950' : 'text-gold-300'}`}>
                      Mempelai Wanita
                    </span>
                    {/* Bride Text Alignment */}
                    <div className="flex items-center gap-1 bg-stone-100 dark:bg-black/50 p-1 rounded-xl border border-stone-300 dark:border-white/10">
                      <button
                        type="button"
                        onClick={() => updatePageData(1, 'brideAlign', 'left')}
                        className={`p-1 rounded ${pages[1]?.data?.brideAlign === 'left' ? 'bg-amber-400 text-black font-bold' : 'text-stone-400 hover:text-white'}`}
                        title="Rata Kiri"
                      >
                        <AlignLeft className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => updatePageData(1, 'brideAlign', 'center')}
                        className={`p-1 rounded ${pages[1]?.data?.brideAlign === 'center' || !pages[1]?.data?.brideAlign ? 'bg-amber-400 text-black font-bold' : 'text-stone-400 hover:text-white'}`}
                        title="Rata Tengah"
                      >
                        <AlignCenter className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => updatePageData(1, 'brideAlign', 'right')}
                        className={`p-1 rounded ${pages[1]?.data?.brideAlign === 'right' ? 'bg-amber-400 text-black font-bold' : 'text-stone-400 hover:text-white'}`}
                        title="Rata Kanan"
                      >
                        <AlignRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* FOTO MEMPELAI WANITA: PREVIEW & UPLOADER */}
                  <div className="flex items-center gap-3 p-2 rounded-xl bg-black/20 dark:bg-black/40 border border-gold-subtle/40">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gold-400/80 flex-shrink-0 shadow-md">
                      <img
                        src={pages[1]?.data?.bridePhoto || BRIDE_PRESETS[0].url}
                        alt="Bride"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-1.5">
                      <input
                        ref={brideFileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 1, 'bridePhoto')}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => brideFileInputRef.current?.click()}
                        className="w-full py-1.5 px-2.5 rounded-lg bg-gradient-to-r from-amber-400 to-gold-400 text-black font-bold text-[11px] shadow-sm hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-1.5"
                      >
                        <Upload className="w-3 h-3" />
                        <span>Upload Foto Wanita (HP / Laptop)</span>
                      </button>
                      <span className="text-[9px] text-stone-400 block text-center">
                        Format JPG/PNG maks 8MB
                      </span>
                    </div>
                  </div>

                  {/* Preset Selector Wanita */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-stone-400 block font-semibold">
                      Atau Pilih Preset Foto Pengantin Wanita:
                    </span>
                    <div className="grid grid-cols-4 gap-1.5">
                      {BRIDE_PRESETS.map((p, idx) => (
                        <div
                          key={idx}
                          onClick={() => updatePageData(1, 'bridePhoto', p.url)}
                          className={`group relative cursor-pointer rounded-xl overflow-hidden border-2 transition-all aspect-square ${
                            pages[1]?.data?.bridePhoto === p.url
                              ? 'border-amber-400 ring-2 ring-amber-400/50 scale-105'
                              : 'border-white/10 hover:border-gold-400/60'
                          }`}
                          title={p.label}
                        >
                          <img src={p.url} alt={p.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                        </div>
                      ))}
                    </div>
                  </div>

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

            {/* TAB: CONTAINER & LATAR BELAKANG (ELEMENTOR-STYLE BUILDER) */}
            {activeTab === 'theme' && (
              <div className="space-y-4 text-xs">
                <div className={`pb-3 border-b-2 ${isLight ? 'border-amber-200' : 'border-gold-subtle'}`}>
                  <span className={`text-[10px] font-extrabold uppercase tracking-widest ${isLight ? 'text-amber-800' : 'text-gold-400'}`}>
                    STUDIO PRO • CONTAINER & BACKGROUND
                  </span>
                  <h3 className={`text-base font-black mt-0.5 ${isLight ? 'text-stone-900' : 'text-gold-bright'}`}>
                    Latar & Box Model Hal {activePageIndex + 1}
                  </h3>
                  <p className={`text-[11px] mt-1 leading-relaxed ${isLight ? 'text-stone-600' : 'text-stone-300'}`}>
                    Konsep Elementor Container: atur warna solid/gradien, padding breathing room, sudut radius, dan watermark PNG transparan.
                  </p>
                </div>

                {/* 1. Warna Solid Mewah */}
                <div className={`p-3 rounded-2xl border space-y-2.5 ${
                  isLight ? 'bg-amber-50/60 border-amber-200' : 'bg-black/40 border-gold-subtle'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className={`font-black block text-[11px] uppercase tracking-wider ${
                      isLight ? 'text-amber-950' : 'text-gold-300'
                    }`}>
                      🎨 Palet Warna Solid Mewah
                    </span>
                    <label className="flex items-center gap-1 cursor-pointer text-[10px] text-amber-400 font-bold">
                      <span>Kustom Hex</span>
                      <input
                        type="color"
                        value={activePage.customBgColor || '#041514'}
                        onChange={(e) => updatePageConfig(activePageIndex, {
                          customBgColor: e.target.value,
                          customBgGradient: undefined
                        })}
                        className="w-4 h-4 rounded cursor-pointer border-0 bg-transparent p-0"
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {LUXURY_BG_COLORS.map((bg) => (
                      <div
                        key={bg.id}
                        onClick={() => {
                          updatePageTheme(activePageIndex, bg.id as any);
                          updatePageConfig(activePageIndex, {
                            customBgColor: bg.hex,
                            customBgGradient: undefined
                          });
                        }}
                        className={`p-2 rounded-xl border cursor-pointer transition-all flex items-center gap-2 ${
                          activePage.customBgColor === bg.hex || (!activePage.customBgColor && activePage.bgTheme === bg.id)
                            ? 'border-amber-400 bg-amber-400/20 ring-1 ring-amber-400'
                            : isLight ? 'border-stone-200 bg-white hover:border-amber-300' : 'border-white/10 bg-white/5 hover:border-gold-subtle'
                        }`}
                      >
                        <div
                          className="w-5 h-5 rounded-lg border border-stone-400/50 shadow-inner flex-shrink-0"
                          style={{ backgroundColor: bg.hex }}
                        />
                        <span className={`text-[10px] font-bold truncate ${isLight ? 'text-stone-900' : 'text-stone-200'}`}>
                          {bg.name.split(' ')[0]} {bg.name.split(' ')[1]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Preset Gradien Latar Belakang */}
                <div className={`p-3 rounded-2xl border space-y-2.5 ${
                  isLight ? 'bg-amber-50/60 border-amber-200' : 'bg-black/40 border-gold-subtle'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className={`font-black block text-[11px] uppercase tracking-wider ${
                      isLight ? 'text-amber-950' : 'text-gold-300'
                    }`}>
                      🌈 Gradien Mewah
                    </span>
                    {activePage.customBgGradient && (
                      <button
                        type="button"
                        onClick={() => updatePageConfig(activePageIndex, { customBgGradient: undefined })}
                        className="text-[9px] text-rose-400 hover:text-rose-300 underline"
                      >
                        Reset ke Solid
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {LUXURY_BG_GRADIENTS.map((grad) => (
                      <div
                        key={grad.id}
                        onClick={() => updatePageConfig(activePageIndex, {
                          customBgGradient: grad.gradient
                        })}
                        className={`p-2 rounded-xl border cursor-pointer transition-all flex items-center gap-2 ${
                          activePage.customBgGradient === grad.gradient
                            ? 'border-amber-400 bg-amber-400/20 ring-1 ring-amber-400'
                            : isLight ? 'border-stone-200 bg-white hover:border-amber-300' : 'border-white/10 bg-white/5 hover:border-gold-subtle'
                        }`}
                      >
                        <div
                          className="w-5 h-5 rounded-lg border border-amber-400/40 shadow-inner flex-shrink-0"
                          style={{ background: grad.gradient }}
                        />
                        <span className={`text-[10px] font-bold truncate ${isLight ? 'text-stone-900' : 'text-stone-200'}`}>
                          {grad.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Container Box Model (Elementor Padding & Radius) */}
                <div className={`p-3 rounded-2xl border space-y-2.5 ${
                  isLight ? 'bg-amber-50/60 border-amber-200' : 'bg-black/40 border-gold-subtle'
                }`}>
                  <span className={`font-black block text-[11px] uppercase tracking-wider ${
                    isLight ? 'text-amber-950' : 'text-gold-300'
                  }`}>
                    📦 Container Box Model (Padding & Radius)
                  </span>

                  {/* Padding Options */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-stone-400">Jarak Tepi / Padding Konten:</span>
                    <div className="grid grid-cols-3 gap-1.5">
                      {CONTAINER_PADDING_OPTIONS.map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => updatePageConfig(activePageIndex, { containerPadding: opt.id as any })}
                          className={`py-1.5 px-2 rounded-xl text-[10px] font-bold border transition-all ${
                            (activePage.containerPadding || 'normal') === opt.id
                              ? 'bg-amber-400 text-black border-amber-400'
                              : isLight ? 'bg-white border-stone-200 text-stone-700' : 'bg-white/5 border-white/10 text-stone-300'
                          }`}
                        >
                          {opt.label.split(' ')[0]}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Corner Radius Options */}
                  <div className="space-y-1 pt-1">
                    <span className="text-[10px] text-stone-400">Lengkung Sudut Frame:</span>
                    <div className="grid grid-cols-4 gap-1">
                      {CONTAINER_RADIUS_OPTIONS.map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => updatePageConfig(activePageIndex, { containerRadius: opt.id as any })}
                          className={`py-1.5 px-1 rounded-xl text-[9px] font-bold border transition-all truncate ${
                            (activePage.containerRadius || '3xl') === opt.id
                              ? 'bg-amber-400 text-black border-amber-400'
                              : isLight ? 'bg-white border-stone-200 text-stone-700' : 'bg-white/5 border-white/10 text-stone-300'
                          }`}
                        >
                          {opt.label.split(' ')[0]}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 4. Watermark / Overlay PNG Latar Belakang */}
                <div className={`p-3 rounded-2xl border space-y-2.5 ${
                  isLight ? 'bg-amber-50/60 border-amber-200' : 'bg-black/40 border-gold-subtle'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className={`font-black block text-[11px] uppercase tracking-wider ${
                      isLight ? 'text-amber-950' : 'text-gold-300'
                    }`}>
                      🖼️ Watermark PNG Latar Belakang
                    </span>
                    {activePage.bgPngOverlay?.url && (
                      <button
                        type="button"
                        onClick={() => updatePageConfig(activePageIndex, { bgPngOverlay: undefined })}
                        className="text-[9px] text-rose-400 hover:text-rose-300 underline"
                      >
                        Hapus Watermark
                      </button>
                    )}
                  </div>

                  <p className={`text-[10px] leading-tight ${isLight ? 'text-stone-600' : 'text-stone-400'}`}>
                    Pilih ornamen emas transparan yang muncul secara anggun di belakang konten:
                  </p>

                  <div className="grid grid-cols-3 gap-2">
                    {LUXURY_PNG_PRESETS.map((preset) => (
                      <div
                        key={preset.id}
                        onClick={() => updatePageConfig(activePageIndex, {
                          bgPngOverlay: {
                            url: preset.previewUrl,
                            opacity: 30,
                            scale: 100,
                            position: 'center'
                          }
                        })}
                        className={`p-2 rounded-xl border flex flex-col items-center justify-center gap-1 cursor-pointer transition-all hover:scale-105 ${
                          activePage.bgPngOverlay?.url === preset.previewUrl
                            ? 'border-amber-400 bg-amber-400/20 ring-1 ring-amber-400'
                            : isLight ? 'bg-white border-amber-200' : 'bg-black/60 border-gold-400/30'
                        }`}
                        title={preset.name}
                      >
                        <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
                          <img
                            src={preset.previewUrl}
                            alt={preset.name}
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                        <span className="text-[8px] font-medium text-center line-clamp-1 text-stone-300">
                          {preset.name.split(' ')[0]}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Watermark controls if active */}
                  {activePage.bgPngOverlay?.url && (
                    <div className="space-y-2 pt-2 border-t border-white/10">
                      <div className="flex justify-between text-[10px]">
                        <span className="text-stone-400">Transparansi Watermark:</span>
                        <span className="font-mono text-amber-400 font-bold">{activePage.bgPngOverlay.opacity ?? 30}%</span>
                      </div>
                      <input
                        type="range"
                        min={5}
                        max={70}
                        step={5}
                        value={activePage.bgPngOverlay.opacity ?? 30}
                        onChange={(e) => updatePageConfig(activePageIndex, {
                          bgPngOverlay: {
                            ...activePage.bgPngOverlay!,
                            opacity: Number(e.target.value)
                          }
                        })}
                        className="w-full accent-amber-400 cursor-pointer h-1"
                      />

                      <div className="flex justify-between text-[10px]">
                        <span className="text-stone-400">Ukuran Skala:</span>
                        <span className="font-mono text-amber-400 font-bold">{activePage.bgPngOverlay.scale ?? 100}%</span>
                      </div>
                      <input
                        type="range"
                        min={50}
                        max={160}
                        step={5}
                        value={activePage.bgPngOverlay.scale ?? 100}
                        onChange={(e) => updatePageConfig(activePageIndex, {
                          bgPngOverlay: {
                            ...activePage.bgPngOverlay!,
                            scale: Number(e.target.value)
                          }
                        })}
                        className="w-full accent-amber-400 cursor-pointer h-1"
                      />
                    </div>
                  )}

                  {/* Upload custom PNG Watermark */}
                  <button
                    type="button"
                    onClick={() => {
                      setPngUploadMode('watermark');
                      customPngInputRef.current?.click();
                    }}
                    className={`w-full py-2 px-3 rounded-xl border border-dashed transition-all flex items-center justify-center gap-1.5 font-bold text-[10px] ${
                      isLight
                        ? 'border-amber-400 text-amber-900 bg-amber-100/50 hover:bg-amber-100'
                        : 'border-gold-400/60 text-gold-300 bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Watermark PNG Sendiri</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

        {/* =========================================================================
            CENTER STAGE: STUDIO PRO LIVE CANVAS VIEW (WITH DIRECT CLICK-TO-EDIT)
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

            {/* Center: Quick Formatting & Text Alignment Bar */}
            <div className="flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded-xl border border-gold-400/30 shadow-sm">
              <span className={`text-[10px] font-bold mr-1 hidden sm:inline ${isLight ? 'text-stone-700' : 'text-gold-300'}`}>
                Rata Teks:
              </span>
              <button
                type="button"
                onClick={() => updatePageData(activePageIndex, 'textAlign', 'left')}
                className={`p-1 rounded transition-colors ${
                  activePage.data?.textAlign === 'left' ? 'bg-amber-400 text-black font-bold shadow-sm' : 'text-stone-400 hover:text-white'
                }`}
                title="Rata Kiri Halaman Ini"
              >
                <AlignLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => updatePageData(activePageIndex, 'textAlign', 'center')}
                className={`p-1 rounded transition-colors ${
                  activePage.data?.textAlign === 'center' || !activePage.data?.textAlign ? 'bg-amber-400 text-black font-bold shadow-sm' : 'text-stone-400 hover:text-white'
                }`}
                title="Rata Tengah Halaman Ini"
              >
                <AlignCenter className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => updatePageData(activePageIndex, 'textAlign', 'right')}
                className={`p-1 rounded transition-colors ${
                  activePage.data?.textAlign === 'right' ? 'bg-amber-400 text-black font-bold shadow-sm' : 'text-stone-400 hover:text-white'
                }`}
                title="Rata Kanan Halaman Ini"
              >
                <AlignRight className="w-3.5 h-3.5" />
              </button>
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
              style={{ 
                transform: `scale(${zoomLevel / 100})`, 
                transformOrigin: 'center center',
                borderRadius: activePage.containerRadius === 'sm' ? 12 : activePage.containerRadius === 'md' ? 24 : activePage.containerRadius === '2xl' ? 36 : 44
              }}
              className={`relative shadow-2xl border-4 border-gold-500/50 overflow-hidden flex flex-col transition-all duration-300 ${
                deviceMode === 'mobile'
                  ? 'w-[370px] h-[720px]'
                  : 'w-[760px] h-[720px]'
              }`}
            >
              
              {/* PAGE BACKGROUND LAYER */}
              <div 
                className={`absolute inset-0 bg-cover bg-center transition-all duration-500 ${
                  activePage.customBgGradient || activePage.customBgColor
                    ? ''
                    : isJawa
                    ? 'bg-[#180e09]'
                    : isMinang
                    ? 'bg-[#220508]'
                    : 'bg-[#051817] bg-velvet-texture'
                }`}
                style={{
                  background: activePage.customBgGradient || activePage.customBgColor || undefined
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />

                {/* Background Watermark / PNG Overlay */}
                {activePage.bgPngOverlay?.url && (
                  <div 
                    className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-0"
                    style={{
                      opacity: (activePage.bgPngOverlay.opacity ?? 30) / 100,
                      alignItems: activePage.bgPngOverlay.position === 'top' ? 'flex-start' : activePage.bgPngOverlay.position === 'bottom' ? 'flex-end' : 'center',
                    }}
                  >
                    <img 
                      src={activePage.bgPngOverlay.url} 
                      alt="Watermark" 
                      className="object-contain filter drop-shadow-md"
                      style={{
                        transform: `scale(${(activePage.bgPngOverlay.scale ?? 100) / 100})`,
                        maxWidth: activePage.bgPngOverlay.position === 'full' ? '100%' : '80%',
                        maxHeight: activePage.bgPngOverlay.position === 'full' ? '100%' : '70%'
                      }}
                    />
                  </div>
                )}
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
                  className={`relative z-10 w-full h-full flex flex-col text-center overflow-y-auto scrollbar-none font-sans ${
                    activePage.containerPadding === 'compact'
                      ? 'p-3'
                      : activePage.containerPadding === 'relaxed'
                      ? 'p-8'
                      : 'p-6'
                  }`}
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

                      <div className={`space-y-2 w-full my-auto ${
                        activePage.data?.textAlign === 'left' ? 'text-left' : activePage.data?.textAlign === 'right' ? 'text-right' : 'text-center'
                      }`}>
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
                            {activePage.data?.venueCity || 'Grand Mercure Ballroom, Bandar Lampung'}
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
                        <p className={`text-[11px] italic text-gold-200/90 max-w-xs mx-auto leading-relaxed px-2 ${
                          pages[1]?.data?.quoteAlign === 'left' ? 'text-left' : pages[1]?.data?.quoteAlign === 'right' ? 'text-right' : 'text-center'
                        }`}>
                          "{pages[1]?.data?.introQuote || 'Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan...'}"
                        </p>
                      </div>

                      {/* Groom */}
                      <div 
                        onClick={() => handleSelectElement('groomFullName', 'couple', 1)}
                        className={`space-y-1 ${
                          pages[1]?.data?.groomAlign === 'left' ? 'text-left' : pages[1]?.data?.groomAlign === 'right' ? 'text-right' : 'text-center'
                        } ${getElementOutline('groomFullName')}`}
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
                        className={`space-y-1 ${
                          pages[1]?.data?.brideAlign === 'left' ? 'text-left' : pages[1]?.data?.brideAlign === 'right' ? 'text-right' : 'text-center'
                        } ${getElementOutline('brideFullName')}`}
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
                          <span>{pages[2]?.data?.akadPlace || 'Masjid Agung Al-Furqon, Bandar Lampung'}</span>
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
                          <span>{pages[2]?.data?.resepsiPlace || 'Grand Mercure Ballroom, Bandar Lampung'}</span>
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

                  {/* ====================================================
                      GENERIC CUSTOM PAGE (IF EXTRA PAGES ADDED)
                      ==================================================== */}
                  {activePage.type !== 'cover' && activePage.type !== 'couple' && activePage.type !== 'events' && activePage.type !== 'story' && activePage.type !== 'gift' && activePage.type !== 'rsvp' && (
                    <div className="my-auto space-y-3 py-6 text-center">
                      <h2 className="text-xl font-bold font-serif text-gold-bright">
                        {activePage.title}
                      </h2>
                      <p className="text-xs text-stone-300 max-w-xs mx-auto leading-relaxed">
                        Halaman kustom baru. Tambahkan teks, doa, foto, atau ornamen adat lewat tab Elemen di sebelah kiri.
                      </p>
                    </div>
                  )}

                  {/* ====================================================
                      RENDER ACTIVE PAGE CUSTOM ELEMENTS (STUDIO SYSTEM)
                      ==================================================== */}
                  {activePage.customElements && activePage.customElements.length > 0 && (
                    <div className="w-full my-3 space-y-2.5 pt-2 border-t border-dashed border-gold-400/30">
                      {activePage.customElements.map((el, elIdx) => (
                        <div 
                          key={el.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedElementId(el.id);
                            setActiveTab('elements');
                          }}
                          className={`group relative p-1.5 rounded-xl transition-all cursor-pointer ${
                            selectedElementId === el.id
                              ? 'ring-2 ring-amber-400 bg-amber-400/20'
                              : 'hover:ring-1 hover:ring-amber-400/50 hover:bg-white/5'
                          }`}
                        >
                          {/* Heading */}
                          {el.type === 'heading' && (
                            <h2 
                              style={{
                                fontSize: el.fontSize ? `${el.fontSize}px` : undefined,
                                color: el.color || undefined,
                                fontWeight: el.fontWeight || 'bold',
                                fontStyle: el.fontStyle || 'normal',
                              }}
                              className={`font-serif leading-snug ${
                                !el.color ? (isLight ? 'text-stone-900' : 'text-gold-bright') : ''
                              } ${
                                el.align === 'left' ? 'text-left' : el.align === 'right' ? 'text-right' : 'text-center'
                              }`}
                            >
                              {el.content}
                            </h2>
                          )}

                          {/* Subheading */}
                          {el.type === 'subheading' && (
                            <p 
                              style={{
                                fontSize: el.fontSize ? `${el.fontSize}px` : undefined,
                                color: el.color || undefined,
                                fontWeight: el.fontWeight || 'semibold',
                                fontStyle: el.fontStyle || 'normal',
                              }}
                              className={`uppercase tracking-wider ${
                                !el.color ? (isLight ? 'text-amber-800' : 'text-gold-300') : ''
                              } ${
                                el.align === 'left' ? 'text-left' : el.align === 'right' ? 'text-right' : 'text-center'
                              }`}
                            >
                              {el.content}
                            </p>
                          )}

                          {/* Paragraph */}
                          {el.type === 'paragraph' && (
                            <p 
                              style={{
                                fontSize: el.fontSize ? `${el.fontSize}px` : undefined,
                                color: el.color || undefined,
                                fontWeight: el.fontWeight || 'normal',
                                fontStyle: el.fontStyle || 'normal',
                              }}
                              className={`leading-relaxed ${
                                !el.color ? (isLight ? 'text-stone-700' : 'text-stone-200') : ''
                              } ${
                                el.align === 'left' ? 'text-left' : el.align === 'right' ? 'text-right' : 'text-center'
                              }`}
                            >
                              {el.content}
                            </p>
                          )}

                          {/* Quote */}
                          {el.type === 'quote' && (
                            <blockquote 
                              style={{
                                fontSize: el.fontSize ? `${el.fontSize}px` : undefined,
                                color: el.color || undefined,
                                fontWeight: el.fontWeight || 'normal',
                              }}
                              className={`italic px-3 py-1.5 border-l-2 border-gold-400/60 bg-black/20 rounded-r-lg ${
                                !el.color ? (isLight ? 'text-stone-800' : 'text-gold-200/90') : ''
                              } ${
                                el.align === 'left' ? 'text-left' : el.align === 'right' ? 'text-right' : 'text-center'
                              }`}
                            >
                              "{el.content}"
                            </blockquote>
                          )}

                          {/* Divider Element */}
                          {el.type === 'divider' && (
                            <div className="w-full py-1">
                              {el.dividerStyle === 'batik' && (
                                <div className="flex justify-center">
                                  <BatikParangDivider isLight={isLight} className="w-48 h-3 text-amber-400" />
                                </div>
                              )}
                              {el.dividerStyle === 'minang' && (
                                <div className="flex justify-center">
                                  <MinangUkiranDivider isLight={isLight} className="w-48 h-3 text-amber-400" />
                                </div>
                              )}
                              {el.dividerStyle === 'melati' && (
                                <div className="flex justify-center">
                                  <RonceMelatiDivider isLight={isLight} className="w-48 h-3 text-amber-400" />
                                </div>
                              )}
                              {el.dividerStyle === 'dashed' && (
                                <div className="w-3/4 border-b border-dashed border-amber-400/80 mx-auto my-1.5" />
                              )}
                              {(!el.dividerStyle || el.dividerStyle === 'gold_hairline') && (
                                <div className="w-full flex items-center justify-center my-1.5">
                                  <div className="h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent w-3/4 flex items-center justify-center relative">
                                    <span className="w-2 h-2 rotate-45 bg-amber-400 shadow-gold-sm" />
                                  </div>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Spacer Element */}
                          {el.type === 'spacer' && (
                            <div 
                              style={{ height: `${el.spacerHeight || 24}px` }}
                              className="w-full group/sp relative flex items-center justify-center hover:bg-amber-400/10 rounded-lg transition-colors border border-dashed border-transparent hover:border-amber-400/50"
                            >
                              <span className="opacity-0 group-hover/sp:opacity-100 text-[9px] font-mono font-bold text-amber-400 bg-black/90 px-2 py-0.5 rounded-full pointer-events-none transition-opacity">
                                ↕ Spacer ({el.spacerHeight || 24}px)
                              </span>
                            </div>
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
                                alt="PNG Element" 
                                className="object-contain max-h-44 filter drop-shadow-md"
                                style={{ transform: `scale(${(el.pngScale ?? 100) / 100})` }}
                              />
                            </div>
                          )}

                          {/* Cultural Ornament */}
                          {el.type === 'ornament' && (
                            <div className={`text-xl ${
                              el.align === 'left' ? 'text-left' : el.align === 'right' ? 'text-right' : 'text-center'
                            }`}>
                              {el.ornamentType === 'leaf' && '🌿 ✨ 🌿'}
                              {el.ornamentType === 'ring' && '💍'}
                              {el.ornamentType === 'sparkle' && '✨ ⚜️ ✨'}
                              {el.ornamentType === 'dove' && '🕊️'}
                              {el.ornamentType === 'divider' && <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto my-1" />}
                            </div>
                          )}

                          {/* Photo */}
                          {el.type === 'photo' && (
                            <div className={`flex ${
                              el.align === 'left' ? 'justify-start' : el.align === 'right' ? 'justify-end' : 'justify-center'
                            }`}>
                              <img src={el.content} alt="Element" className="max-w-[200px] max-h-[150px] rounded-2xl object-cover border-2 border-gold-400/60 shadow-lg" />
                            </div>
                          )}

                          {/* Floating Quick Action Mini Bar */}
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-4 right-1 flex items-center gap-1 bg-stone-900/95 border border-gold-400/80 rounded-xl px-2 py-1 text-[10px] shadow-2xl z-30 backdrop-blur-md">
                            {/* Move Up */}
                            <button 
                              type="button"
                              disabled={elIdx === 0}
                              onClick={(e) => {
                                e.stopPropagation();
                                moveCustomElement(activePageIndex, el.id, 'up');
                              }}
                              className="p-1 hover:text-amber-300 disabled:opacity-30 disabled:cursor-not-allowed text-stone-300"
                              title="Geser Ke Atas"
                            >
                              <ChevronUp className="w-3.5 h-3.5" />
                            </button>

                            {/* Move Down */}
                            <button 
                              type="button"
                              disabled={elIdx === (activePage.customElements?.length || 0) - 1}
                              onClick={(e) => {
                                e.stopPropagation();
                                moveCustomElement(activePageIndex, el.id, 'down');
                              }}
                              className="p-1 hover:text-amber-300 disabled:opacity-30 disabled:cursor-not-allowed text-stone-300"
                              title="Geser Ke Bawah"
                            >
                              <ChevronDown className="w-3.5 h-3.5" />
                            </button>

                            <div className="w-px h-3 bg-white/20 mx-0.5" />

                            {/* Font size adjustments if text */}
                            {(el.type === 'heading' || el.type === 'subheading' || el.type === 'paragraph' || el.type === 'quote') && (
                              <>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const currentSize = el.fontSize || (el.type === 'heading' ? 24 : el.type === 'subheading' ? 14 : 12);
                                    updateCustomElement(activePageIndex, el.id, { fontSize: Math.max(10, currentSize - 2) });
                                  }}
                                  className="px-1 py-0.5 hover:text-amber-300 font-bold text-stone-300 text-[10px]"
                                  title="Kecilkan Font (A-)"
                                >
                                  A-
                                </button>
                                <span className="text-[9px] text-amber-400 font-mono font-bold">
                                  {el.fontSize || (el.type === 'heading' ? 24 : el.type === 'subheading' ? 14 : 12)}
                                </span>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const currentSize = el.fontSize || (el.type === 'heading' ? 24 : el.type === 'subheading' ? 14 : 12);
                                    updateCustomElement(activePageIndex, el.id, { fontSize: Math.min(56, currentSize + 2) });
                                  }}
                                  className="px-1 py-0.5 hover:text-amber-300 font-bold text-stone-300 text-[10px]"
                                  title="Besarkan Font (A+)"
                                >
                                  A+
                                </button>
                                <div className="w-px h-3 bg-white/20 mx-0.5" />
                              </>
                            )}

                            {/* Alignment */}
                            <button 
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                updateCustomElement(activePageIndex, el.id, { align: 'left' });
                              }}
                              className={`p-1 hover:text-gold-300 ${el.align === 'left' ? 'text-amber-400 font-bold' : 'text-stone-400'}`}
                              title="Rata Kiri"
                            >
                              <AlignLeft className="w-3 h-3" />
                            </button>
                            <button 
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                updateCustomElement(activePageIndex, el.id, { align: 'center' });
                              }}
                              className={`p-1 hover:text-gold-300 ${el.align === 'center' || !el.align ? 'text-amber-400 font-bold' : 'text-stone-400'}`}
                              title="Rata Tengah"
                            >
                              <AlignCenter className="w-3 h-3" />
                            </button>
                            <button 
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                updateCustomElement(activePageIndex, el.id, { align: 'right' });
                              }}
                              className={`p-1 hover:text-gold-300 ${el.align === 'right' ? 'text-amber-400 font-bold' : 'text-stone-400'}`}
                              title="Rata Kanan"
                            >
                              <AlignRight className="w-3 h-3" />
                            </button>

                            <div className="w-px h-3 bg-white/20 mx-0.5" />

                            {/* Delete */}
                            <button 
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteCustomElement(activePageIndex, el.id);
                              }}
                              className="p-1 text-rose-400 hover:text-rose-300"
                              title="Hapus Elemen"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                </motion.div>
              </AnimatePresence>

            </div>

          </div>

          {/* =========================================================================
              STUDIO PRO BOTTOM FILMSTRIP (PAGES THUMBNAILS BAR)
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
