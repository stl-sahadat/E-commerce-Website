'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import {
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Truck,
  RotateCcw,
  SlidersHorizontal,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { gender, setGender, theme, setIsAdminOpen, setSelectedCategory, setSelectedCollection } = useStore();

  const handleCategoryNav = (targetGender: 'men' | 'women', categoryKey: string) => {
    setGender(targetGender);
    setSelectedCategory(categoryKey);
    setSelectedCollection('all');
    const el = document.getElementById('catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="bg-[#101715] text-[#F7F4EC] pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-col items-start leading-none">
              <span className="text-3xl font-serif tracking-[0.25em] font-semibold text-[#D4B779]">
                BUNON
              </span>
              <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-stone-400 font-medium pl-0.5 mt-1">
                বুনন · Bangladeshi Traditional Fashion
              </span>
            </div>

            <p className="text-xs text-stone-400 font-sans leading-relaxed max-w-sm">
              A premier traditional fashion house celebrating the ancestral handloom heritage of Bengal. Specializing in bespoke Panjabis, imperial Kabli suits, Dhakai Jamdani sarees, and handcrafted celebratory ensembles.
            </p>

            <div className="space-y-2 pt-2 text-xs text-stone-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#D4B779] shrink-0" />
                <span>Flagship Atelier: Road 11, Block D, Banani, Dhaka-1213</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D4B779] shrink-0" />
                <span>Customer Concierge: +880 1700-000000 (10 AM - 10 PM)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D4B779] shrink-0" />
                <span>care@bunonfashion.com</span>
              </div>
            </div>
          </div>

          {/* Men's Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#D4B779]">
              Men&apos;s Collection
            </h4>
            <ul className="space-y-2 text-xs text-stone-400 font-sans">
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryNav('men', 'panjabi')}
                  className="hover:text-white transition-colors"
                >
                  Embroidered Silk Panjabi
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryNav('men', 'kabli-kurta')}
                  className="hover:text-white transition-colors"
                >
                  Heritage Kabli Sets
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryNav('men', 'waistcoats')}
                  className="hover:text-white transition-colors"
                >
                  Brocade Waistcoats (Koti)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryNav('men', 'pajama-sets')}
                  className="hover:text-white transition-colors"
                >
                  Aligari &amp; Churidar Pajamas
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryNav('men', 'all')}
                  className="hover:text-white transition-colors"
                >
                  All Men&apos;s Collection
                </button>
              </li>
            </ul>
          </div>

          {/* Women's Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#D4B779]">
              Women&apos;s Collection
            </h4>
            <ul className="space-y-2 text-xs text-stone-400 font-sans">
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryNav('women', 'jamdani-saree')}
                  className="hover:text-white transition-colors"
                >
                  Dhakai Jamdani Sarees
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryNav('women', 'silk-saree')}
                  className="hover:text-white transition-colors"
                >
                  Rajshahi Pure Silk Sarees
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryNav('women', 'three-piece')}
                  className="hover:text-white transition-colors"
                >
                  Embroidered Three-Piece Sets
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryNav('women', 'salwar-kameez')}
                  className="hover:text-white transition-colors"
                >
                  Salwar Kameez &amp; Anarkali
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryNav('women', 'kurtis')}
                  className="hover:text-white transition-colors"
                >
                  Artisanal Tunics &amp; Kurtis
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryNav('women', 'lehenga')}
                  className="hover:text-white transition-colors"
                >
                  Bridal &amp; Festive Lehengas
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryNav('women', 'hijab')}
                  className="hover:text-white transition-colors"
                >
                  Premium Modal Hijabs &amp; Ornas
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care & Policies */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#D4B779]">
              Client Concierge
            </h4>
            <ul className="space-y-2 text-xs text-stone-400 font-sans">
              <li className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#D4B779]" /> Nationwide COD Delivery
              </li>
              <li className="flex items-center gap-1.5">
                <RotateCcw className="w-3.5 h-3.5 text-[#D4B779]" /> 7-Day Hassle-Free Exchange
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4B779]" /> Handloom Authenticity Card
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setIsAdminOpen(true)}
                  className="hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer text-stone-300"
                >
                  <SlidersHorizontal className="w-3 h-3 text-[#D4B779]" /> Store Admin Console
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            &copy; {new Date().getFullYear()} BUNON Fashion Ltd. All rights reserved. Registered under the Companies Act of Bangladesh.
          </div>

          <div className="flex items-center gap-2 text-[11px] font-sans">
            <span className="px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-stone-300">
              Cash on Delivery (COD)
            </span>
            <span className="px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-stone-300">
              bKash
            </span>
            <span className="px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-stone-300">
              Nagad
            </span>
            <span className="px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-stone-300">
              Visa / Mastercard
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
