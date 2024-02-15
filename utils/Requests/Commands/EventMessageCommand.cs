using MediatR;
using Utils.Events;

namespace Utils.Requests.Commands;

public record EventMessageCommand<T>(string subject, T message): IRequest where T : IEventMessage
{

}