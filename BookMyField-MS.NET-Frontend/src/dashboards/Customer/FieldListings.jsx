// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const FieldListings = () => {
//   const [fields, setFields] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchApprovedFields();
//   }, []);

//   // ✅ Fetch Approved Fields from Backend
//   const fetchApprovedFields = async () => {
//     try {
//       const response = await fetch('https://localhost:7280/api/customer/fields', {
//         method: 'GET',
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch fields');
//       }

//       const data = await response.json();
//       setFields(data);
//     } catch (error) {
//       console.error('Error fetching fields:', error);
//     }
//   };

//   // ✅ Handle Search Input Change
//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   // ✅ Handle Booking Process
//   const handleBookNow = (field) => {
//     const userRole = localStorage.getItem('userRole');

//     if (userRole === 'Customer') {
//       navigate('/payment', { state: { turf: field } }); // ✅ Send field data to PaymentPage
//     } else {
//       alert('Please log in as a customer to proceed with booking.');
//       navigate('/login');
//     }
//   };

//   // ✅ Filter Fields Based on Search Query
//   const filteredFields = fields.filter((field) =>
//     field.location.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div
//       className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center px-4 sm:px-6 lg:px-8"
//       style={{ backgroundImage: "url('/images/field1.jpg')" }}
//     >
//       {/* Dark Overlay for better readability */}
//       <div className="absolute inset-0 bg-black bg-opacity-50"></div>

//       {/* Content Wrapper */}
//       <div className="relative w-full max-w-6xl text-white py-8">
//         {/* Header and Search Bar */}
//         <div className="flex flex-col md:flex-row items-center justify-between mb-6">
//           <h1 className="text-3xl font-bold text-center md:text-left">Available Turfs</h1>
//           <div className="w-full md:w-1/3 mt-4 md:mt-0">
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={handleSearch}
//               placeholder="Search by city..."
//               className="w-full p-3 border rounded-md text-gray-800 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             />
//           </div>
//         </div>

//         {/* Turf Listings */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {filteredFields.length > 0 ? (
//             filteredFields.map((field) => (
//               <div
//                 key={field.id}
//                 className="p-6 bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-md text-center flex flex-col items-center transform transition duration-300 hover:scale-105 hover:shadow-lg"
//               >
//                 {/* Image Display */}
//                 <img
//                   src={`https://localhost:7280${field.imageUrl}`} // ✅ Use real backend image URL
//                   alt={field.name}
//                   className="w-full h-40 object-cover rounded-md mb-4 transition-transform duration-300 hover:opacity-90"
//                 />
//                 <h2 className="text-lg font-bold text-gray-900">{field.name}</h2>
//                 <p className="text-gray-600">Location: {field.location}</p>
//                 <p className="text-gray-600 mt-1">
//                   <span className="font-bold">Owner:</span> {field.customerName}
//                 </p>
//                 <p className="text-gray-600 mt-1">
//                   <span className="font-bold">Category:</span> {field.category}
//                 </p>
//                 <p className="text-gray-600 mt-1">
//                   <span className="font-bold">Available Timings:</span> {field.availableTimings}
//                 </p>
//                 <p className="text-lg font-bold mt-2 text-blue-600">₹{field.pricePerHour} per hour</p>
//                 <button
//                   onClick={() => handleBookNow(field)}
//                   className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 mt-4"
//                 >
//                   Book Now
//                 </button>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-300 text-center">No turfs found for the search query.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FieldListings;









































// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const FieldListings = () => {
//   const [fields, setFields] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedField, setSelectedField] = useState(null);
//   const [selectedDate, setSelectedDate] = useState("");
//   const [selectedDuration, setSelectedDuration] = useState("");
//   const [selectedTime, setSelectedTime] = useState("");
//   const [isAvailable, setIsAvailable] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchApprovedFields();
//   }, []);

//   const fetchApprovedFields = async () => {
//     try {
//       const response = await fetch("https://localhost:7280/api/customer/fields", {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch fields");
//       }

//       const data = await response.json();
//       setFields(data);
//     } catch (error) {
//       console.error("Error fetching fields:", error);
//     }
//   };

