'use client';

import React, { useState } from 'react';
import { Product, ProductColor } from '@/types';
import { useStore } from '@/context/StoreContext';
import { GarmentVisual } from '@/components/garment/GarmentVisual';
import {
  X,
  Heart,
  ShoppingBag,
  Truck,
  ShieldCheck,
  Ruler,
  RotateCcw,
  Minus,
  Plus,
  Check,
} from 'lucide-react';

interface ProductDetailsModalProps {
  product: Product | null;
  onClose: () => void;
  onSelectRelated: (product: Product) => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  onClose,
  onSelectRelated,
}) => {
  if (!product) return null;

  return (
    <ProductDetailsModalInner
      key={product.id}
      product={product}
      onClose={onClose}
      onSelectRelated={onSelectRelated}
    />
  );
};

const ProductDetailsModalInner: React.FC<{
  product: Product;
  onClose: () => void;
  onSelectRelated: (product: Product) => void;
}> = ({ product, onClose, onSelectRelated }) => {
  const {
    theme,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsCartOpen,
    products,
  } = useStore();

  const [selectedColor, setSelectedColor] = useState<ProductColor>(
    product.colors[0] || { name: 'Default', hex: '#17382F' }
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'Standard'
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'details' | 'fabric' | 'care'>('details');
  const [viewMode, setViewMode] = useState<'full' | 'fabric-texture'>('full');
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
    onClose();
    setIsCartOpen(true);
  };

  // Related products from same category
  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.gender === product.gender)
    .slice(0, 3);

  const galleryImages = product.images && product.images.length > 0
    ? product.images
    : (product.image ? [product.image] : []);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const hasSizes = product.sizes && product.sizes.length > 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/60 backdrop-blur-xs">
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Main Modal Box */}
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-stone-200 z-10 flex flex-col max-h-[92vh]">
        {/* Top bar with close button */}
        <div className="px-6 py-3 border-b border-stone-100 flex items-center justify-between bg-stone-50/60 shrink-0">
          <div className="flex items-center gap-2 text-xs text-stone-500 font-sans">
            <span className="uppercase tracking-wider font-semibold" style={{ color: theme.primary }}>
              {product.gender === 'men' ? "Men's Atelier" : "Women's Heritage"}
            </span>
            <span>·</span>
            <span>{product.subCategory}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-stone-400 hover:text-stone-800 hover:bg-stone-200/50 transition-colors"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Left Column: Garment Visual & Gallery Controls */}
            <div className="md:col-span-6 space-y-4">
              <div
                className="relative aspect-4/5 w-full rounded-xl overflow-hidden border border-stone-200 shadow-sm"
                style={{ backgroundColor: theme.canvasBg }}
              >
                {galleryImages.length > 0 && viewMode === 'full' ? (
                  <img
                    src={galleryImages[activeImageIndex] || galleryImages[0]}
                    alt={product.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500"
                  />
                ) : (
                  <GarmentVisual
                    silhouette={product.silhouetteType}
                    activeColor={selectedColor}
                    viewMode={viewMode}
                    gender={product.gender}
                    className="w-full h-full"
                  />
                )}

                {/* Wishlist Button */}
                <button
                  type="button"
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-3 right-3 p-2.5 rounded-full bg-white/90 backdrop-blur-xs shadow-xs text-stone-600 hover:text-red-600 hover:scale-105 transition-all"
                  aria-label="Toggle Wishlist"
                >
                  <Heart
                    className={`w-5 h-5 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`}
                  />
                </button>
              </div>

              {/* Gallery Thumbnails (if multiple images) */}
              {galleryImages.length > 1 && viewMode === 'full' && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-14 h-16 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                        activeImageIndex === idx
                          ? 'border-stone-900 shadow-sm'
                          : 'border-stone-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} angle ${idx + 1}`}
                        className="w-full h-full object-cover object-top"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* View Switcher: Full Garment vs Fabric Texture Weave */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setViewMode('full')}
                  className={`flex-1 py-2 text-xs font-medium rounded-lg border transition-all ${
                    viewMode === 'full'
                      ? 'bg-stone-900 text-white border-stone-900'
                      : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  Authentic Studio View
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('fabric-texture')}
                  className={`flex-1 py-2 text-xs font-medium rounded-lg border transition-all ${
                    viewMode === 'fabric-texture'
                      ? 'bg-stone-900 text-white border-stone-900'
                      : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  Inspect Weave Texture
                </button>
              </div>
            </div>

            {/* Right Column: Contiguous Purchase Module */}
            <div className="md:col-span-6 space-y-5">
              <div>
                <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
                  <span>Product Code: {product.id.toUpperCase()}</span>
                  <span>·</span>
                  <span className="text-emerald-700 font-medium">
                    {product.stock > 0 ? `In Stock (${product.stock} units)` : 'Out of Stock'}
                  </span>
                </div>

                <h2 className="text-2xl font-serif font-normal text-stone-900 leading-tight">
                  {product.name}
                </h2>

                {product.banglaName && (
                  <p className="text-sm font-serif text-stone-600 italic mt-0.5">
                    {product.banglaName}
                  </p>
                )}
              </div>

              {/* Price & Discount Display */}
              <div className="flex items-baseline gap-3 pt-1 border-t border-stone-100">
                <span className="text-2xl font-serif font-bold text-stone-900 tabular-nums">
                  ৳{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-stone-600 line-through tabular-nums">
                    ৳{product.originalPrice.toLocaleString()}
                  </span>
                )}
                {product.discountPercent && (
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded text-white"
                    style={{ backgroundColor: theme.primary }}
                  >
                    Save {product.discountPercent}%
                  </span>
                )}
              </div>

              {/* Color Selection */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-stone-800">
                    Selected Color: <strong className="font-semibold">{selectedColor.name}</strong>
                  </span>
                  <span className="text-stone-600">{product.colors.length} Available</span>
                </div>
                <div className="flex items-center gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      title={c.name}
                      onClick={() => setSelectedColor(c)}
                      className={`w-7 h-7 rounded-full border transition-all flex items-center justify-center ${
                        selectedColor.name === c.name
                          ? 'border-stone-900 ring-2 ring-stone-400 scale-110'
                          : 'border-stone-300 hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                    >
                      {selectedColor.name === c.name && (
                        <Check className="w-3.5 h-3.5 text-white drop-shadow-sm" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection (Only if product has size options) */}
              {hasSizes ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-stone-800">
                      Size: <strong className="font-semibold">{selectedSize}</strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowSizeGuide(!showSizeGuide)}
                      className="text-stone-600 hover:text-stone-900 underline flex items-center gap-1 cursor-pointer"
                    >
                      <Ruler className="w-3 h-3" /> Size Guide
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => setSelectedSize(sz)}
                        className={`min-w-[42px] py-2 px-3 text-xs font-medium rounded-md border transition-all cursor-pointer ${
                          selectedSize === sz
                            ? 'bg-stone-900 text-white border-stone-900 font-semibold'
                            : 'bg-white border-stone-200 text-stone-800 hover:border-stone-400'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-stone-50 rounded-lg border border-stone-200/60 text-xs text-stone-600">
                  <span className="font-semibold text-stone-800 block mb-0.5">
                    Traditional Unstitched Standard Drape
                  </span>
                  Traditional 5.5 meters (12 Haat) with running or matching blouse fabric piece included.
                </div>
              )}

              {/* Size Guide Table Modal Popover */}
              {showSizeGuide && (
                <div className="p-3 bg-stone-100 rounded-lg border border-stone-200 text-xs space-y-2">
                  <div className="flex items-center justify-between font-semibold text-stone-900">
                    <span>
                      {product.gender === 'men'
                        ? 'Men’s Panjabi Sizing Chart (Inches)'
                        : 'Women’s Tailored Sizing Chart (Inches)'}
                    </span>
                    <X
                      className="w-3.5 h-3.5 cursor-pointer text-stone-500"
                      onClick={() => setShowSizeGuide(false)}
                    />
                  </div>
                  {product.gender === 'women' ? (
                    <table className="w-full text-left border-collapse text-[11px] font-sans">
                      <thead>
                        <tr className="border-b border-stone-200 text-stone-500">
                          <th className="py-1">Size</th>
                          <th>Bust</th>
                          <th>Waist</th>
                          <th>Hip</th>
                          <th>Length</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-200 text-stone-700">
                        <tr>
                          <td className="py-1 font-semibold">36 (S)</td>
                          <td>36&quot;</td>
                          <td>32&quot;</td>
                          <td>38&quot;</td>
                          <td>42&quot;</td>
                        </tr>
                        <tr>
                          <td className="py-1 font-semibold">38 (M)</td>
                          <td>38&quot;</td>
                          <td>34&quot;</td>
                          <td>40&quot;</td>
                          <td>43&quot;</td>
                        </tr>
                        <tr>
                          <td className="py-1 font-semibold">40 (L)</td>
                          <td>40&quot;</td>
                          <td>36&quot;</td>
                          <td>42&quot;</td>
                          <td>44&quot;</td>
                        </tr>
                        <tr>
                          <td className="py-1 font-semibold">42 (XL)</td>
                          <td>42&quot;</td>
                          <td>38&quot;</td>
                          <td>44&quot;</td>
                          <td>45&quot;</td>
                        </tr>
                        <tr>
                          <td className="py-1 font-semibold">44 (XXL)</td>
                          <td>44&quot;</td>
                          <td>40&quot;</td>
                          <td>46&quot;</td>
                          <td>45&quot;</td>
                        </tr>
                      </tbody>
                    </table>
                  ) : (
                    <table className="w-full text-left border-collapse text-[11px] font-sans">
                      <thead>
                        <tr className="border-b border-stone-200 text-stone-500">
                          <th className="py-1">Size</th>
                          <th>Chest</th>
                          <th>Length</th>
                          <th>Shoulder</th>
                          <th>Sleeve</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-200 text-stone-700">
                        <tr>
                          <td className="py-1 font-semibold">38 (S)</td>
                          <td>40&quot;</td>
                          <td>40&quot;</td>
                          <td>17.5&quot;</td>
                          <td>24.5&quot;</td>
                        </tr>
                        <tr>
                          <td className="py-1 font-semibold">40 (M)</td>
                          <td>42&quot;</td>
                          <td>41&quot;</td>
                          <td>18&quot;</td>
                          <td>25&quot;</td>
                        </tr>
                        <tr>
                          <td className="py-1 font-semibold">42 (L)</td>
                          <td>44&quot;</td>
                          <td>42&quot;</td>
                          <td>18.5&quot;</td>
                          <td>25.5&quot;</td>
                        </tr>
                        <tr>
                          <td className="py-1 font-semibold">44 (XL)</td>
                          <td>46&quot;</td>
                          <td>43&quot;</td>
                          <td>19&quot;</td>
                          <td>26&quot;</td>
                        </tr>
                        <tr>
                          <td className="py-1 font-semibold">46 (XXL)</td>
                          <td>48&quot;</td>
                          <td>44&quot;</td>
                          <td>19.5&quot;</td>
                          <td>26.5&quot;</td>
                        </tr>
                      </tbody>
                    </table>
                  )}
                </div>
              )}

              {/* Quantity Stepper & Buy Actions */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-medium text-stone-800">Quantity</span>
                  <div className="flex items-center border border-stone-200 rounded-md bg-stone-50">
                    <button
                      type="button"
                      disabled={quantity <= 1}
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-1.5 text-stone-600 hover:text-stone-900 disabled:opacity-40"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-xs font-semibold tabular-nums">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      disabled={quantity >= product.stock}
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="p-1.5 text-stone-600 hover:text-stone-900 disabled:opacity-40"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer border border-stone-300 hover:bg-stone-50 text-stone-900"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{addedAnimation ? 'Added!' : 'Add to Bag'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleBuyNow}
                    className="py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold tracking-wide uppercase text-white transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                    style={{ backgroundColor: theme.primary }}
                  >
                    <span>Instant Checkout</span>
                  </button>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="pt-3 border-t border-stone-100 grid grid-cols-2 gap-3 text-xs text-stone-600">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#D4B779]" />
                  <span>Cash on Delivery across BD</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <RotateCcw className="w-4 h-4 text-[#D4B779]" />
                  <span>7-Day Return / Exchange</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#D4B779]" />
                  <span>100% Genuine Handloom</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-amber-600 font-bold">৳</span>
                  <span>Free delivery on ৳5,000+</span>
                </div>
              </div>
            </div>
          </div>

          {/* Description & Specification Tabs */}
          <div className="mt-8 pt-6 border-t border-stone-200">
            <div className="flex items-center gap-6 border-b border-stone-200 text-xs font-medium">
              <button
                type="button"
                onClick={() => setActiveTab('details')}
                className={`pb-2.5 transition-colors relative ${
                  activeTab === 'details'
                    ? 'text-stone-900 font-bold border-b-2'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
                style={{
                  borderColor: activeTab === 'details' ? theme.primary : 'transparent',
                }}
              >
                Description &amp; Origin
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('fabric')}
                className={`pb-2.5 transition-colors relative ${
                  activeTab === 'fabric'
                    ? 'text-stone-900 font-bold border-b-2'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
                style={{
                  borderColor: activeTab === 'fabric' ? theme.primary : 'transparent',
                }}
              >
                Fabric &amp; Artisan Technique
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('care')}
                className={`pb-2.5 transition-colors relative ${
                  activeTab === 'care'
                    ? 'text-stone-900 font-bold border-b-2'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
                style={{
                  borderColor: activeTab === 'care' ? theme.primary : 'transparent',
                }}
              >
                Wash &amp; Preservation Care
              </button>
            </div>

            <div className="py-4 text-xs text-stone-600 font-sans leading-relaxed">
              {activeTab === 'details' && (
                <div className="space-y-3">
                  <p>{product.description}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-[11px]">
                    {product.details.weaveOrigin && (
                      <div>
                        <span className="font-semibold text-stone-800 block">Weaving Guild:</span>
                        <span>{product.details.weaveOrigin}</span>
                      </div>
                    )}
                    {product.details.collarOrNeck && (
                      <div>
                        <span className="font-semibold text-stone-800 block">Neckline / Collar:</span>
                        <span>{product.details.collarOrNeck}</span>
                      </div>
                    )}
                    {product.details.fit && (
                      <div>
                        <span className="font-semibold text-stone-800 block">Silhouette Fit:</span>
                        <span>{product.details.fit}</span>
                      </div>
                    )}
                    {product.details.length && (
                      <div>
                        <span className="font-semibold text-stone-800 block">Garment Length:</span>
                        <span>{product.details.length}</span>
                      </div>
                    )}
                    {product.details.palluDetail && (
                      <div>
                        <span className="font-semibold text-stone-800 block">Pallu / Border:</span>
                        <span>{product.details.palluDetail}</span>
                      </div>
                    )}
                    {product.details.includedPieces && (
                      <div>
                        <span className="font-semibold text-stone-800 block">Set Inclusions:</span>
                        <span>{product.details.includedPieces}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'fabric' && (
                <div className="space-y-2">
                  <p>
                    <strong className="text-stone-800 font-medium">Fabric Base:</strong>{' '}
                    {product.fabric}
                  </p>
                  <p>
                    <strong className="text-stone-800 font-medium">Artisan Craft:</strong>{' '}
                    {product.weavingOrWork}
                  </p>
                  <p>
                    <strong className="text-stone-800 font-medium">Pattern Motif:</strong>{' '}
                    {product.patternDetail}
                  </p>
                </div>
              )}

              {activeTab === 'care' && (
                <ul className="list-disc pl-5 space-y-1">
                  {product.careInstructions.map((inst, i) => (
                    <li key={i}>{inst}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Related Products Recommendation */}
          <div className="mt-6 pt-6 border-t border-stone-200">
            <h3 className="font-serif text-base font-semibold text-stone-900 mb-3">
              You May Also Appreciate
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedProducts.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onSelectRelated(rel)}
                  className="group flex items-center gap-3 p-2 rounded-lg border border-stone-200/80 hover:bg-stone-50 cursor-pointer transition-all"
                >
                  <div className="w-14 h-16 rounded overflow-hidden bg-stone-100 shrink-0">
                    {rel.image ? (
                      <img
                        src={rel.image}
                        alt={rel.name}
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      <GarmentVisual
                        silhouette={rel.silhouetteType}
                        activeColor={rel.colors[0]}
                        gender={rel.gender}
                        className="w-full h-full"
                      />
                    )}
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="text-xs font-medium text-stone-900 truncate group-hover:text-stone-700">
                      {rel.name}
                    </h4>
                    <span className="text-xs font-serif font-bold text-stone-800 tabular-nums">
                      ৳{rel.price.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
