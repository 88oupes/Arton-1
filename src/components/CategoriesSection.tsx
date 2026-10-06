import { ArrowRight } from 'lucide-react';
import { CATEGORIES_LIST, CATEGORIES_INFO } from '../data/products';
import { navigateTo, getCategoryUrl } from '../utils/navigation';

export default function CategoriesSection() {
  return (
    <section id="nos-univers" className="w-full bg-[#FAF9F7] py-16 sm:py-24 border-b border-[#E8EEF5] relative overflow-hidden">
      {/* Target anchor for #matelas */}
      <span id="matelas" className="absolute -top-24 pointer-events-none" />
      {/* Subtle ambient luxury light */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#BA8C48]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#132B45]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3.5 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-8 sm:mb-14">
          <div className="w-8 h-1 bg-[#BA8C48] mb-3 rounded-full" />
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl text-[#132B45] font-bold tracking-tight">
            Nos univers de confection <span className="italic text-[#BA8C48] font-normal">ARTON CONFORT</span>
          </h2>
          <p className="text-xs sm:text-base text-[#536B82] mt-1.5 sm:mt-2 max-w-xl leading-relaxed">
            Explorez nos collections certifiées : matelas ergonomiques, banquettes & salons contemporains et oreillers haute résilience.
          </p>
        </div>

        {/* 3 Cards Grid - Matelas, Salons, Oreillers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {CATEGORIES_LIST.map((cat) => {
            const info = CATEGORIES_INFO[cat.id];
            const catUrl = getCategoryUrl(cat.id);

            return (
              <a
                key={cat.id}
                href={catUrl}
                onClick={(e) => navigateTo(catUrl, e)}
                className="group cursor-pointer bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-[#E8EEF5] shadow-[0_4px_16px_rgba(19,43,69,0.05)] hover:shadow-[0_20px_40px_rgba(19,43,69,0.12)] hover:border-[#BA8C48]/60 transition-all duration-300 flex flex-col transform hover:-translate-y-1.5 relative block"
              >
                {/* Card Image Container */}
                <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden bg-[#F7F9FB]">
                  <img
                    src={info.image}
                    alt={`${cat.name} ARTON CONFORT Maroc`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1C2E]/75 via-transparent to-black/10 opacity-70 group-hover:opacity-50 transition-opacity" />

                  {/* Corner Visual Indicator */}
                  <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center text-[#132B45] shadow-md group-hover:bg-[#BA8C48] group-hover:text-white group-hover:scale-110 transition-all duration-300">
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-3.5 sm:p-5 lg:p-6 flex flex-col justify-between flex-1 bg-white">
                  <div>
                    <span className="text-[9px] sm:text-[10.5px] font-bold uppercase tracking-widest text-[#BA8C48] block mb-0.5 sm:mb-1 truncate font-mono">
                      /categories/{cat.id}
                    </span>
                    <h3 className="font-serif font-bold text-sm sm:text-xl lg:text-2xl text-[#132B45] group-hover:text-[#BA8C48] transition-colors leading-snug">
                      {cat.name}
                    </h3>
                    <p className="text-[11px] sm:text-[13px] text-[#536B82] mt-1 sm:mt-2 line-clamp-2 leading-tight sm:leading-relaxed">
                      {info.description}
                    </p>
                  </div>

                  <div className="pt-2.5 sm:pt-4 mt-2.5 sm:mt-4 border-t border-[#F0F4F8] flex items-center justify-between">
                    <span className="text-[11px] sm:text-xs font-semibold text-[#132B45] group-hover:text-[#BA8C48] tracking-wide transition-colors">
                      Découvrir le rayon
                    </span>
                    <span className="text-xs font-bold text-[#BA8C48] group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
