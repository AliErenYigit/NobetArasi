using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using NobetArasi.Application.Auth;
using NobetArasi.Application.Categories;
using NobetArasi.Application.Quiz;
using NobetArasi.Infrastructure.Authentication;
using NobetArasi.Infrastructure.Persistence;
using NobetArasi.Infrastructure.Repositories;
using NobetArasi.Infrastructure.Services;

namespace NobetArasi.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("DefaultConnection");

        if (string.IsNullOrWhiteSpace(connectionString))
        {
            throw new InvalidOperationException("DefaultConnection connection string is not configured.");
        }

        services.AddDbContext<AppDbContext>(options =>
        {
            options.UseNpgsql(connectionString);
        });

        services.Configure<JwtOptions>(
            configuration.GetSection(JwtOptions.SectionName));

        services.AddScoped<ICategoryService, CategoryService>();
        services.AddScoped<IQuizQuestionService, QuizQuestionService>();

        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IPasswordHashService, PasswordHashService>();
        services.AddScoped<IJwtTokenService, JwtTokenService>();

        return services;
    }
}