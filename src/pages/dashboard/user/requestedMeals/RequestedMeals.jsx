import { useQuery } from "react-query";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

export default function RequestedMeals() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: requestedMeals = [], refetch } = useQuery({
    queryKey: ["requested-meals", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/requested-meals/${user?.email}`);
      return data;
    },
  });

  const handleRequestCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel this request!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axiosSecure.patch(`/requested-meals/${id}`, {
          status: "canceled",
        });

        if (data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Your request has been canceled.",
            icon: "success",
          });
        }
      }
    });
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
                  <td
                    className={`${
                      meal.request_status === "canceled" && " text-red-600"
                    } ${
                      meal.request_status === "delivered" && " text-green-600"
                    }`}
                  >
                    {meal.request_status}
                  </td>
                  <td>
                    <button
                      disabled={meal.request_status !== "pending"}
                      onClick={() => handleRequestCancel(meal._id)}
                      className={`${
                        meal.request_status === "canceled" &&
                        "bg-red-200 text-red-600"
                      } ${
                        meal.request_status === "delivered" &&
                        "bg-green-200 text-green-600"
                      } border px-4 py-1 border-purple-400 disabled:cursor-not-allowed`}
                    >
                      {meal.request_status === "canceled"
                        ? "canceled"
                        : meal.request_status === "delivered"
                        ? "delivered"
                        : "cancel request"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="border  text-center text-xl" colSpan="6">
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
