import { useState } from "react";
import { useQuery } from "react-query";
import MealsCart from "../../components/MealsCart";
import useAxiosPublic from "../../hooks/useAxiosPublick";

export default function Meals() {
  const axiosPublic = useAxiosPublic();
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [category, setCategory] = useState("");

  const { data: meals = [] } = useQuery({
    queryKey: ["all-meals", search, minPrice, maxPrice, category],
    queryFn: async () => {
      const { data } = await axiosPublic(
        `/all-meals?search=${search}&minPrice=${minPrice}&maxPrice=${maxPrice}&category=${category}`
      );
      return data;
    },
  });

  return (
    <div className="container mx-auto mt-10">
      <div className="text-center mb-8">
        <h1 className="text-2xl uppercase font-semibold mb-2">All Meals</h1>
        <p className="max-w-[550px] mx-auto text-sm lg:text-base">
          Credibly scale virtual outside the box thinking whereas B2C
          information. Quickly reintermediate low-risk high-yield value through.
        </p>
      </div>

      <div className="mb-8 md:px-8 flex flex-col lg:flex-row justify-between items-center">
        <label className="input input-bordered flex lg:mt-8 items-center gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            className="grow"
            placeholder="Search"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
        <div className="flex flex-col md:flex-row  items-center">
          <div className="flex flex-col md:flex-row  items-center mt-3 gap-x-3 mr-3">
            <label className="form-control w-full max-w-xs">
              <label htmlFor="minPrice">min-price</label>
              <label className="input input-bordered flex items-center ">
                <input
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  type="text"
                  className="grow"
                  placeholder="Search"
                />
              </label>
            </label>
            <label className="form-control w-full max-w-xs">
              <label htmlFor="minPrice">max-price</label>
              <label className="input input-bordered flex items-center ">
                <input
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  type="text"
                  className="grow"
                  placeholder="Search"
                />
              </label>
            </label>
          </div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Filter by category</span>
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="select select-bordered"
            >
              <option defaultValue=" select a category">
                select a category
              </option>
              <option value={"All"}>All Meals</option>
              <option value={"Breakfast"}>Breakfast</option>
              <option value={"Lunch"}>Lunch</option>
              <option value={"Dinner"}>Dinner</option>
            </select>
          </label>
        </div>
      </div>
      <div className="grid grid-cols-1 px-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 ">
        {/* all meals  */}
        {meals?.map((meal) => (
          <MealsCart key={meal._id} meal={meal} />
        ))}
      </div>
    </div>
  );
}
