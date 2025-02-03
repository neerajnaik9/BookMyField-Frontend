import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FieldListings = () => {
  const [fields, setFields] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const allFields = JSON.parse(localStorage.getItem('fields')) || [];
    const approvedFields = allFields.filter((field) => field.status === 'Approved');
    setFields(approvedFields);
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleBookNow = (field) => {
    const isLoggedIn = localStorage.getItem('userRole');
    if (isLoggedIn) {
      navigate('/payment', { state: { turf: field } });
    } else {
      alert('Please log in to proceed with booking.');
      navigate('/login');
    }
  };

  const filteredFields = fields.filter((field) =>
    field.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: "url('/images/field1.jpg')" }}
    >
      {/* Dark Overlay for better readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content Wrapper */}
      <div className="relative w-full max-w-6xl text-white py-8">
        {/* Header and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-center md:text-left">Available Turfs</h1>
          <div className="w-full md:w-1/3 mt-4 md:mt-0">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search by city..."
              className="w-full p-3 border rounded-md text-gray-800 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Turf Listings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredFields.length > 0 ? (
            filteredFields.map((field) => (
              <div
                key={field.id}
                className="p-6 bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-md text-center flex flex-col items-center transform transition duration-300 hover:scale-105 hover:shadow-lg"
              >
                {/* Image Display */}
                <img
                  src={field.image}
                  alt={field.name}
                  className="w-full h-40 object-cover rounded-md mb-4 transition-transform duration-300 hover:opacity-90"
                />
                <h2 className="text-lg font-bold text-gray-900">{field.name}</h2>
                <p className="text-gray-600">Location: {field.location}</p>
                <p className="text-gray-600 mt-1">
                  <span className="font-bold">Owner:</span> {field.ownerName}
                </p>
                <p className="text-gray-600 mt-1">
                  <span className="font-bold">Category:</span> {field.category}
                </p>
                <p className="text-gray-600 mt-1">
                  <span className="font-bold">Available Timings:</span> {field.timings.join(', ')}
                </p>
                <p className="text-lg font-bold mt-2 text-blue-600">₹{field.price} per hour</p>
                <button
                  onClick={() => handleBookNow(field)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 mt-4"
                >
                  Book Now
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-300 text-center">No turfs found for the search query.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FieldListings;
