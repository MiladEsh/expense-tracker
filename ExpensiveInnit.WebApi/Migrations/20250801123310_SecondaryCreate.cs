using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ExpensiveInnit.WebApi.Migrations
{
    /// <inheritdoc />
    public partial class SecondaryCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateOnly>(
                name: "Date",
                table: "Expenses",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Date",
                table: "Expenses");
        }
    }
}
