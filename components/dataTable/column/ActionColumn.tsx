"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";
import { Pencil, MoreHorizontal } from "lucide-react";
import { DeleteActionDialog } from "../DeleteActionDialog";
import { ForceLogoutActionDialog } from "../ForceLogoutActionDialog";

type ModelType = "users" | "projects" | string;

type ActionColumnProps = {
  row: any;
  model: ModelType;
  editEndpoint: string;
  id: string;
  title: string;
};

export default function ActionColumn({
  row,
  model,
  editEndpoint,
  id = "",
  title,
}: ActionColumnProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">เปิดเมนูจัดการ</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>จัดการ{title}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={editEndpoint} className="cursor-pointer">
          <DropdownMenuItem>
            <div className="flex items-center px-1 gap-2 cursor-pointer w-full">
              <Pencil className="w-4 h-4" />
              <span>แก้ไข</span>
            </div>
          </DropdownMenuItem>
        </Link>
        <ForceLogoutActionDialog title={title} model={model} id={id} />
        <DeleteActionDialog title={title} model={model} id={id} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
