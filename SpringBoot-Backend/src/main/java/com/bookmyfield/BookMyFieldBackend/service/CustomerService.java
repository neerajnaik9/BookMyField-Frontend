package com.bookmyfield.BookMyFieldBackend.service;

import com.bookmyfield.BookMyFieldBackend.model.Booking;
import com.bookmyfield.BookMyFieldBackend.model.Field;
import com.bookmyfield.BookMyFieldBackend.model.User;
import com.bookmyfield.BookMyFieldBackend.repository.BookingRepository;
import com.bookmyfield.BookMyFieldBackend.repository.FieldRepository;
import com.bookmyfield.BookMyFieldBackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.*;

@Service
public class CustomerService {

    @Autowired
    private FieldRepository fieldRepository;

    public CustomerService(FieldRepository fieldRepository) {
        this.fieldRepository = fieldRepository;
    }

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    private static final DateTimeFormatter TIME_FORMATTER = DateTimeFormatter.ofPattern("HH:mm");

    // ✅ Fetch all approved fields
    public List<Field> getApprovedFields() {
        return fieldRepository.findByStatus("Approved");
    }

    // ✅ Book a field and return booking details
    public Map<String, Object> bookField(Long fieldId, Long customerId, String date, String startTime, String endTime) {
        Map<String, Object> response = new HashMap<>();

        try {
            LocalDate bookingDate = LocalDate.parse(date);
            LocalTime start = LocalTime.parse(startTime, TIME_FORMATTER);
            LocalTime end = LocalTime.parse(endTime, TIME_FORMATTER);

            if (bookingDate.isBefore(LocalDate.now())) {
                response.put("error", "Cannot book a field for a past date!");
                return response;
            }

            Optional<Field> fieldOptional = fieldRepository.findById(fieldId);
            Optional<User> customerOptional = userRepository.findById(customerId);

            if (fieldOptional.isEmpty() || customerOptional.isEmpty()) {
                response.put("error", "Field or Customer not found!");
                return response;
            }

            Field field = fieldOptional.get();
            User customer = customerOptional.get();

            // ✅ Ignore "Pending Payment" bookings if they are recent (<10 min old)
            boolean isOverlapping = bookingRepository.existsByFieldAndBookingDateAndStartTimeLessThanEqualAndEndTimeGreaterThanEqualAndNotPending(
                    field, bookingDate, start, end, LocalDateTime.now().minusMinutes(10)
            );

            if (isOverlapping) {
                response.put("error", "Field is already booked for this time slot.");
                return response;
            }

            // ✅ Create a new booking
            Booking booking = new Booking();
            booking.setField(field);
            booking.setCustomer(customer);
            booking.setBookingDate(bookingDate);
            booking.setStartTime(start);
            booking.setEndTime(end);
            booking.setPrice(field.getPrice());
            booking.setStatus("Pending Payment");
            booking.setCreatedAt(LocalDateTime.now()); // Track creation time

            booking = bookingRepository.save(booking); // Save and retrieve the ID

            response.put("message", "Booking successful, pending payment!");
            response.put("bookingId", booking.getId());
            return response;

        } catch (DateTimeParseException e) {
            response.put("error", "Invalid date or time format. Use YYYY-MM-DD for date and HH:mm for time.");
            return response;
        }
    }

    // ✅ Scheduled Task: Remove expired "Pending Payment" bookings
    @Scheduled(fixedRate = 600000) // Runs every 10 minutes
    public void removeExpiredPendingBookings() {
        LocalDateTime expiryTime = LocalDateTime.now().minusMinutes(10);
        bookingRepository.deleteOldPendingBookings(expiryTime);
        System.out.println("🧹 Removed expired 'Pending Payment' bookings");
    }
    
 // ✅ Fetch fields by category
    public List<Field> getFieldsByCategory(String category) {
        return fieldRepository.findByCategoryAndStatus(category, "Approved");
    }

    
    // ✅ Fetch customer booking history
    public List<Booking> getCustomerBookings(Long customerId) {
        Optional<User> customerOptional = userRepository.findById(customerId);
        return customerOptional.map(bookingRepository::findByCustomer).orElse(Collections.emptyList());
    }

    // ✅ Cancel a booking
    public String cancelBooking(Long bookingId) {
        Optional<Booking> bookingOptional = bookingRepository.findById(bookingId);
        if (bookingOptional.isPresent()) {
            Booking booking = bookingOptional.get();

            if ("Paid".equals(booking.getStatus())) {
                return "Cannot cancel a paid booking.";
            }

            bookingRepository.delete(booking);
            return "Booking cancelled successfully!";
        }
        return "Booking not found!";
    }

    // ✅ Check if a field is available for booking
    public boolean isFieldAvailable(Long fieldId, String date, String startTime, String endTime) {
        try {
            LocalDate bookingDate = LocalDate.parse(date);
            LocalTime start = LocalTime.parse(startTime, TIME_FORMATTER);
            LocalTime end = LocalTime.parse(endTime, TIME_FORMATTER);

            Optional<Field> fieldOptional = fieldRepository.findById(fieldId);
            if (fieldOptional.isEmpty()) {
                return false;
            }

            if (bookingDate.isBefore(LocalDate.now())) {
                return false;
            }

            Field field = fieldOptional.get();

            // ✅ Exclude recent "Pending Payment" bookings
            boolean isOverlapping = bookingRepository.existsByFieldAndBookingDateAndStartTimeLessThanEqualAndEndTimeGreaterThanEqualAndNotPending(
                    field, bookingDate, start, end, LocalDateTime.now().minusMinutes(10)
            );

            return !isOverlapping;

        } catch (DateTimeParseException e) {
            return false;
        }
    }
}
