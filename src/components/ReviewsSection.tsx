import { useState } from 'react';
import { Star, CheckCircle, ThumbsUp, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { REVIEWS } from '../data/products';

interface ReviewsSectionProps {
  onWriteReview?: () => void;
}

export default function ReviewsSection({}: ReviewsSectionProps) {
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
    <section id="avis" className="w-full bg-[#FAF9F7] py-8 sm:py-12 border-b border-[#E8EEF5] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="pb-5 border-b border-[#E8EEF5]">
          <div className="w-8 h-1 bg-[#BA8C48] mb-2 rounded-full" />
          <h2 className="font-serif text-2xl sm:text-3xl text-[#132B45] font-normal tracking-tight">
            Ils dorment déjà mieux <span className="italic text-[#BA8C48]">avec ARTON CONFORT</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#536B82] mt-1 font-normal">
            Des milliers de dormeurs comblés à travers tout le Maroc.
          </p>
        </div>

        {/* Single Testimonial Showcase - Compact Format */}
        <div className="mt-6 max-w-2xl mx-auto relative px-2 sm:px-10">
          {/* Left Arrow Button */}
          <button
            onClick={handlePrev}
            className="absolute left-0 sm:-left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-[#E8EEF5] hover:border-[#BA8C48] text-[#132B45] hover:text-[#BA8C48] shadow-xs hover:shadow-md flex items-center justify-center transition-all cursor-pointer group"
            title="Témoignage précédent"
            aria-label="Témoignage précédent"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:-translate-x-0.5" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={handleNext}
            className="absolute right-0 sm:-right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-[#E8EEF5] hover:border-[#BA8C48] text-[#132B45] hover:text-[#BA8C48] shadow-xs hover:shadow-md flex items-center justify-center transition-all cursor-pointer group"
            title="Témoignage suivant"
            aria-label="Témoignage suivant"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-0.5" />
          </button>

          {/* Main Text Testimonial Card */}
          <div className="bg-white rounded-xl p-4 sm:p-6 border border-[#E8EEF5] shadow-xs relative">
            {/* Top Row: Stars, Product Bought & Counter */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#F0F4F8]">
              <div className="flex items-center gap-1.5">
                <div className="flex text-[#BA8C48] gap-0.5">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-[11px] font-bold text-[#BA8C48] bg-[#FAF6EE] px-1.5 py-0.5 rounded-full ml-1 border border-[#E6D6B6]">
                  5.0
                </span>
                <span className="text-xs text-[#132B45] font-medium ml-1.5 hidden sm:inline">
                  • {review.productBought}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-[#536B82]">{review.date}</span>
                <span className="text-[11px] font-semibold text-[#132B45] bg-[#F7F9FB] px-2 py-0.5 rounded-full border border-[#E8EEF5]">
                  {currentIndex + 1} / {REVIEWS.length}
                </span>
              </div>
            </div>

            {/* Testimonial Quote & Text */}
            <div className="py-3 sm:py-4 relative">
              <Quote className="w-7 h-7 text-[#BA8C48]/20 absolute -top-1 -left-1 pointer-events-none" />

              <h3 className="font-serif font-bold text-base sm:text-lg text-[#132B45] leading-snug mb-2 relative z-10">
                « {review.title} »
              </h3>

              <p className="text-xs sm:text-sm text-[#37485A] leading-relaxed relative z-10 font-normal">
                {review.comment}
              </p>
            </div>

            {/* Author Footer & Helpful button */}
            <div className="pt-3 border-t border-[#F0F4F8] flex items-center justify-between gap-3">
              <div>
                <div className="text-xs sm:text-sm font-bold text-[#132B45] flex items-center gap-1">
                  {review.author}
                  {review.verified && (
                    <span title="Achat vérifié" className="text-[#BA8C48] inline-flex items-center">
                      <CheckCircle className="w-3.5 h-3.5 fill-[#FAF6EE]" />
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-[#536B82] flex flex-wrap items-center gap-x-2 mt-0.5">
                  <span className="font-medium text-[#132B45] sm:hidden">{review.productBought} •</span>
                  <span>{review.city}</span>
                </div>
              </div>

              {/* Helpful count button */}
              <button
                onClick={() => handleHelpful(review.id)}
                className="flex items-center gap-1.5 text-[11px] font-semibold text-[#536B82] hover:text-[#132B45] bg-[#FAF9F7] hover:bg-[#F0F4F8] px-2.5 py-1 rounded-md border border-[#E8EEF5] transition-colors cursor-pointer"
                title="Avis utile"
              >
                <ThumbsUp className="w-3 h-3 text-[#BA8C48]" />
                <span>Utile ({helpfulCounts[review.id]})</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
