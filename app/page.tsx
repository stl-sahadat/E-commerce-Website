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
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 border border-stone-700 animate-bounce">
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
