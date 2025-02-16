import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const CustomerNavbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <nav className="bg-purple-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
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

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link to="/customer/homepage" className="hover:underline">Home</Link>
          <Link to="/customer/field-listings" className="hover:underline">Fields</Link>
          <Link to="/customer/booking-history" className="hover:underline">History</Link>
          <Link to="/customer/contact-us" className="hover:underline">Contact Us</Link>
        </div>
        
        <button
          onClick={handleLogout}
          className="hidden md:block bg-red-600 px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center bg-purple-700 py-4">
          <Link to="/customer/homepage" className="py-2 hover:underline">Home</Link>
          <Link to="/customer/field-listings" className="py-2 hover:underline">Fields</Link>
          <Link to="/customer/booking-history" className="py-2 hover:underline">History</Link>
          <Link to="/customer/contact-us" className="py-2 hover:underline">Contact Us</Link>
          <button
            onClick={handleLogout}
            className="bg-red-600 px-4 py-2 mt-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default CustomerNavbar;