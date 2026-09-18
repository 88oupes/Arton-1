import { useState, useEffect, useMemo } from 'react';
import {
  FileText,
  Search,
  ExternalLink,
  ChevronRight,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  PackageCheck,
  Building2,
  PhoneCall,
  Sliders
} from 'lucide-react';
import { PRODUCTS, CATEGORIES_INFO, CATEGORIES_LIST } from '../data/products';
import { navigateTo, getProductUrl, getCategoryUrl, getHomeUrl } from '../utils/navigation';
import { updateMetaTags } from '../utils/seo';

interface SitemapPageProps {
  onOpenQuiz: () => void;
}

export default function SitemapPage({ onOpenQuiz }: SitemapPageProps) {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const title = 'Plan du site e-commerce — DARY Literie & Manufacture Marocaine';
    const description = 'Explorez l\'arborescence complète du catalogue e-commerce DARY : matelas, lits, sommiers, linge de lit, salons et oreillers fabriqués au Maroc.';

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Plan du site e-commerce DARY',
      description: description,
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Accueil',
            item: 'https://dary.ma/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Plan du site',
            item: 'https://dary.ma/plan-du-site',
          },
        ],
      },
    };

    updateMetaTags({
      title,
      description,
      canonicalPath: '/plan-du-site',
      schema,
    });
  }, []);

  // Filter products by search query
  const filteredCategories = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) {
      return CATEGORIES_LIST.map((c) => ({
        ...c,
        info: CATEGORIES_INFO[c.id],
        products: PRODUCTS.filter((p) => p.category === c.id || (c.id === 'salon' && p.category === 'oreiller')),
      }));
    }

    return CATEGORIES_LIST.map((c) => {
      const info = CATEGORIES_INFO[c.id];
      const matchingProducts = PRODUCTS.filter(
        (p) =>
          (p.category === c.id || (c.id === 'salon' && p.category === 'oreiller')) &&
          (p.name.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.slug.toLowerCase().includes(q) ||
            c.name.toLowerCase().includes(q))
      );
      const categoryMatches = c.name.toLowerCase().includes(q) || info.description.toLowerCase().includes(q);

      return {
        ...c,
        info,
        products: categoryMatches
          ? PRODUCTS.filter((p) => p.category === c.id || (c.id === 'salon' && p.category === 'oreiller'))
          : matchingProducts,
      };
    }).filter((c) => c.products.length > 0);
  }, [searchQuery]);

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
          <span className="font-semibold text-[#2D1C38]">Plan du site e-commerce</span>
        </div>
      </nav>

      {/* Header Banner */}
      <section className="bg-white border-b border-[#F0EAF3] py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 bg-[#F8F3FA] text-[#723C90] px-3.5 py-1 rounded-full text-xs font-semibold border border-[#EFE4F5]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Indexation & Navigation DARY</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#2D1C38]">
              Plan du site e-commerce DARY
            </h1>
            <p className="text-sm sm:text-base text-[#665373] leading-relaxed">
              Consultez l'ensemble des pages de notre manufacture : catégories de literie, fiches techniques produits avec liens personnalisés, et informations de commande au Maroc.
            </p>

            {/* XML Sitemap Button */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold bg-[#FAF5FC] hover:bg-[#F0E4F5] text-[#723C90] px-4 py-2 rounded-xl border border-[#EFE4F5] transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span>Accéder au fichier sitemap.xml</span>
                <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
              </a>
            </div>
          </div>

          {/* Quick Search */}
          <div className="mt-8 max-w-md relative">
            <Search className="w-4 h-4 text-[#8E7E9C] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher une catégorie ou un produit..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF8FB] border border-[#EFE7F3] text-sm text-[#2D1C38] placeholder-[#8E7E9C] focus:outline-none focus:ring-2 focus:ring-[#723C90]/30 focus:border-[#723C90]"
            />
          </div>
        </div>
      </section>

      {/* Sitemap Tree Structure */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-10 space-y-12">
        {/* Categories & Products Tree */}
        <div className="space-y-10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2D1C38] flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#723C90]" />
              <span>Arborescence des Rayons & Produits</span>
            </h2>
            <span className="text-xs text-[#735F80] font-medium">
              {PRODUCTS.length} produits référencés
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCategories.map((cat) => (
              <div
                key={cat.id}
                className="bg-white rounded-2xl border border-[#EFE7F3] p-6 shadow-xs flex flex-col justify-between"
              >
                <div>
                  {/* Category Header Link */}
                  <div className="flex items-start justify-between gap-3 border-b border-[#F5EFF8] pb-4 mb-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#8E7E9C] block">
                        Catégorie
                      </span>
                      <a
                        href={getCategoryUrl(cat.id)}
                        onClick={(e) => navigateTo(getCategoryUrl(cat.id), e)}
                        className="text-lg font-serif font-bold text-[#2D1C38] hover:text-[#723C90] transition-colors inline-flex items-center gap-1.5 group"
                      >
                        <span>{cat.name}</span>
                        <ChevronRight className="w-4 h-4 text-[#723C90] group-hover:translate-x-0.5 transition-transform" />
                      </a>
                      <div className="text-[11px] text-[#723C90] font-mono mt-0.5">
                        /categories/{cat.id}
                      </div>
                    </div>
                    <span className="text-xs bg-[#FAF5FC] text-[#542D6B] font-bold px-2.5 py-1 rounded-lg">
                      {cat.products.length} réf.
                    </span>
                  </div>

                  {/* List of Products under this Category */}
                  <ul className="space-y-2.5">
                    {cat.products.map((prod) => (
                      <li key={prod.id} className="group">
                        <a
                          href={getProductUrl(prod.slug)}
                          onClick={(e) => navigateTo(getProductUrl(prod.slug), e)}
                          className="p-2.5 rounded-xl hover:bg-[#FAF8FB] border border-transparent hover:border-[#F0EAF3] transition-all flex items-center justify-between gap-2 block"
                        >
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-semibold text-[#2D1C38] group-hover:text-[#723C90] transition-colors truncate">
                              {prod.name}
                            </div>
                            <div className="text-[10px] text-[#8E7E9C] font-mono truncate">
                              /produits/{prod.slug}
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="text-xs font-bold text-[#723C90]">
                              {prod.price.toLocaleString()} DH
                            </div>
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#F5EFF8] mt-6">
                  <a
                    href={getCategoryUrl(cat.id)}
                    onClick={(e) => navigateTo(getCategoryUrl(cat.id), e)}
                    className="text-xs font-bold text-[#723C90] hover:text-[#542D6B] flex items-center gap-1"
                  >
                    <span>Voir tout le rayon {cat.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Corporate, Guides & Customer Support Pages */}
        <div className="bg-white rounded-2xl border border-[#EFE7F3] p-6 sm:p-8 shadow-xs">
          <h2 className="text-xl font-serif font-bold text-[#2D1C38] mb-6 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#723C90]" />
            <span>Pages d'Informations & Services Clients</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div
              onClick={(e) => navigateTo(getHomeUrl(), e)}
              className="p-4 rounded-xl bg-[#FAF8FB] border border-[#F0EAF3] hover:border-[#723C90] transition-colors cursor-pointer group"
            >
              <div className="font-bold text-sm text-[#2D1C38] group-hover:text-[#723C90]">
                Page d'Accueil DARY
              </div>
              <div className="text-[11px] font-mono text-[#8E7E9C] mt-1">/ (Accueil officiel)</div>
              <p className="text-[11px] text-[#735F80] mt-2">
                Manufacture marocaine, histoire de la marque, best-sellers et avis certifiés.
              </p>
            </div>

            <div
              onClick={onOpenQuiz}
              className="p-4 rounded-xl bg-[#FAF8FB] border border-[#F0EAF3] hover:border-[#723C90] transition-colors cursor-pointer group"
            >
              <div className="font-bold text-sm text-[#2D1C38] group-hover:text-[#723C90] flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-[#723C90]" />
                <span>Guide & Quiz Literie</span>
              </div>
              <div className="text-[11px] font-mono text-[#8E7E9C] mt-1">/quiz (Diagnostic)</div>
              <p className="text-[11px] text-[#735F80] mt-2">
                Outil interactif de recommandation selon votre morphologie et position de sommeil.
              </p>
            </div>

            <div
              onClick={() => {
                const target = document.querySelector('#notre-usine');
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth' });
                } else {
                  navigateTo(getHomeUrl());
                }
              }}
              className="p-4 rounded-xl bg-[#FAF8FB] border border-[#F0EAF3] hover:border-[#723C90] transition-colors cursor-pointer group"
            >
              <div className="font-bold text-sm text-[#2D1C38] group-hover:text-[#723C90]">
                Manufacture de Casablanca
              </div>
              <div className="text-[11px] font-mono text-[#8E7E9C] mt-1">#notre-usine (Atelier)</div>
              <p className="text-[11px] text-[#735F80] mt-2">
                Découvrez nos artisans, machines de capitonnage et matières premières locales.
              </p>
            </div>

            <a
              href="https://wa.me/212660000000?text=Bonjour%20DARY,%20je%20souhaite%20des%20renseignements%20sur%20vos%20produits."
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-[#FAF8FB] border border-[#F0EAF3] hover:border-[#1EA952] transition-colors block group"
            >
              <div className="font-bold text-sm text-[#2D1C38] group-hover:text-[#1EA952] flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-[#1EA952]" />
                <span>Service Client WhatsApp</span>
              </div>
              <div className="text-[11px] font-mono text-[#8E7E9C] mt-1">+212 660 000 000</div>
              <p className="text-[11px] text-[#735F80] mt-2">
                Assistance directe, conseils sur-mesure et prise de commande immédiate 7j/7.
              </p>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
