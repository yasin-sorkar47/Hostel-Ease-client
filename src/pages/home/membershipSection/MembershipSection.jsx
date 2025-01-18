import React from "react";
import Lottie from "react-lottie";
import { Link } from "react-router-dom";
import animationData from "../../../../public/Silver.json";
import animationData1 from "../../../../public/gold.json";
import animationData2 from "../../../../public/platinuam.json";
const MembershipSection = () => {
  const silver = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const gold = {
    loop: true,
    autoplay: true,
    animationData: animationData1,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const platinuam = {
    loop: true,
    autoplay: true,
    animationData: animationData2,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="py-12 px-4 ">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold text-gray-900 mb-2">
          Choose Your Membership Package
        </h2>
        <p className="max-w-[550px] text-center mx-auto  text-sm md:text-base mb-8">
          {" "}
          Globally whiteboard. progressive total linkage. Energistically
          expedite open-source architectures vis-a-vis low-risk high-yield data.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Silver Package */}
          <Link>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="px-6 py-8 text-center">
                <div className="mb-4">
                  <Lottie options={silver} height={100} width={200} />
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-4   ">
                  <span className="bg-gray-400 text-white px-4 rounded-full uppercase font-semibold py-1">
                    Silver
                  </span>
                </h3>
                <p className="text-2xl font-bold text-gray-700 mb-4">
                  $19.99 / month
                </p>
                <p className="text-gray-600 mb-6">
                  Basic membership with limited features.
                </p>
              </div>
            </div>
          </Link>

          {/* Gold Package */}
          <Link>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="px-6 py-8 text-center">
                <div className="mb-4">
                  <Lottie options={gold} height={100} width={200} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  <span className="bg-yellow-500 text-white px-4 rounded-full uppercase font-semibold py-1">
                    Gold
                  </span>
                </h3>
                <p className="text-2xl font-bold text-gray-700 mb-4">
                  $39.99 / month
                </p>
                <p className="text-gray-600 mb-6">
                  Advanced membership with additional features.
                </p>
              </div>
            </div>
          </Link>

          {/* Platinum Package */}
          <Link>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="px-6 py-8 text-center">
                <div className="mb-4">
                  <Lottie options={platinuam} height={100} width={200} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  <span className="bg-green-500 text-white px-4 rounded-full uppercase font-semibold py-1">
                    Platinum
                  </span>
                </h3>
                <p className="text-2xl font-bold text-gray-700 mb-4">
                  $59.99 / month
                </p>
                <p className="text-gray-600 mb-6">
                  Premium membership with all features unlocked.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MembershipSection;
