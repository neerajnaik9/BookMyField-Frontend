// import React, { useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const AddField = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     location: "",
//     description: "",
//     timings: "",
//     price: "",
//     category: "Cricket",
//     ownerName: localStorage.getItem("username") || "Unknown Owner",
//     image: "",
//     status: "Pending",
//   });

//   const [errors, setErrors] = useState({});

//   const validate = () => {
//     const newErrors = {};

//     if (formData.name.length < 2 || formData.name.length > 20) {
//       newErrors.name = "Field Name must be between 2 and 20 characters.";
//     }

//     if (formData.location.length < 3 || formData.location.length > 25) {
//       newErrors.location = "Location must be between 3 and 25 characters.";
//     }

//     if (!formData.description) {
//       newErrors.description = "Description is required.";
//     }

//     if (formData.ownerName.length < 3 || formData.ownerName.length > 20) {
//       newErrors.ownerName = "Owner Name must be between 3 and 20 characters.";
//     }

//     if (!formData.image) {
//       newErrors.image = "Image is required.";
//     }

//     if (!formData.price || !/^[1-9]\d*$/.test(formData.price)) {
//       newErrors.price = "Price must be a positive integer without decimals.";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "price") {
//       if (value === "" || (/^\d*$/.test(value) && parseInt(value) >= 0)) {
//         setFormData({ ...formData, [name]: value });
//       }
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setFormData({ ...formData, image: reader.result });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!validate()) {
//       toast.error("Please correct the highlighted errors.");
//       return;
//     }

//     const fields = JSON.parse(localStorage.getItem("fields")) || [];
//     fields.push({
//       ...formData,
//       id: Date.now(),
//       timings: formData.timings.split(","),
//     });
//     localStorage.setItem("fields", JSON.stringify(fields));

//     toast.success(
//       `Field submitted for approval!\nPrice: ₹${formData.price} per hour\nCategory: ${formData.category}\nOwner: ${formData.ownerName}`
//     );

//     setFormData({
//       name: "",
//       location: "",
//       description: "",
//       timings: "",
//       price: "",
//       category: "Cricket",
//       ownerName: localStorage.getItem("username") || "Unknown Owner",
//       image: "",
//       status: "Pending",
//     });
//     setErrors({});
//   };

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center bg-cover bg-center"
//       style={{ backgroundImage: "url('/images/add_field_background.jpg')" }}
//     >
//       <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg max-w-2xl w-full">
//         <h1 className="text-3xl font-bold text-primary mb-6 text-center">
//           Add a New Field
//         </h1>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block mb-2 font-bold">Field Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className={`w-full px-4 py-2 border rounded-lg ${
//                 errors.name ? "border-red-500" : "border-gray-300"
//               } focus:outline-none focus:ring-2 focus:ring-primary`}
//             />
//             {errors.name && (
//               <p className="text-red-500 text-sm mt-1">{errors.name}</p>
//             )}
//           </div>

//           <div className="mb-4">
//             <label className="block mb-2 font-bold">Location</label>
//             <input
//               type="text"
//               name="location"
//               value={formData.location}
//               onChange={handleChange}
//               className={`w-full px-4 py-2 border rounded-lg ${
//                 errors.location ? "border-red-500" : "border-gray-300"
//               } focus:outline-none focus:ring-2 focus:ring-primary`}
//             />
//             {errors.location && (
//               <p className="text-red-500 text-sm mt-1">{errors.location}</p>
//             )}
//           </div>

//           <div className="mb-4">
//             <label className="block mb-2 font-bold">Description</label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               className={`w-full px-4 py-2 border rounded-lg ${
//                 errors.description ? "border-red-500" : "border-gray-300"
//               } focus:outline-none focus:ring-2 focus:ring-primary`}
//               rows="4"
//             ></textarea>
//             {errors.description && (
//               <p className="text-red-500 text-sm mt-1">{errors.description}</p>
//             )}
//           </div>

//           <div className="mb-4">
//             <label className="block mb-2 font-bold">
//               Available Timings (Comma Separated)
//             </label>
//             <input
//               type="text"
//               name="timings"
//               value={formData.timings}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
//               placeholder="e.g., 9:00 AM - 10:00 AM, 10:00 AM - 11:00 AM"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block mb-2 font-bold">Price (₹ per hour)</label>
//             <input
//               type="number"
//               name="price"
//               value={formData.price}
//               onChange={handleChange}
//               min="1"
//               step="1"
//               className={`w-full px-4 py-2 border rounded-lg ${
//                 errors.price ? "border-red-500" : "border-gray-300"
//               } focus:outline-none focus:ring-2 focus:ring-primary`}
//               placeholder="Enter positive integer only"
//             />
//             {errors.price && (
//               <p className="text-red-500 text-sm mt-1">{errors.price}</p>
//             )}
//           </div>

//           <div className="mb-4">
//             <label className="block mb-2 font-bold">Category</label>
//             <select
//               name="category"
//               value={formData.category}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
//             >
//               <option value="Cricket">Cricket</option>
//               <option value="Football">Football</option>
//               <option value="Badminton">Badminton</option>
//               <option value="Basketball">Basketball</option>
//             </select>
//           </div>

//           <div className="mb-4">
//             <label className="block mb-2 font-bold">Owner Name</label>
//             <input
//               type="text"
//               name="ownerName"
//               value={formData.ownerName}
//               onChange={handleChange}
//               className={`w-full px-4 py-2 border rounded-lg ${
//                 errors.ownerName ? "border-red-500" : "border-gray-300"
//               } focus:outline-none focus:ring-2 focus:ring-primary`}
//             />
//             {errors.ownerName && (
//               <p className="text-red-500 text-sm mt-1">{errors.ownerName}</p>
//             )}
//           </div>

//           <div className="mb-4">
//             <label className="block mb-2 font-bold">Upload Image</label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               className={`w-full px-4 py-2 border rounded-lg ${
//                 errors.image ? "border-red-500" : "border-gray-300"
//               }`}
//             />
//             {errors.image && (
//               <p className="text-red-500 text-sm mt-1">{errors.image}</p>
//             )}
//             {formData.image && (
//               <div className="mt-4">
//                 <img
//                   src={formData.image}
//                   alt="Preview"
//                   className="w-full h-40 object-cover rounded-lg shadow-md"
//                 />
//               </div>
//             )}
//           </div>

//           <div className="mt-6">
//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               Submit for Approval
//             </button>
//           </div>
//         </form>
//         <ToastContainer position="top-center" autoClose={3000} />
//       </div>
//     </div>
//   );
// };

// export default AddField;




















// import React, { useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const AddField = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     location: "",
//     description: "",
//     timings: "",
//     price: "",
//     category: "Cricket",
//     image: "",
//     status: "Pending",
//   });

//   const [imagePreview, setImagePreview] = useState(null); // ✅ State for Image Preview
//   const [errors, setErrors] = useState({});
//   const [successMessage, setSuccessMessage] = useState("");

//   const validate = () => {
//     const newErrors = {};

//     if (formData.name.length < 2 || formData.name.length > 20) {
//       newErrors.name = "Field Name must be between 2 and 20 characters.";
//     }

//     if (formData.location.length < 3 || formData.location.length > 25) {
//       newErrors.location = "Location must be between 3 and 25 characters.";
//     }

//     if (!formData.description) {
//       newErrors.description = "Description is required.";
//     }

//     if (!formData.image) {
//       newErrors.image = "Image is required.";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];

//     if (file) {
//       // ✅ Allowed image types
//       const allowedTypes = [
//         "image/jpeg",
//         "image/jpg",
//         "image/png",
//         "image/gif",
//         "image/bmp",
//         "image/webp",
//         "image/svg+xml",
//       ];

//       if (!allowedTypes.includes(file.type)) {
//         alert(
//           "Invalid image format. Please upload a JPEG, PNG, GIF, BMP, WebP, or SVG image."
//         );
//         return;
//       }

//       // ✅ Store file and generate preview
//       setFormData({ ...formData, image: file });
//       setImagePreview(URL.createObjectURL(file)); // ✅ Fix: Generate preview URL
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validate()) {
//       return;
//     }

//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("You must be logged in to add a field.");
//       return;
//     }

//     const fieldData = new FormData();
//     fieldData.append("Name", formData.name);
//     fieldData.append("Location", formData.location);
//     fieldData.append("Description", formData.description);
//     fieldData.append("AvailableTimings", formData.timings);
//     fieldData.append("PricePerHour", formData.price);
//     fieldData.append("Category", formData.category);

//     // ✅ Attach image as `File`
//     if (formData.image instanceof File) {
//       fieldData.append("Image", formData.image);
//     } else {
//       alert("Please upload a valid image file.");
//       return;
//     }

//     try {
//       const response = await fetch("https://localhost:7280/api/fields/add", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         body: fieldData,
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Failed to add field");
//       }

//       alert("Field submitted successfully!");
//     } catch (error) {
//       alert(`Error submitting field: ${error.message}`);
//     }
//   };

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center bg-cover bg-center"
//       style={{
//         backgroundImage: "url('/images/add_field_background.jpg')", // Replace with your background image path
//       }}
//     >
//       <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg max-w-2xl w-full">
//         <h1 className="text-3xl font-bold text-primary mb-6 text-center">
//           Add a New Field
//         </h1>
//         <form onSubmit={handleSubmit}>
//           {/* Field Name */}
//           <div className="mb-4">
//             <label className="block mb-2 font-bold">Field Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
//             />
//           </div>

//           {/* Location */}
//           <div className="mb-4">
//             <label className="block mb-2 font-bold">Location</label>
//             <input
//               type="text"
//               name="location"
//               value={formData.location}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
//             />
//           </div>

//           {/* Description */}
//           <div className="mb-4">
//             <label className="block mb-2 font-bold">Description</label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
//               rows="4"
//             ></textarea>
//           </div>

//           {/* Timings */}
//           <div className="mb-4">
//             <label className="block mb-2 font-bold">
//               Available Timings (Comma Separated)
//             </label>
//             <input
//               type="text"
//               name="timings"
//               value={formData.timings}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
//             />
//           </div>

//           {/* Price */}
//           <div className="mb-4">
//             <label className="block mb-2 font-bold">Price (₹ per hour)</label>
//             <input
//               type="number"
//               name="price"
//               value={formData.price}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
//             />
//           </div>

//           {/* Category */}
//           <div className="mb-4">
//             <label className="block mb-2 font-bold">Category</label>
//             <select
//               name="category"
//               value={formData.category}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
//             >
//               <option value="Cricket">Cricket</option>
//               <option value="Football">Football</option>
//               <option value="Badminton">Badminton</option>
//               <option value="Basketball">Basketball</option>
//             </select>
//           </div>

//           {/* Image Upload */}
//           <div className="mb-4">
//             <label className="block mb-2 font-bold">Upload Image</label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="w-full px-4 py-2 border rounded-lg"
//             />
//             {imagePreview && (
//               <div className="mt-4">
//                 <img
//                   src={imagePreview}
//                   alt="Preview"
//                   className="w-full h-40 object-cover rounded-lg shadow-md"
//                 />
//               </div>
//             )}
//           </div>

//           {/* Submit Button */}
//           <div className="mt-6">
//             <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300 shadow-lg">
//               Submit for Approval
//             </button>
//           </div>
//         </form>
//         <ToastContainer position="top-center" autoClose={3000} />
//       </div>
//     </div>
//   );
// };

// export default AddField;






import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddField = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    timings: "",
    price: "",
    category: "Cricket",
    image: "",
    status: "Pending",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (formData.name.length < 2 || formData.name.length > 20) {
      newErrors.name = "Field Name must be between 2 and 20 characters.";
    }

    if (formData.location.length < 3 || formData.location.length > 25) {
      newErrors.location = "Location must be between 3 and 25 characters.";
    }

    if (!formData.description) {
      newErrors.description = "Description is required.";
    }

    if (!formData.image) {
      newErrors.image = "Image is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/bmp",
        "image/webp",
        "image/svg+xml",
      ];

      if (!allowedTypes.includes(file.type)) {
        toast.error("Invalid image format. Please upload a valid image.");
        return;
      }

      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fix the validation errors before submitting.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to add a field.");
      return;
    }

    const fieldData = new FormData();
    fieldData.append("Name", formData.name);
    fieldData.append("Location", formData.location);
    fieldData.append("Description", formData.description);
    fieldData.append("AvailableTimings", formData.timings);
    fieldData.append("PricePerHour", formData.price);
    fieldData.append("Category", formData.category);

    if (formData.image instanceof File) {
      fieldData.append("Image", formData.image);
    } else {
      toast.error("Please upload a valid image file.");
      return;
    }

    try {
      const response = await fetch("https://localhost:7280/api/fields/add", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: fieldData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add field");
      }

      toast.success("Field submitted successfully!");

      // Reset form after successful submission
      setFormData({
        name: "",
        location: "",
        description: "",
        timings: "",
        price: "",
        category: "Cricket",
        image: "",
        status: "Pending",
      });
      setImagePreview(null);
    } catch (error) {
      toast.error(`Error submitting field: ${error.message}`);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/add_field_background.jpg')",
      }}
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-primary mb-6 text-center">
          Add a New Field
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Field Name */}
          <div className="mb-4">
            <label className="block mb-2 font-bold">Field Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Location */}
          <div className="mb-4">
            <label className="block mb-2 font-bold">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block mb-2 font-bold">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              rows="4"
            ></textarea>
          </div>

          {/* Timings */}
          <div className="mb-4">
            <label className="block mb-2 font-bold">
              Available Timings (Comma Separated)
            </label>
            <input
              type="text"
              name="timings"
              value={formData.timings}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Price */}
          <div className="mb-4">
            <label className="block mb-2 font-bold">Price (₹ per hour)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="block mb-2 font-bold">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="Cricket">Cricket</option>
              <option value="Football">Football</option>
              <option value="Badminton">Badminton</option>
              <option value="Basketball">Basketball</option>
            </select>
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label className="block mb-2 font-bold">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-40 object-cover rounded-lg shadow-md"
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300 shadow-lg"
            >
              Submit for Approval
            </button>
          </div>
        </form>

        {/* Toast Notifications */}
        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    </div>
  );
};

export default AddField;
