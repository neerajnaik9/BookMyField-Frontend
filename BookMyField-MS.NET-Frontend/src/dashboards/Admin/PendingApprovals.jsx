// import React, { useEffect, useState } from "react";

// const PendingApprovals = () => {
//   const [fields, setFields] = useState([]);

//   useEffect(() => {
//     const allFields = JSON.parse(localStorage.getItem("fields")) || [];
//     const pendingFields = allFields.filter((field) => field.status === "Pending");
//     setFields(pendingFields);
//   }, []);

//   const handleApprove = (id) => {
//     const allFields = JSON.parse(localStorage.getItem("fields")) || [];
//     const updatedFields = allFields.map((field) =>
//       field.id === id ? { ...field, status: "Approved" } : field
//     );
//     localStorage.setItem("fields", JSON.stringify(updatedFields));
//     setFields(updatedFields.filter((field) => field.status === "Pending"));
//   };

//   const handleReject = (id) => {
//     const allFields = JSON.parse(localStorage.getItem("fields")) || [];
//     const updatedFields = allFields.map((field) =>
//       field.id === id ? { ...field, status: "Rejected" } : field
//     );
//     localStorage.setItem("fields", JSON.stringify(updatedFields));
//     setFields(updatedFields.filter((field) => field.status === "Pending"));
//   };

//   return (
//     <div
//       className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center px-4 sm:px-6 lg:px-8"
//       style={{ backgroundImage: "url('/images/trufGround.jpg')" }} // Ensure the image is placed correctly
//     >
//       {/* Dark Overlay for better readability */}
//       <div className="absolute inset-0 bg-black bg-opacity-60"></div>

//       {/* Content Wrapper */}
//       <div className="relative w-full max-w-6xl bg-white bg-opacity-90 backdrop-blur-md p-6 rounded-lg shadow-xl">
//         <h1 className="text-3xl font-bold text-center mb-6 text-gray-900">Pending Approvals</h1>

//         {fields.length === 0 ? (
//           <p className="text-gray-500 text-center">No pending approvals.</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full border-collapse bg-white rounded-lg shadow-lg">
//               <thead className="bg-blue-700 text-white">
//                 <tr>
//                   <th className="p-4 text-left">Field Name</th>
//                   <th className="p-4 text-left">Owner</th>
//                   <th className="p-4 text-left">Location</th>
//                   <th className="p-4 text-left">Description</th>
//                   <th className="p-4 text-left">Available Timings</th>
//                   <th className="p-4 text-left">Price (₹/hr)</th>
//                   <th className="p-4 text-left">Category</th>
//                   <th className="p-4 text-left">Image</th>
//                   <th className="p-4 text-left">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {fields.map((field) => (
//                   <tr key={field.id} className="border-b hover:bg-gray-100 transition duration-200">
//                     <td className="p-4">{field.name}</td>
//                     <td className="p-4">{field.ownerName}</td>
//                     <td className="p-4">{field.location}</td>
//                     <td className="p-4 truncate max-w-xs">{field.description}</td>
//                     <td className="p-4">{field.timings.join(", ")}</td>
//                     <td className="p-4 font-bold text-blue-600">₹{field.price}</td>
//                     <td className="p-4">{field.category}</td>
//                     <td className="p-4">
//                       <img
//                         src={field.image}
//                         alt={field.name}
//                         className="w-24 h-24 object-cover rounded-lg shadow-md border"
//                       />
//                     </td>
//                     <td className="p-4 space-x-2">
//                       <button
//                         onClick={() => handleApprove(field.id)}
//                         className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300"
//                       >
//                         Approve
//                       </button>
//                       <button
//                         onClick={() => handleReject(field.id)}
//                         className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300"
//                       >
//                         Reject
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PendingApprovals;

import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PendingApprovals = () => {
  const [fields, setFields] = useState([]);

  // Fetch pending approvals from backend
  useEffect(() => {
    fetch("https://localhost:7280/api/admin/pending-approvals", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setFields(data))
      .catch((error) =>
        console.error("Error fetching pending approvals:", error)
      );
  }, []);

  // Handle Approve Field
  const handleApprove = async (id) => {
    try {
      const response = await fetch(
        `https://localhost:7280/api/admin/approve-field/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.ok) {
        setFields(fields.filter((field) => field.id !== id));
        toast.success("Field approved successfully!");
      } else {
        toast.error("Failed to approve field");
      }
    } catch (error) {
      toast.error("Error approving field");
    }
  };

  // Handle Reject Field
  const handleReject = async (id) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `https://localhost:7280/api/admin/reject-field/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        toast.success("Field rejected successfully!");
        setFields(fields.filter((field) => field.id !== id));
      } else {
        const errorData = await response.json();
        console.error("Error rejecting field:", errorData);
        toast.error(`Failed to reject field: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Request failed:", error);
      toast.error("Error rejecting field. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center bg-cover bg-center py-8"
      style={{ backgroundImage: "url('/images/trufGround.jpg')" }}
    >
      <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-6 w-11/12 max-w-6xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Pending Approvals
        </h1>
        {fields.length === 0 ? (
          <p className="text-gray-600 text-center">No pending approvals.</p>
        ) : (
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gradient-to-r from-blue-500 to-green-500 text-white">
                <th className="p-4 text-left">Field Name</th>
                <th className="p-4 text-left">Owner</th>
                <th className="p-4 text-left">Location</th>
                <th className="p-4 text-left">Description</th>
                <th className="p-4 text-left">Timings</th>
                <th className="p-4 text-left">Price (₹/hr)</th>
                <th className="p-4 text-left">Category</th>
                <th className="p-4 text-left">Image</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((field) => (
                <tr
                  key={field.id}
                  className="border-b hover:bg-gray-100 transition duration-200"
                >
                  <td className="p-4">{field.name}</td>
                  <td className="p-4">{field.ownerId}</td>
                  <td className="p-4">{field.location}</td>
                  <td className="p-4">{field.description}</td>
                  <td className="p-4">{field.availableTimings}</td>
                  <td className="p-4">₹{field.pricePerHour}</td>
                  <td className="p-4">{field.category}</td>
                  {/* <td className="p-4">
                    {field.imageUrl && <img src={`http://localhost:7280${field.imageUrl}`} alt="Field" className="w-20 h-20 object-cover rounded" />}
                  </td> */}
                  <td className="p-4 border border-gray-300">
                    {field.imageUrl ? (
                      <img
                        src={`https://localhost:7280${field.imageUrl}`}
                        alt="Field"
                        className="w-20 h-20 object-cover rounded shadow-md"
                        onError={(e) => {
                          e.target.src = "/images/placeholder.png";
                        }} // Fallback image
                      />
                    ) : (
                      <span className="text-gray-500">No Image</span>
                    )}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleApprove(field.id)}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300 mr-2"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(field.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default PendingApprovals;
