import { motion } from "framer-motion";
import Lottie from "react-lottie";
import animationData from "../../../../public/hand.json";
import bannerImage from "../../../assets/banner.jpg";

export default function Banner() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      {/* Banner Section */}
      <motion.div
        className="relative h-96 lg:h-[500px] bg-cover  bg-center"
        style={{ backgroundImage: `url(${bannerImage})` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div>
            <div className="flex items-end gap-x-2">
              <h1 className="text-gray-100 text-4xl lg:text-5xl font-bold text-center uppercase ">
                Welcome To Hostel Ease{" "}
              </h1>
              <Lottie options={defaultOptions} height={70} width={70} />
            </div>
            <p className="max-w-[550px] text-center mx-auto mt-3 text-gray-300">
              Intrinsicly coordinate cross-platform data whereas market-driven
              intellectual capital. Professionally incubate excellent methods
            </p>
            <div className="text-center mt-3">
              <div className="join">
                <input
                  type="text"
                  className="input input-bordered join-item outline-none border-none"
                  placeholder="Search"
                />
                <button className="btn join-item ">Search</button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
