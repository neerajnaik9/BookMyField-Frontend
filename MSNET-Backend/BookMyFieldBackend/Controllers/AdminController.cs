using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BookMyFieldBackend.Data;
using BookMyFieldBackend.Models;

namespace BookMyFieldBackend.Controllers
{
    [Authorize(Roles = "admin")]
    [Route("api/admin")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly BookMyFieldDbContext _context;

        public AdminController(BookMyFieldDbContext context)
        {
            _context = context;
        }

        // ✅ Get all pending field approvals
        [HttpGet("pending-approvals")]
        public async Task<IActionResult> GetPendingApprovals()
        {
            var pendingFields = await _context.Fields
                .Where(f => f.ApprovalStatus == "Pending")
                .ToListAsync();

            return Ok(pendingFields);
        }

        // ✅ Approve a field
        [HttpPut("approve-field/{id}")]
        public async Task<IActionResult> ApproveField(int id)
        {
            var field = await _context.Fields.FindAsync(id);
            if (field == null)
                return NotFound(new { message = "Field not found" });

            field.ApprovalStatus = "Approved";
            await _context.SaveChangesAsync();

            return Ok(new { message = "Field approved successfully!" });
        }

        // ✅ Reject a field
        [HttpPut("reject-field/{id}")]
        public async Task<IActionResult> RejectField(int id)
        {
            var field = await _context.Fields.FindAsync(id);
            if (field == null)
                return NotFound(new { message = "Field not found" });

            field.ApprovalStatus = "Rejected";
            await _context.SaveChangesAsync();

            return Ok(new { message = "Field rejected successfully!" });
        }

        // ✅ Get all registered customers
        [HttpGet("customers")]
        public async Task<IActionResult> GetCustomers()
        {
            var customers = await _context.Users
                .Where(u => u.Role == "Customer") // ✅ Fetch only Customers
                .Select(u => new
                {
                    u.Username,
                    u.Email,
                    u.MobileNumber,
                    u.CustomerName
                })
                .ToListAsync();

            return Ok(customers);
        }


        [HttpGet("turf-owners")]
        public async Task<IActionResult> GetTurfOwners()
        {
            Console.WriteLine("🔹 Fetching all Turf Owners...");

            var owners = await _context.Users
                .Where(u => u.Role == "FieldOwner") // ✅ Fetch only Field Owners
                .Select(u => new
                {
                    u.Id,
                    u.Username,
                    u.Email,
                    u.MobileNumber,
                    u.CustomerName
                })
                .ToListAsync();

            return Ok(owners);
        }




    }
}
