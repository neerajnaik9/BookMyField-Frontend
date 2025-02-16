using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BookMyFieldBackend.Data;
using BookMyFieldBackend.DTOs;
using BookMyFieldBackend.Models;
using Razorpay.Api;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using BookMyFieldBackend.Helpers;  // Ensure correct namespace for Utils
using Razorpay.Api.Errors;
using System.Security.Claims; // Fix for Razorpay exception handling

namespace BookMyFieldBackend.Controllers
{
    [Route("api/payment")]
    [ApiController]
    [Authorize(Roles = "Customer")]
    public class PaymentController : ControllerBase
    {
        private readonly BookMyFieldDbContext _context;
        private readonly IConfiguration _configuration;

        public PaymentController(BookMyFieldDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }







        //[HttpPost("create-order")]
        //public async Task<IActionResult> CreateOrder([FromBody] PaymentRequest request)
        //{
        //    var booking = await _context.Bookings.FindAsync(request.BookingId);

        //    // ✅ If booking does not exist, create it dynamically
        //    if (booking == null)
        //    {
        //        var newBooking = new Booking
        //        {
        //            CustomerId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value,
        //            FieldId = request.BookingId,
        //            BookingDate = DateTime.Today, // Default date
        //            TimeSlot = "Full Day",
        //            Duration = 24,
        //            Price = request.Amount,
        //            BookingStatus = "Pending",
        //            PaymentStatus = "Pending Payment"
        //        };

        //        _context.Bookings.Add(newBooking);
        //        await _context.SaveChangesAsync();
        //        booking = newBooking; // ✅ Assign new booking
        //    }

        //    var razorpayKey = _configuration["Razorpay:Key"];
        //    var razorpaySecret = _configuration["Razorpay:Secret"];

        //    try
        //    {
        //        RazorpayClient client = new RazorpayClient(razorpayKey, razorpaySecret);

        //        Dictionary<string, object> options = new Dictionary<string, object>
        //{
        //    { "amount", request.Amount * 100 },
        //    { "currency", request.Currency },
        //    { "payment_capture", 1 }
        //};

        //        Order order = client.Order.Create(options);

        //        if (order != null && order.Attributes.ContainsKey("id"))
        //        {
        //            booking.RazorpayOrderId = order["id"].ToString();
        //            await _context.SaveChangesAsync();

        //            return Ok(new
        //            {
        //                orderId = order["id"].ToString(),
        //                amount = request.Amount,
        //                currency = request.Currency
        //            });
        //        }
        //        else
        //        {
        //            return BadRequest(new { message = "Failed to create Razorpay order" });
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, new { message = "Server error: " + ex.Message });
        //    }
        //}




        [HttpPost("create-order")]
        public async Task<IActionResult> CreateOrder([FromBody] PaymentRequest request)
        {
            var booking = await _context.Bookings.FindAsync(request.BookingId);

            // ✅ If booking does not exist, create it dynamically
            if (booking == null)
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                var newBooking = new Booking
                {
                    CustomerId = userId,
                    FieldId = request.BookingId,
                    BookingDate = DateTime.Today,
                    TimeSlot = "Full Day",
                    Duration = 24,
                    Price = request.Amount, // ✅ Ensure correct price is assigned
                    BookingStatus = "Pending",
                    PaymentStatus = "Pending Payment"
                };

                _context.Bookings.Add(newBooking);
                await _context.SaveChangesAsync();
                booking = newBooking; // ✅ Assign new booking
            }

            var razorpayKey = _configuration["Razorpay:Key"];
            var razorpaySecret = _configuration["Razorpay:Secret"];

