'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import {
  Search,
  ShoppingBag,
  Heart,
  SlidersHorizontal,
  Menu,
  X,
  Phone,
  MapPin,
  Sparkles,
  ChevronDown,
} from 'lucide-react';

interface HeaderProps {
  onNavigateSection?: (sectionId: string) => void;
  onOpenCatalog?: () => void;
}

interface NavItem {
  label: string;
  category?: string;
  filter?: string;
  id?: string;
  subItems?: { label: string; category?: string; filter?: string }[];
}

export const Header: React.FC<HeaderProps> = ({ onNavigateSection, onOpenCatalog }) => {
  const {
    gender,
    setGender,
    theme,
    cartCount,
    cartSubtotal,
    setIsCartOpen,
    wishlist,
    setIsWishlistOpen,
    setIsAdminOpen,
    searchQuery,
    setSearchQuery,
    setSelectedCategory,
    setSelectedCollection,
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [sareeDropdownOpen, setSareeDropdownOpen] = useState(false);
  const [mobileSareeOpen, setMobileSareeOpen] = useState(false);

  const menNavLinks: NavItem[] = [
    { label: 'Home', id: 'hero' },
    { label: "All Men's Wear", category: 'all' },
    { label: 'Panjabi', category: 'panjabi' },
    { label: 'Kabli & Kurta', category: 'kabli-kurta' },
    { label: 'Pajama Sets', category: 'pajama-sets' },
    { label: 'Waistcoats', category: 'waistcoats' },
    { label: 'New Arrivals', filter: 'new-arrivals' },
    { label: 'Festival', filter: 'festival' },
    { label: 'Wedding', filter: 'wedding' },
    { label: 'Brand Heritage', id: 'story' },
    { label: 'Contact', id: 'footer' },
  ];

  const womenNavLinks: NavItem[] = [
    { label: 'Home', id: 'hero' },
    { label: "All Women's Wear", category: 'all' },
    {
      label: 'All Sarees',
      category: 'sarees',
      subItems: [
        { label: 'All Sarees Collection', category: 'sarees' },
        { label: 'Dhakai Jamdani Saree', category: 'jamdani-saree' },
        { label: 'Rajshahi Pure Silk Saree', category: 'silk-saree' },
        { label: 'Tangail Cotton Saree', category: 'cotton-saree' },
        { label: 'Traditional Tant Saree', category: 'tant-saree' },
        { label: 'Party and Wedding Saree', category: 'party-wedding-saree' },
      ],
    },
    { label: 'Three Piece', category: 'three-piece' },
    { label: 'Salwar Kameez', category: 'salwar-kameez' },
    { label: 'Kurti', category: 'kurtis' },
    { label: 'Lehenga & Party', category: 'lehenga' },
    { label: 'Hijab', category: 'hijab' },
    { label: 'Dupatta & Orna', category: 'dupatta-orna' },
    { label: 'New Arrivals', filter: 'new-arrivals' },
    { label: 'Best Sellers', filter: 'best-sellers' },
    { label: 'Eid Collection', filter: 'eid' },
    { label: 'Wedding Collection', filter: 'wedding' },
    { label: 'Brand Heritage', id: 'story' },
    { label: 'Contact', id: 'footer' },
  ];

  const currentNav = gender === 'men' ? menNavLinks : womenNavLinks;

  const handleLinkClick = (item: { category?: string; filter?: string; id?: string }) => {
    setMobileMenuOpen(false);
    setSareeDropdownOpen(false);
    if (item.category) {
      setSelectedCategory(item.category);
      setSelectedCollection('all');
      if (onOpenCatalog) onOpenCatalog();
      else {
        const el = document.getElementById('catalog');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (item.filter) {
      setSelectedCategory('all');
      setSelectedCollection(item.filter);
      if (onOpenCatalog) onOpenCatalog();
      else {
        const el = document.getElementById('catalog');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (item.id) {
      const el = document.getElementById(item.id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      else if (onNavigateSection) onNavigateSection(item.id);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onOpenCatalog) onOpenCatalog();
    const el = document.getElementById('catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md shadow-xs transition-colors duration-500">
      {/* Top micro-announcement bar */}
      <div
        className="w-full text-xs font-medium py-1.5 px-4 text-center transition-colors duration-500 flex items-center justify-between"
        style={{
          backgroundColor: theme.charcoalOrBurgundy,
          color: '#F7F4EC',
        }}
      >
        <div className="hidden md:flex items-center gap-4 text-[11px] opacity-80">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-[#D4B779]" /> Flagship Atelier: Banani &amp; Gulshan, Dhaka
          </span>
          <span className="opacity-50">·</span>
          <span className="flex items-center gap-1">
            <Phone className="w-3 h-3 text-[#D4B779]" /> +880 1700-000000
          </span>
        </div>

        <div className="mx-auto md:mx-0 flex items-center gap-1 text-[11px] sm:text-xs tracking-wide">
          <Sparkles className="w-3 h-3 text-[#D4B779]" />
          <span>Complimentary Express Delivery on orders above ৳5,000 · Cash on Delivery</span>
        </div>

        <div className="hidden md:flex items-center gap-3 text-[11px]">
          <button
            onClick={() => setIsAdminOpen(true)}
            className="hover:text-[#D4B779] transition-colors cursor-pointer flex items-center gap-1"
          >
            <SlidersHorizontal className="w-3 h-3" /> Store Admin
          </button>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Mobile menu trigger */}
        <div className="flex items-center lg:hidden gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="p-1.5 text-stone-700 hover:text-stone-900 rounded-md"
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <button
            type="button"
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            className="p-1.5 text-stone-700 hover:text-stone-900 rounded-md"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* Brand Logo & Wordmark */}
        <div className="flex items-baseline gap-2.5">
          <a
            href="#hero"
            className="group flex flex-col items-start leading-none"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById('hero');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span
              className="text-xl sm:text-2xl font-serif tracking-[0.18em] font-bold transition-colors duration-300"
              style={{ color: theme.primary }}
            >
              ISMAIL FASHION
            </span>
            <span className="text-[9px] font-bangla tracking-wider uppercase text-stone-600 font-semibold pl-0.5">
              ইসমাইল ফ্যাশন · প্রিমিয়াম ট্র্যাডিশনাল
            </span>
          </a>
        </div>

        {/* Desktop Product Search */}
        <div className="hidden lg:flex flex-1 max-w-md mx-6">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input
              type="text"
              placeholder={
                gender === 'men'
                  ? 'Search Panjabi, Kabli, Silk sets, Koti...'
                  : 'Search Jamdani Sarees, Three Piece, Kurtis, Hijabs, Lehengas...'
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs font-sans pl-10 pr-4 py-2 rounded-full border border-stone-200 bg-stone-50/70 focus:bg-white focus:outline-none focus:ring-1 transition-all"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs"
              >
                Clear
              </button>
            )}
          </form>
        </div>

        {/* Dual Gender Switcher & Action Icons */}
        <div className="flex items-center gap-3 sm:gap-5 shrink-0">
          {/* Visible Men / Women Selector */}
          <div
            className="flex items-center p-0.5 rounded-full border border-stone-200/90 bg-stone-100 text-xs font-medium shadow-xs"
            role="tablist"
            aria-label="Choose Shopping Experience"
          >
            <button
              type="button"
              role="tab"
              aria-selected={gender === 'men'}
              onClick={() => {
                setGender('men');
              }}
              className={`px-3 sm:px-4 py-1.5 rounded-full transition-all duration-300 whitespace-nowrap cursor-pointer text-xs font-sans ${
                gender === 'men'
                  ? 'bg-[#17382F] text-[#F7F4EC] shadow-sm font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Men&apos;s Collection
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={gender === 'women'}
              onClick={() => {
                setGender('women');
              }}
              className={`px-3 sm:px-4 py-1.5 rounded-full transition-all duration-300 whitespace-nowrap cursor-pointer text-xs font-sans ${
                gender === 'women'
                  ? 'bg-[#6B2838] text-[#F7EFE6] shadow-sm font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Women&apos;s Collection
            </button>
          </div>

          {/* Wishlist Button */}
          <button
            type="button"
            onClick={() => setIsWishlistOpen(true)}
            className="relative p-2 text-stone-700 hover:text-stone-950 transition-colors cursor-pointer"
            aria-label={`Wishlist with ${wishlist.length} saved items`}
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span
                className="absolute top-1 right-1 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center text-white"
                style={{ backgroundColor: theme.primary }}
              >
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Shopping Bag Button */}
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-full border border-stone-200 hover:border-stone-300 bg-stone-50 hover:bg-stone-100 transition-all cursor-pointer group"
            aria-label={`Shopping bag with ${cartCount} items, total ৳${cartSubtotal.toLocaleString()}`}
          >
            <div className="relative">
              <ShoppingBag
                className="w-5 h-5 transition-transform group-hover:scale-105"
                style={{ color: theme.primary }}
              />
              {cartCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center text-white"
                  style={{ backgroundColor: theme.primary }}
                >
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline text-xs font-semibold tabular-nums text-stone-800">
              ৳{cartSubtotal.toLocaleString()}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile search bar dropdown */}
      {mobileSearchOpen && (
        <div className="lg:hidden px-4 pb-3 pt-1 border-t border-stone-100 bg-white">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input
              type="text"
              placeholder={
                gender === 'men'
                  ? 'Search Panjabi, Kabli, Koti...'
                  : 'Search Jamdani Sarees, Three Piece, Hijabs...'
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs font-sans pl-10 pr-4 py-2.5 rounded-lg border border-stone-200 bg-stone-50"
              autoFocus
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </form>
        </div>
      )}

      {/* Secondary Category Navigation Bar (Desktop) */}
      <nav
        className="hidden lg:block border-t border-b border-stone-100 transition-colors duration-500"
        style={{
          backgroundColor: gender === 'men' ? '#FAF8F3' : '#FAF5EF',
        }}
        aria-label="Collection categories"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-5 py-2 overflow-x-auto text-xs font-medium tracking-wide">
            {currentNav.map((link) => {
              if (link.subItems) {
                return (
                  <div
                    key={link.label}
                    className="relative group"
                    onMouseEnter={() => setSareeDropdownOpen(true)}
                    onMouseLeave={() => setSareeDropdownOpen(false)}
                  >
                    <button
                      type="button"
                      onClick={() => handleLinkClick(link)}
                      className="text-stone-700 hover:text-stone-950 py-1 transition-colors relative whitespace-nowrap cursor-pointer flex items-center gap-1 font-semibold"
                    >
                      <span>{link.label}</span>
                      <ChevronDown className="w-3 h-3 text-stone-400 group-hover:rotate-180 transition-transform" />
                    </button>

                    {/* Saree Dropdown Menu */}
                    {sareeDropdownOpen && (
                      <div className="absolute top-full left-0 z-50 w-56 bg-white border border-stone-200 shadow-xl rounded-xl py-2 mt-0 animate-in fade-in slide-in-from-top-1 duration-150">
                        {link.subItems.map((sub) => (
                          <button
                            key={sub.label}
                            type="button"
                            onClick={() => handleLinkClick(sub)}
                            className="w-full text-left px-4 py-2 text-xs text-stone-700 hover:bg-stone-50 hover:text-stone-950 transition-colors flex items-center justify-between"
                          >
                            <span>{sub.label}</span>
                            <span className="text-stone-300 text-[10px]">→</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => handleLinkClick(link)}
                  className="text-stone-700 hover:text-stone-950 py-1 transition-colors relative whitespace-nowrap cursor-pointer hover:underline underline-offset-4 decoration-1"
                  style={{
                    textDecorationColor: theme.accentGold,
                  }}
                >
                  {link.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 overflow-y-auto">
            {/* Drawer Header */}
            <div
              className="p-4 flex items-center justify-between border-b"
              style={{ backgroundColor: theme.canvasBg }}
            >
              <div>
                <span
                  className="text-lg font-serif tracking-[0.15em] font-bold"
                  style={{ color: theme.primary }}
                >
                  ISMAIL FASHION
                </span>
                <p className="text-[10px] text-stone-600 font-bangla">
                  ইসমাইল ফ্যাশন · {gender === 'men' ? 'পুরুষদের পোশাক' : 'মহিলাদের পোশাক'}
                </p>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-md text-stone-500 hover:text-stone-800"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Gender Switcher */}
            <div className="p-4 border-b border-stone-100 bg-stone-50">
              <label className="text-[11px] uppercase tracking-wider text-stone-500 block mb-2 font-medium">
                Switch Experience
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setGender('men');
                  }}
                  className={`py-2 text-xs font-medium rounded-md border text-center transition-all ${
                    gender === 'men'
                      ? 'bg-[#17382F] text-[#F7F4EC] border-[#17382F] font-semibold shadow-xs'
                      : 'bg-white text-stone-700 border-stone-200'
                  }`}
                >
                  Men&apos;s Wear
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setGender('women');
                  }}
                  className={`py-2 text-xs font-medium rounded-md border text-center transition-all ${
                    gender === 'women'
                      ? 'bg-[#6B2838] text-[#F7EFE6] border-[#6B2838] font-semibold shadow-xs'
                      : 'bg-white text-stone-700 border-stone-200'
                  }`}
                >
                  Women&apos;s Wear
                </button>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 py-3 px-4 space-y-1">
              {currentNav.map((link) => {
                if (link.subItems) {
                  return (
                    <div key={link.label} className="border-b border-stone-100 pb-1 mb-1">
                      <button
                        type="button"
                        onClick={() => setMobileSareeOpen(!mobileSareeOpen)}
                        className="w-full text-left py-2.5 px-3 rounded-md text-sm font-semibold text-stone-900 flex items-center justify-between"
                      >
                        <span>{link.label}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-stone-400 transition-transform ${
                            mobileSareeOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {mobileSareeOpen && (
                        <div className="pl-4 space-y-1 pt-1 pb-2 bg-stone-50/50 rounded-lg">
                          {link.subItems.map((sub) => (
                            <button
                              key={sub.label}
                              type="button"
                              onClick={() => handleLinkClick(sub)}
                              className="w-full text-left py-2 px-3 text-xs text-stone-700 hover:text-stone-950 flex items-center justify-between"
                            >
                              <span>{sub.label}</span>
                              <span className="text-stone-300 text-[10px]">→</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <button
                    key={link.label}
                    type="button"
                    onClick={() => handleLinkClick(link)}
                    className="w-full text-left py-2.5 px-3 rounded-md text-sm font-medium text-stone-800 hover:bg-stone-50 transition-colors flex items-center justify-between"
                  >
                    <span>{link.label}</span>
                    <span className="text-stone-300 text-xs">→</span>
                  </button>
                );
              })}
            </div>

            {/* Drawer Footer Actions */}
            <div className="p-4 border-t border-stone-100 space-y-2 bg-stone-50/50">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAdminOpen(true);
                }}
                className="w-full py-2 px-3 text-xs text-stone-600 hover:text-stone-900 border border-stone-200 rounded-md bg-white flex items-center justify-center gap-2"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" /> Store Admin Dashboard
              </button>
              <div className="text-[11px] text-stone-500 text-center pt-2">
                Traditional Bangladeshi Craftsmanship
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
