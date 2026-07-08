namespace NobetArasi.Domain.Entities;

public sealed class QuizAttemptAnswer
{
    public Guid Id { get; set; }

    public Guid QuizAttemptId { get; set; }

    public QuizAttempt? QuizAttempt { get; set; }

    public int QuestionId { get; set; }

    public Question? Question { get; set; }

    public string SelectedOption { get; set; } = string.Empty;

    public bool IsCorrect { get; set; }
}