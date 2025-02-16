// // edit functionality
// import React, { useEffect, useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const MyFields = () => {
//   const [fields, setFields] = useState([]);
//   const [editingFieldId, setEditingFieldId] = useState(null);
//   const [editData, setEditData] = useState({});

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

//   const handleEdit = (field) => {
//     setEditingFieldId(field.id);
//     setEditData({
//       name: field.name || "",
//       location: field.location || "",
//       pricePerHour: field.pricePerHour || 0,
//       availableTimings: field.availableTimings || "",
//       category: field.category || "",
//       description: field.description || "",
//       status: "Pending", // Status always remains Pending
//       image: null,
//     });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (name !== "status") {
//       setEditData((prevData) => ({
//         ...prevData,
//         [name]: name === "pricePerHour" ? parseFloat(value) || 0 : value,
//       }));
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setEditData((prevData) => ({ ...prevData, image: file }));
//     }
//   };

//   const handleSave = async (id) => {
//     const formData = new FormData();

//     Object.keys(editData).forEach((key) => {
//       if (editData[key] !== null && editData[key] !== undefined) {
//         formData.append(key, key === "pricePerHour" ? parseFloat(editData[key]) : editData[key]);
//       }
//     });

//     if (editData.image) {
//       formData.append("image", editData.image);
//     }

//     try {
//       const response = await fetch(`https://localhost:7280/api/fields/${id}`, {
//         method: "PUT",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: formData,
//       });

//       const result = await response.json();

//       if (response.ok) {
//         setFields((prevFields) =>
//           prevFields.map((field) =>
//             field.id === id ? { ...field, ...editData } : field
//           )
//         );
//         setEditingFieldId(null);
//         toast.success("Field updated successfully!");
//       } else {
//         toast.error(`Failed to update field: ${result.message || "Unknown error"}`);
//       }
//     } catch (error) {
//       toast.error("Error updating field. Please try again.");
//     }
//   };

