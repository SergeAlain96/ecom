import { useState } from 'react';
import { useAdminProducts } from '../../../hooks/useAdminProducts';
import { useCategories } from '../../../hooks/useCategories';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Badge } from '../../components/ui/badge';
import { Skeleton } from '../../components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../../components/ui/dialog';
import { Plus, Search, Edit, Trash2, Power, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import type { Product } from '../../../lib/supabase';

const emptyForm = { name: '', price: '', description: '', detailed_description: '', category_id: '', stock: '', has_promo: false, promo_text: '' };

export function AdminProducts() {
  const { products, loading, toggleActive, deleteProduct, saveProduct } = useAdminProducts();
  const { categories } = useCategories();
  const [searchQuery, setSearchQuery] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const filtered = products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const formatPrice = (p: number) =>
    new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF', minimumFractionDigits: 0 }).format(p);

  const openAdd = () => { setEditingId(null); setForm(emptyForm); setShowDialog(true); };
  const openEdit = (p: Product) => {
    setEditingId(p.id);
    setForm({ name: p.name, price: String(p.price), description: p.description, detailed_description: p.detailed_description, category_id: p.category_id ?? '', stock: String(p.stock), has_promo: p.has_promo, promo_text: p.promo_text ?? '' });
    setShowDialog(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.category_id) { toast.error('Champs obligatoires manquants'); return; }
    setSaving(true);
    const data: Omit<Product, 'id' | 'created_at'> = {
      name: form.name, price: Number(form.price), description: form.description,
      detailed_description: form.detailed_description, category_id: form.category_id,
      stock: Number(form.stock) || 0, images: [], is_active: true, is_featured: false,
      has_promo: form.has_promo, promo_text: form.promo_text || undefined,
    };
    const err = await saveProduct(data, editingId ?? undefined);
    setSaving(false);
    if (err) { toast.error(err.message); return; }
    toast.success(editingId ? 'Produit modifié' : 'Produit ajouté');
    setShowDialog(false);
  };

  const handleToggle = async (id: string, current: boolean) => {
    const err = await toggleActive(id, current);
    if (err) toast.error(err.message);
    else toast.success('Statut mis à jour');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer ce produit ?')) return;
    const err = await deleteProduct(id);
    if (err) toast.error(err.message);
    else toast.success('Produit supprimé');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-['Poppins'] text-2xl md:text-3xl font-bold text-[#303841]">Gestion des Produits</h1>
          <p className="text-muted-foreground text-sm mt-0.5">{products.length} produit{products.length > 1 ? 's' : ''}</p>
        </div>
        <Button className="rounded-xl bg-primary hover:bg-primary/90 shadow-sm" onClick={openAdd}>
          <Plus className="h-4 w-4 mr-2" /> Ajouter un produit
        </Button>
      </div>

      <Card className="rounded-xl border border-gray-100 shadow-sm">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input type="search" placeholder="Rechercher..." className="pl-10 rounded-xl" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-xl border border-gray-100 shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['Produit','Prix','Stock','Statut','Actions'].map(h => (
                    <th key={h} className="text-left py-3.5 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading
                  ? Array.from({ length: 5 }).map((_, i) => (
                      <tr key={i}><td colSpan={5} className="py-3 px-6"><Skeleton className="h-10 w-full" /></td></tr>
                    ))
                  : filtered.map(p => (
                      <tr key={p.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-lg shrink-0">📦</div>
                            <div>
                              <p className="font-medium text-sm text-[#303841]">{p.name}</p>
                              <p className="text-xs text-muted-foreground line-clamp-1 max-w-xs">{p.description}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6"><span className="font-semibold text-sm text-primary">{formatPrice(p.price)}</span></td>
                        <td className="py-4 px-6">
                          <Badge className={`rounded-lg text-xs border ${p.stock > 10 ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                            {p.stock} unités
                          </Badge>
                        </td>
                        <td className="py-4 px-6">
                          <Badge className={`rounded-lg text-xs border ${p.is_active ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>
                            {p.is_active ? 'Actif' : 'Inactif'}
                          </Badge>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg" onClick={() => handleToggle(p.id, p.is_active)}>
                              <Power className={`h-4 w-4 ${p.is_active ? 'text-green-500' : 'text-gray-400'}`} />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg" onClick={() => openEdit(p)}>
                              <Edit className="h-4 w-4 text-[#303841]" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-red-50 text-red-400 hover:text-red-600" onClick={() => handleDelete(p.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                }
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-['Poppins']">{editingId ? 'Modifier le produit' : 'Ajouter un produit'}</DialogTitle>
            <DialogDescription>{editingId ? 'Modifiez les informations.' : 'Remplissez les informations du nouveau produit.'}</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="p-name">Nom *</Label>
                <Input id="p-name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Robe élégante africaine" className="rounded-lg mt-1" required />
              </div>
              <div>
                <Label htmlFor="p-price">Prix (FCFA) *</Label>
                <Input id="p-price" type="number" min="0" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} placeholder="35000" className="rounded-lg mt-1" required />
              </div>
              <div>
                <Label htmlFor="p-stock">Stock</Label>
                <Input id="p-stock" type="number" min="0" value={form.stock} onChange={e => setForm(f => ({ ...f, stock: e.target.value }))} placeholder="20" className="rounded-lg mt-1" />
              </div>
              <div className="col-span-2">
                <Label htmlFor="p-cat">Catégorie *</Label>
                <Select value={form.category_id} onValueChange={v => setForm(f => ({ ...f, category_id: v }))}>
                  <SelectTrigger id="p-cat" className="rounded-lg mt-1"><SelectValue placeholder="Choisir..." /></SelectTrigger>
                  <SelectContent>{categories.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="col-span-2">
                <Label htmlFor="p-desc">Description courte</Label>
                <Input id="p-desc" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Courte description..." className="rounded-lg mt-1" />
              </div>
              <div className="col-span-2">
                <Label htmlFor="p-detail">Description détaillée</Label>
                <Textarea id="p-detail" value={form.detailed_description} onChange={e => setForm(f => ({ ...f, detailed_description: e.target.value }))} placeholder="Description complète..." className="rounded-lg mt-1" rows={3} />
              </div>
              <div>
                <Label htmlFor="p-promo">Badge promo</Label>
                <Input id="p-promo" value={form.promo_text} onChange={e => setForm(f => ({ ...f, promo_text: e.target.value, has_promo: e.target.value.trim() !== '' }))} placeholder="-20%" className="rounded-lg mt-1" />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <Button type="button" variant="outline" className="flex-1 rounded-xl" onClick={() => setShowDialog(false)}>Annuler</Button>
              <Button type="submit" disabled={saving} className="flex-1 rounded-xl bg-primary hover:bg-primary/90">
                {saving && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                {editingId ? 'Enregistrer' : 'Ajouter'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
