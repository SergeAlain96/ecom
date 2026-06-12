import { useState } from "react";
import { useParams, Link } from "react-router";
import { ArrowLeft, ShoppingCart, Star, Check, MessageCircle } from "lucide-react";
import { products, shopSettings } from "../../data/mockData";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Card } from "../../components/ui/card";
import { ProductCard } from "../../components/client/ProductCard";
import { OrderDialog } from "../../components/client/OrderDialog";

export function ProductDetailsPage() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Produit non trouvé</h1>
        <Link to="/">
          <Button>Retour à l'accueil</Button>
        </Link>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="inline-flex items-center text-sm text-gray-600 hover:text-[#FF5722]">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour au catalogue
          </Link>
        </div>
      </div>

      {/* Product Details */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Images Gallery */}
          <div>
            <div className="mb-4 rounded-2xl overflow-hidden bg-gray-100 aspect-square">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === index 
                        ? 'border-[#FF5722] scale-105' 
                        : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} className="w-full aspect-square object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                {product.isFeatured && (
                  <Badge className="bg-[#FF5722] text-white border-0 rounded-lg mb-3">
                    <Star className="h-3 w-3 mr-1" />
                    Produit Vedette
                  </Badge>
                )}
                <h1 className="text-3xl md:text-4xl font-bold text-[#303841] mb-2">
                  {product.name}
                </h1>
              </div>
            </div>

            <div className="text-4xl font-bold text-[#FF5722] mb-6">
              {formatPrice(product.price)}
            </div>

            <div className="bg-[#F8F9FA] rounded-xl p-4 mb-6">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-600" />
                <span className="font-medium">
                  En stock: {product.stock} unité{product.stock > 1 ? 's' : ''} disponible{product.stock > 1 ? 's' : ''}
                </span>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-[#303841] mb-3">Description</h2>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {product.specifications && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-[#303841] mb-3">Caractéristiques</h2>
                <Card className="p-4 rounded-xl">
                  <dl className="space-y-2">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b last:border-0">
                        <dt className="font-medium text-gray-600">{key}</dt>
                        <dd className="text-[#303841]">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </Card>
              </div>
            )}

            <div className="space-y-3">
              <Button
                onClick={() => setOrderDialogOpen(true)}
                size="lg"
                className="w-full bg-[#FF5722] hover:bg-[#E64A19] text-white rounded-xl text-lg py-6"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Commander maintenant
              </Button>

              <Button
                onClick={() => {
                  const message = `Bonjour, j'aimerais avoir plus d'informations sur le produit: ${product.name}`;
                  window.open(`https://wa.me/${shopSettings.whatsappNumber.replace(/\s/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
                }}
                size="lg"
                variant="outline"
                className="w-full border-2 border-[#76ABAE] text-[#76ABAE] hover:bg-[#76ABAE] hover:text-white rounded-xl text-lg py-6"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Demander des infos
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t">
              <div className="text-center">
                <div className="w-12 h-12 bg-[#FF5722]/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Check className="h-6 w-6 text-[#FF5722]" />
                </div>
                <div className="text-sm font-medium">Livraison rapide</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#FF5722]/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <MessageCircle className="h-6 w-6 text-[#FF5722]" />
                </div>
                <div className="text-sm font-medium">Support 24/7</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#FF5722]/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Star className="h-6 w-6 text-[#FF5722]" />
                </div>
                <div className="text-sm font-medium">Qualité garantie</div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-[#303841] mb-8">Produits similaires</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(relatedProduct => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>

      <OrderDialog
        product={product}
        open={orderDialogOpen}
        onOpenChange={setOrderDialogOpen}
      />
    </div>
  );
}
