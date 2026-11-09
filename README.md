# HariNikah — Luxury Digital & Physical Wedding Invitation Suite

> **Platform Undangan Pernikahan Eksklusif No. 1 di Indonesia**  
> Menggabungkan kemewahan undangan digital interaktif multi-halaman berestetika tinggi (Adat Jawa Kasunanan, Adat Minang Baralek Gadang, dan Modern Royal Emerald) dengan keanggunan cetak fisik berbalut velvet, foil emas murni, dan wax seal cap lilin.

---

## 🌟 Fitur Utama

- **Studio Editor Multi-Page**:
  - Sistem pengeditan per-halaman langsung (*click-to-edit canvas*).
  - Mode Terang (*Champagne Ivory Luxury*) & Mode Gelap (*Royal Emerald Velvet*).
  - Filter budaya 1-klik: Adat Jawa, Adat Minang, dan Modern.
  - Ornamen vektor emas autentik: Gunungan Wayang (Kayon & Gapura Paduraksa), Mahkota Suntiang Minang 7-tingkat, siluet Rumah Gadang, dan filigri sudut emas murni (*4-Corner Filigree Frame*).
- **Web Audio Engine Tradisi & Romansa**:
  - Gamelan Pelog/Slendro Kasunanan Surakarta & Yogyakarta (Adat Jawa).
  - Alunan Saluang jo Talempong Ranah Minang (Adat Minang).
  - Canon in D Piano & Harp Orchestra (Modern Royal).
- **Interaktivitas Tamu Undangan (Guest View)**:
  - Personalisasi nama tamu otomatis via URL parameter `?to=Nama+Tamu`.
  - Simulasi amplop surat dengan animasi pembuka dan konfeti budaya.
  - RSVP interaktif, hitung mundur hari pernikahan (*countdown*), integrasi Google Maps, dan salin nomor rekening amplop digital.
- **Ekspor & Publikasi**:
  - Publikasi website undangan live instan.
  - Ekspor bundle HTML mandiri (*standalone HTML file*).
  - Bagikan langsung ke WhatsApp dengan pesan undangan otomatis.

---

## 🏗️ Tech Stack & Arsitektur

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/) dengan arsitektur modular (`src/app`, `src/components`, `src/context`, `src/constants`, `src/utils`).
- **Library UI**: [React 19](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/), [Lucide React](https://lucide.dev/).
- **Animasi**: [Framer Motion](https://www.framer.com/motion/), [Canvas Confetti](https://github.com/catdad/canvas-confetti).
- **Sound Engine**: Web Audio API synthesizer bawaan browser (zero external bandwidth, responsive audio looping).
- **Tipografi**: Playfair Display (Serif eksklusif H1), Plus Jakarta Sans (UI body & labels), Great Vibes (calligraphy).

---

## 🚀 Memulai Pengembangan Lokal

### 1. Instalasi Dependensi
```bash
npm install
```

### 2. Menjalankan Server Pengembangan
```bash
npm run dev
```
Buka browser pada:
- **Landing Page**: [http://localhost:3000](http://localhost:3000)
- **Studio Editor**: [http://localhost:3000/editor](http://localhost:3000/editor)
- **Simulasi Undangan Tamu**: [http://localhost:3000/dimas-clarissa?to=Bapak+Budi](http://localhost:3000/dimas-clarissa?to=Bapak+Budi)

### 3. Build Produksi
```bash
npm run build
npm run start
```

---

## 📁 Struktur Direktori Proyek

```
wedding-app/
├── public/
│   └── assets/                  # Logo emas, favicon, tekstur beludru
├── src/
│   ├── app/
│   │   ├── [slug]/              # Halaman undangan live untuk tamu
│   │   ├── api/invitation/      # Endpoint API manajemen draft undangan
│   │   ├── editor/              # Studio Editor interaktif multi-halaman
│   │   ├── layout.tsx           # Root layout dengan context & font provider
│   │   └── page.tsx             # Landing page HariNikah
│   ├── components/
│   │   ├── cultural/            # Ornamen vektor budaya (Gunungan, Suntiang, Dividers, Frame)
│   │   ├── landing/             # Komponen landing page (Hero, Catalog, Pricing, FAQ, Showroom)
│   │   └── modals/              # Modal Onboarding Wizard, Diskon 20%, Aktivasi Paket
│   ├── constants/               # Preset data tema Jawa, Minang, Modern, dan FAQ
│   ├── context/                 # InvitationContext state store & persistence
│   ├── types/                   # TypeScript interface definitions
│   └── utils/                   # Web Audio Engine & helper utilities
├── tailwind.config.js           # Konfigurasi tema warna gold, emerald, dan sogan
├── tsconfig.json                # Konfigurasi TypeScript Next.js
└── package.json
```

---

## 📄 Lisensi
Hak Cipta © 2026 HariNikah. Seluruh hak cipta dilindungi undang-undang.
