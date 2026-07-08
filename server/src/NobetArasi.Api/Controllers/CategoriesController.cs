using Microsoft.AspNetCore.Mvc;
using NobetArasi.Application.Categories;

namespace NobetArasi.Api.Controllers;

[ApiController]
[Route("api/categories")]
public sealed class CategoriesController : ControllerBase
{
    private readonly ICategoryService _categoryService;

    public CategoriesController(ICategoryService categoryService)
    {
        _categoryService = categoryService;
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<CategoryDto>>> GetCategories(
        CancellationToken cancellationToken)
    {
        var categories = await _categoryService.GetActiveCategoriesAsync(cancellationToken);

        return Ok(categories);
    }
}