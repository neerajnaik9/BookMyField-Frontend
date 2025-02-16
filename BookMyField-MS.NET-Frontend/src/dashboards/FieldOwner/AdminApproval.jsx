// import React, { useEffect, useState } from "react";

// const AdminApproval = () => {
//   const [fields, setFields] = useState([]);

//   useEffect(() => {
//     const allFields = JSON.parse(localStorage.getItem("fields")) || [];
//     setFields(allFields);
//   }, []);

//   return (
//     <div
//       className="min-h-screen flex flex-col items-center bg-cover bg-center py-8"
//       style={{ backgroundImage: "url('/images/admin_approval_background.jpg')" }}
//     >
//       <div className="bg-white bg-opacity-60 backdrop-blur-md rounded-lg shadow-lg p-6 w-11/12 max-w-4xl">
//         <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Admin Approvals</h1>
//         {fields.length === 0 ? (
//           <p className="text-gray-600 text-center">No approvals to display.</p>
//         ) : (
//           <table className="table-auto w-full border-collapse border border-gray-300">
//             <thead>
//               <tr className="bg-gradient-to-r from-blue-500 to-green-500 text-white">
//                 <th className="p-4 text-left">Field Name</th>
//                 <th className="p-4 text-left">Approval Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {fields.map((field) => (
//                 <tr key={field.id} className="even:bg-gray-50 odd:bg-white hover:bg-gray-100 transition duration-200">
//                   <td className="p-4 border border-gray-300 font-medium text-gray-700">{field.name}</td>
//                   <td className="p-4 border border-gray-300 text-gray-600">{field.status}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminApproval;



























// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const AdminApproval = () => {
//   const [fields, setFields] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:7280/api/fields/pending", {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => setFields(data))
//       .catch((error) => console.error("Error fetching fields:", error));
//   }, []);

//   const handleApprove = async (id) => {
//     try {
//       const response = await fetch(`http://localhost:7280/api/fields/approve/${id}`, {
//         method: "PUT",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       if (response.ok) {
//         setFields(fields.filter((field) => field.id !== id));
//         toast.success("Field approved successfully!");
//       } else {
//         toast.error("Failed to approve field.");
//       }
//     } catch (error) {
//       console.error("Error approving field:", error);
//       toast.error("Error approving field. Please try again.");
//     }
//   };

//   const handleReject = async (id) => {
//     try {
//       const response = await fetch(`http://localhost:7280/api/fields/reject/${id}`, {
//         method: "PUT",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       if (response.ok) {
//         setFields(fields.filter((field) => field.id !== id));
//         toast.success("Field rejected successfully!");
//       } else {
//         toast.error("Failed to reject field.");
//       }
//     } catch (error) {
//       console.error("Error rejecting field:", error);
//       toast.error("Error rejecting field. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center bg-cover bg-center py-8">
//       <div className="bg-white bg-opacity-60 backdrop-blur-md rounded-lg shadow-lg p-6 w-11/12 max-w-4xl">
//         <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Admin Approvals</h1>
//         {fields.length === 0 ? (
//           <p className="text-gray-600 text-center">No approvals to display.</p>
//         ) : (
//           <table className="table-auto w-full border-collapse border border-gray-300">
//             <thead>
//               <tr className="bg-gradient-to-r from-blue-500 to-green-500 text-white">
//                 <th className="p-4 text-left">Field Name</th>
//                 <th className="p-4 text-left">Location</th>
//                 <th className="p-4 text-left">Price</th>
//                 <th className="p-4 text-left">Status</th>
//                 <th className="p-4 text-left">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {fields.map((field) => (
//                 <tr key={field.id} className="even:bg-gray-50 odd:bg-white hover:bg-gray-100 transition duration-200">
//                   <td className="p-4 border border-gray-300">{field.name}</td>
//                   <td className="p-4 border border-gray-300">{field.location}</td>
//                   <td className="p-4 border border-gray-300">₹{field.pricePerHour}</td>
//                   <td className="p-4 border border-gray-300">{field.approvalStatus}</td>
//                   <td className="p-4 border border-gray-300">
//                     <button
//                       onClick={() => handleApprove(field.id)}
//                       className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300 mr-2"
//                     >
//                       Approve
//                     </button>
//                     <button
//                       onClick={() => handleReject(field.id)}
//                       className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
//                     >
//                       Reject
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminApproval;






























































// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const AdminApproval = () => {
//   const [fields, setFields] = useState([]);

