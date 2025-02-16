
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
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

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/about-us" className="hover:underline">About Us</Link>
          <Link to="/contact-us" className="hover:underline">Contact Us</Link>
          <Link to="/signup" className="hover:underline">Sign Up</Link>
          <Link to="/login" className="hover:underline">Login</Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center bg-gray-700 py-4">
          <Link to="/" className="py-2 hover:underline">Home</Link>
          <Link to="/about-us" className="py-2 hover:underline">About Us</Link>
          <Link to="/contact-us" className="py-2 hover:underline">Contact Us</Link>
          <Link to="/signup" className="py-2 hover:underline">Sign Up</Link>
          <Link to="/login" className="py-2 hover:underline">Login</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
