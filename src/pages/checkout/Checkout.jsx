import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useParams } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  `${import.meta.env.VITE_STRIPE_PUBLIC_API_KEY}`
);

export default function Checkout() {
  const { badge } = useParams();
  let price =
    badge === "silver"
      ? "19.99"
      : badge === "gold"
      ? "39.99"
      : badge === "platinum"
      ? "59.99"
      : "N/N";

  return (
    <div>
      {badge === "silver" || badge === "gold" || badge === "platinum" ? (
        <div className="bg-gray-100  py-12">
          <div className="container mx-auto px-6 lg:px-20">
            <div className="bg-white shadow-lg rounded-lg p-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-4 capitalize">
                {badge} Membership
              </h1>
              <p className="text-lg text-gray-600 mb-6 capitalize">
                The Gold {badge} offers exclusive benefits for a comfortable and
                luxurious stay. Upgrade now to enjoy priority access to premium
                facilities.
              </p>

              <div className="text-xl font-semibold text-gray-800 mb-6">
                Price: <span className="text-blue-500">${price}/month</span>
              </div>

              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Benefits:
                </h2>
                {badge === "silver" && (
                  <ul className="list-disc pl-6 text-gray-600">
                    <li className="mb-2">Access to standard meals</li>
                    <li className="mb-2">Shared room options available</li>
                    <li className="mb-2">Basic event participation</li>
                    <li className="mb-2">Wi-Fi access (limited speed)</li>
                  </ul>
                )}
                {badge === "gold" && (
                  <ul className="list-disc pl-6 text-gray-600">
                    <li className="mb-2">Access to premium meals</li>
                    <li className="mb-2">Priority room selection</li>
                    <li className="mb-2">Monthly special events</li>
                    <li className="mb-2">Free Wi-Fi and laundry service</li>
                  </ul>
                )}
                {badge === "platinum" && (
                  <ul className="list-disc pl-6 text-gray-600">
                    <li className="mb-2">
                      Access to gourmet meals and custom meal plans
                    </li>
                    <li className="mb-2">
                      Private room with premium furnishings
                    </li>
                    <li className="mb-2">
                      Exclusive access to all events and activities
                    </li>
                    <li className="mb-2">
                      High-speed Wi-Fi and unlimited data
                    </li>
                    <li className="mb-2">
                      Complimentary laundry and housekeeping services
                    </li>
                    <li className="mb-2">
                      24/7 access to dedicated support and concierge services
                    </li>
                  </ul>
                )}
              </div>

              <h4 className="capitalize text-base font-bold mb-8">
                Pay For Getting {badge}:
              </h4>
              {/* checkout form  */}
              <Elements stripe={stripePromise}>
                <CheckoutForm price={price} badge={badge} />
              </Elements>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center mt-8 capitalize">
          <p className="text-4xl">Not Found your package</p>
        </div>
      )}
    </div>
  );
}
