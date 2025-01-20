import { useState } from "react";
import { useQuery } from "react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import AddUpcomingMeals from "./AddModal";

export default function UpcomingMeals() {
  const [isOpen, setIsOpen] = useState(false);

  const axiosSecure = useAxiosSecure();

  const { data: upcomingMeals = [], refetch } = useQuery({
    queryKey: ["upcoming-meals-sorted"],
    queryFn: async () => {
      const { data } = await axiosSecure("/upcoming-meals-sorted");
      return data;
    },
  });

  const handlePublish = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do You Want To Publish This Meal!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, publish it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axiosSecure.post("/publish", { mealId: id });
          refetch();
          Swal.fire({
            title: "published!",
            text: "Your meal has been published.",
            icon: "success",
          });
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <div className="px-4 md:px-8 lg:px-12 xl:px-14 mt-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Upcoming Meals</h1>
        <button
          onClick={() => setIsOpen(true)}
          className="border px-4 py-1 border-purple-400 rounded-md"
        >
          Add Meal
        </button>
        {isOpen && <AddUpcomingMeals refetch={refetch} setIsOpen={setIsOpen} />}
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Likes</th>
              <th>Distributor's Name</th>
              <th>Distributor's Email</th>
              <th>Category</th>
              <th>Publish Action</th>
            </tr>
          </thead>
          <tbody>
            {upcomingMeals.length > 0 ? (
              upcomingMeals.map((meal, index) => (
                <tr key={meal._id}>
                  <th>{index + 1}</th>
                  <td>{meal.title}</td>
                  <td className="text-center">{meal.likes}</td>
                  <td>{meal.distributorName}</td>
                  <td>{meal.distributorEmail}</td>
                  <td>{meal.category}</td>
                  <td>
                    <button
                      onClick={() => handlePublish(meal._id)}
                      className="border px-4 py-1 border-purple-400"
                    >
                      Publish
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="border  text-center text-xl" colSpan="7">
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
