import type { PropsWithChildren } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/layout/sidebar";
import { DashboardHeader } from "@/components/layout/header";
import { SearchProvider } from "@/contexts/search-context";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <SearchProvider>
      <SidebarProvider>
        <div className="flex min-h-screen w-full bg-background">
          <DashboardSidebar />
          <main className="flex flex-1 flex-col">
            <DashboardHeader />
            <div className="flex-1 overflow-y-auto p-4 md:p-8">
              <div className="mx-auto w-full max-w-none">{children}</div>
            </div>
          </main>
        </div>
      </SidebarProvider>
    </SearchProvider>
  );
}
