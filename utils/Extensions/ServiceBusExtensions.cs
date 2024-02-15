using STAN.Client;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace Utils.Extensions;

public static class ServiceBusExtensions
{
    public static void RegisterServiceBus(this WebApplicationBuilder builder)
    {
        var NATS_CLUSTER_ID = Environment.GetEnvironmentVariable("NATS_CLUSTER_ID");
        var NATS_CLIENT_ID = Environment.GetEnvironmentVariable("NATS_CLIENT_ID");
        var NATS_URL = Environment.GetEnvironmentVariable("NATS_URL");

        builder.Services.AddSingleton<StanConnectionFactory>();
        builder.Services.AddSingleton<IStanConnection>((provider) =>
        {
            var cf = provider.GetService<StanConnectionFactory>();
            var options = StanOptions.GetDefaultOptions();
            options.NatsURL = NATS_URL;

            return cf!.CreateConnection(NATS_CLUSTER_ID, NATS_CLIENT_ID, options);
        });
    }
}