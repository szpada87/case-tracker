using System.Text.Json;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using STAN.Client;
using Utils.Events;
using Utils.Requests.Commands;

namespace Utils.Services;

public abstract class NatsConsumerHostedServiceBase : IHostedService
{
    private List<IStanSubscription>? _subscriptions;
    private readonly IStanConnection _connection;
    private readonly IServiceScopeFactory _scopeFactory;

    private readonly ILogger<NatsConsumerHostedServiceBase> _logger;

    public NatsConsumerHostedServiceBase(IStanConnection connection, IServiceScopeFactory scopeFactory, ILogger<NatsConsumerHostedServiceBase> logger)
    {
        _connection = connection;
        _scopeFactory = scopeFactory;
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    protected IStanSubscription Subscribe<T>(string subject, StanSubscriptionOptions sOpts) where T : IEventMessage
    {
        var subscribtion = _connection.Subscribe(subject, sOpts, async (obj, args) =>
            {
                try
                {
                    var message = System.Text.Encoding.UTF8.GetString(args.Message.Data);
                    _logger.LogInformation("Event received on {subject} message: {message}", subject, message);
                    var deserializedEvent = JsonSerializer.Deserialize<T>(message);

                    using (var scope = _scopeFactory.CreateScope())
                    {
                        var mediator = scope.ServiceProvider.GetRequiredService<IMediator>();
                        if (deserializedEvent is not null)
                        {
                            await mediator.Send(new EventMessageCommand<T>(subject, deserializedEvent));
                        }
                        else
                        {
                            // TODO: Error! Unknown message
                        }
                    }
                    args.Message.Ack();
                }
                catch (Exception e)
                {
                    // TODO: log errors and reject event!
                    _logger.LogError(e, "Error caught during event handling for {subject}", subject);
                }
            });
        return subscribtion;
    }

    protected abstract List<IStanSubscription> CreateSubjectSubscriptions(StanSubscriptionOptions sOpts);

    public async Task StartAsync(CancellationToken cancellationToken)
    {
        if (!cancellationToken.IsCancellationRequested)
        {
            var sOpts = StanSubscriptionOptions.GetDefaultOptions();
            sOpts.ManualAcks = true;
            sOpts.AckWait = 60000;

            _subscriptions = CreateSubjectSubscriptions(sOpts);
        }
    }

    public async Task StopAsync(CancellationToken cancellationToken)
    {
        _subscriptions?.ForEach(subscription => subscription.Close());
    }
}
