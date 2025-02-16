using System.ComponentModel.DataAnnotations;

namespace BookMyFieldBackend.DTOs
{
    public class RegisterDTO
    {
        [Required]
        public string Username { get; set; }

        [Required, EmailAddress]
        public string Email { get; set; }

        [Required]
        public string MobileNumber { get; set; }

        [Required]
        public string CustomerName { get; set; }

        [Required]
        public string Password { get; set; } // No need for PasswordHash in API request

        [Required]
        public string Role { get; set; } // Customer, FieldOwner, Admin
    }
}
