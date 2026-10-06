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
    const title = `${product.name} — Literie Haut de Gamme ARTON CONFORT Maroc`;
    const description = `${product.name} par ARTON CONFORT : ${product.description.slice(0, 130)}... Confection marocaine haut de gamme, garantie longue durée et livraison offerte.`;

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      image: [product.image, ...(product.additionalImages || [])],
      description: product.description,
      sku: product.id,
      brand: {
        '@type': 'Brand',
        name: 'ARTON CONFORT',
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
          name: 'ARTON CONFORT Manufacture',
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
          text: `Découvrez ${product.name} d'ARTON CONFORT sur artonconfort.ma`,
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
    `Bonjour ARTON CONFORT,\nJe souhaite commander :\n• Produit : ${product.name}\n• Dimension : ${selectedSize}\n• Quantité : ${quantity}\n• Prix : ${currentPrice * quantity} DH\n\nPouvez-vous me confirmer la livraison à domicile ? Merci !`
  );

  return (
    <div className="min-h-screen bg-[#FAF9F7] text-[#132B45] pb-24">
      {/* Toast Notification */}
      {addedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#132B45] text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 border border-[#BA8C48]/40 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="w-8 h-8 rounded-full bg-[#BA8C48] flex items-center justify-center flex-shrink-0">
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
      <nav aria-label="Fil d'Ariane" className="border-b border-[#E8EEF5] bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center flex-wrap text-xs sm:text-sm text-[#536B82] gap-1.5">
          <a
            href={getHomeUrl()}
            onClick={(e) => navigateTo(getHomeUrl(), e)}
            className="hover:text-[#BA8C48] transition-colors flex items-center gap-1 font-medium"
          >
            Accueil
          </a>
          <ChevronRight className="w-3.5 h-3.5 text-[#536B82]/60" />
          <a
            href={getCategoryUrl(product.category)}
            onClick={(e) => navigateTo(getCategoryUrl(product.category), e)}
            className="hover:text-[#BA8C48] transition-colors font-medium"
          >
            {categoryInfo.name}
          </a>
          <ChevronRight className="w-3.5 h-3.5 text-[#536B82]/60" />
          <span className="font-semibold text-[#132B45] truncate max-w-[200px] sm:max-w-none">
            {product.name}
          </span>
        </div>
      </nav>

      {/* Main Product Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 sm:pt-10">
        <button
          onClick={(e) => navigateTo(getCategoryUrl(product.category), e)}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#132B45] hover:text-[#BA8C48] mb-6 group cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Retour à la catégorie {categoryInfo.name}</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Gallery */}
          <div className="lg:col-span-7">
            <div className="sticky top-24 space-y-4">
              {/* Featured Image */}
              <div className="relative rounded-2xl overflow-hidden bg-white border border-[#E8EEF5] shadow-sm aspect-[4/3] flex items-center justify-center group">
                <img
                  src={selectedImg}
                  alt={`${product.name} - ARTON CONFORT Literie Maroc`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                />
                {product.badge && (
                  <div
                    className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full text-xs font-semibold text-white tracking-wide shadow-md"
                    style={{ backgroundColor: product.badgeColor || '#BA8C48' }}
                  >
                    {product.badge}
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-[#132B45] shadow-sm flex items-center gap-1 border border-[#E8EEF5]">
                  <Sparkles className="w-3 h-3 text-[#BA8C48]" />
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
                          ? 'border-[#BA8C48] ring-2 ring-[#BA8C48]/30 shadow-md'
                          : 'border-[#E8EEF5] hover:border-[#BA8C48] opacity-80 hover:opacity-100'
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
                <div className="bg-white p-3.5 rounded-xl border border-[#E8EEF5] text-center shadow-xs">
                  <Truck className="w-5 h-5 text-[#BA8C48] mx-auto mb-1.5" />
                  <div className="text-xs font-semibold text-[#132B45]">Livraison Offerte</div>
                  <div className="text-[10px] text-[#536B82]">Partout au Maroc</div>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-[#E8EEF5] text-center shadow-xs">
                  <ShieldCheck className="w-5 h-5 text-[#BA8C48] mx-auto mb-1.5" />
                  <div className="text-xs font-semibold text-[#132B45]">{product.warranty || 'Garantie Longue Durée'}</div>
                  <div className="text-[10px] text-[#536B82]">Atelier ARTON CONFORT</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Product Info & Order Form */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8EEF5] shadow-sm space-y-6">
              {/* Category & Title */}
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#BA8C48] mb-1.5 flex items-center justify-between">
                  <span>{product.categoryName} ARTON CONFORT</span>
                  <button
                    onClick={handleShare}
                    className="p-1.5 text-[#536B82] hover:text-[#BA8C48] hover:bg-[#FAF9F7] rounded-lg transition-colors cursor-pointer"
                    title="Partager ce produit"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
                {copiedLink && (
                  <div className="text-[11px] text-[#BA8C48] font-medium bg-[#FAF6EE] px-2.5 py-1 rounded-md inline-block mb-2">
                    Lien copié dans le presse-papier !
                  </div>
                )}
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#132B45] leading-tight">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-2.5 mt-2.5">
                  <div className="flex text-[#F5A623]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-[#132B45]">{product.rating} / 5</span>
                  <span className="text-xs text-[#536B82]">({product.reviewsCount} avis certifiés)</span>
                </div>
              </div>

              {/* Price Banner */}
              <div className="p-4 rounded-xl bg-[#FAF9F7] border border-[#E8EEF5] flex items-baseline justify-between">
                <div>
                  <div className="text-[11px] text-[#536B82] uppercase tracking-wider font-medium">Prix Maroc TTC</div>
                  <div className="flex items-baseline gap-2.5 mt-0.5">
                    <span className="text-3xl font-serif font-bold text-[#132B45]">
                      {currentPrice.toLocaleString()} DH
                    </span>
                    {originalPrice && (
                      <span className="text-base text-[#536B82]/60 line-through">
                        {originalPrice.toLocaleString()} DH
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#FAF6EE] text-[#BA8C48] border border-[#E6D6B6]">
                    -15% Code: ARTON15
                  </span>
                  <div className="text-[10px] text-[#1E7E34] font-semibold mt-1 flex items-center justify-end gap-1">
                    <PackageCheck className="w-3 h-3" /> En stock • Livraison gratuite
                  </div>
                </div>
              </div>

              {/* Short Description */}
              <p className="text-sm text-[#536B82] leading-relaxed">
                {product.description}
              </p>

              {/* Key Specs chips */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                {product.firmness && (
                  <div className="p-2.5 rounded-lg bg-[#FAF9F7] border border-[#E8EEF5]">
                    <span className="text-[#536B82] block text-[10px] uppercase font-semibold">Fermeté</span>
                    <span className="font-semibold text-[#132B45]">{product.firmness}</span>
                  </div>
                )}
                {product.thickness && (
                  <div className="p-2.5 rounded-lg bg-[#FAF9F7] border border-[#E8EEF5]">
                    <span className="text-[#536B82] block text-[10px] uppercase font-semibold">Épaisseur</span>
                    <span className="font-semibold text-[#132B45]">{product.thickness}</span>
                  </div>
                )}
              </div>

              {/* Size Selector */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-bold uppercase tracking-wider text-[#132B45]">
                    Choisissez votre dimension :
                  </label>
                  <button
                    onClick={onOpenQuiz}
                    className="text-[#BA8C48] hover:underline cursor-pointer text-xs font-semibold flex items-center gap-1"
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
                          ? 'border-[#BA8C48] bg-[#FAF6EE] text-[#132B45] font-semibold ring-1 ring-[#BA8C48]'
                          : 'border-[#E8EEF5] hover:border-[#BA8C48] text-[#132B45] bg-white'
                      }`}
                    >
                      <span className="text-xs">{s.size}</span>
                      <span className="text-xs font-bold text-[#BA8C48]">{s.price} DH</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & CTA */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-[#E8EEF5] rounded-xl overflow-hidden bg-[#FAF9F7]">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3.5 py-2.5 hover:bg-[#E8EEF5] text-[#132B45] font-bold text-sm cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 text-sm font-semibold text-[#132B45] min-w-[2.5rem] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3.5 py-2.5 hover:bg-[#E8EEF5] text-[#132B45] font-bold text-sm cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAdd}
                    className="flex-1 bg-[#132B45] hover:bg-[#0B1C2E] text-white py-3.5 px-6 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#BA8C48]" />
                    <span>Ajouter au panier • {(currentPrice * quantity).toLocaleString()} DH</span>
                  </button>
                </div>

                {/* WhatsApp Quick Order Button */}
                <a
                  href={`https://wa.me/212691707445?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#1EA952] hover:bg-[#188B43] text-white py-3 px-4 rounded-xl font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Commander instantanément sur WhatsApp</span>
                </a>
              </div>

              {/* Bullet Features */}
              <div className="border-t border-[#E8EEF5] pt-5 space-y-2.5">
                <div className="text-xs font-bold uppercase tracking-wider text-[#132B45] mb-2">
                  Les points forts de la confection ARTON CONFORT :
                </div>
                {product.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-[#536B82]">
                    <div className="w-4 h-4 rounded-full bg-[#FAF6EE] text-[#BA8C48] flex items-center justify-center flex-shrink-0 mt-0.5">
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
                <div className="text-xs font-bold uppercase tracking-wider text-[#BA8C48] mb-1">
                  Dans la même collection
                </div>
                <h2 className="text-2xl font-serif font-bold text-[#132B45]">
                  Vous aimerez aussi
                </h2>
              </div>
              <button
                onClick={(e) => navigateTo(getCategoryUrl(product.category), e)}
                className="text-xs sm:text-sm font-semibold text-[#BA8C48] hover:underline cursor-pointer"
              >
                Voir tout {categoryInfo.name} →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <div
                  key={rel.id}
                  onClick={(e) => navigateTo(getProductUrl(rel.slug), e)}
                  className="bg-white rounded-2xl border border-[#E8EEF5] overflow-hidden hover:shadow-lg transition-all cursor-pointer group flex flex-col"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#FAF9F7]">
                    <img
                      src={rel.image}
                      alt={rel.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {rel.badge && (
                      <span
                        className="absolute top-3 left-3 text-[10px] font-bold text-white px-2.5 py-1 rounded-full shadow-xs"
                        style={{ backgroundColor: rel.badgeColor || '#BA8C48' }}
                      >
                        {rel.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] font-semibold text-[#BA8C48] uppercase tracking-wider mb-1">
                        {rel.categoryName}
                      </div>
                      <h3 className="font-serif font-bold text-base text-[#132B45] group-hover:text-[#BA8C48] transition-colors">
                        {rel.name}
                      </h3>
                      <p className="text-xs text-[#536B82] line-clamp-2 mt-1.5">
                        {rel.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#E8EEF5] flex items-center justify-between mt-4">
                      <div>
                        <span className="text-xs text-[#536B82] block">À partir de</span>
                        <span className="font-serif font-bold text-lg text-[#132B45]">
                          {rel.price.toLocaleString()} DH
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-[#BA8C48] group-hover:translate-x-1 transition-transform flex items-center gap-1">
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
