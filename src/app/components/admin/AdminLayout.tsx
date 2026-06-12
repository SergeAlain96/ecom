import { useState } from 'react';
import { Outlet } from 'react-router';
import { AdminSidebar } from './AdminSidebar';
import { Toaster } from '../ui/sonner';
import { Menu } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '../ui/utils';

export function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <AdminSidebar
        collapsed={collapsed}
        onCollapse={setCollapsed}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      {/* Main content */}
      <div
        className={cn(
          'flex flex-col flex-1 min-w-0 overflow-hidden transition-all duration-300',
          'lg:ml-64',
          collapsed && 'lg:ml-20'
        )}
      >
        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center gap-3 h-14 px-4 bg-white border-b border-gray-100 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-xl"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
              <span className="font-['Poppins'] text-xs font-bold text-white">Y</span>
            </div>
            <span className="font-['Poppins'] font-bold text-[#303841]">Yiriwa Admin</span>
          </div>
        </div>

        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto p-4 md:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>

      <Toaster position="top-right" />
    </div>
  );
}
