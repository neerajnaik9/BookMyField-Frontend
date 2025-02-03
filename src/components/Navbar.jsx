
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const WelcomeNavbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          {/* Back Button */}
          <button 
            onClick={() => navigate(-1)} 
            className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded"
          >
            ← Back
          </button>
          <h1 className="text-xl font-bold">BookMyField</h1>
        </div>
        <div>
          <Link to="/" className="px-4 hover:underline">Home</Link>
          <Link to="/about-us" className="px-4 hover:underline">About Us</Link>
          <Link to="/contact-us" className="px-4 hover:underline">Contact Us</Link>
          <Link to="/signup" className="px-4 hover:underline">Sign Up</Link>
          <Link to="/login" className="px-4 hover:underline">Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default WelcomeNavbar;
