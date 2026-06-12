import { useState } from "react";
import { Plus, Edit, Trash2, Eye, EyeOff, Search } from "lucide-react";
import { products as initialProducts } from "../../data/mockData";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Switch } from "../../components/ui/switch";

export function ProductsManagement() {
  const [products] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState("");

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#303841] mb-2">Gestion des Produits</h1>
          <p className="text-gray-600">Gérez votre catalogue de produits</p>
        </div>
        <Button className="bg-[#FF5722] hover:bg-[#E64A19] text-white rounded-xl">
          <Plus className="h-5 w-5 mr-2" />
          Ajouter un produit
        </Button>
      </div>

      {/* Search & Filters */}
      <Card className="rounded-2xl p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Rechercher un produit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-xl"
            />
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="rounded-2xl p-4">
          <div className="text-sm text-gray-600">Total Produits</div>
          <div className="text-2xl font-bold text-[#303841] mt-1">{products.length}</div>
        </Card>
        <Card className="rounded-2xl p-4">
          <div className="text-sm text-gray-600">Actifs</div>
          <div className="text-2xl font-bold text-green-600 mt-1">
            {products.filter(p => p.isActive).length}
          </div>
        </Card>
        <Card className="rounded-2xl p-4">
          <div className="text-sm text-gray-600">Stock faible</div>
          <div className="text-2xl font-bold text-orange-600 mt-1">
            {products.filter(p => p.stock < 10).length}
          </div>
        </Card>
        <Card className="rounded-2xl p-4">
          <div className="text-sm text-gray-600">En vedette</div>
          <div className="text-2xl font-bold text-[#FF5722] mt-1">
            {products.filter(p => p.isFeatured).length}
          </div>
        </Card>
      </div>

      {/* Products Table */}
      <Card className="rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="w-20">Image</TableHead>
                <TableHead>Produit</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-[#303841]">{product.name}</div>
                    <div className="text-sm text-gray-500 line-clamp-1">{product.description}</div>
                    {product.isFeatured && (
                      <Badge className="bg-[#FF5722] text-white border-0 mt-1">
                        Vedette
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="font-semibold">{formatPrice(product.price)}</TableCell>
                  <TableCell>
                    <Badge variant={product.stock < 10 ? "destructive" : "secondary"}>
                      {product.stock} unités
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    Catégorie {product.category}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch checked={product.isActive} />
                      {product.isActive ? (
                        <span className="text-sm text-green-600 flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          Actif
                        </span>
                      ) : (
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <EyeOff className="h-4 w-4" />
                          Inactif
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" className="rounded-lg">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="rounded-lg text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
