"use client";
import React, { useState, useEffect } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { debounce } from "lodash";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "./DataTablePagination";
import { DataTableToolbar } from "./DataTableToolbar";
import { FilterConfig } from "@/lib/types/filterConfig";

interface ApiResponse<TData> {
  data: TData[];
  pageCount: number;
  total: number;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  apiUrl: string;
  filterableColumns?: string[];
  filterConfig: FilterConfig;
  tableKey: string;
  createPath?: string;
  titleText?: string;
}

// ฟังก์ชันช่วยสำหรับจัดการ localStorage
const getStoredTableState = (tableKey: string) => {
  if (typeof window === "undefined") {
    return {
      columnFilters: [],
      globalFilter: "",
      sorting: [],
      columnVisibility: {},
      pagination: { pageIndex: 0, pageSize: 10 },
      rowSelection: {},
    };
  }
  const saved = localStorage.getItem(`${tableKey}_tableState`);
  return saved
    ? JSON.parse(saved)
    : {
        columnFilters: [],
        globalFilter: "",
        sorting: [],
        columnVisibility: {},
        pagination: { pageIndex: 0, pageSize: 10 },
        rowSelection: {},
      };
};

const saveTableState = (tableKey: string, state: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(`${tableKey}_tableState`, JSON.stringify(state));
  }
};

