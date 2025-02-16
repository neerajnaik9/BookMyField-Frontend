using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using BookMyFieldBackend.Data;
using BookMyFieldBackend.Models;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using System;
using BookMyFieldBackend.Models.DTOs;
using System.Net.Mail;
using System.Net;

namespace BookMyFieldBackend.Controllers
{
    [Route("api/customer")]
    [ApiController]
    [Authorize(Roles = "Customer")]  // Only customers can access these endpoints
    public class CustomerController : ControllerBase
    {
        private readonly BookMyFieldDbContext _context;

        public CustomerController(BookMyFieldDbContext context)
        {
            _context = context;
        }

        // 1️⃣ Get Available Sports Categories
        [HttpGet("categories")]
        public IActionResult GetSportsCategories()
        {
            var categories = new List<string> { "Cricket", "Football", "Basketball", "Badminton" };
            return Ok(categories);
        }

        // 2️⃣ Fetch Approved Fields
        [HttpGet("fields")]
        public async Task<IActionResult> GetApprovedFields()
        {
            var fields = await _context.Fields
                .Where(f => f.ApprovalStatus == "Approved")
                .ToListAsync();
            return Ok(fields);
        }

        //// 3️⃣ Check Availability Before Booking
        //[HttpPost("check-availability")]
        //public async Task<IActionResult> CheckAvailability([FromBody] BookingRequest bookingRequest)
        //{
        //    if (bookingRequest == null)
        //    {
        //        return BadRequest(new { message = "Invalid booking request data." });
        //    }

        //    var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        //    if (userId == null)
        //    {
        //        return Unauthorized(new { message = "User not authenticated." });
        //    }

        //    // Assign the authenticated customer ID instead of taking it from the request
        //    bookingRequest.CustomerId = userId;

        //    if (bookingRequest.Duration < 1 || bookingRequest.Duration > 24)
        //    {
        //        return BadRequest(new { message = "Invalid duration selected." });
        //    }

        //    // If Full Day selected, ignore time slot checking
        //    if (bookingRequest.Duration == 24)
        //    {
        //        var fullDayBooking = await _context.Bookings
        //            .AnyAsync(b => b.FieldId == bookingRequest.FieldId && b.BookingDate == bookingRequest.BookingDate);

        //        if (fullDayBooking)
        //        {
        //            return BadRequest(new { message = "This field is already booked for the full day." });
        //        }

        //        return Ok(new { message = "Field available for full day booking." });
        //    }

        //    // Check if the selected time slot is already booked
        //    var existingBooking = await _context.Bookings
        //        .AnyAsync(b => b.FieldId == bookingRequest.FieldId &&
        //                       b.BookingDate == bookingRequest.BookingDate &&
        //                       b.TimeSlot == bookingRequest.TimeSlot);

        //    if (existingBooking)
        //    {
        //        return BadRequest(new { message = "Time slot already booked, please choose another slot." });
        //    }

        //    return Ok(new { message = "Slot is available." });
        //}




        [HttpPost("check-availability")]
        public async Task<IActionResult> CheckAvailability([FromBody] BookingRequest bookingRequest)
        {
            if (bookingRequest == null)
            {
                return BadRequest(new { message = "Invalid booking request data." });
            }

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized(new { message = "User not authenticated." });
            }
            bookingRequest.CustomerId = userId;  // Ensure it's assigned


            if (bookingRequest.Duration < 1 || bookingRequest.Duration > 24)
            {
                return BadRequest(new { message = "Invalid duration selected." });
            }

            // If Full Day selected, ignore time slot checking
            if (bookingRequest.Duration == 24)
            {
                var fullDayBooking = await _context.Bookings
                    .AnyAsync(b => b.FieldId == bookingRequest.FieldId && b.BookingDate == bookingRequest.BookingDate);

                if (fullDayBooking)
                {
                    return BadRequest(new { message = "This field is already booked for the full day." });
                }

                return Ok(new { message = "Field available for full day booking." });
            }

            // Check if the selected time slot is already booked
            var existingBooking = await _context.Bookings
                .Where(b => b.FieldId == bookingRequest.FieldId && b.BookingDate == bookingRequest.BookingDate)
                .ToListAsync();

            //bool isSlotTaken = existingBooking.Any(b =>
            //{
            //    var bookedTimes = b.TimeSlot.Split(" - ");
            //    var selectedTimes = bookingRequest.TimeSlot.Split(" - ");

