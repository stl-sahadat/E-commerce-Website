import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans, Hind_Siliguri } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const hindSiliguri = Hind_Siliguri({
  subsets: ['bengali', 'latin'],
  variable: '--font-bangla',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'BUNON | Premium Bangladeshi Traditional Fashion',
  description:
    'Discover artisanal Panjabis, Dhakai Jamdani sarees, tailored Kablis, and heritage handloom ensembles from Bangladesh.',
  openGraph: {
    title: 'BUNON | Premium Bangladeshi Traditional Fashion',
    description:
      'Discover artisanal Panjabis, Dhakai Jamdani sarees, tailored Kablis, and heritage handloom ensembles from Bangladesh.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BUNON | Premium Bangladeshi Traditional Fashion',
    description:
      'Discover artisanal Panjabis, Dhakai Jamdani sarees, tailored Kablis, and heritage handloom ensembles from Bangladesh.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable} ${hindSiliguri.variable}`}>
      <body className="font-sans antialiased selection:bg-[#D4B779]/30 text-stone-900" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
