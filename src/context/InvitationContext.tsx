'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { PageData, BackgroundTheme, PageType, CulturalTemplate, ThemeMode } from '../types';
import { INITIAL_PAGES, TEMPLATE_PRESETS } from '../constants/initialData';

interface InvitationContextType {
  pages: PageData[];
  activePageIndex: number;
  setActivePageIndex: (idx: number) => void;
  updatePageData: (pageIndex: number, key: string, value: any) => void;
  updatePageTheme: (pageIndex: number, theme: BackgroundTheme) => void;
  addPage: (title: string, type: PageType, bgTheme?: BackgroundTheme) => void;
  duplicatePage: (pageIndex: number) => void;
  deletePage: (pageIndex: number) => void;
  currentTemplate: CulturalTemplate;
  applyTemplate: (tpl: CulturalTemplate) => void;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  toggleThemeMode: () => void;
  slug: string;
  setSlug: (slug: string) => void;
  title: string;
  setTitle: (title: string) => void;
  guestName: string;
  setGuestName: (name: string) => void;
  isSaved: boolean;
  saveInvitation: () => void;
  exportJSON: () => void;
  exportHTML: () => void;
  publishInvitation: () => { success: boolean; url: string };
}

const InvitationContext = createContext<InvitationContextType | undefined>(undefined);

const STORAGE_KEY = 'harinikah_invitation_draft';
const THEME_MODE_KEY = 'harinikah_theme_mode';

