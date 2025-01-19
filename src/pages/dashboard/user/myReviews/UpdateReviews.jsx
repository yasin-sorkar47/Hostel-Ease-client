import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

export default function UpdateReviews() {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { data: meal_review = {} } = useQuery({
    queryKey: ["review", id],
    queryFn: async () => {
      const { data } = await axiosSecure(`/review/${id}`);
      return data;
    },
  });

  const { review } = meal_review;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const review = e.target.review.value;
    try {
      const { data } = await axiosSecure.put(`/review/${id}`, { review });
      if (data.modifiedCount > 0) {
        navigate("/dashboard/my-reviews");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been updated",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-10">
      <h4 className="text-2xl text-center uppercase font-semibold mb-10">
        Update Your Review{" "}
      </h4>
      {/* Edit Review Form */}
      <form onSubmit={handleSubmit} className="mt-4">
        <textarea
          required
          name="review"
          defaultValue={review}
          className="w-full h-24 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write your review here..."
        ></textarea>
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Update Review
        </button>
      </form>
    </div>
  );
}
