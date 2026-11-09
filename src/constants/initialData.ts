import type { PageData, CatalogItem, TestimonialItem, FAQItem, CulturalTemplate } from '../types';

// ==========================================
// 1. TEMPLATE 1: MODERN ROYAL EMERALD VELVET
// ==========================================
export const MODERN_EMERALD_PAGES: PageData[] = [
  {
    id: 'p1',
    title: '1. Sampul Depan',
    type: 'cover',
    bgTheme: 'velvet',
    data: {
      template: 'modern',
      monogram: 'D & C',
      subheading: 'THE WEDDING CELEBRATION OF',
      groomName: 'Dimas',
      brideName: 'Clarissa',
      dateText: 'Sabtu, 18 Juli 2026',
      venueCity: 'Grand Mercure Ballroom, Bandar Lampung',
      buttonText: 'Buka Undangan'
    }
  },
  {
    id: 'p2',
    title: '2. Mempelai',
    type: 'couple',
    bgTheme: 'velvet',
    data: {
      template: 'modern',
      introQuote: 'Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan, saling melengkapi dalam ikatan suci pernikahan.',
      groomFullName: 'Dimas Setiadi, S.T.',
      groomParents: 'Putra Pertama dari Bpk. Ir. Bambang Sutrisno & Ibu Hj. Sri Wahyuni',
      groomIg: '@dimassetiadi',
      groomPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      brideFullName: 'Clarissa Putri, M.Ds.',
      brideParents: 'Putri Kedua dari Bpk. Dr. Hendra Gunawan & Ibu Hj. Maya Kusuma',
      brideIg: '@clarissaputri',
      bridePhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
    }
  },
  {
    id: 'p3',
    title: '3. Waktu & Lokasi',
    type: 'events',
    bgTheme: 'velvet',
    data: {
      template: 'modern',
      title: 'Rangkaian Hari Bahagia',
      akadTitle: 'Akad Nikah',
      akadDate: 'Sabtu, 18 Juli 2026',
      akadTime: '08.00 - 10.00 WIB',
      akadPlace: 'Masjid Agung Al-Furqon, Bandar Lampung',
      resepsiTitle: 'Resepsi Pernikahan',
      resepsiDate: 'Sabtu, 18 Juli 2026',
      resepsiTime: '11.00 - 14.00 WIB',
      resepsiPlace: 'Grand Ballroom Grand Mercure, Jl. Raden Intan, Bandar Lampung',
      mapsUrl: 'https://maps.google.com'
    }
  },
  {
    id: 'p4',
    title: '4. Galeri & Cerita',
    type: 'story',
    bgTheme: 'velvet',
    data: {
      template: 'modern',
      storyTitle: 'Perjalanan Cinta Kami',
      storyIntro: 'Dari ruang kuliah tahun 2021 hingga mengucap janji suci seumur hidup.',
      photos: [
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=500&q=80',
        'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=500&q=80',
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=500&q=80',
        'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=500&q=80'
      ]
    }
  },
  {
    id: 'p5',
    title: '5. Amplop Digital',
    type: 'gift',
    bgTheme: 'velvet',
    data: {
      template: 'modern',
      bankName1: 'Bank Central Asia (BCA)',
      accNumber1: '8820 1234 5678',
      accHolder1: 'DIMAS SETIADI',
      bankName2: 'Bank Mandiri',
      accNumber2: '1370 0098 7654',
      accHolder2: 'CLARISSA PUTRI',
      qrisActive: true,
      giftAddress: 'Jl. Gatot Subroto No. 88, Pahoman, Bandar Lampung (Penerima: Dimas & Clarissa)'
    }
  },
  {
    id: 'p6',
    title: '6. RSVP & Doa',
    type: 'rsvp',
    bgTheme: 'velvet',
    data: {
      template: 'modern',
      heading: 'Konfirmasi Kehadiran & Doa Restu',
      note: 'Merupakan suatu kehormatan bagi kami atas kehadiran dan doa restu Bapak/Ibu/Saudara/i.'
    }
  }
];

