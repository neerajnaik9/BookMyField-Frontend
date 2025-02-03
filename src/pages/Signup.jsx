import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobile: "",
    customerName: "",
    password: "",
    role: "customer", // Default role
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const usernameRegex = /^[a-zA-Z0-9]{5,50}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mobileRegex = /^[987][0-9]{9}$/;
  const customerNameRegex = /^[a-zA-Z ]{5,50}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const validate = () => {
    const newErrors = {};

    if (!usernameRegex.test(formData.username)) {
      newErrors.username = "Username must be 5-50 alphanumeric characters.";
    }

    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email (e.g., user@example.com).";
    }

    if (!mobileRegex.test(formData.mobile)) {
      newErrors.mobile = "Mobile number must start with 9, 8, or 7 and be 10 digits.";
    }

    if (!customerNameRegex.test(formData.customerName)) {
      newErrors.customerName = "Customer name must be 5-50 characters (letters and spaces only).";
    }

    if (!passwordRegex.test(formData.password)) {
      newErrors.password = "Password must be 8+ chars, include uppercase, number, and special char.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some((user) => user.email === formData.email)) {
      alert("Email is already registered!");
      return;
    }

    users.push(formData);
    localStorage.setItem("users", JSON.stringify(users));

    if (formData.role === "customer") {
      let customers = JSON.parse(localStorage.getItem("customers")) || [];
      customers.push({
        id: Date.now(),
        username: formData.username,
        email: formData.email,
        mobile: formData.mobile,
        customerName: formData.customerName,
        status: "Pending",
      });
      localStorage.setItem("customers", JSON.stringify(customers));
    }

    alert("Signup successful! Redirecting to login...");
    navigate("/login");
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: "url('/images/signup.jpg')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative w-full max-w-lg bg-white bg-opacity-90 backdrop-blur-md p-6 sm:p-10 rounded-lg shadow-lg">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-900">
          Sign Up
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 text-gray-800 font-semibold">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
          </div>

          <div>
            <label className="block mb-2 text-gray-800 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div>
            <label className="block mb-2 text-gray-800 font-semibold">Mobile Number</label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
          </div>

          <div>
            <label className="block mb-2 text-gray-800 font-semibold">Customer Name</label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            {errors.customerName && <p className="text-red-500 text-sm">{errors.customerName}</p>}
          </div>

          <div>
            <label className="block mb-2 text-gray-800 font-semibold">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          {/* Role Dropdown */}
          <div>
            <label className="block mb-2 text-gray-800 font-semibold">Select Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            >
              <option value="customer">Customer</option>
              <option value="field_owner">Field Owner</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold px-4 py-3 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;

