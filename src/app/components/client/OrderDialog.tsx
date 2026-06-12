import { useState } from "react";
import { MessageCircle, Package, User, Phone, MapPin, MessageSquare } from "lucide-react";
import { Product, shopSettings } from "../../data/mockData";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";

interface OrderDialogProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OrderDialog({ product, open, onOpenChange }: OrderDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    address: "",
    quantity: 1,
    comment: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.phone || !formData.city) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    // Format price
    const formatPrice = (price: number) => {
      return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'XOF',
        maximumFractionDigits: 0,
      }).format(price);
    };

    const totalAmount = product.price * formData.quantity;

    // Create WhatsApp message
    const message = `Bonjour,

Je souhaite commander le produit suivant :

📦 Produit : ${product.name}
💰 Prix unitaire : ${formatPrice(product.price)}
🔢 Quantité : ${formData.quantity}
💵 Montant total : ${formatPrice(totalAmount)}

👤 Nom : ${formData.name}
📱 Téléphone : ${formData.phone}
🏙️ Ville : ${formData.city}
${formData.address ? `📍 Adresse : ${formData.address}` : ''}
${formData.comment ? `💬 Commentaire : ${formData.comment}` : ''}

Merci.`;

    // In a real app, you would save the order to database here
    console.log("Order data:", {
      product,
      ...formData,
      totalAmount,
      date: new Date().toISOString(),
    });

    // Open WhatsApp
    const whatsappUrl = `https://wa.me/${shopSettings.whatsappNumber.replace(/\s/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    // Show success message
    toast.success("Redirection vers WhatsApp...");

    // Close dialog and reset form
    onOpenChange(false);
    setFormData({
      name: "",
      phone: "",
      city: "",
      address: "",
      quantity: 1,
      comment: "",
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Commander ce produit</DialogTitle>
          <DialogDescription>
            Remplissez ce formulaire rapide. Vous serez redirigé vers WhatsApp pour finaliser votre commande.
          </DialogDescription>
        </DialogHeader>

        {/* Product Summary */}
        <div className="bg-[#F8F9FA] rounded-xl p-4 mb-4">
          <div className="flex gap-4">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-[#303841] mb-1">{product.name}</h3>
              <div className="text-lg font-bold text-[#FF5722]">
                {formatPrice(product.price)}
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <Label htmlFor="name" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Nom complet *
            </Label>
            <Input
              id="name"
              placeholder="Votre nom complet"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="rounded-xl"
            />
          </div>

          {/* Phone */}
          <div>
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Numéro WhatsApp *
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+223 XX XX XX XX"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              className="rounded-xl"
            />
          </div>

          {/* City */}
          <div>
            <Label htmlFor="city" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Ville *
            </Label>
            <Input
              id="city"
              placeholder="Votre ville"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              required
              className="rounded-xl"
            />
          </div>

          {/* Quantity */}
          <div>
            <Label htmlFor="quantity" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Quantité
            </Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              max={product.stock}
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
              className="rounded-xl"
            />
            <p className="text-xs text-gray-500 mt-1">
              Stock disponible: {product.stock} unités
            </p>
          </div>

          {/* Address (optional) */}
          <div>
            <Label htmlFor="address" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Adresse de livraison (facultatif)
            </Label>
            <Input
              id="address"
              placeholder="Quartier, rue, point de repère..."
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="rounded-xl"
            />
          </div>

          {/* Comment (optional) */}
          <div>
            <Label htmlFor="comment" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Commentaire (facultatif)
            </Label>
            <Textarea
              id="comment"
              placeholder="Des précisions à ajouter ?"
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              className="rounded-xl resize-none"
              rows={3}
            />
          </div>

          {/* Total */}
          <div className="bg-[#FF5722]/10 rounded-xl p-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Montant total</span>
              <span className="text-2xl font-bold text-[#FF5722]">
                {formatPrice(product.price * formData.quantity)}
              </span>
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full bg-[#FF5722] hover:bg-[#E64A19] text-white rounded-xl text-lg py-6"
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            Continuer sur WhatsApp
          </Button>

          <p className="text-xs text-center text-gray-500">
            * Champs obligatoires
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
