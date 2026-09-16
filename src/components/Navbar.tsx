import { useState } from 'react';
import { Search, User, ShoppingBag, Menu, X, Phone, ChevronRight, Sparkles, ShieldCheck, Truck } from 'lucide-react';
import Logo from './Logo';

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
  onSelectCategory,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navLinks = [
    { name: 'Matelas', href: '#matelas', hasMenu: true },
    { name: 'Sommiers', href: '#sommiers' },
    { name: 'Oreillers & Accessoires', href: '#accessoires' },
    { name: 'Nos collections', href: '#collections' },
    { name: 'À propos', href: '#notre-usine' },
    { name: 'Conseils', href: '#conseils', isQuiz: true },
  ];

  const handleNavClick = (link: typeof navLinks[0]) => {
    if (link.isQuiz) {
      onOpenQuiz();
      setMobileMenuOpen(false);
      return;
    }
    if (onSelectCategory && link.href.startsWith('#')) {
      onSelectCategory(link.href.replace('#', ''));
    }
    const target = document.querySelector(link.href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="w-full sticky top-0 z-40 bg-white/95 backdrop-blur-md transition-all border-b border-[#E8ECE9]">
      {/* Top Utility Announcement Bar */}
      <div className="bg-[#F6F7F5] border-b border-[#EBECE8] text-[#4A5568] text-xs py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          {/* Left reassurance items */}
          <div className="flex items-center flex-wrap justify-center gap-3 sm:gap-4 font-normal text-[#334155]">
            <span className="flex items-center gap-1.5 hover:text-[#204033] transition-colors">
              <span className="inline-block w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[9px] font-semibold">
                FR
              </span>
              Fabrication locale
            </span>
            <span className="text-[#CBD5E1] hidden xs:inline">|</span>
            <span className="flex items-center gap-1 hover:text-[#204033] transition-colors">
              <ShieldCheck className="w-3.5 h-3.5 text-[#204033]" />
              Qualité certifiée
            </span>
            <span className="text-[#CBD5E1] hidden sm:inline">|</span>
            <span className="flex items-center gap-1 hover:text-[#204033] transition-colors">
              <Truck className="w-3.5 h-3.5 text-[#204033]" />
              Livraison partout en France
            </span>
          </div>

          {/* Right customer service phone */}
          <div className="flex items-center gap-1.5 font-medium text-[#204033]">
            <span className="text-[#64748B]">Besoin d'aide ?</span>
            <a
              href="tel:0681707445"
              className="font-semibold tracking-wide hover:underline inline-flex items-center gap-1"
            >
              <Phone className="w-3 h-3" />
              06 81 70 74 45
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 sm:py-4 flex items-center justify-between">
        {/* Mobile menu button */}
        <div className="flex items-center lg:hidden gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 -ml-2 text-[#19222B] hover:bg-[#F2F4F2] rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#204033]/20"
            aria-label="Menu principal"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Brand Logo */}
        <a href="#" className="flex-shrink-0 cursor-pointer focus:outline-none">
          <Logo size="md" />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 xl:gap-9 text-[14.5px] font-medium text-[#1E293B]">
          {navLinks.map((link) => (
            <div
              key={link.name}
              className="relative py-1"
              onMouseEnter={() => link.hasMenu && setActiveDropdown(link.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => handleNavClick(link)}
                className="transition-colors hover:text-[#204033] flex items-center gap-1 text-left cursor-pointer"
              >
                {link.name}
                {link.isQuiz && (
                  <span className="ml-1 text-[10px] bg-[#204033] text-white px-1.5 py-0.5 rounded-full uppercase tracking-wider font-semibold">
                    Guide
                  </span>
                )}
              </button>

              {/* Mega submenu preview for Matelas */}
              {link.hasMenu && activeDropdown === link.name && (
                <div className="absolute top-full left-0 w-80 bg-white border border-[#E2E8F0] shadow-xl rounded-xl p-4 mt-2 grid gap-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider px-2">
                    Nos Gammes Phares
                  </div>
                  <a
                    href="#matelas-equilibre"
                    onClick={() => setActiveDropdown(null)}
                    className="p-2 rounded-lg hover:bg-[#F4F6F4] transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <div className="font-semibold text-sm text-[#0F172A] group-hover:text-[#204033]">
                        Matelas Équilibre
                      </div>
                      <div className="text-xs text-[#64748B]">Mousse ergonomique 7 zones • Dès 349 €</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#94A3B8] group-hover:text-[#204033] transition-transform group-hover:translate-x-0.5" />
                  </a>
                  <a
                    href="#matelas-serenite"
                    onClick={() => setActiveDropdown(null)}
                    className="p-2 rounded-lg hover:bg-[#F4F6F4] transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <div className="font-semibold text-sm text-[#0F172A] group-hover:text-[#204033]">
                        Matelas Sérénité
                      </div>
                      <div className="text-xs text-[#64748B]">Ressorts & mémoire de forme • Dès 499 €</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#94A3B8] group-hover:text-[#204033] transition-transform group-hover:translate-x-0.5" />
                  </a>
                  <a
                    href="#matelas-naturel"
                    onClick={() => setActiveDropdown(null)}
                    className="p-2 rounded-lg hover:bg-[#F4F6F4] transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <div className="font-semibold text-sm text-[#0F172A] group-hover:text-[#204033]">
                        Matelas Naturel
                      </div>
                      <div className="text-xs text-[#64748B]">100% Latex naturel & coton bio • Dès 599 €</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#94A3B8] group-hover:text-[#204033] transition-transform group-hover:translate-x-0.5" />
                  </a>
                  <a
                    href="#matelas-prestige"
                    onClick={() => setActiveDropdown(null)}
                    className="p-2 rounded-lg hover:bg-[#F4F6F4] transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <div className="font-semibold text-sm text-[#0F172A] group-hover:text-[#204033]">
                        Matelas Prestige
                      </div>
                      <div className="text-xs text-[#64748B]">Palace luxe fait main • Dès 799 €</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#94A3B8] group-hover:text-[#204033] transition-transform group-hover:translate-x-0.5" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Action icons (Search, Account, Cart) */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Quiz CTA on tablet/desktop */}
          <button
            onClick={onOpenQuiz}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[#204033] bg-[#EAF2ED] hover:bg-[#DCEAE1] transition-colors border border-[#C5DCD0]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#204033]" />
            Trouver mon matelas
          </button>

          {/* Search button */}
          <button
            onClick={onOpenSearch}
            className="p-2.5 text-[#19222B] hover:text-[#204033] hover:bg-[#F2F4F2] rounded-full transition-colors focus:outline-none"
            title="Rechercher"
            aria-label="Rechercher"
          >
            <Search className="w-5 h-5 stroke-[1.8]" />
          </button>

          {/* Account button */}
          <a
            href="#compte"
            onClick={(e) => {
              e.preventDefault();
              alert('Espace client DormiLux : connectez-vous ou suivez votre commande avec votre numéro de suivi.');
            }}
            className="p-2.5 text-[#19222B] hover:text-[#204033] hover:bg-[#F2F4F2] rounded-full transition-colors focus:outline-none"
            title="Mon Compte"
            aria-label="Mon Compte"
          >
            <User className="w-5 h-5 stroke-[1.8]" />
          </a>

          {/* Cart button with counter */}
          <button
            onClick={onOpenCart}
            className="p-2.5 text-[#19222B] hover:text-[#204033] hover:bg-[#F2F4F2] rounded-full transition-colors relative focus:outline-none"
            title="Panier"
            aria-label="Panier d'achats"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
            <span className="absolute top-1 right-1 bg-[#19222B] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Slide-over Navigation Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[96px] z-50 bg-black/40 backdrop-blur-xs lg:hidden">
          <div className="bg-white border-b border-[#E2E8F0] shadow-2xl p-6 flex flex-col gap-4 animate-in slide-in-from-top duration-250 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Menu de navigation
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-500 hover:text-black p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link)}
                  className="flex items-center justify-between py-3 px-3 rounded-lg text-base font-medium text-[#1E293B] hover:bg-[#F4F6F4] hover:text-[#204033] text-left transition-colors"
                >
                  <span className="flex items-center gap-2">
                    {link.name}
                    {link.isQuiz && (
                      <span className="text-[10px] bg-[#204033] text-white px-2 py-0.5 rounded-full font-semibold">
                        Guide
                      </span>
                    )}
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuiz();
                }}
                className="w-full py-3 px-4 bg-[#204033] text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#183329] transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                Trouver mon matelas idéal (Guide)
              </button>

              <div className="bg-[#F8FAF9] p-4 rounded-xl flex items-center justify-between text-sm text-[#334155]">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#204033]" />
                  <span>Service client :</span>
                </div>
                <a href="tel:+33123456789" className="font-bold text-[#204033]">
                  +33 1 23 45 67 89
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
