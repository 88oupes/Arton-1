import { useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Leaf, Star, Sparkles } from 'lucide-react';
import { heroBedroomImg } from '../data/products';

interface HeroProps {
  onExploreClick: () => void;
  onOpenQuiz: () => void;
}

export default function Hero({ onExploreClick, onOpenQuiz }: HeroProps) {
  const [activeSlide, setActiveSlide] = useState(1); // 0, 1, 2 (1 is active like in screenshot)

  const slides = [
    {
      eyebrow: 'MANUFACTURE MAROCAINE D\'EXCEPTION',
      titleLine1: 'L\'excellence',
      titleLine2: 'du repos',
      description: 'Chaque détail est pensé pour aligner parfaitement votre colonne vertébrale et réguler naturellement votre température.',
    },
    {
      eyebrow: 'DES NUITS MEILLEURES, UN DEMAIN PLUS DOUX',
      titleLine1: 'Le confort',
      titleLine2: 'naît ici',
      description: 'Des matelas fabriqués dans notre usine avec passion, pour votre bien-être et un sommeil durable.',
    },
    {
      eyebrow: 'MATÉRIAUX NOBLES & ÉCO-RESPONSABLES',
      titleLine1: 'Le naturel',
      titleLine2: 'réinventé',
      description: 'Latex 100% naturel, coton biologique et laine mérinos pour une pureté de sommeil sans compromis.',
    },
  ];

  const currentSlide = slides[activeSlide];

  const handlePrev = () => {
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative w-full bg-[#F4F1EA] overflow-hidden border-b border-[#E5E9E6]">
      {/* Background Image Container */}
      <div className="relative w-full min-h-[560px] sm:min-h-[640px] lg:min-h-[680px] flex items-center">
        {/* The Bedroom Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroBedroomImg}
            alt="Chambre raffinée avec lit et matelas d'exception Arton Confort"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-[70%_center] sm:object-right md:object-center scale-100 transition-transform duration-1000 ease-out"
          />
          {/* Subtle natural vignette & left white wash gradient matching the photo layout */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#F7F8F7]/95 via-[#F7F8F7]/80 to-transparent sm:w-[60%] lg:w-[50%]" />
          <div className="absolute inset-0 bg-black/5" />
        </div>

        {/* Top Right Floating Accent Badge */}
        <div className="absolute top-8 right-6 lg:top-12 lg:right-16 z-20 hidden md:block">
          <div className="bg-white/90 backdrop-blur-md px-6 py-4 rounded-xl shadow-lg border border-white/60 max-w-[240px] text-center">
            <p className="font-serif text-[17px] leading-snug text-[#1E293B] italic">
              « Un meilleur sommeil pour une vie plus belle »
            </p>
            <div className="w-10 h-0.5 bg-[#204033] mx-auto mt-2.5 rounded-full" />
          </div>
        </div>

        {/* Interactive Arton Confort Mattress Label Tag */}
        <div className="absolute bottom-24 right-10 lg:bottom-28 lg:right-32 z-20 hidden sm:block">
          <div className="bg-[#132B45] text-white px-4 py-2 rounded-lg shadow-xl text-xs font-semibold tracking-wider flex items-center gap-2.5 border border-[#BA8C48]/40">
            <span className="w-2.5 h-2.5 rounded-full bg-[#BA8C48] animate-pulse" />
            <span className="font-serif font-bold text-white tracking-wide">ARTON CONFORT</span>
            <span className="text-[10px] text-slate-300 font-normal pl-1 border-l border-slate-600">Matelas Consoft • Fait au Maroc</span>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-24 w-full">
          <div className="max-w-xl">
            {/* Tagline / Eyebrow */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-[#475569] uppercase mb-4 sm:mb-6">
              <span className="w-2 h-2 rounded-full bg-[#204033]" />
              {currentSlide.eyebrow}
            </div>

            {/* Main Grand Serif Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[68px] leading-[1.08] text-[#0F172A] font-medium tracking-tight mb-5 sm:mb-6">
              {currentSlide.titleLine1} <br />
              <span className="italic font-normal">{currentSlide.titleLine2}</span>
            </h1>

            {/* Subtext description */}
            <p className="text-base sm:text-lg text-[#475569] leading-relaxed mb-8 max-w-lg font-normal">
              {currentSlide.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-10 sm:mb-12">
              <button
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-[#0F172A] hover:bg-[#1E293B] text-white text-[15px] font-semibold rounded-lg transition-all shadow-md hover:shadow-lg group cursor-pointer"
              >
                <span>Découvrir nos matelas</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onOpenQuiz}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-white/80 hover:bg-white text-[#204033] border border-[#CBD5E1] text-sm font-semibold rounded-lg transition-all backdrop-blur-xs shadow-xs hover:border-[#204033]"
              >
                <Sparkles className="w-4 h-4 text-[#204033]" />
                <span>Guide de choix (2 min)</span>
              </button>
            </div>

            {/* 3 Circular Micro-Badges from the screenshot */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 border-t border-[#CBD5E1]/60">
              {/* Badge 1: Fabrication marocaine */}
              <div className="flex items-center gap-2 text-xs font-semibold text-[#1E293B]">
                <div className="w-7 h-7 rounded-full bg-white shadow-xs border border-[#CBD5E1] flex items-center justify-center text-[#204033]">
                  {/* Split circle icon */}
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 3v18" />
                  </svg>
                </div>
                <span>Fabrication marocaine</span>
              </div>

              {/* Badge 2: Matériaux durables */}
              <div className="flex items-center gap-2 text-xs font-semibold text-[#1E293B]">
                <div className="w-7 h-7 rounded-full bg-white shadow-xs border border-[#CBD5E1] flex items-center justify-center text-[#204033]">
                  <Leaf className="w-3.5 h-3.5" />
                </div>
                <span>Matériaux durables</span>
              </div>

              {/* Badge 3: Satisfaction clients 4,8/5 */}
              <div className="flex items-center gap-2 text-xs font-semibold text-[#1E293B]">
                <div className="w-7 h-7 rounded-full bg-white shadow-xs border border-[#CBD5E1] flex items-center justify-center text-[#EAB308]">
                  <Star className="w-3.5 h-3.5 fill-current" />
                </div>
                <span>Satisfaction clients 4,8/5</span>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Chevron Controls */}
        <button
          onClick={handlePrev}
          aria-label="Slide précédente"
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[#0F172A] shadow-md flex items-center justify-center transition-all border border-gray-200/80 hover:scale-105 cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={handleNext}
          aria-label="Slide suivante"
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[#0F172A] shadow-md flex items-center justify-center transition-all border border-gray-200/80 hover:scale-105 cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Bottom 3 Dots Indicator */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              aria-label={`Aller au slide ${idx + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                activeSlide === idx
                  ? 'w-6 h-2 bg-[#0F172A]'
                  : 'w-2 h-2 bg-gray-400/60 hover:bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