// ==========================================
// 2. TEMPLATE 2: ADAT JAWA (KERATON SOGAN & GOLD PRADA)
// ==========================================
export const JAWA_KERATON_PAGES: PageData[] = [
  {
    id: 'p1',
    title: '1. Sampul Dhaup',
    type: 'cover',
    bgTheme: 'jawa_sogan',
    data: {
      template: 'jawa',
      monogram: 'D & C',
      culturalAksara: 'ꦱꦒꦸꦁꦢꦸꦩꦢꦶ',
      subheading: 'PAHARGYAN DHAUPIPUN TEMANTEN',
      groomName: 'Raden Mas Dimas',
      brideName: 'Raden Ajeng Clarissa',
      dateText: 'Setu Pahing, 18 Juli 2026',
      venueCity: 'Grand Mercure Ballroom, Bandar Lampung',
      buttonText: 'Bikak Serat Undangan'
    }
  },
  {
    id: 'p2',
    title: '2. Mempelai Temanten',
    type: 'couple',
    bgTheme: 'jawa_sogan',
    data: {
      template: 'jawa',
      introQuote: '“Ngluruk tanpa bala, menang tanpa ngasorake. Kasembadan katresnan sejati hayuning bawana.” — Serat Wulangreh',
      groomFullName: 'Raden Mas Dimas Setiadi, S.T.',
      groomParents: 'Putra Kakung saking Bpk. K.R.T. Bambang Sutrisno & Ibu Nyi R.A. Sri Wahyuni',
      groomIg: '@dimas.sogan',
      groomPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      brideFullName: 'Raden Ajeng Clarissa Putri, M.Ds.',
      brideParents: 'Putri Pambajeng saking Bpk. K.R.T. Hendra Gunawan & Ibu Nyi R.A. Maya Kusuma',
      brideIg: '@clarissa.jawa',
      bridePhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
    }
  },
  {
    id: 'p3',
    title: '3. Tata Upacara Adat',
    type: 'events',
    bgTheme: 'jawa_sogan',
    data: {
      template: 'jawa',
      title: 'Reroncening Adat & Pahargyan',
      akadTitle: 'Upacara Siraman & Midodareni',
      akadDate: 'Jum’at Legi, 17 Juli 2026',
      akadTime: '15.30 - 21.00 WIB',
      akadPlace: 'Masjid Agung Al-Furqon, Lungsir, Bandar Lampung',
      resepsiTitle: 'Upacara Panggih & Resepsi Pahargyan',
      resepsiDate: 'Setu Pahing, 18 Juli 2026',
      resepsiTime: '10.30 - 14.30 WIB (Panggih jam 11.00)',
      resepsiPlace: 'Grand Mercure Ballroom, Bandar Lampung',
      mapsUrl: 'https://maps.google.com'
    }
  },
  {
    id: 'p4',
    title: '4. Galeri Asmaradana',
    type: 'story',
    bgTheme: 'jawa_sogan',
    data: {
      template: 'jawa',
      storyTitle: 'Lelakon Asmaradana',
      storyIntro: 'Tresna asih kang tuwuh saking rasa suci, tinuntun dening Gusti Kang Akarya Jagad.',
      photos: [
        'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=500&q=80',
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=500&q=80',
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=500&q=80',
        'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=500&q=80'
      ]
    }
  },
  {
    id: 'p5',
    title: '5. Tali Asih & Kado',
    type: 'gift',
    bgTheme: 'jawa_sogan',
    data: {
      template: 'jawa',
      bankName1: 'Bank Central Asia (BCA)',
      accNumber1: '8820 1234 5678',
      accHolder1: 'R.M. DIMAS SETIADI',
      bankName2: 'Bank Mandiri',
      accNumber2: '1370 0098 7654',
      accHolder2: 'R.A. CLARISSA PUTRI',
      qrisActive: true,
      giftAddress: 'Jl. Gatot Subroto No. 88, Pahoman, Bandar Lampung'
    }
  },
  {
    id: 'p6',
    title: '6. Pratandha Rawuh & Doa',
    type: 'rsvp',
    bgTheme: 'jawa_sogan',
    data: {
      template: 'jawa',
      heading: 'Pratandha Rawuh & Pangestu',
      note: 'Mugi dados kawuningan saha panyuwun pandonga pangestu panjenengan sami.'
    }
  }
];

