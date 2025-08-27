"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { AppLogo } from "@/components/icons";
import {
  LayoutDashboard,
  Users,
  MapPin,
  ShieldAlert,
  BrainCircuit,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/residents", label: "Residents", icon: Users },
  { href: "/dashboard/map", label: "Map", icon: MapPin },
  { href: "/dashboard/alerts", label: "Alerts", icon: ShieldAlert },
  {
    href: "/dashboard/smart-alert",
    label: "Smart Alert",
    icon: BrainCircuit,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar
      className="border-r"
      variant="sidebar"
      collapsible="icon"
      side="left"
    >
      <SidebarHeader className="h-16 justify-center p-2 group-data-[collapsible=icon]:justify-center">
        <Link href="/dashboard" className="flex items-center gap-2">
          <AppLogo className="h-8 w-8 text-primary" />
          <span className="text-lg font-semibold text-sidebar-foreground group-data-[collapsible=icon]:hidden">
            SmartWatch
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="flex-1 p-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={{ children: item.label, side: "right" }}
                className={cn(
                  "justify-start",
                  pathname === item.href && "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                )}
              >
                <Link href={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === "/dashboard/settings"}
              className={cn(
                "justify-start",
                pathname === "/dashboard/settings" && "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
              )}
              tooltip={{ children: "Settings", side: "right" }}
            >
              <Link href="/dashboard/settings">
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="justify-start"
              tooltip={{ children: "Logout", side: "right" }}
            >
              <Link href="/">
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
