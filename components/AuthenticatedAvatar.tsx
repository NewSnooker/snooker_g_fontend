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
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { signOut } from "@/lib/api/auth";
import { toast } from "sonner";
import { LogOutIcon, UserCircleIcon } from "lucide-react";
import { WEBSITE_INITIALS } from "@/lib/config";

export default function AuthenticatedAvatar({
  name = "name",
  avatar,
  email = "email@example",
}: {
  name: string;
  avatar: string;
  email: string;
}) {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const response = await signOut();
      if (response.status === "success") {
        toast.success(response.message + " ✅");
        router.push("/sign-in");
        router.refresh();
      } else if (response.status === "error") {
        toast.error(response.message + " ❌");
      }
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("เกิดข้อผิดพลาดในการออกจากระบบ");
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer" asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Avatar className="h-8 w-8 ">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback className="">{WEBSITE_INITIALS}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={avatar} alt={name} />
              <AvatarFallback className="rounded-lg">
                {WEBSITE_INITIALS}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium ">{name}</span>
              <span className="truncate text-xs text-muted-foreground">
                {email}
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
