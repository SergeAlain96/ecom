import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { ShoppingCart, Eye, Heart, Star } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Skeleton } from '../ui/skeleton';
import { useUnsplashImage } from '../../hooks/useUnsplashImage';

interface ProductCardProps {
  readonly product: {
    readonly id: string;
    readonly name: string;
    readonly price: number;
    readonly description: string;
    readonly images: string[];
    readonly hasPromo: boolean;
    readonly promoText?: string;
    readonly stock?: number;
  };
  readonly index: number;
}

function stockBarColor(stock: number): string {
  if (stock <= 5) return 'bg-red-400';
  if (stock <= 10) return 'bg-amber-400';
  return 'bg-green-400';
}

const MOCK_RATINGS: Record<string, number> = {
  '1': 4.8, '2': 4.6, '3': 4.9, '4': 4.3, '5': 4.7,
  '6': 4.5, '7': 4.4, '8': 4.2,
};

export function ProductCard({ product, index }: ProductCardProps) {
  const { imageUrl, isLoading } = useUnsplashImage(product.images[0]);
  const [wishlisted, setWishlisted] = useState(false);
  const rating = MOCK_RATINGS[product.id] ?? 4.5;
  const reviewCount = 12 + (Number.parseInt(product.id) * 7);
  const stockLevel = product.stock ?? 20;

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF', minimumFractionDigits: 0 }).format(price);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
    >
      <Card className="group overflow-hidden rounded-2xl border border-gray-100 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 bg-white">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
          {isLoading ? (
            <Skeleton className="h-full w-full" />
          ) : (
            <ImageWithFallback
              src={imageUrl}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}

          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Badges top-left */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.hasPromo && product.promoText && (
              <Badge className="bg-primary text-white border-0 rounded-lg px-2.5 py-0.5 text-xs font-bold shadow-sm">
                {product.promoText}
              </Badge>
            )}
            {stockLevel <= 5 && (
              <Badge className="bg-red-500 text-white border-0 rounded-lg px-2.5 py-0.5 text-xs">
                Dernières unités
              </Badge>
            )}
          </div>

          {/* Wishlist button top-right */}
          <button
            onClick={(e) => { e.preventDefault(); setWishlisted(w => !w); }}
            className={`absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-sm transition-all duration-200 ${
              wishlisted
                ? 'bg-red-50 text-red-500 scale-110'
                : 'bg-white/80 text-gray-400 opacity-0 group-hover:opacity-100 hover:text-red-500'
            }`}
          >
            <Heart className={`h-4 w-4 ${wishlisted ? 'fill-red-500' : ''}`} />
          </button>

          {/* Quick view overlay button */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <Button
              asChild
              size="sm"
              variant="secondary"
              className="rounded-lg bg-white/90 backdrop-blur-sm text-[#303841] hover:bg-white shadow-lg text-xs px-3"
            >
              <Link to={`/products/${product.id}`}>
                <Eye className="h-3.5 w-3.5 mr-1.5" />
                Aperçu rapide
              </Link>
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-2.5">
          {/* Rating row */}
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map(s => (
                <Star
                  key={s}
                  className={`h-3 w-3 ${s <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200 fill-gray-200'}`}
                />
              ))}
            </div>
            <span className="text-xs font-medium text-amber-500">{rating}</span>
            <span className="text-xs text-muted-foreground">({reviewCount})</span>
          </div>

          {/* Name + description */}
          <div>
            <h3 className="font-['Poppins'] font-semibold text-[#303841] line-clamp-1 text-sm leading-snug mb-0.5">
              {product.name}
            </h3>
            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Stock bar */}
          {stockLevel <= 20 && (
            <div>
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Stock</span>
                <span className={stockLevel <= 5 ? 'text-red-500 font-medium' : 'text-green-600 font-medium'}>
                  {stockLevel} restant{stockLevel > 1 ? 's' : ''}
                </span>
              </div>
              <div className="h-1 rounded-full bg-gray-100 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${stockBarColor(stockLevel)}`}
                  style={{ width: `${Math.min(100, (stockLevel / 30) * 100)}%` }}
                />
              </div>
            </div>
          )}

          {/* Price + CTA */}
          <div className="flex items-center justify-between pt-1">
            <div>
              <span className="font-['Poppins'] text-lg font-bold text-primary leading-none">
                {formatPrice(product.price)}
              </span>
            </div>
            <Button
              asChild
              size="sm"
              className="rounded-xl bg-primary hover:bg-primary/90 text-white text-xs px-3 h-8 shadow-sm hover:shadow-md hover:shadow-primary/25 transition-all"
            >
              <Link to={`/products/${product.id}`}>
                <ShoppingCart className="h-3.5 w-3.5 mr-1.5" />
                Commander
              </Link>
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
