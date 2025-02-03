import React from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const navigate = useNavigate();

  const categories = [
    {
      name: "Cricket",
      icon: "/images/cricket_icon.png",
      path: "/cricket-turfs",
    },
    {
      name: "Football",
      icon: "/images/football_icon.png",
      path: "/football-turfs",
    },
    {
      name: "Basketball",
      icon: "/images/basketball_icon.png",
      path: "/basketball-turfs",
    },
    {
      name: "Badminton",
      icon: "/images/Badminton_icon.png",
      path: "/badminton-turfs",
    },
  ];

  const sliderImages = [
    "/images/cricket.jpg",
    "/images/football.jpg",
    "/images/basketball.jpg",
    "/images/badminton.jpg",
  ];

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 500,
  };

  const handleNavigation = (category) => {
    navigate(category.path, { state: { sport: category.name } });
  };

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: "url('/images/home2.jpg')" }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content Wrapper */}
      <div className="relative w-full max-w-5xl text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Welcome to BookMyField</h1>
        <p className="text-lg mb-8">Easily book fields for your favorite sports.</p>

        {/* Slider */}
        <div className="mb-10">
          <Slider {...sliderSettings}>
            {sliderImages.map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-80 object-cover rounded-lg"
                />
              </div>
            ))}
          </Slider>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-lg p-6 text-center"
            >
              <img
                src={category.icon}
                alt={`${category.name} Icon`}
                className="w-16 h-16 mx-auto mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{category.name}</h2>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => handleNavigation(category)}
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
