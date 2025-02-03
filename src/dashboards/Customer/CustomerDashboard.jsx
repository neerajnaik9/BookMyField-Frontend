import React from "react";
import { useNavigate } from "react-router-dom";

const CustomerDashboard = () => {
  const navigate = useNavigate();

  // Sports categories
  const categories = [
    { name: "Cricket", image: "/images/cricket.jpg", path: "/cricket-turfs" },
    { name: "Football", image: "/images/football.jpg", path: "/football-turfs" },
    { name: "Basketball", image: "/images/basketball.jpg", path: "/basketball-turfs" },
    { name: "Badminton", image: "/images/badminton.jpg", path: "/badminton-turfs" },
  ];

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: "url('/images/customerdashboard.jpg')" }}
    >
      {/* Dark Overlay for better visibility */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content Wrapper */}
      <div className="relative w-full max-w-6xl text-center text-white">
        <h1 className="text-4xl font-bold mb-6">Explore Sports Categories</h1>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="p-6 bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-md text-center flex flex-col items-center h-64 transform transition duration-300 hover:scale-105 hover:shadow-lg"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-40 object-cover rounded-md mb-4 transition-transform duration-300 hover:opacity-90"
              />
              <h2 className="font-bold text-lg text-gray-900">{category.name}</h2>
              <button
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                onClick={() => navigate(category.path)}
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