//   // ✅ Fetch pending fields from the database
//   useEffect(() => {
//     fetch("https://localhost:7280/api/fields/my-fields", {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     })
    
//       .then((response) => response.json())
//       .then((data) => setFields(data))
//       .catch((error) => console.error("Error fetching fields:", error));
//   }, []);

//   // ✅ Approve a field
//   const handleApprove = async (id) => {
//     try {
//       const response = await fetch(`https://localhost:7280/api/fields/approve/${id}`, {
//         method: "PUT",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       if (response.ok) {
//         setFields(fields.filter((field) => field.id !== id));
//         toast.success("Field approved successfully!");
//       } else {
//         toast.error("Failed to approve field.");
//       }
//     } catch (error) {
//       console.error("Error approving field:", error);
//       toast.error("Error approving field. Please try again.");
//     }
//   };

//   // ✅ Reject a field
//   const handleReject = async (id) => {
//     try {
//       const response = await fetch(`https://localhost:7280/api/fields/reject/${id}`, {
//         method: "PUT",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       if (response.ok) {
//         setFields(fields.filter((field) => field.id !== id));
//         toast.success("Field rejected successfully!");
//       } else {
//         toast.error("Failed to reject field.");
//       }
//     } catch (error) {
//       console.error("Error rejecting field:", error);
//       toast.error("Error rejecting field. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center bg-cover bg-center py-8"
//       style={{ backgroundImage: "url('/images/admin_approval_background.jpg')" }}
//     >
//       <div className="bg-white bg-opacity-70 backdrop-blur-md rounded-lg shadow-lg p-6 w-11/12 max-w-5xl">
//         <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Admin Approvals</h1>
//         {fields.length === 0 ? (
//           <p className="text-gray-600 text-center">No approvals to display.</p>
//         ) : (
//           <table className="table-auto w-full border-collapse border border-gray-300">
//             <thead>
//               <tr className="bg-gradient-to-r from-blue-500 to-green-500 text-white">
//                 <th className="p-4 text-left">Field Name</th>
//                 <th className="p-4 text-left">Location</th>
//                 <th className="p-4 text-left">Price</th>
//                 <th className="p-4 text-left">Status</th>
//                 <th className="p-4 text-left">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {fields.map((field) => (
//                 <tr key={field.id} className="even:bg-gray-50 odd:bg-white hover:bg-gray-100 transition duration-200">
//                   <td className="p-4 border border-gray-300">{field.name}</td>
//                   <td className="p-4 border border-gray-300">{field.location}</td>
//                   <td className="p-4 border border-gray-300">₹{field.pricePerHour}</td>
//                   <td className="p-4 border border-gray-300 font-semibold text-yellow-600">{field.approvalStatus}</td>
//                   <td className="p-4 border border-gray-300">
//                     <button
//                       onClick={() => handleApprove(field.id)}
//                       className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300 mr-2"
//                     >
//                       Approve
//                     </button>
//                     <button
//                       onClick={() => handleReject(field.id)}
//                       className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
//                     >
//                       Reject
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminApproval;





























import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminApproval = () => {
  const [fields, setFields] = useState([]);

  // ✅ Fetch pending fields from the database
  useEffect(() => {
    fetch("https://localhost:7280/api/fields/my-fields", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setFields(data))
      .catch((error) => console.error("Error fetching fields:", error));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-cover bg-center py-8"
      style={{ backgroundImage: "url('/images/admin_approval_background.jpg')" }}
    >
      <div className="bg-white bg-opacity-70 backdrop-blur-md rounded-lg shadow-lg p-6 w-11/12 max-w-5xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Admin Approvals</h1>
        {fields.length === 0 ? (
          <p className="text-gray-600 text-center">No approvals to display.</p>
        ) : (
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gradient-to-r from-blue-500 to-green-500 text-white">
                <th className="p-4 text-left">Field Name</th>
                <th className="p-4 text-left">Location</th>
                <th className="p-4 text-left">Price</th>
                <th className="p-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((field) => (
                <tr key={field.id} className="even:bg-gray-50 odd:bg-white hover:bg-gray-100 transition duration-200">
                  <td className="p-4 border border-gray-300">{field.name}</td>
                  <td className="p-4 border border-gray-300">{field.location}</td>
                  <td className="p-4 border border-gray-300">₹{field.pricePerHour}</td>
                  <td className="p-4 border border-gray-300 font-semibold text-yellow-600">{field.approvalStatus}</td>
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
