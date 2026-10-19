'use client';

import React, { useState, useMemo } from 'react';
import { useStore } from '@/context/StoreContext';
import { Product } from '@/types';
import { ProductCard } from '@/components/catalog/ProductCard';
import {
  SlidersHorizontal,
  X,
  RotateCcw,
  Search,
  Sparkles,
  Filter,
  Check,
} from 'lucide-react';

interface ShopCatalogProps {
  onOpenProductDetails: (product: Product) => void;
}

export const ShopCatalog: React.FC<ShopCatalogProps> = ({ onOpenProductDetails }) => {
  const {
    gender,
    theme,
    currentProducts,
    selectedCategory,
    setSelectedCategory,
    selectedCollection,
    setSelectedCollection,
    searchQuery,
    setSearchQuery,
  } = useStore();

  const [priceMax, setPriceMax] = useState<number>(35000);
  const [priceBracket, setPriceBracket] = useState<string>('all');
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [selectedFabric, setSelectedFabric] = useState<string>('all');
  const [selectedCraft, setSelectedCraft] = useState<string>('all');
  const [selectedFit, setSelectedFit] = useState<string>('all');
  const [sortBy, setSortBy] = useState<
    'featured' | 'price-asc' | 'price-desc' | 'newest' | 'rating' | 'popularity'
  >('featured');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Category definitions for Men
  const menCategories = [
    { key: 'all', label: "All Men's Wear" },
    { key: 'panjabi', label: 'Panjabi' },
    { key: 'kabli-kurta', label: 'Kabli & Kurta' },
    { key: 'waistcoats', label: 'Waistcoats (Koti)' },
    { key: 'pajama-sets', label: 'Pajama Sets' },
  ];

  // Category definitions for Women
  const womenCategories = [
    { key: 'all', label: "All Women's Wear" },
    { key: 'sarees', label: 'All Sarees' },
    { key: 'jamdani-saree', label: 'Jamdani Saree' },
    { key: 'silk-saree', label: 'Silk Saree' },
    { key: 'cotton-saree', label: 'Cotton Saree' },
    { key: 'tant-saree', label: 'Tant Saree' },
    { key: 'party-wedding-saree', label: 'Party & Wedding Saree' },
    { key: 'three-piece', label: 'Three Piece' },
    { key: 'salwar-kameez', label: 'Salwar Kameez' },
    { key: 'kurtis', label: 'Kurti' },
    { key: 'lehenga', label: 'Lehenga & Party Wear' },
    { key: 'hijab', label: 'Hijab' },
    { key: 'dupatta-orna', label: 'Dupatta & Orna' },
    { key: 'new-arrivals', label: 'New Arrivals' },
    { key: 'best-sellers', label: 'Best Sellers' },
    { key: 'eid', label: 'Eid Collection' },
    { key: 'wedding', label: 'Wedding Collection' },
  ];

  const currentCategories = gender === 'men' ? menCategories : womenCategories;

  // Available sizes based on gender
  const sizeOptions =
    gender === 'men'
      ? ['38', '40', '42', '44', '46']
      : ['36', '38', '40', '42', '44'];

  // Fabric choices
  const fabricOptions =
    gender === 'men'
      ? [
          { key: 'all', label: 'All Fabrics' },
          { key: 'silk', label: 'Mulberry Silk' },
          { key: 'khadi', label: 'Handloom Khadi' },
          { key: 'cotton', label: 'Combed / Giza Cotton' },
          { key: 'linen', label: 'Pure Linen Blend' },
          { key: 'brocade', label: 'Banarasi Brocade' },
        ]
      : [
          { key: 'all', label: 'All Fabrics' },
          { key: 'jamdani', label: 'Dhakai Muslin Jamdani' },
          { key: 'silk', label: 'Rajshahi Pure Silk' },
          { key: 'cotton', label: 'Tangail Handloom Cotton' },
          { key: 'tant', label: 'Traditional Tant' },
          { key: 'chanderi', label: 'Chanderi & Velvet' },
          { key: 'modal', label: 'Modal / Chiffon' },
        ];

  // Craft / Work options
  const craftOptions =
    gender === 'men'
      ? [
          { key: 'all', label: 'All Crafts' },
          { key: 'embroidery', label: 'Tone-on-Tone Resham' },
          { key: 'zari', label: 'Zari Metallic Weave' },
          { key: 'handloom', label: 'Hand-Spun Loom' },
          { key: 'brocade', label: 'Jacquard Floral Jaal' },
        ]
      : [
          { key: 'all', label: 'All Crafts' },
          { key: 'pit-loom', label: 'Pit Loom Booti' },
          { key: 'zardozi', label: 'Gold Zardozi & Zari' },
          { key: 'nakshi', label: 'Nakshi Kantha Handwork' },
          { key: 'block', label: 'Hand Block Print' },
        ];

  // Price brackets
  const priceBrackets = [
    { key: 'all', label: 'All Prices' },
    { key: 'under-3k', label: 'Under ৳3,000', max: 3000 },
    { key: '3k-6k', label: '৳3,000 – ৳6,000', min: 3000, max: 6000 },
    { key: '6k-12k', label: '৳6,000 – ৳12,000', min: 6000, max: 12000 },
    { key: 'above-12k', label: 'Above ৳12,000', min: 12000 },
  ];

  // Color options present in catalog
  const availableColors = useMemo(() => {
    const map = new Map<string, string>();
    currentProducts.forEach((p) => {
      p.colors.forEach((c) => {
        if (!map.has(c.name)) map.set(c.name, c.hex);
      });
    });
    return Array.from(map.entries()).map(([name, hex]) => ({ name, hex }));
  }, [currentProducts]);

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return currentProducts
      .filter((p) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matches =
            p.name.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.subCategory.toLowerCase().includes(q) ||
            p.fabric.toLowerCase().includes(q) ||
            p.weavingOrWork.toLowerCase().includes(q) ||
            (p.banglaName && p.banglaName.includes(q));
          if (!matches) return false;
        }

        // Category filter (supports all categories)
        if (selectedCategory !== 'all') {
          if (selectedCategory === 'sarees') {
            if (p.category !== 'sarees') return false;
          } else if (selectedCategory === 'jamdani-saree') {
            if (p.subCategory !== 'Jamdani Saree') return false;
          } else if (selectedCategory === 'silk-saree') {
            if (p.subCategory !== 'Silk Saree') return false;
          } else if (selectedCategory === 'cotton-saree') {
            if (p.subCategory !== 'Cotton Saree') return false;
          } else if (selectedCategory === 'tant-saree') {
            if (p.subCategory !== 'Tant Saree') return false;
          } else if (selectedCategory === 'party-wedding-saree') {
            if (p.subCategory !== 'Party and Wedding Saree') return false;
          } else if (selectedCategory === 'three-piece') {
            if (p.category !== 'three-piece') return false;
          } else if (selectedCategory === 'salwar-kameez') {
            if (p.category !== 'salwar-kameez') return false;
          } else if (selectedCategory === 'kurtis' || selectedCategory === 'kurti') {
            if (p.category !== 'kurtis') return false;
          } else if (selectedCategory === 'lehenga') {
            if (p.category !== 'lehenga') return false;
          } else if (selectedCategory === 'hijab') {
            if (p.category !== 'hijab') return false;
          } else if (selectedCategory === 'dupatta-orna') {
            if (p.category !== 'dupatta-orna') return false;
          } else if (selectedCategory === 'new-arrivals') {
            if (!p.isNewArrival) return false;
          } else if (selectedCategory === 'best-sellers') {
            if (!p.isBestSeller) return false;
          } else if (selectedCategory === 'eid') {
            if (p.collection !== 'eid') return false;
          } else if (selectedCategory === 'wedding') {
            if (p.collection !== 'wedding') return false;
          } else if (p.category !== selectedCategory) {
            return false;
          }
        }

        // Collection filter
        if (selectedCollection !== 'all') {
          if (selectedCollection === 'new-arrivals' && !p.isNewArrival) return false;
          if (selectedCollection === 'best-sellers' && !p.isBestSeller) return false;
          if (
            ['eid', 'wedding', 'festival'].includes(selectedCollection) &&
            p.collection !== selectedCollection
          ) {
            return false;
          }
        }

        // Price bracket filter
        if (priceBracket !== 'all') {
          if (priceBracket === 'under-3k' && p.price >= 3000) return false;
          if (priceBracket === '3k-6k' && (p.price < 3000 || p.price > 6000)) return false;
          if (priceBracket === '6k-12k' && (p.price < 6000 || p.price > 12000)) return false;
          if (priceBracket === 'above-12k' && p.price < 12000) return false;
        }

        // Price range slider filter
        if (p.price > priceMax) return false;

        // Size filter (only applies to products with stitched size options)
        if (selectedSize !== 'all') {
          if (p.sizes.length > 0 && !p.sizes.includes(selectedSize)) return false;
        }

        // Color filter
        if (selectedColor !== 'all') {
          const hasColor = p.colors.some((c) => c.name === selectedColor);
          if (!hasColor) return false;
        }

        // Fabric filter
        if (selectedFabric !== 'all') {
          const f = p.fabric.toLowerCase();
          if (selectedFabric === 'silk' && !f.includes('silk') && !f.includes('tussar')) return false;
          if (selectedFabric === 'khadi' && !f.includes('khadi')) return false;
          if (selectedFabric === 'cotton' && !f.includes('cotton') && !f.includes('giza')) return false;
          if (selectedFabric === 'linen' && !f.includes('linen')) return false;
          if (selectedFabric === 'brocade' && !f.includes('brocade') && !f.includes('jacquard')) return false;
          if (selectedFabric === 'jamdani' && !f.includes('muslin') && !f.includes('jamdani')) return false;
          if (selectedFabric === 'tant' && !f.includes('tant') && !f.includes('cotton')) return false;
          if (selectedFabric === 'chanderi' && !f.includes('chanderi') && !f.includes('velvet')) return false;
          if (selectedFabric === 'modal' && !f.includes('modal') && !f.includes('chiffon')) return false;
        }

        // Craft / Work filter
        if (selectedCraft !== 'all') {
          const w = (p.weavingOrWork + ' ' + p.patternDetail).toLowerCase();
          if (selectedCraft === 'embroidery' && !w.includes('thread') && !w.includes('embroid') && !w.includes('resham')) return false;
          if (selectedCraft === 'zari' && !w.includes('zari') && !w.includes('gold')) return false;
          if (selectedCraft === 'handloom' && !w.includes('handloom') && !w.includes('hand-spun') && !w.includes('loom')) return false;
          if (selectedCraft === 'brocade' && !w.includes('brocade') && !w.includes('jaal') && !w.includes('jacquard')) return false;
          if (selectedCraft === 'pit-loom' && !w.includes('pit') && !w.includes('booti') && !w.includes('jamdani')) return false;
          if (selectedCraft === 'zardozi' && !w.includes('zardozi') && !w.includes('zari')) return false;
          if (selectedCraft === 'nakshi' && !w.includes('nakshi') && !w.includes('kantha')) return false;
          if (selectedCraft === 'block' && !w.includes('block') && !w.includes('dabu')) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'popularity') return b.reviewsCount - a.reviewsCount;
        if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        // Default 'featured'
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [
    currentProducts,
    searchQuery,
    selectedCategory,
    selectedCollection,
    priceBracket,
    priceMax,
    selectedSize,
    selectedColor,
    selectedFabric,
    selectedCraft,
    sortBy,
  ]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedCollection('all');
    setSelectedSize('all');
    setSelectedColor('all');
    setSelectedFabric('all');
    setSelectedCraft('all');
    setPriceBracket('all');
    setPriceMax(35000);
    setSearchQuery('');
    setSortBy('featured');
  };

  const isFilterActive =
    selectedCategory !== 'all' ||
    selectedCollection !== 'all' ||
    selectedSize !== 'all' ||
    selectedColor !== 'all' ||
    selectedFabric !== 'all' ||
    selectedCraft !== 'all' ||
    priceBracket !== 'all' ||
    priceMax < 35000 ||
    searchQuery.trim().length > 0;

  // Compute category counts for sidebar
  const getCategoryCount = (key: string) => {
    if (key === 'all') return currentProducts.length;
    if (key === 'sarees') return currentProducts.filter((p) => p.category === 'sarees').length;
    if (key === 'jamdani-saree') return currentProducts.filter((p) => p.subCategory === 'Jamdani Saree').length;
    if (key === 'silk-saree') return currentProducts.filter((p) => p.subCategory === 'Silk Saree').length;
    if (key === 'cotton-saree') return currentProducts.filter((p) => p.subCategory === 'Cotton Saree').length;
    if (key === 'tant-saree') return currentProducts.filter((p) => p.subCategory === 'Tant Saree').length;
    if (key === 'party-wedding-saree') return currentProducts.filter((p) => p.subCategory === 'Party and Wedding Saree').length;
    if (key === 'new-arrivals') return currentProducts.filter((p) => p.isNewArrival).length;
    if (key === 'best-sellers') return currentProducts.filter((p) => p.isBestSeller).length;
    if (key === 'eid') return currentProducts.filter((p) => p.collection === 'eid').length;
    if (key === 'wedding') return currentProducts.filter((p) => p.collection === 'wedding').length;
    return currentProducts.filter((p) => p.category === key).length;
  };

  return (
    <section id="catalog" className="py-12 bg-[#FAF8F5] min-h-[700px] border-t border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Strip with Title, Collection tabs, and Sort */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-stone-200 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span
                className="text-xs uppercase tracking-[0.2em] font-semibold"
                style={{ color: theme.primary }}
              >
                {gender === 'men' ? 'ইসমাইল ফ্যাশন · প্রিমিয়াম পাঞ্জাবি ও পায়জামা' : 'ইসমাইল ফ্যাশন · ঐতিহ্যবাহী শাড়ি ও থ্রি-পিস'}
              </span>
              <span className="text-stone-300">·</span>
              <span className="text-xs text-stone-500 tabular-nums font-bangla">
                {filteredProducts.length} টি অনন্য পোশাক
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 font-bold not-italic mt-1">
              {gender === 'men'
                ? 'আভিজাত্য পাঞ্জাবি, পায়জামা, কাবলি ও কোটি কালেকশন'
                : 'খাঁটি ঢাকাই জামদানি, সিল্ক শাড়ি ও এক্সক্লুসিভ থ্রি-পিস'}
            </h2>
          </div>

          {/* Quick Collection Segmented Tabs (Aza Fashions style) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-200/70 rounded-xl text-xs">
            {[
              { id: 'all', label: 'All Catalog' },
              { id: 'eid', label: 'Eid Edit 2026' },
              { id: 'wedding', label: 'Wedding Atelier' },
              { id: 'new-arrivals', label: 'New Releases' },
              { id: 'best-sellers', label: 'Best Sellers' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedCollection(tab.id)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                  selectedCollection === tab.id
                    ? 'bg-white text-stone-900 shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Toolbar: Category Quick Pills (Clean Minimalist Retail) */}
        <div className="py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 max-w-full scrollbar-none">
            {currentCategories.map((c) => {
              const isActive = selectedCategory === c.key;
              return (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => setSelectedCategory(c.key)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                    isActive
                      ? 'text-white shadow-2xs font-semibold'
                      : 'bg-white border border-stone-200 text-stone-700 hover:border-stone-300 hover:bg-stone-50'
                  }`}
                  style={{
                    backgroundColor: isActive ? theme.primary : undefined,
                  }}
                >
                  <span>{c.label}</span>
                </button>
              );
            })}
          </div>

          {/* Sort & Filter Drawer Button */}
          <div className="flex items-center gap-3 ml-auto shrink-0">
            <button
              type="button"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-300 bg-white text-xs font-medium text-stone-700 shadow-2xs"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters {isFilterActive && '•'}</span>
            </button>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-stone-500 hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(
                    e.target.value as 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'rating' | 'popularity'
                  )
                }
                className="bg-white border border-stone-200 rounded-lg py-1.5 pl-2.5 pr-8 text-xs font-medium text-stone-800 focus:outline-none focus:ring-1 cursor-pointer"
              >
                <option value="featured">Featured Atelier</option>
                <option value="popularity">Most Popular</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest Releases</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filters Clear Bar */}
        {isFilterActive && (
          <div className="py-2.5 px-3 bg-white rounded-xl border border-stone-200/80 mb-4 flex items-center gap-2 text-xs text-stone-600 flex-wrap">
            <span className="font-semibold text-stone-800 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-[#D4B779]" /> Active Filters:
            </span>
            {selectedCategory !== 'all' && (
              <span className="px-2 py-0.5 rounded-full bg-stone-100 border border-stone-200 flex items-center gap-1 text-[11px]">
                Category: {currentCategories.find((c) => c.key === selectedCategory)?.label || selectedCategory}
                <X
                  className="w-3 h-3 cursor-pointer hover:text-stone-900"
                  onClick={() => setSelectedCategory('all')}
                />
              </span>
            )}
            {selectedCollection !== 'all' && (
              <span className="px-2 py-0.5 rounded-full bg-stone-100 border border-stone-200 flex items-center gap-1 text-[11px]">
                Collection: {selectedCollection}
                <X
                  className="w-3 h-3 cursor-pointer hover:text-stone-900"
                  onClick={() => setSelectedCollection('all')}
                />
              </span>
            )}
            {priceBracket !== 'all' && (
              <span className="px-2 py-0.5 rounded-full bg-stone-100 border border-stone-200 flex items-center gap-1 text-[11px]">
                Price: {priceBrackets.find((p) => p.key === priceBracket)?.label}
                <X
                  className="w-3 h-3 cursor-pointer hover:text-stone-900"
                  onClick={() => setPriceBracket('all')}
                />
              </span>
            )}
            {selectedSize !== 'all' && (
              <span className="px-2 py-0.5 rounded-full bg-stone-100 border border-stone-200 flex items-center gap-1 text-[11px]">
                Size: {selectedSize}
                <X
                  className="w-3 h-3 cursor-pointer hover:text-stone-900"
                  onClick={() => setSelectedSize('all')}
                />
              </span>
            )}
            {selectedFabric !== 'all' && (
              <span className="px-2 py-0.5 rounded-full bg-stone-100 border border-stone-200 flex items-center gap-1 text-[11px]">
                Fabric: {selectedFabric}
                <X
                  className="w-3 h-3 cursor-pointer hover:text-stone-900"
                  onClick={() => setSelectedFabric('all')}
                />
              </span>
            )}
            {selectedCraft !== 'all' && (
              <span className="px-2 py-0.5 rounded-full bg-stone-100 border border-stone-200 flex items-center gap-1 text-[11px]">
                Craft: {selectedCraft}
                <X
                  className="w-3 h-3 cursor-pointer hover:text-stone-900"
                  onClick={() => setSelectedCraft('all')}
                />
              </span>
            )}
            {selectedColor !== 'all' && (
              <span className="px-2 py-0.5 rounded-full bg-stone-100 border border-stone-200 flex items-center gap-1 text-[11px]">
                Color: {selectedColor}
                <X
                  className="w-3 h-3 cursor-pointer hover:text-stone-900"
                  onClick={() => setSelectedColor('all')}
                />
              </span>
            )}
            {priceMax < 35000 && (
              <span className="px-2 py-0.5 rounded-full bg-stone-100 border border-stone-200 flex items-center gap-1 text-[11px]">
                Max: ৳{priceMax.toLocaleString()}
                <X
                  className="w-3 h-3 cursor-pointer hover:text-stone-900"
                  onClick={() => setPriceMax(35000)}
                />
              </span>
            )}
            {searchQuery && (
              <span className="px-2 py-0.5 rounded-full bg-stone-100 border border-stone-200 flex items-center gap-1 text-[11px]">
                &ldquo;{searchQuery}&rdquo;
                <X
                  className="w-3 h-3 cursor-pointer hover:text-stone-900"
                  onClick={() => setSearchQuery('')}
                />
              </span>
            )}
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-xs font-semibold text-rose-800 hover:text-rose-950 flex items-center gap-1 ml-auto cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" /> Clear All Filters
            </button>
          </div>
        )}

        {/* Main Grid: Comprehensive Multi-Attribute Sidebar + Product Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-2">
          {/* Multi-Attribute Filter Sidebar (Aza Fashions + Fabindia Style) */}
          <aside
            className={`lg:block ${
              showMobileFilters ? 'block' : 'hidden'
            } col-span-1 space-y-6 bg-white p-5 rounded-2xl border border-stone-200/90 shadow-xs h-fit`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="text-sm font-semibold text-stone-900 flex items-center gap-1.5 font-serif">
                <SlidersHorizontal className="w-4 h-4 text-[#D4B779]" /> Filter Atelier
              </h3>
              {isFilterActive && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-[11px] text-stone-500 hover:text-stone-900 underline"
                >
                  Reset
                </button>
              )}
            </div>

            {/* 1. Category Tree Filter */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-stone-800 block">
                {gender === 'men' ? "Men's Garment Types" : "Women's Categories"}
              </label>
              <div className="space-y-1 max-h-52 overflow-y-auto pr-1">
                {currentCategories.map((c) => {
                  const count = getCategoryCount(c.key);
                  const isSel = selectedCategory === c.key;
                  return (
                    <button
                      key={c.key}
                      type="button"
                      onClick={() => setSelectedCategory(c.key)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                        isSel
                          ? 'bg-stone-900 text-white font-semibold'
                          : 'text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      <span className="truncate">{c.label}</span>
                      <span
                        className={`text-[10px] tabular-nums px-1.5 py-0.2 rounded-full ${
                          isSel ? 'bg-stone-800 text-white' : 'bg-stone-100 text-stone-500'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Fabric Multi-Attribute Filter (Aza & Fabindia) */}
            <div className="space-y-2 pt-3 border-t border-stone-100">
              <label className="text-xs font-semibold uppercase tracking-wider text-stone-800 block">
                Fabric &amp; Weave
              </label>
              <div className="flex flex-wrap gap-1.5">
                {fabricOptions.map((f) => (
                  <button
                    key={f.key}
                    type="button"
                    onClick={() => setSelectedFabric(f.key)}
                    className={`px-2.5 py-1 text-[11px] rounded-lg border transition-all ${
                      selectedFabric === f.key
                        ? 'bg-stone-900 text-white border-stone-900 font-semibold'
                        : 'border-stone-200 text-stone-700 hover:border-stone-300 bg-stone-50/70'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Craft & Work Multi-Attribute Filter (Aza & Fabindia) */}
            <div className="space-y-2 pt-3 border-t border-stone-100">
              <label className="text-xs font-semibold uppercase tracking-wider text-stone-800 block">
                Work &amp; Craftsmanship
              </label>
              <div className="flex flex-wrap gap-1.5">
                {craftOptions.map((c) => (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => setSelectedCraft(c.key)}
                    className={`px-2.5 py-1 text-[11px] rounded-lg border transition-all ${
                      selectedCraft === c.key
                        ? 'bg-stone-900 text-white border-stone-900 font-semibold'
                        : 'border-stone-200 text-stone-700 hover:border-stone-300 bg-stone-50/70'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Price Bracket & Slider (Aza Fashions style) */}
            <div className="space-y-2 pt-3 border-t border-stone-100">
              <label className="text-xs font-semibold uppercase tracking-wider text-stone-800 block">
                Price Range (BDT ৳)
              </label>
              <div className="grid grid-cols-2 gap-1.5 mb-2">
                {priceBrackets.map((pb) => (
                  <button
                    key={pb.key}
                    type="button"
                    onClick={() => setPriceBracket(pb.key)}
                    className={`px-2 py-1 text-[10px] rounded-lg border text-center transition-all ${
                      priceBracket === pb.key
                        ? 'bg-stone-900 text-white border-stone-900 font-semibold'
                        : 'border-stone-200 text-stone-700 hover:border-stone-300 bg-stone-50'
                    }`}
                  >
                    {pb.label}
                  </button>
                ))}
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs text-stone-600">
                  <span>Up to:</span>
                  <span className="font-bold text-stone-900 tabular-nums">৳{priceMax.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="35000"
                  step="500"
                  value={priceMax}
                  onChange={(e) => {
                    setPriceMax(Number(e.target.value));
                    setPriceBracket('all');
                  }}
                  className="w-full accent-stone-800 cursor-pointer"
                />
              </div>
            </div>

            {/* 5. Quick Size Selector (Aza Fashions style) */}
            <div className="space-y-2 pt-3 border-t border-stone-100">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-800">
                  {gender === 'men' ? 'Chest Size (Inches)' : 'Garment Size'}
                </label>
                <span className="text-[10px] text-stone-400">
                  {gender === 'women' ? 'Sarees unstitched' : '38-46'}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => setSelectedSize('all')}
                  className={`px-2.5 py-1 rounded-lg text-xs border ${
                    selectedSize === 'all'
                      ? 'bg-stone-900 text-white border-stone-900 font-semibold'
                      : 'border-stone-200 text-stone-700 hover:border-stone-300'
                  }`}
                >
                  All
                </button>
                {sizeOptions.map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setSelectedSize(sz)}
                    className={`px-2.5 py-1 rounded-lg text-xs border font-medium ${
                      selectedSize === sz
                        ? 'bg-stone-900 text-white border-stone-900 font-semibold'
                        : 'border-stone-200 text-stone-700 hover:border-stone-300'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* 6. Color Swatches */}
            <div className="space-y-2 pt-3 border-t border-stone-100">
              <label className="text-xs font-semibold uppercase tracking-wider text-stone-800 block">Color Palette</label>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => setSelectedColor('all')}
                  className={`text-[10px] px-2 py-0.5 rounded-lg border transition-all ${
                    selectedColor === 'all'
                      ? 'bg-stone-900 text-white border-stone-900 font-semibold'
                      : 'border-stone-200 hover:border-stone-400 text-stone-600'
                  }`}
                >
                  All
                </button>
                {availableColors.map((col) => (
                  <button
                    key={col.name}
                    type="button"
                    title={col.name}
                    onClick={() => setSelectedColor(col.name)}
                    className={`w-5 h-5 rounded-full border transition-transform relative ${
                      selectedColor === col.name
                        ? 'scale-125 border-stone-900 ring-2 ring-stone-400 shadow-xs'
                        : 'border-stone-300 hover:scale-110'
                    }`}
                    style={{ backgroundColor: col.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Brand Heritage Assurance */}
            <div
              className="p-4 rounded-xl text-xs leading-relaxed border space-y-1.5"
              style={{
                backgroundColor: gender === 'men' ? '#FAF8F3' : '#FAF5EF',
                borderColor: theme.borderTone,
              }}
            >
              <div className="flex items-center gap-1 font-serif font-bold text-stone-900">
                <Sparkles className="w-3.5 h-3.5 text-[#D4B779]" /> ইসমাইল ফ্যাশন কোয়ালিটি নিশ্চয়তা
              </div>
              <p className="text-[11px] text-stone-600 font-bangla">
                ১০০% খাঁটি নিজস্ব তাঁতের জামদানি, পিওর রাজশাহী তুত সিল্ক এবং সেরা মানের খাদি সুতি দিয়ে তৈরি।
              </p>
            </div>
          </aside>

          {/* Product Listing Grid (3 Columns on Desktop) */}
          <div className="col-span-1 lg:col-span-3">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onOpenDetails={onOpenProductDetails}
                  />
                ))}
              </div>
            ) : (
              /* Refined Empty Search / Filter State */
              <div className="bg-white rounded-2xl border border-stone-200/90 p-12 text-center space-y-4 max-w-lg mx-auto my-8 shadow-xs">
                <div className="w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
                  <Search className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-semibold text-stone-900 font-serif">
                    কোনো পোশাক পাওয়া যায়নি
                  </h4>
                  <p className="text-xs text-stone-500 font-sans">
                    আপনার নির্বাচিত ফিল্টারের সাথে মিলে এমন কোনো পোশাক পাওয়া যায়নি। অনুগ্রহ করে ফিল্টার পরিবর্তন করুন।
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 rounded-full text-xs font-semibold text-white transition-all cursor-pointer shadow-xs hover:shadow-md"
                  style={{ backgroundColor: theme.primary }}
                >
                  সব ফিল্টার রিসেট করুন
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
