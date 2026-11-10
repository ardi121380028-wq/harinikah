import type { Metadata } from 'next';
import '../index.css';
import { InvitationProvider } from '../context/InvitationContext';
import { AuthProvider } from '../components/providers/AuthProvider';

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'HariNikah — Luxury Digital & Physical Wedding Suite',
  description: 'Platform undangan pernikahan eksklusif no. 1 di Indonesia. Nikmati kemewahan undangan digital interaktif multi-halaman berestetika tinggi dan keanggunan cetak fisik berbalut velvet, foil emas murni, dan wax seal cap lilin.',
  icons: {
    icon: '/assets/favicon-h.png',
    apple: '/assets/favicon-h.png',
  },
  openGraph: {
    title: 'HariNikah — Luxury Digital & Physical Wedding Suite',
    description: 'Platform undangan pernikahan digital interaktif dan cetak fisik mewah.',
    images: ['/assets/logo-harinikah-gold.png'],
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Great+Vibes&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[#051817] text-stone-100 antialiased selection:bg-[#dfb051] selection:text-[#0c2b29]">
        <AuthProvider>
          <InvitationProvider>
            {children}
          </InvitationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

