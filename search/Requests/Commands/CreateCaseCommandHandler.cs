using AutoMapper;
using Search.Models;
using MediatR;
using Search.Services;
using Utils.Events;
using Utils.Requests.Commands;

namespace Search.Requests.Commands;

public class CaseCreatedEventHandler : IRequestHandler<EventMessageCommand<CaseCreatedEvent>>
{
    private readonly IMapper _mapper;
    private readonly ILogger<CaseCreatedEventHandler> _logger;

    private readonly IElasticSearchService<CaseDocument> _searchService;

    public CaseCreatedEventHandler(IMapper mapper, IElasticSearchService<CaseDocument> searchService, ILogger<CaseCreatedEventHandler> logger)
    {
        _mapper = mapper;
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _searchService = searchService;
    }

    public async Task Handle(EventMessageCommand<CaseCreatedEvent> command, CancellationToken cancellationToken)
    {
        var caseDocument = _mapper.Map<CaseDocument>(command.message);
        await _searchService.AddOrUpdate(caseDocument);
        _logger.LogInformation("Case Created Event Handled! {description}", command.message.Description);
    }
}