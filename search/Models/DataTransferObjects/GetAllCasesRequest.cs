using System.ComponentModel;
using Microsoft.AspNetCore.Mvc;

public record GetAllCasesRequest
{
    [FromQuery(Name = "sourceFields")]
    public string? SourceFields { get; set; }

    [FromQuery(Name = "freeTextSearch")]
    public string? FreeTextSearch { get; set; }

    [FromQuery(Name = "sortBy")]
    [DefaultValue("created")]
    public string? SortBy { get; set; }

    [FromQuery(Name = "sortOrder")]
    [DefaultValue("asc")]
    public string? SortOrder { get; set; }

    [FromQuery(Name = "currentPage")]
    [DefaultValue(1)]
    public int CurrentPage { get; set; }

    [FromQuery(Name = "pageSize")]
    [DefaultValue(10)]
    public int PageSize { get; set; }

    public override string ToString()
    {
        return $"{SourceFields} {FreeTextSearch}";
    }
}