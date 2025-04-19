"use client";
import React, { useEffect, useState } from "react";
import AuthenticatedAvatar from "./AuthenticatedAvatar";
import { cn } from "@/lib/utils";
import { pacificoFont } from "@/font/font";
import { WEBSITE_INITIALS } from "@/lib/config";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Navbar() {
  const [name, setName] = useState<string>("");
  const [level, setLevel] = useState<string>("");
  return (
    <div className="flex justify-between py-2 px-6 transparent backdrop-blur-2xl border-b">
      <Button variant="ghost" className="flex items-center ">
        <Link
          href="/"
          className="text-sm sm:text-xl font-bold tracking-tight rounded-full"
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
      <div className="flex gap-2">
        <ModeToggle />
        <AuthenticatedAvatar name={name} level={level} />
      </div>
    </div>
  );
}
