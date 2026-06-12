import { MessageCircle, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { shopSettings } from "../../data/mockData";

export function ClientFooter() {
  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${shopSettings.whatsappNumber.replace(/\s/g, '')}`, '_blank');
  };

  return (
    <footer className="bg-[#303841] text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-[#FF5722] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">Y</span>
              </div>
              <span className="text-2xl font-bold">Yiriwa</span>
            </div>
            <p className="text-gray-300 text-sm">
              Votre boutique en ligne de confiance pour tous vos besoins. 
              Commandez facilement via WhatsApp.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Liens rapides</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="/" className="hover:text-[#FF5722] transition-colors">Accueil</a></li>
              <li><a href="/#categories" className="hover:text-[#FF5722] transition-colors">Catégories</a></li>
              <li><a href="/#products" className="hover:text-[#FF5722] transition-colors">Produits</a></li>
              <li><a href="/#featured" className="hover:text-[#FF5722] transition-colors">Promotions</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>{shopSettings.whatsappNumber}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>contact@yiriwa.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Bamako, Mali</span>
              </li>
            </ul>
          </div>

          {/* Social & WhatsApp */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Suivez-nous</h3>
            <div className="flex gap-3 mb-4">
              {shopSettings.socialMedia.facebook && (
                <a 
                  href={shopSettings.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#76ABAE] rounded-lg flex items-center justify-center hover:bg-[#FF5722] transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              )}
              {shopSettings.socialMedia.instagram && (
                <a 
                  href={shopSettings.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#76ABAE] rounded-lg flex items-center justify-center hover:bg-[#FF5722] transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}
            </div>
            <button 
              onClick={handleWhatsAppClick}
              className="w-full bg-[#FF5722] hover:bg-[#E64A19] text-white px-4 py-2 rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              Commander sur WhatsApp
            </button>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>&copy; 2026 Yiriwa. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
