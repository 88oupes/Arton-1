import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../data/products';
import { CategoryItem } from '../types';

interface CategoriesSectionProps {
  onSelectCategory: (categoryId: string) => void;
}

export default function CategoriesSection({ onSelectCategory }: CategoriesSectionProps) {
  return (
    <section id="nos-univers" className="w-full bg-[#FAFBF9] py-14 sm:py-18 border-b border-[#E8ECE9]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#0F172A] font-normal tracking-tight">
              Nos univers
            </h2>
            <p className="text-sm text-[#64748B] mt-1.5">
              Explorez nos créations conçues pour sublimer chaque nuit.
            </p>
          </div>

          <a
            href="#matelas"
            onClick={(e) => {
              e.preventDefault();
              onSelectCategory('matelas');
            }}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#204033] hover:text-[#132820] group transition-colors self-start sm:self-auto cursor-pointer"
          >
            <span>Voir toutes les catégories</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {CATEGORIES.map((cat: CategoryItem) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-[#E2E8E4] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col"
            >
              {/* Card Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F1F3F1]">
                <img
                  src={cat.image}
                  alt={cat.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 bg-white">
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-[#0F172A] group-hover:text-[#204033] transition-colors leading-snug">
                    {cat.title}
                  </h3>
                  <div className="mt-1.5 inline-flex items-center gap-1 text-xs sm:text-sm text-[#64748B] group-hover:text-[#204033] transition-colors font-medium">
                    <span>{cat.subtitle.replace(' →', '')}</span>
                    <span className="text-[#204033] group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
