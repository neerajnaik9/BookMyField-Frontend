import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const turf = state?.turf;

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (!userRole || userRole !== 'customer') {
      alert('Please log in as a customer to access the payment page.');
      navigate('/login');
    }
  }, [navigate]);

  if (!turf) {
    return <p>No turf selected for booking.</p>;
  }

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (paymentMethod) => {
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      alert('Failed to load Razorpay SDK. Please try again later.');
      return;
    }

    const options = {
      key: 'YOUR_RAZORPAY_KEY',
      amount: turf.price * 100,
      currency: 'INR',
      name: 'Turf Booking',
      description: `Booking for ${turf.name}`,
      image: turf.image,
      handler: function (response) {
        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
        navigate('/customer/homepage');
      },
      prefill: {
        name: localStorage.getItem('username') || '',
        email: 'user@example.com',
        contact: '9999999999',
      },
      theme: {
        color: paymentMethod === 'Google Pay' ? '#4285F4' : '#6F32BE',
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: "url('/images/payment.jpg')" }} // Background image from public folder
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content Wrapper */}
      <div className="relative w-full max-w-5xl text-white py-8 text-center">
        <h1 className="text-3xl font-bold mb-6">Payment Page</h1>

        {/* Turf Details */}
        <div className="bg-white bg-opacity-90 backdrop-blur-md p-6 rounded-lg shadow-md max-w-md mx-auto text-gray-900">
          <img
            src={turf.image}
            alt={turf.name}
            className="w-full h-60 object-cover rounded mb-4"
          />
          <h2 className="text-xl font-bold">{turf.name}</h2>
          <p className="text-gray-600 mt-2">{turf.location}</p>
          <p className="mt-2">{turf.description}</p>
          <p className="text-gray-600 mt-2">Timings: {turf.timings.join(', ')}</p>
          <p className="text-lg font-bold mt-4 text-blue-600">₹{turf.price} per hour</p>
        </div>

        {/* Payment Options */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md mt-8 max-w-md mx-auto">
          <h2 className="text-lg font-bold mb-4 text-gray-900">Choose a Payment Method</h2>
          <div className="flex flex-col gap-4">
            <button
              onClick={() => handlePayment('Google Pay')}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
            >
              Pay with Google Pay
            </button>
            <button
              onClick={() => handlePayment('PhonePe')}
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition duration-300"
            >
              Pay with PhonePe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