//   const handleCancel = () => {
//     setEditingFieldId(null);
//     setEditData({});
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center bg-cover bg-center py-8">
//       <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-6 w-11/12 max-w-6xl">
//         <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">My Fields</h1>
//         {fields.length === 0 ? (
//           <p className="text-gray-600 text-center">No fields added yet.</p>
//         ) : (
//           <table className="table-auto w-full border-collapse border border-gray-300">
//             <thead>
//               <tr className="bg-gradient-to-r from-blue-500 to-green-500 text-white">
//                 <th className="p-4 text-left">Field Name</th>
//                 <th className="p-4 text-left">Location</th>
//                 <th className="p-4 text-left">Price</th>
//                 <th className="p-4 text-left">Timings</th>
//                 <th className="p-4 text-left">Category</th>
//                 <th className="p-4 text-left">Description</th>
//                 <th className="p-4 text-left">Status</th>
//                 <th className="p-4 text-left">Image</th>
//                 <th className="p-4 text-left">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {fields.map((field) => (
//                 <tr key={field.id} className="even:bg-gray-50 odd:bg-white hover:bg-gray-100 transition duration-200">
//                   {editingFieldId === field.id ? (
//                     <>
//                       <td className="p-4 border border-gray-300">
//                         <input type="text" name="name" value={editData.name} onChange={handleInputChange} className="p-2 border rounded w-full" />
//                       </td>
//                       <td className="p-4 border border-gray-300">
//                         <input type="text" name="location" value={editData.location} onChange={handleInputChange} className="p-2 border rounded w-full" />
//                       </td>
//                       <td className="p-4 border border-gray-300">
//                         <input type="number" name="pricePerHour" value={editData.pricePerHour} onChange={handleInputChange} className="p-2 border rounded w-full" />
//                       </td>
//                       <td className="p-4 border border-gray-300">
//                         <input type="text" name="availableTimings" value={editData.availableTimings} onChange={handleInputChange} className="p-2 border rounded w-full" />
//                       </td>
//                       <td className="p-4 border border-gray-300">
//                         <select name="category" value={editData.category} onChange={handleInputChange} className="p-2 border rounded w-full">
//                           <option value="Cricket">Cricket</option>
//                           <option value="Football">Football</option>
//                           <option value="Badminton">Badminton</option>
//                           <option value="Basketball">Basketball</option>
//                         </select>
//                       </td>
//                       <td className="p-4 border border-gray-300">
//                         <input type="text" name="description" value={editData.description} onChange={handleInputChange} className="p-2 border rounded w-full" />
//                       </td>
//                       <td className="p-4 border border-gray-300">
//                         <input type="text" name="status" value="Pending" disabled className="p-2 border rounded w-full bg-gray-200 cursor-not-allowed" />
//                       </td>
//                       <td className="p-4 border border-gray-300">
//                         <input type="file" accept="image/*" onChange={handleImageChange} className="p-2 border rounded w-full" />
//                       </td>
//                       <td className="p-4 border border-gray-300">
//                         <button onClick={() => handleSave(field.id)} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300 mr-2">Save</button>
//                         <button onClick={handleCancel} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300">Cancel</button>
//                       </td>
//                     </>
//                   ) : (
//                     <>
//                       <td className="p-4 border border-gray-300">{field.name}</td>
//                       <td className="p-4 border border-gray-300">{field.location}</td>
//                       <td className="p-4 border border-gray-300">{field.pricePerHour}</td>
//                       <td className="p-4 border border-gray-300">{field.availableTimings}</td>
//                       <td className="p-4 border border-gray-300">{field.category}</td>
//                       <td className="p-4 border border-gray-300">{field.description}</td>
//                       <td className="p-4 border border-gray-300">{field.approvalStatus}</td>
//                       <td className="p-4 border border-gray-300">{field.imageUrl && <img src={`http://localhost:7280${field.imageUrl}`} alt="Field" className="w-20 h-20 object-cover rounded" />}</td>
//                       <td className="p-4 border border-gray-300"><button onClick={() => handleEdit(field)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">Edit</button></td>
//                     </>
//                   )}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default MyFields;

