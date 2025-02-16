package com.bookmyfield.BookMyFieldBackend.service;

import com.bookmyfield.BookMyFieldBackend.model.Booking;
import com.bookmyfield.BookMyFieldBackend.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    // ✅ Mark Booking as Paid after Payment
    public void markBookingAsPaid(Long bookingId) {
        Optional<Booking> bookingOptional = bookingRepository.findById(bookingId);
        if (bookingOptional.isPresent()) {
            Booking booking = bookingOptional.get();
            booking.setStatus("Paid");
            bookingRepository.save(booking);
        }
    }

    // ✅ Scheduled Task: Remove expired "Pending Payment" bookings
    @Scheduled(fixedRate = 600000) // Runs every 10 minutes
    @Transactional
    public void removeExpiredPendingBookings() {
        LocalDateTime expiryTime = LocalDateTime.now().minusMinutes(10);
        bookingRepository.deleteOldPendingBookings(expiryTime);
        System.out.println("🧹 Removed expired 'Pending Payment' bookings");
    }
}