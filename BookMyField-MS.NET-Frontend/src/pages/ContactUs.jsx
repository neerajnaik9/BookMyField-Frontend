import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const ContactUs = () => {
  const form = useRef();
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = (formData) => {
    let errors = {};

    // Name validation (Min 2, Max 25, Allows spaces)
    if (!formData.from_name || formData.from_name.trim().length < 2 || formData.from_name.trim().length > 25) {
      errors.from_name = "Name must be between 2 to 25 characters.";
    } else if (!/^[A-Za-z ]{2,25}$/.test(formData.from_name)) {
      errors.from_name = "Only letters and spaces are allowed.";
    }

    // Email validation (Only '@' special character allowed)
    if (!formData.from_email.includes("@") || /[^a-zA-Z0-9@.]/.test(formData.from_email)) {
      errors.from_email = "Enter a valid email with '@' and no special characters except '.'";
    }

    // Message validation (Required)
    if (!formData.message || formData.message.trim() === "") {
      errors.message = "Message is required.";
    }

    return errors;
  };

  const sendEmail = (e) => {
    e.preventDefault();

    const formData = {
      from_name: e.target.from_name.value,
      from_email: e.target.from_email.value,
      message: e.target.message.value,
    };

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Send email using emailjs
    emailjs
      .sendForm(
        "service_q8l3cse",
        "template_dpef0bn",
        form.current,
        "UQ46qPVmUEnlkudqL" // Public Key
      )
      .then(
        () => {
          console.log("SUCCESS!");
          setShowSuccess(true);
          e.target.reset();
          setErrors({});
        },
        (error) => {
          console.log("FAILED...", error.text);
          alert("Email failed to send.");
        }
      );
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center">
      {/* Left Side - Background Image */}
      <div
        className="hidden md:flex md:w-1/2 h-screen bg-cover bg-center shadow-md"
        style={{
          backgroundImage: "url('/images/contactus.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Right Side - Contact Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-8 bg-white shadow-lg rounded-lg">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-900">Contact Us</h1>

          <form ref={form} onSubmit={sendEmail} className="space-y-4">
            {/* Name Input */}
            <div>
              <label className="block mb-1 text-gray-800 font-semibold">Name</label>
              <input
                type="text"
                name="from_name"
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
              />
              {errors.from_name && <p className="text-red-500 text-sm mt-1">{errors.from_name}</p>}
            </div>

            {/* Email Input */}
            <div>
              <label className="block mb-1 text-gray-800 font-semibold">Email</label>
              <input
                type="email"
                name="from_email"
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
              />
              {errors.from_email && <p className="text-red-500 text-sm mt-1">{errors.from_email}</p>}
            </div>

            {/* Message Input */}
            <div>
              <label className="block mb-1 text-gray-800 font-semibold">Message</label>
              <textarea
                name="message"
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
                rows="4"
              ></textarea>
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold px-4 py-3 rounded-md hover:bg-blue-700 transition duration-300 shadow-md"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
            <h2 className="text-xl font-bold text-gray-900">Thank You! 😊</h2>
            <p className="text-gray-700 mt-2">
              We are reaching out to you as soon as possible!
            </p>
            <button
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
              onClick={() => setShowSuccess(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactUs;
