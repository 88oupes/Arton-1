import { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import heroCloudImg from '../assets/images/dari_hero_cloud_1789988428840.jpg';

interface HeroProps {
  onExploreClick: () => void;
  onOpenQuiz?: () => void;
}

export const HERO_SLIDES = [
  {
    id: 1,
    image: heroCloudImg,
    titleLine1: 'Notre expertise, pour vous simplifier la vie...',
    titleLine2: 'et la nuit',
    description:
      'Chaque détail est pensé pour aligner votre corps et réguler votre température.',
  },
];

export default function Hero({ onExploreClick, onOpenQuiz }: HeroProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (HERO_SLIDES.length <= 1) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setActiveSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
  };

  const currentSlide = HERO_SLIDES[activeSlide] || HERO_SLIDES[0];

  return (
    <section className="relative w-full bg-[#1E1128] overflow-hidden border-b border-[#E5DAEA]">
      <div className="relative min-h-[460px] sm:min-h-[520px] lg:min-h-[580px] flex items-center">
        {/* Background Image Carousel with gentle crossfade */}
        <div className="absolute inset-0 z-0">
          {HERO_SLIDES.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                activeSlide === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <img
                src={slide.image}
                alt={`${slide.titleLine1} ${slide.titleLine2} - Literie DARY`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-[55%_center] sm:object-center"
              />
            </div>
          ))}

          {/* Optimized gradients for mobile friendliness: readable text while keeping image visible */}
          <div className="absolute inset-0 bg-black/20 sm:bg-black/15 z-10 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1E1128]/90 via-black/40 to-transparent sm:bg-gradient-to-r sm:from-[#1E1128]/85 sm:via-black/40 sm:to-transparent z-10 pointer-events-none" />
        </div>

        {/* Main Content Area */}
        <div className="relative z-20 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-12 sm:py-20 lg:py-24 w-full">
          <div className="max-w-2xl">
            {/* Main Grand Serif Headline */}
            <h1 className="font-serif text-2xl sm:text-5xl lg:text-[58px] leading-[1.18] sm:leading-[1.12] text-white font-medium tracking-tight mb-3 sm:mb-4 drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
              {currentSlide.titleLine1} <br />
              <span className="italic font-normal text-[#E7BFF5] drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
                {currentSlide.titleLine2}
              </span>
            </h1>

            {/* Subtext description */}
            <p className="text-xs sm:text-base text-[#F4ECF7] leading-relaxed mb-6 sm:mb-8 max-w-lg font-normal drop-shadow-[0_1px_5px_rgba(0,0,0,0.8)]">
              {currentSlide.description}
            </p>

            {/* Action Buttons with mobile touch target */}
            <div className="flex flex-row items-center gap-2.5 sm:gap-3.5">
              <button
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-8 py-3.5 sm:py-3.5 bg-[#723C90] hover:bg-[#542D6B] active:bg-[#431f57] text-white text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl group cursor-pointer border border-white/20 min-h-[44px]"
              >
                <span>Découvrir nos matelas DARY</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel controls shown only if multiple slides */}
        {HERO_SLIDES.length > 1 && (
          <>
            <div className="absolute inset-y-0 left-2 sm:left-4 z-20 flex items-center">
              <button
                onClick={handlePrev}
                aria-label="Image précédente"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/70 hover:bg-white text-[#2D1C38] flex items-center justify-center backdrop-blur-sm transition-all shadow-sm hover:shadow cursor-pointer opacity-75 hover:opacity-100"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
            <div className="absolute inset-y-0 right-2 sm:right-4 z-20 flex items-center">
              <button
                onClick={handleNext}
                aria-label="Image suivante"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/70 hover:bg-white text-[#2D1C38] flex items-center justify-center backdrop-blur-sm transition-all shadow-sm hover:shadow cursor-pointer opacity-75 hover:opacity-100"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  aria-label={`Aller au slide ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeSlide === idx ? 'w-6 bg-[#723C90]' : 'w-2 bg-white/50 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
