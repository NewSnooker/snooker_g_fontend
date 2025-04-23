// components/Navbar.tsx
"use client";
import AuthenticatedAvatar from "./AuthenticatedAvatar";
import { cn } from "@/lib/utils";
import { pacificoFont } from "@/font/font";
import { WEBSITE_INITIALS } from "@/lib/config";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";
import { SidebarTrigger } from "./ui/sidebar";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-card flex justify-between py-2 px-6 transparent backdrop-blur-2xl border-b sticky top-0 z-10">
      <div className="flex gap-4 items-center">
        <SidebarTrigger />
        <Link href="/" className="hidden sm:block">
          <span
            className={cn(
              "text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-rose-300",
              pacificoFont.className
            )}
          >
            {WEBSITE_INITIALS}
          </span>
        </Link>
        <Button variant="ghost" size="icon" className="sm:hidden" asChild>
          <Link href="/">
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

      <div className="flex gap-2 items-center">
        <ModeToggle />
        <AuthenticatedAvatar />
      </div>
    </nav>
  );
}
