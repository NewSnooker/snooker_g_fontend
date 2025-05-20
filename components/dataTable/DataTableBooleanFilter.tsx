"use client";

import { CheckIcon } from "@radix-ui/react-icons";
import { Column } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { ListFilterPlus } from "lucide-react";

interface DataTableBooleanFilterProps<TData, TValue> {
  column: Column<TData, TValue>;
  title: string;
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
}

export function DataTableBooleanFilter<TData, TValue>({
  column,
  title,
  options = [],
}: DataTableBooleanFilterProps<TData, TValue>) {
  const selectedValue = column.getFilterValue() as string | undefined;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 border-dashed text-xs"
        >
          <ListFilterPlus className="mr-0.5 h-4 w-4" />
          <div>{title}</div>
          {selectedValue && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                1
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {options.find((option) => option.value === selectedValue)
                  ?.label && (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {
                      options.find((option) => option.value === selectedValue)
                        ?.label
                    }
                  </Badge>
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[200px] max-w-[calc(100vw-2rem)] p-0"
        align="start"
      >
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>ไม่พบข้อมูล</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValue === option.value;
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      column.setFilterValue(
                        isSelected ? undefined : option.value
                      );
                    }}
                  >
                    <div
                      className={cn(
                        "mr-0.5 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <CheckIcon className={cn("h-4 w-4 text-background")} />
                    </div>
                    {option.icon && (
                      <option.icon className="mr-0.5 h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{option.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValue && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => column.setFilterValue(undefined)}
                    className="justify-center text-center"
                  >
                    ล้างตัวกรอง
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
