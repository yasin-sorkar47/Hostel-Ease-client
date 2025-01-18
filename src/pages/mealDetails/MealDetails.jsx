import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublick";

const MealDetails = () => {
  const axiosPublic = useAxiosPublic();
  const [like, setLike] = useState([]);
  const [isLike, setIsLike] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const { data: meal = {}, refetch } = useQuery({
    queryKey: ["meal", id],
    queryFn: async () => {
      const { data } = await axiosPublic(`/meal/${id}`);
      return data;
    },
  });

  useEffect(() => {
    // get localstorage data to disabled
    const likeData = localStorage.getItem("like");
    const parsedK = JSON.parse(likeData);
    setLike(parsedK);
    like?.map((i) => {
      if (i.user === user?.email && i.id === id) {
        setIsLike(true);
      } else {
        setIsLike(false);
      }
    });
  }, [id, user, isLike]);

  const {
    title,
    category,
    distributorName,
    description,
    distributorEmail,
    image,
    ingredients,
    price,
    postTime,
    _id,
    rating,
    likes,
    reviews_count,
  } = meal || {};

  // handle Like
  const handleLike = async () => {
    if (!user) {
      navigate("/login", { state: { from: location } });
      return;
    }

    try {
      const { data } = await axiosPublic.patch(`/links/${id}`);

      // set data to the localstorage for disabled start
      // Object to add
      const obj = {
        user: user?.email,
        id: id,
      };
      // Retrieve the existing array from localStorage
      const existingLikes = JSON.parse(localStorage.getItem("like")) || [];
      // Add the new object to the array
      existingLikes.push(obj);
      // Save the updated array back to localStorage
      localStorage.setItem("like", JSON.stringify(existingLikes));
      // set data to the localstorage for disabled start

      if (data.status) {
        // set true after clicking for disabled
        setIsLike(true);
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "You have liked on this meal.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // handler RequestMeal
  const handlerRequestMeal = async () => {
    // check user is logged in or not
    if (!user) {
      navigate("/login", { state: { from: location } });
      return;
    }

    // get subscription status
    try {
      const { data } = await axiosPublic(`/subscriptionStatus/${user?.email}`);
      if (data.status === "bronze") {
        Swal.fire({
          title: "requires a subscription package to request meal.",
          icon: "error",
          draggable: true,
        });
      } else {
        // request to the server side for meal
        const requestObj = {
          meal_title: title,
          meal_id: _id,
          likes: likes,
          reviews_count: reviews_count,
          user_email: user?.email,
          user_name: user?.displayName,
          request_status: "pending",
        };

        const { data } = await axiosPublic.post(`/mealRequest`, requestObj);
        if (data.insertedId) {
          Swal.fire({
            title: "Good job!",
            text: "You have successfully requested please waite for accepting!",
            icon: "success",
          });
        }

        try {
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      if (error.status === 400) {
        Swal.fire({
          title: "Error",
          text: `${error.response.data.message}`,
          icon: "error",
        });
      }
    }
  };

  // Handle new review submission
  const handleAddReview = async (e) => {
    e.preventDefault();
    const reviewValue = e.target.review.value;

    const review = {
      meal_title: title,
      user_email: user?.email,
      likes: likes,
      meal_id: _id,
      review: reviewValue,
    };

    try {
      const { data } = await axiosPublic.post(`/reviews`, review);
      if (data.insertedId) {
        refetch();
        e.target.reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "You have successfully reviewed",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Meal Image */}
        <img src={image} alt={title} className="w-full h-64 object-cover" />

        {/* Meal Details */}
        <div className="p-6">
          {/* Title and Category */}
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-gray-500 text-sm">Category: {category}</p>

          {/* Distributor Information */}
          <p className="mt-2 text-gray-700">
            Distributed by:{" "}
            <span className="font-medium">{distributorName}</span>
          </p>
          <p className="text-gray-500 text-sm">Contact: {distributorEmail}</p>

          {/* Description */}
          <h2 className="text-xl font-semibold mt-4">Description:</h2>
          <p className=" text-gray-800">{description}</p>

          {/* Ingredients */}
          <div className="mt-4">
            <h2 className="text-xl  font-semibold mb-2">Ingredients:</h2>
            <ul className="list-disc list-inside text-gray-700">
              {ingredients?.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>

          {/* Additional Info */}
          <div className="mt-6 flex flex-wrap items-center justify-between">
            <p className="text-lg font-semibold text-green-600">
              Price: ${price}
            </p>
            <p className="text-gray-500">Rating: {rating} ⭐</p>
            <p className="text-gray-500 text-sm">
              Posted on: {new Date(postTime).toLocaleDateString()}
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex gap-4">
            <button
              disabled={isLike}
              className="flex-1 py-2 px-4 disabled:cursor-not-allowed disabled:bg-blue-300 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={handleLike}
            >
              👍 Like ({likes})
            </button>
            <button
              className="flex-1 py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
              onClick={handlerRequestMeal}
            >
              Request Meal
            </button>
          </div>

          {/* Reviews Section */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">
              Reviews({reviews_count})
            </h2>

            {/* Add Review Form */}
            <form onSubmit={handleAddReview} className="mt-4">
              <textarea
                required
                name="review"
                className="w-full h-24 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write your review here..."
              ></textarea>
              <button
                type="submit"
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealDetails;
