import React, { useEffect, useState } from 'react';

const TurfOwners = () => {
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    // Fetch field owners dynamically from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const fieldOwners = users.filter((user) => user.role === 'field-owner');
    setOwners(fieldOwners);
  }, []);

  return (
    <div 
      className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: "url('/images/trufGround.jpg')" }} // Update with your image path
    >
      {/* Dark Overlay for better readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content Wrapper */}
      <div className="relative w-full max-w-5xl text-center text-white py-8">
        <h1 className="text-3xl font-bold mb-6">Turf Owners Info</h1>

        {owners.length === 0 ? (
          <p className="text-gray-300">No turf owners found.</p>
        ) : (
          <div className="overflow-x-auto bg-white bg-opacity-90 backdrop-blur-md p-6 rounded-lg shadow-lg">
            <table className="w-full border-collapse text-gray-800">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Mobile</th>
                </tr>
              </thead>
              <tbody>
                {owners.map((owner, index) => (
                  <tr key={index} className="border-b hover:bg-blue-100 transition">
                    <td className="p-4">{owner.username}</td>
                    <td className="p-4">{owner.email}</td>
                    <td className="p-4">{owner.mobile}</td>
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

export default TurfOwners;
