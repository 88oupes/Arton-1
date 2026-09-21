import { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import CategoriesSection from './components/CategoriesSection';
import FactorySustainability from './components/FactorySustainability';
import ReviewsSection from './components/ReviewsSection';
import Footer from './components/Footer';
import CategoryPage from './components/CategoryPage';
import ProductPage from './components/ProductPage';
import SitemapPage from './components/SitemapPage';
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';
import MattressQuizModal from './components/MattressQuizModal';
import SearchModal from './components/SearchModal';
import InfoModal from './components/InfoModal';
import { Product, CartItem } from './types';
import { PRODUCTS } from './data/products';
import { parseCurrentRoute, AppRoute, navigateTo, getProductUrl, getCategoryUrl } from './utils/navigation';
import { updateMetaTags } from './utils/seo';

export default function App() {
  const [route, setRoute] = useState<AppRoute>(parseCurrentRoute());
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [infoModalType, setInfoModalType] = useState<'factory' | 'eco' | 'checkout' | 'reviews' | null>(null);

  // Listen for browser navigation changes (back/forward or pushState)
  useEffect(() => {
    const handleLocationChange = () => {
      setRoute(parseCurrentRoute());
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Default SEO meta tags when on home page
  useEffect(() => {
    if (route.type === 'home') {
      updateMetaTags({
        title: 'DARY — Matelas & Literie Haute Couture au Maroc | Confort d\'Exception',
        description: 'Découvrez la manufacture marocaine DARY : matelas haute densité, sommiers, linge de lit satin, lits coffres et salons marocains. 10 ans de garantie & livraison offerte.',
        canonicalPath: '/',
        type: 'website',
        schema: {
          '@context': 'https://schema.org',
          '@type': 'FurnitureStore',
          name: 'DARY Manufacture',
          image: 'https://res.cloudinary.com/psbqhe7h/image/upload/v1789644319/Dari_logo.jpg',
          url: 'https://dary.ma',
          telephone: '+212691707445',
          priceRange: '1990 MAD - 12900 MAD',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Zone Industrielle Sidi Maârouf',
            addressLocality: 'Casablanca',
            addressCountry: 'MA',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: '33.5731',
            longitude: '-7.5898',
          },
          openingHoursSpecification: [
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
              opens: '09:00',
              closes: '19:30',
            },
          ],
        },
      });
    }
  }, [route]);

  // Cart actions
  const handleAddToCart = (product: Product, size: string, quantity: number = 1) => {
    const sizeObj = product.sizes.find((s) => s.size === size) || product.sizes[0];
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === sizeObj.size
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [
        ...prev,
        {
          product,
          selectedSize: sizeObj.size,
          quantity,
          unitPrice: sizeObj.price,
        },
      ];
    });
  };

  const handleUpdateCartQuantity = (productId: string, size: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(productId, size);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.selectedSize === size
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string, size: string) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.selectedSize === size))
    );
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setCartItems([]);
    setInfoModalType('checkout');
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F6F9] text-[#2D1C38] flex flex-col font-sans">
      {/* 1. Top Bar & Main Header Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
      />

      {/* Dynamic View Router */}
      <div className="flex-1">
        {route.type === 'home' && (
          <main>
            {/* 2. Hero Section: "Le confort naît ici" */}
            <Hero
              onExploreClick={() => scrollToSection('matelas')}
              onOpenQuiz={() => setIsQuizOpen(true)}
            />

            {/* 3. 4-item Trust / Guarantees Bar */}
            <TrustBar />

            {/* 4. 6 Category Grid: "Nos univers" */}
            <CategoriesSection />

            {/* 5. Split Workshop & Sustainability: "Notre usine, votre garantie" */}
            <FactorySustainability
              onLearnMoreFactory={() => setInfoModalType('factory')}
              onLearnMoreEco={() => setInfoModalType('eco')}
            />

            {/* 6. Social Proof & Reviews: "Ils dorment déjà mieux" */}
            <ReviewsSection
              onWriteReview={() => setInfoModalType('reviews')}
            />
          </main>
        )}

        {route.type === 'category' && (
          <CategoryPage
            categorySlug={route.categorySlug}
            onAddToCart={(product, size, qty) => {
              handleAddToCart(product, size, qty);
              setIsCartOpen(true);
            }}
            onOpenQuiz={() => setIsQuizOpen(true)}
          />
        )}

        {route.type === 'product' && (
          <ProductPage
            slug={route.productSlug}
            onAddToCart={(product, size, qty) => {
              handleAddToCart(product, size, qty);
              setIsCartOpen(true);
            }}
            onOpenQuiz={() => setIsQuizOpen(true)}
          />
        )}

        {route.type === 'sitemap' && (
          <SitemapPage onOpenQuiz={() => setIsQuizOpen(true)} />
        )}
      </div>

      {/* 8. Comprehensive Atelier Footer */}
      <Footer />

      {/* Modals and Slide-over Drawers */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(product, size, qty) => {
          handleAddToCart(product, size, qty);
          setIsCartOpen(true);
        }}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={handleCheckout}
      />

      <MattressQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onSelectProduct={(product) => {
          navigateTo(getProductUrl(product.slug));
        }}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(product) => {
          setIsSearchOpen(false);
          navigateTo(getProductUrl(product.slug));
        }}
        onSelectCategory={(catId) => {
          setIsSearchOpen(false);
          navigateTo(getCategoryUrl(catId));
        }}
      />

      <InfoModal
        isOpen={infoModalType !== null}
        type={infoModalType}
        onClose={() => setInfoModalType(null)}
      />

      {/* Floating WhatsApp Button */}
      <aside aria-label="Contact WhatsApp DARY">
        <a
          href="https://wa.me/212691707445?text=Bonjour%20DARY%2C%20je%20souhaite%20des%20informations%20sur%20vos%20matelas."
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-5 right-5 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.45)] hover:shadow-[0_6px_25px_rgba(37,211,102,0.6)] transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-white group cursor-pointer"
          title="Discuter sur WhatsApp : 06 91 70 74 45"
          aria-label="Discuter sur WhatsApp au 06 91 70 74 45"
        >
          <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-white text-[#25D366]" />
          <span className="sr-only">WhatsApp : 06 91 70 74 45</span>
        </a>
      </aside>
    </div>
  );
}
