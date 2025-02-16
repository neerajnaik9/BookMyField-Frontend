using System;
using System.ComponentModel.DataAnnotations;

namespace BookMyFieldBackend.Models.DTOs
{
    public class BookingRequest
    {
        [Required]
        public int FieldId { get; set; } // Reference to Field

        [Required]
        public string CustomerId { get; set; } // Reference to Customer

        [Required]
        public DateTime BookingDate { get; set; } // Selected Date

        public string TimeSlot { get; set; } // Nullable: Only required if not Full Day

        [Required]
        public int Duration { get; set; } // Duration in hours

        [Required]
        public decimal Price { get; set; }
    }
}
