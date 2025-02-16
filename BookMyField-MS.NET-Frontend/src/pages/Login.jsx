import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/;

  const validate = () => {
    const newErrors = {};

    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address (e.g., user@example.com).";
    }

    // if (!passwordRegex.test(formData.password)) {
    //   newErrors.password = "Password must be at least 8 chars, include uppercase, number, and special char.";
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://localhost:7280/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("API Response:", data); // Debugging: Check response

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userRole", data.role);

        toast.success(`Welcome back, ${data.role.toUpperCase()} 🎉`);

        // Ensure proper role-based redirection
        setTimeout(() => {
          if (data.role.toLowerCase() === "admin") {
            navigate("/admin");
          } else if (data.role.toLowerCase() === "fieldowner" || data.role.toLowerCase() === "field_owner") {
            navigate("/field-owner");
          } else {
            navigate("/customer/homepage");
          }
        }, 2000); // Added delay to ensure token is stored before redirecting
      } else {
        toast.error(data.message || "Login failed!");
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Something went wrong!");
    }
  };
  return (
    // <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div
    className="relative min-h-screen flex items-center justify-center bg-cover bg-center px-4"
    style={{ backgroundImage: "url('/images/login.jpg')" }}
  >
    {/* Background Overlay for Better Readability
    <div className="absolute inset-0 bg-black bg-opacity-50"></div> */}
      
      <ToastContainer />
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          <button
            type="submit"
            className="w-full mt-4 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