//   const handleBookNow = (field) => {
//     const userRole = localStorage.getItem("userRole");

//     if (!userRole) {
//       alert("Please log in to proceed with booking.");
//       navigate("/login");
//     } else {
//       setSelectedField(field);
//       setSelectedDate("");
//       setSelectedDuration("");
//       setSelectedTime("");
//       setIsAvailable(null);
//     }
//   };

//   // ✅ Check Availability (Same as TurfGroundList)
//   const checkAvailability = async () => {
//     if (!selectedDate) {
//       alert("Please select a date.");
//       return;
//     }

//     if (selectedDuration !== "Full Day" && !selectedTime) {
//       alert("Please select a time slot.");
//       return;
//     }

//     const formattedDate = new Date(selectedDate).toISOString().split("T")[0];

//     try {
//       const userResponse = await fetch("https://localhost:7280/api/customer/booking-history", {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       if (!userResponse.ok) {
//         throw new Error("Failed to fetch customer ID.");
//       }

//       const userBookings = await userResponse.json();

//       if (userBookings.length === 0) {
//         alert("No previous bookings found. Redirecting to payment...");
//         navigate("/payment", {
//           state: {
//             field: selectedField,
//             date: selectedDate,
//             time: selectedTime || "Full Day",
//             duration: selectedDuration,
//           },
//         });
//         return;
//       }

//       const customerId = userBookings[0].customerId;

//       const requestBody = {
//         CustomerId: customerId,
//         FieldId: selectedField.id,
//         BookingDate: formattedDate,
//         TimeSlot: selectedDuration === "Full Day" ? null : selectedTime,
//         Duration: selectedDuration === "Full Day" ? 24 : parseInt(selectedDuration.split(" ")[0]),
//       };

//       const response = await fetch("https://localhost:7280/api/customer/check-availability", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: JSON.stringify(requestBody),
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         alert(result.message || "Failed to check availability.");
//         return;
//       }

//       setIsAvailable(true);
//       alert("Slot is available!");
//     } catch (error) {
//       console.error("Error checking availability:", error);
//       alert("Error occurred while checking availability.");
//     }
//   };
  
  

//   const proceedToPayment = () => {
//     navigate("/payment", {
//       state: {
//         field: selectedField,
//         date: selectedDate,
//         time: selectedTime || "Full Day",
//         duration: selectedDuration,
//       },
//     });
//   };

//   const closeBookingModal = () => {
//     setSelectedField(null);
//     setSelectedDate("");
//     setSelectedDuration("");
//     setSelectedTime("");
//     setIsAvailable(null);
//   };

//   return (
//     <div className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center px-4 sm:px-6 lg:px-8"
//       style={{ backgroundImage: "url('/images/field1.jpg')" }}
//     >
//       <div className="relative w-full max-w-6xl text-white py-8">
//         <h1 className="text-3xl font-bold text-center mb-6">Available Fields</h1>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {fields.map((field) => (
//             <div key={field.id} className="p-6 bg-white bg-opacity-20 backdrop-blur-md rounded-lg shadow-md text-center flex flex-col items-center transform transition duration-300 hover:scale-105 hover:shadow-lg text-white">
//               <img src={`https://localhost:7280${field.imageUrl}`} alt={field.name} className="w-full h-40 object-cover rounded-md mb-4" />
//               <p><strong>🏟️ {field.name}</strong></p>
//               <p>📍 {field.location}</p>
//               <p>💰 ₹{field.pricePerHour} per hour</p>
//               <p>🕒 Available: {field.availableTimings}</p>
//               <button onClick={() => handleBookNow(field)} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Book Now</button>
//             </div>
//           ))}
//         </div>
//       </div>

//       {selectedField && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center text-black">
//             <h2 className="text-xl font-bold mb-4">Select Duration, Date & Time</h2>

//             <select className="border p-2 w-full mb-4" value={selectedDuration} onChange={(e) => setSelectedDuration(e.target.value)}>
//               <option value="">Select Duration</option>
//               <option value="1">1 Hour</option>
//               <option value="2 Hours">2 Hours</option>
//               <option value="3 Hours">3 Hours</option>
//               <option value="Full Day">Full Day</option>
//             </select>

