using System.ComponentModel.DataAnnotations;

namespace BookMyFieldBackend.Models
{
    public class ContactUs
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Message { get; set; }

        public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;
    }
}
