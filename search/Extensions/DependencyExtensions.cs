using Nest;
using Search.Models;
using Search.Services;

namespace Search.Extensions;

public static class DependencyExtensions
{
    public static void RegisterDependencies(this WebApplicationBuilder builder)
    {
        builder.Services.AddAutoMapper(typeof(Program));
        builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(AppDomain.CurrentDomain.GetAssemblies()));
    }

    public static void RegisterServiceBusService(this WebApplicationBuilder builder)
    {
        builder.Services.AddHostedService<NatsConsumerHostedService>();
    }

    public static void RegisterElasticSearch(this WebApplicationBuilder builder)
    {
        // TODO: Handle missing variable
        var ES_HOST = Environment.GetEnvironmentVariable("ES_HOST") ?? "";
        builder.Services.AddSingleton<IElasticClient>(provider =>
        {
            var settings = new ConnectionSettings(new Uri(ES_HOST)).EnableApiVersioningHeader();
            return new ElasticClient(settings);
        });

        builder.Services.AddScoped<IElasticSearchService<CaseDocument>, ElasticSearchService<CaseDocument>>();
    }
}