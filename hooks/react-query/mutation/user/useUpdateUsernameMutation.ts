import { useMutation } from "@tanstack/react-query";
import { updateUsername } from "@/lib/api/user.api";
import { getQueryClient } from "@/lib/utils";
import { toast } from "sonner";

export const useUpdateUsernameMutation = () => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: (body: { userId: string; username: string }) =>
      updateUsername(body.userId, body.username),
    onSuccess: (response) => {
      if (response.status === 200) {
        toast.success(response.message + " ✅" || "แก้ไขชื่อผู้ใช้สำเร็จ ✅");
        queryClient.invalidateQueries({ queryKey: ["user-me"] });
      } else {
        toast.error(
          response.message + " ❌" || "เกิดข้อผิดพลาดในการแก้ไขชื่อผู้ใช้ ❌"
        );
      }
    },
    onError: (error) => {
      console.error("Avatar update error:", error);
      toast.error("เกิดข้อผิดพลาดในการแก้ไขชื่อผู้ใช้ ❌");
    },
  });
};
