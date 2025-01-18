import { useQuery } from "react-query";
import useAxiosPublic from "./useAxiosPublick";

export default function useMeals() {
  const axiosPublic = useAxiosPublic();

  const { data: meals = [] } = useQuery({
    queryKey: ["meals"],
    queryFn: async () => {
      const { data } = await axiosPublic("/meals");
      return data;
    },
  });
  return [meals];
}
