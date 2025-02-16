import React from 'react';

const AboutUs = () => {
  return (
    <div 
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center" 
      style={{ backgroundImage: "url('/images/aboutus.jpg')" }} // Ensure the correct path to your image
    >
      {/* Dark Overlay for Better Readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content Box */}
      <div className="relative bg-white bg-opacity-90 backdrop-blur-md p-6 sm:p-10 rounded-lg shadow-lg max-w-3xl mx-4 sm:mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-900">
          About Us
        </h1>
        <p className="mb-4 text-gray-700 text-base sm:text-lg">
          Welcome to <strong>BookMyField</strong>, your one-stop solution for booking sports
          fields and managing turf reservations. Our mission is to make sports
          more accessible and hassle-free for everyone, whether you’re an
          amateur player or a professional team.
        </p>
        <p className="mb-4 text-gray-700 text-base sm:text-lg">
          With <strong>BookMyField</strong>, you can:
        </p>
        <ul className="list-disc pl-6 mb-4 text-gray-700 text-base sm:text-lg">
          <li>Discover and book sports fields near you.</li>
          <li>Manage your bookings and history effortlessly.</li>
          <li>As a field owner, list your turf and manage approvals seamlessly.</li>
        </ul>
        <p className="mb-4 text-gray-700 text-base sm:text-lg">
          We’re committed to providing the best experience for our users by
          combining modern technology with a passion for sports. Join us in
          making sports more accessible and enjoyable for all.
        </p>
        <p className="text-gray-700 text-base sm:text-lg">
          If you have any questions or feedback, feel free to reach out through
          our <strong>Contact Us</strong> page. We’d love to hear from you!
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
