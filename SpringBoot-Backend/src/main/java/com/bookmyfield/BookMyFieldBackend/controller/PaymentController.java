package com.bookmyfield.BookMyFieldBackend.controller;

import com.bookmyfield.BookMyFieldBackend.model.Booking;
import com.bookmyfield.BookMyFieldBackend.service.BookingService;
import com.bookmyfield.BookMyFieldBackend.repository.BookingRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {

    private final BookingService bookingService;
    private final BookingRepository bookingRepository;

    public PaymentController(BookingService bookingService, BookingRepository bookingRepository) {
        this.bookingService = bookingService;
        this.bookingRepository = bookingRepository;
    }

    // ✅ Razorpay Order Creation API
    @PostMapping("/create-order")
    public ResponseEntity<Map<String, Object>> createOrder(@RequestBody Map<String, Object> request) {
        try {
            // ✅ Fix: Ensure `amount` is properly cast to `Double`
        	  int amount = ((Number) request.get("amount")).intValue();  
            String currency = request.get("currency").toString();

            // ✅ Generating a mock Order ID for testing
            String orderId = UUID.randomUUID().toString();

            // ✅ Response mimicking Razorpay Order Creation
            Map<String, Object> response = new HashMap<>();
            response.put("orderId", orderId);
            response.put("amount", amount);
            response.put("currency", currency);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", "Invalid payment request: " + e.getMessage()));
        }
    }

    // ✅ Process Payment
    @PostMapping("/confirm")
    public ResponseEntity<Map<String, String>> processPayment(
            @RequestParam Long bookingId,
            @RequestParam String paymentId,
            @AuthenticationPrincipal UserDetails userDetails) {

        Optional<Booking> bookingOptional = bookingRepository.findById(bookingId);
        if (bookingOptional.isEmpty()) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("message", "Invalid Booking ID!"));
        }

        Booking booking = bookingOptional.get();

        // ✅ Ensure the user is the one who made the booking
        if (!booking.getCustomer().getEmail().equals(userDetails.getUsername())) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("message", "Unauthorized Payment Attempt!"));
        }

        // ✅ Simulated Payment Processing
        boolean paymentSuccess = true; // Assume payment success for now

        if (paymentSuccess) {
            bookingService.markBookingAsPaid(bookingId);

            // ✅ Return success response
            Map<String, String> response = new HashMap<>();
            response.put("message", "Payment Successful!");
            response.put("paymentId", paymentId);
            response.put("status", "Paid");

            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(Collections.singletonMap("message", "Payment Failed!"));
        }
    }
}
