import { CheckCircle2, Award, HeartHandshake } from 'lucide-react';
import { factoryCraftsmanImg } from '../data/products';

interface FactorySustainabilityProps {
  onLearnMoreFactory?: () => void;
  onLearnMoreEco?: () => void;
}

export default function FactorySustainability({}: FactorySustainabilityProps) {
  return (
    <section id="notre-usine" className="w-full bg-[#241330] py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Manufacture & Craftsman Photo Block */}
        <div className="w-full relative rounded-2xl overflow-hidden min-h-[440px] sm:min-h-[500px] flex flex-col justify-between p-6 sm:p-10 lg:p-12 shadow-xl border border-white/10 group">
          {/* Background craftsman image */}
          <div className="absolute inset-0 z-0">
            <img
              src={factoryCraftsmanImg}
              alt="Artisan matelassier dans la manufacture DARY"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700 ease-out"
            />
            {/* Dark gradient overlay for extreme legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#241330]/90 via-[#241330]/65 to-[#241330]/40" />
          </div>

          {/* DARY brand stamp on image */}
          <div className="relative z-10">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-normal leading-[1.15] max-w-2xl tracking-tight">
              Notre manufacture, <br />
              <span className="italic font-normal text-[#E5DAEA]">votre garantie</span>
            </h2>

            <p className="text-sm sm:text-base text-[#D4C3DC] mt-4 leading-relaxed max-w-xl font-normal">
              Des matelas façonnés dans nos ateliers avec le respect des traditions artisanales et une exigence d'élégance à chaque couture.
            </p>
          </div>

          {/* 3 Badges at the bottom from the photo */}
          <div className="relative z-10 pt-8 mt-6 border-t border-white/20 grid grid-cols-1 sm:grid-cols-3 gap-4 text-white">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-xs flex items-center justify-center shrink-0 border border-white/20">
                <Award className="w-4 h-4 text-[#A982B8]" />
              </div>
              <span className="text-xs sm:text-sm font-medium">Savoir-faire marocain</span>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-xs flex items-center justify-center shrink-0 border border-white/20">
                <CheckCircle2 className="w-4 h-4 text-[#A982B8]" />
              </div>
              <span className="text-xs sm:text-sm font-medium">Contrôles qualité stricts</span>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-xs flex items-center justify-center shrink-0 border border-white/20">
                <HeartHandshake className="w-4 h-4 text-[#A982B8]" />
              </div>
              <span className="text-xs sm:text-sm font-medium">Engagement éco-responsable</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
