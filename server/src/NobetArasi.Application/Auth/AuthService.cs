using System.Net.Mail;
using NobetArasi.Application.Common;
using NobetArasi.Domain.Entities;

namespace NobetArasi.Application.Auth;

public sealed class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;
    private readonly IPasswordHashService _passwordHashService;
    private readonly IJwtTokenService _jwtTokenService;

    public AuthService(
        IUserRepository userRepository,
        IPasswordHashService passwordHashService,
        IJwtTokenService jwtTokenService)
    {
        _userRepository = userRepository;
        _passwordHashService = passwordHashService;
        _jwtTokenService = jwtTokenService;
    }

    public async Task<ServiceResult<AuthResponse>> RegisterAsync(
        RegisterRequest request,
        CancellationToken cancellationToken = default)
    {
        var fullName = request.FullName.Trim();
        var email = NormalizeEmail(request.Email);
        var password = request.Password;

        if (fullName.Length < 2)
        {
            return ServiceResult<AuthResponse>.Failure(
                "InvalidFullName",
                "Ad soyad en az 2 karakter olmalıdır.");
        }

        if (!IsValidEmail(email))
        {
            return ServiceResult<AuthResponse>.Failure(
                "InvalidEmail",
                "Geçerli bir email adresi girilmelidir.");
        }

        if (!IsStrongEnoughPassword(password))
        {
            return ServiceResult<AuthResponse>.Failure(
                "WeakPassword",
                "Şifre en az 8 karakter olmalı ve en az 1 harf ile 1 rakam içermelidir.");
        }

        var emailExists = await _userRepository.EmailExistsAsync(
            email,
            cancellationToken);

        if (emailExists)
        {
            return ServiceResult<AuthResponse>.Failure(
                "EmailAlreadyExists",
                "Bu email adresiyle kayıtlı bir kullanıcı zaten var.");
        }

        var user = new User
        {
            Id = Guid.NewGuid(),
            FullName = fullName,
            Email = email,
            CreatedAtUtc = DateTime.UtcNow,
            Progress = new UserProgress
            {
                Id = Guid.NewGuid(),
                TotalXp = 0,
                Level = 1,
                TotalQuizCount = 0,
                TotalCorrectCount = 0,
                TotalWrongCount = 0,
                UpdatedAtUtc = DateTime.UtcNow
            }
        };

        user.PasswordHash = _passwordHashService.HashPassword(user, password);

        await _userRepository.AddAsync(user, cancellationToken);

        var accessToken = _jwtTokenService.GenerateAccessToken(user);

        return ServiceResult<AuthResponse>.Success(
            CreateAuthResponse(user, accessToken));
    }

    public async Task<ServiceResult<AuthResponse>> LoginAsync(
        LoginRequest request,
        CancellationToken cancellationToken = default)
    {
        var email = NormalizeEmail(request.Email);
        var password = request.Password;

        if (!IsValidEmail(email) || string.IsNullOrWhiteSpace(password))
        {
            return ServiceResult<AuthResponse>.Failure(
                "InvalidCredentials",
                "Email veya şifre hatalı.");
        }

        var user = await _userRepository.GetByEmailAsync(email, cancellationToken);

        if (user is null)
        {
            return ServiceResult<AuthResponse>.Failure(
                "InvalidCredentials",
                "Email veya şifre hatalı.");
        }

        var passwordIsValid = _passwordHashService.VerifyPassword(
            user,
            user.PasswordHash,
            password);

        if (!passwordIsValid)
        {
            return ServiceResult<AuthResponse>.Failure(
                "InvalidCredentials",
                "Email veya şifre hatalı.");
        }

        var accessToken = _jwtTokenService.GenerateAccessToken(user);

        return ServiceResult<AuthResponse>.Success(
            CreateAuthResponse(user, accessToken));
    }

    public async Task<ServiceResult<CurrentUserDto>> GetCurrentUserAsync(
        Guid userId,
        CancellationToken cancellationToken = default)
    {
        var user = await _userRepository.GetByIdAsync(userId, cancellationToken);

        if (user is null)
        {
            return ServiceResult<CurrentUserDto>.Failure(
                "UserNotFound",
                "Kullanıcı bulunamadı.");
        }

        return ServiceResult<CurrentUserDto>.Success(
            new CurrentUserDto(
                user.Id,
                user.FullName,
                user.Email,
                user.Progress?.TotalXp ?? 0,
                user.Progress?.Level ?? 1));
    }

    private static AuthResponse CreateAuthResponse(User user, string accessToken)
    {
        return new AuthResponse(
            user.Id,
            user.FullName,
            user.Email,
            accessToken,
            user.Progress?.TotalXp ?? 0,
            user.Progress?.Level ?? 1);
    }

    private static string NormalizeEmail(string email)
    {
        return email.Trim().ToLowerInvariant();
    }

    private static bool IsValidEmail(string email)
    {
        try
        {
            var address = new MailAddress(email);

            return address.Address.Equals(email, StringComparison.OrdinalIgnoreCase);
        }
        catch
        {
            return false;
        }
    }

    private static bool IsStrongEnoughPassword(string password)
    {
        if (string.IsNullOrWhiteSpace(password) || password.Length < 8)
        {
            return false;
        }

        var hasLetter = password.Any(char.IsLetter);
        var hasDigit = password.Any(char.IsDigit);

        return hasLetter && hasDigit;
    }
}