namespace NobetArasi.Domain.Entities;

public sealed class QuizAttempt
{
    public Guid Id { get; set; }

    public Guid UserId { get; set; }

    public User? User { get; set; }

    public int CategoryId { get; set; }

    public Category? Category { get; set; }

    public int TotalQuestions { get; set; }

    public int CorrectCount { get; set; }

    public int WrongCount { get; set; }

    public int EarnedXp { get; set; }

    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;

    public List<QuizAttemptAnswer> Answers { get; set; } = [];
}