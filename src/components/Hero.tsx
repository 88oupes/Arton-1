import { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Leaf, Star, Sparkles } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onOpenQuiz: () => void;
}

const HERO_SLIDES = [
  {
    image: 'https://res.cloudinary.com/psbqhe7h/image/upload/v1789652990/Lit_5.png',
    alt: 'Matelas haut de gamme et lit d\'exception DARY Lit 5',
    titleLine1: "L'excellence",
    titleLine2: "du repos",
    description: 'Chaque détail est pensé pour aligner parfaitement votre colonne vertébrale et réguler naturellement votre température.',
  },
  {
    image: 'https://res.cloudinary.com/psbqhe7h/image/upload/v1789652996/Lit_4.png',
    alt: 'Matelas haut de gamme et lit d\'exception DARY Lit 4',
    titleLine1: 'Le confort',
    titleLine2: 'naît ici',
    description: 'Des matelas fabriqués dans notre manufacture avec passion, pour votre bien-être et un sommeil durable.',
  },
];

export default function Hero({ onExploreClick, onOpenQuiz }: HeroProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  // JavaScript automated transition: smoothly moves between the two images every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev === 0 ? 1 : 0));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const currentSlide = HERO_SLIDES[activeSlide];

  const handlePrev = () => {
    setActiveSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative w-full bg-[#1E1128] overflow-hidden border-b border-[#3B224C]">
      {/* Background Image Container with JS Smooth Motion */}
      <div className="relative w-full min-h-[540px] sm:min-h-[620px] lg:min-h-[680px] flex items-center">
        {/* The two images moving and cross-fading with JavaScript */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {HERO_SLIDES.map((slide, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                activeSlide === idx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover object-center transition-transform duration-[6000ms] ease-out ${
                  activeSlide === idx ? 'scale-105 translate-x-0' : 'scale-100 translate-x-1'
                }`}
              />
            </div>
          ))}

          {/* Layer over picture strictly capped at 30% max opacity */}
          <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent z-10 pointer-events-none" />
        </div>

        {/* Top Right Floating Accent Badge */}
        <div className="absolute top-8 right-6 lg:top-12 lg:right-16 z-20 hidden md:block">
          <div className="bg-white/90 backdrop-blur-md px-6 py-4 rounded-xl shadow-lg border border-white/40 max-w-[260px] text-center">
            <p className="font-serif text-[17px] leading-snug text-[#2D1C38] italic">
              « Élégance accessible & confort sur-mesure »
            </p>
            <div className="w-10 h-0.5 bg-[#723C90] mx-auto mt-2.5 rounded-full" />
          </div>
        </div>

        {/* Main Content Area with Frosted Translucent Card for Pristine Readability */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-20 lg:py-24 w-full">
          <div className="max-w-xl bg-white/85 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/60 shadow-xl">
            {/* Main Grand Serif Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-[58px] leading-[1.12] text-[#2D1C38] font-medium tracking-tight mb-3 sm:mb-4">
              {currentSlide.titleLine1} <br />
              <span className="italic font-normal text-[#723C90]">{currentSlide.titleLine2}</span>
            </h1>

            {/* Subtext description */}
            <p className="text-xs sm:text-sm text-[#554860] leading-relaxed mb-5 sm:mb-6 max-w-md font-normal">
              {currentSlide.description}
            </p>

            {/* Action Buttons - Compact & Mobile Friendly */}
            <div className="flex flex-row flex-wrap sm:flex-nowrap items-center gap-2.5 sm:gap-3.5 mb-6 sm:mb-8">
              <button
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3.5 bg-[#723C90] hover:bg-[#542D6B] text-white text-xs sm:text-sm font-semibold rounded-full sm:rounded-xl transition-all shadow-sm hover:shadow-md group cursor-pointer"
              >
                <span>Découvrir nos matelas DARY</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onOpenQuiz}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-5 py-2.5 sm:py-3.5 bg-white hover:bg-[#F3ECF6] text-[#723C90] border border-[#E5DAEA] text-xs sm:text-sm font-semibold rounded-full sm:rounded-xl transition-all shadow-xs hover:border-[#723C90] cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#723C90]" />
                <span>Guide de choix</span>
              </button>
            </div>

            {/* 3 Circular Micro-Badges - Mobile Optimized */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-5 pt-3 sm:pt-4 border-t border-[#E5DAEA]/80">
              {/* Badge 1: Fabrication marocaine */}
              <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold text-[#2D1C38]">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#FAF6FC] shadow-xs border border-[#E5DAEA] flex items-center justify-center text-[#723C90] shrink-0">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 3v18" />
                  </svg>
                </div>
                <span>Fabrication marocaine</span>
              </div>

              {/* Badge 2: Matériaux durables */}
              <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold text-[#2D1C38]">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#FAF6FC] shadow-xs border border-[#E5DAEA] flex items-center justify-center text-[#723C90] shrink-0">
                  <Leaf className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </div>
                <span>Matériaux nobles</span>
              </div>

              {/* Badge 3: Satisfaction clients 4,8/5 */}
              <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold text-[#2D1C38]">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#FAF6FC] shadow-xs border border-[#E5DAEA] flex items-center justify-center text-[#723C90] shrink-0">
                  <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current text-[#723C90]" />
                </div>
                <span>Satisfaction 4,8/5</span>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Chevron Controls */}
        <button
          onClick={handlePrev}
          aria-label="Photo précédente"
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white text-[#2D1C38] shadow-md flex items-center justify-center transition-all border border-white/50 hover:scale-105 cursor-pointer backdrop-blur-xs"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <button
          onClick={handleNext}
          aria-label="Photo suivante"
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white text-[#2D1C38] shadow-md flex items-center justify-center transition-all border border-white/50 hover:scale-105 cursor-pointer backdrop-blur-xs"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Bottom 2 Dots Indicator */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              aria-label={`Aller au visuel ${idx + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                activeSlide === idx
                  ? 'w-7 h-2 bg-[#723C90]'
                  : 'w-2 h-2 bg-white/70 hover:bg-white'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
