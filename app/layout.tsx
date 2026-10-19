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
  title: 'ইসমাইল ফ্যাশন | ISMAIL FASHION - প্রিমিয়াম পাঞ্জাবি, শাড়ি, থ্রি-পিস ও পায়জামা',
  description:
    'ইসমাইল ফ্যাশন (ISMAIL FASHION): ঐতিহ্যবাহী হ্যান্ডলুম পাঞ্জাবি, সুতি পায়জামা, ঢাকাই জামদানি ও সিল্ক শাড়ি এবং এক্সক্লুসিভ থ্রি-পিস কালেকশন।',
  openGraph: {
    title: 'ইসমাইল ফ্যাশন | ISMAIL FASHION - ঐতিহ্যবাহী পোশাক সম্ভার',
    description:
      'ইসমাইল ফ্যাশন (ISMAIL FASHION): ঐতিহ্যবাহী হ্যান্ডলুম পাঞ্জাবি, সুতি পায়জামা, ঢাকাই জামদানি ও সিল্ক শাড়ি এবং এক্সক্লুসিভ থ্রি-পিস কালেকশন।',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ইসমাইল ফ্যাশন | ISMAIL FASHION',
    description:
      'ইসমাইল ফ্যাশন (ISMAIL FASHION): প্রিমিয়াম পাঞ্জাবি, পায়জামা, থ্রি-পিস ও শাড়ির নির্ভরযোগ্য প্রতিষ্ঠান।',
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