// ==========================================
// 3. TEMPLATE 3: ADAT MINANG (SUNTIANG & CRIMSON MARAWA)
// ==========================================
export const MINANG_BARALEK_PAGES: PageData[] = [
  {
    id: 'p1',
    title: '1. Sampul Baralek',
    type: 'cover',
    bgTheme: 'minang_marawa',
    data: {
      template: 'minang',
      monogram: 'D & C',
      subheading: 'BARALEK GADANG PERNIKAHAN ADAT MINANGKABAU',
      groomName: 'Dimas Marah Sutan',
      brideName: 'Clarissa Rangkayo',
      dateText: 'Sabtu, 18 Juli 2026',
      venueCity: 'Balairung Bagas Raya, Bandar Lampung',
      buttonText: 'Buka Siriah Jo Pinang'
    }
  },
  {
    id: 'p2',
    title: '2. Anak Daro jo Marapulai',
    type: 'couple',
    bgTheme: 'minang_marawa',
    data: {
      template: 'minang',
      introQuote: '“Nan kuriak kundi, nan merah sago. Nan baiak budi, nan rancak baso. Batimbang tando mangko bajadi, maikek janji jo kato pusako.” — Pepatah Minangkabau',
      groomFullName: 'Dimas Setiadi Marah Sutan, S.T.',
      groomParents: 'Anak Kemenakan dari Bpk. Ir. Bambang Sutrisno Dt. Rajo Nan Kayo & Ibu Hj. Sri Wahyuni',
      groomIg: '@dimas.minang',
      groomPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      brideFullName: 'Clarissa Putri Rangkayo, M.Ds.',
      brideParents: 'Putri Bungsu dari Bpk. Dr. Hendra Gunawan Dt. Rangkayo Basa & Ibu Hj. Maya Kusuma',
      brideIg: '@clarissa.suntiang',
      bridePhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
    }
  },
  {
    id: 'p3',
    title: '3. Janjang Baralek',
    type: 'events',
    bgTheme: 'minang_marawa',
    data: {
      template: 'minang',
      title: 'Janjang Acara Baralek Gadang',
      akadTitle: 'Malam Bainai & Manjapuik Marapulai',
      akadDate: 'Jum’at Malam, 17 Juli 2026',
      akadTime: '19.30 - 22.00 WIB',
      akadPlace: 'Masjid Raya Airan, Bandar Lampung',
      resepsiTitle: 'Ijab Kabul & Baralek Gadang',
      resepsiDate: 'Sabtu, 18 Juli 2026',
      resepsiTime: '10.30 - 15.00 WIB (Akad: 08.00 WIB)',
      resepsiPlace: 'Balairung Bagas Raya, Way Halim, Bandar Lampung',
      mapsUrl: 'https://maps.google.com'
    }
  },
  {
    id: 'p4',
    title: '4. Galeri Pusako Ranah Minang',
    type: 'story',
    bgTheme: 'minang_marawa',
    data: {
      template: 'minang',
      storyTitle: 'Rantau jo Rindu Ranah Minang',
      storyIntro: 'Sajak pandangan partamo hinggo pinangan tibo, cinto basatu di bawah panji Adaik Basandi Syarak.',
      photos: [
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=500&q=80',
        'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=500&q=80',
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=500&q=80',
        'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=500&q=80'
      ]
    }
  },
  {
    id: 'p5',
    title: '5. Tando Kasih & Hadiah',
    type: 'gift',
    bgTheme: 'minang_marawa',
    data: {
      template: 'minang',
      bankName1: 'Bank Central Asia (BCA)',
      accNumber1: '8820 1234 5678',
      accHolder1: 'DIMAS SETIADI MARAH SUTAN',
      bankName2: 'Bank Nagari / Mandiri',
      accNumber2: '1370 0098 7654',
      accHolder2: 'CLARISSA PUTRI RANGKAYO',
      qrisActive: true,
      giftAddress: 'Jl. Raden Intan No. 45, Enggal, Bandar Lampung'
    }
  },
  {
    id: 'p6',
    title: '6. Tando Hadia & Doa Barakeh',
    type: 'rsvp',
    bgTheme: 'minang_marawa',
    data: {
      template: 'minang',
      heading: 'Tando Hadia jo Doa Barakeh',
      note: 'Tarimo kasih ateh kahadiran sarato doa restu Bapak/Ibu/Dunsanak sadonyo.'
    }
  }
];

