import { useMutation } from "@tanstack/react-query";
import { TableState } from "@/lib/types/common";
import { getQueryClient } from "@/lib/utils";
import { toast } from "sonner";
import { API_BASE_URL } from "@/lib/config/constant";
import { adminUpdateUser } from "@/lib/api/admin.api";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UpdateUserBody } from "@/lib/types/user";

export const useUpdateUserMutation = () => {
  const router = useRouter();
  const queryClient = getQueryClient();
  const tableKey = "users";
  const [tableState, setTableState] = useState<TableState>({
    pagination: { pageIndex: 0, pageSize: 10 },
    sorting: [],
    columnFilters: [],
    globalFilter: "",
    columnVisibility: {},
    rowSelection: {},
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTableState = localStorage.getItem(`${tableKey}_tableState`);
      if (storedTableState) {
        setTableState(JSON.parse(storedTableState));
      }
    }
  }, []);

  const queryKey = [
    "table-data",
    `${API_BASE_URL}/admin/users`,
    tableState.pagination,
    tableState.sorting,
    tableState.columnFilters,
    tableState.globalFilter,
  ];

  return useMutation({
    mutationFn: (body: UpdateUserBody) => adminUpdateUser(body),
    onSuccess: async (response, variables) => {
      if (response.status === 200) {
        toast.success(response.message + " ✅");
        queryClient.invalidateQueries({ queryKey });
        queryClient.invalidateQueries({ queryKey: [`user-${variables.id}`] });
        router.push("/dashboard/user");
      } else {
        toast.error(response.message + " ❌");
      }
    },
    onError: (error) => {
      console.error("Avatar update error:", error);
      toast.error("เกิดข้อผิดพลาดในการแก้ไขผู้ใช้ ❌");
    },
  });
};