export const InvitationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pages, setPages] = useState<PageData[]>(INITIAL_PAGES);
  const [activePageIndex, setActivePageIndex] = useState<number>(0);
  const [currentTemplate, setCurrentTemplate] = useState<CulturalTemplate>('modern');
  const [themeMode, setThemeMode] = useState<ThemeMode>('dark');
  const [slug, setSlug] = useState<string>('dimas-clarissa');
  const [title, setTitle] = useState<string>('The Wedding of Dimas & Clarissa');
  const [guestName, setGuestName] = useState<string>('Bapak Budi & Rekan');
  const [isSaved, setIsSaved] = useState<boolean>(true);

  // Load from LocalStorage on mount
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_MODE_KEY);
      if (savedTheme === 'light' || savedTheme === 'dark') {
        setThemeMode(savedTheme);
      }

      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.pages && parsed.pages.length > 0) setPages(parsed.pages);
        if (parsed.slug) setSlug(parsed.slug);
        if (parsed.title) setTitle(parsed.title);
        if (parsed.currentTemplate) setCurrentTemplate(parsed.currentTemplate);
      }
    } catch (e) {
      console.warn('Failed to load invitation draft from storage', e);
    }
  }, []);

  const toggleThemeMode = () => {
    setThemeMode(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(THEME_MODE_KEY, next);
      } catch (e) {}
      return next;
    });
  };

  const applyTemplate = (tpl: CulturalTemplate) => {
    const preset = TEMPLATE_PRESETS[tpl];
    if (preset) {
      setCurrentTemplate(tpl);
      setPages(preset.pages);
      setActivePageIndex(0);
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ pages: preset.pages, slug, title, currentTemplate: tpl })
        );
      } catch (e) {}
    }
  };

  // Update specific field inside a page's data
  const updatePageData = (pageIndex: number, key: string, value: any) => {
    setPages(prev => {
      const copy = [...prev];
      if (!copy[pageIndex]) return prev;
      copy[pageIndex] = {
        ...copy[pageIndex],
        data: {
          ...copy[pageIndex].data,
          [key]: value
        }
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ pages: copy, slug, title, currentTemplate }));
      } catch (err) {}
      return copy;
    });
    setIsSaved(true);
  };

  // Update background theme of a page
  const updatePageTheme = (pageIndex: number, theme: BackgroundTheme) => {
    setPages(prev => {
      const copy = [...prev];
      if (!copy[pageIndex]) return prev;
      copy[pageIndex] = {
        ...copy[pageIndex],
        bgTheme: theme
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ pages: copy, slug, title, currentTemplate }));
      } catch (err) {}
      return copy;
    });
  };

  // Add a new page
  const addPage = (pageTitle: string, type: PageType, bgTheme: BackgroundTheme = 'velvet') => {
    const newPage: PageData = {
      id: 'p' + Date.now(),
      title: pageTitle,
      type,
      bgTheme,
      data: {
        title: pageTitle,
        content: 'Tuliskan detail undangan di sini.'
      }
    };
    setPages(prev => [...prev, newPage]);
    setActivePageIndex(pages.length);
  };

  // Duplicate an existing page
  const duplicatePage = (pageIndex: number) => {
    const target = pages[pageIndex];
    if (!target) return;
    const duplicated: PageData = {
      ...target,
      id: 'p' + Date.now(),
      title: `${target.title} (Salinan)`
    };
    const updated = [...pages];
    updated.splice(pageIndex + 1, 0, duplicated);
    setPages(updated);
    setActivePageIndex(pageIndex + 1);
  };

  // Delete a page
  const deletePage = (pageIndex: number) => {
    if (pages.length <= 1) return;
    const filtered = pages.filter((_, idx) => idx !== pageIndex);
    setPages(filtered);
    setActivePageIndex(Math.max(0, pageIndex - 1));
  };

  const saveInvitation = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ pages, slug, title, currentTemplate }));
      setIsSaved(true);
    } catch (err) {
      console.error(err);
    }
  };

  // Export full JSON file
  const exportJSON = () => {
    const exportData = {
      slug,
      title,
      currentTemplate,
      themeMode,
      exportedAt: new Date().toISOString(),
      pages
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `undangan-${currentTemplate}-${slug}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Export standalone HTML bundle
  const exportHTML = () => {
    const groom = pages[0]?.data?.groomName || 'Dimas';
    const bride = pages[0]?.data?.brideName || 'Clarissa';
    const date = pages[0]?.data?.dateText || 'Sabtu, 18 Juli 2026';
    const venue = pages[0]?.data?.venueCity || 'Jakarta';

    const htmlContent = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; background: #FAF7F2; color: #1c1917; text-align: center; padding: 2rem; margin: 0; }
    h1 { color: #b8860b; font-family: 'Playfair Display', serif; font-size: 2.5rem; margin: 0.5rem 0; }
    .card { background: #ffffff; border: 1px solid rgba(184, 134, 11, 0.3); border-radius: 1.5rem; padding: 2.5rem; max-width: 480px; margin: 2rem auto; box-shadow: 0 10px 30px rgba(0,0,0,0.08); }
    .btn { background: linear-gradient(135deg, #dfb051, #c49232); color: #000; font-weight: bold; padding: 0.85rem 1.75rem; border-radius: 9999px; text-decoration: none; display: inline-block; margin-top: 1.5rem; }
    .badge { font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #b8860b; font-weight: bold; }
  </style>
</head>
<body>
  <div class="card">
    <p class="badge">THE WEDDING CELEBRATION OF</p>
    <h1>${groom} & ${bride}</h1>
    <p style="color: #44403c; font-size: 14px;">${date}</p>
    <p style="color: #78716c; font-size: 12px;">${venue}</p>
    <a href="https://harinikah.com/${slug}" class="btn">Buka Website Undangan Tamu</a>
  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `undangan-${slug}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Publish invitation live
  const publishInvitation = () => {
    try {
      localStorage.setItem(
        `harinikah_live_${slug}`,
        JSON.stringify({ pages, slug, title, currentTemplate, themeMode, publishedAt: new Date().toISOString() })
      );
      saveInvitation();
      const liveUrl = `/${slug}?to=${encodeURIComponent(guestName)}`;
      return { success: true, url: liveUrl };
    } catch (e) {
      return { success: false, url: '' };
    }
  };

  return (
    <InvitationContext.Provider
      value={{
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
        setThemeMode,
        toggleThemeMode,
        slug,
        setSlug,
        title,
        setTitle,
        guestName,
        setGuestName,
        isSaved,
        saveInvitation,
        exportJSON,
        exportHTML,
        publishInvitation,
      }}
    >
      {children}
    </InvitationContext.Provider>
  );
};

export const useInvitation = () => {
  const context = useContext(InvitationContext);
  if (!context) {
    throw new Error('useInvitation must be used within an InvitationProvider');
  }
  return context;
};
