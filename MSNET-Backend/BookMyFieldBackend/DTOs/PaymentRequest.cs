using System.ComponentModel.DataAnnotations;

namespace BookMyFieldBackend.DTOs
{
    public class PaymentRequest
    {
        [Required]
        public int BookingId { get; set; } // Reference to the booking

        [Required]
        public decimal Amount { get; set; } // Amount to be paid

        [Required]
        public string Currency { get; set; } = "INR"; // Default currency INR
    }
}
