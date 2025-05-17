// คอมโพเนนต์สำหรับการแบ่งหน้า

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between px-2 gap-4">
      <div className="flex items-center space-x-2 order-last sm:order-none">
        <p className="text-sm font-medium">รายการต่อหน้า</p>
        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
          }}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent side="top">
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2 ">
        <Button
          variant="outline"
          className="h-4 w-4"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">ไปหน้าแรก</span>
          <DoubleArrowLeftIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">ไปหน้าก่อนหน้า</span>
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">ไปหน้าถัดไป</span>
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-4 w-4"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">ไปหน้าสุดท้าย</span>
          <DoubleArrowRightIcon className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium">หน้า</span>
        <Select
          value={`${table.getState().pagination.pageIndex + 1}`}
          onValueChange={(value) => {
            table.setPageIndex(Number(value) - 1);
          }}
        >
          <SelectTrigger className="h-8 w-16">
            <SelectValue placeholder="เลือกหน้า" className="text-right pr-2" />
          </SelectTrigger>
          <SelectContent side="top">
            {Array.from({ length: table.getPageCount() }, (_, i) => i + 1).map(
              (page) => (
                <SelectItem key={page} value={`${page}`}>
                  {page}
                </SelectItem>
              )
            )}
          </SelectContent>
        </Select>
        <span className="text-sm font-medium whitespace-nowrap">
          จาก {table.getPageCount()} หน้า
        </span>
      </div>
    </div>
  );
}
