import { useState, useEffect, useMemo } from 'react';
import {
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  ChevronRight,
  ArrowRight,
  SlidersHorizontal,
  PackageCheck,
  CheckCircle2
} from 'lucide-react';
import { CategoryId, Product } from '../types';
import { PRODUCTS, CATEGORIES_INFO, CATEGORIES_LIST } from '../data/products';
import { navigateTo, getProductUrl, getCategoryUrl, getHomeUrl } from '../utils/navigation';
import { updateMetaTags } from '../utils/seo';

interface CategoryPageProps {
  categorySlug: CategoryId;
  onAddToCart: (product: Product, selectedSize: string, quantity: number) => void;
  onOpenQuiz: () => void;
}

export default function CategoryPage({ categorySlug, onAddToCart, onOpenQuiz }: CategoryPageProps) {
  const currentCategory = CATEGORIES_INFO[categorySlug] || CATEGORIES_INFO.matelas;
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [filterFirmness, setFilterFirmness] = useState<string>('all');

  // Filter products belonging to this category
  const categoryProducts = useMemo(() => {
    let list = PRODUCTS.filter(
      (p) => p.category === categorySlug || (categorySlug === 'salon' && p.category === 'oreiller')
    );

    if (filterFirmness !== 'all') {
      list = list.filter((p) => p.firmness === filterFirmness);
    }

    if (sortBy === 'price-asc') {
      return [...list].sort((a, b) => a.price - b.price);
    }
    if (sortBy === 'price-desc') {
      return [...list].sort((a, b) => b.price - a.price);
    }
    if (sortBy === 'rating') {
      return [...list].sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [categorySlug, sortBy, filterFirmness]);

  // SEO updates
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const title = `${currentCategory.name} Haut de Gamme — DARY Manufacture Marocaine`;
    const description = `${currentCategory.description.slice(0, 140)}... Fabrication artisanale à Casablanca, garantie 10 ans et livraison offerte.`;

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: currentCategory.name,
      description: currentCategory.description,
      numberOfItems: categoryProducts.length,
      itemListElement: categoryProducts.map((prod, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://dary.ma/produits/${prod.slug}`,
        name: prod.name,
      })),
    };

    updateMetaTags({
      title,
      description,
      canonicalPath: `/categories/${categorySlug}`,
      image: currentCategory.image,
      schema,
    });
  }, [categorySlug, currentCategory, categoryProducts]);

  return (
    <div className="min-h-screen bg-[#FAF8FB] text-[#2D1C38] pb-24">
      {/* Breadcrumbs */}
      <nav aria-label="Fil d'Ariane" className="border-b border-[#F0EAF3] bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center text-xs sm:text-sm text-[#735F80] gap-1.5">
          <a
            href={getHomeUrl()}
            onClick={(e) => navigateTo(getHomeUrl(), e)}
            className="hover:text-[#723C90] transition-colors flex items-center gap-1 font-medium"
          >
            Accueil
          </a>
          <ChevronRight className="w-3.5 h-3.5 text-[#BBAAC7]" />
          <span className="text-[#8E7E9C]">Catégories</span>
          <ChevronRight className="w-3.5 h-3.5 text-[#BBAAC7]" />
          <span className="font-semibold text-[#2D1C38]">{currentCategory.name}</span>
        </div>
      </nav>

      {/* Hero Category Banner */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#2D1C38] via-[#48255c] to-[#60337A] text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-semibold text-white/90 border border-white/15">
              <Sparkles className="w-3.5 h-3.5 text-[#E7BFF5]" />
              <span>Collection DARY Maroc</span>
              <span className="text-white/40">•</span>
              <span>{currentCategory.itemCountText}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight">
              {currentCategory.name}
            </h1>
            <p className="text-sm sm:text-base text-white/85 max-w-2xl leading-relaxed">
              {currentCategory.description}
            </p>
            {/* Highlights */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              {currentCategory.highlights.map((h, i) => (
                <span
                  key={i}
                  className="text-xs bg-white/15 px-3 py-1 rounded-lg text-white/90 font-medium flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#E7BFF5]" />
                  {h}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 aspect-[16/10] group">
              <img
                src={currentCategory.image}
                alt={currentCategory.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 text-xs font-medium text-white/90">
                Atelier DARY • Casablanca
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Pills Switcher */}
      <section className="bg-white border-b border-[#F0EAF3] py-3 sticky top-[57px] sm:top-[69px] z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto scrollbar-none py-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8E7E9C] hidden md:inline-block mr-1">
              Catégories :
            </span>
            {CATEGORIES_LIST.map((cat) => (
              <button
                key={cat.id}
                onClick={(e) => navigateTo(getCategoryUrl(cat.id), e)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  cat.id === categorySlug
                    ? 'bg-[#723C90] text-white shadow-xs font-semibold'
                    : 'bg-[#F8F5FA] text-[#52405F] hover:bg-[#EFE7F3] hover:text-[#2D1C38]'
                }`}
              >
                <span>{cat.name}</span>
                {cat.id === categorySlug && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 sm:pt-10">
        {/* Filters and Sorting Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-[#EFE7F3] mb-8 shadow-xs">
          <div className="flex items-center gap-2 text-xs text-[#735F80]">
            <SlidersHorizontal className="w-4 h-4 text-[#723C90]" />
            <span className="font-semibold text-[#2D1C38]">
              {categoryProducts.length} modèle{categoryProducts.length > 1 ? 's' : ''} disponible{categoryProducts.length > 1 ? 's' : ''}
            </span>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Firmness filter if mattress */}
            {categorySlug === 'matelas' && (
              <select
                value={filterFirmness}
                onChange={(e) => setFilterFirmness(e.target.value)}
                className="text-xs bg-[#FAF8FB] border border-[#EFE7F3] text-[#2D1C38] rounded-lg px-3 py-2 font-medium cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#723C90]"
              >
                <option value="all">Toutes les fermetés</option>
                <option value="Moelleux">Moelleux</option>
                <option value="Équilibré">Équilibré</option>
                <option value="Ferme">Ferme</option>
              </select>
            )}

            {/* Sorting */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs bg-[#FAF8FB] border border-[#EFE7F3] text-[#2D1C38] rounded-lg px-3 py-2 font-medium cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#723C90]"
            >
              <option value="featured">Tri : Sélection DARY</option>
              <option value="price-asc">Prix : Moins cher au plus cher</option>
              <option value="price-desc">Prix : Plus cher au moins cher</option>
              <option value="rating">Meilleures notes clients</option>
            </select>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {categoryProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-[#EFE7F3] overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Image & Badges */}
              <div
                onClick={(e) => navigateTo(getProductUrl(product.slug), e)}
                className="relative aspect-[4/3] overflow-hidden bg-[#FAF8FB] cursor-pointer"
              >
                <img
                  src={product.image}
                  alt={`${product.name} DARY`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {product.badge && (
                  <span
                    className="absolute top-3 left-3 text-[11px] font-bold text-white px-3 py-1 rounded-full shadow-sm"
                    style={{ backgroundColor: product.badgeColor || '#723C90' }}
                  >
                    {product.badge}
                  </span>
                )}
                <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-[10px] font-bold text-[#542D6B] px-2 py-0.5 rounded-md border border-[#F0EAF3] shadow-xs">
                  {product.sizes.length} dimensions
                </span>
              </div>

              {/* Product Details */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-semibold text-[#723C90] uppercase tracking-wider">
                      {product.categoryName}
                    </span>
                    <div className="flex items-center gap-1 text-[#F5A623]">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="font-bold text-[#2D1C38]">{product.rating}</span>
                      <span className="text-[#8E7E9C]">({product.reviewsCount})</span>
                    </div>
                  </div>

                  <h2
                    onClick={(e) => navigateTo(getProductUrl(product.slug), e)}
                    className="font-serif font-bold text-lg sm:text-xl text-[#2D1C38] group-hover:text-[#723C90] transition-colors cursor-pointer"
                  >
                    {product.name}
                  </h2>

                  <p className="text-xs text-[#665373] line-clamp-2 mt-2 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Features Mini list */}
                  <div className="mt-3.5 space-y-1">
                    {product.features.slice(0, 2).map((feat, i) => (
                      <div key={i} className="text-[11px] text-[#52405F] flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-[#723C90]" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="pt-4 border-t border-[#F5EFF8]">
                  <div className="flex items-baseline justify-between mb-3">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#8E7E9C] block">
                        Dès
                      </span>
                      <span className="font-serif font-bold text-xl text-[#723C90]">
                        {product.price.toLocaleString()} DH
                      </span>
                    </div>
                    {product.originalPrice && (
                      <span className="text-xs text-[#9A8AA6] line-through">
                        {product.originalPrice.toLocaleString()} DH
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={(e) => navigateTo(getProductUrl(product.slug), e)}
                      className="w-full bg-[#FAF5FC] hover:bg-[#F0E4F5] text-[#723C90] text-xs font-bold py-2.5 px-3 rounded-xl transition-colors text-center cursor-pointer flex items-center justify-center gap-1"
                    >
                      <span>Découvrir</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onAddToCart(product, product.sizes[0].size, 1)}
                      className="w-full bg-[#723C90] hover:bg-[#5E3176] text-white text-xs font-bold py-2.5 px-3 rounded-xl transition-colors text-center cursor-pointer shadow-xs active:scale-[0.98]"
                    >
                      + Panier
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Why Choose DARY for this category */}
        <section className="mt-16 bg-white rounded-2xl border border-[#EFE7F3] p-8 sm:p-12 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#723C90] block mb-2">
              L'Excellence DARY
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D1C38]">
              Pourquoi faire confiance à notre manufacture marocaine ?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center space-y-2 p-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F8F3FA] text-[#723C90] flex items-center justify-center mx-auto mb-3 shadow-xs">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-[#2D1C38]">Livraison Gratuite au Maroc</h3>
              <p className="text-xs text-[#735F80] leading-relaxed">
                Nos équipes livrent et installent vos produits directement à votre étage dans tout le Royaume.
              </p>
            </div>

            <div className="text-center space-y-2 p-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F8F3FA] text-[#723C90] flex items-center justify-center mx-auto mb-3 shadow-xs">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-[#2D1C38]">Garantie Constructeur 10 Ans</h3>
              <p className="text-xs text-[#735F80] leading-relaxed">
                Confectionnés avec des matières nobles certifiées, nos articles sont conçus pour durer sans fléchir.
              </p>
            </div>

            <div className="text-center space-y-2 p-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F8F3FA] text-[#723C90] flex items-center justify-center mx-auto mb-3 shadow-xs">
                <RotateCcw className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-[#2D1C38]">100 Nuits Pour Essayer</h3>
              <p className="text-xs text-[#735F80] leading-relaxed">
                Prenez le temps d'adopter votre nouvelle literie dans le confort absolu de votre chambre.
              </p>
            </div>
          </div>
        </section>

        {/* Quiz CTA Banner */}
        <div className="mt-12 bg-gradient-to-r from-[#542D6B] to-[#723C90] text-white p-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-xs font-bold uppercase tracking-wider text-[#E7BFF5]">
              Conseils Personnalisés
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold">
              Besoin d'aide pour choisir votre modèle idéal ?
            </h3>
            <p className="text-xs sm:text-sm text-white/80">
              Répondez à 4 questions simples en moins de 60 secondes pour trouver le confort parfait.
            </p>
          </div>
          <button
            onClick={onOpenQuiz}
            className="bg-white text-[#542D6B] hover:bg-[#FAF5FC] font-bold text-xs sm:text-sm py-3 px-6 rounded-xl transition-colors whitespace-nowrap cursor-pointer shadow-md"
          >
            Lancer le quiz DARY →
          </button>
        </div>
      </main>
    </div>
  );
}
