using System.Security.Cryptography;
using Microsoft.EntityFrameworkCore;
using NobetArasi.Application.Quiz;
using NobetArasi.Infrastructure.Persistence;

namespace NobetArasi.Infrastructure.Services;

public sealed class QuizQuestionService : IQuizQuestionService
{
    private const int MinQuestionCount = 1;
    private const int MaxQuestionCount = 10;

    private readonly AppDbContext _dbContext;

    public QuizQuestionService(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IReadOnlyList<QuizQuestionDto>> GetQuestionsForQuizAsync(
        int categoryId,
        int count,
        CancellationToken cancellationToken = default)
    {
        if (categoryId <= 0)
        {
            return [];
        }

        var normalizedCount = Math.Clamp(count, MinQuestionCount, MaxQuestionCount);

        var questionRows = await _dbContext.Questions
            .AsNoTracking()
            .Where(question =>
                question.CategoryId == categoryId &&
                question.IsActive &&
                question.Category != null &&
                question.Category.IsActive)
            .Select(question => new
            {
                question.Id,
                question.QuestionText,
                question.OptionA,
                question.OptionB,
                question.OptionC,
                question.OptionD,
                question.OptionE
            })
            .ToListAsync(cancellationToken);

        return questionRows
            .OrderBy(_ => RandomNumberGenerator.GetInt32(int.MaxValue))
            .Take(normalizedCount)
            .Select(question => new QuizQuestionDto(
                question.Id,
                question.QuestionText,
                new[]
                {
                    new QuizOptionDto("A", question.OptionA),
                    new QuizOptionDto("B", question.OptionB),
                    new QuizOptionDto("C", question.OptionC),
                    new QuizOptionDto("D", question.OptionD),
                    new QuizOptionDto("E", question.OptionE)
                }
            ))
            .ToList();
    }
}