import { useMutation } from "@tanstack/react-query";
import { updateAvatar } from "@/lib/api/userApi";
import { imageUrlBody } from "@/lib/types/common";
import { getQueryClient } from "@/lib/utils";
import { toast } from "sonner";

export const useAvatarMutation = () => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: (body: { imageUrlId: string; imageData: imageUrlBody }) =>
      updateAvatar(body.imageUrlId, body.imageData),
    onSuccess: (response) => {
      if (response.status === 200) {
        toast.success(response.message + " ✅" || "แก้ไขภาพโปรไฟล์สำเร็จ ✅");
        queryClient.invalidateQueries({ queryKey: ["user-me"] });
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
