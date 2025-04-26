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
import { LogOutIcon, UserCircleIcon } from "lucide-react";
import { DEFAULT_ERROR_MESSAGE, WEBSITE_INITIALS } from "@/lib/config/constant";
import { signOut } from "@/lib/api/authApi";
import { toast } from "sonner";
import { getQueryClient } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useMeQuery } from "@/hooks/react-query/queries/useMeQuery";
import Link from "next/link";

export default function AuthenticatedAvatar({}) {
  const queryClient = getQueryClient();
  const router = useRouter();
  const { data: response } = useMeQuery();
  const data = response?.data;

  const handleLogout = async () => {
    try {
      const response = await signOut();
      if (response && response.status === 200) {
        toast.success(response.message + " ✅");
        router.push("/sign-in");
        router.refresh();
        queryClient.clear();
      } else {
        toast.error(response?.message || DEFAULT_ERROR_MESSAGE);
      }
    } catch (error) {
      console.error("Form submission error", error);
      toast.error(DEFAULT_ERROR_MESSAGE);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer" asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Avatar className="h-8 w-8 rounded-full">
            <AvatarFallback>{WEBSITE_INITIALS}</AvatarFallback>
            <AvatarImage src={data?.imageUrl.url} alt={data?.imageUrl.name} />
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-56 rounded-lg">
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={data?.imageUrl.url} alt={data?.imageUrl.name} />
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
  );
}
