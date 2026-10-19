'use client';

import React, { useState } from 'react';
import { Product, ProductColor } from '@/types';
import { useStore } from '@/context/StoreContext';
import { GarmentVisual } from '@/components/garment/GarmentVisual';
import { Heart, ShoppingBag, Check } from 'lucide-react';

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
  const [addedSize, setAddedSize] = useState<string | null>(null);

  const isFavorited = isInWishlist(product.id);
  const isWomen = product.gender === 'women';
  const hasSizes = product.sizes && product.sizes.length > 0;

  const handleQuickAdd = (e: React.MouseEvent, size?: string) => {
    e.stopPropagation();
    const targetSize = size || (hasSizes ? product.sizes[0] : 'Standard');
    addToCart(product, selectedColor, targetSize, 1);
    setAddedSize(targetSize);
    showNotification(`ব্যাগে যুক্ত হয়েছে: ${product.name} (সাইজ: ${targetSize})`);
    setTimeout(() => setAddedSize(null), 1800);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const cleanTitle = product.name.replace(/^ISMAIL FASHION\s+/i, '');

  return (
    <div
      onClick={() => onOpenDetails(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded-xl border border-stone-200/90 bg-white hover:border-stone-400 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col hover:shadow-xl hover:-translate-y-0.5"
    >
      {/* Product Image Slot (Clean Retail Presentation - Tahar & Khunchi Style) */}
      <div className="relative aspect-4/5 w-full overflow-hidden bg-stone-100/70 border-b border-stone-100">
        {product.image ? (
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
            gender={product.gender}
            isHovered={isHovered}
            className="w-full h-full"
          />
        )}

        {/* Clean Circular Wishlist Button (Aza & Khunchi style) */}
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
      </div>

      {/* Card Content & Metadata */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="space-y-1.5">
          {/* Breadcrumb Tag (Khunchi Style: WOMEN / SAREES or MEN / PANJABI) */}
          <div className="flex items-center justify-between text-[10px] font-sans tracking-wider uppercase font-bold">
            <span
              style={{
                color: isWomen ? '#8C273D' : '#17382F',
              }}
            >
              {isWomen ? `WOMEN / ${product.subCategory.toUpperCase()}` : `MEN / ${product.subCategory.toUpperCase()}`}
            </span>
            <span className="text-stone-400 font-normal lowercase">{product.fabric.split(' ')[0]}</span>
          </div>

          {/* Product Title */}
          {isWomen ? (
            /* Khunchi Style: Poetic Bengali Name - English Category */
            <div>
              <h3 className="text-sm font-semibold text-stone-900 line-clamp-1 leading-snug group-hover:text-stone-700 transition-colors">
                {product.banglaName} – {cleanTitle}
              </h3>
            </div>
          ) : (
            /* Tahar Style: Clean Uppercase Heading + Bangla Subtitle */
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wide text-stone-900 line-clamp-1 leading-snug group-hover:text-stone-700 transition-colors">
                {cleanTitle}
              </h3>
              {product.banglaName && (
                <p className="text-[11px] font-bangla text-stone-600 line-clamp-1 not-italic font-medium mt-0.5">
                  {product.banglaName}
                </p>
              )}
            </div>
          )}

          {/* Colors Swatches (If multi-color) */}
          {product.colors.length > 1 && (
            <div className="flex items-center gap-1.5 pt-1" onClick={(e) => e.stopPropagation()}>
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  title={c.name}
                  onClick={() => setSelectedColor(c)}
                  className={`w-3 h-3 rounded-full border transition-transform ${
                    selectedColor.name === c.name
                      ? 'scale-125 border-stone-900 ring-1 ring-stone-400'
                      : 'border-stone-300 hover:scale-110'
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
              <span className="text-[10px] text-stone-400 ml-1">
                {product.colors.length} shades
              </span>
            </div>
          )}
        </div>

        {/* Price & Action Section */}
        <div className="pt-3 mt-2 border-t border-stone-100 space-y-2">
          {/* Price & Stock */}
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold text-stone-900 tabular-nums">
                {isWomen ? `Tk ${product.price.toLocaleString()}` : `BDT ${product.price.toLocaleString()}`}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-stone-400 line-through tabular-nums">
                  {isWomen ? `Tk ${product.originalPrice.toLocaleString()}` : `BDT ${product.originalPrice.toLocaleString()}`}
                </span>
              )}
            </div>

            {product.discountPercent ? (
              <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.2 rounded">
                {product.discountPercent}% OFF
              </span>
            ) : product.stock <= 8 ? (
              <span className="text-[10px] font-medium text-amber-700 tracking-tight font-bangla">
                মাত্র {product.stock} টি বাকি
              </span>
            ) : null}
          </div>

          {/* Men's Size Selection Bar (Tahar Style) */}
          {!isWomen && hasSizes && (
            <div
              className="flex items-center gap-1.5 pt-1.5 overflow-x-auto scrollbar-none"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider shrink-0 mr-0.5">
                Size:
              </span>
              {product.sizes.map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={(e) => handleQuickAdd(e, sz)}
                  className={`px-2 py-0.5 text-[10px] font-bold rounded border transition-all cursor-pointer ${
                    addedSize === sz
                      ? 'bg-emerald-700 text-white border-emerald-700 scale-105'
                      : 'bg-stone-50 hover:bg-stone-900 hover:text-white border-stone-200 text-stone-700'
                  }`}
                  title={`Select Size ${sz}`}
                >
                  {addedSize === sz ? <Check className="w-2.5 h-2.5 inline" /> : sz}
                </button>
              ))}
            </div>
          )}

          {/* Khunchi Style: Prominent Add To Cart Button */}
          <button
            type="button"
            onClick={(e) => handleQuickAdd(e)}
            className="w-full mt-2 py-2 px-3 rounded-lg text-xs font-semibold text-white flex items-center justify-center gap-1.5 transition-all shadow-xs hover:shadow-md cursor-pointer hover:brightness-105"
            style={{
              backgroundColor: isWomen ? '#6B1D2F' : '#17382F',
            }}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add To Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};
