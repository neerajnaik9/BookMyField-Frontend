package com.bookmyfield.BookMyFieldBackend.controller;

import com.bookmyfield.BookMyFieldBackend.model.Booking;
import com.bookmyfield.BookMyFieldBackend.model.Field;
import com.bookmyfield.BookMyFieldBackend.model.User;
import com.bookmyfield.BookMyFieldBackend.repository.UserRepository;
import com.bookmyfield.BookMyFieldBackend.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/customer")
@CrossOrigin(origins = "http://localhost:3000")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @Autowired
    private UserRepository userRepository;

    private static final DateTimeFormatter TIME_FORMATTER = DateTimeFormatter.ofPattern("HH:mm");

    // ✅ Fetch all approved fields
    @GetMapping("/fields")
    @PreAuthorize("hasRole('CUSTOMER')")
    public List<Field> getApprovedFields() {
        return customerService.getApprovedFields();
    }
    
 // ✅ Fetch fields by category
    @GetMapping("/fields/category/{category}")
    @PreAuthorize("hasRole('CUSTOMER')")
    public List<Field> getFieldsByCategory(@PathVariable String category) {
        return customerService.getFieldsByCategory(category);
    }


    // ✅ Book Field API - Returns Booking ID for Frontend
    @PostMapping("/book-field/{fieldId}")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<?> bookField(@PathVariable Long fieldId,
                                       @RequestBody Map<String, String> bookingRequest,
                                       @AuthenticationPrincipal UserDetails userDetails) {

        User customer = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!bookingRequest.containsKey("bookingDate") || !bookingRequest.containsKey("startTime") || !bookingRequest.containsKey("endTime")) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", "Missing booking details. Please provide date, start time, and end time."));
        }

        try {
            Map<String, Object> result = customerService.bookField(
                    fieldId, customer.getId(),
                    bookingRequest.get("bookingDate"),
                    bookingRequest.get("startTime"),
                    bookingRequest.get("endTime")
            );

            if (result.containsKey("error")) {
                return ResponseEntity.badRequest().body(result);
            }

            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("error", "An error occurred while processing your booking: " + e.getMessage()));
        }
    }

    // ✅ Get customer booking history
    @GetMapping("/my-bookings")
    @PreAuthorize("hasRole('CUSTOMER')")
    public List<Booking> getCustomerBookings(@AuthenticationPrincipal UserDetails userDetails) {
        User customer = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return customerService.getCustomerBookings(customer.getId());
    }

    // ✅ Cancel a booking
    @DeleteMapping("/cancel-booking/{bookingId}")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<?> cancelBooking(@PathVariable Long bookingId) {
        try {
            String result = customerService.cancelBooking(bookingId);
            return ResponseEntity.ok(Collections.singletonMap("message", result));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("error", "An error occurred while canceling the booking: " + e.getMessage()));
        }
    }

    // ✅ Check Availability API - Returns JSON Response
    @PostMapping("/check-availability/{fieldId}")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<?> checkAvailability(
            @PathVariable("fieldId") Long fieldId,
            @RequestParam String date,
            @RequestParam String startTime,
            @RequestParam String endTime,
            @AuthenticationPrincipal UserDetails userDetails) {

        System.out.println("🔍 Checking availability for fieldId: " + fieldId +
                " | Date: " + date +
                " | StartTime: " + startTime +
                " | EndTime: " + endTime +
                " | User: " + userDetails.getUsername());

        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Collections.singletonMap("error", "Unauthorized access. Please log in."));
        }

        try {
            LocalDate bookingDate = LocalDate.parse(date);
            LocalTime start = LocalTime.parse(startTime, TIME_FORMATTER);
            LocalTime end = LocalTime.parse(endTime, TIME_FORMATTER);

            // Validate that end time is after start time
            if (end.isBefore(start) || end.equals(start)) {
                return ResponseEntity.badRequest()
                        .body(Collections.singletonMap("error", "End time must be after start time."));
            }

            if (bookingDate.isBefore(LocalDate.now())) {
                return ResponseEntity.ok(Collections.singletonMap("available", false));
            }

            // Check availability
            boolean isAvailable = customerService.isFieldAvailable(fieldId, date, startTime, endTime);

            System.out.println("✅ Availability Check Result: " + isAvailable);
            return ResponseEntity.ok(Collections.singletonMap("available", isAvailable));

        } catch (DateTimeParseException e) {
            return ResponseEntity.badRequest()
                    .body(Collections.singletonMap("error", "Invalid time format. Please use HH:mm for time and YYYY-MM-DD for date."));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("error", "An error occurred while checking availability: " + e.getMessage()));
        }
    }
}
