import { ArrowRight, CheckCircle2, Award, HeartHandshake, Leaf } from 'lucide-react';
import { factoryCraftsmanImg } from '../data/products';

interface FactorySustainabilityProps {
  onLearnMoreFactory: () => void;
  onLearnMoreEco: () => void;
}

export default function FactorySustainability({
  onLearnMoreFactory,
  onLearnMoreEco,
}: FactorySustainabilityProps) {
  return (
    <section id="notre-usine" className="w-full bg-[#241330] py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Left Block: The Factory & Craftsman Photo Block (approx 7 cols) */}
          <div className="lg:col-span-8 relative rounded-2xl overflow-hidden min-h-[440px] sm:min-h-[500px] flex flex-col justify-between p-6 sm:p-10 lg:p-12 shadow-xl border border-white/10 group">
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
              <div className="inline-block px-3.5 py-1 bg-[#723C90]/60 backdrop-blur-md rounded-full text-white text-[11px] font-semibold tracking-wider uppercase mb-4 border border-[#A982B8]/40">
                Manufacture DARY • Maroc
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-normal leading-[1.15] max-w-lg tracking-tight">
                Notre manufacture, <br />
                <span className="italic font-normal text-[#E5DAEA]">votre garantie</span>
              </h2>

              <p className="text-sm sm:text-base text-[#D4C3DC] mt-4 leading-relaxed max-w-lg font-normal">
                Des matelas façonnés dans nos ateliers avec le respect des traditions artisanales et une exigence d'élégance à chaque couture.
              </p>

              <div className="mt-7">
                <button
                  onClick={onLearnMoreFactory}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-white text-[#2D1C38] hover:bg-[#F8F6F9] text-sm font-semibold rounded-lg transition-all shadow-md group/btn cursor-pointer"
                >
                  <span>Découvrir notre savoir-faire</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 text-[#723C90]" />
                </button>
              </div>
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

          {/* Right Block: Deep Violet Eco Commitment Block */}
          <div className="lg:col-span-4 bg-[#542D6B] rounded-2xl p-6 sm:p-10 lg:p-12 flex flex-col justify-between text-white shadow-xl border border-[#723C90]/40">
            <div>
              {/* Circular Leaf outline icon */}
              <div className="w-14 h-14 rounded-full border border-[#A982B8]/40 flex items-center justify-center mb-6 text-[#E5DAEA] bg-white/10">
                <Leaf className="w-7 h-7 stroke-[1.5]" />
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal leading-snug tracking-tight">
                Des matelas durables pour un monde plus doux
              </h2>

              <p className="text-xs sm:text-sm text-[#E5DAEA] mt-4 leading-relaxed font-normal">
                DARY s'engage pour un sommeil raffiné et responsable, privilégiant les matières nobles et une confection raisonnée.
              </p>

              {/* Eco stats list */}
              <div className="mt-8 space-y-2.5 text-xs text-[#E5DAEA] border-t border-white/15 pt-6">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A982B8]" />
                  <span>100% de nos bois de sommiers certifiés PEFC</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A982B8]" />
                  <span>Housses en fibres naturelles douces et respirantes</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A982B8]" />
                  <span>Zéro solvant nocif, colles écologiques à l'eau</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4">
              <button
                onClick={onLearnMoreEco}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-[#542D6B] hover:bg-[#F8F6F9] text-sm font-semibold rounded-lg transition-all shadow-md group cursor-pointer"
              >
                <span>Notre démarche durable</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#723C90]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
