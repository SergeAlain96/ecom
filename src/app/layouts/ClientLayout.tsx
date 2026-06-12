import { Outlet } from "react-router";
import { ClientHeader } from "../components/client/ClientHeader";
import { ClientFooter } from "../components/client/ClientFooter";

export function ClientLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <ClientHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <ClientFooter />
    </div>
  );
}