// ==========================================
// 4. TEMPLATE 4: GREEN LEAF BOTANICAL SAGE (GARDEN LUXURY)
// ==========================================
export const BOTANICAL_SAGE_PAGES: PageData[] = [
  {
    id: 'p1',
    title: '1. Sampul Green Leaf',
    type: 'cover',
    bgTheme: 'botanical_sage',
    data: {
      template: 'botanical',
      monogram: 'I & R',
      subheading: 'THE WEDDING CELEBRATION OF',
      groomName: 'Rian',
      brideName: 'Irna',
      dateText: 'Minggu, 27 April 2025',
      venueCity: 'Pine Hill Garden Pavilion, Bandar Lampung',
      buttonText: 'Buka Undangan'
    }
  },
  {
    id: 'p2',
    title: '2. Bride and Groom',
    type: 'couple',
    bgTheme: 'botanical_sage',
    data: {
      template: 'botanical',
      introQuote: '“Maha suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan, Ya Allah rahmatilah pernikahan kami.”',
      brideFullName: 'Irna Agustiani, S.Farm.',
      brideParents: 'Putri Kedua dari Bpk. Agus Firmansyah & Ibu Lilis Kutiangsih',
      brideIg: '@irnaagustiani',
      bridePhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      groomFullName: 'Rian Firmansyah, S.T.',
      groomParents: 'Putra Pertama dari Bpk. Hendra Gunawan & Ibu Hj. Ratna Dewi',
      groomIg: '@rianfirmansyah',
      groomPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
    }
  },
  {
    id: 'p3',
    title: '3. Waktu & Lokasi Acara',
    type: 'events',
    bgTheme: 'botanical_sage',
    data: {
      template: 'botanical',
      title: 'Rangkaian Hari Bahagia',
      akadTitle: 'Akad Nikah',
      akadDate: 'Minggu, 27 April 2025',
      akadTime: '08.00 - 10.00 WIB',
      akadPlace: 'Masjid Agung Al-Furqon, Bandar Lampung',
      resepsiTitle: 'Resepsi Pernikahan',
      resepsiDate: 'Minggu, 27 April 2025',
      resepsiTime: '11.00 - 14.30 WIB',
      resepsiPlace: 'Pine Hill Glasshouse Pavilion, Bandar Lampung',
      mapsUrl: 'https://maps.google.com'
    }
  },
  {
    id: 'p4',
    title: '4. Galeri & Video Prewedding',
    type: 'story',
    bgTheme: 'botanical_sage',
    data: {
      template: 'botanical',
      storyTitle: 'Kisah Cinta & Galeri Abadi',
      storyIntro: 'Tumbuh bersama dalam keteduhan cinta dan doa yang tak henti mengalir.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      photos: [
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=500&q=80',
        'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=500&q=80',
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=500&q=80',
        'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=500&q=80'
      ]
    }
  },
  {
    id: 'p5',
    title: '5. Tanda Kasih & Hadiah',
    type: 'gift',
    bgTheme: 'botanical_sage',
    data: {
      template: 'botanical',
      bankName1: 'Bank Central Asia (BCA)',
      accNumber1: '8820 1234 5678',
      accHolder1: 'RIAN FIRMANSYAH',
      bankName2: 'Bank Mandiri',
      accNumber2: '1370 0098 7654',
      accHolder2: 'IRNA AGUSTIANI',
      qrisActive: true,
      giftAddress: 'Jl. Gatot Subroto No. 88, Pahoman, Bandar Lampung (Penerima: Irna & Rian)'
    }
  },
  {
    id: 'p6',
    title: '6. RSVP & Doa Restu',
    type: 'rsvp',
    bgTheme: 'botanical_sage',
    data: {
      template: 'botanical',
      heading: 'Konfirmasi Kehadiran & Doa',
      note: 'Merupakan sebuah kehormatan bagi kami atas kehadiran dan doa restu Bapak/Ibu/Saudara/i.'
    }
  }
];

