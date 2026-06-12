import { useState } from "react";
import { Eye, MessageCircle, Search } from "lucide-react";
import { customers as initialCustomers, shopSettings } from "../../data/mockData";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

export function CustomersManagement() {
  const [customers] = useState(initialCustomers);
  const [searchQuery, setSearchQuery] = useState("");

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery) ||
    customer.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleWhatsApp = (customer: typeof customers[0]) => {
    const message = `Bonjour ${customer.name}, merci pour votre fidélité chez Yiriwa !`;
    window.open(`https://wa.me/${customer.phone.replace(/\s/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);
  const totalOrders = customers.reduce((sum, c) => sum + c.ordersCount, 0);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#303841] mb-2">Gestion des Clients</h1>
        <p className="text-gray-600">Vue d'ensemble de votre base clients</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="rounded-2xl p-6">
          <div className="text-sm text-gray-600 mb-2">Total Clients</div>
          <div className="text-3xl font-bold text-[#303841]">{customers.length}</div>
        </Card>
        <Card className="rounded-2xl p-6">
          <div className="text-sm text-gray-600 mb-2">Total Commandes</div>
          <div className="text-3xl font-bold text-[#76ABAE]">{totalOrders}</div>
        </Card>
        <Card className="rounded-2xl p-6">
          <div className="text-sm text-gray-600 mb-2">Revenu Total</div>
          <div className="text-2xl font-bold text-[#FF5722]">{formatPrice(totalRevenue)}</div>
        </Card>
      </div>

      {/* Search */}
      <Card className="rounded-2xl p-6 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Rechercher un client par nom, téléphone ou ville..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 rounded-xl"
          />
        </div>
      </Card>

      {/* Customers Table */}
      <Card className="rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Client</TableHead>
                <TableHead>Téléphone</TableHead>
                <TableHead>Ville</TableHead>
                <TableHead>Commandes</TableHead>
                <TableHead>Total Dépensé</TableHead>
                <TableHead>Première Commande</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#FF5722] to-[#FF8A50] rounded-full flex items-center justify-center text-white font-bold">
                        {customer.name.charAt(0)}
                      </div>
                      <div className="font-medium text-[#303841]">{customer.name}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{customer.phone}</TableCell>
                  <TableCell className="text-sm text-gray-600">{customer.city}</TableCell>
                  <TableCell>
                    <div className="text-center">
                      <div className="text-lg font-bold text-[#303841]">{customer.ordersCount}</div>
                      <div className="text-xs text-gray-500">commandes</div>
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold text-[#FF5722]">
                    {formatPrice(customer.totalSpent)}
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {formatDate(customer.firstOrderDate)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" className="rounded-lg">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="rounded-lg text-green-600 hover:text-green-700"
                        onClick={() => handleWhatsApp(customer)}
                      >
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* No results */}
      {filteredCustomers.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          Aucun client trouvé
        </div>
      )}
    </div>
  );
}
