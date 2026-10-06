import { useState } from 'react';
import { X, Star, ShieldCheck, Truck, Check, ShoppingBag } from 'lucide-react';
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
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#E8EEF5] animate-in zoom-in-95 duration-250 my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#132B45] hover:text-[#BA8C48] shadow-md flex items-center justify-center transition-colors border border-[#E8EEF5] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Product Image Stage */}
          <div className="bg-[#FAF9F7] p-6 sm:p-10 flex flex-col items-center justify-center relative border-b md:border-b-0 md:border-r border-[#E8EEF5]">
            {product.badge && (
              <span
                className="absolute top-6 left-6 px-3.5 py-1 rounded-full text-xs font-bold text-white shadow-xs"
                style={{ backgroundColor: product.badgeColor || '#BA8C48' }}
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
            <div className="w-full grid grid-cols-2 gap-3 mt-6 text-xs text-[#536B82]">
              <div className="bg-white p-2.5 rounded-lg border border-[#E8EEF5] text-center">
                <span className="text-[#8BA0B8] block text-[10px] uppercase font-semibold">Épaisseur</span>
                <span className="font-bold text-[#132B45]">{product.thickness}</span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-[#E8EEF5] text-center">
                <span className="text-[#8BA0B8] block text-[10px] uppercase font-semibold">Soutien</span>
                <span className="font-bold text-[#132B45]">{product.firmness}</span>
              </div>
            </div>
          </div>

          {/* Right: Customization & Purchase Options */}
          <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              {/* Rating */}
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-[#BA8C48]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-[#132B45]">{product.rating}/5</span>
                <span className="text-xs text-[#536B82]">({product.reviewsCount} avis vérifiés ARTON CONFORT)</span>
              </div>

              {/* Title & Price */}
              <h2 className="font-serif text-2xl sm:text-3xl text-[#132B45] font-bold">
                {product.name}
              </h2>

              <div className="mt-2 flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-[#132B45]">
                  {(currentPrice * quantity).toLocaleString('fr-FR')} DH
                </span>
                {product.originalPrice && (
                  <span className="text-base text-gray-400 line-through">
                    {(Math.round(product.originalPrice * (currentPrice / product.price)) * quantity).toLocaleString('fr-FR')} DH
                  </span>
                )}
                <span className="text-xs text-[#BA8C48] bg-[#FAF6EE] border border-[#E6D6B6] px-2.5 py-1 rounded-md font-semibold">
                  TTC • Livraison offerte partout au Maroc
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#536B82] mt-3 leading-relaxed">
                {product.description}
              </p>

              {/* Dimension / Size Selector */}
              <div className="mt-5">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#132B45]">
                    Choisir la dimension :
                  </label>
                  <span className="text-xs text-[#BA8C48] font-semibold">
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
                          ? 'border-[#132B45] bg-[#132B45] text-white shadow-xs'
                          : 'border-[#E8EEF5] bg-[#FAF9F7] hover:bg-white text-[#132B45]'
                      }`}
                    >
                      <div className="font-bold">{sz.size}</div>
                      <div className={`text-[11px] ${selectedSizeIndex === idx ? 'text-[#FAF6EE]' : 'text-[#536B82]'}`}>
                        {sz.price.toLocaleString('fr-FR')} DH
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Key Features List */}
              <div className="mt-5 pt-4 border-t border-[#E8EEF5]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#132B45] block mb-2">
                  Caractéristiques d'exception :
                </span>
                <ul className="space-y-1.5 text-xs text-[#37485A]">
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#BA8C48] shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 pt-4 border-t border-[#E8EEF5]">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-[#E8EEF5] rounded-lg overflow-hidden bg-[#FAF9F7]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-[#132B45] hover:bg-[#E8EEF5] font-bold transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-sm font-semibold text-[#132B45] min-w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-[#132B45] hover:bg-[#E8EEF5] font-bold transition-colors cursor-pointer"
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
                      ? 'bg-[#BA8C48] text-white'
                      : 'bg-[#132B45] hover:bg-[#0B1C2E] text-white active:scale-98'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Ajouté au panier !</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-[#BA8C48]" />
                      <span>Ajouter au panier • {(currentPrice * quantity).toLocaleString('fr-FR')} DH</span>
                    </>
                  )}
                </button>
              </div>

              {/* Reassurances mini */}
              <div className="flex items-center justify-between gap-2 mt-4 text-[11px] text-[#536B82] pt-3 border-t border-[#E8EEF5]">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-[#BA8C48]" />
                  Livraison offerte
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#BA8C48]" />
                  {product.warranty || 'Garantie longue durée'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
