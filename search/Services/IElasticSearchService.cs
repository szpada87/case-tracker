using Nest;

namespace Search.Services;

public interface IElasticSearchService<T> where T : class
{
    IElasticSearchService<T> Index(string indexName);
    Task<T> AddOrUpdate(T document);
    Task<GetResponse<T>> Get(string key);
    Task<ISearchResponse<T>?> Query(SearchDescriptor<T> sd, CancellationToken cancellationToken);
    Task<bool> Remove(string key);
}