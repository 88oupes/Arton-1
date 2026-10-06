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
    <section id="matelas" className="w-full bg-[#FAF9F7] py-14 sm:py-20 border-b border-[#E8EEF5]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Responsive Grid: Callout banner on top or left, followed by the 4 cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Left Callout Block */}
          <div className="lg:col-span-3 flex flex-col justify-between p-6 sm:p-8 bg-transparent">
            <div>
              <div className="w-8 h-1 bg-[#BA8C48] mb-4 rounded-full" />
              <h2 className="font-serif text-3xl sm:text-4xl text-[#132B45] font-normal tracking-tight leading-[1.15]">
                Nos matelas <br />
                <span className="italic font-normal text-[#BA8C48]">les plus populaires</span>
              </h2>
              <p className="text-sm text-[#536B82] mt-4 leading-relaxed font-normal">
                Des modèles signature plébiscités pour leur maintien morphologique, leur confort palace et leur confection marocaine certifiée.
              </p>
            </div>

            <div className="mt-8">
              <a
                href="#matelas"
                onClick={(e) => {
                  e.preventDefault();
                  onSelectProduct(PRODUCTS[0]);
                }}
                className="inline-flex items-center gap-2 px-5 py-3 bg-[#132B45] hover:bg-[#0B1C2E] text-white text-xs sm:text-sm font-semibold rounded-lg transition-all shadow-sm hover:shadow-md group cursor-pointer"
              >
                <span>Voir la collection ARTON</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#BA8C48]" />
              </a>
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
            {PRODUCTS.filter((p) => p.category === 'matelas').slice(0, 8).map((product) => (
              <div
                key={product.id}
                id={product.id}
                onClick={() => onSelectProduct(product)}
                className="group relative bg-white rounded-xl overflow-hidden border border-[#E8EEF5] shadow-xs hover:shadow-xl hover:border-[#BA8C48]/50 transition-all duration-300 flex flex-col cursor-pointer"
              >
                {/* Top Badge (if present) */}
                <div className="absolute top-3 left-3 z-10">
                  {product.badge ? (
                    <span
                      className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold text-white tracking-wide shadow-xs"
                      style={{
                        backgroundColor: product.badgeColor || '#BA8C48',
                      }}
                    >
                      {product.badge}
                    </span>
                  ) : null}
                </div>

                {/* Product Image Stage */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F7F9FB] p-4 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </div>

                {/* Card Details */}
                <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 border-t border-[#E8EEF5]">
                  <div>
                    <h3 className="font-bold text-[15px] sm:text-base text-[#132B45] group-hover:text-[#BA8C48] transition-colors leading-snug">
                      {product.name}
                    </h3>
                    <div className="mt-1 text-xs sm:text-sm font-medium text-[#536B82]">
                      À partir de <span className="font-bold text-[#132B45]">{product.price.toLocaleString('fr-FR')} DH</span>
                    </div>
                  </div>

                  {/* Rating Stars and Cart Button */}
                  <div className="mt-4 pt-3 flex items-center justify-between border-t border-[#F0F4F8]">
                    {/* Stars */}
                    <div className="flex items-center gap-1">
                      <div className="flex text-[#BA8C48]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="text-xs text-[#536B82] font-medium ml-1">
                        ({product.reviewsCount})
                      </span>
                    </div>

                    {/* Quick Add Button */}
                    <button
                      onClick={(e) => handleQuickAdd(e, product)}
                      className={`w-9 h-9 rounded-md flex items-center justify-center transition-all cursor-pointer shadow-xs ${
                        addedId === product.id
                          ? 'bg-[#BA8C48] text-white scale-105'
                          : 'bg-[#132B45] hover:bg-[#BA8C48] text-white active:scale-95'
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
