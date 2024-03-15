using AutoMapper;
using Data.Models;
using Data.Models.DataTransferObjects;
using Data.Repository;
using MediatR;
using Microsoft.Extensions.Caching.Memory;

namespace Data.Requests.Commands;

public class CreateDebtorCommandHandler : IRequestHandler<CreateDebtorCommand, DebtorDetailsResponse>
{
    private readonly IDebtorRepository _debtorRepository;
    private readonly IMapper _mapper;
    private readonly ILogger<CreateDebtorCommandHandler> _logger;
    private readonly IMemoryCache _cache;

    public CreateDebtorCommandHandler(IDebtorRepository debtorRepository, IMapper mapper, ILogger<CreateDebtorCommandHandler> logger,
        IMemoryCache cache)
    {
        _debtorRepository = debtorRepository;
        _mapper = mapper;
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _cache = cache;
    }

    public async Task<DebtorDetailsResponse> Handle(CreateDebtorCommand command, CancellationToken cancellationToken)
    {
        var DebtorEntry = _mapper.Map<Debtor>(command);
        var newDebtor = await _debtorRepository.Create(DebtorEntry);
        _logger.LogInformation("Debtor {Id} is successfully created", newDebtor.Id);
        _cache.Remove("debtors");

        var DebtorDetailsResponse = _mapper.Map<DebtorDetailsResponse>(newDebtor);

        return DebtorDetailsResponse;
    }
}