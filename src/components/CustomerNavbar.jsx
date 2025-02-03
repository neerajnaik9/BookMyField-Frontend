import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CustomerNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <nav className="bg-purple-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          {/* Back Button */}
          <button 
            onClick={() => navigate(-1)} 
            className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded"
          >
            ← Back
          </button>
          <h1 className="text-xl font-bold">Customer Dashboard</h1>
        </div>
        <div>
          <Link to="/customer/homepage" className="px-4 hover:underline">Home</Link>
          <Link to="/customer/field-listings" className="px-4 hover:underline">Fields</Link>
          <Link to="/customer/booking-history" className="px-4 hover:underline">History</Link>
          <Link to="/customer/contact-us" className="px-4 hover:underline">Contact Us</Link>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default CustomerNavbar;
