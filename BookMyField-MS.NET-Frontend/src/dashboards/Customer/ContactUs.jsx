import React, { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nameRegex = /^[a-zA-Z\s]+$/; // Only letters and spaces

  const validate = () => {
    const newErrors = {};

    if (formData.name.length < 5 || formData.name.length > 50) {
      newErrors.name = "Name must be 5-50 characters long.";
    } else if (!nameRegex.test(formData.name)) {
      newErrors.name = "Name must contain only letters and spaces.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validate()) {
        setIsSubmitting(false);
        return;
    }

    const requestBody = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
    };

    console.log("Sending Request Body: ", JSON.stringify(requestBody)); // Debugging

    try {
        const response = await fetch("https://localhost:7280/api/contact-us", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(requestBody),
        });

        const data = await response.json();
        console.log("Response Received: ", data); // Debugging

        if (!response.ok) {
            throw new Error(data.message || "Failed to send message.");
        }

        alert("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
    } catch (error) {
        console.error("Error:", error);
        alert(`Error: ${error.message}`);
    } finally {
        setIsSubmitting(false);
    }
};









  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Contact Us</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label className="block mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div className="mb-4">
          <label className="block mb-2">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="4"
            required
          ></textarea>
          {errors.message && (
            <p className="text-red-500 text-sm">{errors.message}</p>
          )}
        </div>
        <button
          type="submit"
          className={`bg-blue-600 text-white px-4 py-2 rounded ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
