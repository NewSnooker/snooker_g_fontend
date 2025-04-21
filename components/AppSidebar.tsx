"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Users,
  Wrench,
  Settings,
  BarChart3,
  FileText,
  Package,
  Store,
} from "lucide-react";
import Image from "next/image";
import logo from "@/public/logo.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
// สมมุติว่าคุณมีฟังก์ชัน cn สำหรับรวม class names
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { pacificoFont } from "@/font/font";
import { WEBSITE_INITIALS } from "@/lib/config";
import { adminSidebarLinks, userSidebarLinks } from "@/lib/sidebarLink";
import { SideBarNavUser } from "./ui/sidebar-nav-user";
import LogoTextGradient from "./frontend/LogoTextGradient";

export function AppSidebar() {
  const pathname = usePathname(); // ดึงเส้นทางปัจจุบัน
  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
  };

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarContent>
        <SidebarGroup className="gap-4">
          <SidebarGroupLabel className="flex items-center   ">
            <LogoTextGradient />
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {userSidebarLinks.map((item) => {
                // กำหนด active state โดยเปรียบเทียบ URL ปัจจุบันกับ item.href
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "flex items-center gap-2 group-data-[collapsible=icon]:justify-center transition-colors duration-200",
                        isActive
                          ? "bg-zinc-200/70 hover:bg-zinc-200 dark:bg-zinc-700 dark:hover:bg-zinc-600" // กำหนด active state: ปรับสีพื้นหลังและข้อความ
                          : ""
                      )}
                    >
                      <Link href={item.href}>
                        <item.icon className="h-4 w-4" />
                        <span className="group-data-[collapsible=icon]:hidden">
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SideBarNavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
