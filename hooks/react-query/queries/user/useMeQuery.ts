import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/lib/api/user.api";

export const useMeQuery = () => {
  return useQuery({
    queryKey: ["user-me"],
    queryFn: getMe,
  });
};
