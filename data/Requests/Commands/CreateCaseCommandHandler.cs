using AutoMapper;
using Data.Models;
using Data.Models.DataTransferObjects;
using Data.Repository;
using MediatR;
using Utils.Events;
using Utils.Requests.Commands;

namespace Data.Requests.Commands;

public class CreateCaseCommandHandler : IRequestHandler<CreateCaseCommand, CaseDetailsResponse>
{
    private readonly ICaseRepository _caseRepository;
    private readonly IMapper _mapper;
    private readonly ILogger<CreateCaseCommandHandler> _logger;
    private readonly IMediator _mediator;

    public CreateCaseCommandHandler(ICaseRepository caseRepository, IMapper mapper, ILogger<CreateCaseCommandHandler> logger,
        IMediator mediator)
    {
        _caseRepository = caseRepository;
        _mapper = mapper;
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _mediator = mediator;
    }

    public async Task<CaseDetailsResponse> Handle(CreateCaseCommand command, CancellationToken cancellationToken)
    {
        var caseEntry = _mapper.Map<Case>(command);
        var newCase = await _caseRepository.Create(caseEntry);
        await _mediator.Send(new PublishNotificationCommand<CaseCreatedEvent>("case:added", _mapper.Map<CaseCreatedEvent>(newCase)), cancellationToken);
        _logger.LogInformation("Case {Id} is successfully created", newCase.Id);

        var caseDetailsResponse = _mapper.Map<CaseDetailsResponse>(newCase);

        return caseDetailsResponse;
    }
}