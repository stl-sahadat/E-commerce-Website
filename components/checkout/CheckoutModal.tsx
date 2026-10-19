'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import {
  X,
  CheckCircle,
  Truck,
  ShieldCheck,
  CreditCard,
  MapPin,
  Phone,
  User,
  ArrowRight,
} from 'lucide-react';
import { CustomerOrder } from '@/types';

export const CheckoutModal: React.FC = () => {
  const {
    theme,
    cart,
    cartSubtotal,
    deliveryCharge,
    deliveryZone,
    setDeliveryZone,
    discountAmount,
    finalTotal,
    isCheckoutOpen,
    setIsCheckoutOpen,
    createOrder,
  } = useStore();

  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [district, setDistrict] = useState('Dhaka');
  const [orderNotes, setOrderNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmedOrder, setConfirmedOrder] = useState<CustomerOrder | null>(null);

  if (!isCheckoutOpen) return null;

  const bangladeshDistricts = [
    'Dhaka',
    'Chittagong',
    'Sylhet',
    'Rajshahi',
    'Khulna',
    'Barisal',
    'Rangpur',
    'Mymensingh',
    'Comilla',
    'Gazipur',
    'Narayanganj',
    'Bogra',
    'Jessore',
    'Cox’s Bazar',
  ];

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setDistrict(val);
    if (val === 'Dhaka') {
      setDeliveryZone('inside-dhaka');
    } else {
      setDeliveryZone('outside-dhaka');
    }
  };

  const validate = () => {
    const err: Record<string, string> = {};
    if (!customerName.trim()) {
      err.customerName = 'Please enter your full name';
    }

    const cleanPhone = phoneNumber.trim().replace(/[- ]/g, '');
    if (!cleanPhone) {
      err.phoneNumber = 'Please enter your contact phone number';
    } else if (!/^01[3-9]\d{8}$/.test(cleanPhone)) {
      err.phoneNumber = 'Enter a valid 11-digit Bangladeshi mobile number (e.g. 01712345678)';
    }

    if (!address.trim() || address.trim().length < 8) {
      err.address = 'Please provide a detailed house, street, or area delivery address';
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const orderItems = cart.map((c) => ({
      productId: c.productId,
      productName: c.product.name,
      colorName: c.selectedColor.name,
      size: c.selectedSize,
      price: c.product.price,
      quantity: c.quantity,
    }));

    const newOrder = createOrder({
      customerName: customerName.trim(),
      phoneNumber: phoneNumber.trim(),
      address: address.trim(),
      district,
      deliveryZone,
      orderNotes: orderNotes.trim(),
      items: orderItems,
      paymentMethod: 'Cash on Delivery (COD)',
    });

    setConfirmedOrder(newOrder);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setConfirmedOrder(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs">
      <div className="fixed inset-0" onClick={handleClose} />

      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 z-10 flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50/70 shrink-0">
          <div>
            <span
              className="text-[10px] font-sans font-semibold uppercase tracking-widest block"
              style={{ color: theme.primary }}
            >
              Cash on Delivery (COD)
            </span>
            <h3 className="font-serif text-lg sm:text-xl font-semibold text-stone-900">
              {confirmedOrder ? 'Order Confirmed' : 'Checkout & Delivery Details'}
            </h3>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-1 rounded-md text-stone-400 hover:text-stone-800"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto flex-1 p-6 sm:p-8">
          {confirmedOrder ? (
            /* Order Success View */
            <div className="text-center space-y-6 py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-xs border border-emerald-200">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div className="space-y-1.5">
                <h4 className="font-serif text-2xl font-bold text-stone-900">
                  Thank You, {confirmedOrder.customerName}!
                </h4>
                <p className="text-xs text-stone-500 font-sans">
                  Your order has been placed successfully under Cash on Delivery.
                </p>
                <div className="pt-2">
                  <span className="inline-block px-3 py-1 rounded bg-stone-100 font-mono text-xs font-bold text-stone-800">
                    Order Ref: #{confirmedOrder.id}
                  </span>
                </div>
              </div>

              {/* Order Receipt Card */}
              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/70 text-left text-xs space-y-3">
                <div className="flex justify-between pb-2 border-b border-stone-200 font-medium">
                  <span className="text-stone-500">Delivery Address:</span>
                  <span className="text-stone-900 text-right max-w-[280px]">
                    {confirmedOrder.address}, {confirmedOrder.district} ({confirmedOrder.phoneNumber})
                  </span>
                </div>

                <div className="space-y-1.5 pt-1">
                  <span className="font-semibold text-stone-800 block">Ordered Items:</span>
                  {confirmedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-stone-600">
                      <span>
                        {item.productName} ({item.colorName}, {item.size}) x{item.quantity}
                      </span>
                      <span className="tabular-nums font-medium text-stone-900">
                        ৳{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-stone-200 flex justify-between font-bold text-stone-900 text-sm">
                  <span>Payable at Delivery (COD)</span>
                  <span className="tabular-nums font-serif text-base text-stone-900">
                    ৳{confirmedOrder.finalTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Honest Demo Notification Note */}
              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200/80 text-[11px] text-amber-800 text-left space-y-1">
                <strong>Demo Store Notice:</strong>
                <p>
                  This is a demonstration order recorded in your local browser state. Our atelier concierge will contact your phone ({confirmedOrder.phoneNumber}) before real parcel dispatch in a live deployment.
                </p>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="w-full py-3 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-wider text-white transition-all shadow-md hover:shadow-lg cursor-pointer font-bangla"
                style={{ backgroundColor: theme.primary }}
              >
                ইসমাইল ফ্যাশনে ফিরে যান (Back to Store)
              </button>
            </div>
          ) : (
            /* Checkout Form View */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Order Items Preview Ribbon */}
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 text-xs flex items-center justify-between">
                <span className="text-stone-600">
                  {cart.length} item{cart.length > 1 ? 's' : ''} in Bag
                </span>
                <span className="font-serif font-bold text-stone-900 text-sm tabular-nums">
                  Total Payable: ৳{finalTotal.toLocaleString()}
                </span>
              </div>

              {/* Customer Contact Fields */}
              <div className="space-y-4">
                <h4 className="text-xs uppercase font-semibold tracking-wider text-stone-500 border-b border-stone-100 pb-1">
                  Recipient Information
                </h4>

                <div>
                  <label className="text-xs font-medium text-stone-800 block mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. Tanvir Hossain / Samira Rahman"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className={`w-full text-xs pl-8 pr-3 py-2.5 rounded-lg border bg-white focus:outline-none focus:ring-1 ${
                        errors.customerName
                          ? 'border-red-500 focus:ring-red-400'
                          : 'border-stone-200 focus:border-stone-400'
                      }`}
                    />
                    <User className="w-4 h-4 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  </div>
                  {errors.customerName && (
                    <p className="text-[11px] text-red-500 mt-1">{errors.customerName}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-medium text-stone-800 block mb-1">
                    Mobile Phone Number (Bangladeshi Format) *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      placeholder="01712345678"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className={`w-full text-xs pl-8 pr-3 py-2.5 rounded-lg border bg-white focus:outline-none focus:ring-1 font-mono ${
                        errors.phoneNumber
                          ? 'border-red-500 focus:ring-red-400'
                          : 'border-stone-200 focus:border-stone-400'
                      }`}
                    />
                    <Phone className="w-4 h-4 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  </div>
                  {errors.phoneNumber && (
                    <p className="text-[11px] text-red-500 mt-1">{errors.phoneNumber}</p>
                  )}
                </div>
              </div>

              {/* Delivery Address Fields */}
              <div className="space-y-4">
                <h4 className="text-xs uppercase font-semibold tracking-wider text-stone-500 border-b border-stone-100 pb-1">
                  Delivery Destination
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-stone-800 block mb-1">
                      District / City *
                    </label>
                    <select
                      value={district}
                      onChange={handleDistrictChange}
                      className="w-full text-xs py-2.5 px-3 rounded-lg border border-stone-200 bg-white focus:outline-none focus:ring-1 cursor-pointer"
                    >
                      {bangladeshDistricts.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-stone-800 block mb-1">
                      Delivery Zone Speed
                    </label>
                    <div className="grid grid-cols-2 gap-1 text-[11px]">
                      <button
                        type="button"
                        onClick={() => setDeliveryZone('inside-dhaka')}
                        className={`py-2 px-1 text-center rounded border transition-all ${
                          deliveryZone === 'inside-dhaka'
                            ? 'bg-stone-900 text-white font-medium border-stone-900'
                            : 'border-stone-200 text-stone-700 bg-white'
                        }`}
                      >
                        Inside Dhaka (24-48h)
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeliveryZone('outside-dhaka')}
                        className={`py-2 px-1 text-center rounded border transition-all ${
                          deliveryZone === 'outside-dhaka'
                            ? 'bg-stone-900 text-white font-medium border-stone-900'
                            : 'border-stone-200 text-stone-700 bg-white'
                        }`}
                      >
                        Outside Dhaka (48-72h)
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-stone-800 block mb-1">
                    Street Address &amp; Landmarks *
                  </label>
                  <div className="relative">
                    <textarea
                      rows={2}
                      placeholder="House / Flat #, Road #, Sector / Area (e.g. House 42, Road 11, Banani)"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className={`w-full text-xs pl-8 pr-3 py-2 rounded-lg border bg-white focus:outline-none focus:ring-1 ${
                        errors.address
                          ? 'border-red-500 focus:ring-red-400'
                          : 'border-stone-200 focus:border-stone-400'
                      }`}
                    />
                    <MapPin className="w-4 h-4 text-stone-400 absolute left-2.5 top-3" />
                  </div>
                  {errors.address && (
                    <p className="text-[11px] text-red-500 mt-1">{errors.address}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-medium text-stone-800 block mb-1">
                    Special Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Call before delivery or deliver in afternoon"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-stone-200 bg-white"
                  />
                </div>
              </div>

              {/* Payment Method Option */}
              <div className="p-4 rounded-xl border border-stone-300 bg-stone-50 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      id="cod"
                      checked
                      readOnly
                      className="accent-stone-900 cursor-pointer"
                    />
                    <label htmlFor="cod" className="text-xs font-semibold text-stone-900">
                      Cash on Delivery (ক্যাশ অন ডেলিভারি)
                    </label>
                  </div>
                  <Truck className="w-4 h-4 text-[#D4B779]" />
                </div>
                <p className="text-[11px] text-stone-600 pl-5">
                  Pay with physical cash to the courier agent once your package arrives at your doorstep. Open and inspect before final acceptance.
                </p>
              </div>

              {/* Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600 border-t border-stone-200 pt-3">
                <div className="flex justify-between">
                  <span>Garment Subtotal</span>
                  <span className="tabular-nums">৳{cartSubtotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Voucher Discount</span>
                    <span className="tabular-nums">-৳{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery Charge</span>
                  <span className="tabular-nums font-medium text-stone-800">
                    {deliveryCharge === 0 ? 'FREE' : `৳${deliveryCharge}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-stone-900 pt-2 border-t border-stone-200">
                  <span>Final Payable Amount</span>
                  <span className="tabular-nums font-serif">
                    ৳{finalTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-semibold tracking-wider uppercase text-white transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                style={{ backgroundColor: theme.primary }}
              >
                <span>Confirm Order via Cash on Delivery</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
