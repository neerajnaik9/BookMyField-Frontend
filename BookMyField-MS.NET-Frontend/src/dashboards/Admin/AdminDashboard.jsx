import React from "react";
import { FaUsers, FaClipboardCheck, FaBuilding } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen bg-cover bg-center py-8"
      style={{ backgroundImage: "url('/images/admin_dashboard_background.jpg')" }}
    >
      <div className="container mx-auto px-4">
        {/* Welcome Section */}
        <div className="text-center text-white py-12">
          <h1 className="text-6xl font-extrabold drop-shadow-lg">Welcome to Admin Dashboard</h1>
          <p className="text-xl mt-4 drop-shadow-md">
            Manage customers, turf owners, and pending approvals efficiently.
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div
            onClick={() => navigate("/admin/customers-info")}
            className="cursor-pointer bg-gradient-to-br from-blue-400 to-blue-600 text-white p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 flex items-center space-x-4"
          >
            <FaUsers className="text-4xl" />
            <div>
              <h2 className="text-2xl font-bold">Customers</h2>
              <p className="text-lg mt-2">View and manage registered customers.</p>
            </div>
          </div>

          <div
            onClick={() => navigate("/admin/turf-owners")}
            className="cursor-pointer bg-gradient-to-br from-green-400 to-green-600 text-white p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 flex items-center space-x-4"
          >
            <FaBuilding className="text-4xl" />
            <div>
              <h2 className="text-2xl font-bold">Turf Owners</h2>
              <p className="text-lg mt-2">Manage turf owners and their fields.</p>
            </div>
          </div>

          <div
            onClick={() => navigate("/admin/pending-approvals")}
            className="cursor-pointer bg-gradient-to-br from-yellow-400 to-orange-500 text-white p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 flex items-center space-x-4"
          >
            <FaClipboardCheck className="text-4xl" />
            <div>
              <h2 className="text-2xl font-bold">Pending Approvals</h2>
              <p className="text-lg mt-2">Approve or reject field submissions.</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button
              onClick={() => navigate("/admin/customers-info")}
              className="bg-blue-500 text-white py-4 px-6 rounded-lg hover:bg-blue-600 transition duration-300 shadow-md flex items-center justify-center space-x-2"
            >
              <FaUsers className="text-xl" />
              <span>Manage Customers</span>
            </button>
            <button
              onClick={() => navigate("/admin/turf-owners")}
              className="bg-green-500 text-white py-4 px-6 rounded-lg hover:bg-green-600 transition duration-300 shadow-md flex items-center justify-center space-x-2"
            >
              <FaBuilding className="text-xl" />
              <span>Manage Turf Owners</span>
            </button>
            <button
              onClick={() => navigate("/admin/pending-approvals")}
              className="bg-yellow-500 text-white py-4 px-6 rounded-lg hover:bg-yellow-600 transition duration-300 shadow-md flex items-center justify-center space-x-2"
            >
              <FaClipboardCheck className="text-xl" />
              <span>View Approvals</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
