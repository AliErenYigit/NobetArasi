using Microsoft.AspNetCore.Mvc;

namespace NobetArasi.Api.Controllers;

[ApiController]
[Route("api/health")]
public sealed class HealthController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new
        {
            status = "Healthy",
            app = "Nöbet Arası API",
            timestampUtc = DateTime.UtcNow
        });
    }
}