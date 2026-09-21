import { Factory, Leaf, Truck, ShieldCheck } from 'lucide-react';

export default function TrustBar() {
  const items = [
    {
      icon: Factory,
      title: 'Confection 100% Marocaine',
      subtitle: 'Fabriqué dans nos ateliers',
    },
    {
      icon: Leaf,
      title: 'Matériaux certifiés',
      subtitle: 'Sains et durables',
    },
    {
      icon: Truck,
      title: 'Livraison rapide',
      subtitle: 'Partout au Maroc',
    },
    {
      icon: ShieldCheck,
      title: "Garantie jusqu'à 35 ans",
      subtitle: 'Dormez en toute sérénité',
    },
  ];

  return (
    <section className="w-full bg-[#FCFAFD] border-b border-[#EFE8F2] py-3 sm:py-3.5">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-2.5 sm:gap-4 lg:gap-6">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-start sm:items-center gap-2 sm:gap-2.5 p-1 rounded-lg transition-colors hover:bg-white"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#F3EDF6] flex items-center justify-center shrink-0 text-[#723C90] border border-[#E8DCEE] mt-0.5 sm:mt-0">
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[1.5]" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-[10.5px] sm:text-[11.5px] font-medium text-[#2D1C38] leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-[9.5px] sm:text-[10.5px] text-[#665373] mt-0.5 leading-tight">
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
