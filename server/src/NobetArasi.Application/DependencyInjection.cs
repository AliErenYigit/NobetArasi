using Microsoft.Extensions.DependencyInjection;
using NobetArasi.Application.Auth;
using NobetArasi.Application.Quiz;

namespace NobetArasi.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<IXpCalculator, XpCalculator>();

        return services;
    }
}