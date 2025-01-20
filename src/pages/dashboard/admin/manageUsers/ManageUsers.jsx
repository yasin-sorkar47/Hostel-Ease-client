import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

export default function ManageUsers() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [query, setQuery] = useState("");

  /* for pagination  */
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [count, setCount] = useState(0);
  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users", query, currentPage, itemsPerPage],
    enabled: query.length === 0 || query.length > 0,
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/users?query=${query}&page=${currentPage}&size=${itemsPerPage}`
      );
      return data;
    },
  });

  /* for pagination  */
  useEffect(() => {
    axiosSecure("/usersCount").then((res) => {
      setCount(res.data.count);
    });
  }, []);

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const handleMakeAdmin = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do You Want To Make Admin This User!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axiosSecure.patch(`/user/${id}`, {
          role: "admin",
        });
        if (data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            title: "Made!",
            text: "You Have Successfully Made the User Admin.",
            icon: "success",
          });
        }
        try {
        } catch (error) {}
      }
    });
  };

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
              <th>name</th>
              <th>email</th>
              <th>Status</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users
                ?.filter((item) => item.email !== user?.email)
                .map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.status}</td>
                    <td>
                      <button
                        onClick={() => handleMakeAdmin(user._id)}
                        disabled={user.role === "admin"}
                        className={` ${
                          user.role === "admin" &&
                          "text-purple-600 bg-purple-200 disabled:cursor-not-allowed"
                        }  border px-4 py-1 border-purple-400`}
                      >
                        {user.role === "admin" ? "made admin" : "Make Admin"}
                      </button>
                    </td>
                  </tr>
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
