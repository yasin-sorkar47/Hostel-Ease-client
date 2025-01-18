import { useQuery } from "react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

export default function useRole() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: role, isLoading } = useQuery({
    queryKey: ["role", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/users/role/${user?.email}`);
      return data.role;
    },
  });

  return [role, isLoading];
}
