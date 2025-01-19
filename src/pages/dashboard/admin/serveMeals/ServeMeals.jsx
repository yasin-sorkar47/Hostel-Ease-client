import { useState } from "react";
import { useQuery } from "react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

export default function ServeMeals() {
  const axiosSecure = useAxiosSecure();
  const [query, setQuery] = useState("");
  const { data: requestedMeals = [], refetch } = useQuery({
    queryKey: ["requested-meals", query],
    queryFn: async () => {
      const { data } = await axiosSecure(`/requested-meals?query=${query}`);
      return data;
    },
  });

  const handleRequestServed = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to serve this request!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, serve it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axiosSecure.patch(`/requested-meals/${id}`, {
          status: "delivered",
        });

        if (data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Your serve has been delivered.",
            icon: "success",
          });
        }
      }
    });
  };

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="px-4 md:px-8 lg:px-12 xl:px-14 mt-10">
      <div className="mb-5">
        <input
          value={query}
          onChange={handleSearch}
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Meal Title</th>
              <th>User Email</th>
              <th>User Name</th>
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
                  <td>{meal.user_email}</td>
                  <td>{meal.user_name}</td>
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
                      onClick={() => handleRequestServed(meal._id)}
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
                        : "serve"}
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
