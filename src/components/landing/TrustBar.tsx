'use client';

import React from 'react';
import { Users, Award, Truck, MapPin } from 'lucide-react';
import { useInvitation } from '../../context/InvitationContext';

export const TrustBar: React.FC = () => {
  const { themeMode } = useInvitation();
  const isLight = themeMode === 'light';

  const stats = [
    {
      icon: <Users className={`w-5 h-5 ${isLight ? 'text-amber-700' : 'text-gold-400'}`} />,
      value: "18.500+",
      label: "Pasangan Mempercayai HariNikah"
    },
    {
      icon: <Award className={`w-5 h-5 ${isLight ? 'text-amber-700' : 'text-gold-400'}`} />,
      value: "4.9 / 5.0",
      label: "Rating Kepuasan Pengantin"
    },
    {
      icon: <Truck className={`w-5 h-5 ${isLight ? 'text-amber-700' : 'text-gold-400'}`} />,
      value: "100% Aman",
      label: "Kirim Cetak se-Indonesia & Luar Negeri"
    },
    {
      icon: <MapPin className={`w-5 h-5 ${isLight ? 'text-amber-700' : 'text-gold-400'}`} />,
      value: "Showroom Fisik",
      label: "Konsultasi Offline di Jakarta & Bandung"
    }
  ];

  return (
    <section className={`border-y py-6 relative z-10 transition-colors duration-300 ${
      isLight ? 'bg-[#F5EFE6] border-[#E8DEC8]' : 'bg-[#031110] border-gold-subtle'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex items-center gap-3.5">
              <div className={`p-2.5 rounded-xl border flex-shrink-0 shadow-sm ${
                isLight ? 'bg-amber-100/70 border-amber-300/80' : 'bg-gold-950/60 border-gold-subtle shadow-gold-sm'
              }`}>
                {stat.icon}
              </div>
              <div>
                <p className={`text-lg sm:text-xl font-serif font-bold leading-tight ${
                  isLight ? 'text-amber-900' : 'text-gold-bright'
                }`}>
                  {stat.value}
                </p>
                <p className={`text-xs font-medium mt-0.5 ${
                  isLight ? 'text-stone-600' : 'text-stone-400'
                }`}>
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
