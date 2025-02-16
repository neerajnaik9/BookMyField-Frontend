using System.ComponentModel.DataAnnotations;

namespace BookMyFieldBackend.DTOs
{
    public class AddFieldDto
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Location { get; set; }

        public string Description { get; set; }

        [Required]
        public string AvailableTimings { get; set; } // Comma-separated

        [Required]
        public decimal PricePerHour { get; set; }

        [Required]
        public string Category { get; set; }

        //public string ImageUrl { get; set; } // URL of uploaded field image

        public IFormFile? Image { get; set; } // ✅ Accept image file instead of ImageUrl
    }
}
