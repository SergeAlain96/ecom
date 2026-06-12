import { Outlet } from "react-router";
import { AdminSidebar } from "../components/admin/AdminSidebar";
import { SidebarProvider } from "../components/ui/sidebar";

export function AdminLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AdminSidebar />
        <main className="flex-1 bg-[#F8F9FA]">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
