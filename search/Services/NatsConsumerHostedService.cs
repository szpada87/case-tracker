using STAN.Client;
using Utils.Events;
using Utils.Services;

namespace Search.Services;

public class NatsConsumerHostedService : NatsConsumerHostedServiceBase
{
    public NatsConsumerHostedService(IStanConnection connection, IServiceScopeFactory scopeFactory, ILogger<NatsConsumerHostedServiceBase> logger) : base(connection, scopeFactory, logger)
    {
    }

    protected override List<IStanSubscription> CreateSubjectSubscriptions(StanSubscriptionOptions sOpts)
    {
        return new List<IStanSubscription>() {
                Subscribe<CaseCreatedEvent>("case:added", sOpts)
            };
    }
}