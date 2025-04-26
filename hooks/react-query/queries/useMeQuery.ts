import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/lib/api/userApi";

export const useMeQuery = () => {
  return useQuery({
    queryKey: ["user-me"],
    queryFn: getMe,
  });
};
