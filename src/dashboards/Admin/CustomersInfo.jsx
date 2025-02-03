import React, { useEffect, useState } from "react";

const CustomersInfo = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const storedCustomers = JSON.parse(localStorage.getItem("customers")) || [];
    setCustomers(storedCustomers);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-fixed bg-center bg-cover px-4 sm:px-6 lg:px-8 relative"
      style={{ backgroundImage: "url('/images/trufGround.jpg')" }} 
    >
      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content Wrapper */}
      <div className="relative w-full max-w-6xl bg-white bg-opacity-95 backdrop-blur-lg p-8 rounded-2xl shadow-2xl">
        <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-900 tracking-wide">
          Registered Customers
        </h1>

        {customers.length === 0 ? (
          <p className="text-center text-lg text-gray-600">No customers found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-white shadow-lg rounded-lg border border-gray-300">
              <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
                <tr>
                  <th className="p-4 text-left text-lg font-semibold">Username</th>
                  <th className="p-4 text-left text-lg font-semibold">Email</th>
                  <th className="p-4 text-left text-lg font-semibold">Mobile</th>
                  <th className="p-4 text-left text-lg font-semibold">Customer Name</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-300 hover:bg-blue-100 transition duration-300"
                  >
                    <td className="p-4 text-gray-800">{customer.username}</td>
                    <td className="p-4 text-gray-800">{customer.email}</td>
                    <td className="p-4 text-gray-800">{customer.mobile}</td>
                    <td className="p-4 text-gray-800">{customer.customerName}</td>
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

export default CustomersInfo;
