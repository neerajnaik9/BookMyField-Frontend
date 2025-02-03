import React, { useState } from "react";

const AddField = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    timings: "",
    price: "",
    category: "Cricket",
    ownerName: localStorage.getItem("username") || "Unknown Owner",
    image: "",
    status: "Pending",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

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

    if (formData.ownerName.length < 3 || formData.ownerName.length > 20) {
      newErrors.ownerName = "Owner Name must be between 3 and 20 characters.";
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
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const fields = JSON.parse(localStorage.getItem("fields")) || [];
    fields.push({
      ...formData,
      id: Date.now(),
      timings: formData.timings.split(","), // Convert timings string to array
    });
    localStorage.setItem("fields", JSON.stringify(fields));

    setSuccessMessage("Field submitted for approval.");
    setFormData({
      name: "",
      location: "",
      description: "",
      timings: "",
      price: "",
      category: "Cricket",
      ownerName: localStorage.getItem("username") || "Unknown Owner",
      image: "",
      status: "Pending",
    });
    setErrors({});
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/add_field_background.jpg')", // Replace with your background image path
      }}
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-primary mb-6 text-center">Add a New Field</h1>
        <form onSubmit={handleSubmit}>
          {/* Field Name */}
          <div className="mb-4">
            <label className="block mb-2 font-bold">Field Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg ${
                errors.name ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-primary`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Location */}
          <div className="mb-4">
            <label className="block mb-2 font-bold">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg ${
                errors.location ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-primary`}
            />
            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block mb-2 font-bold">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg ${
                errors.description ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-primary`}
              rows="4"
            ></textarea>
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          {/* Timings */}
          <div className="mb-4">
            <label className="block mb-2 font-bold">Available Timings (Comma Separated)</label>
            <input
              type="text"
              name="timings"
              value={formData.timings}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="e.g., 9:00 AM - 10:00 AM, 10:00 AM - 11:00 AM"
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

          {/* Owner Name */}
          <div className="mb-4">
            <label className="block mb-2 font-bold">Owner Name</label>
            <input
              type="text"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg ${
                errors.ownerName ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-primary`}
            />
            {errors.ownerName && <p className="text-red-500 text-sm mt-1">{errors.ownerName}</p>}
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label className="block mb-2 font-bold">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={`w-full px-4 py-2 border rounded-lg ${
                errors.image ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
            {formData.image && (
              <div className="mt-4">
                <img
                  src={formData.image}
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
              className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit for Approval
            </button>
          </div>
        </form>
        {successMessage && (
          <p className="mt-4 text-green-600 font-bold text-center">{successMessage}</p>
        )}
      </div>
    </div>
  );
};

export default AddField;
