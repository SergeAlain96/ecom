import { useState } from 'react';
import { customers as initialCustomers } from '../../data/mockData';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Search, MessageCircle, Eye, Calendar } from 'lucide-react';

export function AdminCustomers() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery) ||
    customer.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(date);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-['Poppins'] text-3xl font-bold text-[#303841]">
          Gestion des Clients
        </h1>
        <p className="text-muted-foreground mt-1">
          Vue d'ensemble de tous vos clients
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="rounded-xl border-2">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Total Clients</p>
              <p className="text-3xl font-bold text-[#303841]">{customers.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-xl border-2">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Total Commandes</p>
              <p className="text-3xl font-bold text-primary">
                {customers.reduce((sum, c) => sum + c.totalOrders, 0)}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-xl border-2">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Moyenne commandes/client</p>
              <p className="text-3xl font-bold text-[#303841]">
                {(customers.reduce((sum, c) => sum + c.totalOrders, 0) / customers.length).toFixed(1)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="rounded-xl border-2">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher un client..."
              className="pl-10 rounded-xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card className="rounded-xl border-2">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-sm text-muted-foreground">Client</th>
                  <th className="text-left py-4 px-6 font-semibold text-sm text-muted-foreground">Téléphone</th>
                  <th className="text-left py-4 px-6 font-semibold text-sm text-muted-foreground">Ville</th>
                  <th className="text-left py-4 px-6 font-semibold text-sm text-muted-foreground">Commandes</th>
                  <th className="text-left py-4 px-6 font-semibold text-sm text-muted-foreground">Membre depuis</th>
                  <th className="text-right py-4 px-6 font-semibold text-sm text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="font-semibold text-primary">
                            {customer.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <span className="font-medium text-sm">{customer.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm">{customer.phone}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm">{customer.city}</span>
                    </td>
                    <td className="py-4 px-6">
                      <Badge className="rounded-lg">
                        {customer.totalOrders} commande{customer.totalOrders > 1 ? 's' : ''}
                      </Badge>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {formatDate(customer.createdAt)}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" className="rounded-lg">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-lg text-[#25D366]"
                          asChild
                        >
                          <a
                            href={`https://wa.me/${customer.phone.replace(/\s/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <MessageCircle className="h-4 w-4" />
                          </a>
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

      {filteredCustomers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Aucun client trouvé</p>
        </div>
      )}
    </div>
  );
}
