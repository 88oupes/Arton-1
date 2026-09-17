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
    if (cleanCode === 'DARY15' || cleanCode === 'PROMO15' || cleanCode === '-15%' || cleanCode === 'ARTON15') {
      const discount = Math.round(subtotal * 0.15);
      setDiscountApplied(discount);
      setPromoError('');
    } else if (cleanCode === 'DARY20' || cleanCode === 'BIENVENUE' || cleanCode === 'ARTON20') {
      setDiscountApplied(200);
      setPromoError('');
    } else {
      setPromoError('Code promo invalide. Utilisez le code "DARY15" (-15%) !');
    }
  };

  const finalTotal = Math.max(0, subtotal - (discountApplied || 0));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
        {/* Cart Header */}
        <div className="p-5 border-b border-[#F0EAF3] flex items-center justify-between bg-[#F8F6F9]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#723C90]" />
            <h2 className="font-bold text-base text-[#2D1C38]">
              Votre panier DARY ({items.reduce((acc, item) => acc + item.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#A982B8] hover:text-[#2D1C38] rounded-lg hover:bg-[#F0EAF3] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free shipping progress bar */}
        <div className="bg-[#FAF7FC] px-5 py-3 border-b border-[#F0EAF3]">
          <div className="flex items-center justify-between text-xs font-semibold text-[#542D6B] mb-1.5">
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-[#723C90]" />
              {isFreeShipping ? (
                <span>Livraison standard offerte partout au Maroc !</span>
              ) : (
                <span>
                  Plus que {(freeShippingThreshold - subtotal).toLocaleString('fr-FR')} DH pour la livraison offerte
                </span>
              )}
            </span>
            {isFreeShipping && <Check className="w-4 h-4 text-[#723C90]" />}
          </div>
          <div className="w-full bg-[#EFE8F3] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#723C90] h-full transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4 text-[#665373]">
              <div className="w-16 h-16 rounded-full bg-[#F8F6F9] border border-[#F0EAF3] flex items-center justify-center text-[#A982B8]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="text-base font-semibold text-[#2D1C38]">Votre panier est vide</p>
              <p className="text-xs text-[#665373] max-w-xs">
                Découvrez nos matelas d'exception conçus avec passion dans notre atelier DARY au Maroc.
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-[#723C90] text-white rounded-lg text-xs font-semibold hover:bg-[#542D6B] transition-colors cursor-pointer shadow-sm"
              >
                Découvrir la collection DARY
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedSize}`}
                className="flex gap-4 p-3 bg-[#FAF8FB] rounded-xl border border-[#F0EAF3] shadow-2xs"
              >
                <div className="w-20 h-20 bg-white rounded-lg p-2 border border-[#F0EAF3] shrink-0 flex items-center justify-center">
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
                      <h3 className="font-bold text-sm text-[#2D1C38] leading-tight">
                        {item.product.name}
                      </h3>
                      <span className="text-xs text-[#665373] block mt-0.5">
                        Taille : {item.selectedSize}
                      </span>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.product.id, item.selectedSize)}
                      className="text-[#A982B8] hover:text-red-600 transition-colors p-1 cursor-pointer"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-[#E5DAEA] rounded-md bg-white">
                      <button
                        onClick={() =>
                          onUpdateQuantity(
                            item.product.id,
                            item.selectedSize,
                            item.quantity - 1,
                          )
                        }
                        className="px-2 py-0.5 text-xs text-[#554860] hover:bg-[#F0EAF3] font-bold cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-2.5 py-0.5 text-xs font-bold text-[#2D1C38]">
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
                        className="px-2 py-0.5 text-xs text-[#554860] hover:bg-[#F0EAF3] font-bold cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-sm font-bold text-[#723C90]">
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
          <div className="p-5 border-t border-[#F0EAF3] bg-white space-y-4">
            {/* Promo Code Input */}
            <div>
              {discountApplied ? (
                <div className="flex items-center justify-between bg-[#FAF5FC] text-[#723C90] px-3 py-2 rounded-lg text-xs font-medium border border-[#E5DAEA]">
                  <span className="flex items-center gap-1.5 font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-[#723C90]" />
                    Code promotionnel appliqué (-{discountApplied.toLocaleString('fr-FR')} DH)
                  </span>
                  <button
                    onClick={() => setDiscountApplied(null)}
                    className="text-[#A982B8] hover:text-[#2D1C38] font-bold cursor-pointer"
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
                    placeholder="Code promo (ex: DARY15)"
                    className="flex-1 px-3 py-1.5 border border-[#E5DAEA] rounded-lg text-xs focus:outline-none focus:border-[#723C90] uppercase"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-[#F0EAF3] hover:bg-[#E5DAEA] text-[#542D6B] text-xs font-semibold rounded-lg transition-colors cursor-pointer"
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
            <div className="space-y-1.5 text-xs text-[#554860] border-t border-[#F0EAF3] pt-3">
              <div className="flex justify-between">
                <span>Sous-total</span>
                <span className="font-semibold text-[#2D1C38]">{subtotal.toLocaleString('fr-FR')} DH</span>
              </div>

              {discountApplied && (
                <div className="flex justify-between text-[#723C90] font-semibold">
                  <span>Remise promo</span>
                  <span>- {discountApplied.toLocaleString('fr-FR')} DH</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Livraison</span>
                <span className="font-semibold text-[#723C90]">
                  {isFreeShipping ? 'Offerte' : '150 DH'}
                </span>
              </div>

              <div className="flex justify-between text-base font-bold text-[#2D1C38] pt-2 border-t border-[#F0EAF3]">
                <span>Total TTC</span>
                <span className="text-xl font-extrabold text-[#723C90]">
                  {finalTotal.toLocaleString('fr-FR')} DH
                </span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={onCheckout}
              className="w-full py-3.5 px-6 bg-[#723C90] hover:bg-[#542D6B] text-white rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-md group cursor-pointer"
            >
              <span>Valider ma commande</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Security Guarantee */}
            <div className="flex items-center justify-center gap-2 text-[11px] text-[#A982B8]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#723C90]" />
              <span>Paiement sécurisé • 100 nuits d'essai DARY incluses</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
