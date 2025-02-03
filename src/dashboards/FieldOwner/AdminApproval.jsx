import React, { useEffect, useState } from "react";

const AdminApproval = () => {
  const [fields, setFields] = useState([]);

  useEffect(() => {
    const allFields = JSON.parse(localStorage.getItem("fields")) || [];
    setFields(allFields);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center bg-cover bg-center py-8"
      style={{ backgroundImage: "url('/images/admin_approval_background.jpg')" }}
    >
      <div className="bg-white bg-opacity-60 backdrop-blur-md rounded-lg shadow-lg p-6 w-11/12 max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Admin Approvals</h1>
        {fields.length === 0 ? (
          <p className="text-gray-600 text-center">No approvals to display.</p>
        ) : (
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gradient-to-r from-blue-500 to-green-500 text-white">
                <th className="p-4 text-left">Field Name</th>
                <th className="p-4 text-left">Approval Status</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((field) => (
                <tr key={field.id} className="even:bg-gray-50 odd:bg-white hover:bg-gray-100 transition duration-200">
                  <td className="p-4 border border-gray-300 font-medium text-gray-700">{field.name}</td>
                  <td className="p-4 border border-gray-300 text-gray-600">{field.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminApproval;
