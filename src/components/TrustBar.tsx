import { Factory, Leaf, Truck, ShieldCheck } from 'lucide-react';

export default function TrustBar() {
  const items = [
    {
      icon: Factory,
      title: 'Production en circuit court',
      subtitle: 'Dans notre propre usine',
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
      title: 'Garantie jusqu\'à 10 ans',
      subtitle: 'Dormez en toute sérénité',
    },
  ];

  return (
    <section className="w-full bg-white border-b border-[#E8ECE9] py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-6">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3.5 sm:gap-4 p-2 rounded-xl transition-all duration-200 hover:bg-[#F9FAF9]"
              >
                <div className="w-12 h-12 rounded-xl bg-[#F4F6F4] flex items-center justify-center shrink-0 text-[#204033] border border-[#E3E8E4]">
                  <Icon className="w-6 h-6 stroke-[1.75]" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-[#0F172A] leading-tight">
                    {item.title}
                  </h2>
                  <p className="text-xs text-[#64748B] mt-0.5 font-normal">
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
