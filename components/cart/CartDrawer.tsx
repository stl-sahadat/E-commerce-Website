'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { GarmentVisual } from '@/components/garment/GarmentVisual';
import {
  X,
  Trash2,
  Minus,
  Plus,
  ShoppingBag,
  ArrowRight,
  Truck,
  Tag,
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    theme,
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    cartCount,
    deliveryCharge,
    deliveryZone,
    setDeliveryZone,
    promoCode,
    discountAmount,
    applyPromoCode,
    finalTotal,
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
  } = useStore();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartOpen) return null;

  const freeDeliveryThreshold = 5000;
  const progressPercent = Math.min(100, (cartSubtotal / freeDeliveryThreshold) * 100);
  const amountNeededForFree = Math.max(0, freeDeliveryThreshold - cartSubtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const res = applyPromoCode(inputCoupon);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError('');
    }
  };

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer content */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50/70 shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" style={{ color: theme.primary }} />
            <h3 className="font-serif text-lg font-semibold text-stone-900">
              Shopping Bag ({cartCount})
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            className="p-1 rounded-md text-stone-400 hover:text-stone-800"
            aria-label="Close bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Tracker Bar */}
        <div className="px-5 py-3 bg-stone-100/70 border-b border-stone-200/60 shrink-0">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="flex items-center gap-1 font-medium text-stone-700">
              <Truck className="w-3.5 h-3.5 text-[#D4B779]" />
              {amountNeededForFree === 0
                ? 'You qualify for Complimentary Nationwide Delivery!'
                : `Add ৳${amountNeededForFree.toLocaleString()} more for Free Delivery`}
            </span>
            <span className="font-bold text-stone-800">{Math.round(progressPercent)}%</span>
          </div>
          <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
            <div
              className="h-full transition-all duration-500 rounded-full"
              style={{
                width: `${progressPercent}%`,
                backgroundColor: theme.primary,
              }}
            />
          </div>
        </div>

        {/* Item List (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-3 p-3 rounded-xl border border-stone-200/80 bg-white hover:border-stone-300 transition-colors"
              >
                {/* Visual Thumbnail */}
                <div className="w-16 h-20 rounded-lg overflow-hidden bg-stone-100 shrink-0 border border-stone-200/60">
                  <GarmentVisual
                    silhouette={item.product.silhouetteType}
                    activeColor={item.selectedColor}
                    gender={item.product.gender}
                    className="w-full h-full"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs font-medium text-stone-900 leading-snug truncate">
                      {item.product.name}
                    </h4>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="text-stone-400 hover:text-red-600 transition-colors p-0.5 shrink-0"
                      title="Remove Item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-[11px] text-stone-500 flex items-center gap-2">
                    <span className="flex items-center gap-1">
                      <span
                        className="w-2 h-2 rounded-full inline-block border"
                        style={{ backgroundColor: item.selectedColor.hex }}
                      />
                      {item.selectedColor.name}
                    </span>
                    <span>·</span>
                    <span>Size: {item.selectedSize}</span>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-xs font-serif font-bold text-stone-900 tabular-nums">
                      ৳{(item.product.price * item.quantity).toLocaleString()}
                    </span>

                    {/* Stepper */}
                    <div className="flex items-center border border-stone-200 rounded bg-stone-50">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-stone-600 hover:text-stone-900"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-medium tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        disabled={item.quantity >= item.product.stock}
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-stone-600 hover:text-stone-900 disabled:opacity-30"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-lg font-semibold text-stone-900">
                Your Bag is Empty
              </h4>
              <p className="text-xs text-stone-500 max-w-xs">
                Explore our Men&apos;s and Women&apos;s artisanal collections to add handcrafted Bangladeshi garments.
              </p>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="mt-2 px-5 py-2.5 rounded-full text-xs font-medium text-white transition-all cursor-pointer shadow-xs"
                style={{ backgroundColor: theme.primary }}
              >
                Continue Browsing
              </button>
            </div>
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-stone-200 bg-stone-50/80 space-y-3 shrink-0">
            {/* Delivery Zone Selector */}
            <div className="space-y-1">
              <label className="text-[11px] font-medium text-stone-700 block">
                Delivery Location
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setDeliveryZone('inside-dhaka')}
                  className={`py-1.5 px-2 rounded-md border text-center transition-all ${
                    deliveryZone === 'inside-dhaka'
                      ? 'bg-stone-900 text-white border-stone-900 font-medium'
                      : 'bg-white border-stone-200 text-stone-700'
                  }`}
                >
                  Inside Dhaka (৳80)
                </button>
                <button
                  type="button"
                  onClick={() => setDeliveryZone('outside-dhaka')}
                  className={`py-1.5 px-2 rounded-md border text-center transition-all ${
                    deliveryZone === 'outside-dhaka'
                      ? 'bg-stone-900 text-white border-stone-900 font-medium'
                      : 'bg-white border-stone-200 text-stone-700'
                  }`}
                >
                  Outside Dhaka (৳150)
                </button>
              </div>
            </div>

            {/* Promo Code Form */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Promo code (e.g. BUNONFIRST)"
                  value={inputCoupon}
                  onChange={(e) => setInputCoupon(e.target.value)}
                  className="w-full text-xs pl-8 pr-2 py-2 rounded-md border border-stone-200 bg-white uppercase placeholder:normal-case font-mono"
                />
                <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              </div>
              <button
                type="submit"
                className="px-3 py-2 text-xs font-medium rounded-md bg-stone-800 hover:bg-stone-900 text-white transition-colors cursor-pointer"
              >
                Apply
              </button>
            </form>
            {promoCode && (
              <p className="text-[11px] text-emerald-700 font-medium">
                Coupon &ldquo;{promoCode}&rdquo; applied: 10% discount!
              </p>
            )}
            {couponError && <p className="text-[11px] text-red-600">{couponError}</p>}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-stone-600 pt-1 border-t border-stone-200/60">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="tabular-nums font-medium text-stone-800">
                  ৳{cartSubtotal.toLocaleString()}
                </span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Promo Discount (10%)</span>
                  <span className="tabular-nums font-medium">
                    -৳{discountAmount.toLocaleString()}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Delivery</span>
                <span className="tabular-nums font-medium text-stone-800">
                  {deliveryCharge === 0 ? 'FREE' : `৳${deliveryCharge}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-stone-900 pt-2 border-t border-stone-200">
                <span>Total Amount</span>
                <span className="tabular-nums font-serif text-base font-bold">
                  ৳{finalTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Proceed to Checkout Button */}
            <button
              type="button"
              onClick={handleCheckoutClick}
              className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-medium tracking-wider uppercase text-white transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              style={{ backgroundColor: theme.primary }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
