import { Link } from 'react-router';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#303841] text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                <span className="font-['Poppins'] text-xl font-bold text-white">Y</span>
              </div>
              <span className="font-['Poppins'] text-2xl font-bold">Yiriwa</span>
            </div>
            <p className="text-white/80 text-sm">
              Votre boutique en ligne de confiance pour tous vos besoins. 
              Commandez facilement via WhatsApp.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-['Poppins'] font-semibold text-lg mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/80 hover:text-primary transition-colors text-sm">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-white/80 hover:text-primary transition-colors text-sm">
                  Produits
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-white/80 hover:text-primary transition-colors text-sm">
                  Catégories
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/80 hover:text-primary transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-['Poppins'] font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm">
                <Phone className="h-4 w-4 mt-0.5 text-primary" />
                <span className="text-white/80">+223 70 00 00 00</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <Mail className="h-4 w-4 mt-0.5 text-primary" />
                <span className="text-white/80">contact@yiriwa.com</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <MapPin className="h-4 w-4 mt-0.5 text-primary" />
                <span className="text-white/80">Ouagadougou, Burkina Faso</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-['Poppins'] font-semibold text-lg mb-4">Suivez-nous</h3>
            <div className="flex gap-3">
              <a
                href="https://facebook.com/yiriwa"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 hover:bg-primary transition-all"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/yiriwa"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 hover:bg-primary transition-all"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/yiriwa"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 hover:bg-primary transition-all"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-white/60 text-sm">
            © {currentYear} Yiriwa. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
