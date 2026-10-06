import { Factory, Leaf, Truck, ShieldCheck } from 'lucide-react';

export default function TrustBar() {
  const items = [
    {
      icon: Factory,
      title: 'Confection 100% Marocaine',
      subtitle: 'Manufacture ARTON CONFORT',
    },
    {
      icon: Leaf,
      title: 'Matériaux certifiés',
      subtitle: 'Mousse saine & Oeko-Tex',
    },
    {
      icon: Truck,
      title: 'Livraison rapide & soignée',
      subtitle: 'Partout au Maroc',
    },
    {
      icon: ShieldCheck,
      title: "Garantie jusqu'à 35 ans",
      subtitle: 'Dormez en toute sérénité',
    },
  ];

  return (
    <section className="w-full bg-[#FAF9F7] border-b border-[#E8EEF5] py-3.5 sm:py-4">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-2.5 sm:gap-4 lg:gap-6">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-start sm:items-center gap-2 sm:gap-2.5 p-1.5 rounded-lg transition-colors hover:bg-white"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#FAF6EE] flex items-center justify-center shrink-0 text-[#BA8C48] border border-[#E6D6B6] mt-0.5 sm:mt-0">
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[1.6]" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-[10.5px] sm:text-[11.5px] font-semibold text-[#132B45] leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-[9.5px] sm:text-[10.5px] text-[#536B82] mt-0.5 leading-tight">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
