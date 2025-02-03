import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlusSquare, FaClipboardList, FaCheckCircle } from "react-icons/fa";

const FieldOwnerDashboard = () => {
  const [statistics, setStatistics] = useState({
    totalFields: 0,
    pendingApprovals: 0,
    totalBookings: 0,
  });

  useEffect(() => {
    // Fetch data dynamically (replace with real API calls)
    const fetchData = async () => {
      const fields = JSON.parse(localStorage.getItem("fields")) || [];
      const approvals = fields.filter((field) => field.status === "pending").length;
      const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

      setStatistics({
        totalFields: fields.length,
        pendingApprovals: approvals,
        totalBookings: bookings.length,
      });
    };

    fetchData();
  }, []);

  const quickActions = [
    {
      title: "Add Field",
      path: "/field-owner/add-field",
      image: "/images/add_field.jpg",
      description: "Add new sports fields for booking.",
      icon: <FaPlusSquare className="text-3xl text-white" />,
    },
    {
      title: "My Fields",
      path: "/field-owner/my-fields",
      image: "/images/my_fields.jpg",
      description: "View and manage your listed fields.",
      icon: <FaClipboardList className="text-3xl text-white" />,
    },
    {
      title: "Admin Approvals",
      path: "/field-owner/admin-approval",
      image: "/images/admin_approval.jpg",
      description: "Track admin approval statuses.",
      icon: <FaCheckCircle className="text-3xl text-white" />,
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Hero Section */}
      <div
        className="bg-cover bg-center text-white h-[50vh] lg:h-[60vh] w-full lg:py-24"
        style={{
          backgroundImage: "url('/images/field_banner.jpg')",
        }}
      >
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-extrabold mb-4">Welcome, Field Owner!</h1>
          <p className="text-lg italic">"Manage your fields effortlessly."</p>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="container mx-auto py-8 px-4">
        <h2 className="text-3xl font-bold text-primary mb-6">Dashboard Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <h3 className="text-2xl font-bold text-primary">{statistics.totalFields}</h3>
            <p className="text-gray-600">Total Fields</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <h3 className="text-2xl font-bold text-primary">{statistics.pendingApprovals}</h3>
            <p className="text-gray-600">Pending Approvals</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <h3 className="text-2xl font-bold text-primary">{statistics.totalBookings}</h3>
            <p className="text-gray-600">Total Bookings</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="container mx-auto py-8 px-4 bg-gray-100">
        <h2 className="text-3xl font-bold text-primary mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.path}
              className="group block bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transform hover:scale-105 transition duration-300"
            >
              <div className="relative h-40">
                <img
                  src={action.image}
                  alt={action.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                  {action.icon}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-primary">{action.title}</h3>
                <p className="text-gray-600 mt-2">{action.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FieldOwnerDashboard;
