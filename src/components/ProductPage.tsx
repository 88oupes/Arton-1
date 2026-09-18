import { useState, useEffect } from 'react';
import {
  Star,
  ShieldCheck,
  Truck,
  Check,
  Share2,
  MessageCircle,
  ChevronRight,
  Sparkles,
  ArrowLeft,
  ShoppingBag,
  Sliders,
  PackageCheck
} from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS, CATEGORIES_INFO } from '../data/products';
import { navigateTo, getCategoryUrl, getProductUrl, getHomeUrl } from '../utils/navigation';
import { updateMetaTags } from '../utils/seo';

interface ProductPageProps {
  slug: string;
  onAddToCart: (product: Product, selectedSize: string, quantity: number) => void;
  onOpenQuiz: () => void;
}

export default function ProductPage({ slug, onAddToCart, onOpenQuiz }: ProductPageProps) {
  const product = PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0];
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes[0]?.size || '160x200 cm (Queen)'
  );
  const [selectedImg, setSelectedImg] = useState<string>(product.image);
  const [quantity, setQuantity] = useState<number>(1);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [addedToast, setAddedToast] = useState<boolean>(false);

  // Update selected size and image when product slug changes
  useEffect(() => {
    setSelectedSize(product.sizes[0]?.size || '160x200 cm (Queen)');
    setSelectedImg(product.image);
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // SEO updates
    const title = `${product.name} — Literie Haut de Gamme DARY Maroc`;
    const description = `${product.name} par DARY : ${product.description.slice(0, 130)}... Confection marocaine haut de gamme, garantie 10 ans et livraison offerte.`;

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      image: [product.image, ...(product.additionalImages || [])],
      description: product.description,
      sku: product.id,
      brand: {
        '@type': 'Brand',
        name: 'DARY',
      },
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'MAD',
        lowPrice: product.sizes[0]?.price || product.price,
        highPrice: product.sizes[product.sizes.length - 1]?.price || product.price,
        offerCount: product.sizes.length,
        availability: 'https://schema.org/InStock',
        seller: {
          '@type': 'Organization',
          name: 'DARY Manufacture',
        },
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: product.rating.toString(),
        reviewCount: product.reviewsCount.toString(),
      },
    };

    updateMetaTags({
      title,
      description,
      canonicalPath: `/produits/${product.slug}`,
      image: product.image,
      type: 'product',
      schema,
    });
  }, [product]);

  // Current price based on selected size
  const currentSizeObj = product.sizes.find((s) => s.size === selectedSize);
  const currentPrice = currentSizeObj ? currentSizeObj.price : product.price;
  const originalPrice = product.originalPrice
    ? Math.round(currentPrice * 1.22)
    : undefined;

  const categoryInfo = CATEGORIES_INFO[product.category] || CATEGORIES_INFO.matelas;
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.slug !== product.slug
  ).slice(0, 3);

  const handleShare = () => {
    try {
      if (navigator.share) {
        navigator.share({
          title: product.name,
          text: `Découvrez ${product.name} de DARY sur dary.ma`,
          url: window.location.href,
        });
      } else {
        navigator.clipboard?.writeText(window.location.href);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2500);
      }
    } catch {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleAdd = () => {
    onAddToCart(product, selectedSize, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  };

  const whatsappMessage = encodeURIComponent(
    `Bonjour DARY,\nJe souhaite commander :\n• Produit : ${product.name}\n• Dimension : ${selectedSize}\n• Quantité : ${quantity}\n• Prix : ${currentPrice * quantity} DH\n\nPouvez-vous me confirmer la livraison à domicile ? Merci !`
  );

  return (
    <div className="min-h-screen bg-[#FAF8FB] text-[#2D1C38] pb-24">
      {/* Toast Notification */}
      {addedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2D1C38] text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 border border-[#723C90]/40 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="w-8 h-8 rounded-full bg-[#723C90] flex items-center justify-center flex-shrink-0">
            <Check className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-sm font-semibold">Ajouté au panier !</div>
            <div className="text-xs text-white/70">
              {product.name} ({selectedSize}) × {quantity}
            </div>
          </div>
        </div>
      )}

      {/* Breadcrumbs */}
      <nav aria-label="Fil d'Ariane" className="border-b border-[#F0EAF3] bg-white/70 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center flex-wrap text-xs sm:text-sm text-[#735F80] gap-1.5">
          <a
            href={getHomeUrl()}
            onClick={(e) => navigateTo(getHomeUrl(), e)}
            className="hover:text-[#723C90] transition-colors flex items-center gap-1 font-medium"
          >
            Accueil
          </a>
          <ChevronRight className="w-3.5 h-3.5 text-[#BBAAC7]" />
          <a
            href={getCategoryUrl(product.category)}
            onClick={(e) => navigateTo(getCategoryUrl(product.category), e)}
            className="hover:text-[#723C90] transition-colors font-medium"
          >
            {categoryInfo.name}
          </a>
          <ChevronRight className="w-3.5 h-3.5 text-[#BBAAC7]" />
          <span className="font-semibold text-[#2D1C38] truncate max-w-[200px] sm:max-w-none">
            {product.name}
          </span>
        </div>
      </nav>

      {/* Main Product Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 sm:pt-10">
        <button
          onClick={(e) => navigateTo(getCategoryUrl(product.category), e)}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#723C90] hover:text-[#542D6B] mb-6 group cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Retour à la catégorie {categoryInfo.name}</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Gallery */}
          <div className="lg:col-span-7">
            <div className="sticky top-24 space-y-4">
              {/* Featured Image */}
              <div className="relative rounded-2xl overflow-hidden bg-white border border-[#EFE7F3] shadow-sm aspect-[4/3] flex items-center justify-center group">
                <img
                  src={selectedImg}
                  alt={`${product.name} - DARY Literie Maroc`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                />
                {product.badge && (
                  <div
                    className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full text-xs font-semibold text-white tracking-wide shadow-md"
                    style={{ backgroundColor: product.badgeColor || '#723C90' }}
                  >
                    {product.badge}
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-[#542D6B] shadow-sm flex items-center gap-1 border border-[#F0EAF3]">
                  <Sparkles className="w-3 h-3 text-[#723C90]" />
                  <span>Manufacture Marocaine 🇲🇦</span>
                </div>
              </div>

              {/* Gallery Thumbnails */}
              {product.additionalImages && product.additionalImages.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                  {product.additionalImages.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImg(imgUrl)}
                      className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${
                        selectedImg === imgUrl
                          ? 'border-[#723C90] ring-2 ring-[#723C90]/30 shadow-md'
                          : 'border-[#EFE7F3] hover:border-[#A982B8] opacity-80 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={imgUrl}
                        alt={`${product.name} vue ${idx + 1}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Guarantees Box below gallery */}
              <div className="grid grid-cols-2 gap-3 pt-4">
                <div className="bg-white p-3.5 rounded-xl border border-[#EFE7F3] text-center shadow-xs">
                  <Truck className="w-5 h-5 text-[#723C90] mx-auto mb-1.5" />
                  <div className="text-xs font-semibold text-[#2D1C38]">Livraison Offerte</div>
                  <div className="text-[10px] text-[#735F80]">Partout au Maroc</div>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-[#EFE7F3] text-center shadow-xs">
                  <ShieldCheck className="w-5 h-5 text-[#723C90] mx-auto mb-1.5" />
                  <div className="text-xs font-semibold text-[#2D1C38]">{product.warranty || 'Garantie 10 Ans'}</div>
                  <div className="text-[10px] text-[#735F80]">Atelier DARY</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Product Info & Order Form */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EFE7F3] shadow-sm space-y-6">
              {/* Category & Title */}
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#723C90] mb-1.5 flex items-center justify-between">
                  <span>{product.categoryName} DARY</span>
                  <button
                    onClick={handleShare}
                    className="p-1.5 text-[#735F80] hover:text-[#723C90] hover:bg-[#FAF8FB] rounded-lg transition-colors cursor-pointer"
                    title="Partager ce produit"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
                {copiedLink && (
                  <div className="text-[11px] text-[#723C90] font-medium bg-[#F8F3FA] px-2.5 py-1 rounded-md inline-block mb-2">
                    Lien copié dans le presse-papier !
                  </div>
                )}
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D1C38] leading-tight">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-2.5 mt-2.5">
                  <div className="flex text-[#F5A623]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-[#2D1C38]">{product.rating} / 5</span>
                  <span className="text-xs text-[#735F80]">({product.reviewsCount} avis certifiés)</span>
                </div>
              </div>

              {/* Price Banner */}
              <div className="p-4 rounded-xl bg-[#FBF9FD] border border-[#F0EAF3] flex items-baseline justify-between">
                <div>
                  <div className="text-[11px] text-[#735F80] uppercase tracking-wider font-medium">Prix Maroc TTC</div>
                  <div className="flex items-baseline gap-2.5 mt-0.5">
                    <span className="text-3xl font-serif font-bold text-[#723C90]">
                      {currentPrice.toLocaleString()} DH
                    </span>
                    {originalPrice && (
                      <span className="text-base text-[#9A8AA6] line-through">
                        {originalPrice.toLocaleString()} DH
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#EFE4F5] text-[#542D6B]">
                    -15% Code: DARY15
                  </span>
                  <div className="text-[10px] text-[#1E7E34] font-semibold mt-1 flex items-center justify-end gap-1">
                    <PackageCheck className="w-3 h-3" /> En stock • Livraison gratuite
                  </div>
                </div>
              </div>

              {/* Short Description */}
              <p className="text-sm text-[#665373] leading-relaxed">
                {product.description}
              </p>

              {/* Key Specs chips */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                {product.firmness && (
                  <div className="p-2.5 rounded-lg bg-[#FAF8FB] border border-[#F0EAF3]">
                    <span className="text-[#887498] block text-[10px] uppercase font-semibold">Fermeté</span>
                    <span className="font-semibold text-[#2D1C38]">{product.firmness}</span>
                  </div>
                )}
                {product.thickness && (
                  <div className="p-2.5 rounded-lg bg-[#FAF8FB] border border-[#F0EAF3]">
                    <span className="text-[#887498] block text-[10px] uppercase font-semibold">Épaisseur</span>
                    <span className="font-semibold text-[#2D1C38]">{product.thickness}</span>
                  </div>
                )}
              </div>

              {/* Size Selector */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-bold uppercase tracking-wider text-[#2D1C38]">
                    Choisissez votre dimension :
                  </label>
                  <button
                    onClick={onOpenQuiz}
                    className="text-[#723C90] hover:underline cursor-pointer text-xs font-semibold flex items-center gap-1"
                  >
                    <Sliders className="w-3 h-3" /> Guide des tailles
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s.size}
                      onClick={() => setSelectedSize(s.size)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                        selectedSize === s.size
                          ? 'border-[#723C90] bg-[#FAF3FC] text-[#542D6B] font-semibold ring-1 ring-[#723C90]'
                          : 'border-[#EFE7F3] hover:border-[#BBAAC7] text-[#42304F] bg-white'
                      }`}
                    >
                      <span className="text-xs">{s.size}</span>
                      <span className="text-xs font-bold text-[#723C90]">{s.price} DH</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & CTA */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-[#EFE7F3] rounded-xl overflow-hidden bg-[#FAF8FB]">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3.5 py-2.5 hover:bg-[#F3EDF6] text-[#2D1C38] font-bold text-sm cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 text-sm font-semibold text-[#2D1C38] min-w-[2.5rem] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3.5 py-2.5 hover:bg-[#F3EDF6] text-[#2D1C38] font-bold text-sm cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAdd}
                    className="flex-1 bg-[#723C90] hover:bg-[#5E3176] text-white py-3.5 px-6 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Ajouter au panier • {(currentPrice * quantity).toLocaleString()} DH</span>
                  </button>
                </div>

                {/* WhatsApp Quick Order Button */}
                <a
                  href={`https://wa.me/212660000000?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#1EA952] hover:bg-[#188B43] text-white py-3 px-4 rounded-xl font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Commander instantanément sur WhatsApp</span>
                </a>
              </div>

              {/* Bullet Features */}
              <div className="border-t border-[#F0EAF3] pt-5 space-y-2.5">
                <div className="text-xs font-bold uppercase tracking-wider text-[#2D1C38] mb-2">
                  Les points forts de la confection DARY :
                </div>
                {product.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-[#52405F]">
                    <div className="w-4 h-4 rounded-full bg-[#EFE4F5] text-[#723C90] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products in this category */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <div className="flex items-end justify-between mb-8">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#723C90] mb-1">
                  Dans la même collection
                </div>
                <h2 className="text-2xl font-serif font-bold text-[#2D1C38]">
                  Vous aimerez aussi
                </h2>
              </div>
              <button
                onClick={(e) => navigateTo(getCategoryUrl(product.category), e)}
                className="text-xs sm:text-sm font-semibold text-[#723C90] hover:underline cursor-pointer"
              >
                Voir tout {categoryInfo.name} →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <div
                  key={rel.id}
                  onClick={(e) => navigateTo(getProductUrl(rel.slug), e)}
                  className="bg-white rounded-2xl border border-[#EFE7F3] overflow-hidden hover:shadow-lg transition-all cursor-pointer group flex flex-col"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#FBF9FD]">
                    <img
                      src={rel.image}
                      alt={rel.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {rel.badge && (
                      <span
                        className="absolute top-3 left-3 text-[10px] font-bold text-white px-2.5 py-1 rounded-full shadow-xs"
                        style={{ backgroundColor: rel.badgeColor || '#723C90' }}
                      >
                        {rel.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] font-semibold text-[#723C90] uppercase tracking-wider mb-1">
                        {rel.categoryName}
                      </div>
                      <h3 className="font-serif font-bold text-base text-[#2D1C38] group-hover:text-[#723C90] transition-colors">
                        {rel.name}
                      </h3>
                      <p className="text-xs text-[#735F80] line-clamp-2 mt-1.5">
                        {rel.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#F5EFF8] flex items-center justify-between mt-4">
                      <div>
                        <span className="text-xs text-[#8E7E9C] block">À partir de</span>
                        <span className="font-serif font-bold text-lg text-[#723C90]">
                          {rel.price.toLocaleString()} DH
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-[#542D6B] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        Découvrir <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
