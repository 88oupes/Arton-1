import { ArrowRight } from 'lucide-react';
import { CATEGORIES_LIST, CATEGORIES_INFO } from '../data/products';
import { navigateTo, getCategoryUrl } from '../utils/navigation';

export default function CategoriesSection() {
  return (
    <section id="nos-univers" className="w-full bg-gradient-to-b from-[#FAF7FB] via-white to-[#F8F5FA] py-16 sm:py-24 border-b border-[#EEDBEE]/60 relative overflow-hidden">
      {/* Target anchor for #matelas */}
      <span id="matelas" className="absolute -top-24 pointer-events-none" />
      {/* Subtle ambient luxury light */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#723C90]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#542D6B]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3.5 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-14">
          <div>
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl text-[#2D1C38] font-bold tracking-tight">
              Nos univers de confection <span className="italic text-[#723C90] font-normal">DARY</span>
            </h2>
            <p className="text-xs sm:text-base text-[#665373] mt-1.5 sm:mt-2 max-w-xl leading-relaxed">
              Explorez nos collections certifiées : matelas haute résilience, salons marocains et oreillers ergonomiques.
            </p>
          </div>

          <a
            href={getCategoryUrl('matelas')}
            onClick={(e) => navigateTo(getCategoryUrl('matelas'), e)}
            className="inline-flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-sm font-bold uppercase tracking-wider text-[#723C90] hover:text-[#542D6B] group transition-all self-start sm:self-auto px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-white border border-[#E5D7EB] hover:border-[#723C90] shadow-xs hover:shadow-md cursor-pointer"
          >
            <span>Explorer la collection</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
          </a>
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
                className="group cursor-pointer bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-[#EDE4F1] shadow-[0_4px_16px_rgba(84,45,107,0.06)] hover:shadow-[0_20px_40px_rgba(84,45,107,0.16)] hover:border-[#723C90]/60 transition-all duration-300 flex flex-col transform hover:-translate-y-1.5 relative block"
              >
                {/* Card Image Container */}
                <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden bg-[#F3ECF6]">
                  <img
                    src={info.image}
                    alt={`${cat.name} DARY Maroc`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2D1C38]/75 via-transparent to-black/10 opacity-70 group-hover:opacity-50 transition-opacity" />

                  {/* Floating Tag / Badge */}
                  <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10">
                    <span className="bg-[#542D6B]/90 backdrop-blur-md text-white text-[8.5px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border border-white/20 shadow-xs">
                      {info.itemCountText}
                    </span>
                  </div>

                  {/* Corner Visual Indicator */}
                  <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 z-10 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#723C90] shadow-md group-hover:bg-[#723C90] group-hover:text-white group-hover:scale-110 transition-all duration-300">
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-3.5 sm:p-5 lg:p-6 flex flex-col justify-between flex-1 bg-white">
                  <div>
                    <span className="text-[9px] sm:text-[10.5px] font-bold uppercase tracking-widest text-[#723C90] block mb-0.5 sm:mb-1 truncate font-mono">
                      /categories/{cat.id}
                    </span>
                    <h3 className="font-serif font-bold text-sm sm:text-xl lg:text-2xl text-[#2D1C38] group-hover:text-[#723C90] transition-colors leading-snug">
                      {cat.name}
                    </h3>
                    <p className="text-[11px] sm:text-[13px] text-[#665373] mt-1 sm:mt-2 line-clamp-2 leading-tight sm:leading-relaxed">
                      {info.description}
                    </p>
                  </div>

                  <div className="pt-2.5 sm:pt-4 mt-2.5 sm:mt-4 border-t border-[#F5EFF7] flex items-center justify-between">
                    <span className="text-[11px] sm:text-xs font-semibold text-[#723C90] group-hover:text-[#542D6B] tracking-wide transition-colors">
                      Découvrir le rayon
                    </span>
                    <span className="text-xs font-bold text-[#723C90] group-hover:translate-x-1 transition-transform">
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