import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyFields = () => {
  const [fields, setFields] = useState([]);
  const [editingFieldId, setEditingFieldId] = useState(null);
  const [editData, setEditData] = useState({});

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

  const handleEdit = (field) => {
    setEditingFieldId(field.id);
    setEditData({
      name: field.name || "",
      location: field.location || "",
      pricePerHour: field.pricePerHour || 0,
      availableTimings: field.availableTimings || "",
      category: field.category || "",
      description: field.description || "",
      status: "Pending", // Status always remains Pending
      image: null,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this field?")) return;

    try {
      const response = await fetch(`https://localhost:7280/api/fields/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        setFields((prevFields) =>
          prevFields.filter((field) => field.id !== id)
        );
        toast.success("Field deleted successfully!");
      } else {
        const errorData = await response.json();
        toast.error(`Failed to delete field: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error deleting field:", error);
      toast.error("Error deleting field. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name !== "status") {
      setEditData((prevData) => ({
        ...prevData,
        [name]: name === "pricePerHour" ? parseFloat(value) || 0 : value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditData((prevData) => ({ ...prevData, image: file }));
    }
  };

  const handleSave = async (id) => {
    const formData = new FormData();

    Object.keys(editData).forEach((key) => {
      if (editData[key] !== null && editData[key] !== undefined) {
        formData.append(
          key,
          key === "pricePerHour" ? parseFloat(editData[key]) : editData[key]
        );
      }
    });

    if (editData.image) {
      formData.append("image", editData.image);
    }

    try {
      const response = await fetch(`https://localhost:7280/api/fields/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setFields((prevFields) =>
          prevFields.map((field) =>
            field.id === id ? { ...field, ...editData } : field
          )
        );
        setEditingFieldId(null);
        toast.success("Field updated successfully!");
      } else {
        toast.error(
          `Failed to update field: ${result.message || "Unknown error"}`
        );
      }
    } catch (error) {
      toast.error("Error updating field. Please try again.");
    }
  };

  const handleCancel = () => {
    setEditingFieldId(null);
    setEditData({});
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-cover bg-center py-8">
      <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-6 w-11/12 max-w-6xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          My Fields
        </h1>
        {fields.length === 0 ? (
          <p className="text-gray-600 text-center">No fields added yet.</p>
        ) : (
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gradient-to-r from-blue-500 to-green-500 text-white">
                <th className="p-4 text-left">Field Name</th>
                <th className="p-4 text-left">Location</th>
                <th className="p-4 text-left">Price</th>
                <th className="p-4 text-left">Timings</th>
                <th className="p-4 text-left">Category</th>
                <th className="p-4 text-left">Description</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Image</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((field) => (
                <tr
                  key={field.id}
                  className="even:bg-gray-50 odd:bg-white hover:bg-gray-100 transition duration-200"
                >
                  {editingFieldId === field.id ? (
                    <>
                      <td className="p-4 border border-gray-300">
                        <input
                          type="text"
                          name="name"
                          value={editData.name}
                          onChange={handleInputChange}
                          className="p-2 border rounded w-full"
                        />
                      </td>
                      <td className="p-4 border border-gray-300">
                        <input
                          type="text"
                          name="location"
                          value={editData.location}
                          onChange={handleInputChange}
                          className="p-2 border rounded w-full"
                        />
                      </td>
                      <td className="p-4 border border-gray-300">
                        <input
                          type="number"
                          name="pricePerHour"
                          value={editData.pricePerHour}
                          onChange={handleInputChange}
                          className="p-2 border rounded w-full"
                        />
                      </td>
                      <td className="p-4 border border-gray-300">
                        <input
                          type="text"
                          name="availableTimings"
                          value={editData.availableTimings}
                          onChange={handleInputChange}
                          className="p-2 border rounded w-full"
                        />
                      </td>
                      <td className="p-4 border border-gray-300">
                        <select
                          name="category"
                          value={editData.category}
                          onChange={handleInputChange}
                          className="p-2 border rounded w-full"
                        >
                          <option value="Cricket">Cricket</option>
                          <option value="Football">Football</option>
                          <option value="Badminton">Badminton</option>
                          <option value="Basketball">Basketball</option>
                        </select>
                      </td>
                      <td className="p-4 border border-gray-300">
                        <input
                          type="text"
                          name="description"
                          value={editData.description}
                          onChange={handleInputChange}
                          className="p-2 border rounded w-full"
                        />
                      </td>
                      <td className="p-4 border border-gray-300">
                        <input
                          type="text"
                          name="status"
                          value="Pending"
                          disabled
                          className="p-2 border rounded w-full bg-gray-200 cursor-not-allowed"
                        />
                      </td>
                      <td className="p-4 border border-gray-300">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="p-2 border rounded w-full"
                        />
                      </td>
                      <td className="p-4 border border-gray-300">
                        <button
                          onClick={() => handleSave(field.id)}
                          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300 mr-2"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300"
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="p-4 border border-gray-300">
                        {field.name}
                      </td>
                      <td className="p-4 border border-gray-300">
                        {field.location}
                      </td>
                      <td className="p-4 border border-gray-300">
                        {field.pricePerHour}
                      </td>
                      <td className="p-4 border border-gray-300">
                        {field.availableTimings}
                      </td>
                      <td className="p-4 border border-gray-300">
                        {field.category}
                      </td>
                      <td className="p-4 border border-gray-300">
                        {field.description}
                      </td>
                      <td className="p-4 border border-gray-300">
                        {field.approvalStatus}
                      </td>
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

                      <td className="p-4 border border-gray-300  space-x-2 ">
                        <button
                          onClick={() => handleEdit(field)}
                          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(field.id)}
                          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
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

export default MyFields;
