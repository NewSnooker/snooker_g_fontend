"use client";
import AuthenticatedAvatar from "./AuthenticatedAvatar";
import { cn } from "@/lib/utils";
import { pacificoFont } from "@/font/font";
import { WEBSITE_INITIALS } from "@/lib/config";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";
import { SidebarTrigger } from "./ui/sidebar";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/lib/api/user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Navbar() {
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
    <div className="bg-card flex justify-between py-2 px-6 transparent backdrop-blur-2xl border-b">
      <div className="flex gap-4">
        <SidebarTrigger />
        <Button
          variant="ghost"
          size={"icon"}
          className="flex items-center sm:hidden"
        >
          <Link
            href="/"
            className=" text-xl font-bold tracking-tight rounded-full"
          >
            <span
              className={cn(
                "bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-rose-300",
                pacificoFont.className
              )}
            >
              {WEBSITE_INITIALS}
            </span>
          </Link>
        </Button>
      </div>
      <div className="flex gap-2">
        <ModeToggle />
        <AuthenticatedAvatar user={me?.data} />
      </div>
    </div>
  );
}
