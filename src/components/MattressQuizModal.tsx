import { useState } from 'react';
import { X, Check, ArrowRight, Sparkles, RotateCcw } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';

interface MattressQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export default function MattressQuizModal({
  isOpen,
  onClose,
  onSelectProduct,
}: MattressQuizModalProps) {
  if (!isOpen) return null;

  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    position: '',
    firmness: '',
    backPain: '',
    sleepers: '',
  });

  const handleSelect = (field: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [field]: value }));
    if (step < 4) {
      setStep((s) => s + 1);
    } else {
      setStep(5); // results
    }
  };

  const getRecommendation = (): { product: Product; reason: string } => {
    if (answers.firmness === 'Moelleux' || answers.position === 'Côté') {
      return {
        product: PRODUCTS.find((p) => p.id === 'matelas-feelsoft') || PRODUCTS[0],
        reason:
          'Grâce à son âme 100% High-Density Foam et sa couche supérieure HR 30 PRO, le matelas FEELSOFT HR élimine toute tension sur vos épaules et hanches pour un repos réparateur.',
      };
    }
    if (answers.firmness === 'Ferme' || answers.backPain === 'Oui') {
      return {
        product: PRODUCTS.find((p) => p.id === 'matelas-relax') || PRODUCTS[3],
        reason:
          'Le Matelas Relax offre un soutien orthopédique renforcé pour maintenir la colonne vertébrale parfaitement alignée, soulager les tensions lombaires et garantir un réveil sans douleur.',
      };
    }
    if (answers.sleepers === 'Couple luxe') {
      return {
        product: PRODUCTS.find((p) => p.id === 'matelas-la-nuit') || PRODUCTS[2],
        reason:
          'L\'indépendance de couchage hôtelière 5 étoiles et les 32 cm de capitonnage de prestige du Matelas La Nuit vous garantissent des nuits royales sans ressentir les mouvements de votre partenaire.',
      };
    }
    return {
      product: PRODUCTS.find((p) => p.id === 'matelas-consoft') || PRODUCTS[0],
      reason:
        'Le Matelas Consoft allie une âme haute densité et un accueil soft progressif qui s\'adapte universellement à toutes les morphologies pour un confort quotidien équilibré.',
    };
  };

  const resetQuiz = () => {
    setStep(1);
    setAnswers({ position: '', firmness: '', backPain: '', sleepers: '' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 sm:p-8 border border-gray-100 animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {step < 5 ? (
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#723C90] uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-[#723C90]" />
              <span>Diagnostic Morphologique DARY • Étape {step}/4</span>
            </div>

            <h3 className="font-serif text-2xl text-[#2D1C38] font-bold mb-6">
              {step === 1 && 'Quelle est votre position de sommeil principale ?'}
              {step === 2 && 'Quelle fermeté appréciez-vous en général ?'}
              {step === 3 && 'Ressentez-vous des raideurs ou douleurs au réveil ?'}
              {step === 4 && 'Pour qui est destiné ce nouveau matelas ?'}
            </h3>

            {step === 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: 'Sur le dos', desc: 'Besoin d\'un soutien lombaire droit' },
                  { label: 'Sur le côté', desc: 'Besoin d\'accueil souple aux épaules' },
                  { label: 'Sur le ventre', desc: 'Besoin d\'une surface stable sans creux' },
                  { label: 'Je bouge souvent', desc: 'Besoin d\'indépendance de couchage' },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleSelect('position', item.label)}
                    className="p-4 border border-[#E5DAEA] rounded-xl text-left hover:border-[#723C90] hover:bg-[#FAF5FC] transition-all cursor-pointer group"
                  >
                    <div className="font-bold text-sm text-[#2D1C38] group-hover:text-[#723C90]">
                      {item.label}
                    </div>
                    <div className="text-xs text-[#665373] mt-1">{item.desc}</div>
                  </button>
                ))}
              </div>
            )}

            {step === 2 && (
              <div className="grid grid-cols-1 gap-3">
                {[
                  { label: 'Moelleux', desc: 'Effet cocooning enveloppant et doux' },
                  { label: 'Équilibré', desc: 'Le juste milieu entre soutien et douceur' },
                  { label: 'Ferme', desc: 'Un maintien vigoureux, sensation tonique' },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleSelect('firmness', item.label)}
                    className="p-4 border border-[#E5DAEA] rounded-xl text-left hover:border-[#723C90] hover:bg-[#FAF5FC] transition-all cursor-pointer group"
                  >
                    <div className="font-bold text-sm text-[#2D1C38] group-hover:text-[#723C90]">
                      {item.label}
                    </div>
                    <div className="text-xs text-[#665373] mt-1">{item.desc}</div>
                  </button>
                ))}
              </div>
            )}

            {step === 3 && (
              <div className="grid grid-cols-1 gap-3">
                {[
                  { label: 'Oui', desc: 'Douleurs régulières au niveau du bas du dos ou nuque' },
                  { label: 'Parfois', desc: 'Après une journée intense ou fatigue' },
                  { label: 'Non', desc: 'Aucune douleur particulière' },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleSelect('backPain', item.label)}
                    className="p-4 border border-[#E5DAEA] rounded-xl text-left hover:border-[#723C90] hover:bg-[#FAF5FC] transition-all cursor-pointer group"
                  >
                    <div className="font-bold text-sm text-[#2D1C38] group-hover:text-[#723C90]">
                      {item.label}
                    </div>
                    <div className="text-xs text-[#665373] mt-1">{item.desc}</div>
                  </button>
                ))}
              </div>
            )}

            {step === 4 && (
              <div className="grid grid-cols-1 gap-3">
                {[
                  { label: 'Solo', desc: 'Pour une personne (90x190, 140x190)' },
                  { label: 'Couple standard', desc: 'Pour deux personnes (140x200, 160x200)' },
                  { label: 'Couple luxe', desc: 'Grand espace et indépendance (180x200 King)' },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleSelect('sleepers', item.label)}
                    className="p-4 border border-[#E5DAEA] rounded-xl text-left hover:border-[#723C90] hover:bg-[#FAF5FC] transition-all cursor-pointer group"
                  >
                    <div className="font-bold text-sm text-[#2D1C38] group-hover:text-[#723C90]">
                      {item.label}
                    </div>
                    <div className="text-xs text-[#665373] mt-1">{item.desc}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Results Screen */
          <div className="text-center py-2">
            <div className="w-12 h-12 rounded-full bg-[#F0EAF3] text-[#723C90] flex items-center justify-center mx-auto mb-3">
              <Check className="w-6 h-6" />
            </div>

            <span className="text-xs font-bold uppercase tracking-wider text-[#723C90]">
              Recommandation personnalisée DARY
            </span>

            <h3 className="font-serif text-3xl font-bold text-[#2D1C38] mt-1 mb-3">
              {getRecommendation().product.name}
            </h3>

            <div className="bg-[#F8F6F9] p-4 rounded-xl border border-[#F0EAF3] my-4 flex flex-col sm:flex-row items-center gap-4 text-left">
              <div className="w-24 h-20 shrink-0 bg-white p-2 rounded-lg border border-[#F0EAF3]">
                <img
                  src={getRecommendation().product.image}
                  alt={getRecommendation().product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-xs text-[#554860]">
                <p className="font-semibold text-[#2D1C38] mb-1">Pourquoi ce choix ?</p>
                <p>{getRecommendation().reason}</p>
                <p className="mt-2 font-bold text-[#723C90]">
                  À partir de {getRecommendation().product.price.toLocaleString('fr-FR')} DH • 100 nuits d'essai DARY
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 mt-6">
              <button
                onClick={() => {
                  onSelectProduct(getRecommendation().product);
                  onClose();
                }}
                className="flex-1 py-3 px-6 bg-[#723C90] hover:bg-[#542D6B] text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Découvrir et configurer</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={resetQuiz}
                className="px-4 py-3 bg-[#F0EAF3] hover:bg-[#E5DAEA] text-[#542D6B] rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Recommencer</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
