"use client";

import { CheckIcon, ListFilterPlus, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
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
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  format,
  isAfter,
  isBefore,
  startOfMonth,
  endOfMonth,
  parse,
} from "date-fns";
import { th } from "date-fns/locale/th";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";

interface DateRangeFilterProps {
  column: any; // Replace with proper type if available
  title: string;
  options?: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
}

export function DateRangeFilter({
  column,
  title,
  options,
}: DateRangeFilterProps) {
  const selected = column.getFilterValue() as string[] | undefined;
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");
  const [error, setError] = useState("");

  const applyPreset = (value: string) => {
    setError("");
    column.setFilterValue([value]);
  };

  const formatThaiDate = (dateObj: Date) => {
    // Format date to Thai Buddhist Era (BE) display format (dd/MM/yyyy)
    const thaiYear = dateObj.getFullYear() + 543; // Convert to Buddhist Era
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();

    // Ensure two-digit formatting for day and month
    const formattedDay = day.toString().padStart(2, "0");
    const formattedMonth = month.toString().padStart(2, "0");

    return `${formattedDay}/${formattedMonth}/${thaiYear}`;
  };

  const parseThaiDateInput = (dateString: string) => {
    // Parse YYYY-MM-DD input format to Date object
    // This handles the standard HTML date input format
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  const applyCustomRange = () => {
    setError("");
    if (customStart && customEnd) {
      const startDateObj = parseThaiDateInput(customStart);
      const endDateObj = parseThaiDateInput(customEnd);

      if (isAfter(startDateObj, endDateObj)) {
        setError("วันที่เริ่มต้องมาก่อนวันที่สิ้นสุด");
        return;
      }

      // Format dates in Thai format for display
      const formattedStart = formatThaiDate(startDateObj);
      const formattedEnd = formatThaiDate(endDateObj);

      column.setFilterValue([formattedStart, formattedEnd]);
    }
  };

  const clearFilter = () => {
    column.setFilterValue(undefined);
    setCustomStart("");
    setCustomEnd("");
    setError("");
  };

  const currentDate = new Date();
  // Adjust the displayed year for Thai Buddhist Era (BE) if needed,
  // but the HTML date input uses Gregorian calendar (CE)
  const maxDate = format(currentDate, "yyyy-MM-dd");

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 border-dashed text-xs"
        >
          <ListFilterPlus className="mr-0.5 h-4 w-4" />
          {title}
          {selected?.length ? (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal "
              >
                {selected?.length === 2
                  ? `${selected[0]} - ${selected[1]}`
                  : options?.find((option) => option.value === selected[0])
                      ?.label}
              </Badge>
            </>
          ) : null}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[280px] max-w-[calc(100vw-2rem)] p-2"
        align="start"
      >
        <Command>
          <CommandList>
            <CommandEmpty>ไม่พบข้อมูล</CommandEmpty>
            <CommandGroup className="p-1">
              {(options ?? []).map(({ label, value }) => {
                const isSelected = selected?.includes(value);
                return (
                  <CommandItem
                    key={value}
                    onSelect={() => applyPreset(value)}
                    className="text-xs px-2 py-1 "
                  >
                    <div
                      className={cn(
                        "mr-0.5 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <CheckIcon
                        className={cn(
                          "h-4 w-4 text-background",
                          isSelected ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </div>
                    <span>{label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            <CommandSeparator className="my-2 bg-gray-200" />
            <CommandGroup className="p-1">
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative">
                    <Input
                      type="date"
                      value={customStart}
                      onChange={(e) => setCustomStart(e.target.value)}
                      className="h-8 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-primary focus:border-primary p-1"
                      max={maxDate}
                    />
                  </div>
                  <div className="relative">
                    <Input
                      type="date"
                      value={customEnd}
                      onChange={(e) => setCustomEnd(e.target.value)}
                      className="h-8 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-primary focus:border-primary p-1"
                      max={maxDate}
                      min={customStart || undefined}
                    />
                  </div>
                </div>
                {error && <div className="text-red-500 text-xs">{error}</div>}
                <Button
                  variant="default"
                  size="sm"
                  className="w-full h-8 text-xs bg-primary text-white hover:bg-primary/90 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  disabled={!customStart || !customEnd}
                  onClick={applyCustomRange}
                >
                  ใช้ช่วงวันที่
                </Button>
              </div>
            </CommandGroup>
            {(selected?.length || customStart || customEnd) && (
              <CommandSeparator />
            )}
            {(selected?.length || customStart || customEnd) && (
              <CommandGroup>
                <CommandItem
                  onSelect={clearFilter}
                  className="justify-center text-center"
                >
                  ล้างตัวกรอง
                </CommandItem>
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
