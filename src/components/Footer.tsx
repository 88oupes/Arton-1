import { useState, type FormEvent } from 'react';
import { Mail, Phone, MapPin, ArrowRight, ShieldCheck, Truck, RotateCcw, CreditCard, MessageCircle } from 'lucide-react';
import Logo from './Logo';
import { navigateTo } from '../utils/navigation';

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
    <footer className="w-full bg-[#1E1128] text-white pt-16 pb-12 border-t border-[#3B224C]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Reinsurance Icons Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 mb-12 border-b border-[#3B224C] text-center sm:text-left">
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="w-10 h-10 rounded-full bg-[#361D46] flex items-center justify-center text-[#A982B8] shrink-0 border border-[#4C2963]">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">100 nuits d'essai</div>
              <div className="text-xs text-[#C5B3D0]">Satisfait ou remboursé</div>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="w-10 h-10 rounded-full bg-[#361D46] flex items-center justify-center text-[#A982B8] shrink-0 border border-[#4C2963]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Garantie 10 ans</div>
              <div className="text-xs text-[#C5B3D0]">Sérénité absolue</div>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="w-10 h-10 rounded-full bg-[#361D46] flex items-center justify-center text-[#A982B8] shrink-0 border border-[#4C2963]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Livraison offerte</div>
              <div className="text-xs text-[#C5B3D0]">Partout au Maroc (Casablanca, Rabat...)</div>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="w-10 h-10 rounded-full bg-[#361D46] flex items-center justify-center text-[#A982B8] shrink-0 border border-[#4C2963]">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Paiement à la livraison</div>
              <div className="text-xs text-[#C5B3D0]">Ou en 3x sans frais</div>
            </div>
          </div>
        </div>

        {/* Main Footer Links & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-[#3B224C]">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="lg" className="bg-white px-3.5 py-1.5 rounded-lg shadow-sm" />
            <p className="text-xs sm:text-sm text-[#C5B3D0] max-w-sm leading-relaxed">
              Atelier et manufacture marocaine de literie d'exception. Nous combinons recherche ergonomique, matières douces certifiées et circuit court direct atelier.
            </p>

            <div className="space-y-2.5 pt-2 text-xs text-[#E5DAEA]">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#A982B8] shrink-0" />
                <a href="tel:0691707445" className="hover:text-white transition-colors">
                  06 91 70 74 45 (du lun au sam 9h-19h)
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#A982B8] shrink-0" />
                <span>contact@dary.ma</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#A982B8] shrink-0" />
                <span>Manufacture DARY, Casablanca, Maroc</span>
              </div>

              {/* Little Round Violet WhatsApp Button in Footer */}
              <div className="pt-2">
                <a
                  href="https://wa.me/212691707445?text=Bonjour%20DARY%2C%20je%20souhaite%20des%20informations%20sur%20vos%20matelas."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[#723C90] hover:bg-[#8B4CAE] text-white text-xs font-semibold shadow-md hover:shadow-lg transition-all group cursor-pointer border border-[#8E52AF]/40"
                  aria-label="Contacter sur WhatsApp au 06 91 70 74 45"
                >
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-3.5 h-3.5 fill-white text-[#723C90]" />
                  </div>
                  <span>WhatsApp : 06 91 70 74 45</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 1: Nos Catégories */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Nos Catégories
            </h4>
            <ul className="space-y-2.5 text-xs text-[#C5B3D0]">
              <li>
                <a
                  href="/categories/matelas"
                  onClick={(e) => navigateTo('/categories/matelas', e)}
                  className="hover:text-white transition-colors"
                >
                  Matelas Haute Densité
                </a>
              </li>
              <li>
                <a
                  href="/categories/linge"
                  onClick={(e) => navigateTo('/categories/linge', e)}
                  className="hover:text-white transition-colors"
                >
                  Linge de lit & Satin
                </a>
              </li>
              <li>
                <a
                  href="/categories/lit"
                  onClick={(e) => navigateTo('/categories/lit', e)}
                  className="hover:text-white transition-colors"
                >
                  Lits Coffres & Sommiers
                </a>
              </li>
              <li>
                <a
                  href="/categories/salon"
                  onClick={(e) => navigateTo('/categories/salon', e)}
                  className="hover:text-white transition-colors"
                >
                  Salons Marocains Modernes
                </a>
              </li>
              <li>
                <a
                  href="/categories/oreiller"
                  onClick={(e) => navigateTo('/categories/oreiller', e)}
                  className="hover:text-white transition-colors"
                >
                  Oreillers Ergonomiques
                </a>
              </li>
              <li>
                <a
                  href="/categories/accessoires"
                  onClick={(e) => navigateTo('/categories/accessoires', e)}
                  className="hover:text-white transition-colors"
                >
                  Accessoires & Surmatelas
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: La Maison DARY & E-commerce */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Maison & Services
            </h4>
            <ul className="space-y-2.5 text-xs text-[#C5B3D0]">
              <li>
                <a
                  href="/plan-du-site"
                  onClick={(e) => navigateTo('/plan-du-site', e)}
                  className="hover:text-white transition-colors font-semibold text-[#E7BFF5]"
                >
                  ★ Plan du site e-commerce
                </a>
              </li>
              <li>
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Fichier sitemap.xml
                </a>
              </li>
              <li><a href="#notre-usine" className="hover:text-white transition-colors">Notre manufacture à Casablanca</a></li>
              <li><a href="#avis" className="hover:text-white transition-colors">Avis clients certifiés</a></li>
              <li><a href="#conseils" className="hover:text-white transition-colors">Guide du sommeil marocain</a></li>
              <li><a href="#garantie" className="hover:text-white transition-colors">Garantie fabricant 10 ans</a></li>
            </ul>
          </div>

          {/* Column 3: Newsletter */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Offre Privilège
            </h4>
            <p className="text-xs text-[#C5B3D0] mb-3 leading-relaxed">
              Inscrivez-vous pour recevoir nos conseils sommeil et <strong>200 DH offerts</strong> avec le code <span className="text-[#A982B8] font-bold">DARY15</span>.
            </p>

            {subscribed ? (
              <div className="bg-[#542D6B]/80 border border-[#A982B8]/40 text-[#E5DAEA] text-xs p-3 rounded-lg flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#A982B8] shrink-0" />
                <span>Merci ! Votre bon de réduction DARY vous a été envoyé.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre adresse email..."
                  required
                  className="w-full px-3.5 py-2.5 bg-[#2B173B] border border-[#4C2963] rounded-lg text-xs text-white placeholder:text-[#8E789B] focus:outline-none focus:border-[#A982B8]"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#723C90] hover:bg-[#542D6B] text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                >
                  <span>Bénéficier de -200 DH</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar with Little Round Violet WhatsApp Button */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8E789B]">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} DARY Maroc. Tous droits réservés.</span>
          </div>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            <a
              href="/plan-du-site"
              onClick={(e) => navigateTo('/plan-du-site', e)}
              className="text-[#E7BFF5] hover:text-white font-medium transition-colors"
            >
              Plan du site
            </a>
            <span>•</span>
            <a href="#cgv" className="hover:text-white transition-colors">CGV & Mentions légales</a>
            <span>•</span>
            <a href="#confidentialite" className="hover:text-white transition-colors">Politique de confidentialité</a>
            <span>•</span>
            <a href="#cookies" className="hover:text-white transition-colors">Gestion des cookies</a>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://wa.me/212691707445?text=Bonjour%20DARY%2C%20je%20souhaite%20des%20informations%20sur%20vos%20matelas."
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-[#723C90] hover:bg-[#8B4CAE] text-white flex items-center justify-center shadow-md hover:shadow-lg transition-all hover:scale-105"
              title="Discuter sur WhatsApp : 06 91 70 74 45"
              aria-label="Discuter sur WhatsApp au 06 91 70 74 45"
            >
              <MessageCircle className="w-4 h-4 fill-white text-[#723C90]" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
