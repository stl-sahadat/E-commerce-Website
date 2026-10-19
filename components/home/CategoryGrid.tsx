'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { GarmentVisual } from '@/components/garment/GarmentVisual';
import { ArrowUpRight } from 'lucide-react';
import { GarmentSilhouette } from '@/types';

interface CategoryGridProps {
  onSelectCategory: (categoryKey: string) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ onSelectCategory }) => {
  const { gender, theme } = useStore();

  const menCategories: {
    key: string;
    title: string;
    banglaTitle: string;
    description: string;
    silhouette: GarmentSilhouette;
    colorHex: string;
    bgTone: string;
    count: string;
    image: string;
  }[] = [
    {
      key: 'panjabi',
      title: 'Embroidered & Silk Panjabi',
      banglaTitle: 'এমব্রয়ডারি ও সিল্ক পাঞ্জাবি',
      description: 'Handcrafted neck yokes, antique brass buttons, and fine mulberry silk blends.',
      silhouette: 'panjabi-embroidered',
      colorHex: '#17382F',
      bgTone: '#0e241e',
      count: '6 Styles',
      image: '/images/products/m-panjabi-01.jpg',
    },
    {
      key: 'kabli-kurta',
      title: 'Kabli Sets & Kurtas',
      banglaTitle: 'কাবলি সেট ও কুর্তা',
      description: 'Structured two-piece ensembles with military flap pockets and matching shalwars.',
      silhouette: 'kabli-suit',
      colorHex: '#121214',
      bgTone: '#000000',
      count: '3 Styles',
      image: '/images/products/m-kabli-01.jpg',
    },
    {
      key: 'waistcoats',
      title: 'Brocade Waistcoats (Koti)',
      banglaTitle: 'ব্রোকেড কোটি ও প্রিন্স স্যুট',
      description: 'Regal layered waistcoats with jacquard damask weave for wedding gatherings.',
      silhouette: 'waistcoat-koti',
      colorHex: '#63532C',
      bgTone: '#4a3d1e',
      count: '2 Styles',
      image: '/images/products/m-waistcoat-01.jpg',
    },
    {
      key: 'pajama-sets',
      title: 'Aligari & Churidar Pajamas',
      banglaTitle: 'আলিগড়ি ও চুড়িদার পায়জামা',
      description: '100% combed breathable cotton with drawstring and elastic waistbands.',
      silhouette: 'pajama',
      colorHex: '#F7F4EC',
      bgTone: '#e4dece',
      count: '3 Styles',
      image: '/images/products/m-pajama-01.jpg',
    },
  ];

  const womenCategories: {
    key: string;
    title: string;
    banglaTitle: string;
    description: string;
    silhouette: GarmentSilhouette;
    colorHex: string;
    bgTone: string;
    count: string;
    image: string;
  }[] = [
    {
      key: 'jamdani-saree',
      title: 'Dhakai Jamdani Sarees',
      banglaTitle: 'ঐতিহ্যবাহী ঢাকাই জামদানি শাড়ি',
      description: 'Translucent muslin ground with fine gold zari geometric bootis woven on pit looms.',
      silhouette: 'saree-jamdani',
      colorHex: '#6B1D2F',
      bgTone: '#45111d',
      count: '4 Styles',
      image: '/images/products/w-saree-01.jpg',
    },
    {
      key: 'silk-saree',
      title: 'Rajshahi Pure Silk Sarees',
      banglaTitle: 'রাজশাহী পিওর সিল্ক ও কাতান',
      description: 'Liquid silk luster with rich woven gold zari borders and paisley floral pallu.',
      silhouette: 'saree-silk',
      colorHex: '#581F2F',
      bgTone: '#3e1521',
      count: '3 Styles',
      image: '/images/products/w-saree-03.jpg',
    },
    {
      key: 'three-piece',
      title: 'Artisanal Three-Piece Suits',
      banglaTitle: 'আভিজাত্য থ্রি-পিস সেট',
      description: 'Embroidered silk kameez with tailored trousers and scalloped organza ornas.',
      silhouette: 'three-piece',
      colorHex: '#6B2838',
      bgTone: '#4a1924',
      count: '4 Styles',
      image: '/images/products/w-three-piece-01.jpg',
    },
    {
      key: 'salwar-kameez',
      title: 'Salwar Kameez & Anarkali',
      banglaTitle: 'সালোয়ার কামিজ ও আনারকলি',
      description: 'Kalidar flared silhouettes, khadi cotton day suits, and Banarasi dupatta pairings.',
      silhouette: 'salwar-kameez',
      colorHex: '#1B4738',
      bgTone: '#112f25',
      count: '3 Styles',
      image: '/images/products/w-salwar-01.jpg',
    },
    {
      key: 'kurtis',
      title: 'Kurtis & Tunics',
      banglaTitle: 'আর্টিসানাল কুর্তি ও টিউনিক',
      description: 'A-line cuts, Angrakha wraps, and natural block prints crafted from breathable cottons.',
      silhouette: 'kurti',
      colorHex: '#631B2A',
      bgTone: '#48111c',
      count: '4 Styles',
      image: '/images/products/w-kurti-01.jpg',
    },
    {
      key: 'lehenga',
      title: 'Lehenga & Party Wear',
      banglaTitle: 'ব্রাইডাল লেহেঙ্গা ও পার্টি ওয়্যার',
      description: 'Voluminous 4-meter flare skirts blanketed in golden zardozi peacocks and brocades.',
      silhouette: 'lehenga',
      colorHex: '#631B2B',
      bgTone: '#44111c',
      count: '3 Styles',
      image: '/images/products/w-lehenga-01.jpg',
    },
    {
      key: 'hijab',
      title: 'Premium Modal Hijabs',
      banglaTitle: 'প্রিমিয়াম টেক্সচার্ড হিজাব',
      description: 'Non-slip breathable Turkish modal crinkle drapes and lustrous silk satins.',
      silhouette: 'hijab',
      colorHex: '#BD8983',
      bgTone: '#a46f69',
      count: '3 Styles',
      image: '/images/products/w-hijab-01.jpg',
    },
    {
      key: 'dupatta-orna',
      title: 'Pashmina & Jamdani Ornas',
      banglaTitle: 'পশমিনা ও ঢাকাই মসলিন ওড়না',
      description: 'Opulent cashmere-blend wraps, tissue silks, and handwoven Jamdani festal drapes.',
      silhouette: 'dupatta-orna',
      colorHex: '#D7B6A5',
      bgTone: '#b89280',
      count: '3 Styles',
      image: '/images/products/w-dupatta-01.jpg',
    },
  ];

  const categories = gender === 'men' ? menCategories : womenCategories;

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span
              className="text-xs uppercase tracking-[0.25em] font-medium block mb-1"
              style={{ color: theme.primary }}
            >
              Curated Craftsmanship
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold not-italic text-stone-900 tracking-tight">
              {gender === 'men' ? 'পাঞ্জাবি, পায়জামা ও কোটি কালেকশন' : 'ঢাকাই জামদানি, থ্রি-পিস ও সিল্ক শাড়ি'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 max-w-md font-sans">
            {gender === 'men'
              ? 'ইসমাইল ফ্যাশনের প্রিমিয়াম পাঞ্জাবি, আরামদায়ক সুতি পায়জামা ও রাজকীয় কোটির বিশেষ সমাহার।'
              : 'ঐতিহ্যবাহী জামদানি, রাজশাহী সিল্ক, তাঁতের শাড়ি ও এক্সক্লুসিভ থ্রি-পিস সম্ভার।'}
          </p>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => onSelectCategory(cat.key)}
              className="group relative rounded-xl border border-stone-200/80 bg-stone-50/40 hover:bg-white hover:border-stone-300 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col hover:shadow-md"
            >
              {/* Garment Image Showcase */}
              <div className="relative aspect-4/3 w-full bg-stone-100/60 overflow-hidden border-b border-stone-100">
                {cat.image ? (
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <GarmentVisual
                    silhouette={cat.silhouette}
                    activeColor={{ name: cat.title, hex: cat.colorHex, bgTone: cat.bgTone }}
                    gender={gender}
                    className="w-full h-full"
                  />
                )}
              </div>

              {/* Text Info */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-serif text-stone-600 block mb-0.5">
                    {cat.banglaTitle}
                  </span>
                  <h3 className="text-sm font-semibold text-stone-900 group-hover:text-stone-700 transition-colors flex items-center justify-between">
                    <span>{cat.title}</span>
                    <ArrowUpRight
                      className="w-4 h-4 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all"
                      style={{ color: theme.primary }}
                    />
                  </h3>
                  <p className="text-xs text-stone-500 mt-1.5 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] font-medium">
                  <span className="text-stone-500">View Catalog</span>
                  <span
                    className="font-semibold uppercase tracking-wider text-[10px]"
                    style={{ color: theme.primary }}
                  >
                    Explore →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
