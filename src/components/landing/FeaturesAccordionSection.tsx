'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Users
} from 'lucide-react';
import { useInvitation } from '../../context/InvitationContext';

interface FeatureItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  subtitle: string;
  description: string;
  bullets: string[];
  badge?: string;
}

export const FeaturesAccordionSection: React.FC = () => {
  const { themeMode } = useInvitation();
  const isLight = themeMode === 'light';

  const [expandedId, setExpandedId] = useState<string | null>('update-instan');

  const toggleFeature = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const features: FeatureItem[] = [
    {
      id: 'update-instan',
      title: 'UPDATE INSTAN',
      icon: <Sparkles className="w-5 h-5 text-amber-900" />,
      subtitle: 'Edit & Revisi Kapan Saja Langsung Live',
      description: 'Tidak perlu panik jika ada perubahan tanggal, jam akad, lokasi gedung, atau tambahan nama tamu. Semua revisi di Studio Editor langsung tersimpan otomatis di cloud dan terupdate seketika di tautan undangan tamu.',
      bullets: [
        'Sinkronisasi real-time tanpa perlu kirim ulang link',
        'Auto-save otomatis per ketukan teks',
        'Bisa ganti foto prewedding kapan saja',
        'Bebas ubah nama tamu undangan tanpa batas kuota'
      ],
      badge: 'Bebas Revisi'
    },
    {
      id: 'countdown-timer',
      title: 'COUNTDOWN TIMER',
      icon: <Clock className="w-5 h-5 text-amber-900" />,
      subtitle: 'Hitung Mundur Waktu Menuju Hari Bahagia',
      description: 'Tampilkan pengingat waktu live berupa hari, jam, menit, dan detik menuju akad dan resepsi pernikahan secara presisi di layar tamu.',
      bullets: [
        'Hitungan mundur otomatis menyesuaikan zona waktu (WIB/WITA/WIT)',
        'Desain angka jam bergaya monogram emas mewah',
        'Memberikan antusiasme dan urgensi bagi para tamu'
      ],
      badge: 'Live Timer'
    },
    {
      id: 'save-the-date',
      title: 'SAVE THE DATE',
      icon: <Calendar className="w-5 h-5 text-amber-900" />,
      subtitle: '1-Klik Simpan ke Kalender Tamu',
      description: 'Memudahkan tamu memasukkan agenda pernikahan Anda ke kalender ponsel pintar mereka hanya dengan 1 sentuhan tombol.',
      bullets: [
        'Sinkronisasi langsung ke Google Calendar',
        'Unduh file .ics otomatis untuk pengguna Apple iOS & Outlook',
        'Notifikasi pengingat otomatis H-1 dan H-2 jam sebelum acara'
      ],
      badge: 'Google & Apple'
    },
    {
      id: 'love-story',
      title: 'LOVE STORY',
      icon: <Heart className="w-5 h-5 text-amber-900" />,
      subtitle: 'Linimasa Romantis Perjalanan Cinta',
      description: 'Ceritakan momen indah Anda berdua mulai dari perkenalan pertama, komitmen, lamaran, hingga melangkah ke jenjang pelaminan dalam tampilan timeline interaktif.',
      bullets: [
        'Format linimasa vertikal elegan dengan milestone foto',
        'Tipografi kutipan puitis dan doa pernikahan',
        'Membangun ikatan emosional hangat dengan para tamu'
      ],
      badge: 'Storytelling'
    },
    {
      id: 'maps',
      title: 'MAPS & NAVIGASI',
      icon: <MapPin className="w-5 h-5 text-amber-900" />,
      subtitle: 'Panduan Rute Presisi ke Lokasi Acara',
      description: 'Tamu tidak akan tersesat. Tombol navigasi langsung membuka aplikasi Google Maps dan Waze di smartphone tamu dengan rute tercepat.',
      bullets: [
        'Integrasi Google Maps & Waze 1-klik',
        'Penyematan peta interaktif langsung di dalam undangan',
        'Informasi detail ballroom, parkir, dan patokan gedung'
      ],
      badge: 'Akurat 100%'
    },
    {
      id: 'background-music',
      title: 'BACKGROUND MUSIC',
      icon: <Music className="w-5 h-5 text-amber-900" />,
      subtitle: 'Pemutar Piringan Hitam Vinyl Eksklusif',
      description: 'Undangan dilengkapi alunan instrumen romantis yang otomatis berputar saat amplop dibuka. Dilengkapi tombol kontrol floating vinyl disc yang berputar estetis.',
      bullets: [
        'Rotating Vinyl Disc interaktif di pojok layar',
        'Pilihan audio adat: Gamelan Pelog Jawa, Saluang Minang, atau Modern Romantic Cello',
        'Kontrol mute/play instan tanpa mengganggu kenyamanan tamu'
      ],
      badge: 'Rotating Vinyl'
    },
    {
      id: 'photo-gallery',
      title: 'PHOTO GALLERY',
      icon: <Camera className="w-5 h-5 text-amber-900" />,
      subtitle: 'Galeri Foto Prewedding 4K Interaktif',
      description: 'Pamerkan foto-foto prewedding terbaik Anda dalam tata letak masonry grid mewah yang dilengkapi fitur lightbox zoom layar penuh.',
      bullets: [
        'Mendukung foto beresolusi tinggi 4K tanpa pecah',
        'Kompresi pintar WebP untuk loading super cepat di HP',
        'Mode fullscreen lightbox dengan navigasi geser sentuh'
      ],
      badge: 'Masonry 4K'
    },
    {
      id: 'video-prewedding',
      title: 'VIDEO PREWEDDING',
      icon: <Video className="w-5 h-5 text-amber-900" />,
      subtitle: 'Pemutar Video Sinematik Teaser',
      description: 'Sisipkan video sinematik teaser prewedding atau pesan cinta Anda langsung di dalam halaman undangan digital.',
      bullets: [
        'Mendukung embed YouTube HD, Vimeo, atau direct MP4',
        'Tampilan video responsif berbingkai emas melengkung',
        'Autopause saat musik latar dinyalakan agar tidak bentrok suara'
      ],
      badge: 'Cinematic HD'
    },
    {
      id: 'wedding-gift',
      title: 'WEDDING GIFT',
      icon: <Gift className="w-5 h-5 text-amber-900" />,
      subtitle: 'Amplop Digital Multi-Bank & Barcode QRIS',
      description: 'Solusi elegan bagi tamu yang tidak bisa hadir langsung namun ingin memberikan hadiah dan tanda kasih kepada kedua mempelai.',
      bullets: [
        'Tombol 1-klik salin nomor rekening bank (BCA, Mandiri, BNI, BRI, dll)',
        'Dukungan barcode QRIS (GoPay, OVO, ShopeePay, Dana)',
        'Fitur alamat kirim kado fisik dengan tombol salin alamat rumah'
      ],
      badge: 'QRIS & Multi-Bank'
    },
    {
      id: 'rsvp-wishes',
      title: 'RSVP & WISHES',
      icon: <Users className="w-5 h-5 text-amber-900" />,
      subtitle: 'Buku Tamu Digital & Ucapan Doa Real-Time',
      description: 'Ketahui kepastian jumlah tamu yang akan hadir dan kumpulkan doa restu hangat dari seluruh keluarga dan sahabat secara live.',
      bullets: [
        'Formulir konfirmasi kehadiran tamu (Hadir, Tidak Hadir, Ragu-ragu)',
        'Pilihan jumlah porsi tamu (1 atau 2 orang)',
        'Papan doa interaktif dengan efek confetti ucapan selamat',
        'Data tersimpan rapi dan dapat diekspor ke Excel oleh pengantin'
      ],
      badge: 'Real-time Feed'
    }
  ];

  return (
    <section className={`py-20 lg:py-28 transition-colors duration-300 ${
      isLight ? 'bg-[#F2ECE4]' : 'bg-[#031211]'
    }`} id="fitur">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs uppercase tracking-widest font-extrabold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fitur Terlengkap & Eksklusif</span>
          </div>

          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight ${
            isLight ? 'text-stone-900' : 'text-white'
          }`}>
            10 Fitur Unggulan Undangan Digital
          </h2>
          <p className={`text-sm sm:text-base mt-4 max-w-2xl mx-auto leading-relaxed ${
            isLight ? 'text-stone-600' : 'text-stone-300'
          }`}>
            Tidak perlu memilih tamu karena keterbatasan kuota. Tambahkan sebanyak yang kalian inginkan, satu per satu, dengan nama personal. Semua fitur terbaik sudah termasuk dalam setiap paket.
          </p>
        </div>

        {/* Feature Accordion Grid / List matching screenshot 1 */}
        <div className="space-y-3.5 max-w-2xl mx-auto">
          {features.map((feat) => {
            const isExpanded = expandedId === feat.id;

            return (
              <div
                key={feat.id}
                className="overflow-hidden rounded-2xl transition-all"
              >
                {/* Accordion Trigger Button (Styled like Image 1 - warm camel/gold pill with (+) icon) */}
                <button
                  type="button"
                  onClick={() => toggleFeature(feat.id)}
                  aria-expanded={isExpanded}
                  className={`w-full py-4 px-6 rounded-2xl flex items-center justify-between font-bold text-sm sm:text-base tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-md ${
                    isExpanded
                      ? 'bg-[#B08A56] text-stone-950 ring-2 ring-[#B08A56]/60 shadow-lg'
                      : 'bg-[#B8935D] hover:bg-[#C29D66] text-stone-950 active:scale-[0.99]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-extrabold tracking-[0.12em]">{feat.title}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {feat.badge && (
                      <span className="hidden sm:inline-block text-[10px] px-2.5 py-0.5 rounded-full bg-stone-950/20 text-stone-950 font-bold uppercase tracking-wider">
                        {feat.badge}
                      </span>
                    )}
                    <div className="w-8 h-8 rounded-full bg-stone-950 flex items-center justify-center text-amber-300 transition-transform duration-300 shadow-inner">
                      {isExpanded ? (
                        <Minus className="w-4 h-4 stroke-[3]" />
                      ) : (
                        <Plus className="w-4 h-4 stroke-[3]" />
                      )}
                    </div>
                  </div>
                </button>

                {/* Expanded Content Box */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className={`p-6 mt-1 rounded-2xl border transition-colors ${
                        isLight
                          ? 'bg-white/90 border-amber-300/60 text-stone-800 shadow-md'
                          : 'bg-[#071f1e]/95 border-amber-400/30 text-stone-200 shadow-xl'
                      }`}>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 rounded-xl bg-amber-400/20 text-amber-500">
                            {feat.icon}
                          </div>
                          <div>
                            <h4 className="font-bold text-base text-amber-500">
                              {feat.subtitle}
                            </h4>
                          </div>
                        </div>

                        <p className="text-xs sm:text-sm leading-relaxed mb-4 text-stone-400">
                          {feat.description}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3 border-t border-white/10">
                          {feat.bullets.map((bullet, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                              <span className={isLight ? 'text-stone-700' : 'text-stone-300'}>{bullet}</span>
                            </div>
                          ))}
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
        <div className="mt-12 text-center">
          <p className={`text-xs ${isLight ? 'text-stone-500' : 'text-stone-400'}`}>
            Ingin mencoba langsung semua fitur di atas? Coba buat undangan gratis Anda sekarang.
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <a
              href="/editor"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 via-gold-300 to-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              Buka Studio Editor Gratis →
            </a>
            <a
              href="/dimas-clarissa?theme=botanical&to=Bapak+Budi"
              className={`px-6 py-3 rounded-full border text-xs font-bold uppercase tracking-wider transition-all ${
                isLight
                  ? 'border-stone-400 text-stone-800 hover:bg-stone-200'
                  : 'border-white/20 text-stone-200 hover:bg-white/10'
              }`}
            >
              Lihat Demo Interaktif Tamu 🌿
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
