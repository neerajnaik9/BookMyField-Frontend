using System.ComponentModel.DataAnnotations;

namespace BookMyFieldBackend.Models
{
    public class Field
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Location { get; set; }

        public string Description { get; set; }

        [Required]
        public string AvailableTimings { get; set; } // Comma-separated timings

        [Required]
        public decimal PricePerHour { get; set; }

        [Required]
        public string Category { get; set; } // e.g., Cricket, Football, etc.

        public string ImageUrl { get; set; } // For field images

        [Required]
        public string OwnerId { get; set; } // Reference to the Field Owner

        public string ApprovalStatus { get; set; } = "Pending"; // Default status
    }
}