            //    DateTime bookedStart = DateTime.ParseExact(bookedTimes[0], "hh:mm tt", null);
            //    DateTime bookedEnd = DateTime.ParseExact(bookedTimes[1], "hh:mm tt", null);
            //    DateTime selectedStart = DateTime.ParseExact(selectedTimes[0], "hh:mm tt", null);
            //    DateTime selectedEnd = DateTime.ParseExact(selectedTimes[1], "hh:mm tt", null);

            //    return selectedStart < bookedEnd && selectedEnd > bookedStart;
            //});

            bool isSlotTaken = existingBooking.Any(b =>
            {
                if (b.TimeSlot == "Full Day" || bookingRequest.TimeSlot == "Full Day")
                {
                    // If any booking is for "Full Day", the field is not available for any slot
                    return true;
                }

                var bookedTimes = b.TimeSlot.Split(" - ");
                var selectedTimes = bookingRequest.TimeSlot.Split(" - ");

                // Ensure time slots have valid time formats before parsing
                if (bookedTimes.Length < 2 || selectedTimes.Length < 2)
                {
                    return false; // Ignore invalid time slots
                }

                DateTime bookedStart = DateTime.ParseExact(bookedTimes[0], "hh:mm tt", null);
                DateTime bookedEnd = DateTime.ParseExact(bookedTimes[1], "hh:mm tt", null);
                DateTime selectedStart = DateTime.ParseExact(selectedTimes[0], "hh:mm tt", null);
                DateTime selectedEnd = DateTime.ParseExact(selectedTimes[1], "hh:mm tt", null);

                return selectedStart < bookedEnd && selectedEnd > bookedStart;
            });


            if (isSlotTaken)
            {
                return BadRequest(new { message = "Time slot already booked, please choose another slot." });
            }

            return Ok(new { message = "Slot is available." });
        }








        //// 4️⃣ Book a Turf with Dynamic Time Slot Logic
        //[HttpPost("book-field")]
        //public async Task<IActionResult> BookField([FromBody] BookingRequest bookingRequest)
        //{
        //    if (bookingRequest == null)
        //    {
        //        return BadRequest(new { message = "Invalid booking request data." });
        //    }

        //    var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        //    if (userId == null)
        //    {
        //        return Unauthorized(new { message = "User not authenticated." });
        //    }

        //    // Assign the authenticated customer ID
        //    bookingRequest.CustomerId = userId;

        //    // Validate if field exists
        //    var field = await _context.Fields.FindAsync(bookingRequest.FieldId);
        //    if (field == null)
        //    {
        //        return NotFound(new { message = "Field not found." });
        //    }

        //    // 1️⃣ **Check for Existing Booking for the Same Time Slot**
        //    var isSlotBooked = await _context.Bookings.AnyAsync(b =>
        //        b.FieldId == bookingRequest.FieldId &&
        //        b.BookingDate == bookingRequest.BookingDate &&
        //        b.TimeSlot == bookingRequest.TimeSlot
        //    );

        //    if (isSlotBooked)
        //    {
        //        return BadRequest(new { message = "Time slot already booked, please choose another slot." });
        //    }

        //    // 2️⃣ **Create New Booking Entity**
        //    var booking = new Booking
        //    {
        //        FieldId = bookingRequest.FieldId,
        //        CustomerId = bookingRequest.CustomerId,
        //        BookingDate = bookingRequest.BookingDate,
        //        TimeSlot = bookingRequest.TimeSlot,
        //        Duration = bookingRequest.Duration,
        //        Price = bookingRequest.Price,
        //        BookingStatus = "Confirmed",
        //        PaymentStatus = "Pending Payment",
        //        RazorpayOrderId = null // ✅ Initially NULL, will be assigned after payment initiation
        //    };

        //    _context.Bookings.Add(booking);
        //    await _context.SaveChangesAsync();

        //    return Ok(new { message = "Booking placed successfully", booking });
        //}




        //// 4️⃣ Book a Turf with Dynamic Time Slot Logic
        //[HttpPost("book-field")]
        //public async Task<IActionResult> BookField([FromBody] BookingRequest bookingRequest)
        //{
        //    if (bookingRequest == null)
        //    {
        //        return BadRequest(new { message = "Invalid booking request data." });
        //    }

        //    var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        //    if (userId == null)
        //    {
        //        return Unauthorized(new { message = "User not authenticated." });
        //    }

        //    // Assign the authenticated customer ID
        //    bookingRequest.CustomerId = userId;

        //    // Validate if field exists
        //    var field = await _context.Fields.FindAsync(bookingRequest.FieldId);

