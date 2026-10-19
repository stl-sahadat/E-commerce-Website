'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { GarmentVisual } from '@/components/garment/GarmentVisual';
import { Sparkles, ArrowRight, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

interface HeroSectionProps {
  onShopNow: () => void;
  onExploreOccasion: (col: 'eid' | 'wedding' | 'festival') => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onShopNow, onExploreOccasion }) => {
  const { gender, theme, setSelectedCategory } = useStore();

  const isMen = gender === 'men';

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
                className="text-xs uppercase tracking-[0.22em] font-semibold"
                style={{ color: theme.primary }}
              >
                {isMen ? 'ISMAIL FASHION · পাঞ্জাবি ও পায়জামা' : 'ISMAIL FASHION · শাড়ি ও থ্রি-পিস'}
              </span>
              <span className="text-stone-300">|</span>
              <span className="text-xs font-bangla text-stone-500">
                {isMen ? 'আভিজাত্য ও ঐতিহ্য' : 'বাংলার সেরা কালেকশন'}
              </span>
            </div>

            {/* Main Headline */}
            <h1
              className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.12] text-stone-900"
              style={{
                textWrap: 'balance',
              }}
            >
              {isMen ? (
                <>
                  The Nobility of <br className="hidden sm:inline" />
                  <span
                    className="italic font-normal"
                    style={{ color: theme.primary }}
                  >
                    Premium Panjabis
                  </span>{' '}
                  &amp; Classic Pajamas
                </>
              ) : (
                <>
                  The Elegance of{' '}
                  <span
                    className="italic font-normal"
                    style={{ color: theme.primary }}
                  >
                    Dhakai Jamdani
                  </span>{' '}
                  <br className="hidden sm:inline" />
                  &amp; Exclusive Three-Piece
                </>
              )}
            </h1>

            {/* Subheading */}
            <p className="text-sm sm:text-base text-stone-600 max-w-xl font-sans leading-relaxed">
              {isMen
                ? 'ইসমাইল ফ্যাশন (ISMAIL FASHION) নিয়ে এসেছে প্রিমিয়াম সিল্ক ও খাদি পাঞ্জাবি, আরামদায়ক সুতি পায়জামা, কাবলি এবং আভিজাত্য কোটি। নিজস্ব দক্ষ কারিগর দ্বারা নিখুঁত ফিনিশিং।'
                : 'ইসমাইল ফ্যাশনের বিশ্বস্ত সংগ্রহে থাকছে খাঁটি ঢাকাই জামদানি, পিওর রাজশাহী সিল্ক শাড়ি, সুতি তাঁতের শাড়ি এবং উৎসবের আকর্ষণীয় এক্সক্লুসিভ থ্রি-পিস ও সালোয়ার স্যুট।'}
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={onShopNow}
                className="px-6 py-3.5 rounded-full text-xs sm:text-sm font-medium tracking-wider uppercase text-white transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer group"
                style={{
                  backgroundColor: theme.primary,
                }}
              >
                <span>{isMen ? "Shop Men's Catalog" : 'Explore Sarees & Sets'}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={() => onExploreOccasion('wedding')}
                className="px-5 py-3.5 rounded-full text-xs sm:text-sm font-medium tracking-wider uppercase border border-stone-300 hover:border-stone-400 bg-white/70 hover:bg-white text-stone-800 transition-all cursor-pointer flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D4B779]" />
                <span>Wedding Collection</span>
              </button>
            </div>

            {/* Trust Points / Micro-Proof Strip */}
            <div className="pt-6 border-t border-stone-200/80 grid grid-cols-3 gap-2 sm:gap-4 text-left">
              <div className="space-y-1">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-stone-900">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4B779]" /> 100% Authentic
                </span>
                <p className="text-[11px] text-stone-500 leading-tight">
                  Handloom &amp; silk certified
                </p>
              </div>

              <div className="space-y-1">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-stone-900">
                  <Truck className="w-3.5 h-3.5 text-[#D4B779]" /> COD Nationwide
                </span>
                <p className="text-[11px] text-stone-500 leading-tight">
                  Delivery in 24–72 hours
                </p>
              </div>

              <div className="space-y-1">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-stone-900">
                  <RefreshCw className="w-3.5 h-3.5 text-[#D4B779]" /> 7-Day Exchange
                </span>
                <p className="text-[11px] text-stone-500 leading-tight">
                  Hassle-free size adjustment
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Garment Showcase Display */}
          <div className="lg:col-span-5 relative">
            <div
              className="relative aspect-4/5 w-full rounded-2xl overflow-hidden shadow-xl border transition-all duration-500"
              style={{
                borderColor: theme.borderTone,
                backgroundColor: theme.surfaceBg,
              }}
            >
              {/* Garment Studio Visual - Real Photography with subtle zoom */}
              <img
                src={isMen ? '/images/products/m-panjabi-01.jpg' : '/images/products/w-saree-01.jpg'}
                alt={isMen ? 'ISMAIL FASHION Mastercraft Panjabi' : 'ISMAIL FASHION Heritage Jamdani Saree'}
                className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
              />

              {/* Floating Curated Badge / Callout */}
              <div
                className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-stone-200/80 shadow-xs flex items-center gap-1.5"
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.primary }} />
                <span className="text-[11px] font-sans font-medium uppercase tracking-wider text-stone-800">
                  {isMen ? 'Mastercraft Panjabi' : 'Heritage Jamdani Saree'}
                </span>
              </div>

              {/* Bottom Details Card Overlay */}
              <div
                className="absolute bottom-4 inset-x-4 p-3.5 rounded-xl bg-white/95 backdrop-blur-md border border-stone-200/80 shadow-md flex items-center justify-between"
              >
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-stone-500 font-medium block">
                    {isMen ? 'Featured Silhouette' : 'Artisan Weave'}
                  </span>
                  <h4 className="text-xs font-semibold text-stone-900 truncate max-w-[200px] sm:max-w-[260px]">
                    {isMen
                      ? 'ISMAIL FASHION Royal Emerald Silk Panjabi'
                      : 'ISMAIL FASHION Heritage Dhakai Jamdani Saree'}
                  </h4>
                </div>
                <div className="text-right">
                  <span className="text-xs font-serif font-bold text-stone-900 block tabular-nums">
                    {isMen ? '৳5,450' : '৳18,500'}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory(isMen ? 'panjabi' : 'sarees');
                      onShopNow();
                    }}
                    className="text-[10px] font-medium tracking-wide uppercase hover:underline cursor-pointer"
                    style={{ color: theme.primary }}
                  >
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
