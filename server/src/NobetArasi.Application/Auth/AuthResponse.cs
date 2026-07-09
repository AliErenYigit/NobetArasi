namespace NobetArasi.Application.Auth;

public sealed record AuthResponse(
    Guid UserId,
    string FullName,
    string Email,
    string AccessToken,
    int TotalXp,
    int Level
);