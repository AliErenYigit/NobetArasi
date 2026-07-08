using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace NobetArasi.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "categories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Slug = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    Description = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    DisplayOrder = table.Column<int>(type: "integer", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_categories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    FullName = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    Email = table.Column<string>(type: "character varying(180)", maxLength: 180, nullable: false),
                    PasswordHash = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "questions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CategoryId = table.Column<int>(type: "integer", nullable: false),
                    QuestionText = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: false),
                    OptionA = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: false),
                    OptionB = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: false),
                    OptionC = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: false),
                    OptionD = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: false),
                    CorrectOption = table.Column<string>(type: "character varying(1)", maxLength: 1, nullable: false),
                    Explanation = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: false),
                    TusNote = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: false),
                    Difficulty = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_questions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_questions_categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "quiz_attempts",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    CategoryId = table.Column<int>(type: "integer", nullable: false),
                    TotalQuestions = table.Column<int>(type: "integer", nullable: false),
                    CorrectCount = table.Column<int>(type: "integer", nullable: false),
                    WrongCount = table.Column<int>(type: "integer", nullable: false),
                    EarnedXp = table.Column<int>(type: "integer", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_quiz_attempts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_quiz_attempts_categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_quiz_attempts_users_UserId",
                        column: x => x.UserId,
                        principalTable: "users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "user_progresses",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    TotalXp = table.Column<int>(type: "integer", nullable: false),
                    Level = table.Column<int>(type: "integer", nullable: false),
                    TotalQuizCount = table.Column<int>(type: "integer", nullable: false),
                    TotalCorrectCount = table.Column<int>(type: "integer", nullable: false),
                    TotalWrongCount = table.Column<int>(type: "integer", nullable: false),
                    UpdatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_user_progresses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_user_progresses_users_UserId",
                        column: x => x.UserId,
                        principalTable: "users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "quiz_attempt_answers",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    QuizAttemptId = table.Column<Guid>(type: "uuid", nullable: false),
                    QuestionId = table.Column<int>(type: "integer", nullable: false),
                    SelectedOption = table.Column<string>(type: "character varying(1)", maxLength: 1, nullable: false),
                    IsCorrect = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_quiz_attempt_answers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_quiz_attempt_answers_questions_QuestionId",
                        column: x => x.QuestionId,
                        principalTable: "questions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_quiz_attempt_answers_quiz_attempts_QuizAttemptId",
                        column: x => x.QuizAttemptId,
                        principalTable: "quiz_attempts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "categories",
                columns: new[] { "Id", "Description", "DisplayOrder", "IsActive", "Name", "Slug" },
                values: new object[,]
                {
                    { 1, "Etkenler, tanı ipuçları ve temel klinik bilgiler.", 1, true, "Mikrobiyoloji", "mikrobiyoloji" },
                    { 2, "İlaç grupları, yan etkiler ve mekanizmalar.", 2, true, "Farmakoloji", "farmakoloji" },
                    { 3, "Hastalık mekanizmaları ve ayırıcı noktalar.", 3, true, "Patoloji", "patoloji" },
                    { 4, "Klinik yaklaşım ve sık karşılaşılan tablolar.", 4, true, "Dahiliye", "dahiliye" }
                });

            migrationBuilder.InsertData(
                table: "questions",
                columns: new[] { "Id", "CategoryId", "CorrectOption", "CreatedAtUtc", "Difficulty", "Explanation", "IsActive", "OptionA", "OptionB", "OptionC", "OptionD", "QuestionText", "TusNote" },
                values: new object[,]
                {
                    { 1, 1, "A", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Easy", "Lober pnömoni ve paslı balgam klasik olarak S. pneumoniae ile ilişkilidir.", true, "Streptococcus pneumoniae", "Mycoplasma pneumoniae", "Klebsiella pneumoniae", "Staphylococcus aureus", "Paslı balgam ile seyreden lober pnömonide en olası etken hangisidir?", "Lober pnömoni + paslı balgam → S. pneumoniae." },
                    { 2, 1, "B", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Easy", "Bakteriyel menenjitte BOS'ta nötrofil ve protein artar, glukoz düşer.", true, "Lenfosit artışı, glukoz normal", "Nötrofil artışı, glukoz düşük", "Protein düşük, glukoz yüksek", "Eritrosit artışı, protein normal", "Bakteriyel menenjitte BOS bulguları için en uygun ifade hangisidir?", "Bakteriyel menenjit → nötrofil ↑, protein ↑, glukoz ↓." },
                    { 3, 2, "B", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Easy", "Beta-laktamlar bakteri hücre duvarı sentezini inhibe eder.", true, "Protein sentezini inhibe etmek", "Hücre duvarı sentezini inhibe etmek", "DNA girazı aktive etmek", "Folat sentezini artırmak", "Beta-laktam antibiyotiklerin temel etki mekanizması nedir?", "Beta-laktam → hücre duvarı sentezi inhibisyonu." },
                    { 4, 2, "A", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Easy", "ACE inhibitörleri bradikinin artışıyla kuru öksürük yapabilir.", true, "Kuru öksürük", "Hipoglisemi", "İşitme kaybı", "Diş eti hipertrofisi", "ACE inhibitörlerinin sık görülen yan etkilerinden biri hangisidir?", "ACE inhibitörü → kuru öksürük, hiperkalemi, anjiyoödem." },
                    { 5, 3, "A", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Easy", "Apoptoz kontrollü/programlı hücre ölümüdür.", true, "Kontrollü hücre ölümü", "Her zaman inflamasyonla gider", "Sadece bakterilerde olur", "Nekroz ile tamamen aynıdır", "Apoptoz için en uygun ifade hangisidir?", "Apoptoz → kontrollü hücre ölümü." },
                    { 6, 3, "A", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Easy", "Akut inflamasyonda nötrofiller baskındır.", true, "Nötrofil", "Fibroblast", "Plazma hücresi", "Adiposit", "Akut inflamasyonda baskın hücre genellikle hangisidir?", "Akut inflamasyon → nötrofil." },
                    { 7, 4, "A", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Easy", "Primer hipotiroidide genellikle TSH yüksekliği beklenir.", true, "TSH yüksekliği", "TSH düşüklüğü", "Troponin yüksekliği", "Amilaz düşüklüğü", "Hipotiroidide beklenen laboratuvar bulgusu hangisidir?", "Primer hipotiroidi → TSH ↑." },
                    { 8, 4, "A", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Easy", "Demir eksikliği anemisi tipik olarak mikrositik hipokrom anemi yapar.", true, "Mikrositik anemi", "Makrositik anemi", "Lökositoz olmadan tanı konulamaz", "Trombosit sıfırlanır", "Demir eksikliği anemisinde beklenen bulgulardan biri hangisidir?", "Demir eksikliği → mikrositik hipokrom anemi." }
                });

            migrationBuilder.CreateIndex(
                name: "IX_categories_Slug",
                table: "categories",
                column: "Slug",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_questions_CategoryId",
                table: "questions",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_quiz_attempt_answers_QuestionId",
                table: "quiz_attempt_answers",
                column: "QuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_quiz_attempt_answers_QuizAttemptId",
                table: "quiz_attempt_answers",
                column: "QuizAttemptId");

            migrationBuilder.CreateIndex(
                name: "IX_quiz_attempts_CategoryId",
                table: "quiz_attempts",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_quiz_attempts_UserId",
                table: "quiz_attempts",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_user_progresses_UserId",
                table: "user_progresses",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_users_Email",
                table: "users",
                column: "Email",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "quiz_attempt_answers");

            migrationBuilder.DropTable(
                name: "user_progresses");

            migrationBuilder.DropTable(
                name: "questions");

            migrationBuilder.DropTable(
                name: "quiz_attempts");

            migrationBuilder.DropTable(
                name: "categories");

            migrationBuilder.DropTable(
                name: "users");
        }
    }
}
