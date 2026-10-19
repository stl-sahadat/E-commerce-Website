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
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [selectedColor, setSelectedColor] = useState<string>('all');
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

  // Category definitions for Women (complete 17 categories)
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
            (p.banglaName && p.banglaName.includes(q));
          if (!matches) return false;
        }

        // Category filter (supports all 17 women categories)
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

        // Price filter
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
    priceMax,
    selectedSize,
    selectedColor,
    sortBy,
  ]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedCollection('all');
    setSelectedSize('all');
    setSelectedColor('all');
    setPriceMax(35000);
    setSearchQuery('');
    setSortBy('featured');
  };

  const isFilterActive =
    selectedCategory !== 'all' ||
    selectedCollection !== 'all' ||
    selectedSize !== 'all' ||
    selectedColor !== 'all' ||
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
    <section id="catalog" className="py-12 bg-stone-50/50 min-h-[700px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Strip with Title, Collection tabs, and Sort */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-stone-200/80 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span
                className="text-xs uppercase tracking-[0.2em] font-semibold"
                style={{ color: theme.primary }}
              >
                {gender === 'men' ? 'ইসমাইল ফ্যাশন · পাঞ্জাবি ও পায়জামা' : 'ইসমাইল ফ্যাশন · শাড়ি ও থ্রি-পিস'}
              </span>
              <span className="text-stone-300">·</span>
              <span className="text-xs text-stone-500 tabular-nums font-bangla">
                {filteredProducts.length} টি এক্সক্লুসিভ কালেকশন
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 font-normal">
              {gender === 'men' ? 'প্রিমিয়াম পাঞ্জাবি ও পায়জামা সম্ভার' : 'ঐতিহ্যবাহী ঢাকাই জামদানি, শাড়ি ও থ্রি-পিস'}
            </h2>
          </div>

          {/* Quick Collection Segmented Tabs (All, New Arrivals, Best Sellers, Eid, Wedding) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-200/60 rounded-lg text-xs">
            {[
              { id: 'all', label: 'All Catalog' },
              { id: 'new-arrivals', label: 'New Arrivals' },
              { id: 'best-sellers', label: 'Best Sellers' },
              { id: 'eid', label: 'Eid Collection' },
              { id: 'wedding', label: 'Wedding' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedCollection(tab.id)}
                className={`px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer ${
                  selectedCollection === tab.id
                    ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Toolbar: Category Quick Pills, Active Filters & Sort */}
        <div className="py-4 flex flex-wrap items-center justify-between gap-4">
          {/* Category Quick Pills (Scrollable for complete categories) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 max-w-full scrollbar-thin">
            {currentCategories.map((c) => (
              <button
                key={c.key}
                type="button"
                onClick={() => setSelectedCategory(c.key)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                  selectedCategory === c.key
                    ? 'text-white shadow-2xs font-semibold'
                    : 'bg-white border border-stone-200 text-stone-700 hover:border-stone-300 hover:bg-stone-50'
                }`}
                style={{
                  backgroundColor: selectedCategory === c.key ? theme.primary : undefined,
                }}
              >
                {c.label} ({getCategoryCount(c.key)})
              </button>
            ))}
          </div>

          {/* Sort & Filter drawer toggle */}
          <div className="flex items-center gap-3 ml-auto">
            <button
              type="button"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-stone-200 bg-white text-xs font-medium text-stone-700"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters {isFilterActive && '•'}</span>
            </button>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-stone-600 hidden sm:inline">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(
                    e.target.value as 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'rating' | 'popularity'
                  )
                }
                className="bg-white border border-stone-200 rounded-md py-1.5 pl-2.5 pr-8 text-xs font-medium text-stone-800 focus:outline-none focus:ring-1 cursor-pointer"
              >
                <option value="featured">Featured First</option>
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
          <div className="py-2 flex items-center gap-2 text-xs text-stone-600 flex-wrap">
            <span className="font-medium text-stone-700">Active Filters:</span>
            {selectedCategory !== 'all' && (
              <span className="px-2 py-0.5 rounded bg-white border border-stone-200 flex items-center gap-1">
                Category: {currentCategories.find((c) => c.key === selectedCategory)?.label || selectedCategory}
                <X
                  className="w-3 h-3 cursor-pointer hover:text-stone-900"
                  onClick={() => setSelectedCategory('all')}
                />
              </span>
            )}
            {selectedCollection !== 'all' && (
              <span className="px-2 py-0.5 rounded bg-white border border-stone-200 flex items-center gap-1">
                Collection: {selectedCollection}
                <X
                  className="w-3 h-3 cursor-pointer hover:text-stone-900"
                  onClick={() => setSelectedCollection('all')}
                />
              </span>
            )}
            {selectedSize !== 'all' && (
              <span className="px-2 py-0.5 rounded bg-white border border-stone-200 flex items-center gap-1">
                Size: {selectedSize}
                <X
                  className="w-3 h-3 cursor-pointer hover:text-stone-900"
                  onClick={() => setSelectedSize('all')}
                />
              </span>
            )}
            {selectedColor !== 'all' && (
              <span className="px-2 py-0.5 rounded bg-white border border-stone-200 flex items-center gap-1">
                Color: {selectedColor}
                <X
                  className="w-3 h-3 cursor-pointer hover:text-stone-900"
                  onClick={() => setSelectedColor('all')}
                />
              </span>
            )}
            {priceMax < 35000 && (
              <span className="px-2 py-0.5 rounded bg-white border border-stone-200 flex items-center gap-1">
                Max: ৳{priceMax.toLocaleString()}
                <X
                  className="w-3 h-3 cursor-pointer hover:text-stone-900"
                  onClick={() => setPriceMax(35000)}
                />
              </span>
            )}
            {searchQuery && (
              <span className="px-2 py-0.5 rounded bg-white border border-stone-200 flex items-center gap-1">
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
              className="text-xs font-medium text-stone-500 hover:text-stone-900 flex items-center gap-1 ml-2 underline cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" /> Clear All
            </button>
          </div>
        )}

        {/* Main Grid with Sidebar Filters */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-4">
          {/* Desktop & Mobile Filter Sidebar */}
          <aside
            className={`lg:block ${
              showMobileFilters ? 'block' : 'hidden'
            } col-span-1 space-y-6 bg-white p-5 rounded-xl border border-stone-200/80 shadow-2xs h-fit`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="text-sm font-semibold text-stone-900 flex items-center gap-1.5">
                <SlidersHorizontal className="w-4 h-4" /> Filter Options
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

            {/* Categories List in Sidebar */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-stone-800 block">
                {gender === 'men' ? 'Traditional Categories' : "Women's Wardrobe Categories"}
              </label>
              <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
                {currentCategories.map((c) => {
                  const count = getCategoryCount(c.key);
                  return (
                    <button
                      key={c.key}
                      type="button"
                      onClick={() => setSelectedCategory(c.key)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs flex items-center justify-between transition-colors ${
                        selectedCategory === c.key
                          ? 'bg-stone-900 text-white font-semibold'
                          : 'text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      <span className="truncate">{c.label}</span>
                      <span
                        className={`text-[10px] tabular-nums px-1.5 py-0.2 rounded ${
                          selectedCategory === c.key
                            ? 'bg-stone-800 text-white'
                            : 'bg-stone-100 text-stone-500'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="space-y-2 pt-3 border-t border-stone-100">
              <label className="text-xs font-medium text-stone-800 flex items-center justify-between">
                <span>Maximum Price</span>
                <span className="tabular-nums font-serif font-bold text-stone-900">
                  ৳{priceMax.toLocaleString()}
                </span>
              </label>
              <input
                type="range"
                min="1000"
                max="35000"
                step="500"
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full accent-stone-800 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-600">
                <span>৳1,000</span>
                <span>৳35,000+</span>
              </div>
            </div>

            {/* Color Swatch Filter */}
            <div className="space-y-2 pt-3 border-t border-stone-100">
              <label className="text-xs font-medium text-stone-800 block">Color Palette</label>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedColor('all')}
                  className={`text-[11px] px-2 py-1 rounded border transition-all ${
                    selectedColor === 'all'
                      ? 'bg-stone-900 text-white border-stone-900'
                      : 'border-stone-200 hover:border-stone-400 text-stone-600'
                  }`}
                >
                  All Colors
                </button>
                {availableColors.map((col) => (
                  <button
                    key={col.name}
                    type="button"
                    title={col.name}
                    onClick={() => setSelectedColor(col.name)}
                    className={`w-6 h-6 rounded-full border transition-transform relative ${
                      selectedColor === col.name
                        ? 'scale-115 border-stone-900 ring-2 ring-stone-400'
                        : 'border-stone-300 hover:scale-105'
                    }`}
                    style={{ backgroundColor: col.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Size Filter */}
            <div className="space-y-2 pt-3 border-t border-stone-100">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-stone-800">
                  {gender === 'men' ? 'Tailored Size (Chest)' : 'Garment Size'}
                </label>
                <span className="text-[10px] text-stone-600">
                  {gender === 'women' ? 'Sarees unstitched' : 'Inches'}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => setSelectedSize('all')}
                  className={`px-2.5 py-1 rounded text-xs border ${
                    selectedSize === 'all'
                      ? 'bg-stone-900 text-white border-stone-900'
                      : 'border-stone-200 text-stone-700 hover:border-stone-400'
                  }`}
                >
                  All
                </button>
                {sizeOptions.map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setSelectedSize(sz)}
                    className={`px-2.5 py-1 rounded text-xs border font-medium ${
                      selectedSize === sz
                        ? 'bg-stone-900 text-white border-stone-900'
                        : 'border-stone-200 text-stone-700 hover:border-stone-400'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Cultural Assurance Note */}
            <div
              className="p-3.5 rounded-lg text-xs leading-relaxed border space-y-1"
              style={{
                backgroundColor: gender === 'men' ? '#FAF8F3' : '#FAF5EF',
                borderColor: theme.borderTone,
              }}
            >
              <div className="flex items-center gap-1 font-semibold text-stone-900">
                <Sparkles className="w-3.5 h-3.5 text-[#D4B779]" /> Genuine Handloom Guarantee
              </div>
              <p className="text-[11px] text-stone-600">
                Crafted in Sonargaon, Tangail, Comilla, and Rajshahi artisan centers with pure natural fibers.
              </p>
            </div>
          </aside>

          {/* Product Listing Grid (3 Columns on desktop) */}
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
              /* Empty Search / Filter State */
              <div className="bg-white rounded-xl border border-stone-200/80 p-12 text-center space-y-4 max-w-lg mx-auto my-8">
                <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
                  <Search className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-semibold text-stone-900 font-serif">
                    No matching garments found
                  </h4>
                  <p className="text-xs text-stone-500 font-sans">
                    We couldn&apos;t find any garments matching your current filter criteria.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-4 py-2 rounded-md text-xs font-medium text-white transition-all cursor-pointer shadow-xs"
                  style={{ backgroundColor: theme.primary }}
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