//             <input type="date" className="border p-2 w-full mb-4" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />

//             {selectedDuration !== "Full Day" && (
//               <select className="border p-2 w-full mb-4" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
//                 <option value="">Select Time Slot</option>
//                 {selectedField.availableTimings.split(" - ").map((time, index) => (
//                   <option key={index} value={time}>{time}</option>
//                 ))}
//               </select>
//             )}

//             <button onClick={checkAvailability} className="bg-blue-600 text-white px-4 py-2 rounded-md w-full">Check Availability</button>

//             {isAvailable && <button onClick={proceedToPayment} className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md w-full">Proceed to Payment</button>}

//             <button onClick={closeBookingModal} className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md w-full">Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FieldListings;















































// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const FieldListings = () => {
//   const [fields, setFields] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedField, setSelectedField] = useState(null);
//   const [selectedDate, setSelectedDate] = useState("");
//   const [selectedDuration, setSelectedDuration] = useState("");
//   const [selectedTime, setSelectedTime] = useState("");
//   const [isAvailable, setIsAvailable] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchApprovedFields();
//   }, []);

//   const fetchApprovedFields = async () => {
//     try {
//       const response = await fetch("https://localhost:7280/api/customer/fields", {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch fields");
//       }

//       const data = await response.json();
//       setFields(data);
//     } catch (error) {
//       console.error("Error fetching fields:", error);
//     }
//   };

//   const handleBookNow = (field) => {
//     const userRole = localStorage.getItem("userRole");

//     if (!userRole) {
//       alert("Please log in to proceed with booking.");
//       navigate("/login");
//     } else {
//       setSelectedField(field);
//       setSelectedDate("");
//       setSelectedDuration("");
//       setSelectedTime("");
//       setIsAvailable(null);
//     }
//   };

//   const checkAvailability = async () => {
//     if (!selectedDate) {
//       alert("Please select a date.");
//       return;
//     }

//     if (selectedDuration !== "Full Day" && !selectedTime) {
//       alert("Please select a time slot.");
//       return;
//     }

//     const formattedDate = new Date(selectedDate).toISOString().split("T")[0];

//     try {
//       const userResponse = await fetch("https://localhost:7280/api/customer/booking-history", {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       if (!userResponse.ok) {
//         throw new Error("Failed to fetch customer ID.");
//       }

//       const userBookings = await userResponse.json();

//       if (userBookings.length === 0) {
//         alert("No previous bookings found. Redirecting to payment...");
//         navigate("/payment", {
//           state: {
//             field: selectedField,
//             date: selectedDate,
//             time: selectedTime || "Full Day",
//             duration: selectedDuration,
//           },
//         });
//         return;
//       }

//       const customerId = userBookings[0].customerId;

//       const requestBody = {
//         CustomerId: customerId,
//         FieldId: selectedField.id,
//         BookingDate: formattedDate,
//         TimeSlot: selectedDuration === "Full Day" ? null : selectedTime,
//         Duration: selectedDuration === "Full Day" ? 24 : parseInt(selectedDuration.split(" ")[0]),
//       };

//       const response = await fetch("https://localhost:7280/api/customer/check-availability", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: JSON.stringify(requestBody),
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         alert(result.message || "Failed to check availability.");
//         return;
//       }

//       setIsAvailable(true);
//       alert("Slot is available!");
//     } catch (error) {
//       console.error("Error checking availability:", error);
//       alert("Error occurred while checking availability.");
//     }
//   };

//   const proceedToPayment = () => {
//     navigate("/payment", {
//       state: {
//         field: selectedField,
//         date: selectedDate,
//         time: selectedTime || "Full Day",
//         duration: selectedDuration,
//       },
//     });
//   };

//   const closeBookingModal = () => {
//     setSelectedField(null);
//     setSelectedDate("");
//     setSelectedDuration("");
//     setSelectedTime("");
//     setIsAvailable(null);
//   };

//   const generateTimeSlots = () => {
//     if (!selectedField || !selectedField.availableTimings || selectedDuration === "Full Day") return [];

