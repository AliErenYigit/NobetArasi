namespace NobetArasi.Application.Quiz;

public sealed record SubmitQuizAnswerRequest(
    int QuestionId,
    string SelectedOptionId
);