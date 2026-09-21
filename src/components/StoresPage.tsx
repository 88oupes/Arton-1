import { useState, useEffect } from 'react';
import {
  MapPin,
  Clock,
  Phone,
  Navigation,
  CheckCircle2,
  ExternalLink,
  Store,
  ChevronRight,
  MessageCircle,
  Sparkles,
  Home,
  ShieldCheck,
  Truck,
  Layers,
  HelpCircle,
} from 'lucide-react';
import { STORES, StoreLocation } from '../data/stores';
import { navigateTo, getHomeUrl } from '../utils/navigation';
import { updateMetaTags } from '../utils/seo';

export default function StoresPage() {
  const [selectedStoreId, setSelectedStoreId] = useState<string>('all');

  useEffect(() => {
    updateMetaTags({
      title: 'Nos Magasins DARY au Maroc — Showrooms Berrechid & Mohammedia | Literie Haute Confection',
      description:
        'Visitez nos magasins et showrooms DARY à Berrechid et Mohammedia. Venez essayer nos matelas faits main, concevoir vos sommiers et lits coffres avec nos conseillers experts.',
      canonicalPath: '/nos-magasins',
      type: 'website',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: 'DARY Showrooms Literie Maroc',
        description: 'Boutiques et showrooms de matelas et literie artisanale au Maroc.',
        url: 'https://dary.ma/nos-magasins',
        telephone: '+212691707445',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Literie & Matelas Haute Confection',
        },
      },
    });
  }, []);

  const displayedStores =
    selectedStoreId === 'all'
      ? STORES
      : STORES.filter((s) => s.id === selectedStoreId);

  return (
    <div className="w-full bg-[#FAF8FB] min-h-screen pb-20">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Fil d'Ariane" className="bg-white border-b border-[#F0EAF3] py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center gap-2 text-xs text-[#735F80]">
          <a
            href={getHomeUrl()}
            onClick={(e) => navigateTo(getHomeUrl(), e)}
            className="hover:text-[#723C90] transition-colors flex items-center gap-1 font-medium"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Accueil</span>
          </a>
          <ChevronRight className="w-3.5 h-3.5 text-[#BBAAC7]" />
          <span className="font-semibold text-[#2D1C38]">Nos Magasins & Showrooms</span>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="bg-gradient-to-b from-white via-[#FAF7FB] to-[#FAF8FB] border-b border-[#EEDBEE]/60 pt-12 pb-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F0EAF3] text-[#723C90] text-xs font-semibold uppercase tracking-wider mb-4">
            <Store className="w-3.5 h-3.5" />
            <span>Présence Nationale au Maroc</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#2D1C38] tracking-tight leading-[1.15]">
            Nos Magasins & Showrooms <br />
            <span className="italic font-normal text-[#723C90]">Berrechid & Mohammedia</span>
          </h1>

          <p className="text-sm sm:text-base text-[#735F80] mt-4 leading-relaxed max-w-2xl mx-auto font-normal">
            Rien ne remplace le ressenti d'un matelas. Venez vous allonger, tester les différentes densités et échanger avec nos experts pour composer la chambre de vos rêves.
          </p>

          {/* Quick Filter Pill Tabs */}
          <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
            <button
              onClick={() => setSelectedStoreId('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                selectedStoreId === 'all'
                  ? 'bg-[#723C90] text-white shadow-md'
                  : 'bg-white text-[#554860] border border-[#E5DAEA] hover:bg-[#FAF8FB]'
              }`}
            >
              Tous nos magasins ({STORES.length})
            </button>
            {STORES.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedStoreId(s.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedStoreId === s.id
                    ? 'bg-[#723C90] text-white shadow-md'
                    : 'bg-white text-[#554860] border border-[#E5DAEA] hover:bg-[#FAF8FB]'
                }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>{s.name}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Stores Listing */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-10 sm:pt-14 space-y-12">
        {displayedStores.map((store, index) => (
          <article
            key={store.id}
            id={store.id}
            className="bg-white rounded-3xl border border-[#EFE7F3] shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left Column: Comprehensive Store Info */}
              <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  {/* Top Badges */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-[#FAF4FD] text-[#723C90] border border-[#EADBEE] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3" />
                      {store.city}
                    </span>
                    {store.badges.map((badge, idx) => (
                      <span
                        key={idx}
                        className="bg-[#FAF8FB] text-[#735F80] border border-[#EFE7F3] text-xs font-medium px-3 py-1 rounded-full"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2D1C38]">
                      {store.name}
                    </h2>
                    <p className="text-xs sm:text-sm font-semibold text-[#723C90] mt-0.5">
                      {store.type}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-[#735F80] leading-relaxed">
                    {store.description}
                  </p>

                  {/* Address, Hours & Contacts Box */}
                  <div className="bg-[#FAF8FB] rounded-2xl p-4 sm:p-5 border border-[#F0EAF3] space-y-3.5">
                    {/* Address */}
                    <div className="flex items-start gap-3 text-xs sm:text-sm">
                      <div className="w-8 h-8 rounded-xl bg-white text-[#723C90] flex items-center justify-center shrink-0 mt-0.5 border border-[#E5DAEA] shadow-xs">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-bold block text-[#2D1C38]">Adresse exacte</span>
                        <span className="text-[#554860] leading-relaxed">{store.address}</span>
                      </div>
                    </div>

                    {/* Hours */}
                    <div className="flex items-start gap-3 text-xs sm:text-sm">
                      <div className="w-8 h-8 rounded-xl bg-white text-[#723C90] flex items-center justify-center shrink-0 mt-0.5 border border-[#E5DAEA] shadow-xs">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-bold block text-[#2D1C38]">Horaires d'accueil</span>
                        {store.hours.map((h, i) => (
                          <div key={i} className="text-xs text-[#735F80]">
                            <strong className="text-[#42304F]">{h.days} :</strong> {h.hours}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-start gap-3 text-xs sm:text-sm">
                      <div className="w-8 h-8 rounded-xl bg-white text-[#723C90] flex items-center justify-center shrink-0 mt-0.5 border border-[#E5DAEA] shadow-xs">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-bold block text-[#2D1C38]">Téléphone & WhatsApp</span>
                        <a
                          href={`tel:${store.phone}`}
                          className="text-[#723C90] font-semibold hover:underline"
                        >
                          {store.phoneDisplay}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Highlights list */}
                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-bold text-[#2D1C38] uppercase tracking-wider block">
                      Services et avantages disponibles :
                    </span>
                    {store.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-[#52405F]">
                        <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-3 border-t border-[#F0EAF3]">
                  <a
                    href={store.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-[#723C90] hover:bg-[#542D6B] text-white rounded-xl text-xs sm:text-sm font-semibold shadow-md transition-all cursor-pointer active:scale-[0.99]"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Ouvrir sur Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5 text-white/80" />
                  </a>

                  <a
                    href={`https://wa.me/${store.whatsapp}?text=${encodeURIComponent(
                      `Bonjour DARY, je souhaite obtenir des renseignements sur votre magasin de ${store.city}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-xl text-xs sm:text-sm font-semibold shadow-sm transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Contacter par WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Embedded Google Map */}
              <div className="lg:col-span-6 bg-[#F3EDF6] min-h-[420px] lg:min-h-full relative border-t lg:border-t-0 lg:border-l border-[#EFE7F3]">
                <iframe
                  title={`Google Maps ${store.name}`}
                  src={store.embedMapUrl}
                  width="100%"
                  height="100%"
                  className="w-full h-full min-h-[420px] border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

                {/* Top Badge Overlay */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-md border border-[#EFE7F3] flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse" />
                  <span className="text-[11px] font-bold text-[#2D1C38]">
                    {store.city} — Ouvert aux visites
                  </span>
                </div>

                {/* Bottom External Link Overlay */}
                <div className="absolute bottom-4 right-4">
                  <a
                    href={store.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#2D1C38]/90 hover:bg-[#2D1C38] text-white text-[11px] font-medium px-3.5 py-2 rounded-xl shadow-lg backdrop-blur-xs flex items-center gap-1.5 transition-colors"
                  >
                    <span>Lancer le GPS</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </article>
        ))}

        {/* Reassurance Grid: Why visit our showrooms? */}
        <section className="bg-white rounded-3xl border border-[#EFE7F3] p-8 sm:p-12 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#723C90] block mb-2">
              L'Expérience en Showroom
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D1C38]">
              Pourquoi nous rendre visite en boutique ?
            </h2>
            <p className="text-xs sm:text-sm text-[#735F80] mt-2">
              Une immersion sensorielle au cœur de la haute confection artisanale marocaine.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center space-y-2.5 p-4 rounded-2xl bg-[#FAF8FB]">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF4FD] text-[#723C90] flex items-center justify-center mx-auto mb-3 border border-[#EADBEE]">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-[#2D1C38]">Essai Libre & Immédiat</h3>
              <p className="text-xs text-[#735F80] leading-relaxed">
                Prenez 15 minutes pour vous allonger et ressentir la différence entre nos matelas Ferme, Équilibré et Moelleux.
              </p>
            </div>

            <div className="text-center space-y-2.5 p-4 rounded-2xl bg-[#FAF8FB]">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF4FD] text-[#723C90] flex items-center justify-center mx-auto mb-3 border border-[#EADBEE]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-[#2D1C38]">Conseils Sans Engagement</h3>
              <p className="text-xs text-[#735F80] leading-relaxed">
                Nos conseillers ne sont pas de simples vendeurs : ils connaissent les matériaux, les ressorts ensachés et la confection.
              </p>
            </div>

            <div className="text-center space-y-2.5 p-4 rounded-2xl bg-[#FAF8FB]">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF4FD] text-[#723C90] flex items-center justify-center mx-auto mb-3 border border-[#EADBEE]">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-[#2D1C38]">Commande & Livraison Offerte</h3>
              <p className="text-xs text-[#735F80] leading-relaxed">
                Passez commande sur place et profitez de la livraison et de l'installation offertes directement chez vous au Maroc.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
