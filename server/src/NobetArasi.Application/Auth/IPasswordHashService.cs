using NobetArasi.Domain.Entities;

namespace NobetArasi.Application.Auth;

public interface IPasswordHashService
{
    string HashPassword(User user, string password);

    bool VerifyPassword(User user, string passwordHash, string providedPassword);
}