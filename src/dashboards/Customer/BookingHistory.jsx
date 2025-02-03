import React, { useEffect, useState } from 'react';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('bookings')) || [];
    setBookings(history);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Full Background Image with 'BOOKED' text */}
      <div className="relative w-full">
        <div className="relative">
          <div
            className="w-full h-64 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/booked.jpg')" }} // Ensure image is in public/images/
          ></div>
          {/* 'BOOKED' Label */}
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-8 py-3 font-bold text-3xl rounded-lg shadow-lg">
            BOOKED
          </div>
        </div>
      </div>

      {/* Content Wrapper */}
      <div className="relative w-full max-w-5xl text-center py-8">
        <h1 className="text-3xl font-bold mb-6">Booking History</h1>

        {bookings.length === 0 ? (
          <p className="text-gray-500">No booking history found.</p>
        ) : (
          <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-lg mt-6">
            <table className="w-full border-collapse text-gray-800">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="p-4">Field Name</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Price</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr key={index} className="border-b hover:bg-blue-100 transition">
                    <td className="p-4">{booking.fieldName}</td>
                    <td className="p-4">{booking.date}</td>
                    <td className="p-4 font-bold text-blue-600">₹{booking.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingHistory;
