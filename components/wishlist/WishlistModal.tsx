'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { GarmentVisual } from '@/components/garment/GarmentVisual';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '@/types';

interface WishlistModalProps {
  onOpenProduct: (product: Product) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({ onOpenProduct }) => {
  const {
    theme,
    wishlist,
    toggleWishlist,
    addToCart,
    isWishlistOpen,
    setIsWishlistOpen,
  } = useStore();

  if (!isWishlistOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6 bg-black/50 backdrop-blur-xs">
      <div className="fixed inset-0" onClick={() => setIsWishlistOpen(false)} />

      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 z-10 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50/70 shrink-0">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            <h3 className="font-serif text-lg font-semibold text-stone-900">
              Saved Garments ({wishlist.length})
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setIsWishlistOpen(false)}
            className="p-1 rounded-md text-stone-400 hover:text-stone-800"
            aria-label="Close wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          {wishlist.length > 0 ? (
            wishlist.map(({ product }) => (
              <div
                key={product.id}
                className="flex items-center justify-between gap-4 p-3 rounded-xl border border-stone-200/80 hover:bg-stone-50 transition-colors"
              >
                <div
                  className="flex items-center gap-3 cursor-pointer min-w-0"
                  onClick={() => {
                    setIsWishlistOpen(false);
                    onOpenProduct(product);
                  }}
                >
                  <div className="w-14 h-16 rounded overflow-hidden bg-stone-100 shrink-0 border border-stone-200/60">
                    <GarmentVisual
                      silhouette={product.silhouetteType}
                      activeColor={product.colors[0]}
                      gender={product.gender}
                      className="w-full h-full"
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] uppercase tracking-wider text-stone-600 block">
                      {product.subCategory}
                    </span>
                    <h4 className="text-xs sm:text-sm font-medium text-stone-900 truncate">
                      {product.name}
                    </h4>
                    <span className="text-xs font-serif font-bold text-stone-900 tabular-nums">
                      ৳{product.price.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      const color = product.colors[0] || { name: 'Default', hex: '#17382F' };
                      const size = product.sizes.length > 0 ? product.sizes[0] : 'Standard';
                      addToCart(product, color, size, 1);
                    }}
                    className="p-2 rounded-lg bg-stone-900 text-white hover:bg-stone-800 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Add to Bag</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleWishlist(product)}
                    className="p-2 text-stone-400 hover:text-red-600 transition-colors"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
                <Heart className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-base font-semibold text-stone-800">
                No items saved yet
              </h4>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Click the heart icon on any Panjabi, Saree, or Three-piece to save it for later.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-200 bg-stone-50/70 flex justify-end shrink-0">
          <button
            type="button"
            onClick={() => setIsWishlistOpen(false)}
            className="px-4 py-2 rounded-lg text-xs font-medium border border-stone-300 text-stone-700 hover:bg-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
