using System.ComponentModel.DataAnnotations;

namespace BookMyFieldBackend.DTOs
{
    public class PaymentVerificationRequest
    {
        [Required]
        public int BookingId { get; set; }

        [Required]
        public string PaymentId { get; set; } // Razorpay Payment ID

        [Required]
        public string OrderId { get; set; } // Razorpay Order ID

        [Required]
        public string Signature { get; set; } // Razorpay Signature
    }
}