        //    // 1️⃣ **Check for Existing Booking for the Same Time Slot**
        //    var isSlotBooked = await _context.Bookings.AnyAsync(b =>
        //        b.FieldId == bookingRequest.FieldId &&
        //        b.BookingDate == bookingRequest.BookingDate &&
        //        b.TimeSlot == bookingRequest.TimeSlot
        //    );

        //    if (isSlotBooked)
        //    {
        //        return BadRequest(new { message = "Time slot already booked, please choose another slot." });
        //    }

        //    // 2️⃣ **Create New Booking Entity**
        //    var booking = new Booking
        //    {
        //        FieldId = bookingRequest.FieldId,
        //        CustomerId = bookingRequest.CustomerId,
        //        BookingDate = bookingRequest.BookingDate,
        //        TimeSlot = bookingRequest.TimeSlot,
        //        Duration = bookingRequest.Duration,
        //        Price = bookingRequest.Price,
        //        BookingStatus = "Confirmed",
        //        PaymentStatus = "Pending Payment",
        //        RazorpayOrderId = null // ✅ Initially NULL, will be assigned after payment initiation
        //    };

        //    _context.Bookings.Add(booking);
        //    await _context.SaveChangesAsync();

        //    return Ok(new { message = "Booking placed successfully", booking });
        //}







        //[HttpPost("book-field")]
        //public async Task<IActionResult> BookField([FromBody] BookingRequest bookingRequest)
        //{
        //    if (bookingRequest == null)
        //    {
        //        return BadRequest(new { message = "Invalid booking request data." });
        //    }

        //    var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        //    if (string.IsNullOrEmpty(userId))
        //    {
        //        return Unauthorized(new { message = "User not authenticated." });
        //    }

        //    // Fetch customer details from database
        //    var customer = await _context.Customers.FirstOrDefaultAsync(c => c.Id == userId);
        //    if (customer == null)
        //    {
        //        return NotFound(new { message = "Customer not found." });
        //    }

        //    // Validate if the field exists
        //    var field = await _context.Fields.FindAsync(bookingRequest.FieldId);

        //    // 1️⃣ **Check for Existing Booking for the Same Time Slot**
        //    var isSlotBooked = await _context.Bookings.AnyAsync(b =>
        //        b.FieldId == bookingRequest.FieldId &&
        //        b.BookingDate == bookingRequest.BookingDate &&
        //        b.TimeSlot == bookingRequest.TimeSlot
        //    );

        //    if (isSlotBooked)
        //    {
        //        return BadRequest(new { message = "Time slot already booked, please choose another slot." });
        //    }

        //    // 2️⃣ **Create New Booking Entity (Using Fetched `CustomerId`)**
        //    var booking = new Booking
        //    {
        //        FieldId = bookingRequest.FieldId,
        //        CustomerId = customer.Id, // 🔹 Fetching from database
        //        BookingDate = bookingRequest.BookingDate,
        //        TimeSlot = bookingRequest.TimeSlot,
        //        Duration = bookingRequest.Duration,
        //        Price = bookingRequest.Price,
        //        BookingStatus = "Confirmed",
        //        PaymentStatus = "Pending Payment",
        //        RazorpayOrderId = null // ✅ Initially NULL, will be assigned after payment initiation
        //    };

        //    _context.Bookings.Add(booking);
        //    await _context.SaveChangesAsync();

        //    return Ok(new { message = "Booking placed successfully", booking });
        //}









        //[HttpPost("book-field")]
        //public async Task<IActionResult> BookField([FromBody] BookingRequest bookingRequest)
        //{
        //    if (bookingRequest == null)
        //    {
        //        return BadRequest(new { message = "Invalid booking request data." });
        //    }

        //    var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        //    if (string.IsNullOrEmpty(userId))
        //    {
        //        return Unauthorized(new { message = "User not authenticated." });
        //    }

        //    // Validate if field exists
        //    var field = await _context.Fields.FindAsync(bookingRequest.FieldId);
        //    if (field == null)
        //    {
        //        return NotFound(new { message = "Field not found." });
        //    }

        //    // **Create New Booking**
        //    var booking = new Booking
        //    {
        //        FieldId = bookingRequest.FieldId,
        //        CustomerId = userId, // ✅ Fetch from JWT instead of request
        //        BookingDate = bookingRequest.BookingDate,
        //        TimeSlot = bookingRequest.TimeSlot,
        //        Duration = bookingRequest.Duration,
        //        Price = bookingRequest.Price,
        //        BookingStatus = "Confirmed",
        //        PaymentStatus = "Completed", // ✅ Ensure payment is marked completed
        //        RazorpayOrderId = null
        //    };

