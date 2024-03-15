using AutoMapper;
using Data.Models.DataTransferObjects;
using Data.Repository;
using MediatR;
using Microsoft.Extensions.Caching.Memory;

namespace Data.Requests.Queries;

public class GetDebtorDetailsByIdHandler : IRequestHandler<GetDebtorDetailsById, DebtorDetailsResponse?>
{
    private readonly IDebtorRepository _repository;
    private readonly IMapper _mapper;
    private readonly ILogger<GetDebtorDetailsById> _logger;
    private readonly IMemoryCache _cache;

    public GetDebtorDetailsByIdHandler(IDebtorRepository repository, IMapper mapper, ILogger<GetDebtorDetailsById> logger,
        IMemoryCache cache)
    {
        _repository = repository;
        _mapper = mapper;
        _logger = logger;
        _cache = cache;
    }


    public async Task<DebtorDetailsResponse?> Handle(GetDebtorDetailsById request, CancellationToken cancellationToken)
    {
        if (!_cache.TryGetValue($"debtorId-{request.Id}", out DebtorDetailsResponse? debtorDto))
        {
            var debtors = await _repository.GetById(request.Id);
            if (debtors == null)
            {
                _logger.LogInformation("DebtorId {Id} is not found!", request.Id);
                return default;
            }

            debtorDto = _mapper.Map<DebtorDetailsResponse>(debtors);
            _cache.Set($"debtorId-{request.Id}", debtorDto, TimeSpan.FromSeconds(60));
        }
        
        return debtorDto;
    }
}