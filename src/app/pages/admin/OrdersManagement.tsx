import { useState } from "react";
import { Eye, MessageCircle, Filter, Download } from "lucide-react";
import { orders as initialOrders, shopSettings } from "../../data/mockData";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

export function OrdersManagement() {
  const [orders] = useState(initialOrders);
  const [statusFilter, setStatusFilter] = useState("all");

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
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'En attente', className: 'bg-yellow-100 text-yellow-700' },
      confirmed: { label: 'Confirmée', className: 'bg-green-100 text-green-700' },
      preparing: { label: 'En préparation', className: 'bg-blue-100 text-blue-700' },
      delivered: { label: 'Livrée', className: 'bg-purple-100 text-purple-700' },
      cancelled: { label: 'Annulée', className: 'bg-red-100 text-red-700' },
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge className={`${config.className} border-0`}>{config.label}</Badge>;
  };

  const filteredOrders = statusFilter === "all" 
    ? orders 
    : orders.filter(o => o.status === statusFilter);

  const handleWhatsApp = (order: typeof orders[0]) => {
    const message = `Bonjour ${order.customerName}, concernant votre commande ${order.orderNumber}...`;
    window.open(`https://wa.me/${order.customerPhone.replace(/\s/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#303841] mb-2">Gestion des Commandes</h1>
          <p className="text-gray-600">Suivez et gérez toutes vos commandes</p>
        </div>
        <Button variant="outline" className="rounded-xl border-2">
          <Download className="h-5 w-5 mr-2" />
          Exporter
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <Card className="rounded-2xl p-4">
          <div className="text-sm text-gray-600">Total</div>
          <div className="text-2xl font-bold text-[#303841] mt-1">{orders.length}</div>
        </Card>
        <Card className="rounded-2xl p-4">
          <div className="text-sm text-gray-600">En attente</div>
          <div className="text-2xl font-bold text-yellow-600 mt-1">
            {orders.filter(o => o.status === 'pending').length}
          </div>
        </Card>
        <Card className="rounded-2xl p-4">
          <div className="text-sm text-gray-600">Confirmées</div>
          <div className="text-2xl font-bold text-green-600 mt-1">
            {orders.filter(o => o.status === 'confirmed').length}
          </div>
        </Card>
        <Card className="rounded-2xl p-4">
          <div className="text-sm text-gray-600">En préparation</div>
          <div className="text-2xl font-bold text-blue-600 mt-1">
            {orders.filter(o => o.status === 'preparing').length}
          </div>
        </Card>
        <Card className="rounded-2xl p-4">
          <div className="text-sm text-gray-600">Livrées</div>
          <div className="text-2xl font-bold text-purple-600 mt-1">
            {orders.filter(o => o.status === 'delivered').length}
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-4">
          <Filter className="h-5 w-5 text-gray-400" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[200px] rounded-xl">
              <SelectValue placeholder="Filtrer par statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="confirmed">Confirmée</SelectItem>
              <SelectItem value="preparing">En préparation</SelectItem>
              <SelectItem value="delivered">Livrée</SelectItem>
              <SelectItem value="cancelled">Annulée</SelectItem>
            </SelectContent>
          </Select>
          <div className="text-sm text-gray-600">
            {filteredOrders.length} commande{filteredOrders.length > 1 ? 's' : ''}
          </div>
        </div>
      </Card>

      {/* Orders Table */}
      <Card className="rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>N° Commande</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Téléphone</TableHead>
                <TableHead>Produit</TableHead>
                <TableHead>Qté</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono font-medium">{order.orderNumber}</TableCell>
                  <TableCell>
                    <div className="font-medium text-[#303841]">{order.customerName}</div>
                    <div className="text-sm text-gray-500">{order.city}</div>
                  </TableCell>
                  <TableCell className="text-sm">{order.customerPhone}</TableCell>
                  <TableCell className="max-w-[200px]">
                    <div className="font-medium text-sm line-clamp-1">{order.productName}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{order.quantity}</Badge>
                  </TableCell>
                  <TableCell className="font-semibold">{formatPrice(order.totalAmount)}</TableCell>
                  <TableCell className="text-sm text-gray-600">{formatDate(order.date)}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" className="rounded-lg">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="rounded-lg text-green-600 hover:text-green-700"
                        onClick={() => handleWhatsApp(order)}
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
    </div>
  );
}
