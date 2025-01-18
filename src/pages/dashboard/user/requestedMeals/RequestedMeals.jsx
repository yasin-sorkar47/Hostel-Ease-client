export default function RequestedMeals() {
  return (
    <div className="px-4 md:px-8 lg:px-12 xl:px-14 mt-10">
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
            <tr>
              <td>
                <button className="border px-4 py-1 border-purple-400">
                  Make Admin
                </button>
              </td>
            </tr>

            <tr>
              <td className="border  text-center text-xl" colSpan="9">
                Not Found🥲
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
