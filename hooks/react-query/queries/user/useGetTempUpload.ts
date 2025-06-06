import { useQuery } from "@tanstack/react-query";
import { getTempUpload } from "@/lib/api/common.api";

export const useGetTempUpload = (isEditing: boolean = false) => {
  return useQuery({
    queryKey: ["temp-upload"],
    queryFn: getTempUpload,
    retry: 2,
    enabled: !isEditing,
  });
};
