export default function UpdateReviews() {
  return (
    <div className="mt-10">
      <h4 className="text-2xl text-center uppercase font-semibold mb-10">
        Update Your Review{" "}
      </h4>
      {/* Edit Review Form */}
      <form className="mt-4">
        <textarea
          required
          name="review"
          className="w-full h-24 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write your review here..."
        ></textarea>
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Update Review
        </button>
      </form>
    </div>
  );
}
