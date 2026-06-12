import { useState } from 'react';
import { useCustomers } from '../../../hooks/useCustomers';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Skeleton } from '../../components/ui/skeleton';
import { Search, MessageCircle, Eye, Calendar } from 'lucide-react';

export function AdminCustomers() {
  const { customers, loading } = useCustomers();
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.phone.includes(searchQuery) ||
    c.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (d: string) =>
    new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(d));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-['Poppins'] text-2xl md:text-3xl font-bold text-[#303841]">Gestion des Clients</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Vue d'ensemble de tous vos clients</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Total Clients', value: customers.length, color: 'text-[#303841]' },
          { label: 'Total Commandes', value: customers.reduce((s, c) => s + c.total_orders, 0), color: 'text-primary' },
          { label: 'Moy. cmd/client', value: customers.length ? (customers.reduce((s, c) => s + c.total_orders, 0) / customers.length).toFixed(1) : '0', color: 'text-[#303841]' },
        ].map(({ label, value, color }) => (
          <Card key={label} className="rounded-xl border border-gray-100 shadow-sm">
            <CardContent className="p-6 text-center">
              <p className="text-sm text-muted-foreground mb-1">{label}</p>
              <p className={`text-3xl font-bold ${color}`}>{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="rounded-xl border border-gray-100 shadow-sm">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input type="search" placeholder="Rechercher un client..." className="pl-10 rounded-xl" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-xl border border-gray-100 shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['Client','Téléphone','Ville','Commandes','Membre depuis','Actions'].map(h => (
                    <th key={h} className="text-left py-3.5 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading
                  ? Array.from({ length: 4 }).map((_, i) => (
                      <tr key={i}><td colSpan={6} className="py-3 px-6"><Skeleton className="h-8 w-full" /></td></tr>
                    ))
                  : filtered.map(c => (
                      <tr key={c.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold shrink-0">
                              {c.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="font-medium text-sm">{c.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-sm">{c.phone}</td>
                        <td className="py-4 px-6 text-sm">{c.city}</td>
                        <td className="py-4 px-6">
                          <Badge className="rounded-lg text-xs bg-primary/10 text-primary border-0">
                            {c.total_orders} commande{c.total_orders > 1 ? 's' : ''}
                          </Badge>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {formatDate(c.created_at)}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg"><Eye className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-[#25D366]" asChild>
                              <a href={`https://wa.me/${c.phone.replace(/\s/g, '')}`} target="_blank" rel="noopener noreferrer">
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
    </div>
  );
}
