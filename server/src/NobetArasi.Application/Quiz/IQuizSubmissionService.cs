using NobetArasi.Application.Common;

namespace NobetArasi.Application.Quiz;

public interface IQuizSubmissionService
{
    Task<ServiceResult<QuizSubmitResultDto>> SubmitQuizAsync(
        Guid userId,
        SubmitQuizRequest request,
        CancellationToken cancellationToken = default);
}