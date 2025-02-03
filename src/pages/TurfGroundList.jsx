import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TurfGroundList = ({ sport }) => {
  const [fields, setFields] = useState([]);
  const [locationInput, setLocationInput] = useState('');
  const [selectedField, setSelectedField] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isAvailable, setIsAvailable] = useState(null);
  const [invalidDate, setInvalidDate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedFields = JSON.parse(localStorage.getItem('fields')) || [];
    const filteredFields = storedFields.filter(
      (field) => field.status === 'Approved' && (!sport || field.category === sport)
    );
    setFields(filteredFields);
  }, [sport]);

  const handleBookNow = (field) => {
    const userRole = localStorage.getItem('userRole');
    if (!userRole) {
      alert('Please log in to proceed with booking.');
      navigate('/login');
    } else {
      setSelectedField(field);
      setIsAvailable(null);
      setSelectedDate('');
      setSelectedTime('');
    }
  };

  // Check availability of selected slot
  const checkAvailability = () => {
    if (!selectedDate) {
      alert("Please select a date.");
      return;
    }

    // Check if the selected date is in the past
    const currentDate = new Date();
    const selectedDateObj = new Date(selectedDate);
    if (selectedDateObj < currentDate) {
      setInvalidDate(true);
      return;
    } else {
      setInvalidDate(false);
    }

    if (selectedDuration !== "Full Day" && !selectedTime) {
      alert("Please select a time slot.");
      return;
    }

    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    
    const isBooked = bookings.some((booking) => 
      booking.turfId === selectedField.id &&
      booking.date === selectedDate &&
      (selectedDuration === "Full Day" || booking.time === selectedTime)
    );

    setIsAvailable(!isBooked);
  };

  // Proceed to payment if slot is available
  const proceedToPayment = () => {
    navigate('/payment', {
      state: { turf: selectedField, date: selectedDate, time: selectedTime || "Full Day", duration: selectedDuration },
    });
  };

  // Close modal without booking
  const closeBookingModal = () => {
    setSelectedField(null);
    setSelectedDate('');
    setSelectedTime('');
    setIsAvailable(null);
    setInvalidDate(false);
  };

  // Generate time slots based on selected duration
  const generateTimeSlots = () => {
    if (selectedDuration === "Full Day") return [];

    const startTimes = [
      "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
      "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
      "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM"
    ];
    const slots = [];

    startTimes.forEach((time, index) => {
      let durationHours = parseInt(selectedDuration.split(" ")[0]);
      if (index + durationHours < startTimes.length) {
        slots.push(`${time} - ${startTimes[index + durationHours]}`);
      }
    });

    return slots;
  };

  // Filter fields based on location input
  const filteredFields = fields.filter((field) =>
    field.location.toLowerCase().includes(locationInput.toLowerCase())
  );

  const goBack = () => {
    navigate(-1);  // This will navigate the user to the previous page in the browser history
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center px-4 sm:px-6 lg:px-8"
         style={{ backgroundImage: "url('/images/trufGround.jpg')" }}>
      <div className="relative w-full max-w-6xl text-white py-8">
        {/* Back Button for the Page */}
        <button onClick={goBack} className="absolute top-4 left-4 bg-gray-700 text-white px-4 py-2 rounded-md">
        ← Back
        </button>

        <h1 className="text-3xl font-bold text-center mb-6">
          {sport ? `${sport} Turfs` : 'All Turf Grounds'}
        </h1>

        {/* Smaller & Right-Aligned Location Filter */}
        <div className="flex justify-end mb-6 px-4">
          <div className="w-64">
            <label className="block text-white font-bold mb-1">Location</label>
            <input
              type="text"
              placeholder="Enter Location"
              className="p-2 border rounded-md text-black w-full"
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
            />
          </div>
        </div>

        {filteredFields.length === 0 ? (
          <p className="text-gray-300 text-center">No approved turfs available in this location.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredFields.map((field) => (
              <div key={field.id} className="p-6 bg-white bg-opacity-20 backdrop-blur-md rounded-lg shadow-md text-center flex flex-col items-center transform transition duration-300 hover:scale-105 hover:shadow-lg text-white">
                <div className="relative w-full">
                  <img src={field.image || "/images/default-turf.jpg"} alt={field.name} className="w-full h-40 object-cover rounded-md mb-4 transition-transform duration-300 hover:opacity-90" />
                </div>

                <div className="text-left w-full px-4">
                  <p className="mt-1 "><span className="font-bold text-yellow-300">🏟️ Field name:</span> {field.name}</p>
                  <p className="mt-1 "><span className="font-bold text-yellow-300">📍 Location:</span> {field.location}</p>
                  <p className="mt-1 "><span className="font-bold text-yellow-300">💰 Price:</span> ₹{field.price} per hour</p>
                </div>

                <button onClick={() => handleBookNow(field)} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                  Book Now
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Date & Time Slot Selection Modal */}
      {selectedField && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center text-black">
            <h2 className="text-xl font-bold mb-4">Select Duration, Date & Time</h2>

            <label className="block mb-2">Select Duration:</label>
            <select className="border p-2 w-full mb-4" value={selectedDuration} onChange={(e) => setSelectedDuration(e.target.value)}>
              <option value="">Select Duration</option>
              <option value="1 Hour">1 Hour</option>
              <option value="2 Hours">2 Hours</option>
              <option value="3 Hours">3 Hours</option>
              <option value="Full Day">Full Day</option>
            </select>

            <label className="block mb-2">Select Date:</label>
            <input type="date" className="border p-2 w-full mb-4" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />

            {invalidDate && (
              <p className="mt-4 font-bold text-red-600">The selected date is in the past. Please choose a valid date.</p>
            )}

            {selectedDuration !== "Full Day" && (
              <>
                <label className="block mb-2">Select Time:</label>
                <select className="border p-2 w-full mb-4" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
                  <option value="">Select Time Slot</option>
                  {generateTimeSlots().map((slot, index) => (
                    <option key={index} value={slot}>{slot}</option>
                  ))}
                </select>
              </>
            )}

            <button onClick={checkAvailability} className="bg-blue-600 text-white px-4 py-2 rounded-md w-full">Check Availability</button>

            {isAvailable !== null && (
              <p className={`mt-4 font-bold ${isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                {isAvailable ? "Slot is Available ✅" : "Slot is Not Available ❌ Change Time Slot"}
              </p>
            )}

            {isAvailable && <button onClick={proceedToPayment} className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md w-full">Confirm & Proceed to Payment</button>}

            <button onClick={closeBookingModal} className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md w-full">
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TurfGroundList;
