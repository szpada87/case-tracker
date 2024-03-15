using AutoMapper;
using Data.Models.DataTransferObjects;
using Data.Repository;
using MediatR;
using Microsoft.Extensions.Caching.Memory;

namespace Data.Requests.Queries;

public class GetAllDebtorsHandler : IRequestHandler<GetAllDebtors, IEnumerable<DebtorDetailsResponse>?>
{
    private readonly IDebtorRepository _repository;
    private readonly IMapper _mapper;
    private readonly ILogger<GetAllDebtorsHandler> _logger;
    private readonly IMemoryCache _cache;

    public GetAllDebtorsHandler(IDebtorRepository repository, IMapper mapper, ILogger<GetAllDebtorsHandler> logger,
        IMemoryCache cache)
    {
        _repository = repository;
        _mapper = mapper;
        _logger = logger;
        _cache = cache;
    }


    public async Task<IEnumerable<DebtorDetailsResponse>?> Handle(GetAllDebtors request, CancellationToken cancellationToken)
    {
        if (!_cache.TryGetValue("debtors", out IEnumerable<DebtorDetailsResponse>? debtorsDto))
        {
            var debtors = await _repository.Get();
            if (debtors == null)
            {
                _logger.LogInformation("Debtors not found!");
                return default;
            }

            debtorsDto = _mapper.Map<IEnumerable<DebtorDetailsResponse>>(debtors);
            _cache.Set("debtors", debtorsDto, TimeSpan.FromSeconds(60));
        }
        
        return debtorsDto;
    }
}