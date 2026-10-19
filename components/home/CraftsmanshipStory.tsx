'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { Feather, HeartHandshake, Sparkles, MapPin } from 'lucide-react';

export const CraftsmanshipStory: React.FC = () => {
  const { gender, theme } = useStore();

  const heritagePillars = [
    {
      title: 'Sonargaon & Demra Pit Looms',
      bangla: 'সোনারগাঁও ও ডেমরার জামদানি তাঁত',
      desc: 'UNESCO recognized Dhakai Jamdani requires two master weavers operating a wooden shuttle in unison for up to 14 weeks per saree.',
      icon: Feather,
    },
    {
      title: 'Rajshahi Pure Sericulture',
      bangla: 'রেশম নগরী রাজশাহীর তুত সিল্ক',
      desc: 'Cultivated from fine mulberry silk cocoons along the northern plains of Bengal, delivering liquid luster and ceremonial longevity.',
      icon: Sparkles,
    },
    {
      title: 'Ethical Artisan Fair Trade',
      bangla: 'তাঁতি পরিবারদের সামাজিক ক্ষমতায়ন',
      desc: 'Direct partnerships with over 240 master artisan families across Tangail, Narayanganj, and Comilla ensuring living wages and craft preservation.',
      icon: HeartHandshake,
    },
  ];

  return (
    <section id="story" className="py-16 sm:py-24 bg-white border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2">
              <span
                className="text-xs uppercase tracking-[0.25em] font-semibold"
                style={{ color: theme.primary }}
              >
                The BUNON Philosophy
              </span>
              <span className="text-stone-300">·</span>
              <span className="text-xs font-serif italic text-stone-500">বুননের দর্শন</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-stone-900 tracking-tight leading-tight">
              Weaving Bengal’s Soul Into Modern Aristocracy
            </h2>

            <p className="text-sm text-stone-600 font-sans leading-relaxed">
              In the historic Bengali vernacular, <strong className="font-semibold text-stone-900">BUNON (বুনন)</strong> means the rhythmic intertwining of warp and weft. For over four centuries, the Bengal river basin stood as the textile heart of the civilized world — spinning legendary muslins so gossamer they could pass through a signet ring.
            </p>

            <p className="text-sm text-stone-600 font-sans leading-relaxed">
              Today, BUNON preserves this sacred craft for contemporary connoisseurs. We refuse industrial speed in favor of mindful luxury: pure natural fibers, hand-cast metal buttons, heirloom Zari needlework, and tailored cuts that feel commanding yet utterly natural.
            </p>

            <div className="pt-4 flex items-center gap-4 text-xs font-serif italic text-stone-700">
              <div className="w-12 h-0.5 bg-[#D4B779]" />
              <span>&ldquo;A garment is not merely cloth; it is the living tapestry of an ancient people.&rdquo;</span>
            </div>
          </div>

          {/* Right Column: Heritage Guild Pillars */}
          <div className="lg:col-span-6 space-y-4">
            {heritagePillars.map((pillar, i) => {
              const IconComp = pillar.icon;
              return (
                <div
                  key={i}
                  className="p-5 sm:p-6 rounded-2xl border border-stone-200/90 bg-stone-50/50 hover:bg-stone-50 hover:border-stone-300 transition-all flex items-start gap-4"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 mt-0.5 shadow-2xs"
                    style={{ backgroundColor: theme.primary }}
                  >
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[11px] font-serif text-stone-600 block">
                      {pillar.bangla}
                    </span>
                    <h3 className="font-serif text-base font-semibold text-stone-900">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-stone-600 font-sans leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Geographical Map indicator */}
            <div className="p-4 rounded-xl border border-stone-200 bg-white flex items-center justify-between text-xs text-stone-700">
              <span className="flex items-center gap-2 font-medium">
                <MapPin className="w-4 h-4 text-[#D4B779]" />
                Ateliers in Dhaka · Handlooms in Sonargaon &amp; Tangail
              </span>
              <span className="text-[10px] uppercase font-mono tracking-wider text-stone-600">
                100% Made in Bangladesh
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
