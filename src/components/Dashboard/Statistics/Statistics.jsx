import { useEffect, useState } from "react";

const Statistics = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);
  return (
    <div>
      <div className="mt-12">
        <div className="h-screen flex items-center justify-center bg-white">
          <h1
            className={`text-4xl md:text-6xl font-extrabold text-gray-800 tracking-wide text-center transition-all duration-1000 ${
              show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <span className="inline-flex items-center">
              Welcome to
              <span className="ml-3 animate-waving-hand text-5xl md:text-7xl">
                👋
              </span>
            </span>
            <br />
            <span className="relative text-indigo-600">
              Hostel Ease
              <span className="absolute left-0 -bottom-1 w-full h-1 bg-indigo-400 rounded-full animate-pulse"></span>
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
