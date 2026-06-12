import { Link, useLocation, useNavigate } from 'react-router';
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingBag,
  Users,
  Settings,
  Store,
  ChevronLeft,
  X,
  LogOut,
} from 'lucide-react';
import { cn } from '../ui/utils';
import { Button } from '../ui/button';
import { useAuth } from '../../../context/AuthContext';

const menuItems = [
  { icon: LayoutDashboard, label: 'Tableau de bord', href: '/admin' },
  { icon: Package, label: 'Produits', href: '/admin/products' },
  { icon: FolderTree, label: 'Catégories', href: '/admin/categories' },
  { icon: ShoppingBag, label: 'Commandes', href: '/admin/orders' },
  { icon: Users, label: 'Clients', href: '/admin/customers' },
  { icon: Settings, label: 'Paramètres', href: '/admin/settings' },
];

interface AdminSidebarProps {
  readonly collapsed: boolean;
  readonly onCollapse: (v: boolean) => void;
  readonly mobileOpen: boolean;
  readonly onMobileClose: () => void;
}

function SidebarContent({
  collapsed,
  onCollapse,
  onLinkClick,
  showCloseButton,
}: {
  readonly collapsed: boolean;
  readonly onCollapse: (v: boolean) => void;
  readonly onLinkClick?: () => void;
  readonly showCloseButton?: boolean;
}) {
  const location = useLocation();
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  return (
    <div className="flex h-full flex-col bg-[#303841] text-white">
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-white/10 shrink-0">
        {!collapsed && (
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary">
              <Store className="h-4 w-4" />
            </div>
            <span className="font-['Poppins'] text-lg font-bold truncate">Yiriwa Admin</span>
          </div>
        )}
        {showCloseButton ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onLinkClick?.()}
            className="text-white hover:bg-white/10 shrink-0 ml-auto"
          >
            <X className="h-5 w-5" />
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onCollapse(!collapsed)}
            className="text-white hover:bg-white/10 shrink-0"
          >
            <ChevronLeft className={cn('h-5 w-5 transition-transform duration-300', collapsed && 'rotate-180')} />
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto space-y-0.5 px-3 py-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;

          return (
            <Link
              key={item.href}
              to={item.href}
              onClick={onLinkClick}
              className={cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-150',
                isActive
                  ? 'bg-primary text-white shadow-lg shadow-primary/30'
                  : 'text-white/70 hover:bg-white/10 hover:text-white',
                collapsed && 'justify-center px-2'
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span className="font-medium text-sm">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 p-3 shrink-0 space-y-2">
        <Button
          asChild
          variant="outline"
          className={cn('w-full rounded-xl border-white/20 text-white hover:bg-white/10 hover:text-white text-sm', collapsed && 'px-2')}
        >
          <Link to="/" onClick={onLinkClick} className="flex items-center gap-2 justify-center">
            <Store className="h-4 w-4 shrink-0" />
            {!collapsed && <span>Voir la boutique</span>}
          </Link>
        </Button>
        <Button
          variant="ghost"
          className={cn('w-full rounded-xl text-white/60 hover:text-white hover:bg-white/10 text-sm', collapsed && 'px-2')}
          onClick={handleSignOut}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {!collapsed && <span className="ml-2">Déconnexion</span>}
        </Button>
      </div>
    </div>
  );
}

export function AdminSidebar({ collapsed, onCollapse, mobileOpen, onMobileClose }: AdminSidebarProps) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={cn(
          'hidden lg:flex flex-col fixed left-0 top-0 h-screen z-40 border-r border-white/10 transition-all duration-300',
          collapsed ? 'w-20' : 'w-64'
        )}
      >
        <SidebarContent collapsed={collapsed} onCollapse={onCollapse} />
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Fermer le menu"
          className="lg:hidden fixed inset-0 z-40 w-full bg-black/50 backdrop-blur-sm cursor-default"
          onClick={onMobileClose}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={cn(
          'lg:hidden fixed left-0 top-0 h-screen w-72 z-50 transition-transform duration-300 border-r border-white/10',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <SidebarContent
          collapsed={false}
          onCollapse={onCollapse}
          onLinkClick={onMobileClose}
          showCloseButton
        />
      </aside>
    </>
  );
}
