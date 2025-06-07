import { useEffect, useState } from "react";
import { TableState } from "@/lib/types/common";

const defaultTableState: TableState = {
  pagination: { pageIndex: 0, pageSize: 10 },
  sorting: [],
  columnFilters: [],
  globalFilter: "",
  columnVisibility: {},
  rowSelection: {},
};

export const useTableState = (tableKey: string) => {
  const [tableState, setTableState] = useState<TableState>(defaultTableState);

  // โหลด state จาก localStorage ตอน component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTableState = localStorage.getItem(`${tableKey}_tableState`);
      if (storedTableState) {
        try {
          setTableState(JSON.parse(storedTableState));
        } catch (error) {
          console.error("Error parsing stored table state:", error);
          // ถ้า parse ไม่ได้ ให้ลบออกจาก localStorage
          localStorage.removeItem(`${tableKey}_tableState`);
        }
      }
    }
  }, [tableKey]);

  // บันทึกลง localStorage ทุกครั้งที่ state เปลี่ยน
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        `${tableKey}_tableState`,
        JSON.stringify(tableState)
      );
    }
  }, [tableKey, tableState]);

  return { tableState, setTableState };
};
