'use client';

import React, { useState } from 'react';
import { Product, ProductColor } from '@/types';
import { useStore } from '@/context/StoreContext';
import { GarmentVisual } from '@/components/garment/GarmentVisual';
import { Heart, Eye, ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenDetails }) => {
  const { theme, toggleWishlist, isInWishlist, addToCart } = useStore();
  const [selectedColor, setSelectedColor] = useState<ProductColor>(
    product.colors[0] || { name: 'Default', hex: '#17382F' }
  );
  const [isHovered, setIsHovered] = useState(false);
  const [viewTexture, setViewTexture] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultSize = product.sizes.length > 0 ? product.sizes[0] : 'Standard';
    addToCart(product, selectedColor, defaultSize, 1);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div
      onClick={() => onOpenDetails(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setViewTexture(false);
      }}
      className="group relative rounded-xl border border-stone-200/90 bg-white hover:border-stone-300 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col hover:shadow-lg"
    >
      {/* Product Image Slot */}
      <div className="relative aspect-4/5 w-full overflow-hidden bg-stone-50 border-b border-stone-100">
        <GarmentVisual
          silhouette={product.silhouetteType}
          activeColor={selectedColor}
          viewMode={viewTexture ? 'fabric-texture' : 'full'}
          gender={product.gender}
          isHovered={isHovered}
          className="w-full h-full"
        />

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleWishlistClick}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-xs text-stone-600 hover:text-red-600 shadow-2xs hover:scale-110 transition-all z-10"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorited ? 'fill-red-500 text-red-500' : ''
            }`}
          />
        </button>

        {/* Collection / Discount Tag (Single subtle text label, anti-slop) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
          {product.discountPercent && (
            <span
              className="text-[10px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-sm text-white"
              style={{ backgroundColor: theme.primary }}
            >
              Save {product.discountPercent}%
            </span>
          )}
          {product.isNewArrival && !product.discountPercent && (
            <span className="text-[10px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-sm bg-stone-900 text-white">
              New Arrival
            </span>
          )}
        </div>

        {/* Texture toggle trigger on hover */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setViewTexture(!viewTexture);
          }}
          className="absolute bottom-3 left-3 text-[10px] font-sans font-medium px-2 py-1 rounded bg-stone-900/80 hover:bg-stone-900 text-white backdrop-blur-xs transition-opacity opacity-0 group-hover:opacity-100"
        >
          {viewTexture ? 'View Garment' : 'Inspect Weave'}
        </button>

        {/* Quick View / Add to Cart Overlay on Hover (Desktop) */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200">
          <button
            type="button"
            onClick={handleQuickAdd}
            title="Quick Add to Bag"
            className="p-2 rounded-full bg-white hover:bg-stone-50 text-stone-900 shadow-md hover:scale-105 transition-all"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails(product);
            }}
            title="View Details"
            className="p-2 rounded-full bg-white hover:bg-stone-50 text-stone-900 shadow-md hover:scale-105 transition-all"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="space-y-1.5">
          {/* Category & Fabric quiet metadata */}
          <div className="flex items-center justify-between text-[11px] text-stone-500 font-sans tracking-wide">
            <span className="uppercase">{product.subCategory}</span>
            <span className="truncate max-w-[120px]">{product.fabric.split(' ')[0]}</span>
          </div>

          {/* Product Title */}
          <h3 className="text-sm font-medium text-stone-900 line-clamp-2 leading-snug group-hover:text-stone-700 transition-colors">
            {product.name}
          </h3>

          {/* Bangla Name Subtitle */}
          {product.banglaName && (
            <p className="text-[11px] font-serif text-stone-600 line-clamp-1 italic">
              {product.banglaName}
            </p>
          )}
        </div>

        {/* Colors & Price Section */}
        <div className="pt-3 mt-2 border-t border-stone-100 space-y-2">
          {/* Color swatch buttons */}
          {product.colors.length > 1 && (
            <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  title={c.name}
                  onClick={() => setSelectedColor(c)}
                  className={`w-3.5 h-3.5 rounded-full border transition-transform ${
                    selectedColor.name === c.name
                      ? 'scale-125 border-stone-900 ring-1 ring-stone-400'
                      : 'border-stone-300 hover:scale-110'
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
              <span className="text-[10px] text-stone-600 ml-1">
                {product.colors.length} shades
              </span>
            </div>
          )}

          {/* Price & Stock */}
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-base font-serif font-bold text-stone-900 tabular-nums">
                ৳{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-stone-600 line-through tabular-nums">
                  ৳{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {product.stock <= 8 && (
              <span className="text-[10px] font-medium text-amber-700 tracking-tight">
                Only {product.stock} left
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
