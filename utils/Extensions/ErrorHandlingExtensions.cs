using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;

namespace Utils.Extensions;

public static class ErrorHandlingExtensions
{
    public static void UseErrorHandling(this WebApplication app)
    {
        if (!app.Environment.IsDevelopment())
        {
            app.UseExceptionHandler(
                exceptionHandlerApp => exceptionHandlerApp.Run(
                    async context => await Results.Problem().ExecuteAsync(context)));
        }
    }
}