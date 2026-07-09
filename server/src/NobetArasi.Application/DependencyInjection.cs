using Microsoft.Extensions.DependencyInjection;
using NobetArasi.Application.Auth;

namespace NobetArasi.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddScoped<IAuthService, AuthService>();

        return services;
    }
}