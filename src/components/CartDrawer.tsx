import { useState, type FormEvent } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck, Check, Sparkles } from 'lucide-react';
import { CartItem } from '../types';

export interface CheckoutData {
  subtotal: number;
  discount: number;
  promoCode?: string;
  finalTotal: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, size: string, newQty: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onCheckout: (data: CheckoutData) => void;
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
    if (cleanCode === 'ARTON15' || cleanCode === 'DARY15' || cleanCode === 'PROMO15' || cleanCode === '-15%') {
      const discount = Math.round(subtotal * 0.15);
      setDiscountApplied(discount);
      setPromoError('');
    } else if (cleanCode === 'ARTON20' || cleanCode === 'DARY20' || cleanCode === 'BIENVENUE') {
      const discount = 200;
      setDiscountApplied(discount);
      setPromoError('');
    } else {
      setPromoError('Code promo invalide. Utilisez le code "ARTON15" (-15%) !');
    }
  };

  const finalTotal = Math.max(0, subtotal - (discountApplied || 0));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
        {/* Cart Header */}
        <div className="p-5 border-b border-[#E8EEF5] flex items-center justify-between bg-[#FAF9F7]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#132B45]" />
            <h2 className="font-bold text-base text-[#132B45]">
              Votre panier ARTON ({items.reduce((acc, item) => acc + item.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#536B82] hover:text-[#132B45] rounded-lg hover:bg-[#F0F4F8] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free shipping progress bar */}
        <div className="bg-[#FAF6EE] px-5 py-3 border-b border-[#E6D6B6]">
          <div className="flex items-center justify-between text-xs font-semibold text-[#132B45] mb-1.5">
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-[#BA8C48]" />
              {isFreeShipping ? (
                <span>Livraison standard offerte partout au Maroc !</span>
              ) : (
                <span>
                  Plus que {(freeShippingThreshold - subtotal).toLocaleString('fr-FR')} DH pour la livraison offerte
                </span>
              )}
            </span>
            {isFreeShipping && <Check className="w-4 h-4 text-[#BA8C48]" />}
          </div>
          <div className="w-full bg-[#E5D7BC] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#BA8C48] h-full transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4 text-[#536B82]">
              <div className="w-16 h-16 rounded-full bg-[#FAF9F7] border border-[#E8EEF5] flex items-center justify-center text-[#BA8C48]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="text-base font-semibold text-[#132B45]">Votre panier est vide</p>
              <p className="text-xs text-[#536B82] max-w-xs">
                Découvrez nos matelas d'exception conçus avec passion dans notre atelier ARTON CONFORT au Maroc.
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-[#132B45] text-white rounded-lg text-xs font-semibold hover:bg-[#0B1C2E] transition-colors cursor-pointer shadow-sm"
              >
                Découvrir la collection ARTON CONFORT
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedSize}`}
                className="flex gap-4 p-3 bg-[#F7F9FB] rounded-xl border border-[#E8EEF5] shadow-2xs"
              >
                <div className="w-20 h-20 bg-white rounded-lg p-2 border border-[#E8EEF5] shrink-0 flex items-center justify-center">
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
                      <h3 className="font-bold text-sm text-[#132B45] leading-tight">
                        {item.product.name}
                      </h3>
                      <span className="text-xs text-[#536B82] block mt-0.5">
                        Taille : {item.selectedSize}
                      </span>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.product.id, item.selectedSize)}
                      className="text-[#A0B2C6] hover:text-red-600 transition-colors p-1 cursor-pointer"
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
                        className="px-2 py-0.5 text-xs text-[#536B82] hover:bg-[#E8EEF5] font-bold cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-2.5 py-0.5 text-xs font-bold text-[#132B45]">
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
                        className="px-2 py-0.5 text-xs text-[#536B82] hover:bg-[#E8EEF5] font-bold cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-sm font-bold text-[#132B45]">
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
          <div className="p-5 border-t border-[#E8EEF5] bg-white space-y-4">
            {/* Promo Code Input */}
            <div>
              {discountApplied ? (
                <div className="flex items-center justify-between bg-[#FAF6EE] text-[#BA8C48] px-3 py-2 rounded-lg text-xs font-medium border border-[#E6D6B6]">
                  <span className="flex items-center gap-1.5 font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-[#BA8C48]" />
                    Code promotionnel appliqué (-{discountApplied.toLocaleString('fr-FR')} DH)
                  </span>
                  <button
                    onClick={() => setDiscountApplied(null)}
                    className="text-[#BA8C48] hover:text-[#132B45] font-bold cursor-pointer"
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
                    placeholder="Code promo (ex: ARTON15)"
                    className="flex-1 px-3 py-1.5 border border-[#E8EEF5] rounded-lg text-xs focus:outline-none focus:border-[#BA8C48] uppercase"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-[#132B45] hover:bg-[#0B1C2E] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
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
            <div className="space-y-1.5 text-xs text-[#536B82] border-t border-[#E8EEF5] pt-3">
              <div className="flex justify-between">
                <span>Sous-total</span>
                <span className="font-semibold text-[#132B45]">{subtotal.toLocaleString('fr-FR')} DH</span>
              </div>

              {discountApplied && (
                <div className="flex justify-between text-[#BA8C48] font-semibold">
                  <span>Remise promo</span>
                  <span>- {discountApplied.toLocaleString('fr-FR')} DH</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Livraison</span>
                <span className="font-semibold text-[#1E7E34]">
                  {isFreeShipping ? 'Offerte' : '150 DH'}
                </span>
              </div>

              <div className="flex justify-between text-base font-bold text-[#132B45] pt-2 border-t border-[#E8EEF5]">
                <span>Total TTC</span>
                <span className="text-xl font-extrabold text-[#132B45]">
                  {finalTotal.toLocaleString('fr-FR')} DH
                </span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={() =>
                onCheckout({
                  subtotal,
                  discount: discountApplied || 0,
                  promoCode: discountApplied ? (promoInput.trim().toUpperCase() || 'ARTON15') : undefined,
                  finalTotal,
                })
              }
              className="w-full py-3.5 px-6 bg-[#132B45] hover:bg-[#0B1C2E] text-white rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-md group cursor-pointer"
            >
              <span>Valider ma commande</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#BA8C48]" />
            </button>

            {/* Security Guarantee */}
            <div className="flex items-center justify-center gap-2 text-[11px] text-[#536B82]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#BA8C48]" />
              <span>Paiement sécurisé • 100 nuits d'essai ARTON CONFORT incluses</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
