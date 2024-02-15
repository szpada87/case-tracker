using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace Utils.Extensions;

public static class AuthenticationExtensions
{
    public static void AddAuthentication(this WebApplicationBuilder builder)
    {
        var AUTH_DOMAIN = Environment.GetEnvironmentVariable("AUTH_DOMAIN");
        var AUTH_AUDIENCE = Environment.GetEnvironmentVariable("AUTH_AUDIENCE");
        var domain = $"https://{AUTH_DOMAIN}/";
        builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options =>
        {
            options.Authority = domain;
            options.Audience = AUTH_AUDIENCE;
            options.TokenValidationParameters = new TokenValidationParameters
            {
                NameClaimType = ClaimTypes.NameIdentifier
            };
        });
    }

    public static void AddAuthorization(this WebApplicationBuilder builder, List<string> policies)
    {
        var AUTH_DOMAIN = Environment.GetEnvironmentVariable("AUTH_DOMAIN");
        var domain = $"https://{AUTH_DOMAIN}/";
        builder.Services.AddAuthorization(options =>
        {
            policies.ForEach(p =>
            {
                options.AddPolicy(p, policy => policy.RequireClaim("permissions", p));
            });
        });
    }
}