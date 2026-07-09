using Microsoft.EntityFrameworkCore;
using NobetArasi.Application.Common;
using NobetArasi.Application.Quiz;
using NobetArasi.Domain.Entities;
using NobetArasi.Infrastructure.Persistence;

namespace NobetArasi.Infrastructure.Services;

public sealed class QuizSubmissionService : IQuizSubmissionService
{
    private const int MinQuestionCount = 1;
    private const int MaxQuestionCount = 10;

    private static readonly HashSet<string> ValidOptionIds = ["A", "B", "C", "D", "E"];

    private readonly AppDbContext _dbContext;
    private readonly IXpCalculator _xpCalculator;

    public QuizSubmissionService(
        AppDbContext dbContext,
        IXpCalculator xpCalculator)
    {
        _dbContext = dbContext;
        _xpCalculator = xpCalculator;
    }

    public async Task<ServiceResult<QuizSubmitResultDto>> SubmitQuizAsync(
        Guid userId,
        SubmitQuizRequest request,
        CancellationToken cancellationToken = default)
    {
        if (request.CategoryId <= 0)
        {
            return ServiceResult<QuizSubmitResultDto>.Failure(
                "InvalidCategory",
                "Geçerli bir kategori seçilmelidir.");
        }

        if (request.Answers.Count is < MinQuestionCount or > MaxQuestionCount)
        {
            return ServiceResult<QuizSubmitResultDto>.Failure(
                "InvalidAnswerCount",
                $"Cevap sayısı {MinQuestionCount} ile {MaxQuestionCount} arasında olmalıdır.");
        }

        var normalizedAnswers = request.Answers
            .Select(answer => new SubmitQuizAnswerRequest(
                answer.QuestionId,
                answer.SelectedOptionId.Trim().ToUpperInvariant()))
            .ToList();

        if (normalizedAnswers.Any(answer => answer.QuestionId <= 0))
        {
            return ServiceResult<QuizSubmitResultDto>.Failure(
                "InvalidQuestion",
                "Geçersiz soru bilgisi gönderildi.");
        }

        if (normalizedAnswers.Any(answer => !ValidOptionIds.Contains(answer.SelectedOptionId)))
        {
            return ServiceResult<QuizSubmitResultDto>.Failure(
                "InvalidOption",
                "Seçilen cevap A, B, C, D veya E olmalıdır.");
        }

        var hasDuplicateQuestion = normalizedAnswers
            .GroupBy(answer => answer.QuestionId)
            .Any(group => group.Count() > 1);

        if (hasDuplicateQuestion)
        {
            return ServiceResult<QuizSubmitResultDto>.Failure(
                "DuplicateQuestion",
                "Aynı soru için birden fazla cevap gönderilemez.");
        }

        var user = await _dbContext.Users
            .Include(item => item.Progress)
            .FirstOrDefaultAsync(item => item.Id == userId, cancellationToken);

        if (user is null)
        {
            return ServiceResult<QuizSubmitResultDto>.Failure(
                "UserNotFound",
                "Kullanıcı bulunamadı.");
        }

        var questionIds = normalizedAnswers
            .Select(answer => answer.QuestionId)
            .ToList();

        var questions = await _dbContext.Questions
            .AsNoTracking()
            .Where(question =>
                questionIds.Contains(question.Id) &&
                question.CategoryId == request.CategoryId &&
                question.IsActive &&
                question.Category != null &&
                question.Category.IsActive)
            .ToListAsync(cancellationToken);

        if (questions.Count != normalizedAnswers.Count)
        {
            return ServiceResult<QuizSubmitResultDto>.Failure(
                "InvalidQuestions",
                "Gönderilen sorular kategoriyle eşleşmiyor veya aktif değil.");
        }

        var questionsById = questions.ToDictionary(question => question.Id);

        var answerResults = normalizedAnswers
            .Select(answer =>
            {
                var question = questionsById[answer.QuestionId];
                var isCorrect = question.CorrectOption == answer.SelectedOptionId;

                return new QuizSubmitAnswerResultDto(
                    question.Id,
                    question.QuestionText,
                    answer.SelectedOptionId,
                    question.CorrectOption,
                    isCorrect,
                    question.Explanation,
                    question.TusNote);
            })
            .ToList();

        var totalQuestions = answerResults.Count;
        var correctCount = answerResults.Count(answer => answer.IsCorrect);
        var wrongCount = totalQuestions - correctCount;
        var earnedXp = _xpCalculator.CalculateEarnedXp(correctCount, totalQuestions);

        if (user.Progress is null)
        {
            user.Progress = new UserProgress
            {
                Id = Guid.NewGuid(),
                UserId = user.Id,
                TotalXp = 0,
                Level = 1,
                TotalQuizCount = 0,
                TotalCorrectCount = 0,
                TotalWrongCount = 0,
                UpdatedAtUtc = DateTime.UtcNow
            };
        }

        user.Progress.TotalXp += earnedXp;
        user.Progress.Level = _xpCalculator.GetLevelFromTotalXp(user.Progress.TotalXp);
        user.Progress.TotalQuizCount += 1;
        user.Progress.TotalCorrectCount += correctCount;
        user.Progress.TotalWrongCount += wrongCount;
        user.Progress.UpdatedAtUtc = DateTime.UtcNow;

        var quizAttempt = new QuizAttempt
        {
            Id = Guid.NewGuid(),
            UserId = user.Id,
            CategoryId = request.CategoryId,
            TotalQuestions = totalQuestions,
            CorrectCount = correctCount,
            WrongCount = wrongCount,
            EarnedXp = earnedXp,
            CreatedAtUtc = DateTime.UtcNow,
            Answers = normalizedAnswers
                .Select(answer =>
                {
                    var question = questionsById[answer.QuestionId];

                    return new QuizAttemptAnswer
                    {
                        Id = Guid.NewGuid(),
                        QuestionId = question.Id,
                        SelectedOption = answer.SelectedOptionId,
                        IsCorrect = question.CorrectOption == answer.SelectedOptionId
                    };
                })
                .ToList()
        };

        _dbContext.QuizAttempts.Add(quizAttempt);

        await _dbContext.SaveChangesAsync(cancellationToken);

        return ServiceResult<QuizSubmitResultDto>.Success(
            new QuizSubmitResultDto(
                quizAttempt.Id,
                request.CategoryId,
                totalQuestions,
                correctCount,
                wrongCount,
                earnedXp,
                user.Progress.TotalXp,
                user.Progress.Level,
                answerResults));
    }
}