import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useCamps from "../../Hooks/useCamps";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CheckOutForm = ({ campId: participantId }) => {
  const [error, setError] = useState(""); // Initialize error as an empty string
  const [clientSecret, setClientSecret] = useState(null); // Initialize clientSecret as null
  const [isProcessing, setIsProcessing] = useState(false); // To handle payment submission state
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [camps] = useCamps();
  const navigate = useNavigate();

  // Calculate total camp fees, default to 0 if camps is undefined
  const totalCampFees =
    camps?.reduce((total, camp) => total + camp.campFees, 0) || 0;

  useEffect(() => {
    if (totalCampFees > 0) {
      // Create Payment Intent when totalCampFees is valid
      axiosSecure
        .post("/create-payment-intent", { price: totalCampFees })
        .then((res) => {
          console.log("Client Secret:", res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        })
        .catch((err) => {
          console.error("Error creating payment intent:", err);
        });
    }
  }, [axiosSecure, totalCampFees]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true); // Disable button during processing
    setError(""); // Reset error state

    if (!stripe || !elements) {
      setError("Stripe has not loaded properly. Please try again.");
      setIsProcessing(false);
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setError("Card information is required.");
      setIsProcessing(false);
      return;
    }

    // Create Payment Method
    const { error: paymentMethodError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card,
      });

    if (paymentMethodError) {
      console.error("Payment Method Error:", paymentMethodError);
      setError(paymentMethodError.message);
      setIsProcessing(false);
      return;
    }

    console.log("Payment Method:", paymentMethod);

    // Confirm Payment
    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.error("Payment Confirmation Error:", confirmError);
      setError(confirmError.message || "Payment confirmation failed.");
      setIsProcessing(false);
      return;
    }

    console.log("Payment Intent:", paymentIntent);
    setError(""); // Clear error
    setIsProcessing(false);

    // Payment successful feedback (redirect or show message)
    toast.success("Payment successful! Thank you for your purchase.");
    navigate("/dashboard/paymentHistory");
    const payment = {
      email: user?.email,
      amount: totalCampFees,
      date: new Date(),
      transactionId: paymentIntent.id,
      participantId: participantId,
      status: "Paid",
    };
    const res = axiosSecure.post("/payment", payment);
    console.log(res);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Complete Your Payment
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="p-4 border border-gray-300 rounded-lg mb-5">
          <CardElement
            options={{
              style: {
                base: {
                  color: "#32325d",
                  fontFamily: "Arial, sans-serif",
                  fontSize: "16px",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#fa755a",
                  iconColor: "#fa755a",
                },
              },
              hidePostalCode: true,
            }}
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={!stripe || !clientSecret || isProcessing}
          className={`btn btn-primary w-full mt-4 ${
            isProcessing ? "opacity-50" : ""
          }`}
        >
          {isProcessing ? "Processing..." : "Pay"}
        </button>
      </form>
    </div>
  );
};

export default CheckOutForm;
