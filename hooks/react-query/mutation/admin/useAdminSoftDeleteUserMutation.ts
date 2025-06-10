import { useMutation } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/utils";
import { toast } from "sonner";
import { adminSoftDeleteUser } from "@/lib/api/admin.api";
import { useTableState } from "@/hooks/dataTable/useTableState";
import { useTableQueryKey } from "@/hooks/dataTable/useTableQueryKey";
import { Role } from "@/lib/types/user";
import { hasSuperAdminRole } from "@/lib/utils/permission";
import { superAdminSoftDeleteUser } from "@/lib/api/super.adminApi";

export const useAdminSoftDeleteUserMutation = () => {
  const queryClient = getQueryClient();
  const tableKey = "users";
  const { tableState } = useTableState(tableKey);
  const queryKey = useTableQueryKey("/admin/users", tableState);
  return useMutation({
    mutationFn: (body: { ids: string[]; roles: Role[] }) => {
      const isSuperAdmin = hasSuperAdminRole(body.roles);
      if (isSuperAdmin) {
        return superAdminSoftDeleteUser(body.ids);
      }
      return adminSoftDeleteUser(body.ids);
    },
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
