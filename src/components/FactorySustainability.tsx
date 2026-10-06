import { CheckCircle2, Award, HeartHandshake } from 'lucide-react';
import { factoryCraftsmanImg } from '../data/products';

interface FactorySustainabilityProps {
  onLearnMoreFactory?: () => void;
  onLearnMoreEco?: () => void;
}

export default function FactorySustainability({}: FactorySustainabilityProps) {
  return (
    <section id="notre-usine" className="w-full bg-[#0B1C2E] py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Manufacture & Craftsman Photo Block */}
        <div className="w-full relative rounded-2xl overflow-hidden min-h-[440px] sm:min-h-[500px] flex flex-col justify-between p-6 sm:p-10 lg:p-12 shadow-xl border border-white/10 group">
          {/* Background craftsman image */}
          <div className="absolute inset-0 z-0">
            <img
              src={factoryCraftsmanImg}
              alt="Artisan matelassier dans la manufacture ARTON CONFORT"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700 ease-out"
            />
            {/* Dark gradient overlay for extreme legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B1C2E]/95 via-[#0B1C2E]/70 to-[#0B1C2E]/40" />
          </div>

          {/* ARTON CONFORT brand stamp on image */}
          <div className="relative z-10">
            <div className="w-8 h-1 bg-[#BA8C48] mb-4 rounded-full" />
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-normal leading-[1.15] max-w-2xl tracking-tight">
              Notre manufacture, <br />
              <span className="italic font-normal text-[#D4A85B]">votre garantie</span>
            </h2>

            <p className="text-sm sm:text-base text-[#D0DEEB] mt-4 leading-relaxed max-w-xl font-normal">
              Des matelas façonnés dans nos ateliers avec le respect des traditions artisanales et une exigence d'élégance à chaque couture.
            </p>
          </div>

          {/* 3 Badges at the bottom from the photo */}
          <div className="relative z-10 pt-8 mt-6 border-t border-white/20 grid grid-cols-1 sm:grid-cols-3 gap-4 text-white">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-xs flex items-center justify-center shrink-0 border border-white/20">
                <Award className="w-4 h-4 text-[#BA8C48]" />
              </div>
              <span className="text-xs sm:text-sm font-medium">Savoir-faire marocain d'excellence</span>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-xs flex items-center justify-center shrink-0 border border-white/20">
                <CheckCircle2 className="w-4 h-4 text-[#BA8C48]" />
              </div>
              <span className="text-xs sm:text-sm font-medium">Contrôles qualité stricts</span>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-xs flex items-center justify-center shrink-0 border border-white/20">
                <HeartHandshake className="w-4 h-4 text-[#BA8C48]" />
              </div>
              <span className="text-xs sm:text-sm font-medium">Engagement éco-responsable & durable</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
