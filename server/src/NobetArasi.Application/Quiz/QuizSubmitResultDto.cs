namespace NobetArasi.Application.Quiz;

public sealed record QuizSubmitResultDto(
    Guid AttemptId,
    int CategoryId,
    int TotalQuestions,
    int CorrectCount,
    int WrongCount,
    int EarnedXp,
    int TotalXp,
    int Level,
    IReadOnlyList<QuizSubmitAnswerResultDto> Answers
);