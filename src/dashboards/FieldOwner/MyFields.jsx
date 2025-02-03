import React, { useEffect, useState } from 'react';

const MyFields = () => {
  const [fields, setFields] = useState([]);

  useEffect(() => {
    const allFields = JSON.parse(localStorage.getItem('fields')) || [];
    setFields(allFields);
  }, []);

  const handleDelete = (id) => {
    const allFields = JSON.parse(localStorage.getItem('fields')) || [];
    const updatedFields = allFields.filter((field) => field.id !== id);
    localStorage.setItem('fields', JSON.stringify(updatedFields));
    setFields(updatedFields);
    alert('Field deleted successfully!');
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center bg-cover bg-center py-8"
      style={{ backgroundImage: "url('/images/my_fields_background.jpg')" }}
    >
      <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-6 w-11/12 max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">My Fields</h1>
        {fields.length === 0 ? (
          <p className="text-gray-600 text-center">No fields added yet.</p>
        ) : (
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gradient-to-r from-blue-500 to-green-500 text-white">
                <th className="p-4 text-left">Field Name</th>
                <th className="p-4 text-left">Location</th>
                <th className="p-4 text-left">Price</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((field) => (
                <tr key={field.id} className="even:bg-gray-50 odd:bg-white hover:bg-gray-100 transition duration-200">
                  <td className="p-4 border border-gray-300 font-medium text-gray-700">{field.name}</td>
                  <td className="p-4 border border-gray-300 text-gray-600">{field.location}</td>
                  <td className="p-4 border border-gray-300 text-gray-600">&#8377;{field.price}</td>
                  <td className="p-4 border border-gray-300">
                    <button
                      onClick={() => handleDelete(field.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MyFields;
