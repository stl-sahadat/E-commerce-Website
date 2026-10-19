'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const { theme, showNotification } = useStore();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@') || !email.includes('.')) {
      setError('Please provide a valid email address.');
      return;
    }
    setError('');
    setSubmitted(true);
    showNotification('ইসমাইল ফ্যাশনে স্বাগতম! আপনার ১০% ছাড়ের কুপন কোড: ISMAILFIRST');
  };

  return (
    <section className="py-14 sm:py-20 border-b border-stone-200/80" style={{ backgroundColor: theme.canvasBg }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-stone-200 shadow-2xs text-xs">
          <Mail className="w-3.5 h-3.5 text-[#D4B779]" />
          <span className="font-medium text-stone-700 font-bangla">ইসমাইল ফ্যাশন নিউজলেটার</span>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-4xl font-serif text-stone-900 font-normal">
            নতুন পাঞ্জাবি, পায়জামা, শাড়ি ও থ্রি-পিস কালেকশন আপডেট
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto font-sans leading-relaxed">
            ইসমাইল ফ্যাশনের নতুন ডিজাইন ও উৎসবের এক্সক্লুসিভ কালেকশন সম্পর্কে সবার আগে জানতে সাবস্ক্রাইব করুন। প্রথম অর্ডারে পাবেন বিশেষ ১০% ছাড়!
          </p>
        </div>

        {submitted ? (
          <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-sm max-w-md mx-auto space-y-2 animate-fade-in">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-lg font-semibold text-stone-900">
              ইসমাইল ফ্যাশনে আপনাকে স্বাগতম
            </h4>
            <p className="text-xs text-stone-600">
              আপনার ১০% ওয়েলকাম ডিসকাউন্ট সক্রিয় হয়েছে। চেকআউটে ব্যবহার করুন:
            </p>
            <div className="pt-2">
              <span className="inline-block px-4 py-1.5 bg-stone-100 rounded-lg font-mono text-sm font-bold text-stone-900 border border-stone-200 tracking-wider">
                ISMAILFIRST
              </span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="max-w-md mx-auto space-y-2">
            <div className="flex gap-2 p-1.5 bg-white rounded-full border border-stone-200/90 shadow-sm focus-within:ring-2 focus-within:ring-stone-400">
              <input
                type="email"
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                className="flex-1 px-4 py-2 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none bg-transparent"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase text-white transition-all shadow-xs flex items-center gap-1.5 cursor-pointer shrink-0"
                style={{ backgroundColor: theme.primary }}
              >
                <span>Subscribe</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            {error && <p className="text-[11px] text-red-600 font-sans">{error}</p>}
            <p className="text-[10px] text-stone-600 pt-1">
              We respect your privacy. No spam. Unsubscribe at any time.
            </p>
          </form>
        )}
      </div>
    </section>
  );
};
