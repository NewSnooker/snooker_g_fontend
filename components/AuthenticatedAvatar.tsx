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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { LogOutIcon, UserCircleIcon } from "lucide-react";
import { WEBSITE_INITIALS } from "@/lib/config";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/lib/api/user";
import { useEffect } from "react";
import { signOut } from "@/lib/api/auth";
import { toast } from "sonner";
import { getQueryClient } from "@/lib/getQueryClient";
import { GetMeResponse } from "@/lib/api/user.type";
import { useRouter } from "next/navigation";
import { useUser, useUserActions } from "@/app/store/userStore";

export default function AuthenticatedAvatar({}) {
  const queryClient = getQueryClient();
  const router = useRouter();
  const user = useUser();
  const { setUser, clearUser } = useUserActions();

  // ดึงข้อมูลผู้ใช้ด้วย React Query
  const { data } = useQuery<GetMeResponse>({
    queryKey: ["user-me"],
    queryFn: getMe,
  });

  // ฟังก์ชัน logout
  const handleLogout = async () => {
    try {
      const response = await signOut();
      if (response.status === 200) {
        toast.success(response.message + " ✅");
        router.push("/sign-in");
        router.refresh();
        clearUser();
        queryClient.clear();
      } else if (response.status === 500) {
        toast.error(response.message + " ❌");
      }
    } catch (error) {
      console.error("Logout error:", error);
      clearUser();
    }
  };

  useEffect(() => {
    if (data?.data && data.status === 200) {
      setUser(data.data);
    }
  }, [data]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer" asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Avatar className="h-8 w-8 rounded-lg grayscale">
            <AvatarImage src={user?.imageUrl} alt={user?.username} />
            <AvatarFallback>{WEBSITE_INITIALS}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-56 rounded-lg">
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={user?.imageUrl} alt={user?.username} />
              <AvatarFallback className="rounded-lg">
                {WEBSITE_INITIALS}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{user?.username}</span>
              <span className="truncate text-xs text-muted-foreground">
                {user?.email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <UserCircleIcon />
            บัญชีของฉัน
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} variant="destructive">
          <LogOutIcon />
          ออกจากระบบ
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
