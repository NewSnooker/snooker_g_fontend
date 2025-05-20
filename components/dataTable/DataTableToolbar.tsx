"use client";

import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableSelectFilter } from "./DataTableSelectFilter";
import { DataTableViewOptions } from "./DataTableViewOptions";
import Link from "next/link";
import { Download, FunnelX, Trash, X } from "lucide-react";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { DataTableDateRangeFilter } from "./DateRangeFilter";
import { FilterConfig } from "@/lib/types/filterConfig";
import { DataTableBooleanFilter } from "./DataTableBooleanFilter";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filterableColumns?: string[];
  filterConfig: FilterConfig;
  globalFilter: string;
  createPath?: string;
  titleText?: string;
  setGlobalFilter: (value: string) => void;
  onDownloadSelected?: (selectedRows: TData[]) => void;
  onDeleteSelected?: (selectedRows: TData[]) => void;
}

export function DataTableToolbar<TData>({
  table,
  filterableColumns = [],
  filterConfig,
  globalFilter,
  createPath,
  titleText,
  setGlobalFilter,
  onDownloadSelected,
  onDeleteSelected,
}: DataTableToolbarProps<TData>) {
  const isFiltered =
    table.getState().columnFilters.length > 0 || globalFilter !== "";
  const selectedRows = table.getSelectedRowModel().rows;

  const destructiveActionClass =
    "h-8 text-red-500 dark:text-white hover:text-red-600 bg-red-50 dark:bg-red-900 hover:bg-red-100 dark:hover:bg-red-800 border-dashed border-red-500 dark:border-red-400";

  return (
    <div className="flex flex-col gap-y-4 w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full">
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <Input
            placeholder={`ค้นหา${titleText}...` || "ค้นหา..."}
            value={globalFilter}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="h-8 w-full sm:w-[150px] lg:w-[250px]"
          />
          {filterableColumns.map((columnId) => {
            const column = table.getColumn(columnId);
            if (!column) return null;

            const cfg = filterConfig[columnId];
            if (!cfg) return null;

            switch (cfg.type) {
              case "select":
                return (
                  <DataTableSelectFilter
                    key={columnId}
                    column={column}
                    title={cfg.title}
                    options={cfg.options}
                  />
                );
              case "boolean":
                return (
                  <DataTableBooleanFilter
                    key={columnId}
                    column={column}
                    title={cfg.title}
                    options={cfg.options || []}
                  />
                );
              case "dateRange":
                return (
                  <DataTableDateRangeFilter
                    key={columnId}
                    column={column}
                    title={cfg.title}
                    options={cfg.options}
                    dateFormat={cfg.dateFormat}
                  />
                );
              case "text":
                return (
                  <Input
                    key={columnId}
                    placeholder={cfg.title}
                    value={(column.getFilterValue() as string) || ""}
                    onChange={(e) => column.setFilterValue(e.target.value)}
                    className="h-8 w-[150px] text-xs"
                  />
                );
              default:
                return null;
            }
          })}
          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => {
                table.resetColumnFilters();
                setGlobalFilter("");
              }}
              size="icon"
              className={destructiveActionClass}
            >
              <FunnelX className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2 mt-2 sm:mt-0 sm:ml-auto">
          {selectedRows.length > 0 && (
            <div className="flex flex-wrap items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  onDownloadSelected?.(selectedRows.map((row) => row.original))
                }
                className="h-8 border-dashed text-xs px-2 lg:px-3"
              >
                <Download className="h-4 w-4 mr-0.5" />
                <div className="hidden sm:block">ดาวน์โหลด</div>
                <Separator orientation="vertical" className="mx-2 h-4" />
                <Badge
                  variant="secondary"
                  className="rounded-sm px-1 font-normal"
                >
                  {selectedRows.length}
                </Badge>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  onDeleteSelected?.(selectedRows.map((row) => row.original))
                }
                className={`${destructiveActionClass} text-xs px-2 lg:px-3`}
              >
                <Trash className="h-4 w-4 mr-0.5" />
                <div className="hidden sm:block">ลบ</div>
                <Separator
                  orientation="vertical"
                  className="mx-2 h-4 bg-red-500 dark:bg-red-400"
                />
                <Badge
                  variant="secondary"
                  className="rounded-sm px-1 font-normal bg-red-400 dark:bg-red-400 text-white"
                >
                  {selectedRows.length}
                </Badge>
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  table.resetRowSelection();
                }}
                size="icon"
                className={`${destructiveActionClass} border-dashed`}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
          {createPath && titleText && (
            <Link href={createPath}>
              <Button variant="outline" size="sm" className="h-8">
                <PlusCircledIcon className="mr-0 sm:mr-0.5 h-4 w-4" />
                <div className="hidden sm:block">เพิ่ม{titleText}</div>
              </Button>
            </Link>
          )}
          <DataTableViewOptions table={table} />
        </div>
      </div>
    </div>
  );
}
