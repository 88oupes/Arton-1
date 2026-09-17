import { useState } from 'react';
import { Star, CheckCircle, ArrowRight, ThumbsUp, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { REVIEWS } from '../data/products';

interface ReviewsSectionProps {
  onWriteReview?: () => void;
}

export default function ReviewsSection({ onWriteReview }: ReviewsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [helpfulCounts, setHelpfulCounts] = useState<{ [key: string]: number }>({
    'rev-1': 14,
    'rev-2': 29,
    'rev-3': 11,
    'rev-4': 8,
  });

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === REVIEWS.length - 1 ? 0 : prev + 1));
  };

  const handleHelpful = (id: string) => {
    setHelpfulCounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const review = REVIEWS[currentIndex];

  return (
    <section id="avis" className="w-full bg-[#F8F6F9] py-16 sm:py-22 border-b border-[#F0EAF3] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-[#EADBEE]/70">
          {/* Left: Titles */}
          <div>
            <div className="w-8 h-1 bg-[#723C90] mb-3 rounded-full" />
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] text-[#2D1C38] font-normal tracking-tight">
              Ils dorment déjà mieux <span className="italic text-[#723C90]">avec DARY</span>
            </h2>
            <p className="text-sm sm:text-base text-[#665373] mt-1.5 font-normal">
              Des milliers de clients satisfaits à travers tout le Maroc.
            </p>
          </div>

          {/* Right: Global Score card & CTA */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 self-start lg:self-auto">
            <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-xl border border-[#EADBEE] shadow-2xs">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#2D1C38] tracking-tight">
                4,8/5
              </span>
              <div>
                <div className="flex text-[#723C90] gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <div className="text-[11px] text-[#665373] font-medium">
                  +1 500 avis vérifiés
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                if (onWriteReview) {
                  onWriteReview();
                }
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E5DAEA] hover:border-[#723C90] text-[#723C90] text-xs sm:text-sm font-semibold rounded-xl transition-colors shadow-xs group cursor-pointer"
            >
              <span>Donner mon avis</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Single Testimonial Showcase - Pure Text Format with Side Arrows */}
        <div className="mt-10 max-w-3xl mx-auto relative px-3 sm:px-12">
          {/* Left Arrow Button */}
          <button
            onClick={handlePrev}
            className="absolute left-0 sm:-left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-[#EADBEE] hover:border-[#723C90] text-[#542D6B] hover:text-[#723C90] shadow-md hover:shadow-lg flex items-center justify-center transition-all cursor-pointer group"
            title="Témoignage précédent"
            aria-label="Témoignage précédent"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:-translate-x-0.5" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={handleNext}
            className="absolute right-0 sm:-right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-[#EADBEE] hover:border-[#723C90] text-[#542D6B] hover:text-[#723C90] shadow-md hover:shadow-lg flex items-center justify-center transition-all cursor-pointer group"
            title="Témoignage suivant"
            aria-label="Témoignage suivant"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-0.5" />
          </button>

          {/* Main Text Testimonial Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-10 border border-[#EADBEE] shadow-[0_12px_35px_rgba(84,45,107,0.08)] relative">
            {/* Top Row: Stars, Product Bought & Counter */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-[#F4EEF6]">
              <div className="flex items-center gap-2">
                <div className="flex text-[#723C90] gap-0.5">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 sm:w-5 h-4 sm:h-5 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-bold text-[#723C90] bg-[#F3EDF6] px-2 py-0.5 rounded-full ml-1">
                  5.0
                </span>
                <span className="text-xs text-[#723C90] font-medium ml-2 hidden sm:inline">
                  • {review.productBought}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-[#8B7898]">{review.date}</span>
                <span className="text-xs font-semibold text-[#542D6B] bg-[#FAF5FC] px-2.5 py-1 rounded-full border border-[#EADBEE]">
                  {currentIndex + 1} / {REVIEWS.length}
                </span>
              </div>
            </div>

            {/* Testimonial Quote & Text */}
            <div className="py-6 sm:py-8 relative">
              <Quote className="w-10 h-10 text-[#723C90]/15 absolute -top-2 -left-2 pointer-events-none" />

              <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#2D1C38] leading-snug mb-3.5 relative z-10">
                « {review.title} »
              </h3>

              <p className="text-sm sm:text-base text-[#4C3B57] leading-relaxed relative z-10 font-normal">
                {review.comment}
              </p>
            </div>

            {/* Author Footer & Helpful button */}
            <div className="pt-6 border-t border-[#F4EEF6] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-sm sm:text-base font-bold text-[#2D1C38] flex items-center gap-1.5">
                  {review.author}
                  {review.verified && (
                    <span title="Achat vérifié" className="text-[#723C90] inline-flex items-center">
                      <CheckCircle className="w-4 h-4 fill-[#F0EAF3]" />
                    </span>
                  )}
                </div>
                <div className="text-xs text-[#7A6787] flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-0.5">
                  <span className="font-medium text-[#723C90] sm:hidden">{review.productBought} •</span>
                  <span>{review.city}</span>
                </div>
              </div>

              {/* Helpful count button */}
              <button
                onClick={() => handleHelpful(review.id)}
                className="flex items-center gap-1.5 self-start sm:self-auto text-xs font-semibold text-[#665373] hover:text-[#723C90] bg-[#F9F6FA] hover:bg-[#F3EDF6] px-3.5 py-1.5 rounded-lg border border-[#EADBEE] transition-colors cursor-pointer"
                title="Avis utile"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>Utile ({helpfulCounts[review.id]})</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
