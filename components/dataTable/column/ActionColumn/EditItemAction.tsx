import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Pencil } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function EditItemAction({
  editEndpoint,
}: {
  editEndpoint: string;
}) {
  return (
    <Link href={editEndpoint} className="cursor-pointer">
      <DropdownMenuItem>
        <div className="flex items-center px-1 gap-2 cursor-pointer w-full">
          <Pencil className="w-4 h-4" />
          <span>แก้ไข</span>
        </div>
      </DropdownMenuItem>
    </Link>
  );
}