//     const [startTime, endTime] = selectedField.availableTimings.split(" - ");
//     const slots = [];
//     const durationHours = parseInt(selectedDuration.split(" ")[0]);
//     let currentTime = convertTo24HourFormat(startTime);

//     while (currentTime + durationHours <= convertTo24HourFormat(endTime)) {
//         slots.push(`${formatTime(currentTime)} - ${formatTime(currentTime + durationHours)}`);
//         currentTime++;
//     }

//     return slots;
//   };

//   const convertTo24HourFormat = (time) => {
//     let [hour, modifier] = time.split(" ");
//     let [hours, minutes] = hour.split(":").map(Number);

//     if (modifier === "PM" && hours !== 12) {
//       hours += 12;
//     }
//     if (modifier === "AM" && hours === 12) {
//       hours = 0;
//     }

//     return hours;
//   };

//   const formatTime = (hours) => {
//     let period = hours >= 12 ? "PM" : "AM";
//     let formattedHours = hours % 12 || 12;
//     return `${formattedHours}:00 ${period}`;
//   };

//   return (
//     <div className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center px-4 sm:px-6 lg:px-8"
//       style={{ backgroundImage: "url('/images/field1.jpg')" }}
//     >
//       <div className="relative w-full max-w-6xl text-white py-8">
//         <h1 className="text-3xl font-bold text-center mb-6">Available Fields</h1>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {fields.map((field) => (
//             <div key={field.id} className="p-6 bg-white bg-opacity-20 backdrop-blur-md rounded-lg shadow-md text-center flex flex-col items-center transform transition duration-300 hover:scale-105 hover:shadow-lg text-white">
//               <img src={`https://localhost:7280${field.imageUrl}`} alt={field.name} className="w-full h-40 object-cover rounded-md mb-4" />
//               <p><strong>🏟️ {field.name}</strong></p>
//               <p>📍 {field.location}</p>
//               <p>💰 ₹{field.pricePerHour} per hour</p>
//               <p>🕒 Available: {field.availableTimings}</p>
//               <button onClick={() => handleBookNow(field)} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Book Now</button>
//             </div>
//           ))}
//         </div>
//       </div>

//       {selectedField && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center text-black">
//             <h2 className="text-xl font-bold mb-4">Select Duration, Date & Time</h2>

//             <select className="border p-2 w-full mb-4" value={selectedDuration} onChange={(e) => setSelectedDuration(e.target.value)}>
//               <option value="">Select Duration</option>
//               <option value="1">1 Hour</option>
//               <option value="2 Hours">2 Hours</option>
//               <option value="3 Hours">3 Hours</option>
//               <option value="Full Day">Full Day</option>
//             </select>

//             <input type="date" className="border p-2 w-full mb-4" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />

//             {selectedDuration !== "Full Day" && (
//               <select className="border p-2 w-full mb-4" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
//                 <option value="">Select Time Slot</option>
//                 {generateTimeSlots().map((slot, index) => (
//                   <option key={index} value={slot}>{slot}</option>
//                 ))}
//               </select>
//             )}

//             <button onClick={checkAvailability} className="bg-blue-600 text-white px-4 py-2 rounded-md w-full">Check Availability</button>

//             {isAvailable && <button onClick={proceedToPayment} className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md w-full">Proceed to Payment</button>}

//             <button onClick={closeBookingModal} className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md w-full">Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FieldListings;







































































