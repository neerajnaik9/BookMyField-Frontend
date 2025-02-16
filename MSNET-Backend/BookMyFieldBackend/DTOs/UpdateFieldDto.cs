using System.ComponentModel.DataAnnotations;

using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;


namespace BookMyFieldBackend.DTOs
{
    //public class UpdateFieldDto
    //{
    //    public string Name { get; set; }
    //    public string Location { get; set; }
    //    public string Description { get; set; }
    //    public string AvailableTimings { get; set; }
    //    public decimal PricePerHour { get; set; }  // Ensure this is a decimal
    //    public string Category { get; set; }
    //    public string Status { get; set; }
    //}


    public class UpdateFieldDto
    {
        [Required(ErrorMessage = "Field name is required.")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Location is required.")]
        public string Location { get; set; }

        public string Description { get; set; }

        [Required(ErrorMessage = "Timings are required.")]
        public string AvailableTimings { get; set; }

        [Required(ErrorMessage = "Price is required.")]
        [Range(1, double.MaxValue, ErrorMessage = "Price must be greater than zero.")]
        public decimal PricePerHour { get; set; }

        [Required(ErrorMessage = "Category is required.")]
        public string Category { get; set; }

        [Required(ErrorMessage = "Status is required.")]
        public string Status { get; set; }

        public IFormFile? Image { get; set; }  // ✅ Allow optional image upload
    }




}
