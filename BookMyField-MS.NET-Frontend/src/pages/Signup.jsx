// import React, { useState } from "react";

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     mobile: "",
//     customerName: "",
//     password: "",
//     role: "Customer",
//   });

//   const [errors, setErrors] = useState({});
//   const [successMessage, setSuccessMessage] = useState("");

//   // ✅ Validation function
//   const validate = (formData) => {
//     let newErrors = {};

//     if (!formData.username || formData.username.length < 3) {
//       newErrors.username = "Username must be at least 3 characters long.";
//     }

//     if (!formData.email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
//       newErrors.email = "Enter a valid email address.";
//     }

//     if (!formData.mobile || !/^\d{10}$/.test(formData.mobile)) {
//       newErrors.mobile = "Mobile number must be exactly 10 digits.";
//     }

//     if (!formData.customerName || formData.customerName.length < 3) {
//       newErrors.customerName = "Customer Name must be at least 3 characters long.";
//     }

//     if (!formData.password || formData.password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters long.";
//     }

//     return newErrors;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const newErrors = validate(formData);
//     setErrors(newErrors);

//     if (Object.keys(newErrors).length > 0) {
//         return;
//     }

//     try {
//         const response = await fetch("https://localhost:7280/api/auth/register", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 username: formData.username,
//                 email: formData.email,
//                 mobileNumber: formData.mobile, // Ensure the correct field name is used
//                 customerName: formData.customerName,
//                 password: formData.password,
//                 role: formData.role,
//             }),
//         });

//         if (!response.ok) {
//             const errorData = await response.json();
//             throw new Error(errorData.message || "Failed to register user.");
//         }

//         setSuccessMessage("User registered successfully!");
//         setFormData({
//             username: "",
//             email: "",
//             mobile: "",
//             customerName: "",
//             password: "",
//             role: "Customer",
//         });
//         setErrors({});
//     } catch (error) {
//         alert(`Error: ${error.message}`);
//     }
// };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-cover bg-center">
//       <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
//         <h1 className="text-3xl font-bold text-primary mb-6 text-center">Sign Up</h1>
//         <form onSubmit={handleSubmit}>
//           {/* Username */}
//           <div className="mb-4">
//             <label className="block mb-2 font-bold">Username</label>
//             <input
//               type="text"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               className={`w-full px-4 py-2 border rounded-lg ${
//                 errors.username ? "border-red-500" : "border-gray-300"
//               }`}
//             />
//             {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
//           </div>

//           {/* Email */}
//           <div className="mb-4">
//             <label className="block mb-2 font-bold">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className={`w-full px-4 py-2 border rounded-lg ${
//                 errors.email ? "border-red-500" : "border-gray-300"
//               }`}
//             />
//             {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
//           </div>

//           {/* Mobile */}
//           <div className="mb-4">
//             <label className="block mb-2 font-bold">Mobile</label>
//             <input
//               type="text"
//               name="mobile"
//               value={formData.mobile}
//               onChange={handleChange}
//               className={`w-full px-4 py-2 border rounded-lg ${
//                 errors.mobile ? "border-red-500" : "border-gray-300"
//               }`}
//             />
//             {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
//           </div>

//           {/* Customer Name */}
//           <div className="mb-4">
//             <label className="block mb-2 font-bold">Customer Name</label>
//             <input
//               type="text"
//               name="customerName"
//               value={formData.customerName}
//               onChange={handleChange}
//               className={`w-full px-4 py-2 border rounded-lg ${
//                 errors.customerName ? "border-red-500" : "border-gray-300"
//               }`}
//             />
//             {errors.customerName && <p className="text-red-500 text-sm mt-1">{errors.customerName}</p>}
//           </div>

//           {/* Password */}
//           <div className="mb-4">
//             <label className="block mb-2 font-bold">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className={`w-full px-4 py-2 border rounded-lg ${
//                 errors.password ? "border-red-500" : "border-gray-300"
//               }`}
//             />
//             {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
//           </div>

//           {/* Role Selection */}
//           <div className="mb-4">
//             <label className="block mb-2 font-bold">Role</label>
//             <select
//               name="role"
//               value={formData.role}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-lg"
//             >
//               <option value="Customer">Customer</option>
//               <option value="FieldOwner">Field Owner</option>
//             </select>
//           </div>

//           {/* Submit Button */}
//           <div className="mt-6">
//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
//             >
//               Sign Up
//             </button>
//           </div>
//         </form>

//         {successMessage && (
//           <p className="mt-4 text-green-600 font-bold text-center">{successMessage}</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Signup;





















































import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from "emailjs-com";

const BASE_URL = "https://localhost:7280/api";

const Signup = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobile: "",
    customerName: "",
    password: "",
    role: "Customer",
  });

  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const SERVICE_ID = "service_q8l3cse";
  const TEMPLATE_ID = "template_ds2x15q";
  const USER_ID = "UQ46qPVmUEnlkudqL";

  const usernameRegex = /^[a-zA-Z0-9]{5,50}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mobileRegex = /^[987][0-9]{9}$/;
  const customerNameRegex = /^[a-zA-Z ]{5,50}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const generateOtp = () => {
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otpCode);
    return otpCode;
  };

  const sendOtpToEmail = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const otpCode = generateOtp();
    const templateParams = {
      to_email: formData.email,
      otp: otpCode,
    };

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID);
      toast.success(`OTP sent to ${formData.email}`);
      setStep(2);
    } catch (error) {
      toast.error("Failed to send OTP. Try again.");
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!usernameRegex.test(formData.username)) {
      newErrors.username = "Username must be 5-50 alphanumeric characters.";
    }
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email.";
    }
    if (!mobileRegex.test(formData.mobile)) {
      newErrors.mobile = "Mobile must start with 9, 8, or 7 and be 10 digits.";
    }
    if (!customerNameRegex.test(formData.customerName)) {
      newErrors.customerName = "Customer name must be 5-50 characters.";
    }
    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be 8+ chars, include uppercase, number, and special char.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const registerUser = async (userData) => {
    try {
      const formattedData = {
        username: userData.username,
        email: userData.email,
        mobileNumber: userData.mobile,
        customerName: userData.customerName,
        password: userData.password,
        role: userData.role,
      };

      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      return { success: true, message: "Signup successful" };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();

    if (otp !== generatedOtp) {
      toast.error("Invalid OTP. Please check your email.");
      return;
    }

    const result = await registerUser(formData);
    if (result.success) {
      toast.success("Signup successful! Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: "url('/images/signup.jpg')" }}
    >
      {/* Background Overlay for Better Readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <ToastContainer position="top-center" autoClose={2000} />

      <div className="relative w-full max-w-md bg-white min-h-[500px] bg-opacity-90 backdrop-blur-md p-9 rounded-lg shadow-lg flex flex-col justify-center">
        {step === 1 ? (
          <>
            <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>
            <form onSubmit={sendOtpToEmail} className="space-y-4">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
              {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

              <input
                type="tel"
                name="mobile"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
              {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}

              <input
                type="text"
                name="customerName"
                placeholder="Full Name"
                value={formData.customerName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              >
                <option value="Customer">Customer</option>
                <option value="FieldOwner">Field Owner</option>
              </select>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold px-4 py-3 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Sign Up
              </button>
            </form>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-center mb-6">OTP Verification</h1>
            <form onSubmit={verifyOtp} className="space-y-4">
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                value={otp}
                onChange={handleOtpChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
              <button
                type="submit"
                className="w-full bg-green-600 text-white font-semibold px-4 py-3 rounded-md hover:bg-green-700 transition duration-300"
              >
                Verify OTP
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Signup;





