import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import imageUpload from "../../../../utilities/imageUpload";

export default function AddUpcomingMeals({ setIsOpen, refetch }) {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    // upload image to imgbb
    data.image = await imageUpload(data.image);

    if (data?.image?.data?.status) {
      // change the image by actual url
      data.image = data?.image?.data?.data?.display_url;
      // add some extra value
      data.postTime = new Date();
      data.rating = 0;
      data.likes = 0;
      data.price = Number(data.price);
      data.reviews_count = 0;
      data.likedBy = [];

      // make inGredients an array
      data.ingredients = data.ingredients.split("\n");

      if (data.category === "Select a category") {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "please select a category.",
          showConfirmButton: false,
          timer: 1500,
        });

        return;
      }

      try {
        axiosSecure.post("/upcoming-meals", data).then((res) => {
          // reset the form
          reset();
          // show notification to user
          if (res.data?.insertedId) {
            refetch();
            setIsOpen(false);
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your work has been saved",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4">
      {/* Scrollable container */}
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl overflow-y-auto max-h-screen p-6 sm:p-8 lg:p-10">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 text-center mb-6 lg:mb-8">
          Add Upcoming Meal
        </h1>
        <form
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Title */}
          <div className="flex flex-col">
            <label
              htmlFor="title"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              {...register("title", { required: true })}
              name="title"
              placeholder="Enter the post title"
              className="border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col">
            <label
              htmlFor="category"
              className="text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              {...register("category", { required: true })}
              name="category"
              className="border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option defaultValue=" Select a category">
                Select a category
              </option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
            </select>
          </div>

          {/* Ingredients */}
          <div className="col-span-1 sm:col-span-2 flex flex-col">
            <label
              htmlFor="ingredients"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Ingredients
            </label>
            <textarea
              id="ingredients"
              name="ingredients"
              {...register("ingredients", { required: true })}
              rows="5"
              placeholder="List the ingredients here"
              className="border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            ></textarea>
          </div>

          {/* Description */}
          <div className="col-span-1 sm:col-span-2 flex flex-col">
            <label
              htmlFor="description"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              {...register("description", { required: true })}
              name="description"
              rows="3"
              placeholder="Provide a brief description"
              className="border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            ></textarea>
          </div>

          {/* Price */}
          <div className="flex flex-col">
            <label
              htmlFor="price"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              {...register("price", { required: true })}
              name="price"
              placeholder="Enter the price"
              className="border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Image Upload */}
          <div className="flex flex-col">
            <label
              htmlFor="image"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Upload Image
            </label>
            <input
              type="file"
              id="image"
              {...register("image", { required: true })}
              name="image"
              className="border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Distributor Info */}
          <div className="flex flex-col">
            <label
              htmlFor="distributorName"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Distributor Name
            </label>
            <input
              type="text"
              id="distributorName"
              name="distributorName"
              defaultValue={user?.displayName}
              {...register("distributorName", { required: true })}
              readOnly
              className="bg-gray-100 border border-gray-300 rounded-md px-4 py-3 text-sm text-gray-600 cursor-not-allowed"
            />
          </div>
          {/* Distributor Info */}
          <div className="flex flex-col">
            <label
              htmlFor="distributorName"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Distributor Email
            </label>
            <input
              type="text"
              id="distributorName"
              name="distributorName"
              defaultValue={user?.email}
              {...register("distributorEmail", { required: true })}
              readOnly
              className="bg-gray-100 border border-gray-300 rounded-md px-4 py-3 text-sm text-gray-600 cursor-not-allowed"
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-1 sm:col-span-2 flex justify-between items-center mt-5">
            <button
              type="submit"
              className="bg-indigo-500 text-white font-medium px-6 py-3 rounded-md hover:bg-indigo-600 transition-all w-full sm:w-auto"
            >
              Submit Meal
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="bg-pink-500 text-white font-medium px-6 py-3 rounded-md hover:bg-pink-600 transition-all w-full sm:w-auto"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
