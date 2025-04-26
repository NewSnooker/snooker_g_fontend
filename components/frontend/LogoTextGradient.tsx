import { pacificoFont } from "@/font/font";
import { WEBSITE_INITIALS } from "@/lib/config/constant";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

export default function LogoTextGradient({
  className,
}: {
  className?: string;
}) {
  return (
    <Button variant="ghost" size={"icon"} className="flex items-center ">
      <Link
        href="/"
        className={cn(
          " text-2xl font-bold tracking-tight rounded-full",
          className
        )}
      >
        <span className={cn("text-gradient-1", pacificoFont.className)}>
          {WEBSITE_INITIALS}
        </span>
      </Link>
    </Button>
  );
}
