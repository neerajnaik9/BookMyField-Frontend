import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const FieldOwnerNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <nav className="bg-green-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
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
        <div>
          <Link to="/field-owner" className="px-4 hover:underline">Dashboard</Link>
          <Link to="/field-owner/add-field" className="px-4 hover:underline">Add Field</Link>
          <Link to="/field-owner/my-fields" className="px-4 hover:underline">My Fields</Link>
          <Link to="/field-owner/admin-approval" className="px-4 hover:underline">Approvals</Link>
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

export default FieldOwnerNavbar;
