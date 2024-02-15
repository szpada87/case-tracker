using AutoMapper;
using Data.Models.DataTransferObjects;
using Data.Repository;
using MediatR;
using Microsoft.Extensions.Caching.Memory;

namespace Data.Requests.Queries;

public class GetCaseDetailsByIdHandler : IRequestHandler<GetCaseDetailsById, CaseDetailsResponse?>
{
    private readonly ICaseRepository _repository;
    private readonly IMapper _mapper;
    private readonly ILogger<GetCaseDetailsById> _logger;
    private readonly IMemoryCache _cache;

    public GetCaseDetailsByIdHandler(ICaseRepository repository, IMapper mapper, ILogger<GetCaseDetailsById> logger,
        IMemoryCache cache)
    {
        _repository = repository;
        _mapper = mapper;
        _logger = logger;
        _cache = cache;
    }


    public async Task<CaseDetailsResponse?> Handle(GetCaseDetailsById request, CancellationToken cancellationToken)
    {
        if (!_cache.TryGetValue($"caseId-{request.Id}", out CaseDetailsResponse? caseDto))
        {
            var cases = await _repository.GetById(request.Id);
            if (cases == null)
            {
                _logger.LogInformation("CaseId {Id} is not found!", request.Id);
                return default;
            }

            caseDto = _mapper.Map<CaseDetailsResponse>(cases);
            _cache.Set($"caseId-{request.Id}", caseDto, TimeSpan.FromSeconds(60));
        }
        
        return caseDto;
    }
}