package com.bookmyfield.BookMyFieldBackend.repository;

import com.bookmyfield.BookMyFieldBackend.model.Booking;
import com.bookmyfield.BookMyFieldBackend.model.Field;
import com.bookmyfield.BookMyFieldBackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByCustomer(User customer);
    List<Booking> findByField(Field field);

    // ✅ Exclude "Pending Payment" bookings less than 10 minutes old
    @Query("SELECT CASE WHEN COUNT(b) > 0 THEN TRUE ELSE FALSE END FROM Booking b " +
           "WHERE b.field = :field AND b.bookingDate = :bookingDate " +
           "AND b.startTime <= :endTime AND b.endTime >= :startTime " +
           "AND (b.status != 'Pending Payment' OR b.createdAt < :threshold)")
    boolean existsByFieldAndBookingDateAndStartTimeLessThanEqualAndEndTimeGreaterThanEqualAndNotPending(
            @Param("field") Field field,
            @Param("bookingDate") LocalDate bookingDate,
            @Param("startTime") LocalTime startTime,
            @Param("endTime") LocalTime endTime,
            @Param("threshold") LocalDateTime threshold
    );

    // ✅ Delete old "Pending Payment" bookings
    @Modifying
    @Query("DELETE FROM Booking b WHERE b.status = 'Pending Payment' AND b.createdAt < :expiryTime")
    void deleteOldPendingBookings(@Param("expiryTime") LocalDateTime expiryTime);
}