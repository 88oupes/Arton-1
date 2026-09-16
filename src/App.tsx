import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import CategoriesSection from './components/CategoriesSection';
import PopularMattresses from './components/PopularMattresses';
import FactorySustainability from './components/FactorySustainability';
import ReviewsSection from './components/ReviewsSection';
import Footer from './components/Footer';
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';
import MattressQuizModal from './components/MattressQuizModal';
import SearchModal from './components/SearchModal';
import InfoModal from './components/InfoModal';
import { PRODUCTS } from './data/products';
import { Product, CartItem } from './types';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [infoModalType, setInfoModalType] = useState<'factory' | 'eco' | 'checkout' | null>(null);

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
    <div className="min-h-screen bg-[#FAFBF9] text-[#19222B] flex flex-col font-sans">
      {/* 1. Top Bar & Main Header Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onSelectCategory={(catId) => scrollToSection(catId === 'matelas' ? 'matelas' : 'nos-univers')}
      />

      <main className="flex-1">
        {/* 2. Hero Section: "Le confort naît ici" */}
        <Hero
          onExploreClick={() => scrollToSection('matelas')}
          onOpenQuiz={() => setIsQuizOpen(true)}
        />

        {/* 3. 4-item Trust / Guarantees Bar */}
        <TrustBar />

        {/* 4. Category Grid: "Nos univers" */}
        <CategoriesSection
          onSelectCategory={(catId) => {
            if (catId === 'matelas') {
              scrollToSection('matelas');
            } else {
              setSelectedProduct(PRODUCTS[0]);
            }
          }}
        />

        {/* 5. Popular Mattresses: "Nos matelas les plus populaires" */}
        <PopularMattresses
          onSelectProduct={(product) => setSelectedProduct(product)}
          onAddToCart={(product, size) => {
            handleAddToCart(product, size, 1);
            setIsCartOpen(true);
          }}
        />

        {/* 6. Split Workshop & Sustainability: "Notre usine, votre garantie" */}
        <FactorySustainability
          onLearnMoreFactory={() => setInfoModalType('factory')}
          onLearnMoreEco={() => setInfoModalType('eco')}
        />

        {/* 7. Social Proof & Reviews: "Ils dorment déjà mieux" */}
        <ReviewsSection
          onWriteReview={() => {
            alert('Merci ! Vos avis certifiés sont récoltés automatiquement suite à vos commandes livrées.');
          }}
        />
      </main>

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
        onSelectProduct={(product) => setSelectedProduct(product)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(product) => setSelectedProduct(product)}
        onSelectCategory={(catId) => scrollToSection(catId === 'matelas' ? 'matelas' : 'nos-univers')}
      />

      <InfoModal
        isOpen={infoModalType !== null}
        type={infoModalType}
        onClose={() => setInfoModalType(null)}
      />
    </div>
  );
}
