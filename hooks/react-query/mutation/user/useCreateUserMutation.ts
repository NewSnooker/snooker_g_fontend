import { useMutation } from "@tanstack/react-query";
import { imageBody, TableState } from "@/lib/types/common";
import { getQueryClient } from "@/lib/utils";
import { toast } from "sonner";
import { API_BASE_URL } from "@/lib/config/constant";
import { adminCreateUser } from "@/lib/api/admin.api";
import { UserSignUpProps } from "@/lib/types/user";
import { useState, useEffect } from "react";
import { deleteFileUploadthing } from "@/app/api/uploadthing/action";
import { deleteTempUpload } from "@/lib/api/common.api";
import { useRouter } from "next/navigation";

export const useCreateUserMutation = () => {
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
    mutationFn: (body: {
      user: UserSignUpProps & { image: imageBody };
      keyTemps: string[] | undefined;
    }) => adminCreateUser({ user: body.user }),
    onSuccess: async (response, variables) => {
      if (response.status === 201) {
        toast.success(response.message + " ✅");
        queryClient.invalidateQueries({ queryKey });
        if (variables.keyTemps) {
          await deleteFileUploadthing(variables.keyTemps);
        }
        await deleteTempUpload();
        router.push("/dashboard/user");
      } else {
        toast.error(response.message + " ❌");
      }
    },
    onError: (error) => {
      console.error("Avatar update error:", error);
      toast.error("เกิดข้อผิดพลาดในการสร้างผู้ใช้ ❌");
    },
  });
};
