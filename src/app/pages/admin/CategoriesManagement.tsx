import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { categories as initialCategories } from "../../data/mockData";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

export function CategoriesManagement() {
  const [categories] = useState(initialCategories);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#303841] mb-2">Gestion des Catégories</h1>
          <p className="text-gray-600">Organisez vos produits par catégorie</p>
        </div>
        <Button className="bg-[#FF5722] hover:bg-[#E64A19] text-white rounded-xl">
          <Plus className="h-5 w-5 mr-2" />
          Ajouter une catégorie
        </Button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {categories.map((category) => (
          <Card key={category.id} className="rounded-2xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#FF5722] to-[#FF8A50] rounded-xl flex items-center justify-center">
                <span className="text-2xl">📦</span>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="rounded-lg">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="rounded-lg text-red-600">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <h3 className="text-xl font-bold text-[#303841] mb-2">{category.name}</h3>
            <p className="text-sm text-gray-600">ID: {category.id}</p>
          </Card>
        ))}
      </div>

      {/* Categories Table */}
      <Card className="rounded-2xl overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-[#303841]">Liste des catégories</h2>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>ID</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Icône</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">#{category.id}</TableCell>
                  <TableCell className="font-semibold text-[#303841]">{category.name}</TableCell>
                  <TableCell className="text-gray-600">{category.icon}</TableCell>
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
