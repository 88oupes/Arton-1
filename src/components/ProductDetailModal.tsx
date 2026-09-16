import { useState } from 'react';
import { X, Star, ShieldCheck, RotateCcw, Truck, Check, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, quantity: number) => void;
}

export default function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
}: ProductDetailModalProps) {
  if (!product) return null;

  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const currentSizeObj = product.sizes[selectedSizeIndex] || product.sizes[0];
  const currentPrice = currentSizeObj.price;

  const handleAdd = () => {
    onAddToCart(product, currentSizeObj.size, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 animate-in zoom-in-95 duration-250 my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-gray-700 hover:text-black shadow-md flex items-center justify-center transition-colors border border-gray-200 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Product Image Stage */}
          <div className="bg-[#F6F8F6] p-6 sm:p-10 flex flex-col items-center justify-center relative border-b md:border-b-0 md:border-r border-[#E8ECE9]">
            {product.badge && (
              <span
                className="absolute top-6 left-6 px-3.5 py-1 rounded-full text-xs font-bold text-white shadow-xs"
                style={{ backgroundColor: product.badgeColor || '#204033' }}
              >
                {product.badge}
              </span>
            )}

            <div className="w-full max-w-sm aspect-4/3 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain drop-shadow-xl"
              />
            </div>

            {/* Quick specifications badges */}
            <div className="w-full grid grid-cols-2 gap-3 mt-6 text-xs text-[#475569]">
              <div className="bg-white p-2.5 rounded-lg border border-[#E2E8E4] text-center">
                <span className="text-gray-400 block text-[10px] uppercase">Épaisseur</span>
                <span className="font-bold text-[#0F172A]">{product.thickness}</span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-[#E2E8E4] text-center">
                <span className="text-gray-400 block text-[10px] uppercase">Soutien</span>
                <span className="font-bold text-[#204033]">{product.firmness}</span>
              </div>
            </div>
          </div>

          {/* Right: Customization & Purchase Options */}
          <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              {/* Rating */}
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-[#F59E0B]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-[#0F172A]">{product.rating}/5</span>
                <span className="text-xs text-gray-500">({product.reviewsCount} avis vérifiés)</span>
              </div>

              {/* Title & Price */}
              <h2 className="font-serif text-2xl sm:text-3xl text-[#0F172A] font-bold">
                {product.name}
              </h2>

              <div className="mt-2 flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-[#0F172A]">
                  {currentPrice * quantity} €
                </span>
                {product.originalPrice && (
                  <span className="text-base text-gray-400 line-through">
                    {Math.round(product.originalPrice * (currentPrice / product.price)) * quantity} €
                  </span>
                )}
                <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm font-semibold">
                  TTC • Livraison offerte
                </span>
              </div>

              <p className="text-xs sm:text-sm text-gray-600 mt-3 leading-relaxed">
                {product.description}
              </p>

              {/* Dimension / Size Selector */}
              <div className="mt-5">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
                    Choisir la dimension :
                  </label>
                  <span className="text-xs text-gray-500 font-medium">
                    {currentSizeObj.size}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {product.sizes.map((sz, idx) => (
                    <button
                      key={sz.size}
                      type="button"
                      onClick={() => setSelectedSizeIndex(idx)}
                      className={`p-2.5 rounded-lg text-xs font-medium border text-left transition-all cursor-pointer ${
                        selectedSizeIndex === idx
                          ? 'border-[#204033] bg-[#204033] text-white shadow-xs'
                          : 'border-gray-200 bg-gray-50 hover:bg-white text-gray-800'
                      }`}
                    >
                      <div className="font-bold">{sz.size}</div>
                      <div className={`text-[11px] ${selectedSizeIndex === idx ? 'text-emerald-100' : 'text-gray-500'}`}>
                        {sz.price} €
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Key Features List */}
              <div className="mt-5 pt-4 border-t border-gray-100">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0F172A] block mb-2">
                  Caractéristiques exclusives :
                </span>
                <ul className="space-y-1.5 text-xs text-gray-600">
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-200 font-bold transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-sm font-semibold text-gray-800 min-w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-200 font-bold transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Add to cart CTA */}
                <button
                  onClick={handleAdd}
                  disabled={added}
                  className={`flex-1 py-3.5 px-6 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                    added
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#204033] hover:bg-[#183329] text-white active:scale-98'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Ajouté au panier !</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Ajouter au panier • {currentPrice * quantity} €</span>
                    </>
                  )}
                </button>
              </div>

              {/* Reassurances mini */}
              <div className="flex items-center justify-between gap-2 mt-4 text-[11px] text-gray-500 pt-3 border-t border-gray-100">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-emerald-600" />
                  Livraison gratuite 48-72h
                </span>
                <span className="flex items-center gap-1">
                  <RotateCcw className="w-3.5 h-3.5 text-emerald-600" />
                  100 nuits d'essai
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Garantie 10 ans
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
