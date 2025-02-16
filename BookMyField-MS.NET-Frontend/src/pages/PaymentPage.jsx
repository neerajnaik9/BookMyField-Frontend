import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentPage = () => {
  // const { state } = useLocation();
  const navigate = useNavigate();
  // const turf = state?.turf; // ✅ Ensure turf is correctly received

  const { state } = useLocation();
  const turf = state?.turf;
  const selectedDate = state?.date;
  const selectedTime = state?.time || "Full Day"; // ✅ Include selected time
  const selectedDuration = state?.duration;
  const amountToPay = turf.pricePerHour * selectedDuration; // Ensure correct price

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (!userRole || userRole !== "Customer") {
      alert("Please log in as a customer to access the payment page.");
      navigate("/login");
    }
  }, [navigate]);

  // ✅ Handle missing turf case
  if (!turf) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500 font-bold text-xl">
        No turf selected for booking.
      </div>
    );
  }

  // ✅ Ensure timings exist before calling .join()
  const availableTimings = Array.isArray(turf.availableTimings)
    ? turf.availableTimings.join(", ")
    : "No timings available";

  // ✅ Load Razorpay Payment SDK
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

 

// const handlePayment = async (paymentMethod) => {
//   const scriptLoaded = await loadRazorpayScript();
//   if (!scriptLoaded) {
//       alert('Failed to load Razorpay SDK. Please try again later.');
//       return;
//   }

//   try {
//       let bookingId = turf.id; // ✅ Existing Booking ID
//       if (!bookingId) {
//           // ✅ If no existing booking, create a new one
//           const createBookingResponse = await fetch('https://localhost:7280/api/customer/book-field', {
//               method: 'POST',
//               headers: {
//                   'Content-Type': 'application/json',
//                   Authorization: `Bearer ${localStorage.getItem('token')}`,
//               },
//               body: JSON.stringify({
//                   FieldId: turf.fieldId, 
//                   BookingDate: selectedDate,
//                   TimeSlot: selectedTime,
//                   Duration: selectedDuration,
//                   Price: turf.pricePerHour * selectedDuration,
//               }),
//           });

//           const bookingData = await createBookingResponse.json();
//           if (!createBookingResponse.ok) {
//               throw new Error(bookingData.message || 'Failed to create booking');
//           }
//           bookingId = bookingData.booking.id; // ✅ Get the new Booking ID
//       }

//       // ✅ Step 1: Create Razorpay Order
//       const createOrderResponse = await fetch('https://localhost:7280/api/payment/create-order', {
//           method: 'POST',
//           headers: {
//               'Content-Type': 'application/json',
//               Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//           body: JSON.stringify({
//               BookingId: bookingId, // ✅ Ensure a valid Booking ID
//               Amount: turf.pricePerHour * selectedDuration, // ✅ Ensure correct price
//               Currency: 'INR',
//           }),
//       });

//       const orderData = await createOrderResponse.json();

//       if (!createOrderResponse.ok) {
//           throw new Error(orderData.message || 'Failed to create order');
//       }

//       const options = {
//           key: 'rzp_test_IIva3ASPmbLTbc',
//           amount: orderData.amount * 100, 
//           currency: orderData.currency,
//           name: 'Turf Booking',
//           description: `Booking for ${turf.name}`,
//           image: `https://localhost:7280${turf.imageUrl}`, 
//           order_id: orderData.orderId,
//           handler: async function (response) {
//               // ✅ Step 2: Verify Payment
//               const verifyResponse = await fetch('https://localhost:7280/api/payment/verify-payment', {
//                   method: 'POST',
//                   headers: {
//                       'Content-Type': 'application/json',
//                       Authorization: `Bearer ${localStorage.getItem('token')}`,
//                   },
//                   body: JSON.stringify({
//                       BookingId: bookingId,
//                       PaymentId: response.razorpay_payment_id,
//                       OrderId: response.razorpay_order_id,
//                       Signature: response.razorpay_signature,
//                   }),
//               });

//               const verificationData = await verifyResponse.json();

//               if (verifyResponse.ok) {
//                   alert('Payment successful! Booking confirmed.');
//                   navigate('/customer/booking-history'); // ✅ Redirect to booking history
//               } else {
//                   alert('Payment verification failed. Contact support.');
//               }
//           },
//           prefill: {
//               name: localStorage.getItem('username') || '',
//               email: 'user@example.com',
//               contact: '9999999999',
//           },
//           theme: {
//               color: paymentMethod === 'Google Pay' ? '#4285F4' : '#6F32BE',
//           },
//       };

