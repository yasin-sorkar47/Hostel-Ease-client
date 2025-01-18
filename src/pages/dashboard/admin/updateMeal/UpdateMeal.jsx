import { useQuery } from "react-query";
import { data, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import imageUpload from "../../../../utilities/imageUpload";

export default function UpdateMeal() {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: meal = {} } = useQuery({
    queryKey: ["meal", id],
    queryFn: async () => {
      const { data } = await axiosSecure(`/meal/${id}`);
      return data;
    },
  });

  const {
    title,
    distributorName,
    category,
    description,
    distributorEmail,
    image,
    ingredients,
    price,
    _id,
  } = meal || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const formData = Object.fromEntries(form.entries());

    // make the array
    formData.ingredients = formData.ingredients.split("\n");

    if (formData.image.size > 0) {
      // upload image to imgbb
      formData.image = await imageUpload([formData.image]);
      // change the image by actual url
      if (formData.image.status) {
        formData.image = formData?.image?.data?.data?.display_url;
      }
    } else {
      formData.image = image;
    }

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
      axiosSecure.put(`/meal/${_id}`, formData).then((res) => {
        // reset the form
        e.target.reset();
        // show notification to user
        if (res.data?.modifiedCount > 0) {
          navigate("/dashboard/all-meals");
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "You have successfully updated.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen  px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 lg:p-10 w-full max-w-4xl">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 text-center mb-6 lg:mb-8">
          Update Meal
        </h1>
        <form
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6"
          onSubmit={handleSubmit}
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
              defaultValue={title}
              name="title"
              placeholder="Enter the post title"
              className="border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col">
            <label
              htmlFor="category"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Category
            </label>
            {category && (
              <select
                id="category"
                name="category"
                defaultValue={category}
                className="border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option defaultValue=" Select a category">
                  Select a category
                </option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
              </select>
            )}
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
              defaultValue={ingredients?.join("\n")}
              rows="3"
              placeholder="Write list the ingredients here in multiple line"
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
              name="description"
              defaultValue={description}
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
              name="price"
              defaultValue={price}
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
              name="image"
              className="border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Distributor Name */}
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
              defaultValue={distributorName}
              readOnly
              className="bg-gray-100 border border-gray-300 rounded-md px-4 py-3 text-sm text-gray-600 cursor-not-allowed"
            />
          </div>

          {/* Distributor Email */}
          <div className="flex flex-col">
            <label
              htmlFor="distributorEmail"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Distributor Email
            </label>
            <input
              type="email"
              id="distributorEmail"
              name="distributorEmail"
              defaultValue={distributorEmail}
              readOnly
              className="bg-gray-100 border border-gray-300 rounded-md px-4 py-3 text-sm text-gray-600 cursor-not-allowed"
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-1 sm:col-span-2 flex justify-center">
            <button
              type="submit"
              className="bg-indigo-500 text-white font-medium px-6 py-3 rounded-md hover:bg-indigo-600 transition-all w-full sm:w-auto"
            >
              Submit Meal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
