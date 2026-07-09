using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NobetArasi.Application.Auth;

namespace NobetArasi.Api.Controllers;

[ApiController]
[Route("api/auth")]
public sealed class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<ActionResult<AuthResponse>> Register(
        [FromBody] RegisterRequest request,
        CancellationToken cancellationToken)
    {
        var result = await _authService.RegisterAsync(request, cancellationToken);

        if (!result.Succeeded)
        {
            return result.ErrorCode switch
            {
                "EmailAlreadyExists" => Conflict(new
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

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponse>> Login(
        [FromBody] LoginRequest request,
        CancellationToken cancellationToken)
    {
        var result = await _authService.LoginAsync(request, cancellationToken);

        if (!result.Succeeded)
        {
            return Unauthorized(new
            {
                message = result.ErrorMessage
            });
        }

        return Ok(result.Value);
    }

    [Authorize]
    [HttpGet("me")]
    public async Task<ActionResult<CurrentUserDto>> GetMe(
        CancellationToken cancellationToken)
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (!Guid.TryParse(userIdClaim, out var userId))
        {
            return Unauthorized(new
            {
                message = "Geçersiz kullanıcı token bilgisi."
            });
        }

        var result = await _authService.GetCurrentUserAsync(
            userId,
            cancellationToken);

        if (!result.Succeeded)
        {
            return NotFound(new
            {
                message = result.ErrorMessage
            });
        }

        return Ok(result.Value);
    }
}