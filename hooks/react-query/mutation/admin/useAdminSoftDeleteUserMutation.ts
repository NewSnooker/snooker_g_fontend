import { useMutation } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/utils";
import { toast } from "sonner";
import { adminSoftDeleteUser } from "@/lib/api/admin.api";
import { useTableState } from "@/hooks/table/useTableState";
import { useTableQueryKey } from "@/hooks/table/useTableQueryKey";

export const useAdminSoftDeleteUserMutation = () => {
  const queryClient = getQueryClient();
  const tableKey = "users";
  const { tableState } = useTableState(tableKey);
  const queryKey = useTableQueryKey("/admin/users", tableState);
  return useMutation({
    mutationFn: (body: { ids: string[] }) => adminSoftDeleteUser(body.ids),
    onSuccess: (response) => {
      if (response && response.status === 200) {
        toast.success(response.message + " ✅");
        queryClient.invalidateQueries({ queryKey });
      } else {
        toast.error(
          response?.message
            ? response.message + " ❌"
            : "เกิดข้อผิดพลาดในการลบผู้ใช้ ❌"
        );
      }
    },
  });
};
