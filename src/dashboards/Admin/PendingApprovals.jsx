import React, { useEffect, useState } from "react";

const PendingApprovals = () => {
  const [fields, setFields] = useState([]);

  useEffect(() => {
    const allFields = JSON.parse(localStorage.getItem("fields")) || [];
    const pendingFields = allFields.filter((field) => field.status === "Pending");
    setFields(pendingFields);
  }, []);

  const handleApprove = (id) => {
    const allFields = JSON.parse(localStorage.getItem("fields")) || [];
    const updatedFields = allFields.map((field) =>
      field.id === id ? { ...field, status: "Approved" } : field
    );
    localStorage.setItem("fields", JSON.stringify(updatedFields));
    setFields(updatedFields.filter((field) => field.status === "Pending"));
  };

  const handleReject = (id) => {
    const allFields = JSON.parse(localStorage.getItem("fields")) || [];
    const updatedFields = allFields.map((field) =>
      field.id === id ? { ...field, status: "Rejected" } : field
    );
    localStorage.setItem("fields", JSON.stringify(updatedFields));
    setFields(updatedFields.filter((field) => field.status === "Pending"));
  };

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: "url('/images/trufGround.jpg')" }} // Ensure the image is placed correctly
    >
      {/* Dark Overlay for better readability */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Content Wrapper */}
      <div className="relative w-full max-w-6xl bg-white bg-opacity-90 backdrop-blur-md p-6 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-900">Pending Approvals</h1>

        {fields.length === 0 ? (
          <p className="text-gray-500 text-center">No pending approvals.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-lg shadow-lg">
              <thead className="bg-blue-700 text-white">
                <tr>
                  <th className="p-4 text-left">Field Name</th>
                  <th className="p-4 text-left">Owner</th>
                  <th className="p-4 text-left">Location</th>
                  <th className="p-4 text-left">Description</th>
                  <th className="p-4 text-left">Available Timings</th>
                  <th className="p-4 text-left">Price (₹/hr)</th>
                  <th className="p-4 text-left">Category</th>
                  <th className="p-4 text-left">Image</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {fields.map((field) => (
                  <tr key={field.id} className="border-b hover:bg-gray-100 transition duration-200">
                    <td className="p-4">{field.name}</td>
                    <td className="p-4">{field.ownerName}</td>
                    <td className="p-4">{field.location}</td>
                    <td className="p-4 truncate max-w-xs">{field.description}</td>
                    <td className="p-4">{field.timings.join(", ")}</td>
                    <td className="p-4 font-bold text-blue-600">₹{field.price}</td>
                    <td className="p-4">{field.category}</td>
                    <td className="p-4">
                      <img
                        src={field.image}
                        alt={field.name}
                        className="w-24 h-24 object-cover rounded-lg shadow-md border"
                      />
                    </td>
                    <td className="p-4 space-x-2">
                      <button
                        onClick={() => handleApprove(field.id)}
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(field.id)}
                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingApprovals;
