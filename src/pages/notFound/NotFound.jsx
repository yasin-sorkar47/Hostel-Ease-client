import { Link, useRouteError } from "react-router-dom";

export default function NotFound() {
  const err = useRouteError();

  return (
    <div className="bg-gradient-to-r from-green-200 to-green-400 min-h-screen flex flex-col justify-center items-center text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-yellow-500 mb-4">
          Oops! Page Not Found
        </h1>
        <p className="text-xl mb-3">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <p className="text-xl mb-3">{err?.error?.message}</p>
        <p className="text-xl mb-6">Status: {err?.status}</p>
        <Link
          to="/"
          className="bg-yellow-500 text-black px-6 py-3 rounded-full text-lg font-semibold mb-4"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
}
