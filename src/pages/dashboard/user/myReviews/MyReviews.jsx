import { FaEdit } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

export default function MyReviews() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: reviews = [], refetch } = useQuery({
    queryKey: ["reviews", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/reviews/${user?.email}`);
      return data;
    },
  });

  const handleDelete = (id, meal_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axiosSecure.delete(
            `/reviews/${id}?meal_id=${meal_id}`
          );

          if (data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        } catch (error) {
          console.log(error);
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
              <th>Review</th>
              <th>Edit</th>
              <th>Delete</th>
              <th>View Meal</th>
            </tr>
          </thead>
          <tbody>
            {reviews?.length > 0 ? (
              reviews?.map((review, index) => (
                <tr key={review._id}>
                  <td>{index + 1}</td>
                  <td>{review.meal_title}</td>
                  <td>{review.likes}</td>
                  <td>{review.review}</td>
                  <td>
                    <Link
                      to={`/dashboard/my-reviews/edit/${review._id}`}
                      className="text-xl"
                    >
                      <FaEdit />
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(review._id, review.meal_id)}
                      className="text-3xl text-red-500"
                    >
                      <TiDelete />
                    </button>
                  </td>
                  <td>
                    <Link
                      to={`/meal-details/${review.meal_id}`}
                      className="border px-4 py-1 border-purple-400"
                    >
                      View Meal
                    </Link>
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
