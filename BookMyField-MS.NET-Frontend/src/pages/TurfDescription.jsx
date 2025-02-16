import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const TrufDescription = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const field = state?.field;

  if (!field) {
    return <p>No turf selected.</p>;
  }

  const handlePayment = () => {
    navigate('/payment', { state: { turf: field } });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Turf Details</h1>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
        <img
          src={field.image}
          alt={field.name}
          className="w-full h-60 object-cover rounded mb-4"
        />
        <h2 className="text-xl font-bold">{field.name}</h2>
        <p className="text-gray-600 mt-2">{field.location}</p>
        <p className="mt-2">{field.description}</p>
        <p className="text-gray-600 mt-2">Timings: {field.timings.join(', ')}</p>
        <p className="text-lg font-bold mt-4">₹{field.price} per hour</p>
        <button
          onClick={handlePayment}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mt-6"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default TrufDescription;
