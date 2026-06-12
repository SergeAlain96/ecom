import { useState } from 'react';
import { products as initialProducts, categories } from '../../data/mockData';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Badge } from '../../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../../components/ui/dialog';
import { Plus, Search, Edit, Trash2, Power } from 'lucide-react';
import { toast } from 'sonner';

type Product = (typeof initialProducts)[number];

const emptyForm = {
  name: '',
  price: '',
  description: '',
  detailedDescription: '',
  categoryId: '',
  stock: '',
  hasPromo: false,
  promoText: '',
};

export function AdminProducts() {
  const [products, setProducts] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form, setForm] = useState(emptyForm);

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF', minimumFractionDigits: 0 }).format(price);

  const openAdd = () => {
    setEditingProduct(null);
    setForm(emptyForm);
    setShowDialog(true);
  };

  const openEdit = (product: Product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      price: String(product.price),
      description: product.description,
      detailedDescription: product.detailedDescription,
      categoryId: product.categoryId,
      stock: String(product.stock),
      hasPromo: product.hasPromo,
      promoText: product.promoText ?? '',
    });
    setShowDialog(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.categoryId) {
      toast.error('Remplissez les champs obligatoires');
      return;
    }

    if (editingProduct) {
      setProducts(prev => prev.map(p =>
        p.id === editingProduct.id
          ? {
              ...p,
              name: form.name,
              price: Number(form.price),
              description: form.description,
              detailedDescription: form.detailedDescription,
              categoryId: form.categoryId,
              stock: Number(form.stock) || 0,
              hasPromo: form.hasPromo,
              promoText: form.promoText || undefined,
            }
          : p
      ));
      toast.success('Produit modifié');
    } else {
      const newProduct: Product = {
        id: String(Date.now()),
        name: form.name,
        price: Number(form.price),
        description: form.description,
        detailedDescription: form.detailedDescription,
        categoryId: form.categoryId,
        stock: Number(form.stock) || 0,
        images: ['product image'],
        isActive: true,
        isFeatured: false,
        hasPromo: form.hasPromo,
        promoText: form.promoText || undefined,
      };
      setProducts(prev => [newProduct, ...prev]);
      toast.success('Produit ajouté');
    }

    setShowDialog(false);
  };

  const handleToggleActive = (id: string) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, isActive: !p.isActive } : p));
    toast.success('Statut mis à jour');
  };

  const handleDelete = (id: string) => {
    if (!confirm('Supprimer ce produit ?')) return;
    setProducts(prev => prev.filter(p => p.id !== id));
    toast.success('Produit supprimé');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-['Poppins'] text-2xl md:text-3xl font-bold text-[#303841]">
            Gestion des Produits
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            {products.length} produit{products.length > 1 ? 's' : ''} au total
          </p>
        </div>
        <Button className="rounded-xl bg-primary hover:bg-primary/90 shadow-sm" onClick={openAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un produit
        </Button>
      </div>

      {/* Search */}
      <Card className="rounded-xl border border-gray-100 shadow-sm">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher un produit..."
              className="pl-10 rounded-xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="rounded-xl border border-gray-100 shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left py-3.5 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Produit</th>
                  <th className="text-left py-3.5 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Prix</th>
                  <th className="text-left py-3.5 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Stock</th>
                  <th className="text-left py-3.5 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Statut</th>
                  <th className="text-right py-3.5 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-lg shrink-0">
                          📦
                        </div>
                        <div>
                          <p className="font-medium text-sm text-[#303841]">{product.name}</p>
                          <p className="text-xs text-muted-foreground line-clamp-1 max-w-xs">{product.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-semibold text-sm text-primary">{formatPrice(product.price)}</span>
                    </td>
                    <td className="py-4 px-6">
                      <Badge
                        className={`rounded-lg text-xs border ${product.stock > 10 ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}
                      >
                        {product.stock} unités
                      </Badge>
                    </td>
                    <td className="py-4 px-6">
                      <Badge
                        className={`rounded-lg text-xs border ${product.isActive ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-gray-100 text-gray-500 border-gray-200'}`}
                      >
                        {product.isActive ? 'Actif' : 'Inactif'}
                      </Badge>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-lg hover:bg-gray-100"
                          title={product.isActive ? 'Désactiver' : 'Activer'}
                          onClick={() => handleToggleActive(product.id)}
                        >
                          <Power className={`h-4 w-4 ${product.isActive ? 'text-green-500' : 'text-gray-400'}`} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-lg hover:bg-gray-100"
                          title="Modifier"
                          onClick={() => openEdit(product)}
                        >
                          <Edit className="h-4 w-4 text-[#303841]" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-lg hover:bg-red-50 text-red-400 hover:text-red-600"
                          title="Supprimer"
                          onClick={() => handleDelete(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-sm">Aucun produit trouvé</p>
        </div>
      )}

      {/* Add / Edit Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-['Poppins']">
              {editingProduct ? 'Modifier le produit' : 'Ajouter un produit'}
            </DialogTitle>
            <DialogDescription>
              {editingProduct ? 'Modifiez les informations du produit.' : 'Remplissez les informations du nouveau produit.'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="p-name">Nom du produit *</Label>
                <Input
                  id="p-name"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Ex: Robe élégante africaine"
                  className="rounded-lg mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="p-price">Prix (FCFA) *</Label>
                <Input
                  id="p-price"
                  type="number"
                  min="0"
                  value={form.price}
                  onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                  placeholder="35000"
                  className="rounded-lg mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="p-stock">Stock</Label>
                <Input
                  id="p-stock"
                  type="number"
                  min="0"
                  value={form.stock}
                  onChange={e => setForm(f => ({ ...f, stock: e.target.value }))}
                  placeholder="20"
                  className="rounded-lg mt-1"
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="p-cat">Catégorie *</Label>
                <Select value={form.categoryId} onValueChange={v => setForm(f => ({ ...f, categoryId: v }))}>
                  <SelectTrigger id="p-cat" className="rounded-lg mt-1">
                    <SelectValue placeholder="Choisir une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(c => (
                      <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2">
                <Label htmlFor="p-desc">Description courte *</Label>
                <Input
                  id="p-desc"
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="Courte description visible sur la carte produit"
                  className="rounded-lg mt-1"
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="p-detail">Description détaillée</Label>
                <Textarea
                  id="p-detail"
                  value={form.detailedDescription}
                  onChange={e => setForm(f => ({ ...f, detailedDescription: e.target.value }))}
                  placeholder="Description complète pour la page produit..."
                  className="rounded-lg mt-1"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="p-promo-text">Badge promo (optionnel)</Label>
                <Input
                  id="p-promo-text"
                  value={form.promoText}
                  onChange={e => setForm(f => ({ ...f, promoText: e.target.value, hasPromo: e.target.value.trim() !== '' }))}
                  placeholder="-20%"
                  className="rounded-lg mt-1"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1 rounded-xl"
                onClick={() => setShowDialog(false)}
              >
                Annuler
              </Button>
              <Button type="submit" className="flex-1 rounded-xl bg-primary hover:bg-primary/90">
                {editingProduct ? 'Enregistrer' : 'Ajouter'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