        //    _context.Bookings.Add(booking);
        //    await _context.SaveChangesAsync();

        //    return Ok(new { message = "Booking placed successfully", booking });
        //}












        [HttpPost("book-field")]
        public async Task<IActionResult> BookField([FromBody] BookingRequest bookingRequest)
        {
            if (bookingRequest == null)
            {
                return BadRequest(new { message = "Invalid booking request data." });
            }

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized(new { message = "User not authenticated." });
            }

            // Validate if field exists
            var field = await _context.Fields.FindAsync(bookingRequest.FieldId);
            if (field == null)
            {
                return NotFound(new { message = "Field not found." });
            }

            // **Create New Booking**
            var booking = new Booking
            {
                FieldId = bookingRequest.FieldId,
                CustomerId = userId, // ✅ Fetch from JWT instead of request
                BookingDate = bookingRequest.BookingDate,
                TimeSlot = bookingRequest.TimeSlot,
                Duration = bookingRequest.Duration,
                Price = bookingRequest.Price,
                BookingStatus = "Confirmed",
                PaymentStatus = "Completed", // ✅ Ensure payment is marked completed
                RazorpayOrderId = null
            };

            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Booking placed successfully", booking });
        }
























        // 5️⃣ Fetch Customer Booking History
        [HttpGet("booking-history")]
        public async Task<IActionResult> GetBookingHistory()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return Unauthorized(new { message = "User not authenticated" });
            }

            var bookings = await _context.Bookings
                .Where(b => b.CustomerId == userId)
                .Include(b => b.Field)
                .ToListAsync();

            return Ok(bookings);
        }

        // 6️⃣ Contact Us API
        [HttpPost("contact-us")]
        public async Task<IActionResult> ContactUs([FromBody] ContactUs contact)
        {
            _context.ContactUsMessages.Add(contact);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Message sent successfully" });
        }


        //[HttpPost("contact-us")]
        //public async Task<IActionResult> ContactUs([FromBody] ContactUs contact)
        //{
        //    if (contact == null)
        //    {
        //        return BadRequest(new { message = "Invalid request data" });
        //    }

        //    // Debugging - Log received data
        //    Console.WriteLine($"Received Data: Name={contact.Name}, Email={contact.Email}, Message={contact.Message}");

        //    // Check if model properties are null
        //    if (string.IsNullOrWhiteSpace(contact.Name) || string.IsNullOrWhiteSpace(contact.Email) || string.IsNullOrWhiteSpace(contact.Message))
        //    {
        //        return BadRequest(new { message = "All fields are required!" });
        //    }

        //    try
        //    {
        //        // Store in Database
        //        _context.ContactUsMessages.Add(contact);
        //        await _context.SaveChangesAsync();

        //        // Debugging - Check if data was saved
        //        var savedContact = await _context.ContactUsMessages.FindAsync(contact.Id);
        //        if (savedContact == null)
        //        {
        //            return StatusCode(500, new { message = "Failed to store message in database." });
        //        }

        //        // Send Email
        //        await SendEmail(contact);

        //        return Ok(new { message = "Message stored and email sent successfully!" });
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, new { message = "Internal Server Error", error = ex.Message });
        //    }
        //}

        //private async Task SendEmail(ContactUs contact)
        //{
        //    try
        //    {
        //        var senderEmail = "your-email@example.com";
        //        var senderPassword = "your-email-password";
        //        var smtpHost = "smtp.gmail.com";
        //        var smtpPort = 587;

        //        using (var client = new SmtpClient(smtpHost, smtpPort))
        //        {
        //            client.Credentials = new NetworkCredential(senderEmail, senderPassword);
        //            client.EnableSsl = true;

        //            var mailMessage = new MailMessage
        //            {
        //                From = new MailAddress(senderEmail),
        //                Subject = "New Contact Us Message",
        //                Body = $"<p><b>Name:</b> {contact.Name}</p><p><b>Email:</b> {contact.Email}</p><p><b>Message:</b> {contact.Message}</p>",
        //                IsBodyHtml = true,
        //            };

        //            mailMessage.To.Add("recipient@example.com");
        //            await client.SendMailAsync(mailMessage);
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        Console.WriteLine($"Email Sending Error: {ex.Message}");
        //    }
        //}




    }
}

