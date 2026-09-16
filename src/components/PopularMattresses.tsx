import { ShoppingBag, Star, ArrowRight, Check } from 'lucide-react';
import { useState, type MouseEvent } from 'react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';

interface PopularMattressesProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size: string) => void;
}

export default function PopularMattresses({ onSelectProduct, onAddToCart }: PopularMattressesProps) {
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleQuickAdd = (e: MouseEvent, product: Product) => {
    e.stopPropagation();
    onAddToCart(product, product.sizes[0].size);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  return (
    <section id="matelas" className="w-full bg-[#EDF2EF] py-14 sm:py-20 border-b border-[#D8E2DC]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Responsive Grid: Callout banner on top or left, followed by the 4 cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Left Callout Block */}
          <div className="lg:col-span-3 flex flex-col justify-between p-6 sm:p-8 bg-transparent">
            <div>
              <div className="w-8 h-1 bg-[#204033] mb-4 rounded-full" />
              <h2 className="font-serif text-3xl sm:text-4xl text-[#0F172A] font-normal tracking-tight leading-[1.15]">
                Nos matelas <br />
                <span className="italic font-normal">les plus populaires</span>
              </h2>
              <p className="text-sm text-[#526460] mt-4 leading-relaxed font-normal">
                Des modèles plébiscités pour leur confort, leur durabilité et leur excellent rapport qualité-prix.
              </p>
            </div>

            <div className="mt-8">
              <a
                href="#matelas"
                onClick={(e) => {
                  e.preventDefault();
                  onSelectProduct(PRODUCTS[0]);
                }}
                className="inline-flex items-center gap-2 px-5 py-3 bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs sm:text-sm font-semibold rounded-lg transition-all shadow-xs group cursor-pointer"
              >
                <span>Voir tous les matelas</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* 4 Product Cards Grid */}
          <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
            {PRODUCTS.map((product) => (
              <div
                key={product.id}
                id={product.id}
                onClick={() => onSelectProduct(product)}
                className="group relative bg-white rounded-xl overflow-hidden border border-[#DCE4DF] shadow-xs hover:shadow-xl hover:border-[#204033]/30 transition-all duration-300 flex flex-col cursor-pointer"
              >
                {/* Top Badge (if present) */}
                <div className="absolute top-3 left-3 z-10">
                  {product.badge ? (
                    <span
                      className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold text-white tracking-wide shadow-xs"
                      style={{
                        backgroundColor: product.badgeColor || '#204033',
                      }}
                    >
                      {product.badge}
                    </span>
                  ) : null}
                </div>

                {/* Product Image Stage */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FAFBFA] p-4 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </div>

                {/* Card Details */}
                <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 border-t border-[#F0F2F0]">
                  <div>
                    <h3 className="font-bold text-[15px] sm:text-base text-[#0F172A] group-hover:text-[#204033] transition-colors leading-snug">
                      {product.name}
                    </h3>
                    <div className="mt-1 text-xs sm:text-sm font-medium text-[#475569]">
                      À partir de <span className="font-bold text-[#0F172A]">{product.price.toLocaleString('fr-FR')} DH</span>
                    </div>
                  </div>

                  {/* Rating Stars and Cart Button matching screenshot */}
                  <div className="mt-4 pt-3 flex items-center justify-between border-t border-[#F1F5F2]">
                    {/* Stars */}
                    <div className="flex items-center gap-1">
                      <div className="flex text-[#F59E0B]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="text-xs text-[#64748B] font-medium ml-1">
                        ({product.reviewsCount})
                      </span>
                    </div>

                    {/* Quick Add Square Navy Button */}
                    <button
                      onClick={(e) => handleQuickAdd(e, product)}
                      className={`w-9 h-9 rounded-md flex items-center justify-center transition-all cursor-pointer shadow-xs ${
                        addedId === product.id
                          ? 'bg-[#10B981] text-white scale-105'
                          : 'bg-[#0F172A] hover:bg-[#204033] text-white active:scale-95'
                      }`}
                      title={`Ajouter ${product.name} au panier`}
                      aria-label={`Ajouter ${product.name} au panier`}
                    >
                      {addedId === product.id ? (
                        <Check className="w-4 h-4 stroke-[2.5]" />
                      ) : (
                        <ShoppingBag className="w-4 h-4 stroke-[1.8]" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
