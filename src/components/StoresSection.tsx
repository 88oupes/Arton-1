import { useState } from 'react';
import { MapPin } from 'lucide-react';
import { STORES } from '../data/stores';

export default function StoresSection() {
  const [activeStoreId, setActiveStoreId] = useState<string>('berrechid');

  const currentStore = STORES.find((s) => s.id === activeStoreId) || STORES[0];

  return (
    <section id="nos-magasins" className="w-full bg-[#FAF9F7] py-16 sm:py-24 border-b border-[#E8EEF5] relative overflow-hidden">
      {/* Subtle decorative background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#BA8C48]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#132B45]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-10 sm:mb-14">
          <div className="w-8 h-1 bg-[#BA8C48] mb-3 rounded-full" />
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#132B45] tracking-tight leading-[1.2]">
            Venez essayer votre confort <br />
            <span className="italic font-normal text-[#BA8C48]">dans nos magasins</span>
          </h2>
          <p className="text-sm sm:text-base text-[#536B82] mt-3 leading-relaxed">
            Nos conseillers vous accueillent à <strong>Berrechid</strong> et <strong>Mohammedia</strong> pour tester nos matelas haute confection et concevoir votre literie sur mesure.
          </p>
        </div>

        {/* Store Tabs Selector */}
        <div className="flex gap-2 sm:gap-3 p-1.5 bg-white rounded-2xl border border-[#E8EEF5] shadow-xs max-w-md mb-8">
          {STORES.map((store) => {
            const isActive = store.id === activeStoreId;
            return (
              <button
                key={store.id}
                onClick={() => setActiveStoreId(store.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#132B45] text-white shadow-md'
                    : 'text-[#536B82] hover:text-[#132B45] hover:bg-[#F7F9FB]'
                }`}
              >
                <MapPin className={`w-3.5 h-3.5 ${isActive ? 'text-[#BA8C48]' : 'text-[#BA8C48]'}`} />
                <span>{store.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Store Showcase Card (Split Grid) */}
        <div className="bg-white rounded-3xl border border-[#E8EEF5] shadow-lg overflow-hidden transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Column: Store Details & Practical Info */}
            <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-center space-y-6">
              <div className="space-y-4">
                {/* Title & Description */}
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#132B45]">
                    {currentStore.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-[#BA8C48] mt-0.5">
                    {currentStore.type}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-[#536B82] leading-relaxed">
                  {currentStore.description}
                </p>
              </div>
            </div>

            {/* Right Column: Google Maps Interactive Embed */}
            <div className="lg:col-span-6 bg-[#F0F4F8] min-h-[380px] lg:min-h-[500px] relative border-t lg:border-t-0 lg:border-l border-[#E8EEF5]">
              <iframe
                title={`Carte Google Maps - ${currentStore.name}`}
                src={currentStore.embedMapUrl}
                width="100%"
                height="100%"
                className="w-full h-full min-h-[380px] lg:min-h-[500px] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Floating Maps Overlay Badge */}
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-md border border-[#E8EEF5] flex items-center gap-2 pointer-events-auto">
                <div className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse" />
                <span className="text-[11px] font-bold text-[#132B45]">
                  Magasin ouvert aujourd'hui
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
