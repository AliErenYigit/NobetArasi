using Microsoft.EntityFrameworkCore;
using NobetArasi.Application.Categories;
using NobetArasi.Infrastructure.Persistence;

namespace NobetArasi.Infrastructure.Services;

public sealed class CategoryService : ICategoryService
{
    private readonly AppDbContext _dbContext;

    public CategoryService(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IReadOnlyList<CategoryDto>> GetActiveCategoriesAsync(
        CancellationToken cancellationToken = default)
    {
        return await _dbContext.Categories
            .AsNoTracking()
            .Where(category => category.IsActive)
            .OrderBy(category => category.DisplayOrder)
            .Select(category => new CategoryDto(
                category.Id,
                category.Name,
                category.Slug,
                category.Description
            ))
            .ToListAsync(cancellationToken);
    }
}