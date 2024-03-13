using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace Utils.Extensions;

public static class CorsExtensions
{
    public static void AddCors(this WebApplicationBuilder builder)
    {
        builder.Services.AddCors(options =>
        {
            options.AddPolicy(name: "caseTrackerPolicyName",
                            policy =>
                            {
                                policy.WithOrigins("https://szpada87.blog",
                                                    "http://case-tracker.dev");
                            });
        });
    }

    public static void UseCors(this WebApplication app)
    {
        app.UseCors("caseTrackerPolicyName");
    }
}