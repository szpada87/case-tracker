using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Utils.Extensions;

public static class SwaggerExtensions
{
    static string AUTH_DOMAIN = Environment.GetEnvironmentVariable("AUTH_DOMAIN") ?? "";
    static string AUTH_AUDIENCE = Environment.GetEnvironmentVariable("AUTH_AUDIENCE") ?? "";
    static string AUTH_CLIENT_ID = Environment.GetEnvironmentVariable("AUTH_CLIENT_ID") ?? "";

    public static void AddSwagger(this WebApplicationBuilder builder)
    {
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen(c =>
        {
            var domain = $"https://{AUTH_DOMAIN}/";
            c.SwaggerDoc("v1", new()
            {
                Title = builder.Environment.ApplicationName,
                Version = "v1"
            });

            c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                Name = "Authorization",
                In = ParameterLocation.Header,
                Type = SecuritySchemeType.OAuth2,
                Flows = new OpenApiOAuthFlows
                {
                    AuthorizationCode = new OpenApiOAuthFlow
                    {
                        AuthorizationUrl = new Uri(domain + "authorize?audience=" + AUTH_AUDIENCE),
                        TokenUrl = new Uri(domain + "oauth/token")
                    }
                }
            });

            c.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = JwtBearerDefaults.AuthenticationScheme
                        },
                        Scheme = "oauth2",
                        Name = JwtBearerDefaults.AuthenticationScheme,
                        In = ParameterLocation.Header
                    },
                    Array.Empty<string>()
                }
            });
        });
    }

    public static void UseSwagger(this WebApplication app, string name)
    {
        if (app.Environment.IsDevelopment())
        {
            Console.WriteLine("Running swagger...");
            app.UseSwagger(c =>
            {
                c.RouteTemplate = $"api/{name}" + "/swagger/{documentname}/swagger.json";
            });
            app.UseSwaggerUI(options =>
            {
                options.SwaggerEndpoint($"/api/{name}/swagger/v1/swagger.json", "Data API V1");
                options.RoutePrefix = $"api/{name}/swagger";
                options.OAuthClientId(AUTH_CLIENT_ID);
                options.OAuthUsePkce();
            });
        }
    }
}