import React, { useState } from 'react';
import type { PageData } from '../../types';
import { INITIAL_PAGES } from '../../constants/initialData';
import { 
  Layers, 
  Type, 
  Image as ImageIcon, 
  Palette, 
  Music, 
  Gift, 
  Calendar, 
  MapPin, 
  Heart, 
  Plus, 
  Trash2, 
  Copy, 
  ChevronLeft, 
  ChevronRight, 
  Undo2, 
  Redo2, 
  CloudCheck, 
  Eye, 
  Share2, 
  Sparkles, 
  Bold, 
  Italic, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  ZoomIn, 
  ZoomOut, 
  Check, 
  X,
  Play,
  Pause,
  ArrowLeft
} from 'lucide-react';

interface EditorViewProps {
  onBackToHome: () => void;
  onActivate: () => void;
}

export const EditorView: React.FC<EditorViewProps> = ({ onBackToHome, onActivate }) => {
  // Navigation & Zoom
  const [activeTab, setActiveTab] = useState<'pages' | 'text' | 'couple' | 'events' | 'theme' | 'gift' | 'music'>('pages');
  const [activePageIndex, setActivePageIndex] = useState<number>(0);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [showPreviewModal, setShowPreviewModal] = useState<boolean>(false);
  const [guestNameParam, setGuestNameParam] = useState<string>('Bapak Budi & Rekan');
  const [copiedLink, setCopiedLink] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  // Editable Invitation Content State
  const [pages, setPages] = useState<PageData[]>(INITIAL_PAGES);

  const activePage = pages[activePageIndex] || pages[0];

  // Helper function to update active page data
  const updatePageData = (key: string, value: any) => {
    setPages(prev => {
      const copy = [...prev];
      copy[activePageIndex] = {
        ...copy[activePageIndex],
        data: {
          ...copy[activePageIndex].data,
          [key]: value
        }
      };
      return copy;
    });
  };

  // Helper to change page background theme
  const changeBgTheme = (theme: 'velvet' | 'ivory' | 'noir' | 'floral') => {
    setPages(prev => {
      const copy = [...prev];
      copy[activePageIndex] = {
        ...copy[activePageIndex],
        bgTheme: theme
      };
      return copy;
    });
  };

  // Duplicate current page
  const duplicatePage = () => {
    const newPage: PageData = {
      ...activePage,
      id: 'p' + Date.now(),
      title: `${activePage.title} (Salinan)`
    };
    const updated = [...pages];
    updated.splice(activePageIndex + 1, 0, newPage);
    setPages(updated);
    setActivePageIndex(activePageIndex + 1);
  };

  // Delete current page
  const deletePage = () => {
    if (pages.length <= 1) return;
    const filtered = pages.filter((_, idx) => idx !== activePageIndex);
    setPages(filtered);
    setActivePageIndex(Math.max(0, activePageIndex - 1));
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-[#051817] text-stone-100 overflow-hidden font-sans">
      
      {/* 1. TOP BAR (STUDIO NAVIGATION) */}
      <header className="h-16 border-b border-gold-subtle bg-[#041514] px-4 flex items-center justify-between z-30 flex-shrink-0">
        
        {/* Left: Brand & Return */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={onBackToHome}
            className="flex items-center gap-1.5 text-xs font-semibold text-gold-300 hover:text-white px-2.5 py-1.5 rounded-lg border border-gold-500/30 hover:border-gold-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Kembali ke Beranda</span>
          </button>

          <div className="h-6 w-px bg-gold-subtle hidden sm:block" />

          {/* Logo Brand */}
          <div className="flex items-center gap-2">
            <img 
              src="/assets/favicon-h.png" 
              alt="HariNikah Favicon" 
              className="w-7 h-7 rounded-full shadow-gold-sm"
            />
            <span className="font-serif text-lg font-bold text-gold-bright hidden md:inline">
              HariNikah <span className="text-[10px] uppercase tracking-widest font-sans text-gold-400 font-bold px-1.5 py-0.5 rounded bg-gold-950 border border-gold-subtle ml-1">Editor Pro</span>
            </span>
          </div>

          <div className="h-6 w-px bg-gold-subtle hidden md:block" />

          {/* Invitation Title & Auto-Save status */}
          <div className="hidden lg:flex flex-col">
            <span className="text-xs font-serif font-bold text-stone-100">
              The Wedding of {pages[0].data.groomName} & {pages[0].data.brideName}
            </span>
            <div className="flex items-center gap-1.5 text-[10px] text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Tersimpan otomatis ke Cloud</span>
            </div>
          </div>
        </div>

        {/* Center: Quick Page Switcher Display */}
        <div className="flex items-center gap-2 bg-[#082422] border border-gold-subtle rounded-full px-3 py-1 text-xs">
          <button
            disabled={activePageIndex === 0}
            onClick={() => setActivePageIndex(p => Math.max(0, p - 1))}
            className="disabled:opacity-30 hover:text-gold-400"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-semibold text-gold-200">
            Halaman {activePageIndex + 1} dari {pages.length}
          </span>
          <button
            disabled={activePageIndex === pages.length - 1}
            onClick={() => setActivePageIndex(p => Math.min(pages.length - 1, p + 1))}
            className="disabled:opacity-30 hover:text-gold-400"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Actions (Preview & Activate) */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setShowPreviewModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gold-subtle text-xs font-semibold text-gold-200 hover:bg-gold-950 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-gold-400" />
            <span>Pratinjau Tamu</span>
          </button>

          <button
            onClick={onActivate}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-gold-400 text-[#041514] font-extrabold text-xs shadow-gold-sm hover:scale-105 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span>Aktifkan Undangan</span>
          </button>
        </div>

      </header>

      {/* 2. MAIN WORKSPACE (LEFT TOOLS + CENTER CANVAS + RIGHT INSPECTOR) */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT TOOLBAR TABS (STUDIO NAVIGATION) */}
        <div className="w-16 sm:w-20 bg-[#031110] border-r border-gold-subtle flex flex-col items-center py-3 gap-2 flex-shrink-0 z-20">
          {[
            { id: 'pages', label: 'Halaman', icon: <Layers className="w-5 h-5" /> },
            { id: 'text', label: 'Teks', icon: <Type className="w-5 h-5" /> },
            { id: 'couple', label: 'Mempelai', icon: <Heart className="w-5 h-5" /> },
            { id: 'events', label: 'Acara', icon: <Calendar className="w-5 h-5" /> },
            { id: 'theme', label: 'Tema BG', icon: <Palette className="w-5 h-5" /> },
            { id: 'gift', label: 'Amplop', icon: <Gift className="w-5 h-5" /> },
            { id: 'music', label: 'Musik', icon: <Music className="w-5 h-5" /> },
          ].map((tool) => (
            <button
              key={tool.id}
              onClick={() => setActiveTab(tool.id as any)}
              className={`w-14 sm:w-16 py-2.5 rounded-xl flex flex-col items-center gap-1 text-[10px] font-semibold transition-all ${
                activeTab === tool.id
                  ? 'bg-gradient-to-b from-[#144c48] to-[#072422] text-gold-300 border border-gold-500/40 shadow-gold-sm'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-white/5'
              }`}
            >
              {tool.icon}
              <span>{tool.label}</span>
            </button>
          ))}
        </div>

        {/* LEFT TOOLBAR CONTENT PANEL */}
        <div className="w-72 sm:w-80 bg-[#061e1d] border-r border-gold-subtle flex flex-col overflow-y-auto flex-shrink-0 p-4">
          
          {/* TAB 1: HALAMAN (PAGES MANAGER) */}
          {activeTab === 'pages' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gold-subtle">
                <h3 className="font-serif text-sm font-bold text-gold-bright">Daftar Halaman Undangan</h3>
                <span className="text-[10px] font-bold text-gold-400 bg-gold-950 px-2 py-0.5 rounded border border-gold-subtle">
                  {pages.length} Halaman
                </span>
              </div>

              <div className="space-y-2">
                {pages.map((page, idx) => (
                  <div
                    key={page.id}
                    onClick={() => setActivePageIndex(idx)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      activePageIndex === idx
                        ? 'border-gold-400 bg-[#0d3a36] shadow-gold-sm'
                        : 'border-white/10 bg-white/5 hover:border-gold-subtle'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-lg bg-black/40 text-gold-300 text-xs font-bold flex items-center justify-center border border-gold-subtle">
                        {idx + 1}
                      </span>
                      <div>
                        <p className="text-xs font-bold text-stone-100">{page.title}</p>
                        <p className="text-[10px] text-stone-400 uppercase tracking-wider">{page.type}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => { e.stopPropagation(); duplicatePage(); }}
                        title="Duplikat Halaman"
                        className="p-1 text-stone-400 hover:text-gold-300"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      {pages.length > 1 && (
                        <button
                          onClick={(e) => { e.stopPropagation(); deletePage(); }}
                          title="Hapus Halaman"
                          className="p-1 text-stone-400 hover:text-rose-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  const newP: PageData = {
                    id: 'p' + Date.now(),
                    title: `${pages.length + 1}. Halaman Tambahan`,
                    type: 'story',
                    bgTheme: 'velvet',
                    data: { storyTitle: 'Bagian Tambahan', storyIntro: 'Tuliskan momen istimewa atau panduan untuk para tamu di sini.' }
                  };
                  setPages([...pages, newP]);
                  setActivePageIndex(pages.length);
                }}
                className="w-full py-2.5 rounded-xl border border-dashed border-gold-500/40 hover:border-gold-400 text-gold-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Tambah Halaman Baru
              </button>
            </div>
          )}

          {/* TAB 2: TEKS EDITING */}
          {activeTab === 'text' && (
            <div className="space-y-4">
              <h3 className="font-serif text-sm font-bold text-gold-bright pb-2 border-b border-gold-subtle">
                Edit Teks Halaman Aktif
              </h3>

              {activePage.type === 'cover' && (
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="text-stone-400 block mb-1">Sub Judul / Header:</label>
                    <input
                      type="text"
                      value={activePage.data.subheading}
                      onChange={(e) => updatePageData('subheading', e.target.value)}
                      className="w-full bg-[#041514] border border-gold-subtle rounded-lg px-3 py-2 text-stone-100 focus:ring-1 focus:ring-gold-400"
                    />
                  </div>
                  <div>
                    <label className="text-stone-400 block mb-1">Nama Panggilan Pria:</label>
                    <input
                      type="text"
                      value={activePage.data.groomName}
                      onChange={(e) => updatePageData('groomName', e.target.value)}
                      className="w-full bg-[#041514] border border-gold-subtle rounded-lg px-3 py-2 text-stone-100 focus:ring-1 focus:ring-gold-400"
                    />
                  </div>
                  <div>
                    <label className="text-stone-400 block mb-1">Nama Panggilan Wanita:</label>
                    <input
                      type="text"
                      value={activePage.data.brideName}
                      onChange={(e) => updatePageData('brideName', e.target.value)}
                      className="w-full bg-[#041514] border border-gold-subtle rounded-lg px-3 py-2 text-stone-100 focus:ring-1 focus:ring-gold-400"
                    />
                  </div>
                  <div>
                    <label className="text-stone-400 block mb-1">Tanggal Acara:</label>
                    <input
                      type="text"
                      value={activePage.data.dateText}
                      onChange={(e) => updatePageData('dateText', e.target.value)}
                      className="w-full bg-[#041514] border border-gold-subtle rounded-lg px-3 py-2 text-stone-100 focus:ring-1 focus:ring-gold-400"
                    />
                  </div>
                </div>
              )}

              {activePage.type !== 'cover' && (
                <div className="space-y-3 text-xs">
                  <p className="text-stone-400">
                    Kamu sedang berada di <strong>{activePage.title}</strong>. Pilih tab Mempelai, Acara, atau Amplop untuk menyunting isi khusus halaman ini.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PROFIL MEMPELAI */}
          {activeTab === 'couple' && (
            <div className="space-y-4 text-xs">
              <h3 className="font-serif text-sm font-bold text-gold-bright pb-2 border-b border-gold-subtle">
                Data Lengkap Mempelai
              </h3>

              <div className="p-3 bg-white/5 rounded-xl border border-gold-subtle space-y-2">
                <span className="font-bold text-gold-400 uppercase tracking-wider block">Mempelai Pria</span>
                <input
                  type="text"
                  placeholder="Nama Lengkap & Gelar Pria"
                  value={pages[1].data.groomFullName}
                  onChange={(e) => {
                    const copy = [...pages];
                    copy[1].data.groomFullName = e.target.value;
                    setPages(copy);
                  }}
                  className="w-full bg-[#041514] border border-gold-subtle rounded-lg px-2.5 py-1.5 text-stone-100"
                />
                <textarea
                  rows={2}
                  placeholder="Nama Orang Tua Pria"
                  value={pages[1].data.groomParents}
                  onChange={(e) => {
                    const copy = [...pages];
                    copy[1].data.groomParents = e.target.value;
                    setPages(copy);
                  }}
                  className="w-full bg-[#041514] border border-gold-subtle rounded-lg px-2.5 py-1.5 text-stone-100"
                />
              </div>

              <div className="p-3 bg-white/5 rounded-xl border border-gold-subtle space-y-2">
                <span className="font-bold text-gold-400 uppercase tracking-wider block">Mempelai Wanita</span>
                <input
                  type="text"
                  placeholder="Nama Lengkap & Gelar Wanita"
                  value={pages[1].data.brideFullName}
                  onChange={(e) => {
                    const copy = [...pages];
                    copy[1].data.brideFullName = e.target.value;
                    setPages(copy);
                  }}
                  className="w-full bg-[#041514] border border-gold-subtle rounded-lg px-2.5 py-1.5 text-stone-100"
                />
                <textarea
                  rows={2}
                  placeholder="Nama Orang Tua Wanita"
                  value={pages[1].data.brideParents}
                  onChange={(e) => {
                    const copy = [...pages];
                    copy[1].data.brideParents = e.target.value;
                    setPages(copy);
                  }}
                  className="w-full bg-[#041514] border border-gold-subtle rounded-lg px-2.5 py-1.5 text-stone-100"
                />
              </div>
            </div>
          )}

          {/* TAB 4: ACARA & LOKASI */}
          {activeTab === 'events' && (
            <div className="space-y-4 text-xs">
              <h3 className="font-serif text-sm font-bold text-gold-bright pb-2 border-b border-gold-subtle">
                Atur Waktu & Lokasi
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="text-stone-400 block mb-1">Tanggal Akad:</label>
                  <input
                    type="text"
                    value={pages[2].data.akadDate}
                    onChange={(e) => {
                      const copy = [...pages];
                      copy[2].data.akadDate = e.target.value;
                      setPages(copy);
                    }}
                    className="w-full bg-[#041514] border border-gold-subtle rounded-lg px-2.5 py-1.5 text-stone-100"
                  />
                </div>
                <div>
                  <label className="text-stone-400 block mb-1">Waktu Akad:</label>
                  <input
                    type="text"
                    value={pages[2].data.akadTime}
                    onChange={(e) => {
                      const copy = [...pages];
                      copy[2].data.akadTime = e.target.value;
                      setPages(copy);
                    }}
                    className="w-full bg-[#041514] border border-gold-subtle rounded-lg px-2.5 py-1.5 text-stone-100"
                  />
                </div>
                <div>
                  <label className="text-stone-400 block mb-1">Tempat Resepsi:</label>
                  <input
                    type="text"
                    value={pages[2].data.resepsiPlace}
                    onChange={(e) => {
                      const copy = [...pages];
                      copy[2].data.resepsiPlace = e.target.value;
                      setPages(copy);
                    }}
                    className="w-full bg-[#041514] border border-gold-subtle rounded-lg px-2.5 py-1.5 text-stone-100"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: TEMA LATAR BELAKANG */}
          {activeTab === 'theme' && (
            <div className="space-y-4 text-xs">
              <h3 className="font-serif text-sm font-bold text-gold-bright pb-2 border-b border-gold-subtle">
                Pilih Tema Background Halaman
              </h3>

              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { id: 'velvet', name: 'Emerald Velvet', desc: 'Regal Dark Teal' },
                  { id: 'noir', name: 'Royal Noir', desc: 'Hitam Emas Mewah' },
                  { id: 'ivory', name: 'Champagne Ivory', desc: 'Klasik Elegan' },
                  { id: 'floral', name: 'Botanical Gold', desc: 'Ornamen Emas' },
                ].map((th) => (
                  <button
                    key={th.id}
                    onClick={() => changeBgTheme(th.id as any)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      activePage.bgTheme === th.id
                        ? 'border-gold-400 bg-gold-950/40 text-gold-300 shadow-gold-sm'
                        : 'border-white/10 bg-white/5 hover:border-gold-subtle'
                    }`}
                  >
                    <p className="font-bold">{th.name}</p>
                    <p className="text-[10px] text-stone-400 mt-0.5">{th.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: AMPLOP DIGITAL */}
          {activeTab === 'gift' && (
            <div className="space-y-4 text-xs">
              <h3 className="font-serif text-sm font-bold text-gold-bright pb-2 border-b border-gold-subtle">
                Rekening Amplop Digital & QRIS
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="text-stone-400 block mb-1">Nama Bank 1:</label>
                  <input
                    type="text"
                    value={pages[4].data.bankName1}
                    onChange={(e) => {
                      const copy = [...pages];
                      copy[4].data.bankName1 = e.target.value;
                      setPages(copy);
                    }}
                    className="w-full bg-[#041514] border border-gold-subtle rounded-lg px-2.5 py-1.5 text-stone-100"
                  />
                </div>
                <div>
                  <label className="text-stone-400 block mb-1">Nomor Rekening 1:</label>
                  <input
                    type="text"
                    value={pages[4].data.accNumber1}
                    onChange={(e) => {
                      const copy = [...pages];
                      copy[4].data.accNumber1 = e.target.value;
                      setPages(copy);
                    }}
                    className="w-full bg-[#041514] border border-gold-subtle rounded-lg px-2.5 py-1.5 text-stone-100"
                  />
                </div>
                <div>
                  <label className="text-stone-400 block mb-1">Atas Nama:</label>
                  <input
                    type="text"
                    value={pages[4].data.accHolder1}
                    onChange={(e) => {
                      const copy = [...pages];
                      copy[4].data.accHolder1 = e.target.value;
                      setPages(copy);
                    }}
                    className="w-full bg-[#041514] border border-gold-subtle rounded-lg px-2.5 py-1.5 text-stone-100"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: MUSIK LATAR */}
          {activeTab === 'music' && (
            <div className="space-y-4 text-xs">
              <h3 className="font-serif text-sm font-bold text-gold-bright pb-2 border-b border-gold-subtle">
                Pilih Lagu Latar Romantis
              </h3>

              <div className="space-y-2">
                {[
                  { title: "Canon in D (Orchestra Piano)", artist: "Johann Pachelbel", duration: "3:42" },
                  { title: "A Thousand Years (Acoustic)", artist: "Christina Perri", duration: "4:15" },
                  { title: "Sampai Jadi Debu", artist: "Banda Neira", duration: "3:58" },
                  { title: "Kisah Romantis (Violin)", artist: "Glenn Fredly Suite", duration: "4:02" },
                ].map((track, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-white/5 border border-gold-subtle flex items-center justify-between hover:bg-white/10 transition-colors"
                  >
                    <div>
                      <p className="font-bold text-stone-100">{track.title}</p>
                      <p className="text-[10px] text-stone-400">{track.artist} • {track.duration}</p>
                    </div>
                    <button
                      onClick={() => setIsPlayingMusic(!isPlayingMusic)}
                      className="p-2 rounded-full bg-gold-400 text-black hover:scale-105 transition-transform"
                    >
                      {isPlayingMusic ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* CENTER STAGE: THE STUDIO CANVAS VIEW */}
        <div className="flex-1 flex flex-col bg-[#020b0a] relative overflow-hidden">
          
          {/* FLOATING TOP FORMATTING TOOLBAR */}
          <div className="h-12 border-b border-gold-subtle/50 bg-[#061e1d]/90 backdrop-blur-md px-6 flex items-center justify-between text-xs text-stone-300 z-10">
            <div className="flex items-center gap-3">
              <span className="font-serif text-gold-300 font-bold tracking-wider">
                {activePage.title}
              </span>
              <div className="h-4 w-px bg-gold-subtle" />
              <div className="flex items-center gap-1">
                <button className="p-1.5 hover:bg-white/10 rounded"><Bold className="w-3.5 h-3.5" /></button>
                <button className="p-1.5 hover:bg-white/10 rounded"><Italic className="w-3.5 h-3.5" /></button>
                <button className="p-1.5 hover:bg-white/10 rounded"><AlignCenter className="w-3.5 h-3.5 text-gold-400" /></button>
              </div>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center gap-2">
              <button onClick={() => setZoomLevel(z => Math.max(70, z - 10))} className="p-1 hover:text-gold-400">
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="font-mono text-[11px] font-bold text-gold-300 w-12 text-center">{zoomLevel}%</span>
              <button onClick={() => setZoomLevel(z => Math.min(130, z + 10))} className="p-1 hover:text-gold-400">
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* CANVAS WORK AREA */}
          <div className="flex-1 flex items-center justify-center p-6 overflow-auto">
            
            {/* SMARTPHONE / PAGE CANVAS FRAME */}
            <div 
              style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'center center' }}
              className="relative w-[370px] h-[720px] rounded-[40px] shadow-velvet-deep border-4 border-gold-500/40 overflow-hidden flex flex-col transition-transform duration-200"
            >
              
              {/* PAGE BACKGROUND LAYER */}
              <div 
                className={`absolute inset-0 bg-cover bg-center transition-all duration-500 ${
                  activePage.bgTheme === 'velvet'
                    ? 'bg-velvet-texture'
                    : activePage.bgTheme === 'noir'
                    ? 'bg-gradient-to-b from-[#0b0c10] to-[#1f2833]'
                    : activePage.bgTheme === 'ivory'
                    ? 'bg-gradient-to-b from-[#FAF7F2] to-[#EAE4D9]'
                    : 'bg-emerald-gradient'
                }`}
              >
                {/* Dark Vignette Overlay for Velvet */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/75" />
              </div>

              {/* RENDER ACTIVE PAGE CONTENT */}
              <div className="relative z-10 w-full h-full flex flex-col p-6 text-center overflow-y-auto scrollbar-none">
                
                {/* PAGE 1: COVER */}
                {activePage.type === 'cover' && (
                  <div className="my-auto flex flex-col items-center justify-between h-full py-8">
                    
                    {/* Top Monogram */}
                    <div className="w-16 h-16 rounded-full border border-gold-400/60 p-1 flex items-center justify-center shadow-gold-sm">
                      <img src="/assets/favicon-h.png" alt="Monogram H" className="w-full h-full object-contain rounded-full" />
                    </div>

                    <div className="space-y-3">
                      <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-gold-300">
                        {activePage.data.subheading}
                      </p>

                      <h1 className="text-4xl sm:text-5xl font-serif font-bold text-gold-bright tracking-tight">
                        {activePage.data.groomName} <br />
                        <span className="font-script text-3xl sm:text-4xl text-amber-200 lowercase">&</span> <br />
                        {activePage.data.brideName}
                      </h1>

                      <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto my-2" />

                      <p className="text-xs text-stone-200 font-serif">
                        {activePage.data.dateText}
                      </p>
                      <p className="text-[10px] text-stone-400 max-w-[220px] mx-auto">
                        {activePage.data.venueCity}
                      </p>
                    </div>

                    {/* Bottom Guest Pill & Button */}
                    <div className="w-full space-y-3 pt-6">
                      <div className="bg-black/30 backdrop-blur-md border border-gold-subtle rounded-xl p-3">
                        <p className="text-[10px] text-stone-400">Kepada Yth. Tamu Undangan:</p>
                        <p className="text-xs font-bold text-gold-200 mt-0.5">{guestNameParam}</p>
                      </div>

                      <button
                        onClick={() => setActivePageIndex(1)}
                        className="w-full py-3 rounded-full bg-gradient-to-r from-amber-500 to-gold-400 text-[#041514] font-serif font-bold text-xs uppercase tracking-widest shadow-gold-glow hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                      >
                        <Heart className="w-3.5 h-3.5 fill-current" />
                        {activePage.data.buttonText}
                      </button>
                    </div>

                  </div>
                )}

                {/* PAGE 2: MEMPELAI */}
                {activePage.type === 'couple' && (
                  <div className="my-auto space-y-6 py-6">
                    <p className="text-[10px] italic text-gold-200 font-serif max-w-xs mx-auto">
                      "{pages[1].data.introQuote}"
                    </p>

                    {/* Groom Card */}
                    <div className="space-y-2">
                      <div className="w-24 h-24 mx-auto rounded-full p-1 border-2 border-gold-400 shadow-gold-sm overflow-hidden">
                        <img src={pages[1].data.groomPhoto} alt="Groom" className="w-full h-full object-cover rounded-full" />
                      </div>
                      <h3 className="font-serif text-lg font-bold text-gold-bright">
                        {pages[1].data.groomFullName}
                      </h3>
                      <p className="text-[10px] text-stone-300 max-w-xs mx-auto">
                        {pages[1].data.groomParents}
                      </p>
                      <span className="inline-block text-[10px] text-gold-400 font-semibold">{pages[1].data.groomIg}</span>
                    </div>

                    <div className="font-script text-2xl text-gold-300">&</div>

                    {/* Bride Card */}
                    <div className="space-y-2">
                      <div className="w-24 h-24 mx-auto rounded-full p-1 border-2 border-gold-400 shadow-gold-sm overflow-hidden">
                        <img src={pages[1].data.bridePhoto} alt="Bride" className="w-full h-full object-cover rounded-full" />
                      </div>
                      <h3 className="font-serif text-lg font-bold text-gold-bright">
                        {pages[1].data.brideFullName}
                      </h3>
                      <p className="text-[10px] text-stone-300 max-w-xs mx-auto">
                        {pages[1].data.brideParents}
                      </p>
                      <span className="inline-block text-[10px] text-gold-400 font-semibold">{pages[1].data.brideIg}</span>
                    </div>
                  </div>
                )}

                {/* PAGE 3: EVENTS */}
                {activePage.type === 'events' && (
                  <div className="my-auto space-y-6 py-6">
                    <h2 className="font-serif text-2xl font-bold text-gold-bright">
                      {pages[2].data.title}
                    </h2>

                    {/* Akad Nikah */}
                    <div className="p-4 rounded-2xl bg-black/40 backdrop-blur-md border border-gold-subtle text-left space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-gold-300 uppercase tracking-wider">Akad Nikah</span>
                        <Calendar className="w-4 h-4 text-gold-400" />
                      </div>
                      <p className="text-sm font-serif font-bold text-white">{pages[2].data.akadDate}</p>
                      <p className="text-xs text-stone-300">{pages[2].data.akadTime}</p>
                      <p className="text-xs text-stone-400 flex items-start gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-gold-400 flex-shrink-0 mt-0.5" />
                        <span>{pages[2].data.akadPlace}</span>
                      </p>
                    </div>

                    {/* Resepsi */}
                    <div className="p-4 rounded-2xl bg-black/40 backdrop-blur-md border border-gold-subtle text-left space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-gold-300 uppercase tracking-wider">Resepsi Pernikahan</span>
                        <Calendar className="w-4 h-4 text-gold-400" />
                      </div>
                      <p className="text-sm font-serif font-bold text-white">{pages[2].data.resepsiDate}</p>
                      <p className="text-xs text-stone-300">{pages[2].data.resepsiTime}</p>
                      <p className="text-xs text-stone-400 flex items-start gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-gold-400 flex-shrink-0 mt-0.5" />
                        <span>{pages[2].data.resepsiPlace}</span>
                      </p>
                    </div>

                    <button className="w-full py-2.5 rounded-xl bg-gold-950 border border-gold-subtle text-gold-300 text-xs font-bold">
                      Buka Petunjuk Arah (Google Maps)
                    </button>
                  </div>
                )}

                {/* PAGE 4: GALLERY */}
                {activePage.type === 'story' && (
                  <div className="my-auto space-y-4 py-6">
                    <h2 className="font-serif text-2xl font-bold text-gold-bright">
                      {pages[3].data.storyTitle}
                    </h2>
                    <p className="text-xs text-stone-300 max-w-xs mx-auto">
                      {pages[3].data.storyIntro}
                    </p>

                    <div className="grid grid-cols-2 gap-2.5 pt-2">
                      {pages[3].data.photos.map((src: string, i: number) => (
                        <div key={i} className="aspect-square rounded-2xl overflow-hidden border border-gold-subtle shadow-md">
                          <img src={src} alt="Prewedding" className="w-full h-full object-cover hover:scale-105 transition-transform" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* PAGE 5: GIFTS & AMPLOP */}
                {activePage.type === 'gift' && (
                  <div className="my-auto space-y-5 py-6">
                    <h2 className="font-serif text-2xl font-bold text-gold-bright">
                      Tanda Kasih & Hadiah
                    </h2>
                    <p className="text-xs text-stone-300">
                      Doa restu Anda merupakan karunia terindah bagi kami. Bagi yang ingin mengirimkan kado, dapat melalui:
                    </p>

                    {/* Bank 1 */}
                    <div className="p-3.5 rounded-2xl bg-black/40 backdrop-blur-md border border-gold-subtle text-left">
                      <p className="text-[10px] font-bold text-gold-400">{pages[4].data.bankName1}</p>
                      <p className="text-base font-mono font-bold text-white mt-1">{pages[4].data.accNumber1}</p>
                      <p className="text-xs text-stone-400">a.n. {pages[4].data.accHolder1}</p>
                      <button className="mt-2 text-[10px] font-bold text-gold-300 bg-gold-950 px-3 py-1 rounded-md border border-gold-subtle">
                        Salin No. Rekening
                      </button>
                    </div>

                    {/* Bank 2 */}
                    <div className="p-3.5 rounded-2xl bg-black/40 backdrop-blur-md border border-gold-subtle text-left">
                      <p className="text-[10px] font-bold text-gold-400">{pages[4].data.bankName2}</p>
                      <p className="text-base font-mono font-bold text-white mt-1">{pages[4].data.accNumber2}</p>
                      <p className="text-xs text-stone-400">a.n. {pages[4].data.accHolder2}</p>
                      <button className="mt-2 text-[10px] font-bold text-gold-300 bg-gold-950 px-3 py-1 rounded-md border border-gold-subtle">
                        Salin No. Rekening
                      </button>
                    </div>
                  </div>
                )}

                {/* PAGE 6: RSVP */}
                {activePage.type === 'rsvp' && (
                  <div className="my-auto space-y-4 py-6 text-left">
                    <h2 className="font-serif text-2xl font-bold text-gold-bright text-center">
                      Konfirmasi Kehadiran
                    </h2>
                    <p className="text-xs text-stone-300 text-center">
                      {pages[5].data.note}
                    </p>

                    <div className="space-y-3 bg-black/40 p-4 rounded-2xl border border-gold-subtle">
                      <div>
                        <label className="text-[10px] text-stone-400 block mb-1">Nama Lengkap Anda:</label>
                        <input
                          type="text"
                          defaultValue={guestNameParam}
                          className="w-full bg-[#041514] border border-gold-subtle rounded-lg px-2.5 py-1.5 text-xs text-stone-100"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] text-stone-400 block mb-1">Konfirmasi:</label>
                        <select className="w-full bg-[#041514] border border-gold-subtle rounded-lg px-2.5 py-1.5 text-xs text-stone-100">
                          <option>✓ Saya Akan Hadir</option>
                          <option>✕ Maaf, Belum Bisa Hadir</option>
                          <option>? Masih Ragu-Ragu</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] text-stone-400 block mb-1">Doa & Ucapan:</label>
                        <textarea
                          rows={2}
                          placeholder="Tuliskan ucapan selamat..."
                          className="w-full bg-[#041514] border border-gold-subtle rounded-lg px-2.5 py-1.5 text-xs text-stone-100"
                        />
                      </div>

                      <button className="w-full py-2 bg-gradient-to-r from-amber-500 to-gold-400 text-black text-xs font-bold rounded-lg shadow-gold-sm">
                        Kirim Konfirmasi & Doa
                      </button>
                    </div>
                  </div>
                )}

              </div>

            </div>

          </div>

          {/* 3. STUDIO PRO BOTTOM FILMSTRIP (PAGE THUMBNAILS BAR) */}
          <div className="h-24 bg-[#031110] border-t border-gold-subtle flex items-center px-4 overflow-x-auto gap-3 flex-shrink-0 z-20">
            {pages.map((page, index) => (
              <div
                key={page.id}
                onClick={() => setActivePageIndex(index)}
                className={`flex-shrink-0 w-28 h-18 rounded-xl border-2 p-1.5 cursor-pointer transition-all flex flex-col justify-between ${
                  activePageIndex === index
                    ? 'border-gold-400 bg-gold-950/60 shadow-gold-sm scale-105'
                    : 'border-white/15 bg-white/5 hover:border-gold-subtle'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-gold-300">Hal {index + 1}</span>
                  <span className="text-[9px] text-stone-400 truncate max-w-[60px]">{page.type}</span>
                </div>
                <p className="text-[10px] font-semibold text-stone-200 truncate">{page.title}</p>
              </div>
            ))}

            <button
              onClick={() => {
                const newP: PageData = {
                  id: 'p' + Date.now(),
                  title: `${pages.length + 1}. Halaman Baru`,
                  type: 'story',
                  bgTheme: 'velvet',
                  data: { storyTitle: 'Judul Halaman', storyIntro: 'Konten kustom pernikahan.' }
                };
                setPages([...pages, newP]);
                setActivePageIndex(pages.length);
              }}
              className="flex-shrink-0 w-24 h-18 rounded-xl border border-dashed border-gold-500/40 hover:border-gold-400 flex flex-col items-center justify-center text-gold-300 text-[10px] font-bold gap-1 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Hal</span>
            </button>
          </div>

        </div>

      </div>

      {/* 4. MODAL PRATINJAU TAMU (GUEST LIVE PREVIEW) */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#061e1d] border border-gold-glow rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setShowPreviewModal(false)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-gold-400 mb-2">
              <Eye className="w-5 h-5" />
              <span className="text-xs uppercase font-extrabold tracking-wider">Simulasi Tampilan Tamu</span>
            </div>

            <h3 className="font-serif text-xl font-bold text-gold-bright">
              Tautan WhatsApp Khusus Tamu
            </h3>
            <p className="text-xs text-stone-300 mt-1">
              Setiap tamu akan melihat nama mereka tercetak rapi di sampul depan undangan.
            </p>

            <div className="mt-4 space-y-3">
              <div>
                <label className="text-xs font-bold text-stone-300 block mb-1">
                  Uji Coba Ganti Nama Tamu:
                </label>
                <input
                  type="text"
                  value={guestNameParam}
                  onChange={(e) => setGuestNameParam(e.target.value)}
                  placeholder="Contoh: Bapak Ir. Ahmad & Istri"
                  className="w-full bg-[#041514] border border-gold-subtle rounded-xl px-3 py-2 text-xs text-stone-100"
                />
              </div>

              <div className="p-3 bg-black/40 rounded-xl border border-gold-subtle text-xs font-mono text-gold-300 break-all">
                https://harinikah.com/dimas-clarissa?to={encodeURIComponent(guestNameParam)}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setCopiedLink(true);
                    setTimeout(() => setCopiedLink(false), 2000);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-gold-400 text-black text-xs font-bold uppercase tracking-wider shadow-gold-sm"
                >
                  {copiedLink ? '✓ Tautan Disalin!' : 'Salin Tautan'}
                </button>
                <a
                  href={`https://wa.me/?text=Kepada%20Yth.%20${encodeURIComponent(guestNameParam)},%20kami%20mengundang%20ke%20pernikahan%20kami:%20https://harinikah.com/dimas-clarissa?to=${encodeURIComponent(guestNameParam)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  Kirim WA
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

