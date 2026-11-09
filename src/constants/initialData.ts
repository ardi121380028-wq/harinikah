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
      venueCity: 'The Glass House Ballroom, Senopati, Jakarta',
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
      akadPlace: 'Masjid Agung Al-Azhar, Jakarta Selatan',
      resepsiTitle: 'Resepsi Pernikahan',
      resepsiDate: 'Sabtu, 18 Juli 2026',
      resepsiTime: '11.00 - 14.00 WIB',
      resepsiPlace: 'The Glass House Ballroom, Senopati',
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
      giftAddress: 'Jl. Senopati No. 45, Kebayoran Baru, Jakarta Selatan (Penerima: Dimas & Clarissa)'
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
      venueCity: 'Pendopo Agung Sasana Kriya, TMII, Jakarta',
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
      akadPlace: 'Ndalem Joglo Heritage, Ragunan, Jakarta Selatan',
      resepsiTitle: 'Upacara Panggih & Resepsi Pahargyan',
      resepsiDate: 'Setu Pahing, 18 Juli 2026',
      resepsiTime: '10.30 - 14.30 WIB (Panggih jam 11.00)',
      resepsiPlace: 'Pendopo Agung Sasana Kriya, TMII',
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
      giftAddress: 'Ndalem Joglo Heritage, Jl. Durian No. 12, Jagakarsa, Jakarta Selatan'
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
      venueCity: 'Balairung Rumah Gadang Bundo Kanduang, Jakarta',
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
      akadPlace: 'Rumah Gadang Koto Nan Gadang, Rawamangun, Jakarta Timur',
      resepsiTitle: 'Ijab Kabul & Baralek Gadang',
      resepsiDate: 'Sabtu, 18 Juli 2026',
      resepsiTime: '10.30 - 15.00 WIB (Akad: 08.00 WIB)',
      resepsiPlace: 'Balai Samudera Ballroom, Kelapa Gading, Jakarta Utara',
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
      giftAddress: 'Rumah Gadang Pusako, Jl. Balai Pustaka No. 88, Rawamangun, Jakarta Timur'
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
};

export const CATALOG_THEMES: CatalogItem[] = [
  {
    id: 1,
    name: "Royal Emerald Velvet",
    category: "Velvet Luxury",
    tag: "Signature",
    image: "/assets/velvet-bg.jpg",
    description: "Balutan beludru hijau zamrud dengan tipografi emas modern berkilau.",
    type: "Digital & Fisik",
    templateKey: 'modern'
  },
  {
    id: 2,
    name: "Jawa Keraton Kasunanan",
    category: "Adat Nusantara",
    tag: "Budaya Ageng",
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80",
    description: "Motif Coklat Sogan Keraton, ornamen Gunungan Wayang emas prada, dan musik gamelan lembut.",
    type: "Digital & Fisik",
    templateKey: 'jawa'
  },
  {
    id: 3,
    name: "Minangkabau Baralek Gadang",
    category: "Adat Nusantara",
    tag: "Kemegahan Ranah Minang",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80",
    description: "Merah Marun Marawa dengan mahkota Suntiang Minang emas bertingkat dan alunan Saluang syahdu.",
    type: "Digital & Fisik",
    templateKey: 'minang'
  },
  {
    id: 4,
    name: "Champagne Noir Gold",
    category: "Minimalist Modern",
    tag: "Monochrome Luxury",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80",
    description: "Hitam onyx dipadukan dengan garis foil emas murni dan segel wax hitam.",
    type: "Digital & Fisik",
    templateKey: 'modern'
  }
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    couple: "Dimas & Clarissa",
    location: "Jakarta Selatan",
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
    review: "Ornamen gunungan wayang emas dan motif sogan keratonnya benar-benar elegan tanpa terkesan kuno. Editornya sangat mudah diubah langsung di layar seperti Canva!"
  },
  {
    couple: "Reza & Fadilla",
    location: "Padang / Bandung",
    date: "Menikah April 2026",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    type: "Template Minang Baralek",
    review: "Suntiang emas dan pepatah adat Minangnya sangat autentik. Fitur amplop digital dan live RSVP sangat membantu menghitung tamu yang hadir."
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    q: "Apakah saya bisa mengubah tema dari Modern ke Adat Jawa atau Minang?",
    a: "Tentu saja! Di dalam editor Canva HariNikah, Anda dapat mengganti tema budaya kapan saja dengan 1-klik, dan seluruh ornamen, kutipan adat, palet warna, serta musik akan otomatis disesuaikan."
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
    a: "Benar sekali. Kami menyediakan paket bundling fisik hardcover berbalut beludru impor (emerald, sogan, marawa crimson), foil emas panas (hotprint), serta wax seal cap lilin asli dengan showroom di Jakarta dan Bandung."
  }
];