// working time slot but payment is failed 

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const FieldListings = () => {
//   const [fields, setFields] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedField, setSelectedField] = useState(null);
//   const [selectedDate, setSelectedDate] = useState("");
//   const [selectedDuration, setSelectedDuration] = useState("");
//   const [selectedTime, setSelectedTime] = useState("");
//   const [isAvailable, setIsAvailable] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     console.log("Fetching approved fields...");
//     fetchApprovedFields();
//   }, []);

//   const fetchApprovedFields = async () => {
//     try {
//       const response = await fetch("https://localhost:7280/api/customer/fields", {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch fields");
//       }

//       const data = await response.json();
//       console.log("Fetched fields data:", data);
//       setFields(data);
//     } catch (error) {
//       console.error("Error fetching fields:", error);
//     }
//   };

//   const handleBookNow = (field) => {
//     const userRole = localStorage.getItem("userRole");

//     if (!userRole) {
//       alert("Please log in to proceed with booking.");
//       navigate("/login");
//     } else {
//       console.log("Booking field:", field);
//       setSelectedField(field);
//       setSelectedDate("");
//       setSelectedDuration("");
//       setSelectedTime("");
//       setIsAvailable(null);
//     }
//   };

//   const checkAvailability = async () => {
//     console.log("Checking availability...");
//     if (!selectedDate) {
//       alert("Please select a date.");
//       return;
//     }

//     if (selectedDuration !== "Full Day" && !selectedTime) {
//       alert("Please select a time slot.");
//       return;
//     }

//     const formattedDate = new Date(selectedDate).toISOString().split("T")[0];
//     console.log("Formatted date:", formattedDate);

//     try {
//       const userResponse = await fetch("https://localhost:7280/api/customer/booking-history", {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       if (!userResponse.ok) {
//         throw new Error("Failed to fetch customer ID.");
//       }

//       const userBookings = await userResponse.json();
//       console.log("User bookings:", userBookings);

//       if (userBookings.length === 0) {
//         alert("No previous bookings found. Redirecting to payment...");
//         navigate("/payment", {
//           state: {
//             field: selectedField,
//             date: selectedDate,
//             time: selectedTime || "Full Day",
//             duration: selectedDuration,
//           },
//         });
//         return;
//       }

//       const customerId = userBookings[0].customerId;
//       console.log("Customer ID:", customerId);

//       const requestBody = {
//         CustomerId: customerId,
//         FieldId: selectedField.id,
//         BookingDate: formattedDate,
//         TimeSlot: selectedDuration === "Full Day" ? null : selectedTime,
//         Duration: selectedDuration === "Full Day" ? 24 : parseInt(selectedDuration.split(" ")[0]),
//       };

//       console.log("Request body:", requestBody);

//       const response = await fetch("https://localhost:7280/api/customer/check-availability", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: JSON.stringify(requestBody),
//       });

//       const result = await response.json();
//       console.log("Availability check result:", result);

//       if (!response.ok) {
//         alert(result.message || "Failed to check availability.");
//         return;
//       }

//       setIsAvailable(true);
//       alert("Slot is available!");
//     } catch (error) {
//       console.error("Error checking availability:", error);
//       alert("Error occurred while checking availability.");
//     }
//   };

//   const proceedToPayment = () => {
//     console.log("Proceeding to payment with selected details:", {
//       field: selectedField,
//       date: selectedDate,
//       time: selectedTime || "Full Day",
//       duration: selectedDuration,
//     });

//     navigate("/payment", {
//       state: {
//         field: selectedField,
//         date: selectedDate,
//         time: selectedTime || "Full Day",
//         duration: selectedDuration,
//       },
//     });
//   };

//   const closeBookingModal = () => {
//     console.log("Closing booking modal.");
//     setSelectedField(null);
//     setSelectedDate("");
//     setSelectedDuration("");
//     setSelectedTime("");
//     setIsAvailable(null);
//   };

//   const generateTimeSlots = () => {
//     console.log("Generating time slots for field:", selectedField);
//     if (!selectedField || !selectedField.availableTimings || selectedDuration === "Full Day") return [];

//     const [startTime, endTime] = selectedField.availableTimings.split(" - ");
//     const slots = [];
//     const durationHours = parseInt(selectedDuration.split(" ")[0]);
//     let currentTime = convertTo24HourFormat(startTime);

//     while (currentTime + durationHours <= convertTo24HourFormat(endTime)) {
//         slots.push(`${formatTime(currentTime)} - ${formatTime(currentTime + durationHours)}`);
//         currentTime++;
//     }

//     console.log("Generated time slots:", slots);
//     return slots;
//   };

//   const convertTo24HourFormat = (time) => {
//     let [hour, modifier] = time.split(" ");
//     let [hours, minutes] = hour.split(":").map(Number);

//     if (modifier === "PM" && hours !== 12) {
//       hours += 12;
//     }
//     if (modifier === "AM" && hours === 12) {
//       hours = 0;
//     }

//     return hours;
//   };

//   const formatTime = (hours) => {
//     let period = hours >= 12 ? "PM" : "AM";
//     let formattedHours = hours % 12 || 12;
//     return `${formattedHours}:00 ${period}`;
//   };

//   return (
//     <div className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center px-4 sm:px-6 lg:px-8"
//       style={{ backgroundImage: "url('/images/field1.jpg')" }}
//     >
//       <div className="relative w-full max-w-6xl text-white py-8">
//         <h1 className="text-3xl font-bold text-center mb-6">Available Fields</h1>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {fields.map((field) => (
//             <div key={field.id} className="p-6 bg-white bg-opacity-20 backdrop-blur-md rounded-lg shadow-md text-center flex flex-col items-center transform transition duration-300 hover:scale-105 hover:shadow-lg text-white">
//               <img src={`https://localhost:7280${field.imageUrl}`} alt={field.name} className="w-full h-40 object-cover rounded-md mb-4" />
//               <p><strong>🏟️ {field.name}</strong></p>
//               <p>📍 {field.location}</p>
//               <p>💰 ₹{field.pricePerHour} per hour</p>
//               <p>🕒 Available: {field.availableTimings}</p>
//               <button onClick={() => handleBookNow(field)} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Book Now</button>
//             </div>
//           ))}
//         </div>
//       </div>

//       {selectedField && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center text-black">
//             <h2 className="text-xl font-bold mb-4">Select Duration, Date & Time</h2>

//             <select className="border p-2 w-full mb-4" value={selectedDuration} onChange={(e) => setSelectedDuration(e.target.value)}>
//               <option value="">Select Duration</option>
//               <option value="1">1 Hour</option>
//               <option value="2 Hours">2 Hours</option>
//               <option value="3 Hours">3 Hours</option>
//               <option value="Full Day">Full Day</option>
//             </select>

//             <input type="date" className="border p-2 w-full mb-4" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />

//             {selectedDuration !== "Full Day" && (
//               <select className="border p-2 w-full mb-4" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
//                 <option value="">Select Time Slot</option>
//                 {generateTimeSlots().map((slot, index) => (
//                   <option key={index} value={slot}>{slot}</option>
//                 ))}
//               </select>
//             )}

//             <button onClick={checkAvailability} className="bg-blue-600 text-white px-4 py-2 rounded-md w-full">Check Availability</button>

//             {isAvailable && <button onClick={proceedToPayment} className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md w-full">Proceed to Payment</button>}

//             <button onClick={closeBookingModal} className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md w-full">Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FieldListings;






































// working time slot but payment is failed 

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FieldListings = () => {
  const [fields, setFields] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedField, setSelectedField] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [isAvailable, setIsAvailable] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Fetching approved fields...");
    fetchApprovedFields();
  }, []);

  const fetchApprovedFields = async () => {
    try {
      const response = await fetch("https://localhost:7280/api/customer/fields", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch fields");
      }

      const data = await response.json();
      console.log("Fetched fields data:", data);
      setFields(data);
    } catch (error) {
      console.error("Error fetching fields:", error);
    }
  };

  const handleBookNow = (field) => {
    const userRole = localStorage.getItem("userRole");

    if (!userRole) {
      alert("Please log in to proceed with booking.");
      navigate("/login");
    } else {
      console.log("Booking field:", field);
      setSelectedField(field);
      setSelectedDate("");
      setSelectedDuration("");
      setSelectedTime("");
      setIsAvailable(null);
    }
  };

  const checkAvailability = async () => {
    console.log("Checking availability...");
    if (!selectedDate) {
      alert("Please select a date.");
      return;
    }

    if (selectedDuration !== "Full Day" && !selectedTime) {
      alert("Please select a time slot.");
      return;
    }

    const formattedDate = new Date(selectedDate).toISOString().split("T")[0];
    console.log("Formatted date:", formattedDate);

    try {
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
      console.log("User bookings:", userBookings);

      if (userBookings.length === 0) {
        alert("No previous bookings found. Redirecting to payment...");
        navigate("/payment", {
          state: {
            field: selectedField,
            date: selectedDate,
            time: selectedTime || "Full Day",
            duration: selectedDuration,
          },
        });
        return;
      }

      const customerId = userBookings[0].customerId;
      console.log("Customer ID:", customerId);

      const requestBody = {
        CustomerId: customerId,
        FieldId: selectedField.id,
        BookingDate: formattedDate,
        TimeSlot: selectedDuration === "Full Day" ? null : selectedTime,
        Duration: selectedDuration === "Full Day" ? 24 : parseInt(selectedDuration.split(" ")[0]),
      };

      console.log("Request body:", requestBody);

      const response = await fetch("https://localhost:7280/api/customer/check-availability", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();
      console.log("Availability check result:", result);

      if (!response.ok) {
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
    console.log("Proceeding to payment with selected details:", {
        turf: selectedField, // ✅ Pass as 'turf' instead of 'field' to match PaymentPage.js
        date: selectedDate,
        time: selectedTime || "Full Day",
        duration: selectedDuration,
    });

    navigate("/payment", {
        state: {
            turf: selectedField, // ✅ Use 'turf' instead of 'field' to match PaymentPage.js expectations
            date: selectedDate,
            time: selectedTime || "Full Day",
            duration: selectedDuration,
        },
    });
};


  const closeBookingModal = () => {
    console.log("Closing booking modal.");
    setSelectedField(null);
    setSelectedDate("");
    setSelectedDuration("");
    setSelectedTime("");
    setIsAvailable(null);
  };

  const generateTimeSlots = () => {
    console.log("Generating time slots for field:", selectedField);
    if (!selectedField || !selectedField.availableTimings || selectedDuration === "Full Day") return [];

    const [startTime, endTime] = selectedField.availableTimings.split(" - ");
    const slots = [];
    const durationHours = parseInt(selectedDuration.split(" ")[0]);
    let currentTime = convertTo24HourFormat(startTime);

    while (currentTime + durationHours <= convertTo24HourFormat(endTime)) {
        slots.push(`${formatTime(currentTime)} - ${formatTime(currentTime + durationHours)}`);
        currentTime++;
    }

    console.log("Generated time slots:", slots);
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

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: "url('/images/field1.jpg')" }}
    >
      <div className="relative w-full max-w-6xl text-white py-8">
        <h1 className="text-3xl font-bold text-center mb-6">Available Fields</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {fields.map((field) => (
            <div key={field.id} className="p-6 bg-white bg-opacity-20 backdrop-blur-md rounded-lg shadow-md text-center flex flex-col items-center transform transition duration-300 hover:scale-105 hover:shadow-lg text-white">
              <img src={`https://localhost:7280${field.imageUrl}`} alt={field.name} className="w-full h-40 object-cover rounded-md mb-4" />
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
              <button onClick={() => handleBookNow(field)} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Book Now</button>
            </div>
          ))}
        </div>
      </div>

      {selectedField && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center text-black">
            <h2 className="text-xl font-bold mb-4">Select Duration, Date & Time</h2>

            <select className="border p-2 w-full mb-4" value={selectedDuration} onChange={(e) => setSelectedDuration(e.target.value)}>
              <option value="">Select Duration</option>
              <option value="1">1 Hour</option>
              <option value="2 Hours">2 Hours</option>
              <option value="3 Hours">3 Hours</option>
              <option value="Full Day">Full Day</option>
            </select>

            <input type="date" className="border p-2 w-full mb-4" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />

            {selectedDuration !== "Full Day" && (
              <select className="border p-2 w-full mb-4" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
                <option value="">Select Time Slot</option>
                {generateTimeSlots().map((slot, index) => (
                  <option key={index} value={slot}>{slot}</option>
                ))}
              </select>
            )}

            <button onClick={checkAvailability} className="bg-blue-600 text-white px-4 py-2 rounded-md w-full">Check Availability</button>

            {isAvailable && <button onClick={proceedToPayment} className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md w-full">Proceed to Payment</button>}

            <button onClick={closeBookingModal} className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md w-full">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FieldListings;