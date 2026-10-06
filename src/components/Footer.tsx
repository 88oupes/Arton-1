import { Phone, Mail, MapPin, MessageCircle, Instagram, Facebook, Store } from 'lucide-react';
import Logo from './Logo';
import { navigateTo, getStoresUrl } from '../utils/navigation';

export default function Footer() {
  return (
    <footer className="w-full bg-[#0B1C2E] text-white pt-14 pb-12 border-t border-[#1E3A5A]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Main Footer Brand & Contact Block */}
        <div className="pb-10 border-b border-[#1E3A5A] max-w-2xl space-y-4">
          <Logo variant="white" size="lg" className="px-1 py-1" />
          <p className="text-xs sm:text-sm text-[#CAD6E4] leading-relaxed">
            Atelier et manufacture marocaine de literie d'exception. Nous combinons recherche ergonomique de pointe, mousses haute densité certifiées et circuit court direct fabricant.
          </p>

          <div className="space-y-2.5 pt-2 text-xs text-[#E2EAF2]">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#BA8C48] shrink-0" />
              <a href="tel:0691707445" className="hover:text-white transition-colors">
                06 91 70 74 45 (du lun au sam 9h-19h)
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#BA8C48] shrink-0" />
              <span>contact@artonconfort.ma</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#BA8C48] shrink-0" />
              <span>Manufacture ARTON CONFORT, Casablanca, Maroc</span>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <Store className="w-4 h-4 text-[#25D366] shrink-0" />
              <a
                href={getStoresUrl()}
                onClick={(e) => navigateTo(getStoresUrl(), e)}
                className="text-[#E8EEF5] hover:text-white underline decoration-[#BA8C48] transition-colors"
              >
                Nos Magasins & Showrooms : Berrechid & Mohammedia (Google Maps)
              </a>
            </div>

            {/* WhatsApp Contact & Social Media Channels */}
            <div className="pt-3 flex flex-wrap items-center gap-2.5 sm:gap-3">
              <a
                href="https://wa.me/212691707445?text=Bonjour%20ARTON%20CONFORT%2C%20je%20souhaite%20des%20informations%20sur%20vos%20matelas."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs font-semibold shadow-md hover:shadow-lg transition-all group cursor-pointer border border-[#25D366]/40"
                aria-label="Contacter sur WhatsApp au 06 91 70 74 45"
              >
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-3.5 h-3.5 fill-white text-[#25D366]" />
                </div>
                <span>WhatsApp</span>
              </a>

              <a
                href="https://www.instagram.com/artonconfort/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#132B45] hover:bg-[#E1306C] text-[#E8EEF5] hover:text-white text-xs font-semibold border border-[#1E3A5A] hover:border-[#E1306C] transition-all shadow-xs group cursor-pointer"
                aria-label="Suivez-nous sur Instagram"
              >
                <Instagram className="w-4 h-4 text-[#BA8C48] group-hover:text-white transition-colors" />
                <span>Instagram</span>
              </a>

              <a
                href="https://web.facebook.com/artonconfort"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#132B45] hover:bg-[#1877F2] text-[#E8EEF5] hover:text-white text-xs font-semibold border border-[#1E3A5A] hover:border-[#1877F2] transition-all shadow-xs group cursor-pointer"
                aria-label="Rejoignez-nous sur Facebook"
              >
                <Facebook className="w-4 h-4 text-[#BA8C48] group-hover:text-white transition-colors" />
                <span>Facebook</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8BA0B8]">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} ARTON CONFORT Maroc. Tous droits réservés.</span>
          </div>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            <a href="#cgv" className="hover:text-white transition-colors">CGV & Mentions légales</a>
            <span>•</span>
            <a href="#confidentialite" className="hover:text-white transition-colors">Politique de confidentialité</a>
          </div>

          {/* Social Icons in Bottom Bar */}
          <div className="flex items-center gap-2">
            <a
              href="https://www.instagram.com/artonconfort/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-[#132B45] hover:bg-[#E1306C] text-[#CAD6E4] hover:text-white flex items-center justify-center transition-all border border-[#1E3A5A] hover:border-[#E1306C]"
              aria-label="Instagram ARTON CONFORT"
              title="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://web.facebook.com/artonconfort"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-[#132B45] hover:bg-[#1877F2] text-[#CAD6E4] hover:text-white flex items-center justify-center transition-all border border-[#1E3A5A] hover:border-[#1877F2]"
              aria-label="Facebook ARTON CONFORT"
              title="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
