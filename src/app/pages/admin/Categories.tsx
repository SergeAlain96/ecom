import { useState } from 'react';
import { categories as initialCategories } from '../../data/mockData';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../../components/ui/dialog';
import { Badge } from '../../components/ui/badge';
import { Plus, Edit, Trash2 } from 'lucide-react';
import * as Icons from 'lucide-react';
import { toast } from 'sonner';

export function AdminCategories() {
  const [categories, setCategories] = useState(initialCategories);
  const [showDialog, setShowDialog] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [formData, setFormData] = useState({ name: '', icon: 'Package', slug: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingCategory) {
      setCategories(categories.map(c => 
        c.id === editingCategory.id ? { ...c, ...formData } : c
      ));
      toast.success('Catégorie modifiée avec succès');
    } else {
      const newCategory = {
        id: String(categories.length + 1),
        ...formData,
      };
      setCategories([...categories, newCategory]);
      toast.success('Catégorie ajoutée avec succès');
    }
    
    setShowDialog(false);
    setFormData({ name: '', icon: 'Package', slug: '' });
    setEditingCategory(null);
  };

  const handleEdit = (category: any) => {
    setEditingCategory(category);
    setFormData({ name: category.name, icon: category.icon, slug: category.slug });
    setShowDialog(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
      setCategories(categories.filter(c => c.id !== id));
      toast.success('Catégorie supprimée');
    }
  };

  const handleAddNew = () => {
    setEditingCategory(null);
    setFormData({ name: '', icon: 'Package', slug: '' });
    setShowDialog(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-['Poppins'] text-3xl font-bold text-[#303841]">
            Gestion des Catégories
          </h1>
          <p className="text-muted-foreground mt-1">
            Organisez vos produits par catégories
          </p>
        </div>
        <Button 
          className="rounded-xl bg-primary hover:bg-primary/90"
          onClick={handleAddNew}
        >
          <Plus className="h-4 w-4 mr-2" />
          Ajouter une catégorie
        </Button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          const Icon = (Icons as any)[category.icon] || Icons.Package;
          return (
            <Card key={category.id} className="rounded-xl border-2 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-['Poppins'] font-semibold text-lg">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">/{category.slug}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 rounded-lg"
                    onClick={() => handleEdit(category)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Modifier
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-lg text-destructive hover:bg-destructive hover:text-white"
                    onClick={() => handleDelete(category.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-['Poppins']">
              {editingCategory ? 'Modifier la catégorie' : 'Ajouter une catégorie'}
            </DialogTitle>
            <DialogDescription>
              {editingCategory 
                ? 'Modifiez les informations de la catégorie' 
                : 'Créez une nouvelle catégorie pour organiser vos produits'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Nom de la catégorie *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: Mode"
                className="rounded-lg"
                required
              />
            </div>
            <div>
              <Label htmlFor="slug">Slug (URL) *</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s/g, '-') })}
                placeholder="Ex: mode"
                className="rounded-lg"
                required
              />
            </div>
            <div>
              <Label htmlFor="icon">Icône (nom Lucide)</Label>
              <Input
                id="icon"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                placeholder="Ex: Shirt, Sparkles, Package"
                className="rounded-lg"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Voir les icônes disponibles sur lucide.dev
              </p>
            </div>
            
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1 rounded-xl"
                onClick={() => {
                  setShowDialog(false);
                  setFormData({ name: '', icon: 'Package', slug: '' });
                  setEditingCategory(null);
                }}
              >
                Annuler
              </Button>
              <Button type="submit" className="flex-1 rounded-xl bg-primary hover:bg-primary/90">
                {editingCategory ? 'Modifier' : 'Ajouter'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
