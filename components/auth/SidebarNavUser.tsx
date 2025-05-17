"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  LogOutIcon,
  MoreVerticalIcon,
  Shield,
  UserCircleIcon,
} from "lucide-react";
import { WEBSITE_INITIALS } from "@/lib/config/constant";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "@/lib/api/authApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useMeQuery } from "@/hooks/react-query/queries/useMeQuery";
import { hasAdminRole } from "@/lib/utils/auth";

export function SideBarNavUser() {
  const router = useRouter();
  const { isMobile } = useSidebar();
  const { data: response } = useMeQuery();
  const data = response?.data;
  const roles = data?.roles;
  const isAdmin = hasAdminRole(roles);

  const handleLogout = async () => {
    try {
      const response = await signOut();
      if (response && response.status === 200) {
        toast.success(response.message + " ✅");
        router.push("/sign-in");
        router.refresh();
      } else if (response && response.status === 500) {
        toast.error(response.message + " ❌");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer" asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={data?.image?.url} alt={data?.image?.name} />
                <AvatarFallback className="rounded-lg">
                  {WEBSITE_INITIALS}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{data?.username}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {data?.email}
                </span>
              </div>
              <MoreVerticalIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={data?.image.url} alt={data?.image.name} />
                  <AvatarFallback className="rounded-lg">
                    {WEBSITE_INITIALS}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{data?.username}</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {data?.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {isAdmin && (
                <Link href={"/dashboard"}>
                  {" "}
                  <DropdownMenuItem>
                    <Shield />
                    ผู้ดูแลระบบ
                  </DropdownMenuItem>
                </Link>
              )}
              <Link href={"/account"}>
                {" "}
                <DropdownMenuItem>
                  <UserCircleIcon />
                  บัญชีของฉัน
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} variant="destructive">
              <LogOutIcon />
              ออกจากระบบ
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
