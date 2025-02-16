import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const AdminNavbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <nav className="bg-blue-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center gap-4">
          {/* Back Button */}
          <button 
            onClick={() => navigate(-1)} 
            className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded"
          >
            ← Back
          </button>
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link to="/admin" className="hover:underline">Dashboard</Link>
          <Link to="/admin/turf-owners" className="hover:underline">Turf Owners</Link>
          <Link to="/admin/pending-approvals" className="hover:underline">Pending Approvals</Link>
          <Link to="/admin/customers-info" className="hover:underline">Customers</Link>
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
        <div className="md:hidden flex flex-col items-center bg-blue-700 py-4">
          <Link to="/admin" className="py-2 hover:underline">Dashboard</Link>
          <Link to="/admin/turf-owners" className="py-2 hover:underline">Turf Owners</Link>
          <Link to="/admin/pending-approvals" className="py-2 hover:underline">Pending Approvals</Link>
          <Link to="/admin/customers-info" className="py-2 hover:underline">Customers</Link>
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

export default AdminNavbar;
