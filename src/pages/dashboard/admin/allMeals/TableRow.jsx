import { FaEdit } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { Link } from "react-router-dom";

export default function TableRow({ meal, index, handleDelete }) {
  const { title, likes, reviews_count, distributorName, rating, _id } =
    meal || {};

  return (
    <tr>
      <th>{index + 1}</th>
      <td>{title}</td>
      <td className="text-center">{likes}</td>
      <td className="text-center">{rating}</td>
      <td className="text-center">{reviews_count}</td>
      <td>{distributorName}</td>
      <td>
        <Link to={`/dashboard/update-meal/${_id}`} className="text-xl">
          <FaEdit />
        </Link>
      </td>
      <td>
        <button
          onClick={() => handleDelete(_id)}
          className="text-3xl text-red-500"
        >
          <TiDelete />
        </button>
      </td>
      <td>
        <Link className="border px-4 py-1 border-purple-400">View Meal</Link>
      </td>
    </tr>
  );
}
