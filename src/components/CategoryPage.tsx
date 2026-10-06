import { useState, useMemo, useEffect } from 'react';
import {
  SlidersHorizontal,
  ArrowRight,
  Star,
  Check,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { PRODUCTS, CATEGORIES_LIST, CATEGORIES_INFO } from '../data/products';
import { Product } from '../types';
import { navigateTo, getProductUrl, getCategoryUrl, getHomeUrl } from '../utils/navigation';
import { updateMetaTags } from '../utils/seo';

interface CategoryPageProps {
  categorySlug: string;
  onSelectProduct?: (product: Product) => void;
  onAddToCart: (product: Product, size: string, quantity?: number) => void;
  onOpenQuiz?: () => void;
}

export default function CategoryPage({
  categorySlug,
  onAddToCart,
  onOpenQuiz,
}: CategoryPageProps) {
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [filterFirmness, setFilterFirmness] = useState<string>('all');

  const currentCategory = CATEGORIES_INFO[categorySlug] || CATEGORIES_INFO.matelas;

  // Filter products by category
  const categoryProducts = useMemo(() => {
    let list = PRODUCTS.filter((p) => p.category === categorySlug);

    if (filterFirmness !== 'all') {
      list = list.filter((p) => p.firmness === filterFirmness);
    }

    switch (sortBy) {
      case 'price-asc':
        return [...list].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...list].sort((a, b) => b.price - a.price);
      case 'rating':
        return [...list].sort((a, b) => b.rating - a.rating);
      default:
        return list;
    }
  }, [categorySlug, sortBy, filterFirmness]);

  // SEO updates
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const title = `${currentCategory.name} Haut de Gamme — ARTON CONFORT Manufacture Marocaine`;
    const description = `${currentCategory.description.slice(0, 140)}... Fabrication artisanale d'exception, garantie longue durée et livraison offerte.`;

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: currentCategory.name,
      description: currentCategory.description,
      numberOfItems: categoryProducts.length,
      itemListElement: categoryProducts.map((prod, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://artonconfort.ma/produits/${prod.slug}`,
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
    <div className="min-h-screen bg-[#FAF9F7] text-[#132B45] pb-24">
      {/* Breadcrumbs */}
      <nav aria-label="Fil d'Ariane" className="border-b border-[#E8EEF5] bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center text-xs sm:text-sm text-[#536B82] gap-1.5">
          <a
            href={getHomeUrl()}
            onClick={(e) => navigateTo(getHomeUrl(), e)}
            className="hover:text-[#BA8C48] transition-colors flex items-center gap-1 font-medium"
          >
            Accueil
          </a>
          <ChevronRight className="w-3.5 h-3.5 text-[#A0B2C6]" />
          <span className="text-[#8BA0B8]">Catégories</span>
          <ChevronRight className="w-3.5 h-3.5 text-[#A0B2C6]" />
          <span className="font-semibold text-[#132B45]">{currentCategory.name}</span>
        </div>
      </nav>

      {/* Hero Category Banner */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#0B1C2E] via-[#132B45] to-[#1E3A5A] text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-semibold text-white/90 border border-white/15">
              <Sparkles className="w-3.5 h-3.5 text-[#BA8C48]" />
              <span>Collection ARTON CONFORT Maroc</span>
              <span className="text-white/40">•</span>
              <span>{currentCategory.itemCountText}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight">
              {currentCategory.name}
            </h1>
            <p className="text-sm sm:text-base text-white/85 max-w-2xl leading-relaxed">
              {currentCategory.description}
            </p>
            <div className="flex flex-wrap gap-2.5 pt-2">
              {currentCategory.highlights?.map((h, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 text-xs bg-white/15 backdrop-blur-xs px-3 py-1 rounded-lg font-medium text-white/95 border border-white/10"
                >
                  <Check className="w-3.5 h-3.5 text-[#BA8C48]" />
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
                Atelier ARTON CONFORT • Casablanca
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Pills Switcher */}
      <section className="bg-white border-b border-[#E8EEF5] py-3 sticky top-[57px] sm:top-[69px] z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto scrollbar-none py-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#536B82] hidden md:inline-block mr-1">
              Catégories :
            </span>
            {CATEGORIES_LIST.map((cat) => (
              <button
                key={cat.id}
                onClick={(e) => navigateTo(getCategoryUrl(cat.id), e)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  cat.id === categorySlug
                    ? 'bg-[#132B45] text-white shadow-xs font-semibold'
                    : 'bg-[#F7F9FB] text-[#536B82] hover:bg-[#E8EEF5] hover:text-[#132B45]'
                }`}
              >
                <span>{cat.name}</span>
                {cat.id === categorySlug && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#BA8C48] animate-pulse" />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 sm:pt-10">
        {/* Filters and Sorting Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-[#E8EEF5] mb-8 shadow-xs">
          <div className="flex items-center gap-2 text-xs text-[#536B82]">
            <SlidersHorizontal className="w-4 h-4 text-[#BA8C48]" />
            <span className="font-semibold text-[#132B45]">
              {categoryProducts.length} modèle{categoryProducts.length > 1 ? 's' : ''} disponible{categoryProducts.length > 1 ? 's' : ''}
            </span>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Firmness filter if mattress */}
            {categorySlug === 'matelas' && (
              <select
                value={filterFirmness}
                onChange={(e) => setFilterFirmness(e.target.value)}
                className="text-xs bg-[#FAF9F7] border border-[#E8EEF5] text-[#132B45] rounded-lg px-3 py-2 font-medium cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#BA8C48]"
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
              className="text-xs bg-[#FAF9F7] border border-[#E8EEF5] text-[#132B45] rounded-lg px-3 py-2 font-medium cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#BA8C48]"
            >
              <option value="featured">Tri : Sélection ARTON CONFORT</option>
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
              className="bg-white rounded-2xl border border-[#E8EEF5] overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Image & Badges */}
              <div
                onClick={(e) => navigateTo(getProductUrl(product.slug), e)}
                className="relative aspect-[4/3] overflow-hidden bg-[#FAF9F7] cursor-pointer"
              >
                <img
                  src={product.image}
                  alt={`${product.name} ARTON CONFORT`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {product.badge && (
                  <span
                    className="absolute top-3 left-3 text-[11px] font-bold text-white px-3 py-1 rounded-full shadow-sm"
                    style={{ backgroundColor: product.badgeColor || '#BA8C48' }}
                  >
                    {product.badge}
                  </span>
                )}
                <span className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm text-[10px] font-bold text-[#132B45] px-2 py-0.5 rounded-md border border-[#E8EEF5] shadow-xs">
                  {product.sizes.length} dimensions
                </span>
              </div>

              {/* Product Details */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-semibold text-[#BA8C48] uppercase tracking-wider">
                      {product.categoryName}
                    </span>
                    <div className="flex items-center gap-1 text-[#F5A623]">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="font-bold text-[#132B45]">{product.rating}</span>
                      <span className="text-[#8BA0B8]">({product.reviewsCount})</span>
                    </div>
                  </div>

                  <h2
                    onClick={(e) => navigateTo(getProductUrl(product.slug), e)}
                    className="font-serif font-bold text-lg sm:text-xl text-[#132B45] group-hover:text-[#BA8C48] transition-colors cursor-pointer"
                  >
                    {product.name}
                  </h2>

                  <p className="text-xs text-[#536B82] line-clamp-2 mt-2 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Features Mini list */}
                  <div className="mt-3.5 space-y-1">
                    {product.features.slice(0, 2).map((feat, i) => (
                      <div key={i} className="text-[11px] text-[#37485A] flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-[#BA8C48]" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="pt-4 border-t border-[#F0F4F8]">
                  <div className="flex items-baseline justify-between mb-3">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#8BA0B8] block">
                        Dès
                      </span>
                      <span className="font-serif font-bold text-xl text-[#132B45]">
                        {product.price.toLocaleString()} DH
                      </span>
                    </div>
                    {product.originalPrice && (
                      <span className="text-xs text-[#8BA0B8] line-through">
                        {product.originalPrice.toLocaleString()} DH
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={(e) => navigateTo(getProductUrl(product.slug), e)}
                      className="w-full bg-[#FAF6EE] hover:bg-[#F5EEDB] text-[#132B45] text-xs font-bold py-2.5 px-3 rounded-xl transition-colors text-center cursor-pointer flex items-center justify-center gap-1 border border-[#E6D6B6]"
                    >
                      <span>Découvrir</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#BA8C48]" />
                    </button>
                    <button
                      onClick={() => onAddToCart(product, product.sizes[0].size, 1)}
                      className="w-full bg-[#132B45] hover:bg-[#0B1C2E] text-white text-xs font-bold py-2.5 px-3 rounded-xl transition-colors text-center cursor-pointer shadow-xs active:scale-[0.98]"
                    >
                      + Panier
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
