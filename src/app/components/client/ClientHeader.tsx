import { useState } from "react";
import { Link } from "react-router";
import { Search, ShoppingCart, Menu, X, MessageCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { shopSettings } from "../../data/mockData";

export function ClientHeader() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${shopSettings.whatsappNumber.replace(/\s/g, '')}`, '_blank');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto px-4">
        {/* Top bar - Desktop */}
        <div className="hidden md:flex items-center justify-between py-2 text-sm border-b">
          <div className="text-muted-foreground">
            Bienvenue chez {shopSettings.shopName} - Livraison dans toute la région
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={handleWhatsAppClick}
              className="flex items-center gap-1 hover:text-primary transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              <span>{shopSettings.whatsappNumber}</span>
            </button>
          </div>
        </div>

        {/* Main Header */}
        <div className="flex items-center justify-between py-4 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#FF5722] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">Y</span>
            </div>
            <span className="text-2xl font-bold text-[#303841] hidden sm:inline">Yiriwa</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher des produits..."
                className="pl-10 pr-4 py-2 w-full rounded-xl border-2 focus:border-[#FF5722]"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Search Mobile */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* WhatsApp Button */}
            <Button
              onClick={handleWhatsAppClick}
              className="hidden sm:flex items-center gap-2 bg-[#FF5722] hover:bg-[#E64A19] text-white rounded-xl"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="hidden lg:inline">Contact WhatsApp</span>
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <nav className="flex flex-col gap-4 mt-8">
                  <Link to="/" className="text-lg font-medium hover:text-[#FF5722] transition-colors">
                    Accueil
                  </Link>
                  <Link to="/#categories" className="text-lg font-medium hover:text-[#FF5722] transition-colors">
                    Catégories
                  </Link>
                  <Link to="/#products" className="text-lg font-medium hover:text-[#FF5722] transition-colors">
                    Produits
                  </Link>
                  <Button
                    onClick={handleWhatsAppClick}
                    className="mt-4 bg-[#FF5722] hover:bg-[#E64A19] text-white rounded-xl"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Nous contacter
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile Search */}
        {isSearchOpen && (
          <div className="md:hidden pb-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher des produits..."
                className="pl-10 pr-4 py-2 w-full rounded-xl border-2 focus:border-[#FF5722]"
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center gap-6 py-3 border-t">
          <Link to="/" className="font-medium hover:text-[#FF5722] transition-colors">
            Accueil
          </Link>
          <Link to="/#categories" className="font-medium hover:text-[#FF5722] transition-colors">
            Catégories
          </Link>
          <Link to="/#products" className="font-medium hover:text-[#FF5722] transition-colors">
            Produits
          </Link>
          <Link to="/#featured" className="font-medium hover:text-[#FF5722] transition-colors">
            Promotions
          </Link>
        </nav>
      </div>
    </header>
  );
}
