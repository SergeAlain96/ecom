import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { products } from '../../data/mockData';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Badge } from '../../components/ui/badge';
import { Skeleton } from '../../components/ui/skeleton';
import { ProductCard } from '../../components/client/ProductCard';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../../components/ui/dialog';
import { ArrowLeft, ShoppingCart, MessageCircle, Check } from 'lucide-react';
import { toast } from 'sonner';
import { useUnsplashImage } from '../../hooks/useUnsplashImage';

export function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [showOrderDialog, setShowOrderDialog] = useState(false);
  const [orderForm, setOrderForm] = useState({
    name: '',
    phone: '',
    city: '',
    address: '',
    comment: '',
  });

  const { imageUrl, isLoading } = useUnsplashImage(product?.images[0] || '');

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Produit non trouvé</h2>
        <Button asChild>
          <Link to="/products">Retour aux produits</Link>
        </Button>
      </div>
    );
  }

  const similarProducts = products
    .filter(p => p.categoryId === product.categoryId && p.id !== product.id && p.isActive)
    .slice(0, 3);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!orderForm.name || !orderForm.phone || !orderForm.city) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    // Generate WhatsApp message
    const message = `Bonjour,

Je souhaite commander le produit suivant :

Produit : ${product.name}
Prix : ${formatPrice(product.price)}
Quantité : ${quantity}
Montant total : ${formatPrice(product.price * quantity)}

Nom : ${orderForm.name}
Téléphone : ${orderForm.phone}
Ville : ${orderForm.city}
${orderForm.address ? `Adresse : ${orderForm.address}` : ''}
${orderForm.comment ? `Commentaire : ${orderForm.comment}` : ''}

Merci.`;

    const whatsappUrl = `https://wa.me/22667384509?text=${encodeURIComponent(message)}`;
    
    // Simulate order save
    toast.success('Commande enregistrée ! Redirection vers WhatsApp...');
    
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setShowOrderDialog(false);
      setOrderForm({ name: '', phone: '', city: '', address: '', comment: '' });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Button
          asChild
          variant="ghost"
          className="mb-6 rounded-xl"
        >
          <Link to="/products" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Retour aux produits
          </Link>
        </Button>

        {/* Product Details */}
        <div className="bg-white rounded-xl border p-6 md:p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
                {isLoading ? (
                  <Skeleton className="w-full h-full" />
                ) : (
                  <ImageWithFallback
                    src={imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                )}
                {product.hasPromo && product.promoText && (
                  <Badge className="absolute top-4 right-4 bg-primary text-white border-0 rounded-lg px-4 py-2 text-base">
                    {product.promoText}
                  </Badge>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="space-y-6">
              <div>
                <h1 className="font-['Poppins'] text-3xl md:text-4xl font-bold text-[#303841] mb-3">
                  {product.name}
                </h1>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="font-['Poppins'] text-4xl font-bold text-primary">
                    {formatPrice(product.price)}
                  </span>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {product.detailedDescription}
                </p>
              </div>

              {/* Characteristics */}
              {product.characteristics && product.characteristics.length > 0 && (
                <div>
                  <h3 className="font-['Poppins'] font-semibold text-lg mb-3 text-[#303841]">
                    Caractéristiques
                  </h3>
                  <ul className="space-y-2">
                    {product.characteristics.map((char, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>{char}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Stock */}
              <div>
                <Badge variant={product.stock > 10 ? 'default' : 'destructive'} className="rounded-lg">
                  {product.stock > 10 ? 'En stock' : `Plus que ${product.stock} en stock`}
                </Badge>
              </div>

              {/* Quantity */}
              <div>
                <Label htmlFor="quantity">Quantité</Label>
                <div className="flex items-center gap-3 mt-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="rounded-lg"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    max={product.stock}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
                    className="w-20 text-center rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="rounded-lg"
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Order Button */}
              <Button
                size="lg"
                className="w-full rounded-xl bg-primary hover:bg-primary/90 text-lg py-6"
                onClick={() => setShowOrderDialog(true)}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Commander maintenant
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full rounded-xl text-lg py-6 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white"
              >
                <a
                  href={`https://wa.me/22667384509?text=${encodeURIComponent(`Bonjour, je suis intéressé par ${product.name}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  Poser une question
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div>
            <h2 className="font-['Poppins'] text-2xl md:text-3xl font-bold text-[#303841] mb-6">
              Produits Similaires
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarProducts.map((similarProduct, index) => (
                <ProductCard key={similarProduct.id} product={similarProduct} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Order Dialog */}
      <Dialog open={showOrderDialog} onOpenChange={setShowOrderDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-['Poppins']">Passer commande</DialogTitle>
            <DialogDescription>
              Remplissez vos informations pour finaliser votre commande
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleOrderSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Nom complet *</Label>
              <Input
                id="name"
                value={orderForm.name}
                onChange={(e) => setOrderForm({ ...orderForm, name: e.target.value })}
                placeholder="Votre nom complet"
                className="rounded-lg"
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Numéro WhatsApp *</Label>
              <Input
                id="phone"
                type="tel"
                value={orderForm.phone}
                onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })}
                placeholder="+223 XX XX XX XX"
                className="rounded-lg"
                required
              />
            </div>
            <div>
              <Label htmlFor="city">Ville *</Label>
              <Input
                id="city"
                value={orderForm.city}
                onChange={(e) => setOrderForm({ ...orderForm, city: e.target.value })}
                placeholder="Votre ville"
                className="rounded-lg"
                required
              />
            </div>
            <div>
              <Label htmlFor="address">Adresse de livraison (optionnel)</Label>
              <Input
                id="address"
                value={orderForm.address}
                onChange={(e) => setOrderForm({ ...orderForm, address: e.target.value })}
                placeholder="Votre adresse"
                className="rounded-lg"
              />
            </div>
            <div>
              <Label htmlFor="comment">Commentaire (optionnel)</Label>
              <Textarea
                id="comment"
                value={orderForm.comment}
                onChange={(e) => setOrderForm({ ...orderForm, comment: e.target.value })}
                placeholder="Informations supplémentaires..."
                className="rounded-lg"
                rows={3}
              />
            </div>

            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Prix unitaire:</span>
                <span>{formatPrice(product.price)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Quantité:</span>
                <span>{quantity}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total:</span>
                <span className="text-primary">{formatPrice(product.price * quantity)}</span>
              </div>
            </div>

            <Button type="submit" className="w-full rounded-xl bg-primary hover:bg-primary/90">
              <MessageCircle className="h-4 w-4 mr-2" />
              Valider et contacter sur WhatsApp
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}