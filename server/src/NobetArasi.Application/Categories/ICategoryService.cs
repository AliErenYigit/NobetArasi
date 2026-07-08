namespace NobetArasi.Application.Categories;

public interface ICategoryService
{
    Task<IReadOnlyList<CategoryDto>> GetActiveCategoriesAsync(
        CancellationToken cancellationToken = default);
}