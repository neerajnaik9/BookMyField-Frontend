using BookMyFieldBackend.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// ✅ Configure MySQL Database Connection
builder.Services.AddDbContext<BookMyFieldDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"),
        new MySqlServerVersion(new Version(8, 0, 34))));

// ✅ Fix CORS (Allow Frontend Requests Properly)
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(MyAllowSpecificOrigins,
        policy =>
        {
            policy.AllowAnyOrigin() // ✅ Allow all origins for now (React frontend)
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

// ✅ Configure JWT Authentication with Enhanced Logging
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.RequireHttpsMetadata = false;
        options.SaveToken = true;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])),
            ClockSkew = TimeSpan.Zero // ✅ Fixes expiration-related issues
        };

        // ✅ Enable Debug Logging for JWT Authentication
        options.Events = new JwtBearerEvents
        {
            OnAuthenticationFailed = context =>
            {
                Console.WriteLine($"🔴 Authentication failed: {context.Exception.Message}");
                return Task.CompletedTask;
            },
            OnTokenValidated = context =>
            {
                var claims = context.Principal?.Claims;
                Console.WriteLine($"✅ Token validated for user: {context.Principal?.Identity?.Name}");
                return Task.CompletedTask;
            },
            OnChallenge = context =>
            {
                Console.WriteLine($"🚨 Authorization failed: {context.ErrorDescription}");
                return Task.CompletedTask;
            }
        };
    });

// ✅ Configure Authorization Policies
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("FieldOwnerOnly", policy => policy.RequireRole("FieldOwner"));
    options.AddPolicy("AdminOnly", policy => policy.RequireRole("Admin"));
});

// ✅ Add Controllers
builder.Services.AddControllers();

// ✅ Enable Swagger for API Documentation
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// ✅ Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

var webRootPath = builder.Environment.WebRootPath;
if (string.IsNullOrEmpty(webRootPath))
{
    builder.Environment.WebRootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
}

app.UseStaticFiles(); // ✅ Enables serving files from wwwroot

// ✅ Apply CORS Middleware Before Authentication & Authorization
app.UseCors(MyAllowSpecificOrigins);


app.UseCors(policy =>
    policy.WithOrigins("http://localhost:3000")  // ✅ Allow React Frontend
          .AllowAnyMethod()
          .AllowAnyHeader()
          .AllowCredentials()
);


app.UseAuthentication(); // ✅ Ensure authentication is before authorization
app.UseAuthorization();

app.MapControllers();

// ✅ Debug: Log Startup JWT Configuration
try
{
    Console.WriteLine($"📢 JWT Issuer: {builder.Configuration["Jwt:Issuer"]}");
    Console.WriteLine($"📢 JWT Audience: {builder.Configuration["Jwt:Audience"]}");
}
catch (Exception ex)
{
    Console.WriteLine($"🔴 Error reading JWT config: {ex.Message}");
}

app.Run();
