"use client";

import { cn } from "@/lib/utils";

export default function BackgroundEffect({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={cn("absolute inset-0 -z-10", className)}>
      {/* ชั้นที่ 1: Gradient หลัก */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.15] via-rose-500/[0.10] to-indigo-500/[0.15] dark:bg-[#181818]" />
      {/* ชั้นที่ 2: เบลอเสริม */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-300/[0.05] via-transparent to-rose-300/[0.05] dark:from-indigo-500/[0.05] dark:to-rose-500/[0.05] blur-3xl" />
      {/* ชั้นที่ 3: ด้านบน (แสงสะท้อนหรือกลมกลืน) */}
      <div className="absolute top-0 inset-0 bg-gradient-to-t from-white via-transparent to-white/80 dark:from-[#030303] dark:via-transparent dark:to-[#030303]/80 pointer-events-none" />
    </div>
  );
}
