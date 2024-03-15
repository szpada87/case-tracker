using Data.Repository;
using Data.Repository.DatabaseContext;
using Microsoft.EntityFrameworkCore;

namespace Data.Extensions;

public static class DependencyExtensions
{
    public static void RegisterDependencies(this WebApplicationBuilder builder)
    {
        builder.Services.AddDbContext<CaseDb>();
        builder.Services.AddScoped<ICaseRepository, CaseRepository>();
        builder.Services.AddScoped<IDebtorRepository, DebtorRepository>();
        builder.Services.AddMemoryCache();
        builder.Services.AddAutoMapper(typeof(Program));
        builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(AppDomain.CurrentDomain.GetAssemblies()));
    }

    public static void EnsureDatabaseIsCreated(this WebApplication app)
    {
        using (var serviceScope = app.Services.GetService<IServiceScopeFactory>()!.CreateScope())
        {
            var context = serviceScope.ServiceProvider.GetRequiredService<CaseDb>();
            context.Database.Migrate();
        }
    }
}