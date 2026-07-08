using Microsoft.EntityFrameworkCore;
using NobetArasi.Domain.Entities;

namespace NobetArasi.Infrastructure.Persistence;

public sealed class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users => Set<User>();

    public DbSet<Category> Categories => Set<Category>();

    public DbSet<Question> Questions => Set<Question>();

    public DbSet<QuizAttempt> QuizAttempts => Set<QuizAttempt>();

    public DbSet<QuizAttemptAnswer> QuizAttemptAnswers => Set<QuizAttemptAnswer>();

    public DbSet<UserProgress> UserProgresses => Set<UserProgress>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        ConfigureUsers(modelBuilder);
        ConfigureCategories(modelBuilder);
        ConfigureQuestions(modelBuilder);
        ConfigureQuizAttempts(modelBuilder);
        ConfigureQuizAttemptAnswers(modelBuilder);
        ConfigureUserProgresses(modelBuilder);
        SeedCategories(modelBuilder);
        SeedQuestions(modelBuilder);
    }

    private static void ConfigureUsers(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>(entity =>
        {
            entity.ToTable("users");

            entity.HasKey(user => user.Id);

            entity.Property(user => user.FullName)
                .HasMaxLength(120)
                .IsRequired();

            entity.Property(user => user.Email)
                .HasMaxLength(180)
                .IsRequired();

            entity.HasIndex(user => user.Email)
                .IsUnique();

            entity.Property(user => user.PasswordHash)
                .HasMaxLength(500)
                .IsRequired();

            entity.Property(user => user.CreatedAtUtc)
                .IsRequired();
        });
    }

    private static void ConfigureCategories(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Category>(entity =>
        {
            entity.ToTable("categories");

            entity.HasKey(category => category.Id);

            entity.Property(category => category.Name)
                .HasMaxLength(100)
                .IsRequired();

            entity.Property(category => category.Slug)
                .HasMaxLength(120)
                .IsRequired();

            entity.HasIndex(category => category.Slug)
                .IsUnique();

            entity.Property(category => category.Description)
                .HasMaxLength(500)
                .IsRequired();

            entity.Property(category => category.DisplayOrder)
                .IsRequired();

            entity.Property(category => category.IsActive)
                .IsRequired();
        });
    }

    private static void ConfigureQuestions(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Question>(entity =>
        {
            entity.ToTable("questions");

            entity.HasKey(question => question.Id);

            entity.Property(question => question.QuestionText)
                .HasMaxLength(1000)
                .IsRequired();

            entity.Property(question => question.OptionA)
                .HasMaxLength(300)
                .IsRequired();

            entity.Property(question => question.OptionB)
                .HasMaxLength(300)
                .IsRequired();

            entity.Property(question => question.OptionC)
                .HasMaxLength(300)
                .IsRequired();

            entity.Property(question => question.OptionD)
                .HasMaxLength(300)
                .IsRequired();

            entity.Property(question => question.CorrectOption)
                .HasMaxLength(1)
                .IsRequired();

            entity.Property(question => question.Explanation)
                .HasMaxLength(1000)
                .IsRequired();

            entity.Property(question => question.TusNote)
                .HasMaxLength(1000)
                .IsRequired();

            entity.Property(question => question.Difficulty)
                .HasMaxLength(30)
                .IsRequired();

            entity.Property(question => question.IsActive)
                .IsRequired();

            entity.Property(question => question.CreatedAtUtc)
                .IsRequired();

            entity.HasOne(question => question.Category)
                .WithMany(category => category.Questions)
                .HasForeignKey(question => question.CategoryId)
                .OnDelete(DeleteBehavior.Restrict);
        });
    }

    private static void ConfigureQuizAttempts(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<QuizAttempt>(entity =>
        {
            entity.ToTable("quiz_attempts");

            entity.HasKey(attempt => attempt.Id);

            entity.Property(attempt => attempt.TotalQuestions)
                .IsRequired();

            entity.Property(attempt => attempt.CorrectCount)
                .IsRequired();

            entity.Property(attempt => attempt.WrongCount)
                .IsRequired();

            entity.Property(attempt => attempt.EarnedXp)
                .IsRequired();

            entity.Property(attempt => attempt.CreatedAtUtc)
                .IsRequired();

            entity.HasOne(attempt => attempt.User)
                .WithMany(user => user.QuizAttempts)
                .HasForeignKey(attempt => attempt.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(attempt => attempt.Category)
                .WithMany()
                .HasForeignKey(attempt => attempt.CategoryId)
                .OnDelete(DeleteBehavior.Restrict);
        });
    }

    private static void ConfigureQuizAttemptAnswers(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<QuizAttemptAnswer>(entity =>
        {
            entity.ToTable("quiz_attempt_answers");

            entity.HasKey(answer => answer.Id);

            entity.Property(answer => answer.SelectedOption)
                .HasMaxLength(1)
                .IsRequired();

            entity.Property(answer => answer.IsCorrect)
                .IsRequired();

            entity.HasOne(answer => answer.QuizAttempt)
                .WithMany(attempt => attempt.Answers)
                .HasForeignKey(answer => answer.QuizAttemptId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(answer => answer.Question)
                .WithMany(question => question.QuizAttemptAnswers)
                .HasForeignKey(answer => answer.QuestionId)
                .OnDelete(DeleteBehavior.Restrict);
        });
    }

    private static void ConfigureUserProgresses(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<UserProgress>(entity =>
        {
            entity.ToTable("user_progresses");

            entity.HasKey(progress => progress.Id);

            entity.Property(progress => progress.TotalXp)
                .IsRequired();

            entity.Property(progress => progress.Level)
                .IsRequired();

            entity.Property(progress => progress.TotalQuizCount)
                .IsRequired();

            entity.Property(progress => progress.TotalCorrectCount)
                .IsRequired();

            entity.Property(progress => progress.TotalWrongCount)
                .IsRequired();

            entity.Property(progress => progress.UpdatedAtUtc)
                .IsRequired();

            entity.HasIndex(progress => progress.UserId)
                .IsUnique();

            entity.HasOne(progress => progress.User)
                .WithOne(user => user.Progress)
                .HasForeignKey<UserProgress>(progress => progress.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        });
    }

    private static void SeedCategories(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Category>().HasData(
            new Category
            {
                Id = 1,
                Name = "Mikrobiyoloji",
                Slug = "mikrobiyoloji",
                Description = "Etkenler, tanı ipuçları ve temel klinik bilgiler.",
                DisplayOrder = 1,
                IsActive = true
            },
            new Category
            {
                Id = 2,
                Name = "Farmakoloji",
                Slug = "farmakoloji",
                Description = "İlaç grupları, yan etkiler ve mekanizmalar.",
                DisplayOrder = 2,
                IsActive = true
            },
            new Category
            {
                Id = 3,
                Name = "Patoloji",
                Slug = "patoloji",
                Description = "Hastalık mekanizmaları ve ayırıcı noktalar.",
                DisplayOrder = 3,
                IsActive = true
            },
            new Category
            {
                Id = 4,
                Name = "Dahiliye",
                Slug = "dahiliye",
                Description = "Klinik yaklaşım ve sık karşılaşılan tablolar.",
                DisplayOrder = 4,
                IsActive = true
            }
        );
    }

    private static void SeedQuestions(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Question>().HasData(
            CreateQuestion(
                1,
                1,
                "Paslı balgam ile seyreden lober pnömonide en olası etken hangisidir?",
                "Streptococcus pneumoniae",
                "Mycoplasma pneumoniae",
                "Klebsiella pneumoniae",
                "Staphylococcus aureus",
                "A",
                "Lober pnömoni ve paslı balgam klasik olarak S. pneumoniae ile ilişkilidir.",
                "Lober pnömoni + paslı balgam → S. pneumoniae."
            ),
            CreateQuestion(
                2,
                1,
                "Bakteriyel menenjitte BOS bulguları için en uygun ifade hangisidir?",
                "Lenfosit artışı, glukoz normal",
                "Nötrofil artışı, glukoz düşük",
                "Protein düşük, glukoz yüksek",
                "Eritrosit artışı, protein normal",
                "B",
                "Bakteriyel menenjitte BOS'ta nötrofil ve protein artar, glukoz düşer.",
                "Bakteriyel menenjit → nötrofil ↑, protein ↑, glukoz ↓."
            ),
            CreateQuestion(
                3,
                2,
                "Beta-laktam antibiyotiklerin temel etki mekanizması nedir?",
                "Protein sentezini inhibe etmek",
                "Hücre duvarı sentezini inhibe etmek",
                "DNA girazı aktive etmek",
                "Folat sentezini artırmak",
                "B",
                "Beta-laktamlar bakteri hücre duvarı sentezini inhibe eder.",
                "Beta-laktam → hücre duvarı sentezi inhibisyonu."
            ),
            CreateQuestion(
                4,
                2,
                "ACE inhibitörlerinin sık görülen yan etkilerinden biri hangisidir?",
                "Kuru öksürük",
                "Hipoglisemi",
                "İşitme kaybı",
                "Diş eti hipertrofisi",
                "A",
                "ACE inhibitörleri bradikinin artışıyla kuru öksürük yapabilir.",
                "ACE inhibitörü → kuru öksürük, hiperkalemi, anjiyoödem."
            ),
            CreateQuestion(
                5,
                3,
                "Apoptoz için en uygun ifade hangisidir?",
                "Kontrollü hücre ölümü",
                "Her zaman inflamasyonla gider",
                "Sadece bakterilerde olur",
                "Nekroz ile tamamen aynıdır",
                "A",
                "Apoptoz kontrollü/programlı hücre ölümüdür.",
                "Apoptoz → kontrollü hücre ölümü."
            ),
            CreateQuestion(
                6,
                3,
                "Akut inflamasyonda baskın hücre genellikle hangisidir?",
                "Nötrofil",
                "Fibroblast",
                "Plazma hücresi",
                "Adiposit",
                "A",
                "Akut inflamasyonda nötrofiller baskındır.",
                "Akut inflamasyon → nötrofil."
            ),
            CreateQuestion(
                7,
                4,
                "Hipotiroidide beklenen laboratuvar bulgusu hangisidir?",
                "TSH yüksekliği",
                "TSH düşüklüğü",
                "Troponin yüksekliği",
                "Amilaz düşüklüğü",
                "A",
                "Primer hipotiroidide genellikle TSH yüksekliği beklenir.",
                "Primer hipotiroidi → TSH ↑."
            ),
            CreateQuestion(
                8,
                4,
                "Demir eksikliği anemisinde beklenen bulgulardan biri hangisidir?",
                "Mikrositik anemi",
                "Makrositik anemi",
                "Lökositoz olmadan tanı konulamaz",
                "Trombosit sıfırlanır",
                "A",
                "Demir eksikliği anemisi tipik olarak mikrositik hipokrom anemi yapar.",
                "Demir eksikliği → mikrositik hipokrom anemi."
            )
        );
    }

    private static Question CreateQuestion(
        int id,
        int categoryId,
        string questionText,
        string optionA,
        string optionB,
        string optionC,
        string optionD,
        string correctOption,
        string explanation,
        string tusNote)
    {
        return new Question
        {
            Id = id,
            CategoryId = categoryId,
            QuestionText = questionText,
            OptionA = optionA,
            OptionB = optionB,
            OptionC = optionC,
            OptionD = optionD,
            CorrectOption = correctOption,
            Explanation = explanation,
            TusNote = tusNote,
            Difficulty = "Easy",
            IsActive = true,
            CreatedAtUtc = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc)
        };
    }
}