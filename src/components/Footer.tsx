import { useState, type FormEvent } from 'react';
import { Mail, Phone, MapPin, ArrowRight, ShieldCheck, Truck, RotateCcw, CreditCard } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="w-full bg-[#0F172A] text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Reinsurance Icons Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 mb-12 border-b border-slate-800 text-center sm:text-left">
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="w-10 h-10 rounded-full bg-slate-800/80 flex items-center justify-center text-emerald-400 shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">100 nuits d'essai</div>
              <div className="text-xs text-slate-400">Satisfait ou remboursé</div>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="w-10 h-10 rounded-full bg-slate-800/80 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Garantie 10 ans</div>
              <div className="text-xs text-slate-400">Tranquillité absolue</div>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="w-10 h-10 rounded-full bg-slate-800/80 flex items-center justify-center text-emerald-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Livraison offerte</div>
              <div className="text-xs text-slate-400">Partout en France métropolitaine</div>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="w-10 h-10 rounded-full bg-slate-800/80 flex items-center justify-center text-emerald-400 shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Paiement 3x ou 4x</div>
              <div className="text-xs text-slate-400">Sans frais dès 150 €</div>
            </div>
          </div>
        </div>

        {/* Main Footer Links & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="white" size="lg" />
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              Atelier et manufacture française de literie d'exception. Nous combinons recherche ergonomique, matières nobles durables et circuit court direct usine.
            </p>

            <div className="space-y-2 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="tel:0681707445" className="hover:text-white transition-colors">
                  06 81 70 74 45 (du lun au ven 9h-19h)
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>contact@dormilux.fr</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Manufacture DormiLux, 69000 Lyon, France</span>
              </div>
            </div>
          </div>

          {/* Column 1: Nos produits */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Nos produits
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><a href="#matelas" className="hover:text-white transition-colors">Matelas Équilibre</a></li>
              <li><a href="#matelas" className="hover:text-white transition-colors">Matelas Sérénité</a></li>
              <li><a href="#matelas" className="hover:text-white transition-colors">Matelas Naturel Latex</a></li>
              <li><a href="#matelas" className="hover:text-white transition-colors">Matelas Prestige Palace</a></li>
              <li><a href="#sommiers" className="hover:text-white transition-colors">Sommiers tapissiers</a></li>
              <li><a href="#accessoires" className="hover:text-white transition-colors">Oreillers ergonomiques</a></li>
            </ul>
          </div>

          {/* Column 2: L'Atelier */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              L'Atelier DormiLux
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><a href="#notre-usine" className="hover:text-white transition-colors">Notre usine française</a></li>
              <li><a href="#notre-usine" className="hover:text-white transition-colors">Engagement éco-responsable</a></li>
              <li><a href="#avis" className="hover:text-white transition-colors">Avis clients certifiés</a></li>
              <li><a href="#conseils" className="hover:text-white transition-colors">Guide du sommeil</a></li>
              <li><a href="#garantie" className="hover:text-white transition-colors">Conditions de garantie</a></li>
              <li><a href="#presse" className="hover:text-white transition-colors">Espace Presse</a></li>
            </ul>
          </div>

          {/* Column 3: Newsletter */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Offre Privilège
            </h4>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Inscrivez-vous pour recevoir nos conseils sommeil et <strong>20 € offerts</strong> sur votre première commande.
            </p>

            {subscribed ? (
              <div className="bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs p-3 rounded-lg flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Merci ! Votre bon de réduction vous a été envoyé.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre adresse email..."
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#204033] hover:bg-[#2a5544] text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Bénéficier de -20 €</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} DormiLux France SAS. Tous droits réservés.</span>
          </div>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            <a href="#cgv" className="hover:text-slate-300 transition-colors">CGV & Mentions légales</a>
            <span>•</span>
            <a href="#confidentialite" className="hover:text-slate-300 transition-colors">Politique de confidentialité</a>
            <span>•</span>
            <a href="#cookies" className="hover:text-slate-300 transition-colors">Gestion des cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
