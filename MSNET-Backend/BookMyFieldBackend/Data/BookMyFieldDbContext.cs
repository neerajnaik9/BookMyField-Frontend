using Microsoft.EntityFrameworkCore;
using BookMyFieldBackend.Models;

namespace BookMyFieldBackend.Data
{
    public class BookMyFieldDbContext : DbContext
    {
        public BookMyFieldDbContext(DbContextOptions<BookMyFieldDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }

        public DbSet<Field> Fields { get; set; } // ✅ Add this line

        public DbSet<Booking> Bookings { get; set; }
        public DbSet<ContactUs> ContactUsMessages { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // ✅ Hash Admin Password
            string adminPasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin@123");

            // ✅ Add Admin User
            modelBuilder.Entity<User>().HasData(new User
            {
                Id = 1, // Ensure Admin has a fixed ID
                Username = "admin",
                Email = "admin@gmail.com",
                PasswordHash = adminPasswordHash, // Store hashed password
                Role = "admin",
                CustomerName = "Admin Abhi",
                MobileNumber = "1234567890"
            });
        }






    }
}
