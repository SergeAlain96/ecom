import { Package, ShoppingCart, Users, TrendingUp, Eye, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { products, orders, customers } from "../../data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

export function AdminDashboard() {
  // Calculate stats
  const totalProducts = products.length;
  const activeProducts = products.filter(p => p.isActive).length;
  const totalOrders = orders.length;
  const todayOrders = orders.filter(o => {
    const orderDate = new Date(o.date);
    const today = new Date();
    return orderDate.toDateString() === today.toDateString();
  }).length;
  const totalCustomers = customers.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);

  // Top products
  const productOrderCount = orders.reduce((acc, order) => {
    acc[order.productId] = (acc[order.productId] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topProducts = Object.entries(productOrderCount)
    .map(([productId, count]) => ({
      product: products.find(p => p.id === productId),
      count,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Chart data - last 7 days
  const chartData = [
    { day: 'Lun', orders: 12, revenue: 540000 },
    { day: 'Mar', orders: 15, revenue: 680000 },
    { day: 'Mer', orders: 8, revenue: 420000 },
    { day: 'Jeu', orders: 18, revenue: 890000 },
    { day: 'Ven', orders: 22, revenue: 1100000 },
    { day: 'Sam', orders: 25, revenue: 1250000 },
    { day: 'Dim', orders: 10, revenue: 520000 },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#303841] mb-2">Tableau de bord</h1>
        <p className="text-gray-600">Vue d'ensemble de votre boutique Yiriwa</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="rounded-2xl border-l-4 border-l-[#FF5722]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Produits</CardTitle>
            <Package className="h-5 w-5 text-[#FF5722]" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#303841]">{totalProducts}</div>
            <p className="text-sm text-gray-500 mt-1">
              {activeProducts} actifs
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-l-4 border-l-[#76ABAE]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Commandes</CardTitle>
            <ShoppingCart className="h-5 w-5 text-[#76ABAE]" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#303841]">{totalOrders}</div>
            <p className="text-sm text-gray-500 mt-1">
              {todayOrders} aujourd'hui
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Clients</CardTitle>
            <Users className="h-5 w-5 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#303841]">{totalCustomers}</div>
            <p className="text-sm text-gray-500 mt-1">
              Clients enregistrés
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Revenu Total</CardTitle>
            <DollarSign className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#303841]">{formatPrice(totalRevenue)}</div>
            <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +12% ce mois
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Commandes - 7 derniers jours</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="orders" fill="#FF5722" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Revenus - 7 derniers jours</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip formatter={(value) => formatPrice(value as number)} />
                <Line type="monotone" dataKey="revenue" stroke="#76ABAE" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Products & Recent Orders */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Produits les plus commandés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((item, index) => (
                <div key={item.product?.id} className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-[#FF5722] rounded-full flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <img
                    src={item.product?.images[0]}
                    alt={item.product?.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-[#303841]">{item.product?.name}</div>
                    <div className="text-sm text-gray-500">{item.count} commandes</div>
                  </div>
                  <div className="text-sm font-semibold text-[#FF5722]">
                    {formatPrice(item.product?.price || 0)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Commandes récentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orders.slice(0, 5).map((order) => (
                <div key={order.id} className="flex items-center gap-4 pb-4 border-b last:border-0">
                  <div className="flex-1">
                    <div className="font-medium text-[#303841]">{order.customerName}</div>
                    <div className="text-sm text-gray-500">{order.productName}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-[#303841]">
                      {formatPrice(order.totalAmount)}
                    </div>
                    <div className={`text-xs px-2 py-1 rounded-full inline-block mt-1 ${
                      order.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      order.status === 'preparing' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {order.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
