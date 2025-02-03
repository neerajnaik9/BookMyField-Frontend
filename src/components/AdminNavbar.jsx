
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <nav className="bg-blue-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
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
        <div>
          <Link to="/admin" className="px-4 hover:underline">Dashboard</Link>
          <Link to="/admin/turf-owners" className="px-4 hover:underline">Turf Owners</Link>
          <Link to="/admin/pending-approvals" className="px-4 hover:underline">Pending Approvals</Link>
          <Link to="/admin/customers-info" className="px-4 hover:underline">Customers</Link>
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

export default AdminNavbar;
