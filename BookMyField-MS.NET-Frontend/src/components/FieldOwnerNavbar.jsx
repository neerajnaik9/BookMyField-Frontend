import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const FieldOwnerNavbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <nav className="bg-green-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center gap-4">
          {/* Back Button */}
          <button 
            onClick={() => navigate(-1)} 
            className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded"
          >
            ← Back
          </button>
          <h1 className="text-xl font-bold">Field Owner Dashboard</h1>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link to="/field-owner" className="hover:underline">Dashboard</Link>
          <Link to="/field-owner/add-field" className="hover:underline">Add Field</Link>
          <Link to="/field-owner/my-fields" className="hover:underline">My Fields</Link>
          <Link to="/field-owner/admin-approval" className="hover:underline">Approvals</Link>
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
        <div className="md:hidden flex flex-col items-center bg-green-700 py-4">
          <Link to="/field-owner" className="py-2 hover:underline">Dashboard</Link>
          <Link to="/field-owner/add-field" className="py-2 hover:underline">Add Field</Link>
          <Link to="/field-owner/my-fields" className="py-2 hover:underline">My Fields</Link>
          <Link to="/field-owner/admin-approval" className="py-2 hover:underline">Approvals</Link>
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

export default FieldOwnerNavbar;