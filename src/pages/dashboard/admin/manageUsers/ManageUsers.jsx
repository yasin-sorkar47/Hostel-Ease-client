import { useState } from "react";
import { useQuery } from "react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

export default function ManageUsers() {
  const axiosSecure = useAxiosSecure();
  const [query, setQuery] = useState("");
  const { data: users = [] } = useQuery({
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
              users?.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.status}</td>
                  <td>
                    <button className="border px-4 py-1 border-purple-400">
                      Make Admin
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
