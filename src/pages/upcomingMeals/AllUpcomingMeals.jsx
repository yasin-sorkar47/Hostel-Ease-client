import { useQuery } from "react-query";
import Swal from "sweetalert2";
import UpcomingMealCart from "../../components/UpcomingMealCart";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublick";

export default function AllUpcomingMeals() {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const { data: upcomingMeals = [], refetch } = useQuery({
    queryKey: ["upcomingMeals"],
    queryFn: async () => {
      const { data } = await axiosPublic("/upcoming-meals");
      return data;
    },
  });

  const handleLike = async (id) => {
    try {
      const { data } = await axiosPublic(`/subscriptionStatus/${user?.email}`);
      if (data.status === "bronze") {
        Swal.fire({
          title: "Opps!",
          text: "Only Premium (Silver/Gold/Platinum) users can Like!",
          icon: "error",
        });
        return;
      }

      console.log(id, data.userId);

      try {
        const { data: upcomingMealsLike } = await axiosPublic.post(
          `/upcoming-meals/${id}`,
          {
            userId: data.userId,
          }
        );

        refetch();

        Swal.fire({
          title: "Good Job!",
          text: `You Have successfully Liked`,
          icon: "success",
        });
      } catch (error) {
        Swal.fire({
          title: "Opps!",
          text: `${error.response.data.message}`,
          icon: "error",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <div className="text-center mb-8">
        <h1 className="text-2xl uppercase font-semibold mb-2">
          Upcoming Meals
        </h1>
        <p className="max-w-[550px] mx-auto text-sm lg:text-base">
          Credibly scale virtual outside the box thinking whereas B2C
          information. Quickly reintermediate low-risk high-yield value through.
        </p>
      </div>
      <div className="grid grid-cols-1 px-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 ">
        {upcomingMeals.length > 0 ? (
          upcomingMeals.map((upcomingMeal) => (
            <UpcomingMealCart
              handleLike={handleLike}
              upcomingMeal={upcomingMeal}
              key={upcomingMeal._id}
            />
          ))
        ) : (
          <div className="text-center">
            <p>Not Available</p>
          </div>
        )}
      </div>
    </div>
  );
}
