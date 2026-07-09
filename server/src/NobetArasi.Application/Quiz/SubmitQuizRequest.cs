namespace NobetArasi.Application.Quiz;

public sealed record SubmitQuizRequest(
    int CategoryId,
    IReadOnlyList<SubmitQuizAnswerRequest> Answers
);