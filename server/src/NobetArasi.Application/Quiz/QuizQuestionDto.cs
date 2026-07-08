namespace NobetArasi.Application.Quiz;

public sealed record QuizQuestionDto(
    int Id,
    string QuestionText,
    IReadOnlyList<QuizOptionDto> Options
);