//       const razorpay = new window.Razorpay(options);
//       razorpay.open();
//   } catch (error) {
//       alert(`Payment error: ${error.message}`);
//   }
// };


const handlePayment = async (paymentMethod) => {
  const scriptLoaded = await loadRazorpayScript();
  if (!scriptLoaded) {
      alert('Failed to load Razorpay SDK. Please try again later.');
      return;
  }

  try {
      let bookingId = turf.id; // ✅ Existing Booking ID
      if (!bookingId) {
          // ✅ If no existing booking, create a new one
          const createBookingResponse = await fetch('https://localhost:7280/api/customer/book-field', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
              body: JSON.stringify({
                  FieldId: turf.fieldId, 
                  BookingDate: selectedDate,
                  TimeSlot: selectedTime,
                  Duration: parseInt(selectedDuration.split(" ")[0]), // ✅ Convert "2 Hours" to 2
                  Price: turf.pricePerHour * parseInt(selectedDuration.split(" ")[0]), // ✅ Correct price calculation
              }),
          });

          const bookingData = await createBookingResponse.json();
          if (!createBookingResponse.ok) {
              throw new Error(bookingData.message || 'Failed to create booking');
          }
          bookingId = bookingData.booking.id; // ✅ Get the new Booking ID
      }

      // ✅ Step 1: Create Razorpay Order
      const createOrderResponse = await fetch('https://localhost:7280/api/payment/create-order', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
              BookingId: bookingId, // ✅ Ensure a valid Booking ID
              Amount: turf.pricePerHour * parseInt(selectedDuration.split(" ")[0]), // ✅ Fix amount calculation
              Currency: 'INR',
          }),
      });

      const orderData = await createOrderResponse.json();

      if (!createOrderResponse.ok) {
          throw new Error(orderData.message || 'Failed to create order');
      }

      const options = {
          key: 'rzp_test_IIva3ASPmbLTbc',
          amount: orderData.amount * 100, 
          currency: orderData.currency,
          name: 'Turf Booking',
          description: `Booking for ${turf.name}`,
          image: `https://localhost:7280${turf.imageUrl}`, 
          order_id: orderData.orderId,
          handler: async function (response) {
              // ✅ Step 2: Verify Payment
              const verifyResponse = await fetch('https://localhost:7280/api/payment/verify-payment', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${localStorage.getItem('token')}`,
                  },
                  body: JSON.stringify({
                      BookingId: bookingId,
                      PaymentId: response.razorpay_payment_id,
                      OrderId: response.razorpay_order_id,
                      Signature: response.razorpay_signature,
                  }),
              });

              const verificationData = await verifyResponse.json();

              if (verifyResponse.ok) {
                  alert('Payment successful! Booking confirmed.');
                  navigate('/customer/booking-history'); // ✅ Redirect to booking history
              } else {
                  alert('Payment verification failed. Contact support.');
              }
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
  } catch (error) {
      alert(`Payment error: ${error.message}`);
  }
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
        <div className="bg-white bg-opacity-90 backdrop-blur-md p-6 rounded-lg shadow-md max-w-md mx-auto text-gray-900">
          <img
            src={`https://localhost:7280${turf.imageUrl}`}
            alt={turf.name}
            className="w-full h-60 object-cover rounded mb-4"
          />
          <h2 className="text-xl font-bold">{turf.name}</h2>
          <p className="text-gray-600 mt-2">{turf.location}</p>
          <p className="mt-2">{turf.description}</p>
          <p className="text-gray-600 mt-2">Timings: {selectedTime}</p>{" "}
          {/* ✅ Show selected time slot */}
          <p className="text-gray-600 mt-2">Date: {selectedDate}</p>{" "}
          {/* ✅ Show selected date */}
          <p className="text-gray-600 mt-2">
            Duration: {selectedDuration}
          </p>{" "}
          {/* ✅ Show selected duration */}
          <p className="text-lg font-bold mt-4 text-blue-600">
            ₹{turf.pricePerHour} per hour
          </p>
        </div>

        {/* Payment Options */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md mt-8 max-w-md mx-auto">
          <h2 className="text-lg font-bold mb-4 text-gray-900">
            Choose a Payment Method
          </h2>
          <div className="flex flex-col gap-4">
            <button
              onClick={() => handlePayment("Google Pay")}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
            >
              Pay with Google Pay
            </button>
            <button
              onClick={() => handlePayment("PhonePe")}
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






















