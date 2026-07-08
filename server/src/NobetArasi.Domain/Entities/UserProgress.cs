namespace NobetArasi.Domain.Entities;

public sealed class UserProgress
{
    public Guid Id { get; set; }

    public Guid UserId { get; set; }

    public User? User { get; set; }

    public int TotalXp { get; set; }

    public int Level { get; set; } = 1;

    public int TotalQuizCount { get; set; }

    public int TotalCorrectCount { get; set; }

    public int TotalWrongCount { get; set; }

    public DateTime UpdatedAtUtc { get; set; } = DateTime.UtcNow;
}