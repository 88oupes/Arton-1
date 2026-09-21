import { useState, type FormEvent } from 'react';
import {
  X,
  CheckCircle,
  User,
  Phone,
  MapPin,
  MessageSquare,
  Truck,
  ShieldCheck,
  ShoppingBag,
  MessageCircle,
  ExternalLink,
  Check,
  Copy,
} from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  discount: number;
  promoCode?: string;
  finalTotal: number;
  onOrderSuccess: () => void;
}

const MOROCCAN_CITIES = [
  'Casablanca',
  'Rabat',
  'Marrakech',
  'Tanger',
  'Fès',
  'Agadir',
  'Meknès',
  'Oujda',
  'Kénitra',
  'Tétouan',
  'Salé',
  'Mohammédia',
  'El Jadida',
  'Nador',
  'Béni Mellal',
  'Autre ville au Maroc',
];

export default function CheckoutModal({
  isOpen,
  onClose,
  items,
  subtotal,
  discount,
  promoCode,
  finalTotal,
  onOrderSuccess,
}: CheckoutModalProps) {
  if (!isOpen) return null;

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Casablanca');
  const [address, setAddress] = useState('');
  const [comment, setComment] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [whatsappClientUrl, setWhatsappClientUrl] = useState('');
  const [whatsappDaryUrl, setWhatsappDaryUrl] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);

  // Clean phone to international WhatsApp format (Morocco +212)
  const formatMoroccanPhoneForWhatsApp = (rawPhone: string): string => {
    let clean = rawPhone.replace(/\D/g, '');
    if (clean.startsWith('0')) {
      clean = '212' + clean.slice(1);
    } else if (!clean.startsWith('212')) {
      clean = '212' + clean;
    }
    return clean;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !address.trim()) {
      return;
    }

    setIsSubmitting(true);

    const generatedOrderId = `DARY-${Math.floor(10000 + Math.random() * 90000)}`;
    setOrderId(generatedOrderId);

    // Build the WhatsApp message content
    const itemsListText = items
      .map(
        (it) =>
          `• ${it.product.name} (Taille: ${it.selectedSize}) x${it.quantity} = ${(
            it.unitPrice * it.quantity
          ).toLocaleString('fr-FR')} DH`
      )
      .join('\n');

    const promoInfo = promoCode && discount > 0 ? `\n🏷️ *Remise appliquée:* -${discount.toLocaleString('fr-FR')} DH (Code: ${promoCode})` : '';
    const commentInfo = comment.trim() ? `\n📝 *Instructions client:* ${comment.trim()}` : '';

    const whatsappMessage = `✨ *CONFIRMATION DE COMMANDE DARY* ✨
━━━━━━━━━━━━━━━━━━━━
📦 *Commande:* #${generatedOrderId}
👤 *Client:* ${fullName.trim()}
📞 *Téléphone:* ${phone.trim()}
📍 *Livraison:* ${address.trim()}, ${city}
${commentInfo}

📋 *Articles commandés:*
${itemsListText}${promoInfo}

🚚 *Livraison:* Offerte partout au Maroc
💰 *TOTAL À PAYER À LA LIVRAISON:* *${finalTotal.toLocaleString('fr-FR')} DH*
━━━━━━━━━━━━━━━━━━━━
✅ *Votre commande a bien été enregistrée par la manufacture DARY.*
Notre équipe vous contactera par téléphone pour confirmer le rendez-vous de livraison.

_Manufacture DARY - Literie & Confort d'Exception au Maroc_ 🇲🇦`;

    const encodedMessage = encodeURIComponent(whatsappMessage);

    // 1. WhatsApp link targeted to customer's phone number
    const targetCustomerPhone = formatMoroccanPhoneForWhatsApp(phone);
    const clientUrl = `https://wa.me/${targetCustomerPhone}?text=${encodedMessage}`;
    setWhatsappClientUrl(clientUrl);

    // 2. WhatsApp link targeted to DARY customer service as backup
    const daryUrl = `https://wa.me/212691707445?text=${encodedMessage}`;
    setWhatsappDaryUrl(daryUrl);

    // Clear cart in parent
    onOrderSuccess();

    // Try to open WhatsApp for the customer
    try {
      window.open(clientUrl, '_blank');
    } catch {
      // Handled by UI button
    }

    setIsSubmitting(false);
    setOrderConfirmed(true);
  };

  const handleCopyOrderId = () => {
    navigator.clipboard?.writeText(`#${orderId}`);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#F0EAF3] overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-[#F0EAF3] flex items-center justify-between bg-[#FDFBFD] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#F0EAF3] flex items-center justify-center text-[#723C90]">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-base sm:text-lg text-[#2D1C38]">
                {orderConfirmed ? 'Commande Confirmée' : 'Finaliser ma commande'}
              </h2>
              <p className="text-[11px] text-[#735F80]">
                {orderConfirmed
                  ? 'Prise en compte immédiate par nos ateliers'
                  : 'Paiement en espèces ou TPE à la livraison'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#8E7E9C] hover:text-[#2D1C38] hover:bg-[#F3EDF6] rounded-full transition-colors cursor-pointer"
            aria-label="Fermer la fenêtre"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {!orderConfirmed ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Mini Order Summary */}
              <div className="bg-[#FAF8FB] rounded-xl p-3.5 sm:p-4 border border-[#F0EAF3]">
                <div className="flex items-center justify-between text-xs font-semibold text-[#554860] mb-2 pb-2 border-b border-[#EADBEE]">
                  <span>Récapitulatif ({items.reduce((acc, it) => acc + it.quantity, 0)} article(s))</span>
                  <span className="text-[#723C90] font-bold">{finalTotal.toLocaleString('fr-FR')} DH</span>
                </div>
                <div className="max-h-28 overflow-y-auto space-y-1.5 pr-1 text-xs">
                  {items.map((it, idx) => (
                    <div key={idx} className="flex justify-between items-center text-[#42304F]">
                      <span className="truncate max-w-[240px] sm:max-w-xs">
                        <strong>{it.product.name}</strong> ({it.selectedSize}) x{it.quantity}
                      </span>
                      <span className="font-semibold shrink-0">
                        {(it.unitPrice * it.quantity).toLocaleString('fr-FR')} DH
                      </span>
                    </div>
                  ))}
                </div>
                {discount > 0 && (
                  <div className="flex justify-between items-center text-xs text-[#723C90] font-semibold pt-2 mt-2 border-t border-[#EADBEE]">
                    <span>Remise appliquée {promoCode ? `(${promoCode})` : ''}</span>
                    <span>-{discount.toLocaleString('fr-FR')} DH</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-xs text-[#25D366] font-semibold pt-1">
                  <span>Livraison au Maroc</span>
                  <span>Offerte (Gratuit)</span>
                </div>
              </div>

              {/* Input Fields */}
              <div className="space-y-3.5">
                {/* Nom & Prénom */}
                <div>
                  <label className="block text-xs font-bold text-[#2D1C38] mb-1">
                    Nom et Prénom <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#8E7E9C]">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ex : Youssef El Amrani"
                      className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#E5DAEA] rounded-xl text-xs sm:text-sm text-[#2D1C38] focus:outline-none focus:border-[#723C90] focus:ring-1 focus:ring-[#723C90] transition-colors"
                    />
                  </div>
                </div>

                {/* Téléphone */}
                <div>
                  <label className="block text-xs font-bold text-[#2D1C38] mb-1">
                    Numéro de téléphone WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#8E7E9C]">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Ex : 06 91 70 74 45 ou 07 XX XX XX XX"
                      className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#E5DAEA] rounded-xl text-xs sm:text-sm text-[#2D1C38] focus:outline-none focus:border-[#723C90] focus:ring-1 focus:ring-[#723C90] transition-colors"
                    />
                  </div>
                  <p className="text-[11px] text-[#735F80] mt-1">
                    Un message de confirmation de votre commande sera envoyé directement sur ce WhatsApp.
                  </p>
                </div>

                {/* Ville & Adresse */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-1">
                    <label className="block text-xs font-bold text-[#2D1C38] mb-1">
                      Ville <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-3 py-2.5 bg-white border border-[#E5DAEA] rounded-xl text-xs sm:text-sm text-[#2D1C38] focus:outline-none focus:border-[#723C90] focus:ring-1 focus:ring-[#723C90] cursor-pointer"
                      >
                        {MOROCCAN_CITIES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-[#2D1C38] mb-1">
                      Adresse complète de livraison <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#8E7E9C]">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Quartier, Rue, N° d'immeuble, Résidence..."
                        className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#E5DAEA] rounded-xl text-xs sm:text-sm text-[#2D1C38] focus:outline-none focus:border-[#723C90] focus:ring-1 focus:ring-[#723C90] transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Commentaire de livraison */}
                <div>
                  <label className="block text-xs font-bold text-[#2D1C38] mb-1">
                    Commentaire ou instructions spécifiques{' '}
                    <span className="text-[#8E7E9C] font-normal">(Optionnel)</span>
                  </label>
                  <div className="relative">
                    <div className="absolute top-2.5 left-3 pointer-events-none text-[#8E7E9C]">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <textarea
                      rows={2}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Ex : Étage 3 avec ascenseur, appeler 30 minutes avant l'arrivée, etc."
                      className="w-full pl-9 pr-3 py-2 bg-white border border-[#E5DAEA] rounded-xl text-xs sm:text-sm text-[#2D1C38] focus:outline-none focus:border-[#723C90] focus:ring-1 focus:ring-[#723C90] transition-colors resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="flex items-center gap-2 p-2 rounded-lg bg-[#FAF8FB] border border-[#F0EAF3] text-[11px] text-[#554860]">
                  <Truck className="w-4 h-4 text-[#723C90] shrink-0" />
                  <span>Livraison & installation gratuites</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-[#FAF8FB] border border-[#F0EAF3] text-[11px] text-[#554860]">
                  <ShieldCheck className="w-4 h-4 text-[#723C90] shrink-0" />
                  <span>Paiement à la livraison</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-1/3 py-3 px-4 rounded-xl border border-[#E5DAEA] text-xs font-semibold text-[#554860] hover:bg-[#F8F6F9] transition-colors cursor-pointer text-center"
                >
                  Retour au panier
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-2/3 py-3 px-5 bg-[#723C90] hover:bg-[#542D6B] disabled:opacity-60 text-white rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer active:scale-[0.99]"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Confirmer ma commande ({finalTotal.toLocaleString('fr-FR')} DH)</span>
                </button>
              </div>
            </form>
          ) : (
            /* Success State */
            <div className="text-center py-4 sm:py-6 space-y-5">
              <div className="w-16 h-16 rounded-full bg-[#EAF9EE] text-[#25D366] flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle className="w-9 h-9" />
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#25D366] bg-[#EAF9EE] px-3 py-1 rounded-full">
                  Commande validée avec succès
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2D1C38] mt-2 mb-1">
                  Votre commande est bien prise en compte !
                </h3>
                <p className="text-xs sm:text-sm text-[#665373] max-w-md mx-auto">
                  Merci <strong>{fullName}</strong> ! Notre manufacture prépare dès à présent votre literie avec le plus grand soin.
                </p>
              </div>

              {/* Order Box */}
              <div className="bg-[#FAF8FB] p-4 sm:p-5 rounded-2xl border border-[#E5DAEA] text-left max-w-lg mx-auto space-y-2.5 text-xs text-[#554860]">
                <div className="flex items-center justify-between pb-2 border-b border-[#EADBEE]">
                  <div>
                    <span className="text-[10px] text-[#8E7E9C] uppercase font-bold block">Référence commande</span>
                    <strong className="text-base text-[#723C90]">#{orderId}</strong>
                  </div>
                  <button
                    onClick={handleCopyOrderId}
                    className="inline-flex items-center gap-1 text-[11px] text-[#723C90] hover:bg-[#F0EAF3] px-2 py-1 rounded-md transition-colors cursor-pointer"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? 'Copié' : 'Copier'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  <div>
                    <span className="text-[#8E7E9C] block text-[10.5px]">Destinataire :</span>
                    <span className="font-medium text-[#2D1C38]">{fullName}</span>
                  </div>
                  <div>
                    <span className="text-[#8E7E9C] block text-[10.5px]">Téléphone :</span>
                    <span className="font-medium text-[#2D1C38]">{phone}</span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-[#8E7E9C] block text-[10.5px]">Adresse de livraison :</span>
                    <span className="font-medium text-[#2D1C38]">{address}, {city}</span>
                  </div>
                  {comment && (
                    <div className="sm:col-span-2">
                      <span className="text-[#8E7E9C] block text-[10.5px]">Commentaire :</span>
                      <span className="font-medium text-[#2D1C38] italic">« {comment} »</span>
                    </div>
                  )}
                  <div className="sm:col-span-2 pt-2 border-t border-[#EADBEE] flex justify-between items-center">
                    <span className="text-[#2D1C38] font-bold">Total à régler à la livraison :</span>
                    <span className="text-base font-extrabold text-[#723C90]">
                      {finalTotal.toLocaleString('fr-FR')} DH
                    </span>
                  </div>
                </div>
              </div>

              {/* WhatsApp Notification CTA */}
              <div className="max-w-lg mx-auto bg-[#F0FAF3] p-4 sm:p-5 rounded-2xl border border-[#C5EBD2] text-center space-y-3">
                <div className="flex items-center justify-center gap-2 text-[#128C7E] font-bold text-xs sm:text-sm">
                  <MessageCircle className="w-5 h-5 fill-[#25D366] text-[#25D366]" />
                  <span>Confirmation envoyée vers votre WhatsApp</span>
                </div>
                <p className="text-xs text-[#446950] leading-relaxed">
                  Le récapitulatif complet de votre commande a été généré pour le numéro <strong>{phone}</strong>.
                  Si votre application WhatsApp ne s'est pas ouverte automatiquement, cliquez sur le bouton ci-dessous :
                </p>

                <div className="flex flex-col sm:flex-row gap-2.5 justify-center pt-1">
                  <a
                    href={whatsappClientUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-xl text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Ouvrir mon message WhatsApp</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={whatsappDaryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-white border border-[#25D366]/40 hover:bg-[#EAF9EE] text-[#128C7E] rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <span>Contacter le support DARY</span>
                  </a>
                </div>
              </div>

              {/* Final Close */}
              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-8 py-3 bg-[#723C90] hover:bg-[#542D6B] text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-sm"
                >
                  Continuer mes achats sur DARY
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
