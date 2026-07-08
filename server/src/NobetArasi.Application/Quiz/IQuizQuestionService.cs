namespace NobetArasi.Application.Quiz;

public interface IQuizQuestionService
{
    Task<IReadOnlyList<QuizQuestionDto>> GetQuestionsForQuizAsync(
        int categoryId,
        int count,
        CancellationToken cancellationToken = default);
}