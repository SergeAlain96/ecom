import { createBrowserRouter } from 'react-router';

// Client Pages
import { Home } from './pages/client/Home';
import { Products } from './pages/client/Products';
import { ProductDetail } from './pages/client/ProductDetail';
import { Categories } from './pages/client/Categories';
import { Contact } from './pages/client/Contact';
import { ClientLayout } from './components/client/ClientLayout';

// Admin Pages
import { Dashboard } from './pages/admin/Dashboard';
import { AdminProducts } from './pages/admin/Products';
import { AdminOrders } from './pages/admin/Orders';
import { AdminCategories } from './pages/admin/Categories';
import { AdminCustomers } from './pages/admin/Customers';
import { AdminSettings } from './pages/admin/Settings';
import { AdminLayout } from './components/admin/AdminLayout';

// Other Pages
import { NotFound } from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: ClientLayout,
    children: [
      { index: true, Component: Home },
      { path: 'products', Component: Products },
      { path: 'products/:id', Component: ProductDetail },
      { path: 'categories', Component: Categories },
      { path: 'contact', Component: Contact },
    ],
  },
  {
    path: '/admin',
    Component: AdminLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: 'products', Component: AdminProducts },
      { path: 'categories', Component: AdminCategories },
      { path: 'orders', Component: AdminOrders },
      { path: 'customers', Component: AdminCustomers },
      { path: 'settings', Component: AdminSettings },
    ],
  },
  {
    path: '*',
    Component: NotFound,
  },
]);