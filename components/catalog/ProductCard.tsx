'use client';

import React, { useState } from 'react';
import { Product, ProductColor } from '@/types';
import { useStore } from '@/context/StoreContext';
import { GarmentVisual } from '@/components/garment/GarmentVisual';
import { Heart, Eye, ShoppingBag, MapPin, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenDetails }) => {
  const { theme, toggleWishlist, isInWishlist, addToCart, showNotification } = useStore();
  const [selectedColor, setSelectedColor] = useState<ProductColor>(
    product.colors[0] || { name: 'Default', hex: '#17382F' }
  );
  const [isHovered, setIsHovered] = useState(false);
  const [viewTexture, setViewTexture] = useState(false);
  const [addedSize, setAddedSize] = useState<string | null>(null);

  const isFavorited = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent, size?: string) => {
    e.stopPropagation();
    const targetSize = size || (product.sizes.length > 0 ? product.sizes[0] : 'Standard');
    addToCart(product, selectedColor, targetSize, 1);
    setAddedSize(targetSize);
    showNotification(`ব্যাগে যুক্ত হয়েছে: ${product.name} (সাইজ: ${targetSize})`);
    setTimeout(() => setAddedSize(null), 1800);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  // Determine top-left craft badge
  const getCraftBadge = () => {
    if (product.collection === 'wedding') return { label: 'Wedding Atelier', bg: 'bg-[#581825]' };
    if (product.collection === 'eid') return { label: 'Eid Edit 2026', bg: 'bg-[#17382F]' };
    if (product.discountPercent) return { label: `${product.discountPercent}% Off`, bg: 'bg-[#8C273D]' };
    if (product.isNewArrival) return { label: 'New Arrival', bg: 'bg-stone-900' };
    if (product.isBestSeller) return { label: 'Best Seller', bg: 'bg-[#4A3D22]' };
    return null;
  };

  const craftBadge = getCraftBadge();
  const hasSizes = product.sizes && product.sizes.length > 0;

  return (
    <div
      onClick={() => onOpenDetails(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setViewTexture(false);
      }}
      className="group relative rounded-xl border border-stone-200/90 bg-white hover:border-stone-400 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col hover:shadow-xl hover:-translate-y-0.5"
    >
      {/* Product Image Slot */}
      <div className="relative aspect-4/5 w-full overflow-hidden bg-stone-100/70 border-b border-stone-100">
        {product.image && !viewTexture ? (
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover object-top transition-transform duration-700 ease-out ${
              isHovered ? 'scale-105' : 'scale-100'
            }`}
            loading="lazy"
          />
        ) : (
          <GarmentVisual
            silhouette={product.silhouetteType}
            activeColor={selectedColor}
            viewMode={viewTexture ? 'fabric-texture' : 'full'}
            gender={product.gender}
            isHovered={isHovered}
            className="w-full h-full"
          />
        )}

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

        {/* Collection / Craft Tag (Aza & Khunchi luxury badge) */}
        {craftBadge && (
          <div className="absolute top-3 left-3 flex flex-col gap-1 items-start z-10">
            <span
              className={`text-[9px] font-medium tracking-widest uppercase px-2 py-0.5 rounded-sm text-white shadow-xs ${craftBadge.bg}`}
            >
              {craftBadge.label}
            </span>
          </div>
        )}

        {/* Texture toggle trigger on hover */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setViewTexture(!viewTexture);
          }}
          className="absolute top-10 left-3 text-[9px] font-sans font-medium px-2 py-0.5 rounded bg-stone-900/80 hover:bg-stone-900 text-white backdrop-blur-xs transition-opacity opacity-0 group-hover:opacity-100 z-10"
        >
          {viewTexture ? 'Full Garment' : 'Inspect Weave'}
        </button>

        {/* Aza Fashions Style: Quick Size Selector Bar on Hover */}
        {hasSizes && (
          <div className="absolute inset-x-2 bottom-2.5 p-2 rounded-lg bg-white/95 backdrop-blur-md shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200 z-10 border border-stone-200/80">
            <div className="flex items-center justify-between mb-1.5 text-[10px] text-stone-600 font-sans">
              <span className="font-semibold uppercase tracking-wider text-stone-800">Quick Size Select:</span>
              <span className="text-stone-400">Click to add</span>
            </div>
            <div className="flex items-center gap-1.5 justify-start overflow-x-auto">
              {product.sizes.map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={(e) => handleQuickAdd(e, sz)}
                  className={`px-2 py-1 text-[11px] font-semibold rounded border transition-all ${
                    addedSize === sz
                      ? 'bg-emerald-600 text-white border-emerald-600 scale-105'
                      : 'bg-stone-50 hover:bg-stone-900 hover:text-white border-stone-200 text-stone-800'
                  }`}
                  title={`Add Size ${sz} to Bag`}
                >
                  {addedSize === sz ? <Check className="w-3 h-3 inline" /> : sz}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* For products without sizes (Sarees, Dupattas, Hijabs), Quick Add & View on hover */}
        {!hasSizes && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200 z-10">
            <button
              type="button"
              onClick={(e) => handleQuickAdd(e)}
              title="Quick Add to Bag"
              className="p-2 rounded-full bg-white hover:bg-stone-900 hover:text-white text-stone-900 shadow-md hover:scale-105 transition-all"
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
              className="p-2 rounded-full bg-white hover:bg-stone-900 hover:text-white text-stone-900 shadow-md hover:scale-105 transition-all"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Card Content & Metadata */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="space-y-1.5">
          {/* Category & Fabric quiet metadata (Khunchi style) */}
          <div className="flex items-center justify-between text-[10px] text-stone-500 font-sans tracking-wider uppercase font-semibold">
            <span>{product.subCategory}</span>
            <span className="truncate max-w-[130px] font-normal lowercase">{product.fabric.split(' ')[0]} {product.fabric.split(' ')[1] || ''}</span>
          </div>

          {/* Product Title */}
          <h3 className="text-sm font-medium text-stone-900 line-clamp-2 leading-snug group-hover:text-stone-700 transition-colors">
            {product.name}
          </h3>

          {/* Bangla Name Subtitle */}
          {product.banglaName && (
            <p className="text-[11px] font-serif text-stone-600 line-clamp-1 italic font-bangla">
              {product.banglaName}
            </p>
          )}

          {/* Fabindia-Style Weave Origin Badge */}
          {product.details?.weaveOrigin && (
            <div className="flex items-center gap-1 text-[10px] text-stone-500 font-sans pt-0.5">
              <MapPin className="w-2.5 h-2.5 text-[#D4B779] shrink-0" />
              <span className="truncate">{product.details.weaveOrigin.split(',')[0]}</span>
            </div>
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
              <span className="text-[10px] text-stone-500 ml-1">
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
                <span className="text-xs text-stone-500 line-through tabular-nums">
                  ৳{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {product.stock <= 8 && (
              <span className="text-[10px] font-medium text-amber-700 tracking-tight font-bangla">
                মাত্র {product.stock} টি বাকি
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

