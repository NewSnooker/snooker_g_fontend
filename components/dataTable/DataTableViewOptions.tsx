"use client";

// คอมโพเนนต์สำหรับการซ่อน/แสดงคอลัมน์
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { CheckIcon, X } from "lucide-react";

import { Table } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  // รีเซ็ตการตั้งค่าคอลัมน์ (แสดงทุกคอลัมน์)
  const resetColumnVisibility = () => {
    const newVisibility: Record<string, boolean> = {}; // กำหนดประเภทให้ชัดเจน
    table.getAllColumns().forEach((column) => {
      if (column.getCanHide()) {
        newVisibility[column.id] = true; // ใช้ true (boolean) ไม่ใช่ "true"
        column.toggleVisibility(true); // อัปเดตใน table instance
      }
    });
    table.setColumnVisibility(newVisibility); // บังคับอัปเดต state
    console.log("Column visibility reset:", table.getState()); // ตรวจสอบการรีเซ็ต
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="ml-auto h-8">
          <MixerHorizontalIcon className="mr-0 sm:mr-0.5 h-4 w-4" />
          <span className="hidden md:inline">ตัวเลือกการแสดง</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="end">
        <Command>
          <CommandList>
            <CommandGroup>
              {table
                .getAllColumns()
                .filter(
                  (column) =>
                    typeof column.accessorFn !== "undefined" &&
                    column.getCanHide()
                )
                .map((column) => {
                  const isVisible = column.getIsVisible();
                  return (
                    <CommandItem
                      key={column.id}
                      onSelect={() => column.toggleVisibility(!isVisible)}
                      className="capitalize"
                    >
                      <div
                        className={cn(
                          "mr-0.5 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                          isVisible
                            ? "bg-primary text-primary-foreground"
                            : "opacity-50 [&_svg]:invisible"
                        )}
                      >
                        <CheckIcon
                          className={cn(
                            "h-4 w-4 text-background",
                            isVisible ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </div>
                      <span>{column.id}</span>
                    </CommandItem>
                  );
                })}
            </CommandGroup>
            {table
              .getAllColumns()
              .some(
                (column) => column.getCanHide() && !column.getIsVisible()
              ) && (
              <>
                <CommandSeparator />
                <CommandGroup className="text-center">
                  <CommandItem
                    onSelect={resetColumnVisibility}
                    className="justify-center text-center"
                  >
                    <span>แสดงทุกคอลัมน์</span>
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
