export default function MyReviews() {
  return (
    <div className="px-4 md:px-8 lg:px-12 xl:px-14 mt-10">
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Meal Title</th>
              <th>Likes</th>
              <th>Review</th>
              <th>Edit</th>
              <th>Delete</th>
              <th>View Meal</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>jsf</td>
            </tr>

            {/* <tr>
                <td className="border  text-center text-xl" colSpan="9">
                   Not Found🥲
                 </td>
               </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
