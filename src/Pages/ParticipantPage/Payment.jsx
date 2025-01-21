import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import CheckOutForm from "./CheckOutForm";
import { useParams } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const Payment = () => {
  const { campId } = useParams(); // Destructure campId from params

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Payment with Stripe
      </h2>
      <Elements stripe={stripePromise}>
        <CheckOutForm campId={campId} /> {/* Pass campId as a prop */}
      </Elements>
    </div>
  );
};

export default Payment;
