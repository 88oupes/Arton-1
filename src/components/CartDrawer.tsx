import { useState, type FormEvent } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck, Check, Sparkles } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, size: string, newQty: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartDrawerProps) {
  if (!isOpen) return null;

  const [promoInput, setPromoInput] = useState('');
  const [discountApplied, setDiscountApplied] = useState<number | null>(null);
  const [promoError, setPromoError] = useState('');

  const subtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const freeShippingThreshold = 2000;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const isFreeShipping = subtotal >= freeShippingThreshold;

  const handleApplyPromo = (e: FormEvent) => {
    e.preventDefault();
    const cleanCode = promoInput.trim().toUpperCase();
    if (cleanCode === 'ARTON20' || cleanCode === 'ARTONCONFORT' || cleanCode === 'DORMI20' || cleanCode === 'BIENVENUE') {
      setDiscountApplied(200);
      setPromoError('');
    } else {
      setPromoError('Code promo invalide. Essayez "ARTON20" !');
    }
  };

  const finalTotal = Math.max(0, subtotal - (discountApplied || 0));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
        {/* Cart Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-[#F8FAF8]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#204033]" />
            <h2 className="font-bold text-base text-[#0F172A]">
              Votre panier ({items.reduce((acc, item) => acc + item.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-black rounded-lg hover:bg-gray-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free shipping progress bar */}
        <div className="bg-[#EEF4F0] px-5 py-3 border-b border-[#D8E6DD]">
          <div className="flex items-center justify-between text-xs font-semibold text-[#204033] mb-1.5">
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4" />
              {isFreeShipping ? (
                <span>Livraison standard offerte partout au Maroc !</span>
              ) : (
                <span>
                  Plus que {(freeShippingThreshold - subtotal).toLocaleString('fr-FR')} DH pour la livraison offerte
                </span>
              )}
            </span>
            {isFreeShipping && <Check className="w-4 h-4 text-emerald-600" />}
          </div>
          <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#204033] h-full transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4 text-gray-500">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="text-base font-semibold text-gray-700">Votre panier est vide</p>
              <p className="text-xs text-gray-500 max-w-xs">
                Découvrez nos matelas conçus avec passion dans notre usine au Maroc.
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-[#204033] text-white rounded-lg text-xs font-semibold hover:bg-[#183329] transition-colors"
              >
                Découvrir nos matelas
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedSize}`}
                className="flex gap-4 p-3 bg-[#FBFBFB] rounded-xl border border-gray-100 shadow-2xs"
              >
                <div className="w-20 h-20 bg-white rounded-lg p-2 border border-gray-100 shrink-0 flex items-center justify-center">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h3 className="font-bold text-sm text-[#0F172A] leading-tight">
                        {item.product.name}
                      </h3>
                      <span className="text-xs text-gray-500 block mt-0.5">
                        Taille : {item.selectedSize}
                      </span>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.product.id, item.selectedSize)}
                      className="text-gray-400 hover:text-red-600 transition-colors p-1"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-gray-200 rounded-md bg-white">
                      <button
                        onClick={() =>
                          onUpdateQuantity(
                            item.product.id,
                            item.selectedSize,
                            item.quantity - 1,
                          )
                        }
                        className="px-2 py-0.5 text-xs text-gray-600 hover:bg-gray-100 font-bold"
                      >
                        -
                      </button>
                      <span className="px-2.5 py-0.5 text-xs font-bold text-gray-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          onUpdateQuantity(
                            item.product.id,
                            item.selectedSize,
                            item.quantity + 1,
                          )
                        }
                        className="px-2 py-0.5 text-xs text-gray-600 hover:bg-gray-100 font-bold"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-sm font-bold text-[#0F172A]">
                      {(item.unitPrice * item.quantity).toLocaleString('fr-FR')} DH
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Footer */}
        {items.length > 0 && (
          <div className="p-5 border-t border-gray-200 bg-white space-y-4">
            {/* Promo Code Input */}
            <div>
              {discountApplied ? (
                <div className="flex items-center justify-between bg-emerald-50 text-emerald-800 px-3 py-2 rounded-lg text-xs font-medium border border-emerald-200">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    Code promotionnel appliqué (-200 DH)
                  </span>
                  <button
                    onClick={() => setDiscountApplied(null)}
                    className="text-gray-500 hover:text-black font-bold"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Code promo (ex: ARTON20)"
                    className="flex-1 px-3 py-1.5 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-[#204033] uppercase"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    Appliquer
                  </button>
                </form>
              )}
              {promoError && (
                <span className="text-[11px] text-red-500 block mt-1">{promoError}</span>
              )}
            </div>

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-gray-600 border-t border-gray-100 pt-3">
              <div className="flex justify-between">
                <span>Sous-total</span>
                <span className="font-semibold text-gray-900">{subtotal.toLocaleString('fr-FR')} DH</span>
              </div>

              {discountApplied && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Remise promo</span>
                  <span>- {discountApplied.toLocaleString('fr-FR')} DH</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Livraison</span>
                <span className="font-semibold text-emerald-700">
                  {isFreeShipping ? 'Offerte' : '150 DH'}
                </span>
              </div>

              <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t border-gray-100">
                <span>Total TTC</span>
                <span className="text-xl font-extrabold text-[#204033]">
                  {finalTotal.toLocaleString('fr-FR')} DH
                </span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={onCheckout}
              className="w-full py-3.5 px-6 bg-[#204033] hover:bg-[#183329] text-white rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-md group cursor-pointer"
            >
              <span>Valider ma commande</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Security Guarantee */}
            <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Paiement 100% sécurisé • 100 nuits d'essai incluses</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
