import { Link } from "react-router-dom";

const MealsCart = ({ meal }) => {
  const { image, title, rating, price, _id } = meal;

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg border bg-white hover:shadow-xl transition-shadow duration-300">
      <img className="w-full h-48 object-cover" src={image} alt="Meal" />
      <div className="p-4 text-left">
        {" "}
        {/* Aligning text to the left */}
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-500 mb-2">Rating: {rating} ⭐</p>
        <p className="text-gray-700 font-semibold mb-4">Price: ${price}</p>
        <Link
          to={`/meal-details/${_id}`}
          className="bg-blue-500  text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
        >
          Details
        </Link>
      </div>
    </div>
  );
};

export default MealsCart;
