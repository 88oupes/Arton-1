import { Star, CheckCircle, ArrowRight, ThumbsUp } from 'lucide-react';
import { useState } from 'react';
import { REVIEWS } from '../data/products';

interface ReviewsSectionProps {
  onWriteReview?: () => void;
}

export default function ReviewsSection({ onWriteReview }: ReviewsSectionProps) {
  const [helpfulCounts, setHelpfulCounts] = useState<{ [key: string]: number }>({
    'rev-1': 14,
    'rev-2': 29,
    'rev-3': 11,
    'rev-4': 8,
  });

  const handleHelpful = (id: string) => {
    setHelpfulCounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  return (
    <section id="avis" className="w-full bg-[#FAFBF9] py-16 sm:py-22 border-b border-[#E5EAE7]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header exactly like the screenshot */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-10 border-b border-[#E2E8E4]">
          {/* Left: Titles */}
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] text-[#0F172A] font-normal tracking-tight">
              Ils dorment déjà mieux
            </h2>
            <p className="text-base text-[#64748B] mt-1.5 font-normal">
              Des milliers de clients nous font confiance.
            </p>
          </div>

          {/* Right: Score card & CTA */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-8 self-start lg:self-auto">
            <div className="flex items-center gap-3">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
                4,8/5
              </span>
              <div>
                <div className="flex text-[#F59E0B] gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <div className="text-xs text-[#64748B] mt-0.5 font-medium">
                  Sur plus de 1 500 avis clients
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                if (onWriteReview) {
                  onWriteReview();
                } else {
                  alert('Merci de votre intérêt ! Les 1 500+ avis certifiés Arton Confort sont collectés via Avis Vérifiés®.');
                }
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-[#CBD5E1] hover:border-[#0F172A] text-[#0F172A] text-xs sm:text-sm font-semibold rounded-lg transition-colors shadow-xs group cursor-pointer"
            >
              <span>Voir tous les avis</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Customer Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-xl p-6 border border-[#E2E8E4] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Header with stars & date */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex text-[#F59E0B] gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] text-[#94A3B8]">{review.date}</span>
                </div>

                {/* Review Title */}
                <h3 className="font-bold text-sm text-[#0F172A] leading-snug mb-2">
                  « {review.title} »
                </h3>

                {/* Review Body */}
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed line-clamp-4">
                  {review.comment}
                </p>
              </div>

              {/* Author Footer */}
              <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#0F172A] flex items-center gap-1">
                    {review.author}
                    {review.verified && (
                      <span title="Achat vérifié" className="text-emerald-600 inline-flex items-center">
                        <CheckCircle className="w-3.5 h-3.5 fill-emerald-100" />
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-[#64748B]">{review.productBought}</div>
                </div>

                <button
                  onClick={() => handleHelpful(review.id)}
                  className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-emerald-700 transition-colors p-1 rounded-sm"
                  title="Avis utile"
                >
                  <ThumbsUp className="w-3 h-3" />
                  <span>{helpfulCounts[review.id]}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
