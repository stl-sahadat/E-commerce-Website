'use client';

import React from 'react';
import { StoreProvider, useStore } from '@/context/StoreContext';
import { Header } from '@/components/layout/Header';
import { HeroSection } from '@/components/home/HeroSection';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { CuratedHighlights } from '@/components/home/CuratedHighlights';
import { FeaturedOccasions } from '@/components/home/FeaturedOccasions';
import { ShopCatalog } from '@/components/catalog/ShopCatalog';
import { CraftsmanshipStory } from '@/components/home/CraftsmanshipStory';
import { NewsletterSection } from '@/components/home/NewsletterSection';
import { Footer } from '@/components/layout/Footer';
import { ProductDetailsModal } from '@/components/catalog/ProductDetailsModal';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { WishlistModal } from '@/components/wishlist/WishlistModal';
import { CheckoutModal } from '@/components/checkout/CheckoutModal';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { Product } from '@/types';
import { Check } from 'lucide-react';

function StorefrontContent() {
  const {
    gender,
    theme,
    selectedProduct,
    setSelectedProduct,
    setSelectedCategory,
    setSelectedCollection,
    notification,
  } = useStore();

  const handleShopNow = () => {
    const el = document.getElementById('catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectCategory = (catKey: string) => {
    setSelectedCategory(catKey);
    const el = document.getElementById('catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectCollection = (colKey: string) => {
    setSelectedCategory('all');
    setSelectedCollection(colKey);
    const el = document.getElementById('catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className="min-h-screen flex flex-col font-sans selection:bg-[#D4B779]/20 transition-colors duration-500"
      style={{
        backgroundColor: theme.canvasBg,
      }}
    >
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-20 right-6 z-50 bg-stone-900 text-white text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 border border-stone-700 animate-bounce">
          <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
            <Check className="w-3 h-3" />
          </div>
          <span>{notification}</span>
        </div>
      )}

      {/* Main Responsive Header */}
      <Header
        onOpenCatalog={handleShopNow}
      />

      <main className="flex-1">
        {/* 1. Main Promotional Hero */}
        <HeroSection
          onShopNow={handleShopNow}
          onExploreOccasion={handleSelectCollection}
        />

        {/* 2. Shop by Category */}
        <CategoryGrid onSelectCategory={handleSelectCategory} />

        {/* 3 & 4. New Arrivals & Best Sellers Highlights */}
        <CuratedHighlights
          onOpenProduct={(prod) => setSelectedProduct(prod)}
          onViewAllCatalog={handleShopNow}
        />

        {/* 5 & 6. Occasion-based Collections (Eid & Wedding) */}
        <FeaturedOccasions onSelectCollection={handleSelectCollection} />

        {/* Complete Product Catalog & Discovery System */}
        <ShopCatalog
          onOpenProductDetails={(prod) => setSelectedProduct(prod)}
        />

        {/* 7. Brand Story & Craftsmanship Section */}
        <CraftsmanshipStory />

        {/* 8. Newsletter Subscription with Coupon */}
        <NewsletterSection />
      </main>

      {/* Floating WhatsApp Concierge Button (Bangladeshi Retail Conversion Best-Practice) */}
      <a
        href="https://wa.me/8801700000000?text=%E0%A6%B8%E0%A6%BE%E0%A6%B2%E0%A6%BE%E0%A6%AE%E0%A7%81%20%E0%A6%86%E0%A6%B2%E0%A6%BE%E0%A6%87%E0%A6%95%E0%A7%81%E0%A6%AE%2C%20%E0%A6%87%E0%A6%B8%E0%A6%AE%E0%A6%BE%E0%A6%87%E0%A6%B2%20%E0%A6%AB%E0%A7%8D%E0%A6%AF%E0%A6%BE%E0%A6%B6%E0%A6%A8%20%E0%A6%A5%E0%A7%87%E0%A6%95%E0%A7%87%20%E0%A6%85%E0%A6%B0%E0%A7%8D%E0%A6%A1%E0%A6%BE%E0%A6%B0%20%E0%A6%93%20%E0%A6%AA%E0%A6%B0%E0%A6%BE%E0%A6%AE%E0%A6%B0%E0%A7%8D%E0%A6%B6%E0%A7%87%E0%A6%B0%20%E0%A6%9C%E0%A6%A8%E0%A7%8D%E0%A6%AF%20%E0%A6%AF%E0%A7%8B%E0%A6%97%E0%A6%BE%E0%A6%AF%E0%A7%8B%E0%A6%97%20%E0%A6%95%E0%A6%B0%E0%A6%9B%E0%A6%BF%E0%A7%87"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Helpline"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-2xl hover:bg-[#20bd5a] hover:scale-105 transition-all group border border-white/20"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
        <span className="hidden sm:inline font-semibold text-xs tracking-wide">
          WhatsApp হেল্পলাইন
        </span>
      </a>

      {/* 9. Professional Retail Footer */}
      <Footer />

      {/* Modals & Slide-over Drawers */}
      <ProductDetailsModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onSelectRelated={(rel) => setSelectedProduct(rel)}
      />

      <CartDrawer />
      <WishlistModal onOpenProduct={(p) => setSelectedProduct(p)} />
      <CheckoutModal />
      <AdminDashboard />
    </div>
  );
}

export default function Home() {
  return (
    <StoreProvider>
      <StorefrontContent />
    </StoreProvider>
  );
}
