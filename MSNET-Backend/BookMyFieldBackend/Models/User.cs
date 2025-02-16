using System.ComponentModel.DataAnnotations;

namespace BookMyFieldBackend.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Username { get; set; }

        [Required, EmailAddress]
        public string Email { get; set; }

        [Required]
        public string MobileNumber { get; set; }

        [Required]
        public string CustomerName { get; set; }

        [Required]
        public string PasswordHash { get; set; }

        [Required]
        public string Role { get; set; } // Customer, FieldOwner, Admin
    }
}
