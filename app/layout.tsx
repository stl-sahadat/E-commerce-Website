import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
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
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="font-sans antialiased selection:bg-[#D4B779]/30 text-stone-900" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