// Default initial pages is modern emerald
export const INITIAL_PAGES: PageData[] = MODERN_EMERALD_PAGES;

export const TEMPLATE_PRESETS: Record<CulturalTemplate, { name: string; desc: string; icon: string; pages: PageData[] }> = {
  modern: {
    name: 'Modern Royal Velvet',
    desc: 'Signature Emerald & Gold foil interaktif',
    icon: '✨',
    pages: MODERN_EMERALD_PAGES,
  },
  jawa: {
    name: 'Adat Jawa Kasunanan',
    desc: 'Coklat Sogan Keraton, Wayang Gunungan Emas & Gamelan',
    icon: '🏛️',
    pages: JAWA_KERATON_PAGES,
  },
  minang: {
    name: 'Adat Minang Baralek Gadang',
    desc: 'Marawa Merah Marun, Mahkota Suntiang & Songket Emas',
    icon: '👑',
    pages: MINANG_BARALEK_PAGES,
  },
  botanical: {
    name: 'Green Leaf Botanical Garden',
    desc: 'Hijau Sage teduh, bingkai floral klasik & alunan piringan hitam',
    icon: '🌿',
    pages: BOTANICAL_SAGE_PAGES,
  },
};

export const CATALOG_THEMES: CatalogItem[] = [
  {
    id: 1,
    slug: "green-leaf",
    name: "Green Leaf — Botanical Garden",
    category: "Botanical Sage",
    tag: "Best Seller",
    price: 113400,
    originalPrice: 180000,
    rating: 5.0,
    salesCount: 28,
    reviewCount: 7,
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80",
    description: "Kesegaran Alam dalam Balutan Klasik yang Teduh berpadu dengan bingkai lengkung Victorian dan pemutar vinyl.",
    longDescription: "Green Leaf dirancang untuk pasangan yang menyukai ketenangan dan keindahan alam yang abadi. Mengusung warna hijau sage yang teduh, bias arsitektur klasik, serta sentuhan ilustrasi botani yang segar, template ini menghadirkan suasana yang tenang dan anggun. Sebuah cara yang pantas dan berkesan untuk mengajak para insan merayakan awal baru yang berakar di hati selamanya.",
    type: "Digital Interaktif & Fisik",
    templateKey: 'botanical',
    features: [
      "Entrance Animation: Tampilan animasi pembuka amplop romantis",
      "Rotating Vinyl Disc: Pemutar musik piringan hitam interaktif",
      "Countdown Timer: Hitung mundur hari pernikahan live",
      "Save The Date: 1-klik simpan ke Google Calendar / Apple iCal",
      "Love Story: Timeline babak perjalanan cinta",
      "Navigasi Maps: Petunjuk rute langsung Google Maps",
      "Galeri Foto Prewedding & Pemutar Video Terintegrasi",
      "Amplop Digital Multi-Bank & Scan Barcode QRIS",
      "Buku Tamu Real-time RSVP & Ucapan Doa Restu",
      "Bebas Kuota Tamu & Personalisasi Nama Otomatis"
    ],
    specifications: {
      "Gaya Desain": "Victorian Botanical Arch & Classical Sage",
      "Nuansa Warna": "Sage Green (#4A5D4E), Soft Ivory & Warm Gold",
      "Tipografi": "Playfair Display & Plus Jakarta Sans",
      "Musik Rekomendasi": "Pastoral Romance Acoustic & Cello (Web Audio)",
      "Masa Aktif": "Aktif Selamanya (Tanpa Batas Waktu)",
      "Waktu Pengerjaan": "Instan (Langsung aktif dalam 5 menit)"
    }
  },
  {
    id: 2,
    slug: "royal-emerald",
    name: "Royal Emerald Velvet",
    category: "Velvet Luxury",
    tag: "Signature",
    price: 125000,
    originalPrice: 195000,
    rating: 4.9,
    salesCount: 45,
    reviewCount: 12,
    image: "/assets/velvet-bg.jpg",
    description: "Balutan beludru hijau zamrud dengan tipografi emas modern berkilau dan ornamen filigri mewah.",
    longDescription: "Royal Emerald Velvet menghadirkan kemewahan tertinggi pesta pernikahan Anda. Memadukan kedalaman warna zamrud gelap dengan sentuhan hotprint foil emas 24k dan alunan musik Canon in D Piano & Harp.",
    type: "Digital Interaktif & Fisik",
    templateKey: 'modern',
    features: [
      "Entrance Animation Wax Seal Lilin Emas",
      "4-Corner Filigree Frame Art Deco Emas",
      "Hitung Mundur Countdown Timer Live",
      "Save The Date Google Calendar 1-klik",
      "Galeri Prewedding 4K Lightbox",
      "Amplop Digital Multi-Bank & QRIS",
      "Live RSVP & Buku Tamu Interaktif",
      "Alunan Musik Harp & Piano Orchestra"
    ],
    specifications: {
      "Gaya Desain": "Royal Emerald Velvet & Haute Couture",
      "Nuansa Warna": "Deep Emerald (#051817) & Pure Gold",
      "Tipografi": "Playfair Display Serif & Modern Sans",
      "Masa Aktif": "Aktif Selamanya"
    }
  },
  {
    id: 3,
    slug: "adat-jawa",
    name: "Jawa Keraton Kasunanan",
    category: "Adat Nusantara",
    tag: "Budaya Ageng",
    price: 119000,
    originalPrice: 185000,
    rating: 5.0,
    salesCount: 38,
    reviewCount: 9,
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80",
    description: "Motif Coklat Sogan Keraton, ornamen Gunungan Wayang emas prada, dan alunan Gamelan Slendro syahdu.",
    longDescription: "Adat Jawa Kasunanan merajut nilai luhur filosofi pernikahan Jawa ke dalam lembaran digital modern. Lengkap dengan ornamen Gunungan Kayon Pohon Hayat, Aksara Jawa, tata upacara Midodareni & Panggih, serta alunan Gamelan Pelog yang menggetarkan sukma.",
    type: "Digital Interaktif & Fisik",
    templateKey: 'jawa',
    features: [
      "Gunungan Wayang Kayon & Paduraksa Emas",
      "Ukiran Sudut Keraton Jepara 4 Penjuru",
      "Pembatas Aksara Jawa & Ronce Melati",
      "Tata Upacara Adat Siraman & Panggih",
      "Alunan Suara Gamelan Pelog Asli",
      "Countdown Timer Kalender Jawa",
      "Save The Date & Google Maps Navigasi",
      "Amplop Digital & Buku Tamu Pangestu"
    ],
    specifications: {
      "Gaya Desain": "Kasunanan Sogan & Prada Keraton",
      "Nuansa Warna": "Sogan Brown (#180E09) & Golden Ochre",
      "Musik": "Gamelan Pelog/Slendro Kasunanan",
      "Masa Aktif": "Aktif Selamanya"
    }
  },
  {
    id: 4,
    slug: "adat-minang",
    name: "Minangkabau Baralek Gadang",
    category: "Adat Nusantara",
    tag: "Kemegahan Ranah Minang",
    price: 119000,
    originalPrice: 185000,
    rating: 5.0,
    salesCount: 32,
    reviewCount: 8,
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80",
    description: "Merah Marun Marawa dengan mahkota Suntiang Minang emas bertingkat, Rumah Gadang, dan alunan Saluang.",
    longDescription: "Baralek Gadang Pernikahan Adat Minangkabau mengusung kemegahan bumi Ranah Minang. Dilengkapi Mahkota Suntiang Minang bertingkat emas, siluet Gonjong Rumah Gadang, ukiran Itiak Pulang Patang, pepatah adat pusako, dan alunan Saluang jo Talempong yang hangat.",
    type: "Digital Interaktif & Fisik",
    templateKey: 'minang',
    features: [
      "Mahkota Suntiang Minang Emas 7 Tingkat",
      "Siluet Atap Gonjong Rumah Gadang",
      "Ukiran Khas Itiak Pulang Patang & Pucuk Rebung",
      "Pepatah Pusako Adat Basandi Syarak",
      "Alunan Musik Saluang jo Talempong",
      "Rangkaian Acara Malam Bainai & Ijab",
      "Save The Date & Navigasi Lokasi",
      "Amplop Digital & Buku Tamu Barakeh"
    ],
    specifications: {
      "Gaya Desain": "Marawa Crimson & Suntiang Pusako",
      "Nuansa Warna": "Maroon Crimson (#220508) & Gold",
      "Musik": "Saluang jo Talempong Minangkabau",
      "Masa Aktif": "Aktif Selamanya"
    }
  },
  {
    id: 5,
    slug: "champagne-noir",
    name: "Champagne Noir Gold",
    category: "Minimalist Modern",
    tag: "Monochrome Luxury",
    price: 99000,
    originalPrice: 160000,
    rating: 4.8,
    salesCount: 19,
    reviewCount: 4,
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80",
    description: "Hitam onyx dipadukan dengan garis foil emas murni dan segel wax hitam elegan.",
    longDescription: "Desain minimalis monokrom modern berpadu dengan kemewahan garis emas dan tipografi editorial majalah internasional.",
    type: "Digital Interaktif",
    templateKey: 'modern',
    features: [
      "Monochrome Minimalist Luxury",
      "Gold Foil Lines & Monogram",
      "Countdown Timer",
      "Google Maps Navigation",
      "Amplop Digital & Live RSVP"
    ],
    specifications: {
      "Gaya Desain": "Minimalist Noir Editorial",
      "Nuansa Warna": "Noir Black (#0a0a0a) & Champagne Gold",
      "Masa Aktif": "Aktif Selamanya"
    }
  }
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    couple: "Dimas & Clarissa",
    location: "Bandar Lampung",
    date: "Menikah Juli 2026",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    type: "Paket Bundling Nusantara",
    review: "Tamu-tamu kami terpukau saat membuka undangan web Adat Minang & Jawanya! Ada alunan musik tradisi yang syahdu dan animasinya sangat halus. Undangan fisik beludrunya juga tebal dan mewah banget!"
  },
  {
    couple: "Bagas & Annisa",
    location: "Yogyakarta",
    date: "Menikah Mei 2026",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    type: "Template Jawa Kasunanan",
    review: "Ornamen gunungan wayang emas dan motif sogan keratonnya benar-benar elegan tanpa terkesan kuno. Editornya sangat mudah diubah langsung di layar secara visual dan praktis!"
  },
  {
    couple: "Reza & Fadilla",
    location: "Bandar Lampung",
    date: "Menikah April 2026",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    type: "Template Minang Baralek",
    review: "Suntiang emas dan pepatah adat Minangnya sangat autentik. Fitur amplop digital dan live RSVP sangat membantu menghitung tamu yang hadir."
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    q: "Apakah saya bisa mengubah tema dari Modern ke Adat Jawa atau Minang?",
    a: "Tentu saja! Di dalam Studio Editor HariNikah, Anda dapat mengganti tema budaya kapan saja dengan 1-klik, dan seluruh ornamen, kutipan adat, palet warna, serta musik akan otomatis disesuaikan."
  },
  {
    q: "Bagaimana cara kerja edit langsung di layar canvas?",
    a: "Cukup klik elemen apa saja pada tampilan smartphone di canvas (nama mempelai, tanggal, foto, lokasi, rekening, dll), sistem akan langsung mengarahkan Anda ke opsi edit elemen tersebut tanpa harus mencari menu secara manual."
  },
  {
    q: "Apakah musik latar bisa berputar otomatis di handphone tamu?",
    a: "Ya! Ketika tamu mengklik tombol 'Buka Undangan' atau segel lilin wax seal, musik latar romantis (Gamelan untuk Jawa, Saluang untuk Minang, atau Orchestra untuk Modern) akan langsung berputar secara halus dengan tombol kontrol di pojok kanan bawah."
  },
  {
    q: "Apakah HariNikah juga menyediakan cetak fisik berbalut beludru dan foil emas?",
    a: "Benar sekali. Kami memproduksi undangan fisik hardcover berbalut beludru impor (emerald, sogan, marawa crimson), foil emas panas (hotprint), serta wax seal cap lilin asli dari Studio HariNikah di Bandar Lampung, dengan pemesanan resmi melalui Shopee Official Store bergaransi se-Indonesia."
  }
];
