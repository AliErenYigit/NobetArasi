using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NobetArasi.Application.Quiz;

namespace NobetArasi.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/quiz")]
public sealed class QuizController : ControllerBase
{
    private const int DefaultQuestionCount = 10;
    private const int MaxQuestionCount = 10;

    private readonly IQuizQuestionService _quizQuestionService;
    private readonly IQuizSubmissionService _quizSubmissionService;

    public QuizController(
        IQuizQuestionService quizQuestionService,
        IQuizSubmissionService quizSubmissionService)
    {
        _quizQuestionService = quizQuestionService;
        _quizSubmissionService = quizSubmissionService;
    }

    [HttpGet("questions")]
    public async Task<ActionResult<IReadOnlyList<QuizQuestionDto>>> GetQuestions(
        [FromQuery] int categoryId,
        [FromQuery] int count = DefaultQuestionCount,
        CancellationToken cancellationToken = default)
    {
        if (categoryId <= 0)
        {
            return BadRequest(new
            {
                message = "Geçerli bir categoryId gönderilmelidir."
            });
        }

        if (count is < 1 or > MaxQuestionCount)
        {
            return BadRequest(new
            {
                message = $"Soru sayısı 1 ile {MaxQuestionCount} arasında olmalıdır."
            });
        }

        var questions = await _quizQuestionService.GetQuestionsForQuizAsync(
            categoryId,
            count,
            cancellationToken);

        if (questions.Count == 0)
        {
            return NotFound(new
            {
                message = "Bu kategori için aktif soru bulunamadı."
            });
        }

        return Ok(questions);
    }

    [HttpPost("submit")]
    public async Task<ActionResult<QuizSubmitResultDto>> Submit(
        [FromBody] SubmitQuizRequest request,
        CancellationToken cancellationToken = default)
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (!Guid.TryParse(userIdClaim, out var userId))
        {
            return Unauthorized(new
            {
                message = "Geçersiz kullanıcı token bilgisi."
            });
        }

        var result = await _quizSubmissionService.SubmitQuizAsync(
            userId,
            request,
            cancellationToken);

        if (!result.Succeeded)
        {
            return result.ErrorCode switch
            {
                "UserNotFound" => Unauthorized(new
                {
                    message = result.ErrorMessage
                }),
                _ => BadRequest(new
                {
                    message = result.ErrorMessage
                })
            };
        }

        return Ok(result.Value);
    }
}