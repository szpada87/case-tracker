using System.Text.Json;
using MediatR;
using Microsoft.Extensions.Logging;
using STAN.Client;
using Utils.Events;

namespace Utils.Requests.Commands;

public class PublishNotificationCommandHandlerBase<T> : IRequestHandler<PublishNotificationCommand<T>> where T : IEventMessage
{
    private readonly ILogger<PublishNotificationCommandHandlerBase<T>> _logger;
    private readonly IStanConnection _connection;

    public PublishNotificationCommandHandlerBase(IStanConnection connection, ILogger<PublishNotificationCommandHandlerBase<T>> logger)
    {
        _connection = connection;
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    public async Task Handle(PublishNotificationCommand<T> command, CancellationToken cancellationToken)
    {
        var serializedMessage = JsonSerializer.Serialize(command.message);
        _logger.LogInformation("Publishing Notification to {subject} message: {message}", command.subject, serializedMessage);
        await _connection.PublishAsync(command.subject, System.Text.Encoding.UTF8.GetBytes(serializedMessage));
    }
}

public class PublishNotificationCommandHandler : PublishNotificationCommandHandlerBase<CaseCreatedEvent>
{
    public PublishNotificationCommandHandler(IStanConnection connection, ILogger<PublishNotificationCommandHandler> logger)
    : base(connection, logger)
    {

    }
}