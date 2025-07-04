import { useMutation } from "@tanstack/react-query";
import { imageBody } from "@/lib/types/common";
import { getQueryClient } from "@/lib/utils";
import { toast } from "sonner";
import { updateAvatar } from "@/lib/api/user.api";

export const useUpdateMyAvatarMutation = () => {
  const queryClient = getQueryClient();
  const tableKey = "users";

  return useMutation({
    mutationFn: (body: { imageId: string; imageData: imageBody }) =>
      updateAvatar(body.imageId, body.imageData),
    onSuccess: (response) => {
      if (response.status === 200) {
        toast.success(response.message + " ✅" || "แก้ไขภาพโปรไฟล์สำเร็จ ✅");
        queryClient.invalidateQueries({
          queryKey: ["user-me"],
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
