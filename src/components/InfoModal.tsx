import { X, ShieldCheck, Factory, Leaf, Award } from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  type: 'factory' | 'eco' | 'checkout' | null;
  onClose: () => void;
}

export default function InfoModal({ isOpen, type, onClose }: InfoModalProps) {
  if (!isOpen || !type) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl p-6 sm:p-8 border border-gray-100 animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {type === 'factory' && (
          <div>
            <div className="w-12 h-12 rounded-xl bg-[#EEF4F0] text-[#204033] flex items-center justify-center mb-4">
              <Factory className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#204033]">
              Manufacture Française
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F172A] mt-1 mb-4">
              Notre savoir-faire d'atelier
            </h3>
            <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
              <p>
                Depuis notre atelier implanté en région Auvergne-Rhône-Alpes, nos maîtres matelassiers perpétuent la grande tradition de la literie française.
              </p>
              <p>
                Chaque pièce passe par 18 points de contrôle stricts : densité des mousses haute résilience, tension des ressorts ensachés en alliage titane, robustesse du capitonnage et régularité des coutures gansées.
              </p>
              <div className="bg-[#F8FAF9] p-4 rounded-xl border border-[#E2E8E4] space-y-2 text-xs text-[#0F172A] font-medium">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% de la confection réalisée sur notre site de production</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Test d'endurance équivalent à 10 années d'utilisation intensive</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {type === 'eco' && (
          <div>
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#204033] flex items-center justify-center mb-4">
              <Leaf className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Engagement Durable
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F172A] mt-1 mb-4">
              Dormir mieux, préserver demain
            </h3>
            <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
              <p>
                Nous refusons l'obsolescence programmée et les composants polluants. Nos matelas sont conçus pour durer plus de 10 ans sans affaissement.
              </p>
              <ul className="space-y-2 mt-2">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  <span><strong>Latex 100% naturel :</strong> Issu de forêts d'hévéa gérées durablement sans déforestation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  <span><strong>Textiles certifiés Oeko-Tex® :</strong> Garanti sans métaux lourds ni retardateurs de flammes toxiques.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  <span><strong>Circuit court direct usine :</strong> Aucun intermédiaire pour limiter au maximum l'empreinte carbone logistique.</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {type === 'checkout' && (
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Commande Enregistrée
            </span>
            <h3 className="font-serif text-3xl font-bold text-[#0F172A] mt-1 mb-2">
              Merci pour votre confiance !
            </h3>
            <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
              Votre commande DormiLux a été prise en compte avec succès. Notre atelier commence la préparation de votre literie avec le plus grand soin.
            </p>
            <div className="bg-[#F8FAF9] p-4 rounded-xl border border-gray-200 mt-6 text-xs text-left text-gray-700 space-y-1">
              <div><strong>Numéro de commande :</strong> #DL-78492</div>
              <div><strong>Délai estimé :</strong> 48 à 72 heures avec prise de rendez-vous</div>
              <div><strong>Garantie :</strong> 100 nuits d'essai à compter de la réception</div>
            </div>
            <button
              onClick={onClose}
              className="mt-6 w-full py-3 bg-[#204033] hover:bg-[#183329] text-white rounded-lg text-sm font-semibold transition-colors cursor-pointer"
            >
              Retourner à la boutique
            </button>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
          {type !== 'checkout' && (
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-[#204033] text-white text-xs font-semibold rounded-lg hover:bg-[#183329] transition-colors cursor-pointer"
            >
              Fermer
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