            try
            {
                RazorpayClient client = new RazorpayClient(razorpayKey, razorpaySecret);

                Dictionary<string, object> options = new Dictionary<string, object>
        {
            { "amount", request.Amount * 100 },
            { "currency", request.Currency },
            { "payment_capture", 1 }
        };

                Order order = client.Order.Create(options);

                if (order != null && order.Attributes.ContainsKey("id"))
                {
                    booking.RazorpayOrderId = order["id"].ToString();
                    await _context.SaveChangesAsync();

                    return Ok(new
                    {
                        orderId = order["id"].ToString(),
                        amount = request.Amount, // ✅ Fix amount calculation
                        currency = request.Currency
                    });
                }
                else
                {
                    return BadRequest(new { message = "Failed to create Razorpay order" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Server error: " + ex.Message });
            }
        }









































        //// 2️⃣ Verify Razorpay Payment
        //[HttpPost("verify-payment")]
        //public async Task<IActionResult> VerifyPayment([FromBody] PaymentVerificationRequest request)
        //{
        //    var booking = await _context.Bookings.FirstOrDefaultAsync(b => b.RazorpayOrderId == request.OrderId);
        //    if (booking == null)
        //    {
        //        return NotFound(new { message = "Booking not found" });
        //    }

        //    try
        //    {
        //        // 🚀 Dummy Verification Logic for Testing
        //        if (request.Signature == "dummy-signature")
        //        {
        //            booking.RazorpayPaymentId = request.PaymentId;
        //            booking.RazorpaySignature = request.Signature;
        //            booking.PaymentStatus = "Completed";

        //            await _context.SaveChangesAsync();

        //            return Ok(new { message = "Payment verified successfully" });
        //        }

        //        return BadRequest(new { message = "Verification failed", error = "Invalid payment signature" });
        //    }
        //    catch (System.Exception ex)
        //    {
        //        return BadRequest(new { message = "Payment verification failed", error = ex.Message });
        //    }
        //}


        //[HttpPost("verify-payment")]
        //public async Task<IActionResult> VerifyPayment([FromBody] PaymentVerificationRequest request)
        //{
        //    var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        //    if (string.IsNullOrEmpty(userId))
        //    {
        //        return Unauthorized(new { message = "User not authenticated." });
        //    }

        //    try
        //    {
        //        // 🚀 Dummy Verification Logic for Testing
        //        if (request.Signature == "dummy-signature")
        //        {
        //            // ✅ Step 1: Create Booking AFTER Payment is Verified
        //            var booking = new Booking
        //            {
        //                CustomerId = userId,
        //                FieldId = request.BookingId,
        //                BookingDate = DateTime.Today, // Default date
        //                TimeSlot = "Full Day",
        //                Duration = 24,
        //                Price = 500, // Default price (change dynamically)
        //                BookingStatus = "Confirmed",
        //                PaymentStatus = "Completed",
        //                RazorpayOrderId = request.OrderId,
        //                RazorpayPaymentId = request.PaymentId,
        //                RazorpaySignature = request.Signature
        //            };

        //            _context.Bookings.Add(booking);
        //            await _context.SaveChangesAsync();

        //            return Ok(new { message = "Payment verified and booking created successfully" });
        //        }

        //        return BadRequest(new { message = "Verification failed", error = "Invalid payment signature" });
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(new { message = "Payment verification failed", error = ex.Message });
        //    }
        //}










        [HttpPost("verify-payment")]
        public async Task<IActionResult> VerifyPayment([FromBody] PaymentVerificationRequest request)
        {
            try
            {
                var booking = await _context.Bookings.FirstOrDefaultAsync(b => b.RazorpayOrderId == request.OrderId);

                var razorpayKey = _configuration["Razorpay:Key"];
                var razorpaySecret = _configuration["Razorpay:Secret"];

                if (string.IsNullOrEmpty(razorpayKey) || string.IsNullOrEmpty(razorpaySecret))
                {
                    return StatusCode(500, new { message = "Razorpay API keys are missing. Check appsettings.json." });
                }

                // ✅ Validate Razorpay Payment Signature
                string generatedSignature = Helpers.Utils.GenerateRazorpaySignature(request.OrderId, request.PaymentId, razorpaySecret);
                if (generatedSignature != request.Signature)
                {
                    return BadRequest(new { message = "Invalid payment signature." });
                }

                // ✅ Update booking details after successful verification
                if (booking != null) // Ensure booking exists before modifying
                {
                    booking.RazorpayPaymentId = request.PaymentId;
                    booking.RazorpaySignature = request.Signature;
                    booking.PaymentStatus = "Completed";

                    await _context.SaveChangesAsync();
                }

                return Ok(new { message = "Payment verified successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Payment verification failed", error = ex.Message });
            }
        }







    }
}
