import React from 'react';
import { MessageCircle } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const whatsappUrl = "https://wa.me/6281234567890?text=Halo%20HariNikah,%20saya%20tertarik%20tanya%20tentang%20undangan%20digital%20dan%20cetak%20fisik";

  return (
    <aside aria-label="Bantuan Langsung WhatsApp" className="fixed bottom-6 right-6 z-40 group">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white pl-4 pr-5 py-3 rounded-full shadow-2xl shadow-emerald-950 border border-emerald-400/30 hover:-translate-y-1 transition-all duration-300"
      >
        <div className="relative">
          <MessageCircle className="w-5 h-5 fill-current text-white" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full ring-2 ring-emerald-600 animate-pulse"></span>
        </div>
        <div className="text-left hidden sm:block">
          <p className="text-[10px] uppercase font-bold tracking-wider text-emerald-100 leading-none">Konsultan Online</p>
          <p className="text-xs font-serif font-bold text-white mt-0.5">Tanya HariNikah</p>
        </div>
      </a>
    </aside>
  );
};

