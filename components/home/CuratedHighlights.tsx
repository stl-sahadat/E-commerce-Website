'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { Product } from '@/types';
import { ProductCard } from '@/components/catalog/ProductCard';
import { Sparkles, Flame, ArrowRight } from 'lucide-react';

interface CuratedHighlightsProps {
  onOpenProduct: (product: Product) => void;
  onViewAllCatalog: () => void;
}

export const CuratedHighlights: React.FC<CuratedHighlightsProps> = ({
  onOpenProduct,
  onViewAllCatalog,
}) => {
  const { gender, theme, currentProducts } = useStore();
  const [activeTab, setActiveTab] = useState<'new-arrivals' | 'best-sellers' | 'wedding' | 'eid'>('new-arrivals');

  const newArrivals = currentProducts.filter((p) => p.isNewArrival).slice(0, 4);
  const bestSellers = currentProducts.filter((p) => p.isBestSeller).slice(0, 4);
  const weddingPicks = currentProducts.filter((p) => p.collection === 'wedding').slice(0, 4);
  const eidPicks = currentProducts.filter((p) => p.collection === 'eid').slice(0, 4);

  const getDisplayedProducts = () => {
    switch (activeTab) {
      case 'new-arrivals':
        return newArrivals;
      case 'best-sellers':
        return bestSellers;
      case 'wedding':
        return weddingPicks.length > 0 ? weddingPicks : bestSellers;
      case 'eid':
        return eidPicks.length > 0 ? eidPicks : newArrivals;
      default:
        return newArrivals;
    }
  };

  const displayedProducts = getDisplayedProducts();

  const getTabTitle = () => {
    switch (activeTab) {
      case 'new-arrivals':
        return 'নতুন সিজনাল অ্যারাইভালস';
      case 'best-sellers':
        return 'জনপ্রিয় ও বেস্ট সেলিং পোশাক';
      case 'wedding':
        return 'রাজকীয় ওয়েডিং ও ব্রাইডাল স্পেশাল';
      case 'eid':
        return 'ঈদ উৎসব এক্সক্লুসিভ কালেকশন';
    }
  };

  return (
    <section className="py-14 sm:py-20 bg-white border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Segmented Control */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-1.5 mb-1 text-xs font-semibold uppercase tracking-wider" style={{ color: theme.primary }}>
              <Sparkles className="w-3.5 h-3.5 text-[#D4B779]" />
              <span className="font-bangla">ইসমাইল ফ্যাশন কিউরেটেড কালেকশন</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-stone-900 font-normal">
              {getTabTitle()}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Segmented Tab Filter */}
            <div className="flex flex-wrap items-center p-1 bg-stone-100 rounded-xl text-xs font-medium">
              <button
                type="button"
                onClick={() => setActiveTab('new-arrivals')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'new-arrivals'
                    ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                New Releases
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('best-sellers')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'best-sellers'
                    ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Best Sellers
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('wedding')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'wedding'
                    ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Wedding Atelier
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('eid')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'eid'
                    ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Eid Festive
              </button>
            </div>

            <button
              type="button"
              onClick={onViewAllCatalog}
              className="hidden md:flex items-center gap-1 text-xs font-semibold text-stone-700 hover:text-stone-950 underline underline-offset-4 cursor-pointer"
            >
              <span>Full Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 4-Item Responsive Showcase Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} onOpenDetails={onOpenProduct} />
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-8 text-center md:hidden">
          <button
            type="button"
            onClick={onViewAllCatalog}
            className="w-full py-3 rounded-xl border border-stone-300 text-xs font-semibold text-stone-800 hover:bg-stone-50"
          >
            Explore Complete Collection →
          </button>
        </div>
      </div>
    </section>
  );
};
