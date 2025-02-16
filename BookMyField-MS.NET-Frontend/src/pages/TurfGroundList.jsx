import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TurfGroundList = ({ sport }) => {
  const [fields, setFields] = useState([]);
  const [locationInput, setLocationInput] = useState("");
  const [selectedField, setSelectedField] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isAvailable, setIsAvailable] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFields = async () => {
      const response = await fetch(
        "https://localhost:7280/api/customer/fields",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      setFields(data);
    };
    fetchFields();
  }, []);

  const handleBookNow = (field) => {
    const userRole = localStorage.getItem("userRole");
    if (!userRole) {
      alert("Please log in to proceed with booking.");
      navigate("/login");
    } else {
      setSelectedField(field);
      setSelectedDate("");
      setSelectedDuration("");
      setSelectedTime("");
      setIsAvailable(null);
    }
  };
const checkAvailability = async () => {
  if (!selectedDate) {
      alert("Please select a date.");
      return;
  }

  if (selectedDuration !== "Full Day" && !selectedTime) {
      alert("Please select a time slot.");
      return;
  }

  const formattedDate = new Date(selectedDate).toISOString().split("T")[0]; // Ensure YYYY-MM-DD format

  try {
      // ✅ Fetch CustomerId from backend instead of local storage
      const userResponse = await fetch("https://localhost:7280/api/customer/booking-history", {
          method: "GET",
          headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
      });

      if (!userResponse.ok) {
          throw new Error("Failed to fetch customer ID.");
      }

      const userBookings = await userResponse.json();

      if (userBookings.length === 0) {
          // 🔥 No previous bookings, redirect directly to payment page
          alert("No previous bookings found. Redirecting to payment...");
          navigate("/payment", {
              state: {
                  turf: selectedField,
                  date: selectedDate,
                  time: selectedTime || "Full Day",
                  duration: selectedDuration,
              },
          });
          return; // Stop further execution
      }

      const customerId = userBookings[0].customerId; // ✅ Extract customerId from bookings history

      const requestBody = {
          CustomerId: customerId, // ✅ Use fetched CustomerId
          FieldId: selectedField.id,
          BookingDate: formattedDate,
          TimeSlot: selectedDuration === "Full Day" ? null : selectedTime, 
          Duration: selectedDuration === "Full Day" ? 24 : parseInt(selectedDuration.split(" ")[0]),
      };

      console.log("Checking availability with request:", requestBody); // Debugging log

      const response = await fetch("https://localhost:7280/api/customer/check-availability", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(requestBody),
      });

      const result = await response.json();

      if (!response.ok) {
          console.error("Availability check failed:", result);
          alert(result.message || "Failed to check availability.");
          return;
      }

      setIsAvailable(true);
      alert("Slot is available!");
  } catch (error) {
      console.error("Error checking availability:", error);
      alert("Error occurred while checking availability.");
  }
};
  const proceedToPayment = () => {
    navigate("/payment", {
      state: {
        turf: selectedField,
        date: selectedDate,
        time: selectedTime || "Full Day",
        duration: selectedDuration,
      },
    });
  };
  const closeBookingModal = () => {
    setSelectedField(null);
    setSelectedDate("");
    setSelectedDuration("");
    setSelectedTime("");
    setIsAvailable(null);
  };

  const generateTimeSlots = () => {
    if (!selectedField || !selectedField.availableTimings || selectedDuration === "Full Day") return [];

    const [startTime, endTime] = selectedField.availableTimings.split(" - ");
    const slots = [];
    const durationHours = parseInt(selectedDuration.split(" ")[0]);
    let currentTime = convertTo24HourFormat(startTime);

    while (currentTime + durationHours <= convertTo24HourFormat(endTime)) {
        slots.push(`${formatTime(currentTime)} - ${formatTime(currentTime + durationHours)}`);
        currentTime++;
    }

    return slots;
};
  const convertTo24HourFormat = (time) => {
    let [hour, modifier] = time.split(" ");
    let [hours, minutes] = hour.split(":").map(Number);

    if (modifier === "PM" && hours !== 12) {
      hours += 12;
    }
    if (modifier === "AM" && hours === 12) {
      hours = 0;
    }

    return hours;
  };

  const formatTime = (hours) => {
    let period = hours >= 12 ? "PM" : "AM";
    let formattedHours = hours % 12 || 12;
    return `${formattedHours}:00 ${period}`;
  };
  //  ✅ Filter fields by location & sport category
  const filteredFields = fields.filter(
    (field) =>
      field.location.toLowerCase().includes(locationInput.toLowerCase()) &&
      (!sport || field.category.toLowerCase() === sport.toLowerCase()) // Filter by category
  );

  // ✅ Generate min & max date for date picker (current date to 2 months ahead)
  const today = new Date().toISOString().split("T")[0];
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 2);
  const maxDateFormatted = maxDate.toISOString().split("T")[0];

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: "url('/images/trufGround.jpg')" }}
    >
      <div className="relative w-full max-w-6xl text-white py-8">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 bg-gray-700 text-white px-4 py-2 rounded-md"
        >
          ← Back
        </button>

        <h1 className="text-3xl font-bold text-center mb-6">
          {sport ? `${sport} Turfs` : "All Turf Grounds"}
        </h1>

        <div className="flex justify-end mb-6 px-4">
          <input
            type="text"
            placeholder="Enter Location"
            className="p-2 border rounded-md text-black w-full"
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
          />
        </div>

        {filteredFields.length === 0 ? (
          <p className="text-gray-300 text-center">
            No approved turfs available in this location.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredFields.map((field) => (
              <div
                key={field.id}
                className="p-6 bg-white bg-opacity-20 backdrop-blur-md rounded-lg shadow-md text-center flex flex-col items-center transform transition duration-300 hover:scale-105 hover:shadow-lg text-white"
              >
                <img
                  src={`https://localhost:7280${field.imageUrl}`} // ✅ Use real backend image URL
                  alt={field.name}
                  className="w-full h-40 object-cover rounded-md mb-4 transition-transform duration-300 hover:opacity-90"
                />


                <p className="mt-1 ">
                  <span className="font-bold text-yellow-300">
                    🏟️ Field name:
                  </span>{" "}
                  {field.name}
                </p>
                <p className="mt-1 ">
                  <span className="font-bold text-yellow-300">
                    📍 Location:
                  </span>{" "}
                  {field.location}
                </p>
                <p className="mt-1 ">
                  <span className="font-bold text-yellow-300">💰 Price:</span> ₹
                  {field.pricePerHour} per hour
                </p>
                <p className="mt-1 ">
                  <span className="font-bold text-yellow-300">🕒 Available: </span>
                  {field.availableTimings}
                </p>
                <button
                  onClick={() => handleBookNow(field)}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedField && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center text-black">
            <h2 className="text-xl font-bold mb-4">
              Select Duration, Date & Time
            </h2>

            <select
              className="border p-2 w-full mb-4"
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(e.target.value)}
            >
              <option value="">Select Duration</option>
              <option value="1">1 Hour</option>
              <option value="2 Hours">2 Hours</option>
              <option value="3 Hours">3 Hours</option>
              <option value="Full Day">Full Day</option>
            </select>

            {/* <input type="date" className="border p-2 w-full mb-4" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} min={new Date().toISOString().split('T')[0]} /> */}
            <input
              type="date"
              className="border p-2 w-full mb-4"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={today}
              max={maxDateFormatted}
            />

            {selectedDuration !== "Full Day" && (
              <select
                className="border p-2 w-full mb-4"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              >
                <option value="">Select Time Slot</option>
                {generateTimeSlots().map((slot, index) => (
                  <option key={index} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            )}

            <button
              onClick={checkAvailability}
              className="bg-blue-600 text-white px-4 py-2 rounded-md w-full"
            >
              Check Availability
            </button>

            {isAvailable && (
              <button
                onClick={proceedToPayment}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md w-full"
              >
                Proceed to Payment
              </button>
            )}

            <button
              onClick={closeBookingModal}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md w-full"
            >
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TurfGroundList;

































































