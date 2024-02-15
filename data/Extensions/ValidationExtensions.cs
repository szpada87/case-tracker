using FluentValidation;
using Utils.Validation;

namespace Data.Extensions;

public static class ValidationExtensions
{
    public static void AddValidation(this WebApplicationBuilder builder)
    {
        builder.Services.AddValidatorsFromAssemblyContaining<Program>();
    }

    public static void UseValidation(this WebApplication app)
    {
        app.UseMiddleware<ValidationExceptionMiddleware>();
    }
}