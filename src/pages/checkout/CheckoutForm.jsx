import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import "./checkout.css";

const CheckoutForm = ({ price, badge }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getPaymentIntent();
  }, []);

  const getPaymentIntent = async () => {
    try {
      const { data } = await axiosSecure.post("/create-payment-intent", {
        price: price,
      });

      setClientSecret(data.clientSecret);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }

    // confirm payment
    const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: user?.displayName,
          email: user?.email,
        },
      },
    });

    if (paymentIntent?.status === "succeeded") {
      // make payment history
      const userInfo = {
        name: user?.displayName,
        email: user?.email,
        transactionId: paymentIntent.id,
        payment_method: paymentIntent.payment_method,
        badge,
      };
      try {
        const { data } = await axiosSecure.post("/payment-histories", userInfo);

        if (data.insertedId) {
          navigate("/");
          Swal.fire({
            title: "Good job!",
            text: "Your payment has been successful",
            icon: "success",
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        type="submit"
        className="font-bold uppercase text-white rounded-sm  px-6 py-1 bg-purple-600"
        disabled={!stripe}
      >
        Pay ${price}
      </button>
    </form>
  );
};

export default CheckoutForm;