export function DataTable<TData extends { id: string }, TValue>({
  columns,
  apiUrl,
  filterableColumns = [],
  filterConfig,
  createPath,
  titleText,
  tableKey,
}: DataTableProps<TData, TValue>) {
  const [tableState, setTableState] = useState(() =>
    getStoredTableState(tableKey)
  );
  const [debouncedGlobalFilter, setDebouncedGlobalFilter] = useState(
    tableState.globalFilter
  );
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const debouncedSetGlobalFilter = debounce(setDebouncedGlobalFilter, 300);
    debouncedSetGlobalFilter(tableState.globalFilter);
    return () => debouncedSetGlobalFilter.cancel();
  }, [tableState.globalFilter]);

  const updateTableState = (newState: Partial<typeof tableState>) => {
    setTableState((prev: any) => {
      const updatedState = { ...prev, ...newState };
      saveTableState(tableKey, updatedState);
      return updatedState;
    });
  };

  const createQueryParams = () => {
    const params = new URLSearchParams();
    params.append("page", String(tableState.pagination.pageIndex + 1));
    params.append("pageSize", String(tableState.pagination.pageSize));

    // ส่ง sorting ไปยัง API
    if (tableState.sorting.length > 0) {
      params.append("sortBy", tableState.sorting[0].id);
      params.append("sortOrder", tableState.sorting[0].desc ? "desc" : "asc");
    }

    tableState.columnFilters.forEach(({ id, value }: any) => {
      const cfg = filterConfig[id];
      if (cfg) {
        const picked = cfg.pick(value);
        if (typeof picked === "object" && picked !== null) {
          Object.entries(picked).forEach(([key, val]) => {
            params.append(
              `${cfg.param}${key.charAt(0).toUpperCase() + key.slice(1)}`,
              val as string
            );
          });
        } else if (Array.isArray(picked)) {
          picked.forEach((item: string) => params.append(cfg.param, item));
        } else {
          params.append(cfg.param, picked as string);
        }
      } else {
        const val = Array.isArray(value) ? value[0] : value;
        params.append(id, String(val));
      }
    });

    if (debouncedGlobalFilter) {
      const sanitizedSearch = debouncedGlobalFilter.replace(/[<>{}]/g, "");
      params.append("search", sanitizedSearch);
    }
    return params.toString();
  };

  const {
    data: response,
    isLoading,
    error,
    isFetching,
  } = useQuery<ApiResponse<TData>>({
    queryKey: [
      "table-data",
      apiUrl,
      tableState.pagination,
      tableState.sorting,
      tableState.columnFilters,
      debouncedGlobalFilter,
    ],
    queryFn: async () => {
      const queryParams = createQueryParams();
      const res = await fetch(`${apiUrl}?${queryParams}`, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw {
          status: res.status,
          message: errorData.message || "เกิดข้อผิดพลาด",
        };
      }

      return res.json();
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  const data = response?.data || [];
  const pageCount = response?.pageCount || 0;
  // ฟังก์ชันสำหรับดาวน์โหลดข้อมูลที่เลือก
  const handleDownloadSelected = (selectedRows: TData[]) => {
    console.log("Downloading selected rows:", selectedRows);
    // ตัวอย่าง: สร้างไฟล์ CSV หรือส่งข้อมูลไป API
    // คุณสามารถปรับแต่งตามต้องการ เช่น เรียก API ดาวน์โหลด หรือสร้างไฟล์
  };

  // ฟังก์ชันสำหรับลบข้อมูลที่เลือก
  const handleDeleteSelected = async (selectedRows: TData[]) => {
    if (confirm(`คุณต้องการลบ ${selectedRows.length} รายการหรือไม่?`)) {
      const ids = selectedRows.map((row) => row.id);
      console.log("Deleting selected rows with IDs:", ids);
    }
  };
  const table = useReactTable({
    data,
    columns,
    pageCount,
    state: {
      sorting: tableState.sorting,
      columnVisibility: tableState.columnVisibility,
      rowSelection: tableState.rowSelection,
      columnFilters: tableState.columnFilters,
      globalFilter: debouncedGlobalFilter,
      pagination: tableState.pagination,
    },
    enableRowSelection: true,
    getRowId: (row) => row.id, // ใช้ id ของข้อมูลเป็น row ID
    onRowSelectionChange: (updater) => {
      const newRowSelection =
        typeof updater === "function"
          ? updater(tableState.rowSelection)
          : updater;
      updateTableState({ rowSelection: newRowSelection });
    },
    onSortingChange: (updater) => {
      const newSorting =
        typeof updater === "function" ? updater(tableState.sorting) : updater;
      updateTableState({ sorting: newSorting });
    },
    onColumnFiltersChange: (updater) => {
      const newColumnFilters =
        typeof updater === "function"
          ? updater(tableState.columnFilters)
          : updater;
      updateTableState({ columnFilters: newColumnFilters });
    },
    onGlobalFilterChange: (updater) => {
      const newGlobalFilter =
        typeof updater === "function"
          ? updater(tableState.globalFilter)
          : updater;
      updateTableState({ globalFilter: newGlobalFilter });
    },
    onColumnVisibilityChange: (updater) => {
      const newColumnVisibility =
        typeof updater === "function"
          ? updater(tableState.columnVisibility)
          : updater;
      updateTableState({ columnVisibility: newColumnVisibility });
    },
    onPaginationChange: (updater) => {
      const newPagination =
        typeof updater === "function"
          ? updater(tableState.pagination)
          : updater;
      updateTableState({ pagination: newPagination });
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    manualPagination: true,
    manualFiltering: true,
    manualSorting: true,
  });

  return (
    <div className="w-full space-y-4">
      <DataTableToolbar
        table={table}
        filterableColumns={filterableColumns}
        filterConfig={filterConfig}
        globalFilter={tableState.globalFilter}
        setGlobalFilter={(value) => updateTableState({ globalFilter: value })}
        createPath={createPath}
        titleText={titleText}
        onDownloadSelected={handleDownloadSelected}
        onDeleteSelected={handleDeleteSelected}
      />
      <div className="relative w-full ">
        <div className="rounded-md border overflow-x-auto max-w-[calc(100vw-2rem)]">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      onClick={
                        header.column.getCanSort()
                          ? () => header.column.toggleSorting()
                          : undefined
                      }
                      className={
                        header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : ""
                      }
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      {isClient && header.column.getCanSort() && (
                        <span>
                          {header.column.getIsSorted() === "asc"
                            ? " ↑"
                            : header.column.getIsSorted() === "desc"
                            ? " ↓"
                            : " ↕"}
                        </span>
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {isLoading || isFetching ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    <div className="flex justify-center items-center">
                      <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full mr-2"></div>
                      กำลังโหลดข้อมูล...
                    </div>
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    {(error as { status?: number })?.status === 404 ? (
                      <span>ไม่พบข้อมูล</span>
                    ) : (
                      <span className="text-red-500 dark:text-red-400">
                        เกิดข้อผิดพลาด:{" "}
                        {(error as any)?.message || "ไม่ทราบสาเหตุ"}
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    ไม่พบข้อมูล
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="px-1">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
