import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import Logo from './Logo';
import { navigateTo } from '../utils/navigation';

export default function Footer() {
  return (
    <footer className="w-full bg-[#1E1128] text-white pt-16 pb-12 border-t border-[#3B224C]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12 pb-12 border-b border-[#3B224C]">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <Logo size="lg" className="bg-white px-3.5 py-1.5 rounded-lg shadow-sm" />
            <p className="text-xs sm:text-sm text-[#C5B3D0] max-w-lg leading-relaxed">
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
                  href="/categories/salon"
                  onClick={(e) => navigateTo('/categories/salon', e)}
                  className="hover:text-white transition-colors"
                >
                  Salons Marocains
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
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8E789B]">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} DARY Maroc. Tous droits réservés.</span>
          </div>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            <a href="#cgv" className="hover:text-white transition-colors">CGV & Mentions légales</a>
            <span>•</span>
            <a href="#confidentialite" className="hover:text-white transition-colors">Politique de confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
