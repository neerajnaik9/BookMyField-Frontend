import React from "react";

const RazorpayButton = ({ amount, onSuccess }) => {
  const handlePayment = async () => {
    const options = {
      key: "rzp_test_your_key", // Replace with your Razorpay key
      amount: amount * 100, // Amount in paise
      currency: "INR",
      name: "BookMyField",
      description: "Booking Payment",
      handler: (response) => {
        alert("Payment Successful!");
        onSuccess(response);
      },
      prefill: {
        name: "Your Name",
        email: "yourname@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <button
      onClick={handlePayment}
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    >
      Pay Now
    </button>
  );
};

export default RazorpayButton;
