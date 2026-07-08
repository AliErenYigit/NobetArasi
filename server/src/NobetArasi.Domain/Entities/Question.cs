namespace NobetArasi.Domain.Entities;

public sealed class Question
{
    public int Id { get; set; }

    public int CategoryId { get; set; }

    public Category? Category { get; set; }

    public string QuestionText { get; set; } = string.Empty;

    public string OptionA { get; set; } = string.Empty;

    public string OptionB { get; set; } = string.Empty;

    public string OptionC { get; set; } = string.Empty;

    public string OptionD { get; set; } = string.Empty;

    public string CorrectOption { get; set; } = string.Empty;

    public string Explanation { get; set; } = string.Empty;

    public string TusNote { get; set; } = string.Empty;

    public string Difficulty { get; set; } = "Easy";

    public bool IsActive { get; set; } = true;

    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;

    public List<QuizAttemptAnswer> QuizAttemptAnswers { get; set; } = [];
}