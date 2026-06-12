import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Package, ShoppingBag, Users, TrendingUp, ArrowUpRight, ArrowDownRight, Wallet } from 'lucide-react';
import { products, orders, customers } from '../../data/mockData';
import {
  Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip,
  Area, AreaChart,
} from 'recharts';
import { Badge } from '../../components/ui/badge';

const weeklyData = [
  { name: 'Lun', commandes: 12, revenus: 450000 },
  { name: 'Mar', commandes: 19, revenus: 680000 },
  { name: 'Mer', commandes: 15, revenus: 520000 },
  { name: 'Jeu', commandes: 25, revenus: 890000 },
  { name: 'Ven', commandes: 22, revenus: 750000 },
  { name: 'Sam', commandes: 30, revenus: 1200000 },
  { name: 'Dim', commandes: 18, revenus: 640000 },
];

const totalRevenue = weeklyData.reduce((s, d) => s + d.revenus, 0);

function formatPrice(price: number) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF', minimumFractionDigits: 0 }).format(price);
}

function getStatusColor(status: string) {
  const map: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    confirmed: 'bg-blue-100 text-blue-700 border-blue-200',
    preparing: 'bg-purple-100 text-purple-700 border-purple-200',
    delivered: 'bg-green-100 text-green-700 border-green-200',
    cancelled: 'bg-red-100 text-red-700 border-red-200',
  };
  return map[status] ?? 'bg-gray-100 text-gray-700';
}

function getStatusLabel(status: string) {
  const map: Record<string, string> = {
    pending: 'En attente',
    confirmed: 'Confirmée',
    preparing: 'En préparation',
    delivered: 'Livrée',
    cancelled: 'Annulée',
  };
  return map[status] ?? status;
}

const todayOrders = orders.filter(o => {
  const today = new Date();
  return new Date(o.createdAt).toDateString() === today.toDateString();
}).length;

const stats = [
  {
    title: 'Total Produits',
    value: products.filter(p => p.isActive).length,
    icon: Package,
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-50',
    trend: '+3',
    trendUp: true,
    trendLabel: 'ce mois',
  },
  {
    title: 'Total Commandes',
    value: orders.length,
    icon: ShoppingBag,
    iconColor: 'text-primary',
    iconBg: 'bg-orange-50',
    trend: '+12%',
    trendUp: true,
    trendLabel: 'vs sem. passée',
  },
  {
    title: 'Commandes du jour',
    value: todayOrders,
    icon: TrendingUp,
    iconColor: 'text-emerald-600',
    iconBg: 'bg-emerald-50',
    trend: todayOrders > 0 ? '+' + todayOrders : '0',
    trendUp: todayOrders > 0,
    trendLabel: "aujourd'hui",
  },
  {
    title: 'Clients',
    value: customers.length,
    icon: Users,
    iconColor: 'text-violet-600',
    iconBg: 'bg-violet-50',
    trend: '+2',
    trendUp: true,
    trendLabel: 'nouveaux',
  },
  {
    title: 'Revenus (sem.)',
    value: formatPrice(totalRevenue),
    icon: Wallet,
    iconColor: 'text-amber-600',
    iconBg: 'bg-amber-50',
    trend: '+8%',
    trendUp: true,
    trendLabel: 'vs sem. passée',
    wide: true,
  },
];

export function Dashboard() {
  const recentOrders = orders.slice(0, 5);
  const topProducts = products.filter(p => p.isFeatured).slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-['Poppins'] text-2xl md:text-3xl font-bold text-[#303841]">
            Tableau de bord
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Vue d'ensemble de votre boutique Yiriwa
          </p>
        </div>
        <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground bg-white border border-gray-200 rounded-xl px-3 py-1.5">
          <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
          <span>Boutique active</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.title}
              className={`rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow ${stat.wide ? 'sm:col-span-2 xl:col-span-1' : ''}`}
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className={`${stat.iconBg} p-2.5 rounded-xl`}>
                    <Icon className={`h-5 w-5 ${stat.iconColor}`} />
                  </div>
                  <div className={`flex items-center gap-0.5 text-xs font-medium ${stat.trendUp ? 'text-emerald-600' : 'text-red-500'}`}>
                    {stat.trendUp
                      ? <ArrowUpRight className="h-3.5 w-3.5" />
                      : <ArrowDownRight className="h-3.5 w-3.5" />}
                    {stat.trend}
                  </div>
                </div>
                <p className="font-['Poppins'] text-2xl font-bold text-[#303841] leading-none mb-1">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground">{stat.title}</p>
                <p className="text-xs text-muted-foreground/70 mt-0.5">{stat.trendLabel}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Orders bar chart */}
        <Card className="rounded-xl border border-gray-100 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="font-['Poppins'] text-base font-semibold text-[#303841]">
              Commandes — 7 derniers jours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData} barSize={28}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} width={30} />
                  <Tooltip
                    contentStyle={{ borderRadius: '0.75rem', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    cursor={{ fill: '#FF572210' }}
                  />
                  <Bar dataKey="commandes" fill="#FF5722" name="Commandes" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Revenue area chart */}
        <Card className="rounded-xl border border-gray-100 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="font-['Poppins'] text-base font-semibold text-[#303841]">
              Revenus — 7 derniers jours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyData}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#76ABAE" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#76ABAE" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis
                    tick={{ fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    width={55}
                    tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    contentStyle={{ borderRadius: '0.75rem', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    formatter={(v: number) => [formatPrice(v), 'Revenus']}
                    cursor={{ stroke: '#76ABAE30', strokeWidth: 2 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenus"
                    stroke="#76ABAE"
                    strokeWidth={2.5}
                    fill="url(#revenueGradient)"
                    dot={{ fill: '#76ABAE', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: '#76ABAE' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top products */}
        <Card className="rounded-xl border border-gray-100 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="font-['Poppins'] text-base font-semibold text-[#303841]">
              Produits les plus vendus
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {topProducts.map((product, i) => (
              <div key={product.id} className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 font-bold text-primary text-sm">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate text-[#303841]">{product.name}</p>
                  <p className="text-xs text-muted-foreground">{formatPrice(product.price)}</p>
                </div>
                <span className="text-xs font-semibold text-emerald-600 shrink-0">
                  {20 + i * 7} ventes
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent orders */}
        <Card className="lg:col-span-2 rounded-xl border border-gray-100 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="font-['Poppins'] text-base font-semibold text-[#303841]">
              Commandes récentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left pb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">N° Cmd</th>
                    <th className="text-left pb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Client</th>
                    <th className="text-left pb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden sm:table-cell">Montant</th>
                    <th className="text-left pb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-50 last:border-0">
                      <td className="py-3 text-sm font-medium text-[#303841]">{order.orderNumber}</td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-xs shrink-0">
                            {order.customerName.charAt(0)}
                          </div>
                          <span className="text-sm truncate max-w-[100px]">{order.customerName}</span>
                        </div>
                      </td>
                      <td className="py-3 text-sm font-semibold text-primary hidden sm:table-cell">
                        {formatPrice(order.totalAmount)}
                      </td>
                      <td className="py-3">
                        <Badge className={`text-xs border rounded-full px-2.5 py-0.5 font-medium ${getStatusColor(order.status)}`}>
                          {getStatusLabel(order.status)}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
