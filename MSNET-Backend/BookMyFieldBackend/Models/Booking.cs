using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookMyFieldBackend.Models
{
    public class Booking
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string CustomerId { get; set; } // Reference to User

        [Required]
        public int FieldId { get; set; } // Reference to Field

        [Required]
        public DateTime BookingDate { get; set; } // Selected Date

        public string TimeSlot { get; set; } // Nullable: Only required if not Full Day

        [Required]
        public int Duration { get; set; } // Duration in hours (1,2,3, or Full Day)

        [Required]
        public decimal Price { get; set; }

        public string PaymentStatus { get; set; } = "Pending Payment"; // Payment status

        [Required]
        public string BookingStatus { get; set; } = "Confirmed"; // Booking confirmed status

        public string? RazorpayOrderId { get; set; }  // ✅ Make it nullable

        public string? RazorpayPaymentId { get; set; } // ✅ Make it nullable

        public string? RazorpaySignature { get; set; } // ✅ Make it nullable


        [ForeignKey("FieldId")]
        public virtual Field Field { get; set; }
    }
}
