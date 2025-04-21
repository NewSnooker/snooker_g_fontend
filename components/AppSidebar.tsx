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
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { userSidebarLinks } from "@/lib/sidebarLink";
import { SideBarNavUser } from "./ui/sidebar-nav-user";
import LogoTextGradient from "./frontend/LogoTextGradient";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/lib/api/user";
import { useEffect } from "react";

export function AppSidebar() {
  const pathname = usePathname(); // ดึงเส้นทางปัจจุบัน
  const { data: me } = useQuery({
    queryKey: ["user-me"],
    queryFn: getMe,
  });
  const router = useRouter();

  useEffect(() => {
    if (me?.message === "Token invalidated") {
      router.refresh();
    }
  }, [me]);

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
        <SideBarNavUser user={me?.data} />
      </SidebarFooter>
    </Sidebar>
  );
}
