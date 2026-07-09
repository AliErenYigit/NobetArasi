namespace NobetArasi.Application.Quiz;

public sealed record QuizSubmitAnswerResultDto(
    int QuestionId,
    string QuestionText,
    string SelectedOptionId,
    string CorrectOptionId,
    bool IsCorrect,
    string Explanation,
    string TusNote
);