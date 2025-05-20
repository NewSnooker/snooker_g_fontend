// DateRangeFilter.tsx
import {
  endOfMonth,
  endOfYear,
  format,
  isAfter,
  startOfMonth,
  startOfYear,
} from "date-fns";
import { th } from "date-fns/locale";
import { Column } from "@tanstack/react-table";
import { useState, useEffect } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { CheckIcon, ListFilterPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { DateRange } from "@/lib/types/common";
import { DayPicker, CaptionProps } from "react-day-picker";
import "react-day-picker/dist/style.css";
import "@/app/ThaiDateRangeFilter.css";
import { useIsMobile } from "@/hooks/use-mobile";

interface DataTableDateRangeFilterProps<TData, TValue> {
  column: Column<TData, TValue>;
  title: string;
  options?: { label: string; value: string }[];
  dateFormat?: string;
}

interface CustomCaptionProps extends CaptionProps {
  onMonthChange: (newMonth: Date) => void;
}

function CustomCaption({ displayMonth, onMonthChange }: CustomCaptionProps) {
  const [selectedMonth, setSelectedMonth] = useState(displayMonth.getMonth());
  const [selectedYear, setSelectedYear] = useState(displayMonth.getFullYear());

  // อัปเดตเมื่อ displayMonth เปลี่ยน
  useEffect(() => {
    setSelectedMonth(displayMonth.getMonth());
    setSelectedYear(displayMonth.getFullYear());
  }, [displayMonth]);

  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(displayMonth);
    date.setMonth(i);
    return {
      value: i,
      label: format(date, "MMMM", { locale: th }),
    };
  });

  const years = Array.from({ length: 10 }, (_, i) => {
    const year = new Date().getFullYear() - 5 + i;
    return {
      value: year,
      label: year,
    };
  });

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const month = Number(event.target.value);
    setSelectedMonth(month);
    const newDate = new Date(displayMonth);
    newDate.setMonth(month);
    newDate.setFullYear(selectedYear);
    onMonthChange(newDate);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const year = Number(event.target.value);
    setSelectedYear(year);
    const newDate = new Date(displayMonth);
    newDate.setFullYear(year);
    newDate.setMonth(selectedMonth);
    onMonthChange(newDate);
  };

  return (
    <div className="rdp-caption">
      <div className="flex items-center justify-between w-full px-1">
        <select
          className="rdp-caption_select mr-1 bg-transparent border border-zinc-300 dark:border-zinc-700 rounded p-1 text-sm"
          value={selectedMonth}
          onChange={handleMonthChange}
        >
          {months.map((month) => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </select>
        <select
          className="rdp-caption_select bg-transparent border border-zinc-300 dark:border-zinc-700 rounded p-1 text-sm"
          value={selectedYear}
          onChange={handleYearChange}
        >
          {years.map((year) => (
            <option key={year.value} value={year.value}>
              {year.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export function DataTableDateRangeFilter<TData, TValue>({
  column,
  title,
  options = [],
  dateFormat = "dd/MM/yyyy",
}: DataTableDateRangeFilterProps<TData, TValue>) {
  const selected = column.getFilterValue() as string[] | undefined;
  const [customStart, setCustomStart] = useState<string>("");
  const [customEnd, setCustomEnd] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [activeCalendar, setActiveCalendar] = useState<"start" | "end" | null>(
    null
  );
  const [displayMonth, setDisplayMonth] = useState<Date>(new Date());
  const [selectedPreset, setSelectedPreset] = useState<string | undefined>(
    undefined
  );
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  // ฟังก์ชันแปลงและประมวลผลวันที่
  const formatThaiDate = (date: Date): string => {
    return format(date, dateFormat); // ใช้รูปแบบสากลโดยไม่ระบุ locale
  };

  // ฟังก์ชันจัดการเลือก preset
  const applyPreset = (value: string) => {
    setError("");
    const today = new Date();

    // ถ้ากดตัวเลือกเดิมซ้ำ ให้ล้างตัวกรอง
    if (selectedPreset === value) {
      clearFilter();
      setSelectedPreset(undefined); // ล้าง preset ที่เลือก
      return;
    }

    let newStartDate: Date | undefined;
    let newEndDate: Date | undefined;

    switch (value) {
      case DateRange.today:
        newStartDate = today;
        newEndDate = today;
        break;
      case DateRange.last7days:
        newStartDate = new Date(today);
        newStartDate.setDate(today.getDate() - 6);
        newEndDate = today;
        break;
      case DateRange.last30days:
        newStartDate = new Date(today);
        newStartDate.setDate(today.getDate() - 29);
        newEndDate = today;
        break;
      case DateRange.thismonth:
        newStartDate = startOfMonth(today);
        newEndDate = endOfMonth(today);
        break;
      case DateRange.thisyear:
        newStartDate = startOfYear(today);
        newEndDate = endOfYear(today);
        break;
      default:
        clearFilter();
        setSelectedPreset(undefined);
        return;
    }

    setStartDate(newStartDate);
    setEndDate(newEndDate);
    setCustomStart(formatThaiDate(newStartDate));
    setCustomEnd(formatThaiDate(newEndDate));
    setDisplayMonth(newStartDate);
    setSelectedPreset(value); // เก็บ preset ที่เลือก
    column.setFilterValue([
      formatThaiDate(newStartDate),
      formatThaiDate(newEndDate),
    ]);
  };

  // ฟังก์ชันใช้ช่วงวันที่ที่กำหนดเอง
  const applyCustomRange = () => {
    if (!startDate || !endDate) return;

    setError("");
    if (isAfter(startDate, endDate)) {
      setError("วันที่เริ่มต้องมาก่อนวันที่สิ้นสุด");
      return;
    }

    const formattedStart = formatThaiDate(startDate);
    const formattedEnd = formatThaiDate(endDate);
    column.setFilterValue([formattedStart, formattedEnd]);
    if (isMobile) {
      setOpen(false);
    }
    setSelectedPreset(undefined); // ล้าง preset เมื่อเลือกวันที่เอง
  };

  // ฟังก์ชันล้างตัวกรอง
  const clearFilter = () => {
    column.setFilterValue(undefined);
    setCustomStart("");
    setCustomEnd("");
    setStartDate(undefined);
    setEndDate(undefined);
    setError("");
    setActiveCalendar(null);
    setDisplayMonth(new Date());
    setSelectedPreset(undefined); // ล้าง preset ที่เลือก
    if (isMobile) {
      setOpen(false);
    }
  };

  // ฟังก์ชันจัดการเลือกวันที่
  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;

    if (activeCalendar === "start") {
      setStartDate(date);
      setCustomStart(formatThaiDate(date));
      setActiveCalendar("end");
    } else if (activeCalendar === "end") {
      setEndDate(date);
      setCustomEnd(formatThaiDate(date));
      setActiveCalendar(null);
    }
  };

  // ฟังก์ชันจัดการการเปลี่ยนเดือนและปี
  const handleMonthChange = (newMonth: Date) => {
    setDisplayMonth(newMonth);
  };

  // อัปเดตข้อมูลเมื่อ state เปลี่ยน
  useEffect(() => {
    if (startDate && endDate) {
      setCustomStart(formatThaiDate(startDate));
      setCustomEnd(formatThaiDate(endDate));
    }
  }, [startDate, endDate]);

  const maxDate = new Date(); // วันที่ปัจจุบัน (03:04 AM +07, Wednesday, May 21, 2025)

  return (
    <Popover open={open} onOpenChange={setOpen}>
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
                className="rounded-sm px-1 font-normal"
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
        className="w-[350px] p-1 sm:p-2 max-w-[calc(100vw-1px)] overflow-auto"
        align="start"
      >
        <Command>
          <CommandList className="max-h-[calc(100vh-200px)]">
            <CommandEmpty>ไม่พบข้อมูล</CommandEmpty>
            {options.length > 0 && (
              <CommandGroup className="p-1">
                {options.map(({ label, value }) => {
                  const isSelected = selectedPreset === value; // ใช้ selectedPreset ในการเปรียบเทียบ
                  return (
                    <CommandItem
                      key={value}
                      onSelect={() => applyPreset(value)}
                      className="text-xs px-2 py-1"
                    >
                      <div
                        className={cn(
                          "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "opacity-50 [&_svg]:invisible"
                        )}
                      >
                        <CheckIcon className={cn("h-4 w-4 text-background")} />
                      </div>
                      <span>{label}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            )}
            {options.length > 0 && <CommandSeparator className="my-2" />}
            <CommandGroup>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={activeCalendar === "start" ? "default" : "outline"}
                    size="sm"
                    className="h-8 w-full text-xs justify-start pl-2"
                    onClick={() => setActiveCalendar("start")}
                  >
                    {customStart || "เลือกวันที่เริ่ม"}
                  </Button>
                  <Button
                    variant={activeCalendar === "end" ? "default" : "outline"}
                    size="sm"
                    className="h-8 w-full text-xs justify-start pl-2"
                    onClick={() => setActiveCalendar("end")}
                  >
                    {customEnd || "เลือกวันที่สิ้นสุด"}
                  </Button>
                </div>

                {activeCalendar && (
                  <div className="calendar-container">
                    <DayPicker
                      mode="single"
                      selected={
                        activeCalendar === "start" ? startDate : endDate
                      }
                      onSelect={handleDateSelect}
                      month={displayMonth}
                      onMonthChange={handleMonthChange}
                      locale={th}
                      components={{
                        Caption: (props) => (
                          <CustomCaption
                            {...props}
                            onMonthChange={handleMonthChange}
                          />
                        ),
                      }}
                      toDate={maxDate}
                      fromDate={
                        activeCalendar === "end" && startDate
                          ? startDate
                          : undefined
                      }
                      disabled={{ after: maxDate }}
                      showOutsideDays
                      className="w-full text-xs sm:text-sm"
                    />
                  </div>
                )}

                {error && (
                  <div className="text-red-500 text-xs text-center">
                    {error}
                  </div>
                )}

                <Button
                  variant="default"
                  size="sm"
                  className="w-full h-8 text-xs"
                  disabled={!startDate || !endDate}
                  onClick={applyCustomRange}
                >
                  ใช้ช่วงวันที่
                </Button>
              </div>
            </CommandGroup>
            {(selected?.length || customStart || customEnd) && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={clearFilter}
                    className="justify-center text-center text-xs"
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
