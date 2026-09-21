import { useState, useRef, useEffect, type MouseEvent } from 'react';
import { Search, ShoppingBag, Menu, X, Phone, ChevronRight, Check, MapPin } from 'lucide-react';
import Logo from './Logo';
import { CATEGORIES_LIST, PRODUCTS } from '../data/products';
import { navigateTo, getCategoryUrl, getProductUrl, getHomeUrl, getSitemapUrl, getStoresUrl } from '../utils/navigation';
import { CategoryId } from '../types';

const ANNOUNCEMENT_ITEMS = [
  {
    text: "-15% SUR TOUTE LA COLLECTION",
    highlight: "CODE : DARY15",
    isPromo: true,
  },
];

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenQuiz: () => void;
  onSelectCategory?: (category: string) => void;
}

export default function Navbar({
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenQuiz,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [copied, setCopied] = useState(false);
  const tickerRef = useRef<HTMLDivElement>(null);
  const scrollPos = useRef(0);

  useEffect(() => {
    let animationId: number;
    const speed = 0.55; // Pixels per frame for smooth readable movement

    const animate = () => {
      if (!isPaused && tickerRef.current) {
        scrollPos.current += speed;
        const halfWidth = tickerRef.current.scrollWidth / 2;
        if (halfWidth > 0 && scrollPos.current >= halfWidth) {
          scrollPos.current -= halfWidth;
        }
        tickerRef.current.style.transform = `translate3d(-${scrollPos.current}px, 0, 0)`;
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isPaused]);

  const handleCopyCode = (e?: MouseEvent) => {
    if (e) e.stopPropagation();
    try {
      navigator.clipboard?.writeText('DARY15');
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // Fallback
    }
  };

  const navCategories: { id: CategoryId; name: string; slug: string }[] = CATEGORIES_LIST;

  const handleCategoryClick = (slug: string, e?: MouseEvent) => {
    navigateTo(getCategoryUrl(slug), e);
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  };

  return (
    <header className="w-full sticky top-0 z-40 bg-white/95 backdrop-blur-md transition-all border-b border-[#F0EAF3]">
      {/* Top Utility Announcement Bar - Moving Ticker with JavaScript */}
      <div
        className="bg-[#542D6B] border-b border-[#48255c] text-white py-1 sm:py-1.5 overflow-hidden select-none relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Visual feedback when code is copied */}
        {copied && (
          <div className="absolute inset-0 bg-[#361D46] z-10 flex items-center justify-center gap-2 text-xs font-semibold text-white transition-all">
            <Check className="w-3.5 h-3.5 text-[#25D366]" />
            <span>Code <strong>DARY15</strong> copié dans le presse-papier (-15% à la commande)</span>
          </div>
        )}

        <div
          ref={tickerRef}
          className="flex whitespace-nowrap will-change-transform cursor-pointer"
          title="Cliquez pour copier le code DARY15 (défilement en pause au survol)"
        >
          {/* Repeated items for an infinite, continuous loop across all screen sizes */}
          {Array.from({ length: 12 }, () => ANNOUNCEMENT_ITEMS).flat().map((item, idx) => (
            <div
              key={idx}
              onClick={item.isPromo ? (e) => handleCopyCode(e) : undefined}
              className="inline-flex items-center text-[10.5px] sm:text-[11.5px] font-light tracking-[0.16em] uppercase text-white/90 hover:text-white transition-colors px-6 sm:px-10 group shrink-0"
            >
              <span>{item.text}</span>
              <span className="mx-2.5 text-white/40 font-thin">•</span>
              <span className="font-normal text-white">
                {item.isPromo ? (
                  <>
                    Code :{' '}
                    <span className="font-semibold tracking-widest text-white border-b border-white/40 pb-px group-hover:border-white transition-colors bg-white/10 px-1.5 py-0.5 rounded">
                      DARY15
                    </span>
                  </>
                ) : (
                  <span className="text-[#E5DAEA] font-medium">{item.highlight}</span>
                )}
              </span>
              <span className="ml-6 sm:ml-10 text-[#A982B8]/60 font-serif">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3.5 sm:px-8 py-2.5 sm:py-3.5 flex items-center justify-between gap-2">
        {/* Mobile menu button */}
        <div className="flex items-center lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 -ml-1 text-[#2D1C38] hover:bg-[#F3EDF6] rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#723C90]/20 cursor-pointer"
            aria-label="Menu principal"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Brand Logo - Official DARY Logomark */}
        <a
          href={getHomeUrl()}
          onClick={(e) => navigateTo(getHomeUrl(), e)}
          className="flex-shrink-0 cursor-pointer focus:outline-none flex items-center py-0.5 group"
          aria-label="DARY - Accueil"
        >
          <div className="relative flex items-center px-1 sm:px-2 py-0.5 rounded-xl transition-all duration-200 group-hover:bg-[#F8F6F9]">
            <Logo
              size="md"
              className="transition-all duration-300 group-hover:scale-[1.02]"
            />
          </div>
        </a>

        {/* Desktop Navigation Links: Matelas, Salons, Oreillers */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[14.5px] font-medium text-[#2D1C38]">
          {navCategories.map((cat) => {
            const catProducts = PRODUCTS.filter((p) => p.category === cat.id);
            return (
              <div
                key={cat.id}
                className="relative py-1"
                onMouseEnter={() => setActiveDropdown(cat.id)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a
                  href={getCategoryUrl(cat.id)}
                  onClick={(e) => handleCategoryClick(cat.id, e)}
                  className="transition-colors hover:text-[#723C90] flex items-center gap-1 text-left cursor-pointer font-medium py-1"
                >
                  <span>{cat.name}</span>
                </a>

                {/* Dropdown preview of products in this category */}
                {activeDropdown === cat.id && catProducts.length > 0 && (
                  <div className="absolute top-full left-0 w-80 bg-white border border-[#F0EAF3] shadow-xl rounded-xl p-3 mt-1 grid gap-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="text-[11px] font-semibold text-[#723C90] uppercase tracking-wider px-2 py-1 flex items-center justify-between">
                      <span>Rayon {cat.name}</span>
                      <span className="text-[#8E7E9C] font-normal lowercase">{catProducts.length} modèles</span>
                    </div>
                    {catProducts.map((p) => (
                      <a
                        key={p.id}
                        href={getProductUrl(p.slug)}
                        onClick={(e) => {
                          navigateTo(getProductUrl(p.slug), e);
                          setActiveDropdown(null);
                        }}
                        className="p-2 rounded-lg hover:bg-[#F8F6F9] transition-colors flex items-center justify-between group cursor-pointer"
                      >
                        <div className="min-w-0 pr-2">
                          <div className="font-semibold text-xs text-[#2D1C38] group-hover:text-[#723C90] truncate">
                            {p.name}
                          </div>
                          <div className="text-[11px] text-[#735F80]">
                            Dès {p.price.toLocaleString()} DH
                          </div>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-[#A982B8] group-hover:text-[#723C90] transition-transform group-hover:translate-x-0.5 flex-shrink-0" />
                      </a>
                    ))}
                    <div className="pt-2 border-t border-[#F5EFF8] px-2">
                      <a
                        href={getCategoryUrl(cat.id)}
                        onClick={(e) => handleCategoryClick(cat.id, e)}
                        className="text-xs font-bold text-[#723C90] hover:underline flex items-center justify-between"
                      >
                        <span>Découvrir toute la catégorie</span>
                        <span>→</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Nos Magasins Link */}
          <a
            href={getStoresUrl()}
            onClick={(e) => navigateTo(getStoresUrl(), e)}
            className="transition-colors hover:text-[#723C90] flex items-center gap-1.5 text-left cursor-pointer font-medium py-1 px-2.5 rounded-lg hover:bg-[#F8F6F9]"
          >
            <MapPin className="w-3.5 h-3.5 text-[#723C90]" />
            <span>Nos Magasins</span>
          </a>
        </nav>

        {/* Action icons (Search, Sitemap, and Cart) */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Search button */}
          <button
            onClick={onOpenSearch}
            className="p-2.5 text-[#2D1C38] hover:text-[#723C90] hover:bg-[#F3EDF6] rounded-full transition-colors focus:outline-none cursor-pointer"
            title="Rechercher"
            aria-label="Rechercher"
          >
            <Search className="w-5 h-5 stroke-[1.8]" />
          </button>

          {/* Cart button with counter */}
          <button
            onClick={onOpenCart}
            className="p-2.5 text-[#2D1C38] hover:text-[#723C90] hover:bg-[#F3EDF6] rounded-full transition-colors relative focus:outline-none cursor-pointer"
            title="Panier"
            aria-label="Panier d'achats"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
            <span className="absolute top-1 right-1 bg-[#723C90] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Slide-over Navigation Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[96px] z-50 bg-black/40 backdrop-blur-xs lg:hidden">
          <div className="bg-white border-b border-[#F0EAF3] shadow-2xl p-6 flex flex-col gap-4 animate-in slide-in-from-top duration-250 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#F0EAF3]">
              <div className="flex items-center">
                <Logo size="sm" />
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-500 hover:text-[#723C90] p-1.5 rounded-lg hover:bg-[#F3EDF6] cursor-pointer"
                aria-label="Fermer le menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-[11px] uppercase font-bold text-[#8E7E9C] tracking-wider px-2">
              Nos Catégories
            </div>

            <div className="flex flex-col gap-1">
              {navCategories.map((cat) => (
                <a
                  key={cat.id}
                  href={getCategoryUrl(cat.id)}
                  onClick={(e) => handleCategoryClick(cat.id, e)}
                  className="flex items-center justify-between py-3 px-3 rounded-lg text-base font-medium text-[#2D1C38] hover:bg-[#F8F6F9] hover:text-[#723C90] text-left transition-colors cursor-pointer"
                >
                  <span>{cat.name}</span>
                  <ChevronRight className="w-4 h-4 text-[#A982B8]" />
                </a>
              ))}

              <a
                href={getStoresUrl()}
                onClick={(e) => {
                  navigateTo(getStoresUrl(), e);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-between py-3 px-3 rounded-lg text-base font-medium text-[#723C90] bg-[#FAF4FD] hover:bg-[#F0EAF3] text-left transition-colors cursor-pointer mt-1 border border-[#EADBEE]"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#723C90]" />
                  <span>Nos Magasins (Berrechid & Mohammedia)</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#723C90]" />
              </a>
            </div>

            <div className="pt-4 border-t border-[#F0EAF3] flex flex-col gap-3">
              <div className="bg-[#F8F6F9] p-4 rounded-xl flex items-center justify-between text-sm text-[#2D1C38]">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#723C90]" />
                  <span>Service client :</span>
                </div>
                <a href="tel:0681707445" className="font-bold text-[#723C90]">
                  06 81 70 74 45
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

