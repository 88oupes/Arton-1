import { X, ShieldCheck, Factory, Leaf, Award } from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  type: 'factory' | 'eco' | 'checkout' | 'reviews' | null;
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
            <div className="w-12 h-12 rounded-xl bg-[#F0EAF3] text-[#723C90] flex items-center justify-center mb-4">
              <Factory className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#723C90]">
              Atelier DARY Maroc
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2D1C38] mt-1 mb-4">
              Notre savoir-faire d'atelier
            </h3>
            <div className="space-y-3 text-sm text-[#554860] leading-relaxed">
              <p>
                Depuis notre manufacture au Maroc, les artisans matelassiers DARY conçoivent des matelas d'exception répondant aux exigences les plus strictes d'ergonomie et de longévité.
              </p>
              <p>
                Chaque pièce passe par 18 points de contrôle stricts : densité des mousses haute résilience, tension des ressorts ensachés en alliage titane, robustesse du capitonnage et régularité des coutures gansées.
              </p>
              <div className="bg-[#F8F6F9] p-4 rounded-xl border border-[#F0EAF3] space-y-2 text-xs text-[#2D1C38] font-medium">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#723C90] shrink-0" />
                  <span>100% de la confection réalisée dans notre atelier DARY au Maroc</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#723C90] shrink-0" />
                  <span>Test d'endurance équivalent à 10 années d'utilisation intensive</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {type === 'eco' && (
          <div>
            <div className="w-12 h-12 rounded-xl bg-[#F0EAF3] text-[#723C90] flex items-center justify-center mb-4">
              <Leaf className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#723C90]">
              Engagement Durable DARY
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2D1C38] mt-1 mb-4">
              Dormir mieux, préserver demain
            </h3>
            <div className="space-y-3 text-sm text-[#554860] leading-relaxed">
              <p>
                Chez DARY, nous refusons l'obsolescence programmée et les composants polluants. Nos matelas sont conçus pour durer plus de 10 ans sans affaissement.
              </p>
              <ul className="space-y-2 mt-2">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#723C90] mt-1.5 shrink-0" />
                  <span><strong>Latex 100% naturel :</strong> Issu de forêts d'hévéa gérées durablement sans déforestation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#723C90] mt-1.5 shrink-0" />
                  <span><strong>Textiles certifiés Oeko-Tex® :</strong> Garanti sans métaux lourds ni retardateurs de flammes toxiques.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#723C90] mt-1.5 shrink-0" />
                  <span><strong>Circuit court direct atelier :</strong> Aucun intermédiaire pour limiter au maximum l'empreinte carbone logistique.</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {type === 'reviews' && (
          <div>
            <div className="w-12 h-12 rounded-xl bg-[#F0EAF3] text-[#723C90] flex items-center justify-center mb-4">
              <Award className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#723C90]">
              Avis Clients Certifiés DARY
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2D1C38] mt-1 mb-4">
              Transparence & Satisfaction 4,8 / 5
            </h3>
            <div className="space-y-3 text-sm text-[#554860] leading-relaxed">
              <p>
                Chez DARY, 100% de nos avis proviennent d'acheteurs réels au Maroc ayant reçu leur commande.
              </p>
              <p>
                Chaque client reçoit un questionnaire après 30 nuits de sommeil pour évaluer la qualité de l'accueil, le maintien morphologique et la tenue dans le temps de leur matelas DARY.
              </p>
              <div className="bg-[#F8F6F9] p-4 rounded-xl border border-[#F0EAF3] space-y-2 text-xs text-[#2D1C38] font-medium">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#723C90] shrink-0" />
                  <span>97,8% de nos dormeurs recommandent DARY à leurs proches</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#723C90] shrink-0" />
                  <span>Livraison et service après-vente basé au Maroc</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {type === 'checkout' && (
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-[#F0EAF3] text-[#723C90] flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#723C90]">
              Commande DARY Enregistrée
            </span>
            <h3 className="font-serif text-3xl font-bold text-[#2D1C38] mt-1 mb-2">
              Merci pour votre confiance !
            </h3>
            <p className="text-sm text-[#554860] max-w-md mx-auto leading-relaxed">
              Votre commande DARY a été prise en compte avec succès. Notre atelier commence la préparation de votre literie avec le plus grand soin.
            </p>
            <div className="bg-[#F8F6F9] p-4 rounded-xl border border-[#F0EAF3] mt-6 text-xs text-left text-[#554860] space-y-1.5">
              <div><strong className="text-[#2D1C38]">Numéro de commande :</strong> #DARY-78492</div>
              <div><strong className="text-[#2D1C38]">Délai estimé :</strong> 48 à 72 heures avec prise de rendez-vous téléphonique</div>
              <div><strong className="text-[#2D1C38]">Garantie :</strong> 100 nuits d'essai à compter de la réception</div>
            </div>
            <button
              onClick={onClose}
              className="mt-6 w-full py-3 bg-[#723C90] hover:bg-[#542D6B] text-white rounded-lg text-sm font-semibold transition-colors cursor-pointer shadow-sm"
            >
              Retourner à la boutique DARY
            </button>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-[#F0EAF3] flex justify-end">
          {type !== 'checkout' && (
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-[#723C90] text-white text-xs font-semibold rounded-lg hover:bg-[#542D6B] transition-colors cursor-pointer shadow-sm"
            >
              Fermer
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
