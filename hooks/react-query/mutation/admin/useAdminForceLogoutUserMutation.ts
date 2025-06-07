import { useMutation } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/utils";
import { toast } from "sonner";
import { adminForceLogoutUser } from "@/lib/api/admin.api";
import { useTableState } from "@/hooks/dataTable/useTableState";
import { useTableQueryKey } from "@/hooks/dataTable/useTableQueryKey";

export const useAdminForceLogoutUserMutation = () => {
  const queryClient = getQueryClient();
  const tableKey = "users";
  const { tableState } = useTableState(tableKey);
  const queryKey = useTableQueryKey("/admin/users", tableState);

  return useMutation({
    mutationFn: (body: { ids: string[] }) => adminForceLogoutUser(body.ids),
    onSuccess: (response) => {
      if (response && response.status === 200) {
        toast.success(response.message + " ✅");
        queryClient.invalidateQueries({ queryKey });
      } else {
        toast.error(
          response?.message
            ? response.message + " ❌"
            : "เกิดข้อผิดพลาดในการออกจากระบบผู้ใช้ ❌"
        );
      }
    },
  });
};
