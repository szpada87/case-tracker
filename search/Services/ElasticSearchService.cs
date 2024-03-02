using Nest;

namespace Search.Services;

public class ElasticSearchService<T> : IElasticSearchService<T> where T : class
{
    private string IndexName { get; set; }
    private readonly IElasticClient _client;

    public ElasticSearchService(IElasticClient client)
    {
        _client = client;
        IndexName = typeof(T).Name.ToLower() + "s";
    }

    public IElasticSearchService<T> Index(string indexName)
    {
        IndexName = indexName;
        return this;
    }

    public async Task<T> AddOrUpdate(T document)
    {
        var indexResponse =
            await _client.IndexAsync(document, idx => idx.Index(IndexName));
        if (!indexResponse.IsValid)
        {
            throw new Exception(indexResponse.DebugInformation);
        }

        return document;
    }

    public async Task<GetResponse<T>> Get(string key)
    {
        return await _client.GetAsync<T>(key, g => g.Index(IndexName));
    }

    public async Task<List<T>?> GetAll()
    {
        var searchResponse = await _client.SearchAsync<T>(s => s.Index(IndexName).Query(q => q.MatchAll()));
        return searchResponse.IsValid ? searchResponse.Documents.ToList() : default;
    }

    public async Task<ISearchResponse<T>?> Query(SearchDescriptor<T> sd, CancellationToken cancellationToken)
    {
        var searchResponse = await _client.SearchAsync<T>(sd, cancellationToken);
        return searchResponse;
    }

    public async Task<bool> Remove(string key)
    {
        var response = await _client.DeleteAsync<T>(key, d => d.Index(IndexName));
        return response.IsValid;
    }
}