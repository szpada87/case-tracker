namespace Data.Routes;

public static class UtilityRoutesExtensions
{
    public static void RegisterUtilityRoutes(this WebApplication app)
    {
        app.MapGet("/api/data/health", () => "Hello World!").WithName("HealthCheck")
        .WithDisplayName("HealthCheck").AllowAnonymous();
    }
}