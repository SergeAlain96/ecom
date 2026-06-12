import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { ProductCard } from '../../components/client/ProductCard';
import { useProducts } from '../../../hooks/useProducts';
import { useCategories } from '../../../hooks/useCategories';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Skeleton } from '../../components/ui/skeleton';
import { Search, SlidersHorizontal } from 'lucide-react';

export function Products() {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') ?? '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') ?? 'all');
  const [sortBy, setSortBy] = useState('default');

  const { categories } = useCategories();
  const { products, loading } = useProducts({ onlyActive: true });

  useEffect(() => {
    const q = searchParams.get('q');
    const cat = searchParams.get('category');
    if (q !== null) setSearchQuery(q);
    if (cat !== null) setSelectedCategory(cat);
  }, [searchParams]);

  // Map category slug → id for filtering
  const selectedCategoryId = useMemo(() => {
    if (selectedCategory === 'all') return undefined;
    return categories.find(c => c.slug === selectedCategory)?.id ?? selectedCategory;
  }, [selectedCategory, categories]);

  const filtered = useMemo(() => {
    let result = [...products];
    if (searchQuery)        result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase()));
    if (selectedCategoryId) result = result.filter(p => p.category_id === selectedCategoryId);
    switch (sortBy) {
      case 'price-asc':  result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'name':       result.sort((a, b) => a.name.localeCompare(b.name)); break;
    }
    return result;
  }, [products, searchQuery, selectedCategoryId, sortBy]);

  // Adapt Supabase product shape to ProductCard shape
  const toCardProduct = (p: typeof products[number]) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    description: p.description,
    images: p.images.length ? p.images : ['product image'],
    hasPromo: p.has_promo,
    promoText: p.promo_text ?? undefined,
    stock: p.stock,
  });

  return (
    <div className="min-h-screen bg-gray-50/50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="font-['Poppins'] text-3xl md:text-4xl font-bold text-[#303841] mb-2">
            Tous nos Produits
          </h1>
          <p className="text-muted-foreground">Découvrez notre collection complète</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border p-4 mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher un produit..."
                className="pl-10 rounded-xl"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="rounded-xl"><SelectValue placeholder="Trier par" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Par défaut</SelectItem>
                <SelectItem value="price-asc">Prix croissant</SelectItem>
                <SelectItem value="price-desc">Prix décroissant</SelectItem>
                <SelectItem value="name">Nom A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Catégories:</span>
            <Button variant={selectedCategory === 'all' ? 'default' : 'outline'} size="sm" className="rounded-lg" onClick={() => setSelectedCategory('all')}>Tous</Button>
            {categories.map(c => (
              <Button key={c.id} variant={selectedCategory === c.slug ? 'default' : 'outline'} size="sm" className="rounded-lg" onClick={() => setSelectedCategory(c.slug)}>
                {c.name}
              </Button>
            ))}
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-6">
          {loading ? 'Chargement...' : `${filtered.length} produit${filtered.length > 1 ? 's' : ''} trouvé${filtered.length > 1 ? 's' : ''}`}
        </p>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-80 rounded-2xl" />)}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((p, i) => <ProductCard key={p.id} product={toCardProduct(p)} index={i} />)}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="font-['Poppins'] text-xl font-semibold text-[#303841] mb-2">Aucun produit trouvé</h3>
            <Button variant="outline" className="rounded-xl mt-4" onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSortBy('default'); }}>
              Réinitialiser les filtres
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
