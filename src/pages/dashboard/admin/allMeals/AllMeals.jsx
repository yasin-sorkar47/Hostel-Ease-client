import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import TableRow from "./TableRow";

export default function AllMeals() {
  const axiosSecure = useAxiosSecure();

  /* for pagination  */
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [count, setCount] = useState(0);
  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  const { data: meals = [], refetch } = useQuery({
    queryKey: ["meals", currentPage, itemsPerPage],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/meals?page=${currentPage}&size=${itemsPerPage}`
      );
      return data;
    },
  });

  /* for pagination  */
  useEffect(() => {
    axiosSecure("/mealsCount").then((res) => {
      setCount(res.data.count);
    });
  }, []);

  /* for pagination  */

  const handleItemsPerPage = (e) => {
    const val = parseInt(e.target.value);
    setItemsPerPage(val);
    setCurrentPage(0);
  };

  /* for pagination  */

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  /* for pagination  */

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axiosSecure.delete(`/meal/${id}`).then((res) => {
            // show notification to user
            if (res.data?.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          });
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
              <th>Title</th>
              <th>Likes</th>
              <th>REviews_count</th>
              <th>Ratting</th>
              <th>Distributor's Name</th>
              <th>Update</th>
              <th>Delete</th>
              <th>View Meal</th>
            </tr>
          </thead>
          <tbody>
            {meals.length > 0 ? (
              meals.map((meal, index) => (
                <TableRow
                  handleDelete={handleDelete}
                  key={meal._id}
                  index={index}
                  meal={meal}
                />
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

        {/* for pagination  */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 p-4">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevPage}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-all"
            >
              Prev
            </button>

            {pages.map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-md transition-all ${
                  currentPage === page
                    ? "bg-blue-600 text-white font-semibold"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={handleNextPage}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-all"
            >
              Next
            </button>
          </div>

          <select
            value={itemsPerPage}
            onChange={handleItemsPerPage}
            className="px-4 py-2 border max-w-[100px] border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>
    </div>
  );
}
