"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Role, UserProps } from "@/lib/types/user";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<UserProps, any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="เลือกทั้งหมด"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="เลือกแถว"
      />
    ),
    enableSorting: false, // ไม่ให้เรียงคอลัมน์ select
    enableHiding: false,
  },
  {
    accessorKey: "username",
    header: "ชื่อ",
  },
  {
    accessorKey: "email",
    header: "อีเมล",
  },
  {
    accessorKey: "roles",
    header: "บทบาท",
    filterFn: (row, columnId, filterValue) => {
      const roles = row.getValue(columnId) as string[];
      return filterValue.some((val: string) => roles.includes(val));
    },
    cell: ({ row }) => {
      const roles = row.getValue("roles") as string[];
      return (
        <div className="flex gap-2 flex-wrap">
          {roles?.map((role: string) => {
            let color = "outline";
            switch (role) {
              case Role.ADMIN:
                color = "default";
                break;
              case Role.SUPER_ADMIN:
                color = "destructive";
                break;
              default:
                color = "outline";
            }
            return (
              <Badge
                key={role}
                variant={
                  color as "default" | "secondary" | "destructive" | "outline"
                }
              >
                {role}
              </Badge>
            );
          })}
        </div>
      );
    },
    enableSorting: true, // อนุญาตให้เรียงได้
    sortingFn: (a, b) => {
      // เรียงตามบทบาทแรกในอาร์เรย์
      const rolesA = a.getValue("roles") as string[];
      const rolesB = b.getValue("roles") as string[];
      return rolesA[0].localeCompare(rolesB[0]);
    },
  },
  {
    accessorKey: "isActive",
    header: "สถานะ",
    cell: ({ row }) => {
      const isActive = row.getValue("isActive") as boolean;
      return (
        <Badge variant={isActive ? "default" : "destructive"}>
          {isActive ? "เปิดใช้งาน" : "ปิดใช้งาน"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "วันที่สร้าง",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0"); // เดือนนับจาก 0
      const year = date.getFullYear(); // ได้ปี ค.ศ.
      return `${day}/${month}/${year}`; // รูปแบบ 01-01-2025
    },
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const data  = row.original;
  //     return (
  //       <ActionColumn
  //         row={row}
  //         model=""
  //         title=""
  //         editEndpoint={`/update/${.id}`}
  //         id={data.id}
  //       />
  //     );
  //   },
  // },
];
