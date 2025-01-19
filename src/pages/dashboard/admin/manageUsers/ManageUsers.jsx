import { useState } from "react";
import { useQuery } from "react-query";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

export default function ManageUsers() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [query, setQuery] = useState("");
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users", query],
    enabled: query.length === 0 || query.length > 0,
    queryFn: async () => {
      const { data } = await axiosSecure(`/users?query=${query}`);
      return data;
    },
  });

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
      </div>
    </div>
  );
}
