import { useMutation } from "@tanstack/react-query";
import { imageBody, TableState } from "@/lib/types/common";
import { getQueryClient } from "@/lib/utils";
import { toast } from "sonner";
import { updateAvatar } from "@/lib/api/user.api";
import { API_BASE_URL } from "@/lib/config/constant";
import { useEffect, useState } from "react";

export const useUpdateAvatarMutation = () => {
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
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTableState = localStorage.getItem(`${tableKey}_tableState`);
      if (storedTableState) {
        setTableState(JSON.parse(storedTableState));
      }
    }
  }, []);

  return useMutation({
    mutationFn: (body: { id: string; imageId: string; imageData: imageBody }) =>
      updateAvatar(body.imageId, body.imageData),
    onSuccess: (response, variables) => {
      if (response.status === 200) {
        toast.success(response.message + " ✅" || "แก้ไขภาพโปรไฟล์สำเร็จ ✅");
        queryClient.invalidateQueries({
          queryKey: [`user-${variables.id}`],
        });
      } else {
        toast.error(
          response.message + " ❌" || "เกิดข้อผิดพลาดในการแก้ไขภาพโปรไฟล์ ❌"
        );
      }
    },
    onError: (error) => {
      console.error("Avatar update error:", error);
      toast.error("เกิดข้อผิดพลาดในการแก้ไขภาพโปรไฟล์ ❌");
    },
  });
};
