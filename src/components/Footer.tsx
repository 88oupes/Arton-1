import { Phone, Mail, MapPin, MessageCircle, Instagram, Facebook, Store } from 'lucide-react';
import Logo from './Logo';
import { navigateTo, getStoresUrl } from '../utils/navigation';

export default function Footer() {
  return (
    <footer className="w-full bg-[#1E1128] text-white pt-14 pb-12 border-t border-[#3B224C]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Main Footer Brand & Contact Block */}
        <div className="pb-10 border-b border-[#3B224C] max-w-2xl space-y-4">
          <Logo size="lg" className="bg-white px-3.5 py-1.5 rounded-lg shadow-sm" />
          <p className="text-xs sm:text-sm text-[#C5B3D0] leading-relaxed">
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
            <div className="flex items-center gap-2 pt-1">
              <Store className="w-4 h-4 text-[#25D366] shrink-0" />
              <a
                href={getStoresUrl()}
                onClick={(e) => navigateTo(getStoresUrl(), e)}
                className="text-[#EADBEE] hover:text-white underline decoration-[#A982B8] transition-colors"
              >
                Nos Magasins & Showrooms : Berrechid & Mohammedia (Google Maps)
              </a>
            </div>

            {/* WhatsApp Contact & Social Media Channels */}
            <div className="pt-3 flex flex-wrap items-center gap-2.5 sm:gap-3">
              <a
                href="https://wa.me/212691707445?text=Bonjour%20DARY%2C%20je%20souhaite%20des%20informations%20sur%20vos%20matelas."
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
                href="https://www.instagram.com/darymaroc/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#361D46] hover:bg-[#E1306C] text-[#E5DAEA] hover:text-white text-xs font-semibold border border-[#4C2963] hover:border-[#E1306C] transition-all shadow-xs group cursor-pointer"
                aria-label="Suivez-nous sur Instagram @darymaroc"
              >
                <Instagram className="w-4 h-4 text-[#C5B3D0] group-hover:text-white transition-colors" />
                <span>Instagram</span>
              </a>

              <a
                href="https://web.facebook.com/darybedmaroc"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#361D46] hover:bg-[#1877F2] text-[#E5DAEA] hover:text-white text-xs font-semibold border border-[#4C2963] hover:border-[#1877F2] transition-all shadow-xs group cursor-pointer"
                aria-label="Rejoignez-nous sur Facebook @darybedmaroc"
              >
                <Facebook className="w-4 h-4 text-[#C5B3D0] group-hover:text-white transition-colors" />
                <span>Facebook</span>
              </a>
            </div>
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

          {/* Social Icons in Bottom Bar */}
          <div className="flex items-center gap-2">
            <a
              href="https://www.instagram.com/darymaroc/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-[#2E183B] hover:bg-[#E1306C] text-[#C5B3D0] hover:text-white flex items-center justify-center transition-all border border-[#4C2963] hover:border-[#E1306C]"
              aria-label="Instagram DARY Maroc"
              title="Instagram @darymaroc"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://web.facebook.com/darybedmaroc"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-[#2E183B] hover:bg-[#1877F2] text-[#C5B3D0] hover:text-white flex items-center justify-center transition-all border border-[#4C2963] hover:border-[#1877F2]"
              aria-label="Facebook DARY Maroc"
              title="Facebook @darybedmaroc"
            >
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
