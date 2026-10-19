'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { Sparkles, ArrowRight, ShieldCheck, Truck, RefreshCw, Moon, Crown, Award } from 'lucide-react';

interface HeroSectionProps {
  onShopNow: () => void;
  onExploreOccasion: (col: 'eid' | 'wedding' | 'festival') => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onShopNow, onExploreOccasion }) => {
  const { gender, theme, setSelectedCategory } = useStore();
  const [activeSlide, setActiveSlide] = useState(0);

  const isMen = gender === 'men';

  const menHeroSlides = [
    {
      title: 'ISMAIL FASHION Royal Emerald Silk Panjabi',
      bangla: 'রয়েল এমারেল্ড এমব্রয়ডারি সিল্ক পাঞ্জাবি',
      price: '৳৫,৪৫০',
      tag: 'Festive Eid Edit',
      image: '/images/products/m-panjabi-01.jpg',
      category: 'panjabi',
      origin: 'Mirpur Weavers Colony, Dhaka',
    },
    {
      title: 'ISMAIL FASHION Royal Crimson Maroon Silk Panjabi',
      bangla: 'রয়েল ক্রিমসন মেরুন জারি পাঞ্জাবি',
      price: '৳৬,২০০',
      tag: 'Wedding Atelier',
      image: '/images/products/m-panjabi-04.jpg',
      category: 'panjabi',
      origin: 'Mirpur Weavers Colony, Dhaka',
    },
    {
      title: 'ISMAIL FASHION Classic Aligari Pure Cotton Pajama',
      bangla: 'ক্লাসিক হোয়াইট আলিগড়ি সুতি পায়জামা',
      price: '৳১,২৫০',
      tag: '100% Combed Cotton',
      image: '/images/products/m-pajama-01.jpg',
      category: 'pajama-sets',
      origin: 'Babu Bazar Handloom Market',
    },
    {
      title: 'ISMAIL FASHION Imperial Festive Silk Panjabi',
      bangla: 'ইম্পেরিয়াল ফেস্টিভ সিল্ক পাঞ্জাবি',
      price: '৳৪,৯৫০',
      tag: 'Festive Collection',
      image: '/images/products/m-panjabi-01.jpg',
      category: 'panjabi',
      origin: 'Atelier Tailors, Dhaka',
    },
  ];

  const womenHeroSlides = [
    {
      title: 'ISMAIL FASHION Heritage Dhakai Jamdani Muslin Saree',
      bangla: 'ঐতিহ্যবাহী ঢাকাই জামদানি মসলিন শাড়ি',
      price: '৳১৮,৫০০',
      tag: 'UNESCO World Heritage',
      image: '/images/products/w-saree-01.jpg',
      category: 'jamdani-saree',
      origin: 'Demra & Sonargaon Pit Looms',
    },
    {
      title: 'ISMAIL FASHION Rajshahi Pure Silk Floral Zari Saree',
      bangla: 'রাজশাহী পিওর সিল্ক ফ্লোরাল জারি শাড়ি',
      price: '৳১৪,২০০',
      tag: 'Sericulture Mulberry Silk',
      image: '/images/products/w-saree-03.jpg',
      category: 'silk-saree',
      origin: 'Silk City, Rajshahi',
    },
    {
      title: 'ISMAIL FASHION Velvet Touch Embroidered Three-Piece',
      bangla: 'ভেলভেট টাচ কারুকাজ খচিত থ্রি-পিস সেট',
      price: '৳৮,৯৫০',
      tag: 'Festive Luxury Suite',
      image: '/images/products/w-three-piece-01.jpg',
      category: 'three-piece',
      origin: 'Artisan Atelier, Dhaka',
    },
    {
      title: 'ISMAIL FASHION Royal Crimson Banarasi Katan Bridal Saree',
      bangla: 'রয়েল ক্রিমসন বেনারসি কাতান ব্রাইডাল শাড়ি',
      price: '৳২৪,৫০০',
      tag: 'Royal Bridal Atelier',
      image: '/images/products/w-saree-08.jpg',
      category: 'party-wedding-saree',
      origin: 'Mirpur Benarasi Palli',
    },
  ];

  const heroSlides = isMen ? menHeroSlides : womenHeroSlides;
  const currentSlide = heroSlides[activeSlide] || heroSlides[0];

  return (
    <section
      id="hero"
      className="relative overflow-hidden transition-colors duration-700 py-10 lg:py-16"
      style={{
        backgroundColor: theme.canvasBg,
      }}
    >
      {/* Subtle traditional motif background aura */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `
            radial-gradient(circle at 10% 20%, ${isMen ? 'rgba(23, 56, 47, 0.08)' : 'rgba(107, 40, 56, 0.08)'} 0%, transparent 40%),
            radial-gradient(circle at 90% 80%, ${isMen ? 'rgba(212, 183, 121, 0.12)' : 'rgba(198, 161, 107, 0.12)'} 0%, transparent 50%)
          `,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Kicker */}
            <div className="flex items-center gap-2">
              <span
                className="text-xs uppercase tracking-[0.25em] font-bold"
                style={{ color: theme.primary }}
              >
                {isMen ? 'ISMAIL FASHION · পাঞ্জাবি, পায়জামা ও কোটি' : 'ISMAIL FASHION · শাড়ি, থ্রি-পিস ও লেহেঙ্গা'}
              </span>
              <span className="text-stone-300">|</span>
              <span className="text-xs font-bangla text-stone-600 font-medium">
                {isMen ? 'আভিজাত্য ও ঐতিহ্যের মেলবন্ধন' : 'শতভাগ খাঁটি দেশীয় বুনন'}
              </span>
            </div>

            {/* Main Headline (Playfair Editorial Serif - Upright & Bold) */}
            <h1
              className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.15] text-stone-900 font-bold not-italic"
              style={{
                textWrap: 'balance',
              }}
            >
              {isMen ? (
                <>
                  The Nobility of <br className="hidden sm:inline" />
                  <span
                    className="font-bold not-italic"
                    style={{ color: theme.primary }}
                  >
                    Royal Panjabis
                  </span>{' '}
                  &amp; Classic Pajamas
                </>
              ) : (
                <>
                  The Grandeur of{' '}
                  <span
                    className="font-bold not-italic"
                    style={{ color: theme.primary }}
                  >
                    Dhakai Jamdani
                  </span>{' '}
                  <br className="hidden sm:inline" />
                  &amp; Festive Three-Piece
                </>
              )}
            </h1>

            {/* Subheading */}
            <p className="text-sm sm:text-base text-stone-600 max-w-xl font-sans leading-relaxed">
              {isMen
                ? 'ইসমাইল ফ্যাশন (ISMAIL FASHION) নিয়ে এসেছে প্রিমিয়াম সিল্ক ও খাদি পাঞ্জাবি, আরামদায়ক সুতি পায়জামা, কাবলি এবং আভিজাত্য কোটি। নিজস্ব দক্ষ কারিগর দ্বারা নিখুঁত ফিনিশিং ও শতভাগ কাপড়ের নিশ্চয়তা।'
                : 'ইসমাইল ফ্যাশনের বিশ্বস্ত সংগ্রহে থাকছে খাঁটি ঢাকাই জামদানি, পিওর রাজশাহী সিল্ক শাড়ি, সুতি তাঁতের শাড়ি এবং উৎসবের আকর্ষণীয় এক্সক্লুসিভ থ্রি-পিস ও সালোয়ার স্যুট।'}
            </p>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={onShopNow}
                className="px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase text-white transition-all shadow-md hover:shadow-xl flex items-center gap-2 cursor-pointer group"
                style={{
                  backgroundColor: theme.primary,
                }}
              >
                <span>{isMen ? "Explore Men's Catalog" : 'Explore Sarees & Sets'}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={() => onExploreOccasion('wedding')}
                className="px-5 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase border border-stone-300 hover:border-stone-400 bg-white/85 hover:bg-white text-stone-900 transition-all cursor-pointer flex items-center gap-2 shadow-2xs"
              >
                <Crown className="w-4 h-4 text-[#D4B779]" />
                <span>Wedding Atelier</span>
              </button>
            </div>

            {/* Aza Fashions Style: Occasion Curation Ribbon Strip */}
            <div className="pt-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500 block mb-2">
                Curated Occasions:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => onExploreOccasion('eid')}
                  className="px-3 py-1.5 rounded-lg bg-white/90 hover:bg-white border border-stone-200 text-xs font-medium text-stone-800 transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer hover:border-stone-400"
                >
                  <Moon className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Eid Festive Edit 2026</span>
                </button>
                <button
                  type="button"
                  onClick={() => onExploreOccasion('wedding')}
                  className="px-3 py-1.5 rounded-lg bg-white/90 hover:bg-white border border-stone-200 text-xs font-medium text-stone-800 transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer hover:border-stone-400"
                >
                  <Crown className="w-3.5 h-3.5 text-[#D4B779]" />
                  <span>Royal Wedding Atelier</span>
                </button>
                <button
                  type="button"
                  onClick={() => onExploreOccasion('festival')}
                  className="px-3 py-1.5 rounded-lg bg-white/90 hover:bg-white border border-stone-200 text-xs font-medium text-stone-800 transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer hover:border-stone-400"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Cultural Handloom</span>
                </button>
              </div>
            </div>

            {/* Trust Points / Micro-Proof Strip (Khunchi Style) */}
            <div className="pt-4 border-t border-stone-200/80 grid grid-cols-3 gap-2 sm:gap-4 text-left">
              <div className="space-y-1">
                <span className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4B779]" /> ১০০% খাঁটি পণ্য
                </span>
                <p className="text-[11px] text-stone-500 leading-tight">
                  হ্যান্ডলুম ও সিল্ক নিশ্চয়তা
                </p>
              </div>

              <div className="space-y-1">
                <span className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
                  <Truck className="w-3.5 h-3.5 text-[#D4B779]" /> ক্যাশ অন ডেলিভারি
                </span>
                <p className="text-[11px] text-stone-500 leading-tight">
                  সারা দেশে দ্রুত ডেলিভারি
                </p>
              </div>

              <div className="space-y-1">
                <span className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
                  <RefreshCw className="w-3.5 h-3.5 text-[#D4B779]" /> ৭ দিনে এক্সচেঞ্জ
                </span>
                <p className="text-[11px] text-stone-500 leading-tight">
                  সহজ সাইজ পরিবর্তন সুবিধা
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Interactive Garment Showcase Display */}
          <div className="lg:col-span-5 relative">
            <div
              className="relative aspect-4/5 w-full rounded-2xl overflow-hidden shadow-2xl border transition-all duration-500"
              style={{
                borderColor: theme.borderTone,
                backgroundColor: theme.surfaceBg,
              }}
            >
              {/* Garment Studio Visual */}
              <img
                src={currentSlide.image}
                alt={currentSlide.title}
                className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
              />



              {/* Bottom Details Card Overlay */}
              <div
                className="absolute bottom-4 inset-x-4 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-stone-200/80 shadow-lg flex items-center justify-between"
              >
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold block">
                    {currentSlide.bangla}
                  </span>
                  <h4 className="text-xs font-bold text-stone-900 truncate max-w-[200px] sm:max-w-[240px]">
                    {currentSlide.title}
                  </h4>
                </div>
                <div className="text-right">
                  <span className="text-xs font-serif font-bold text-stone-900 block tabular-nums">
                    {currentSlide.price}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory(currentSlide.category);
                      onShopNow();
                    }}
                    className="text-[10px] font-bold tracking-wide uppercase hover:underline cursor-pointer"
                    style={{ color: theme.primary }}
                  >
                    Explore Piece →
                  </button>
                </div>
              </div>
            </div>

            {/* Thumbnail Selectors to Switch Garment in Hero */}
            <div className="flex items-center justify-center gap-2 mt-3">
              {heroSlides.map((slide, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveSlide(idx)}
                  className={`h-2 rounded-full transition-all ${
                    activeSlide === idx ? 'w-8 bg-stone-900' : 'w-2 bg-stone-300 hover:bg-stone-500'
                  }`}
                  aria-label={`View slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

