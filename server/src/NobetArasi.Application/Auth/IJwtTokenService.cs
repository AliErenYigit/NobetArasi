using NobetArasi.Domain.Entities;

namespace NobetArasi.Application.Auth;

public interface IJwtTokenService
{
    string GenerateAccessToken(User user);
}