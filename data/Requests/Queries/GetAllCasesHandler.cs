using AutoMapper;
using Data.Models.DataTransferObjects;
using Data.Repository;
using MediatR;
using Microsoft.Extensions.Caching.Memory;

namespace Data.Requests.Queries;

public class GetAllCasesHandler : IRequestHandler<GetAllCases, IEnumerable<CaseDetailsResponse>?>
{
    private readonly ICaseRepository _repository;
    private readonly IMapper _mapper;
    private readonly ILogger<GetCaseDetailsById> _logger;
    private readonly IMemoryCache _cache;

    public GetAllCasesHandler(ICaseRepository repository, IMapper mapper, ILogger<GetCaseDetailsById> logger,
        IMemoryCache cache)
    {
        _repository = repository;
        _mapper = mapper;
        _logger = logger;
        _cache = cache;
    }


    public async Task<IEnumerable<CaseDetailsResponse>?> Handle(GetAllCases request, CancellationToken cancellationToken)
    {
        if (!_cache.TryGetValue("cases", out IEnumerable<CaseDetailsResponse>? casesDto))
        {
            var cases = await _repository.Get();
            if (cases == null)
            {
                _logger.LogInformation("Cases not found!");
                return default;
            }

            casesDto = _mapper.Map<IEnumerable<CaseDetailsResponse>>(cases);
            _cache.Set("cases", casesDto, TimeSpan.FromSeconds(60));
        }
        
        return casesDto;
    }
}