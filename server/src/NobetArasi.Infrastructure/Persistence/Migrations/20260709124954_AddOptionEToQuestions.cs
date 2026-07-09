using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NobetArasi.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddOptionEToQuestions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "OptionE",
                table: "questions",
                type: "character varying(300)",
                maxLength: 300,
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "questions",
                keyColumn: "Id",
                keyValue: 1,
                column: "OptionE",
                value: "Pseudomonas aeruginosa");

            migrationBuilder.UpdateData(
                table: "questions",
                keyColumn: "Id",
                keyValue: 2,
                column: "OptionE",
                value: "Eozinofil artışı, glukoz yüksek");

            migrationBuilder.UpdateData(
                table: "questions",
                keyColumn: "Id",
                keyValue: 3,
                column: "OptionE",
                value: "Hücre membran sterol sentezini inhibe etmek");

            migrationBuilder.UpdateData(
                table: "questions",
                keyColumn: "Id",
                keyValue: 4,
                column: "OptionE",
                value: "Ciltte gri-mavi renk değişikliği");

            migrationBuilder.UpdateData(
                table: "questions",
                keyColumn: "Id",
                keyValue: 5,
                column: "OptionE",
                value: "Hücre membranının travmatik parçalanmasıdır");

            migrationBuilder.UpdateData(
                table: "questions",
                keyColumn: "Id",
                keyValue: 6,
                column: "OptionE",
                value: "Melanosit");

            migrationBuilder.UpdateData(
                table: "questions",
                keyColumn: "Id",
                keyValue: 7,
                column: "OptionE",
                value: "D-dimer yüksekliği");

            migrationBuilder.UpdateData(
                table: "questions",
                keyColumn: "Id",
                keyValue: 8,
                column: "OptionE",
                value: "MCV belirgin yüksekliği");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OptionE",
                table: "questions");
        }
    }
}
