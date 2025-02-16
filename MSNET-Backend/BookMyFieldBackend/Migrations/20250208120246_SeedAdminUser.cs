using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookMyFieldBackend.Migrations
{
    /// <inheritdoc />
    public partial class SeedAdminUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CustomerName", "Email", "MobileNumber", "PasswordHash", "Role", "Username" },
                values: new object[] { 1, "Admin Singh", "admin@gmail.com", "1234567890", "$2a$11$hAy6ixi7ZRhA8sws1uMpVuQ1X.EeKIMfdFJHM0FjH38L2wsOZtvTW", "admin", "admin" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1);
        }
    }
}
