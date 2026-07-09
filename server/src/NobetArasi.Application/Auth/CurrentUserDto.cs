namespace NobetArasi.Application.Auth;

public sealed record CurrentUserDto(
    Guid UserId,
    string FullName,
    string Email,
    int TotalXp,
    int Level
);