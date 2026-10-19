'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { Sparkles, ArrowRight, Moon, Crown, Flame } from 'lucide-react';

interface FeaturedOccasionsProps {
  onSelectCollection: (colKey: string) => void;
}

export const FeaturedOccasions: React.FC<FeaturedOccasionsProps> = ({ onSelectCollection }) => {
  const { gender, theme } = useStore();

  const occasions = [
    {
      id: 'eid',
      title: 'Eid Festive Edit 2026',
      banglaTitle: 'ঈদ উৎসব কালেকশন',
      icon: Moon,
      tagline: 'Refined celebration garments for auspicious mornings and family gatherings.',
      highlights:
        gender === 'men'
          ? ['Mulberry Silk Panjabis', 'Structured Safari Kablis', 'Antique Gold Stud Buttons']
          : ['Dhakai Muslin Jamdani', 'Velvet-Touch Three-Piece', 'Resham Scalloped Ornas'],
      badge: 'Festive Season',
    },
    {
      id: 'wedding',
      title: 'Royal Wedding & Bridal Atelier',
      banglaTitle: 'রাজকীয় ওয়েডিং ও বর-কনে কালেকশন',
      icon: Crown,
      tagline: 'Heirloom garments for grooms, brides, and ceremonial family banquets.',
      highlights:
        gender === 'men'
          ? ['Aristocrat Tussar Silk', 'Zari Brocade Waistcoats (Koti)', 'Potli Button Accents']
          : ['Pure Rajshahi Zari Silks', 'Banarasi Katan Drapes', 'Gold Zardozi Necklines'],
      badge: 'Ceremonial Luxury',
    },
    {
      id: 'festival',
      title: 'Cultural Heritage & Handloom',
      banglaTitle: 'ঐতিহ্যবাহী লোকশিল্প ও তাঁত সম্ভার',
      icon: Flame,
      tagline: 'Breathing life into Tangail cottons, Nakshi Kantha running stitches, and khadi weaves.',
      highlights:
        gender === 'men'
          ? ['Comilla Khadi Handloom', 'Fine Jacquard Giza Cottons', 'Natural Linen Blends']
          : ['Tangail Soft Tant Cottons', 'Jessore Nakshi Kantha', 'Modal Chiffon Hijabs'],
      badge: 'Living Craft',
    },
  ];

  return (
    <section className="py-14 sm:py-20 border-b border-stone-100" style={{ backgroundColor: theme.canvasBg }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span
            className="text-xs uppercase tracking-[0.25em] font-semibold"
            style={{ color: theme.primary }}
          >
            Curated Occasions
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif text-stone-900 font-normal">
            Garments Tailored for Momentous Celebrations
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
            From the morning Eid prayer to opulent wedding evenings across Dhaka and Chittagong, discover silhouettes designed to leave an indelible impression.
          </p>
        </div>

        {/* 3 Occasion Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {occasions.map((occ) => {
            const IconComponent = occ.icon;
            return (
              <div
                key={occ.id}
                onClick={() => onSelectCollection(occ.id)}
                className="group relative bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/90 hover:border-stone-400 transition-all duration-300 shadow-xs hover:shadow-lg flex flex-col justify-between cursor-pointer"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-xs"
                      style={{ backgroundColor: theme.primary }}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-sans font-medium uppercase tracking-wider text-stone-500 border border-stone-200 px-2 py-0.5 rounded-full">
                      {occ.badge}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-serif text-stone-600 block italic">
                      {occ.banglaTitle}
                    </span>
                    <h3 className="font-serif text-xl font-semibold text-stone-900 group-hover:text-stone-700 transition-colors">
                      {occ.title}
                    </h3>
                  </div>

                  <p className="text-xs text-stone-600 font-sans leading-relaxed">
                    {occ.tagline}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-stone-100">
                    <span className="text-[10px] uppercase font-semibold text-stone-600 tracking-wider block">
                      Signature Inclusions:
                    </span>
                    <ul className="text-xs text-stone-700 space-y-1 font-sans">
                      {occ.highlights.map((h, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-[#D4B779]" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-semibold">
                  <span className="text-stone-700">Explore Collection</span>
                  <div
                    className="flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                    style={{ color: theme.primary }}
                  >
                    <span>View All</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
