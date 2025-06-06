import { useMutation } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/utils";
import { toast } from "sonner";
import { createTempUpload } from "@/lib/api/common.api";

export const useTempUploadMutation = () => {
  const queryClient = getQueryClient();
  return useMutation({
    mutationFn: (body: { key: string; name: string; url: string }) =>
      createTempUpload(body.key, body.name, body.url),
    onSuccess: (response) => {
      if (response.status === 200) {
        toast.success(response.message + " ✅");
        queryClient.invalidateQueries({ queryKey: ["temp-upload"] });
      } else {
        toast.error(response.message + " ❌");
      }
    },
  });
};
