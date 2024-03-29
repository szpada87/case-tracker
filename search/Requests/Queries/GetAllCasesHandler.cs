using AutoMapper;
using MediatR;
using Nest;
using Search.Models;
using Search.Models.DataTransferObjects;
using Search.Services;

namespace Search.Requests.Queries;

public class GetAllCasesHandler : IRequestHandler<GetAllCases, PagedResponse<CaseResponse>>
{
    private readonly IElasticSearchService<CaseDocument> _esService;
    private readonly IMapper _mapper;

    public GetAllCasesHandler(IElasticSearchService<CaseDocument> esService, IMapper mapper)
    {
        _esService = esService;
        _mapper = mapper;
    }

    public async Task<PagedResponse<CaseResponse>> Handle(GetAllCases request,
        CancellationToken cancellationToken)
    {
        QueryContainer qd;
        if (string.IsNullOrEmpty(request.ToString()) || string.IsNullOrWhiteSpace(request.ToString()))
        {
            qd = new QueryContainerDescriptor<CaseDocument>().MatchAll();
        }
        else
        {
            qd = BuildQueryDescriptor(request);
        }

        if (request.CurrentPage <= 0)
        {
            request.CurrentPage = 1;
        }

        if (request.PageSize <= 0)
        {
            request.PageSize = 10;
        }

        var availableFields = typeof(CaseDocument).GetProperties().Select(p => p.Name);
        IEnumerable<string> enumerable = availableFields as string[] ?? availableFields.ToArray();

        var fields = request.SourceFields?.Split(',').ToArray() ?? Array.Empty<string>();
        var validFields = fields.Intersect(enumerable, StringComparer.OrdinalIgnoreCase);

        var sd = new SearchDescriptor<CaseDocument>()
                .Index("casedocuments")
                .Query(_ => qd)
                .From((request.CurrentPage - 1) * request.PageSize)
                .Size(request.PageSize)
                .Source(s => s.Includes(i => i.Fields(validFields.ToArray())));

        if (!string.IsNullOrEmpty(request.SortBy) && !string.IsNullOrWhiteSpace(request.SortBy))
        {
            if (!enumerable.Contains(request.SortBy, StringComparer.OrdinalIgnoreCase))
            {
                request.SortBy = GetAllCasesConstants.DefaultSortBy;
            }

            if (request.SortOrder != GetAllCasesConstants.Ascending &&
                request.SortOrder != GetAllCasesConstants.Descending)
            {
                request.SortOrder = GetAllCasesConstants.Descending;
            }

            var sort = new SortDescriptor<CaseDocument>().Field(request.SortBy,
                request.SortOrder == "asc" ? SortOrder.Ascending : SortOrder.Descending);

            sd.Sort(_ => sort);
        }

        var response = await _esService.Query(sd, cancellationToken);
        var list = new List<CaseResponse>();
        if (response?.Hits != null)
        {
            foreach (var hit in response.Hits)
            {
                if (hit.Source == null) continue;
                hit.Source.Id = Int32.Parse(hit.Id);
                list.Add(_mapper.Map<CaseResponse>(hit.Source));
            }

            int? nextPage = (request.PageSize * request.CurrentPage) < (response?.HitsMetadata?.Total.Value ?? 0)
                ? request.CurrentPage + 1
                : null;
            int currentPage = request.CurrentPage;

            return new PagedResponse<CaseResponse>(new List<CaseResponse>(list), currentPage, nextPage);
        }

        return new PagedResponse<CaseResponse>(new List<CaseResponse>(), request.CurrentPage, null);
    }

    private QueryContainer BuildQueryDescriptor(GetAllCases request)
    {
        var should = new QueryContainer();
        var must = new QueryContainer();

        if (!string.IsNullOrEmpty(request.FreeTextSearch))
        {
            should = should || new MatchPhraseQuery()
            {
                Field = Infer.Field<CaseDocument>(f => f.Description),
                Query = request.FreeTextSearch,
                Boost = 3,
            };

            should = should || new MatchQuery
            {
                Field = Infer.Field<CaseDocument>(f => f.Description),
                Query = request.FreeTextSearch,
                Boost = 2,
                Fuzziness = Fuzziness.Auto,
                Operator = Operator.Or
            };

            should = should || new WildcardQuery
            {
                Field = Infer.Field<CaseDocument>(f => f.Description),
                Value = $"*{request.FreeTextSearch}*",
                Boost = 1,
                CaseInsensitive = true
            };

            should = should && new BoolQuery { MinimumShouldMatch = 1 };
        }

        return should && must;
    }
}