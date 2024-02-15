namespace Utils.Events;

public record CaseCreatedEvent(int Id, DateTime Created, string OwnerId, string Description, DateTime Expire, int Status) : IEventMessage;