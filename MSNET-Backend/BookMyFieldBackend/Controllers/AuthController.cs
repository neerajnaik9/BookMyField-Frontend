//using BookMyFieldBackend.Data;
//using BookMyFieldBackend.Models;
//using BookMyFieldBackend.DTOs; // ✅ Import DTOs
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using BCrypt.Net;
//using System.IdentityModel.Tokens.Jwt;
//using System.Security.Claims;
//using System.Text;
//using Microsoft.IdentityModel.Tokens;

//namespace BookMyFieldBackend.Controllers
//{
//    [Route("api/auth")]
//    [ApiController]
//    public class AuthController : ControllerBase
//    {
//        private readonly BookMyFieldDbContext _context;
//        private readonly IConfiguration _configuration;

//        public AuthController(BookMyFieldDbContext context, IConfiguration configuration)
//        {
//            _context = context;
//            _configuration = configuration;
//        }

//        [HttpPost("register")]
//        public async Task<IActionResult> Register([FromBody] RegisterDTO registerDto)
//        {
//            if (await _context.Users.AnyAsync(u => u.Email == registerDto.Email))
//            {
//                return BadRequest(new { message = "Email already exists" });
//            }

//            var user = new User
//            {
//                Username = registerDto.Username,
//                Email = registerDto.Email,
//                MobileNumber = registerDto.MobileNumber,
//                CustomerName = registerDto.CustomerName,
//                Role = registerDto.Role,
//                PasswordHash = BCrypt.Net.BCrypt.HashPassword(registerDto.Password) // Hashing Password
//            };

//            _context.Users.Add(user);
//            await _context.SaveChangesAsync();
//            return Ok(new { message = "User registered successfully!" });
//        }

//        [HttpPost("login")]
//        public async Task<IActionResult> Login([FromBody] LoginRequestDto loginRequest)
//        {
//            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == loginRequest.Email);
//            if (user == null || !BCrypt.Net.BCrypt.Verify(loginRequest.Password, user.PasswordHash))
//            {
//                return Unauthorized(new { message = "Invalid credentials" });
//            }

//            var tokenHandler = new JwtSecurityTokenHandler();
//            var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]);
//            var tokenDescriptor = new SecurityTokenDescriptor
//            {
//                Subject = new ClaimsIdentity(new[]
//                {
//            new Claim(ClaimTypes.Name, user.Username),
//             new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()), // ✅ Convert int to string
// // ✅ Add User Id
//            new Claim(ClaimTypes.Role, user.Role)
//        }),
//                Expires = DateTime.UtcNow.AddHours(2),
//                Issuer = _configuration["Jwt:Issuer"], // Add Issuer
//                Audience = _configuration["Jwt:Audience"], // Add Audience
//                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
//            };

//            var token = tokenHandler.CreateToken(tokenDescriptor);
//            return Ok(new
//            {
//                Token = tokenHandler.WriteToken(token),
//                User = new
//                {
//                    user.Id,
//                    user.Username,
//                    user.Email,
//                    user.MobileNumber,
//                    user.CustomerName,
//                    user.Role
//                }
//            });
//        }
//    }
//}







using BookMyFieldBackend.Data;
using BookMyFieldBackend.Models;
using BookMyFieldBackend.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace BookMyFieldBackend.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly BookMyFieldDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthController(BookMyFieldDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDTO registerDto)
        {
            if (await _context.Users.AnyAsync(u => u.Email == registerDto.Email))
            {
                return BadRequest(new { message = "Email already exists" });
            }

            var user = new User
            {
                Username = registerDto.Username,
                Email = registerDto.Email,
                MobileNumber = registerDto.MobileNumber, // Ensure backend expects this field
                CustomerName = registerDto.CustomerName,
                Role = registerDto.Role,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(registerDto.Password) // Hash password
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return Ok(new { message = "User registered successfully!" });
        }





        // ✅ User Login API
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto loginRequest)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == loginRequest.Email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(loginRequest.Password, user.PasswordHash))
            {
                return Unauthorized(new { message = "Invalid credentials" });
            }

            // ✅ Debugging: Log user role to check if it's stored correctly
            Console.WriteLine($"📢 Logging in User: {user.Email}, Role: {user.Role}");

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, user.Username),
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()), // ✅ Convert int to string
                    new Claim(ClaimTypes.Role, user.Role) // ✅ Ensure role is included
                }),
                Expires = DateTime.UtcNow.AddHours(2),
                Issuer = _configuration["Jwt:Issuer"],
                Audience = _configuration["Jwt:Audience"],
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            Console.WriteLine($"✅ Token Generated for User: {user.Email}, Role: {user.Role}");

            return Ok(new
            {
                token = tokenString,
                role = user.Role, // ✅ Ensure role is returned
                user = new
                {
                    user.Id,
                    user.Username,
                    user.Email,
                    user.MobileNumber,
                    user.CustomerName,
                    user.Role
                }
            });
        }
    }
}
