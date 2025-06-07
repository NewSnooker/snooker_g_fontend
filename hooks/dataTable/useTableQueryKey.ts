import { API_BASE_URL } from "@/lib/config/constant";
import { TableState } from "@/lib/types/common";
import { useMemo } from "react";

export const useTableQueryKey = (endpoint: string, tableState: TableState) => {
  return useMemo(
    () => [
      "table-data",
      `${API_BASE_URL}${endpoint}`,
      tableState.pagination,
      tableState.sorting,
      tableState.columnFilters,
      tableState.globalFilter,
    ],
    [endpoint, tableState]
  );
};
