import { useState } from 'react';
import { useOrders } from '../../../hooks/useOrders';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Badge } from '../../components/ui/badge';
import { Skeleton } from '../../components/ui/skeleton';
import { Search, Eye, MessageCircle, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import type { Order } from '../../../lib/supabase';

function statusColor(status: string) {
  const map: Record<string, string> = {
    pending:   'bg-yellow-100 text-yellow-700 border-yellow-200',
    confirmed: 'bg-blue-100 text-blue-700 border-blue-200',
    preparing: 'bg-purple-100 text-purple-700 border-purple-200',
    delivered: 'bg-green-100 text-green-700 border-green-200',
    cancelled: 'bg-red-100 text-red-700 border-red-200',
  };
  return map[status] ?? 'bg-gray-100 text-gray-700';
}

const STATUS_LABELS: Record<string, string> = {
  pending: 'En attente', confirmed: 'Confirmée',
  preparing: 'En préparation', delivered: 'Livrée', cancelled: 'Annulée',
};

export function AdminOrders() {
  const { orders, loading, updateStatus } = useOrders();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = orders.filter(o => {
    const q = searchQuery.toLowerCase();
    const matchSearch = o.order_number.toLowerCase().includes(q) || o.customer_name.toLowerCase().includes(q) || o.product_name.toLowerCase().includes(q);
    const matchStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const formatPrice = (p: number) =>
    new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF', minimumFractionDigits: 0 }).format(p);

  const formatDate = (d: string) =>
    new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(d));

  const handleStatusChange = async (id: string, status: Order['status']) => {
    const err = await updateStatus(id, status);
    if (err) toast.error('Erreur lors de la mise à jour');
    else toast.success('Statut mis à jour');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-['Poppins'] text-2xl md:text-3xl font-bold text-[#303841]">Gestion des Commandes</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Suivez et gérez toutes les commandes</p>
      </div>

      <Card className="rounded-xl border border-gray-100 shadow-sm">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input type="search" placeholder="Rechercher..." className="pl-10 rounded-xl" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="rounded-xl"><SelectValue placeholder="Filtrer par statut" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                {Object.entries(STATUS_LABELS).map(([v, l]) => <SelectItem key={v} value={v}>{l}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-xl border border-gray-100 shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['N° Commande','Client','Produit','Qté','Montant','Date','Statut','Actions'].map(h => (
                    <th key={h} className="text-left py-3.5 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading
                  ? Array.from({ length: 4 }).map((_, i) => (
                      <tr key={i}><td colSpan={8} className="py-3 px-4"><Skeleton className="h-8 w-full" /></td></tr>
                    ))
                  : filtered.map(order => (
                      <tr key={order.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                        <td className="py-3.5 px-4 font-medium text-sm">{order.order_number}</td>
                        <td className="py-3.5 px-4">
                          <p className="font-medium text-sm">{order.customer_name}</p>
                          <p className="text-xs text-muted-foreground">{order.customer_phone}</p>
                          <p className="text-xs text-muted-foreground">{order.customer_city}</p>
                        </td>
                        <td className="py-3.5 px-4 text-sm">{order.product_name}</td>
                        <td className="py-3.5 px-4 font-semibold text-sm">{order.quantity}</td>
                        <td className="py-3.5 px-4 font-semibold text-sm text-primary">{formatPrice(order.total_amount)}</td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {formatDate(order.created_at)}
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <Select value={order.status} onValueChange={v => handleStatusChange(order.id, v as Order['status'])}>
                            <SelectTrigger className={`w-36 rounded-lg border text-xs ${statusColor(order.status)}`}><SelectValue /></SelectTrigger>
                            <SelectContent>
                              {Object.entries(STATUS_LABELS).map(([v, l]) => <SelectItem key={v} value={v}>{l}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg"><Eye className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-[#25D366]" asChild>
                              <a href={`https://wa.me/${order.customer_phone.replace(/\s/g, '')}`} target="_blank" rel="noopener noreferrer">
                                <MessageCircle className="h-4 w-4" />
                              </a>
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

      {!loading && filtered.length === 0 && (
        <div className="text-center py-12"><p className="text-muted-foreground text-sm">Aucune commande trouvée</p></div>
      )}
    </div>
  );
}
