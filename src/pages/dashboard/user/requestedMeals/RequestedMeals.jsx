import { useQuery } from "react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

export default function RequestedMeals() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: requestedMeals = [] } = useQuery({
    queryKey: ["requested-meals"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/requested-meals/${user?.email}`);
      return data;
    },
  });

  const handleRequestCancel = (id) => {
    console.log(id);
  };

  return (
    <div className="px-4 md:px-8 lg:px-12 xl:px-14 mt-10">
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Meal Title</th>
              <th>Likes</th>
              <th>Review Count</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requestedMeals?.length > 0 ? (
              requestedMeals?.map((meal, index) => (
                <tr key={meal._id}>
                  <td>{index + 1}</td>
                  <td>{meal.meal_title}</td>
                  <td>{meal.likes}</td>
                  <td>{meal.reviews_count}</td>
                  <td>{meal.request_status}</td>
                  <td>
                    <button
                      onClick={() => handleRequestCancel(meal._id)}
                      className="border px-4 py-1 border-purple-400"
                    >
                      cancel request
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="border  text-center text-xl" colSpan="9">
                  Not Found🥲
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
