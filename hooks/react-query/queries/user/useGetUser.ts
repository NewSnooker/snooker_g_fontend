import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/lib/api/user.api";

export const useGetUserQuery = (id: string) => {
  return useQuery({
    queryKey: [`user-${id}`],
    queryFn: () => getUser(id),
    enabled: !!id,
    retry: 2,
  });
};
