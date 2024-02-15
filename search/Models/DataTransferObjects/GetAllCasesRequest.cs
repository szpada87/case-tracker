using Search.Models;

public record GetAllCasesRequest
{
    public string? SourceFields { get; set; }
    public string? FreeTextSearch { get; set; }
    public string? SortBy { get; set; }
    public string? SortOrder { get; set; }
    public int CurrentPage { get; set; } = 1;
    public int PageSize { get; set; } = 10;

    public override string ToString()
    {
        return $"{SourceFields} {FreeTextSearch}";
    }
}